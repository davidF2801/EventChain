const fs = require('fs');
const TronWeb = require('tronweb');
require('dotenv').config();

const rawdata = fs.readFileSync('build/contracts/Event.json');
const compiledContract = JSON.parse(rawdata);

const abi = compiledContract["abi"];
const bytecode = compiledContract["bytecode"];

const fullNode = process.env.FULL_NODE;
const eventServer = process.env.EVENT_SERVER;
const privateKey = process.env.PRIVATE_KEY;



const tronWebInst = new TronWeb.TronWeb({
  
    fullNode: fullNode,
    solidityNode: fullNode,
    eventServer: eventServer,
    privateKey: privateKey,
  
});

const contract = tronWebInst.contract().new({
   abi: abi,
   bytecode: bytecode,
   feeLimit: 100000000,
   callValue: 0,
   parameters: [100, "TGDjYUzyDrPwBr19DzTNX4kgvanDv6ccMe", 10]
}).then(result => {console.log(result.address); }).catch(error => {console.error(error); });

