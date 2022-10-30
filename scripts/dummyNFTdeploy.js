const fs = require("fs");
const main = async () => { 
    // デプロイ
    for (i = 0; i < 7; i++){
        DummyNFT = await ethers.getContractFactory("DummyNFT");
        contract = await DummyNFT.deploy();
        await contract.deployed();

        console.log(`contract${i} deployed to: https://goerli.etherscan.io/address/${contract.address}`);

        // コントラクトアドレスの書き出し

        fs.writeFileSync(`./dummyNFTcontract${i}.js`,
            `
            module.exports = "${contract.address}"
            `
        );
    }
};

const memberNFTDeploy = async () => { 
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

memberNFTDeploy();