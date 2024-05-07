import {
  ENTRYPOINT_ADDRESS_V06,
  deepHexlify,
  getEntryPointVersion,
  isUserOperationVersion06,
  transactionReceiptStatus
} from "./chunk-7L37OE6G.js";
import {
  createWalletClient,
  custom,
  getAction,
  getBytecode,
  signTypedData
} from "./chunk-LYDXG5YA.js";
import {
  BaseError,
  ExecutionRevertedError,
  UnknownNodeError,
  concat,
  encodeAbiParameters,
  getAddress,
  keccak256,
  pad,
  stringify,
  toHex
} from "./chunk-EUBNUXNN.js";

// node_modules/permissionless/_esm/actions/bundler/chainId.js
var chainId = async (client) => {
  return Number(await client.request({
    method: "eth_chainId",
    params: []
  }));
};

// node_modules/permissionless/_esm/utils/getAddressFromInitCodeOrPaymasterAndData.js
function getAddressFromInitCodeOrPaymasterAndData(data) {
  if (!data) {
    return void 0;
  }
  if (data.length >= 42) {
    return getAddress(data.slice(0, 42));
  }
  return void 0;
}

// node_modules/permissionless/_esm/utils/getRequiredPrefund.js
var getRequiredPrefund = ({ userOperation, entryPoint: entryPointAddress }) => {
  if (entryPointAddress === ENTRYPOINT_ADDRESS_V06) {
    const userOperationVersion0_6 = userOperation;
    const multiplier2 = userOperationVersion0_6.paymasterAndData.length > 2 ? BigInt(3) : BigInt(1);
    const requiredGas2 = userOperationVersion0_6.callGasLimit + userOperationVersion0_6.verificationGasLimit * multiplier2 + userOperationVersion0_6.preVerificationGas;
    return BigInt(requiredGas2) * BigInt(userOperationVersion0_6.maxFeePerGas);
  }
  const userOperationV07 = userOperation;
  const multiplier = userOperationV07.paymaster ? BigInt(3) : BigInt(1);
  const verificationGasLimit = userOperationV07.verificationGasLimit + (userOperationV07.paymasterPostOpGasLimit || BigInt(0)) + (userOperationV07.paymasterVerificationGasLimit || BigInt(0));
  const requiredGas = userOperationV07.callGasLimit + verificationGasLimit * multiplier + userOperationV07.preVerificationGas;
  return BigInt(requiredGas) * BigInt(userOperationV07.maxFeePerGas);
};

// node_modules/permissionless/_esm/utils/getUserOperationHash.js
function packUserOp({ userOperation, entryPoint: entryPointAddress }) {
  if (isUserOperationVersion06(entryPointAddress, userOperation)) {
    const hashedInitCode2 = keccak256(userOperation.initCode);
    const hashedCallData2 = keccak256(userOperation.callData);
    const hashedPaymasterAndData2 = keccak256(userOperation.paymasterAndData);
    return encodeAbiParameters([
      { type: "address" },
      { type: "uint256" },
      { type: "bytes32" },
      { type: "bytes32" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "bytes32" }
    ], [
      userOperation.sender,
      userOperation.nonce,
      hashedInitCode2,
      hashedCallData2,
      userOperation.callGasLimit,
      userOperation.verificationGasLimit,
      userOperation.preVerificationGas,
      userOperation.maxFeePerGas,
      userOperation.maxPriorityFeePerGas,
      hashedPaymasterAndData2
    ]);
  }
  const hashedInitCode = keccak256(userOperation.factory && userOperation.factoryData ? concat([userOperation.factory, userOperation.factoryData]) : "0x");
  const hashedCallData = keccak256(userOperation.callData);
  const hashedPaymasterAndData = keccak256(userOperation.paymaster ? concat([
    userOperation.paymaster,
    pad(toHex(userOperation.paymasterVerificationGasLimit || BigInt(0)), {
      size: 16
    }),
    pad(toHex(userOperation.paymasterPostOpGasLimit || BigInt(0)), {
      size: 16
    }),
    userOperation.paymasterData || "0x"
  ]) : "0x");
  return encodeAbiParameters([
    { type: "address" },
    { type: "uint256" },
    { type: "bytes32" },
    { type: "bytes32" },
    { type: "bytes32" },
    { type: "uint256" },
    { type: "bytes32" },
    { type: "bytes32" }
  ], [
    userOperation.sender,
    userOperation.nonce,
    hashedInitCode,
    hashedCallData,
    concat([
      pad(toHex(userOperation.verificationGasLimit), {
        size: 16
      }),
      pad(toHex(userOperation.callGasLimit), { size: 16 })
    ]),
    userOperation.preVerificationGas,
    concat([
      pad(toHex(userOperation.maxPriorityFeePerGas), {
        size: 16
      }),
      pad(toHex(userOperation.maxFeePerGas), { size: 16 })
    ]),
    hashedPaymasterAndData
  ]);
}
var getUserOperationHash = ({ userOperation, entryPoint: entryPointAddress, chainId: chainId2 }) => {
  const encoded = encodeAbiParameters([{ type: "bytes32" }, { type: "address" }, { type: "uint256" }], [
    keccak256(packUserOp({
      userOperation,
      entryPoint: entryPointAddress
    })),
    entryPointAddress,
    BigInt(chainId2)
  ]);
  return keccak256(encoded);
};

