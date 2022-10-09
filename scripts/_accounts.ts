import { ethers } from "ethers";

export async function getSignerArray(): Promise<ethers.Wallet[]> {
    const provider = ethers.getDefaultProvider("http://127.0.0.1:8545/");
    const deployer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
    const acc1 = new ethers.Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d");
    const acc2 = new ethers.Wallet("0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a");
    //const acc2 = new ethers.Wallet(process.env.PRIVATE_KEY_3 ?? "");
  
    console.log(`Using addresses:\n${deployer.address}\n${acc1.address}\n${acc2.address}`);
    
    const deployerSigner = deployer.connect(provider);
    const deployerAcc1 = acc1.connect(provider);
    const deployerAcc2 = acc2.connect(provider);
  
    return [
      deployerSigner,
      deployerAcc1,
      deployerAcc2
    ];
    
}