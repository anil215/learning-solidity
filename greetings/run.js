// write a smart contract, compile the smart contract, deploy the smart contract,
// get an initail value, how to change the value, check if the value has changed.
// This deploy process can be greatly simplified using truffle.

var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');

// create a new instane of the Web3 object
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// accounts available on our test rpc node
console.log(web3.eth.accounts);

sourceCode = fs.readFileSync('Greetings.sol').toString();
compiledCode = solc.compile(sourceCode);
contractABI = JSON.parse(compiledCode.contracts[':Greetings'].interface);
byteCode = compiledCode.contracts[':Greetings'].bytecode;

greetingsContract = web3.eth.contract(contractABI);
greetingsDeployed = greetingsContract.new({data:'0x' + byteCode, from:web3.eth.accounts[0], gas:4700000});
console.log(greetingsDeployed.address);

// instance of greeting contract
greetingsInstance = greetingsContract.at(greetingsDeployed.address);
// now we can access then funtionality of our smart contracts
console.log(greetingsInstance.getGreetings());
// returns the transactions hash
greetingsInstance.setGreetings('hello anil!!', {from :web3.eth.accounts[0]});
console.log(greetingsInstance.getGreetings());