// node_modules/permissionless/_esm/utils/isSmartAccountDeployed.js
var isSmartAccountDeployed = async (client, address) => {
  const contractCode = await getBytecode(client, {
    address
  });
  if (((contractCode == null ? void 0 : contractCode.length) ?? 0) > 2) {
    return true;
  }
  return false;
};

// node_modules/permissionless/_esm/utils/walletClientToSmartAccountSigner.js
function walletClientToSmartAccountSigner(walletClient) {
  return {
    address: walletClient.account.address,
    type: "local",
    source: "custom",
    publicKey: walletClient.account.address,
    signMessage: async ({ message }) => {
      return walletClient.signMessage({ message });
    },
    async signTypedData(typedData) {
      return signTypedData(walletClient, {
        account: walletClient.account,
        ...typedData
      });
    }
  };
}

// node_modules/permissionless/_esm/utils/providerToSmartAccountSigner.js
var providerToSmartAccountSigner = async (provider, params) => {
  let account;
  if (!params) {
    try {
      ;
      [account] = await provider.request({
        method: "eth_requestAccounts"
      });
    } catch {
      ;
      [account] = await provider.request({
        method: "eth_accounts"
      });
    }
  } else {
    account = params.signerAddress;
  }
  const walletClient = createWalletClient({
    account,
    transport: custom(provider)
  });
  return walletClientToSmartAccountSigner(walletClient);
};

// node_modules/permissionless/_esm/utils/getPackedUserOperation.js
function getInitCode(unpackedUserOperation) {
  return unpackedUserOperation.factory ? concat([
    unpackedUserOperation.factory,
    unpackedUserOperation.factoryData || "0x"
  ]) : "0x";
}
function getAccountGasLimits(unpackedUserOperation) {
  return concat([
    pad(toHex(unpackedUserOperation.verificationGasLimit), {
      size: 16
    }),
    pad(toHex(unpackedUserOperation.callGasLimit), { size: 16 })
  ]);
}
function getGasLimits(unpackedUserOperation) {
  return concat([
    pad(toHex(unpackedUserOperation.maxPriorityFeePerGas), {
      size: 16
    }),
    pad(toHex(unpackedUserOperation.maxFeePerGas), { size: 16 })
  ]);
}
function getPaymasterAndData(unpackedUserOperation) {
  return unpackedUserOperation.paymaster ? concat([
    unpackedUserOperation.paymaster,
    pad(toHex(unpackedUserOperation.paymasterVerificationGasLimit || BigInt(0)), {
      size: 16
    }),
    pad(toHex(unpackedUserOperation.paymasterPostOpGasLimit || BigInt(0)), {
      size: 16
    }),
    unpackedUserOperation.paymasterData || "0x"
  ]) : "0x";
}
var getPackedUserOperation = (userOperation) => {
  return {
    sender: userOperation.sender,
    nonce: userOperation.nonce,
    initCode: getInitCode(userOperation),
    callData: userOperation.callData,
    accountGasLimits: getAccountGasLimits(userOperation),
    preVerificationGas: userOperation.preVerificationGas,
    gasFees: getGasLimits(userOperation),
    paymasterAndData: getPaymasterAndData(userOperation),
    signature: userOperation.signature
  };
};

// node_modules/permissionless/_esm/utils/index.js
function parseAccount(account) {
  if (typeof account === "string")
    return { address: account, type: "json-rpc" };
  return account;
}

// node_modules/permissionless/_esm/utils/signUserOperationHashWithECDSA.js
var AccountOrClientNotFoundError = class extends BaseError {
  constructor({ docsPath } = {}) {
    super([
      "Could not find an Account to execute with this Action.",
      "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the WalletClient."
    ].join("\n"), {
      docsPath,
      docsSlug: "account"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AccountOrClientNotFoundError"
    });
  }
};
var signUserOperationHashWithECDSA = async ({ client, account: account_ = client == null ? void 0 : client.account, hash, userOperation, chainId: chainId2, entryPoint: entryPointAddress }) => {
  if (!account_)
    throw new AccountOrClientNotFoundError({
      docsPath: "/permissionless/reference/utils/signUserOperationHashWithECDSA"
    });
  let userOperationHash;
  if (hash) {
    userOperationHash = hash;
  } else {
    userOperationHash = getUserOperationHash({
      userOperation,
      chainId: chainId2,
      entryPoint: entryPointAddress
    });
  }
  const account = parseAccount(account_);
  if (account.type === "local")
    return account.signMessage({
      message: {
        raw: userOperationHash
      }
    });
  if (!client)
    throw new AccountOrClientNotFoundError({
      docsPath: "/permissionless/reference/utils/signUserOperationHashWithECDSA"
    });
  return client.request({
    method: "personal_sign",
    params: [userOperationHash, account.address]
  });
};

