import React, { Component } from "react";
import { Router } from "@reach/router";

import Topbar from "./Topbar";
import GradientCreator from "./GradientCreator";
import MyGradients from "./MyGradients";
import GradientAuction from "./Auction";
import Home from "./Home";

import "./App.css";

import { GlobalProvider } from "../GlobalContext";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Topbar />
        <GlobalProvider>
          <Router>
            <Home path="/" />
            <GradientCreator mintToken={this.mintToken} path="mint-gradient" />
            <MyGradients path="mygradients" />
            <GradientAuction path="auctions" />
          </Router>
        </GlobalProvider>
      </div>
    );
  }
}

export default App;
