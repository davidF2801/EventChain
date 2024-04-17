var MyContract = artifacts.require('Event');
 
module.exports = function (deployer) {
  deployer.deploy(MyContract);
};
