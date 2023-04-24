const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    goerli: { 
      provider: () => {
        // 要配置MNEMONIC(这个就是以太坊账户的private key)和INFURA_API_KEY(infura平台的api key)两个环境变量
        // return new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY)
        return new HDWalletProvider(process.env.MNEMONIC, 'https://eth-goerli.g.alchemy.com/v2/' + process.env.ALCHEMY_API_KEY)
      }, 
      network_id: '5', // eslint-disable-line camelcase 
      gas: 4465030, 
      // gasPrice: 10000000000, // 10 Gwei
      gasPrice: 1500000000, // 1.5 Gwei
    }, 
  },
  compilers: {
    solc: {
      version: "^0.8.7", 
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