// node_modules/permissionless/_esm/errors/utils.js
function prettyPrint(args) {
  const entries = Object.entries(args).map(([key, value]) => {
    if (value === void 0 || value === false)
      return null;
    return [key, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
  return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}

// node_modules/permissionless/_esm/errors/estimateUserOperationGas.js
var EstimateUserOperationGasError = class extends BaseError {
  constructor(cause, { userOperation, entryPoint, docsPath }) {
    const prettyArgs = prettyPrint({
      sender: userOperation.sender,
      nonce: userOperation.nonce,
      initCode: userOperation.initCode,
      callData: userOperation.callData,
      callGasLimit: userOperation.callGasLimit,
      verificationGasLimit: userOperation.verificationGasLimit,
      preVerificationGas: userOperation.preVerificationGas,
      maxFeePerGas: userOperation.maxFeePerGas,
      maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
      paymasterAndData: userOperation.paymasterAndData,
      signature: userOperation.signature,
      entryPoint
    });
    super(cause.shortMessage, {
      cause,
      docsPath,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Estimate Gas Arguments:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EstimateUserOperationGasError"
    });
    this.cause = cause;
  }
};

// node_modules/permissionless/_esm/errors/account.js
var SenderAlreadyDeployedError = class extends BaseError {
  constructor({ cause, sender, docsPath } = {}) {
    super([
      `Smart account ${sender} is already deployed.`,
      "",
      "Possible solutions:",
      `• Remove the initCode from the user operation and set it to "0x"`,
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SenderAlreadyDeployedError"
    });
  }
};
Object.defineProperty(SenderAlreadyDeployedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa10/
});
var InitCodeRevertedError = class extends BaseError {
  constructor({ cause, docsPath } = {}) {
    super([
      "EntryPoint failed to create the smart account with the initCode provided.",
      "",
      "Possible reasons:",
      "• The initCode ran out of gas",
      "• The initCode reverted during the account deployment process",
      "",
      "Possible solutions:",
      "• Verify that the factory address in the initCode is correct (the factory address is the first 20 bytes of the initCode).",
      "• Verify that the initCode is correct.",
      "• Check whether the verificationGasLimit is sufficient for the initCode to complete without running out of gas.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InitCodeRevertedError"
    });
  }
};
Object.defineProperty(InitCodeRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa13/
});
var SenderAddressMismatchError = class extends BaseError {
  constructor({ cause, sender, docsPath }) {
    super([
      "The initCode returned a different smart account address than expected.",
      `Expected: ${sender}`,
      "",
      "Possible reasons:",
      "• Account deployed with the initCode provided does not match match the sender address provided",
      "",
      "Possible solutions:",
      "• Verify that the sender address was generated deterministically from the initCode. (consider leveraging functions like getSenderAddress)",
      "• Verify that the factory address in the initCode is correct (the factory address is the first 20 bytes of the initCode)",
      "• Verify that the initCode is correct.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SenderAddressMismatchError"
    });
  }
};
Object.defineProperty(SenderAddressMismatchError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa14/
});
var InitCodeDidNotDeploySenderError = class extends BaseError {
  constructor({ cause, sender, docsPath }) {
    super([
      `The initCode did not deploy the sender at the address ${sender}.`,
      "",
      "Possible reasons:",
      "• The initCode factory is not creating an account.",
      "• The initCode factory is creating an account, but is not implemented correctly as it is not deploying at the sender address",
      "",
      "Possible solutions:",
      "• Verify that the factory address in the initCode is correct (the factory address is the first 20 bytes of the initCode).",
      "• Verify that the initCode factory is implemented correctly. The factory must deploy the smart account at the sender address.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InitCodeDidNotDeploySenderError"
    });
  }
};
Object.defineProperty(InitCodeDidNotDeploySenderError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa15/
});
var SenderNotDeployedError = class extends BaseError {
  constructor({ cause, sender, docsPath }) {
    super([
      `Smart account ${sender} is not deployed.`,
      "",
      "Possible reasons:",
      "• An initCode was not specified, but the sender address (i.e. the smart account) is not deployed.",
      "",
      "Possible solutions:",
      "• If this is the first transaction by this account, make sure the initCode is included in the user operation.",
      "• If the smart account is already supposed to be deployed, verify that you have selected the correct sender address for the user operation.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SenderNotDeployedError"
    });
  }
};
Object.defineProperty(SenderNotDeployedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa20/
});
var SmartAccountInsufficientFundsError = class extends BaseError {
  constructor({ cause, sender, docsPath }) {
    super([
      `You are not using a paymaster, and the ${sender} address did not have enough native tokens to cover the gas costs associated with the user operation.`,
      "",
      "Possible solutions:",
      "• If you are not using a paymaster, verify that the sender address has enough native tokens to cover the required prefund. Consider leveraging functions like getRequiredPrefund.",
      "• If you are looking to use a paymaster to cover the gas fees, verify that the paymasterAndData field is set.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SmartAccountInsufficientFundsError"
    });
  }
};
Object.defineProperty(SmartAccountInsufficientFundsError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa21/
});
var SmartAccountSignatureValidityPeriodError = class extends BaseError {
  constructor({ cause, docsPath }) {
    super([
      "The signature used in the user operation is not valid, because it is outside of the time range it specified.",
      "",
      "Possible reasons:",
      "• This error occurs when the block.timestamp falls after the validUntil timestamp, or before the validAfter timestamp.",
      "",
      "Possible solutions:",
      "• If you are looking to use time-based signatures, verify that the validAfter and validUntil fields are set correctly and that the user operation is sent within the specified range.",
      "• If you are not looking to use time-based signatures, verify that the validAfter and validUntil fields are set to 0.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SmartAccountSignatureValidityPeriodError"
    });
  }
};
Object.defineProperty(SmartAccountSignatureValidityPeriodError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa22/
});
var SmartAccountValidationRevertedError = class extends BaseError {
  constructor({ cause, sender, docsPath }) {
    super([
      `The smart account ${sender} reverted or ran out of gas during the validation of the user operation.`,
      "",
      "Possible solutions:",
      "• Verify that the verificationGasLimit is high enough to cover the validateUserOp function's gas costs.",
      "• Make sure validateUserOp returns uint(1) for invalid signatures, and MUST NOT REVERT when the signature is invalid",
      "• If you are not using a paymaster, verify that the sender address has enough native tokens to cover the required pre fund. Consider leveraging functions like getRequiredPrefund.",
      "• Verify that the validateUserOp function is implemented with the correct logic, and that the user operation is supposed to be valid.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SmartAccountValidationRevertedError"
    });
  }
};
Object.defineProperty(SmartAccountValidationRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa23/
});
var InvalidSmartAccountSignatureError = class extends BaseError {
  constructor({ cause, sender, docsPath }) {
    super([
      `The smart account ${sender} signature is invalid.`,
      "",
      "Possible solutions:",
      "• Verify that the user operation was correctly signed, and that the signature was correctly encoded in the signature field of the user operation.",
      "• Most smart account implementations sign over the userOpHash. Make sure that the userOpHash is correctly computed. Consider leveraging functions like getUserOperationHash.",
      "• Make sure you have selected the correct chainId and entryPointAddress when computing the userOpHash.",
      "• Make sure the smart account signature verification function is correctly implemented.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidSmartAccountSignatureError"
    });
  }
};
Object.defineProperty(InvalidSmartAccountSignatureError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa24/
});
var InvalidSmartAccountNonceError = class extends BaseError {
  constructor({ cause, sender, nonce, docsPath }) {
    const nonceKey = nonce >> BigInt(64);
    const nonceSequence = nonce & 0xffffffffffffffffn;
    super([
      `The smart account ${sender} nonce is invalid.`,
      `Nonce sent: ${nonce} (key: ${nonceKey}, sequence: ${nonceSequence})`,
      "",
      "Possible solutions:",
      "• Verify that you are using the correct nonce for the user operation. The nonce should be the current nonce of the smart account for the selected key. Consider leveraging functions like getAccountNonce.",
      "• Verify that the nonce is formatted correctly.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidSmartAccountNonceError"
    });
  }
};
Object.defineProperty(InvalidSmartAccountNonceError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa25/
});

