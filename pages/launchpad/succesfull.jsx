import { useRouter } from "next/router";

import { Button } from "../../components";

// =============================
// SUCCESSFULL PAGE COMPONENT ==
// =============================
const succesfull = () => {
  const router = useRouter();
  const tokenAddress = router.query.tokenAddress;
  const tokenDetails = Object.entries(router.query);

  //////////////////
  // RETURN =======
  return (
    <div className="p-4 bg-tan rounded-md ">
      <p className="text-center text-green-500 font-semibold">
        Your token was created
      </p>

      {/* token details  */}
      <div className="lg:w-[50%] md:w-[80%] space-y-3 mt-5 mx-auto">
        {tokenDetails.map((tokenDetail, i) => (
          <DetailsItem key={i} item={tokenDetail} />
        ))}
      </div>

      {/* buttons  */}
      <div className="flex flex-col gap-4 items-center md:flex-row lg:w-[80%] mt-8 mx-auto">
        <div className="flex-1 flex gap-3">
          <Button
            action={_ => {}}
            text="View transaction"
            modify={"rounded-sm bg-white hover:bg-neutral-300 "}
          />
          <Button
            action={_ => {
              navigator.clipboard.writeText(tokenAddress);
              alert("Address copied");
            }}
            text="Copy address"
            modify={"rounded-sm bg-white hover:bg-neutral-300 "}
          />
        </div>
        <div className="flex-1 flex gap-3">
          <Button
            action={_ => router.push("/launchpad/create")}
            text="Create launchpad"
            modify={
              "rounded-sm bg-primary hover:bg-rose-700 text-white hover:bg-[#3b0619]"
            }
          />
          <Button
            action={_ => router.push("/launchpad/fairlaunch")}
            text="Create fairlaunch"
            modify={
              "rounded-sm bg-primary hover:bg-rose-700 text-white hover:bg-[#3b0619]"
            }
          />
        </div>
      </div>
    </div>
  );
};

// ======================
// EXTENDED COMPONENTS //

const DetailsItem = ({ item }) => (
  <div className="grid grid-cols-2 break-all">
    <span className="capitalize">{item[0]}:</span>
    <span className="text-primary">{item[1]}</span>
  </div>
);

// EXPORT ===============
export default succesfull;
