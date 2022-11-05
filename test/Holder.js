const { expect } = require("chai");
const { ethers } = require("hardhat");

const SETTINGS = require("../constant.js");
const SINGLE_BALLS = require("../constantSingleBalls.js");

import("hardhat/config").HardhatUserConfig;

describe("D-BALL Basic", function () {
    beforeEach(async function () {
        ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
        
        externalContracts = [];
        [owner, account] = await ethers.getSigners();
        
        contractFactory = await ethers.getContractFactory("Holder");
        contract = await contractFactory.deploy(SETTINGS[0], SETTINGS[1], SETTINGS[2], SETTINGS[3]);
        await contract.deployed();

        for (let i = 0; i < 7; i++) {
            contractFactory = await ethers.getContractFactory("Ball");
            contract_name = `D-Ball-${i + 1}`;
            short_name = `DB${i + 1}`;
            ballContract = await contractFactory.deploy(contract_name, short_name, SINGLE_BALLS[i]);
            await ballContract.deployed();
            contract.setTargetContract(i, ballContract.address);
            externalContracts.push(ballContract);
        }
    });

    it("トークンの名前とシンボルがセットされている", async function () {
        for (let i = 0; i < 7; i++) {
            contract_name = `D-Ball-${i + 1}`;
            short_name = `DB${i + 1}`;
            expect(await externalContracts[i].name()).to.equal(contract_name);
            expect(await externalContracts[i].symbol()).to.equal(short_name);
        }
    });

    it("個別NFTにボールSVGがセットされている", async function () {
        for (i = 0; i < externalContracts.length; i++) {
            await externalContracts[i].mint("hoge", "fuga");
            tokenURI = await externalContracts[i].tokenURI(0);

            // ホルダーに収集したボールが表示されている
            token = tokenURI.replace(/^data:\w+\/\w+;base64,/, '');
            decoded = Buffer.from(token, 'base64').toString();

            let json = JSON.parse(decoded);
            decoded = json.image.replace("data:image/svg+xml;base64,", '');
            image = Buffer.from(decoded, 'base64').toString();
            // console.log('image:', image);
        }
    });

    it("TargetContractが設定されていなくてもエラーとならない", async function () {
        for (let i = 0; i < 7; i++) {
            contract.setTargetContract(i, ZERO_ADDRESS);
        }
        count = await contract.connect(account).getNumberOfBalls(account.address);
    });

    it("所有している対象NFTの種類の数を取得できる", async function () {
        targetContract = externalContracts[0];
        await targetContract.mint("hoge", "fuga");
        await targetContract.transferFrom(owner.address, account.address, 0);

        targetContract = externalContracts[4];
        await targetContract.mint("hoge", "fuga");
        await targetContract.transferFrom(owner.address, account.address, 0)
        await targetContract.mint("hoge", "fuga");
        await targetContract.transferFrom(owner.address, account.address, 1)

        count = await contract.connect(account).getNumberOfBalls(account.address);
        expect(count.toNumber()).to.equal(2);
    });

    it("所有しているBallCollectionを取得できる", async function () {
        targetContract = externalContracts[0];
        await targetContract.mint("hoge", "fuga");
        await targetContract.transferFrom(owner.address, account.address, 0)

        targetContract = externalContracts[4];
        await targetContract.mint("hoge", "fuga");
        await targetContract.transferFrom(owner.address, account.address, 0)

        collection = await contract.connect(account).getBallCollection(account.address);
        expect(collection[0]).to.equal(true);
        expect(collection[1]).to.equal(false);
        expect(collection[4]).to.equal(true);
    });

    it("mint出来る", async function () {
        contract.mint("hoge", "fuga");
    });

    it("tokenURI でオブジェクトを取得できる", async function () {
        contract.mint("hoge", "fuga");
        token = await contract.tokenURI(0);
    });

    it("tokenURI に取得したボールが含まれている", async function () {
        // ホルダー作成を作成しaccountに渡す
        await contract.mint("hoge", "fuga");
        await contract.transferFrom(owner.address, account.address, 0)

        // ドラゴンボール収集
        // 7つのコントラクトに1つづつnftをmintし(tokenId=0)、それをaccountにtransferする
        count = 7;
        for (i = 0; i < count; i++) {
            targetContract = externalContracts[i];
            await targetContract.mint("hoge", "fuga");
            await targetContract.transferFrom(owner.address, account.address, 0);
        }
        
        // ホルダー取得
        tokenId = 0;
        token = await contract.tokenURI(tokenId);
        collected_count = await contract.getNumberOfBallsNftHas(tokenId);

        // ホルダーに収集したボールが表示されている
        token = token.replace(/^data:\w+\/\w+;base64,/, '');
        decoded = Buffer.from(token, 'base64').toString();

        let json = JSON.parse(decoded);
        decoded = json.image.replace("data:image/svg+xml;base64,", '');
        image = Buffer.from(decoded, 'base64').toString();
        // console.log('image:', image);
        for (i = 0; i < count; i++) {
            expect(image.includes(SETTINGS[2][i])).to.equal(true);
        }
        if (count == 7) {
            expect(image.includes(SETTINGS[3])).to.equal(true);
        }
    });

    it("トークンの名前とシンボルがセットされている", async function () {
        expect(await contract.name()).to.equal("D-BALL-HOLDER");
        expect(await contract.symbol()).to.equal("DBH");
    });

    it("デプロイアドレスがownerに設定されている", async function () {
        expect(await contract.owner()).to.equal(owner.address);
    });

    it("ERC721準拠のコントラクトの balanceOf を実行できる", async function () {
        let count = await ballContract.balanceOf(owner.address);
        expect(Number(count)).to.equal(0);
    });

    it("setTargetContractで0アドレスに出来る", async function () {
        for (let i = 0; i < 7; i++) {
            contract.setTargetContract(i, ZERO_ADDRESS);
        }
        await contract.getTargetContracts();
    });

    it("ターゲット番号(3)にコントラクトアドレスを設定出来る", async function () {
        await contract.setTargetContract(3, ballContract.address);
        targetContracts = await contract.getTargetContracts();
        expect(targetContracts[3]).to.equal(ballContract.address);
    });

    it("オーナー以外は外部コントラクトアドレスを設定出来ない", async function () {
        await expect(contract.connect(account).setTargetContract(3, ballContract.address)).to.be.revertedWith("Ownable: caller is not the owner");

        expect(targetContracts[3]).not.to.equal(ballContract.address);
        await contract.connect(owner).setTargetContract(3, ballContract.address);
        targetContracts = await contract.getTargetContracts();
        expect(targetContracts[3]).to.equal(ballContract.address);
    });

    it("NFTを保有している対象コントラクトの数を取得できる", async function () {
        await expect(contract.connect(account).setTargetContract(3, ballContract.address)).to.be.revertedWith("Ownable: caller is not the owner");

        expect(targetContracts[3]).not.to.equal(ballContract.address);
        await contract.connect(owner).setTargetContract(3, ballContract.address);
        targetContracts = await contract.getTargetContracts();
        expect(targetContracts[3]).to.equal(ballContract.address);
    });
});
    
