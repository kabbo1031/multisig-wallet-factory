const { ethers } = require("hardhat");
const config = require("./config.json");

async function main() {
    const [owner1] = await ethers.getSigners();
    const wallet = await ethers.getContractAt("MultiSigWallet", config.WALLET_ADDRESS, owner1);

    // Fund the wallet first so it can send money
    await owner1.sendTransaction({
        to: config.WALLET_ADDRESS,
        value: ethers.parseEther("1.0")
    });

    // Proposal: Send 0.1 ETH to a random address
    const to = "0x000000000000000000000000000000000000dEaD";
    const value = ethers.parseEther("0.1");
    const data = "0x";

    console.log("Submitting transaction proposal...");
    const tx = await wallet.submitTransaction(to, value, data);
    await tx.wait();

    console.log("Transaction ID 0 Submitted!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
