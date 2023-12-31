import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Textarea = ({ label, name, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={"capitalize"}>
        {label}:
      </label>
      <Field
        as="textarea"
        className="mt-1 p-2 flex-1 bg-ban border border-primaryBg rounded focus:outline-primary"
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Textarea;
