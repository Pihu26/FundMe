require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-deploy");
require("dotenv").config();
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");

const sepolia_PRIVATE_KEY = process.env.PRIVATE_KEY || "0xsepolia";
const sepolia_RPC_URL = process.env.RPC_URL || "https/sepolia";
const API_KEY = process.env.ETHERSCAN_API_KEYS || "key";
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || "key";

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },

    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        sepolia: {
            url: sepolia_RPC_URL,
            accounts: [sepolia_PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },

    etherscan: {
        apikey: API_KEY,
    },

    gasReporter: {
        enabled: false,
        Coinmarketcap: COINMARKET_API_KEY,
        outputFile: "gas-reporter.txt",
        Currency: "USD",
        noColor: true,
    },

    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
};
