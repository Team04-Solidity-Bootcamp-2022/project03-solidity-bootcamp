import { ethers } from "ethers";
import { convertStringArrayToBytes32, getDefaultProposals } from "./_helper";
import { getContract as getMyTokenContract } from "./DeployToken"
import { TokenizedBallot__factory } from "../typechain-types";
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
  const refBlock = 4;
  //console.log({deployer, acc1, acc2});
  const myTokenContract = await getMyTokenContract();
  
  const tokenizedBallotContractFactory = new TokenizedBallot__factory(deployer);
  const tokenizedBallotContract = await tokenizedBallotContractFactory.deploy(
    convertStringArrayToBytes32(getDefaultProposals()),
    myTokenContract.address,
    refBlock
  );
  
  await tokenizedBallotContract.deployed();

  console.log(
      `TokenizedBallot contract was deployed at address ${tokenizedBallotContract.address}\n` 
  );
  
  return tokenizedBallotContract;
}

export async function getContract() {
  const [deployer, acc1, acc2] = await getSignerArray();
  const factory = new TokenizedBallot__factory(deployer);
  const contract = await factory.attach(process.env.TOKENIZED_BALLOT_CONTRACT_ADDRESS ?? "");
  return contract;
}

if (require.main === module) {
  deploy().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });  
}
