import { ethers } from "ethers";
import { getContract } from "./DeployTokenizedBallot";
import { getDefaultProposals } from "./_helper";

async function getProposals(contract: any) {
  for (let i = 0; i < getDefaultProposals().length; i++) {
    const proposal = await contract.proposals(i);
    const name = ethers.utils.parseBytes32String(proposal.name);
    console.log({ i, name, proposal });
  }
}

async function queryResults() {
  const contract = await getContract();
  await getProposals(contract);
}

if (require.main === module) {
  queryResults().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}