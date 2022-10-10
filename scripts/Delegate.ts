import { ethers } from "ethers";
import { getContract as getMyTokenContract } from "./DeployToken";
import { getSigners } from "./_helper";

const ACCOUNTS = [
  process.env.ROB_ADDRESS
  // process.env.ROB_ADDRESS,
  // process.env.FRANCISCO_ADDRESS,
  // process.env.PATRICK_ADDRESS,
  // process.env.STEFANO_ADDRESS,
  // process.env.TATIANA_ADDRESS
];

async function selfDelegate(contract: any, address: string) {
  const [deployer, acc1, acc2] = getSigners();

  const delegateTx = await contract.connect(acc1).delegate(acc1.address);
  await delegateTx.wait();
  const votesAfterDelegate = await contract.getVotes(acc1.address);
  console.log(
    `After delegating, account ${acc1.address} has voting power of ${ethers.utils.formatEther(votesAfterDelegate)} votes\n`
  );
}

async function main() {
  const myTokenContract = await getMyTokenContract();
  for(let i=0; i<ACCOUNTS.length; i++) {
    await selfDelegate(myTokenContract, ACCOUNTS[i] ?? "");
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
