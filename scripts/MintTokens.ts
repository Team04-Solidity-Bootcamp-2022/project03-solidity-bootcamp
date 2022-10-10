import { ethers } from "ethers";
import { getSigners } from "./_helper";
import { getContract as getMyTokenContract } from "./DeployToken";

const TOKEN_MINT = ethers.utils.parseEther("10");
const ACCOUNTS = [
  process.env.ROB_ADDRESS
  // process.env.ROB_ADDRESS,
  // process.env.FRANCISCO_ADDRESS,
  // process.env.PATRICK_ADDRESS,
  // process.env.STEFANO_ADDRESS,
  // process.env.TATIANA_ADDRESS
];

async function main() {
  const myTokenContract = await getMyTokenContract();

  const totalSupply = await myTokenContract.totalSupply();
  console.log(
    `Before minting for accounts, this contract has a totalSupply of ${ethers.utils.formatEther(totalSupply)} tokens\n`
  );

  // Mint Tokens to Accounts
  for (let i=0; i<ACCOUNTS.length; i++) {
    const mintTx = await myTokenContract.mint(
      ACCOUNTS[i] ?? "",
      TOKEN_MINT);
    await mintTx.wait();

    const acctBalance = await myTokenContract.balanceOf(ACCOUNTS[i] ?? "");
    console.log(
      `After minting account ${ACCOUNTS[i]} has a balance of ${ethers.utils.formatEther(acctBalance)} tokens\n`
    );
  }

  const totalSupplyAfter = await myTokenContract.totalSupply();
  console.log(
    `After minting this contract has a total supply of ${ethers.utils.formatEther(totalSupplyAfter)} tokens\n`
  ); 

}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
