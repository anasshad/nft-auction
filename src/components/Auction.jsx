import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import AuctionContainer from './AuctionContainer'

const Auction = () => {
  const { web3, gradientToken, auctionToken, account } = useContext(
    GlobalContext
  );
  const [allAuctions, setAllAuctions] = useState([]);

  useEffect(() => {
    async function fetchAuctions() {
      let auctions = [],
        auction;
      const totalSupply = await auctionToken.methods.totalHoldings().call();
      console.log(totalSupply.toNumber());
      for (let i = 0; i < totalSupply.toNumber(); i++) {
        auction = await auctionToken.methods.auctions(i).call();
        auctions.push(auction);
      }
      setAllAuctions(auctions);
    }
    if (auctionToken) fetchAuctions();
  }, [auctionToken]);

  console.log(allAuctions);

  return <div><h1>Auctions</h1>
  {
    allAuctions.map((auction, index) => (
      <AuctionContainer key={index} tokenId={auction.tokenId} endTime={auction.endTime}/>
    ))
  }
  </div>;
};

export default Auction;
