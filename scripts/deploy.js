const fs = require("fs");
const main = async () => {
    addressList = [];
    ContractCount = 1; // 1-7 いくつの種類のボールをデプロイするか
    NftCount = 3; // 0~ ボールの種類ごと、いくつNFTをmintしておくか
    // デプロイ
    for (i = 0; i < ContractCount; i++){
        Ball = await ethers.getContractFactory("Ball");
        contract = await Ball.deploy(`TEST-D-BALL-${i+1}`, `TDB${i+1}`);
        await contract.deployed();
        console.log(`contract${i} deployed to: https://goerli.etherscan.io/address/${contract.address}`);
        addressList.push(contract.address);
        for (n = 0; n < NftCount; n++){
            tx = await contract.nftMint(`D-BALL-${i + 1}`, `${n + 1}/${NftCount}`);
            await tx.wait();
            console.log('NFT minted:', `BALL-${i + 1}: NFT-${n + 1}`);
        }
    }

    // コントラクトアドレスの書き出し
    fs.writeFileSync(`./collectBallSettings.js`,
        `module.exports = {
            contractName: 'tmp Collect Balls',
            shortName: 'TCB',
            targetAddresses: ${JSON. stringify(addressList)}
        }
        `
    );
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