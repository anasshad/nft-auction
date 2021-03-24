import React from "react";
import { Link } from "@reach/router";

const Home = () => {
  return (
    <div>
      <h1>Homes</h1>
      <p>You can:</p>
      <ul>
        <li>
          <Link to="mint-gradient">Mint new gradients</Link>
        </li>
        <li>
          <Link to="mygradients">View your gradients</Link>
        </li>
        <li>
          <Link to="auctions">Auction your gradients</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
