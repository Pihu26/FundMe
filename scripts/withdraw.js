const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
    const { deployer } = await getNamedAccounts();

    const fundMe = await ethers.getContractAt("FundMe", deployer);
    console.log("deployed contract");
    console.log("funding withdraw");

    const transactionResponse = await fundMe.withdraw();
    await transactionResponse.wait(1);

    console.log("withdrwal");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit;
    });
