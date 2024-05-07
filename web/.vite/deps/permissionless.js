import {
  AccountOrClientNotFoundError,
  ActualGasCostTooHighError,
  BundlerOutOfGasError,
  EstimateUserOperationGasError,
  GasValuesOverflowError,
  InitCodeDidNotDeploySenderError,
  InitCodeRevertedError,
  InvalidAggregatorError,
  InvalidBeneficiaryAddressError,
  InvalidPaymasterAndDataError,
  InvalidSmartAccountNonceError,
  InvalidSmartAccountSignatureError,
  PaymasterDataRejectedError,
  PaymasterDepositTooLowError,
  PaymasterNotDeployedError,
  PaymasterPostOpRevertedError,
  PaymasterValidationRevertedError,
  PaymasterValidityPeriodError,
  SendUserOperationError,
  SenderAddressMismatchError,
  SenderAlreadyDeployedError,
  SenderNotDeployedError,
  SmartAccountInsufficientFundsError,
  SmartAccountSignatureValidityPeriodError,
  SmartAccountValidationRevertedError,
  VerificationGasLimitTooLowError,
  WaitForUserOperationReceiptTimeoutError,
  bundlerActions,
  chainId,
  estimateUserOperationGas,
  getAddressFromInitCodeOrPaymasterAndData,
  getPackedUserOperation,
  getRequiredPrefund,
  getUserOperationByHash,
  getUserOperationHash,
  getUserOperationReceipt,
  isSmartAccountDeployed,
  parseAccount,
  providerToSmartAccountSigner,
  sendUserOperation,
  signUserOperationHashWithECDSA,
  supportedEntryPoints,
  waitForUserOperationReceipt,
  walletClientToSmartAccountSigner
} from "./chunk-32UEECII.js";
import {
  ENTRYPOINT_ADDRESS_V06,
  ENTRYPOINT_ADDRESS_V07,
  deepHexlify,
  getEntryPointVersion,
  transactionReceiptStatus
} from "./chunk-7L37OE6G.js";
import {
  createClient,
  estimateFeesPerGas,
  getAction,
  getTypesForEIP712Domain,
  readContract,
  simulateContract,
  validateTypedData
} from "./chunk-LYDXG5YA.js";
import {
  BaseError,
  concat,
  decodeErrorResult,
  encodeFunctionData
} from "./chunk-EUBNUXNN.js";
import "./chunk-NY2Q42KW.js";
import "./chunk-LU3NF5RD.js";
import "./chunk-ABLC2WDW.js";
import "./chunk-J32WSRGE.js";

