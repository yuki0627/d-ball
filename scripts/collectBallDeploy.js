const fs = require("fs");
const BALL_CONTRACT_LIST = require("../constBallContractList.js");
const SETTINGS = require("../constant.js");

const main = async () => {

    contractFactory = await ethers.getContractFactory("CollectBall");
    contract = await contractFactory.deploy(BALL_CONTRACT_LIST, SETTINGS.placedBalls, SETTINGS.dragon);
    await contract.deployed();
    // TODO: コントラクトアドレスの書き出し
    console.log(`contract deployed to: https://goerli.etherscan.io/address/${contract.address}`);
};

const deploy = async () => { 
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

deploy();