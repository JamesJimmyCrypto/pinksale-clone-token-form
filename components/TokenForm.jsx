import { useRouter } from "next/router";
import { useState } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { FormikControl, InputNote, Button, Loader } from "./";
// Imports
import { createToken } from "../global/utils/connect";
import { useSelector } from "react-redux";

// ================================
// FORMIK CONTAINER COMPONENT =====
// ================================
const TokenForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const tokenTypeOptions = [
    {
      key: "Standard Token",
      value: "standard",
    },
    {
      key: "Liquidity Generator Token",
      value: "liquidity",
    },
    {
      key: "Baby Token",
      value: "baby",
    },
    {
      key: "Buyback Baby Token",
      value: "buyback",
    },
  ];

  const [tokenTypeSelected, setTokenTypeSelected] = useState("standard");

  const routerOptions = [
    {
      key: "Select Router Exchange",
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

  const handleSubmit = async (values, submitProps) => {
    setLoading(true);
    console.log("Form values: ", values);
    // const token = await createToken(tokenTypeSelected, values);
    try {
      await createToken(tokenTypeSelected, values)
        .then(address => {
          submitProps.setSubmitting(false);
          submitProps.resetForm();
          setLoading(false);
          console.log("token:", address);
          const newValues = { ...values, tokenAddress: address };
          router.push({ pathname: `/launchpad/succesfull`, query: newValues });
          //return address;
        })
        .catch(err => {
          setLoading(false);
          alert("FAILED");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    // submitProps.setSubmitting(false);
    //  console.log("token:", token);
    //  submitProps.resetForm();
    //const newValues = { ...values, tokenAddress: token };
    //setLoading(false);
    // router.push({ pathname: `/launchpad/succesfull`, query: newValues });
  };

  /////////////////
  // RETURN =======
  return loading ? (
    <Loader text1={"Processing... Please wait!"} text2={'Blockchain takes about 1 - 15 seconds to mine a transaction'} />
  ) : (
    <div className="p-4 bg-tan rounded-md ">
      {/* selector  */}
      <div className="flex flex-col mb-4">
        <label htmlFor="" className={"capitalize mb-1"}>
          Token Type
        </label>
        <select
          className="p-2 flex-1 bg-ban border border-primaryBg rounded focus:outline-primary"
          name=""
          onChange={e => {
            setTokenTypeSelected(e.target.value);
          }}
        >
          {tokenTypeOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.key}
            </option>
          ))}
        </select>
      </div>

      <InputNote note={"0.2 BNB"} />

      {/* Form  */}
      <Forms
        type={tokenTypeSelected}
        routerOptions={routerOptions}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

//////////////////////
// EXTENDED COMPONENTS

const Forms = ({ type, handleSubmit, routerOptions }) => {
  switch (type) {
    case "liquidity":
      return (
        <LiquidityControls
          routerOptions={routerOptions}
          handleSubmit={handleSubmit}
        />
      );

    case "baby":
      return (
        <BabyControls
          routerOptions={routerOptions}
          handleSubmit={handleSubmit}
        />
      );

    case "buyback":
      return (
        <BuybackControls
          routerOptions={routerOptions}
          handleSubmit={handleSubmit}
        />
      );

    default:
      return <StandardControls handleSubmit={handleSubmit} />;
  }
};

const StandardControls = ({ handleSubmit }) => {
  const blockchain = useSelector(state => state.blockchain);
  const initialValues = {
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: "",
    tokenTotalSupply: "",
  };

  const validationSchema = Yup.object({
    tokenName: Yup.string().required("Token name cannot be empty"),
    tokenSymbol: Yup.string().required("Required"),
    tokenTotalSupply: Yup.string().required("Required"),
    tokenDecimals: Yup.string().required("Required"),
  });

  /////////////////
  // RETURN =======
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form className="mt-4 flex flex-col gap-4">
          <CommonControls />

          {/* Input  */}
          <FormikControl
            control={"input"}
            label={"Token Decimals"}
            type={"number"}
            name={"tokenDecimals"}
            placeholder={"Ex: 18"}
          />
          <Button type="submit" text={"create"} />
        </Form>
      )}
    </Formik>
  );
};

const LiquidityControls = ({ handleSubmit, routerOptions }) => {
  const initialValues = {
    tokenName: "",
    tokenSymbol: "",
    tokenTotalSupply: "",
    router: "",
    feeGenerateYield: "",
    feeGenerateLiquidity: "",
    charityAddress: "",
    charityPercent: "",
  };

  const validationSchema = Yup.object({
    tokenName: Yup.string().required("Token name cannot be empty"),
    tokenSymbol: Yup.string().required("Required"),
    tokenTotalSupply: Yup.string().required("Required"),
    router: Yup.string().required("Required"),
    feeGenerateYield: Yup.string().required("Required"),
    feeGenerateLiquidity: Yup.string().required("Required"),
  });

  /////////////////
  // RETURN =======
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form className="mt-4 flex flex-col gap-4">
          <CommonControls />

          {/* Select  */}
          <FormikControl
            control={"select"}
            label={"Router"}
            name={"router"}
            options={routerOptions}
          />

          <div className="flex flex-col lg:flex-row gap-3">
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Transaction fee to generate yield (%)"}
              type={"number"}
              name={"feeGenerateYield"}
              placeholder={"Ex: 1"}
            />
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Transaction fee to generate liquidity (%)"}
              type={"number"}
              name={"feeGenerateLiquidity"}
              placeholder={"Ex: 1"}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Charity/Marketing address"}
              type={"text"}
              name={"charityAddress"}
              placeholder={"Ex: 0x000..."}
            />
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Charity/Marketing percent (%)"}
              type={"text"}
              name={"charityPercent"}
              placeholder={"0 - 25"}
            />
          </div>

          <Button type="submit" text={"create"} />
        </Form>
      )}
    </Formik>
  );
};

