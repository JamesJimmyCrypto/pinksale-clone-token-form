import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  RiImageAddLine,
  RiGlobalLine,
  RiGithubLine,
  RiTelegramLine,
  RiFacebookCircleLine,
  RiTwitterLine,
  RiInstagramLine,
  RiDiscordLine,
  RiRedditLine,
} from "react-icons/ri";

import { FormikControl, Button, InputNote } from "./";

// BLOCKCHAIN
import { detectToken } from "@/global/utils/connect";

// ================================
// FORMIK CONTAINER COMPONENT =====
// ================================
const DutchAuctionForm = ({ page, setPage }) => {
  const initialValues = {
    tokenAddress: "",
    tokenCurrency: "bnb",
    feeOptions: "5%",
    totalSellingAmount: "",
    startPrice: "",
    endPrice: "",
    softCap: "",
    hardCap: "",
    whitelist: "disabled",
    minContribution: "",
    maxContribution: "",
    decreasePriceCycle: "",
    liquidityPercent: "",
    router: "",
    refundType: "refund",
    liquidityLockTime: "",
    startDate: null,
    endDate: null,
    logoURL: "",
    website: "",
    github: "",
    telegram: "",
    facebook: "",
    twitter: "",
    instagram: "",
    discord: "",
    reddit: "",
    description: "",
  };

  const validationSchema = Yup.object({
    tokenAddress: Yup.string().required("Required"),
    tokenCurrency: Yup.string().required("Required"),
    feeOptions: Yup.string().required("Required"),
    totalSellingAmount: Yup.string().required("Required"),
    startPrice: Yup.string().required("Required"),
    endPrice: Yup.string().required("Required"),
    softCap: Yup.string().required("Required"),
    hardCap: Yup.string().required("Required"),
    whitelist: Yup.string().required("Required"),
    minContribution: Yup.string().required("Required"),
    maxContribution: Yup.string().required("Required"),
    decreasePriceCycle: Yup.string().required("Required"),
    liquidityPercent: Yup.string().required("Required"),
    router: Yup.string().required("Required"),
    refundType: Yup.string().required("Required"),
    liquidityLockTime: Yup.string().required("Required"),
    startDate: Yup.date().required("Required").nullable(),
    endDate: Yup.date().required("Required").nullable(),
    logoURL: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
  });

  const handleSubmit = (values, submitProps) => {
    console.log("Form values: ", values);

    submitProps.setSubmitting(false);
    submitProps.resetForm();
    setPage(1);

    alert("Successfully created DutchAuction launchpad");
  };

  /////////////////
  // RETURN =======
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form className="p-4 bg-tan rounded-md flex flex-col gap-4">
              {page === 1 && <Step1 formik={formik} />}
              {page === 2 && <Step2 formik={formik} />}
              {page === 3 && <Step3 formik={formik} />}
              {page === 4 && <Step4 formik={formik} />}

              {/* buttons  */}
              <div
                className={`flex gap-3 justify-center ${
                  !(formik.dirty && formik.isValid)
                    ? "flex-col sm:flex-row "
                    : ""
                }`}
              >
                {page > 1 && (
                  <Button
                    text={"previous"}
                    action={_ => setPage(prev => prev - 1)}
                    styles="secondary"
                  />
                )}
                {page !== 4 && (
                  <Button
                    text={"next"}
                    action={_ => setPage(prev => prev + 1)}
                  />
                )}

                {/* submit  */}
                {page === 4 && (
                  <div className={`flex items-center `}>
                    {!(formik.dirty && formik.isValid) ? (
                      <span className="text-red-500 font-bold text-center">
                        Please fill in all required fields/inputs to SUBMIT
                      </span>
                    ) : (
                      <Button type="submit" text={"submit"} />
                    )}
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Formik>
  );
};

///////////////////////////
// EXTENDED COMPONETS /////
const Step4 = ({ formik }) => {
  const formValues = Object.entries(formik.values);
  const startDate = JSON.parse(JSON.stringify(formValues[16][1]));
  const endDate = JSON.parse(JSON.stringify(formValues[17][1]));

  const part1 = formValues.slice(0, 16);
  const part2 = formValues.slice(18, -1);

  const newValues = [
    ...part1,
    ...part2,
    ["startdate", startDate],
    ["endDate", endDate],
  ];

  // console.log(formValues);

  return (
    <div className="">
      {newValues.map((value, i) => (
        <div
          key={i}
          className="flex gap-4 justify-between py-2 border-b-2border-primaryBg"
        >
          <span className="capitalize">{value[0]}</span>
          <span className="text-primary break-all">{value[1]}</span>
        </div>
      ))}
    </div>
  );
};

const Step3 = ({ formik }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        {/* loge  */}
        <div className="flex-1 flex flex-col gap-3">
          <FormikControl
            control={"input"}
            label={"Logo URL"}
            type={"text"}
            name={"logoURL"}
            icon={<RiImageAddLine className="h-5 w-5" />}
          />

          <InputNote
            note={`URL must end with a supported image extension png, jpg, jpeg or gif.`}
            styles={"mt-0"}
          />
        </div>

        <div className="flex-1">
          {/* website  */}
          <FormikControl
            control={"input"}
            label={"Website"}
            type={"text"}
            name={"website"}
            icon={<RiGlobalLine className="h-5 w-5" />}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Facebook  */}
        <div className="flex-1">
          <FormikControl
            control={"input"}
            label={"Facebook"}
            type={"text"}
            name={"facebook"}
            icon={<RiFacebookCircleLine className="h-5 w-5" />}
          />
        </div>

        <div className="flex-1">
          {/* Twitter  */}
          <FormikControl
            control={"input"}
            label={"Twitter"}
            type={"text"}
            name={"twitter"}
            icon={<RiTwitterLine className="h-5 w-5" />}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Github  */}
        <div className="flex-1">
          <FormikControl
            control={"input"}
            label={"Github"}
            type={"text"}
            name={"github"}
            icon={<RiGithubLine className="h-5 w-5" />}
          />
        </div>

        <div className="flex-1">
          {/* website  */}
          <FormikControl
            control={"input"}
            label={"Telegram"}
            type={"text"}
            name={"telegram"}
            icon={<RiTelegramLine className="h-5 w-5" />}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Instagram  */}
        <div className="flex-1">
          <FormikControl
            control={"input"}
            label={"Instagram"}
            type={"text"}
            name={"instagram"}
            icon={<RiInstagramLine className="h-5 w-5" />}
          />
        </div>

        <div className="flex-1">
          {/* discord  */}
          <FormikControl
            control={"input"}
            label={"Discord"}
            type={"text"}
            name={"discord"}
            icon={<RiDiscordLine className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* reddit  */}
      <FormikControl
        control={"input"}
        label={"Reddit"}
        type={"text"}
        name={"reddit"}
        icon={<RiRedditLine className="h-5 w-5" />}
      />

      {/* Description  */}
      <FormikControl
        control={"textarea"}
        label={"Description"}
        type={"text"}
        name={"description"}
      />
    </>
  );
};

