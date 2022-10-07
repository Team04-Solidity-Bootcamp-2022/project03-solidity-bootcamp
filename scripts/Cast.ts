import { getContract } from "./Deployment";

async function castVote(contract: any) {
  //console.log("Casting a vote for proposal 0");
  //TODO
}

async function main() {
  const contract = await getContract();
  await castVote(contract);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});