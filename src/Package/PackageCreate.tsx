import { Create, useGetIdentity } from "react-admin";
import { PackageForm } from "./PackageForm";

const transformPackageData = (data: any, vendorId?: string | number) => {
  return {
    ...data,
    vendorId: vendorId ?? data.vendorId,
    price: data.price ? parseInt(data.price as string, 10) : undefined,
    durationDays: data.durationDays
      ? parseInt(data.durationDays as string, 10)
      : undefined,
    availableSlots: data.availableSlots
      ? parseInt(data.availableSlots as string, 10)
      : undefined,
    vendorDiscount: data.vendorDiscount
      ? parseInt(data.vendorDiscount as string, 10)
      : undefined,
    pickupLocation: data.pickupLocation || null,
    startPoint: data.startPoint || null,
    endPoint: data.endPoint || null,
    modeOfTravel: data.modeOfTravel || null,
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
  };
};

export const PackageCreate = () => {
  const { data: user } = useGetIdentity();

  return (
    <Create
      redirect="list"
      transform={(data) => transformPackageData(data, user?.vendorId)}
    >
      <PackageForm />
    </Create>
  );
};
