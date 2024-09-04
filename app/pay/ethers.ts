import { generator_abi } from '@/config/Blockhain/AbiController';
import { Escrow, USDT } from '@/config/Blockhain/AddressController';
import{ethers} from 'ethers'
require('dotenv')

let provider;

export default async function transfer(amount:any, account:string) {
    try {
    let Instance:any = await getContract();
    let tx:any  = await Instance.makeTransaction(account, USDT, amount, 1000);
    tx = await tx.wait();
    return tx.hash;
    }catch(e:any) {
        console.log(e.reason);
        alert(e.reason)
        return null;
    }
}

async function getSigner() {
    try{
    const signerKey:string = process.env.NEXT_PUBLIC_ADMIN_PRIVATEKEY!;
    provider = new ethers.JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/3BH10F7T5x3xp5eOUF9vhTnu7MIv7yz_");
    let signer = new ethers.Wallet(signerKey, provider);
    return signer;
    }catch(e) {
        console.log(e);
    }
}

async function getContract() {
    try{
    let contractAddress:string = Escrow!;
    let contract = new ethers.Contract(contractAddress, generator_abi,  await getSigner());
    return contract;
    }catch(e) {
        console.log(e);
    }
}



