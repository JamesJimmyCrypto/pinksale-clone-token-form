import { useEffect, useState } from "react";
import axios from "axios";

import { RiLineChartLine } from "react-icons/ri";

const TopBar = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = () => {
      const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
          "tiers[0]": "1",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "10",
          offset: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "595571613emsh7b97b6ae7502821p16b159jsnf1a33bdb6570",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(response => setCoins(response.data.data.coins))
        .catch(error => console.error(error));
    };

    fetchCoins();
    setTimeout(_ => fetchCoins(), [10000]);
  }, []);

  return (
    <div className="bg-tan mt-0.5 flex items-center overflow-x-auto   p-3 px-5">
      <div className="flex gap-4">
        <div className="flex items-center">
          <RiLineChartLine className="h-5 w-5 text-primary mr-1" />
          <small className="text-sm font-semibold">Trending</small>
        </div>

        <div className="flex items-center gap-3">
          {coins.map((coin, i) => (
            <CoinLinkItem key={i} item={coin} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CoinLinkItem = ({ item }) => (
  <div className="flex gap-2">
    <p className="w-max"># {item.rank}</p>
    <p className="uppercase font-semibold text-primary">{item.symbol}</p>
  </div>
);

export default TopBar;
