import { Formik, Form } from "formik";
import * as Yup from "yup";

// imports
import { useState } from "react";

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

import { FormikControl, Button, InputNote, Loader } from "./";

// BLOCKCHAIN
import {
  detectToken,
  checkApproval,
  ApproveFactory,
  createFairLaunch,
} from "@/global/utils/connect";

// ================================
// FairlaunchForm COMPONENT =======
// ================================
const FairlaunchForm = ({ page, setPage }) => {
  const initialValues = {
    tokenAddress: "",
    tokenCurrency: "bnb",
    feeOptions: "5%",
    totalSellingAmount: "",
    softcap: "",
    maxDeposit: "",
    router: "",
    liquidity: "",
    startDate: null,
    endDate: null,
    liquidityLockup: "",
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
    softcap: Yup.string().required("Required"),
    maxDeposit: Yup.string().required("Required"),
    router: Yup.string().required("Required"),
    liquidity: Yup.string().required("Required"),
    startDate: Yup.date().required("Required").nullable(),
    endDate: Yup.date().required("Required").nullable(),
    liquidityLockup: Yup.string().required("Required"),
    logoURL: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
  });

  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const factoryAddress = "0x5C404cB8d8aecD7f01a1c3027CFF29ee92F1F049";

  const DetectApproval = ({ tokenAddress }) => {
    const response = checkApproval(tokenAddress, factoryAddress)
      .then(res => {
        //  console.log(res)
        // console.log(tokenAddress)
        if (res == false) {
          setApproved(res);
        } else {
          setApproved(true);
        }
      })
      .catch(err => {
        //throw err;
        // console.log(err)
      });
  };

  const handleSubmit = (values, submitProps) => {
    setLoading(true);

    console.log("Form values: ", values);
    createFairLaunch(values);

    submitProps.setSubmitting(false);
    submitProps.resetForm();
    setPage(1);

    alert("Successfully created fairlaunch launchpad");
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
            {/* <DetectApproval tokenAddress={formik.values.tokenAddress} /> */}
            {page !== 4 &&
              (approved ? (
                <Button text={"Next"} action={_ => setPage(prev => prev + 1)} />
              ) : waiting ? (
                <Loader />
              ) : (
                <Button
                  text={"Approve"}
                  action={async _ => {
                    setWaiting(true);
                    await ApproveFactory(
                      formik.values.tokenAddress,
                      factoryAddress
                    );
                    setApproved(true);
                    setWaiting(false);
                  }}
                />
              ))}

            {/* submit  */}
            {page === 4 && (
              <div className={`flex items-center `}>
                {/* {console.log(formik)} */}
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

///////////////////////////
// EXTENDED COMPONETS /////
const Step4 = ({ formik }) => {
  const formValues = Object.entries(formik.values);
  const startDate = JSON.parse(JSON.stringify(formValues[7][1]));
  const endDate = JSON.parse(JSON.stringify(formValues[8][1]));

  const part1 = formValues.slice(0, 7);
  const part2 = formValues.slice(9, -1);

  const newValues = [
    ...part1,
    ...part2,
    ["startdate", startDate],
    ["endDate", endDate],
  ];

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

      <FormikControl
        control={"input"}
        label={"Softcap"}
        type={"text"}
        name={"softcap"}
        placeholder={"Ex: 100"}
      />
      {/* 
      <FormikControl
      control={"input"}
      label={"Max Deposit Per user"}
      type={"text"}
      name={"maxDeposit"}
      placeholder={"Ex: 100"}
      /> */}

      {/* router  */}
      <FormikControl
        control={"select"}
        label={"Router"}
        name={"router"}
        options={routerOptions}
      />

      <FormikControl
        control={"input"}
        label={"Liquidity (%)"}
        type={"text"}
        name={"liquidity"}
        placeholder={"Ex: 50"}
      />

      <InputNote
        note={`Enter the percentage of raised funds that should be allocated to Liquidity on (Min 51%, Max 100%)`}
      />

      <InputNote
        note={`If I spend 1 BNB on how many tokens will I receive? Usually this amount is lower than presale rate to allow for a higher listing price on`}
      />

      {/* Select start time & end time (UTC)* */}
      <div className="flex flex-col md:flex-row  gap-4">
        <div className="flex flex-1 flex-col gap-3">
          <FormikControl
            control={"date"}
            label={"Start time (UTC)"}
            name={"startDate"}
          />
          <InputNote
            note={`The duration between start time and end time must be less than 10080 minutes`}
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

      <FormikControl
        control={"input"}
        label={"Liquidity lockup (minutes)"}
        type={"text"}
        name={"liquidityLockup"}
        placeholder={"Ex: 5"}
      />
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
export default FairlaunchForm;
