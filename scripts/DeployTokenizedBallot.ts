import { ethers } from "ethers";
import { convertStringArrayToBytes32, getDefaultProposals, getSigners } from "./_helper";
import * as dotenv from "dotenv";
import { TokenizedBallot__factory } from "../typechain-types";
import { getContract as getMyTokenContract } from "./DeployToken";
dotenv.config();

const REFERENCE_BLOCK = 0;

export async function deploy(referenceBlock: number) {
  const [deployer, acc1, acc2] = getSigners();
  const myTokenContract = await getMyTokenContract();
  const tokenizedBallotContractFactory = new TokenizedBallot__factory(deployer);
  const tokenizedBallotContract = await tokenizedBallotContractFactory.deploy(
    convertStringArrayToBytes32(getDefaultProposals()),
    myTokenContract.address,
    referenceBlock
  );
  console.log(`TokenizedBallot contract deployed at ${tokenizedBallotContract.address}`);

}

export async function getContract() {
  const [deployer, acc1, acc2] = getSigners();
  const tokenizedBallotContractFactory = new TokenizedBallot__factory(deployer);
  const tokenizedBallotContract = await tokenizedBallotContractFactory.attach(process.env.TOKENIZED_BALLOT_CONTRACT_ADDRESS ?? "");
  return tokenizedBallotContract;
}

if (require.main === module) {
  deploy(REFERENCE_BLOCK).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
