// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface ERC721Contract {
    function balanceOf(address) external view returns (uint256);
    function totalSupply() external view returns (uint256);
}

contract Dball is Ownable, ERC721 {
    address[7] _targetContractaAddresses;

    constructor() ERC721("D-BALL", "DBL") {
    }

    function setTargetContract(uint8 index, address _contractAddress) public onlyOwner {
        _targetContractaAddresses[index] = _contractAddress;
    }

    function getTargetContracts() public view returns(address[7] memory) {
        address[7] memory res;
        for(uint8 i = 0; i < 7; i++){
            res[i] = _targetContractaAddresses[i];
        }
        return res;
    }

    function getNumberOfBalls(address target_account_address) public view returns(uint256) {
        console.log("_targetContractaAddresses[0]:", _targetContractaAddresses[0]);
        console.log("target_account_address: ", target_account_address);

        uint256 total;
        for(uint8 i = 0; i < 7; i++){
            ERC721Contract erc721 = ERC721Contract(_targetContractaAddresses[i]);
            total += erc721.balanceOf(target_account_address);
        }
        return total;
    }
}