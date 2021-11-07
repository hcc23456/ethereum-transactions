Node JS implementation to get Uniswap transactions for an Ethereum addresses and output to a CSV.

You will need to specify an Ethereum address. The response set is defaulted to 100. You should provide your own Etherscan
API key.

Requirements:
node 14.9
npm 6.14.8
axios 0.23.0
ethereum-input-data-decoder 0.3.5
csv-writer 1.6.0

Note: even though etherscan says its api key is only for testnet, it does work for mainnet. At least as of 10/2021
Note: to get a contract ABI from input data, you can go here: https://lab.miguelmota.com/ethereum-input-data-decoder/example/