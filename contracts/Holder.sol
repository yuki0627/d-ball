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

contract Holder is Ownable, ERC721 {
    uint16 constant private BALL_COUNT = 7;
    address[BALL_COUNT] _targetContractaAddresses;
    // NFTが保存するデータ
    string[] private _names;
    string[] private _descriptions;
    string[BALL_COUNT] private _number_svgs;
    string private _empty_svg;
    string private _prise_svg;
    // string[] private _words;

    constructor(
        address[BALL_COUNT] memory targetContractaAddresses, 
        string memory emptySvg,
        string[BALL_COUNT] memory nunberSvgs, 
        string memory priseSvg) 
        ERC721("E-BALL-HOLDER", "EBH") {
        for(uint i = 0; i < BALL_COUNT; i++) {
            _targetContractaAddresses[i] = targetContractaAddresses[i];
        }

        for(uint i = 0; i < BALL_COUNT; i++) {
            _number_svgs[i] = nunberSvgs[i];
        }
        _empty_svg = emptySvg;
        _prise_svg = priseSvg;
    }

    function mint(string calldata name, string calldata description) external onlyOwner {
        uint256 tokenId = _names.length;
        _names.push(name);
        _descriptions.push(description);
        _safeMint(msg.sender, tokenId);

        // _words.push(word);
    }

    function setTargetContract(uint8 index, address _contractAddress) public onlyOwner {
        _targetContractaAddresses[index] = _contractAddress;
    }

    function getTargetContracts() public view returns(address[BALL_COUNT] memory) {
        address[BALL_COUNT] memory res;
        for(uint8 i = 0; i < BALL_COUNT; i++){
            res[i] = _targetContractaAddresses[i];
        }
        return res;
    }

    function getNumberOfBalls(address target_account_address) public view returns(uint256) {
        uint256 total;
        for(uint8 i = 0; i < BALL_COUNT; i++){
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

    function getNumberOfBallsNftHas(uint tokenId) public view returns(uint256) {
        address tokenOwner = ownerOf(tokenId);
        uint256 total;
        for(uint8 i = 0; i < BALL_COUNT; i++){
            if(_targetContractaAddresses[i] == address(0)) {
                continue;
            }
            ERC721Contract erc721 = ERC721Contract(_targetContractaAddresses[i]);
            if(erc721.balanceOf(tokenOwner) > 0) {
                total++;
            }
        }
        return total;
    }

    function getBallCollection(address target_account_address) public view returns(bool[BALL_COUNT] memory) {
        bool[BALL_COUNT] memory collection;
        for(uint8 i = 0; i < BALL_COUNT; i++){
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
        return _createURI(tokenId);
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
            Base64.encode(_createSVG(tokenId)),
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

    function _createSVG(uint256 tokenId) internal view returns (bytes memory) {
        address tokenOwner = ownerOf(tokenId);
        uint256 numberOfBalls = getNumberOfBalls(tokenOwner);
        bool[BALL_COUNT] memory collection = getBallCollection(tokenOwner);

        string memory ball_1;
        if(collection[0] == true) {
            ball_1 = _number_svgs[0];
        }
        
        string memory ball_2;
        if(collection[1] == true) {
            ball_2 = _number_svgs[1];
        }

        string memory ball_3;
        if(collection[2] == true) {
            ball_3 = _number_svgs[2];
        }

        string memory ball_4;
        if(collection[3] == true) {
            ball_4 = _number_svgs[3];
        }

        string memory ball_5;
        if(collection[4] == true) {
            ball_5 = _number_svgs[4];
        }

        string memory ball_6;
        if(collection[5] == true) {
            ball_6 = _number_svgs[5];
        }

        string memory ball_7;
        if(collection[6] == true) {
            ball_7 = _number_svgs[6];
        }

        string memory prize_svg;
        if(numberOfBalls == 7) {
            prize_svg = _prise_svg;
        }

        bytes memory bytesSVG = abi.encodePacked(
            '<svg id="master-artboard" viewBox="0 0 350 350" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" style="enable-background:new 0 0 1400 980" width="350" height="350"><path id="ee-background" style="fill:#fff;fill-opacity:0;pointer-events:none" d="M0 0h350v350H0z"/><defs><style id="ee-google-fonts">@import url(https://fonts.googleapis.com/css?family=Acme:400);</style></defs>',
            _empty_svg,
            ball_1,
            ball_2,
            ball_3,
            ball_4,
            ball_5,
            ball_6,
            ball_7,
            prize_svg,
            '</svg>'
        );

        return( bytesSVG );
    }
}