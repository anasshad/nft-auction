const { assert, expect } = require("chai");

const GradientToken = artifacts.require("GradientToken");

contract("GradientToken", function(accounts) {
  let contract;

  before(async () => {
    contract = await GradientToken.deployed();
  });

  describe("Deployment", async () => {
    it("deploys successfully", async () => {
      const address = contract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await contract.name();
      assert.equal(name, "GradientToken");
    });

    it("has a symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "GRT");
    });
  });

  describe("Minting", async () => {
    let tokenId;
    it("should mint token", async () => {
      const result = await contract.mint("#A8E99A", "#8A3C99", {
        from: accounts[0],
      });
      tokenId = result.logs[0].args.tokenId;
      const balanceOf = await contract.balanceOf(accounts[0]);
      assert.equal(balanceOf, 1, "Balance of account should be correct");
    });

    it("should return owner of token", async () => {
      const owner = await contract.ownerOf(tokenId);
      assert.equal(owner, accounts[0], "Owner should be correct");
    });

    it("should return total supply", async () => {
      const totalSupply = await contract.totalSupply();
      assert.equal(totalSupply, 1, "Total supply should be correct");
    });

    it("should return tokens owned by owner", async () => {
      let tokens = [];
      const balance = await contract.balanceOf(accounts[0]);
      for (let i = 0; i < balance; i++) {
        let tokenOfOwnerByIndex = await contract.tokenOfOwnerByIndex(
          accounts[0],
          i
        );
        tokens.push(tokenOfOwnerByIndex.toString());
      }

      const expected = ["5974315368"];

      expect(tokens).to.eql(expected);
      const gradient = await contract.tokenIdToGradient(tokens[0]);
      assert.equal(gradient[0], "#A8E99A", "inner color should be correct");
      assert.equal(gradient[1], "#8A3C99", "outer color should be correct");
    });
  });
});
