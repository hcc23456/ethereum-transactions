//https://www.npmjs.com/package/axios
const axios = require('axios');
const Transaction = require('./transaction.js');
const walletAddress = "0x299f770d90334c11f6ae65d770a7ce733f1154d7";
const etherscanAPIKey = "ETENPJ2XTDDW1DX86PAHA65E2G3D1NWY39";
//https://www.npmjs.com/package/ethereum-input-data-decoder
const inputDataDecoder = require('ethereum-input-data-decoder');
const accountAPIURL100 = "https://api.etherscan.io/api?module=account&action=txlist&address="+walletAddress+"&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey="+etherscanAPIKey;
const transactionHashAPIURLPart1 = "https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=";
const transactionHashAPIURLPart2 = "&apikey="+etherscanAPIKey;
//add 0x to sourceCodeAPIURLPart1+sourceCodeAPIURLPart2
const sourceCodeAPIURLPart1 ="https://api.etherscan.io/api?module=contract&action=getsourcecode&address=0x";
const sourceCodeAPIURLPart2 = "&apikey="+etherscanAPIKey;
const actions = {addLiquidity:394, removeLiquidity:650, swapETHToToken:458, swapTokenToETH:522, swapTokenToToken:586};
const actionsList = ["removeLiquidityETHWithPermit","addLiquidityETH","swapExactETHForTokens","swapExactTokensForETH","swapExactTokensForTokens"];
const ethereumDecimals = 1000000000000000000; 
const uniswapContractAddress = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d";
const uniswapABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const decoder = new inputDataDecoder(uniswapABI);
let uniswapTransactions = new Array();
let transactionToCSV = new Array();
//https://www.npmjs.com/package/csv-writer
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: "C:/temp/transactions.csv",
    header: [
        {id: 'transactionID', title: 'transactionID'},
        {id: 'transactionFee', title: 'transactionFee'},
        {id: 'transactionType', title: 'transactionType'},
        {id: 'transactionAssets', title: 'transactionAssets'},
        {id: 'transactionAmounts', title: 'transactionAmounts'},
        {id: 'erc20ContractAddresses', title: 'erc20ContractAddresses'},
        {id: 'timeStamp', title: 'timeStamp'},
        {id: 'isError', title: 'failed transaction'}
    ]
});

axios.get(accountAPIURL100)
    .then(response => {
        uniswapTransactions =  response.data.result.filter(trans => trans.to === uniswapContractAddress);
        createTransactionObjs(uniswapTransactions);
        getTransactionDetails(transactionToCSV).then(function(){
            writeToCSV(transactionToCSV);
        });
    })
    .catch(error => {
        console.log(error);
    });

function createTransactionObjs(uniswapTransactions){
    for(var i=0; i<uniswapTransactions.length; i++){
        let transaction = new Transaction();
        transaction.transactionInput = uniswapTransactions[i].input;
        transaction.transactionFee = (uniswapTransactions[i].gasUsed*uniswapTransactions[i].gasPrice)/ethereumDecimals;
        transaction.transactionID = uniswapTransactions[i].hash;
        transaction.timeStamp = uniswapTransactions[i].timeStamp;
        if(uniswapTransactions[i].value > 0){
            transaction.value = uniswapTransactions[i].value;
        }
        if(uniswapTransactions[i].isError==1){ // because is string, === expects correct type too
            transaction.isError = true;
        }

        transactionToCSV.push(transaction);
    }
}

function decodeTransaction(inputData){
    return decoder.decodeData(inputData);
}

function writeToCSV(csvData){
    csvWriter.writeRecords(csvData).then(()=> console.log('write success!'));
}

