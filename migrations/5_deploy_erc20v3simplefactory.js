const ERC20V3SimpleFactory = artifacts.require("ERC20V3SimpleFactory");

module.exports = function(deployer) {
  deployer.deploy(ERC20V3SimpleFactory, 
    0x15c50441417b441cbb3a43d858e5f1c0a164d5ad, // cloneFactory contract address(can be Factory.sol) https://goerli.etherscan.io/address/0x15c50441417b441cbb3a43d858e5f1c0a164d5ad
    0x0e798BCbafD46a309b4FF3e84Bb7B5fA15E5C441, // erc20Template contract address(can be ERC20Token.sol) https://goerli.etherscan.io/address/0x0e798bcbafd46a309b4ff3e84bb7b5fa15e5c441
    0);
};
