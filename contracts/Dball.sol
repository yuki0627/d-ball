// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface ERC721Contract {
    // function balanceOf(address owner) external view returns (uint256);
    // function totalSupply() external view returns (uint256);
}

contract Dball is Ownable, ERC721 {
    address[7] _targetContracts;

    constructor() ERC721("D-BALL", "DBL") {
    }

    function addTargetContract(uint8 index, address _contractAddress) public onlyOwner {
        console.log("index:", index);
        console.log("_contractAddress:", _contractAddress);

        _targetContracts[index] = _contractAddress;
    }

    function getTargetContracts() external view returns(address[7] memory) {
        address[7] memory res;
        for(uint16 i = 0; i < 7; i++){
            res[i] = _targetContracts[i];
        }
        return res;
    }
}