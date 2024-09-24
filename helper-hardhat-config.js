const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694aa1769357215de4fac081bf1f309adc325306",
    },

    // 137:{
    //     name:"polygon"
    //     ethUsdPriceFeed:
    // }
};

const developmentChains = ["hardhat", "localhost"];
const decimals = 8;
const initial_Answer = 200000000000;

module.exports = {
    networkConfig,
    developmentChains,
    decimals,
    initial_Answer,
};
