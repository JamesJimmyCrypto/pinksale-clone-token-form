import { useEffect, useState } from "react";
import axios from "axios";

import { SearchList } from "../../components";

import { CommonContent } from "../index";

const list = () => {
  const [presaleList, setPresaleList] = useState([]);

  useEffect(() => {
    const fetchCoins = () => {
      const options = {
        method: "GET",
        url: "https://backpad.herokuapp.com/api/presales",
        params: {},
        headers: {},
      };

      axios
        .request(options)
        // RESPONSE.DATA is the where all the presales resides
        .then(response => setPresaleList(response.data.data))
        .catch(error => console.error(error));
    };
    fetchCoins();
  }, []);
  return (
    <div>
      <CommonContent title={"Current Airdrops"} />

      <SearchList list={presaleList} />
    </div>
  );
};

export default list;
