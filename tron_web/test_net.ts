import TronWeb from 'tronweb';

// Define the nodes and private key
const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io';
const privateKey = 'your-private-key'; // Replace 'your-private-key' with your actual private key

// Create a new TronWeb instance
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

// Create an account using TronWeb
async function createAccount() {
    try {
        const account = await tronWeb.createAccount();
        console.log(`Address: ${account.address.base58}`);
        console.log(`Private Key: ${account.privateKey}`);
    } catch (error) {
        console.error('Failed to create an account:', error);
    }
}

createAccount();
