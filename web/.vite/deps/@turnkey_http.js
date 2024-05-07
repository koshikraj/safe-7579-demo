import "./chunk-UG6EL7T5.js";
import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-J32WSRGE.js";

// node_modules/@turnkey/http/node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/@turnkey/http/node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var global = typeof self !== "undefined" ? self : exports;
    var __self__ = function() {
      function F() {
        this.fetch = false;
        this.DOMException = global.DOMException;
      }
      F.prototype = global;
      return new F();
    }();
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init2) {
          return new Promise(function(resolve, reject) {
            var request2 = new Request(input, init2);
            if (request2.signal && request2.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request2.method, request2.url, true);
            if (request2.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request2.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request2.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            if (request2.signal) {
              request2.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request2.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request2._bodyInit === "undefined" ? null : request2._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch2;
          self2.Headers = Headers;
          self2.Request = Request;
          self2.Response = Response;
        }
        exports2.Headers = Headers;
        exports2.Request = Request;
        exports2.Response = Response;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    delete __self__.fetch.polyfill;
    var ctx = __self__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/@turnkey/http/dist/__generated__/services/coordinator/public/v1/public_api.fetcher.mjs
var public_api_fetcher_exports = {};
__export(public_api_fetcher_exports, {
  approveActivity: () => approveActivity,
  createApiKeys: () => createApiKeys,
  createApiOnlyUsers: () => createApiOnlyUsers,
  createAuthenticators: () => createAuthenticators,
  createInvitations: () => createInvitations,
  createPolicy: () => createPolicy,
  createPrivateKeyTag: () => createPrivateKeyTag,
  createPrivateKeys: () => createPrivateKeys,
  createSubOrganization: () => createSubOrganization,
  createUserTag: () => createUserTag,
  createUsers: () => createUsers,
  createWallet: () => createWallet,
  createWalletAccounts: () => createWalletAccounts,
  deleteApiKeys: () => deleteApiKeys,
  deleteAuthenticators: () => deleteAuthenticators,
  deleteInvitation: () => deleteInvitation,
  deletePolicy: () => deletePolicy,
  emailAuth: () => emailAuth,
  exportPrivateKey: () => exportPrivateKey,
  exportWallet: () => exportWallet,
  getActivities: () => getActivities,
  getActivity: () => getActivity,
  getAuthenticator: () => getAuthenticator,
  getAuthenticators: () => getAuthenticators,
  getOrganization: () => getOrganization,
  getPolicies: () => getPolicies,
  getPolicy: () => getPolicy,
  getPrivateKey: () => getPrivateKey,
  getPrivateKeys: () => getPrivateKeys,
  getUser: () => getUser,
  getUsers: () => getUsers,
  getWallet: () => getWallet,
  getWalletAccounts: () => getWalletAccounts,
  getWallets: () => getWallets,
  getWhoami: () => getWhoami,
  initUserEmailRecovery: () => initUserEmailRecovery,
  listPrivateKeyTags: () => listPrivateKeyTags,
  listUserTags: () => listUserTags,
  nOOPCodegenAnchor: () => nOOPCodegenAnchor,
  recoverUser: () => recoverUser,
  rejectActivity: () => rejectActivity,
  removeOrganizationFeature: () => removeOrganizationFeature,
  setOrganizationFeature: () => setOrganizationFeature,
  signApproveActivity: () => signApproveActivity,
  signCreateApiKeys: () => signCreateApiKeys,
  signCreateApiOnlyUsers: () => signCreateApiOnlyUsers,
  signCreateAuthenticators: () => signCreateAuthenticators,
  signCreateInvitations: () => signCreateInvitations,
  signCreatePolicy: () => signCreatePolicy,
  signCreatePrivateKeyTag: () => signCreatePrivateKeyTag,
  signCreatePrivateKeys: () => signCreatePrivateKeys,
  signCreateSubOrganization: () => signCreateSubOrganization,
  signCreateUserTag: () => signCreateUserTag,
  signCreateUsers: () => signCreateUsers,
  signCreateWallet: () => signCreateWallet,
  signCreateWalletAccounts: () => signCreateWalletAccounts,
  signDeleteApiKeys: () => signDeleteApiKeys,
  signDeleteAuthenticators: () => signDeleteAuthenticators,
  signDeleteInvitation: () => signDeleteInvitation,
  signDeletePolicy: () => signDeletePolicy,
  signEmailAuth: () => signEmailAuth,
  signExportPrivateKey: () => signExportPrivateKey,
  signExportWallet: () => signExportWallet,
  signGetActivities: () => signGetActivities,
  signGetActivity: () => signGetActivity,
  signGetAuthenticator: () => signGetAuthenticator,
  signGetAuthenticators: () => signGetAuthenticators,
  signGetOrganization: () => signGetOrganization,
  signGetPolicies: () => signGetPolicies,
  signGetPolicy: () => signGetPolicy,
  signGetPrivateKey: () => signGetPrivateKey,
  signGetPrivateKeys: () => signGetPrivateKeys,
  signGetUser: () => signGetUser,
  signGetUsers: () => signGetUsers,
  signGetWallet: () => signGetWallet,
  signGetWalletAccounts: () => signGetWalletAccounts,
  signGetWallets: () => signGetWallets,
  signGetWhoami: () => signGetWhoami,
  signInitUserEmailRecovery: () => signInitUserEmailRecovery,
  signListPrivateKeyTags: () => signListPrivateKeyTags,
  signListUserTags: () => signListUserTags,
  signNOOPCodegenAnchor: () => signNOOPCodegenAnchor,
  signRawPayload: () => signRawPayload,
  signRecoverUser: () => signRecoverUser,
  signRejectActivity: () => signRejectActivity,
  signRemoveOrganizationFeature: () => signRemoveOrganizationFeature,
  signSetOrganizationFeature: () => signSetOrganizationFeature,
  signSignRawPayload: () => signSignRawPayload,
  signSignTransaction: () => signSignTransaction,
  signTransaction: () => signTransaction,
  signUpdatePolicy: () => signUpdatePolicy,
  signUpdatePrivateKeyTag: () => signUpdatePrivateKeyTag,
  signUpdateRootQuorum: () => signUpdateRootQuorum,
  signUpdateUser: () => signUpdateUser,
  signUpdateUserTag: () => signUpdateUserTag,
  updatePolicy: () => updatePolicy,
  updatePrivateKeyTag: () => updatePrivateKeyTag,
  updateRootQuorum: () => updateRootQuorum,
  updateUser: () => updateUser,
  updateUserTag: () => updateUserTag
});

// node_modules/@turnkey/api-key-stamper/dist/index.mjs
var signWithApiKey = async (input) => {
  var _a;
  if (typeof ((_a = globalThis == null ? void 0 : globalThis.crypto) == null ? void 0 : _a.subtle) !== "undefined") {
    const fn = await import("./webcrypto-JYR3RTUB.js").then((m) => m.signWithApiKey);
    return fn(input);
  } else {
    const fn = await import("./nodecrypto-IUU3T7VI.js").then((m) => m.signWithApiKey);
    return fn(input);
  }
};

// node_modules/@turnkey/http/dist/universal.mjs
var import_cross_fetch = __toESM(require_browser_ponyfill(), 1);
var fetch = import_cross_fetch.fetch;

// node_modules/@turnkey/http/dist/config.mjs
var config = {
  apiPublicKey: null,
  apiPrivateKey: null,
  baseUrl: null
};
var browserConfig = {
  baseUrl: null
};
function browserInit(value) {
  browserConfig.baseUrl = assertNonEmptyString(value.baseUrl, "baseUrl");
}
function init(value) {
  config.apiPublicKey = assertNonEmptyString(value.apiPublicKey, "apiPublicKey");
  config.apiPrivateKey = assertNonEmptyString(value.apiPrivateKey, "apiPrivateKey");
  config.baseUrl = assertNonEmptyString(value.baseUrl, "baseUrl");
}
function getConfig() {
  return {
    apiPublicKey: assertNonEmptyString(config.apiPublicKey, "apiPublicKey"),
    apiPrivateKey: assertNonEmptyString(config.apiPrivateKey, "apiPrivateKey"),
    baseUrl: assertNonEmptyString(config.baseUrl, "baseUrl")
  };
}
function getBrowserConfig() {
  return {
    baseUrl: assertNonEmptyString(browserConfig.baseUrl, "baseUrl")
  };
}
function assertNonEmptyString(input, name) {
  if (typeof input !== "string" || !input) {
    throw new Error(`"${name}" must be a non-empty string`);
  }
  return input;
}

// node_modules/@turnkey/http/dist/encoding.mjs
function stringToBase64urlString2(input) {
  const base64String = btoa(input);
  return base64StringToBase64UrlEncodedString(base64String);
}
function base64StringToBase64UrlEncodedString(input) {
  return input.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

// node_modules/@turnkey/http/dist/webauthn-json/base64url.mjs
function bufferToBase64url(buffer) {
  const byteView = new Uint8Array(buffer);
  let str = "";
  for (const charCode of byteView) {
    str += String.fromCharCode(charCode);
  }
  const base64String = btoa(str);
  const base64urlString = base64String.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return base64urlString;
}

// node_modules/@turnkey/http/dist/webauthn-json/convert.mjs
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

// node_modules/@turnkey/http/dist/webauthn-json/schema.mjs
var simplifiedClientExtensionResultsSchema = {
  appid: optional(copyValue),
  appidExclude: optional(copyValue),
  credProps: optional(copyValue)
};
var publicKeyCredentialWithAttestation = {
  type: required(copyValue),
  id: required(copyValue),
  rawId: required(convertValue),
  authenticatorAttachment: optional(copyValue),
  response: required({
    clientDataJSON: required(convertValue),
    attestationObject: required(convertValue),
    transports: derived(copyValue, (response) => {
      var _a;
      return ((_a = response.getTransports) == null ? void 0 : _a.call(response)) || [];
    })
  }),
  clientExtensionResults: derived(simplifiedClientExtensionResultsSchema, (pkc) => pkc.getClientExtensionResults())
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

// node_modules/@turnkey/http/dist/webauthn-json/api.mjs
function createResponseToJSON(credential) {
  return convert(bufferToBase64url, publicKeyCredentialWithAttestation, credential);
}
function getResponseToJSON(credential) {
  return convert(bufferToBase64url, publicKeyCredentialWithAssertion, credential);
}

// node_modules/@turnkey/http/dist/webauthn-json/index.mjs
async function create(options) {
  const response = await navigator.credentials.create(options);
  response.toJSON = () => createResponseToJSON(response);
  return response;
}
async function get(options) {
  const response = await navigator.credentials.get(options);
  response.toJSON = () => getResponseToJSON(response);
  return response;
}

// node_modules/@turnkey/http/dist/webauthn.mjs
var defaultTimeout = 5 * 60 * 1e3;
var defaultUserVerification = "preferred";
var defaultSigningOptions = {
  publicKey: {
    timeout: defaultTimeout,
    userVerification: defaultUserVerification
  }
};
async function getCredentialRequestOptions(payload, tkSigningOptions = defaultSigningOptions) {
  const challenge = await getChallengeFromPayload(payload);
  const signingOptions = {
    ...tkSigningOptions,
    publicKey: {
      ...defaultSigningOptions.publicKey,
      ...tkSigningOptions.publicKey,
      challenge
    }
  };
  return signingOptions;
}
async function getChallengeFromPayload(payload) {
  const messageBuffer = new TextEncoder().encode(payload);
  const hashBuffer = await crypto.subtle.digest("SHA-256", messageBuffer);
  const hexString = Buffer.from(hashBuffer).toString("hex");
  const hexBuffer = Buffer.from(hexString, "utf8");
  return new Uint8Array(hexBuffer);
}
function protocolTransportEnumToInternalEnum(protocolEnum) {
  switch (protocolEnum) {
    case "internal": {
      return "AUTHENTICATOR_TRANSPORT_INTERNAL";
    }
    case "usb": {
      return "AUTHENTICATOR_TRANSPORT_USB";
    }
    case "nfc": {
      return "AUTHENTICATOR_TRANSPORT_NFC";
    }
    case "ble": {
      return "AUTHENTICATOR_TRANSPORT_BLE";
    }
    case "hybrid": {
      return "AUTHENTICATOR_TRANSPORT_HYBRID";
    }
    default: {
      throw new Error("unsupported transport format");
    }
  }
}
function toInternalAttestation(attestation) {
  return {
    credentialId: attestation.rawId,
    attestationObject: attestation.response.attestationObject,
    clientDataJson: attestation.response.clientDataJSON,
    transports: attestation.response.transports.map(protocolTransportEnumToInternalEnum)
  };
}
async function getWebAuthnAssertion(payload, options) {
  const webAuthnSupported = hasWebAuthnSupport();
  if (!webAuthnSupported) {
    throw new Error("webauthn is not supported by this browser");
  }
  const signingOptions = await getCredentialRequestOptions(payload, options);
  const clientGetResult = await get(signingOptions);
  const assertion = clientGetResult.toJSON();
  const stamp = {
    authenticatorData: assertion.response.authenticatorData,
    clientDataJson: assertion.response.clientDataJSON,
    credentialId: assertion.id,
    signature: assertion.response.signature
  };
  return JSON.stringify(stamp);
}
async function getWebAuthnAttestation(options) {
  const webAuthnSupported = hasWebAuthnSupport();
  if (!webAuthnSupported) {
    throw new Error("webauthn is not supported by this browser");
  }
  const res = await create(options);
  return toInternalAttestation(res.toJSON());
}
function hasWebAuthnSupport() {
  return !!window.PublicKeyCredential;
}

// node_modules/@turnkey/http/dist/base.mjs
var sharedHeaders = {};
var sharedRequestOptions = {
  redirect: "follow"
};
async function signedRequest(input) {
  const { uri: inputUri, query: inputQuery = {}, substitution: inputSubstitution = {}, body: inputBody = {} } = input;
  const url = constructUrl({
    uri: inputUri,
    query: inputQuery,
    substitution: inputSubstitution
  });
  const body = JSON.stringify(inputBody);
  const stamp = await getWebAuthnAssertion(body, input.options);
  return {
    url: url.toString(),
    body,
    stamp
  };
}
async function request(input) {
  const { uri: inputUri, method, headers: inputHeaders = {}, query: inputQuery = {}, substitution: inputSubstitution = {}, body: inputBody = {} } = input;
  const url = constructUrl({
    uri: inputUri,
    query: inputQuery,
    substitution: inputSubstitution
  });
  const { sealedBody, xStamp } = await sealAndStampRequestBody({
    body: inputBody
  });
  const response = await fetch(url.toString(), {
    ...sharedRequestOptions,
    method,
    headers: {
      ...sharedHeaders,
      ...inputHeaders,
      "X-Stamp": xStamp
    },
    body: sealedBody
  });
  if (!response.ok) {
    let res;
    try {
      res = await response.json();
    } catch (_) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    throw new TurnkeyRequestError(res);
  }
  const data = await response.json();
  return data;
}
function constructUrl(input) {
  const { uri, query, substitution } = input;
  const baseUrl = getBaseUrl();
  const url = new URL(substitutePath(uri, substitution), baseUrl);
  for (const key in query) {
    const value = query[key];
    if (Array.isArray(value)) {
      for (const item of value) {
        url.searchParams.append(key, item);
      }
    } else {
      url.searchParams.append(key, value ?? "");
    }
  }
  return url;
}
function getBaseUrl() {
  try {
    const { baseUrl } = getConfig();
    return baseUrl;
  } catch (e) {
    const { baseUrl } = getBrowserConfig();
    return baseUrl;
  }
}
function substitutePath(uri, substitutionMap) {
  let result = uri;
  const keyList = Object.keys(substitutionMap);
  for (const key of keyList) {
    const output = result.replaceAll(`{${key}}`, substitutionMap[key]);
    invariant(output !== result, `Substitution error: cannot find "${key}" in URI "${uri}". \`substitutionMap\`: ${JSON.stringify(substitutionMap)}`);
    result = output;
  }
  invariant(!/\{.*\}/.test(result), `Substitution error: found unsubstituted components in "${result}"`);
  return result;
}
function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
function stableStringify(input) {
  return JSON.stringify(input);
}
async function sealAndStampRequestBody(input) {
  const { body } = input;
  let { apiPublicKey, apiPrivateKey } = input;
  if (!apiPublicKey) {
    const config2 = getConfig();
    apiPublicKey = config2.apiPublicKey;
  }
  if (!apiPrivateKey) {
    const config2 = getConfig();
    apiPrivateKey = config2.apiPrivateKey;
  }
  const sealedBody = stableStringify(body);
  const signature = await signWithApiKey({
    content: sealedBody,
    privateKey: apiPrivateKey,
    publicKey: apiPublicKey
  });
  const sealedStamp = stableStringify({
    publicKey: apiPublicKey,
    scheme: "SIGNATURE_SCHEME_TK_API_P256",
    signature
  });
  const xStamp = stringToBase64urlString2(sealedStamp);
  return {
    sealedBody,
    xStamp
  };
}
var TurnkeyRequestError = class extends Error {
  constructor(input) {
    let turnkeyErrorMessage = `Turnkey error ${input.code}: ${input.message}`;
    if (input.details != null) {
      turnkeyErrorMessage += ` (Details: ${JSON.stringify(input.details)})`;
    }
    super(turnkeyErrorMessage);
    this.name = "TurnkeyRequestError";
    this.details = input.details ?? null;
    this.code = input.code;
  }
};

// node_modules/@turnkey/http/dist/__generated__/services/coordinator/public/v1/public_api.fetcher.mjs
var getActivity = (input) => request({
  uri: "/public/v1/query/get_activity",
  method: "POST",
  body: input.body
});
var signGetActivity = (input, options) => signedRequest({
  uri: "/public/v1/query/get_activity",
  body: input.body,
  options
});
var getAuthenticator = (input) => request({
  uri: "/public/v1/query/get_authenticator",
  method: "POST",
  body: input.body
});
var signGetAuthenticator = (input, options) => signedRequest({
  uri: "/public/v1/query/get_authenticator",
  body: input.body,
  options
});
var getAuthenticators = (input) => request({
  uri: "/public/v1/query/get_authenticators",
  method: "POST",
  body: input.body
});
var signGetAuthenticators = (input, options) => signedRequest({
  uri: "/public/v1/query/get_authenticators",
  body: input.body,
  options
});
var getOrganization = (input) => request({
  uri: "/public/v1/query/get_organization",
  method: "POST",
  body: input.body
});
var signGetOrganization = (input, options) => signedRequest({
  uri: "/public/v1/query/get_organization",
  body: input.body,
  options
});
var getPolicy = (input) => request({
  uri: "/public/v1/query/get_policy",
  method: "POST",
  body: input.body
});
var signGetPolicy = (input, options) => signedRequest({
  uri: "/public/v1/query/get_policy",
  body: input.body,
  options
});
var getPrivateKey = (input) => request({
  uri: "/public/v1/query/get_private_key",
  method: "POST",
  body: input.body
});
var signGetPrivateKey = (input, options) => signedRequest({
  uri: "/public/v1/query/get_private_key",
  body: input.body,
  options
});
var getUser = (input) => request({
  uri: "/public/v1/query/get_user",
  method: "POST",
  body: input.body
});
var signGetUser = (input, options) => signedRequest({
  uri: "/public/v1/query/get_user",
  body: input.body,
  options
});
var getWallet = (input) => request({
  uri: "/public/v1/query/get_wallet",
  method: "POST",
  body: input.body
});
var signGetWallet = (input, options) => signedRequest({
  uri: "/public/v1/query/get_wallet",
  body: input.body,
  options
});
var getActivities = (input) => request({
  uri: "/public/v1/query/list_activities",
  method: "POST",
  body: input.body
});
var signGetActivities = (input, options) => signedRequest({
  uri: "/public/v1/query/list_activities",
  body: input.body,
  options
});
var getPolicies = (input) => request({
  uri: "/public/v1/query/list_policies",
  method: "POST",
  body: input.body
});
var signGetPolicies = (input, options) => signedRequest({
  uri: "/public/v1/query/list_policies",
  body: input.body,
  options
});
var listPrivateKeyTags = (input) => request({
  uri: "/public/v1/query/list_private_key_tags",
  method: "POST",
  body: input.body
});
var signListPrivateKeyTags = (input, options) => signedRequest({
  uri: "/public/v1/query/list_private_key_tags",
  body: input.body,
  options
});
var getPrivateKeys = (input) => request({
  uri: "/public/v1/query/list_private_keys",
  method: "POST",
  body: input.body
});
var signGetPrivateKeys = (input, options) => signedRequest({
  uri: "/public/v1/query/list_private_keys",
  body: input.body,
  options
});
var listUserTags = (input) => request({
  uri: "/public/v1/query/list_user_tags",
  method: "POST",
  body: input.body
});
var signListUserTags = (input, options) => signedRequest({
  uri: "/public/v1/query/list_user_tags",
  body: input.body,
  options
});
var getUsers = (input) => request({
  uri: "/public/v1/query/list_users",
  method: "POST",
  body: input.body
});
var signGetUsers = (input, options) => signedRequest({
  uri: "/public/v1/query/list_users",
  body: input.body,
  options
});
var getWalletAccounts = (input) => request({
  uri: "/public/v1/query/list_wallet_accounts",
  method: "POST",
  body: input.body
});
var signGetWalletAccounts = (input, options) => signedRequest({
  uri: "/public/v1/query/list_wallet_accounts",
  body: input.body,
  options
});
var getWallets = (input) => request({
  uri: "/public/v1/query/list_wallets",
  method: "POST",
  body: input.body
});
var signGetWallets = (input, options) => signedRequest({
  uri: "/public/v1/query/list_wallets",
  body: input.body,
  options
});
var getWhoami = (input) => request({
  uri: "/public/v1/query/whoami",
  method: "POST",
  body: input.body
});
var signGetWhoami = (input, options) => signedRequest({
  uri: "/public/v1/query/whoami",
  body: input.body,
  options
});
var approveActivity = (input) => request({
  uri: "/public/v1/submit/approve_activity",
  method: "POST",
  body: input.body
});
var signApproveActivity = (input, options) => signedRequest({
  uri: "/public/v1/submit/approve_activity",
  body: input.body,
  options
});
var createApiKeys = (input) => request({
  uri: "/public/v1/submit/create_api_keys",
  method: "POST",
  body: input.body
});
var signCreateApiKeys = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_api_keys",
  body: input.body,
  options
});
var createApiOnlyUsers = (input) => request({
  uri: "/public/v1/submit/create_api_only_users",
  method: "POST",
  body: input.body
});
var signCreateApiOnlyUsers = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_api_only_users",
  body: input.body,
  options
});
var createAuthenticators = (input) => request({
  uri: "/public/v1/submit/create_authenticators",
  method: "POST",
  body: input.body
});
var signCreateAuthenticators = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_authenticators",
  body: input.body,
  options
});
var createInvitations = (input) => request({
  uri: "/public/v1/submit/create_invitations",
  method: "POST",
  body: input.body
});
var signCreateInvitations = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_invitations",
  body: input.body,
  options
});
var createPolicy = (input) => request({
  uri: "/public/v1/submit/create_policy",
  method: "POST",
  body: input.body
});
var signCreatePolicy = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_policy",
  body: input.body,
  options
});
var createPrivateKeyTag = (input) => request({
  uri: "/public/v1/submit/create_private_key_tag",
  method: "POST",
  body: input.body
});
var signCreatePrivateKeyTag = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_private_key_tag",
  body: input.body,
  options
});
var createPrivateKeys = (input) => request({
  uri: "/public/v1/submit/create_private_keys",
  method: "POST",
  body: input.body
});
var signCreatePrivateKeys = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_private_keys",
  body: input.body,
  options
});
var createSubOrganization = (input) => request({
  uri: "/public/v1/submit/create_sub_organization",
  method: "POST",
  body: input.body
});
var signCreateSubOrganization = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_sub_organization",
  body: input.body,
  options
});
var createUserTag = (input) => request({
  uri: "/public/v1/submit/create_user_tag",
  method: "POST",
  body: input.body
});
var signCreateUserTag = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_user_tag",
  body: input.body,
  options
});
var createUsers = (input) => request({
  uri: "/public/v1/submit/create_users",
  method: "POST",
  body: input.body
});
var signCreateUsers = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_users",
  body: input.body,
  options
});
var createWallet = (input) => request({
  uri: "/public/v1/submit/create_wallet",
  method: "POST",
  body: input.body
});
var signCreateWallet = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_wallet",
  body: input.body,
  options
});
var createWalletAccounts = (input) => request({
  uri: "/public/v1/submit/create_wallet_accounts",
  method: "POST",
  body: input.body
});
var signCreateWalletAccounts = (input, options) => signedRequest({
  uri: "/public/v1/submit/create_wallet_accounts",
  body: input.body,
  options
});
var deleteApiKeys = (input) => request({
  uri: "/public/v1/submit/delete_api_keys",
  method: "POST",
  body: input.body
});
var signDeleteApiKeys = (input, options) => signedRequest({
  uri: "/public/v1/submit/delete_api_keys",
  body: input.body,
  options
});
var deleteAuthenticators = (input) => request({
  uri: "/public/v1/submit/delete_authenticators",
  method: "POST",
  body: input.body
});
var signDeleteAuthenticators = (input, options) => signedRequest({
  uri: "/public/v1/submit/delete_authenticators",
  body: input.body,
  options
});
var deleteInvitation = (input) => request({
  uri: "/public/v1/submit/delete_invitation",
  method: "POST",
  body: input.body
});
var signDeleteInvitation = (input, options) => signedRequest({
  uri: "/public/v1/submit/delete_invitation",
  body: input.body,
  options
});
var deletePolicy = (input) => request({
  uri: "/public/v1/submit/delete_policy",
  method: "POST",
  body: input.body
});
var signDeletePolicy = (input, options) => signedRequest({
  uri: "/public/v1/submit/delete_policy",
  body: input.body,
  options
});
var emailAuth = (input) => request({
  uri: "/public/v1/submit/email_auth",
  method: "POST",
  body: input.body
});
var signEmailAuth = (input, options) => signedRequest({
  uri: "/public/v1/submit/email_auth",
  body: input.body,
  options
});
var exportPrivateKey = (input) => request({
  uri: "/public/v1/submit/export_private_key",
  method: "POST",
  body: input.body
});
var signExportPrivateKey = (input, options) => signedRequest({
  uri: "/public/v1/submit/export_private_key",
  body: input.body,
  options
});
var exportWallet = (input) => request({
  uri: "/public/v1/submit/export_wallet",
  method: "POST",
  body: input.body
});
var signExportWallet = (input, options) => signedRequest({
  uri: "/public/v1/submit/export_wallet",
  body: input.body,
  options
});
var initUserEmailRecovery = (input) => request({
  uri: "/public/v1/submit/init_user_email_recovery",
  method: "POST",
  body: input.body
});
var signInitUserEmailRecovery = (input, options) => signedRequest({
  uri: "/public/v1/submit/init_user_email_recovery",
  body: input.body,
  options
});
var recoverUser = (input) => request({
  uri: "/public/v1/submit/recover_user",
  method: "POST",
  body: input.body
});
var signRecoverUser = (input, options) => signedRequest({
  uri: "/public/v1/submit/recover_user",
  body: input.body,
  options
});
var rejectActivity = (input) => request({
  uri: "/public/v1/submit/reject_activity",
  method: "POST",
  body: input.body
});
var signRejectActivity = (input, options) => signedRequest({
  uri: "/public/v1/submit/reject_activity",
  body: input.body,
  options
});
var removeOrganizationFeature = (input) => request({
  uri: "/public/v1/submit/remove_organization_feature",
  method: "POST",
  body: input.body
});
var signRemoveOrganizationFeature = (input, options) => signedRequest({
  uri: "/public/v1/submit/remove_organization_feature",
  body: input.body,
  options
});
var setOrganizationFeature = (input) => request({
  uri: "/public/v1/submit/set_organization_feature",
  method: "POST",
  body: input.body
});
var signSetOrganizationFeature = (input, options) => signedRequest({
  uri: "/public/v1/submit/set_organization_feature",
  body: input.body,
  options
});
var signRawPayload = (input) => request({
  uri: "/public/v1/submit/sign_raw_payload",
  method: "POST",
  body: input.body
});
var signSignRawPayload = (input, options) => signedRequest({
  uri: "/public/v1/submit/sign_raw_payload",
  body: input.body,
  options
});
var signTransaction = (input) => request({
  uri: "/public/v1/submit/sign_transaction",
  method: "POST",
  body: input.body
});
var signSignTransaction = (input, options) => signedRequest({
  uri: "/public/v1/submit/sign_transaction",
  body: input.body,
  options
});
var updatePolicy = (input) => request({
  uri: "/public/v1/submit/update_policy",
  method: "POST",
  body: input.body
});
var signUpdatePolicy = (input, options) => signedRequest({
  uri: "/public/v1/submit/update_policy",
  body: input.body,
  options
});
var updatePrivateKeyTag = (input) => request({
  uri: "/public/v1/submit/update_private_key_tag",
  method: "POST",
  body: input.body
});
var signUpdatePrivateKeyTag = (input, options) => signedRequest({
  uri: "/public/v1/submit/update_private_key_tag",
  body: input.body,
  options
});
var updateRootQuorum = (input) => request({
  uri: "/public/v1/submit/update_root_quorum",
  method: "POST",
  body: input.body
});
var signUpdateRootQuorum = (input, options) => signedRequest({
  uri: "/public/v1/submit/update_root_quorum",
  body: input.body,
  options
});
var updateUser = (input) => request({
  uri: "/public/v1/submit/update_user",
  method: "POST",
  body: input.body
});
var signUpdateUser = (input, options) => signedRequest({
  uri: "/public/v1/submit/update_user",
  body: input.body,
  options
});
var updateUserTag = (input) => request({
  uri: "/public/v1/submit/update_user_tag",
  method: "POST",
  body: input.body
});
var signUpdateUserTag = (input, options) => signedRequest({
  uri: "/public/v1/submit/update_user_tag",
  body: input.body,
  options
});
var nOOPCodegenAnchor = () => request({
  uri: "/tkhq/api/v1/noop-codegen-anchor",
  method: "POST"
});
var signNOOPCodegenAnchor = () => signedRequest({
  uri: "/tkhq/api/v1/noop-codegen-anchor"
});

