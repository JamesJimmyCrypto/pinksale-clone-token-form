import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const InputTokenAddress = ({
  label,
  type,
  name,
  placeholder,
  icon,
  detectToken,
}) => {
  const [inputError, setInputError] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);

  const detectTokenAddress = async address => {
    setInputError(null);
    try {
      const response = await detectToken(address);
      setTokenDetails(response);
    } catch (error) {
      console.log(error);
      setInputError("Cannot Detect Token");
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={name} className={"capitalize mb-1"}>
        {label}:
      </label>

      <div className="flex gap-3 items-center relative">
        {icon && <span className=" z-10 absolute left-3">{icon}</span>}

        <Field type={type} name={name} placeholder={placeholder}>
          {({ form }) => {
            const { setFieldValue } = form;

            return (
              <input
                className="p-2 flex-1 bg-ban border border-primaryBg rounded focus:outline-primary"
                onBlur={e => {
                  detectTokenAddress(e.target.value);
                  setFieldValue(name, e.target.value);
                }}
              />
            );
          }}
        </Field>
      </div>

      {inputError && <p className="break-word text-red-500">{inputError}</p>}

      {tokenDetails?.map((detail, i) => (
        <div key={i} className="mt-2">
          <DetailItem item={detail} />
        </div>
      ))}

      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

const DetailItem = ({ item }) => (
  <div className="flex justify-between ">
    <span className="text-sm capitalize">{item[0]}</span>
    <span className="text-sm text-primary font-semibold uppercase">
      {item[1]}
    </span>
  </div>
);

export default InputTokenAddress;
