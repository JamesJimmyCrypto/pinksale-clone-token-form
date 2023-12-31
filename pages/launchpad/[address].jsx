import { useRouter } from "next/router";
import { useState } from "react";

import {
  RiGlobalLine,
  RiHeartLine,
  RiHeartFill,
  RiNotification4Fill,
  RiNotification4Line,
} from "react-icons/ri";

import { Button, ButtonIcon } from "../../components";

// ========================
// VIEW PAGE COMPONENT ====
// ========================
const View = () => {
  const router = useRouter();
  const { address } = router.query;
  console.log(address);

  const [liked, setLiked] = useState(false);
  const [notify, setNotify] = useState(false);

  const TokenDetails = [
    ["Presale Address", "0xBA1E5eCdA5Ea148B254780B66486162a5F727E60"],
    ["Token Name	", "ERC20Token"],
    ["Token Symbol ", "ERC"],
    ["Token Decimals	", "18"],
    ["Token Address	", "0x498FF9290e2cCDa8b0D6541645BaBb9fa81dDA73"],
    ["Total Supply	", "100,000 ERC"],
    ["Tokens For Presale	", "2,000 ERC"],
    ["Tokens For Liquidity	", "794 ERC"],
    ["Presale Rate	", "1 BNB = 10 ERC"],
    ["Listing Rate	", "1 BNB = 8 ERC"],
    ["Initial Market Cap (estimate)	", "$4,016,625"],
    ["Soft Cap	", "100 BNB"],
    ["Hard Cap	", "200 BNB"],
    ["Unsold Tokens	", "Burn"],
    ["Presale Start Time	", "2022.11.03 14:40 (UTC)"],
    ["Presale End Time	", "2022.11.03 14:40 (UTC)"],
    ["Listing On	", "Pancakeswap"],
    ["Liquidity Percent	", "52%"],
    ["Liquidity Lockup Time	", "1440 minutes after pool ends"],
  ];

  return (
    <div className="flex gap-5 flex-col lg:flex-row pt-4">
      {/* left  */}
      <div className="lg:w-[70%]  bg-tan p-4 md:p-6 rounded-lg">
        {/* top  */}
        <TopDetails
          liked={liked}
          setLiked={setLiked}
          notify={notify}
          setNotify={setNotify}
        />

        {/* bottom  */}
        <div className="mt-10 flex flex-col gap-2">
          {TokenDetails.map((detail, i) => (
            <div
              key={i}
              className="flex justify-between pb-2 border-b-2border-primaryBg"
            >
              <span className="mr-2">{detail[0]}</span>
              <span className="text-primary break-all">{detail[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* right */}
      <div className="lg:w-[30%] flex flex-col gap-4">
        <div className="bg-tan p-4 md:p-6 flex flex-col gap-4 rounded-lg">
          {/* timer */}
          <div className="text-center">
            <p>Presale Starts In</p>
            <div className="flex gap-4 justify-center mt-3">
              <span className="p-2 py-1 text-primary rounded-lg bg-rose-900 font-bold">
                01
              </span>
              <span className="p-2 py-1 text-primary rounded-lg bg-rose-900 font-bold">
                18
              </span>
              <span className="p-2 py-1 text-primary rounded-lg bg-rose-900 font-bold">
                00
              </span>
              <span className="p-2 py-1 text-primary rounded-lg bg-rose-900 font-bold">
                24
              </span>
            </div>
          </div>

          {/* progress  */}
          <div className="">
            <div className="my-2">
              <span className="block bg-neutral-900 h-3 rounded-full" />
            </div>
            <div className="flex justify-between">
              <span className="uppercase text-sm font-semibold text-neutral-500">
                0 BNB
              </span>
              <span className="uppercase text-sm font-semibold text-neutral-500">
                50 BNB
              </span>
            </div>
          </div>

          {/* buy  */}
          <div className="">
            <p>Amount (max: 2 BNB)</p>
            <input
              type="number"
              placeholder="0"
              className="border w-full border-primary rounded-md p-2 my-2 bg-tan"
            />
            <Button
              styles={"secondary"}
              text={"buy with BNB"}
              action={_ => {}}
            />
          </div>
        </div>

        <StatusDetails />
      </div>
    </div>
  );
};

// //////////////////////////
// EXTENDED COMPONENTS //////

const TopDetails = ({ liked, setLiked, notify, setNotify }) => (
  <div className="flex justify-between">
    {/* name & logo  */}
    <div className="flex flex-col md:flex-row gap-4">
      {/* logo  */}
      <div className="">
        <span className="block h-14 w-14 bg-neutral-400 rounded-full" />
      </div>

      <div className="">
        <p className="capitalize font-semibold text-2xl">ERC20Token Presale</p>

        {/* icons  */}
        <div className="flex gap-3 mt-2">
          <RiGlobalLine className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>

    {/* tags  */}
    <div className="flex flex-col-reverse justify-end md:flex-row gap-2 items-center">
      <div className="flex gap-1 items-center">
        <ButtonIcon
          icon1={<RiHeartFill className="h-4 w-4 text-primary" />}
          icon2={<RiHeartLine className="h-4 w-4 text-neutral-500" />}
          value={liked}
          action={_ => setLiked(!liked)}
        />

        <ButtonIcon
          icon1={<RiNotification4Fill className="h-4 w-4 text-primary" />}
          icon2={<RiNotification4Line className="h-4 w-4 text-neutral-500" />}
          value={notify}
          action={_ => setNotify(!notify)}
        />
      </div>

      <div className="">
        <span className="capitalize font-semibold text-yellow-600 p-1 rounded-full bg-neutral-50 text-sm">
          upcoming
        </span>
      </div>
    </div>
  </div>
);

const StatusDetails = ({}) => {
  const statusDetails = [
    ["Status", "incoming"],
    ["Sale Type	", "Public"],
    ["Minimum Buy	", "1 BNB"],
    ["Maximum Buy	", "2 BNB"],
    ["You purchased	", "0 BNB"],
  ];

  return (
    <div className="bg-tan p-4 md:p-6 rounded-lg">
      <div className="flex flex-col gap-4">
        {statusDetails.map((detail, i) => (
          <div
            key={i}
            className="flex justify-between pb-2 border-b-2border-primaryBg"
          >
            <span className="mr-2">{detail[0]}</span>
            <span className="text-primary break-all">{detail[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
// EXPORT ==========
export default View;
