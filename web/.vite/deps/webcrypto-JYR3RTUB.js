import {
  convertTurnkeyApiKeyToJwk,
  uint8ArrayToHexString
} from "./chunk-UG6EL7T5.js";
import "./chunk-J32WSRGE.js";

// node_modules/@turnkey/api-key-stamper/dist/webcrypto.mjs
var signWithApiKey = async (input) => {
  const { content, publicKey, privateKey } = input;
  const key = await importTurnkeyApiKey({
    uncompressedPrivateKeyHex: privateKey,
    compressedPublicKeyHex: publicKey
  });
  return await signMessage({ key, content });
};
async function importTurnkeyApiKey(input) {
  const { uncompressedPrivateKeyHex, compressedPublicKeyHex } = input;
  const jwk = convertTurnkeyApiKeyToJwk({
    uncompressedPrivateKeyHex,
    compressedPublicKeyHex
  });
  return await crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "ECDSA",
      namedCurve: "P-256"
    },
    false,
    // not extractable
    ["sign"]
    // allow signing
  );
}
async function signMessage(input) {
  const { key, content } = input;
  const signatureIeee1363 = await crypto.subtle.sign({
    name: "ECDSA",
    hash: "SHA-256"
  }, key, new TextEncoder().encode(content));
  const signatureDer = convertEcdsaIeee1363ToDer(new Uint8Array(signatureIeee1363));
  return uint8ArrayToHexString(signatureDer);
}
function convertEcdsaIeee1363ToDer(ieee) {
  if (ieee.length % 2 != 0 || ieee.length == 0 || ieee.length > 132) {
    throw new Error("Invalid IEEE P1363 signature encoding. Length: " + ieee.length);
  }
  const r = toUnsignedBigNum(ieee.subarray(0, ieee.length / 2));
  const s = toUnsignedBigNum(ieee.subarray(ieee.length / 2, ieee.length));
  let offset = 0;
  const length = 1 + 1 + r.length + 1 + 1 + s.length;
  let der;
  if (length >= 128) {
    der = new Uint8Array(length + 3);
    der[offset++] = 48;
    der[offset++] = 128 + 1;
    der[offset++] = length;
  } else {
    der = new Uint8Array(length + 2);
    der[offset++] = 48;
    der[offset++] = length;
  }
  der[offset++] = 2;
  der[offset++] = r.length;
  der.set(r, offset);
  offset += r.length;
  der[offset++] = 2;
  der[offset++] = s.length;
  der.set(s, offset);
  return der;
}
function toUnsignedBigNum(bytes) {
  let start = 0;
  while (start < bytes.length && bytes[start] == 0) {
    start++;
  }
  if (start == bytes.length) {
    start = bytes.length - 1;
  }
  let extraZero = 0;
  if ((bytes[start] & 128) == 128) {
    extraZero = 1;
  }
  const res = new Uint8Array(bytes.length - start + extraZero);
  res.set(bytes.subarray(start), extraZero);
  return res;
}
export {
  signWithApiKey
};
//# sourceMappingURL=webcrypto-JYR3RTUB.js.map
