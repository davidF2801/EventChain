var MyContract = artifacts.require('Event');
module.exports = function (deployer) {
  deployer.deploy(MyContract, "test", 123456, "Bcn", 100, "TGn1wp85J5juhb3QqvcQGKyp6F8H3RSFnT");
};
