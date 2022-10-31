const { expect } = require("chai");
const { ethers } = require("hardhat");

import("hardhat/config").HardhatUserConfig;

describe("D-BALL Basic", function () {
    beforeEach(async function () {
        ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
        data = [];
        for (i = 0; i < 7; i++){
            data[i] = "hoge";
        }
        data[0] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-558.988 17.593) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 98.545 -17.243)"/>';
        data[1] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-323.644 14.276) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 318.115 -18.128)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 348.309 -18.128)"/>';
        data[2] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-438.806 203.512) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 218.628 157.112)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 205.897 177.946)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 231.36 177.946)"/>';
        data[3] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-444.015 -31.442) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 212.816 -84.258)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 193.059 -66.003)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 212.816 -47.22)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 232.466 -66.003)"/>';
        data[4] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-559.177 146.22) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 98.258 88.51)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 74.216 104.293)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 82.003 130.599)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 112.045 130.599)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 121.142 104.659)"/>'

        data[5] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-321.908 145.063) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 336.841 86.036)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 312.8 101.818)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 320.587 128.124)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 350.628 128.124)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 359.726 102.184)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 336.841 109.974)"/>';

        data[6] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-442.857 86.035) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 214.577 25.536)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 188.536 38.319)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 190.323 62.624)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 238.365 63.624)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 239.462 38.684)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 214.577 51.474)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 215.42 76.83)"/>';

        dragon = '<svg width="350" height="350" viewBox="0 0 350 350" xmlns="http://www.w3.org/2000/svg" style="enable-background:new 0 0 1400 980"><path style="fill:#fff;fill-opacity:0;pointer-events:none" d="M0 0h350v350H0z" fill="none"/><path class="st3" d="M456.9 400.3c-1.1-.1-2.2-.9-3-1.7-.1 1.5-1.2 2.6-2.1 2.1-1.1-.6-1.2-1.7.8-3.5.4-1.9 2.6-4.3 5.1-6.6-6.4 5-12.8 9.9-11.2 14 .8-.6 1.8-1.1 2.6-.8 1.1.4 1 1.4.4 2.3-.9.7-1.9 1-2.9 1.1.5 1.7-.2 3.7-1 5.7-1.6.5-3.3 1.4-5.3 2.5 4.2-5.6 6.1-13.9 3.7-20.4-1.4-3.8-4.3-6.4-7.6-8.1-4.2-2.2-9.3-3.1-13.7-3.6-14.4-1.4-19.6-10.8-15.1-17.5 4-5.9 14.8-4.9 22.3 2.6.5.5.7 1 .9 1.6-1-.9-2-1.4-3.2-1.5-2.8-.3-5.2-1.3-6.2-3.9.1 3.1 2.2 4.9 4 6.8-4.4-.7-7.4-2.9-9.8-5.5 3.6 6.5 7.8 8.5 12.4 8.4 2.1 1 4.4 1.9 6.9 2.7.5.7 1 1.2 1.6 1.7.2.2.5.4.7.7.8.9 1 2 2.4 2.7-.5-.9-.9-1.9-1.1-3-.2-1-.5-1.9-1.2-2.9 2.1 1.5 4.2 2.6 6.5 2.8 4.8.5 6.3 1.3 8.3 6.8 1.4-3.7 2.3-9.1-4.3-11.2-2-.7-3.3-3.3-3.8-5.3.9 0 1.9.5 2.9 1.4-.8-3.6-2.5-6.8-6.5-9.2-2.3-2.8-3.6-5.4-3.9-8-.2-1-.2-2.1 0-3.1.1-.6.2-1.1.4-1.7-.1.2-.3.4-.4.6-1.6 2.5-2.6 5.3-2.8 8.5-5.7-4.8-7.2-10.4-4.8-16.8-3 3.2-4.4 7.1-3.8 11.9-1.6-2.8-2-5.6-1.3-8.5-2.4 2.9-2.7 6-2.5 9.4-1.5-2.1-1.9-4.3-1.5-6.5-1.6 2.3-1.9 4.9-1.8 7.5-7.1-2.2-10-6.7-9.2-13.3-3.1 4.9-1.6 9.5 1.8 14-5.5-.2-10-1.4-12.7-4 1.7 3.6 4.3 5.8 7.9 6.8-5.8 3.9-9.3 11-8.2 17.2 1 5.7 6.1 10.4 12.6 12.1 2.9.8 5.4 2 6.2 4.6 1.3 4.1-1.6 5.9-3.4 6.1-2.3.2-3.7-1.9-3.2-3.5.5-1.5 1.9-1.6 2.7-1.1 1 .7 1 1.9-.2 2.3-.7.2-1.4-.5-1.7-1.3-.5 1.4.2 2.2 1.1 2.7 1.4.7 3.8-.8 4-2.4.4-3.3-2.9-6.1-7.7-4.8-1.9.5-3.7.7-5.8.7-3.3-2.4-5-5.3-4.3-8.9-1.8 3-2.2 6.3 0 10-1.2.3-2.7.6-3.8.1-5.8-2.8-3.6-12.8 1.6-15.4-4.4.9-6.9 3.6-8.3 7.3-1.7-9.3 4.9-19.5 14.1-25.8-16.8 3.5-34.2 18.9-36.6 41.4V410c.5 4.5 1.5 9.2 3.2 14.1-3.8-19.4-.6-35.3 10.7-47.2-3.3 5.9-5.1 14.4-.8 25.7-1.9-9.2-.4-17.2 3.4-24.2-1.4 8.4-.9 16.5 8.5 23.1-1.5-1.8-3-3.6-3.3-5.9 3.8 3.5 8.3 4.1 13.6 2.1-1.8 2-3.9 3.3-7.1 4.3 3.3.2 7.1-1.3 10.8-3.3-1 1.8-3.1 3.3-5.6 4.8 1.9-.3 4.7-.9 7.4-2.6 4.6 4.6 10 2.6 15.1-2.3.5 2.8-.1 5.5-2 8.1 3.9-3.1 6.4-6.8 6.1-11.4 2.3 2.2 2.1 4.5.5 6.6 3.1-2 3.9-4.6 3.3-8 1.8 2.1 2.2 3.7 1.3 5.8 1.2-.9 2.2-2 2.6-4.1 1.4 3.5.9 6.5-2.2 9.2.9 0 1.7-.2 2.7-.6-2.7 3.6-7.1 2.6-8.3-.6.3 4.3 3.5 5.8 6.8 7.1-.3.4-.7 1-1.3 1.2-4.7 1.5-8.5-2.3-8.5-5.9-.7 1.7-.8 3.4-.2 5.3-4.3-4.5-11.6-8.6-21.6-6.8-4.5.8-11.3.1-13.5-2.9.2 2.8 1.2 5 2.6 6.8-5 4.3-9.7 6.4-14.2 6.4 2.6 2.2 5.7 2.4 9 1.8-.8 4-3.3 7.2-7.4 9.8 2.4-.2 4.8-1.2 7-2.7-.1 2.2-.9 4.2-2 6.2 1.3-.7 2.4-1.8 3.3-3 2.6 6 7.1 9.4 13.2 10.7 1.1 1 1 2.2.4 3.4 1.9-.9 3.1-2.1 3.6-3.7 4.8-.3 9.2-1.6 13.4-3.3-.2 2 .4 3.6 1.9 4.7.1-4.7 3.7-5.6 6-4.5 3.2 1.6 3.9 6.5-.4 9.1 3.2-.6 5.8-2.1 7-5.3 1.9 5.7-.2 11.2-8.2 14.5-.9.4-3.6.3-3.1-.6 2-3.3 2.5-4.9 2.4-7.4-1.8 2.7-3.9 4.2-6.1 5.2 1.6-3 2-6.1 1.2-9.1-3.6 11-14.9 11.3-24 4 6 10.9 18.3 16.3 26 16.1-2-1.3-3.7-2.9-4.9-4.7 6.2 1.3 11.5.9 15.8-1.5 2.9-1.6 5.4-4.1 7.4-7.6.3-.5.5-.9.8-1.4 2.9.2 5-.6 6.2-2.3-3.4.1-5.7-1.1-6.3-4 3.5-.7 4.8-2.4 4.7-4.7-1.4 2.1-3.5 1.7-5.4 0-.1-.1-.2-.3-.4-.4-5.4-5.4-11.9-8-23.2-5-8.9 2.3-19.3.2-20.4-7.9 2.9 2.2 5.3 2.8 7.6 2.6-4.1-2.8-4.1-6.8-1.3-9.9 1.9-2.1 5.9-3.6 8.5-1 1.9 1.9.9 5-.9 5.8-2 .9-4.7-.1-5.7-3.4.1 5.5 3 8.1 7.1 6.9 2.1-.6 3.8-2.1 5.4-3.7-.2 1.6-1.3 3-2.7 4.3 2.9-.3 4.5-1.6 5.5-3.1 5.8 3.2 11.9 3.5 18.3.6-1.1 2.9-3.4 5.2-6.3 7 3.2-1.1 6.1-2.7 8.5-5.2l.8-.8c-.2.6-.5 1.2-.8 1.7-.9 1.6-2.2 2.9-3.6 4.3 1.2-.6 2.4-1.3 3.6-2 4.1-2.6 7.5-5.8 10.6-9.2-.2 2.3-1.5 4.6-3.4 6.7 3-1.5 4.6-3.4 5.4-5.6 3.9 1.7 6.1-1.3 5.4-3.7-.4.9-1.1 1.5-1.7 1.2-2-.9-3.1-3.8 1.2-5.6.4.5 1.1 1 1.7 1.3 1.2.5 1.4 1.6 1.7 2.6 1.2-3 .8-5.6-1.3-7.7-2.5.2-4.5 1.8-6.4 3.7 3.8-7.5 11-7 11.9-2.7.4-3-.9-5.8-4.6-6zm-21.6-34.2c-.8-.9-1-1.9-1.2-2.8.5.7 1.1 1.2 1.8 1.5.2.1.4.2.5.3 1.5.9 2.4 2.1 3 3.4-.8-.3-1.5-.4-2.2-.4h-.8c-1.1-.1-2.1-.5-3-1.1.3-.5 1.1-.7 1.9-.9z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#117824" transform="matrix(-2.60328 0 0 2.60328 1248.038 -871.544)"/></svg>';
        externalContracts = [];
        [owner, account] = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("Dball");
        contract = await contractFactory.deploy(data, dragon);
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

    it("TargetContractが設定されていなくてもエラーとならない", async function () {
        for (let i = 0; i < 7; i++) {
            contract.setTargetContract(i, ZERO_ADDRESS);
        }
        count = await contract.connect(account).getNumberOfBalls(account.address);
    });

    it("所有している対象NFTの種類の数を取得できる", async function () {
        targetContract = externalContracts[0];
        await targetContract.connect(account).nftMint();

        targetContract = externalContracts[4];
        await targetContract.connect(account).nftMint();
        await targetContract.connect(account).nftMint();

        count = await contract.connect(account).getNumberOfBalls(account.address);
        expect(count.toNumber()).to.equal(2);
    });

    it("所有しているBallCollectionを取得できる", async function () {
        targetContract = externalContracts[0];
        await targetContract.connect(account).nftMint();

        targetContract = externalContracts[4];
        await targetContract.connect(account).nftMint();

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

    it("tokenURI で取得した画像に所有数が表示されている", async function () {
        // ドラゴンレーダー作成
        await contract.connect(account).mint("hoge", "fuga");

        // ドラゴンボール収集
        count = 7;
        for (i = 0; i < count; i++) {
            targetContract = externalContracts[i];
            await targetContract.connect(account).nftMint();
        }

        // ドラゴンレーダー取得
        tokenId = 0;
        token = await contract.tokenURI(tokenId);
        collected_count = await contract.getNumberOfBallsNftHas(tokenId);
        console.log('collected_count:', collected_count);

        // ドラゴンレーダーに収集した数が含まれているかどうか
        token = token.replace(/^data:\w+\/\w+;base64,/, '');
        decoded = Buffer.from(token, 'base64').toString();

        let json = JSON.parse(decoded);
        decoded = json.image.replace("data:image/svg+xml;base64,", '');
        image = Buffer.from(decoded, 'base64').toString();
        console.log('image:', image);
        exist = image.includes(`${count}</text>`)
        expect(exist).to.equal(true);
    });
});
    
