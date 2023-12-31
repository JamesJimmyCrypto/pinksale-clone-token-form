import { useState } from "react";

import { FairlaunchForm, FormSteps } from "../../components/";

// ===============================
// FAIR LAUNCH PAGE COMPONENT ====
// ===============================
const fairlaunch = () => {
  const [page, setPage] = useState(1);

  const step2 = {
    title: "DeFi Fairlaunch Info",
    sub: "Enter the launchpad information that you want to raise , that should be enter all details about your presale",
  };

  return (
    <div>
      {/* form  */}
      <FormSteps step2={step2} active={page} />
      <FairlaunchForm page={page} setPage={setPage} />
    </div>
  );
};

// EXPORT ===========
export default fairlaunch;
