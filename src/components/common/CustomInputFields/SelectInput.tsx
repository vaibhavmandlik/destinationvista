import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export const CustomSelectInput = ({ register, label, placeholder, type, id, errors, options, showAddButton = true, onAddClick = () => { } }: any) => {
    return (
        <>
        <label style={{ textTransform: 'capitalize' }} htmlFor="firstName" className="form-label">
                {label}
            </label>
            <div className="d-flex gap-2">
                <div className="position-relative">
                    <select
                        id={id}
                        className="form-control pe-4"
                        placeholder={placeholder || label}
                        {...register}
                    >
                        <option value="">{placeholder || label}</option>
                        {options.map((option: any, index: number) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <KeyboardArrowDownIcon
                        sx={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: 'rgba(0, 0, 0, 0.54)'
                        }}
                    />
                </div>
                {/* {showAddButton && (
                    <IconButton
                        size="small"
                        onClick={onAddClick}

                    >
                        <AddIcon />
                    </IconButton>
                )} */}
            </div>
            {errors && <div className="text-danger">{errors}</div>}
        </>
    )
};
