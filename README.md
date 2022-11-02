# D-BALL Project

OpenSeaに散らばっている7種類のボールNFTを1つのホルダーNFTに収集します

集めたボールがホルダーに反映されます。  
7種類集めると特別な画像が出現します。

## 1. tech stacks

- バックエンドスマートコントラクト Ethereum ERC721
- バックエンド開発フレームワーク Hardhat

## 2. 使用したBlockchain

Ethereum Goerli testnet

## 3. deployしたContract

コントラクトは2種類あります

- ホルダーNFT
- ボールNFT

### 3.1 ホルダーNFT

- 0x71165B3Bc6a6CF64Cb74581703b5FC85d14373F3

### 3.2 ボールNFT(7種類)

- 0x869C935bb152D77a7dfEb00439b9fE1831F6EE44
- 0x661Ca7D531b0386fCD7FD177FbdfA0d3e9cD4c97
- 0x430FDF0991bd47dA8927BAb9eBfA937Dcb8dA528
- 0xB98286d7932e4eEaa5541f76A3ADde9892E3E8D3
- 0xdBB38d0D31394CE687d285958563a7abB05e45aC
- 0x5dcdad37cfc26d850af28f6cfba78a6f6671ed07
- 0x4D74597fd58501353f19994650B6E40a18c37ddf

## 4. CODE

- ホルダーNFT: contracts/CollectBall.sol
- ボールNFT: contracts/Ball.sol

## 5. テスト手順

npx hardhat test test/CollectBall.js

## 6. 審査やテストのためにプロジェクトにアクセスする方法

- [ホルダーの購入先 (Goerliテストネット)](https://testnets.opensea.io/collection/d-ball-v3)
- [ボールの購入先(Goerliテストネット)](https://testnets.opensea.io/0x52C4e86EfdF4e0b7a8b2aa051cf9057D7a7f7d25)
