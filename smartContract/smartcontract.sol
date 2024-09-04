// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract Escrow {

    address ADMIN;

    event Locked(address wallet, uint256 amount, bool status);


    struct LockDetails {
        address receiverWallet;
        address receivedWallet;
        uint256 amountLocked;
        bool status;
    }

    modifier OnlyOwner() {
        require(msg.sender == ADMIN, "Invalid Caller");
        _;
    }

    mapping(bytes32 => LockDetails) internal txns;

    constructor() {
        ADMIN = msg.sender;
    }


    function getTxnDetails(bytes32 txnId) public view returns(LockDetails memory) {
        return txns[txnId];
    }

    function makeTransaction(address receiver, address payOutToken, uint256 amount, uint256 salt) external  OnlyOwner() returns(bool) {
        require(amount !=0, "Escrow: Amount should not be Zero");
        bytes32  pwd = keccak256(abi.encode(msg.sender, block.timestamp, salt));
        bool success = IERC20(payOutToken).transfer(receiver, amount);
        txns[pwd] = LockDetails(msg.sender, receiver, amount,true);
        emit Locked(msg.sender, amount, success);
        return  true;
    }
}

