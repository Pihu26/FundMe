const { deployments, getNamedAccounts, ethers } = require("hardhat");
const { assert, expect } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe;
          let deployer;
          let mockV3Aggregator;
          const sendValue = ethers.utils.parseEther("1");

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer;
              console.log("deployer", deployer);
              await deployments.fixture(["all"]);
              fundMe = await ethers.getContractAt("FundMe", deployer);
              mockV3Aggregator = await ethers.getContractAt(
                  "MockV3Aggregator",
                  deployer
              );
          });

          describe("constructor", async function () {
              it("see the aggregator address correctly", async function () {
                  const response = await fundMe.priceFeed();
                  assert.equal(response, mockV3Aggregator.address);
              });
          });
          describe("fund", async function () {
              it("fails if you don't enough ETH", async function () {
                  await expect(fundMe.fund()).to.be.reverted;
              });

              it("amount funded is same", async function () {
                  await fundMe.fund({ value: sendValue });
                  const response = await fundMe.addressToAmountFunded(deployer);
                  assert.equal(response.toString(), sendValue.toString());
              });
          });
      });