// node_modules/@turnkey/http/dist/__generated__/services/coordinator/public/v1/public_api.client.mjs
var TurnkeyClient = class {
  constructor(config2, stamper) {
    this.getActivity = async (input) => {
      return this.request("/public/v1/query/get_activity", input);
    };
    this.stampGetActivity = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/get_activity";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getAuthenticator = async (input) => {
      return this.request("/public/v1/query/get_authenticator", input);
    };
    this.stampGetAuthenticator = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/get_authenticator";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getAuthenticators = async (input) => {
      return this.request("/public/v1/query/get_authenticators", input);
    };
    this.stampGetAuthenticators = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/get_authenticators";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getOrganization = async (input) => {
      return this.request("/public/v1/query/get_organization", input);
    };
    this.stampGetOrganization = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/get_organization";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getPolicy = async (input) => {
      return this.request("/public/v1/query/get_policy", input);
    };
    this.stampGetPolicy = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/get_policy";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getPrivateKey = async (input) => {
      return this.request("/public/v1/query/get_private_key", input);
    };
    this.stampGetPrivateKey = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/get_private_key";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getUser = async (input) => {
      return this.request("/public/v1/query/get_user", input);
    };
    this.stampGetUser = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/get_user";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getWallet = async (input) => {
      return this.request("/public/v1/query/get_wallet", input);
    };
    this.stampGetWallet = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/get_wallet";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getActivities = async (input) => {
      return this.request("/public/v1/query/list_activities", input);
    };
    this.stampGetActivities = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/list_activities";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getPolicies = async (input) => {
      return this.request("/public/v1/query/list_policies", input);
    };
    this.stampGetPolicies = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/list_policies";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.listPrivateKeyTags = async (input) => {
      return this.request("/public/v1/query/list_private_key_tags", input);
    };
    this.stampListPrivateKeyTags = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/list_private_key_tags";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getPrivateKeys = async (input) => {
      return this.request("/public/v1/query/list_private_keys", input);
    };
    this.stampGetPrivateKeys = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/list_private_keys";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.listUserTags = async (input) => {
      return this.request("/public/v1/query/list_user_tags", input);
    };
    this.stampListUserTags = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/list_user_tags";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getUsers = async (input) => {
      return this.request("/public/v1/query/list_users", input);
    };
    this.stampGetUsers = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/list_users";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getWalletAccounts = async (input) => {
      return this.request("/public/v1/query/list_wallet_accounts", input);
    };
    this.stampGetWalletAccounts = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/list_wallet_accounts";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getWallets = async (input) => {
      return this.request("/public/v1/query/list_wallets", input);
    };
    this.stampGetWallets = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/list_wallets";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.getWhoami = async (input) => {
      return this.request("/public/v1/query/whoami", input);
    };
    this.stampGetWhoami = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/query/whoami";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.approveActivity = async (input) => {
      return this.request("/public/v1/submit/approve_activity", input);
    };
    this.stampApproveActivity = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/approve_activity";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createApiKeys = async (input) => {
      return this.request("/public/v1/submit/create_api_keys", input);
    };
    this.stampCreateApiKeys = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_api_keys";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createApiOnlyUsers = async (input) => {
      return this.request("/public/v1/submit/create_api_only_users", input);
    };
    this.stampCreateApiOnlyUsers = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_api_only_users";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createAuthenticators = async (input) => {
      return this.request("/public/v1/submit/create_authenticators", input);
    };
    this.stampCreateAuthenticators = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_authenticators";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createInvitations = async (input) => {
      return this.request("/public/v1/submit/create_invitations", input);
    };
    this.stampCreateInvitations = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_invitations";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createPolicy = async (input) => {
      return this.request("/public/v1/submit/create_policy", input);
    };
    this.stampCreatePolicy = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_policy";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createPrivateKeyTag = async (input) => {
      return this.request("/public/v1/submit/create_private_key_tag", input);
    };
    this.stampCreatePrivateKeyTag = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_private_key_tag";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createPrivateKeys = async (input) => {
      return this.request("/public/v1/submit/create_private_keys", input);
    };
    this.stampCreatePrivateKeys = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_private_keys";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createSubOrganization = async (input) => {
      return this.request("/public/v1/submit/create_sub_organization", input);
    };
    this.stampCreateSubOrganization = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_sub_organization";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createUserTag = async (input) => {
      return this.request("/public/v1/submit/create_user_tag", input);
    };
    this.stampCreateUserTag = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_user_tag";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createUsers = async (input) => {
      return this.request("/public/v1/submit/create_users", input);
    };
    this.stampCreateUsers = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_users";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createWallet = async (input) => {
      return this.request("/public/v1/submit/create_wallet", input);
    };
    this.stampCreateWallet = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_wallet";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.createWalletAccounts = async (input) => {
      return this.request("/public/v1/submit/create_wallet_accounts", input);
    };
    this.stampCreateWalletAccounts = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/create_wallet_accounts";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.deleteApiKeys = async (input) => {
      return this.request("/public/v1/submit/delete_api_keys", input);
    };
    this.stampDeleteApiKeys = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/delete_api_keys";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.deleteAuthenticators = async (input) => {
      return this.request("/public/v1/submit/delete_authenticators", input);
    };
    this.stampDeleteAuthenticators = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/delete_authenticators";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.deleteInvitation = async (input) => {
      return this.request("/public/v1/submit/delete_invitation", input);
    };
    this.stampDeleteInvitation = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/delete_invitation";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.deletePolicy = async (input) => {
      return this.request("/public/v1/submit/delete_policy", input);
    };
    this.stampDeletePolicy = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/delete_policy";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.emailAuth = async (input) => {
      return this.request("/public/v1/submit/email_auth", input);
    };
    this.stampEmailAuth = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/email_auth";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.exportPrivateKey = async (input) => {
      return this.request("/public/v1/submit/export_private_key", input);
    };
    this.stampExportPrivateKey = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/export_private_key";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.exportWallet = async (input) => {
      return this.request("/public/v1/submit/export_wallet", input);
    };
    this.stampExportWallet = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/export_wallet";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.initUserEmailRecovery = async (input) => {
      return this.request("/public/v1/submit/init_user_email_recovery", input);
    };
    this.stampInitUserEmailRecovery = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/init_user_email_recovery";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.recoverUser = async (input) => {
      return this.request("/public/v1/submit/recover_user", input);
    };
    this.stampRecoverUser = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/recover_user";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.rejectActivity = async (input) => {
      return this.request("/public/v1/submit/reject_activity", input);
    };
    this.stampRejectActivity = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/reject_activity";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.removeOrganizationFeature = async (input) => {
      return this.request("/public/v1/submit/remove_organization_feature", input);
    };
    this.stampRemoveOrganizationFeature = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/remove_organization_feature";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.setOrganizationFeature = async (input) => {
      return this.request("/public/v1/submit/set_organization_feature", input);
    };
    this.stampSetOrganizationFeature = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/set_organization_feature";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.signRawPayload = async (input) => {
      return this.request("/public/v1/submit/sign_raw_payload", input);
    };
    this.stampSignRawPayload = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/sign_raw_payload";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.signTransaction = async (input) => {
      return this.request("/public/v1/submit/sign_transaction", input);
    };
    this.stampSignTransaction = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/sign_transaction";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.updatePolicy = async (input) => {
      return this.request("/public/v1/submit/update_policy", input);
    };
    this.stampUpdatePolicy = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/update_policy";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.updatePrivateKeyTag = async (input) => {
      return this.request("/public/v1/submit/update_private_key_tag", input);
    };
    this.stampUpdatePrivateKeyTag = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/update_private_key_tag";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.updateRootQuorum = async (input) => {
      return this.request("/public/v1/submit/update_root_quorum", input);
    };
    this.stampUpdateRootQuorum = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/update_root_quorum";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.updateUser = async (input) => {
      return this.request("/public/v1/submit/update_user", input);
    };
    this.stampUpdateUser = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/update_user";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    this.updateUserTag = async (input) => {
      return this.request("/public/v1/submit/update_user_tag", input);
    };
    this.stampUpdateUserTag = async (input) => {
      const fullUrl = this.config.baseUrl + "/public/v1/submit/update_user_tag";
      const body = JSON.stringify(input);
      const stamp = await this.stamper.stamp(body);
      return {
        body,
        stamp,
        url: fullUrl
      };
    };
    if (!config2.baseUrl) {
      throw new Error(`Missing base URL. Please verify env vars.`);
    }
    this.config = config2;
    this.stamper = stamper;
  }
  async request(url, body) {
    const fullUrl = this.config.baseUrl + url;
    const stringifiedBody = JSON.stringify(body);
    const stamp = await this.stamper.stamp(stringifiedBody);
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        [stamp.stampHeaderName]: stamp.stampHeaderValue
      },
      body: stringifiedBody,
      redirect: "follow"
    });
    if (!response.ok) {
      let res;
      try {
        res = await response.json();
      } catch (_) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      throw new TurnkeyRequestError(res);
    }
    const data = await response.json();
    return data;
  }
};

