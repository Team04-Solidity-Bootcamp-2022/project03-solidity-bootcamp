// IMPORTS
import { BigNumber } from "ethers";
import { getContract } from "./DeployToken";


async function main(addr: string): Promise<BigNumber> {
  //TODO
  const contract = await getContract();
  const votePwr = await contract.getVotes(addr);

  console.log({votePwr});

  return votePwr;
}