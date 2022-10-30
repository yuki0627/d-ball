// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract DummyNFT is ERC721, ERC721Enumerable {
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds;

    constructor() ERC721("Dummy", "DUM") {
    }
    
    function nftMint() public {
        //  _tokenIds.increment();
        // uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, totalSupply());
    }

    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override (ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
