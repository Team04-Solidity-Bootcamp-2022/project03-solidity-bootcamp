import { ethers } from "ethers";
import { convertStringArrayToBytes32, getDefaultProposals } from "./_helper";
import { getContract as getMyTokenContract } from "./DeployToken"
import { TokenizedBallot__factory } from "../typechain-types";
import { getSignerArray } from "./_accounts";
import * as dotenv from "dotenv";
dotenv.config();
const refBlock = 8;

export async function deploy(_refBlock) {
  //TODO
  const [deployer, a1, a2] = await getSignerArray();
  const myTokenC = await getMyTokenContract();
  const tokenizedBallotCFactory = new TokenizedBallot__factory(deployer);
  const tokenizedBallotC = await tokenizedBallotCFactory.deploy(
    convertStringArrayToBytes32(getDefaultProposals()),
    myTokenC.address,
    _refBlock
  );
  await tokenizedBallotC.deployed();
  console.log(`TokenizedBallot contract was deployed at address ${tokenizedBallotC.address}\n`);

  return tokenizedBallotC;
}

export async function getContract() {
  //TODO
  const [deployer, a1, a2] = await getSignerArray();
  const factory = new TokenizedBallot__factory(deployer);
  const contract = await factory.attach(process.env.TOKENIZED_BALLOT_CONTRACT_ADDRESS ?? "");
  return contract;
}

if (require.main === module) {
  deploy(refBlock).catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
  });  
}