describe("D-BALL Admin", function () {
    beforeEach(async function () {
        data = [];
        for (i = 0; i < 7; i++){
            data[0] = "hoge";
        }
        data[0] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-558.988 17.593) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 98.545 -17.243)"/>';
        data[1] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-323.644 14.276) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 318.115 -18.128)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 348.309 -18.128)"/>';
        data[2] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-438.806 203.512) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 218.628 157.112)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 205.897 177.946)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 231.36 177.946)"/>';
        data[3] = '<path class="st0" d="M652 46c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z" style="stroke:#e48524;paint-order:fill;stroke-width:3" transform="translate(-444.015 -31.442) scale(.94051)" fill="#e48524"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 212.816 -84.258)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 193.059 -66.003)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 212.816 -47.22)"/><path d="m239 626.2 11.6 35.8h37.6l-30.4 22.1 11.6 35.8-30.4-22.1-30.4 22.1 11.6-35.8-30.4-22.1h37.6Z" class="st0" style="fill:#df3325;stroke:#000;stroke-opacity:0" transform="matrix(-.18503 0 0 .18503 232.466 -66.003)"/>';
        dragon = '<svg width="350" height="350" viewBox="0 0 350 350" xmlns="http://www.w3.org/2000/svg" style="enable-background:new 0 0 1400 980"><path style="fill:#fff;fill-opacity:0;pointer-events:none" d="M0 0h350v350H0z" fill="none"/><path class="st3" d="M456.9 400.3c-1.1-.1-2.2-.9-3-1.7-.1 1.5-1.2 2.6-2.1 2.1-1.1-.6-1.2-1.7.8-3.5.4-1.9 2.6-4.3 5.1-6.6-6.4 5-12.8 9.9-11.2 14 .8-.6 1.8-1.1 2.6-.8 1.1.4 1 1.4.4 2.3-.9.7-1.9 1-2.9 1.1.5 1.7-.2 3.7-1 5.7-1.6.5-3.3 1.4-5.3 2.5 4.2-5.6 6.1-13.9 3.7-20.4-1.4-3.8-4.3-6.4-7.6-8.1-4.2-2.2-9.3-3.1-13.7-3.6-14.4-1.4-19.6-10.8-15.1-17.5 4-5.9 14.8-4.9 22.3 2.6.5.5.7 1 .9 1.6-1-.9-2-1.4-3.2-1.5-2.8-.3-5.2-1.3-6.2-3.9.1 3.1 2.2 4.9 4 6.8-4.4-.7-7.4-2.9-9.8-5.5 3.6 6.5 7.8 8.5 12.4 8.4 2.1 1 4.4 1.9 6.9 2.7.5.7 1 1.2 1.6 1.7.2.2.5.4.7.7.8.9 1 2 2.4 2.7-.5-.9-.9-1.9-1.1-3-.2-1-.5-1.9-1.2-2.9 2.1 1.5 4.2 2.6 6.5 2.8 4.8.5 6.3 1.3 8.3 6.8 1.4-3.7 2.3-9.1-4.3-11.2-2-.7-3.3-3.3-3.8-5.3.9 0 1.9.5 2.9 1.4-.8-3.6-2.5-6.8-6.5-9.2-2.3-2.8-3.6-5.4-3.9-8-.2-1-.2-2.1 0-3.1.1-.6.2-1.1.4-1.7-.1.2-.3.4-.4.6-1.6 2.5-2.6 5.3-2.8 8.5-5.7-4.8-7.2-10.4-4.8-16.8-3 3.2-4.4 7.1-3.8 11.9-1.6-2.8-2-5.6-1.3-8.5-2.4 2.9-2.7 6-2.5 9.4-1.5-2.1-1.9-4.3-1.5-6.5-1.6 2.3-1.9 4.9-1.8 7.5-7.1-2.2-10-6.7-9.2-13.3-3.1 4.9-1.6 9.5 1.8 14-5.5-.2-10-1.4-12.7-4 1.7 3.6 4.3 5.8 7.9 6.8-5.8 3.9-9.3 11-8.2 17.2 1 5.7 6.1 10.4 12.6 12.1 2.9.8 5.4 2 6.2 4.6 1.3 4.1-1.6 5.9-3.4 6.1-2.3.2-3.7-1.9-3.2-3.5.5-1.5 1.9-1.6 2.7-1.1 1 .7 1 1.9-.2 2.3-.7.2-1.4-.5-1.7-1.3-.5 1.4.2 2.2 1.1 2.7 1.4.7 3.8-.8 4-2.4.4-3.3-2.9-6.1-7.7-4.8-1.9.5-3.7.7-5.8.7-3.3-2.4-5-5.3-4.3-8.9-1.8 3-2.2 6.3 0 10-1.2.3-2.7.6-3.8.1-5.8-2.8-3.6-12.8 1.6-15.4-4.4.9-6.9 3.6-8.3 7.3-1.7-9.3 4.9-19.5 14.1-25.8-16.8 3.5-34.2 18.9-36.6 41.4V410c.5 4.5 1.5 9.2 3.2 14.1-3.8-19.4-.6-35.3 10.7-47.2-3.3 5.9-5.1 14.4-.8 25.7-1.9-9.2-.4-17.2 3.4-24.2-1.4 8.4-.9 16.5 8.5 23.1-1.5-1.8-3-3.6-3.3-5.9 3.8 3.5 8.3 4.1 13.6 2.1-1.8 2-3.9 3.3-7.1 4.3 3.3.2 7.1-1.3 10.8-3.3-1 1.8-3.1 3.3-5.6 4.8 1.9-.3 4.7-.9 7.4-2.6 4.6 4.6 10 2.6 15.1-2.3.5 2.8-.1 5.5-2 8.1 3.9-3.1 6.4-6.8 6.1-11.4 2.3 2.2 2.1 4.5.5 6.6 3.1-2 3.9-4.6 3.3-8 1.8 2.1 2.2 3.7 1.3 5.8 1.2-.9 2.2-2 2.6-4.1 1.4 3.5.9 6.5-2.2 9.2.9 0 1.7-.2 2.7-.6-2.7 3.6-7.1 2.6-8.3-.6.3 4.3 3.5 5.8 6.8 7.1-.3.4-.7 1-1.3 1.2-4.7 1.5-8.5-2.3-8.5-5.9-.7 1.7-.8 3.4-.2 5.3-4.3-4.5-11.6-8.6-21.6-6.8-4.5.8-11.3.1-13.5-2.9.2 2.8 1.2 5 2.6 6.8-5 4.3-9.7 6.4-14.2 6.4 2.6 2.2 5.7 2.4 9 1.8-.8 4-3.3 7.2-7.4 9.8 2.4-.2 4.8-1.2 7-2.7-.1 2.2-.9 4.2-2 6.2 1.3-.7 2.4-1.8 3.3-3 2.6 6 7.1 9.4 13.2 10.7 1.1 1 1 2.2.4 3.4 1.9-.9 3.1-2.1 3.6-3.7 4.8-.3 9.2-1.6 13.4-3.3-.2 2 .4 3.6 1.9 4.7.1-4.7 3.7-5.6 6-4.5 3.2 1.6 3.9 6.5-.4 9.1 3.2-.6 5.8-2.1 7-5.3 1.9 5.7-.2 11.2-8.2 14.5-.9.4-3.6.3-3.1-.6 2-3.3 2.5-4.9 2.4-7.4-1.8 2.7-3.9 4.2-6.1 5.2 1.6-3 2-6.1 1.2-9.1-3.6 11-14.9 11.3-24 4 6 10.9 18.3 16.3 26 16.1-2-1.3-3.7-2.9-4.9-4.7 6.2 1.3 11.5.9 15.8-1.5 2.9-1.6 5.4-4.1 7.4-7.6.3-.5.5-.9.8-1.4 2.9.2 5-.6 6.2-2.3-3.4.1-5.7-1.1-6.3-4 3.5-.7 4.8-2.4 4.7-4.7-1.4 2.1-3.5 1.7-5.4 0-.1-.1-.2-.3-.4-.4-5.4-5.4-11.9-8-23.2-5-8.9 2.3-19.3.2-20.4-7.9 2.9 2.2 5.3 2.8 7.6 2.6-4.1-2.8-4.1-6.8-1.3-9.9 1.9-2.1 5.9-3.6 8.5-1 1.9 1.9.9 5-.9 5.8-2 .9-4.7-.1-5.7-3.4.1 5.5 3 8.1 7.1 6.9 2.1-.6 3.8-2.1 5.4-3.7-.2 1.6-1.3 3-2.7 4.3 2.9-.3 4.5-1.6 5.5-3.1 5.8 3.2 11.9 3.5 18.3.6-1.1 2.9-3.4 5.2-6.3 7 3.2-1.1 6.1-2.7 8.5-5.2l.8-.8c-.2.6-.5 1.2-.8 1.7-.9 1.6-2.2 2.9-3.6 4.3 1.2-.6 2.4-1.3 3.6-2 4.1-2.6 7.5-5.8 10.6-9.2-.2 2.3-1.5 4.6-3.4 6.7 3-1.5 4.6-3.4 5.4-5.6 3.9 1.7 6.1-1.3 5.4-3.7-.4.9-1.1 1.5-1.7 1.2-2-.9-3.1-3.8 1.2-5.6.4.5 1.1 1 1.7 1.3 1.2.5 1.4 1.6 1.7 2.6 1.2-3 .8-5.6-1.3-7.7-2.5.2-4.5 1.8-6.4 3.7 3.8-7.5 11-7 11.9-2.7.4-3-.9-5.8-4.6-6zm-21.6-34.2c-.8-.9-1-1.9-1.2-2.8.5.7 1.1 1.2 1.8 1.5.2.1.4.2.5.3 1.5.9 2.4 2.1 3 3.4-.8-.3-1.5-.4-2.2-.4h-.8c-1.1-.1-2.1-.5-3-1.1.3-.5 1.1-.7 1.9-.9z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#117824" transform="matrix(-2.60328 0 0 2.60328 1248.038 -871.544)"/></svg>';
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

    it("hoge", async function () {
        for (let i = 0; i < 7; i++) {
            contract.setTargetContract(i, ZERO_ADDRESS);
        }
        await contract.getTargetContracts();
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
