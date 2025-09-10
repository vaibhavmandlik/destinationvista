import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  TextField,
  useNotify,
  useRefresh,
  useDataProvider,
  Confirm,
  FunctionField,
} from "react-admin";
import { Switch } from "@mui/material";
import React, { useState } from "react";

export const OfferList = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const handleToggle = async (record: any) => {
    debugger;
    if (record.isActive === "1") {
      // Deactivate offer directly
      record.isActive = "0";
      
      try {
        await dataProvider.update("offer", {
          id: record.id,
          data: record,
          previousData: record,
        });
        notify("Offer deactivated", { type: "info" });
        refresh();
      } catch (error) {
        notify("Error deactivating offer", { type: "warning" });
      }
    } else {
      record.isActive = "1";
      
      try {
        // Get currently active offer
        const { data: activeOffers } = await dataProvider.getList("offer", {
          filter: {}, // No filter used in query string
          pagination: { page: 1, perPage: 1 },
          sort: { field: "id", order: "DESC" },
          meta: {
            queryParams: { isActive: "1" }, // Custom query param for your API
          },
        });

        if (activeOffers.length === 0) {
          // No active offer exists
          await dataProvider.update("offer", {
            id: record.id,
            data: { isActive: "1" },
            previousData: record,
          });
          notify("Offer activated", { type: "info" });
          refresh();
        } else {
          // An active offer already exists
          setSelectedOffer(record);
          setConfirmOpen(true);
        }
      } catch (error) {
        notify("Error checking for active offer", { type: "warning" });
      }
    }
  };

  const confirmActivation = async () => {
    setConfirmOpen(false);

    try {
      debugger;
      // Get the current active offer
      const { data: activeOffers } = await dataProvider.getList("offer", {
        filter: {},
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "DESC" },
        meta: {
          queryParams: { isActive: "1" },
        },
      });

      const currentActive = activeOffers[0];

      // Deactivate the currently active offer
      if (currentActive && currentActive.id !== selectedOffer.id) {
        currentActive.isActive = "0";
        await dataProvider.update("offer", {
          id: currentActive.id,
          data: currentActive,
          previousData: currentActive,
        });
      }

      selectedOffer.isActive = "1";
      // Activate the selected offer
      await dataProvider.update("offer", {
        id: selectedOffer.id,
        data: selectedOffer,
        previousData: selectedOffer,
      });

      notify("Offer activated and previous one deactivated", { type: "info" });
      refresh();
    } catch (error) {
      notify("Error during offer activation", { type: "warning" });
    }
  };

  return (
    <>
      <List>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="title" />
          <TextField source="discountPercent" />
          <TextField source="description" />
          <TextField source="for" />

          {/* Toggle for isActive */}
          <FunctionField
            label="Active"
            render={(record: any) => (
              <Switch
                checked={record.isActive === "1"}
                onChange={() => handleToggle(record)}
                color="primary"
              />
            )}
          />

          <EditButton />
          <DeleteWithConfirmButton />
        </Datagrid>
      </List>

      {/* Confirm Dialog for overwriting active offer */}
      <Confirm
        isOpen={confirmOpen}
        title="An active offer already exists"
        content="Do you want to deactivate the current active offer and activate this one?"
        onConfirm={confirmActivation}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
};
