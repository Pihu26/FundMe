const { network } = require("hardhat");

const {
    developmentChains,
    decimals,
    initial_Answer,
} = require("../helper-hardhat-config.js");

module.exports = async ({ getNamedAccounts, deployments }) => {
    //const { getNamedAccounts, deployments } = hre;

    const { deploy, log } = deployments;

    const { deployer } = await getNamedAccounts();

    if (developmentChains.includes(network.name)) {
        log("deploying mocks.....");
        const mockV3Aggregator = await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            args: [decimals, initial_Answer],
            log: true,
        });
        log("deployed");
        log(`Mock deployed at ${mockV3Aggregator.address}`);
        log("----------------------------------");
    }
};

module.exports.tags = ["all", "mocks"];
