var Asset = artifacts.require("./Asset.sol");

module.exports = function(deployer) {
  deployer.deploy(Asset);
};