import { useState } from "react";

import { SubscriptionPoolForm, FormSteps } from "../../components/";

// ====================================
// subscriptionPool PAGE COMPONENT ====
// ====================================
const subscriptionPool = () => {
  const [page, setPage] = useState(1);

  const step2 = {
    title: "Subscription",
    sub: "Enter the subscription pool information that you want to raise, that should be enter all details about your presale",
  };

  // ================
  // RETURN =========
  return (
    <div>
      {/* form  */}
      <FormSteps step2={step2} active={page} />
      <SubscriptionPoolForm page={page} setPage={setPage} />
    </div>
  );
};

export default subscriptionPool;
