import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ContractFactory, ethers } from "ethers";
import { store } from "../store";
import Web3 from "web3";
import Abis from "./abi.json";
import axios from "axios";
import Web3EthContract from "web3-eth-contract";

export const web3Connect = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: "https://bsc-dataseed1.binance.org", //0x39
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/", // 0x61
        },
        chainId: 97,
      },
    },
  };
  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
  });
  const provider = await web3Modal.connect();
  await web3Modal.toggleModal();
  provider.on("chainChanged", chainId => {
    if (chainId == 0x61) {
      return;
    } else {
      disconnect();
    }
    console.log(chainId);
  });

  if (provider.chainId == 0x61) {
    try {
      const ethProvider = new ethers.providers.Web3Provider(provider);
      let network = await provider.chainId;

      //await ethProvider.send("eth_requestAccounts", []);
      const signer = ethProvider.getSigner();
      const account = await signer.getAddress();
      let balanced = await signer.getBalance();
      balanced /= 10 ** 18;
      let balance = await Number(balanced.toFixed(5));

      return {
        account,
        provider,
        balance,
        network,
      };
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("connect to binance test chain");
  }
};

export const disconnect = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: "https://bsc-dataseed1.binance.org",
        },
        chainId: 56,
      },
    },
  };
  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
  });

  await web3Modal.clearCachedProvider();

  return null;
};

