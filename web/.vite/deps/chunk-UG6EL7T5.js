// node_modules/@turnkey/api-key-stamper/dist/tink/bytes.mjs
function fromHex(hex) {
  if (hex.length % 2 != 0) {
    throw new Error("Hex string length must be multiple of 2");
  }
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    arr[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return arr;
}
function toHex(bytes) {
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
    const hexByte = bytes[i].toString(16);
    result += hexByte.length > 1 ? hexByte : "0" + hexByte;
  }
  return result;
}
function toBase64(bytes, opt_webSafe) {
  const encoded = btoa(
    /* padding */
    toByteString(bytes)
  ).replace(/=/g, "");
  if (opt_webSafe) {
    return encoded.replace(/\+/g, "-").replace(/\//g, "_");
  }
  return encoded;
}
function toByteString(bytes) {
  let str = "";
  for (let i = 0; i < bytes.length; i += 1) {
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}

// node_modules/@turnkey/api-key-stamper/dist/tink/elliptic_curves.mjs
function getModulus() {
  return BigInt("115792089210356248762697446949407573530086143415290314195533631308867097853951");
}
function getB() {
  return BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b");
}
function byteArrayToInteger(bytes) {
  return BigInt("0x" + toHex(bytes));
}
function integerToByteArray(i) {
  let input = i.toString(16);
  input = input.length % 2 === 0 ? input : "0" + input;
  return fromHex(input);
}
function testBit(n, i) {
  const m = BigInt(1) << BigInt(i);
  return (n & m) !== BigInt(0);
}
function modPow(b, exp, p) {
  if (exp === BigInt(0)) {
    return BigInt(1);
  }
  let result = b;
  const exponentBitString = exp.toString(2);
  for (let i = 1; i < exponentBitString.length; ++i) {
    result = result * result % p;
    if (exponentBitString[i] === "1") {
      result = result * b % p;
    }
  }
  return result;
}
function modSqrt(x, p) {
  if (p <= BigInt(0)) {
    throw new Error("p must be positive");
  }
  const base = x % p;
  if (testBit(p, 0) && /* istanbul ignore next */
  testBit(p, 1)) {
    const q = p + BigInt(1) >> BigInt(2);
    const squareRoot = modPow(base, q, p);
    if (squareRoot * squareRoot % p !== base) {
      throw new Error("could not find a modular square root");
    }
    return squareRoot;
  }
  throw new Error("unsupported modulus value");
}
function getY(x, lsb) {
  const p = getModulus();
  const a = p - BigInt(3);
  const b = getB();
  const rhs = ((x * x + a) * x + b) % p;
  let y = modSqrt(rhs, p);
  if (lsb !== testBit(y, 0)) {
    y = (p - y) % p;
  }
  return y;
}
function pointDecode(point) {
  const fieldSize = fieldSizeInBytes();
  if (point.length !== 1 + fieldSize) {
    throw new Error("compressed point has wrong length");
  }
  if (point[0] !== 2 && point[0] !== 3) {
    throw new Error("invalid format");
  }
  const lsb = point[0] === 3;
  const x = byteArrayToInteger(point.subarray(1, point.length));
  const p = getModulus();
  if (x < BigInt(0) || x >= p) {
    throw new Error("x is out of range");
  }
  const y = getY(x, lsb);
  const result = {
    kty: "EC",
    crv: "P-256",
    x: toBase64(
      integerToByteArray(x),
      /* websafe */
      true
    ),
    y: toBase64(
      integerToByteArray(y),
      /* websafe */
      true
    ),
    ext: true
  };
  return result;
}
function fieldSizeInBytes() {
  return 32;
}

// node_modules/@turnkey/api-key-stamper/dist/encoding.mjs
function stringToBase64urlString(input) {
  const base64String = btoa(input);
  return base64StringToBase64UrlEncodedString(base64String);
}
function base64StringToBase64UrlEncodedString(input) {
  return input.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function uint8ArrayToHexString(input) {
  return input.reduce((result, x) => result + x.toString(16).padStart(2, "0"), "");
}
function convertTurnkeyApiKeyToJwk(input) {
  const { uncompressedPrivateKeyHex, compressedPublicKeyHex } = input;
  const jwk = pointDecode(hexStringToUint8Array(compressedPublicKeyHex));
  jwk.d = hexStringToBase64urlString(uncompressedPrivateKeyHex);
  return jwk;
}
function hexStringToUint8Array(input) {
  if (input.length === 0 || input.length % 2 !== 0 || /[^a-fA-F0-9]/u.test(input)) {
    throw new Error(`Invalid hex string: ${JSON.stringify(input)}`);
  }
  return Uint8Array.from(input.match(
    /.{2}/g
    // Split string by every two characters
  ).map((byte) => parseInt(byte, 16)));
}
function hexStringToBase64urlString(input) {
  const buffer = hexStringToUint8Array(input);
  return stringToBase64urlString(buffer.reduce((result, x) => result + String.fromCharCode(x), ""));
}

export {
  uint8ArrayToHexString,
  convertTurnkeyApiKeyToJwk
};
/*! Bundled license information:

@turnkey/api-key-stamper/dist/tink/bytes.mjs:
  (**
   * Code modified from https://github.com/google/tink/blob/6f74b99a2bfe6677e3670799116a57268fd067fa/javascript/subtle/bytes.ts
   *
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@turnkey/api-key-stamper/dist/tink/elliptic_curves.mjs:
  (**
   * Code modified from https://github.com/google/tink/blob/6f74b99a2bfe6677e3670799116a57268fd067fa/javascript/subtle/elliptic_curves.ts
   *
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=chunk-UG6EL7T5.js.map
