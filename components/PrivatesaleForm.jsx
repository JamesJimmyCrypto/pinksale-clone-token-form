import { useState } from "react";

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

import FormikControl from "./FormikControl";
import { Button, InputNote, Loader } from "./";

// ================================
// FORMIK CONTAINER COMPONENT =====
// ================================
const PrivateSaleForm = ({ page, setPage }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    title: "",
    tokenCurrency: "bnb",
    hardcapTokens: "",
    softcapTokens: "",
    whitelist: "disabled",
    minimumBuy: "",
    maximumBuy: "",
    firstFundReleaseForProject: "",
    fundVestingPeriodEachCycle: "",
    fundReleaseEachCycle: "",
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
    title: Yup.string().required("Required"),
    tokenCurrency: Yup.string().required("Required"),
    hardcapTokens: Yup.string().required("Required"),
    softcapTokens: Yup.string().required("Required"),
    whitelist: Yup.string().required("Required"),
    minimumBuy: Yup.string().required("Required"),
    maximumBuy: Yup.string().required("Required"),
    firstFundReleaseForProject: Yup.string().required("Required"),
    fundVestingPeriodEachCycle: Yup.string().required("Required"),
    fundReleaseEachCycle: Yup.string().required("Required"),
    startDate: Yup.date().required("Required").nullable(),
    endDate: Yup.date().required("Required").nullable(),
    logoURL: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
    // github: Yup.string().required("Required"),
    // telegram: Yup.string().required("Required"),
  });

  const handleSubmit = (values, submitProps) => {
    setLoading(true);
    console.log("Form values: ", values);

    submitProps.setSubmitting(false);
    submitProps.resetForm();
    setPage(1);

    setLoading(false);
  };

  /////////////////
  // RETURN =======
  return loading ? (
    <Loader
      text1={"Processing... Please wait!"}
      text2={"Blockchain takes about 1 - 15 seconds to mine a transaction"}
    />
  ) : (
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
              !(formik.dirty && formik.isValid) ? "flex-col sm:flex-row " : ""
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
              <Button text={"next"} action={_ => setPage(prev => prev + 1)} />
            )}

            {/* submit  */}
            {page === 4 && (
              <div className={`flex items-center `}>
                {console.log(formik)}
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
  );
};

const Step4 = ({ formik }) => {
  const formValues = Object.entries(formik.values);
  const startDate = JSON.parse(JSON.stringify(formValues[10][1]));
  const endDate = JSON.parse(JSON.stringify(formValues[11][1]));

  const part1 = formValues.slice(0, 10);
  const part2 = formValues.slice(12, -1);

  const newValues = [
    ...part1,
    ...part2,
    ["startdate", startDate],
    ["endDate", endDate],
  ];

  console.log(formValues);

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

  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row">
        {/* Input  */}
        <FormikControl
          control={"input"}
          label={"Hardcap Tokens"}
          type={"number"}
          name={"hardcapTokens"}
          placeholder={"Ex: 1000"}
        />

        {/* Input  */}
        <FormikControl
          control={"input"}
          label={"Softcap Tokens"}
          type={"number"}
          name={"softcapTokens"}
          placeholder={"Ex: 1000"}
        />
      </div>

      {/* Radio  */}
      <FormikControl
        control={"radio"}
        label={"Whitelist"}
        name={"whitelist"}
        options={whitelistOptions}
      />

      {/* sub and list rate */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Input  */}
        <div className="flex-1">
          <FormikControl
            control={"input"}
            label={"Minimum buy"}
            type={"number"}
            name={"minimumBuy"}
            placeholder={"Ex: 0"}
          />
        </div>

        {/* Input  */}
        <FormikControl
          control={"input"}
          label={"Maximum buy"}
          type={"number"}
          name={"maximumBuy"}
          placeholder={"Ex: 0"}
        />
      </div>

      {/* First Fund Release For Project (%)  */}
      <FormikControl
        control={"input"}
        label={"First Fund Release For Project (%)"}
        type={"number"}
        name={"firstFundReleaseForProject"}
        placeholder={"Ex: 70%"}
      />

      {/* Fund Vesting Period Each Cycle (minutes) */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          {/* Input  */}
          <FormikControl
            control={"input"}
            label={"Fund Vesting Period Each Cycle (minutes"}
            type={"number"}
            name={"fundVestingPeriodEachCycle"}
            placeholder={"Enter minutes"}
          />
        </div>

        <div className="flex-1">
          {/* Input  */}
          <FormikControl
            control={"input"}
            label={"Fund Release Each Cycle (%)"}
            type={"number"}
            name={"fundReleaseEachCycle"}
            placeholder={"Ex: 20%"}
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
  const currencyOptions = [
    {
      key: "BNB",
      value: "BNB",
    },
  ];

  return (
    <>
      {/* Input  */}
      <FormikControl
        control={"input"}
        label={"Title"}
        type={"text"}
        name={"title"}
        placeholder={"Ex: This is my private sale"}
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
    </>
  );
};

// EXPORT ====================
export default PrivateSaleForm;
