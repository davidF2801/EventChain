const fs = require('fs');
const TronWeb = require('tronweb');
const bip39 = require('bip39');
require('dotenv').config();
async function getPrivateKeyFromMnemonics(mnemonics) {
  const seed = await bip39.mnemonicToSeed(mnemonics);
  const node = bip32.fromSeed(seed); // bip32 is part of the bitcoinjs-lib, which you might need to install
  const child = node.derivePath("m/44'/195'/0'/0/0"); // Standard TRON derivation path
  return child.privateKey.toString('hex');
}
async function deployEvent(address, nTickets, ticketPrice, allowResale, resaleFee) {
  console.log(`Current working directory: ${process.cwd()}`);
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
    console.log('Connected to Shasta network!');
    const contract = await tronWebInst.contract().new({
      abi: abi,
      bytecode: bytecode,
      feeLimit: 1000000000,
      callValue: 0,
      parameters: [nTickets, address, ticketPrice, allowResale, resaleFee],
    });
  
    console.log('Contract deployed successfully at address:', contract.address);
    return contract.address; // You can also return the address
  }
module.exports = deployEvent;
