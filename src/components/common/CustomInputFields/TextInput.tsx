export const CustomTextInput = ({register,label,placeholder,type,id,errors}:any) => {
  return (
    <>
      <label style={{textTransform:'capitalize'}} htmlFor="firstName" className="form-label">
        {label}
      </label>
      <input
        type={type || "text"}
        id={id}
        className="form-control"
        placeholder={placeholder || label}
        {...register}
      />
      {errors && <div className="text-danger">{errors}</div>}
    </>
  )};
