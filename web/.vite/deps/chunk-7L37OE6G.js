import {
  toHex
} from "./chunk-EUBNUXNN.js";

// node_modules/permissionless/_esm/utils/deepHexlify.js
var transactionReceiptStatus = {
  "0x0": "reverted",
  "0x1": "success"
};
function deepHexlify(obj) {
  if (typeof obj === "function") {
    return void 0;
  }
  if (obj == null || typeof obj === "string" || typeof obj === "boolean") {
    return obj;
  }
  if (typeof obj === "bigint") {
    return toHex(obj);
  }
  if (obj._isBigNumber != null || typeof obj !== "object") {
    return toHex(obj).replace(/^0x0/, "0x");
  }
  if (Array.isArray(obj)) {
    return obj.map((member) => deepHexlify(member));
  }
  return Object.keys(obj).reduce(
    // biome-ignore lint/suspicious/noExplicitAny: it's a recursive function, so it's hard to type
    (set, key) => {
      set[key] = deepHexlify(obj[key]);
      return set;
    },
    {}
  );
}

// node_modules/permissionless/_esm/utils/getEntryPointVersion.js
var ENTRYPOINT_ADDRESS_V06 = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
var ENTRYPOINT_ADDRESS_V07 = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
var getEntryPointVersion = (entryPoint) => entryPoint === ENTRYPOINT_ADDRESS_V06 ? "v0.6" : "v0.7";
function isUserOperationVersion06(entryPoint, _operation) {
  return getEntryPointVersion(entryPoint) === "v0.6";
}

export {
  transactionReceiptStatus,
  deepHexlify,
  ENTRYPOINT_ADDRESS_V06,
  ENTRYPOINT_ADDRESS_V07,
  getEntryPointVersion,
  isUserOperationVersion06
};
//# sourceMappingURL=chunk-7L37OE6G.js.map
