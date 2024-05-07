import { Contract, ZeroAddress, parseEther, parseUnits, getBytes, JsonRpcProvider, toBeHex } from "ethers";
import { ethers, utils } from 'ethersv5';
import { BaseTransaction } from '@safe-global/safe-apps-sdk';
import { getSafeInfo, isConnectedToSafe, submitTxs } from "./safeapp";
import { isModuleEnabled, buildEnableModule, isGuardEnabled, buildEnableGuard, buildUpdateFallbackHandler } from "./safe";
import { getJsonRpcProvider, getProvider } from "./web3";
import Safe7579 from "./Safe7579.json"
import EntryPoint from "./EntryPoint.json"
import { getTokenDecimals, publicClient } from "./utils";
import {  buildUnsignedUserOpTransaction } from "@/utils/userOp";
import { createClient, http, Chain, Hex, pad, custom, createWalletClient } from "viem";
import { sepolia } from 'viem/chains'
import { bundlerActions, ENTRYPOINT_ADDRESS_V07, createBundlerClient, getPackedUserOperation, UserOperation, getAccountNonce } from 'permissionless'
import { PackedUserOperation } from "permissionless/types/userOperation";
import { createPimlicoBundlerClient, createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { pimlicoBundlerActions, pimlicoPaymasterActions } from 'permissionless/actions/pimlico'
import { loadAccountInfo } from "@/utils/storage";
import { privateKeyToAccount } from "viem/accounts";
import { EIP1193Provider } from "@privy-io/react-auth";

const safe7579Module = "0xbdedF9F0aB26F2D52cF1DDD388751b73600222F3"
const ownableModule = "0xA1dBC7e289D6772802355550c77A59C75D4df494"



function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}


/**
 * Generates a deterministic key pair from an arbitrary length string
 *
 * @param {string} string - The string to generate a key pair from
 * @returns {Object} - An object containing the address and privateKey
 */
export function generateKeysFromString(string: string) {
    const privateKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(string)) // v5
    const wallet = new ethers.Wallet(privateKey)
    return {
        address: wallet.address,
        privateKey: privateKey,
    }
}




/**
 * Hashes a plain address, adds an Ethereum message prefix, hashes it again and then signs it
 */
export async function signAddress(string: string, privateKey: string) {
    const stringHash = ethers.utils.solidityKeccak256(['address'], [string]) // v5
    const stringHashbinary = ethers.utils.arrayify(stringHash) // v5
    const signer = new ethers.Wallet(privateKey)
    const signature = await signer.signMessage(stringHashbinary) // this calls ethers.hashMessage and prefixes the hash
    return signature
}



export const sendTransaction = async (chainId: string, recipient: string, amount: bigint, walletProvider: any): Promise<any> => {

    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    // const chainId = (await provider.getNetwork()).chainId.toString()
    const bProvider = await getJsonRpcProvider(chainId)

    const safeAccount = loadAccountInfo().address

    console.log(safeAccount)


    console.log(walletProvider)


     const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(walletProvider),
      })


    const call = {target: recipient as Hex, value: amount, callData: '0x' as Hex}


    const key = BigInt(pad(ownableModule as Hex, {
        dir: "right",
        size: 24,
      }) || 0
    )
    
    const nonce = await getAccountNonce(publicClient(parseInt(chainId)), {
        sender: safeAccount as Hex,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        key: key
    })


    let sessionOp = buildUnsignedUserOpTransaction(
        safeAccount as Hex,
        call,
        nonce,
      )


      console.log(sessionOp)

    const entryPoint = new Contract(
        ENTRYPOINT_ADDRESS_V07,
        EntryPoint.abi,
        bProvider
    )


    const chain = "sepolia" 


    const pimlicoEndpoint = `https://api.pimlico.io/v2/${chain}/rpc?apikey=${import.meta.env.VITE_PIMLICO_API_KEY}`


    const bundlerClient = createClient({
        transport: http(pimlicoEndpoint),
        chain: sepolia as Chain,
    })
        .extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
        .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07))

     const paymasterClient = createPimlicoPaymasterClient({
        transport: http(pimlicoEndpoint),
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    })
    
     


    const gasPrice = await bundlerClient.getUserOperationGasPrice()


    sessionOp.maxFeePerGas = gasPrice.fast.maxFeePerGas;
    sessionOp.maxPriorityFeePerGas = gasPrice.fast.maxPriorityFeePerGas;



    const sponsorUserOperationResult = await paymasterClient.sponsorUserOperation({
        userOperation: sessionOp
    })



   
    const sponsoredUserOperation: UserOperation<"v0.7"> = {
        ...sessionOp,
        ...sponsorUserOperationResult,
    }


    let typedDataHash = getBytes(await entryPoint.getUserOpHash(getPackedUserOperation(sponsoredUserOperation)))

 
    sponsoredUserOperation.signature = await walletClient.signMessage({account: '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db' , message:  { raw: typedDataHash}}) as `0x${string}`

    console.log(sponsoredUserOperation)

    const userOperationHash = await bundlerClient.sendUserOperation({
        userOperation: sponsoredUserOperation,

    })

    return userOperationHash;

}


