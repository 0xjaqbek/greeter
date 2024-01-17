        let provider, signer, contract;

        function initializeProviderAndSigner() {
            provider = new ethers.providers.JsonRpcProvider("https://alpha-hardworking-hill.zksync-mainnet.discover.quiknode.pro/d99dcc44f4ffb9dbe9bfb66434b9765b5ff44dbb/");
            signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
            const contractAddress = "0xf0CF19F798BF5B98b5201906EC3a460075612C83";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_greeting",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getOwnerGreeting",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x783b4904"
  },
  {
    "inputs": [],
    "name": "getTotalGreetingsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xd0a3eb18"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getUserGreeting",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x18236050"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_greeting",
        "type": "string"
      }
    ],
    "name": "setOwnerGreeting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xeb0e70b7"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_greeting",
        "type": "string"
      }
    ],
    "name": "setUserGreeting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x0da0d54d"
  }
];

            contract = new ethers.Contract(contractAddress, contractABI, signer);
        }

window.onload = async function() {
    if (window.ethereum) {
        await window.ethereum.enable();
        initializeProviderAndSigner();
        const totalGreetings = await contract.getTotalGreetingsCount();
        document.getElementById('totalGreetings').innerText = `Total Greetings: ${totalGreetings}`;
    } else {
        console.log('Please install MetaMask!');
    }
}

async function updateTotalGreetings() {
    const totalGreetings = await contract.getTotalGreetingsCount();
    document.getElementById('totalGreetings').innerText = `Total Greetings: ${totalGreetings}`;
}

        document.getElementById('connect').onclick = async function() {
            const address = await signer.getAddress();
            alert(`Connected with the address ${address}`);
        }

        document.getElementById('getOwnerGreeting').onclick = async function() {
            const greeting = await contract.getOwnerGreeting();
            alert(`The owner's greeting is: ${greeting}`);
        }


document.getElementById('getUserGreeting').onclick = async function() {
    const index = prompt("Enter the index of the greeting you want to display:");
    const greeting = await contract.getUserGreeting(index);
    alert(`Greeting ${index}:from: ${greeting}`);
}

        document.getElementById('setUserGreeting').onclick = async function() {
            const newGreeting = prompt("Enter a new greeting for the user:");
            const changeGreetingTx = await contract.setUserGreeting(newGreeting);
            console.log(`Setting user's greeting to: ${newGreeting}`);
            await changeGreetingTx.wait();
            alert('User\'s greeting updated!');
        }
