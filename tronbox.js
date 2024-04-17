module.exports = {
  networks: {
    development: {
      privateKey: '5b7998dd1021dd7ec3789757e3dacc0b00c1d3e1aa3ae83ee10004645272bac0',
      userFeePercentage: 100, // The percentage of resource consumption ratio.
      feeLimit: 100000000, // The TRX consumption limit for the deployment and trigger, unit is SUN
      fullNode: 'http://127.0.0.1:9090',
      solidityNode: 'http://127.0.0.1:9090',
      eventServer: 'http://127.0.0.1:9090',
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