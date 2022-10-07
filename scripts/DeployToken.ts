import { ethers } from "ethers";
import { convertStringArrayToBytes32, getDefaultProposals } from "./_helper";
import * as dotenv from "dotenv";
dotenv.config();

export async function deploy() {
  //TODO
}

export async function getContract() {
  //TODO
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
