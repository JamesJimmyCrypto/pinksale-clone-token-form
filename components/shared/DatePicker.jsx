import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ label, name, ...rest }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={"capitalize"}>
        {label}:
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              showTimeSelect
              className="mt-1 p-2 w-full flex-1 bg-ban border border-primaryBg rounded focus:outline-primary"
              selected={value}
              onChange={val => JSON.parse(JSON.stringify(setFieldValue(name, val)))}
              placeholderText="Select a date"
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default DatePicker;
