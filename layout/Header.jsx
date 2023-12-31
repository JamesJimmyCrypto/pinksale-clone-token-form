import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

import { SiBinance as Binance, SiEthereum } from "react-icons/si";
import { IoWalletOutline as Wallet } from "react-icons/io5";
import { RiMenuLine, RiMenuFoldLine } from "react-icons/ri";

import { Button } from "../components";

import polygonIcon from "../assets/polygon-matic-logo.svg";
import avalancheIcon from "../assets/avalanche-avax-logo.svg";
import fantomIcon from "../assets/fantom-ftm-logo.svg";
import cronosIcon from "../assets/cronos-cro-logo.svg";

// imports BLOCKCHAIN
import { web3Connect, disconnect } from "../global/utils/connect";
import { updateData } from "@/global/slice/blockchainSlice";
import { useDispatch, useSelector } from "react-redux";

// ===============================
// HEADER LAYOUT COMPONENTS ======
// ===============================
const Header = ({ sidebarOpen, setSidebarOpen, mobileMenu, setMobileMenu }) => (
  <header className="w-full bg-tan p-4 md:px-8">
    <div className="w-full flex flex-row justify-between items-center">
      <div className="items-center gap-3 hidden md:flex">
        {sidebarOpen ? (
          <RiMenuFoldLine
            onClick={_ => {
              setSidebarOpen(!sidebarOpen);
            }}
            className="h-7 w-7 cursor-pointer text-primary"
          />
        ) : (
          <RiMenuLine
            onClick={_ => {
              setSidebarOpen(!sidebarOpen);
            }}
            className="h-7 w-7 cursor-pointer text-primary"
          />
        )}
        <Brand />
      </div>

      {/* mobile */}
      <div className="flex items-center gap-3 md:hidden">
        {mobileMenu ? (
          <RiMenuFoldLine
            onClick={_ => {
              setMobileMenu(!mobileMenu);
            }}
            className="h-7 w-7 cursor-pointer text-primary"
          />
        ) : (
          <RiMenuLine
            onClick={_ => {
              setMobileMenu(!mobileMenu);
            }}
            className="h-7 w-7 cursor-pointer text-primary"
          />
        )}
        <Brand />
      </div>

      <Account />
    </div>
  </header>
);

////////////////////////////
// EXTENDED COMPONENTS /////
const Brand = () => (
  //<h6 className="text-2xl font-bold text-neutral-600">CryptoPad</h6>
  <Image src={"/logo300.png"} height={"90px"} width={"300px"}/>
);

const Account = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector(state => state.blockchain);
  const connect = () => {
    if (blockchain.account) {
      disconnect().then(data => dispatch(updateData(data)));
    } else {
      web3Connect().then(data => dispatch(updateData(data)));
    }
  };
  const availableNetworks = [
    {
      name: "bsc Testnet",
      icon: <Binance size={20} />,
    },
    {
      name: "ethereum",
      icon: <SiEthereum size={20} />,
    },
    {
      name: "matic",
      icon: <Image alt="matic logo" src={polygonIcon} width={30} height={30} />,
    },
    {
      name: "avalanche",
      icon: (
        <Image
          alt="avalanche logo"
          src={avalancheIcon}
          width={30}
          height={30}
        />
      ),
    },
    {
      name: "fantom",
      icon: <Image alt="fantom logo" src={fantomIcon} width={30} height={30} />,
    },
    {
      name: "cronos",
      icon: <Image alt="cronos logo" src={cronosIcon} width={30} height={30} />,
    },
  ];

  const [network, setNetwork] = useState({
    name: "bsc Testnet",
    icon: <Binance size={20} />,
  });

  const [showModal, setShowModal] = useState(false);
  const truncate = (input, len) =>
    input.length > len
      ? `${input.substring(0, len)}...${input.slice(-len + 1, input.len)}`
      : input;

  return (
    <>
      <div className="w-full flex flex-row justify-end items-center space-x-2">
        <div className="">
          <NetworkButton
            action={_ => setShowModal(true)}
            network={network}
            availableNetworks={availableNetworks}
          />
        </div>
        {blockchain.account == null ? (
          <>
            <Button
              text={"connect"}
              action={_ => connect()}
              modify={
                "bg-primary font-bold text-white rounded-full hover:bg-[#3b0619] "
              }
            />
          </>
        ) : (
          <>
            <Address
              address={truncate(blockchain.account, 5)}
              balance={{ amount: blockchain.balance, currency: "BNB" }}
            />
          </>
        )}
      </div>

      <Modal show={showModal} handleClose={_ => setShowModal(false)}>
        <div className="grid grid-cols-2 gap-4">
          {availableNetworks.map((network, i) => (
            <NetworkItem
              key={i}
              network={network}
              setNetwork={setNetwork}
              setShowModal={setShowModal}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

const NetworkButton = ({ network, action }) => (
  <button
    onClick={action}
    className="bg-secondaryBg border border-secondary rounded-full px-2 py-1 flex flex-row justify-end items-center"
  >
    <span className="text-secondary p-1">{network.icon}</span>
    <span className="w-full h-full flex flex-col items-end text-secondary font-semibold">
      <p className="uppercase sm:block hidden ml-2">{network.name}</p>
    </span>
  </button>
);

const NetworkItem = ({ network, setNetwork, setShowModal }) => (
  <button
    onClick={_ => {
      setNetwork(network);
      setShowModal(false);
    }}
    className="p-4 flex-1 rounded-lg bg-tan flex flex-col items-center justify-center gap-2"
  >
    <span className="text-secondary p-1">{network.icon}</span>
    <span className="uppercase ">{network.name}</span>
  </button>
);

const Address = ({ address, balance }) => {
  const router = useRouter();

  return (
    <button
      onClick={_ => router.push("/me")}
      className="bg-ban rounded-full px-2 py-1 flex flex-row justify-end items-center "
    >
      <span className="sm:flex hidden mr-2 w-full h-full  flex-col items-end -space-y-1 text-greey">
        <small className="text-primary">{address}</small>
        <p>
          {balance.amount} {balance.currency}
        </p>
      </span>
      <span className="rounded-full border-[.8px] border-white text-greey p-1">
        <Wallet size={20} />
      </span>
    </button>
  );
};

const Modal = ({ handleClose, show, children }) => {
  return (
    <div
      className={`${
        show ? " block " : " hidden "
      } fixed top-0 left-0 w-full h-full text-neutral-600 bg-neutral-500 bg-opacity-60 backdrop-blur-lg backdrop-filter z-10`}
    >
      <section className="p-4 fixed top-[50%] -translate-x-[50%] left-[50%] -translate-y-[50%] md:w-[50%] w-[80%] bg-ban rounded-lg z-10">
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-semibold">Choose a network</p>
          <button
            type="button"
            className="bg-rose-500 text-neutral-100 p-2 px-3 rounded-lg"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Header;
