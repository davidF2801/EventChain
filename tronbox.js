module.exports = {
  networks: {
    development: {
      privateKey: '208ca9e8b6b1b133ad0e6ec55373620edc42e36d7c6f5a0fe1e67f654f31d71d',
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