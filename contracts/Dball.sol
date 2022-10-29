// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ERC721Contract {
    function balanceOf(address owner) external view returns (uint256);
}

contract Dball is Ownable, ERC721 {
    uint public unlockTime;

    event Withdrawal(uint amount, uint when);

    constructor() ERC721("D-BALL", "DBL") {
    }
}
