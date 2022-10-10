import { ethers } from "hardhat";

export const getDefaultProposals = () => {
  return ["Proposal 1", "Proposal 2", "Proposal 3"];
};

export const convertStringArrayToBytes32 = (array: string[]) => {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
};

export const getSigners = () => {
  const options = {
    deployer: process.env.PRIVATE_KEY_1,
    acc1: process.env.PRIVATE_KEY_2,
    acc2: process.env.PRIVATE_KEY_3
  }
  const provider = ethers.getDefaultProvider("goerli", options);
  const signers = [
    new ethers.Wallet(process.env.PRIVATE_KEY_1 ?? "", provider),
    new ethers.Wallet(process.env.PRIVATE_KEY_2 ?? "", provider),
    new ethers.Wallet(process.env.PRIVATE_KEY_3 ?? "", provider)
  ]
  return signers;
}
