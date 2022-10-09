import { getContract } from "./DeployToken";
import { ethers } from "ethers";

async function delegate(from: ethers.Wallet, to: string) {
  const contract = await getContract();
  const delegateTx = await contract.connect(from).delegate(to);
  const delegateReceipt = await delegateTx.wait();

  console.log({ delegateReceipt });
}
