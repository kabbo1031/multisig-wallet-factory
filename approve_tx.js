const { ethers } = require("hardhat");
const config = require("./config.json");

async function main() {
    const signers = await ethers.getSigners();
    const owner2 = signers[1]; // Switch to second owner

    const wallet = await ethers.getContractAt("MultiSigWallet", config.WALLET_ADDRESS, owner2);
    
    const txIndex = 0; // ID of the tx we created
    
    console.log(`Owner 2 (${owner2.address}) confirming tx ${txIndex}...`);
    
    const tx = await wallet.confirmTransaction(txIndex);
    await tx.wait();

    console.log("Transaction Confirmed by Owner 2.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
