import React, { useEffect, createContext, useState } from "react";

//IMPORT ABIS
import GradientToken from "./abis/GradientToken.json";
import AuctionToken from "./abis/AuctionToken.json";
import getWeb3 from "./getWeb3";

const GlobalContext = createContext({
  web3: null,
  gradientToken: null,
  auctionToken: null,
  accounts: [],
});

const GlobalProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [gradientToken, setGradientToken] = useState(null);
  const [auctionToken, setAuctionToken] = useState(null);

  useEffect(() => {
    async function callWeb3() {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("asdfas");

      // Use web3 to get the user's accounts.
      const getAccounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      //GRADIENT TOKEN
      const gradientTokenNetwork = GradientToken.networks[networkId];
      const gt = new web3.eth.Contract(
        GradientToken.abi,
        gradientTokenNetwork && gradientTokenNetwork.address
      );

      //AUCTION TOKEN
      const auctionTokenNetwork = AuctionToken.networks[networkId];
      const at = new web3.eth.Contract(
        AuctionToken.abi,
        auctionTokenNetwork && auctionTokenNetwork.address
      );

      // Set web3, accounts, and contract to the state,
      setWeb3(web3);
      setAccounts(getAccounts);
      setGradientToken(gt);
      setAuctionToken(at);
    }
    callWeb3();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ web3, account: accounts[0], gradientToken, auctionToken }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
