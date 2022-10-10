import { deploy } from "./DeployToken";
import { mintTokens } from "./MintTokens";
import { Contract } from "ethers";

async function main() {
    const myTokenC: Promise<Contract> = await deploy();
    await mintTokens(myTokenC);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });  
}