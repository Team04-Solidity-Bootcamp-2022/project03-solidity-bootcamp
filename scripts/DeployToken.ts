import { ethers } from "ethers";
import { convertStringArrayToBytes32, getDefaultProposals } from "./_helper";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

export async function getSignerArray(): Promise<ethers.Wallet[]> {
  const provider = ethers.getDefaultProvider("goerli");
  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY_1 ?? "");
  const acc1 = new ethers.Wallet(process.env.PRIVATE_KEY_2 ?? "");
  const acc2 = new ethers.Wallet(process.env.PRIVATE_KEY_3 ?? "");

  console.log(`Using addresses:\n${deployer.address}\n${acc1.address}\n${acc2.address}`);
  
  const deployerSigner = deployer.connect(provider);
  const deployerAcc1 = acc1.connect(provider);
  const deployerAcc2 = acc2.connect(provider);

  return [
    deployerSigner,
    deployerAcc1,
    deployerAcc2
  ];
  
}

export async function deploy() {
  const [deployer, acc1, acc2] = await getSignerArray();
  //console.log({deployer, acc1, acc2});
  
  const myTokenContractFactory = new MyToken__factory(deployer);
  const myTokenContract = await myTokenContractFactory.deploy();
  await myTokenContract.deployed();

  console.log(
      `MyToken contract was deployed at address ${myTokenContract.address}\n` 
  );
  
  return myTokenContract;
}

export async function getContract() {
  const [deployer, acc1, acc2] = await getSignerArray();
  const factory = new MyToken__factory(deployer);
  const contract = await factory.attach(process.env.MYTOKEN_CONTRACT_ADDRESS ?? "");
  return contract;
}

if (require.main === module) {
  deploy().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });  
}