// node_modules/permissionless/_esm/errors/sendUserOperation.js
var SendUserOperationError = class extends BaseError {
  constructor(cause, { userOperation, entryPoint, docsPath }) {
    const prettyArgs = prettyPrint({
      ...userOperation,
      entryPoint
    });
    super(cause.shortMessage, {
      cause,
      docsPath,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "sendUserOperation Arguments:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SendUserOperationError"
    });
    this.cause = cause;
  }
};

// node_modules/permissionless/_esm/errors/paymaster.js
var PaymasterNotDeployedError = class extends BaseError {
  constructor({ cause, paymasterAndData, docsPath } = {}) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `Paymaster ${paymaster} is not deployed.`,
      "",
      "Possible solutions:",
      "• Verify that the paymasterAndData field is correct, and that the first 20 bytes are the address of the paymaster contract you intend to use.",
      "• Verify that the paymaster contract is deployed on the network you are using.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterNotDeployedError"
    });
  }
};
Object.defineProperty(PaymasterNotDeployedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa30/
});
var PaymasterDepositTooLowError = class extends BaseError {
  constructor({ cause, paymasterAndData, docsPath } = {}) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `Paymaster ${paymaster} contract does not have enough funds deposited into the EntryPoint contract to cover the required funds for the user operation.`,
      "",
      "Possible solutions:",
      "• If you are using your own paymaster contract, deposit more funds into the EntryPoint contract through the deposit() function of the paymaster contract.",
      "• Verify that the paymasterAndData field is correct, and that the first 20 bytes are the address of the paymaster contract you intend to useVerify that the paymasterAndData field is correct, and that the first 20 bytes are the address of the paymaster contract you intend to use.",
      "• If you are using a paymaster service, reach out to them.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterDepositTooLowError"
    });
  }
};
Object.defineProperty(PaymasterDepositTooLowError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa31/
});
var PaymasterValidityPeriodError = class extends BaseError {
  constructor({ cause, paymasterAndData, docsPath }) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `Paymaster ${paymaster}'s data used in the paymasterAndData field of the user operation is not valid, because it is outside of the time range it specified.`,
      "",
      "Possible reasons:",
      "• This error occurs when the block.timestamp falls after the validUntil timestamp, or before the validAfter timestamp.",
      "",
      "Possible solutions:",
      "• If you are using your own paymaster contract and using time-based signatures, verify that the validAfter and validUntil fields are set correctly and that the user operation is sent within the specified range.",
      "• If you are using your own paymaster contract and not looking to use time-based signatures, verify that the validAfter and validUntil fields are set to 0.",
      "• If you are using a service, contact your service provider for their paymaster's validity.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterValidityPeriodError"
    });
  }
};
Object.defineProperty(PaymasterValidityPeriodError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa32/
});
var PaymasterValidationRevertedError = class extends BaseError {
  constructor({ cause, paymasterAndData, docsPath }) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `The validatePaymasterUserOp function of the paymaster ${paymaster} either reverted or ran out of gas.`,
      "",
      "Possible solutions:",
      "• Verify that the verificationGasLimit is high enough to cover the validatePaymasterUserOp function's gas costs.",
      "• If you are using your own paymaster contract, verify that the validatePaymasterUserOp function is implemented with the correct logic, and that the user operation is supposed to be valid.",
      "• If you are using a paymaster service, and the user operation is well formed with a high enough verificationGasLimit, reach out to them.",
      "• If you are not looking to use a paymaster to cover the gas fees, verify that the paymasterAndData field is not set.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterValidationRevertedError"
    });
  }
};
Object.defineProperty(PaymasterValidationRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa33/
});
var PaymasterDataRejectedError = class extends BaseError {
  constructor({ cause, paymasterAndData, docsPath }) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `The validatePaymasterUserOp function of the paymaster ${paymaster} rejected paymasterAndData.`,
      "",
      "Possible solutions:",
      "• If you are using your own paymaster contract, verify that the user operation was correctly signed according to your implementation, and that the paymaster signature was correctly encoded in the paymasterAndData field of the user operation.",
      "• If you are using a paymaster service, make sure you do not modify any of the fields of the user operation after the paymaster signs over it (except the signature field).",
      "• If you are using a paymaster service and you have not modified any of the fields except the signature but you are still getting this error, reach out to them.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterDataRejectedError"
    });
  }
};
Object.defineProperty(PaymasterDataRejectedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa34/
});
var PaymasterPostOpRevertedError = class extends BaseError {
  constructor({ cause, paymasterAndData, docsPath }) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `The postOp function of the paymaster ${paymaster} reverted.`,
      "",
      "Possible solutions:",
      "• If you are using your own paymaster contract, verify that that you have correctly implemented the postOp function (if you are using one). If you do not intent to make use of the postOp function, make sure you do not set the context parameter in the paymaster's validatePaymasterUserOp function.",
      "• If you are using a paymaster service and you see this error, reach out to them.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterPostOpRevertedError"
    });
  }
};
Object.defineProperty(PaymasterPostOpRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa50/
});
var InvalidPaymasterAndDataError = class extends BaseError {
  constructor({ cause, docsPath }) {
    super([
      "The paymasterAndData field of the user operation is invalid.",
      "",
      "Possible solutions:",
      "• Make sure you have either not set a value for the paymasterAndData, or that it is at least 20 bytes long.",
      "• If you are using a paymaster service, reach out to them.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidPaymasterAndDataError"
    });
  }
};
Object.defineProperty(InvalidPaymasterAndDataError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa93/
});

