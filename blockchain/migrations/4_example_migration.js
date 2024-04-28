require('dotenv').config();
var MyContract = artifacts.require('Event');
module.exports = function (deployer) {
  deployer.deploy(MyContract,100, "TALBUSq7qJdmrW1RRjNKdw77gmFSvM9HP2", 10, true, 10);
};