async function getTransactionDetails (transCSV){
    for(var j=0; j<transCSV.length; j++){
        let decodedData = decodeTransaction(transCSV[j].transactionInput);
        transCSV[j].transactionType = decodedData.method;

        if(decodedData.method==="addLiquidityETH"){
            //right now 2021-10-17 its only 1 token+ETH that can be added per transaction
            let contractAddresses = new Array();
            contractAddresses.push(decodedData.inputs[0]); //because not array for this type, single string, getContractName expects array
            contractAddresses.push(undefined); //for csv spacing formatting
            let tokenOther = parseInt(Number(decodedData.inputs[1]), 10); //hex to decimal
            let symbol = await getContractName(contractAddresses);
            transCSV[j].transactionAssets = ["ETH", symbol[0]]; //know eth is in trans, and only 1 other
            transCSV[j].transactionAmounts = [transCSV[j].value, tokenOther]; //know eth value already
            transCSV[j].erc20ContractAddresses = "0x"+contractAddresses[0];
        }
        if(decodedData.method==="swapExactETHForTokens"){
            //right now 2021-10-17 its only ETH to 1 token swap per transaction
            let tokenOut = parseInt(Number(decodedData.inputs[0]), 10); //hex to decimal
            let contractAddresses = decodedData.inputs[1];
            let symbol = await getContractName(contractAddresses);
            transCSV[j].transactionAssets = ["ETH", symbol[1]]; //know eth is in trans, and only 1 other in pos 1, 0 pos is eth
            transCSV[j].transactionAmounts = [transCSV[j].value, tokenOut]; //know eth value already
            for(var a=0; a<contractAddresses.length; a++){
                contractAddresses[a] = "0x"+contractAddresses[a];
            }
            transCSV[j].erc20ContractAddresses = contractAddresses;
        }
        if(decodedData.method==="removeLiquidityETHWithPermit"){
            //right now 2021-10-17 its only 1 token+ETH that can be removed per transaction
            let contractAddresses = new Array();
            contractAddresses.push(decodedData.inputs[0]); //because not array for this type, single string, getContractName expects array
            contractAddresses.push(undefined); //for csv spacing formatting
            let tokenOther = parseInt(Number(decodedData.inputs[2]), 10) //hex to decimal
            let tokenETH = parseInt(Number(decodedData.inputs[3]), 10);
            let symbol = await getContractName(contractAddresses);
            transCSV[j].transactionAssets = ["ETH", symbol[0]]; //know eth is in trans, and only 1 other in pos 0 returned
            transCSV[j].transactionAmounts = [tokenETH, tokenOther];
            transCSV[j].erc20ContractAddresses = "0x"+contractAddresses[0];
        }
        if(decodedData.method==="swapExactTokensForETH"){
            //right now 2021-10-17 its only 1 token to ETH swap per transaction
            let contractAddresses = decodedData.inputs[2];
            let tokenIn = parseInt(Number(decodedData.inputs[0]), 10); //hex to decimal
            let tokenETH = parseInt(Number(decodedData.inputs[1]), 10); 
            let symbol = await getContractName(contractAddresses);
            transCSV[j].transactionAssets = [symbol[0], symbol[1]];
            transCSV[j].transactionAmounts = [tokenIn,tokenETH];
            for(var a=0; a<contractAddresses.length; a++){
                contractAddresses[a] = "0x"+contractAddresses[a];
            }
            transCSV[j].erc20ContractAddresses = contractAddresses;
        }
        if(decodedData.method==="swapExactTokensForTokens"){
            //right now 2021-10-17 its only 1 token to 1 token swap per transaction
            let contractAddresses = decodedData.inputs[2];
            let tokenIn = parseInt(Number(decodedData.inputs[0]), 10); //hex to decimal
            let tokenOut = parseInt(Number(decodedData.inputs[1]), 10);
            let symbol = await getContractName(contractAddresses);
            transCSV[j].transactionAssets = [symbol[0], symbol[symbol.length-1]]; //only care about the start and end, not assets in mid
            transCSV[j].transactionAmounts = [tokenIn, tokenOut];
            let startAndEndAssetAddresses = new Array();
            startAndEndAssetAddresses.push("0x"+contractAddresses[0]);
            startAndEndAssetAddresses.push("0x"+contractAddresses[contractAddresses.length-1]); //only care about the start and end, not assets in mid
            transCSV[j].erc20ContractAddresses = startAndEndAssetAddresses;
        }
    }
}

async function getContractName(contractAddresses){
    let contractSymbols = new Array();
    for(var i=0; i < contractAddresses.length; i++){
        let tokenContractAPISourceCode = sourceCodeAPIURLPart1+contractAddresses[i]+sourceCodeAPIURLPart2;
        await axios.get(tokenContractAPISourceCode) //need to await the axios promise
            .then(response => {
                contractSymbols.push(response.data.result[0].ContractName);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return contractSymbols;
}