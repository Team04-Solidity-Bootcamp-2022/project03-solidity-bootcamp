import { getContract } from "./DeployTokenizedBallot";

async function delegate(contract: any) {
  //TODO
}

async function main() {
  const contract = await getContract();
  await delegate(contract);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});