export const createToken = async (tokenTypeSelected, values) => {
  const web3 = new Web3(store.getState().blockchain.provider);
  if (tokenTypeSelected == "standard") {
    const abiJson = await fetch("/config/standardAbi.json");
    const abi = await abiJson.json();
    const bytes = await fetch("/config/standard.json");
    const bytesjson = await bytes.json();
    const bytecode = await bytesjson.data.bytecode.object;

    const standardContract = new web3.eth.Contract(abi);
    console.log(`this type was selected ${tokenTypeSelected}`);
    console.log(values);
    console.log(
      values.tokenName,
      values.tokenSymbol,
      values.tokenDecimals,
      web3.utils.toWei(`${values.tokenTotalSupply}`),
      store.getState().blockchain.account,
      web3.utils.toWei("0.01")
    );
    const gassed = await standardContract
      .deploy({
        arguments: [
          values.tokenName,
          values.tokenSymbol,
          values.tokenDecimals,
          web3.utils.toWei(`${values.tokenTotalSupply}`),
          store.getState().blockchain.account,
          web3.utils.toWei("0.01"),
        ],
        data: bytecode,
      })
      .estimateGas({
        from: store.getState().blockchain.account,
        value: web3.utils.toWei("0.01"),
      })
      .then(function (gas) {
        console.log(gas);
        return gas;
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log("gas is ", gassed);

    const standardToken = await standardContract
      .deploy({
        arguments: [
          values.tokenName,
          values.tokenSymbol,
          values.tokenDecimals,
          web3.utils.toWei(`${values.tokenTotalSupply}`),
          store.getState().blockchain.account,
          web3.utils.toWei("0.01"),
        ],
        data: bytecode,
      })
      .send({
        from: store.getState().blockchain.account,
        value: web3.utils.toWei("0.01"),
        gas: gassed,
      })
      .then(tx => {
        return tx._address;
      });
    return standardToken;
  } else if (tokenTypeSelected == "liquidity") {
    console.log(`this type was selected ${tokenTypeSelected}`);
    console.log(values);
    const abiJson = await fetch("/config/liquidityAbi.json");
    const abi = await abiJson.json();
    const bytes = await fetch("/config/liquidity.json");
    const bytesjson = await bytes.json();
    const bytecode = await bytesjson.data.bytecode.object;
    console.log(
      values.tokenName,
      values.tokenSymbol,
      web3.utils.toWei(`${values.tokenTotalSupply}`),
      values.router,
      values.charityAddress,
      values.feeGenerateLiquidity,
      values.feeGenerateYield,
      values.charityPercent,
      store.getState().blockchain.account,
      web3.utils.toWei("0.01")
    );

    const liquidityContract = new web3.eth.Contract(abi);
    const gassed = await liquidityContract
      .deploy({
        arguments: [
          values.tokenName,
          values.tokenSymbol,
          web3.utils.toWei(`${values.tokenTotalSupply}`),
          "0xd99d1c33f9fc3444f8101754abc46c52416550d1",
          values.charityAddress,
          values.feeGenerateLiquidity * 100,
          values.feeGenerateYield * 100,
          values.charityPercent * 100,
          store.getState().blockchain.account,
          web3.utils.toWei("0.01"),
        ],
        data: bytecode,
      })
      .estimateGas({
        from: store.getState().blockchain.account,
        value: web3.utils.toWei("0.01"),
      })
      .then(function (gas) {
        console.log(gas);
        return gas;
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log("Gas is; ", gassed);

    const liquidityToken = await liquidityContract
      .deploy({
        arguments: [
          values.tokenName,
          values.tokenSymbol,
          web3.utils.toWei(`${values.tokenTotalSupply}`),
          "0xd99d1c33f9fc3444f8101754abc46c52416550d1",
          values.charityAddress,
          values.feeGenerateLiquidity * 100,
          values.feeGenerateYield * 100,
          values.charityPercent * 100,
          store.getState().blockchain.account,
          web3.utils.toWei("0.01"),
        ],
        data: bytecode,
      })
      .send({
        from: store.getState().blockchain.account,
        value: web3.utils.toWei("0.01"),
        gas: gassed,
      })
      .then(tx => {
        return tx._address;
      });
    return liquidityToken;
  } else if (tokenTypeSelected == "baby") {
    console.log(`this type was selected ${tokenTypeSelected}`);
    console.log(values);
    const abiJson = await fetch("/config/babyAbi.json");
    const abi = await abiJson.json();
    const bytes = await fetch("/config/baby.json");
    const bytesjson = await bytes.json();
    const bytecode = await bytesjson.data.bytecode.object;

    const babyContract = new web3.eth.Contract(abi);

    const gassed = await babyContract
      .deploy({
        arguments: [
          values.tokenName,
          values.tokenSymbol,
          web3.utils.toWei(`${values.tokenTotalSupply}`),
          [
            values.rewardToken,
            "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
            values.marketingWallet,
            "0x6d78A4A7F840C09FDF5Af422a4FBDFA99E250Bee",
          ],
          [values.tokenRewardFee, values.autoLiquidity, values.marketingFee],
          web3.utils.toWei(`${values.minTokenBalance}`),
          store.getState().blockchain.account,
          web3.utils.toWei("0.01"),
        ],
        data: bytecode,
      })
      .estimateGas({
        from: store.getState().blockchain.account,
        value: web3.utils.toWei("0.01"),
      })
      .then(function (gas) {
        console.log(gas);
        return gas;
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log("gas is", gassed);
    // Deploy the contract with args passed
    await babyContract
      .deploy({
        arguments: [
          values.tokenName,
          values.tokenSymbol,
          web3.utils.toWei(`${values.tokenTotalSupply}`),
          [
            values.rewardToken,
            "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
            values.marketingWallet,
            "0x6d78A4A7F840C09FDF5Af422a4FBDFA99E250Bee",
          ],
          [values.tokenRewardFee, values.autoLiquidity, values.marketingFee],
          web3.utils.toWei(`${values.minTokenBalance}`),
          store.getState().blockchain.account,
          web3.utils.toWei("0.01"),
        ],
        data: bytecode,
      })
      .send({
        from: store.getState().blockchain.account,
        value: web3.utils.toWei("0.01"),
        gas: gassed,
      })
      .then(tx => {
        // When successfull returns the contract address of the contracr
        console.log(tx._address);
        return tx._address;
      });
    return babyContract;
  } else if (tokenTypeSelected == "buyback") {
    console.log(`this type was selected ${tokenTypeSelected}`);
    console.log(values);

    const abiJson = await fetch("/config/buybackAbi.json");
    const abi = await abiJson.json();
    const bytes = await fetch("/config/buyback.json");
    const bytesjson = await bytes.json();
    const bytecode = await bytesjson.data.bytecode.object;

    const buybackContract = new web3.eth.Contract(abi);

    const gassed = await buybackContract
      .deploy({
        arguments: [
          values.tokenName,
          values.tokenSymbol,
          web3.utils.toWei(`${values.tokenTotalSupply}`),
          values.rewardToken,
          "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
          [
            values.liquidityFee,
            values.buybackFee,
            values.reflectionFee,
            values.marketingFee,
            100,
          ],
          store.getState().blockchain.account,
          store.getState().blockchain.account,
          web3.utils.toWei("0.01"),
        ],
        data: bytecode,
      })
      .estimateGas({
        from: store.getState().blockchain.account,
        value: web3.utils.toWei("0.01"),
      })
      .then(function (gas) {
        return gas;
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log("Gas is: ", gassed);

    await buybackContract
      .deploy({
        arguments: [
          values.tokenName,
          values.tokenSymbol,
          web3.utils.toWei(`${values.tokenTotalSupply}`),
          values.rewardToken,
          "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
          [
            values.liquidityFee,
            values.buybackFee,
            values.reflectionFee,
            values.marketingFee,
            100,
          ],
          store.getState().blockchain.account,
          store.getState().blockchain.account,
          web3.utils.toWei("0.01"),
        ],
        data: bytecode,
      })
      .send({
        from: store.getState().blockchain.account,
        value: web3.utils.toWei("0.01"),
        gas: gassed,
      })
      .then(tx => {
        console.log(tx._address);
        return tx._address;
      });
    return buybackContract;
  }
};

export const detectToken = async tokenAddress => {
  const web3 = new Web3(store.getState().blockchain.provider);

  try {
    const contract = new web3.eth.Contract(Abis, tokenAddress);
    const name = await contract.methods.name().call();
    const decimals = await contract.methods.decimals().call();
    const symbol = await contract.methods.symbol().call();
    const totalSupply = await contract.methods.totalSupply().call();
    totalSupply /= 10 ** decimals;
    console.log(name, decimals, symbol);
    return [
      ["name", name],
      ["decimals", decimals],
      ["symbol", symbol],
      ["Total Supply", totalSupply],
    ];
  } catch (err) {
    throw err;
  }
};
export const detectTokenName = async tokenAddress => {
  const web3 = new Web3(store.getState().blockchain.provider);

  try {
    const contract = new web3.eth.Contract(Abis, tokenAddress);
    const name = await contract.methods.name().call();
    const decimals = await contract.methods.decimals().call();
    const symbol = await contract.methods.symbol().call();
    const totalSupply = await contract.methods.totalSupply().call();
    totalSupply /= 10 ** decimals;
    console.log(name, decimals, symbol);
    return [name];
  } catch (err) {
    throw err;
  }
};

export const checkApproval = async (tokenAddress, factoryAddress) => {
  const web3 = new Web3(store.getState().blockchain.provider);
  try {
    const tokenContract = new web3.eth.Contract(Abis, tokenAddress);
    const approvedAmount = await tokenContract.methods
      .allowance(store.getState().blockchain.account, factoryAddress)
      .call();
    await console.log(approvedAmount);
    if (approvedAmount >= 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

export const ApproveFactory = async (tokenToApprove, factoryAddress) => {
  const web3 = new Web3(store.getState().blockchain.provider);
  console.log(tokenToApprove);

  try {
    const tokenContract = new web3.eth.Contract(Abis, tokenToApprove);

    await tokenContract.methods
      .approve(factoryAddress, web3.utils.toWei("100000000000"))
      .send({
        from: store.getState().blockchain.account,
      });

      console.log('Log approved')
    return true;
  } catch (err) {
    throw err;
  }
};

export const createPresale = async values => {
  const web3 = new Web3(store.getState().blockchain.provider);
  const abiJson = await fetch("/config/launchpadFactoryAbi.json");
  const abi = await abiJson.json();

  const socials = [
    values.telegram,
    values.discord,
    values.facebook,
    values.github,
    values.instagram,
    values.reddit,
    values.twitter,
  ];

  const contract = new web3.eth.Contract(
    abi,
    "0x5C404cB8d8aecD7f01a1c3027CFF29ee92F1F049"
  );
  try {
    const fee = await contract.methods.flatFee().call();
    console.log(fee);
    const startDate = new Date(values.startDate);
    const startTime = await Math.floor(startDate.getTime() / 1000);
    const endDate = new Date(values.endDate);
    const endTime = await Math.floor(endDate.getTime() / 1000);
    const named = await detectTokenName(values.tokenAddress);

    // MUST FOLLOW THE ABI INPUT ORDER
    await contract.methods
      .create(
        startTime,
        endTime,
        web3.utils.toWei(`${values.minimumBuy}`),
        web3.utils.toWei(`${values.maximum}`),
        values.tokenAddress,
        web3.utils.toWei(`${values.hardcapTokens}`),
        web3.utils.toWei(`${values.softcapTokens}`),
        values.presaleRate,
        values.listingRate,
        values.liquidityPercent,
        values.feeOptions,
        values.refundType
      )
      .send({
        from: store.getState().blockchain.account,
        value: fee,
      })
      .then(res => {
        const data = {
          data: {
            title: named[0],
            description: values.description,
            tokenAddress: res.events[0].address,
            website: values.website,
            logoUrl: values.logoURL,
            socials: {
              socials,
            },
            hardcap: values.hardcapTokens,
            softcap: values.softcapTokens,
            liquidityPercent: values.liquidityPercent,
            startTime: startTime,
            endTime: endTime,
            badges: {
              kyc: "false",
              audit: "false",
            },
            type: "Presale",
          },
        };
        axios
          .post("https://backpad.herokuapp.com/api/presales", data)
          .then(alert("Success"))
          .catch(err => console.log(err));
        console.log(res);
        return res;
      });
  } catch (err) {
    throw err;
  }
};

export const createFairLaunch = async values => {
  const web3 = new Web3(store.getState().blockchain.provider);
  const abiJson = await fetch("/config/fairlaunchfactoryAbi.json");
  const abi = await abiJson.json();

  const contract = new web3.eth.Contract(
    abi,
    "0xB2A4b59df27b94c5d4369A8D321Fcf771E670BF8l"
  );
  try {
    const fee = await contract.methods.flatFee().call();
    console.log(fee);
    const startDate = new Date(values.startDate);
    const startTime = await Math.floor(startDate.getTime() / 1000);
    const endDate = new Date(values.endDate);
    const endTime = await Math.floor(endDate.getTime() / 1000);
    const wethAddr = "";
    const uniswapFactory = "";
    const uniSwapRouter = " ";

    // MUST FOLLOW THE ABI INPUT ORDER
    await contract.methods
      .create(
        startTime,
        endTime,
        100 - values.liquidityPercent,
        values.tokenAddress,
        wethAddr,
        uniswapFactory,
        uniSwapRouter, // values.router
        1,
        values.hardcapTokens,
        values.softcapTokens,
        values.presaleRate,
        values.listingRate,
        values.liquidityPercent,
        values.feeOptions,
        values.refundType
      )
      .send({
        from: store.getState().blockchain.account,
        value: fee,
      })
      .then(res => {
        console.log(res);
        return res;
      });
  } catch (err) {
    throw err;
  }
};

export const createDutchAuction = async values => {
  const web3 = new Web3(store.getState().blockchain.provider);
  const abiJson = await fetch("/config/launchpadFactoryAbi.json");
  const abi = await abiJson.json();

  const contract = new web3.eth.Contract(
    abi,
    "0x5C404cB8d8aecD7f01a1c3027CFF29ee92F1F049"
  );
  try {
    const fee = await contract.methods.flatFee().call();
    console.log(fee);
    const startDate = new Date(values.startDate);
    const startTime = await Math.floor(startDate.getTime() / 1000);
    const endDate = new Date(values.endDate);
    const endTime = await Math.floor(endDate.getTime() / 1000);

    // MUST FOLLOW THE ABI INPUT ORDER
    await contract.methods
      .create(
        startTime,
        endTime,
        values.minimumBuy,
        values.maximum,
        values.tokenAddress,
        values.hardcapTokens,
        values.softcapTokens,
        values.presaleRate,
        values.listingRate,
        values.liquidityPercent,
        values.feeOptions,
        values.refundType
      )
      .send({
        from: store.getState().blockchain.account,
        value: fee,
      })
      .then(res => {
        console.log(res);
        return res;
      });
  } catch (err) {
    throw err;
  }
};

export const createPrivateSale = async values => {
  const web3 = new Web3(store.getState().blockchain.provider);
  const abiJson = await fetch("/config/launchpadFactoryAbi.json");
  const abi = await abiJson.json();

  const contract = new web3.eth.Contract(
    abi,
    "0x5C404cB8d8aecD7f01a1c3027CFF29ee92F1F049"
  );
  try {
    const fee = await contract.methods.flatFee().call();
    console.log(fee);
    const startDate = new Date(values.startDate);
    const startTime = await Math.floor(startDate.getTime() / 1000);
    const endDate = new Date(values.endDate);
    const endTime = await Math.floor(endDate.getTime() / 1000);

    // MUST FOLLOW THE ABI INPUT ORDER
    await contract.methods
      .create(
        startTime,
        endTime,
        values.minimumBuy,
        values.maximum,
        values.tokenAddress,
        values.hardcapTokens,
        values.softcapTokens,
        values.presaleRate,
        values.listingRate,
        values.liquidityPercent,
        values.feeOptions,
        values.refundType
      )
      .send({
        from: store.getState().blockchain.account,
        value: fee,
      })
      .then(res => {
        console.log(res);
        return res;
      });
  } catch (err) {
    throw err;
  }
};

export const createSubscription = async values => {
  const web3 = new Web3(store.getState().blockchain.provider);
  const abiJson = await fetch("/config/launchpadFactoryAbi.json");
  const abi = await abiJson.json();

  const socials = [
    values.telegram,
    values.discord,
    values.facebook,
    values.github,
    values.instagram,
    values.reddit,
    values.twitter,
  ];

  const contract = new web3.eth.Contract(
    abi,
    "0x5C404cB8d8aecD7f01a1c3027CFF29ee92F1F049"
  );
  try {
    const fee = await contract.methods.flatFee().call();
    console.log(fee);
    const startDate = new Date(values.startDate);
    const startTime = await Math.floor(startDate.getTime() / 1000);
    const endDate = new Date(values.endDate);
    const endTime = await Math.floor(endDate.getTime() / 1000);
    const named = await detectTokenName(values.tokenAddress);

    // MUST FOLLOW THE ABI INPUT ORDER
    await contract.methods
      .create(
        startTime,
        endTime,
        1,
        web3.utils.toWei(`${values.hardcapTokensPerUser}`),
        values.tokenAddress,
        web3.utils.toWei(`${values.hardcapTokens}`),
        web3.utils.toWei(`${values.softcapTokens}`),
        values.subscriptionRate,
        values.listingRate,
        values.liquidityPercent,
        values.feeOptions,
        values.refundType
      )
      .send({
        from: store.getState().blockchain.account,
        value: fee,
      })
      .then(res => {
        const data = {
          data: {
            title: named[0],
            description: values.description,
            tokenAddress: res.events[0].address,
            website: values.website,
            logoUrl: values.logoURL,
            socials: {
              socials,
            },
            hardcap: values.hardcapTokens,
            softcap: values.softcapTokens,
            liquidityPercent: values.liquidityPercent,
            startTime: startTime,
            endTime: endTime,
            badges: {
              kyc: "false",
              audit: "false",
            },
            type: "Subscription",
          },
        };
        axios
          .post("https://backpad.herokuapp.com/api/presales", data)
          .then(alert("Success"))
          .catch(err => console.log(err));
        console.log(res);
        return res;
      });
  } catch (err) {
    throw err;
  }
};

export const createAirdrop = _ => {};
