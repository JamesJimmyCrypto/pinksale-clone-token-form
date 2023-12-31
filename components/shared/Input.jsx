import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Input = ({ label, type, name, placeholder, icon }) => {
  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={name} className={"capitalize mb-1"}>
        {label}:
      </label>

      <div className="flex gap-3 items-center relative">
        {icon && <span className=" z-10 absolute left-3">{icon}</span>}

        <Field
          className={`${icon && 'pl-10'} p-2 flex-1 bg-ban border border-primaryBg rounded focus:outline-primary`}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
