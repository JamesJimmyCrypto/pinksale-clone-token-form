import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const RadioButtons = ({
  label,
  name,
  options,
  dynamicRadio,
  dynamicText,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={"capitalize mb-2"}>
        {label}:
      </label>
      <Field className="p-3 border border-black" name={name} {...rest}>
        {({ field, form }) =>
          options.map(opt => (
            <span key={opt.value}>
              <input
                {...field}
                type={"radio"}
                value={opt.value}
                id={opt.value}
                className="hidden"
                checked={field.value === opt.value}
              />
              <label
                htmlFor={opt.value}
                className="ml-2  flex items-center cursor-pointer"
              >
                <span className="w-4 h-4 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
                {opt.key}{" "}
                {dynamicRadio && (
                  <>
                    <div className="uppercase mx-1">{form.values.tokenCurrency}</div>
                    <div className="">{dynamicText}</div>
                  </>
                )}
                {opt.value === "5%" ? (
                  <div className="text-blue-500 ml-1 text-sm">
                    (Recommended)
                  </div>
                ) : (
                  ""
                )}
              </label>
            </span>
          ))
        }
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default RadioButtons;
