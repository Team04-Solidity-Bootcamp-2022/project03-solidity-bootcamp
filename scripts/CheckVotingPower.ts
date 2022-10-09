// IMPORTS
import { getContract } from "./DeployToken";
import { BigNumber } from "ethers";

async function checkVotingPower(address: string): Promise<BigNumber> {
  const contract = await getContract();
  const votingPower = await contract.getVotes(address);

  console.log({votingPower});

  return votingPower;
}