// node_modules/@turnkey/http/dist/shared.mjs
var TurnkeyActivityError = class extends Error {
  constructor(input) {
    const { message, cause, activityId, activityStatus, activityType } = input;
    super(message);
    this.name = "TurnkeyActivityError";
    this.activityId = activityId ?? null;
    this.activityStatus = activityStatus ?? null;
    this.activityType = activityType ?? null;
    this.cause = cause ?? null;
  }
};

// node_modules/@turnkey/http/dist/async.mjs
var DEFAULT_REFRESH_INTERVAL_MS = 500;
function withAsyncPolling(params) {
  const { request: request2, refreshIntervalMs = DEFAULT_REFRESH_INTERVAL_MS } = params;
  return async (input) => {
    const initialResponse = await request2(input);
    let activity = initialResponse.activity;
    while (true) {
      switch (activity.status) {
        case "ACTIVITY_STATUS_COMPLETED": {
          return activity;
        }
        case "ACTIVITY_STATUS_CREATED": {
          break;
        }
        case "ACTIVITY_STATUS_PENDING": {
          break;
        }
        case "ACTIVITY_STATUS_CONSENSUS_NEEDED": {
          throw new TurnkeyActivityError({
            message: `Consensus needed for activity ${activity.id}`,
            activityId: activity.id,
            activityStatus: activity.status,
            activityType: activity.type
          });
        }
        case "ACTIVITY_STATUS_FAILED": {
          throw new TurnkeyActivityError({
            message: `Activity ${activity.id} failed`,
            activityId: activity.id,
            activityStatus: activity.status,
            activityType: activity.type
          });
        }
        case "ACTIVITY_STATUS_REJECTED": {
          throw new TurnkeyActivityError({
            message: `Activity ${activity.id} was rejected`,
            activityId: activity.id,
            activityStatus: activity.status,
            activityType: activity.type
          });
        }
        default: {
          assertNever(activity.status);
        }
      }
      await sleep(refreshIntervalMs);
      const pollingResponse = await getActivity({
        body: {
          activityId: activity.id,
          organizationId: activity.organizationId
        }
      });
      activity = pollingResponse.activity;
    }
  };
}
function createActivityPoller(params) {
  const { client, requestFn, refreshIntervalMs = DEFAULT_REFRESH_INTERVAL_MS } = params;
  return async (input) => {
    const initialResponse = await requestFn(input);
    let activity = initialResponse.activity;
    while (true) {
      switch (activity.status) {
        case "ACTIVITY_STATUS_COMPLETED": {
          return activity;
        }
        case "ACTIVITY_STATUS_CREATED": {
          break;
        }
        case "ACTIVITY_STATUS_PENDING": {
          break;
        }
        case "ACTIVITY_STATUS_CONSENSUS_NEEDED": {
          throw new TurnkeyActivityError({
            message: `Consensus needed for activity ${activity.id}`,
            activityId: activity.id,
            activityStatus: activity.status,
            activityType: activity.type
          });
        }
        case "ACTIVITY_STATUS_FAILED": {
          throw new TurnkeyActivityError({
            message: `Activity ${activity.id} failed`,
            activityId: activity.id,
            activityStatus: activity.status,
            activityType: activity.type
          });
        }
        case "ACTIVITY_STATUS_REJECTED": {
          throw new TurnkeyActivityError({
            message: `Activity ${activity.id} was rejected`,
            activityId: activity.id,
            activityStatus: activity.status,
            activityType: activity.type
          });
        }
        default: {
          assertNever(activity.status);
        }
      }
      await sleep(refreshIntervalMs);
      const pollingResponse = await client.getActivity({
        activityId: activity.id,
        organizationId: activity.organizationId
      });
      activity = pollingResponse.activity;
    }
  };
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
function assertNever(input, message) {
  throw new Error(message != null ? message : `Unexpected case: ${JSON.stringify(input)}`);
}

// node_modules/@turnkey/http/dist/index.mjs
var PublicApiService = public_api_fetcher_exports;
export {
  PublicApiService,
  TurnkeyActivityError,
  public_api_fetcher_exports as TurnkeyApi,
  TurnkeyClient,
  TurnkeyRequestError,
  browserInit,
  createActivityPoller,
  getWebAuthnAttestation,
  init,
  sealAndStampRequestBody,
  withAsyncPolling
};
//# sourceMappingURL=@turnkey_http.js.map