// node_modules/permissionless/_esm/errors/bundler.js
var InvalidBeneficiaryAddressError = class extends BaseError {
  constructor({ cause, docsPath }) {
    super([
      "The bundler did not set a beneficiary address when bundling the user operation.",
      "",
      "Possible solutions:",
      "• If you encounter this error when running self-hosted bundler, make sure you have configured the bundler correctly.",
      "• If you are using a bundler provider, reach out to them.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidBeneficiaryAddressError"
    });
  }
};
Object.defineProperty(InvalidBeneficiaryAddressError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa9[01]/
});
var InvalidAggregatorError = class extends BaseError {
  constructor({ cause, docsPath }) {
    super([
      "The bundler tried to bundle the user operation with an invalid aggregator.",
      "",
      "Possible solutions:",
      "• If you are using your own bundler, configure it to use a valid aggregator.",
      "• If you are using a bundler provider, reach out to them.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAggregatorError"
    });
  }
};
Object.defineProperty(InvalidAggregatorError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa96/
});

// node_modules/permissionless/_esm/errors/gas.js
var VerificationGasLimitTooLowError = class extends BaseError {
  constructor({ cause, verificationGasLimit, docsPath }) {
    super([
      `The smart account and paymaster verification exceeded the verificationGasLimit ${verificationGasLimit} set for the user operation.`,
      "",
      "Possible solutions:",
      "• Verify that the verificationGasLimit set for the user operation is high enough to cover the gas used during smart account and paymaster verification.",
      "• If you are using the eth_estimateUserOperationGas or pm_sponsorUserOperation method from bundler provider to set user operation gas limits and the EntryPoint throws this error during submission, reach out to them.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "VerificationGasLimitTooLowError"
    });
  }
};
Object.defineProperty(VerificationGasLimitTooLowError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa4[01]/
});
var ActualGasCostTooHighError = class extends BaseError {
  constructor({ cause, docsPath }) {
    super([
      "The actual gas cost of the user operation ended up being higher than the funds paid by the smart account or the paymaster.",
      "",
      "Possible solutions:",
      "• If you encounter this error, try increasing the verificationGasLimit set for the user operation.",
      "• If you are using the eth_estimateUserOperationGas or pm_sponsorUserOperation method from bundler provider to set user operation gas limits and the EntryPoint throws this error during submission, reach out to them.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ActualGasCostTooHighError"
    });
  }
};
Object.defineProperty(ActualGasCostTooHighError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa51/
});
var GasValuesOverflowError = class extends BaseError {
  constructor({ cause, docsPath }) {
    super([
      "The gas limit values of the user operation overflowed, they must fit in uint160.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "GasValuesOverflowError"
    });
  }
};
Object.defineProperty(GasValuesOverflowError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa94/
});
var BundlerOutOfGasError = class extends BaseError {
  constructor({ cause, docsPath }) {
    super([
      "The bundler tried to bundle the user operation with the gas limit set too low.",
      "",
      "Possible solutions:",
      "• If you are using your own bundler, configure it send gas limits properly.",
      "• If you are using a bundler provider, reach out to them.",
      "",
      docsPath ? `Docs: ${docsPath}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BundlerOutOfGasError"
    });
  }
};
Object.defineProperty(BundlerOutOfGasError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa95/
});

// node_modules/permissionless/_esm/utils/errors/getBundlerError.js
function getBundlerError(err, args) {
  const message = (err.details || "").toLowerCase();
  const executionRevertedError = err instanceof BaseError ? err.walk((e) => e.code === ExecutionRevertedError.code) : err;
  if (executionRevertedError instanceof BaseError) {
    return new ExecutionRevertedError({
      cause: err,
      message: executionRevertedError.details
    });
  }
  if (args.userOperation.sender === void 0)
    return new UnknownNodeError({ cause: err });
  if (args.userOperation.nonce === void 0)
    return new UnknownNodeError({ cause: err });
  if (SenderAlreadyDeployedError.message.test(message)) {
    return new SenderAlreadyDeployedError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa10"
    });
  }
  if (InitCodeRevertedError.message.test(message)) {
    return new InitCodeRevertedError({
      cause: err,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa13"
    });
  }
  if (SenderAddressMismatchError.message.test(message)) {
    return new SenderAddressMismatchError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa14"
    });
  }
  if (InitCodeDidNotDeploySenderError.message.test(message)) {
    return new InitCodeDidNotDeploySenderError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa15"
    });
  }
  if (SenderNotDeployedError.message.test(message)) {
    return new SenderNotDeployedError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa20"
    });
  }
  if (SmartAccountInsufficientFundsError.message.test(message)) {
    return new SmartAccountInsufficientFundsError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa21"
    });
  }
  if (SmartAccountSignatureValidityPeriodError.message.test(message)) {
    return new SmartAccountSignatureValidityPeriodError({
      cause: err,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa22"
    });
  }
  if (SmartAccountValidationRevertedError.message.test(message)) {
    return new SmartAccountValidationRevertedError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa23"
    });
  }
  if (InvalidSmartAccountNonceError.message.test(message)) {
    return new InvalidSmartAccountNonceError({
      cause: err,
      sender: args.userOperation.sender,
      nonce: args.userOperation.nonce,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa25"
    });
  }
  if (PaymasterNotDeployedError.message.test(message)) {
    return new PaymasterNotDeployedError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa30"
    });
  }
  if (PaymasterDepositTooLowError.message.test(message)) {
    return new PaymasterDepositTooLowError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa31"
    });
  }
  if (PaymasterValidityPeriodError.message.test(message)) {
    return new PaymasterValidityPeriodError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa32"
    });
  }
  if (PaymasterValidationRevertedError.message.test(message)) {
    return new PaymasterValidationRevertedError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa33"
    });
  }
  if (PaymasterDataRejectedError.message.test(message)) {
    return new PaymasterDataRejectedError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa34"
    });
  }
  return new UnknownNodeError({ cause: err });
}

// node_modules/permissionless/_esm/utils/errors/getSendUserOperationError.js
function getSendUserOperationError(err, args) {
  const cause = (() => {
    const cause2 = getBundlerError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  throw new SendUserOperationError(cause, {
    ...args
  });
}

// node_modules/permissionless/_esm/actions/bundler/sendUserOperation.js
var sendUserOperation = async (client, args) => {
  const { userOperation, entryPoint } = args;
  try {
    const userOperationHash = await client.request({
      method: "eth_sendUserOperation",
      params: [
        deepHexlify(userOperation),
        entryPoint
      ]
    });
    return userOperationHash;
  } catch (err) {
    throw getSendUserOperationError(err, args);
  }
};

// node_modules/permissionless/_esm/utils/errors/getEstimateUserOperationGasError.js
function getEstimateUserOperationGasError(error, args) {
  const cause = (() => {
    const cause2 = getBundlerError(
      // biome-ignore lint/complexity/noBannedTypes: <explanation>
      error,
      args
    );
    if (cause2 instanceof UnknownNodeError)
      return error;
    return cause2;
  })();
  throw new EstimateUserOperationGasError(cause, {
    ...args
  });
}

// node_modules/permissionless/_esm/actions/bundler/estimateUserOperationGas.js
var estimateUserOperationGas = async (client, args, stateOverrides) => {
  const { userOperation, entryPoint } = args;
  const userOperationWithBigIntAsHex = deepHexlify(userOperation);
  const stateOverridesWithBigIntAsHex = deepHexlify(stateOverrides);
  try {
    const response = await client.request({
      method: "eth_estimateUserOperationGas",
      params: stateOverrides ? [
        userOperationWithBigIntAsHex,
        entryPoint,
        stateOverridesWithBigIntAsHex
      ] : [userOperationWithBigIntAsHex, entryPoint]
    });
    const entryPointVersion = getEntryPointVersion(entryPoint);
    if (entryPointVersion === "v0.6") {
      const responseV06 = response;
      return {
        preVerificationGas: BigInt(responseV06.preVerificationGas || 0),
        verificationGasLimit: BigInt(responseV06.verificationGasLimit || 0),
        callGasLimit: BigInt(responseV06.callGasLimit || 0)
      };
    }
    const responseV07 = response;
    return {
      preVerificationGas: BigInt(responseV07.preVerificationGas || 0),
      verificationGasLimit: BigInt(responseV07.verificationGasLimit || 0),
      callGasLimit: BigInt(responseV07.callGasLimit || 0),
      paymasterVerificationGasLimit: responseV07.paymasterVerificationGasLimit ? BigInt(responseV07.paymasterVerificationGasLimit) : void 0,
      paymasterPostOpGasLimit: responseV07.paymasterPostOpGasLimit ? BigInt(responseV07.paymasterPostOpGasLimit) : void 0
    };
  } catch (err) {
    throw getEstimateUserOperationGasError(err, args);
  }
};

// node_modules/permissionless/_esm/actions/bundler/getUserOperationByHash.js
var getUserOperationByHash = async (client, { hash }) => {
  const params = [hash];
  const response = await client.request({
    method: "eth_getUserOperationByHash",
    params
  });
  if (!response)
    return null;
  const { userOperation, entryPoint: entryPointAddress, transactionHash, blockHash, blockNumber } = response;
  return {
    userOperation: entryPointAddress === ENTRYPOINT_ADDRESS_V06 ? {
      ...userOperation,
      nonce: BigInt(userOperation.nonce),
      callGasLimit: BigInt(userOperation.callGasLimit),
      verificationGasLimit: BigInt(userOperation.verificationGasLimit),
      preVerificationGas: BigInt(userOperation.preVerificationGas),
      maxFeePerGas: BigInt(userOperation.maxFeePerGas),
      maxPriorityFeePerGas: BigInt(userOperation.maxPriorityFeePerGas)
    } : {
      ...userOperation,
      nonce: BigInt(userOperation.nonce),
      callGasLimit: BigInt(userOperation.callGasLimit),
      verificationGasLimit: BigInt(userOperation.verificationGasLimit),
      preVerificationGas: BigInt(userOperation.preVerificationGas),
      maxFeePerGas: BigInt(userOperation.maxFeePerGas),
      maxPriorityFeePerGas: BigInt(userOperation.maxPriorityFeePerGas),
      paymasterVerificationGasLimit: userOperation.paymasterVerificationGasLimit ? BigInt(userOperation.paymasterVerificationGasLimit) : void 0,
      paymasterPostOpGasLimit: userOperation.paymasterVerificationGasLimit ? BigInt(userOperation.paymasterPostOpGasLimit) : void 0
    },
    entryPoint: entryPointAddress,
    transactionHash,
    blockHash,
    blockNumber: BigInt(blockNumber)
  };
};

// node_modules/permissionless/_esm/actions/bundler/getUserOperationReceipt.js
var getUserOperationReceipt = async (client, { hash }) => {
  const params = [hash];
  const response = await client.request({
    method: "eth_getUserOperationReceipt",
    params
  });
  if (!response)
    return null;
  const userOperationReceipt = {
    userOpHash: response.userOpHash,
    sender: response.sender,
    nonce: BigInt(response.nonce),
    actualGasUsed: BigInt(response.actualGasUsed),
    actualGasCost: BigInt(response.actualGasCost),
    success: response.success,
    receipt: {
      transactionHash: response.receipt.transactionHash,
      transactionIndex: BigInt(response.receipt.transactionIndex),
      blockHash: response.receipt.blockHash,
      blockNumber: BigInt(response.receipt.blockNumber),
      from: response.receipt.from,
      to: response.receipt.to,
      cumulativeGasUsed: BigInt(response.receipt.cumulativeGasUsed),
      status: transactionReceiptStatus[response.receipt.status],
      gasUsed: BigInt(response.receipt.gasUsed),
      contractAddress: response.receipt.contractAddress,
      logsBloom: response.receipt.logsBloom,
      effectiveGasPrice: BigInt(response.receipt.effectiveGasPrice)
    },
    logs: response.logs.map((log) => ({
      data: log.data,
      blockNumber: BigInt(log.blockNumber),
      blockHash: log.blockHash,
      transactionHash: log.transactionHash,
      logIndex: BigInt(log.logIndex),
      transactionIndex: BigInt(log.transactionIndex),
      address: log.address,
      topics: log.topics
    }))
  };
  return userOperationReceipt;
};

// node_modules/permissionless/_esm/actions/bundler/supportedEntryPoints.js
var supportedEntryPoints = async (client) => {
  return client.request({
    method: "eth_supportedEntryPoints",
    params: []
  });
};

// node_modules/permissionless/_esm/utils/observe.js
var listenersCache = /* @__PURE__ */ new Map();
var cleanupCache = /* @__PURE__ */ new Map();
var callbackCount = 0;
function observe(observerId, callbacks, fn) {
  const callbackId = ++callbackCount;
  const getListeners = () => listenersCache.get(observerId) || [];
  const unsubscribe = () => {
    const listeners2 = getListeners();
    listenersCache.set(
      observerId,
      // biome-ignore lint/suspicious/noExplicitAny: it's a recursive function, so it's hard to type
      listeners2.filter((cb) => cb.id !== callbackId)
    );
  };
  const unwatch = () => {
    const cleanup2 = cleanupCache.get(observerId);
    if (getListeners().length === 1 && cleanup2)
      cleanup2();
    unsubscribe();
  };
  const listeners = getListeners();
  listenersCache.set(observerId, [
    ...listeners,
    { id: callbackId, fns: callbacks }
  ]);
  if (listeners && listeners.length > 0)
    return unwatch;
  const emit = {};
  for (const key in callbacks) {
    emit[key] = (...args) => {
      var _a, _b;
      const listeners2 = getListeners();
      if (listeners2.length === 0)
        return;
      for (const listener of listeners2) {
        (_b = (_a = listener.fns)[key]) == null ? void 0 : _b.call(_a, ...args);
      }
    };
  }
  const cleanup = fn(emit);
  if (typeof cleanup === "function")
    cleanupCache.set(observerId, cleanup);
  return unwatch;
}

// node_modules/permissionless/_esm/actions/bundler/waitForUserOperationReceipt.js
var WaitForUserOperationReceiptTimeoutError = class extends BaseError {
  constructor({ hash }) {
    super(`Timed out while waiting for transaction with hash "${hash}" to be confirmed.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WaitForUserOperationReceiptTimeoutError"
    });
  }
};
var waitForUserOperationReceipt = (bundlerClient, { hash, pollingInterval = bundlerClient.pollingInterval, timeout }) => {
  const observerId = stringify([
    "waitForUserOperationReceipt",
    bundlerClient.uid,
    hash
  ]);
  let userOperationReceipt;
  return new Promise((resolve, reject) => {
    const unobserve = observe(observerId, { resolve, reject }, async (emit) => {
      let timeoutTimer;
      const _removeInterval = setInterval(async () => {
        const done = (fn) => {
          clearInterval(_removeInterval);
          fn();
          unobserve();
          if (timeout)
            clearTimeout(timeoutTimer);
        };
        try {
          const _userOperationReceipt = await getAction(bundlerClient, getUserOperationReceipt, "getUserOperationReceipt")({ hash });
          if (_userOperationReceipt !== null) {
            userOperationReceipt = _userOperationReceipt;
          }
          if (userOperationReceipt) {
            done(() => emit.resolve(userOperationReceipt));
            return;
          }
        } catch (err) {
          done(() => emit.reject(err));
          return;
        }
      }, pollingInterval);
      if (timeout) {
        timeoutTimer = setTimeout(() => {
          clearInterval(_removeInterval);
          unobserve();
          reject(new WaitForUserOperationReceiptTimeoutError({
            hash
          }));
          clearTimeout(timeoutTimer);
        }, timeout);
      }
    });
  });
};

