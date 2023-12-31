import { useState } from "react";
import Link from "next/link";

import {
  RiHeartLine,
  RiHeartFill,
  RiNotification4Fill,
  RiNotification4Line,
} from "react-icons/ri";

import { Button, ButtonIcon } from "./";
import Image from "next/image";

// ================================
// FORMIK CONTAINER COMPONENT =====
// ================================
const SearchList = ({ list }) => {
  const filterOptions = [
    {
      key: "All Status",
      value: "all",
    },
    {
      key: "KYC",
      value: "kyc",
    },
    {
      key: "Upcoming",
      value: "upcoming",
    },
    {
      key: "In progress",
      value: "progress",
    },
    {
      key: "Filled",
      value: "filled",
    },
    {
      key: "Ended",
      value: "ended",
    },
    {
      key: "Cancelled",
      value: "cancelled",
    },
  ];

  const sortOptions = [
    {
      key: "No filter",
      value: "noFilter",
    },
    {
      key: "Hard Cap",
      value: "hardCap",
    },
    {
      key: "Soft Cap",
      value: "softCap",
    },
    {
      key: "Start Time",
      value: "startTime",
    },
    {
      key: "End Time",
      value: "endTime",
    },
  ];

  const handleChange = e => console.log(e.target.value);

  /////////////////
  // RETURN =======
  return (
    <div className="rounded-md flex flex-col gap-4">
      {/* Search  */}
      <form className="flex flex-col  md:flex-row gap-4">
        <div className="flex-1">
          <SearchInput handleChange={handleChange} />
        </div>
      </form>

      {/* SearchList  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* card */}
        {list.map((item, i) => (
          <CardList key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

const SearchInput = ({ handleChange }) => (
  <div className="flex flex-col">
    <label className={"capitalize mb-2 ml-3"}>Token Name</label>

    <div className="flex gap-3">
      <input
        type={"text"}
        onChange={handleChange}
        name={"token"}
        placeholder={"Enter token name or token symbol"}
        className="p-2 flex-1 bg-tan border-2 border-primaryBg rounded-full focus:outline-primary"
      />
      <Button text={"search"} action={_ => {}} modify={"p-1 rounded-lg h-12"} />
    </div>
  </div>
);

const CardList = item => {
  const [liked, setLiked] = useState(false);
  const [notify, setNotify] = useState(false);

  const { attributes: launchpad } = item.item;

  console.log(launchpad);

  return (
    <div className="p-5 px-6 flex flex-col gap-4 shadow rounded-lg bg-tan ">
      <div className="flex justify-between">
        {/* img  */}
        <div className="">
          {/* <span className="h-14 w-14 block rounded-full bg-neutral-200" /> */}
          <img
            src={launchpad.logoUrl}
            className="h-14 max-w-fit"
            alt={`${launchpad.title} logo`}
          />
          {/* <Image src={launchpad.logoUrl} width={18} height={18} /> */}
        </div>

        {/* tags */}
        <div className="flex gap-1 flex-col justify-center items-end">
          <p className="p-1 pb-1.5 text-secondary font-semibold px-2 bg-secondaryBg rounded-full  text-[12px]">
            Upcoming
          </p>
          <div className="flex gap-1">
            <span className="p-1 pb-1.5 px-2 bg-purple-500 rounded-lg text-[10px]">
              SAFU
            </span>
            <span className="p-1 pb-1.5 px-2 bg-sky-500 rounded-lg text-[10px]">
              Audit
            </span>
            <span className="p-1 pb-1.5 px-2 bg-green-500 rounded-lg text-[10px]">
              KYC
            </span>
          </div>
        </div>
      </div>

      {/* heading   */}
      <div className="">
        <h3 className="uppercase text-2xl font-semibold">{launchpad.title}</h3>
        <p className="uppercase text-neutral-500 font-bold">Fair launch</p>
      </div>

      {/* type */}
      <div className="">
        <p className="capitalize text-sm font-semibold">soft</p>
        <p className="uppercase text-primary text-xl font-bold">50 BNB</p>
      </div>

      {/* progress  */}
      <div className="">
        <p className="capitalize text-sm font-semibold">Progress (50.00%)</p>
        <div className="my-2 rounded-full bg-secondaryBg">
          <span className="block bg-secondary w-6/12 h-3 rounded-full" />
        </div>
        <div className="flex justify-between">
          <span className="uppercase text-sm font-semibold text-neutral-500">
            25 BNB
          </span>
          <span className="uppercase text-sm font-semibold text-neutral-500">
            50 BNB
          </span>
        </div>
      </div>

      {/* liquidity  */}
      <div className="">
        <div className="flex items-baseline justify-between">
          <span className="capitalize text-sm font-semibold ">Liquidity :</span>
          <span className="uppercase  font-semibold text-neutral-500">60%</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="capitalize text-sm font-semibold ">
            Lockup Time:
          </span>
          <span className="uppercase  font-semibold text-neutral-500">
            365 days
          </span>
        </div>
      </div>

      {/* seperator  */}
      <div className="h-[1px] bg-neutral-900 rounded-full" />

      {/* bottom  */}
      <div className="flex justify-between">
        {/* sales  */}
        <div className="flex flex-col">
          <p className="text-sm">Sales starts in:</p>
          <p className="uppercase  font-bold">01:01:12:23</p>
        </div>

        {/* buttons  */}
        <div className="flex gap-1 items-center">
          <ButtonIcon
            icon1={<RiHeartFill className="h-5 w-5 text-secondary" />}
            icon2={<RiHeartLine className="h-5 w-5 text-secondary" />}
            value={liked}
            action={_ => setLiked(!liked)}
          />
          <ButtonIcon
            icon1={<RiNotification4Fill className="h-5 w-5 text-secondary" />}
            icon2={<RiNotification4Line className="h-5 w-5 text-secondary" />}
            value={notify}
            action={_ => setNotify(!notify)}
          />

          {/* <Link href={"/launchpad/123"}>
            <Button text={"view"} action={_ => {}} />
          </Link> */}
          <a href={`/launchpad/${launchpad.tokenAddress}`}>
            <Button text={"view"} action={_ => {}} />
          </a>
        </div>
      </div>
    </div>
  );
};

const SelectInput = ({ options, label, name, handleChange }) => (
  <div className="flex flex-col">
    <label className={"capitalize mb-2"}>{label}</label>

    <select
      className="p-2 flex-1 bg-tan border-2 border-primaryBg rounded focus:outline-primary"
      name={name}
      onChange={handleChange}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.key}
        </option>
      ))}
    </select>
  </div>
);

// EXPORT ====================
export default SearchList;
