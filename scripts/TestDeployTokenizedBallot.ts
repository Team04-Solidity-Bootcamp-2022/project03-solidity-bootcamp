import { ethers } from "hardhat";
import { convertStringArrayToBytes32, getDefaultProposals } from "./_helper";
import * as dotenv from "dotenv";
dotenv.config();

export async function deploy() {
  const accounts = await ethers.getSigners();
  const PROPOSALS = getDefaultProposals();
  const refBlock = ethers.BigNumber.from(2);

  const myTokenContractFactory = await ethers.getContractFactory("MyToken");
  const myTokenContract = await myTokenContractFactory.deploy();
  await myTokenContract.deployed();
  console.log(
      `MyToken contract was deployed at address ${myTokenContract.address}\n` 
  );

  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });


  const tokenizedBallotFactory = await ethers.getContractFactory("TokenizedBallot");
  const tokenizedBallotContract = await tokenizedBallotFactory.deploy(
    convertStringArrayToBytes32(PROPOSALS),
    myTokenContract.address,
    refBlock
  );
  await tokenizedBallotContract.deployed();

  console.log(`TokenizedBallot deployed to ${tokenizedBallotContract.address}`);
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
