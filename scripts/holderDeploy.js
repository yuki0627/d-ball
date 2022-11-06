const fs = require("fs");
const SETTINGS = require("../constant.js");

const main = async () => {
    NFT_COUNT = 5; // 0~ いくつmintしておくか

    contractFactory = await ethers.getContractFactory("Holder");
    // TODO: 修正
    contract = await contractFactory.deploy(SETTINGS[0], SETTINGS[1], SETTINGS[2], SETTINGS[3]);
    await contract.deployed();
    // TODO: コントラクトアドレスの書き出し
    console.log(`contract deployed to: https://goerli.etherscan.io/address/${contract.address}`);
    for (n = 0; n < NFT_COUNT; n++){
        tx = await contract.mint(`E-BALL-HOLDER#${n+1}`, 'Collected E-balls are displayed');
        await tx.wait(); //TODO: 必要？
        console.log('tx:', tx);
    }
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