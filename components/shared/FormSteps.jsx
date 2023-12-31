import { RiCheckLine } from "react-icons/ri";

const FormSteps = ({ step2, active }) => {
  return (
    <div className="my-4 hidden lg:flex gap-3">
      <StepItem
        title={"Verify Token"}
        subtitle={"Enter the token address and verify"}
        active={active}
        number={1}
      />
      <StepItem
        title={step2.title}
        subtitle={step2.sub}
        active={active}
        number={2}
      />
      <StepItem
        title={"Add Additional Info"}
        subtitle={"Let people know who you are"}
        active={active}
        number={3}
      />
      <StepItem
        title={"Finish"}
        subtitle={"Review your information"}
        active={active}
        number={4}
        removeLine
      />
    </div>
  );
};

const StepItem = ({ title, subtitle, number, removeLine, active }) => (
  <div className="flex flex-1">
    <div className="flex gap-2">
      <div className="">
        {number < active ? (
          <div className="bg-tan p-[0.2rem] border border-primary rounded-full">
            <RiCheckLine className="h-6 w-6 text-primary " />
          </div>
        ) : (
          <p
            className={`h-6 w-6 p-4 flex items-center justify-center ${
              active === number
                ? "bg-primary text-primaryBg"
                : "bg-tan border text-primary border-primary"
            }   rounded-full`}
          >
            {number}
          </p>
        )}
      </div>
      <div className="">
        <div className="flex-1 flex gap-3 items-center">
          <h6>{title}</h6>{" "}
          {!removeLine && (
            <span className="h-[0.5px]  block bg-neutral-300 flex-1" />
          )}
        </div>
        <p className="w-[80%] text-neutral-500">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default FormSteps;