// node_modules/permissionless/_esm/actions/public/getSenderAddress.js
var InvalidEntryPointError = class extends BaseError {
  constructor({ cause, entryPoint } = {}) {
    super(`The entry point address (\`entryPoint\`${entryPoint ? ` = ${entryPoint}` : ""}) is not a valid entry point. getSenderAddress did not revert with a SenderAddressResult error.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidEntryPointError"
    });
  }
};
var getSenderAddress = async (client, args) => {
  var _a, _b, _c, _d;
  const { initCode, entryPoint, factory, factoryData } = args;
  if (!initCode && !factory && !factoryData) {
    throw new Error("Either `initCode` or `factory` and `factoryData` must be provided");
  }
  try {
    await getAction(client, simulateContract, "simulateContract")({
      address: entryPoint,
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address"
            }
          ],
          name: "SenderAddressResult",
          type: "error"
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "initCode",
              type: "bytes"
            }
          ],
          name: "getSenderAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "getSenderAddress",
      args: [initCode || concat([factory, factoryData])]
    });
  } catch (e) {
    const err = e;
    if (err.cause.name === "ContractFunctionRevertedError") {
      const revertError = err.cause;
      const errorName = ((_a = revertError.data) == null ? void 0 : _a.errorName) ?? "";
      if (errorName === "SenderAddressResult" && ((_b = revertError.data) == null ? void 0 : _b.args) && ((_c = revertError.data) == null ? void 0 : _c.args[0])) {
        return (_d = revertError.data) == null ? void 0 : _d.args[0];
      }
    }
    if (err.cause.name === "CallExecutionError") {
      const callExecutionError = err.cause;
      if (callExecutionError.cause.name === "RpcRequestError") {
        const revertError = callExecutionError.cause;
        const data = revertError.cause.data.split(" ")[1];
        const error = decodeErrorResult({
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address"
                }
              ],
              name: "SenderAddressResult",
              type: "error"
            }
          ],
          data
        });
        return error.args[0];
      }
      if (callExecutionError.cause.name === "InvalidInputRpcError") {
        const revertError = callExecutionError.cause;
        const data = revertError.cause.data;
        const error = decodeErrorResult({
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address"
                }
              ],
              name: "SenderAddressResult",
              type: "error"
            }
          ],
          data
        });
        return error.args[0];
      }
    }
    throw e;
  }
  throw new InvalidEntryPointError({ entryPoint });
};

// node_modules/permissionless/_esm/actions/public/getAccountNonce.js
var getAccountNonce = async (client, args) => {
  const { sender, entryPoint, key = BigInt(0) } = args;
  return await getAction(client, readContract, "readContract")({
    address: entryPoint,
    abi: [
      {
        inputs: [
          {
            name: "sender",
            type: "address"
          },
          {
            name: "key",
            type: "uint192"
          }
        ],
        name: "getNonce",
        outputs: [
          {
            name: "nonce",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "getNonce",
    args: [sender, key]
  });
};

// node_modules/permissionless/_esm/clients/createBundlerClient.js
var createBundlerClient = (parameters) => {
  const { key = "public", name = "Bundler Client" } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "bundlerClient"
  });
  return client.extend(bundlerActions(parameters.entryPoint));
};

// node_modules/permissionless/_esm/actions/smartAccount/prepareUserOperationRequest.js
async function prepareUserOperationRequestForEntryPointV06(client, args, stateOverrides) {
  const { account: account_ = client.account, userOperation: partialUserOperation, middleware } = args;
  if (!account_)
    throw new AccountOrClientNotFoundError();
  const account = parseAccount(account_);
  const [sender, nonce, initCode, callData] = await Promise.all([
    partialUserOperation.sender || account.address,
    partialUserOperation.nonce || account.getNonce(),
    partialUserOperation.initCode || account.getInitCode(),
    partialUserOperation.callData
  ]);
  const userOperation = {
    sender,
    nonce,
    initCode,
    callData,
    paymasterAndData: "0x",
    signature: partialUserOperation.signature || "0x",
    maxFeePerGas: partialUserOperation.maxFeePerGas || BigInt(0),
    maxPriorityFeePerGas: partialUserOperation.maxPriorityFeePerGas || BigInt(0),
    callGasLimit: partialUserOperation.callGasLimit || BigInt(0),
    verificationGasLimit: partialUserOperation.verificationGasLimit || BigInt(0),
    preVerificationGas: partialUserOperation.preVerificationGas || BigInt(0)
  };
  if (userOperation.signature === "0x") {
    userOperation.signature = await account.getDummySignature(userOperation);
  }
  if (typeof middleware === "function") {
    return middleware({
      userOperation,
      entryPoint: account.entryPoint
    });
  }
  if (middleware && typeof middleware !== "function" && middleware.gasPrice) {
    const gasPrice = await middleware.gasPrice();
    userOperation.maxFeePerGas = gasPrice.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = gasPrice.maxPriorityFeePerGas;
  }
  if (!userOperation.maxFeePerGas || !userOperation.maxPriorityFeePerGas) {
    const estimateGas = await estimateFeesPerGas(account.client);
    userOperation.maxFeePerGas = userOperation.maxFeePerGas || estimateGas.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = userOperation.maxPriorityFeePerGas || estimateGas.maxPriorityFeePerGas;
  }
  if (middleware && typeof middleware !== "function" && middleware.sponsorUserOperation) {
    const sponsorUserOperationData = await middleware.sponsorUserOperation({
      userOperation,
      entryPoint: account.entryPoint
    });
    userOperation.callGasLimit = sponsorUserOperationData.callGasLimit;
    userOperation.verificationGasLimit = sponsorUserOperationData.verificationGasLimit;
    userOperation.preVerificationGas = sponsorUserOperationData.preVerificationGas;
    userOperation.paymasterAndData = sponsorUserOperationData.paymasterAndData;
    userOperation.maxFeePerGas = sponsorUserOperationData.maxFeePerGas || userOperation.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = sponsorUserOperationData.maxPriorityFeePerGas || userOperation.maxPriorityFeePerGas;
    return userOperation;
  }
  if (!userOperation.callGasLimit || !userOperation.verificationGasLimit || !userOperation.preVerificationGas) {
    const gasParameters = await getAction(client, estimateUserOperationGas, "estimateUserOperationGas")(
      {
        userOperation,
        entryPoint: account.entryPoint
      },
      // @ts-ignore getAction takes only two params but when compiled this will work
      stateOverrides
    );
    userOperation.callGasLimit |= gasParameters.callGasLimit;
    userOperation.verificationGasLimit = userOperation.verificationGasLimit || gasParameters.verificationGasLimit;
    userOperation.preVerificationGas = userOperation.preVerificationGas || gasParameters.preVerificationGas;
  }
  return userOperation;
}
async function prepareUserOperationRequestEntryPointV07(client, args, stateOverrides) {
  const { account: account_ = client.account, userOperation: partialUserOperation, middleware } = args;
  if (!account_)
    throw new AccountOrClientNotFoundError();
  const account = parseAccount(account_);
  const [sender, nonce, factory, factoryData, callData, gasEstimation] = await Promise.all([
    partialUserOperation.sender || account.address,
    partialUserOperation.nonce || account.getNonce(),
    partialUserOperation.factory || account.getFactory(),
    partialUserOperation.factoryData || account.getFactoryData(),
    partialUserOperation.callData,
    !partialUserOperation.maxFeePerGas || !partialUserOperation.maxPriorityFeePerGas ? estimateFeesPerGas(account.client) : void 0
  ]);
  const userOperation = {
    sender,
    nonce,
    factory,
    factoryData,
    callData,
    callGasLimit: partialUserOperation.callGasLimit || BigInt(0),
    verificationGasLimit: partialUserOperation.verificationGasLimit || BigInt(0),
    preVerificationGas: partialUserOperation.preVerificationGas || BigInt(0),
    maxFeePerGas: partialUserOperation.maxFeePerGas || (gasEstimation == null ? void 0 : gasEstimation.maxFeePerGas) || BigInt(0),
    maxPriorityFeePerGas: partialUserOperation.maxPriorityFeePerGas || (gasEstimation == null ? void 0 : gasEstimation.maxPriorityFeePerGas) || BigInt(0),
    signature: partialUserOperation.signature || "0x"
  };
  if (userOperation.signature === "0x") {
    userOperation.signature = await account.getDummySignature(userOperation);
  }
  if (typeof middleware === "function") {
    return middleware({
      userOperation,
      entryPoint: account.entryPoint
    });
  }
  if (middleware && typeof middleware !== "function" && middleware.gasPrice) {
    const gasPrice = await middleware.gasPrice();
    userOperation.maxFeePerGas = gasPrice.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = gasPrice.maxPriorityFeePerGas;
  }
  if (!userOperation.maxFeePerGas || !userOperation.maxPriorityFeePerGas) {
    const estimateGas = await estimateFeesPerGas(account.client);
    userOperation.maxFeePerGas = userOperation.maxFeePerGas || estimateGas.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = userOperation.maxPriorityFeePerGas || estimateGas.maxPriorityFeePerGas;
  }
  if (middleware && typeof middleware !== "function" && middleware.sponsorUserOperation) {
    const sponsorUserOperationData = await middleware.sponsorUserOperation({
      userOperation,
      entryPoint: account.entryPoint
    });
    userOperation.callGasLimit = sponsorUserOperationData.callGasLimit;
    userOperation.verificationGasLimit = sponsorUserOperationData.verificationGasLimit;
    userOperation.preVerificationGas = sponsorUserOperationData.preVerificationGas;
    userOperation.paymaster = sponsorUserOperationData.paymaster;
    userOperation.paymasterVerificationGasLimit = sponsorUserOperationData.paymasterVerificationGasLimit;
    userOperation.paymasterPostOpGasLimit = sponsorUserOperationData.paymasterPostOpGasLimit;
    userOperation.paymasterData = sponsorUserOperationData.paymasterData;
    userOperation.maxFeePerGas = sponsorUserOperationData.maxFeePerGas || userOperation.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = sponsorUserOperationData.maxPriorityFeePerGas || userOperation.maxPriorityFeePerGas;
    return userOperation;
  }
  if (!userOperation.callGasLimit || !userOperation.verificationGasLimit || !userOperation.preVerificationGas) {
    const gasParameters = await getAction(client, estimateUserOperationGas, "estimateUserOperationGas")(
      {
        userOperation,
        entryPoint: account.entryPoint
      },
      // @ts-ignore getAction takes only two params but when compiled this will work
      stateOverrides
    );
    userOperation.callGasLimit |= gasParameters.callGasLimit;
    userOperation.verificationGasLimit = userOperation.verificationGasLimit || gasParameters.verificationGasLimit;
    userOperation.preVerificationGas = userOperation.preVerificationGas || gasParameters.preVerificationGas;
    userOperation.paymasterPostOpGasLimit = userOperation.paymasterPostOpGasLimit || gasParameters.paymasterPostOpGasLimit;
    userOperation.paymasterPostOpGasLimit = userOperation.paymasterPostOpGasLimit || gasParameters.paymasterPostOpGasLimit;
  }
  return userOperation;
}
async function prepareUserOperationRequest(client, args, stateOverrides) {
  const { account: account_ = client.account } = args;
  if (!account_)
    throw new AccountOrClientNotFoundError();
  const account = parseAccount(account_);
  const entryPointVersion = getEntryPointVersion(account.entryPoint);
  if (entryPointVersion === "v0.6") {
    return prepareUserOperationRequestForEntryPointV06(client, args, stateOverrides);
  }
  return prepareUserOperationRequestEntryPointV07(client, args, stateOverrides);
}

// node_modules/permissionless/_esm/actions/smartAccount/sendUserOperation.js
async function sendUserOperation2(client, args) {
  const { account: account_ = client.account } = args;
  if (!account_)
    throw new AccountOrClientNotFoundError();
  const account = parseAccount(account_);
  const userOperation = await getAction(client, prepareUserOperationRequest, "prepareUserOperationRequest")(args);
  userOperation.signature = await account.signUserOperation(userOperation);
  return sendUserOperation(client, {
    userOperation,
    entryPoint: account.entryPoint
  });
}

// node_modules/permissionless/_esm/actions/smartAccount/deployContract.js
async function deployContract(client, args) {
  const { abi, args: constructorArgs, bytecode, middleware, ...request } = args;
  const { account: account_ = client.account } = request;
  if (!account_) {
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  }
  const account = parseAccount(account_);
  const userOpHash = await getAction(client, sendUserOperation2, "sendUserOperation")({
    userOperation: {
      sender: account.address,
      maxFeePerGas: request.maxFeePerGas || BigInt(0),
      maxPriorityFeePerGas: request.maxPriorityFeePerGas || BigInt(0),
      callData: await account.encodeDeployCallData({
        abi,
        bytecode,
        args: constructorArgs
      })
    },
    account,
    middleware
  });
  const userOperationReceipt = await getAction(client, waitForUserOperationReceipt, "waitForUserOperationReceipt")({
    hash: userOpHash
  });
  return userOperationReceipt == null ? void 0 : userOperationReceipt.receipt.transactionHash;
}

// node_modules/permissionless/_esm/actions/smartAccount/sendTransaction.js
async function sendTransaction(client, args) {
  const { account: account_ = client.account, data, maxFeePerGas, maxPriorityFeePerGas, to, value, nonce, middleware } = args;
  if (!account_) {
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  }
  const account = parseAccount(account_);
  if (!to)
    throw new Error("Missing to address");
  if (account.type !== "local") {
    throw new Error("RPC account type not supported");
  }
  const callData = await account.encodeCallData({
    to,
    value: value || BigInt(0),
    data: data || "0x"
  });
  const userOpHash = await getAction(client, sendUserOperation2, "sendUserOperation")({
    userOperation: {
      sender: account.address,
      maxFeePerGas: maxFeePerGas || BigInt(0),
      maxPriorityFeePerGas: maxPriorityFeePerGas || BigInt(0),
      callData,
      nonce: nonce ? BigInt(nonce) : void 0
    },
    account,
    middleware
  });
  const userOperationReceipt = await getAction(client, waitForUserOperationReceipt, "waitForUserOperationReceipt")({
    hash: userOpHash
  });
  return userOperationReceipt == null ? void 0 : userOperationReceipt.receipt.transactionHash;
}

// node_modules/permissionless/_esm/actions/smartAccount/signMessage.js
async function signMessage(client, { account: account_ = client.account, message }) {
  if (!account_)
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  const account = parseAccount(account_);
  if (account.type === "local")
    return account.signMessage({ message });
  throw new Error("Sign message is not supported by this account");
}

// node_modules/permissionless/_esm/actions/smartAccount/signTypedData.js
async function signTypedData(client, { account: account_ = client.account, domain, message, primaryType, types: types_ }) {
  if (!account_) {
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  }
  const account = parseAccount(account_);
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...types_
  };
  validateTypedData({
    domain,
    message,
    primaryType,
    types
  });
  if (account.type === "local") {
    return account.signTypedData({
      domain,
      primaryType,
      types,
      message
    });
  }
  throw new Error("Sign type message is not supported by this account");
}

// node_modules/permissionless/_esm/actions/smartAccount/sendTransactions.js
async function sendTransactions(client, args) {
  const { account: account_ = client.account, transactions, middleware, maxFeePerGas, maxPriorityFeePerGas, nonce } = args;
  if (!account_) {
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  }
  const account = parseAccount(account_);
  if (account.type !== "local") {
    throw new Error("RPC account type not supported");
  }
  const callData = await account.encodeCallData(transactions.map(({ to, value, data }) => {
    if (!to)
      throw new Error("Missing to address");
    return {
      to,
      value: value || BigInt(0),
      data: data || "0x"
    };
  }));
  const userOpHash = await getAction(client, sendUserOperation2, "sendUserOperation")({
    userOperation: {
      sender: account.address,
      maxFeePerGas: maxFeePerGas || BigInt(0),
      maxPriorityFeePerGas: maxPriorityFeePerGas || BigInt(0),
      callData,
      nonce
    },
    account,
    middleware
  });
  const userOperationReceipt = await getAction(client, waitForUserOperationReceipt, "waitForUserOperationReceipt")({
    hash: userOpHash
  });
  return userOperationReceipt == null ? void 0 : userOperationReceipt.receipt.transactionHash;
}

// node_modules/permissionless/_esm/actions/smartAccount/writeContract.js
async function writeContract(client, { abi, address, args, dataSuffix, functionName, ...request }) {
  const data = encodeFunctionData({
    abi,
    args,
    functionName
  });
  const hash = await getAction(client, sendTransaction, "sendTransaction")({
    data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
    to: address,
    ...request
  });
  return hash;
}

// node_modules/permissionless/_esm/clients/decorators/smartAccount.js
function smartAccountActions({ middleware }) {
  return (client) => ({
    prepareUserOperationRequest: (args, stateOverrides) => prepareUserOperationRequest(client, {
      ...args,
      middleware
    }, stateOverrides),
    deployContract: (args) => deployContract(client, {
      ...args,
      middleware
    }),
    sendTransaction: (args) => sendTransaction(client, {
      ...args,
      middleware
    }),
    sendTransactions: (args) => sendTransactions(client, {
      ...args,
      middleware
    }),
    sendUserOperation: (args) => sendUserOperation2(client, {
      ...args,
      middleware
    }),
    signMessage: (args) => signMessage(client, args),
    signTypedData: (args) => signTypedData(client, args),
    writeContract: (args) => writeContract(client, {
      ...args,
      middleware
    })
  });
}

// node_modules/permissionless/_esm/clients/createSmartAccountClient.js
function createSmartAccountClient(parameters) {
  const { key = "Account", name = "Smart Account Client", bundlerTransport } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    transport: bundlerTransport,
    type: "smartAccountClient"
  });
  return client.extend(smartAccountActions({
    middleware: parameters.middleware
  }));
}
export {
  AccountOrClientNotFoundError,
  ActualGasCostTooHighError,
  BundlerOutOfGasError,
  ENTRYPOINT_ADDRESS_V06,
  ENTRYPOINT_ADDRESS_V07,
  EstimateUserOperationGasError,
  GasValuesOverflowError,
  InitCodeDidNotDeploySenderError,
  InitCodeRevertedError,
  InvalidAggregatorError,
  InvalidBeneficiaryAddressError,
  InvalidPaymasterAndDataError,
  InvalidSmartAccountNonceError,
  InvalidSmartAccountSignatureError,
  PaymasterDataRejectedError,
  PaymasterDepositTooLowError,
  PaymasterNotDeployedError,
  PaymasterPostOpRevertedError,
  PaymasterValidationRevertedError,
  PaymasterValidityPeriodError,
  SendUserOperationError,
  SenderAddressMismatchError,
  SenderAlreadyDeployedError,
  SenderNotDeployedError,
  SmartAccountInsufficientFundsError,
  SmartAccountSignatureValidityPeriodError,
  SmartAccountValidationRevertedError,
  VerificationGasLimitTooLowError,
  WaitForUserOperationReceiptTimeoutError,
  bundlerActions,
  chainId,
  createBundlerClient,
  createSmartAccountClient,
  deepHexlify,
  estimateUserOperationGas,
  getAccountNonce,
  getAddressFromInitCodeOrPaymasterAndData,
  getEntryPointVersion,
  getPackedUserOperation,
  getRequiredPrefund,
  getSenderAddress,
  getUserOperationByHash,
  getUserOperationHash,
  getUserOperationReceipt,
  isSmartAccountDeployed,
  parseAccount,
  providerToSmartAccountSigner,
  sendUserOperation,
  signUserOperationHashWithECDSA,
  smartAccountActions,
  supportedEntryPoints,
  transactionReceiptStatus,
  waitForUserOperationReceipt,
  walletClientToSmartAccountSigner
};
//# sourceMappingURL=permissionless.js.map
