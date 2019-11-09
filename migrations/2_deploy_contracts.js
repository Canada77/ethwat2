var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var RepContract = artifacts.require("./RepContract.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(RepContract);
};
