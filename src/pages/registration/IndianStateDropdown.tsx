import React  from "react";

interface StateOption {
    value:string,
    label:string,
}

interface DropdownProps {
    onStateSelect : (state:string)=> void;
    name:string
}
const IndianStateDropdown : React.FC<DropdownProps> = ({onStateSelect , name})=>{
    
    const states: StateOption[] = [
        { value: "andhra_pradesh", label: "Andhra Pradesh" },
        { value: "arunachal_pradesh", label: "Arunachal Pradesh" },
        { value: "assam", label: "Assam" },
        { value: "bihar", label: "Bihar" },
        { value: "chhattisgarh", label: "Chhattisgarh" },
        { value: "goa", label: "Goa" },
        { value: "gujarat", label: "Gujarat" },
        { value: "haryana", label: "Haryana" },
        { value: "himachal_pradesh", label: "Himachal Pradesh" },
        { value: "jharkhand", label: "Jharkhand" },
        { value: "karnataka", label: "Karnataka" },
        { value: "kerala", label: "Kerala" },
        { value: "madhya_pradesh", label: "Madhya Pradesh" },
        { value: "maharashtra", label: "Maharashtra" },
        { value: "manipur", label: "Manipur" },
        { value: "meghalaya", label: "Meghalaya" },
        { value: "mizoram", label: "Mizoram" },
        { value: "nagaland", label: "Nagaland" },
        { value: "odisha", label: "Odisha" },
        { value: "punjab", label: "Punjab" },
        { value: "rajasthan", label: "Rajasthan" },
        { value: "sikkim", label: "Sikkim" },
        { value: "tamil_nadu", label: "Tamil Nadu" },
        { value: "telangana", label: "Telangana" },
        { value: "tripura", label: "Tripura" },
        { value: "uttar_pradesh", label: "Uttar Pradesh" },
        { value: "uttarakhand", label: "Uttarakhand" },
        { value: "west_bengal", label: "West Bengal" },
        { value: "andaman_nicobar", label: "Andaman and Nicobar Islands" },
        { value: "chandigarh", label: "Chandigarh" },
        { value: "dadra_nagar_haveli", label: "Dadra and Nagar Haveli and Daman and Diu" },
        { value: "delhi", label: "Delhi" },
        { value: "lakshadweep", label: "Lakshadweep" },
        { value: "puducherry", label: "Puducherry" },
        { value: "ladakh", label: "Ladakh" },
        { value: "jammu_kashmir", label: "Jammu and Kashmir" },
      ]; 

     const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) =>{
        onStateSelect(event.target.value);
     }

    return(
        <>
         <select name={name} onChange={handleChange} defaultValue="" className="form-control signup-input">
            <option value="" disabled>
                --Select a state--
            </option>
            {states.map((state)=>(
                <option key={state.value} value={state.value}>
                    {state.label}
                </option>
            ))}
         </select>
        </>
    );

}

export default IndianStateDropdown