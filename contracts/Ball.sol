// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Ball is ERC721, ERC721Enumerable, Ownable {
    // NFTが保存するデータ
    string[] private _names;
    string[] private _descriptions;
    string private _svg;

    constructor(string memory name, string memory short_name, string memory svg) ERC721(name, short_name) {
        _svg = svg;
    }
    
    function mint(string calldata name, string calldata description) public onlyOwner {
        uint256 newTokenId = totalSupply();
        _names.push(name);
        _descriptions.push(description);
        _safeMint(msg.sender, newTokenId);
        // _setTokenURI(newTokenId, _createURI(newTokenId));
    }

    function _createURI(uint256 tokenId) internal view returns (string memory) {
        bytes memory bytesName = abi.encodePacked(
            '"name":"', _names[tokenId], '"'
        );

        bytes memory bytesDesc = abi.encodePacked(
            '"description":"', _descriptions[tokenId], '"'
        );

        // image要素の作成：SVG要素をByte64エンコードしてコンテンツタイプの指定
        bytes memory bytesImage = abi.encodePacked(
            '"image":"data:image/svg+xml;base64,',
            Base64.encode(abi.encodePacked(_svg)),
            '"'
        );

        // jsonオブジェクトの作成
        bytes memory bytesObject = abi.encodePacked(
            '{',
                bytesName, ',',
                bytesDesc, ',',
                bytesImage,
            '}'
        );

        // jsonオブジェクトをBase64エンコードしてコンテンツタイプの指定
        bytes memory bytesMetadata = abi.encodePacked(
            'data:application/json;base64,',
            Base64.encode(bytesObject)
        );

        // 文字列として返す
        return(string(bytesMetadata));
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

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _createURI(tokenId);
    }

    // function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    //     super._burn(tokenId);
    // }
}
