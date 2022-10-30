const { expect } = require("chai");
const { ethers } = require("hardhat");

import("hardhat/config").HardhatUserConfig;

describe("D-BALL", function () {
    let OnChainNFT;
    let contract;
    let owner;
    let account1;

    beforeEach(async function () {
        [owner, account1, account2] = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("Dball");
        contract = await contractFactory.deploy();
        await contract.deployed();

        contractFactory = await ethers.getContractFactory("DummyNFT");
        dummyNFTContract = await contractFactory.deploy();
        await dummyNFTContract.deployed();
    });
    

    it("トークンの名前とシンボルがセットされている", async function () {
        console.log("await contract.name():", await contract.name());
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
        await contract.addTargetContract(3, dummyNFTContract.address);
        targetContracts = await contract.getTargetContracts();
        console.log('targetContracts:', targetContracts);
        expect(targetContracts[3]).to.equal(dummyNFTContract.address);
    });

    xit("オーナー以外は外部コントラクトアドレスを追加出来ない", async function () {
        await expect(contract.connect(account1).addTargetContract(dummyNFTContract.address)).to.be.revertedWith("Ownable: caller is not the owner");
    });

    xit("外部コントラクトアドレスを削除出来る", async function () {
        contractFactory = await ethers.getContractFactory("DummyNFT");
        dummyNFTContract1 = await contractFactory.deploy();
        await dummyNFTContract1.deployed();

        dummyNFTContract2 = await contractFactory.deploy();
        await dummyNFTContract2.deployed();

        dummyNFTContract3 = await contractFactory.deploy();
        await dummyNFTContract3.deployed();

        await contract.addTargetContract(dummyNFTContract1.address);
        await contract.addTargetContract(dummyNFTContract2.address);
        await contract.addTargetContract(dummyNFTContract3.address);

        targetContracts = await contract.getTargetContracts();
        expect(targetContracts.length).to.equal(3);

        await contract.deleteTargetContract(dummyNFTContract2.address);
        expect(targetContracts.length).to.equal(2);
        res = contract.getTargetContracts();
        console.log('res:', res);
    });

    xit("同一外部コントラクトアドレスは追加出来ない", async function () {
        await contract.addTargetContract(dummyNFTContract.address);
        targetContracts = await contract.getTargetContracts();
        expect(targetContracts.length).to.equal(1);

        await contract.addTargetContract(dummyNFTContract.address);
        targetContracts = await contract.getTargetContracts();
        expect(targetContracts.length).to.equal(1);
    });

    xit("ownerはNFT作成できる", async function () {
        await contract.nftMint();
        expect(await contract.ownerOf(1)).to.equal(owner.address);
    });

    xit("mint前はNFTのカウント0", async function () {
        expect(await contract.balanceOf(account1.address)).to.equal(0);
    });

    xit("mint後はNFTのカウント1", async function () {
        await contract.connect(account1).nftMint();
        expect(await contract.balanceOf(account1.address)).to.equal(1);
    });

    xit("mint直後は残り時間は0以上", async function () {
        await contract.connect(account1).nftMint();
        let remain = await contract.remainTime(1);
        expect(remain.toNumber()).to.greaterThan(0);
    });

    xit("時間を進めると残り時間が0となる", async function () {
        await contract.connect(account1).nftMint();

        // 時間すすめる
        await ethers.provider.send("evm_increaseTime", [12000]);
        await ethers.provider.send("evm_mine", []);

        // 確認事項
        let remain = await contract.remainTime(1);
        expect(remain.toNumber()).to.equal(0);

        // 時間戻す
        await ethers.provider.send("evm_increaseTime", [-12000]);
        await ethers.provider.send("evm_mine", []);
    });

    xit("寿命前のNFTが取得できる", async function () {
        await contract.connect(account1).nftMint();
        token = await contract.connect(account1).tokenURI(1);
        console.log("token:", token);
        token = token.replace(/^data:\w+\/\w+;base64,/, "");
        decoded = Buffer.from(token, "base64").toString();

        let json = JSON.parse(decoded);
        expect(json.description).to.equal("life is short");
    });

    xit("寿命後のNFTが取得できる", async function () {
        await contract.connect(account1).nftMint();
        remain = await contract.remainTime(1);
        console.log("remain:", remain);

        // 時間すすめる
        await ethers.provider.send("evm_increaseTime", [remain.toNumber()]);
        await ethers.provider.send("evm_mine", []);

        // 確認事項
        token = await contract.connect(account1).tokenURI(1);
        token = token.replace(/^data:\w+\/\w+;base64,/, "");
        decoded = Buffer.from(token, "base64").toString();
        let json = JSON.parse(decoded);
        expect(json.description).to.equal("goodbye");

        // 時間戻す
        await ethers.provider.send("evm_increaseTime", [remain.toNumber()]);
        await ethers.provider.send("evm_mine", []);
    });

    xit("寿命後のNFTにdballの数が入っている", async function () {
        await contract.connect(account1).nftMint();
        await dball.connect(owner).nftMint(owner.address, "hoge");

        // 時間すすめる (今は時間が過ぎたときのreturnでしかmetadataを変えていない)
        await ethers.provider.send("evm_increaseTime", [remain.toNumber()]);
        await ethers.provider.send("evm_mine", []);

        // 確認事項
        // ID:1 は account1 が所有
        // account1 は dball の所有数 0
        token = await contract.connect(account2).tokenURI(1);
        token = token.replace(/^data:\w+\/\w+;base64,/, "");
        decoded = Buffer.from(token, "base64").toString();
        let json = JSON.parse(decoded);
        expect(Number(json.count)).to.equal(0);

        // ID:1 は account1 が所有
        // account1 に dball を送り所有数 1
        dball.connect(owner).transferFrom(owner.address, account1.address, 1);

        token = await contract.connect(account2).tokenURI(1);
        token = token.replace(/^data:\w+\/\w+;base64,/, "");
        decoded = Buffer.from(token, "base64").toString();
        json = JSON.parse(decoded);
        expect(Number(json.count)).to.equal(1);

        // 時間戻す
        await ethers.provider.send("evm_increaseTime", [remain.toNumber()]);
        await ethers.provider.send("evm_mine", []);

        decoded = await contract.hoge(1, dball.address);
        console.log("decoded:", decoded);
    });
});
