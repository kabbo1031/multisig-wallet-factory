const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("Deploying Factory...");

    const Factory = await ethers.getContractFactory("MultiSigFactory");
    const factory = await Factory.deploy();
    await factory.waitForDeployment();
    
    const address = await factory.getAddress();
    console.log("Factory Deployed at:", address);

    // Save Config
    const config = { FACTORY_ADDRESS: address, WALLET_ADDRESS: "" };
    fs.writeFileSync("config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
