import { useState } from "react";

import { LaunchpadForm, FormSteps } from "../../components/";

// ==========================
// CREATE PAGE COMPONENT ====
// ==========================
const create = () => {
  const [page, setPage] = useState(1);

  const step2 = {
    title: "DeFi Launchpad Info",
    sub: "Enter the launchpad information that you want to raise , that should be enter all details about your presale",
  };

  // ================
  // RETURN =========
  return (
    <div>
      {/* form  */}
      <FormSteps step2={step2} active={page} />
      <LaunchpadForm page={page} setPage={setPage} />
    </div>
  );
};

// EXPORT ===========
export default create;
