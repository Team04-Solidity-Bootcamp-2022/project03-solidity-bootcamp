import { ethers } from "ethers";
import { convertStringArrayToBytes32, getDefaultProposals, getSigners } from "./_helper";
import * as dotenv from "dotenv";
import { MyToken__factory } from "../typechain-types";
dotenv.config();

export async function deploy() {
  const [deployer, acc1, acc2] = getSigners();
  const myTokenContractFactory = new MyToken__factory(deployer);
  const myTokenContract = await myTokenContractFactory.deploy();
  await myTokenContract.deployed();
  console.log(
      `MyToken contract was deployed at address ${myTokenContract.address}\n` 
  );
}

export async function getContract() {
  const [deployer, acc1, acc2] = getSigners();
  const myTokenContractFactory = new MyToken__factory(deployer);
  const myTokenContract = await myTokenContractFactory.attach(process.env.MYTOKEN_CONTRACT_ADDRESS ?? "");
  return myTokenContract;
}

if (require.main === module) {
  deploy().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
