import { useForm } from "react-hook-form";
import { CustomSelectInput } from "./components/common/CustomInputFields/SelectInput";
import { useGetIdentity, useGetList } from "react-admin";
import { useEffect } from "react";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export const SwitchVendor = () => {
    const { handleSubmit, register, setValue, watch } = useForm();
    const { data: user } = useGetIdentity();
    const { data: VendorList } = useGetList('vendor', { filter: { 'userId': user?.id } });
    const data = VendorList?.map((item: any) => ({ value: item.id, label: item.agencytitle })) || [];
    // if only one vendor is there then select that vendor by default

    const selectedVendor = watch("vendor_select");
    useEffect(() => {
        if (data.length === 1 && !selectedVendor) {
            setValue("vendor_select", data[0]?.value);
        }
    }, [data])
    useEffect(() => {
        localStorage.setItem("selectedVendor", selectedVendor);
    }, [selectedVendor])
    const onSubmit = () => {
    };
    return (
        <>
            {data.length > 0 ? (<form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md py-1">
                        <CustomSelectInput
                            label=""
                            id="vendor"
                            register={register("vendor_select", { required: "required" })}
                            placeholder="Select Agency"
                            errors=""
                            options={data}
                            onAddClick={()=>window.open('/admin/vendor/create')}
                        />
                    </div>
                </div>
            </form>) : <div className="py-2"><Button variant="outlined" sx={{width:'100%'}} startIcon={<AddIcon />}>Agency</Button></div>}
        </>

    );
}; 