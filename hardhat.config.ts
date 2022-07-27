import * as dotenv from 'dotenv'
import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'
import '@nomiclabs/hardhat-etherscan'
// import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-web3'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@shardlabs/starknet-hardhat-plugin'
dotenv.config()
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100000000, // num assets we expect to be deposited over the lifetime of the contract
      },
    },
  },
  starknet: {
    venv: 'active',
    network: 'devnet', // alpha for goerli testnet, or any other network defined in networks
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts/ethereum',
    tests: './tests/functional',
    starknetSources: './contracts/starknet',
    starknetArtifacts: './starknet-artifacts',
  },

  networks: {
    goerli: {
      url: process.env.GOERLI_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    devnet: {
      url: 'http://localhost:5050',
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
    coinmarketcap: process.env.CMC_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}

export default config