const BabyControls = ({ handleSubmit, routerOptions }) => {
  const initialValues = {
    tokenName: "",
    tokenSymbol: "",
    tokenTotalSupply: "",
    router: "",
    rewardToken: "",
    minTokenBalance: "",
    tokenRewardFee: "",
    autoLiquidity: "",
    marketingFee: "",
    marketingWallet: "",
  };

  const validationSchema = Yup.object({
    tokenName: Yup.string().required("Token name cannot be empty"),
    tokenSymbol: Yup.string().required("Required"),
    tokenTotalSupply: Yup.string().required("Required"),
    router: Yup.string().required("Required"),
    rewardToken: Yup.string().required("Required"),
    minTokenBalance: Yup.string().required("Required"),
    tokenRewardFee: Yup.string().required("Required"),
    autoLiquidity: Yup.string().required("Required"),
    marketingFee: Yup.string().required("Required"),
    marketingWallet: Yup.string().required("Required"),
  });

  /////////////////
  // RETURN =======
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form className="mt-4 flex flex-col gap-4">
          <CommonControls />

          {/* Select  */}
          <FormikControl
            control={"select"}
            label={"Router"}
            name={"router"}
            options={routerOptions}
          />

          <div className="flex flex-col lg:flex-row gap-3">
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Reward token"}
              type={"text"}
              name={"rewardToken"}
              placeholder={"Ex: 1"}
            />
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Minimum token balance for dividends"}
              type={"number"}
              name={"minTokenBalance"}
              placeholder={"Ex: 100,000"}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Token reward fee (%)"}
              type={"number"}
              name={"tokenRewardFee"}
              placeholder={"0 - 100"}
            />
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Auto add liquidity (%)"}
              type={"number"}
              name={"autoLiquidity"}
              placeholder={"0 - 100"}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Marketing fee (%)"}
              type={"number"}
              name={"marketingFee"}
              placeholder={"0 - 100"}
            />
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Marketing wallet"}
              type={"text"}
              name={"marketingWallet"}
              placeholder={"0 - 100"}
            />
          </div>

          <Button type="submit" text={"create"} />
        </Form>
      )}
    </Formik>
  );
};

const BuybackControls = ({ handleSubmit, routerOptions }) => {
  const initialValues = {
    tokenName: "",
    tokenSymbol: "",
    tokenTotalSupply: "",
    router: "",
    rewardToken: "",
    liquidityFee: "",
    buybackFee: "",
    reflectionFee: "",
    marketingFee: "",
  };

  const validationSchema = Yup.object({
    tokenName: Yup.string().required("Token name cannot be empty"),
    tokenSymbol: Yup.string().required("Required"),
    tokenTotalSupply: Yup.string().required("Required"),
    router: Yup.string().required("Required"),
    rewardToken: Yup.string().required("Required"),
    liquidityFee: Yup.string().required("Required"),
    buybackFee: Yup.string().required("Required"),
    reflectionFee: Yup.string().required("Required"),
    marketingFee: Yup.string().required("Required"),
  });

  /////////////////
  // RETURN =======
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form className="mt-4 flex flex-col gap-4">
          <CommonControls />

          {/* Select  */}
          <FormikControl
            control={"select"}
            label={"Router"}
            name={"router"}
            options={routerOptions}
          />

          <div className="flex flex-col lg:flex-row gap-3">
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Reward token"}
              type={"text"}
              name={"rewardToken"}
              placeholder={"Ex: 1"}
            />
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Liquidity Fee (%)"}
              type={"number"}
              name={"liquidityFee"}
              placeholder={"Ex: 0 - 100"}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Buyback Fee (%)"}
              type={"number"}
              name={"buybackFee"}
              placeholder={"0 - 100"}
            />
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Reflection Fee (%)"}
              type={"number"}
              name={"reflectionFee"}
              placeholder={"0 - 100"}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            {/* Input  */}
            <FormikControl
              control={"input"}
              label={"Marketing fee (%)"}
              type={"number"}
              name={"marketingFee"}
              placeholder={"0 - 100"}
            />
          </div>

          <Button type="submit" text={"create"} />
        </Form>
      )}
    </Formik>
  );
};

const CommonControls = () => (
  <div className="flex flex-col lg:flex-row gap-3">
    {/* Input  */}
    <FormikControl
      control={"input"}
      label={"Token Name"}
      type={"text"}
      name={"tokenName"}
      placeholder={"Ex: Crypt"}
    />
    {/* Input  */}
    <FormikControl
      control={"input"}
      label={"Token Symbol"}
      type={"text"}
      name={"tokenSymbol"}
      placeholder={"Ex: KPT"}
    />
    {/* Input  */}
    <FormikControl
      control={"input"}
      label={"Total supply"}
      type={"number"}
      name={"tokenTotalSupply"}
      placeholder={"Ex: 100,000,000"}
    />
  </div>
);

// EXPORT ====================
export default TokenForm;
