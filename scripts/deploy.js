async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const ATM = await ethers.getContractFactory("ATM");
    const atm = await ATM.deploy();
  
    console.log("ATM contract deployed to:", atm.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
    