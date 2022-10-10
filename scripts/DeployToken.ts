import { convertStringArrayToBytes32, getDefaultProposals } from "./_helper";
import { MyToken__factory } from "../typechain-types";
import { getSignerArray } from "./_accounts";
import * as dotenv from "dotenv";
dotenv.config();

export async function deploy() {
  //TODO
  const [deployer, a1, a2] = await getSignerArray();
  const myTokenCFactory = new MyToken__factory(deployer);
  const myTokenC = await myTokenCFactory.deploy();
  await myTokenC.deployed();
  console.log(`MyToken contract was deployed at address ${myTokenC.address}\n`);
  
  return myTokenC;
}

export async function getContract() {
  //TODO
  const [deployer, a1, a2] = await getSignerArray();
  const factory = new MyToken__factory(deployer);
  const contract = await factory.attach(process.env.MYTOKEN_CONTRACT_ADDRESS ?? "");
  return contract;
}

if (require.main === module) {
  deploy().catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
  });  
}