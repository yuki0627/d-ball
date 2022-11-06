# D-BALL Project

フルオンチェーンで遊べるNFT収集

自分のウォレットを知らないサイトに繋ぐのって怖くないですか？  
E-BALLはOpenSea上(Raribleなどでも)で収集対象NFT集めるフルオンチェーンのNFTプロジェクトです。  
収集対象のアイテムNFTが自分のウォレットに入るとホルダーと呼ばれるNFTがOpenSeaで変化します。

## 遊び方

1. ホルダーと呼ばれるNFTを入手します
2. アイテムと呼ばれるNFTを入手します

取得したアイテムに応じてホルダーの状態が変化します。
ホルダーやアイテムはマーケトップレイスで入手したり誰かにエアドロップしてもらったりして収集してください。

[ホルダーの入手先](https://testnets.opensea.io/collection/e-ball-holder)

[アイテムの入手先(7つのコントラクトに分かれています)] (https://testnets.opensea.io/0x1F7f21cd01E7E9dB4F848BF329A2dCcE2DC405b8)

発展した利用ケース

- シリーズ系NFTの販売促進
- ラジオ体操的な勉強会POAPスタンプカード
- 学習の進捗に応じたアイテムの配布
- NFT宝探し
- NFTを活用したゲームなど

## 1. tech stacks

- バックエンドスマートコントラクト Ethereum ERC721
- バックエンド開発フレームワーク Hardhat

## 2. 使用したBlockchain

Ethereum Goerli testnet

## 3. deployしたContract

コントラクトは2種類あります

- ホルダーNFT
- アイテムNFT

### 3.1 ホルダーNFT

- 0x288c36964aaad56e2545d47AE81815416183056B

### 3.2 アイテムNFT(7種類)

- 0xB2C58273a3D65245CDEa6cA3cD9C86Bd278106c2,
- 0x33fEA4cD902f64F3374e008DC88D3e58391deE2D,
- 0xB6a12cedF1f86fa973e4C067b01cA35185Dd3d30,
- 0xb685c42379eAd23FaCE4aE2b789598950ecaBd21,
- 0xED28Ab26d9542a3A5F01CA7d9D4DA1f0c7D4bDC2,
- 0xDf2C9DdbDC0312345d101ee95BdF46f2097eB63d,
- 0x206725eEC40478a1444202AB548dE55C07D47e0B

## 4. CODE

- ホルダーNFT: contracts/Holder.sol
- アイテムNFT: contracts/Ball.sol

## 5. テスト手順

npx hardhat test test/Holder.js

## 6. 審査やテストのためにプロジェクトにアクセスする方法

- [ホルダーの購入先 (Goerliテストネット)](https://testnets.opensea.io/collection/e-ball-holder)
- [ボールの購入先(Goerliテストネット)](https://testnets.opensea.io/0x1F7f21cd01E7E9dB4F848BF329A2dCcE2DC405b8)
