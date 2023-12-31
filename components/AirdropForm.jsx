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

import { FormikControl, Button, InputNote, Loader } from ".";

// BLOCKCHAIN
import { detectToken } from "@/global/utils/connect";

// ================================
// FairlaunchForm COMPONENT =======
// ================================
const AirdropForm = ({ page, setPage }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    tokenAddress: "",
    airdropTitle: "",
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
    airdropTitle: Yup.string().required("Required"),
    logoURL: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
  });

  const handleSubmit = (values, submitProps) => {
    setLoading(true);

    console.log("Form values: ", values);

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
            {page !== 2 && (
              <Button text={"next"} action={_ => setPage(prev => prev + 1)} />
            )}

            {/* submit  */}
            {page === 2 && (
              <div className={`flex items-center `}>
                {console.log(formik)}
                {!(formik.dirty && formik.isValid) ? (
                  <span className="text-red-500 font-bold text-center">
                    Please fill in all required fields/inputs to SUBMIT
                  </span>
                ) : (
                  <Button type="submit" text={"Create Airdrop"} />
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

const Step2 = ({ formik }) => {
  return (
    <>
      <FormikControl
        control={"input"}
        label={"Airdrop Title"}
        type={"text"}
        name={"airdropTitle"}
      />

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

const Step1 = ({ formik }) => (
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
  </>
);

// EXPORT ====================
export default AirdropForm;
