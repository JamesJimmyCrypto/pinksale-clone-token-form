import { useState } from "react";

import { AirdropForm } from "../../components/";

// ==========================
// CREATE PAGE COMPONENT ====
// ==========================
const create = () => {
  const [page, setPage] = useState(1);

  // ================
  // RETURN =========
  return (
    <div>
      {/* form  */}
      <AirdropForm page={page} setPage={setPage} />
    </div>
  );
};

// EXPORT ===========
export default create;
