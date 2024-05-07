import {
  __commonJS
} from "./chunk-J32WSRGE.js";

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/@safe-global/safe-apps-provider/dist/utils.js
var require_utils = __commonJS({
  "node_modules/@safe-global/safe-apps-provider/dist/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLowerCase = void 0;
    function getLowerCase(value) {
      if (value) {
        return value.toLowerCase();
      }
      return value;
    }
    exports.getLowerCase = getLowerCase;
  }
});

// node_modules/@safe-global/safe-apps-provider/dist/provider.js
var require_provider = __commonJS({
  "node_modules/@safe-global/safe-apps-provider/dist/provider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SafeAppProvider = void 0;
    var events_1 = require_events();
    var utils_1 = require_utils();
    var SafeAppProvider = class extends events_1.EventEmitter {
      constructor(safe, sdk) {
        super();
        this.submittedTxs = /* @__PURE__ */ new Map();
        this.safe = safe;
        this.sdk = sdk;
      }
      async connect() {
        this.emit("connect", { chainId: this.chainId });
        return;
      }
      async disconnect() {
        return;
      }
      get chainId() {
        return this.safe.chainId;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async request(request) {
        const { method, params = [] } = request;
        switch (method) {
          case "eth_accounts":
            return [this.safe.safeAddress];
          case "net_version":
          case "eth_chainId":
            return `0x${this.chainId.toString(16)}`;
          case "personal_sign": {
            const [message, address] = params;
            if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase()) {
              throw new Error("The address or message hash is invalid");
            }
            const response = await this.sdk.txs.signMessage(message);
            const signature = "signature" in response ? response.signature : void 0;
            return signature || "0x";
          }
          case "eth_sign": {
            const [address, messageHash] = params;
            if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase() || !messageHash.startsWith("0x")) {
              throw new Error("The address or message hash is invalid");
            }
            const response = await this.sdk.txs.signMessage(messageHash);
            const signature = "signature" in response ? response.signature : void 0;
            return signature || "0x";
          }
          case "eth_signTypedData":
          case "eth_signTypedData_v4": {
            const [address, typedData] = params;
            const parsedTypedData = typeof typedData === "string" ? JSON.parse(typedData) : typedData;
            if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase()) {
              throw new Error("The address is invalid");
            }
            const response = await this.sdk.txs.signTypedMessage(parsedTypedData);
            const signature = "signature" in response ? response.signature : void 0;
            return signature || "0x";
          }
          case "eth_sendTransaction":
            const tx = Object.assign({ value: "0", data: "0x" }, params[0]);
            if (typeof tx.gas === "string" && tx.gas.startsWith("0x")) {
              tx.gas = parseInt(tx.gas, 16);
            }
            const resp = await this.sdk.txs.send({
              txs: [tx],
              params: { safeTxGas: tx.gas }
            });
            this.submittedTxs.set(resp.safeTxHash, {
              from: this.safe.safeAddress,
              hash: resp.safeTxHash,
              gas: 0,
              gasPrice: "0x00",
              nonce: 0,
              input: tx.data,
              value: tx.value,
              to: tx.to,
              blockHash: null,
              blockNumber: null,
              transactionIndex: null
            });
            return resp.safeTxHash;
          case "eth_blockNumber":
            const block = await this.sdk.eth.getBlockByNumber(["latest"]);
            return block.number;
          case "eth_getBalance":
            return this.sdk.eth.getBalance([(0, utils_1.getLowerCase)(params[0]), params[1]]);
          case "eth_getCode":
            return this.sdk.eth.getCode([(0, utils_1.getLowerCase)(params[0]), params[1]]);
          case "eth_getTransactionCount":
            return this.sdk.eth.getTransactionCount([(0, utils_1.getLowerCase)(params[0]), params[1]]);
          case "eth_getStorageAt":
            return this.sdk.eth.getStorageAt([(0, utils_1.getLowerCase)(params[0]), params[1], params[2]]);
          case "eth_getBlockByNumber":
            return this.sdk.eth.getBlockByNumber([params[0], params[1]]);
          case "eth_getBlockByHash":
            return this.sdk.eth.getBlockByHash([params[0], params[1]]);
          case "eth_getTransactionByHash":
            let txHash = params[0];
            try {
              const resp2 = await this.sdk.txs.getBySafeTxHash(txHash);
              txHash = resp2.txHash || txHash;
            } catch (e) {
            }
            if (this.submittedTxs.has(txHash)) {
              return this.submittedTxs.get(txHash);
            }
            return this.sdk.eth.getTransactionByHash([txHash]).then((tx2) => {
              if (tx2) {
                tx2.hash = params[0];
              }
              return tx2;
            });
          case "eth_getTransactionReceipt": {
            let txHash2 = params[0];
            try {
              const resp2 = await this.sdk.txs.getBySafeTxHash(txHash2);
              txHash2 = resp2.txHash || txHash2;
            } catch (e) {
            }
            return this.sdk.eth.getTransactionReceipt([txHash2]).then((tx2) => {
              if (tx2) {
                tx2.transactionHash = params[0];
              }
              return tx2;
            });
          }
          case "eth_estimateGas": {
            return this.sdk.eth.getEstimateGas(params[0]);
          }
          case "eth_call": {
            return this.sdk.eth.call([params[0], params[1]]);
          }
          case "eth_getLogs":
            return this.sdk.eth.getPastLogs([params[0]]);
          case "eth_gasPrice":
            return this.sdk.eth.getGasPrice();
          case "wallet_getPermissions":
            return this.sdk.wallet.getPermissions();
          case "wallet_requestPermissions":
            return this.sdk.wallet.requestPermissions(params[0]);
          case "safe_setSettings":
            return this.sdk.eth.setSafeSettings([params[0]]);
          default:
            throw Error(`"${request.method}" not implemented`);
        }
      }
      // this method is needed for ethers v4
      // https://github.com/ethers-io/ethers.js/blob/427e16826eb15d52d25c4f01027f8db22b74b76c/src.ts/providers/web3-provider.ts#L41-L55
      send(request, callback) {
        if (!request)
          callback("Undefined request");
        this.request(request).then((result) => callback(null, { jsonrpc: "2.0", id: request.id, result })).catch((error) => callback(error, null));
      }
    };
    exports.SafeAppProvider = SafeAppProvider;
  }
});

// node_modules/@safe-global/safe-apps-provider/dist/index.js
var require_dist = __commonJS({
  "node_modules/@safe-global/safe-apps-provider/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SafeAppProvider = void 0;
    var provider_1 = require_provider();
    Object.defineProperty(exports, "SafeAppProvider", { enumerable: true, get: function() {
      return provider_1.SafeAppProvider;
    } });
  }
});
export default require_dist();
//# sourceMappingURL=@safe-global_safe-apps-provider.js.map
