const { expect } = require("chai");
const { ethers } = require("hardhat");

import("hardhat/config").HardhatUserConfig;

describe("D-BALL Basic", function () {
    beforeEach(async function () {
        externalContracts = [];
        [owner, account] = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("Dball");
        contract = await contractFactory.deploy();
        await contract.deployed();

        for (let i = 0; i < 7; i++) {
            contractFactory = await ethers.getContractFactory("DummyNFT");
            dummyNFTContract = await contractFactory.deploy();
            await dummyNFTContract.deployed();
            contract.setTargetContract(i, dummyNFTContract.address);
            externalContracts.push(dummyNFTContract);
        }
    });

    it("トークンの名前とシンボルがセットされている", async function () {
        for (let i = 0; i < 7; i++) {
            expect(await externalContracts[i].name()).to.equal("Dummy");
            expect(await externalContracts[i].symbol()).to.equal("DUM");
        }
    });

    it("所有している対象NFTの種類の数を取得できる", async function () {
        targetContract = externalContracts[0];
        await targetContract.connect(account).nftMint();

        targetContract = externalContracts[4];
        await targetContract.connect(account).nftMint();

        console.log('account.address:', account.address);
        count = await contract.connect(account).getNumberOfBalls(account.address);
        console.log('count:', count);
        expect(count.toNumber()).to.equal(2);

    });
});
    
describe("D-BALL Admin", function () {
    beforeEach(async function () {
        [owner, account] = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("Dball");
        contract = await contractFactory.deploy();
        await contract.deployed();

        contractFactory = await ethers.getContractFactory("DummyNFT");
        dummyNFTContract = await contractFactory.deploy();
        await dummyNFTContract.deployed();
    });
    
    it("トークンの名前とシンボルがセットされている", async function () {
        expect(await contract.name()).to.equal("D-BALL");
        expect(await contract.symbol()).to.equal("DBL");
    });

    it("デプロイアドレスがownerに設定されている", async function () {
        expect(await contract.owner()).to.equal(owner.address);
    });

    it("ERC721準拠のコントラクトの balanceOf を実行できる", async function () {
        let count = await dummyNFTContract.balanceOf(owner.address);
        expect(Number(count)).to.equal(0);
    });

    it("ターゲット番号(3)にコントラクトアドレスを設定出来る", async function () {
        await contract.setTargetContract(3, dummyNFTContract.address);
        targetContracts = await contract.getTargetContracts();
        expect(targetContracts[3]).to.equal(dummyNFTContract.address);
    });

    it("オーナー以外は外部コントラクトアドレスを設定出来ない", async function () {
        await expect(contract.connect(account).setTargetContract(3, dummyNFTContract.address)).to.be.revertedWith("Ownable: caller is not the owner");

        expect(targetContracts[3]).not.to.equal(dummyNFTContract.address);
        await contract.connect(owner).setTargetContract(3, dummyNFTContract.address);
        targetContracts = await contract.getTargetContracts();
        expect(targetContracts[3]).to.equal(dummyNFTContract.address);
    });

    it("NFTを保有している対象コントラクトの数を取得できる", async function () {
        await expect(contract.connect(account).setTargetContract(3, dummyNFTContract.address)).to.be.revertedWith("Ownable: caller is not the owner");

        expect(targetContracts[3]).not.to.equal(dummyNFTContract.address);
        await contract.connect(owner).setTargetContract(3, dummyNFTContract.address);
        targetContracts = await contract.getTargetContracts();
        expect(targetContracts[3]).to.equal(dummyNFTContract.address);
    });
});
