import { useState } from "react";

import { DutchAuctionForm, FormSteps } from "../../components/";

// ===============================
// DUTCH AUCTION PAGE COMPONENT ==
// ===============================
const dutchAuction = () => {
  const [page, setPage] = useState(1);

  const step2 = {
    title: "Dutch Auction",
    sub: "Enter the dutch auction information that you want to raise, that should be enter all details about your presale",
  };
  
  return (
    <div>
      {/* form  */}
      <FormSteps step2={step2} active={page} />
      <DutchAuctionForm page={page} setPage={setPage} />
    </div>
  );
};

// EXPORT ===========
export default dutchAuction;