const Step2 = ({ formik }) => {
  const whitelistOptions = [
    {
      key: "Disabled",
      value: "disabled",
    },
    {
      key: "Enabled",
      value: "enabled",
    },
  ];

  const routerOptions = [
    {
      key: "Select Router",
      value: "",
    },
    {
      key: "Pancakeswap",
      value: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    },
    {
      key: "ApeSwap",
      value: "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
    },
    {
      key: "MDex",
      value: "0xf400087A4c94c52C6540A325CB702DE3ee7CB37f",
    },
    {
      key: "BiSwap",
      value: "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8",
    },
    {
      key: "KnightSwap",
      value: "0x05E61E0cDcD2170a76F9568a110CEe3AFdD6c46f",
    },
  ];

  const refundTypeOptions = [
    {
      key: "Refund",
      value: "refund",
    },
    {
      key: "Burn",
      value: "burn",
    },
  ];

  return (
    <>
      {/* Input  */}
      <FormikControl
        control={"input"}
        label={"Total selling amount"}
        type={"text"}
        name={"totalSellingAmount"}
        placeholder={"Ex: 100"}
      />

      {/* Start Price */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-col flex-1 flex gap-3">
          <FormikControl
            control={"input"}
            label={"Start Price"}
            type={"text"}
            name={"startPrice"}
            placeholder={"Ex: 100"}
          />

          <InputNote
            note={`The price when the auction will start. This value must be higher than the end price`}
          />
        </div>

        <div className="flex-col flex-1 flex gap-3">
          <FormikControl
            control={"input"}
            label={"End Price"}
            type={"text"}
            name={"endPrice"}
            placeholder={"Ex: 100"}
          />

          <InputNote
            note={`The price when the auction will meet its end date`}
          />
        </div>
      </div>

      {/* SoftCap */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-col flex-1 flex gap-3">
          <FormikControl
            control={"input"}
            label={"Soft Cap"}
            type={"text"}
            name={"softCap"}
            placeholder={"Ex: 100"}
          />

          <InputNote note={`Softcap must be >= 20% of Hardcap!`} />
        </div>

        <div className="flex-col flex-1 justify-start flex gap-3">
          <FormikControl
            control={"input"}
            label={"Hard Cap"}
            type={"text"}
            name={"hardCap"}
            placeholder={"Ex: 100"}
          />
        </div>
      </div>

      {/* whitelist  */}
      <FormikControl
        control={"radio"}
        label={"Whitelist"}
        name={"whitelist"}
        options={whitelistOptions}
      />

      {/*  Contribution */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-col flex-1 flex gap-3">
          <FormikControl
            control={"input"}
            label={"Min Contribution"}
            type={"text"}
            name={"minContribution"}
            placeholder={"Ex: 100"}
          />
        </div>

        <div className="flex-col flex-1 justify-start flex gap-3">
          <FormikControl
            control={"input"}
            label={"Max Contribution"}
            type={"text"}
            name={"maxContribution"}
            placeholder={"Ex: 100"}
          />
        </div>
      </div>

      {/*  Decrease Price Cycle (minutes)* */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-col flex-1 flex gap-3">
          <FormikControl
            control={"input"}
            label={"Decrease Price Cycle (minutes)"}
            type={"text"}
            name={"decreasePriceCycle"}
            placeholder={"Ex: 100"}
          />
        </div>

        <div className="flex-col flex-1 justify-start flex gap-3">
          <FormikControl
            control={"input"}
            label={"Liquidity Percent (%)"}
            type={"text"}
            name={"liquidityPercent"}
            placeholder={"Ex: 100"}
          />

          <InputNote
            note={`Enter the percentage of raised funds that should be allocated to Liquidity on (Min 51%, Max 100%)`}
          />
        </div>
      </div>

      {/* router  */}
      <FormikControl
        control={"select"}
        label={"Router"}
        name={"router"}
        options={routerOptions}
      />

      {/* refund and locktime */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          {/* refund  */}
          <FormikControl
            control={"select"}
            label={"Refund"}
            name={"refundType"}
            options={refundTypeOptions}
          />
        </div>

        <div className="flex-1">
          {/* Input  */}
          <FormikControl
            control={"input"}
            label={"Liquidity Lock Time (minutes)"}
            type={"number"}
            name={"liquidityLockTime"}
            placeholder={"Ex: 20"}
          />
        </div>
      </div>

      {/* Select start time & end time (UTC)* */}
      <div className="flex flex-col md:flex-row  gap-4">
        <div className="flex-1">
          <FormikControl
            control={"date"}
            label={"Start time (UTC)"}
            name={"startDate"}
          />
        </div>

        <div className="flex-1">
          <FormikControl
            control={"date"}
            label={"End time (UTC)"}
            name={"endDate"}
          />
        </div>
      </div>
    </>
  );
};

const Step1 = ({ formik }) => {
  const feeOptions = [
    {
      key: "5%",
      value: "5%",
    },
    {
      key: "2%",
      value: "2%",
    },
  ];

  const currencyOptions = [
    {
      key: "BNB",
      value: "bnb",
    },
    {
      key: "BUSD",
      value: "busd",
    },
    {
      key: "USDT",
      value: "usdt",
    },
    {
      key: "USDC",
      value: "usdc",
    },
  ];

  return (
    <>
      {/* Input  */}
      <FormikControl
        control={"tokenAddress"}
        label={"Token Address"}
        type={"text"}
        name={"tokenAddress"}
        placeholder={"Ex: 0x000..."}
        detectToken={detectToken}
      />

      <InputNote note={"Pool creation fee: 1 BNB"} />

      {/* Radio  */}
      <FormikControl
        control={"radio"}
        label={"Currency"}
        name={"tokenCurrency"}
        options={currencyOptions}
      />

      <InputNote
        note={`Users will pay with ${formik.values.tokenCurrency} for your token`}
      />

      <FormikControl
        control={"radio"}
        label={"Fee Options"}
        name={"feeOptions"}
        options={feeOptions}
        dynamicRadio
        dynamicText={" raised only"}
      />
    </>
  );
};

// EXPORT ====================
export default DutchAuctionForm;
