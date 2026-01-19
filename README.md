# Multisig Wallet Factory

![Security](https://img.shields.io/badge/security-multisig-red)
![Solidity](https://img.shields.io/badge/solidity-^0.8.19-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**Multisig Wallet Factory** allows teams or groups to manage shared treasury funds securely. Instead of a single private key controlling the assets, this system requires a consensus (e.g., 2 out of 3 owners) to authorize any withdrawal or interaction.

## How it Works

1.  **Factory**: A master contract that deploys new `MultiSigWallet` instances.
2.  **Wallet**: Holds the funds. It tracks the list of owners and the number of required signatures.
3.  **Process**:
    * **Submit**: Any owner can propose a transaction (destination, value, data).
    * **Approve**: Other owners review and sign (approve) the transaction on-chain.
    * **Execute**: Once the threshold is met, the transaction is executed.

## Usage

```bash
# 1. Install
npm install

# 2. Deploy Factory
npx hardhat run deploy.js --network localhost

# 3. Create a new Multisig (2-of-3 example)
node create_wallet.js

# 4. Propose a Transaction (e.g., send ETH)
node submit_tx.js

# 5. Approve Transaction (Run with different signer)
node approve_tx.js

# 6. Execute Transaction
node execute_tx.js
