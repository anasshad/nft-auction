const { assert } = require("chai");

const GradientToken = artifacts.require("GradientToken");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("GradientToken", function(accounts) {
  let contract;

  before(async () => {
    contract = await GradientToken.deployed();
  });

  describe("Minting", async () => {
    it("should mint token", async () => {
      await contract.mint("#A8E99A", "#8A3C99", { from: accounts[0] });
      const balanceOf = await contract.balanceOf(accounts[0]);
      assert.equal(balanceOf, 1, "Balance of account should be correct");
      const error = assert.throws(
        async () =>
          await contract.mint("#A8E99A", "#8A3C99", { from: accounts[0] })
      );
      assert.equal(
        error,
        "Error: Returned error: VM Exception while processing transaction: revert ERC721: token already minted -- Reason given: ERC721: token already minted."
      );
    });
  });
});
