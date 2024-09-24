import { ethers } from "./ethers-5.1.esm.min.js";
import { contractAddress, abi } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

async function connect() {
  if (typeof window.ethereum != "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    connectButton.innerText = "Connected";
  } else {
    connectButton.innerText = "Please install MetaMask";
  }
}

async function getBalance() {
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log(`funding with ${ethAmount}`);
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log("ABI:", abi);
    // console.log("Contract Address:", contractAddress);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    //console.log("abi:", abi);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });

      await listenTransactionToBeMined(transactionResponse, provider);
      console.log("Done...");
    } catch (error) {
      console.log("error");
    }
  }
}
function listenTransactionToBeMined(transactionResponse, provider) {
  console.log(`minning${transactionResponse.hash}......`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transcationReceipt) => {
      console.log(
        `complete with ${transcationReceipt.confirmations}   confirmations`
      );
      resolve();
    });
  });
}

async function withdraw() {
  console.log("withdrawing......");
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();
      await listenTransactionToBeMined(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  }
}
//fund function
//withdraw functio
