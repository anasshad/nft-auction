const GradientToken = artifacts.require("GradientToken");
const AuctionToken = artifacts.require("AuctionToken");

module.exports = async function(deployer) {
  //Deploy Gradient Token
  await deployer.deploy(GradientToken);
  const gradientToken = await GradientToken.deployed();

  //Deploy AuctionToken
  await deployer.deploy(AuctionToken, gradientToken.address);
};
