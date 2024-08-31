const { ethers } = require("hardhat");
async function main() {
  console.log("Deploy smart contract");
  const Medical = await ethers.getContractFactory("MedicalRecord");
  const accounts = await ethers.getSigners();
  const medical = await Medical.connect(accounts[0]).deploy();
  // Replace deployed() with waitForDeployment() for ethers.js v6+
  // await medical.waitForDeployment();
  await medical.deployed();
  console.log(`Medical is deployed in address ${medical.address}`);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
