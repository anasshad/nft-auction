const { assert } = require("chai");

const AuctionToken = artifacts.require("AuctionToken");
const GradientToken = artifacts.require("GradientToken");
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("AuctionToken", function(accounts) {
  let auctionToken, gradientToken;
  let tokenId;

  before(async () => {
    gradientToken = await GradientToken.deployed();
    auctionToken = await AuctionToken.deployed(gradientToken.address);
  });

  describe("Deployment", async () => {
    it("has a name", async () => {
      const name = await auctionToken.name();
      assert.equal(name, "AuctionToken");
    });
  });

  describe("Auction creation", async () => {
    it("creates an auction", async () => {
      const tokenMinted = await gradientToken.mint("#A8E99A", "#8A3C99", {
        value: web3.utils.toWei("1", "ether"),
        from: accounts[0],
      });
      tokenId = tokenMinted.logs[0].args.tokenId;
      console.log(tokenMinted);
      gradientToken.approve(auctionToken.address, tokenId, {
        from: accounts[0],
      });
      const result = await auctionToken.createAuction(
        tokenId,
        web3.utils.toWei("1", "ether"),
        Date.now(),
        Date.now() + 86400,
        { from: accounts[0] }
      );
      assert.equal(
        result.logs[0].args._tokenId.toString(),
        tokenId.toString(),
        "Auction should be created with correct tokenId"
      );
    });
  });

  describe("Bidding", async () => {
    it("creates a new bid", async () => {
      const result = await auctionToken.bid(tokenId, {
        value: web3.utils.toWei("1.2", "ether"),
        from: accounts[1],
      });
      assert.equal(
        result.logs[0].args._bidAmount,
        web3.utils.toWei("1.2", "ether")
      );
      assert.equal(result.logs[0].args.bidder, accounts[1]);
    });
  });
});
