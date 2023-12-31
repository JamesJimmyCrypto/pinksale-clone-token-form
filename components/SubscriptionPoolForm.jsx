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

import { useState } from "react";
import { FormikControl, Button, InputNote, Loader } from "./";

// BLOCKCHAIN
import {
  detectToken,
  checkApproval,
  ApproveFactory,
  createSubscription,
} from "@/global/utils/connect";

// ================================
// FORMIK CONTAINER COMPONENT =====
// ================================
const SubscriptionPoolForm = ({ page, setPage }) => {
  const initialValues = {
    tokenAddress: "",
    tokenCurrency: "bnb",
    feeOptions: "2",
    listingOptions: "autoListing",
    hardcapTokens: "",
    softcapTokens: "",
    hardcapTokensPerUser: "",
    subscriptionRate: "",
    listingRate: "",
    whitelist: "disabled",
    router: "disabled",
    liquidityPercent: "",
    refundType: 0,
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
    hardcapTokens: Yup.string().required("Required"),
    softcapTokens: Yup.string().required("Required"),
    hardcapTokensPerUser: Yup.string().required("Required"),
    subscriptionRate: Yup.string().required("Required"),
    listingRate: Yup.string().required("Required"),
    whitelist: Yup.string().required("Required"),
    router: Yup.string().required("Required"),
    liquidityPercent: Yup.string().required("Required"),
    refundType: Yup.string().required("Required"),
    liquidityLockTime: Yup.string().required("Required"),
    startDate: Yup.date().required("Required").nullable(),
    endDate: Yup.date().required("Required").nullable(),
    logoURL: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
    // github: Yup.string().required("Required"),
    // telegram: Yup.string().required("Required"),
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
    createSubscription(values);

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
            {/* <DetectApproval tokenAddress={formik.values.tokenAddress} /> */}

            {/* submit  */}
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Step4 = ({ formik }) => {
  const formValues = Object.entries(formik.values);
  const startDate = JSON.parse(JSON.stringify(formValues[14][1]));
  const endDate = JSON.parse(JSON.stringify(formValues[15][1]));

  const part1 = formValues.slice(0, 14);
  const part2 = formValues.slice(16, -1);

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

  const refundTypeOptions = [
    {
      key: "Refund",
      value: 0,
    },
    {
      key: "Burn",
      value: 1,
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

  return (
    <>
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

      {/* Input  */}
      <FormikControl
        control={"input"}
        label={"Hardcap Tokens per user"}
        type={"number"}
        name={"hardcapTokensPerUser"}
        placeholder={"Ex: 1000"}
      />

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
        <div className="flex-1 flex flex-col gap-3">
          <FormikControl
            control={"input"}
            label={"Subscription rate"}
            type={"number"}
            name={"subscriptionRate"}
            placeholder={"Ex: 1000"}
          />

          <InputNote
            note={`If I spend 1 BNB how many tokens will I receive?`}
            styles={"mt-0"}
          />
        </div>

        {/* Input  */}
        <FormikControl
          control={"input"}
          label={"Listing rate"}
          type={"number"}
          name={"listingRate"}
          placeholder={"Ex: 1000"}
        />
      </div>

      {/* router and liquid */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          {/* router  */}
          <FormikControl
            control={"select"}
            label={"Router"}
            name={"router"}
            options={routerOptions}
          />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {/* Input  */}
          <FormikControl
            control={"input"}
            label={"Liquidity Percent (%)"}
            type={"number"}
            name={"liquidityPercent"}
            placeholder={"Ex: 70"}
          />

          <InputNote
            note={`Enter the percentage of raised funds that should be allocated to Liquidity on (Min 51%, Max 100%)`}
            styles={"mt-0"}
          />
        </div>
      </div>

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
      value: "4",
    },
    {
      key: "2%",
      value: "2",
    },
  ];

  const listingOptions = [
    {
      key: "Auto Listing",
      value: "autoListing",
    },
    {
      key: "Manual Listing",
      value: "manualListing",
    },
  ];

  const currencyOptions = [
    {
      key: "BNB",
      value: "bnb",
    },
    // {
    //   key: "BUSD",
    //   value: "busd",
    // },
    // {
    //   key: "USDT",
    //   value: "usdt",
    // },
    // {
    //   key: "USDC",
    //   value: "usdc",
    // },
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

      <FormikControl
        control={"radio"}
        label={"Listing Options"}
        name={"listingOptions"}
        options={listingOptions}
      />
    </>
  );
};

// EXPORT ====================
export default SubscriptionPoolForm;
