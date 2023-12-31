import { useState } from "react";

import {  FormSteps, PrivateSaleForm } from "../../components/";

// ==========================
// CREATE PAGE COMPONENT ====
// ==========================
const create = () => {
  const [page, setPage] = useState(1);

  const step2 = {
    title: "Private Sale",
    sub: "Enter the launchpad information that you want to raise , that should be enter all details about your presale",
  };

  // ================
  // RETURN =========
  return (
    <div>
      {/* form  */}
      <FormSteps step2={step2} active={page} />
      <PrivateSaleForm page={page} setPage={setPage} />
    </div>
  );
};

// EXPORT ===========
export default create;