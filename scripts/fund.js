const { getNamedAccounts, ethers, deployments } = require("hardhat");

async function main() {
    const { deployer } = await getNamedAccounts();

    const fundMe = await ethers.getContractAt("FundMe", deployer);

    console.log("deploying contract ");
    console.log("funding contract ");

    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.1"),
    });
    await transactionResponse.wait(1);
    console.log("funded.....");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit;
    });
