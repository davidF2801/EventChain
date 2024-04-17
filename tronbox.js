module.exports = {
  networks: {
    development: {
      privateKey: 'ba50872b00adfc64a6a6269af01afbe33cf7d0eb61c4ac66e7379a2a9e96d6bd',
      userFeePercentage: 100, // The percentage of resource consumption ratio.
      feeLimit: 100000000, // The TRX consumption limit for the deployment and trigger, unit is SUN
      fullNode: 'http://127.0.0.1:9090',
      solidityNode: 'http://127.0.0.1:9090',
      network_id: '*'
    },
    compilers: {
      solc: {
        version: '0.8.0'
      }
    }
  },
   // solc compiler optimize
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    },
    evmVersion: 'istanbul'
  }
};