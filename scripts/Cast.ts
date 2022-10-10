import { ethers } from "ethers";
import { getContract as getTokenizedBallotContract} from "./DeployTokenizedBallot";
import { getContract as getMyTokenContract} from "./DeployToken";
import { getSigners } from "./_helper";

const ACCOUNTS = [
  process.env.ROB_ADDRESS
  // process.env.ROB_ADDRESS,
  // process.env.FRANCISCO_ADDRESS,
  // process.env.PATRICK_ADDRESS,
  // process.env.STEFANO_ADDRESS,
  // process.env.TATIANA_ADDRESS
];

// const PRIV_KEYS = [
//   process.env.PRIVATE_KEY_2,
//   process.env.PRIVATE_KEY_3,
//   process.env.PRIVATE_KEY_4,
//   process.env.PRIVATE_KEY_5,
//   process.env.PRIVATE_KEY_6,
//   process.env.PRIVATE_KEY_7,
// ]

const VOTE_AMOUNT = ethers.utils.parseEther("1");

async function castVote(contract: any, address: string, proposal: number) {
  const [deployer, acc1, acc2] = getSigners();

  // Check voting power
  const myTokenContract = await getMyTokenContract();
  const votingPower = await myTokenContract.getVotes(acc1.address);
  console.log(
    `Account ${acc1.address} has voting power of ${ethers.utils.formatEther(votingPower)} votes\n`
  );

  console.log(`Account ${address} to cast ${ethers.utils.formatEther(VOTE_AMOUNT)} votes to proposal ${proposal}`);

  const voteTx = await contract
    .connect(acc1)
    .vote(proposal, VOTE_AMOUNT);
  const voteTxReceipt = voteTx.wait();

  console.log(voteTxReceipt);
}

async function main() {
  const tokenizedBallotContract = await getTokenizedBallotContract();
  for(let i=0; i<ACCOUNTS.length; i++) {
    await castVote(tokenizedBallotContract, ACCOUNTS[i] ?? "", 0);
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
