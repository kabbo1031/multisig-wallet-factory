// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MultiSigWallet.sol";

contract MultiSigFactory {
    event WalletCreated(address indexed contractAddress, address[] owners, uint256 requiredConfirmations);

    function createWallet(address[] memory _owners, uint256 _required) external returns (address) {
        MultiSigWallet wallet = new MultiSigWallet(_owners, _required);
        
        emit WalletCreated(address(wallet), _owners, _required);
        return address(wallet);
    }
}
