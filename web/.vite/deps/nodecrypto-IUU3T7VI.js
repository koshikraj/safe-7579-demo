import {
  convertTurnkeyApiKeyToJwk
} from "./chunk-UG6EL7T5.js";
import {
  require_crypto
} from "./chunk-6QAH7EPR.js";
import {
  __toESM
} from "./chunk-J32WSRGE.js";

// node_modules/@turnkey/api-key-stamper/dist/nodecrypto.mjs
var crypto = __toESM(require_crypto(), 1);
var signWithApiKey = async (input) => {
  const { content, publicKey, privateKey } = input;
  const privateKeyObject = crypto.createPrivateKey({
    // @ts-expect-error -- the key can be a JWK object since Node v15.12.0
    // https://nodejs.org/api/crypto.html#cryptocreateprivatekeykey
    key: convertTurnkeyApiKeyToJwk({
      uncompressedPrivateKeyHex: privateKey,
      compressedPublicKeyHex: publicKey
    }),
    format: "jwk"
  });
  const sign = crypto.createSign("SHA256");
  sign.write(Buffer.from(content));
  sign.end();
  return sign.sign(privateKeyObject, "hex");
};
export {
  signWithApiKey
};
//# sourceMappingURL=nodecrypto-IUU3T7VI.js.map
