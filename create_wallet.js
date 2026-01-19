const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./config.json");

async function main() {
    const signers = await ethers.getSigners();
    // Use first 3 accounts as owners
    const owners = [signers[0].address, signers[1].address, signers[2].address];
    const required = 2; // 2 out of 3

    console.log(`Creating Multisig for: ${owners}`);

    const factory = await ethers.getContractAt("MultiSigFactory", config.FACTORY_ADDRESS);
    
    // Listen for event to get the new address
    const tx = await factory.createWallet(owners, required);
    const receipt = await tx.wait();

    // Parse event logs (simplified)
    // In Hardhat local, we can look at logs, but here we scan recent events
    const filter = factory.filters.WalletCreated();
    const events = await factory.queryFilter(filter, -1);
    const newWalletAddr = events[0].args[0];

    console.log(`New Wallet Created at: ${newWalletAddr}`);

    // Update config
    config.WALLET_ADDRESS = newWalletAddr;
    fs.writeFileSync("config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
