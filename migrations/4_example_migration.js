require('dotenv').config();
var MyContract = artifacts.require('Event');
module.exports = function (deployer) {
  deployer.deploy(MyContract,100, process.env.TEST_ACCOUNT, 10);
};
