import { useRouter } from "next/router";
import { Button } from "../components";

// =========================
// HOME PAGE COMPONENT =====
// =========================
const Home = () => {
  const rounter = useRouter();

  return (
    <div className="min-h-screen w-full pt-3 ">
      {/* page */}
      <div className="flex flex-col md:items-center ">
        {/* Protocol  */}
        <div className="md:w-[90%] lg:w-[80%] ">
          <CommonContent
            title={"The Launchpad Protocol for Everyone!"}
            sub1={
              "CryptoPad helps everyone to create their own tokens and token sales in few seconds."
            }
            sub2={
              " Tokens created on CryptoPad will be verified and published on explorer websites."
            }
          />

          {/* buttons  */}
          <div className="flex justify-center gap-4 my-6">
            <Button
              text={"create now"}
              action={_ => rounter.push("/launchpad/create")}
              modify={
                "text-Crypt bg-primaryBg !py-4 !px-6 !rounded-full !capitalize shadow-lg hover:shadow-none text-base font-semibold  "
              }
            />
            <Button
              text={"learn more"}
              action={_ => rounter.push("/launchpad/create")}
              modify={
                "text-Crypt bg-primaryBg !py-4 !px-6 !rounded-full !capitalize shadow-lg hover:shadow-none text-base font-semibold  "
              }
            />
          </div>

          {/* items  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4 mt-12">
            <ContentCard
              title={"$390.9M"}
              subtitle={"Total Liquidity Raised"}
            />
            <ContentCard title={"13513"} subtitle={"Total Projects"} />
            <ContentCard title={"1.4M"} subtitle={"Total Participants"} />
            <ContentCard title={"$238.4M"} subtitle={"Total Values Locked"} />
          </div>
        </div>

        {/* Suite of Tools */}
        <div className="md:w-[90%] mt-24">
          <CommonContent
            title={"A Suite of Tools for Token Sales."}
            sub1={
              "A suite of tools were built to help you create your own tokens and launchpads in a fast, simple and cheap way, with no prior code knowledge required and 100% decentralized!"
            }
          />

          {/* items  */}
          <div className="flex flex-col gap-4 mt-12">
            {/* row  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
              <ContentCard
                img
                title={"Standard"}
                subtitle={
                  "Mint standard tokens on ETH, BSC, AVAX, Fantom, Polygon."
                }
              />
              <ContentCard
                img
                title={"Deflationary"}
                subtitle={
                  "Generate deflationary tokens with tax and/or charity functions."
                }
              />
              <ContentCard
                img
                title={"Customization"}
                subtitle={
                  "Create a token sale for your own custom token easily."
                }
              />
              <ContentCard
                img
                title={"Launchpad"}
                subtitle={
                  "Use the token you mint to create a launchpad with just a few clicks"
                }
              />
            </div>
            {/* row  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
              <ContentCard
                img
                title={"Branding"}
                subtitle={
                  "Adding logo, social links, description, listing on CryptSale."
                }
              />
              <ContentCard
                img
                title={"Management"}
                subtitle={
                  "The portal to help you easily update content for your launchpad."
                }
              />
              <ContentCard
                img
                title={"Community"}
                subtitle={
                  "Promote your launchpad to thousands of buyers on CryptSale."
                }
              />
              <ContentCard
                img
                title={"Locking"}
                subtitle={
                  "Lock your liquidity to CryptSwap, PancakeSwap after presale."
                }
              />
            </div>
          </div>
        </div>

        {/* A Growing Protocol Ecosystem. */}
        <div className="md:w-[90%] my-24">
          <CommonContent
            title={"A Growing Protocol Ecosystem."}
            sub1={
              "We build a suite of tools for the world of decentralized finance. CryptMoon, CryptSale, CryptElon CryptLock, CryptSwap, we Crypt everything!"
            }
          />

          {/* items  */}
          <div className="flex flex-col gap-4 mt-12">
            {/* row  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
              <ContentCard
                img
                title={"CryptMoon"}
                subtitle={"The best launchpad for professional teams"}
              />
              <ContentCard
                img
                title={"CryptSale"}
                subtitle={"Launch a token sale with a few clicks"}
              />
              <ContentCard
                img
                title={"CryptSwap"}
                subtitle={"Swap tokens and farming $CryptS."}
              />
              <ContentCard
                img
                title={"CryptLock"}
                subtitle={"Locking liquidity on CryptSwap."}
              />
            </div>
            {/* row  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
              <ContentCard
                img
                title={"CryptElon"}
                subtitle={"The first meme token on CryptMoon."}
              />
              <ContentCard
                img
                title={"CryptWallet"}
                subtitle={"Crypto wallet, buy, store, exchange & earn."}
              />
              <ContentCard
                img
                title={"Community"}
                subtitle={
                  "Promote your launchpad to thousands of buyers on CryptSale."
                }
              />
              <ContentCard
                img
                title={"Locking"}
                subtitle={
                  "Lock your liquidity to CryptSwap, PancakeSwap after presale."
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =======================
// EXTENDED COMPONENTS ===

// ContentCard
const ContentCard = ({ title, subtitle, img }) => (
  <div className="p-6 bg-tan text-center rounded-lg">
    {img && (
      <div className="flex justify-center items-center">
        <span className="h-20 w-20 my-4 rounded-full bg-neutral-300" />
      </div>
    )}
    <h4 className="text-3xl font-semibold mb-2">{title}</h4>
    <p className="">{subtitle}</p>
  </div>
);

// CommonContent
export const CommonContent = ({ title, sub1, sub2 }) => (
  <div className="text-center ">
    <h3 className="text-4xl font-bold mb-3">{title}</h3>
    <div className="w-[80%] mx-auto">
      <p className="text-lg ">{sub1}</p>
      <p className="text-lg ">{sub2}</p>
    </div>
  </div>
);

// EXPORT =========
export default Home;
