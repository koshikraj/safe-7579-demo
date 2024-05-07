import {
  sha256
} from "./chunk-LU3NF5RD.js";
import "./chunk-ABLC2WDW.js";
import {
  require_buffer
} from "./chunk-6RVCBVTV.js";
import {
  __toESM
} from "./chunk-J32WSRGE.js";

// node_modules/@turnkey/webauthn-stamper/dist/webauthn-json/base64url.mjs
function bufferToBase64url(buffer2) {
  const byteView = new Uint8Array(buffer2);
  let str = "";
  for (const charCode of byteView) {
    str += String.fromCharCode(charCode);
  }
  const base64String = btoa(str);
  const base64urlString = base64String.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return base64urlString;
}

// node_modules/@turnkey/webauthn-stamper/dist/webauthn-json/convert.mjs
var copyValue = "copy";
var convertValue = "convert";
function convert(conversionFn, schema, input) {
  if (schema === copyValue) {
    return input;
  }
  if (schema === convertValue) {
    return conversionFn(input);
  }
  if (schema instanceof Array) {
    return input.map((v) => convert(conversionFn, schema[0], v));
  }
  if (schema instanceof Object) {
    const output = {};
    for (const [key, schemaField] of Object.entries(schema)) {
      if (schemaField.derive) {
        const v = schemaField.derive(input);
        if (v !== void 0) {
          input[key] = v;
        }
      }
      if (!(key in input)) {
        if (schemaField.required) {
          throw new Error(`Missing key: ${key}`);
        }
        continue;
      }
      if (input[key] == null) {
        output[key] = null;
        continue;
      }
      output[key] = convert(conversionFn, schemaField.schema, input[key]);
    }
    return output;
  }
}
function derived(schema, derive) {
  return {
    required: true,
    schema,
    derive
  };
}
function required(schema) {
  return {
    required: true,
    schema
  };
}
function optional(schema) {
  return {
    required: false,
    schema
  };
}

// node_modules/@turnkey/webauthn-stamper/dist/webauthn-json/schema.mjs
var simplifiedClientExtensionResultsSchema = {
  appid: optional(copyValue),
  appidExclude: optional(copyValue),
  credProps: optional(copyValue)
};
var publicKeyCredentialWithAssertion = {
  type: required(copyValue),
  id: required(copyValue),
  rawId: required(convertValue),
  authenticatorAttachment: optional(copyValue),
  response: required({
    clientDataJSON: required(convertValue),
    authenticatorData: required(convertValue),
    signature: required(convertValue),
    userHandle: required(convertValue)
  }),
  clientExtensionResults: derived(simplifiedClientExtensionResultsSchema, (pkc) => pkc.getClientExtensionResults())
};

// node_modules/@turnkey/webauthn-stamper/dist/webauthn-json/api.mjs
function getResponseToJSON(credential) {
  return convert(bufferToBase64url, publicKeyCredentialWithAssertion, credential);
}

// node_modules/@turnkey/webauthn-stamper/dist/webauthn-json/index.mjs
async function get(options) {
  const response = await navigator.credentials.get(options);
  response.toJSON = () => getResponseToJSON(response);
  return response;
}

// node_modules/@turnkey/webauthn-stamper/dist/universal.mjs
var import_buffer = __toESM(require_buffer(), 1);
var buffer;
if (typeof (globalThis == null ? void 0 : globalThis.Buffer) !== "undefined") {
  buffer = globalThis.Buffer;
} else {
  buffer = import_buffer.Buffer;
}

// node_modules/@turnkey/webauthn-stamper/dist/index.mjs
var stampHeaderName = "X-Stamp-Webauthn";
var defaultTimeout = 5 * 60 * 1e3;
var defaultUserVerification = "preferred";
var WebauthnStamper = class {
  constructor(config) {
    this.rpId = config.rpId;
    this.timeout = config.timeout || defaultTimeout;
    this.userVerification = config.userVerification || defaultUserVerification;
    this.allowCredentials = config.allowCredentials || [];
  }
  async stamp(payload) {
    const challenge = getChallengeFromPayload(payload);
    const signingOptions = {
      publicKey: {
        rpId: this.rpId,
        challenge,
        allowCredentials: this.allowCredentials,
        timeout: this.timeout,
        userVerification: this.userVerification
      }
    };
    const clientGetResult = await get(signingOptions);
    const assertion = clientGetResult.toJSON();
    const stamp = {
      authenticatorData: assertion.response.authenticatorData,
      clientDataJson: assertion.response.clientDataJSON,
      credentialId: assertion.id,
      signature: assertion.response.signature
    };
    return {
      stampHeaderName,
      stampHeaderValue: JSON.stringify(stamp)
    };
  }
};
function getChallengeFromPayload(payload) {
  const messageBuffer = new TextEncoder().encode(payload);
  const hashBuffer = sha256(messageBuffer);
  const hexString = buffer.from(hashBuffer).toString("hex");
  const hexBuffer = buffer.from(hexString, "utf8");
  return new Uint8Array(hexBuffer);
}
export {
  WebauthnStamper
};
//# sourceMappingURL=@turnkey_webauthn-stamper.js.map
