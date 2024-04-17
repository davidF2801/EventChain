var MyContract = artifacts.require('Event');
module.exports = function (deployer) {
  deployer.deploy(MyContract, "test", 123456, "Bcn", 100, "TJ15Drh9AdEhe2kkFiRJEJKutCJQVa7xox");
};