// node_modules/permissionless/_esm/clients/decorators/bundler.js
var bundlerActions = (entryPointAddress) => (client) => ({
  sendUserOperation: async (args) => sendUserOperation(client, {
    ...args,
    entryPoint: entryPointAddress
  }),
  estimateUserOperationGas: (args, stateOverrides) => estimateUserOperationGas(client, { ...args, entryPoint: entryPointAddress }, stateOverrides),
  supportedEntryPoints: () => supportedEntryPoints(client),
  chainId: () => chainId(client),
  getUserOperationByHash: (args) => getUserOperationByHash(client, args),
  getUserOperationReceipt: (args) => getUserOperationReceipt(client, args),
  waitForUserOperationReceipt: (args) => waitForUserOperationReceipt(client, args)
});

export {
  chainId,
  getAddressFromInitCodeOrPaymasterAndData,
  getRequiredPrefund,
  getUserOperationHash,
  isSmartAccountDeployed,
  walletClientToSmartAccountSigner,
  providerToSmartAccountSigner,
  AccountOrClientNotFoundError,
  signUserOperationHashWithECDSA,
  getPackedUserOperation,
  parseAccount,
  EstimateUserOperationGasError,
  SenderAlreadyDeployedError,
  InitCodeRevertedError,
  SenderAddressMismatchError,
  InitCodeDidNotDeploySenderError,
  SenderNotDeployedError,
  SmartAccountInsufficientFundsError,
  SmartAccountSignatureValidityPeriodError,
  SmartAccountValidationRevertedError,
  InvalidSmartAccountSignatureError,
  InvalidSmartAccountNonceError,
  sendUserOperation,
  SendUserOperationError,
  PaymasterNotDeployedError,
  PaymasterDepositTooLowError,
  PaymasterValidityPeriodError,
  PaymasterValidationRevertedError,
  PaymasterDataRejectedError,
  PaymasterPostOpRevertedError,
  InvalidPaymasterAndDataError,
  InvalidBeneficiaryAddressError,
  InvalidAggregatorError,
  VerificationGasLimitTooLowError,
  ActualGasCostTooHighError,
  GasValuesOverflowError,
  BundlerOutOfGasError,
  estimateUserOperationGas,
  getUserOperationByHash,
  getUserOperationReceipt,
  supportedEntryPoints,
  WaitForUserOperationReceiptTimeoutError,
  waitForUserOperationReceipt,
  bundlerActions
};
//# sourceMappingURL=chunk-32UEECII.js.map
