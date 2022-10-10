import { ethers } from "ethers";

export async function getSignerArray(): Promise<ethers.Wallet[]> {
    const defProv = ethers.getDefaultProvider("goerli");
    const deployer = new ethers.Wallet(process.env.PRIVATE_KEY_1 ?? "");
    const acc1 = new ethers.Wallet(process.env.PRIVATE_KEY_2 ?? "");
    const acc2 = new ethers.Wallet(process.env.PRIVATE_KEY_3 ?? "");
    console.log(`Addresses:\nDeployer= ${deployer.address}\nAccount1= ${acc1.address}\nAccount2= ${acc2.address}`);
    
    const deployerSigner = deployer.connect(defProv);
    const deployerA1 = acc1.connect(defProv);
    const deployerA2 = acc2.connect(defProv);
  
    return [deployerSigner, deployerA1, deployerA2];
}