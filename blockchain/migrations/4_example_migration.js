require('dotenv').config();
var MyContract = artifacts.require('Event');
module.exports = function (deployer) {
  deployer.deploy(MyContract,100, "TGDjYUzyDrPwBr19DzTNX4kgvanDv6ccMe", 10);
};
