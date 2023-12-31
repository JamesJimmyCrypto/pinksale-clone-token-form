import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import {
  RiHome3Line,
  RiRocketLine,
  RiShieldKeyholeLine,
  RiCheckboxBlankCircleFill,
  RiTelegramLine,
  RiTwitterLine,
  RiFacebookBoxLine,
  RiGiftLine,
} from "react-icons/ri";

const scrollBarStyle =
  "overflow-y-auto scrollbar-thin scrollbar-thumb-primary  scrollbar-track-primaryBg";

// import { SiBinance as Binance } from "react-icons/si";

const SideBar = ({
  sidebarOpen,
  setSidebarOpen,
  mobileMenu,
  setMobileMenu,
}) => {
  const navLinks = [
    {
      single: true,
      pathname: "/",
      text: "Home",
      icon: () => {
        return <RiHome3Line className="text-inherit h-7 w-7" />;
      },
    },

    {
      single: false,
      text: "launchpad",
      icon: () => {
        return <RiRocketLine className="text-inherit h-7 w-7" />;
      },
      dropdowns: [
        {
          pathname: "/launchpad/token",
          text: "create token",
        },

        {
          pathname: "/launchpad/create",
          text: "create launchpad",
        },
        {
          pathname: "/launchpad/fairlaunch",
          text: "create Fair lunch",
        },
        // {
        //   pathname: "/launchpad/dutch-auction",
        //   text: "create dutch auction",
        // },
        {
          pathname: "/launchpad/subscription-pool",
          text: "create subscription",
        },
        {
          pathname: "/launchpad/list",
          text: "launchpad list",
        },
      ],
    },
    {
      single: false,
      text: "private sale",
      icon: () => {
        return <RiShieldKeyholeLine className="text-inherit h-7 w-7" />;
      },
      dropdowns: [
        {
          pathname: "/private-sale/create",
          text: "Create private sale",
        },
        {
          pathname: "/private-sale/list",
          text: "private Sale list",
        },
      ],
    },
    {
      single: false,
      text: "airdrop",
      icon: () => {
        return <RiGiftLine className="text-inherit h-7 w-7" />;
      },
      dropdowns: [
        {
          pathname: "/airdrop/create",
          text: "Create Airdrop",
        },
        {
          pathname: "/airdrop/list",
          text: "Airdrop List",
        },
      ],
    },
    {
      single: true,
      pathname: "https://telegram.org",
      text: "Telegram",
      icon: () => {
        return <RiTelegramLine className="text-inherit h-7 w-7" />;
      },
    },
    {
      single: true,
      pathname: "https://twitter.com",
      text: "Twitter",
      icon: () => {
        return <RiTwitterLine className="text-inherit h-7 w-7" />;
      },
    },
    {
      single: true,
      pathname: "https://facebook.com",
      text: "Facebook",
      icon: () => {
        return <RiFacebookBoxLine className="text-inherit h-7 w-7" />;
      },
    },
  ];

  return (
    <>
      <aside
        className={`pageHeight  ${
          sidebarOpen ? "w-52" : "w-18"
        } border-r border-primary  animation-300 hidden md:block ${scrollBarStyle}`}
      >
        <nav className="">
          {navLinks.map((link, i) => (
            <NavItem
              key={i}
              item={link}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              setMobileMenu={setMobileMenu}
            />
          ))}
        </nav>
      </aside>

      <MobileNav
        navLinks={navLinks}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </>
  );
};

///////////////////////
// EXTENDED COMPONENTS
const NavItem = ({ item, sidebarOpen, setMobileMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();

  return item.single ? (
    <>
      {" "}
      {(item.active = router.pathname === item.pathname ? true : false)}
      <Link href={item.pathname}>
        <div
          onClick={_ => {
            setMobileMenu(false);
            setDropdownOpen(false);
          }}
          className={`p-3 px-4  cursor-pointer ${
            item.active && "bg-primary text-primaryBg hover:text-primary"
          } hover:bg-primaryBg text-primary  flex items-center gap-3`}
        >
          <span className={`p-1 `}>{item.icon()}</span>
          <span className={`${!sidebarOpen && "hidden"} capitalize`}>
            {item.text}
          </span>
        </div>
      </Link>
    </>
  ) : (
    <>
      {/* {console.log(item.dropdowns)} */}
      {item.dropdowns.map(
        drop => (drop.active = router.pathname === drop.pathname ? true : false)
      )}
      <div
        className={`p-3 px-4  cursor-pointer ${
          router.pathname.includes(item.text.replace(" ", "-")) &&
          "bg-primary text-primaryBg hover:text-primary"
        } hover:bg-primaryBg text-primary `}
        onClick={_ => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        <div className="flex items-center gap-3 ">
          <span className={`p-1 `}>{item.icon()}</span>
          <span className={`${!sidebarOpen && "hidden"} capitalize `}>
            {item.text}
          </span>
        </div>
      </div>
      <div className="relative">
        {!sidebarOpen && dropdownOpen ? (
          <div
            className={`${
              !dropdownOpen && "hidden"
            } absolute -top-6 left-14 bg-stone-200 duration-300 w-52 mb-4`}
          >
            {item.dropdowns.map((drop, i) => (
              <Link href={drop.pathname} key={i}>
                <div
                  onClick={_ => setDropdownOpen(false)}
                  className={`capitalize cursor-pointer flex items-center py-2 ${
                    drop.active ? "text-primary underline" : "text-neutral-400 "
                  } hover:text-secondary ml-4`}
                >
                  <RiCheckboxBlankCircleFill className="mr-2 h-2 w-2" />
                  {drop.text}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`${!dropdownOpen && "hidden"}   bg-stone-200 mb-4`}>
            {item.dropdowns.map((drop, i) => (
              <Link href={drop.pathname} key={i}>
                <div
                  onClick={_ => {
                    setMobileMenu(false);
                  }}
                  className={`capitalize cursor-pointer flex items-center py-2 ${
                    drop.active ? "text-primary underline" : "text-neutral-400 "
                  } hover:text-secondary ml-4`}
                >
                  <RiCheckboxBlankCircleFill className="mr-2 h-2 w-2" />
                  {drop.text}
                </div>
              </Link>
            ))}
          </div>
        )}{" "}
      </div>
    </>
  );
};

const MobileNav = ({
  navLinks,
  mobileMenu,
  setMobileMenu,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <aside
      className={`absolute top-0 ${
        mobileMenu ? "left-0" : "-left-[70%]"
      } text-white ${scrollBarStyle} bg-lime-50 bg-opacity-60 backdrop-blur-xl backdrop-filter bg-clip-padding z-20 w-[70%] pageHeight duration-300`}
    >
      <nav className="">
        {navLinks.map((link, i) => (
          <NavItem
            key={i}
            item={link}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setMobileMenu={setMobileMenu}
          />
        ))}
      </nav>
    </aside>
  );
};

const Network = ({ network }) => (
  <button className="bg-ban rounded-full px-2 py-1 flex flex-row justify-end items-center space-x-2">
    <span className="text-greey p-1">{network.icon}</span>
    <span className="w-full h-full flex flex-col items-end -space-y-1 text-greey">
      <p className="uppercase">{network.name}</p>
    </span>
  </button>
);

export default SideBar;
