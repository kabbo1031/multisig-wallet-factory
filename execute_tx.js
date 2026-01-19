const { ethers } = require("hardhat");
const config = require("./config.json");

async function main() {
    const [owner1] = await ethers.getSigners();
    const wallet = await ethers.getContractAt("MultiSigWallet", config.WALLET_ADDRESS, owner1);

    const txIndex = 0;

    console.log(`Executing Transaction ${txIndex}...`);
    
    try {
        const tx = await wallet.executeTransaction(txIndex);
        await tx.wait();
        console.log("Transaction Executed Successfully! Funds Transferred.");
    } catch (e) {
        console.error("Execution Failed:", e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