export const waitForExecution = async (userOperationHash: string) => {


    const chain = "sepolia" 


    const pimlicoEndpoint = `https://api.pimlico.io/v2/${chain}/rpc?apikey=${import.meta.env.VITE_PIMLICO_API_KEY}`


    const bundlerClient = createClient({
        transport: http(pimlicoEndpoint),
        chain: sepolia as Chain,
    })
        .extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
        .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07))

     const paymasterClient = createPimlicoPaymasterClient({
        transport: http(pimlicoEndpoint),
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    })
    

    const receipt = await bundlerClient.waitForUserOperationReceipt({ hash: userOperationHash as Hex })

    return receipt;

}




const buildInitSafe7579 = async ( ): Promise<BaseTransaction> => {

    
    const info = await getSafeInfo()

    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    const chainId = (await provider.getNetwork()).chainId.toString()
    const bProvider = await getJsonRpcProvider(chainId)

    const safeValidator = new Contract(
        safe7579Module,
        Safe7579.abi,
        bProvider
    )

    return {
        to: safe7579Module,
        value: "0",
        data: (await safeValidator.initializeAccount.populateTransaction([], [], [], [], {registry: ZeroAddress, attesters: [], threshold: 0})).data
    }
}


const buildInstallOwnable = async ( address: string ): Promise<BaseTransaction> => {

    
    const info = await getSafeInfo()

    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    const chainId = (await provider.getNetwork()).chainId.toString()
    const bProvider = await getJsonRpcProvider(chainId)

    const safeValidator = new Contract(
        safe7579Module,
        Safe7579.abi,
        bProvider
    )

    return {
        to: safe7579Module,
        value: "0",
        data: (await safeValidator.installModule.populateTransaction(1, await ownableModule, utils.defaultAbiCoder.encode(['address'], [address]))).data
    }
}




export const addValidatorModule = async (ownerAddress: string ) => {

    
    if (!await isConnectedToSafe()) throw Error("Not connected to a Safe")

    const info = await getSafeInfo()

    const txs: BaseTransaction[] = []


    if (!await isModuleEnabled(info.safeAddress, safe7579Module)) {
        txs.push(await buildEnableModule(info.safeAddress, safe7579Module))
        txs.push(await buildUpdateFallbackHandler(info.safeAddress, safe7579Module))
    }

    txs.push(await buildInitSafe7579())

    txs.push(await buildInstallOwnable(ownerAddress))

    const provider = await getProvider()
    // Updating the provider RPC if it's from the Safe App.
    const chainId = (await provider.getNetwork()).chainId.toString()

    if (txs.length == 0) return {address: '', privateKey: ''}
    await submitTxs(txs)

}







