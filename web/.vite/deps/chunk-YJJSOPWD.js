import {
  ENTRYPOINT_ADDRESS_V06,
  deepHexlify
} from "./chunk-7L37OE6G.js";

// node_modules/permissionless/_esm/actions/pimlico/getUserOperationGasPrice.js
var getUserOperationGasPrice = async (client) => {
  const gasPrice = await client.request({
    method: "pimlico_getUserOperationGasPrice",
    params: []
  });
  return {
    slow: {
      maxFeePerGas: BigInt(gasPrice.slow.maxFeePerGas),
      maxPriorityFeePerGas: BigInt(gasPrice.slow.maxPriorityFeePerGas)
    },
    standard: {
      maxFeePerGas: BigInt(gasPrice.standard.maxFeePerGas),
      maxPriorityFeePerGas: BigInt(gasPrice.standard.maxPriorityFeePerGas)
    },
    fast: {
      maxFeePerGas: BigInt(gasPrice.fast.maxFeePerGas),
      maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas)
    }
  };
};

// node_modules/permissionless/_esm/actions/pimlico/getUserOperationStatus.js
var getUserOperationStatus = async (client, { hash }) => {
  return client.request({
    method: "pimlico_getUserOperationStatus",
    params: [hash]
  });
};

// node_modules/permissionless/_esm/actions/pimlico/sendCompressedUserOperation.js
var sendCompressedUserOperation = async (client, args) => {
  const { compressedUserOperation, inflatorAddress, entryPoint } = args;
  return client.request({
    method: "pimlico_sendCompressedUserOperation",
    params: [
      compressedUserOperation,
      inflatorAddress,
      entryPoint
    ]
  });
};

// node_modules/permissionless/_esm/actions/pimlico/sponsorUserOperation.js
var sponsorUserOperation = async (client, args) => {
  const response = await client.request({
    method: "pm_sponsorUserOperation",
    params: args.sponsorshipPolicyId ? [
      deepHexlify(args.userOperation),
      args.entryPoint,
      {
        sponsorshipPolicyId: args.sponsorshipPolicyId
      }
    ] : [
      deepHexlify(args.userOperation),
      args.entryPoint
    ]
  });
  if (args.entryPoint === ENTRYPOINT_ADDRESS_V06) {
    const responseV06 = response;
    return {
      paymasterAndData: responseV06.paymasterAndData,
      preVerificationGas: BigInt(responseV06.preVerificationGas),
      verificationGasLimit: BigInt(responseV06.verificationGasLimit),
      callGasLimit: BigInt(responseV06.callGasLimit)
    };
  }
  const responseV07 = response;
  return {
    callGasLimit: BigInt(responseV07.callGasLimit),
    verificationGasLimit: BigInt(responseV07.verificationGasLimit),
    preVerificationGas: BigInt(responseV07.preVerificationGas),
    paymaster: responseV07.paymaster,
    paymasterVerificationGasLimit: BigInt(responseV07.paymasterVerificationGasLimit),
    paymasterPostOpGasLimit: BigInt(responseV07.paymasterPostOpGasLimit),
    paymasterData: responseV07.paymasterData
  };
};

// node_modules/permissionless/_esm/clients/decorators/pimlico.js
var pimlicoBundlerActions = (entryPointAddress) => (client) => ({
  getUserOperationGasPrice: async () => getUserOperationGasPrice(client),
  getUserOperationStatus: async (args) => getUserOperationStatus(client, args),
  sendCompressedUserOperation: async (args) => sendCompressedUserOperation(client, {
    ...args,
    entryPoint: entryPointAddress
  })
});
var pimlicoPaymasterActions = (entryPointAddress) => (client) => ({
  sponsorUserOperation: async (args) => sponsorUserOperation(client, {
    ...args,
    entryPoint: entryPointAddress
  }),
  validateSponsorshipPolicies: async (args) => validateSponsorshipPolicies(client, { ...args, entryPoint: entryPointAddress })
});

// node_modules/permissionless/_esm/actions/pimlico/validateSponsorshipPolicies.js
var validateSponsorshipPolicies = async (client, args) => {
  return await client.request({
    method: "pm_validateSponsorshipPolicies",
    params: [
      deepHexlify(args.userOperation),
      args.entryPoint,
      args.sponsorshipPolicyIds
    ]
  });
};

export {
  getUserOperationGasPrice,
  getUserOperationStatus,
  sendCompressedUserOperation,
  sponsorUserOperation,
  validateSponsorshipPolicies,
  pimlicoBundlerActions,
  pimlicoPaymasterActions
};
//# sourceMappingURL=chunk-YJJSOPWD.js.map
