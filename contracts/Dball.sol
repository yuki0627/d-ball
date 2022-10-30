// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "hardhat/console.sol";

interface ERC721Contract {
    function balanceOf(address) external view returns (uint256);
    function totalSupply() external view returns (uint256);
}

contract Dball is Ownable, ERC721 {
    address[7] _targetContractaAddresses;
    // NFTが保存するデータ
    string[] private _names;
    string[] private _descriptions;
    // string[] private _words;

    constructor() ERC721("D-BALL", "DBL") {
    }

    // TODO: onlyOwner
    function mint(string calldata name, string calldata description) external {
        uint256 tokenId = _names.length;
        _safeMint(msg.sender, tokenId);
        console.log("newTokenId: ", tokenId);

        _names.push(name);
        _descriptions.push(description);
        // _words.push(word);
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
        uint256 total;
        for(uint8 i = 0; i < 7; i++){
            if(_targetContractaAddresses[i] == address(0)) {
                continue;
            }
            ERC721Contract erc721 = ERC721Contract(_targetContractaAddresses[i]);
            if(erc721.balanceOf(target_account_address) > 0) {
                total++;
            }
        }
        return total;
    }

    function getBallCollection(address target_account_address) public view returns(bool[7] memory) {
        bool[7] memory collection;
        for(uint8 i = 0; i < 7; i++){
            if(_targetContractaAddresses[i] == address(0)) {
                continue;
            }
            ERC721Contract erc721 = ERC721Contract(_targetContractaAddresses[i]);
            if(erc721.balanceOf(target_account_address) > 0) {
                collection[i] = true;
            }
        }
        return collection;
    } 

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "nonexsitent token" );

        //④    // name要素の作成
        bytes memory bytesName = abi.encodePacked(
            '"name":"', _names[tokenId], '"'
        );

        //⑤    // description要素の作成
        bytes memory bytesDesc = abi.encodePacked(
            '"description":"', _descriptions[tokenId], '"'
        );

        //⑦    // image要素の作成：SVG要素をByte64エンコードしてコンテンツタイプの指定
        bytes memory bytesImage = abi.encodePacked(
            '"image":"data:image/svg+xml;base64,',
            Base64.encode(_createSVG(tokenId)),
            '"'
        );

        //⑧    /// jsonオブジェクトの作成
        bytes memory bytesObject = abi.encodePacked(
            '{',
                bytesName, ',',
                bytesDesc, ',',
                bytesImage,
            '}'
        );

        //⑨    // jsonオブジェクトをBase64エンコードしてコンテンツタイプの指定
        bytes memory bytesMetadata = abi.encodePacked(
            'data:application/json;base64,',
            Base64.encode(bytesObject)
        );

        // 文字列として返す
        return(string(bytesMetadata));
    }

    function _createSVG(uint256 tokenId) internal view returns (bytes memory) {
        address owner = ownerOf(tokenId);
        uint256 nuberOfBalls = getNumberOfBalls(owner);

        // wordの部分を作っておく
        bytes memory bytesWord = abi.encodePacked(
            '<text x="175" y="290" text-anchor="middle" class="f">',
            Strings.toString(nuberOfBalls),
            '</text>'
        );

        // SVGとしてまとめる
        bytes memory bytesSVG = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            '<style> .f { font-family: serif; font-size:300px; fill:000000;} </style>',
            '<rect x="0" y="0" width="350" height="350" fill="#000000" />',
            '<rect x="10" y="10" width="330" height="330" fill="#ffffff" />',
            bytesWord,
            '</svg>'
        );

        return( bytesSVG );
    }
}