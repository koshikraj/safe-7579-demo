import {
  assignRef,
  clamp,
  clampUseMovePosition,
  mergeRefs,
  useCallbackRef,
  useClickOutside,
  useClipboard,
  useColorScheme,
  useDebounceCallback,
  useDidUpdate,
  useDisclosure,
  useElementSize,
  useEyeDropper,
  useFocusReturn,
  useFocusTrap,
  useId,
  useIsomorphicEffect,
  useMergedRef,
  useMove,
  usePagination,
  useReducedMotion,
  useResizeObserver,
  useUncontrolled,
  useWindowEvent
} from "./chunk-2I7PVGSB.js";
import {
  require_react_dom
} from "./chunk-7EJ2HHV3.js";
import {
  __assign,
  __rest,
  __spreadArray
} from "./chunk-6EEL643C.js";
import {
  require_react
} from "./chunk-XCERESLX.js";
import {
  __toESM
} from "./chunk-J32WSRGE.js";

// node_modules/react-remove-scroll/dist/es2015/Combination.js
var React8 = __toESM(require_react());

// node_modules/react-remove-scroll/dist/es2015/UI.js
var React4 = __toESM(require_react());

// node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";

// node_modules/use-callback-ref/dist/es2015/assignRef.js
function assignRef2(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}

// node_modules/use-callback-ref/dist/es2015/useRef.js
var import_react = __toESM(require_react());
function useCallbackRef2(initialValue, callback) {
  var ref = (0, import_react.useState)(function() {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}

// node_modules/use-callback-ref/dist/es2015/useMergeRef.js
function useMergeRefs(refs, defaultValue) {
  return useCallbackRef2(defaultValue || null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef2(ref, newValue);
    });
  });
}

// node_modules/use-sidecar/dist/es2015/hoc.js
var React = __toESM(require_react());

// node_modules/use-sidecar/dist/es2015/hook.js
var import_react2 = __toESM(require_react());

// node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}

// node_modules/use-sidecar/dist/es2015/renderProp.js
var React2 = __toESM(require_react());
var import_react3 = __toESM(require_react());

// node_modules/use-sidecar/dist/es2015/exports.js
var React3 = __toESM(require_react());
var SideCar = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return React3.createElement(Target, __assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar;
}

// node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();

// node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function() {
  return;
};
var RemoveScroll = React4.forwardRef(function(props, parentRef) {
  var ref = React4.useRef(null);
  var _a = React4.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container2 = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return React4.createElement(
    React4.Fragment,
    null,
    enabled && React4.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
    forwardProps ? React4.cloneElement(React4.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React4.createElement(Container2, __assign({}, containerProps, { className, ref: containerRef }), children)
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var React7 = __toESM(require_react());

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
var React6 = __toESM(require_react());

// node_modules/react-style-singleton/dist/es2015/hook.js
var React5 = __toESM(require_react());

// node_modules/get-nonce/dist/es2015/index.js
var currentNonce;
var getNonce = function() {
  if (currentNonce) {
    return currentNonce;
  }
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};

// node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};

// node_modules/react-style-singleton/dist/es2015/hook.js
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles, isDynamic) {
    React5.useEffect(function() {
      sheet.add(styles);
      return function() {
        sheet.remove();
      };
    }, [styles && isDynamic]);
  };
};

// node_modules/react-style-singleton/dist/es2015/component.js
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet = function(_a) {
    var styles = _a.styles, dynamic = _a.dynamic;
    useStyle(styles, dynamic);
    return null;
  };
  return Sheet;
};

// node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse = function(x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
    allowRelative && "position: relative ".concat(important, ";"),
    gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
    gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
  ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var RemoveScrollBar = function(props) {
  var noRelative = props.noRelative, noImportant = props.noImportant, _a = props.gapMode, gapMode = _a === void 0 ? "margin" : _a;
  var gap = React6.useMemo(function() {
    return getGapWidth(gapMode);
  }, [gapMode]);
  return React6.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};

// node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var options;
var nonPassive = passiveSupported ? { passive: false } : false;

// node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  var styles = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles[overflow] !== "hidden" && // contains scroll inside self
    !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
  );
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var ownerDocument = node.ownerDocument;
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), s = _a[1], d = _a[2];
      if (s > d) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== ownerDocument.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    if (target instanceof ShadowRoot) {
      target = target.host;
    } else {
      target = target.parentNode;
    }
  } while (
    // portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target)
  );
  if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React7.useRef([]);
  var touchStartRef = React7.useRef([0, 0]);
  var activeAxis = React7.useRef();
  var id = React7.useState(idCounter++)[0];
  var Style2 = React7.useState(styleSingleton)[0];
  var lastProps = React7.useRef(props);
  React7.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  React7.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = React7.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = React7.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = React7.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = React7.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React7.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = React7.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  React7.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return React7.createElement(
    React7.Fragment,
    null,
    inert ? React7.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar ? React7.createElement(RemoveScrollBar, { gapMode: props.gapMode }) : null
  );
}
function getOutermostShadowParent(node) {
  var shadowParent = null;
  while (node !== null) {
    if (node instanceof ShadowRoot) {
      shadowParent = node.host;
      node = node.host;
    }
    node = node.parentNode;
  }
  return shadowParent;
}

// node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);

// node_modules/react-remove-scroll/dist/es2015/Combination.js
var ReactRemoveScroll = React8.forwardRef(function(props, ref) {
  return React8.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: sidecar_default }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var Combination_default = ReactRemoveScroll;

// node_modules/@mantine/core/esm/core/utils/keys/keys.mjs
function keys(object) {
  return Object.keys(object);
}

// node_modules/@mantine/core/esm/core/utils/deep-merge/deep-merge.mjs
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const result = { ...target };
  const _source = source;
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(_source[key])) {
        if (!(key in target)) {
          result[key] = _source[key];
        } else {
          result[key] = deepMerge(result[key], _source[key]);
        }
      } else {
        result[key] = _source[key];
      }
    });
  }
  return result;
}

// node_modules/@mantine/core/esm/core/utils/camel-to-kebab-case/camel-to-kebab-case.mjs
function camelToKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

// node_modules/@mantine/core/esm/core/utils/units-converters/px.mjs
function getTransformedScaledValue(value) {
  var _a;
  if (typeof value !== "string" || !value.includes("var(--mantine-scale)")) {
    return value;
  }
  return (_a = value.match(/^calc\((.*?)\)$/)) == null ? void 0 : _a[1].split("*")[0].trim();
}
function px(value) {
  const transformedValue = getTransformedScaledValue(value);
  if (typeof transformedValue === "number") {
    return transformedValue;
  }
  if (typeof transformedValue === "string") {
    if (transformedValue.includes("calc") || transformedValue.includes("var")) {
      return transformedValue;
    }
    if (transformedValue.includes("px")) {
      return Number(transformedValue.replace("px", ""));
    }
    if (transformedValue.includes("rem")) {
      return Number(transformedValue.replace("rem", "")) * 16;
    }
    if (transformedValue.includes("em")) {
      return Number(transformedValue.replace("em", "")) * 16;
    }
    return Number(transformedValue);
  }
  return NaN;
}

// node_modules/@mantine/core/esm/core/utils/units-converters/rem.mjs
function scaleRem(remValue) {
  return `calc(${remValue} * var(--mantine-scale))`;
}
function createConverter(units, { shouldScale = false } = {}) {
  function converter(value) {
    if (value === 0 || value === "0") {
      return "0";
    }
    if (typeof value === "number") {
      const val = `${value / 16}${units}`;
      return shouldScale ? scaleRem(val) : val;
    }
    if (typeof value === "string") {
      if (value.startsWith("calc(") || value.startsWith("var(")) {
        return value;
      }
      if (value.includes(" ")) {
        return value.split(" ").map((val) => converter(val)).join(" ");
      }
      if (value.includes(units)) {
        return shouldScale ? scaleRem(value) : value;
      }
      const replaced = value.replace("px", "");
      if (!Number.isNaN(Number(replaced))) {
        const val = `${Number(replaced) / 16}${units}`;
        return shouldScale ? scaleRem(val) : val;
      }
    }
    return value;
  }
  return converter;
}
var rem = createConverter("rem", { shouldScale: true });
var em = createConverter("em");

// node_modules/@mantine/core/esm/core/utils/filter-props/filter-props.mjs
function filterProps(props) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}

// node_modules/@mantine/core/esm/core/utils/is-number-like/is-number-like.mjs
function isNumberLike(value) {
  if (typeof value === "number") {
    return true;
  }
  if (typeof value === "string") {
    if (value.startsWith("calc(") || value.startsWith("var(") || value.includes(" ") && value.trim() !== "") {
      return true;
    }
    return /[0-9]/.test(value.trim().replace("-", "")[0]);
  }
  return false;
}

// node_modules/@mantine/core/esm/core/utils/is-element/is-element.mjs
var import_react4 = __toESM(require_react(), 1);
function isElement(value) {
  if (Array.isArray(value) || value === null) {
    return false;
  }
  if (typeof value === "object") {
    if (value.type === import_react4.default.Fragment) {
      return false;
    }
    return true;
  }
  return false;
}

// node_modules/@mantine/core/esm/core/utils/create-safe-context/create-safe-context.mjs
var import_react5 = __toESM(require_react(), 1);
function createSafeContext(errorMessage) {
  const Context = (0, import_react5.createContext)(null);
  const useSafeContext = () => {
    const ctx = (0, import_react5.useContext)(Context);
    if (ctx === null) {
      throw new Error(errorMessage);
    }
    return ctx;
  };
  const Provider = ({ children, value }) => import_react5.default.createElement(Context.Provider, { value }, children);
  return [Provider, useSafeContext];
}

// node_modules/@mantine/core/esm/core/utils/create-optional-context/create-optional-context.mjs
var import_react6 = __toESM(require_react(), 1);
function createOptionalContext(initialValue = null) {
  const Context = (0, import_react6.createContext)(initialValue);
  const useOptionalContext = () => (0, import_react6.useContext)(Context);
  const Provider = ({ children, value }) => import_react6.default.createElement(Context.Provider, { value }, children);
  return [Provider, useOptionalContext];
}

// node_modules/@mantine/core/esm/core/utils/get-safe-id/get-safe-id.mjs
function getSafeId(uid, errorMessage) {
  return (value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(errorMessage);
    }
    return `${uid}-${value}`;
  };
}

// node_modules/@mantine/core/esm/core/utils/find-element-ancestor/find-element-ancestor.mjs
function findElementAncestor(element, selector) {
  let _element = element;
  while ((_element = _element.parentElement) && !_element.matches(selector))
    ;
  return _element;
}

// node_modules/@mantine/core/esm/core/utils/create-scoped-keydown-handler/create-scoped-keydown-handler.mjs
function getPreviousIndex(current, elements, loop) {
  for (let i = current - 1; i >= 0; i -= 1) {
    if (!elements[i].disabled) {
      return i;
    }
  }
  if (loop) {
    for (let i = elements.length - 1; i > -1; i -= 1) {
      if (!elements[i].disabled) {
        return i;
      }
    }
  }
  return current;
}
function getNextIndex(current, elements, loop) {
  for (let i = current + 1; i < elements.length; i += 1) {
    if (!elements[i].disabled) {
      return i;
    }
  }
  if (loop) {
    for (let i = 0; i < elements.length; i += 1) {
      if (!elements[i].disabled) {
        return i;
      }
    }
  }
  return current;
}
function onSameLevel(target, sibling, parentSelector) {
  return findElementAncestor(target, parentSelector) === findElementAncestor(sibling, parentSelector);
}
function createScopedKeydownHandler({
  parentSelector,
  siblingSelector,
  onKeyDown,
  loop = true,
  activateOnFocus = false,
  dir = "rtl",
  orientation
}) {
  return (event) => {
    var _a;
    onKeyDown == null ? void 0 : onKeyDown(event);
    const elements = Array.from(
      ((_a = findElementAncestor(event.currentTarget, parentSelector)) == null ? void 0 : _a.querySelectorAll(
        siblingSelector
      )) || []
    ).filter((node) => onSameLevel(event.currentTarget, node, parentSelector));
    const current = elements.findIndex((el) => event.currentTarget === el);
    const _nextIndex = getNextIndex(current, elements, loop);
    const _previousIndex = getPreviousIndex(current, elements, loop);
    const nextIndex = dir === "rtl" ? _previousIndex : _nextIndex;
    const previousIndex = dir === "rtl" ? _nextIndex : _previousIndex;
    switch (event.key) {
      case "ArrowRight": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[nextIndex].focus();
          activateOnFocus && elements[nextIndex].click();
        }
        break;
      }
      case "ArrowLeft": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[previousIndex].focus();
          activateOnFocus && elements[previousIndex].click();
        }
        break;
      }
      case "ArrowUp": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_previousIndex].focus();
          activateOnFocus && elements[_previousIndex].click();
        }
        break;
      }
      case "ArrowDown": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_nextIndex].focus();
          activateOnFocus && elements[_nextIndex].click();
        }
        break;
      }
      case "Home": {
        event.stopPropagation();
        event.preventDefault();
        !elements[0].disabled && elements[0].focus();
        break;
      }
      case "End": {
        event.stopPropagation();
        event.preventDefault();
        const last = elements.length - 1;
        !elements[last].disabled && elements[last].focus();
        break;
      }
    }
  };
}

// node_modules/@mantine/core/esm/core/utils/get-default-z-index/get-default-z-index.mjs
var elevations = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function getDefaultZIndex(level) {
  return elevations[level];
}

// node_modules/@mantine/core/esm/core/utils/noop/noop.mjs
var noop = () => {
};

// node_modules/@mantine/core/esm/core/utils/close-on-escape/close-on-escape.mjs
function closeOnEscape(callback, options = { active: true }) {
  if (typeof callback !== "function" || !options.active) {
    return options.onKeyDown || noop;
  }
  return (event) => {
    var _a;
    if (event.key === "Escape") {
      callback(event);
      (_a = options.onTrigger) == null ? void 0 : _a.call(options);
    }
  };
}

// node_modules/@mantine/core/esm/core/utils/get-size/get-size.mjs
function getSize(size2, prefix = "size", convertToRem = true) {
  if (size2 === void 0) {
    return void 0;
  }
  return isNumberLike(size2) ? convertToRem ? rem(size2) : size2 : `var(--${prefix}-${size2})`;
}
function getSpacing(size2) {
  return getSize(size2, "mantine-spacing");
}
function getRadius(size2) {
  if (size2 === void 0) {
    return "var(--mantine-radius-default)";
  }
  return getSize(size2, "mantine-radius");
}
function getFontSize(size2) {
  return getSize(size2, "mantine-font-size");
}
function getLineHeight(size2) {
  return getSize(size2, "mantine-line-height", false);
}
function getShadow(size2) {
  if (!size2) {
    return void 0;
  }
  return getSize(size2, "mantine-shadow", false);
}

// node_modules/@mantine/core/esm/core/utils/create-event-handler/create-event-handler.mjs
function createEventHandler(parentEventHandler, eventHandler) {
  return (event) => {
    parentEventHandler == null ? void 0 : parentEventHandler(event);
    eventHandler == null ? void 0 : eventHandler(event);
  };
}

// node_modules/@mantine/core/esm/core/utils/get-breakpoint-value/get-breakpoint-value.mjs
function getBreakpointValue(breakpoint, theme) {
  if (breakpoint in theme.breakpoints) {
    return px(theme.breakpoints[breakpoint]);
  }
  return px(breakpoint);
}

// node_modules/@mantine/core/esm/core/utils/get-sorted-breakpoints/get-sorted-breakpoints.mjs
function getSortedBreakpoints(breakpoints, theme) {
  const convertedBreakpoints = breakpoints.map((breakpoint) => ({
    value: breakpoint,
    px: getBreakpointValue(breakpoint, theme)
  }));
  convertedBreakpoints.sort((a, b) => a.px - b.px);
  return convertedBreakpoints;
}

// node_modules/@mantine/core/esm/core/utils/get-base-value/get-base-value.mjs
function getBaseValue(value) {
  if (typeof value === "object" && value !== null) {
    if ("base" in value) {
      return value.base;
    }
    return void 0;
  }
  return value;
}

// node_modules/@mantine/core/esm/core/utils/get-context-item-index/get-context-item-index.mjs
function getContextItemIndex(elementSelector, parentSelector, node) {
  var _a;
  if (!node) {
    return null;
  }
  return Array.from(
    ((_a = findElementAncestor(node, parentSelector)) == null ? void 0 : _a.querySelectorAll(elementSelector)) || []
  ).findIndex((element) => element === node);
}

// node_modules/@mantine/core/esm/core/utils/use-hovered/use-hovered.mjs
var import_react7 = __toESM(require_react(), 1);
function useHovered() {
  const [hovered, setHovered] = (0, import_react7.useState)(-1);
  const resetHovered = () => setHovered(-1);
  return [hovered, { setHovered, resetHovered }];
}

// node_modules/@mantine/core/esm/core/utils/create-use-external-events/create-use-external-events.mjs
var import_react8 = __toESM(require_react(), 1);
function dispatchEvent(type, detail) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}
var useIsomorphicEffect2 = typeof window !== "undefined" ? import_react8.useLayoutEffect : import_react8.useEffect;
function createUseExternalEvents(prefix) {
  function _useExternalEvents(events) {
    const handlers = Object.keys(events).reduce((acc, eventKey) => {
      acc[`${prefix}:${eventKey}`] = (event) => events[eventKey](event.detail);
      return acc;
    }, {});
    useIsomorphicEffect2(() => {
      Object.keys(handlers).forEach((eventKey) => {
        window.removeEventListener(eventKey, handlers[eventKey]);
        window.addEventListener(eventKey, handlers[eventKey]);
      });
      return () => Object.keys(handlers).forEach((eventKey) => {
        window.removeEventListener(eventKey, handlers[eventKey]);
      });
    }, [handlers]);
  }
  function createEvent(event) {
    return (...payload) => dispatchEvent(`${prefix}:${String(event)}`, payload[0]);
  }
  return [_useExternalEvents, createEvent];
}

// node_modules/@mantine/core/esm/core/styles-api/create-vars-resolver/create-vars-resolver.mjs
function createVarsResolver(resolver) {
  return resolver;
}

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; )
    (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/resolve-class-names/resolve-class-names.mjs
var EMPTY_CLASS_NAMES = {};
function mergeClassNames(objects) {
  const merged = {};
  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (merged[key]) {
        merged[key] = clsx_default(merged[key], value);
      } else {
        merged[key] = value;
      }
    });
  });
  return merged;
}
function resolveClassNames({ theme, classNames, props, stylesCtx }) {
  const arrayClassNames = Array.isArray(classNames) ? classNames : [classNames];
  const resolvedClassNames = arrayClassNames.map(
    (item) => typeof item === "function" ? item(theme, props, stylesCtx) : item || EMPTY_CLASS_NAMES
  );
  return mergeClassNames(resolvedClassNames);
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-styles/resolve-styles.mjs
function resolveStyles({ theme, styles, props, stylesCtx }) {
  const arrayStyles = Array.isArray(styles) ? styles : [styles];
  return arrayStyles.reduce((acc, style) => {
    if (typeof style === "function") {
      return { ...acc, ...style(theme, props, stylesCtx) };
    }
    return { ...acc, ...style };
  }, {});
}

// node_modules/@mantine/core/esm/core/styles-api/use-resolved-styles-api/use-resolved-styles-api.mjs
var import_react21 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/core/MantineProvider/Mantine.context.mjs
var import_react9 = __toESM(require_react(), 1);
var MantineContext = (0, import_react9.createContext)(null);
function useMantineContext() {
  const ctx = (0, import_react9.useContext)(MantineContext);
  if (!ctx) {
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  }
  return ctx;
}
function useMantineCssVariablesResolver() {
  return useMantineContext().cssVariablesResolver;
}
function useMantineClassNamesPrefix() {
  return useMantineContext().classNamesPrefix;
}
function useMantineStyleNonce() {
  return useMantineContext().getStyleNonce;
}

// node_modules/@mantine/core/esm/core/MantineProvider/default-colors.mjs
var DEFAULT_COLORS = {
  dark: [
    "#C9C9C9",
    "#b8b8b8",
    "#828282",
    "#696969",
    "#4a4a4a",
    "#404040",
    "#383838",
    "#2e2e2e",
    "#242424",
    "#212121"
  ],
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529"
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a"
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d"
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c"
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4"
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab"
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285"
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f"
  ]
};

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-primary-shade/get-primary-shade.mjs
function getPrimaryShade(theme, colorScheme) {
  if (typeof theme.primaryShade === "number") {
    return theme.primaryShade;
  }
  if (colorScheme === "dark") {
    return theme.primaryShade.dark;
  }
  return theme.primaryShade.light;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/parse-theme-color/parse-theme-color.mjs
function parseThemeColor({
  color,
  theme,
  colorScheme
}) {
  if (typeof color !== "string") {
    throw new Error(`[@mantine/core] Failed to parse color. Instead got ${typeof color}`);
  }
  if (color === "white" || color === "black") {
    return {
      color,
      value: color === "white" ? theme.white : theme.black,
      shade: void 0,
      isThemeColor: false,
      variable: `--mantine-color-${color}`
    };
  }
  const [_color, shade] = color.split(".");
  const colorShade = shade ? Number(shade) : void 0;
  const isThemeColor = _color in theme.colors;
  if (isThemeColor) {
    return {
      color: _color,
      value: colorShade !== void 0 ? theme.colors[_color][colorShade] : theme.colors[_color][getPrimaryShade(theme, colorScheme || "light")],
      shade: colorShade,
      isThemeColor,
      variable: shade ? `--mantine-color-${_color}-${colorShade}` : `--mantine-color-${_color}-filled`
    };
  }
  return {
    color,
    value: color,
    isThemeColor,
    shade: colorShade,
    variable: void 0
  };
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-theme-color/get-theme-color.mjs
function getThemeColor(color, theme) {
  const parsed = parseThemeColor({ color: color || theme.primaryColor, theme });
  return parsed.variable ? `var(${parsed.variable})` : color;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-gradient/get-gradient.mjs
function getGradient(gradient, theme) {
  const merged = {
    from: (gradient == null ? void 0 : gradient.from) || theme.defaultGradient.from,
    to: (gradient == null ? void 0 : gradient.to) || theme.defaultGradient.to,
    deg: (gradient == null ? void 0 : gradient.deg) || theme.defaultGradient.deg || 0
  };
  const fromColor = getThemeColor(merged.from, theme);
  const toColor = getThemeColor(merged.to, theme);
  return `linear-gradient(${merged.deg}deg, ${fromColor} 0%, ${toColor} 100%)`;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/to-rgba/to-rgba.mjs
function isHexColor(hex) {
  const HEX_REGEXP = /^#?([0-9A-F]{3}){1,2}$/i;
  return HEX_REGEXP.test(hex);
}
function hexToRgba(color) {
  let hexString = color.replace("#", "");
  if (hexString.length === 3) {
    const shorthandHex = hexString.split("");
    hexString = [
      shorthandHex[0],
      shorthandHex[0],
      shorthandHex[1],
      shorthandHex[1],
      shorthandHex[2],
      shorthandHex[2]
    ].join("");
  }
  const parsed = parseInt(hexString, 16);
  const r2 = parsed >> 16 & 255;
  const g = parsed >> 8 & 255;
  const b = parsed & 255;
  return {
    r: r2,
    g,
    b,
    a: 1
  };
}
function rgbStringToRgba(color) {
  const [r2, g, b, a] = color.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r: r2, g, b, a: a || 1 };
}
function hslStringToRgba(hslaString) {
  const hslaRegex = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i;
  const matches2 = hslaString.match(hslaRegex);
  if (!matches2) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  }
  const h = parseInt(matches2[1], 10);
  const s = parseInt(matches2[2], 10) / 100;
  const l = parseInt(matches2[3], 10) / 100;
  const a = matches2[5] ? parseFloat(matches2[5]) : void 0;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const huePrime = h / 60;
  const x = chroma * (1 - Math.abs(huePrime % 2 - 1));
  const m = l - chroma / 2;
  let r2;
  let g;
  let b;
  if (huePrime >= 0 && huePrime < 1) {
    r2 = chroma;
    g = x;
    b = 0;
  } else if (huePrime >= 1 && huePrime < 2) {
    r2 = x;
    g = chroma;
    b = 0;
  } else if (huePrime >= 2 && huePrime < 3) {
    r2 = 0;
    g = chroma;
    b = x;
  } else if (huePrime >= 3 && huePrime < 4) {
    r2 = 0;
    g = x;
    b = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    r2 = x;
    g = 0;
    b = chroma;
  } else {
    r2 = chroma;
    g = 0;
    b = x;
  }
  return {
    r: Math.round((r2 + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a: a || 1
  };
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }
  if (color.startsWith("rgb")) {
    return rgbStringToRgba(color);
  }
  if (color.startsWith("hsl")) {
    return hslStringToRgba(color);
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/darken/darken.mjs
function darken(color, alpha) {
  if (color.startsWith("var(")) {
    return color;
  }
  const { r: r2, g, b, a } = toRgba(color);
  const f = 1 - alpha;
  const dark = (input) => Math.round(input * f);
  return `rgba(${dark(r2)}, ${dark(g)}, ${dark(b)}, ${a})`;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/rgba/rgba.mjs
function rgba(color, alpha) {
  if (typeof color !== "string" || alpha > 1 || alpha < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  const { r: r2, g, b } = toRgba(color);
  return `rgba(${r2}, ${g}, ${b}, ${alpha})`;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/default-variant-colors-resolver/default-variant-colors-resolver.mjs
var import_react10 = __toESM(require_react(), 1);
var defaultVariantColorsResolver = ({
  color,
  theme,
  variant,
  gradient
}) => {
  const parsed = parseThemeColor({ color, theme });
  if (variant === "filled") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-filled)`,
          hover: `var(--mantine-color-${color}-filled-hover)`,
          color: "var(--mantine-color-white)",
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        hover: `var(--mantine-color-${parsed.color}-${parsed.shade === 9 ? 8 : parsed.shade + 1})`,
        color: "var(--mantine-color-white)",
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: color,
      hover: darken(color, 0.1),
      color: "var(--mantine-color-white)",
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "light") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-light)`,
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme.colors[parsed.color][parsed.shade];
      return {
        background: rgba(parsedColor, 0.1),
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: rgba(color, 0.1),
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "outline") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-outline-hover)`,
          color: `var(--mantine-color-${color}-outline)`,
          border: `${rem(1)} solid var(--mantine-color-${color}-outline)`
        };
      }
      return {
        background: "transparent",
        hover: rgba(theme.colors[parsed.color][parsed.shade], 0.05),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid var(--mantine-color-${parsed.color}-${parsed.shade})`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.05),
      color,
      border: `${rem(1)} solid ${color}`
    };
  }
  if (variant === "subtle") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme.colors[parsed.color][parsed.shade];
      return {
        background: "transparent",
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "transparent") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: "transparent",
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "transparent",
        hover: "transparent",
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: "transparent",
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "white") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "var(--mantine-color-white)",
          hover: darken(theme.white, 0.01),
          color: `var(--mantine-color-${color}-filled)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "var(--mantine-color-white)",
        hover: darken(theme.white, 0.01),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "var(--mantine-color-white)",
      hover: darken(theme.white, 0.01),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "gradient") {
    return {
      background: getGradient(gradient, theme),
      hover: getGradient(gradient, theme),
      color: "var(--mantine-color-white)",
      border: "none"
    };
  }
  if (variant === "default") {
    return {
      background: "var(--mantine-color-default)",
      hover: "var(--mantine-color-default-hover)",
      color: "var(--mantine-color-default-color)",
      border: `${rem(1)} solid var(--mantine-color-default-border)`
    };
  }
  return {};
};

// node_modules/@mantine/core/esm/core/MantineProvider/default-theme.mjs
var import_react11 = __toESM(require_react(), 1);
var DEFAULT_FONT_FAMILY = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
var DEFAULT_THEME = {
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: DEFAULT_COLORS,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: defaultVariantColorsResolver,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  respectReducedMotion: false,
  cursorType: "default",
  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
  defaultRadius: "sm",
  activeClassName: "mantine-active",
  focusClassName: "",
  headings: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: "700",
    sizes: {
      h1: { fontSize: rem(34), lineHeight: "1.3" },
      h2: { fontSize: rem(26), lineHeight: "1.35" },
      h3: { fontSize: rem(22), lineHeight: "1.4" },
      h4: { fontSize: rem(18), lineHeight: "1.45" },
      h5: { fontSize: rem(16), lineHeight: "1.5" },
      h6: { fontSize: rem(14), lineHeight: "1.5" }
    }
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20)
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65"
  },
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(16),
    xl: rem(32)
  },
  spacing: {
    xs: rem(10),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(32)
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  shadows: {
    xs: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), 0 ${rem(1)} ${rem(2)} rgba(0, 0, 0, 0.1)`,
    sm: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(10)} ${rem(
      15
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(7)} ${rem(7)} ${rem(-5)}`,
    md: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(20)} ${rem(
      25
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(10)} ${rem(10)} ${rem(-5)}`,
    lg: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(28)} ${rem(
      23
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(12)} ${rem(12)} ${rem(-7)}`,
    xl: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(36)} ${rem(
      28
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(17)} ${rem(17)} ${rem(-7)}`
  },
  other: {},
  components: {}
};

// node_modules/@mantine/core/esm/core/MantineProvider/MantineProvider.mjs
var import_react20 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/core/MantineProvider/suppress-nextjs-warning.mjs
function suppressNextjsWarning() {
  const originalError = console.error;
  console.error = (...args) => {
    if (args.length > 1 && typeof args[0] === "string" && args[0].toLowerCase().includes("extra attributes from the server") && typeof args[1] === "string" && args[1].toLowerCase().includes("data-mantine-color-scheme"))
      ;
    else {
      originalError(...args);
    }
  };
}

// node_modules/@mantine/core/esm/core/MantineProvider/MantineCssVariables/MantineCssVariables.mjs
var import_react17 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/core/MantineProvider/MantineThemeProvider/MantineThemeProvider.mjs
var import_react13 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/core/MantineProvider/merge-mantine-theme/merge-mantine-theme.mjs
var import_react12 = __toESM(require_react(), 1);
var INVALID_PRIMARY_COLOR_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color";
var INVALID_PRIMARY_SHADE_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function isValidPrimaryShade(shade) {
  if (shade < 0 || shade > 9) {
    return false;
  }
  return parseInt(shade.toString(), 10) === shade;
}
function validateMantineTheme(theme) {
  if (!(theme.primaryColor in theme.colors)) {
    throw new Error(INVALID_PRIMARY_COLOR_ERROR);
  }
  if (typeof theme.primaryShade === "object") {
    if (!isValidPrimaryShade(theme.primaryShade.dark) || !isValidPrimaryShade(theme.primaryShade.light)) {
      throw new Error(INVALID_PRIMARY_SHADE_ERROR);
    }
  }
  if (typeof theme.primaryShade === "number" && !isValidPrimaryShade(theme.primaryShade)) {
    throw new Error(INVALID_PRIMARY_SHADE_ERROR);
  }
}
function mergeMantineTheme(currentTheme, themeOverride) {
  var _a;
  if (!themeOverride) {
    validateMantineTheme(currentTheme);
    return currentTheme;
  }
  const result = deepMerge(currentTheme, themeOverride);
  if (themeOverride.fontFamily && !((_a = themeOverride.headings) == null ? void 0 : _a.fontFamily)) {
    result.headings.fontFamily = themeOverride.fontFamily;
  }
  validateMantineTheme(result);
  return result;
}

// node_modules/@mantine/core/esm/core/MantineProvider/MantineThemeProvider/MantineThemeProvider.mjs
var MantineThemeContext = (0, import_react13.createContext)(null);
var useSafeMantineTheme = () => (0, import_react13.useContext)(MantineThemeContext) || DEFAULT_THEME;
function useMantineTheme() {
  const ctx = (0, import_react13.useContext)(MantineThemeContext);
  if (!ctx) {
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  }
  return ctx;
}
function MantineThemeProvider({
  theme,
  children,
  inherit = true
}) {
  const parentTheme = useSafeMantineTheme();
  const mergedTheme = (0, import_react13.useMemo)(
    () => mergeMantineTheme(inherit ? parentTheme : DEFAULT_THEME, theme),
    [theme, parentTheme, inherit]
  );
  return import_react13.default.createElement(MantineThemeContext.Provider, { value: mergedTheme }, children);
}
MantineThemeProvider.displayName = "@mantine/core/MantineThemeProvider";

// node_modules/@mantine/core/esm/core/MantineProvider/convert-css-variables/css-variables-object-to-string.mjs
function cssVariablesObjectToString(variables) {
  return Object.entries(variables).map(([name, value]) => `${name}: ${value};`).join("");
}

// node_modules/@mantine/core/esm/core/MantineProvider/convert-css-variables/wrap-with-selector.mjs
function wrapWithSelector(selectors, code) {
  const _selectors = Array.isArray(selectors) ? selectors : [selectors];
  return _selectors.reduce((acc, selector) => `${selector}{${acc}}`, code);
}

// node_modules/@mantine/core/esm/core/MantineProvider/convert-css-variables/convert-css-variables.mjs
function convertCssVariables(input, selector) {
  const sharedVariables = cssVariablesObjectToString(input.variables);
  const shared = sharedVariables ? wrapWithSelector(selector, sharedVariables) : "";
  const dark = cssVariablesObjectToString(input.dark);
  const darkForced = dark ? wrapWithSelector(`${selector}[data-mantine-color-scheme="dark"]`, dark) : "";
  const light = cssVariablesObjectToString(input.light);
  const lightForced = light ? wrapWithSelector(`${selector}[data-mantine-color-scheme="light"]`, light) : "";
  return `${shared}${darkForced}${lightForced}`;
}

// node_modules/@mantine/core/esm/core/MantineProvider/MantineCssVariables/get-merged-variables.mjs
var import_react15 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/core/MantineProvider/MantineCssVariables/default-css-variables-resolver.mjs
var import_react14 = __toESM(require_react(), 1);
function assignSizeVariables(variables, sizes, name) {
  keys(sizes).forEach(
    (size2) => Object.assign(variables, { [`--mantine-${name}-${size2}`]: sizes[size2] })
  );
}
var defaultCssVariablesResolver = (theme) => {
  const darkPrimaryShade = getPrimaryShade(theme, "dark");
  const lightPrimaryShade = getPrimaryShade(theme, "light");
  const defaultRadius = theme.defaultRadius in theme.radius ? theme.radius[theme.defaultRadius] : rem(theme.defaultRadius);
  const result = {
    variables: {
      "--mantine-scale": theme.scale.toString(),
      "--mantine-cursor-type": theme.cursorType,
      "--mantine-webkit-font-smoothing": theme.fontSmoothing ? "antialiased" : "unset",
      "--mantine-color-scheme": "light dark",
      "--mantine-moz-font-smoothing": theme.fontSmoothing ? "grayscale" : "unset",
      "--mantine-color-white": theme.white,
      "--mantine-color-black": theme.black,
      "--mantine-line-height": theme.lineHeights.md,
      "--mantine-font-family": theme.fontFamily,
      "--mantine-font-family-monospace": theme.fontFamilyMonospace,
      "--mantine-font-family-headings": theme.headings.fontFamily,
      "--mantine-heading-font-weight": theme.headings.fontWeight,
      "--mantine-radius-default": defaultRadius,
      // Primary colors
      "--mantine-primary-color-filled": `var(--mantine-color-${theme.primaryColor}-filled)`,
      "--mantine-primary-color-filled-hover": `var(--mantine-color-${theme.primaryColor}-filled-hover)`,
      "--mantine-primary-color-light": `var(--mantine-color-${theme.primaryColor}-light)`,
      "--mantine-primary-color-light-hover": `var(--mantine-color-${theme.primaryColor}-light-hover)`,
      "--mantine-primary-color-light-color": `var(--mantine-color-${theme.primaryColor}-light-color)`
    },
    light: {
      "--mantine-color-bright": "var(--mantine-color-black)",
      "--mantine-color-text": theme.black,
      "--mantine-color-body": theme.white,
      "--mantine-color-error": "var(--mantine-color-red-6)",
      "--mantine-color-placeholder": "var(--mantine-color-gray-5)",
      "--mantine-color-anchor": `var(--mantine-color-${theme.primaryColor}-${lightPrimaryShade})`,
      "--mantine-color-default": "var(--mantine-color-white)",
      "--mantine-color-default-hover": "var(--mantine-color-gray-0)",
      "--mantine-color-default-color": "var(--mantine-color-black)",
      "--mantine-color-default-border": "var(--mantine-color-gray-4)"
    },
    dark: {
      "--mantine-color-bright": "var(--mantine-color-white)",
      "--mantine-color-text": "var(--mantine-color-dark-0)",
      "--mantine-color-body": "var(--mantine-color-dark-7)",
      "--mantine-color-error": "var(--mantine-color-red-8)",
      "--mantine-color-placeholder": "var(--mantine-color-dark-3)",
      "--mantine-color-anchor": `var(--mantine-color-${theme.primaryColor}-4)`,
      "--mantine-color-default": "var(--mantine-color-dark-6)",
      "--mantine-color-default-hover": "var(--mantine-color-dark-5)",
      "--mantine-color-default-color": "var(--mantine-color-white)",
      "--mantine-color-default-border": "var(--mantine-color-dark-4)"
    }
  };
  assignSizeVariables(result.variables, theme.breakpoints, "breakpoint");
  assignSizeVariables(result.variables, theme.spacing, "spacing");
  assignSizeVariables(result.variables, theme.fontSizes, "font-size");
  assignSizeVariables(result.variables, theme.lineHeights, "line-height");
  assignSizeVariables(result.variables, theme.shadows, "shadow");
  assignSizeVariables(result.variables, theme.radius, "radius");
  keys(theme.colors).forEach((color) => {
    theme.colors[color].forEach((shade, index5) => {
      result.variables[`--mantine-color-${color}-${index5}`] = shade;
    });
    const lightFilledHover = `var(--mantine-color-${color}-${lightPrimaryShade === 9 ? 8 : lightPrimaryShade + 1})`;
    const darkFilledHover = `var(--mantine-color-${color}-${darkPrimaryShade === 9 ? 8 : darkPrimaryShade + 1})`;
    result.light["--mantine-color-dimmed"] = "var(--mantine-color-gray-6)";
    result.light[`--mantine-color-${color}-text`] = `var(--mantine-color-${color}-filled)`;
    result.light[`--mantine-color-${color}-filled`] = `var(--mantine-color-${color}-${lightPrimaryShade})`;
    result.light[`--mantine-color-${color}-filled-hover`] = lightFilledHover;
    result.light[`--mantine-color-${color}-light`] = rgba(
      theme.colors[color][lightPrimaryShade],
      0.1
    );
    result.light[`--mantine-color-${color}-light-hover`] = rgba(
      theme.colors[color][lightPrimaryShade],
      0.12
    );
    result.light[`--mantine-color-${color}-light-color`] = `var(--mantine-color-${color}-${lightPrimaryShade})`;
    result.light[`--mantine-color-${color}-outline`] = `var(--mantine-color-${color}-${lightPrimaryShade})`;
    result.light[`--mantine-color-${color}-outline-hover`] = rgba(
      theme.colors[color][lightPrimaryShade],
      0.05
    );
    result.dark["--mantine-color-dimmed"] = "var(--mantine-color-dark-2)";
    result.dark[`--mantine-color-${color}-text`] = `var(--mantine-color-${color}-4)`;
    result.dark[`--mantine-color-${color}-filled`] = `var(--mantine-color-${color}-${darkPrimaryShade})`;
    result.dark[`--mantine-color-${color}-filled-hover`] = darkFilledHover;
    result.dark[`--mantine-color-${color}-light`] = rgba(
      theme.colors[color][Math.max(0, darkPrimaryShade - 2)],
      0.15
    );
    result.dark[`--mantine-color-${color}-light-hover`] = rgba(
      theme.colors[color][Math.max(0, darkPrimaryShade - 2)],
      0.2
    );
    result.dark[`--mantine-color-${color}-light-color`] = `var(--mantine-color-${color}-${Math.max(
      darkPrimaryShade - 5,
      0
    )})`;
    result.dark[`--mantine-color-${color}-outline`] = `var(--mantine-color-${color}-${Math.max(
      darkPrimaryShade - 4,
      0
    )})`;
    result.dark[`--mantine-color-${color}-outline-hover`] = rgba(
      theme.colors[color][Math.max(darkPrimaryShade - 4, 0)],
      0.05
    );
  });
  const headings2 = theme.headings.sizes;
  keys(headings2).forEach((heading) => {
    result.variables[`--mantine-${heading}-font-size`] = headings2[heading].fontSize;
    result.variables[`--mantine-${heading}-line-height`] = headings2[heading].lineHeight;
    result.variables[`--mantine-${heading}-font-weight`] = headings2[heading].fontWeight || theme.headings.fontWeight;
  });
  return result;
};

// node_modules/@mantine/core/esm/core/MantineProvider/MantineCssVariables/get-merged-variables.mjs
function getMergedVariables({ theme, generator }) {
  const defaultResolver = defaultCssVariablesResolver(theme);
  const providerGenerator = generator == null ? void 0 : generator(theme);
  return providerGenerator ? deepMerge(defaultResolver, providerGenerator) : defaultResolver;
}

// node_modules/@mantine/core/esm/core/MantineProvider/MantineCssVariables/remove-default-variables.mjs
var import_react16 = __toESM(require_react(), 1);
var defaultCssVariables = defaultCssVariablesResolver(DEFAULT_THEME);
function removeDefaultVariables(input) {
  const cleaned = {
    variables: {},
    light: {},
    dark: {}
  };
  keys(input.variables).forEach((key) => {
    if (defaultCssVariables.variables[key] !== input.variables[key]) {
      cleaned.variables[key] = input.variables[key];
    }
  });
  keys(input.light).forEach((key) => {
    if (defaultCssVariables.light[key] !== input.light[key]) {
      cleaned.light[key] = input.light[key];
    }
  });
  keys(input.dark).forEach((key) => {
    if (defaultCssVariables.dark[key] !== input.dark[key]) {
      cleaned.dark[key] = input.dark[key];
    }
  });
  return cleaned;
}

// node_modules/@mantine/core/esm/core/MantineProvider/MantineCssVariables/MantineCssVariables.mjs
function getColorSchemeCssVariables(selector) {
  return `
  ${selector}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${selector}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
}
function MantineCssVariables({ cssVariablesSelector }) {
  const theme = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const generator = useMantineCssVariablesResolver();
  const mergedVariables = getMergedVariables({ theme, generator });
  const shouldCleanVariables = cssVariablesSelector === ":root";
  const cleanedVariables = shouldCleanVariables ? removeDefaultVariables(mergedVariables) : mergedVariables;
  const css = convertCssVariables(cleanedVariables, cssVariablesSelector);
  if (css) {
    return import_react17.default.createElement(
      "style",
      {
        "data-mantine-styles": true,
        nonce: nonce == null ? void 0 : nonce(),
        dangerouslySetInnerHTML: {
          __html: `${css}${shouldCleanVariables ? "" : getColorSchemeCssVariables(cssVariablesSelector)}`
        }
      }
    );
  }
  return null;
}
MantineCssVariables.displayName = "@mantine/CssVariables";

// node_modules/@mantine/core/esm/core/MantineProvider/MantineClasses/MantineClasses.mjs
var import_react18 = __toESM(require_react(), 1);
function MantineClasses() {
  const theme = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const classes79 = keys(theme.breakpoints).reduce((acc, breakpoint) => {
    const pxValue = px(theme.breakpoints[breakpoint]);
    return `${acc}@media (max-width: ${em(
      pxValue - 0.1
    )}) {.mantine-visible-from-${breakpoint} {display: none !important;}}@media (min-width: ${em(
      pxValue
    )}) {.mantine-hidden-from-${breakpoint} {display: none !important;}}`;
  }, "");
  return import_react18.default.createElement(
    "style",
    {
      "data-mantine-styles": "classes",
      nonce: nonce == null ? void 0 : nonce(),
      dangerouslySetInnerHTML: { __html: classes79 }
    }
  );
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-scheme-managers/is-mantine-color-scheme.mjs
function isMantineColorScheme(value) {
  return value === "auto" || value === "dark" || value === "light";
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-scheme-managers/local-storage-manager.mjs
function localStorageColorSchemeManager({
  key = "mantine-color-scheme-value"
} = {}) {
  let handleStorageEvent;
  return {
    get: (defaultValue) => {
      if (typeof window === "undefined") {
        return defaultValue;
      }
      try {
        const storedColorScheme = window.localStorage.getItem(key);
        return isMantineColorScheme(storedColorScheme) ? storedColorScheme : defaultValue;
      } catch {
        return defaultValue;
      }
    },
    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        console.warn(
          "[@mantine/core] Local storage color scheme manager was unable to save color scheme.",
          error
        );
      }
    },
    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          isMantineColorScheme(event.newValue) && onUpdate(event.newValue);
        }
      };
      window.addEventListener("storage", handleStorageEvent);
    },
    unsubscribe: () => {
      window.removeEventListener("storage", handleStorageEvent);
    },
    clear: () => {
      window.localStorage.removeItem(key);
    }
  };
}

// node_modules/@mantine/core/esm/core/MantineProvider/use-mantine-color-scheme/use-provider-color-scheme.mjs
var import_react19 = __toESM(require_react(), 1);
function setColorSchemeAttribute(colorScheme, getRootElement) {
  var _a;
  const computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  (_a = getRootElement()) == null ? void 0 : _a.setAttribute("data-mantine-color-scheme", computedColorScheme);
}
function useProviderColorScheme({
  manager,
  defaultColorScheme,
  getRootElement,
  forceColorScheme
}) {
  const media = (0, import_react19.useRef)();
  const [value, setValue] = (0, import_react19.useState)(() => manager.get(defaultColorScheme));
  const colorSchemeValue = forceColorScheme || value;
  const setColorScheme = (0, import_react19.useCallback)(
    (colorScheme) => {
      if (!forceColorScheme) {
        setColorSchemeAttribute(colorScheme, getRootElement);
        setValue(colorScheme);
        manager.set(colorScheme);
      }
    },
    [manager.set, colorSchemeValue, forceColorScheme]
  );
  const clearColorScheme = (0, import_react19.useCallback)(() => {
    setValue(defaultColorScheme);
    setColorSchemeAttribute(defaultColorScheme, getRootElement);
    manager.clear();
  }, [manager.clear, defaultColorScheme]);
  (0, import_react19.useEffect)(() => {
    manager.subscribe(setColorScheme);
    return manager.unsubscribe;
  }, [manager.subscribe, manager.unsubscribe]);
  useIsomorphicEffect(() => {
    setColorSchemeAttribute(manager.get(defaultColorScheme), getRootElement);
  }, []);
  (0, import_react19.useEffect)(() => {
    var _a;
    if (forceColorScheme) {
      setColorSchemeAttribute(forceColorScheme, getRootElement);
      return () => {
      };
    }
    media.current = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event) => {
      if (value === "auto") {
        setColorSchemeAttribute(event.matches ? "dark" : "light", getRootElement);
      }
    };
    (_a = media.current) == null ? void 0 : _a.addEventListener("change", listener);
    return () => {
      var _a2;
      return (_a2 = media.current) == null ? void 0 : _a2.removeEventListener("change", listener);
    };
  }, [value, forceColorScheme]);
  return { colorScheme: colorSchemeValue, setColorScheme, clearColorScheme };
}

// node_modules/@mantine/core/esm/core/MantineProvider/use-respect-reduce-motion/use-respect-reduce-motion.mjs
function useRespectReduceMotion({
  respectReducedMotion,
  getRootElement
}) {
  useIsomorphicEffect(() => {
    var _a;
    if (respectReducedMotion) {
      (_a = getRootElement()) == null ? void 0 : _a.setAttribute("data-respect-reduced-motion", "true");
    }
  }, [respectReducedMotion]);
}

// node_modules/@mantine/core/esm/core/MantineProvider/MantineProvider.mjs
suppressNextjsWarning();
function MantineProvider({
  theme,
  children,
  getStyleNonce,
  withCssVariables = true,
  cssVariablesSelector = ":root",
  classNamesPrefix = "mantine",
  colorSchemeManager = localStorageColorSchemeManager(),
  defaultColorScheme = "light",
  getRootElement = () => document.documentElement,
  cssVariablesResolver,
  forceColorScheme
}) {
  const { colorScheme, setColorScheme, clearColorScheme } = useProviderColorScheme({
    defaultColorScheme,
    forceColorScheme,
    manager: colorSchemeManager,
    getRootElement
  });
  useRespectReduceMotion({
    respectReducedMotion: (theme == null ? void 0 : theme.respectReducedMotion) || false,
    getRootElement
  });
  return import_react20.default.createElement(
    MantineContext.Provider,
    {
      value: {
        colorSchemeManager,
        colorScheme,
        setColorScheme,
        clearColorScheme,
        getRootElement,
        classNamesPrefix,
        getStyleNonce,
        cssVariablesResolver,
        cssVariablesSelector
      }
    },
    import_react20.default.createElement(MantineThemeProvider, { theme }, withCssVariables && import_react20.default.createElement(MantineCssVariables, { cssVariablesSelector }), import_react20.default.createElement(MantineClasses, null), children)
  );
}
MantineProvider.displayName = "@mantine/core/MantineProvider";

// node_modules/@mantine/core/esm/core/styles-api/use-resolved-styles-api/use-resolved-styles-api.mjs
function useResolvedStylesApi({
  classNames,
  styles,
  props,
  stylesCtx
}) {
  const theme = useMantineTheme();
  return {
    resolvedClassNames: resolveClassNames({
      theme,
      classNames,
      props,
      stylesCtx: stylesCtx || void 0
    }),
    resolvedStyles: resolveStyles({
      theme,
      styles,
      props,
      stylesCtx: stylesCtx || void 0
    })
  };
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-global-class-names/get-global-class-names.mjs
var FOCUS_CLASS_NAMES = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function getGlobalClassNames({ theme, options, unstyled }) {
  return clsx_default(
    (options == null ? void 0 : options.focusable) && !unstyled && (theme.focusClassName || FOCUS_CLASS_NAMES[theme.focusRing]),
    (options == null ? void 0 : options.active) && !unstyled && theme.activeClassName
  );
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs
var import_react23 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-static-class-names/get-static-class-names.mjs
function getStaticClassNames({
  themeName,
  classNamesPrefix,
  selector
}) {
  return themeName.map((n) => `${classNamesPrefix}-${n}-${selector}`);
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-theme-class-names/get-theme-class-names.mjs
function getThemeClassNames({
  themeName,
  theme,
  selector,
  props,
  stylesCtx
}) {
  return themeName.map(
    (n) => {
      var _a, _b;
      return (_b = resolveClassNames({
        theme,
        classNames: (_a = theme.components[n]) == null ? void 0 : _a.classNames,
        props,
        stylesCtx
      })) == null ? void 0 : _b[selector];
    }
  );
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-variant-class-name/get-variant-class-name.mjs
function getVariantClassName({
  options,
  classes: classes79,
  selector,
  unstyled
}) {
  return (options == null ? void 0 : options.variant) && !unstyled ? classes79[`${selector}--${options.variant}`] : void 0;
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-root-class-name/get-root-class-name.mjs
function getRootClassName({ rootSelector, selector, className }) {
  return rootSelector === selector ? className : void 0;
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-selector-class-name/get-selector-class-name.mjs
function getSelectorClassName({ selector, classes: classes79, unstyled }) {
  return unstyled ? void 0 : classes79[selector];
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-resolved-class-names/get-resolved-class-names.mjs
function getResolvedClassNames({
  selector,
  stylesCtx,
  theme,
  classNames,
  props
}) {
  return resolveClassNames({ theme, classNames, props, stylesCtx })[selector];
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-options-class-names/get-options-class-names.mjs
function getOptionsClassNames({
  selector,
  stylesCtx,
  options,
  props,
  theme
}) {
  return resolveClassNames({
    theme,
    classNames: options == null ? void 0 : options.classNames,
    props: (options == null ? void 0 : options.props) || props,
    stylesCtx
  })[selector];
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-class-name/get-class-name.mjs
function getClassName({
  theme,
  options,
  themeName,
  selector,
  classNamesPrefix,
  classNames,
  classes: classes79,
  unstyled,
  className,
  rootSelector,
  props,
  stylesCtx
}) {
  return clsx_default(
    getGlobalClassNames({ theme, options, unstyled }),
    getThemeClassNames({ theme, themeName, selector, props, stylesCtx }),
    getVariantClassName({ options, classes: classes79, selector, unstyled }),
    getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }),
    getOptionsClassNames({ selector, stylesCtx, options, props, theme }),
    getRootClassName({ rootSelector, selector, className }),
    getSelectorClassName({ selector, classes: classes79, unstyled }),
    getStaticClassNames({ themeName, classNamesPrefix, selector }),
    options == null ? void 0 : options.className
  );
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/get-theme-styles/get-theme-styles.mjs
function getThemeStyles({
  theme,
  themeName,
  props,
  stylesCtx,
  selector
}) {
  return themeName.map(
    (n) => {
      var _a;
      return resolveStyles({
        theme,
        styles: (_a = theme.components[n]) == null ? void 0 : _a.styles,
        props,
        stylesCtx
      })[selector];
    }
  ).reduce((acc, val) => ({ ...acc, ...val }), {});
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-style/resolve-style.mjs
function resolveStyle({ style, theme }) {
  if (Array.isArray(style)) {
    return [...style].reduce(
      (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme }) }),
      {}
    );
  }
  if (typeof style === "function") {
    return style(theme);
  }
  if (style == null) {
    return {};
  }
  return style;
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-vars/merge-vars.mjs
var import_react22 = __toESM(require_react(), 1);
function mergeVars(vars) {
  return vars.reduce((acc, current) => {
    if (current) {
      Object.keys(current).forEach((key) => {
        acc[key] = { ...acc[key], ...filterProps(current[key]) };
      });
    }
    return acc;
  }, {});
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/resolve-vars/resolve-vars.mjs
function resolveVars({
  vars,
  varsResolver: varsResolver81,
  theme,
  props,
  stylesCtx,
  selector,
  themeName
}) {
  var _a;
  return (_a = mergeVars([
    varsResolver81 == null ? void 0 : varsResolver81(theme, props, stylesCtx),
    ...themeName.map((name) => {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = theme.components) == null ? void 0 : _a2[name]) == null ? void 0 : _b.vars) == null ? void 0 : _c.call(_b, theme, props, stylesCtx);
    }),
    vars == null ? void 0 : vars(theme, props, stylesCtx)
  ])) == null ? void 0 : _a[selector];
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/get-style/get-style.mjs
function getStyle({
  theme,
  themeName,
  selector,
  options,
  props,
  stylesCtx,
  rootSelector,
  styles,
  style,
  vars,
  varsResolver: varsResolver81
}) {
  return {
    ...getThemeStyles({ theme, themeName, props, stylesCtx, selector }),
    ...resolveStyles({ theme, styles, props, stylesCtx })[selector],
    ...resolveStyles({ theme, styles: options == null ? void 0 : options.styles, props: (options == null ? void 0 : options.props) || props, stylesCtx })[selector],
    ...resolveVars({ theme, props, stylesCtx, vars, varsResolver: varsResolver81, selector, themeName }),
    ...rootSelector === selector ? resolveStyle({ style, theme }) : null,
    ...resolveStyle({ style: options == null ? void 0 : options.style, theme })
  };
}

// node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs
function useStyles({
  name,
  classes: classes79,
  props,
  stylesCtx,
  className,
  style,
  rootSelector = "root",
  unstyled,
  classNames,
  styles,
  vars,
  varsResolver: varsResolver81
}) {
  const theme = useMantineTheme();
  const classNamesPrefix = useMantineClassNamesPrefix();
  const themeName = (Array.isArray(name) ? name : [name]).filter((n) => n);
  return (selector, options) => ({
    className: getClassName({
      theme,
      options,
      themeName,
      selector,
      classNamesPrefix,
      classNames,
      classes: classes79,
      unstyled,
      className,
      rootSelector,
      props,
      stylesCtx
    }),
    style: getStyle({
      theme,
      themeName,
      selector,
      options,
      props,
      stylesCtx,
      rootSelector,
      styles,
      style,
      vars,
      varsResolver: varsResolver81
    })
  });
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/lighten/lighten.mjs
function lighten(color, alpha) {
  if (color.startsWith("var(")) {
    return color;
  }
  const { r: r2, g, b, a } = toRgba(color);
  const light = (input) => Math.round(input + (255 - input) * alpha);
  return `rgba(${light(r2)}, ${light(g)}, ${light(b)}, ${a})`;
}

// node_modules/@mantine/core/esm/core/MantineProvider/color-functions/is-light-color/is-light-color.mjs
function getPartLuminance(value) {
  const x = value / 255;
  return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function getLuminance(input) {
  const r2 = getPartLuminance(input.r);
  const g = getPartLuminance(input.g);
  const b = getPartLuminance(input.b);
  return 0.2126 * r2 + 0.7152 * g + 0.0722 * b;
}
function isLightColor(color, luminanceThreshold = 0.179) {
  return getLuminance(toRgba(color)) > luminanceThreshold;
}

// node_modules/@mantine/core/esm/core/MantineProvider/use-mantine-color-scheme/use-mantine-color-scheme.mjs
var import_react24 = __toESM(require_react(), 1);
function disableTransition() {
  const style = document.createElement("style");
  style.innerHTML = "*, *::before, *::after {transition: none !important;}";
  style.setAttribute("data-mantine-disable-transition", "true");
  document.head.appendChild(style);
  const clear = () => document.querySelectorAll("[data-mantine-disable-transition]").forEach((element) => element.remove());
  return clear;
}
function useMantineColorScheme({ keepTransitions } = {}) {
  const clearStylesRef = (0, import_react24.useRef)();
  const timeoutRef = (0, import_react24.useRef)();
  const ctx = (0, import_react24.useContext)(MantineContext);
  if (!ctx) {
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  }
  const setColorScheme = (value) => {
    ctx.setColorScheme(value);
    clearStylesRef.current = keepTransitions ? () => {
    } : disableTransition();
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      var _a;
      (_a = clearStylesRef.current) == null ? void 0 : _a.call(clearStylesRef);
    }, 10);
  };
  const clearColorScheme = () => {
    ctx.clearColorScheme();
    clearStylesRef.current = keepTransitions ? () => {
    } : disableTransition();
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      var _a;
      (_a = clearStylesRef.current) == null ? void 0 : _a.call(clearStylesRef);
    }, 10);
  };
  const osColorScheme = useColorScheme("light", { getInitialValueInEffect: false });
  const computedColorScheme = ctx.colorScheme === "auto" ? osColorScheme : ctx.colorScheme;
  const toggleColorScheme = (0, import_react24.useCallback)(
    () => setColorScheme(computedColorScheme === "light" ? "dark" : "light"),
    [setColorScheme, computedColorScheme]
  );
  (0, import_react24.useEffect)(
    () => () => {
      var _a;
      (_a = clearStylesRef.current) == null ? void 0 : _a.call(clearStylesRef);
      window.clearTimeout(timeoutRef.current);
    },
    []
  );
  return {
    colorScheme: ctx.colorScheme,
    setColorScheme,
    clearColorScheme,
    toggleColorScheme
  };
}

// node_modules/@mantine/core/esm/core/MantineProvider/use-mantine-color-scheme/use-computed-color-scheme.mjs
function useComputedColorScheme(defaultValue, options = { getInitialValueInEffect: true }) {
  const osColorScheme = useColorScheme(defaultValue, options);
  const { colorScheme } = useMantineColorScheme();
  return colorScheme === "auto" ? osColorScheme : colorScheme;
}

// node_modules/@mantine/core/esm/core/MantineProvider/ColorSchemeScript/ColorSchemeScript.mjs
var import_react25 = __toESM(require_react(), 1);
var getScript = ({
  defaultColorScheme,
  localStorageKey,
  forceColorScheme
}) => forceColorScheme ? `document.documentElement.setAttribute("data-mantine-color-scheme", '${forceColorScheme}');` : `try {
  var _colorScheme = window.localStorage.getItem("${localStorageKey}");
  var colorScheme = _colorScheme === "light" || _colorScheme === "dark" || _colorScheme === "auto" ? _colorScheme : "${defaultColorScheme}";
  var computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-mantine-color-scheme", computedColorScheme);
} catch (e) {}
`;
function ColorSchemeScript({
  defaultColorScheme = "light",
  localStorageKey = "mantine-color-scheme-value",
  forceColorScheme,
  ...others
}) {
  const _defaultColorScheme = ["light", "dark", "auto"].includes(defaultColorScheme) ? defaultColorScheme : "light";
  return import_react25.default.createElement(
    "script",
    {
      ...others,
      "data-mantine-script": true,
      dangerouslySetInnerHTML: {
        __html: getScript({
          defaultColorScheme: _defaultColorScheme,
          localStorageKey,
          forceColorScheme
        })
      }
    }
  );
}

// node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
var import_react26 = __toESM(require_react(), 1);
function useProps(component, defaultProps174, props) {
  var _a;
  const theme = useMantineTheme();
  const contextPropsPayload = (_a = theme.components[component]) == null ? void 0 : _a.defaultProps;
  const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;
  return { ...defaultProps174, ...contextProps, ...filterProps(props) };
}

// node_modules/@mantine/core/esm/core/MantineProvider/create-theme/create-theme.mjs
function createTheme(theme) {
  return theme;
}

// node_modules/@mantine/core/esm/core/MantineProvider/merge-theme-overrides/merge-theme-overrides.mjs
var import_react27 = __toESM(require_react(), 1);
function mergeThemeOverrides(...overrides) {
  return overrides.reduce((acc, override) => deepMerge(acc, override), {});
}

// node_modules/@mantine/core/esm/core/InlineStyles/InlineStyles.mjs
var import_react29 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/core/InlineStyles/css-object-to-string/css-object-to-string.mjs
var import_react28 = __toESM(require_react(), 1);
function cssObjectToString(css) {
  return keys(css).reduce(
    (acc, rule) => css[rule] !== void 0 ? `${acc}${camelToKebabCase(rule)}:${css[rule]};` : acc,
    ""
  ).trim();
}

// node_modules/@mantine/core/esm/core/InlineStyles/styles-to-string/styles-to-string.mjs
function stylesToString({ selector, styles, media }) {
  const baseStyles = styles ? cssObjectToString(styles) : "";
  const mediaQueryStyles = !Array.isArray(media) ? [] : media.map((item) => `@media${item.query}{${selector}{${cssObjectToString(item.styles)}}}`);
  return `${baseStyles ? `${selector}{${baseStyles}}` : ""}${mediaQueryStyles.join("")}`.trim();
}

// node_modules/@mantine/core/esm/core/InlineStyles/InlineStyles.mjs
function InlineStyles({ selector, styles, media }) {
  const nonce = useMantineStyleNonce();
  return import_react29.default.createElement(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: nonce == null ? void 0 : nonce(),
      dangerouslySetInnerHTML: { __html: stylesToString({ selector, styles, media }) }
    }
  );
}

// node_modules/@mantine/core/esm/core/Box/style-props/extract-style-props/extract-style-props.mjs
var import_react30 = __toESM(require_react(), 1);
function extractStyleProps(others) {
  const {
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    p,
    px: px2,
    py,
    pt,
    pb,
    pl,
    pr,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    ...rest
  } = others;
  const styleProps = filterProps({
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    p,
    px: px2,
    py,
    pt,
    pb,
    pl,
    pr,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden
  });
  return { styleProps, rest };
}

// node_modules/@mantine/core/esm/core/Box/style-props/style-props-data.mjs
var STYlE_PROPS_DATA = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  mx: { type: "spacing", property: ["marginRight", "marginLeft"] },
  my: { type: "spacing", property: ["marginTop", "marginBottom"] },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  px: { type: "spacing", property: ["paddingRight", "paddingLeft"] },
  py: { type: "spacing", property: ["paddingTop", "paddingBottom"] },
  bg: { type: "color", property: "background" },
  c: { type: "color", property: "color" },
  opacity: { type: "identity", property: "opacity" },
  ff: { type: "identity", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "identity", property: "fontWeight" },
  lts: { type: "size", property: "letterSpacing" },
  ta: { type: "identity", property: "textAlign" },
  lh: { type: "lineHeight", property: "lineHeight" },
  fs: { type: "identity", property: "fontStyle" },
  tt: { type: "identity", property: "textTransform" },
  td: { type: "identity", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "size", property: "backgroundSize" },
  bgp: { type: "identity", property: "backgroundPosition" },
  bgr: { type: "identity", property: "backgroundRepeat" },
  bga: { type: "identity", property: "backgroundAttachment" },
  pos: { type: "identity", property: "position" },
  top: { type: "identity", property: "top" },
  left: { type: "size", property: "left" },
  bottom: { type: "size", property: "bottom" },
  right: { type: "size", property: "right" },
  inset: { type: "size", property: "inset" },
  display: { type: "identity", property: "display" }
};

// node_modules/@mantine/core/esm/core/Box/style-props/parse-style-props/parse-style-props.mjs
var import_react35 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/color-resolver/color-resolver.mjs
var import_react31 = __toESM(require_react(), 1);
function colorResolver(color, theme) {
  const parsedColor = parseThemeColor({ color, theme });
  if (parsedColor.color === "dimmed") {
    return "var(--mantine-color-dimmed)";
  }
  if (parsedColor.color === "bright") {
    return "var(--mantine-color-bright)";
  }
  if (parsedColor.isThemeColor && parsedColor.shade === void 0) {
    return `var(--mantine-color-${parsedColor.color}-text)`;
  }
  return parsedColor.variable ? `var(${parsedColor.variable})` : parsedColor.color;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/font-size-resolver/font-size-resolver.mjs
var import_react32 = __toESM(require_react(), 1);
function fontSizeResolver(value, theme) {
  if (typeof value === "string" && value in theme.fontSizes) {
    return `var(--mantine-font-size-${value})`;
  }
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    return rem(value);
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/spacing-resolver/spacing-resolver.mjs
var import_react33 = __toESM(require_react(), 1);
function spacingResolver(value, theme) {
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    const mod = value.replace("-", "");
    if (!(mod in theme.spacing)) {
      return rem(value);
    }
    const variable = `--mantine-spacing-${mod}`;
    return value.startsWith("-") ? `calc(var(${variable}) * -1)` : `var(${variable})`;
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/identity-resolver/identity-resolver.mjs
function identityResolver(value) {
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/size-resolver/size-resolver.mjs
var import_react34 = __toESM(require_react(), 1);
function sizeResolver(value) {
  if (typeof value === "number") {
    return rem(value);
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/line-height-resolver/line-height-resolver.mjs
function lineHeightResolver(value, theme) {
  if (typeof value === "string" && value in theme.fontSizes) {
    return `var(--mantine-line-height-${value})`;
  }
  return value;
}

// node_modules/@mantine/core/esm/core/Box/style-props/resolvers/index.mjs
var resolvers = {
  color: colorResolver,
  fontSize: fontSizeResolver,
  spacing: spacingResolver,
  identity: identityResolver,
  size: sizeResolver,
  lineHeight: lineHeightResolver
};

// node_modules/@mantine/core/esm/core/Box/style-props/parse-style-props/sort-media-queries.mjs
function replaceMediaQuery(query) {
  return query.replace("(min-width: ", "").replace("em)", "");
}
function sortMediaQueries({
  media,
  ...props
}) {
  const breakpoints = Object.keys(media);
  const sortedMedia = breakpoints.sort((a, b) => Number(replaceMediaQuery(a)) - Number(replaceMediaQuery(b))).map((query) => ({ query, styles: media[query] }));
  return { ...props, media: sortedMedia };
}

// node_modules/@mantine/core/esm/core/Box/style-props/parse-style-props/parse-style-props.mjs
function hasResponsiveStyles(styleProp) {
  if (typeof styleProp !== "object" || styleProp === null) {
    return false;
  }
  const breakpoints = Object.keys(styleProp);
  if (breakpoints.length === 1 && breakpoints[0] === "base") {
    return false;
  }
  return true;
}
function getBaseValue2(value) {
  if (typeof value === "object" && value !== null) {
    if ("base" in value) {
      return value.base;
    }
    return void 0;
  }
  return value;
}
function getBreakpointKeys(value) {
  if (typeof value === "object" && value !== null) {
    return keys(value).filter((key) => key !== "base");
  }
  return [];
}
function getBreakpointValue2(value, breakpoint) {
  if (typeof value === "object" && value !== null && breakpoint in value) {
    return value[breakpoint];
  }
  return value;
}
function parseStyleProps({
  styleProps,
  data,
  theme
}) {
  return sortMediaQueries(
    keys(styleProps).reduce(
      (acc, styleProp) => {
        if (styleProp === "hiddenFrom" || styleProp === "visibleFrom") {
          return acc;
        }
        const propertyData = data[styleProp];
        const properties = Array.isArray(propertyData.property) ? propertyData.property : [propertyData.property];
        const baseValue = getBaseValue2(styleProps[styleProp]);
        if (!hasResponsiveStyles(styleProps[styleProp])) {
          properties.forEach((property) => {
            acc.inlineStyles[property] = resolvers[propertyData.type](baseValue, theme);
          });
          return acc;
        }
        acc.hasResponsiveStyles = true;
        const breakpoints = getBreakpointKeys(styleProps[styleProp]);
        properties.forEach((property) => {
          if (baseValue) {
            acc.styles[property] = resolvers[propertyData.type](baseValue, theme);
          }
          breakpoints.forEach((breakpoint) => {
            const bp = `(min-width: ${theme.breakpoints[breakpoint]})`;
            acc.media[bp] = {
              ...acc.media[bp],
              [property]: resolvers[propertyData.type](
                getBreakpointValue2(styleProps[styleProp], breakpoint),
                theme
              )
            };
          });
        });
        return acc;
      },
      {
        hasResponsiveStyles: false,
        styles: {},
        inlineStyles: {},
        media: {}
      }
    )
  );
}

// node_modules/@mantine/core/esm/core/Box/use-random-classname/use-random-classname.mjs
var import_react36 = __toESM(require_react(), 1);
function useRandomClassName() {
  const id = (0, import_react36.useId)().replace(/:/g, "");
  return `__m__-${id}`;
}

// node_modules/@mantine/core/esm/core/Box/get-style-object/get-style-object.mjs
function getStyleObject(style, theme) {
  if (Array.isArray(style)) {
    return [...style].reduce(
      (acc, item) => ({ ...acc, ...getStyleObject(item, theme) }),
      {}
    );
  }
  if (typeof style === "function") {
    return style(theme);
  }
  if (style == null) {
    return {};
  }
  return style;
}

// node_modules/@mantine/core/esm/core/Box/Box.mjs
var import_react37 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/core/factory/create-polymorphic-component.mjs
function createPolymorphicComponent(component) {
  return component;
}

// node_modules/@mantine/core/esm/core/Box/get-box-style/get-box-style.mjs
function mergeStyles(styles, theme) {
  if (Array.isArray(styles)) {
    return [...styles].reduce(
      (acc, item) => ({ ...acc, ...mergeStyles(item, theme) }),
      {}
    );
  }
  if (typeof styles === "function") {
    return styles(theme);
  }
  if (styles == null) {
    return {};
  }
  return styles;
}
function getBoxStyle({
  theme,
  style,
  vars,
  styleProps
}) {
  const _style = mergeStyles(style, theme);
  const _vars = mergeStyles(vars, theme);
  return { ..._style, ..._vars, ...styleProps };
}

// node_modules/@mantine/core/esm/core/Box/get-box-mod/get-box-mod.mjs
function transformModKey(key) {
  return key.startsWith("data-") ? key : `data-${key}`;
}
function getMod(props) {
  return Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    if (value === void 0 || value === "" || value === false || value === null) {
      return acc;
    }
    acc[transformModKey(key)] = props[key];
    return acc;
  }, {});
}
function getBoxMod(mod) {
  if (!mod) {
    return null;
  }
  if (typeof mod === "string") {
    return { [transformModKey(mod)]: true };
  }
  if (Array.isArray(mod)) {
    return [...mod].reduce(
      (acc, value) => ({ ...acc, ...getBoxMod(value) }),
      {}
    );
  }
  return getMod(mod);
}

// node_modules/@mantine/core/esm/core/Box/Box.mjs
var _Box = (0, import_react37.forwardRef)(
  ({
    component,
    style,
    __vars,
    className,
    variant,
    mod,
    size: size2,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    renderRoot,
    ...others
  }, ref) => {
    const theme = useMantineTheme();
    const Element2 = component || "div";
    const { styleProps, rest } = extractStyleProps(others);
    const responsiveClassName = useRandomClassName();
    const parsedStyleProps = parseStyleProps({
      styleProps,
      theme,
      data: STYlE_PROPS_DATA
    });
    const props = {
      ref,
      style: getBoxStyle({
        theme,
        style,
        vars: __vars,
        styleProps: parsedStyleProps.inlineStyles
      }),
      className: clsx_default(className, {
        [responsiveClassName]: parsedStyleProps.hasResponsiveStyles,
        "mantine-light-hidden": lightHidden,
        "mantine-dark-hidden": darkHidden,
        [`mantine-hidden-from-${hiddenFrom}`]: hiddenFrom,
        [`mantine-visible-from-${visibleFrom}`]: visibleFrom
      }),
      "data-variant": variant,
      "data-size": isNumberLike(size2) ? void 0 : size2 || void 0,
      ...getBoxMod(mod),
      ...rest
    };
    return import_react37.default.createElement(import_react37.default.Fragment, null, parsedStyleProps.hasResponsiveStyles && import_react37.default.createElement(
      InlineStyles,
      {
        selector: `.${responsiveClassName}`,
        styles: parsedStyleProps.styles,
        media: parsedStyleProps.media
      }
    ), typeof renderRoot === "function" ? renderRoot(props) : import_react37.default.createElement(Element2, { ...props }));
  }
);
_Box.displayName = "@mantine/core/Box";
var Box = createPolymorphicComponent(_Box);

// node_modules/@mantine/core/esm/core/factory/factory.mjs
var import_react38 = __toESM(require_react(), 1);
function identity(value) {
  return value;
}
function factory(ui) {
  const Component = (0, import_react38.forwardRef)(ui);
  Component.extend = identity;
  return Component;
}

// node_modules/@mantine/core/esm/core/factory/polymorphic-factory.mjs
var import_react39 = __toESM(require_react(), 1);
function polymorphicFactory(ui) {
  const Component = (0, import_react39.forwardRef)(ui);
  Component.extend = identity;
  return Component;
}

// node_modules/@mantine/core/esm/core/DirectionProvider/DirectionProvider.mjs
var import_react40 = __toESM(require_react(), 1);
var DirectionContext = (0, import_react40.createContext)({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function useDirection() {
  return (0, import_react40.useContext)(DirectionContext);
}
function DirectionProvider({
  children,
  initialDirection = "ltr",
  detectDirection = true
}) {
  const [dir, setDir] = (0, import_react40.useState)(initialDirection);
  const setDirection = (direction) => {
    setDir(direction);
    document.documentElement.setAttribute("dir", direction);
  };
  const toggleDirection = () => setDirection(dir === "ltr" ? "rtl" : "ltr");
  useIsomorphicEffect(() => {
    if (detectDirection) {
      const direction = document.documentElement.getAttribute("dir");
      if (direction === "rtl" || direction === "ltr") {
        setDirection(direction);
      }
    }
  }, []);
  return import_react40.default.createElement(DirectionContext.Provider, { value: { dir, toggleDirection, setDirection } }, children);
}

// node_modules/@mantine/core/esm/components/Collapse/Collapse.mjs
var import_react42 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Collapse/use-collapse.mjs
var import_react41 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
function getAutoHeightDuration(height) {
  if (!height || typeof height === "string") {
    return 0;
  }
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function getElementHeight(el) {
  return (el == null ? void 0 : el.current) ? el.current.scrollHeight : "auto";
}
var raf = typeof window !== "undefined" && window.requestAnimationFrame;
function useCollapse({
  transitionDuration,
  transitionTimingFunction = "ease",
  onTransitionEnd = () => {
  },
  opened
}) {
  const el = (0, import_react41.useRef)(null);
  const collapsedHeight = 0;
  const collapsedStyles = {
    display: "none",
    height: 0,
    overflow: "hidden"
  };
  const [styles, setStylesRaw] = (0, import_react41.useState)(opened ? {} : collapsedStyles);
  const setStyles = (newStyles) => {
    (0, import_react_dom.flushSync)(() => setStylesRaw(newStyles));
  };
  const mergeStyles2 = (newStyles) => {
    setStyles((oldStyles) => ({ ...oldStyles, ...newStyles }));
  };
  function getTransitionStyles2(height) {
    const _duration = transitionDuration || getAutoHeightDuration(height);
    return {
      transition: `height ${_duration}ms ${transitionTimingFunction}`
    };
  }
  useDidUpdate(() => {
    if (typeof raf === "function") {
      if (opened) {
        raf(() => {
          mergeStyles2({ willChange: "height", display: "block", overflow: "hidden" });
          raf(() => {
            const height = getElementHeight(el);
            mergeStyles2({ ...getTransitionStyles2(height), height });
          });
        });
      } else {
        raf(() => {
          const height = getElementHeight(el);
          mergeStyles2({ ...getTransitionStyles2(height), willChange: "height", height });
          raf(() => mergeStyles2({ height: collapsedHeight, overflow: "hidden" }));
        });
      }
    }
  }, [opened]);
  const handleTransitionEnd = (e) => {
    if (e.target !== el.current || e.propertyName !== "height") {
      return;
    }
    if (opened) {
      const height = getElementHeight(el);
      if (height === styles.height) {
        setStyles({});
      } else {
        mergeStyles2({ height });
      }
      onTransitionEnd();
    } else if (styles.height === collapsedHeight) {
      setStyles(collapsedStyles);
      onTransitionEnd();
    }
  };
  function getCollapseProps({ style = {}, refKey = "ref", ...rest } = {}) {
    const theirRef = rest[refKey];
    return {
      "aria-hidden": !opened,
      ...rest,
      [refKey]: mergeRefs(el, theirRef),
      onTransitionEnd: handleTransitionEnd,
      style: { boxSizing: "border-box", ...style, ...styles }
    };
  }
  return getCollapseProps;
}

// node_modules/@mantine/core/esm/components/Collapse/Collapse.mjs
var defaultProps = {
  transitionDuration: 200,
  transitionTimingFunction: "ease",
  animateOpacity: true
};
var Collapse = (0, import_react42.forwardRef)((props, ref) => {
  const {
    children,
    in: opened,
    transitionDuration,
    transitionTimingFunction,
    style,
    onTransitionEnd,
    animateOpacity,
    ...others
  } = useProps("Collapse", defaultProps, props);
  const theme = useMantineTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const duration = reduceMotion ? 0 : transitionDuration;
  const getCollapseProps = useCollapse({
    opened,
    transitionDuration: duration,
    transitionTimingFunction,
    onTransitionEnd
  });
  if (duration === 0) {
    return opened ? import_react42.default.createElement(Box, { ...others }, children) : null;
  }
  return import_react42.default.createElement(Box, { ...getCollapseProps({ style: getStyleObject(style, theme), ref, ...others }) }, import_react42.default.createElement(
    "div",
    {
      style: {
        opacity: opened || !animateOpacity ? 1 : 0,
        transition: animateOpacity ? `opacity ${duration}ms ${transitionTimingFunction}` : "none"
      }
    },
    children
  ));
});
Collapse.displayName = "@mantine/core/Collapse";

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.mjs
var import_react57 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbar.mjs
var import_react52 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.context.mjs
var import_react43 = __toESM(require_react(), 1);
var [ScrollAreaProvider, useScrollAreaContext] = createSafeContext(
  "ScrollArea.Root component was not found in tree"
);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarVisible.mjs
var import_react48 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollbarX.mjs
var import_react46 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/Scrollbar.mjs
var import_react45 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ScrollArea/use-resize-observer.mjs
function useResizeObserver2(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useIsomorphicEffect(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
    return void 0;
  }, [element, handleResize]);
}

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/Scrollbar.context.mjs
var import_react44 = __toESM(require_react(), 1);
var [ScrollbarProvider, useScrollbarContext] = createSafeContext(
  "ScrollAreaScrollbar was not found in tree"
);

// node_modules/@mantine/core/esm/components/ScrollArea/utils/compose-event-handlers.mjs
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return (event) => {
    originalEventHandler == null ? void 0 : originalEventHandler(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      ourEventHandler == null ? void 0 : ourEventHandler(event);
    }
  };
}

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/Scrollbar.mjs
var Scrollbar = (0, import_react45.forwardRef)((props, forwardedRef) => {
  const {
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext();
  const [scrollbar, setScrollbar] = import_react45.default.useState(null);
  const composeRefs = useMergedRef(forwardedRef, (node) => setScrollbar(node));
  const rectRef = import_react45.default.useRef(null);
  const prevWebkitUserSelectRef = import_react45.default.useRef("");
  const { viewport } = context;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  const handleDragScroll = (event) => {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  };
  (0, import_react45.useEffect)(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel)
        handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  (0, import_react45.useEffect)(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver2(scrollbar, handleResize);
  useResizeObserver2(context.content, handleResize);
  return import_react45.default.createElement(
    ScrollbarProvider,
    {
      value: {
        scrollbar,
        hasThumb,
        onThumbChange: useCallbackRef(onThumbChange),
        onThumbPointerUp: useCallbackRef(onThumbPointerUp),
        onThumbPositionChange: handleThumbPositionChange,
        onThumbPointerDown: useCallbackRef(onThumbPointerDown)
      }
    },
    import_react45.default.createElement(
      "div",
      {
        ...scrollbarProps,
        ref: composeRefs,
        style: { position: "absolute", ...scrollbarProps.style },
        onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
          const mainPointer = 0;
          if (event.button === mainPointer) {
            const element = event.target;
            element.setPointerCapture(event.pointerId);
            rectRef.current = scrollbar.getBoundingClientRect();
            prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
            document.body.style.webkitUserSelect = "none";
            handleDragScroll(event);
          }
        }),
        onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
        onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
          const element = event.target;
          if (element.hasPointerCapture(event.pointerId)) {
            element.releasePointerCapture(event.pointerId);
          }
          document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
          rectRef.current = null;
        })
      }
    )
  );
});

// node_modules/@mantine/core/esm/components/ScrollArea/utils/is-scrolling-within-scrollbar-bounds.mjs
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}

// node_modules/@mantine/core/esm/components/ScrollArea/utils/get-thumb-ratio.mjs
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return Number.isNaN(ratio) ? 0 : ratio;
}

// node_modules/@mantine/core/esm/components/ScrollArea/utils/get-thumb-size.mjs
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}

// node_modules/@mantine/core/esm/components/ScrollArea/utils/to-int.mjs
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollbarX.mjs
var ScrollAreaScrollbarX = (0, import_react46.forwardRef)(
  (props, forwardedRef) => {
    const { sizes, onSizesChange, style, ...others } = props;
    const ctx = useScrollAreaContext();
    const [computedStyle, setComputedStyle] = (0, import_react46.useState)();
    const ref = (0, import_react46.useRef)(null);
    const composeRefs = useMergedRef(forwardedRef, ref, ctx.onScrollbarXChange);
    (0, import_react46.useEffect)(() => {
      if (ref.current)
        setComputedStyle(getComputedStyle(ref.current));
    }, [ref]);
    return import_react46.default.createElement(
      Scrollbar,
      {
        "data-orientation": "horizontal",
        ...others,
        ref: composeRefs,
        sizes,
        style: {
          ...style,
          ["--sa-thumb-width"]: `${getThumbSize(sizes)}px`
        },
        onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
        onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
        onWheelScroll: (event, maxScrollPos) => {
          if (ctx.viewport) {
            const scrollPos = ctx.viewport.scrollLeft + event.deltaX;
            props.onWheelScroll(scrollPos);
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
              event.preventDefault();
            }
          }
        },
        onResize: () => {
          if (ref.current && ctx.viewport && computedStyle) {
            onSizesChange({
              content: ctx.viewport.scrollWidth,
              viewport: ctx.viewport.offsetWidth,
              scrollbar: {
                size: ref.current.clientWidth,
                paddingStart: toInt(computedStyle.paddingLeft),
                paddingEnd: toInt(computedStyle.paddingRight)
              }
            });
          }
        }
      }
    );
  }
);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollbarY.mjs
var import_react47 = __toESM(require_react(), 1);
var ScrollAreaScrollbarY = (0, import_react47.forwardRef)(
  (props, forwardedRef) => {
    const { sizes, onSizesChange, style, ...others } = props;
    const context = useScrollAreaContext();
    const [computedStyle, setComputedStyle] = import_react47.default.useState();
    const ref = (0, import_react47.useRef)(null);
    const composeRefs = useMergedRef(forwardedRef, ref, context.onScrollbarYChange);
    (0, import_react47.useEffect)(() => {
      if (ref.current)
        setComputedStyle(getComputedStyle(ref.current));
    }, [ref]);
    return import_react47.default.createElement(
      Scrollbar,
      {
        ...others,
        "data-orientation": "vertical",
        ref: composeRefs,
        sizes,
        style: {
          ["--sa-thumb-height"]: `${getThumbSize(sizes)}px`,
          ...style
        },
        onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
        onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
        onWheelScroll: (event, maxScrollPos) => {
          if (context.viewport) {
            const scrollPos = context.viewport.scrollTop + event.deltaY;
            props.onWheelScroll(scrollPos);
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
              event.preventDefault();
            }
          }
        },
        onResize: () => {
          if (ref.current && context.viewport && computedStyle) {
            onSizesChange({
              content: context.viewport.scrollHeight,
              viewport: context.viewport.offsetHeight,
              scrollbar: {
                size: ref.current.clientHeight,
                paddingStart: toInt(computedStyle.paddingTop),
                paddingEnd: toInt(computedStyle.paddingBottom)
              }
            });
          }
        }
      }
    );
  }
);

// node_modules/@mantine/core/esm/components/ScrollArea/utils/linear-scale.mjs
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}

// node_modules/@mantine/core/esm/components/ScrollArea/utils/get-thumb-offset-from-scroll.mjs
function clamp2(value, [min2, max2]) {
  return Math.min(max2, Math.max(min2, value));
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp2(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}

// node_modules/@mantine/core/esm/components/ScrollArea/utils/get-scroll-position-from-pointer.mjs
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset2 = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset2;
  const minPointerPos = sizes.scrollbar.paddingStart + offset2;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarVisible.mjs
var ScrollAreaScrollbarVisible = (0, import_react48.forwardRef)((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const { dir } = useDirection();
  const context = useScrollAreaContext();
  const thumbRef = (0, import_react48.useRef)(null);
  const pointerOffsetRef = (0, import_react48.useRef)(0);
  const [sizes, setSizes] = (0, import_react48.useState)({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => {
      thumbRef.current = thumb;
    },
    onThumbPointerUp: () => {
      pointerOffsetRef.current = 0;
    },
    onThumbPointerDown: (pointerPos) => {
      pointerOffsetRef.current = pointerPos;
    }
  };
  const getScrollPosition = (pointerPos, direction) => getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, direction);
  if (orientation === "horizontal") {
    return import_react48.default.createElement(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset2 = getThumbOffsetFromScroll(scrollPos, sizes, dir);
            thumbRef.current.style.transform = `translate3d(${offset2}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport)
            context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return import_react48.default.createElement(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset2 = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset2}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport)
            context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport)
            context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarHover.mjs
var import_react50 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarAuto.mjs
var import_react49 = __toESM(require_react(), 1);
var ScrollAreaScrollbarAuto = (0, import_react49.forwardRef)(
  (props, ref) => {
    const context = useScrollAreaContext();
    const { forceMount, ...scrollbarProps } = props;
    const [visible, setVisible] = (0, import_react49.useState)(false);
    const isHorizontal = props.orientation === "horizontal";
    const handleResize = useDebounceCallback(() => {
      if (context.viewport) {
        const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
        const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
        setVisible(isHorizontal ? isOverflowX : isOverflowY);
      }
    }, 10);
    useResizeObserver2(context.viewport, handleResize);
    useResizeObserver2(context.content, handleResize);
    if (forceMount || visible) {
      return import_react49.default.createElement(
        ScrollAreaScrollbarVisible,
        {
          "data-state": visible ? "visible" : "hidden",
          ...scrollbarProps,
          ref
        }
      );
    }
    return null;
  }
);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarHover.mjs
var ScrollAreaScrollbarHover = (0, import_react50.forwardRef)(
  (props, ref) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext();
    const [visible, setVisible] = (0, import_react50.useState)(false);
    (0, import_react50.useEffect)(() => {
      const { scrollArea } = context;
      let hideTimer = 0;
      if (scrollArea) {
        const handlePointerEnter = () => {
          window.clearTimeout(hideTimer);
          setVisible(true);
        };
        const handlePointerLeave = () => {
          hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
        };
        scrollArea.addEventListener("pointerenter", handlePointerEnter);
        scrollArea.addEventListener("pointerleave", handlePointerLeave);
        return () => {
          window.clearTimeout(hideTimer);
          scrollArea.removeEventListener("pointerenter", handlePointerEnter);
          scrollArea.removeEventListener("pointerleave", handlePointerLeave);
        };
      }
      return void 0;
    }, [context.scrollArea, context.scrollHideDelay]);
    if (forceMount || visible) {
      return import_react50.default.createElement(
        ScrollAreaScrollbarAuto,
        {
          "data-state": visible ? "visible" : "hidden",
          ...scrollbarProps,
          ref
        }
      );
    }
    return null;
  }
);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarScroll.mjs
var import_react51 = __toESM(require_react(), 1);
var ScrollAreaScrollbarScroll = (0, import_react51.forwardRef)(
  (props, red) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext();
    const isHorizontal = props.orientation === "horizontal";
    const [state, setState] = (0, import_react51.useState)("hidden");
    const debounceScrollEnd = useDebounceCallback(() => setState("idle"), 100);
    (0, import_react51.useEffect)(() => {
      if (state === "idle") {
        const hideTimer = window.setTimeout(() => setState("hidden"), context.scrollHideDelay);
        return () => window.clearTimeout(hideTimer);
      }
      return void 0;
    }, [state, context.scrollHideDelay]);
    (0, import_react51.useEffect)(() => {
      const { viewport } = context;
      const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
      if (viewport) {
        let prevScrollPos = viewport[scrollDirection];
        const handleScroll2 = () => {
          const scrollPos = viewport[scrollDirection];
          const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
          if (hasScrollInDirectionChanged) {
            setState("scrolling");
            debounceScrollEnd();
          }
          prevScrollPos = scrollPos;
        };
        viewport.addEventListener("scroll", handleScroll2);
        return () => viewport.removeEventListener("scroll", handleScroll2);
      }
      return void 0;
    }, [context.viewport, isHorizontal, debounceScrollEnd]);
    if (forceMount || state !== "hidden") {
      return import_react51.default.createElement(
        ScrollAreaScrollbarVisible,
        {
          "data-state": state === "hidden" ? "hidden" : "visible",
          ...scrollbarProps,
          ref: red,
          onPointerEnter: composeEventHandlers(props.onPointerEnter, () => setState("interacting")),
          onPointerLeave: composeEventHandlers(props.onPointerLeave, () => setState("idle"))
        }
      );
    }
    return null;
  }
);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbar.mjs
var ScrollAreaScrollbar = import_react52.default.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext();
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    import_react52.default.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? import_react52.default.createElement(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? import_react52.default.createElement(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? import_react52.default.createElement(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? import_react52.default.createElement(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaCorner/ScrollAreaCorner.mjs
var import_react53 = __toESM(require_react(), 1);
var Corner = import_react53.default.forwardRef((props, ref) => {
  const { style, ...others } = props;
  const ctx = useScrollAreaContext();
  const [width, setWidth] = import_react53.default.useState(0);
  const [height, setHeight] = import_react53.default.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver2(ctx.scrollbarX, () => {
    var _a;
    const h = ((_a = ctx.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    ctx.onCornerHeightChange(h);
    setHeight(h);
  });
  useResizeObserver2(ctx.scrollbarY, () => {
    var _a;
    const w = ((_a = ctx.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    ctx.onCornerWidthChange(w);
    setWidth(w);
  });
  return hasSize ? import_react53.default.createElement("div", { ...others, ref, style: { ...style, width, height } }) : null;
});
var ScrollAreaCorner = import_react53.default.forwardRef(
  (props, ref) => {
    const ctx = useScrollAreaContext();
    const hasBothScrollbarsVisible = Boolean(ctx.scrollbarX && ctx.scrollbarY);
    const hasCorner = ctx.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? import_react53.default.createElement(Corner, { ...props, ref }) : null;
  }
);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaRoot/ScrollAreaRoot.mjs
var import_react54 = __toESM(require_react(), 1);
var defaultProps2 = {
  scrollHideDelay: 1e3,
  type: "hover"
};
var ScrollAreaRoot = (0, import_react54.forwardRef)((_props, ref) => {
  const props = useProps("ScrollAreaRoot", defaultProps2, _props);
  const { type, scrollHideDelay, ...others } = props;
  const [scrollArea, setScrollArea] = (0, import_react54.useState)(null);
  const [viewport, setViewport] = (0, import_react54.useState)(null);
  const [content, setContent] = (0, import_react54.useState)(null);
  const [scrollbarX, setScrollbarX] = (0, import_react54.useState)(null);
  const [scrollbarY, setScrollbarY] = (0, import_react54.useState)(null);
  const [cornerWidth, setCornerWidth] = (0, import_react54.useState)(0);
  const [cornerHeight, setCornerHeight] = (0, import_react54.useState)(0);
  const [scrollbarXEnabled, setScrollbarXEnabled] = (0, import_react54.useState)(false);
  const [scrollbarYEnabled, setScrollbarYEnabled] = (0, import_react54.useState)(false);
  const rootRef = useMergedRef(ref, (node) => setScrollArea(node));
  return import_react54.default.createElement(
    ScrollAreaProvider,
    {
      value: {
        type,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight
      }
    },
    import_react54.default.createElement(
      Box,
      {
        ...others,
        ref: rootRef,
        __vars: {
          "--sa-corner-width": `${cornerWidth}px`,
          "--sa-corner-height": `${cornerHeight}px`
        }
      }
    )
  );
});
ScrollAreaRoot.displayName = "@mantine/core/ScrollAreaRoot";

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaViewport/ScrollAreaViewport.mjs
var import_react55 = __toESM(require_react(), 1);
var ScrollAreaViewport = (0, import_react55.forwardRef)(
  ({ children, style, ...others }, ref) => {
    const ctx = useScrollAreaContext();
    const rootRef = useMergedRef(ref, ctx.onViewportChange);
    return import_react55.default.createElement(
      Box,
      {
        ...others,
        ref: rootRef,
        style: {
          overflowX: ctx.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: ctx.scrollbarYEnabled ? "scroll" : "hidden",
          ...style
        }
      },
      import_react55.default.createElement("div", { style: { minWidth: "100%", display: "table" }, ref: ctx.onContentChange }, children)
    );
  }
);
ScrollAreaViewport.displayName = "@mantine/core/ScrollAreaViewport";

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.module.css.mjs
var classes = { "root": "m-d57069b5", "viewport": "m-c0783ff9", "viewportInner": "m-f8f631dd", "scrollbar": "m-c44ba933", "thumb": "m-d8b5e363", "corner": "m-21657268" };

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaThumb/ScrollAreaThumb.mjs
var import_react56 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ScrollArea/utils/add-unlinked-scroll-listener.mjs
function addUnlinkedScrollListener(node, handler = () => {
}) {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll)
      handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
}

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollAreaThumb/ScrollAreaThumb.mjs
var Thumb = (0, import_react56.forwardRef)((props, forwardedRef) => {
  const { style, ...others } = props;
  const scrollAreaContext = useScrollAreaContext();
  const scrollbarContext = useScrollbarContext();
  const { onThumbPositionChange } = scrollbarContext;
  const composedRef = useMergedRef(forwardedRef, (node) => scrollbarContext.onThumbChange(node));
  const removeUnlinkedScrollListenerRef = (0, import_react56.useRef)();
  const debounceScrollEnd = useDebounceCallback(() => {
    if (removeUnlinkedScrollListenerRef.current) {
      removeUnlinkedScrollListenerRef.current();
      removeUnlinkedScrollListenerRef.current = void 0;
    }
  }, 100);
  (0, import_react56.useEffect)(() => {
    const { viewport } = scrollAreaContext;
    if (viewport) {
      const handleScroll2 = () => {
        debounceScrollEnd();
        if (!removeUnlinkedScrollListenerRef.current) {
          const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
          removeUnlinkedScrollListenerRef.current = listener;
          onThumbPositionChange();
        }
      };
      onThumbPositionChange();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
    return void 0;
  }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
  return import_react56.default.createElement(
    "div",
    {
      "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
      ...others,
      ref: composedRef,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...style
      },
      onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
        const thumb = event.target;
        const thumbRect = thumb.getBoundingClientRect();
        const x = event.clientX - thumbRect.left;
        const y = event.clientY - thumbRect.top;
        scrollbarContext.onThumbPointerDown({ x, y });
      }),
      onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
    }
  );
});
var ScrollAreaThumb = import_react56.default.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext();
    if (forceMount || scrollbarContext.hasThumb) {
      return import_react56.default.createElement(Thumb, { ref: forwardedRef, ...thumbProps });
    }
    return null;
  }
);

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.mjs
var defaultProps3 = {
  scrollHideDelay: 1e3,
  type: "hover"
};
var varsResolver = createVarsResolver((_, { scrollbarSize }) => ({
  root: {
    "--scrollarea-scrollbar-size": rem(scrollbarSize)
  }
}));
var ScrollArea = factory((_props, ref) => {
  const props = useProps("ScrollArea", defaultProps3, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    scrollbarSize,
    vars,
    type,
    scrollHideDelay,
    viewportProps,
    viewportRef,
    onScrollPositionChange,
    children,
    offsetScrollbars,
    ...others
  } = props;
  const [scrollbarHovered, setScrollbarHovered] = (0, import_react57.useState)(false);
  const getStyles2 = useStyles({
    name: "ScrollArea",
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver
  });
  return import_react57.default.createElement(
    ScrollAreaRoot,
    {
      type: type === "never" ? "always" : type,
      scrollHideDelay,
      ref,
      ...getStyles2("root"),
      ...others
    },
    import_react57.default.createElement(
      ScrollAreaViewport,
      {
        ...viewportProps,
        ...getStyles2("viewport"),
        ref: viewportRef,
        "data-offset-scrollbars": offsetScrollbars === true ? "xy" : offsetScrollbars || void 0,
        onScroll: typeof onScrollPositionChange === "function" ? ({ currentTarget }) => onScrollPositionChange({
          x: currentTarget.scrollLeft,
          y: currentTarget.scrollTop
        }) : void 0
      },
      children
    ),
    import_react57.default.createElement(
      ScrollAreaScrollbar,
      {
        ...getStyles2("scrollbar"),
        orientation: "horizontal",
        "data-hidden": type === "never" || void 0,
        forceMount: true,
        onMouseEnter: () => setScrollbarHovered(true),
        onMouseLeave: () => setScrollbarHovered(false)
      },
      import_react57.default.createElement(ScrollAreaThumb, { ...getStyles2("thumb") })
    ),
    import_react57.default.createElement(
      ScrollAreaScrollbar,
      {
        ...getStyles2("scrollbar"),
        orientation: "vertical",
        "data-hidden": type === "never" || void 0,
        forceMount: true,
        onMouseEnter: () => setScrollbarHovered(true),
        onMouseLeave: () => setScrollbarHovered(false)
      },
      import_react57.default.createElement(ScrollAreaThumb, { ...getStyles2("thumb") })
    ),
    import_react57.default.createElement(
      ScrollAreaCorner,
      {
        ...getStyles2("corner"),
        "data-hovered": scrollbarHovered || void 0,
        "data-hidden": type === "never" || void 0
      }
    )
  );
});
ScrollArea.displayName = "@mantine/core/ScrollArea";
var ScrollAreaAutosize = factory((props, ref) => {
  const {
    children,
    classNames,
    styles,
    scrollbarSize,
    scrollHideDelay,
    type,
    dir,
    offsetScrollbars,
    viewportRef,
    onScrollPositionChange,
    unstyled,
    variant,
    viewportProps,
    style,
    vars,
    ...others
  } = useProps("ScrollAreaAutosize", defaultProps3, props);
  return import_react57.default.createElement(Box, { ...others, ref, style: [{ display: "flex" }, style] }, import_react57.default.createElement(Box, { style: { display: "flex", flexDirection: "column", flex: 1 } }, import_react57.default.createElement(
    ScrollArea,
    {
      classNames,
      styles,
      scrollHideDelay,
      scrollbarSize,
      type,
      dir,
      offsetScrollbars,
      viewportRef,
      onScrollPositionChange,
      unstyled,
      variant,
      viewportProps,
      vars
    },
    children
  )));
});
ScrollArea.classes = classes;
ScrollAreaAutosize.displayName = "@mantine/core/ScrollAreaAutosize";
ScrollAreaAutosize.classes = classes;
ScrollArea.Autosize = ScrollAreaAutosize;

// node_modules/@mantine/core/esm/components/UnstyledButton/UnstyledButton.mjs
var import_react58 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/UnstyledButton/UnstyledButton.module.css.mjs
var classes2 = { "root": "m-87cf2631" };

// node_modules/@mantine/core/esm/components/UnstyledButton/UnstyledButton.mjs
var defaultProps4 = {
  __staticSelector: "UnstyledButton"
};
var UnstyledButton = polymorphicFactory(
  (_props, ref) => {
    const props = useProps("UnstyledButton", defaultProps4, _props);
    const {
      className,
      component = "button",
      __staticSelector,
      unstyled,
      classNames,
      styles,
      style,
      ...others
    } = props;
    const getStyles2 = useStyles({
      name: __staticSelector,
      props,
      classes: classes2,
      className,
      style,
      classNames,
      styles,
      unstyled
    });
    return import_react58.default.createElement(
      Box,
      {
        ...getStyles2("root", { focusable: true }),
        component,
        ref,
        type: component === "button" ? "button" : void 0,
        ...others
      }
    );
  }
);
UnstyledButton.classes = classes2;
UnstyledButton.displayName = "@mantine/core/UnstyledButton";

// node_modules/@mantine/core/esm/components/VisuallyHidden/VisuallyHidden.mjs
var import_react59 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/VisuallyHidden/VisuallyHidden.module.css.mjs
var classes3 = { "root": "m-515a97f8" };

// node_modules/@mantine/core/esm/components/VisuallyHidden/VisuallyHidden.mjs
var defaultProps5 = {};
var VisuallyHidden = factory((_props, ref) => {
  const props = useProps("VisuallyHidden", defaultProps5, _props);
  const { classNames, className, style, styles, unstyled, vars, ...others } = props;
  const getStyles2 = useStyles({
    name: "VisuallyHidden",
    classes: classes3,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled
  });
  return import_react59.default.createElement(Box, { component: "span", ref, ...getStyles2("root"), ...others });
});
VisuallyHidden.classes = classes3;
VisuallyHidden.displayName = "@mantine/core/VisuallyHidden";

// node_modules/@mantine/core/esm/components/Paper/Paper.mjs
var import_react60 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Paper/Paper.module.css.mjs
var classes4 = { "root": "m-1b7284a3" };

// node_modules/@mantine/core/esm/components/Paper/Paper.mjs
var defaultProps6 = {};
var varsResolver2 = createVarsResolver((_, { radius, shadow }) => ({
  root: {
    "--paper-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--paper-shadow": getShadow(shadow)
  }
}));
var Paper = polymorphicFactory((_props, ref) => {
  const props = useProps("Paper", defaultProps6, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    withBorder,
    vars,
    radius,
    shadow,
    variant,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Paper",
    props,
    classes: classes4,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver2
  });
  return import_react60.default.createElement(
    Box,
    {
      ref,
      mod: { "data-with-border": withBorder },
      ...getStyles2("root"),
      variant,
      ...others
    }
  );
});
Paper.classes = classes4;
Paper.displayName = "@mantine/core/Paper";

// node_modules/@mantine/core/esm/components/Popover/Popover.mjs
var import_react79 = __toESM(require_react(), 1);

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp3(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp3(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center != offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getBoundingRect(rects) {
  const minX = min(...rects.map((rect) => rect.left));
  const minY = min(...rects.map((rect) => rect.top));
  const maxX = max(...rects.map((rect) => rect.right));
  const maxY = max(...rects.map((rect) => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map((rect) => rectToClientRect(getBoundingRect(rect)));
}
var inline = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "inline",
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform: platform2,
        strategy
      } = state;
      const {
        padding = 2,
        x,
        y
      } = evaluate(options, state);
      const nativeClientRects = Array.from(await (platform2.getClientRects == null ? void 0 : platform2.getClientRects(elements.reference)) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect2() {
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          return clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === "y") {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === "top";
            const top2 = firstRect.top;
            const bottom2 = lastRect.bottom;
            const left2 = isTop ? firstRect.left : lastRect.left;
            const right2 = isTop ? firstRect.right : lastRect.right;
            const width2 = right2 - left2;
            const height2 = bottom2 - top2;
            return {
              top: top2,
              bottom: bottom2,
              left: left2,
              right: right2,
              width: width2,
              height: height2,
              x: left2,
              y: top2
            };
          }
          const isLeftSide = getSide(placement) === "left";
          const maxRight = max(...clientRects.map((rect) => rect.right));
          const minLeft = min(...clientRects.map((rect) => rect.left));
          const measureRects = clientRects.filter((rect) => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform2.getElementRects({
        reference: {
          getBoundingClientRect: getBoundingClientRect2
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp3(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp3(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset2 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset2, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = ["top", "left"].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dom/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode2(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode2(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode2(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement2(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle2(element);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement2(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement2(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement2(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement2(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement2(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement2(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement2(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement2(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  return getCssDimensions(element);
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const window2 = getWindow(element);
  if (!isHTMLElement(element)) {
    return window2;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var getElementRects = async function(_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...await getDimensionsFn(floating)
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: isElement2,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId2;
  const root = getDocumentElement(element);
  function cleanup() {
    clearTimeout(timeoutId2);
    io && io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId2 = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver && resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var React37 = __toESM(require_react(), 1);
var import_react61 = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);
var arrow2 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === "function" ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      } else if (element) {
        return arrow({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
var index = typeof document !== "undefined" ? import_react61.useLayoutEffect : import_react61.useEffect;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length, i, keys2;
  if (a && b && typeof a == "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys2 = Object.keys(a);
    length = keys2.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys2[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys2[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React37.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React37.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React37.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React37.useState(null);
  const [_floating, _setFloating] = React37.useState(null);
  const setReference = React37.useCallback((node) => {
    if (node != referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, [_setReference]);
  const setFloating = React37.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, [_setFloating]);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React37.useRef(null);
  const floatingRef = React37.useRef(null);
  const dataRef = React37.useRef(data);
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const update = React37.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        isPositioned: true
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React37.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl)
      referenceRef.current = referenceEl;
    if (floatingEl)
      floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      } else {
        update();
      }
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef]);
  const refs = React37.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React37.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React37.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React37.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}

// node_modules/@floating-ui/react/dist/floating-ui.react.esm.js
var React38 = __toESM(require_react());
var import_react62 = __toESM(require_react());

// node_modules/tabbable/dist/index.esm.js
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");

// node_modules/@floating-ui/react/dist/floating-ui.react.esm.js
var import_react_dom4 = __toESM(require_react_dom());
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var index2 = typeof document !== "undefined" ? import_react62.useLayoutEffect : import_react62.useEffect;
var serverHandoffComplete = false;
var count = 0;
var genId = () => "floating-ui-" + count++;
function useFloatingId() {
  const [id, setId] = React38.useState(() => serverHandoffComplete ? genId() : void 0);
  index2(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  React38.useEffect(() => {
    if (!serverHandoffComplete) {
      serverHandoffComplete = true;
    }
  }, []);
  return id;
}
var useReactId = React38["useId".toString()];
var useId3 = useReactId || useFloatingId;
var FloatingArrow = React38.forwardRef(function FloatingArrow2(_ref, ref) {
  let {
    context: {
      placement,
      elements: {
        floating
      },
      middlewareData: {
        arrow: arrow3
      }
    },
    width = 14,
    height = 7,
    tipRadius = 0,
    strokeWidth = 0,
    staticOffset,
    stroke,
    d,
    style: {
      transform,
      ...restStyle
    } = {},
    ...rest
  } = _ref;
  if (true) {
    if (!ref) {
      console.warn("Floating UI: The `ref` prop is required for the `FloatingArrow`", "component.");
    }
  }
  const clipPathId = useId3();
  if (!floating) {
    return null;
  }
  strokeWidth *= 2;
  const halfStrokeWidth = strokeWidth / 2;
  const svgX = width / 2 * (tipRadius / -8 + 1);
  const svgY = height / 2 * tipRadius / 4;
  const [side, alignment] = placement.split("-");
  const isRTL2 = platform.isRTL(floating);
  const isCustomShape = !!d;
  const isVerticalSide = side === "top" || side === "bottom";
  const yOffsetProp = staticOffset && alignment === "end" ? "bottom" : "top";
  let xOffsetProp = staticOffset && alignment === "end" ? "right" : "left";
  if (staticOffset && isRTL2) {
    xOffsetProp = alignment === "end" ? "left" : "right";
  }
  const arrowX = (arrow3 == null ? void 0 : arrow3.x) != null ? staticOffset || arrow3.x : "";
  const arrowY = (arrow3 == null ? void 0 : arrow3.y) != null ? staticOffset || arrow3.y : "";
  const dValue = d || "M0,0" + (" H" + width) + (" L" + (width - svgX) + "," + (height - svgY)) + (" Q" + width / 2 + "," + height + " " + svgX + "," + (height - svgY)) + " Z";
  const rotation = {
    top: isCustomShape ? "rotate(180deg)" : "",
    left: isCustomShape ? "rotate(90deg)" : "rotate(-90deg)",
    bottom: isCustomShape ? "" : "rotate(180deg)",
    right: isCustomShape ? "rotate(-90deg)" : "rotate(90deg)"
  }[side];
  return React38.createElement("svg", _extends({}, rest, {
    "aria-hidden": true,
    ref,
    width: isCustomShape ? width : width + strokeWidth,
    height: width,
    viewBox: "0 0 " + width + " " + (height > width ? height : width),
    style: {
      position: "absolute",
      pointerEvents: "none",
      [xOffsetProp]: arrowX,
      [yOffsetProp]: arrowY,
      [side]: isVerticalSide || isCustomShape ? "100%" : "calc(100% - " + strokeWidth / 2 + "px)",
      transform: "" + rotation + (transform != null ? transform : ""),
      ...restStyle
    }
  }), strokeWidth > 0 && React38.createElement("path", {
    clipPath: "url(#" + clipPathId + ")",
    fill: "none",
    stroke,
    strokeWidth: strokeWidth + (d ? 0 : 1),
    d: dValue
  }), React38.createElement("path", {
    stroke: strokeWidth && !d ? rest.fill : "none",
    d: dValue
  }), React38.createElement("clipPath", {
    id: clipPathId
  }, React38.createElement("rect", {
    x: -halfStrokeWidth,
    y: halfStrokeWidth * (isCustomShape ? -1 : 1),
    width: width + strokeWidth,
    height: width
  })));
});
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null ? void 0 : _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter((l) => l !== listener)) || []);
    }
  };
}
var FloatingNodeContext = React38.createContext(null);
var FloatingTreeContext = React38.createContext(null);
var useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = React38.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
var useFloatingTree = () => React38.useContext(FloatingTreeContext);
function getDocument(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
}
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function getUserAgent() {
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map((_ref) => {
      let {
        brand,
        version
      } = _ref;
      return brand + "/" + version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function getWindow2(value) {
  return getDocument(value).defaultView || window;
}
function isElement3(value) {
  return value ? value instanceof Element || value instanceof getWindow2(value).Element : false;
}
function isHTMLElement2(value) {
  return value ? value instanceof HTMLElement || value instanceof getWindow2(value).HTMLElement : false;
}
function isShadowRoot2(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  const OwnElement = getWindow2(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true;
  }
  const androidRe = /Android/i;
  if ((androidRe.test(getPlatform()) || androidRe.test(getUserAgent())) && event.pointerType) {
    return event.type === "click" && event.buttons === 1;
  }
  return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
  return event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType !== "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0;
}
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function isMouseLikePointerType(pointerType, strict) {
  const values = ["mouse", "pen"];
  if (!strict) {
    values.push("", void 0);
  }
  return values.includes(pointerType);
}
function isReactEvent(event) {
  return "nativeEvent" in event;
}
function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  }
  if (rootNode && isShadowRoot2(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
function useLatestRef2(value) {
  const ref = (0, import_react62.useRef)(value);
  index2(() => {
    ref.current = value;
  });
  return ref;
}
var safePolygonIdentifier = createAttribute("safe-polygon");
function getDelay(value, prop, pointerType) {
  if (pointerType && !isMouseLikePointerType(pointerType)) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  return value == null ? void 0 : value[prop];
}
function useHover(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    elements: {
      domReference,
      floating
    },
    refs
  } = context;
  const {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true
  } = props;
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const handleCloseRef = useLatestRef2(handleClose);
  const delayRef = useLatestRef2(delay);
  const pointerTypeRef = React38.useRef();
  const timeoutRef = React38.useRef();
  const handlerRef = React38.useRef();
  const restTimeoutRef = React38.useRef();
  const blockMouseMoveRef = React38.useRef(true);
  const performedPointerEventsMutationRef = React38.useRef(false);
  const unbindMouseMoveRef = React38.useRef(() => {
  });
  const isHoverOpen = React38.useCallback(() => {
    var _dataRef$current$open;
    const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
    return (type == null ? void 0 : type.includes("mouse")) && type !== "mousedown";
  }, [dataRef]);
  React38.useEffect(() => {
    if (!enabled) {
      return;
    }
    function onDismiss() {
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      blockMouseMoveRef.current = true;
    }
    events.on("dismiss", onDismiss);
    return () => {
      events.off("dismiss", onDismiss);
    };
  }, [enabled, events]);
  React38.useEffect(() => {
    if (!enabled || !handleCloseRef.current || !open) {
      return;
    }
    function onLeave(event) {
      if (isHoverOpen()) {
        onOpenChange(false, event);
      }
    }
    const html = getDocument(floating).documentElement;
    html.addEventListener("mouseleave", onLeave);
    return () => {
      html.removeEventListener("mouseleave", onLeave);
    };
  }, [floating, open, onOpenChange, enabled, handleCloseRef, dataRef, isHoverOpen]);
  const closeWithDelay = React38.useCallback(function(event, runElseBranch) {
    if (runElseBranch === void 0) {
      runElseBranch = true;
    }
    const closeDelay = getDelay(delayRef.current, "close", pointerTypeRef.current);
    if (closeDelay && !handlerRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onOpenChange(false, event), closeDelay);
    } else if (runElseBranch) {
      clearTimeout(timeoutRef.current);
      onOpenChange(false, event);
    }
  }, [delayRef, onOpenChange]);
  const cleanupMouseMoveHandler = React38.useCallback(() => {
    unbindMouseMoveRef.current();
    handlerRef.current = void 0;
  }, []);
  const clearPointerEvents = React38.useCallback(() => {
    if (performedPointerEventsMutationRef.current) {
      const body = getDocument(refs.floating.current).body;
      body.style.pointerEvents = "";
      body.removeAttribute(safePolygonIdentifier);
      performedPointerEventsMutationRef.current = false;
    }
  }, [refs]);
  React38.useEffect(() => {
    if (!enabled) {
      return;
    }
    function isClickLikeOpenEvent() {
      return dataRef.current.openEvent ? ["click", "mousedown"].includes(dataRef.current.openEvent.type) : false;
    }
    function onMouseEnter(event) {
      clearTimeout(timeoutRef.current);
      blockMouseMoveRef.current = false;
      if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current) || restMs > 0 && getDelay(delayRef.current, "open") === 0) {
        return;
      }
      const openDelay = getDelay(delayRef.current, "open", pointerTypeRef.current);
      if (openDelay) {
        timeoutRef.current = setTimeout(() => {
          onOpenChange(true, event);
        }, openDelay);
      } else {
        onOpenChange(true, event);
      }
    }
    function onMouseLeave(event) {
      if (isClickLikeOpenEvent()) {
        return;
      }
      unbindMouseMoveRef.current();
      const doc = getDocument(floating);
      clearTimeout(restTimeoutRef.current);
      if (handleCloseRef.current) {
        if (!open) {
          clearTimeout(timeoutRef.current);
        }
        handlerRef.current = handleCloseRef.current({
          ...context,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            closeWithDelay(event);
          }
        });
        const handler = handlerRef.current;
        doc.addEventListener("mousemove", handler);
        unbindMouseMoveRef.current = () => {
          doc.removeEventListener("mousemove", handler);
        };
        return;
      }
      const shouldClose = pointerTypeRef.current === "touch" ? !contains(floating, event.relatedTarget) : true;
      if (shouldClose) {
        closeWithDelay(event);
      }
    }
    function onScrollMouseLeave(event) {
      if (isClickLikeOpenEvent()) {
        return;
      }
      handleCloseRef.current == null ? void 0 : handleCloseRef.current({
        ...context,
        tree,
        x: event.clientX,
        y: event.clientY,
        onClose() {
          clearPointerEvents();
          cleanupMouseMoveHandler();
          closeWithDelay(event);
        }
      })(event);
    }
    if (isElement3(domReference)) {
      const ref = domReference;
      open && ref.addEventListener("mouseleave", onScrollMouseLeave);
      floating == null ? void 0 : floating.addEventListener("mouseleave", onScrollMouseLeave);
      move && ref.addEventListener("mousemove", onMouseEnter, {
        once: true
      });
      ref.addEventListener("mouseenter", onMouseEnter);
      ref.addEventListener("mouseleave", onMouseLeave);
      return () => {
        open && ref.removeEventListener("mouseleave", onScrollMouseLeave);
        floating == null ? void 0 : floating.removeEventListener("mouseleave", onScrollMouseLeave);
        move && ref.removeEventListener("mousemove", onMouseEnter);
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [domReference, floating, enabled, context, mouseOnly, restMs, move, closeWithDelay, cleanupMouseMoveHandler, clearPointerEvents, onOpenChange, open, tree, delayRef, handleCloseRef, dataRef]);
  index2(() => {
    var _handleCloseRef$curre;
    if (!enabled) {
      return;
    }
    if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && _handleCloseRef$curre.__options.blockPointerEvents && isHoverOpen()) {
      const body = getDocument(floating).body;
      body.setAttribute(safePolygonIdentifier, "");
      body.style.pointerEvents = "none";
      performedPointerEventsMutationRef.current = true;
      if (isElement3(domReference) && floating) {
        var _tree$nodesRef$curren, _tree$nodesRef$curren2;
        const ref = domReference;
        const parentFloating = tree == null ? void 0 : (_tree$nodesRef$curren = tree.nodesRef.current.find((node) => node.id === parentId)) == null ? void 0 : (_tree$nodesRef$curren2 = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren2.elements.floating;
        if (parentFloating) {
          parentFloating.style.pointerEvents = "";
        }
        ref.style.pointerEvents = "auto";
        floating.style.pointerEvents = "auto";
        return () => {
          ref.style.pointerEvents = "";
          floating.style.pointerEvents = "";
        };
      }
    }
  }, [enabled, open, parentId, floating, domReference, tree, handleCloseRef, dataRef, isHoverOpen]);
  index2(() => {
    if (!open) {
      pointerTypeRef.current = void 0;
      cleanupMouseMoveHandler();
      clearPointerEvents();
    }
  }, [open, cleanupMouseMoveHandler, clearPointerEvents]);
  React38.useEffect(() => {
    return () => {
      cleanupMouseMoveHandler();
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      clearPointerEvents();
    };
  }, [enabled, cleanupMouseMoveHandler, clearPointerEvents]);
  return React38.useMemo(() => {
    if (!enabled) {
      return {};
    }
    function setPointerRef(event) {
      pointerTypeRef.current = event.pointerType;
    }
    return {
      reference: {
        onPointerDown: setPointerRef,
        onPointerEnter: setPointerRef,
        onMouseMove(event) {
          if (open || restMs === 0) {
            return;
          }
          clearTimeout(restTimeoutRef.current);
          restTimeoutRef.current = setTimeout(() => {
            if (!blockMouseMoveRef.current) {
              onOpenChange(true, event.nativeEvent);
            }
          }, restMs);
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(timeoutRef.current);
        },
        onMouseLeave(event) {
          events.emit("dismiss", {
            type: "mouseLeave",
            data: {
              returnFocus: false
            }
          });
          closeWithDelay(event.nativeEvent, false);
        }
      }
    };
  }, [events, enabled, restMs, open, onOpenChange, closeWithDelay]);
}
var FloatingDelayGroupContext = React38.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: () => {
  },
  setState: () => {
  },
  isInstantPhase: false
});
var useDelayGroupContext = () => React38.useContext(FloatingDelayGroupContext);
var FloatingDelayGroup = (_ref) => {
  let {
    children,
    delay,
    timeoutMs = 0
  } = _ref;
  const [state, setState] = React38.useReducer((prev, next) => ({
    ...prev,
    ...next
  }), {
    delay,
    timeoutMs,
    initialDelay: delay,
    currentId: null,
    isInstantPhase: false
  });
  const initialCurrentIdRef = React38.useRef(null);
  const setCurrentId = React38.useCallback((currentId) => {
    setState({
      currentId
    });
  }, []);
  index2(() => {
    if (state.currentId) {
      if (initialCurrentIdRef.current === null) {
        initialCurrentIdRef.current = state.currentId;
      } else {
        setState({
          isInstantPhase: true
        });
      }
    } else {
      setState({
        isInstantPhase: false
      });
      initialCurrentIdRef.current = null;
    }
  }, [state.currentId]);
  return React38.createElement(FloatingDelayGroupContext.Provider, {
    value: React38.useMemo(() => ({
      ...state,
      setState,
      setCurrentId
    }), [state, setState, setCurrentId])
  }, children);
};
var useDelayGroup = (_ref2, _ref3) => {
  let {
    open,
    onOpenChange
  } = _ref2;
  let {
    id
  } = _ref3;
  const {
    currentId,
    setCurrentId,
    initialDelay,
    setState,
    timeoutMs
  } = useDelayGroupContext();
  index2(() => {
    if (currentId) {
      setState({
        delay: {
          open: 1,
          close: getDelay(initialDelay, "close")
        }
      });
      if (currentId !== id) {
        onOpenChange(false);
      }
    }
  }, [id, onOpenChange, setState, currentId, initialDelay]);
  index2(() => {
    function unset() {
      onOpenChange(false);
      setState({
        delay: initialDelay,
        currentId: null
      });
    }
    if (!open && currentId === id) {
      if (timeoutMs) {
        const timeout = window.setTimeout(unset, timeoutMs);
        return () => {
          clearTimeout(timeout);
        };
      } else {
        unset();
      }
    }
  }, [open, setState, currentId, id, onOpenChange, initialDelay, timeoutMs]);
  index2(() => {
    if (open) {
      setCurrentId(id);
    }
  }, [open, setCurrentId, id]);
};
function activeElement(doc) {
  let activeElement2 = doc.activeElement;
  while (((_activeElement = activeElement2) == null ? void 0 : (_activeElement$shadow = _activeElement.shadowRoot) == null ? void 0 : _activeElement$shadow.activeElement) != null) {
    var _activeElement, _activeElement$shadow;
    activeElement2 = activeElement2.shadowRoot.activeElement;
  }
  return activeElement2;
}
function getChildren(nodes, id) {
  let allChildren = nodes.filter((node) => {
    var _node$context;
    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  });
  let currentChildren = allChildren;
  while (currentChildren.length) {
    currentChildren = nodes.filter((node) => {
      var _currentChildren;
      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some((n) => {
        var _node$context2;
        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    });
    allChildren = allChildren.concat(currentChildren);
  }
  return allChildren;
}
function getTarget(event) {
  if ("composedPath" in event) {
    return event.composedPath()[0];
  }
  return event.target;
}
var HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
var timeoutId;
function setActiveElementOnTab(event) {
  if (event.key === "Tab") {
    event.target;
    clearTimeout(timeoutId);
  }
}
var FocusGuard = React38.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = React38.useState();
  index2(() => {
    if (isSafari()) {
      setRole("button");
    }
    document.addEventListener("keydown", setActiveElementOnTab);
    return () => {
      document.removeEventListener("keydown", setActiveElementOnTab);
    };
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES
  };
  return React38.createElement("span", _extends({}, props, restProps));
});
var PortalContext = React38.createContext(null);
var VisuallyHiddenDismiss = React38.forwardRef(function VisuallyHiddenDismiss2(props, ref) {
  return React38.createElement("button", _extends({}, props, {
    type: "button",
    ref,
    tabIndex: -1,
    style: HIDDEN_STYLES
  }));
});
var FloatingListContext = React38.createContext({
  register: () => {
  },
  unregister: () => {
  },
  map: /* @__PURE__ */ new Map(),
  elementsRef: {
    current: []
  }
});
var identifier = createAttribute("scroll-lock");
var FloatingOverlay = React38.forwardRef(function FloatingOverlay2(_ref, ref) {
  let {
    lockScroll = false,
    ...rest
  } = _ref;
  index2(() => {
    var _window$visualViewpor, _window$visualViewpor2;
    if (!lockScroll) {
      return;
    }
    const alreadyLocked = document.body.hasAttribute(identifier);
    if (alreadyLocked) {
      return;
    }
    document.body.setAttribute(identifier, "");
    const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? "paddingLeft" : "paddingRight";
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (!/iP(hone|ad|od)|iOS/.test(getPlatform())) {
      Object.assign(document.body.style, {
        overflow: "hidden",
        [paddingProp]: scrollbarWidth + "px"
      });
      return () => {
        document.body.removeAttribute(identifier);
        Object.assign(document.body.style, {
          overflow: "",
          [paddingProp]: ""
        });
      };
    }
    const offsetLeft = ((_window$visualViewpor = window.visualViewport) == null ? void 0 : _window$visualViewpor.offsetLeft) || 0;
    const offsetTop = ((_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetTop) || 0;
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;
    Object.assign(document.body.style, {
      position: "fixed",
      overflow: "hidden",
      top: -(scrollY - Math.floor(offsetTop)) + "px",
      left: -(scrollX - Math.floor(offsetLeft)) + "px",
      right: "0",
      [paddingProp]: scrollbarWidth + "px"
    });
    return () => {
      Object.assign(document.body.style, {
        position: "",
        overflow: "",
        top: "",
        left: "",
        right: "",
        [paddingProp]: ""
      });
      document.body.removeAttribute(identifier);
      window.scrollTo(scrollX, scrollY);
    };
  }, [lockScroll]);
  return React38.createElement("div", _extends({
    ref
  }, rest, {
    style: {
      position: "fixed",
      overflow: "auto",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...rest.style
    }
  }));
});
var useInsertionEffect = React38["useInsertionEffect".toString()];
var useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = React38.useRef(() => {
    if (true) {
      throw new Error("Cannot call an event handler while rendering.");
    }
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return React38.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }
  if ("composedPath" in event) {
    return event.composedPath().includes(node);
  }
  const e = event;
  return e.target != null && node.contains(e.target);
}
var bubbleHandlerKeys = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
};
var captureHandlerKeys = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
};
var normalizeBubblesProp = (bubbles) => {
  var _bubbles$escapeKey, _bubbles$outsidePress;
  return {
    escapeKeyBubbles: typeof bubbles === "boolean" ? bubbles : (_bubbles$escapeKey = bubbles == null ? void 0 : bubbles.escapeKey) != null ? _bubbles$escapeKey : false,
    outsidePressBubbles: typeof bubbles === "boolean" ? bubbles : (_bubbles$outsidePress = bubbles == null ? void 0 : bubbles.outsidePress) != null ? _bubbles$outsidePress : true
  };
};
function useDismiss(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    events,
    nodeId,
    elements: {
      reference,
      domReference,
      floating
    },
    dataRef
  } = context;
  const {
    enabled = true,
    escapeKey = true,
    outsidePress: unstable_outsidePress = true,
    outsidePressEvent = "pointerdown",
    referencePress = false,
    referencePressEvent = "pointerdown",
    ancestorScroll = false,
    bubbles
  } = props;
  const tree = useFloatingTree();
  const nested = useFloatingParentNodeId() != null;
  const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === "function" ? unstable_outsidePress : () => false);
  const outsidePress = typeof unstable_outsidePress === "function" ? outsidePressFn : unstable_outsidePress;
  const insideReactTreeRef = React38.useRef(false);
  const {
    escapeKeyBubbles,
    outsidePressBubbles
  } = normalizeBubblesProp(bubbles);
  const closeOnEscapeKeyDown = useEffectEvent((event) => {
    if (!open || !enabled || !escapeKey || event.key !== "Escape") {
      return;
    }
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (!escapeKeyBubbles) {
      event.stopPropagation();
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach((child) => {
          var _child$context;
          if ((_child$context = child.context) != null && _child$context.open && !child.context.dataRef.current.__escapeKeyBubbles) {
            shouldDismiss = false;
            return;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
    }
    events.emit("dismiss", {
      type: "escapeKey",
      data: {
        returnFocus: {
          preventScroll: false
        }
      }
    });
    onOpenChange(false, isReactEvent(event) ? event.nativeEvent : event);
  });
  const closeOnPressOutside = useEffectEvent((event) => {
    const insideReactTree = insideReactTreeRef.current;
    insideReactTreeRef.current = false;
    if (insideReactTree) {
      return;
    }
    if (typeof outsidePress === "function" && !outsidePress(event)) {
      return;
    }
    const target = getTarget(event);
    if (isHTMLElement2(target) && floating) {
      const canScrollX = target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
      const canScrollY = target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
      let xCond = canScrollY && event.offsetX > target.clientWidth;
      if (canScrollY) {
        const isRTL2 = getWindow2(floating).getComputedStyle(target).direction === "rtl";
        if (isRTL2) {
          xCond = event.offsetX <= target.offsetWidth - target.clientWidth;
        }
      }
      if (xCond || canScrollX && event.offsetY > target.clientHeight) {
        return;
      }
    }
    const targetIsInsideChildren = tree && getChildren(tree.nodesRef.current, nodeId).some((node) => {
      var _node$context;
      return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
    });
    if (isEventTargetWithin(event, floating) || isEventTargetWithin(event, domReference) || targetIsInsideChildren) {
      return;
    }
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (children.length > 0) {
      let shouldDismiss = true;
      children.forEach((child) => {
        var _child$context2;
        if ((_child$context2 = child.context) != null && _child$context2.open && !child.context.dataRef.current.__outsidePressBubbles) {
          shouldDismiss = false;
          return;
        }
      });
      if (!shouldDismiss) {
        return;
      }
    }
    events.emit("dismiss", {
      type: "outsidePress",
      data: {
        returnFocus: nested ? {
          preventScroll: true
        } : isVirtualClick(event) || isVirtualPointerEvent(event)
      }
    });
    onOpenChange(false, event);
  });
  React38.useEffect(() => {
    if (!open || !enabled) {
      return;
    }
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
    dataRef.current.__outsidePressBubbles = outsidePressBubbles;
    function onScroll(event) {
      onOpenChange(false, event);
    }
    const doc = getDocument(floating);
    escapeKey && doc.addEventListener("keydown", closeOnEscapeKeyDown);
    outsidePress && doc.addEventListener(outsidePressEvent, closeOnPressOutside);
    let ancestors = [];
    if (ancestorScroll) {
      if (isElement3(domReference)) {
        ancestors = getOverflowAncestors(domReference);
      }
      if (isElement3(floating)) {
        ancestors = ancestors.concat(getOverflowAncestors(floating));
      }
      if (!isElement3(reference) && reference && reference.contextElement) {
        ancestors = ancestors.concat(getOverflowAncestors(reference.contextElement));
      }
    }
    ancestors = ancestors.filter((ancestor) => {
      var _doc$defaultView;
      return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
    });
    ancestors.forEach((ancestor) => {
      ancestor.addEventListener("scroll", onScroll, {
        passive: true
      });
    });
    return () => {
      escapeKey && doc.removeEventListener("keydown", closeOnEscapeKeyDown);
      outsidePress && doc.removeEventListener(outsidePressEvent, closeOnPressOutside);
      ancestors.forEach((ancestor) => {
        ancestor.removeEventListener("scroll", onScroll);
      });
    };
  }, [dataRef, floating, domReference, reference, escapeKey, outsidePress, outsidePressEvent, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, closeOnPressOutside]);
  React38.useEffect(() => {
    insideReactTreeRef.current = false;
  }, [outsidePress, outsidePressEvent]);
  return React38.useMemo(() => {
    if (!enabled) {
      return {};
    }
    return {
      reference: {
        onKeyDown: closeOnEscapeKeyDown,
        [bubbleHandlerKeys[referencePressEvent]]: (event) => {
          if (referencePress) {
            events.emit("dismiss", {
              type: "referencePress",
              data: {
                returnFocus: false
              }
            });
            onOpenChange(false, event.nativeEvent);
          }
        }
      },
      floating: {
        onKeyDown: closeOnEscapeKeyDown,
        [captureHandlerKeys[outsidePressEvent]]: () => {
          insideReactTreeRef.current = true;
        }
      }
    };
  }, [enabled, events, referencePress, outsidePressEvent, referencePressEvent, onOpenChange, closeOnEscapeKeyDown]);
}
function useFloating2(options) {
  var _options$elements;
  if (options === void 0) {
    options = {};
  }
  const {
    open = false,
    onOpenChange: unstable_onOpenChange,
    nodeId
  } = options;
  const [_domReference, setDomReference] = React38.useState(null);
  const domReference = ((_options$elements = options.elements) == null ? void 0 : _options$elements.reference) || _domReference;
  const position = useFloating(options);
  const tree = useFloatingTree();
  const onOpenChange = useEffectEvent((open2, event) => {
    if (open2) {
      dataRef.current.openEvent = event;
    }
    unstable_onOpenChange == null ? void 0 : unstable_onOpenChange(open2, event);
  });
  const domReferenceRef = React38.useRef(null);
  const dataRef = React38.useRef({});
  const events = React38.useState(() => createPubSub())[0];
  const floatingId = useId3();
  const setPositionReference = React38.useCallback((node) => {
    const positionReference = isElement3(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    position.refs.setReference(positionReference);
  }, [position.refs]);
  const setReference = React38.useCallback((node) => {
    if (isElement3(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement3(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement3(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = React38.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = React38.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = React38.useMemo(() => ({
    ...position,
    refs,
    elements,
    dataRef,
    nodeId,
    floatingId,
    events,
    open,
    onOpenChange
  }), [position, nodeId, floatingId, events, open, onOpenChange, refs, elements]);
  index2(() => {
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React38.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}
function useFocus(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    refs,
    elements: {
      floating,
      domReference
    }
  } = context;
  const {
    enabled = true,
    keyboardOnly = true
  } = props;
  const pointerTypeRef = React38.useRef("");
  const blockFocusRef = React38.useRef(false);
  const timeoutRef = React38.useRef();
  React38.useEffect(() => {
    if (!enabled) {
      return;
    }
    const doc = getDocument(floating);
    const win = doc.defaultView || window;
    function onBlur() {
      if (!open && isHTMLElement2(domReference) && domReference === activeElement(getDocument(domReference))) {
        blockFocusRef.current = true;
      }
    }
    win.addEventListener("blur", onBlur);
    return () => {
      win.removeEventListener("blur", onBlur);
    };
  }, [floating, domReference, open, enabled]);
  React38.useEffect(() => {
    if (!enabled) {
      return;
    }
    function onDismiss(payload) {
      if (payload.type === "referencePress" || payload.type === "escapeKey") {
        blockFocusRef.current = true;
      }
    }
    events.on("dismiss", onDismiss);
    return () => {
      events.off("dismiss", onDismiss);
    };
  }, [events, enabled]);
  React38.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return React38.useMemo(() => {
    if (!enabled) {
      return {};
    }
    return {
      reference: {
        onPointerDown(_ref) {
          let {
            pointerType
          } = _ref;
          pointerTypeRef.current = pointerType;
          blockFocusRef.current = !!(pointerType && keyboardOnly);
        },
        onMouseLeave() {
          blockFocusRef.current = false;
        },
        onFocus(event) {
          var _dataRef$current$open;
          if (blockFocusRef.current) {
            return;
          }
          if (event.type === "focus" && ((_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type) === "mousedown" && isEventTargetWithin(dataRef.current.openEvent, domReference)) {
            return;
          }
          onOpenChange(true, event.nativeEvent);
        },
        onBlur(event) {
          blockFocusRef.current = false;
          const relatedTarget = event.relatedTarget;
          const movedToFocusGuard = isElement3(relatedTarget) && relatedTarget.hasAttribute(createAttribute("focus-guard")) && relatedTarget.getAttribute("data-type") === "outside";
          timeoutRef.current = setTimeout(() => {
            if (contains(refs.floating.current, relatedTarget) || contains(domReference, relatedTarget) || movedToFocusGuard) {
              return;
            }
            onOpenChange(false, event.nativeEvent);
          });
        }
      }
    };
  }, [enabled, keyboardOnly, domReference, refs, dataRef, onOpenChange]);
}
function mergeProps(userProps, propsList, elementKey) {
  const map = /* @__PURE__ */ new Map();
  return {
    ...elementKey === "floating" && {
      tabIndex: -1
    },
    ...userProps,
    ...propsList.map((value) => value ? value[elementKey] : null).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach((_ref) => {
        let [key, value] = _ref;
        if (key.indexOf("on") === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === "function") {
            var _map$get;
            (_map$get = map.get(key)) == null ? void 0 : _map$get.push(value);
            acc[key] = function() {
              var _map$get2;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map((fn) => fn(...args)).find((val) => val !== void 0);
            };
          }
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}
function useInteractions(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  const deps = propsList;
  const getReferenceProps = React38.useCallback(
    (userProps) => mergeProps(userProps, propsList, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
  const getFloatingProps = React38.useCallback(
    (userProps) => mergeProps(userProps, propsList, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
  const getItemProps = React38.useCallback(
    (userProps) => mergeProps(userProps, propsList, "item"),
    // Granularly check for `item` changes, because the `getItemProps` getter
    // should be as referentially stable as possible since it may be passed as
    // a prop to many components. All `item` key values must therefore be
    // memoized.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    propsList.map((key) => key == null ? void 0 : key.item)
  );
  return React38.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps
  }), [getReferenceProps, getFloatingProps, getItemProps]);
}
function useRole(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    floatingId
  } = context;
  const {
    enabled = true,
    role = "dialog"
  } = props;
  const referenceId = useId3();
  return React38.useMemo(() => {
    const floatingProps = {
      id: floatingId,
      role
    };
    if (!enabled) {
      return {};
    }
    if (role === "tooltip") {
      return {
        reference: {
          "aria-describedby": open ? floatingId : void 0
        },
        floating: floatingProps
      };
    }
    return {
      reference: {
        "aria-expanded": open ? "true" : "false",
        "aria-haspopup": role === "alertdialog" ? "dialog" : role,
        "aria-controls": open ? floatingId : void 0,
        ...role === "listbox" && {
          role: "combobox"
        },
        ...role === "menu" && {
          id: referenceId
        }
      },
      floating: {
        ...floatingProps,
        ...role === "menu" && {
          "aria-labelledby": referenceId
        }
      }
    };
  }, [enabled, role, open, floatingId, referenceId]);
}

// node_modules/@mantine/core/esm/components/Floating/get-floating-position/get-floating-position.mjs
function getFloatingPosition(dir, position) {
  if (dir === "rtl" && (position.includes("right") || position.includes("left"))) {
    const [side, placement] = position.split("-");
    const flippedPosition = side === "right" ? "left" : "right";
    return placement === void 0 ? flippedPosition : `${flippedPosition}-${placement}`;
  }
  return position;
}

// node_modules/@mantine/core/esm/components/Floating/FloatingArrow/FloatingArrow.mjs
var import_react64 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Floating/FloatingArrow/get-arrow-position-styles.mjs
var import_react63 = __toESM(require_react(), 1);
function horizontalSide(placement, arrowY, arrowOffset, arrowPosition) {
  if (placement === "center" || arrowPosition === "center") {
    return { top: arrowY };
  }
  if (placement === "end") {
    return { bottom: arrowOffset };
  }
  if (placement === "start") {
    return { top: arrowOffset };
  }
  return {};
}
function verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir) {
  if (placement === "center" || arrowPosition === "center") {
    return { left: arrowX };
  }
  if (placement === "end") {
    return { [dir === "ltr" ? "right" : "left"]: arrowOffset };
  }
  if (placement === "start") {
    return { [dir === "ltr" ? "left" : "right"]: arrowOffset };
  }
  return {};
}
var radiusByFloatingSide = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function getArrowPositionStyles({
  position,
  arrowSize,
  arrowOffset,
  arrowRadius,
  arrowPosition,
  arrowX,
  arrowY,
  dir
}) {
  const [side, placement = "center"] = position.split("-");
  const baseStyles = {
    width: rem(arrowSize),
    height: rem(arrowSize),
    transform: "rotate(45deg)",
    position: "absolute",
    [radiusByFloatingSide[side]]: rem(arrowRadius)
  };
  const arrowPlacement = rem(-arrowSize / 2);
  if (side === "left") {
    return {
      ...baseStyles,
      ...horizontalSide(placement, arrowY, arrowOffset, arrowPosition),
      right: arrowPlacement,
      borderLeftColor: "transparent",
      borderBottomColor: "transparent"
    };
  }
  if (side === "right") {
    return {
      ...baseStyles,
      ...horizontalSide(placement, arrowY, arrowOffset, arrowPosition),
      left: arrowPlacement,
      borderRightColor: "transparent",
      borderTopColor: "transparent"
    };
  }
  if (side === "top") {
    return {
      ...baseStyles,
      ...verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir),
      bottom: arrowPlacement,
      borderTopColor: "transparent",
      borderLeftColor: "transparent"
    };
  }
  if (side === "bottom") {
    return {
      ...baseStyles,
      ...verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir),
      top: arrowPlacement,
      borderBottomColor: "transparent",
      borderRightColor: "transparent"
    };
  }
  return {};
}

// node_modules/@mantine/core/esm/components/Floating/FloatingArrow/FloatingArrow.mjs
var FloatingArrow3 = (0, import_react64.forwardRef)(
  ({
    position,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    visible,
    arrowX,
    arrowY,
    style,
    ...others
  }, ref) => {
    const { dir } = useDirection();
    if (!visible) {
      return null;
    }
    return import_react64.default.createElement(
      "div",
      {
        ...others,
        ref,
        style: {
          ...style,
          ...getArrowPositionStyles({
            position,
            arrowSize,
            arrowOffset,
            arrowRadius,
            arrowPosition,
            dir,
            arrowX,
            arrowY
          })
        }
      }
    );
  }
);
FloatingArrow3.displayName = "@mantine/core/FloatingArrow";

// node_modules/@mantine/core/esm/components/Popover/use-popover.mjs
var import_react68 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Floating/use-floating-auto-update.mjs
var import_react65 = __toESM(require_react(), 1);
function useFloatingAutoUpdate({
  opened,
  floating,
  position,
  positionDependencies
}) {
  const [delayedUpdate, setDelayedUpdate] = (0, import_react65.useState)(0);
  (0, import_react65.useEffect)(() => {
    if (floating.refs.reference.current && floating.refs.floating.current) {
      return autoUpdate(
        floating.refs.reference.current,
        floating.refs.floating.current,
        floating.update
      );
    }
    return void 0;
  }, [
    floating.refs.reference.current,
    floating.refs.floating.current,
    opened,
    delayedUpdate,
    position
  ]);
  useDidUpdate(() => {
    floating.update();
  }, positionDependencies);
  useDidUpdate(() => {
    setDelayedUpdate((c) => c + 1);
  }, [opened]);
}

// node_modules/@mantine/core/esm/components/Popover/use-popover.mjs
function getPopoverMiddlewares(options, getFloating) {
  var _a, _b, _c, _d;
  const middlewares = [offset(options.offset)];
  if ((_a = options.middlewares) == null ? void 0 : _a.shift) {
    middlewares.push(shift({ limiter: limitShift() }));
  }
  if ((_b = options.middlewares) == null ? void 0 : _b.flip) {
    middlewares.push(flip());
  }
  if ((_c = options.middlewares) == null ? void 0 : _c.inline) {
    middlewares.push(inline());
  }
  middlewares.push(arrow2({ element: options.arrowRef, padding: options.arrowOffset }));
  if (((_d = options.middlewares) == null ? void 0 : _d.size) || options.width === "target") {
    middlewares.push(
      size({
        apply({ rects, availableWidth, availableHeight }) {
          var _a2, _b2;
          const floating = getFloating();
          const styles = ((_a2 = floating.refs.floating.current) == null ? void 0 : _a2.style) ?? {};
          if ((_b2 = options.middlewares) == null ? void 0 : _b2.size) {
            Object.assign(styles, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`
            });
          }
          if (options.width === "target") {
            Object.assign(styles, {
              width: `${rects.reference.width}px`
            });
          }
        }
      })
    );
  }
  return middlewares;
}
function usePopover(options) {
  const [_opened, setOpened] = useUncontrolled({
    value: options.opened,
    defaultValue: options.defaultOpened,
    finalValue: false,
    onChange: options.onChange
  });
  const onClose = () => {
    var _a;
    if (_opened) {
      (_a = options.onClose) == null ? void 0 : _a.call(options);
      setOpened(false);
    }
  };
  const onToggle = () => {
    var _a, _b;
    if (_opened) {
      (_a = options.onClose) == null ? void 0 : _a.call(options);
      setOpened(false);
    } else {
      (_b = options.onOpen) == null ? void 0 : _b.call(options);
      setOpened(true);
    }
  };
  const floating = useFloating2({
    placement: options.position,
    middleware: getPopoverMiddlewares(options, () => floating)
  });
  useFloatingAutoUpdate({
    opened: options.opened,
    position: options.position,
    positionDependencies: options.positionDependencies || [],
    floating
  });
  useDidUpdate(() => {
    var _a;
    (_a = options.onPositionChange) == null ? void 0 : _a.call(options, floating.placement);
  }, [floating.placement]);
  useDidUpdate(() => {
    var _a, _b;
    if (!options.opened) {
      (_a = options.onClose) == null ? void 0 : _a.call(options);
    } else {
      (_b = options.onOpen) == null ? void 0 : _b.call(options);
    }
  }, [options.opened]);
  return {
    floating,
    controlled: typeof options.opened === "boolean",
    opened: _opened,
    onClose,
    onToggle
  };
}

// node_modules/@mantine/core/esm/components/Popover/Popover.context.mjs
var import_react69 = __toESM(require_react(), 1);
var [PopoverContextProvider, usePopoverContext] = createSafeContext(
  "Popover component was not found in the tree"
);

// node_modules/@mantine/core/esm/components/Popover/PopoverTarget/PopoverTarget.mjs
var import_react70 = __toESM(require_react(), 1);
var defaultProps7 = {
  refProp: "ref",
  popupType: "dialog"
};
var PopoverTarget = factory((props, ref) => {
  const { children, refProp, popupType, ...others } = useProps(
    "PopoverTarget",
    defaultProps7,
    props
  );
  if (!isElement(children)) {
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const forwardedProps = others;
  const ctx = usePopoverContext();
  const targetRef = useMergedRef(ctx.reference, children.ref, ref);
  const accessibleProps = ctx.withRoles ? {
    "aria-haspopup": popupType,
    "aria-expanded": ctx.opened,
    "aria-controls": ctx.getDropdownId(),
    id: ctx.getTargetId()
  } : {};
  return (0, import_react70.cloneElement)(children, {
    ...forwardedProps,
    ...accessibleProps,
    ...ctx.targetProps,
    className: clsx_default(ctx.targetProps.className, forwardedProps.className, children.props.className),
    [refProp]: targetRef,
    ...!ctx.controlled ? { onClick: ctx.onToggle } : null
  });
});
PopoverTarget.displayName = "@mantine/core/PopoverTarget";

// node_modules/@mantine/core/esm/components/Popover/PopoverDropdown/PopoverDropdown.mjs
var import_react77 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Portal/Portal.mjs
var import_react71 = __toESM(require_react(), 1);
var import_react_dom5 = __toESM(require_react_dom(), 1);
function createPortalNode(props) {
  const node = document.createElement("div");
  node.setAttribute("data-portal", "true");
  typeof props.className === "string" && node.classList.add(...props.className.split(" "));
  typeof props.style === "object" && Object.assign(node.style, props.style);
  typeof props.id === "string" && node.setAttribute("id", props.id);
  return node;
}
var defaultProps8 = {};
var Portal = (0, import_react71.forwardRef)((props, ref) => {
  const { children, target, ...others } = useProps("Portal", defaultProps8, props);
  const [mounted, setMounted] = (0, import_react71.useState)(false);
  const nodeRef = (0, import_react71.useRef)(null);
  useIsomorphicEffect(() => {
    setMounted(true);
    nodeRef.current = !target ? createPortalNode(others) : typeof target === "string" ? document.querySelector(target) : target;
    assignRef(ref, nodeRef.current);
    if (!target && nodeRef.current) {
      document.body.appendChild(nodeRef.current);
    }
    return () => {
      if (!target && nodeRef.current) {
        document.body.removeChild(nodeRef.current);
      }
    };
  }, [target]);
  if (!mounted || !nodeRef.current) {
    return null;
  }
  return (0, import_react_dom5.createPortal)(import_react71.default.createElement(import_react71.default.Fragment, null, children), nodeRef.current);
});
Portal.displayName = "@mantine/core/Portal";

// node_modules/@mantine/core/esm/components/Portal/OptionalPortal.mjs
var import_react72 = __toESM(require_react(), 1);
function OptionalPortal({ withinPortal = true, children, ...others }) {
  if (withinPortal) {
    return import_react72.default.createElement(Portal, { ...others }, children);
  }
  return import_react72.default.createElement(import_react72.default.Fragment, null, children);
}
OptionalPortal.displayName = "@mantine/core/OptionalPortal";

// node_modules/@mantine/core/esm/components/Transition/transitions.mjs
var import_react73 = __toESM(require_react(), 1);
var popIn = (from) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${rem(from === "bottom" ? 10 : -10)})` },
  transitionProperty: "transform, opacity"
});
var transitions = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity"
  },
  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: `translateY(-${rem(20)}) skew(-10deg, -5deg)` },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: `translateY(${rem(20)}) skew(-10deg, -5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${rem(20)}) rotate(-5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${rem(20)}) rotate(5deg)` },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity"
  },
  pop: {
    ...popIn("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...popIn("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...popIn("top"),
    common: { transformOrigin: "top right" }
  }
};

// node_modules/@mantine/core/esm/components/Transition/Transition.mjs
var import_react75 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Transition/get-transition-styles/get-transition-styles.mjs
var transitionStatuses = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction
}) {
  const shared = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction
  };
  if (typeof transition === "string") {
    if (!(transition in transitions)) {
      return {};
    }
    return {
      transitionProperty: transitions[transition].transitionProperty,
      ...shared,
      ...transitions[transition].common,
      ...transitions[transition][transitionStatuses[state]]
    };
  }
  return {
    transitionProperty: transition.transitionProperty,
    ...shared,
    ...transition.common,
    ...transition[transitionStatuses[state]]
  };
}

// node_modules/@mantine/core/esm/components/Transition/use-transition.mjs
var import_react74 = __toESM(require_react(), 1);
function useTransition({
  duration,
  exitDuration,
  timingFunction,
  mounted,
  onEnter,
  onExit,
  onEntered,
  onExited
}) {
  const theme = useMantineTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const [transitionDuration, setTransitionDuration] = (0, import_react74.useState)(reduceMotion ? 0 : duration);
  const [transitionStatus, setStatus] = (0, import_react74.useState)(mounted ? "entered" : "exited");
  const timeoutRef = (0, import_react74.useRef)(-1);
  const handleStateChange = (shouldMount) => {
    const preHandler = shouldMount ? onEnter : onExit;
    const handler = shouldMount ? onEntered : onExited;
    setStatus(shouldMount ? "pre-entering" : "pre-exiting");
    window.clearTimeout(timeoutRef.current);
    const newTransitionDuration = reduceMotion ? 0 : shouldMount ? duration : exitDuration;
    setTransitionDuration(newTransitionDuration);
    if (newTransitionDuration === 0) {
      typeof preHandler === "function" && preHandler();
      typeof handler === "function" && handler();
      setStatus(shouldMount ? "entered" : "exited");
    } else {
      const preStateTimeout = window.setTimeout(() => {
        typeof preHandler === "function" && preHandler();
        setStatus(shouldMount ? "entering" : "exiting");
      }, 10);
      timeoutRef.current = window.setTimeout(() => {
        window.clearTimeout(preStateTimeout);
        typeof handler === "function" && handler();
        setStatus(shouldMount ? "entered" : "exited");
      }, newTransitionDuration);
    }
  };
  useDidUpdate(() => {
    handleStateChange(mounted);
  }, [mounted]);
  (0, import_react74.useEffect)(() => () => window.clearTimeout(timeoutRef.current), []);
  return {
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: timingFunction || "ease"
  };
}

// node_modules/@mantine/core/esm/components/Transition/Transition.mjs
function Transition({
  keepMounted,
  transition = "fade",
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction = "ease",
  onExit,
  onEntered,
  onEnter,
  onExited
}) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
    mounted,
    exitDuration,
    duration,
    timingFunction,
    onExit,
    onEntered,
    onEnter,
    onExited
  });
  if (transitionDuration === 0) {
    return mounted ? import_react75.default.createElement(import_react75.default.Fragment, null, children({})) : keepMounted ? children({ display: "none" }) : null;
  }
  return transitionStatus === "exited" ? keepMounted ? children({ display: "none" }) : null : import_react75.default.createElement(import_react75.default.Fragment, null, children(
    getTransitionStyles({
      transition,
      duration: transitionDuration,
      state: transitionStatus,
      timingFunction: transitionTimingFunction
    })
  ));
}
Transition.displayName = "@mantine/core/Transition";

// node_modules/@mantine/core/esm/components/FocusTrap/FocusTrap.mjs
var import_react76 = __toESM(require_react(), 1);
function FocusTrap({
  children,
  active = true,
  refProp = "ref"
}) {
  const focusTrapRef = useFocusTrap(active);
  const ref = useMergedRef(focusTrapRef, children == null ? void 0 : children.ref);
  if (!isElement(children)) {
    return children;
  }
  return (0, import_react76.cloneElement)(children, { [refProp]: ref });
}
FocusTrap.displayName = "@mantine/core/FocusTrap";

// node_modules/@mantine/core/esm/components/Popover/Popover.module.css.mjs
var classes5 = { "dropdown": "m-38a85659", "arrow": "m-a31dc6c1" };

// node_modules/@mantine/core/esm/components/Popover/PopoverDropdown/PopoverDropdown.mjs
var defaultProps9 = {};
var PopoverDropdown = factory((_props, ref) => {
  var _a, _b, _c, _d;
  const props = useProps("PopoverDropdown", defaultProps9, _props);
  const {
    className,
    style,
    vars,
    children,
    onKeyDownCapture,
    variant,
    classNames,
    styles,
    ...others
  } = props;
  const ctx = usePopoverContext();
  const returnFocus = useFocusReturn({
    opened: ctx.opened,
    shouldReturnFocus: ctx.returnFocus
  });
  const accessibleProps = ctx.withRoles ? {
    "aria-labelledby": ctx.getTargetId(),
    id: ctx.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {};
  const mergedRef = useMergedRef(ref, ctx.floating);
  if (ctx.disabled) {
    return null;
  }
  return import_react77.default.createElement(OptionalPortal, { ...ctx.portalProps, withinPortal: ctx.withinPortal }, import_react77.default.createElement(
    Transition,
    {
      mounted: ctx.opened,
      ...ctx.transitionProps,
      transition: ((_a = ctx.transitionProps) == null ? void 0 : _a.transition) || "fade",
      duration: ((_b = ctx.transitionProps) == null ? void 0 : _b.duration) ?? 150,
      keepMounted: ctx.keepMounted,
      exitDuration: typeof ((_c = ctx.transitionProps) == null ? void 0 : _c.exitDuration) === "number" ? ctx.transitionProps.exitDuration : (_d = ctx.transitionProps) == null ? void 0 : _d.duration
    },
    (transitionStyles) => import_react77.default.createElement(FocusTrap, { active: ctx.trapFocus }, import_react77.default.createElement(
      Box,
      {
        ...accessibleProps,
        ...others,
        variant,
        ref: mergedRef,
        onKeyDownCapture: closeOnEscape(ctx.onClose, {
          active: ctx.closeOnEscape,
          onTrigger: returnFocus,
          onKeyDown: onKeyDownCapture
        }),
        "data-position": ctx.placement,
        ...ctx.getStyles("dropdown", {
          className,
          props,
          classNames,
          styles,
          style: [
            {
              ...transitionStyles,
              zIndex: ctx.zIndex,
              top: ctx.y ?? 0,
              left: ctx.x ?? 0,
              width: ctx.width === "target" ? void 0 : rem(ctx.width)
            },
            style
          ]
        })
      },
      children,
      import_react77.default.createElement(
        FloatingArrow3,
        {
          ref: ctx.arrowRef,
          arrowX: ctx.arrowX,
          arrowY: ctx.arrowY,
          visible: ctx.withArrow,
          position: ctx.placement,
          arrowSize: ctx.arrowSize,
          arrowRadius: ctx.arrowRadius,
          arrowOffset: ctx.arrowOffset,
          arrowPosition: ctx.arrowPosition,
          ...ctx.getStyles("arrow", {
            props,
            classNames,
            styles
          })
        }
      )
    ))
  ));
});
PopoverDropdown.classes = classes5;
PopoverDropdown.displayName = "@mantine/core/PopoverDropdown";

// node_modules/@mantine/core/esm/components/Popover/Popover.mjs
var defaultProps10 = {
  position: "bottom",
  offset: 8,
  positionDependencies: [],
  transitionProps: { transition: "fade", duration: 150 },
  middlewares: { flip: true, shift: true, inline: false },
  arrowSize: 7,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  closeOnClickOutside: true,
  withinPortal: true,
  closeOnEscape: true,
  trapFocus: false,
  withRoles: true,
  returnFocus: false,
  clickOutsideEvents: ["mousedown", "touchstart"],
  zIndex: getDefaultZIndex("popover"),
  __staticSelector: "Popover",
  width: "max-content"
};
var varsResolver3 = createVarsResolver((_, { radius, shadow }) => ({
  dropdown: {
    "--popover-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--popover-shadow": getShadow(shadow)
  }
}));
function Popover(_props) {
  var _a, _b, _c, _d, _e, _f;
  const props = useProps("Popover", defaultProps10, _props);
  const {
    children,
    position,
    offset: offset2,
    onPositionChange,
    positionDependencies,
    opened,
    transitionProps,
    width,
    middlewares,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    unstyled,
    classNames,
    styles,
    closeOnClickOutside,
    withinPortal,
    portalProps,
    closeOnEscape: closeOnEscape2,
    clickOutsideEvents,
    trapFocus,
    onClose,
    onOpen,
    onChange,
    zIndex,
    radius,
    shadow,
    id,
    defaultOpened,
    __staticSelector,
    withRoles,
    disabled,
    returnFocus,
    variant,
    keepMounted,
    vars,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: __staticSelector,
    props,
    classes: classes5,
    classNames,
    styles,
    unstyled,
    rootSelector: "dropdown",
    vars,
    varsResolver: varsResolver3
  });
  const arrowRef = (0, import_react79.useRef)(null);
  const [targetNode, setTargetNode] = (0, import_react79.useState)(null);
  const [dropdownNode, setDropdownNode] = (0, import_react79.useState)(null);
  const { dir } = useDirection();
  const uid = useId(id);
  const popover = usePopover({
    middlewares,
    width,
    position: getFloatingPosition(dir, position),
    offset: typeof offset2 === "number" ? offset2 + (withArrow ? arrowSize / 2 : 0) : offset2,
    arrowRef,
    arrowOffset,
    onPositionChange,
    positionDependencies,
    opened,
    defaultOpened,
    onChange,
    onOpen,
    onClose
  });
  useClickOutside(() => closeOnClickOutside && popover.onClose(), clickOutsideEvents, [
    targetNode,
    dropdownNode
  ]);
  const reference = (0, import_react79.useCallback)(
    (node) => {
      setTargetNode(node);
      popover.floating.refs.setReference(node);
    },
    [popover.floating.refs.setReference]
  );
  const floating = (0, import_react79.useCallback)(
    (node) => {
      setDropdownNode(node);
      popover.floating.refs.setFloating(node);
    },
    [popover.floating.refs.setFloating]
  );
  return import_react79.default.createElement(
    PopoverContextProvider,
    {
      value: {
        returnFocus,
        disabled,
        controlled: popover.controlled,
        reference,
        floating,
        x: popover.floating.x,
        y: popover.floating.y,
        arrowX: (_c = (_b = (_a = popover.floating) == null ? void 0 : _a.middlewareData) == null ? void 0 : _b.arrow) == null ? void 0 : _c.x,
        arrowY: (_f = (_e = (_d = popover.floating) == null ? void 0 : _d.middlewareData) == null ? void 0 : _e.arrow) == null ? void 0 : _f.y,
        opened: popover.opened,
        arrowRef,
        transitionProps,
        width,
        withArrow,
        arrowSize,
        arrowOffset,
        arrowRadius,
        arrowPosition,
        placement: popover.floating.placement,
        trapFocus,
        withinPortal,
        portalProps,
        zIndex,
        radius,
        shadow,
        closeOnEscape: closeOnEscape2,
        onClose: popover.onClose,
        onToggle: popover.onToggle,
        getTargetId: () => `${uid}-target`,
        getDropdownId: () => `${uid}-dropdown`,
        withRoles,
        targetProps: others,
        __staticSelector,
        classNames,
        styles,
        unstyled,
        variant,
        keepMounted,
        getStyles: getStyles2
      }
    },
    children
  );
}
Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
Popover.displayName = "@mantine/core/Popover";
Popover.extend = (input) => input;

// node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.mjs
var import_react86 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Loader/Loader.mjs
var import_react84 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Loader/loaders/Bars.mjs
var import_react81 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Loader/Loader.module.css.mjs
var classes6 = { "root": "m-5ae2e3c", "barsLoader": "m-7a2bd4cd", "bar": "m-870bb79", "bars-loader-animation": "m-5d2b3b9d", "dotsLoader": "m-4e3f22d7", "dot": "m-870c4af", "loader-dots-animation": "m-aac34a1", "ovalLoader": "m-b34414df", "oval-loader-animation": "m-f8e89c4b" };

// node_modules/@mantine/core/esm/components/Loader/loaders/Bars.mjs
var Bars = (0, import_react81.forwardRef)(({ className, ...others }, ref) => import_react81.default.createElement(Box, { component: "span", className: clsx_default(classes6.barsLoader, className), ...others, ref }, import_react81.default.createElement("span", { className: classes6.bar }), import_react81.default.createElement("span", { className: classes6.bar }), import_react81.default.createElement("span", { className: classes6.bar })));

// node_modules/@mantine/core/esm/components/Loader/loaders/Oval.mjs
var import_react82 = __toESM(require_react(), 1);
var Oval = (0, import_react82.forwardRef)(({ className, ...others }, ref) => import_react82.default.createElement(Box, { component: "span", className: clsx_default(classes6.ovalLoader, className), ...others, ref }));

// node_modules/@mantine/core/esm/components/Loader/loaders/Dots.mjs
var import_react83 = __toESM(require_react(), 1);
var Dots = (0, import_react83.forwardRef)(({ className, ...others }, ref) => import_react83.default.createElement(Box, { component: "span", className: clsx_default(classes6.dotsLoader, className), ...others, ref }, import_react83.default.createElement("span", { className: classes6.dot }), import_react83.default.createElement("span", { className: classes6.dot }), import_react83.default.createElement("span", { className: classes6.dot })));

// node_modules/@mantine/core/esm/components/Loader/Loader.mjs
var defaultLoaders = {
  bars: Bars,
  oval: Oval,
  dots: Dots
};
var defaultProps11 = {
  loaders: defaultLoaders,
  type: "oval"
};
var varsResolver4 = createVarsResolver((theme, { size: size2, color }) => ({
  root: {
    "--loader-size": getSize(size2, "loader-size"),
    "--loader-color": color ? getThemeColor(color, theme) : void 0
  }
}));
var Loader = factory((_props, ref) => {
  const props = useProps("Loader", defaultProps11, _props);
  const {
    size: size2,
    color,
    type,
    vars,
    className,
    style,
    classNames,
    styles,
    unstyled,
    loaders,
    variant,
    children,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Loader",
    props,
    classes: classes6,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver4
  });
  if (children) {
    return import_react84.default.createElement(Box, { ...getStyles2("root"), ref, ...others }, children);
  }
  return import_react84.default.createElement(
    Box,
    {
      ...getStyles2("root"),
      ref,
      component: loaders[type],
      variant,
      size: size2,
      ...others
    }
  );
});
Loader.classes = classes6;
Loader.displayName = "@mantine/core/Loader";

// node_modules/@mantine/core/esm/components/ActionIcon/ActionIconGroup/ActionIconGroup.mjs
var import_react85 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.module.css.mjs
var classes7 = { "root": "m-8d3f4000", "loader": "m-302b9fb1", "group": "m-1a0f1b21" };

// node_modules/@mantine/core/esm/components/ActionIcon/ActionIconGroup/ActionIconGroup.mjs
var defaultProps12 = {
  orientation: "horizontal"
};
var varsResolver5 = createVarsResolver((_, { borderWidth }) => ({
  group: { "--ai-border-width": rem(borderWidth) }
}));
var ActionIconGroup = factory((_props, ref) => {
  const props = useProps("ActionIconGroup", defaultProps12, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    orientation,
    vars,
    borderWidth,
    variant,
    ...others
  } = useProps("ActionIconGroup", defaultProps12, _props);
  const getStyles2 = useStyles({
    name: "ActionIconGroup",
    props,
    classes: classes7,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver5,
    rootSelector: "group"
  });
  return import_react85.default.createElement(
    Box,
    {
      ...getStyles2("group"),
      ref,
      variant,
      mod: { "data-orientation": orientation },
      role: "group",
      ...others
    }
  );
});
ActionIconGroup.classes = classes7;
ActionIconGroup.displayName = "@mantine/core/ActionIconGroup";

// node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.mjs
var defaultProps13 = {};
var varsResolver6 = createVarsResolver(
  (theme, { size: size2, radius, variant, gradient, color }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled"
    });
    return {
      root: {
        "--ai-size": getSize(size2, "ai-size"),
        "--ai-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--ai-bg": color || variant ? colors.background : void 0,
        "--ai-hover": color || variant ? colors.hover : void 0,
        "--ai-hover-color": color || variant ? colors.hoverColor : void 0,
        "--ai-color": color || variant ? colors.color : void 0,
        "--ai-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
var ActionIcon = polymorphicFactory((_props, ref) => {
  const props = useProps("ActionIcon", defaultProps13, _props);
  const {
    className,
    unstyled,
    variant,
    classNames,
    styles,
    style,
    loading,
    loaderProps,
    size: size2,
    color,
    radius,
    __staticSelector,
    gradient,
    vars,
    children,
    disabled,
    "data-disabled": dataDisabled,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: ["ActionIcon", __staticSelector],
    props,
    className,
    style,
    classes: classes7,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver6
  });
  return import_react86.default.createElement(
    UnstyledButton,
    {
      ...getStyles2("root", { active: !disabled && !loading && !dataDisabled }),
      ...others,
      unstyled,
      variant,
      size: size2,
      disabled: disabled || loading,
      ref,
      mod: { loading, disabled: disabled || dataDisabled }
    },
    loading ? import_react86.default.createElement(
      Loader,
      {
        ...getStyles2("loader"),
        color: "var(--ai-color)",
        size: "calc(var(--ai-size) * 0.55)",
        ...loaderProps
      }
    ) : children
  );
});
ActionIcon.classes = classes7;
ActionIcon.displayName = "@mantine/core/ActionIcon";
ActionIcon.Group = ActionIconGroup;

// node_modules/@mantine/core/esm/components/CloseButton/CloseIcon.mjs
var import_react87 = __toESM(require_react(), 1);
var CloseIcon = (0, import_react87.forwardRef)(
  ({ size: size2 = "var(--cb-icon-size, 70%)", style, ...others }, ref) => import_react87.default.createElement(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...style, width: size2, height: size2 },
      ref,
      ...others
    },
    import_react87.default.createElement(
      "path",
      {
        d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  )
);
CloseIcon.displayName = "@mantine/core/CloseIcon";

// node_modules/@mantine/core/esm/components/CloseButton/CloseButton.mjs
var import_react88 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/CloseButton/CloseButton.module.css.mjs
var classes8 = { "root": "m-86a44da5", "root--subtle": "m-220c80f2" };

// node_modules/@mantine/core/esm/components/CloseButton/CloseButton.mjs
var defaultProps14 = {
  variant: "subtle"
};
var varsResolver7 = createVarsResolver((_, { size: size2, radius, iconSize }) => ({
  root: {
    "--cb-size": getSize(size2, "cb-size"),
    "--cb-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--cb-icon-size": rem(iconSize)
  }
}));
var CloseButton = polymorphicFactory((_props, ref) => {
  const props = useProps("CloseButton", defaultProps14, _props);
  const {
    iconSize,
    children,
    vars,
    radius,
    className,
    classNames,
    style,
    styles,
    unstyled,
    "data-disabled": dataDisabled,
    disabled,
    variant,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "CloseButton",
    props,
    className,
    style,
    classes: classes8,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver7
  });
  return import_react88.default.createElement(
    UnstyledButton,
    {
      ref,
      ...others,
      unstyled,
      variant,
      disabled,
      mod: { disabled: disabled || dataDisabled },
      ...getStyles2("root", { variant, active: true })
    },
    import_react88.default.createElement(CloseIcon, null),
    children
  );
});
CloseButton.classes = classes8;
CloseButton.displayName = "@mantine/core/CloseButton";

// node_modules/@mantine/core/esm/components/Group/Group.mjs
var import_react90 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Group/filter-falsy-children/filter-falsy-children.mjs
var import_react89 = __toESM(require_react(), 1);
function filterFalsyChildren(children) {
  return import_react89.Children.toArray(children).filter(Boolean);
}

// node_modules/@mantine/core/esm/components/Group/Group.module.css.mjs
var classes9 = { "root": "m-4081bf90" };

// node_modules/@mantine/core/esm/components/Group/Group.mjs
var defaultProps15 = {
  preventGrowOverflow: true,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
};
var varsResolver8 = createVarsResolver(
  (_, { grow, preventGrowOverflow, gap, align, justify, wrap }, { childWidth }) => ({
    root: {
      "--group-child-width": grow && preventGrowOverflow ? childWidth : void 0,
      "--group-gap": getSpacing(gap),
      "--group-align": align,
      "--group-justify": justify,
      "--group-wrap": wrap
    }
  })
);
var Group = factory((_props, ref) => {
  const props = useProps("Group", defaultProps15, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    children,
    gap,
    align,
    justify,
    wrap,
    grow,
    preventGrowOverflow,
    vars,
    variant,
    __size,
    ...others
  } = props;
  const filteredChildren = filterFalsyChildren(children);
  const childrenCount = filteredChildren.length;
  const resolvedGap = getSpacing(gap ?? "md");
  const childWidth = `calc(${100 / childrenCount}% - (${resolvedGap} - ${resolvedGap} / ${childrenCount}))`;
  const stylesCtx = { childWidth };
  const getStyles2 = useStyles({
    name: "Group",
    props,
    stylesCtx,
    className,
    style,
    classes: classes9,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver8
  });
  return import_react90.default.createElement(
    Box,
    {
      ...getStyles2("root"),
      ref,
      variant,
      mod: { grow },
      size: __size,
      ...others
    },
    filteredChildren
  );
});
Group.classes = classes9;
Group.displayName = "@mantine/core/Group";

// node_modules/@mantine/core/esm/components/Overlay/Overlay.mjs
var import_react91 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Overlay/Overlay.module.css.mjs
var classes10 = { "root": "m-9814e45f" };

// node_modules/@mantine/core/esm/components/Overlay/Overlay.mjs
var defaultProps16 = {
  zIndex: getDefaultZIndex("modal")
};
var varsResolver9 = createVarsResolver(
  (_, { gradient, color, backgroundOpacity, blur, radius, zIndex }) => ({
    root: {
      "--overlay-bg": gradient || (color !== void 0 || backgroundOpacity !== void 0) && rgba(color || "#000", backgroundOpacity ?? 0.6) || void 0,
      "--overlay-filter": blur ? `blur(${rem(blur)})` : void 0,
      "--overlay-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--overlay-z-index": zIndex == null ? void 0 : zIndex.toString()
    }
  })
);
var Overlay = polymorphicFactory((_props, ref) => {
  const props = useProps("Overlay", defaultProps16, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    fixed,
    center,
    children,
    radius,
    zIndex,
    gradient,
    blur,
    color,
    backgroundOpacity,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Overlay",
    props,
    classes: classes10,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver9
  });
  return import_react91.default.createElement(Box, { ref, ...getStyles2("root"), mod: { center, fixed }, ...others }, children);
});
Overlay.classes = classes10;
Overlay.displayName = "@mantine/core/Overlay";

// node_modules/@mantine/core/esm/components/ModalBase/ModalBase.mjs
var import_react95 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ModalBase/ModalBase.context.mjs
var import_react92 = __toESM(require_react(), 1);
var [ModalBaseProvider, useModalBaseContext] = createSafeContext(
  "ModalBase component was not found in tree"
);

// node_modules/@mantine/core/esm/components/ModalBase/use-modal.mjs
var import_react94 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ModalBase/use-lock-scroll.mjs
var import_react93 = __toESM(require_react(), 1);
function useLockScroll({ opened, transitionDuration }) {
  const [shouldLockScroll, setShouldLockScroll] = (0, import_react93.useState)(opened);
  const timeout = (0, import_react93.useRef)();
  const reduceMotion = useReducedMotion();
  const _transitionDuration = reduceMotion ? 0 : transitionDuration;
  (0, import_react93.useEffect)(() => {
    if (opened) {
      setShouldLockScroll(true);
      window.clearTimeout(timeout.current);
    } else if (_transitionDuration === 0) {
      setShouldLockScroll(false);
    } else {
      timeout.current = window.setTimeout(() => setShouldLockScroll(false), _transitionDuration);
    }
    return () => window.clearTimeout(timeout.current);
  }, [opened, _transitionDuration]);
  return shouldLockScroll;
}

// node_modules/@mantine/core/esm/components/ModalBase/use-modal.mjs
function useModal({
  id,
  transitionProps,
  opened,
  trapFocus,
  closeOnEscape: closeOnEscape2,
  onClose,
  returnFocus
}) {
  const _id = useId(id);
  const [titleMounted, setTitleMounted] = (0, import_react94.useState)(false);
  const [bodyMounted, setBodyMounted] = (0, import_react94.useState)(false);
  const transitionDuration = typeof (transitionProps == null ? void 0 : transitionProps.duration) === "number" ? transitionProps == null ? void 0 : transitionProps.duration : 200;
  const shouldLockScroll = useLockScroll({ opened, transitionDuration });
  useWindowEvent("keydown", (event) => {
    if (!trapFocus && event.key === "Escape" && closeOnEscape2) {
      onClose();
    }
  });
  useFocusReturn({ opened, shouldReturnFocus: trapFocus && returnFocus });
  return {
    _id,
    titleMounted,
    bodyMounted,
    shouldLockScroll,
    setTitleMounted,
    setBodyMounted
  };
}

// node_modules/@mantine/core/esm/components/ModalBase/ModalBase.mjs
var ModalBase = (0, import_react95.forwardRef)(
  ({
    keepMounted,
    opened,
    onClose,
    id,
    transitionProps,
    trapFocus,
    closeOnEscape: closeOnEscape2,
    returnFocus,
    closeOnClickOutside,
    withinPortal,
    portalProps,
    lockScroll,
    children,
    zIndex,
    shadow,
    padding,
    __vars,
    unstyled,
    removeScrollProps,
    ...others
  }, ref) => {
    const { _id, titleMounted, bodyMounted, shouldLockScroll, setTitleMounted, setBodyMounted } = useModal({ id, transitionProps, opened, trapFocus, closeOnEscape: closeOnEscape2, onClose, returnFocus });
    return import_react95.default.createElement(OptionalPortal, { ...portalProps, withinPortal }, import_react95.default.createElement(
      ModalBaseProvider,
      {
        value: {
          opened,
          onClose,
          closeOnClickOutside,
          transitionProps: { ...transitionProps, keepMounted },
          getTitleId: () => `${_id}-title`,
          getBodyId: () => `${_id}-body`,
          titleMounted,
          bodyMounted,
          setTitleMounted,
          setBodyMounted,
          trapFocus,
          closeOnEscape: closeOnEscape2,
          zIndex,
          unstyled
        }
      },
      import_react95.default.createElement(Combination_default, { enabled: shouldLockScroll && lockScroll, ...removeScrollProps }, import_react95.default.createElement(
        Box,
        {
          ref,
          ...others,
          __vars: {
            ...__vars,
            "--mb-z-index": (zIndex || getDefaultZIndex("modal")).toString(),
            "--mb-shadow": getShadow(shadow),
            "--mb-padding": getSpacing(padding)
          }
        },
        children
      ))
    ));
  }
);

// node_modules/@mantine/core/esm/components/ModalBase/ModalBaseBody.mjs
var import_react97 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ModalBase/use-modal-body-id.mjs
var import_react96 = __toESM(require_react(), 1);
function useModalBodyId() {
  const ctx = useModalBaseContext();
  (0, import_react96.useEffect)(() => {
    ctx.setBodyMounted(true);
    return () => ctx.setBodyMounted(false);
  }, []);
  return ctx.getBodyId();
}

// node_modules/@mantine/core/esm/components/ModalBase/ModalBase.module.css.mjs
var classes11 = { "title": "m-615af6c9", "header": "m-b5489c3c", "inner": "m-60c222c7", "content": "m-fd1ab0aa", "close": "m-606cb269", "body": "m-5df29311" };

// node_modules/@mantine/core/esm/components/ModalBase/ModalBaseBody.mjs
var ModalBaseBody = (0, import_react97.forwardRef)(
  ({ className, ...others }, ref) => {
    const bodyId = useModalBodyId();
    const ctx = useModalBaseContext();
    return import_react97.default.createElement(
      Box,
      {
        ref,
        ...others,
        id: bodyId,
        className: clsx_default({ [classes11.body]: !ctx.unstyled }, className)
      }
    );
  }
);
ModalBaseBody.displayName = "@mantine/core/ModalBaseBody";

// node_modules/@mantine/core/esm/components/ModalBase/ModalBaseCloseButton.mjs
var import_react98 = __toESM(require_react(), 1);
var ModalBaseCloseButton = (0, import_react98.forwardRef)(
  ({ className, onClick, ...others }, ref) => {
    const ctx = useModalBaseContext();
    return import_react98.default.createElement(
      CloseButton,
      {
        ref,
        ...others,
        onClick: (event) => {
          ctx.onClose();
          onClick == null ? void 0 : onClick(event);
        },
        className: clsx_default({ [classes11.close]: !ctx.unstyled }, className),
        unstyled: ctx.unstyled
      }
    );
  }
);
ModalBaseCloseButton.displayName = "@mantine/core/ModalBaseCloseButton";

// node_modules/@mantine/core/esm/components/ModalBase/ModalBaseContent.mjs
var import_react99 = __toESM(require_react(), 1);
var ModalBaseContent = (0, import_react99.forwardRef)(
  ({ transitionProps, className, innerProps, onKeyDown, style, ...others }, ref) => {
    const ctx = useModalBaseContext();
    const handleKeyDown = (event) => {
      var _a;
      const shouldTrigger = ((_a = event.target) == null ? void 0 : _a.getAttribute("data-mantine-stop-propagation")) !== "true";
      shouldTrigger && event.key === "Escape" && ctx.closeOnEscape && ctx.onClose();
      onKeyDown == null ? void 0 : onKeyDown(event);
    };
    return import_react99.default.createElement(
      Transition,
      {
        mounted: ctx.opened,
        transition: "pop",
        ...ctx.transitionProps,
        ...transitionProps
      },
      (transitionStyles) => import_react99.default.createElement(
        "div",
        {
          ...innerProps,
          className: clsx_default({ [classes11.inner]: !ctx.unstyled }, innerProps.className)
        },
        import_react99.default.createElement(FocusTrap, { active: ctx.opened && ctx.trapFocus }, import_react99.default.createElement(
          Paper,
          {
            ...others,
            component: "section",
            role: "dialog",
            tabIndex: -1,
            "aria-modal": true,
            "aria-describedby": ctx.bodyMounted ? ctx.getBodyId() : void 0,
            "aria-labelledby": ctx.titleMounted ? ctx.getTitleId() : void 0,
            onKeyDown: handleKeyDown,
            ref,
            style: [style, transitionStyles],
            className: clsx_default({ [classes11.content]: !ctx.unstyled }, className),
            unstyled: ctx.unstyled
          },
          others.children
        ))
      )
    );
  }
);

// node_modules/@mantine/core/esm/components/ModalBase/ModalBaseHeader.mjs
var import_react100 = __toESM(require_react(), 1);
var ModalBaseHeader = (0, import_react100.forwardRef)(
  ({ className, ...others }, ref) => {
    const ctx = useModalBaseContext();
    return import_react100.default.createElement(Box, { ref, className: clsx_default({ [classes11.header]: !ctx.unstyled }, className), ...others });
  }
);
ModalBaseHeader.displayName = "@mantine/core/ModalBaseHeader";

// node_modules/@mantine/core/esm/components/ModalBase/ModalBaseOverlay.mjs
var import_react101 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ModalBase/use-modal-transition.mjs
var DEFAULT_TRANSITION = {
  duration: 200,
  timingFunction: "ease",
  transition: "fade"
};
function useModalTransition(transitionOverride) {
  const ctx = useModalBaseContext();
  return { ...DEFAULT_TRANSITION, ...ctx.transitionProps, ...transitionOverride };
}

// node_modules/@mantine/core/esm/components/ModalBase/ModalBaseOverlay.mjs
var ModalBaseOverlay = (0, import_react101.forwardRef)(
  ({ onClick, transitionProps, style, ...others }, ref) => {
    const ctx = useModalBaseContext();
    const transition = useModalTransition(transitionProps);
    return import_react101.default.createElement(Transition, { mounted: ctx.opened, ...transition, transition: "fade" }, (transitionStyles) => import_react101.default.createElement(
      Overlay,
      {
        ref,
        fixed: true,
        style: [style, transitionStyles],
        zIndex: ctx.zIndex,
        unstyled: ctx.unstyled,
        onClick: (event) => {
          onClick == null ? void 0 : onClick(event);
          ctx.closeOnClickOutside && ctx.onClose();
        },
        ...others
      }
    ));
  }
);
ModalBaseOverlay.displayName = "@mantine/core/ModalBaseOverlay";

// node_modules/@mantine/core/esm/components/ModalBase/ModalBaseTitle.mjs
var import_react103 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ModalBase/use-modal-title-id.mjs
var import_react102 = __toESM(require_react(), 1);
function useModalTitle() {
  const ctx = useModalBaseContext();
  (0, import_react102.useEffect)(() => {
    ctx.setTitleMounted(true);
    return () => ctx.setTitleMounted(false);
  }, []);
  return ctx.getTitleId();
}

// node_modules/@mantine/core/esm/components/ModalBase/ModalBaseTitle.mjs
var ModalBaseTitle = (0, import_react103.forwardRef)(
  ({ className, ...others }, ref) => {
    const id = useModalTitle();
    const ctx = useModalBaseContext();
    return import_react103.default.createElement(
      Box,
      {
        component: "h2",
        ref,
        className: clsx_default({ [classes11.title]: !ctx.unstyled }, className),
        ...others,
        id
      }
    );
  }
);
ModalBaseTitle.displayName = "@mantine/core/ModalBaseTitle";

// node_modules/@mantine/core/esm/components/ModalBase/NativeScrollArea.mjs
var import_react104 = __toESM(require_react(), 1);
function NativeScrollArea({ children }) {
  return import_react104.default.createElement(import_react104.default.Fragment, null, children);
}

// node_modules/@mantine/core/esm/components/Input/Input.mjs
var import_react111 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Input/InputWrapper.context.mjs
var import_react105 = __toESM(require_react(), 1);
var [InputWrapperProvider, useInputWrapperContext] = createOptionalContext({
  offsetBottom: false,
  offsetTop: false,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0
});

// node_modules/@mantine/core/esm/components/Input/InputLabel/InputLabel.mjs
var import_react106 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Input/Input.module.css.mjs
var classes12 = { "wrapper": "m-6c018570", "input": "m-8fb7ebe7", "section": "m-82577fc2", "placeholder": "m-88bacfd0", "root": "m-46b77525", "label": "m-8fdc1311", "required": "m-78a94662", "error": "m-8f816625", "description": "m-fe47ce59" };

// node_modules/@mantine/core/esm/components/Input/InputLabel/InputLabel.mjs
var defaultProps17 = {
  labelElement: "label"
};
var varsResolver10 = createVarsResolver((_, { size: size2 }) => ({
  label: {
    "--input-label-size": getFontSize(size2),
    "--input-asterisk-color": void 0
  }
}));
var InputLabel = factory((_props, ref) => {
  const props = useProps("InputLabel", defaultProps17, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    labelElement,
    size: size2,
    required,
    htmlFor,
    onMouseDown,
    children,
    __staticSelector,
    variant,
    ...others
  } = useProps("InputLabel", defaultProps17, props);
  const _getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props,
    classes: classes12,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "label",
    vars,
    varsResolver: varsResolver10
  });
  const ctx = useInputWrapperContext();
  const getStyles2 = (ctx == null ? void 0 : ctx.getStyles) || _getStyles;
  return import_react106.default.createElement(
    Box,
    {
      ...getStyles2("label"),
      component: labelElement,
      variant,
      size: size2,
      ref,
      htmlFor: labelElement === "label" ? htmlFor : void 0,
      mod: { required },
      onMouseDown: (event) => {
        onMouseDown == null ? void 0 : onMouseDown(event);
        if (!event.defaultPrevented && event.detail > 1) {
          event.preventDefault();
        }
      },
      ...others
    },
    children,
    required && import_react106.default.createElement("span", { ...getStyles2("required"), "aria-hidden": true }, " *")
  );
});
InputLabel.classes = classes12;
InputLabel.displayName = "@mantine/core/InputLabel";

// node_modules/@mantine/core/esm/components/Input/InputError/InputError.mjs
var import_react107 = __toESM(require_react(), 1);
var defaultProps18 = {};
var varsResolver11 = createVarsResolver((_, { size: size2 }) => ({
  error: {
    "--input-error-size": size2 === void 0 ? void 0 : `calc(${getFontSize(size2)} - ${rem(2)})`
  }
}));
var InputError = factory((_props, ref) => {
  const props = useProps("InputError", defaultProps18, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    __staticSelector,
    __inheritStyles = true,
    variant,
    ...others
  } = props;
  const _getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props,
    classes: classes12,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "error",
    vars,
    varsResolver: varsResolver11
  });
  const ctx = useInputWrapperContext();
  const getStyles2 = __inheritStyles && (ctx == null ? void 0 : ctx.getStyles) || _getStyles;
  return import_react107.default.createElement(
    Box,
    {
      component: "p",
      ref,
      variant,
      size: size2,
      ...getStyles2("error"),
      ...others
    }
  );
});
InputError.classes = classes12;
InputError.displayName = "@mantine/core/InputError";

// node_modules/@mantine/core/esm/components/Input/InputDescription/InputDescription.mjs
var import_react108 = __toESM(require_react(), 1);
var defaultProps19 = {};
var varsResolver12 = createVarsResolver((_, { size: size2 }) => ({
  description: {
    "--input-description-size": size2 === void 0 ? void 0 : `calc(${getFontSize(size2)} - ${rem(2)})`
  }
}));
var InputDescription = factory((_props, ref) => {
  const props = useProps("InputDescription", defaultProps19, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    __staticSelector,
    __inheritStyles = true,
    variant,
    ...others
  } = useProps("InputDescription", defaultProps19, props);
  const ctx = useInputWrapperContext();
  const _getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props,
    classes: classes12,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "description",
    vars,
    varsResolver: varsResolver12
  });
  const getStyles2 = __inheritStyles && (ctx == null ? void 0 : ctx.getStyles) || _getStyles;
  return import_react108.default.createElement(
    Box,
    {
      component: "p",
      ref,
      variant,
      size: size2,
      ...getStyles2("description"),
      ...others
    }
  );
});
InputDescription.classes = classes12;
InputDescription.displayName = "@mantine/core/InputDescription";

// node_modules/@mantine/core/esm/components/Input/InputPlaceholder/InputPlaceholder.mjs
var import_react109 = __toESM(require_react(), 1);
var defaultProps20 = {};
var InputPlaceholder = factory((_props, ref) => {
  const props = useProps("InputPlaceholder", defaultProps20, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    __staticSelector,
    variant,
    error,
    ...others
  } = useProps("InputPlaceholder", defaultProps20, props);
  const getStyles2 = useStyles({
    name: ["InputPlaceholder", __staticSelector],
    props,
    classes: classes12,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "placeholder"
  });
  return import_react109.default.createElement(
    Box,
    {
      ...getStyles2("placeholder"),
      mod: { error: !!error },
      component: "span",
      variant,
      ref,
      ...others
    }
  );
});
InputPlaceholder.classes = classes12;
InputPlaceholder.displayName = "@mantine/core/InputPlaceholder";

// node_modules/@mantine/core/esm/components/Input/InputWrapper/InputWrapper.mjs
var import_react110 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Input/InputWrapper/get-input-offsets/get-input-offsets.mjs
function getInputOffsets(inputWrapperOrder, { hasDescription, hasError }) {
  const inputIndex = inputWrapperOrder.findIndex((part) => part === "input");
  const aboveInput = inputWrapperOrder[inputIndex - 1];
  const belowInput = inputWrapperOrder[inputIndex + 1];
  const offsetTop = hasDescription && aboveInput === "description" || hasError && aboveInput === "error";
  const offsetBottom = hasDescription && belowInput === "description" || hasError && belowInput === "error";
  return { offsetBottom, offsetTop };
}

// node_modules/@mantine/core/esm/components/Input/InputWrapper/InputWrapper.mjs
var defaultProps21 = {
  labelElement: "label",
  inputContainer: (children) => children,
  inputWrapperOrder: ["label", "description", "input", "error"]
};
var varsResolver13 = createVarsResolver((_, { size: size2 }) => ({
  label: {
    "--input-label-size": getFontSize(size2),
    "--input-asterisk-color": void 0
  },
  error: {
    "--input-error-size": size2 === void 0 ? void 0 : `calc(${getFontSize(size2)} - ${rem(2)})`
  },
  description: {
    "--input-description-size": size2 === void 0 ? void 0 : `calc(${getFontSize(size2)} - ${rem(2)})`
  }
}));
var InputWrapper = factory((_props, ref) => {
  const props = useProps("InputWrapper", defaultProps21, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    variant,
    __staticSelector,
    inputContainer,
    inputWrapperOrder,
    label,
    error,
    description,
    labelProps,
    descriptionProps,
    errorProps,
    labelElement,
    children,
    withAsterisk,
    id,
    required,
    __stylesApiProps,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: ["InputWrapper", __staticSelector],
    props: __stylesApiProps || props,
    classes: classes12,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver13
  });
  const sharedProps = {
    size: size2,
    variant,
    __staticSelector
  };
  const idBase = useId(id);
  const isRequired = typeof withAsterisk === "boolean" ? withAsterisk : required;
  const errorId = (errorProps == null ? void 0 : errorProps.id) || `${idBase}-error`;
  const descriptionId = (descriptionProps == null ? void 0 : descriptionProps.id) || `${idBase}-description`;
  const inputId = idBase;
  const hasError = !!error && typeof error !== "boolean";
  const hasDescription = !!description;
  const _describedBy = `${hasError ? errorId : ""} ${hasDescription ? descriptionId : ""}`;
  const describedBy = _describedBy.trim().length > 0 ? _describedBy.trim() : void 0;
  const labelId = (labelProps == null ? void 0 : labelProps.id) || `${idBase}-label`;
  const _label = label && import_react110.default.createElement(
    InputLabel,
    {
      key: "label",
      labelElement,
      id: labelId,
      htmlFor: inputId,
      required: isRequired,
      ...sharedProps,
      ...labelProps
    },
    label
  );
  const _description = hasDescription && import_react110.default.createElement(
    InputDescription,
    {
      key: "description",
      ...descriptionProps,
      ...sharedProps,
      size: (descriptionProps == null ? void 0 : descriptionProps.size) || sharedProps.size,
      id: (descriptionProps == null ? void 0 : descriptionProps.id) || descriptionId
    },
    description
  );
  const _input = import_react110.default.createElement(import_react110.default.Fragment, { key: "input" }, inputContainer(children));
  const _error = hasError && import_react110.default.createElement(
    InputError,
    {
      ...errorProps,
      ...sharedProps,
      size: (errorProps == null ? void 0 : errorProps.size) || sharedProps.size,
      key: "error",
      id: (errorProps == null ? void 0 : errorProps.id) || errorId
    },
    error
  );
  const content = inputWrapperOrder.map((part) => {
    switch (part) {
      case "label":
        return _label;
      case "input":
        return _input;
      case "description":
        return _description;
      case "error":
        return _error;
      default:
        return null;
    }
  });
  return import_react110.default.createElement(
    InputWrapperProvider,
    {
      value: {
        getStyles: getStyles2,
        describedBy,
        inputId,
        labelId,
        ...getInputOffsets(inputWrapperOrder, { hasDescription, hasError })
      }
    },
    import_react110.default.createElement(Box, { ref, variant, size: size2, ...getStyles2("root"), ...others }, content)
  );
});
InputWrapper.classes = classes12;
InputWrapper.displayName = "@mantine/core/InputWrapper";

// node_modules/@mantine/core/esm/components/Input/Input.mjs
var defaultProps22 = {
  variant: "default",
  leftSectionPointerEvents: "none",
  rightSectionPointerEvents: "none",
  withAria: true,
  withErrorStyles: true
};
var varsResolver14 = createVarsResolver((_, props, ctx) => ({
  wrapper: {
    "--input-margin-top": ctx.offsetTop ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-margin-bottom": ctx.offsetBottom ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-height": getSize(props.size, "input-height"),
    "--input-fz": getFontSize(props.size),
    "--input-radius": props.radius === void 0 ? void 0 : getRadius(props.radius),
    "--input-left-section-width": props.leftSectionWidth !== void 0 ? rem(props.leftSectionWidth) : void 0,
    "--input-right-section-width": props.rightSectionWidth !== void 0 ? rem(props.rightSectionWidth) : void 0,
    "--input-padding-y": props.multiline ? getSize(props.size, "input-padding-y") : void 0,
    "--input-left-section-pointer-events": props.leftSectionPointerEvents,
    "--input-right-section-pointer-events": props.rightSectionPointerEvents
  }
}));
var Input = polymorphicFactory((_props, ref) => {
  const props = useProps("Input", defaultProps22, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    required,
    __staticSelector,
    __stylesApiProps,
    size: size2,
    wrapperProps,
    error,
    disabled,
    leftSection,
    leftSectionProps,
    leftSectionWidth,
    rightSection,
    rightSectionProps,
    rightSectionWidth,
    rightSectionPointerEvents,
    leftSectionPointerEvents,
    variant,
    vars,
    pointer,
    multiline,
    radius,
    id,
    withAria,
    withErrorStyles,
    ...others
  } = props;
  const { styleProps, rest } = extractStyleProps(others);
  const ctx = useInputWrapperContext();
  const stylesCtx = { offsetBottom: ctx == null ? void 0 : ctx.offsetBottom, offsetTop: ctx == null ? void 0 : ctx.offsetTop };
  const getStyles2 = useStyles({
    name: ["Input", __staticSelector],
    props: __stylesApiProps || props,
    classes: classes12,
    className,
    style,
    classNames,
    styles,
    unstyled,
    stylesCtx,
    rootSelector: "wrapper",
    vars,
    varsResolver: varsResolver14
  });
  const ariaAttributes = withAria ? {
    required,
    disabled,
    "aria-invalid": !!error,
    "aria-describedby": ctx == null ? void 0 : ctx.describedBy,
    id: (ctx == null ? void 0 : ctx.inputId) || id
  } : {};
  return import_react111.default.createElement(
    Box,
    {
      ...getStyles2("wrapper"),
      ...styleProps,
      ...wrapperProps,
      mod: {
        error: !!error && withErrorStyles,
        pointer,
        disabled,
        multiline,
        "data-with-right-section": !!rightSection,
        "data-with-left-section": !!leftSection
      },
      variant,
      size: size2
    },
    leftSection && import_react111.default.createElement(
      "div",
      {
        ...leftSectionProps,
        "data-position": "left",
        ...getStyles2("section", {
          className: leftSectionProps == null ? void 0 : leftSectionProps.className,
          style: leftSectionProps == null ? void 0 : leftSectionProps.style
        })
      },
      leftSection
    ),
    import_react111.default.createElement(
      Box,
      {
        component: "input",
        ...rest,
        ...ariaAttributes,
        ref,
        required,
        mod: { disabled, error: !!error && withErrorStyles },
        variant,
        ...getStyles2("input")
      }
    ),
    rightSection && import_react111.default.createElement(
      "div",
      {
        ...rightSectionProps,
        "data-position": "right",
        ...getStyles2("section", {
          className: rightSectionProps == null ? void 0 : rightSectionProps.className,
          style: rightSectionProps == null ? void 0 : rightSectionProps.style
        })
      },
      rightSection
    )
  );
});
Input.classes = classes12;
Input.Wrapper = InputWrapper;
Input.Label = InputLabel;
Input.Error = InputError;
Input.Description = InputDescription;
Input.Placeholder = InputPlaceholder;
Input.displayName = "@mantine/core/Input";

// node_modules/@mantine/core/esm/components/Input/use-input-props.mjs
var import_react112 = __toESM(require_react(), 1);
function useInputProps(component, defaultProps174, _props) {
  const props = useProps(component, defaultProps174, _props);
  const {
    label,
    description,
    error,
    required,
    classNames,
    styles,
    className,
    unstyled,
    __staticSelector,
    __stylesApiProps,
    errorProps,
    labelProps,
    descriptionProps,
    wrapperProps: _wrapperProps,
    id,
    size: size2,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    variant,
    vars,
    ...others
  } = props;
  const { styleProps, rest } = extractStyleProps(others);
  const wrapperProps = {
    label,
    description,
    error,
    required,
    classNames,
    className,
    __staticSelector,
    __stylesApiProps: __stylesApiProps || props,
    errorProps,
    labelProps,
    descriptionProps,
    unstyled,
    styles,
    size: size2,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    variant,
    id,
    ..._wrapperProps
  };
  return {
    ...rest,
    classNames,
    styles,
    unstyled,
    wrapperProps: { ...wrapperProps, ...styleProps },
    inputProps: {
      required,
      classNames,
      styles,
      unstyled,
      size: size2,
      __staticSelector,
      __stylesApiProps: __stylesApiProps || props,
      error,
      variant,
      id
    }
  };
}

// node_modules/@mantine/core/esm/components/InputBase/InputBase.mjs
var import_react113 = __toESM(require_react(), 1);
var defaultProps23 = {
  __staticSelector: "InputBase",
  withAria: true
};
var InputBase = polymorphicFactory((props, ref) => {
  const { inputProps, wrapperProps, ...others } = useInputProps("InputBase", defaultProps23, props);
  return import_react113.default.createElement(Input.Wrapper, { ...wrapperProps }, import_react113.default.createElement(Input, { ...inputProps, ...others, ref }));
});
InputBase.classes = { ...Input.classes, ...Input.Wrapper.classes };
InputBase.displayName = "@mantine/core/InputBase";

// node_modules/@mantine/core/esm/components/Flex/flex-props.mjs
var FLEX_STYLE_PROPS_DATA = {
  gap: { type: "spacing", property: "gap" },
  rowGap: { type: "spacing", property: "rowGap" },
  columnGap: { type: "spacing", property: "columnGap" },
  align: { type: "identity", property: "alignItems" },
  justify: { type: "identity", property: "justifyContent" },
  wrap: { type: "identity", property: "flexWrap" },
  direction: { type: "identity", property: "flexDirection" }
};

// node_modules/@mantine/core/esm/components/Flex/Flex.mjs
var import_react114 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Flex/Flex.module.css.mjs
var classes13 = { "root": "m-8bffd616" };

// node_modules/@mantine/core/esm/components/Flex/Flex.mjs
var defaultProps24 = {};
var Flex = polymorphicFactory((_props, ref) => {
  const props = useProps("Flex", defaultProps24, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    gap,
    rowGap,
    columnGap,
    align,
    justify,
    wrap,
    direction,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Flex",
    classes: classes13,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars
  });
  const theme = useMantineTheme();
  const responsiveClassName = useRandomClassName();
  const parsedStyleProps = parseStyleProps({
    styleProps: { gap, rowGap, columnGap, align, justify, wrap, direction },
    theme,
    data: FLEX_STYLE_PROPS_DATA
  });
  return import_react114.default.createElement(import_react114.default.Fragment, null, parsedStyleProps.hasResponsiveStyles && import_react114.default.createElement(
    InlineStyles,
    {
      selector: `.${responsiveClassName}`,
      styles: parsedStyleProps.styles,
      media: parsedStyleProps.media
    }
  ), import_react114.default.createElement(
    Box,
    {
      ref,
      ...getStyles2("root", {
        className: responsiveClassName,
        style: filterProps(parsedStyleProps.inlineStyles)
      }),
      ...others
    }
  ));
});
Flex.classes = classes13;
Flex.displayName = "@mantine/core/Flex";

// node_modules/@mantine/core/esm/components/Accordion/Accordion.mjs
var import_react121 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Accordion/AccordionChevron.mjs
var import_react115 = __toESM(require_react(), 1);
function AccordionChevron({ style, size: size2 = 16, ...others }) {
  return import_react115.default.createElement(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...style, width: rem(size2), height: rem(size2), display: "block" },
      ...others
    },
    import_react115.default.createElement(
      "path",
      {
        d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  );
}
AccordionChevron.displayName = "@mantine/core/AccordionChevron";

// node_modules/@mantine/core/esm/components/Accordion/AccordionItem/AccordionItem.mjs
var import_react118 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Accordion/Accordion.context.mjs
var import_react116 = __toESM(require_react(), 1);
var [AccordionProvider, useAccordionContext] = createSafeContext(
  "Accordion component was not found in the tree"
);

// node_modules/@mantine/core/esm/components/Accordion/AccordionItem.context.mjs
var import_react117 = __toESM(require_react(), 1);
var [AccordionItemProvider, useAccordionItemContext] = createSafeContext("Accordion.Item component was not found in the tree");

// node_modules/@mantine/core/esm/components/Accordion/Accordion.module.css.mjs
var classes14 = { "root": "m-9bdbb667", "panel": "m-df78851f", "content": "m-4ba554d4", "itemTitle": "m-8fa820a0", "control": "m-4ba585b8", "control--default": "m-6939a5e9", "control--contained": "m-4271d21b", "label": "m-df3ffa0f", "chevron": "m-3f35ae96", "icon": "m-9bd771fe", "item": "m-9bd7b098", "item--default": "m-fe19b709", "item--contained": "m-1f921b3b", "item--filled": "m-2cdf939a", "item--separated": "m-9f59b069" };

// node_modules/@mantine/core/esm/components/Accordion/AccordionItem/AccordionItem.mjs
var defaultProps25 = {};
var AccordionItem = factory((props, ref) => {
  const { classNames, className, style, styles, vars, value, ...others } = useProps(
    "AccordionItem",
    defaultProps25,
    props
  );
  const ctx = useAccordionContext();
  return import_react118.default.createElement(AccordionItemProvider, { value: { value } }, import_react118.default.createElement(
    Box,
    {
      ref,
      mod: { active: ctx.isItemActive(value) },
      ...ctx.getStyles("item", { className, classNames, styles, style, variant: ctx.variant }),
      ...others
    }
  ));
});
AccordionItem.displayName = "@mantine/core/AccordionItem";
AccordionItem.classes = classes14;

// node_modules/@mantine/core/esm/components/Accordion/AccordionPanel/AccordionPanel.mjs
var import_react119 = __toESM(require_react(), 1);
var defaultProps26 = {};
var AccordionPanel = factory((props, ref) => {
  const { classNames, className, style, styles, vars, children, ...others } = useProps(
    "AccordionPanel",
    defaultProps26,
    props
  );
  const { value } = useAccordionItemContext();
  const ctx = useAccordionContext();
  return import_react119.default.createElement(
    Collapse,
    {
      ref,
      ...ctx.getStyles("panel", { className, classNames, style, styles }),
      ...others,
      in: ctx.isItemActive(value),
      transitionDuration: ctx.transitionDuration ?? 200,
      role: "region",
      id: ctx.getRegionId(value),
      "aria-labelledby": ctx.getControlId(value)
    },
    import_react119.default.createElement("div", { ...ctx.getStyles("content", { classNames, styles }) }, children)
  );
});
AccordionPanel.displayName = "@mantine/core/AccordionPanel";
AccordionPanel.classes = classes14;

// node_modules/@mantine/core/esm/components/Accordion/AccordionControl/AccordionControl.mjs
var import_react120 = __toESM(require_react(), 1);
var defaultProps27 = {};
var AccordionControl = factory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    chevron,
    icon,
    onClick,
    onKeyDown,
    children,
    disabled,
    ...others
  } = useProps("AccordionControl", defaultProps27, props);
  const { value } = useAccordionItemContext();
  const ctx = useAccordionContext();
  const isActive = ctx.isItemActive(value);
  const shouldWrapWithHeading = typeof ctx.order === "number";
  const Heading = `h${ctx.order}`;
  const content = import_react120.default.createElement(
    UnstyledButton,
    {
      ...others,
      ...ctx.getStyles("control", { className, classNames, style, styles, variant: ctx.variant }),
      unstyled: ctx.unstyled,
      mod: [
        "accordion-control",
        { active: isActive, "chevron-position": ctx.chevronPosition, disabled }
      ],
      ref,
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        ctx.onChange(value);
      },
      type: "button",
      disabled,
      "aria-expanded": isActive,
      "aria-controls": ctx.getRegionId(value),
      id: ctx.getControlId(value),
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: "[data-accordion-control]",
        parentSelector: "[data-accordion]",
        activateOnFocus: false,
        loop: ctx.loop,
        orientation: "vertical",
        onKeyDown
      })
    },
    import_react120.default.createElement(
      Box,
      {
        component: "span",
        mod: { rotate: !ctx.disableChevronRotation && isActive, position: ctx.chevronPosition },
        ...ctx.getStyles("chevron", { classNames, styles })
      },
      chevron || ctx.chevron
    ),
    import_react120.default.createElement("span", { ...ctx.getStyles("label", { classNames, styles }) }, children),
    icon && import_react120.default.createElement(
      Box,
      {
        component: "span",
        mod: { "chevron-position": ctx.chevronPosition },
        ...ctx.getStyles("icon", { classNames, styles })
      },
      icon
    )
  );
  return shouldWrapWithHeading ? import_react120.default.createElement(Heading, { ...ctx.getStyles("itemTitle", { classNames, styles }) }, content) : content;
});
AccordionControl.displayName = "@mantine/core/AccordionControl";
AccordionControl.classes = classes14;

// node_modules/@mantine/core/esm/components/Accordion/Accordion.mjs
var defaultProps28 = {
  multiple: false,
  disableChevronRotation: false,
  chevronPosition: "right",
  variant: "default",
  chevron: import_react121.default.createElement(AccordionChevron, null)
};
var varsResolver15 = createVarsResolver(
  (_, { transitionDuration, chevronSize, radius }) => ({
    root: {
      "--accordion-transition-duration": transitionDuration === void 0 ? void 0 : `${transitionDuration}ms`,
      "--accordion-chevron-size": chevronSize === void 0 ? void 0 : rem(chevronSize),
      "--accordion-radius": radius === void 0 ? void 0 : getRadius(radius)
    }
  })
);
function Accordion(_props) {
  const props = useProps("Accordion", defaultProps28, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    multiple,
    value,
    defaultValue,
    onChange,
    id,
    loop,
    transitionDuration,
    disableChevronRotation,
    chevronPosition,
    chevronSize,
    order,
    chevron,
    variant,
    radius,
    ...others
  } = props;
  const uid = useId(id);
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: multiple ? [] : null,
    onChange
  });
  const isItemActive = (itemValue) => Array.isArray(_value) ? _value.includes(itemValue) : itemValue === _value;
  const handleItemChange = (itemValue) => {
    const nextValue = Array.isArray(_value) ? _value.includes(itemValue) ? _value.filter((selectedValue) => selectedValue !== itemValue) : [..._value, itemValue] : itemValue === _value ? null : itemValue;
    handleChange(nextValue);
  };
  const getStyles2 = useStyles({
    name: "Accordion",
    classes: classes14,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver15
  });
  return import_react121.default.createElement(
    AccordionProvider,
    {
      value: {
        isItemActive,
        onChange: handleItemChange,
        getControlId: getSafeId(
          `${uid}-control`,
          "Accordion.Item component was rendered with invalid value or without value"
        ),
        getRegionId: getSafeId(
          `${uid}-panel`,
          "Accordion.Item component was rendered with invalid value or without value"
        ),
        transitionDuration,
        disableChevronRotation,
        chevronPosition,
        order,
        chevron,
        loop,
        getStyles: getStyles2,
        variant,
        unstyled
      }
    },
    import_react121.default.createElement(Box, { ...getStyles2("root"), id: uid, ...others, variant, "data-accordion": true }, children)
  );
}
var extendAccordion = (c) => c;
Accordion.extend = extendAccordion;
Accordion.classes = classes14;
Accordion.displayName = "@mantine/core/Accordion";
Accordion.Item = AccordionItem;
Accordion.Panel = AccordionPanel;
Accordion.Control = AccordionControl;
Accordion.Chevron = AccordionChevron;

// node_modules/@mantine/core/esm/components/Affix/Affix.mjs
var import_react122 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Affix/Affix.module.css.mjs
var classes15 = { "root": "m-7f854edf" };

// node_modules/@mantine/core/esm/components/Affix/Affix.mjs
var defaultProps29 = {
  position: { bottom: 0, right: 0 },
  zIndex: getDefaultZIndex("modal"),
  withinPortal: true
};
var varsResolver16 = createVarsResolver((_, { zIndex, position }) => ({
  root: {
    "--affix-z-index": zIndex == null ? void 0 : zIndex.toString(),
    "--affix-top": rem(position == null ? void 0 : position.top),
    "--affix-left": rem(position == null ? void 0 : position.left),
    "--affix-bottom": rem(position == null ? void 0 : position.bottom),
    "--affix-right": rem(position == null ? void 0 : position.right)
  }
}));
var Affix = factory((_props, ref) => {
  const props = useProps("Affix", defaultProps29, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    portalProps,
    zIndex,
    withinPortal,
    position,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Affix",
    classes: classes15,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver16
  });
  return import_react122.default.createElement(OptionalPortal, { ...portalProps, withinPortal }, import_react122.default.createElement(Box, { ref, ...getStyles2("root"), ...others }));
});
Affix.classes = classes15;
Affix.displayName = "@mantine/core/Affix";

// node_modules/@mantine/core/esm/components/Alert/Alert.mjs
var import_react123 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Alert/Alert.module.css.mjs
var classes16 = { "root": "m-66836ed3", "root--filled": "m-12b2e6d5", "root--white": "m-cffd1856", "wrapper": "m-a5d60502", "body": "m-667c2793", "title": "m-6a03f287", "label": "m-698f4f23", "icon": "m-667f2a6a", "message": "m-7fa78076", "closeButton": "m-87f54839" };

// node_modules/@mantine/core/esm/components/Alert/Alert.mjs
var defaultProps30 = {};
var varsResolver17 = createVarsResolver((theme, { radius, color, variant }) => {
  const colors = theme.variantColorResolver({
    color: color || theme.primaryColor,
    theme,
    variant: variant || "light"
  });
  return {
    root: {
      "--alert-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--alert-bg": color || variant ? colors.background : void 0,
      "--alert-color": color || variant ? colors.color : void 0,
      "--alert-bd": color || variant ? colors.border : void 0
    }
  };
});
var Alert = factory((_props, ref) => {
  const props = useProps("Alert", defaultProps30, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    radius,
    color,
    title,
    children,
    id,
    icon,
    withCloseButton,
    onClose,
    closeButtonLabel,
    variant,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Alert",
    classes: classes16,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver17
  });
  const rootId = useId(id);
  const titleId = title && `${rootId}-title` || void 0;
  const bodyId = `${rootId}-body`;
  return import_react123.default.createElement(
    Box,
    {
      id: rootId,
      ...getStyles2("root", { variant }),
      variant,
      ref,
      ...others,
      role: "alert",
      "aria-describedby": bodyId,
      "aria-labelledby": titleId
    },
    import_react123.default.createElement("div", { ...getStyles2("wrapper") }, icon && import_react123.default.createElement("div", { ...getStyles2("icon") }, icon), import_react123.default.createElement("div", { ...getStyles2("body") }, title && import_react123.default.createElement("div", { ...getStyles2("title"), "data-with-close-button": withCloseButton || void 0 }, import_react123.default.createElement("span", { id: titleId, ...getStyles2("label") }, title)), children && import_react123.default.createElement("div", { id: bodyId, ...getStyles2("message") }, children)), withCloseButton && import_react123.default.createElement(
      CloseButton,
      {
        ...getStyles2("closeButton"),
        onClick: onClose,
        variant: "transparent",
        size: 16,
        iconSize: 16,
        "aria-label": closeButtonLabel,
        unstyled
      }
    ))
  );
});
Alert.classes = classes16;
Alert.displayName = "@mantine/core/Alert";

// node_modules/@mantine/core/esm/components/Anchor/Anchor.mjs
var import_react125 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Text/Text.mjs
var import_react124 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Text/Text.module.css.mjs
var classes17 = { "root": "m-b6d8b162" };

// node_modules/@mantine/core/esm/components/Text/Text.mjs
function getTextTruncate(truncate) {
  if (truncate === "start") {
    return "start";
  }
  if (truncate === "end" || truncate) {
    return "end";
  }
  return void 0;
}
var defaultProps31 = {
  inherit: false
};
var varsResolver18 = createVarsResolver(
  (theme, { variant, lineClamp, gradient, size: size2, color }) => ({
    root: {
      "--text-fz": getFontSize(size2),
      "--text-lh": getLineHeight(size2),
      "--text-gradient": variant === "gradient" ? getGradient(gradient, theme) : void 0,
      "--text-line-clamp": typeof lineClamp === "number" ? lineClamp.toString() : void 0,
      "--text-color": color ? getThemeColor(color, theme) : void 0
    }
  })
);
var Text = polymorphicFactory((_props, ref) => {
  const props = useProps("Text", defaultProps31, _props);
  const {
    lineClamp,
    truncate,
    inline: inline2,
    inherit,
    gradient,
    span,
    __staticSelector,
    vars,
    className,
    style,
    classNames,
    styles,
    unstyled,
    variant,
    mod,
    size: size2,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: ["Text", __staticSelector],
    props,
    classes: classes17,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver18
  });
  return import_react124.default.createElement(
    Box,
    {
      ...getStyles2("root", { focusable: true }),
      ref,
      component: span ? "span" : "p",
      variant,
      mod: [
        {
          "data-truncate": getTextTruncate(truncate),
          "data-line-clamp": typeof lineClamp === "number",
          "data-inline": inline2,
          "data-inherit": inherit
        },
        mod
      ],
      size: size2,
      ...others
    }
  );
});
Text.classes = classes17;
Text.displayName = "@mantine/core/Text";

// node_modules/@mantine/core/esm/components/Anchor/Anchor.module.css.mjs
var classes18 = { "root": "m-849cf0da" };

// node_modules/@mantine/core/esm/components/Anchor/Anchor.mjs
var defaultProps32 = {
  underline: "hover"
};
var Anchor = polymorphicFactory((props, ref) => {
  const { underline, className, unstyled, ...others } = useProps("Anchor", defaultProps32, props);
  return import_react125.default.createElement(
    Text,
    {
      component: "a",
      ref,
      className: clsx_default({ [classes18.root]: !unstyled }, className),
      ...others,
      mod: { underline },
      __staticSelector: "Anchor",
      unstyled
    }
  );
});
Anchor.classes = classes18;
Anchor.displayName = "@mantine/core/Anchor";

// node_modules/@mantine/core/esm/components/AppShell/AppShell.mjs
var import_react142 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/AppShell/AppShellNavbar/AppShellNavbar.mjs
var import_react127 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/AppShell/AppShell.context.mjs
var import_react126 = __toESM(require_react(), 1);
var [AppShellProvider, useAppShellContext] = createSafeContext(
  "AppShell was not found in tree"
);

// node_modules/@mantine/core/esm/components/AppShell/AppShell.module.css.mjs
var classes19 = { "root": "m-89ab340", "navbar": "m-45252eee", "aside": "m-9cdde9a", "header": "m-3b16f56b", "main": "m-8983817", "footer": "m-3840c879", "section": "m-6dcfc7c7" };

// node_modules/@mantine/core/esm/components/AppShell/AppShellNavbar/AppShellNavbar.mjs
var defaultProps33 = {};
var AppShellNavbar = factory((_props, ref) => {
  const props = useProps("AppShellNavbar", defaultProps33, _props);
  const { classNames, className, style, styles, unstyled, vars, withBorder, zIndex, ...others } = props;
  const ctx = useAppShellContext();
  if (ctx.disabled) {
    return null;
  }
  return import_react127.default.createElement(
    Box,
    {
      component: "nav",
      ref,
      mod: { "with-border": withBorder ?? ctx.withBorder },
      ...ctx.getStyles("navbar", { className, classNames, styles, style }),
      ...others,
      __vars: {
        "--app-shell-navbar-z-index": `calc(${zIndex ?? ctx.zIndex} + 1)`
      }
    }
  );
});
AppShellNavbar.classes = classes19;
AppShellNavbar.displayName = "@mantine/core/AppShellNavbar";

// node_modules/@mantine/core/esm/components/AppShell/AppShellHeader/AppShellHeader.mjs
var import_react128 = __toESM(require_react(), 1);
var defaultProps34 = {};
var AppShellHeader = factory((_props, ref) => {
  var _a;
  const props = useProps("AppShellHeader", defaultProps34, _props);
  const { classNames, className, style, styles, unstyled, vars, withBorder, zIndex, ...others } = props;
  const ctx = useAppShellContext();
  if (ctx.disabled) {
    return null;
  }
  return import_react128.default.createElement(
    Box,
    {
      component: "header",
      ref,
      mod: { "with-border": withBorder ?? ctx.withBorder },
      ...ctx.getStyles("header", {
        className: clsx_default({ [Combination_default.classNames.zeroRight]: ctx.offsetScrollbars }, className),
        classNames,
        styles,
        style
      }),
      ...others,
      __vars: { "--app-shell-header-z-index": (_a = zIndex ?? ctx.zIndex) == null ? void 0 : _a.toString() }
    }
  );
});
AppShellHeader.classes = classes19;
AppShellHeader.displayName = "@mantine/core/AppShellHeader";

// node_modules/@mantine/core/esm/components/AppShell/AppShellFooter/AppShellFooter.mjs
var import_react129 = __toESM(require_react(), 1);
var defaultProps35 = {};
var AppShellFooter = factory((_props, ref) => {
  var _a;
  const props = useProps("AppShellFooter", defaultProps35, _props);
  const { classNames, className, style, styles, unstyled, vars, withBorder, zIndex, ...others } = props;
  const ctx = useAppShellContext();
  if (ctx.disabled) {
    return null;
  }
  return import_react129.default.createElement(
    Box,
    {
      component: "footer",
      ref,
      mod: { "with-border": withBorder ?? ctx.withBorder },
      ...ctx.getStyles("footer", {
        className: clsx_default({ [Combination_default.classNames.zeroRight]: ctx.offsetScrollbars }, className),
        classNames,
        styles,
        style
      }),
      ...others,
      __vars: { "--app-shell-footer-z-index": (_a = zIndex ?? ctx.zIndex) == null ? void 0 : _a.toString() }
    }
  );
});
AppShellFooter.classes = classes19;
AppShellFooter.displayName = "@mantine/core/AppShellFooter";

// node_modules/@mantine/core/esm/components/AppShell/AppShellAside/AppShellAside.mjs
var import_react130 = __toESM(require_react(), 1);
var defaultProps36 = {};
var AppShellAside = factory((_props, ref) => {
  const props = useProps("AppShellAside", defaultProps36, _props);
  const { classNames, className, style, styles, unstyled, vars, withBorder, zIndex, ...others } = props;
  const ctx = useAppShellContext();
  if (ctx.disabled) {
    return null;
  }
  return import_react130.default.createElement(
    Box,
    {
      component: "aside",
      ref,
      mod: { "with-border": withBorder ?? ctx.withBorder },
      ...ctx.getStyles("aside", { className, classNames, styles, style }),
      ...others,
      __vars: {
        "--app-shell-aside-z-index": `calc(${zIndex ?? ctx.zIndex} + 1)`
      }
    }
  );
});
AppShellAside.classes = classes19;
AppShellAside.displayName = "@mantine/core/AppShellAside";

// node_modules/@mantine/core/esm/components/AppShell/AppShellMain/AppShellMain.mjs
var import_react131 = __toESM(require_react(), 1);
var defaultProps37 = {};
var AppShellMain = factory((_props, ref) => {
  const props = useProps("AppShellMain", defaultProps37, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useAppShellContext();
  return import_react131.default.createElement(
    Box,
    {
      component: "main",
      ref,
      ...ctx.getStyles("main", { className, style, classNames, styles }),
      ...others
    }
  );
});
AppShellMain.classes = classes19;
AppShellMain.displayName = "@mantine/core/AppShellMain";

// node_modules/@mantine/core/esm/components/AppShell/AppShellSection/AppShellSection.mjs
var import_react132 = __toESM(require_react(), 1);
var defaultProps38 = {};
var AppShellSection = polymorphicFactory((_props, ref) => {
  const props = useProps("AppShellSection", defaultProps38, _props);
  const { classNames, className, style, styles, vars, grow, ...others } = props;
  const ctx = useAppShellContext();
  return import_react132.default.createElement(
    Box,
    {
      ref,
      mod: { grow },
      ...ctx.getStyles("section", { className, style, classNames, styles }),
      ...others
    }
  );
});
AppShellSection.classes = classes19;
AppShellSection.displayName = "@mantine/core/AppShellSection";

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/AppShellMediaStyles.mjs
var import_react140 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/get-variables/get-variables.mjs
var import_react139 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-aside-variables/assign-aside-variables.mjs
var import_react133 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/is-responsive-size/is-responsive-size.mjs
function isResponsiveSize(size2) {
  if (typeof size2 !== "object" || size2 === null) {
    return false;
  }
  if (Object.keys(size2).length === 1 && "base" in size2) {
    return false;
  }
  return true;
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/is-primitive-size/is-primitive-size.mjs
function isPrimitiveSize(size2) {
  const isBaseSize = typeof size2 === "object" && size2 !== null && typeof size2.base !== "undefined" && Object.keys(size2).length === 1;
  return typeof size2 === "number" || typeof size2 === "string" || isBaseSize;
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/get-base-size/get-base-size.mjs
function getBaseSize(size2) {
  if (typeof size2 === "object") {
    return size2.base;
  }
  return size2;
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-aside-variables/assign-aside-variables.mjs
function assignAsideVariables({
  baseStyles,
  minMediaStyles,
  maxMediaStyles,
  aside,
  theme
}) {
  var _a, _b, _c;
  const asideWidth = aside == null ? void 0 : aside.width;
  const collapsedAsideTransform = "translateX(var(--app-shell-aside-width))";
  const collapsedAsideTransformRtl = "translateX(calc(var(--app-shell-aside-width) * -1))";
  if ((aside == null ? void 0 : aside.breakpoint) && !((_a = aside == null ? void 0 : aside.collapsed) == null ? void 0 : _a.mobile)) {
    maxMediaStyles[aside == null ? void 0 : aside.breakpoint] = maxMediaStyles[aside == null ? void 0 : aside.breakpoint] || {};
    maxMediaStyles[aside == null ? void 0 : aside.breakpoint]["--app-shell-aside-width"] = "100%";
    maxMediaStyles[aside == null ? void 0 : aside.breakpoint]["--app-shell-aside-offset"] = "0px";
  }
  if (isPrimitiveSize(asideWidth)) {
    const baseSize = rem(getBaseSize(asideWidth));
    baseStyles["--app-shell-aside-width"] = baseSize;
    baseStyles["--app-shell-aside-offset"] = baseSize;
  }
  if (isResponsiveSize(asideWidth)) {
    if (typeof asideWidth.base !== "undefined") {
      baseStyles["--app-shell-aside-width"] = rem(asideWidth.base);
      baseStyles["--app-shell-aside-offset"] = rem(asideWidth.base);
    }
    keys(asideWidth).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-aside-width"] = rem(asideWidth[key]);
        minMediaStyles[key]["--app-shell-aside-offset"] = rem(asideWidth[key]);
      }
    });
  }
  if ((_b = aside == null ? void 0 : aside.collapsed) == null ? void 0 : _b.desktop) {
    const breakpointValue = aside.breakpoint;
    minMediaStyles[breakpointValue] = minMediaStyles[breakpointValue] || {};
    minMediaStyles[breakpointValue]["--app-shell-aside-transform"] = collapsedAsideTransform;
    minMediaStyles[breakpointValue]["--app-shell-aside-transform-rtl"] = collapsedAsideTransformRtl;
    minMediaStyles[breakpointValue]["--app-shell-aside-offset"] = "0px !important";
  }
  if ((_c = aside == null ? void 0 : aside.collapsed) == null ? void 0 : _c.mobile) {
    const breakpointValue = getBreakpointValue(aside.breakpoint, theme) - 0.1;
    maxMediaStyles[breakpointValue] = maxMediaStyles[breakpointValue] || {};
    maxMediaStyles[breakpointValue]["--app-shell-aside-width"] = "100%";
    maxMediaStyles[breakpointValue]["--app-shell-aside-offset"] = "0px";
    maxMediaStyles[breakpointValue]["--app-shell-aside-transform"] = collapsedAsideTransform;
    maxMediaStyles[breakpointValue]["--app-shell-aside-transform-rtl"] = collapsedAsideTransformRtl;
  }
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-footer-variables/assign-footer-variables.mjs
var import_react134 = __toESM(require_react(), 1);
function assignFooterVariables({
  baseStyles,
  minMediaStyles,
  footer
}) {
  const footerHeight = footer == null ? void 0 : footer.height;
  const collapsedFooterTransform = "translateY(var(--app-shell-footer-height))";
  const shouldOffset = (footer == null ? void 0 : footer.offset) ?? true;
  if (isPrimitiveSize(footerHeight)) {
    const baseSize = rem(getBaseSize(footerHeight));
    baseStyles["--app-shell-footer-height"] = baseSize;
    if (shouldOffset) {
      baseStyles["--app-shell-footer-offset"] = baseSize;
    }
  }
  if (isResponsiveSize(footerHeight)) {
    if (typeof footerHeight.base !== "undefined") {
      baseStyles["--app-shell-footer-height"] = rem(footerHeight.base);
      if (shouldOffset) {
        baseStyles["--app-shell-footer-offset"] = rem(footerHeight.base);
      }
    }
    keys(footerHeight).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-footer-height"] = rem(footerHeight[key]);
        if (shouldOffset) {
          minMediaStyles[key]["--app-shell-footer-offset"] = rem(footerHeight[key]);
        }
      }
    });
  }
  if (footer == null ? void 0 : footer.collapsed) {
    baseStyles["--app-shell-footer-transform"] = collapsedFooterTransform;
    baseStyles["--app-shell-footer-offset"] = "0px !important";
  }
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-header-variables/assign-header-variables.mjs
var import_react135 = __toESM(require_react(), 1);
function assignHeaderVariables({
  baseStyles,
  minMediaStyles,
  header
}) {
  const headerHeight = header == null ? void 0 : header.height;
  const collapsedHeaderTransform = "translateY(calc(var(--app-shell-header-height) * -1))";
  const shouldOffset = (header == null ? void 0 : header.offset) ?? true;
  if (isPrimitiveSize(headerHeight)) {
    const baseSize = rem(getBaseSize(headerHeight));
    baseStyles["--app-shell-header-height"] = baseSize;
    if (shouldOffset) {
      baseStyles["--app-shell-header-offset"] = baseSize;
    }
  }
  if (isResponsiveSize(headerHeight)) {
    if (typeof headerHeight.base !== "undefined") {
      baseStyles["--app-shell-header-height"] = rem(headerHeight.base);
      if (shouldOffset) {
        baseStyles["--app-shell-header-offset"] = rem(headerHeight.base);
      }
    }
    keys(headerHeight).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-header-height"] = rem(headerHeight[key]);
        if (shouldOffset) {
          minMediaStyles[key]["--app-shell-header-offset"] = rem(headerHeight[key]);
        }
      }
    });
  }
  if (header == null ? void 0 : header.collapsed) {
    baseStyles["--app-shell-header-transform"] = collapsedHeaderTransform;
    baseStyles["--app-shell-header-offset"] = "0px !important";
  }
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-navbar-variables/assign-navbar-variables.mjs
var import_react136 = __toESM(require_react(), 1);
function assignNavbarVariables({
  baseStyles,
  minMediaStyles,
  maxMediaStyles,
  navbar,
  theme
}) {
  var _a, _b, _c;
  const navbarWidth = navbar == null ? void 0 : navbar.width;
  const collapsedNavbarTransform = "translateX(calc(var(--app-shell-navbar-width) * -1))";
  const collapsedNavbarTransformRtl = "translateX(var(--app-shell-navbar-width))";
  if ((navbar == null ? void 0 : navbar.breakpoint) && !((_a = navbar == null ? void 0 : navbar.collapsed) == null ? void 0 : _a.mobile)) {
    maxMediaStyles[navbar == null ? void 0 : navbar.breakpoint] = maxMediaStyles[navbar == null ? void 0 : navbar.breakpoint] || {};
    maxMediaStyles[navbar == null ? void 0 : navbar.breakpoint]["--app-shell-navbar-width"] = "100%";
    maxMediaStyles[navbar == null ? void 0 : navbar.breakpoint]["--app-shell-navbar-offset"] = "0px";
  }
  if (isPrimitiveSize(navbarWidth)) {
    const baseSize = rem(getBaseSize(navbarWidth));
    baseStyles["--app-shell-navbar-width"] = baseSize;
    baseStyles["--app-shell-navbar-offset"] = baseSize;
  }
  if (isResponsiveSize(navbarWidth)) {
    if (typeof navbarWidth.base !== "undefined") {
      baseStyles["--app-shell-navbar-width"] = rem(navbarWidth.base);
      baseStyles["--app-shell-navbar-offset"] = rem(navbarWidth.base);
    }
    keys(navbarWidth).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-navbar-width"] = rem(navbarWidth[key]);
        minMediaStyles[key]["--app-shell-navbar-offset"] = rem(navbarWidth[key]);
      }
    });
  }
  if ((_b = navbar == null ? void 0 : navbar.collapsed) == null ? void 0 : _b.desktop) {
    const breakpointValue = navbar.breakpoint;
    minMediaStyles[breakpointValue] = minMediaStyles[breakpointValue] || {};
    minMediaStyles[breakpointValue]["--app-shell-navbar-transform"] = collapsedNavbarTransform;
    minMediaStyles[breakpointValue]["--app-shell-navbar-transform-rtl"] = collapsedNavbarTransformRtl;
    minMediaStyles[breakpointValue]["--app-shell-navbar-offset"] = "0px !important";
  }
  if ((_c = navbar == null ? void 0 : navbar.collapsed) == null ? void 0 : _c.mobile) {
    const breakpointValue = getBreakpointValue(navbar.breakpoint, theme) - 0.1;
    maxMediaStyles[breakpointValue] = maxMediaStyles[breakpointValue] || {};
    maxMediaStyles[breakpointValue]["--app-shell-navbar-width"] = "100%";
    maxMediaStyles[breakpointValue]["--app-shell-navbar-offset"] = "0px";
    maxMediaStyles[breakpointValue]["--app-shell-navbar-transform"] = collapsedNavbarTransform;
    maxMediaStyles[breakpointValue]["--app-shell-navbar-transform-rtl"] = collapsedNavbarTransformRtl;
  }
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-padding-variables/assign-padding-variables.mjs
var import_react138 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/get-padding-value/get-padding-value.mjs
var import_react137 = __toESM(require_react(), 1);
function getPaddingValue(padding) {
  return Number(padding) === 0 ? "0px" : getSpacing(padding);
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/assign-padding-variables/assign-padding-variables.mjs
function assignPaddingVariables({
  padding,
  baseStyles,
  minMediaStyles
}) {
  if (isPrimitiveSize(padding)) {
    baseStyles["--app-shell-padding"] = getPaddingValue(getBaseSize(padding));
  }
  if (isResponsiveSize(padding)) {
    if (padding.base) {
      baseStyles["--app-shell-padding"] = getPaddingValue(padding.base);
    }
    keys(padding).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-padding"] = getPaddingValue(padding[key]);
      }
    });
  }
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/get-variables/get-variables.mjs
function getVariables({ navbar, header, footer, aside, padding, theme }) {
  const minMediaStyles = {};
  const maxMediaStyles = {};
  const baseStyles = {};
  assignNavbarVariables({
    baseStyles,
    minMediaStyles,
    maxMediaStyles,
    navbar,
    theme
  });
  assignAsideVariables({
    baseStyles,
    minMediaStyles,
    maxMediaStyles,
    aside,
    theme
  });
  assignHeaderVariables({ baseStyles, minMediaStyles, header });
  assignFooterVariables({ baseStyles, minMediaStyles, footer });
  assignPaddingVariables({ baseStyles, minMediaStyles, padding });
  const minMedia = getSortedBreakpoints(keys(minMediaStyles), theme).map((breakpoint) => ({
    query: `(min-width: ${em(breakpoint.px)})`,
    styles: minMediaStyles[breakpoint.value]
  }));
  const maxMedia = getSortedBreakpoints(keys(maxMediaStyles), theme).map((breakpoint) => ({
    query: `(max-width: ${em(breakpoint.px)})`,
    styles: maxMediaStyles[breakpoint.value]
  }));
  const media = [...minMedia, ...maxMedia];
  return { baseStyles, media };
}

// node_modules/@mantine/core/esm/components/AppShell/AppShellMediaStyles/AppShellMediaStyles.mjs
function AppShellMediaStyles({
  navbar,
  header,
  aside,
  footer,
  padding
}) {
  const theme = useMantineTheme();
  const ctx = useMantineContext();
  const { media, baseStyles } = getVariables({ navbar, header, footer, aside, padding, theme });
  return import_react140.default.createElement(InlineStyles, { media, styles: baseStyles, selector: ctx.cssVariablesSelector });
}

// node_modules/@mantine/core/esm/components/AppShell/use-resizing/use-resizing.mjs
var import_react141 = __toESM(require_react(), 1);
function useResizing({ transitionDuration, disabled }) {
  const [resizing, setResizing] = (0, import_react141.useState)(false);
  const resizingTimeout = (0, import_react141.useRef)();
  const disabledTimeout = (0, import_react141.useRef)();
  useWindowEvent("resize", () => {
    setResizing(true);
    clearTimeout(resizingTimeout.current);
    resizingTimeout.current = window.setTimeout(() => setResizing(false), 200);
  });
  useIsomorphicEffect(() => {
    setResizing(true);
    clearTimeout(disabledTimeout.current);
    disabledTimeout.current = window.setTimeout(() => setResizing(false), transitionDuration || 0);
  }, [disabled, transitionDuration]);
  return resizing;
}

// node_modules/@mantine/core/esm/components/AppShell/AppShell.mjs
var defaultProps39 = {
  withBorder: true,
  offsetScrollbars: true,
  padding: 0,
  transitionDuration: 200,
  transitionTimingFunction: "ease",
  zIndex: getDefaultZIndex("app")
};
var varsResolver19 = createVarsResolver(
  (_, { transitionDuration, transitionTimingFunction }) => ({
    root: {
      "--app-shell-transition-duration": `${transitionDuration}ms`,
      "--app-shell-transition-timing-function": transitionTimingFunction
    }
  })
);
var AppShell = factory((_props, ref) => {
  const props = useProps("AppShell", defaultProps39, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    navbar,
    withBorder,
    padding,
    transitionDuration,
    transitionTimingFunction,
    header,
    zIndex,
    layout,
    disabled,
    aside,
    footer,
    offsetScrollbars,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "AppShell",
    classes: classes19,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver19
  });
  const resizing = useResizing({ disabled, transitionDuration });
  return import_react142.default.createElement(AppShellProvider, { value: { getStyles: getStyles2, withBorder, zIndex, disabled, offsetScrollbars } }, import_react142.default.createElement(
    AppShellMediaStyles,
    {
      navbar,
      header,
      aside,
      footer,
      padding
    }
  ), import_react142.default.createElement(Box, { ref, ...getStyles2("root"), mod: { resizing, layout, disabled }, ...others }));
});
AppShell.classes = classes19;
AppShell.displayName = "@mantine/core/AppShell";
AppShell.Navbar = AppShellNavbar;
AppShell.Header = AppShellHeader;
AppShell.Main = AppShellMain;
AppShell.Aside = AppShellAside;
AppShell.Footer = AppShellFooter;
AppShell.Section = AppShellSection;

// node_modules/@mantine/core/esm/components/AspectRatio/AspectRatio.mjs
var import_react143 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/AspectRatio/AspectRatio.module.css.mjs
var classes20 = { "root": "m-71ac47fc" };

// node_modules/@mantine/core/esm/components/AspectRatio/AspectRatio.mjs
var defaultProps40 = {};
var varsResolver20 = createVarsResolver((_, { ratio }) => ({
  root: {
    "--ar-ratio": ratio == null ? void 0 : ratio.toString()
  }
}));
var AspectRatio = factory((_props, ref) => {
  const props = useProps("AspectRatio", defaultProps40, _props);
  const { classNames, className, style, styles, unstyled, vars, ratio, ...others } = props;
  const getStyles2 = useStyles({
    name: "AspectRatio",
    classes: classes20,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver20
  });
  return import_react143.default.createElement(Box, { ref, ...getStyles2("root"), ...others });
});
AspectRatio.classes = classes20;
AspectRatio.displayName = "@mantine/core/AspectRatio";

// node_modules/@mantine/core/esm/components/Autocomplete/Autocomplete.mjs
var import_react168 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Combobox/get-parsed-combobox-data/get-parsed-combobox-data.mjs
function parseItem(item) {
  if (typeof item === "string") {
    return { value: item, label: item };
  }
  if (typeof item === "number") {
    return { value: item.toString(), label: item.toString() };
  }
  if ("group" in item) {
    return {
      group: item.group,
      items: item.items.map((i) => parseItem(i))
    };
  }
  return item;
}
function getParsedComboboxData(data) {
  if (!data) {
    return [];
  }
  return data.map(parseItem);
}

// node_modules/@mantine/core/esm/components/Combobox/get-options-lockup/get-options-lockup.mjs
function getOptionsLockup(options) {
  return options.reduce((acc, item) => {
    if ("group" in item) {
      return { ...acc, ...getOptionsLockup(item.items) };
    }
    acc[item.value] = item;
    return acc;
  }, {});
}
function getLabelsLockup(options) {
  return options.reduce((acc, item) => {
    if ("group" in item) {
      return { ...acc, ...getLabelsLockup(item.items) };
    }
    acc[item.label] = item;
    return acc;
  }, {});
}

// node_modules/@mantine/core/esm/components/Combobox/ComboboxChevron/ComboboxChevron.mjs
var import_react144 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Combobox/Combobox.module.css.mjs
var classes21 = { "dropdown": "m-88b62a41", "options": "m-b2821a6e", "option": "m-92253aa5", "search": "m-985517d8", "empty": "m-2530cd1d", "header": "m-858f94bd", "footer": "m-82b967cb", "group": "m-254f3e4f", "groupLabel": "m-2bb2e9e5", "chevron": "m-2943220b", "optionsDropdownScrollArea": "m-71d052f9", "optionsDropdownOption": "m-390b5f4", "optionsDropdownCheckIcon": "m-8ee53fc2" };

// node_modules/@mantine/core/esm/components/Combobox/ComboboxChevron/ComboboxChevron.mjs
var defaultProps41 = {
  error: null
};
var varsResolver21 = createVarsResolver((_, { size: size2 }) => ({
  chevron: {
    "--combobox-chevron-size": getSize(size2, "combobox-chevron-size")
  }
}));
var ComboboxChevron = factory((_props, ref) => {
  const props = useProps("ComboboxChevron", defaultProps41, _props);
  const { size: size2, error, style, className, classNames, styles, unstyled, vars, ...others } = props;
  const getStyles2 = useStyles({
    name: "ComboboxChevron",
    classes: classes21,
    props,
    style,
    className,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver21,
    rootSelector: "chevron"
  });
  return import_react144.default.createElement(
    Box,
    {
      component: "svg",
      ...others,
      ...getStyles2("chevron"),
      size: size2,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      mod: ["combobox-chevron", { error }],
      ref
    },
    import_react144.default.createElement(
      "path",
      {
        d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  );
});
ComboboxChevron.classes = classes21;
ComboboxChevron.displayName = "@mantine/core/ComboboxChevron";

// node_modules/@mantine/core/esm/components/Combobox/Combobox.mjs
var import_react160 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Combobox/use-combobox/use-combobox.mjs
var import_react145 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Combobox/use-combobox/get-index/get-index.mjs
function getPreviousIndex2(currentIndex, elements, loop) {
  for (let i = currentIndex - 1; i >= 0; i -= 1) {
    if (!elements[i].hasAttribute("data-combobox-disabled")) {
      return i;
    }
  }
  if (loop) {
    for (let i = elements.length - 1; i > -1; i -= 1) {
      if (!elements[i].hasAttribute("data-combobox-disabled")) {
        return i;
      }
    }
  }
  return currentIndex;
}
function getNextIndex2(currentIndex, elements, loop) {
  for (let i = currentIndex + 1; i < elements.length; i += 1) {
    if (!elements[i].hasAttribute("data-combobox-disabled")) {
      return i;
    }
  }
  if (loop) {
    for (let i = 0; i < elements.length; i += 1) {
      if (!elements[i].hasAttribute("data-combobox-disabled")) {
        return i;
      }
    }
  }
  return currentIndex;
}
function getFirstIndex(elements) {
  for (let i = 0; i < elements.length; i += 1) {
    if (!elements[i].hasAttribute("data-combobox-disabled")) {
      return i;
    }
  }
  return -1;
}

// node_modules/@mantine/core/esm/components/Combobox/use-combobox/use-combobox.mjs
function useCombobox({
  defaultOpened,
  opened,
  onOpenedChange,
  onDropdownClose,
  onDropdownOpen,
  loop = true,
  scrollBehavior = "instant"
} = {}) {
  const [dropdownOpened, setDropdownOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange: onOpenedChange
  });
  const listId = (0, import_react145.useRef)(null);
  const selectedOptionIndex = (0, import_react145.useRef)(-1);
  const searchRef = (0, import_react145.useRef)(null);
  const targetRef = (0, import_react145.useRef)(null);
  const focusSearchTimeout = (0, import_react145.useRef)(-1);
  const focusTargetTimeout = (0, import_react145.useRef)(-1);
  const selectedIndexUpdateTimeout = (0, import_react145.useRef)(-1);
  const openDropdown = (0, import_react145.useCallback)(
    (eventSource = "unknown") => {
      if (!dropdownOpened) {
        setDropdownOpened(true);
        onDropdownOpen == null ? void 0 : onDropdownOpen(eventSource);
      }
    },
    [setDropdownOpened, onDropdownOpen, dropdownOpened]
  );
  const closeDropdown = (0, import_react145.useCallback)(
    (eventSource = "unknown") => {
      if (dropdownOpened) {
        setDropdownOpened(false);
        onDropdownClose == null ? void 0 : onDropdownClose(eventSource);
      }
    },
    [setDropdownOpened, onDropdownClose, dropdownOpened]
  );
  const toggleDropdown = (0, import_react145.useCallback)(
    (eventSource = "unknown") => {
      if (dropdownOpened) {
        closeDropdown(eventSource);
      } else {
        openDropdown(eventSource);
      }
    },
    [closeDropdown, openDropdown, dropdownOpened]
  );
  const clearSelectedItem = (0, import_react145.useCallback)(() => {
    const selected = document.querySelector(`#${listId.current} [data-combobox-selected]`);
    selected == null ? void 0 : selected.removeAttribute("data-combobox-selected");
    selected == null ? void 0 : selected.removeAttribute("aria-selected");
  }, []);
  const selectOption = (0, import_react145.useCallback)(
    (index5) => {
      const list = document.getElementById(listId.current);
      const items = list == null ? void 0 : list.querySelectorAll("[data-combobox-option]");
      if (!items) {
        return null;
      }
      const nextIndex = index5 >= items.length ? 0 : index5 < 0 ? items.length - 1 : index5;
      selectedOptionIndex.current = nextIndex;
      if ((items == null ? void 0 : items[nextIndex]) && !items[nextIndex].hasAttribute("data-combobox-disabled")) {
        clearSelectedItem();
        items[nextIndex].setAttribute("data-combobox-selected", "true");
        items[nextIndex].setAttribute("aria-selected", "true");
        items[nextIndex].scrollIntoView({ block: "nearest", behavior: scrollBehavior });
        return items[nextIndex].id;
      }
      return null;
    },
    [scrollBehavior, clearSelectedItem]
  );
  const selectActiveOption = (0, import_react145.useCallback)(() => {
    const activeOption = document.querySelector(
      `#${listId.current} [data-combobox-active]`
    );
    if (activeOption) {
      const items = document.querySelectorAll(
        `#${listId.current} [data-combobox-option]`
      );
      const index5 = Array.from(items).findIndex((option) => option === activeOption);
      return selectOption(index5);
    }
    return selectOption(0);
  }, [selectOption]);
  const selectNextOption = (0, import_react145.useCallback)(
    () => selectOption(
      getNextIndex2(
        selectedOptionIndex.current,
        document.querySelectorAll(`#${listId.current} [data-combobox-option]`),
        loop
      )
    ),
    [selectOption, loop]
  );
  const selectPreviousOption = (0, import_react145.useCallback)(
    () => selectOption(
      getPreviousIndex2(
        selectedOptionIndex.current,
        document.querySelectorAll(`#${listId.current} [data-combobox-option]`),
        loop
      )
    ),
    [selectOption, loop]
  );
  const selectFirstOption = (0, import_react145.useCallback)(
    () => selectOption(
      getFirstIndex(
        document.querySelectorAll(`#${listId.current} [data-combobox-option]`)
      )
    ),
    [selectOption]
  );
  const updateSelectedOptionIndex = (0, import_react145.useCallback)((target = "selected") => {
    selectedIndexUpdateTimeout.current = window.setTimeout(() => {
      const items = document.querySelectorAll(
        `#${listId.current} [data-combobox-option]`
      );
      const index5 = Array.from(items).findIndex(
        (option) => option.hasAttribute(`data-combobox-${target}`)
      );
      selectedOptionIndex.current = index5;
    }, 0);
  }, []);
  const resetSelectedOption = (0, import_react145.useCallback)(() => {
    selectedOptionIndex.current = -1;
    clearSelectedItem();
  }, [clearSelectedItem]);
  const clickSelectedOption = (0, import_react145.useCallback)(() => {
    const items = document.querySelectorAll(
      `#${listId.current} [data-combobox-option]`
    );
    const item = items == null ? void 0 : items[selectedOptionIndex.current];
    item == null ? void 0 : item.click();
  }, []);
  const setListId = (0, import_react145.useCallback)((id) => {
    listId.current = id;
  }, []);
  const focusSearchInput = (0, import_react145.useCallback)(() => {
    focusSearchTimeout.current = window.setTimeout(() => searchRef.current.focus(), 0);
  }, []);
  const focusTarget = (0, import_react145.useCallback)(() => {
    focusTargetTimeout.current = window.setTimeout(() => targetRef.current.focus(), 0);
  }, []);
  (0, import_react145.useEffect)(
    () => () => {
      window.clearTimeout(focusSearchTimeout.current);
      window.clearTimeout(focusTargetTimeout.current);
      window.clearTimeout(selectedIndexUpdateTimeout.current);
    },
    []
  );
  return {
    dropdownOpened,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    selectedOptionIndex: selectedOptionIndex.current,
    selectOption,
    selectFirstOption,
    selectActiveOption,
    selectNextOption,
    selectPreviousOption,
    resetSelectedOption,
    updateSelectedOptionIndex,
    listId: listId.current,
    setListId,
    clickSelectedOption,
    searchRef,
    focusSearchInput,
    targetRef,
    focusTarget
  };
}

// node_modules/@mantine/core/esm/components/Combobox/Combobox.context.mjs
var import_react146 = __toESM(require_react(), 1);
var [ComboboxProvider, useComboboxContext] = createSafeContext(
  "Combobox component was not found in tree"
);

// node_modules/@mantine/core/esm/components/Combobox/ComboboxTarget/ComboboxTarget.mjs
var import_react148 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Combobox/use-combobox-target-props/use-combobox-target-props.mjs
var import_react147 = __toESM(require_react(), 1);
function useComboboxTargetProps({
  onKeyDown,
  withKeyboardNavigation,
  withAriaAttributes,
  withExpandedAttribute,
  targetType
}) {
  const ctx = useComboboxContext();
  const [selectedOptionId, setSelectedOptionId] = (0, import_react147.useState)(null);
  const handleKeyDown = (event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (ctx.readOnly) {
      return;
    }
    if (withKeyboardNavigation) {
      if (event.nativeEvent.code === "ArrowDown") {
        event.preventDefault();
        if (!ctx.store.dropdownOpened) {
          ctx.store.openDropdown("keyboard");
          setSelectedOptionId(ctx.store.selectActiveOption());
        } else {
          setSelectedOptionId(ctx.store.selectNextOption());
        }
      }
      if (event.nativeEvent.code === "ArrowUp") {
        event.preventDefault();
        if (!ctx.store.dropdownOpened) {
          ctx.store.openDropdown("keyboard");
          setSelectedOptionId(ctx.store.selectActiveOption());
        } else {
          setSelectedOptionId(ctx.store.selectPreviousOption());
        }
      }
      if (event.nativeEvent.code === "Enter") {
        if (ctx.store.dropdownOpened) {
          event.preventDefault();
          ctx.store.clickSelectedOption();
        } else if (targetType === "button") {
          event.preventDefault();
          ctx.store.openDropdown("keyboard");
        }
      }
      if (event.nativeEvent.code === "Escape") {
        ctx.store.closeDropdown("keyboard");
      }
      if (event.nativeEvent.code === "Space") {
        if (targetType === "button") {
          event.preventDefault();
          ctx.store.toggleDropdown("keyboard");
        }
      }
    }
  };
  const ariaAttributes = withAriaAttributes ? {
    "aria-haspopup": "listbox",
    "aria-expanded": withExpandedAttribute && !!(ctx.store.listId && ctx.store.dropdownOpened) || void 0,
    "aria-controls": ctx.store.listId,
    "aria-activedescendant": ctx.store.dropdownOpened ? selectedOptionId || void 0 : void 0,
    autoComplete: "off",
    "data-expanded": ctx.store.dropdownOpened ? true : void 0
  } : {};
  return {
    ...ariaAttributes,
    onKeyDown: handleKeyDown
  };
}

// node_modules/@mantine/core/esm/components/Combobox/ComboboxTarget/ComboboxTarget.mjs
var defaultProps42 = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: true,
  withAriaAttributes: true,
  withExpandedAttribute: false
};
var ComboboxTarget = factory((props, ref) => {
  const {
    children,
    refProp,
    withKeyboardNavigation,
    withAriaAttributes,
    withExpandedAttribute,
    targetType,
    ...others
  } = useProps("ComboboxTarget", defaultProps42, props);
  if (!isElement(children)) {
    throw new Error(
      "Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const ctx = useComboboxContext();
  const targetProps = useComboboxTargetProps({
    targetType,
    withAriaAttributes,
    withKeyboardNavigation,
    withExpandedAttribute,
    onKeyDown: children.props.onKeyDown
  });
  const clonedElement = (0, import_react148.cloneElement)(children, {
    ...targetProps,
    ...others
  });
  return import_react148.default.createElement(Popover.Target, { ref: useMergedRef(ref, ctx.store.targetRef) }, clonedElement);
});
ComboboxTarget.displayName = "@mantine/core/ComboboxTarget";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxDropdown/ComboboxDropdown.mjs
var import_react149 = __toESM(require_react(), 1);
var defaultProps43 = {};
var ComboboxDropdown = factory((props, ref) => {
  const { classNames, styles, className, style, hidden, ...others } = useProps(
    "ComboboxDropdown",
    defaultProps43,
    props
  );
  const ctx = useComboboxContext();
  return import_react149.default.createElement(
    Popover.Dropdown,
    {
      ...others,
      ref,
      role: "presentation",
      "data-hidden": hidden || void 0,
      ...ctx.getStyles("dropdown", { className, style, classNames, styles })
    }
  );
});
ComboboxDropdown.classes = classes21;
ComboboxDropdown.displayName = "@mantine/core/ComboboxDropdown";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxOptions/ComboboxOptions.mjs
var import_react150 = __toESM(require_react(), 1);
var defaultProps44 = {};
var ComboboxOptions = factory((_props, ref) => {
  const props = useProps("ComboboxOptions", defaultProps44, _props);
  const { classNames, className, style, styles, id, onMouseDown, labelledBy, ...others } = props;
  const ctx = useComboboxContext();
  const _id = useId(id);
  (0, import_react150.useEffect)(() => {
    ctx.store.setListId(_id);
  }, [_id]);
  return import_react150.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("options", { className, style, classNames, styles }),
      ...others,
      id: _id,
      role: "listbox",
      "aria-labelledby": labelledBy,
      onMouseDown: (event) => {
        event.preventDefault();
        onMouseDown == null ? void 0 : onMouseDown(event);
      }
    }
  );
});
ComboboxOptions.classes = classes21;
ComboboxOptions.displayName = "@mantine/core/ComboboxOptions";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxOption/ComboboxOption.mjs
var import_react151 = __toESM(require_react(), 1);
var defaultProps45 = {};
var ComboboxOption = factory((_props, ref) => {
  const props = useProps("ComboboxOption", defaultProps45, _props);
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    onClick,
    id,
    active,
    onMouseDown,
    onMouseOver,
    disabled,
    selected,
    ...others
  } = props;
  const ctx = useComboboxContext();
  const uuid = (0, import_react151.useId)();
  const _id = id || uuid;
  return import_react151.default.createElement(
    Box,
    {
      ...ctx.getStyles("option", { className, classNames, styles, style }),
      ...others,
      ref,
      id: _id,
      mod: [
        "combobox-option",
        { "combobox-active": active, "combobox-disabled": disabled, "combobox-selected": selected }
      ],
      role: "option",
      onClick: (event) => {
        var _a;
        if (!disabled) {
          (_a = ctx.onOptionSubmit) == null ? void 0 : _a.call(ctx, props.value, props);
          onClick == null ? void 0 : onClick(event);
        } else {
          event.preventDefault();
        }
      },
      onMouseDown: (event) => {
        event.preventDefault();
        onMouseDown == null ? void 0 : onMouseDown(event);
      },
      onMouseOver: (event) => {
        if (ctx.resetSelectionOnOptionHover) {
          ctx.store.resetSelectedOption();
        }
        onMouseOver == null ? void 0 : onMouseOver(event);
      }
    }
  );
});
ComboboxOption.classes = classes21;
ComboboxOption.displayName = "@mantine/core/ComboboxOption";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxSearch/ComboboxSearch.mjs
var import_react152 = __toESM(require_react(), 1);
var defaultProps46 = {
  withAriaAttributes: true,
  withKeyboardNavigation: true
};
var ComboboxSearch = factory((_props, ref) => {
  const props = useProps("ComboboxSearch", defaultProps46, _props);
  const {
    classNames,
    styles,
    unstyled,
    vars,
    withAriaAttributes,
    onKeyDown,
    withKeyboardNavigation,
    size: size2,
    ...others
  } = props;
  const ctx = useComboboxContext();
  const _styles = ctx.getStyles("search");
  const targetProps = useComboboxTargetProps({
    targetType: "input",
    withAriaAttributes,
    withKeyboardNavigation,
    withExpandedAttribute: false,
    onKeyDown
  });
  return import_react152.default.createElement(
    Input,
    {
      ref: useMergedRef(ref, ctx.store.searchRef),
      classNames: [{ input: _styles.className }, classNames],
      styles: [{ input: _styles.style }, styles],
      size: size2 || ctx.size,
      ...targetProps,
      ...others,
      __staticSelector: "Combobox"
    }
  );
});
ComboboxSearch.classes = classes21;
ComboboxSearch.displayName = "@mantine/core/ComboboxSearch";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxEmpty/ComboboxEmpty.mjs
var import_react153 = __toESM(require_react(), 1);
var defaultProps47 = {};
var ComboboxEmpty = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "ComboboxEmpty",
    defaultProps47,
    props
  );
  const ctx = useComboboxContext();
  return import_react153.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("empty", { className, classNames, styles, style }),
      ...others
    }
  );
});
ComboboxEmpty.classes = classes21;
ComboboxEmpty.displayName = "@mantine/core/ComboboxEmpty";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxFooter/ComboboxFooter.mjs
var import_react154 = __toESM(require_react(), 1);
var defaultProps48 = {};
var ComboboxFooter = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "ComboboxFooter",
    defaultProps48,
    props
  );
  const ctx = useComboboxContext();
  return import_react154.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("footer", { className, classNames, style, styles }),
      ...others
    }
  );
});
ComboboxFooter.classes = classes21;
ComboboxFooter.displayName = "@mantine/core/ComboboxFooter";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxHeader/ComboboxHeader.mjs
var import_react155 = __toESM(require_react(), 1);
var defaultProps49 = {};
var ComboboxHeader = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "ComboboxHeader",
    defaultProps49,
    props
  );
  const ctx = useComboboxContext();
  return import_react155.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("header", { className, classNames, style, styles }),
      ...others
    }
  );
});
ComboboxHeader.classes = classes21;
ComboboxHeader.displayName = "@mantine/core/ComboboxHeader";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxEventsTarget/ComboboxEventsTarget.mjs
var import_react156 = __toESM(require_react(), 1);
var defaultProps50 = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: true,
  withAriaAttributes: true,
  withExpandedAttribute: false
};
var ComboboxEventsTarget = factory((props, ref) => {
  const {
    children,
    refProp,
    withKeyboardNavigation,
    withAriaAttributes,
    withExpandedAttribute,
    targetType,
    ...others
  } = useProps("ComboboxEventsTarget", defaultProps50, props);
  if (!isElement(children)) {
    throw new Error(
      "Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const ctx = useComboboxContext();
  const targetProps = useComboboxTargetProps({
    targetType,
    withAriaAttributes,
    withKeyboardNavigation,
    withExpandedAttribute,
    onKeyDown: children.props.onKeyDown
  });
  return (0, import_react156.cloneElement)(children, {
    ...targetProps,
    ...others,
    [refProp]: useMergedRef(ref, ctx.store.targetRef, children == null ? void 0 : children.ref)
  });
});
ComboboxEventsTarget.displayName = "@mantine/core/ComboboxEventsTarget";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxDropdownTarget/ComboboxDropdownTarget.mjs
var import_react157 = __toESM(require_react(), 1);
var defaultProps51 = {
  refProp: "ref"
};
var ComboboxDropdownTarget = factory((props, ref) => {
  const { children, refProp } = useProps("ComboboxDropdownTarget", defaultProps51, props);
  useComboboxContext();
  if (!isElement(children)) {
    throw new Error(
      "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  return import_react157.default.createElement(Popover.Target, { ref, refProp }, children);
});
ComboboxDropdownTarget.displayName = "@mantine/core/ComboboxDropdownTarget";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxGroup/ComboboxGroup.mjs
var import_react158 = __toESM(require_react(), 1);
var defaultProps52 = {};
var ComboboxGroup = factory((props, ref) => {
  const { classNames, className, style, styles, vars, children, label, ...others } = useProps(
    "ComboboxGroup",
    defaultProps52,
    props
  );
  const ctx = useComboboxContext();
  return import_react158.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("group", { className, classNames, style, styles }),
      ...others
    },
    label && import_react158.default.createElement("div", { ...ctx.getStyles("groupLabel", { classNames, styles }) }, label),
    children
  );
});
ComboboxGroup.classes = classes21;
ComboboxGroup.displayName = "@mantine/core/ComboboxGroup";

// node_modules/@mantine/core/esm/components/Combobox/ComboboxClearButton/ComboboxClearButton.mjs
var import_react159 = __toESM(require_react(), 1);
var ComboboxClearButton = (0, import_react159.forwardRef)(
  ({ size: size2, onMouseDown, onClick, onClear, ...others }, ref) => import_react159.default.createElement(
    CloseButton,
    {
      ref,
      size: size2 || "sm",
      variant: "transparent",
      tabIndex: -1,
      "aria-hidden": true,
      ...others,
      onMouseDown: (event) => {
        event.preventDefault();
        onMouseDown == null ? void 0 : onMouseDown(event);
      },
      onClick: (event) => {
        onClear();
        onClick == null ? void 0 : onClick(event);
      }
    }
  )
);
ComboboxClearButton.displayName = "@mantine/core/ComboboxClearButton";

// node_modules/@mantine/core/esm/components/Combobox/Combobox.mjs
var defaultProps53 = {
  keepMounted: true,
  withinPortal: true,
  resetSelectionOnOptionHover: false,
  width: "target",
  transitionProps: { transition: "fade", duration: 0 }
};
var varsResolver22 = createVarsResolver((_, { size: size2, dropdownPadding }) => ({
  options: {
    "--combobox-option-fz": getFontSize(size2),
    "--combobox-option-padding": getSize(size2, "combobox-option-padding")
  },
  dropdown: {
    "--combobox-padding": dropdownPadding === void 0 ? void 0 : rem(dropdownPadding),
    "--combobox-option-fz": getFontSize(size2),
    "--combobox-option-padding": getSize(size2, "combobox-option-padding")
  }
}));
function Combobox(_props) {
  const props = useProps("Combobox", defaultProps53, _props);
  const {
    classNames,
    styles,
    unstyled,
    children,
    store: controlledStore,
    vars,
    onOptionSubmit,
    size: size2,
    dropdownPadding,
    resetSelectionOnOptionHover,
    __staticSelector,
    readOnly,
    ...others
  } = props;
  const uncontrolledStore = useCombobox();
  const store = controlledStore || uncontrolledStore;
  const getStyles2 = useStyles({
    name: __staticSelector || "Combobox",
    classes: classes21,
    props,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver22
  });
  return import_react160.default.createElement(
    ComboboxProvider,
    {
      value: {
        getStyles: getStyles2,
        store,
        onOptionSubmit,
        size: size2,
        resetSelectionOnOptionHover,
        readOnly
      }
    },
    import_react160.default.createElement(
      Popover,
      {
        opened: store.dropdownOpened,
        ...others,
        onClose: store.closeDropdown,
        withRoles: false,
        unstyled
      },
      children
    )
  );
}
var extendCombobox = (c) => c;
Combobox.extend = extendCombobox;
Combobox.classes = classes21;
Combobox.displayName = "@mantine/core/Combobox";
Combobox.Target = ComboboxTarget;
Combobox.Dropdown = ComboboxDropdown;
Combobox.Options = ComboboxOptions;
Combobox.Option = ComboboxOption;
Combobox.Search = ComboboxSearch;
Combobox.Empty = ComboboxEmpty;
Combobox.Chevron = ComboboxChevron;
Combobox.Footer = ComboboxFooter;
Combobox.Header = ComboboxHeader;
Combobox.EventsTarget = ComboboxEventsTarget;
Combobox.DropdownTarget = ComboboxDropdownTarget;
Combobox.Group = ComboboxGroup;
Combobox.ClearButton = ComboboxClearButton;

// node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/OptionsDropdown.mjs
var import_react167 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Checkbox/Checkbox.mjs
var import_react166 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/InlineInput/InlineInput.mjs
var import_react161 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/InlineInput/InlineInput.module.css.mjs
var classes22 = { "root": "m-5f75b09e", "body": "m-5f6e695e", "labelWrapper": "m-d3ea56bb", "label": "m-8ee546b8", "description": "m-328f68c0", "error": "m-8e8a99cc" };

// node_modules/@mantine/core/esm/components/InlineInput/InlineInput.mjs
var InlineInputClasses = classes22;
var InlineInput = (0, import_react161.forwardRef)(
  ({
    __staticSelector,
    __stylesApiProps,
    className,
    classNames,
    styles,
    unstyled,
    children,
    label,
    description,
    id,
    disabled,
    error,
    size: size2,
    labelPosition = "left",
    variant,
    style,
    vars,
    ...others
  }, ref) => {
    const getStyles2 = useStyles({
      name: __staticSelector,
      props: __stylesApiProps,
      className,
      style,
      classes: classes22,
      classNames,
      styles,
      unstyled
    });
    return import_react161.default.createElement(
      Box,
      {
        ...getStyles2("root"),
        ref,
        __vars: {
          "--label-fz": getFontSize(size2),
          "--label-lh": getSize(size2, "label-lh")
        },
        mod: { "label-position": labelPosition },
        variant,
        size: size2,
        ...others
      },
      import_react161.default.createElement("div", { ...getStyles2("body") }, children, import_react161.default.createElement("div", { ...getStyles2("labelWrapper") }, label && import_react161.default.createElement("label", { ...getStyles2("label"), "data-disabled": disabled || void 0, htmlFor: id }, label), description && import_react161.default.createElement(Input.Description, { size: size2, __inheritStyles: false, ...getStyles2("description") }, description), error && error !== "boolean" && import_react161.default.createElement(Input.Error, { size: size2, __inheritStyles: false, ...getStyles2("error") }, error)))
    );
  }
);
InlineInput.displayName = "@mantine/core/InlineInput";

// node_modules/@mantine/core/esm/components/Checkbox/CheckboxGroup.context.mjs
var import_react162 = __toESM(require_react(), 1);
var CheckboxGroupContext = (0, import_react162.createContext)(null);
var CheckboxGroupProvider = CheckboxGroupContext.Provider;
var useCheckboxGroupContext = () => (0, import_react162.useContext)(CheckboxGroupContext);

// node_modules/@mantine/core/esm/components/Checkbox/CheckboxGroup/CheckboxGroup.mjs
var import_react164 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/InputsGroupFieldset/InputsGroupFieldset.mjs
var import_react163 = __toESM(require_react(), 1);
function InputsGroupFieldset({ children, role }) {
  const ctx = useInputWrapperContext();
  if (!ctx) {
    return import_react163.default.createElement(import_react163.default.Fragment, null, children);
  }
  return import_react163.default.createElement("div", { role, "aria-labelledby": ctx.labelId, "aria-describedby": ctx.describedBy }, children);
}

// node_modules/@mantine/core/esm/components/Checkbox/CheckboxGroup/CheckboxGroup.mjs
var defaultProps54 = {};
var CheckboxGroup = factory((props, ref) => {
  const { value, defaultValue, onChange, size: size2, wrapperProps, children, ...others } = useProps(
    "CheckboxGroup",
    defaultProps54,
    props
  );
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });
  const handleChange = (event) => {
    const itemValue = event.currentTarget.value;
    setValue(
      _value.includes(itemValue) ? _value.filter((item) => item !== itemValue) : [..._value, itemValue]
    );
  };
  return import_react164.default.createElement(CheckboxGroupProvider, { value: { value: _value, onChange: handleChange, size: size2 } }, import_react164.default.createElement(
    Input.Wrapper,
    {
      size: size2,
      ref,
      ...wrapperProps,
      ...others,
      labelElement: "div",
      __staticSelector: "CheckboxGroup"
    },
    import_react164.default.createElement(InputsGroupFieldset, { role: "group" }, children)
  ));
});
CheckboxGroup.classes = Input.Wrapper.classes;
CheckboxGroup.displayName = "@mantine/core/CheckboxGroup";

// node_modules/@mantine/core/esm/components/Checkbox/CheckIcon.mjs
var import_react165 = __toESM(require_react(), 1);
function CheckIcon({ size: size2, style, ...others }) {
  const _style = size2 !== void 0 ? { width: rem(size2), height: rem(size2), ...style } : style;
  return import_react165.default.createElement(
    "svg",
    {
      viewBox: "0 0 10 7",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: _style,
      "aria-hidden": true,
      ...others
    },
    import_react165.default.createElement(
      "path",
      {
        d: "M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  );
}
function CheckboxIcon({ indeterminate, ...others }) {
  if (indeterminate) {
    return import_react165.default.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 32 6",
        "aria-hidden": true,
        ...others
      },
      import_react165.default.createElement("rect", { width: "32", height: "6", fill: "currentColor", rx: "3" })
    );
  }
  return import_react165.default.createElement(CheckIcon, { ...others });
}

// node_modules/@mantine/core/esm/components/Checkbox/Checkbox.module.css.mjs
var classes23 = { "root": "m-bf2d988c", "inner": "m-26062bec", "input": "m-26063560", "icon": "m-bf295423", "input--outline": "m-215c4542" };

// node_modules/@mantine/core/esm/components/Checkbox/Checkbox.mjs
var defaultProps55 = {
  labelPosition: "right",
  icon: CheckboxIcon
};
var varsResolver23 = createVarsResolver(
  (theme, { radius, color, size: size2, iconColor, variant }) => {
    const parsedColor = parseThemeColor({ color: color || theme.primaryColor, theme });
    const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
    return {
      root: {
        "--checkbox-size": getSize(size2, "checkbox-size"),
        "--checkbox-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--checkbox-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
        "--checkbox-icon-color": iconColor ? getThemeColor(iconColor, theme) : void 0
      }
    };
  }
);
var Checkbox = factory((_props, ref) => {
  const props = useProps("Checkbox", defaultProps55, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    label,
    id,
    size: size2,
    radius,
    wrapperProps,
    children,
    checked,
    labelPosition,
    description,
    error,
    disabled,
    variant,
    indeterminate,
    icon,
    rootRef,
    iconColor,
    ...others
  } = props;
  const ctx = useCheckboxGroupContext();
  const _size = size2 || (ctx == null ? void 0 : ctx.size);
  const Icon = icon;
  const getStyles2 = useStyles({
    name: "Checkbox",
    props,
    classes: classes23,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver23
  });
  const { styleProps, rest } = extractStyleProps(others);
  const uuid = useId(id);
  const contextProps = ctx ? {
    checked: ctx.value.includes(rest.value),
    onChange: ctx.onChange
  } : {};
  return import_react166.default.createElement(
    InlineInput,
    {
      ...getStyles2("root"),
      __staticSelector: "Checkbox",
      __stylesApiProps: props,
      id: uuid,
      size: _size,
      labelPosition,
      label,
      description,
      error,
      disabled,
      classNames,
      styles,
      unstyled,
      "data-checked": contextProps.checked || checked || void 0,
      variant,
      ref: rootRef,
      ...styleProps,
      ...wrapperProps
    },
    import_react166.default.createElement(Box, { ...getStyles2("inner"), mod: { "data-label-position": labelPosition } }, import_react166.default.createElement(
      Box,
      {
        component: "input",
        id: uuid,
        ref,
        checked,
        disabled,
        mod: { error: !!error, indeterminate },
        ...getStyles2("input", { focusable: true, variant }),
        ...rest,
        ...contextProps,
        type: "checkbox"
      }
    ), import_react166.default.createElement(Icon, { indeterminate, ...getStyles2("icon") }))
  );
});
Checkbox.classes = { ...classes23, ...InlineInputClasses };
Checkbox.displayName = "@mantine/core/Checkbox";
Checkbox.Group = CheckboxGroup;

// node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/is-options-group.mjs
function isOptionsGroup(item) {
  return "group" in item;
}

// node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/default-options-filter.mjs
function defaultOptionsFilter({
  options,
  search,
  limit
}) {
  const parsedSearch = search.trim().toLowerCase();
  const result = [];
  for (let i = 0; i < options.length; i += 1) {
    const item = options[i];
    if (result.length === limit) {
      return result;
    }
    if (isOptionsGroup(item)) {
      result.push({
        group: item.group,
        items: defaultOptionsFilter({
          options: item.items,
          search,
          limit: limit - result.length
        })
      });
    }
    if (!isOptionsGroup(item)) {
      if (item.label.toLowerCase().includes(parsedSearch)) {
        result.push(item);
      }
    }
  }
  return result;
}

// node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/is-empty-combobox-data.mjs
function isEmptyComboboxData(data) {
  if (data.length === 0) {
    return true;
  }
  for (const item of data) {
    if (!("group" in item)) {
      return false;
    }
    if (item.items.length > 0) {
      return false;
    }
  }
  return true;
}

// node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/validate-options.mjs
function validateOptions(options, valuesSet = /* @__PURE__ */ new Set()) {
  if (!Array.isArray(options)) {
    return;
  }
  for (const option of options) {
    if (isOptionsGroup(option)) {
      validateOptions(option.items, valuesSet);
    } else {
      if (typeof option.value === "undefined") {
        throw new Error("[@mantine/core] Each option must have value property");
      }
      if (typeof option.value !== "string") {
        throw new Error(
          `[@mantine/core] Option value must be a string, other data formats are not supported, got ${typeof option.value}`
        );
      }
      if (valuesSet.has(option.value)) {
        throw new Error(
          `[@mantine/core] Duplicate options are not supported. Option with value "${option.value}" was provided more than once`
        );
      }
      valuesSet.add(option.value);
    }
  }
}

// node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/OptionsDropdown.mjs
function isValueChecked(value, optionValue) {
  return Array.isArray(value) ? value.includes(optionValue) : value === optionValue;
}
function Option({ data, withCheckIcon, value, checkIconPosition, unstyled }) {
  if (!isOptionsGroup(data)) {
    const check = withCheckIcon && isValueChecked(value, data.value) && import_react167.default.createElement(CheckIcon, { className: classes21.optionsDropdownCheckIcon });
    return import_react167.default.createElement(
      Combobox.Option,
      {
        value: data.value,
        disabled: data.disabled,
        className: clsx_default({ [classes21.optionsDropdownOption]: !unstyled }),
        "data-reverse": checkIconPosition === "right" || void 0,
        "data-checked": isValueChecked(value, data.value) || void 0,
        "aria-selected": isValueChecked(value, data.value)
      },
      checkIconPosition === "left" && check,
      data.label,
      checkIconPosition === "right" && check
    );
  }
  const options = data.items.map((item) => import_react167.default.createElement(
    Option,
    {
      data: item,
      value,
      key: item.value,
      unstyled,
      withCheckIcon,
      checkIconPosition
    }
  ));
  return import_react167.default.createElement(Combobox.Group, { label: data.group }, options);
}
function OptionsDropdown({
  data,
  hidden,
  hiddenWhenEmpty,
  filter,
  search,
  limit,
  maxDropdownHeight,
  withScrollArea = true,
  filterOptions = true,
  withCheckIcon = false,
  value,
  checkIconPosition,
  nothingFoundMessage,
  unstyled,
  labelId
}) {
  validateOptions(data);
  const shouldFilter = typeof search === "string";
  const filteredData = shouldFilter ? (filter || defaultOptionsFilter)({
    options: data,
    search: filterOptions ? search : "",
    limit: limit ?? Infinity
  }) : data;
  const isEmpty = isEmptyComboboxData(filteredData);
  const options = filteredData.map((item) => import_react167.default.createElement(
    Option,
    {
      data: item,
      key: isOptionsGroup(item) ? item.group : item.value,
      withCheckIcon,
      value,
      checkIconPosition,
      unstyled
    }
  ));
  return import_react167.default.createElement(Combobox.Dropdown, { hidden: hidden || hiddenWhenEmpty && isEmpty }, import_react167.default.createElement(Combobox.Options, { labelledBy: labelId }, withScrollArea ? import_react167.default.createElement(
    ScrollArea.Autosize,
    {
      mah: maxDropdownHeight ?? 220,
      type: "scroll",
      scrollbarSize: "var(--_combobox-padding)",
      offsetScrollbars: "y",
      className: classes21.optionsDropdownScrollArea
    },
    options
  ) : options, isEmpty && nothingFoundMessage && import_react167.default.createElement(Combobox.Empty, null, nothingFoundMessage)));
}

// node_modules/@mantine/core/esm/components/Autocomplete/Autocomplete.mjs
var defaultProps56 = {};
var Autocomplete = factory((_props, ref) => {
  const props = useProps("Autocomplete", defaultProps56, _props);
  const {
    classNames,
    styles,
    unstyled,
    vars,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownClose,
    onDropdownOpen,
    onFocus,
    onBlur,
    onClick,
    onChange,
    data,
    value,
    defaultValue,
    selectFirstOptionOnChange,
    onOptionSubmit,
    comboboxProps,
    readOnly,
    disabled,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    size: size2,
    id,
    ...others
  } = props;
  const _id = useId(id);
  const parsedData = getParsedComboboxData(data);
  const optionsLockup = getOptionsLockup(parsedData);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const combobox = useCombobox({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose: () => {
      onDropdownClose == null ? void 0 : onDropdownClose();
      combobox.resetSelectedOption();
    }
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    props,
    styles,
    classNames
  });
  (0, import_react168.useEffect)(() => {
    if (selectFirstOptionOnChange) {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, _value]);
  return import_react168.default.createElement(
    Combobox,
    {
      store: combobox,
      __staticSelector: "Autocomplete",
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      unstyled,
      readOnly,
      onOptionSubmit: (val) => {
        onOptionSubmit == null ? void 0 : onOptionSubmit(val);
        setValue(optionsLockup[val].label);
        combobox.closeDropdown();
      },
      size: size2,
      ...comboboxProps
    },
    import_react168.default.createElement(Combobox.Target, null, import_react168.default.createElement(
      InputBase,
      {
        ref,
        ...others,
        size: size2,
        __staticSelector: "Autocomplete",
        disabled,
        readOnly,
        value: _value,
        onChange: (event) => {
          setValue(event.currentTarget.value);
          combobox.openDropdown();
          selectFirstOptionOnChange && combobox.selectFirstOption();
        },
        onFocus: (event) => {
          combobox.openDropdown();
          onFocus == null ? void 0 : onFocus(event);
        },
        onBlur: (event) => {
          combobox.closeDropdown();
          onBlur == null ? void 0 : onBlur(event);
        },
        onClick: (event) => {
          combobox.openDropdown();
          onClick == null ? void 0 : onClick(event);
        },
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        id: _id
      }
    )),
    import_react168.default.createElement(
      OptionsDropdown,
      {
        data: parsedData,
        hidden: readOnly || disabled,
        filter,
        search: _value,
        limit,
        hiddenWhenEmpty: true,
        withScrollArea,
        maxDropdownHeight,
        unstyled,
        labelId: `${_id}-label`
      }
    )
  );
});
Autocomplete.classes = { ...InputBase.classes, ...Combobox.classes };
Autocomplete.displayName = "@mantine/core/Autocomplete";

// node_modules/@mantine/core/esm/components/Avatar/Avatar.mjs
var import_react172 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Avatar/AvatarGroup/AvatarGroup.mjs
var import_react170 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Avatar/AvatarGroup/AvatarGroup.context.mjs
var import_react169 = __toESM(require_react(), 1);
var AvatarGroupContext = (0, import_react169.createContext)(null);
var AvatarGroupProvider = AvatarGroupContext.Provider;
function useAvatarGroupContext() {
  const ctx = (0, import_react169.useContext)(AvatarGroupContext);
  return { withinGroup: !!ctx };
}

// node_modules/@mantine/core/esm/components/Avatar/Avatar.module.css.mjs
var classes24 = { "root": "m-f85678b6", "image": "m-11f8ac07", "placeholder": "m-104cd71f", "group": "m-11def92b" };

// node_modules/@mantine/core/esm/components/Avatar/AvatarGroup/AvatarGroup.mjs
var defaultProps57 = {};
var varsResolver24 = createVarsResolver((_, { spacing }) => ({
  group: {
    "--ag-spacing": getSpacing(spacing)
  }
}));
var AvatarGroup = factory((_props, ref) => {
  const props = useProps("AvatarGroup", defaultProps57, _props);
  const { classNames, className, style, styles, unstyled, vars, spacing, ...others } = props;
  const getStyles2 = useStyles({
    name: "AvatarGroup",
    classes: classes24,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver24,
    rootSelector: "group"
  });
  return import_react170.default.createElement(AvatarGroupProvider, { value: true }, import_react170.default.createElement(Box, { ref, ...getStyles2("group"), ...others }));
});
AvatarGroup.classes = classes24;
AvatarGroup.displayName = "@mantine/core/AvatarGroup";

// node_modules/@mantine/core/esm/components/Avatar/AvatarPlaceholderIcon.mjs
var import_react171 = __toESM(require_react(), 1);
function AvatarPlaceholderIcon(props) {
  return import_react171.default.createElement(
    "svg",
    {
      ...props,
      "data-avatar-placeholder-icon": true,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    import_react171.default.createElement(
      "path",
      {
        d: "M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  );
}

// node_modules/@mantine/core/esm/components/Avatar/Avatar.mjs
var defaultProps58 = {};
var varsResolver25 = createVarsResolver(
  (theme, { size: size2, radius, variant, gradient, color }) => {
    const colors = theme.variantColorResolver({
      color: color || "gray",
      theme,
      gradient,
      variant: variant || "light"
    });
    return {
      root: {
        "--avatar-size": getSize(size2, "avatar-size"),
        "--avatar-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--avatar-bg": color || variant ? colors.background : void 0,
        "--avatar-color": color || variant ? colors.color : void 0,
        "--avatar-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
var Avatar = polymorphicFactory((_props, ref) => {
  const props = useProps("Avatar", defaultProps58, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    src,
    alt,
    radius,
    color,
    gradient,
    imageProps,
    children,
    ...others
  } = props;
  const ctx = useAvatarGroupContext();
  const [error, setError] = (0, import_react172.useState)(!src);
  const getStyles2 = useStyles({
    name: "Avatar",
    props,
    classes: classes24,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver25
  });
  (0, import_react172.useEffect)(() => setError(!src), [src]);
  return import_react172.default.createElement(Box, { ...getStyles2("root"), mod: { "within-group": ctx.withinGroup }, ref, ...others }, error ? import_react172.default.createElement("span", { ...getStyles2("placeholder"), title: alt }, children || import_react172.default.createElement(AvatarPlaceholderIcon, null)) : import_react172.default.createElement(
    "img",
    {
      ...imageProps,
      ...getStyles2("image"),
      src,
      alt,
      onError: (event) => {
        var _a;
        setError(true);
        (_a = imageProps == null ? void 0 : imageProps.onError) == null ? void 0 : _a.call(imageProps, event);
      }
    }
  ));
});
Avatar.classes = classes24;
Avatar.displayName = "@mantine/core/Avatar";
Avatar.Group = AvatarGroup;

// node_modules/@mantine/core/esm/components/BackgroundImage/BackgroundImage.mjs
var import_react173 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/BackgroundImage/BackgroundImage.module.css.mjs
var classes25 = { "root": "m-2ce0de02" };

// node_modules/@mantine/core/esm/components/BackgroundImage/BackgroundImage.mjs
var defaultProps59 = {};
var varsResolver26 = createVarsResolver((_, { radius }) => ({
  root: { "--bi-radius": radius === void 0 ? void 0 : getRadius(radius) }
}));
var BackgroundImage = polymorphicFactory((_props, ref) => {
  const props = useProps("BackgroundImage", defaultProps59, _props);
  const { classNames, className, style, styles, unstyled, vars, radius, src, variant, ...others } = props;
  const getStyles2 = useStyles({
    name: "BackgroundImage",
    props,
    classes: classes25,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver26
  });
  return import_react173.default.createElement(
    Box,
    {
      ref,
      variant,
      ...getStyles2("root", { style: { backgroundImage: `url(${src})` } }),
      ...others
    }
  );
});
BackgroundImage.classes = classes25;
BackgroundImage.displayName = "@mantine/core/BackgroundImage";

// node_modules/@mantine/core/esm/components/Badge/Badge.mjs
var import_react174 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Badge/Badge.module.css.mjs
var classes26 = { "root": "m-347db0ec", "root--dot": "m-fbd81e3d", "label": "m-5add502a", "section": "m-91fdda9b" };

// node_modules/@mantine/core/esm/components/Badge/Badge.mjs
var defaultProps60 = {};
var varsResolver27 = createVarsResolver(
  (theme, { radius, color, gradient, variant, size: size2 }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled"
    });
    return {
      root: {
        "--badge-height": getSize(size2, "badge-height"),
        "--badge-padding-x": getSize(size2, "badge-padding-x"),
        "--badge-fz": getSize(size2, "badge-fz"),
        "--badge-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--badge-bg": color || variant ? colors.background : void 0,
        "--badge-color": color || variant ? colors.color : void 0,
        "--badge-bd": color || variant ? colors.border : void 0,
        "--badge-dot-color": variant === "dot" ? getThemeColor(color, theme) : void 0
      }
    };
  }
);
var Badge = polymorphicFactory((_props, ref) => {
  const props = useProps("Badge", defaultProps60, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    radius,
    color,
    gradient,
    leftSection,
    rightSection,
    children,
    variant,
    fullWidth,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Badge",
    props,
    classes: classes26,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver27
  });
  return import_react174.default.createElement(
    Box,
    {
      variant,
      mod: { block: fullWidth },
      ...getStyles2("root", { variant }),
      ref,
      ...others
    },
    leftSection && import_react174.default.createElement("span", { ...getStyles2("section"), "data-position": "left" }, leftSection),
    import_react174.default.createElement("span", { ...getStyles2("label") }, children),
    rightSection && import_react174.default.createElement("span", { ...getStyles2("section"), "data-position": "right" }, rightSection)
  );
});
Badge.classes = classes26;
Badge.displayName = "@mantine/core/Badge";

// node_modules/@mantine/core/esm/components/Blockquote/Blockquote.mjs
var import_react175 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Blockquote/Blockquote.module.css.mjs
var classes27 = { "root": "m-ddec01c0", "icon": "m-dde7bd57", "cite": "m-dde51a35" };

// node_modules/@mantine/core/esm/components/Blockquote/Blockquote.mjs
var defaultProps61 = {
  iconSize: 48
};
var varsResolver28 = createVarsResolver((theme, { color, iconSize, radius }) => {
  const darkParsed = parseThemeColor({
    color: color || theme.primaryColor,
    theme,
    colorScheme: "dark"
  });
  const lightParsed = parseThemeColor({
    color: color || theme.primaryColor,
    theme,
    colorScheme: "light"
  });
  return {
    root: {
      "--bq-bg-light": rgba(lightParsed.value, 0.07),
      "--bq-bg-dark": rgba(darkParsed.value, 0.06),
      "--bq-bd": getThemeColor(color, theme),
      "--bq-icon-size": rem(iconSize),
      "--bq-radius": getRadius(radius)
    }
  };
});
var Blockquote = factory((_props, ref) => {
  const props = useProps("Blockquote", defaultProps61, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    icon,
    iconSize,
    cite,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Blockquote",
    classes: classes27,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver28
  });
  return import_react175.default.createElement(Box, { component: "blockquote", ref, ...getStyles2("root"), ...others }, icon && import_react175.default.createElement("span", { ...getStyles2("icon") }, icon), children, cite && import_react175.default.createElement("cite", { ...getStyles2("cite") }, cite));
});
Blockquote.classes = classes27;
Blockquote.displayName = "@mantine/core/Blockquote";

// node_modules/@mantine/core/esm/components/Breadcrumbs/Breadcrumbs.mjs
var import_react176 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Breadcrumbs/Breadcrumbs.module.css.mjs
var classes28 = { "root": "m-8b3717df", "breadcrumb": "m-f678d540", "separator": "m-3b8f2208" };

// node_modules/@mantine/core/esm/components/Breadcrumbs/Breadcrumbs.mjs
var defaultProps62 = {
  separator: "/"
};
var varsResolver29 = createVarsResolver((_, { separatorMargin }) => ({
  root: {
    "--bc-separator-margin": getSpacing(separatorMargin)
  }
}));
var Breadcrumbs = factory((_props, ref) => {
  const props = useProps("Breadcrumbs", defaultProps62, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    separator,
    separatorMargin,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Breadcrumbs",
    classes: classes28,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver29
  });
  const items = import_react176.default.Children.toArray(children).reduce(
    (acc, child, index5, array) => {
      var _a;
      const item = isElement(child) ? import_react176.default.cloneElement(child, {
        ...getStyles2("breadcrumb", { className: (_a = child.props) == null ? void 0 : _a.className }),
        key: index5
      }) : import_react176.default.createElement("div", { ...getStyles2("breadcrumb"), key: index5 }, child);
      acc.push(item);
      if (index5 !== array.length - 1) {
        acc.push(
          import_react176.default.createElement(Box, { ...getStyles2("separator"), key: `separator-${index5}` }, separator)
        );
      }
      return acc;
    },
    []
  );
  return import_react176.default.createElement(Box, { ref, ...getStyles2("root"), ...others }, items);
});
Breadcrumbs.classes = classes28;
Breadcrumbs.displayName = "@mantine/core/Breadcrumbs";

// node_modules/@mantine/core/esm/components/Burger/Burger.mjs
var import_react177 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Burger/Burger.module.css.mjs
var classes29 = { "root": "m-fea6bf1a", "burger": "m-d4fb9cad" };

// node_modules/@mantine/core/esm/components/Burger/Burger.mjs
var defaultProps63 = {};
var varsResolver30 = createVarsResolver(
  (theme, { color, size: size2, transitionDuration, transitionTimingFunction }) => ({
    root: {
      "--burger-color": color ? getThemeColor(color, theme) : void 0,
      "--burger-size": getSize(size2, "burger-size"),
      "--burger-transition-duration": transitionDuration === void 0 ? void 0 : `${transitionDuration}ms`,
      "--burger-transition-timing-function": transitionTimingFunction
    }
  })
);
var Burger = factory((_props, ref) => {
  const props = useProps("Burger", defaultProps63, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    opened,
    children,
    transitionDuration,
    transitionTimingFunction,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Burger",
    classes: classes29,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver30
  });
  return import_react177.default.createElement(UnstyledButton, { ...getStyles2("root"), ref, ...others }, import_react177.default.createElement(Box, { mod: ["reduce-motion", { opened }], ...getStyles2("burger") }), children);
});
Burger.classes = classes29;
Burger.displayName = "@mantine/core/Burger";

// node_modules/@mantine/core/esm/components/Button/Button.mjs
var import_react179 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Button/ButtonGroup/ButtonGroup.mjs
var import_react178 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Button/Button.module.css.mjs
var classes30 = { "root": "m-77c9d27d", "inner": "m-80f1301b", "loader": "m-a25b86ee", "label": "m-811560b9", "section": "m-a74036a", "group": "m-80d6d844" };

// node_modules/@mantine/core/esm/components/Button/ButtonGroup/ButtonGroup.mjs
var defaultProps64 = {
  orientation: "horizontal"
};
var varsResolver31 = createVarsResolver((_, { borderWidth }) => ({
  group: { "--button-border-width": rem(borderWidth) }
}));
var ButtonGroup = factory((_props, ref) => {
  const props = useProps("ButtonGroup", defaultProps64, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    orientation,
    vars,
    borderWidth,
    variant,
    ...others
  } = useProps("ButtonGroup", defaultProps64, _props);
  const getStyles2 = useStyles({
    name: "ButtonGroup",
    props,
    classes: classes30,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver31,
    rootSelector: "group"
  });
  return import_react178.default.createElement(
    Box,
    {
      ...getStyles2("group"),
      ref,
      variant,
      mod: { "data-orientation": orientation },
      role: "group",
      ...others
    }
  );
});
ButtonGroup.classes = classes30;
ButtonGroup.displayName = "@mantine/core/ButtonGroup";

// node_modules/@mantine/core/esm/components/Button/Button.mjs
var defaultProps65 = {};
var varsResolver32 = createVarsResolver(
  (theme, { radius, color, gradient, variant, size: size2, justify }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled"
    });
    return {
      root: {
        "--button-justify": justify,
        "--button-height": getSize(size2, "button-height"),
        "--button-padding-x": getSize(size2, "button-padding-x"),
        "--button-fz": (size2 == null ? void 0 : size2.includes("compact")) ? getFontSize(size2.replace("compact-", "")) : getFontSize(size2),
        "--button-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--button-bg": color || variant ? colors.background : void 0,
        "--button-hover": color || variant ? colors.hover : void 0,
        "--button-color": color || variant ? colors.color : void 0,
        "--button-bd": color || variant ? colors.border : void 0,
        "--button-hover-color": color || variant ? colors.hoverColor : void 0
      }
    };
  }
);
var Button = polymorphicFactory((_props, ref) => {
  const props = useProps("Button", defaultProps65, _props);
  const {
    style,
    vars,
    className,
    color,
    disabled,
    children,
    leftSection,
    rightSection,
    fullWidth,
    variant,
    radius,
    loading,
    loaderProps,
    gradient,
    classNames,
    styles,
    unstyled,
    "data-disabled": dataDisabled,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Button",
    props,
    classes: classes30,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver32
  });
  const hasLeftSection = !!leftSection;
  const hasRightSection = !!rightSection;
  return import_react179.default.createElement(
    UnstyledButton,
    {
      ref,
      ...getStyles2("root", { active: !disabled && !loading && !dataDisabled }),
      unstyled,
      variant,
      disabled: disabled || loading,
      mod: {
        disabled: disabled || dataDisabled,
        loading,
        block: fullWidth,
        "with-left-section": hasLeftSection,
        "with-right-section": hasRightSection
      },
      ...others
    },
    import_react179.default.createElement(Box, { component: "span", ...getStyles2("loader"), "aria-hidden": true }, import_react179.default.createElement(
      Loader,
      {
        color: "var(--button-color)",
        size: "calc(var(--button-height) / 1.8)",
        ...loaderProps
      }
    )),
    import_react179.default.createElement("span", { ...getStyles2("inner") }, leftSection && import_react179.default.createElement(Box, { component: "span", ...getStyles2("section"), mod: { position: "left" } }, leftSection), import_react179.default.createElement(Box, { component: "span", mod: { loading }, ...getStyles2("label") }, children), rightSection && import_react179.default.createElement(Box, { component: "span", ...getStyles2("section"), mod: { position: "right" } }, rightSection))
  );
});
Button.classes = classes30;
Button.displayName = "@mantine/core/Button";
Button.Group = ButtonGroup;

// node_modules/@mantine/core/esm/components/Card/Card.mjs
var import_react182 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Card/CardSection/CardSection.mjs
var import_react181 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Card/Card.context.mjs
var import_react180 = __toESM(require_react(), 1);
var [CardProvider, useCardContext] = createSafeContext(
  "Card component was not found in tree"
);

// node_modules/@mantine/core/esm/components/Card/Card.module.css.mjs
var classes31 = { "root": "m-e615b15f", "section": "m-599a2148" };

// node_modules/@mantine/core/esm/components/Card/CardSection/CardSection.mjs
var defaultProps66 = {};
var CardSection = polymorphicFactory((_props, ref) => {
  const props = useProps("CardSection", defaultProps66, _props);
  const { classNames, className, style, styles, vars, withBorder, inheritPadding, ...others } = props;
  const ctx = useCardContext();
  return import_react181.default.createElement(
    Box,
    {
      ref,
      mod: { "with-border": withBorder, "inherit-padding": inheritPadding },
      ...ctx.getStyles("section", { className, style, styles, classNames }),
      ...others
    }
  );
});
CardSection.classes = classes31;
CardSection.displayName = "@mantine/core/CardSection";

// node_modules/@mantine/core/esm/components/Card/Card.mjs
var defaultProps67 = {};
var varsResolver33 = createVarsResolver((_, { padding }) => ({
  root: {
    "--card-padding": getSpacing(padding)
  }
}));
var Card = polymorphicFactory((_props, ref) => {
  const props = useProps("Card", defaultProps67, _props);
  const { classNames, className, style, styles, unstyled, vars, children, padding, ...others } = props;
  const getStyles2 = useStyles({
    name: "Card",
    props,
    classes: classes31,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver33
  });
  const _children = import_react182.Children.toArray(children);
  const content = _children.map((child, index5) => {
    if (typeof child === "object" && child && "type" in child && child.type === CardSection) {
      return (0, import_react182.cloneElement)(child, {
        "data-first-section": index5 === 0 || void 0,
        "data-last-section": index5 === _children.length - 1 || void 0
      });
    }
    return child;
  });
  return import_react182.default.createElement(CardProvider, { value: { getStyles: getStyles2 } }, import_react182.default.createElement(Paper, { ref, unstyled, ...getStyles2("root"), ...others }, content));
});
Card.classes = classes31;
Card.displayName = "@mantine/core/Card";
Card.Section = CardSection;

// node_modules/@mantine/core/esm/components/Center/Center.mjs
var import_react183 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Center/Center.module.css.mjs
var classes32 = { "root": "m-4451eb3a" };

// node_modules/@mantine/core/esm/components/Center/Center.mjs
var defaultProps68 = {};
var Center = polymorphicFactory((_props, ref) => {
  const props = useProps("Center", defaultProps68, _props);
  const { classNames, className, style, styles, unstyled, vars, inline: inline2, ...others } = props;
  const getStyles2 = useStyles({
    name: "Center",
    props,
    classes: classes32,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars
  });
  return import_react183.default.createElement(Box, { ref, mod: { inline: inline2 }, ...getStyles2("root"), ...others });
});
Center.classes = classes32;
Center.displayName = "@mantine/core/Center";

// node_modules/@mantine/core/esm/components/Chip/Chip.mjs
var import_react186 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Chip/ChipGroup.context.mjs
var import_react184 = __toESM(require_react(), 1);
var [ChipGroupProvider, useChipGroupContext] = createOptionalContext();

// node_modules/@mantine/core/esm/components/Chip/ChipGroup/ChipGroup.mjs
var import_react185 = __toESM(require_react(), 1);
var defaultProps69 = {};
function ChipGroup(props) {
  const { value, defaultValue, onChange, multiple, children } = useProps(
    "ChipGroup",
    defaultProps69,
    props
  );
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: multiple ? [] : null,
    onChange
  });
  const isChipSelected = (val) => Array.isArray(_value) ? _value.includes(val) : val === _value;
  const handleChange = (event) => {
    const val = event.currentTarget.value;
    if (Array.isArray(_value)) {
      setValue(_value.includes(val) ? _value.filter((v) => v !== val) : [..._value, val]);
    } else {
      setValue(val);
    }
  };
  return import_react185.default.createElement(ChipGroupProvider, { value: { isChipSelected, onChange: handleChange, multiple } }, children);
}
ChipGroup.displayName = "@mantine/core/ChipGroup";

// node_modules/@mantine/core/esm/components/Chip/Chip.module.css.mjs
var classes33 = { "root": "m-f59ffda3", "label": "m-be049a53", "label--outline": "m-3904c1af", "label--filled": "m-fa109255", "label--light": "m-f7e165c3", "iconWrapper": "m-9ac86df9", "checkIcon": "m-d6d72580", "input": "m-bde07329" };

// node_modules/@mantine/core/esm/components/Chip/Chip.mjs
var defaultProps70 = {
  type: "checkbox"
};
var varsResolver34 = createVarsResolver((theme, { size: size2, radius, variant, color }) => {
  const colors = theme.variantColorResolver({
    color: color || theme.primaryColor,
    theme,
    variant
  });
  return {
    root: {
      "--chip-fz": getFontSize(size2),
      "--chip-size": getSize(size2, "chip-size"),
      "--chip-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--chip-checked-padding": getSize(size2, "chip-checked-padding"),
      "--chip-padding": getSize(size2, "chip-padding"),
      "--chip-icon-size": getSize(size2, "chip-icon-size"),
      "--chip-bg": color || variant ? colors.background : void 0,
      "--chip-hover": color || variant ? colors.hover : void 0,
      "--chip-color": color || variant ? colors.color : void 0,
      "--chip-bd": color || variant ? colors.border : void 0,
      "--chip-spacing": getSize(size2, "chip-spacing")
    }
  };
});
var Chip = factory((_props, ref) => {
  const props = useProps("Chip", defaultProps70, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    id,
    checked,
    defaultChecked,
    onChange,
    value,
    wrapperProps,
    type,
    disabled,
    children,
    size: size2,
    variant,
    icon,
    rootRef,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Chip",
    classes: classes33,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver34
  });
  const ctx = useChipGroupContext();
  const uuid = useId(id);
  const { styleProps, rest } = extractStyleProps(others);
  const [_value, setValue] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange
  });
  const contextProps = ctx ? {
    checked: ctx.isChipSelected(value),
    onChange: ctx.onChange,
    type: ctx.multiple ? "checkbox" : "radio"
  } : {};
  const _checked = contextProps.checked || _value;
  return import_react186.default.createElement(
    Box,
    {
      size: size2,
      variant,
      ref: rootRef,
      ...getStyles2("root"),
      ...styleProps,
      ...wrapperProps
    },
    import_react186.default.createElement(
      "input",
      {
        type,
        ...getStyles2("input"),
        checked: _checked,
        onChange: (event) => setValue(event.currentTarget.checked),
        id: uuid,
        disabled,
        ref,
        value,
        ...contextProps,
        ...rest
      }
    ),
    import_react186.default.createElement(
      "label",
      {
        htmlFor: uuid,
        "data-checked": _checked || void 0,
        "data-disabled": disabled || void 0,
        ...getStyles2("label", { variant: variant || "filled" })
      },
      _checked && import_react186.default.createElement("span", { ...getStyles2("iconWrapper") }, icon || import_react186.default.createElement(CheckIcon, { ...getStyles2("checkIcon") })),
      children
    )
  );
});
Chip.classes = classes33;
Chip.displayName = "@mantine/core/Chip";
Chip.Group = ChipGroup;

// node_modules/@mantine/core/esm/components/Code/Code.mjs
var import_react187 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Code/Code.module.css.mjs
var classes34 = { "root": "m-b183c0a2" };

// node_modules/@mantine/core/esm/components/Code/Code.mjs
var defaultProps71 = {};
var varsResolver35 = createVarsResolver((theme, { color }) => ({
  root: {
    "--code-bg": color ? getThemeColor(color, theme) : void 0
  }
}));
var Code = factory((_props, ref) => {
  const props = useProps("Code", defaultProps71, _props);
  const { classNames, className, style, styles, unstyled, vars, color, block, variant, ...others } = props;
  const getStyles2 = useStyles({
    name: "Code",
    props,
    classes: classes34,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver35
  });
  return import_react187.default.createElement(
    Box,
    {
      component: block ? "pre" : "code",
      variant,
      ref,
      mod: { block },
      ...getStyles2("root"),
      ...others,
      dir: "ltr"
    }
  );
});
Code.classes = classes34;
Code.displayName = "@mantine/core/Code";

// node_modules/@mantine/core/esm/components/ColorPicker/ColorPicker.mjs
var import_react196 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ColorPicker/AlphaSlider/AlphaSlider.mjs
var import_react191 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ColorPicker/ColorSlider/ColorSlider.mjs
var import_react190 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ColorPicker/ColorPicker.module.css.mjs
var classes35 = { "wrapper": "m-fee9c77", "preview": "m-9dddfbac", "body": "m-bffecc3e", "sliders": "m-3283bb96", "thumb": "m-40d572ba", "swatch": "m-d8ee6fd8", "swatches": "m-5711e686", "saturation": "m-202a296e", "saturationOverlay": "m-11b3db02", "slider": "m-d856d47d", "sliderOverlay": "m-8f327113" };

// node_modules/@mantine/core/esm/components/ColorPicker/ColorPicker.context.mjs
var import_react188 = __toESM(require_react(), 1);
var [ColorPickerProvider, useColorPickerContext] = createOptionalContext(null);

// node_modules/@mantine/core/esm/components/ColorPicker/Thumb/Thumb.mjs
var import_react189 = __toESM(require_react(), 1);
var Thumb2 = (0, import_react189.forwardRef)(({ position, ...others }, ref) => import_react189.default.createElement(
  Box,
  {
    ref,
    __vars: {
      "--_thumb-y-offset": `${position.y * 100}%`,
      "--_thumb-x-offset": `${position.x * 100}%`
    },
    ...others
  }
));
Thumb2.displayName = "@mantine/core/ColorPickerThumb";

// node_modules/@mantine/core/esm/components/ColorPicker/ColorSlider/ColorSlider.mjs
var defaultProps72 = {};
var varsResolver36 = createVarsResolver(() => ({
  root: {
    "--test": "test"
  }
}));
var ColorSlider = factory((_props, ref) => {
  var _a;
  const props = useProps("ColorSlider", defaultProps72, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    onChange,
    onChangeEnd,
    maxValue,
    round: round3,
    size: size2 = "md",
    focusable = true,
    value,
    overlays,
    thumbColor = "transparent",
    onScrubStart,
    onScrubEnd,
    __staticSelector = "ColorPicker",
    ...others
  } = props;
  const _getStyles = useStyles({
    name: __staticSelector,
    classes: classes35,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver36
  });
  const ctxGetStyles = (_a = useColorPickerContext()) == null ? void 0 : _a.getStyles;
  const getStyles2 = ctxGetStyles || _getStyles;
  const theme = useMantineTheme();
  const [position, setPosition] = (0, import_react190.useState)({ y: 0, x: value / maxValue });
  const positionRef = (0, import_react190.useRef)(position);
  const getChangeValue2 = (val) => round3 ? Math.round(val * maxValue) : val * maxValue;
  const { ref: sliderRef } = useMove(
    ({ x, y }) => {
      positionRef.current = { x, y };
      onChange == null ? void 0 : onChange(getChangeValue2(x));
    },
    {
      onScrubEnd: () => {
        const { x } = positionRef.current;
        onChangeEnd == null ? void 0 : onChangeEnd(getChangeValue2(x));
        onScrubEnd == null ? void 0 : onScrubEnd();
      },
      onScrubStart
    }
  );
  useDidUpdate(() => {
    setPosition({ y: 0, x: value / maxValue });
  }, [value]);
  const handleArrow = (event, pos) => {
    event.preventDefault();
    const _position = clampUseMovePosition(pos);
    onChange == null ? void 0 : onChange(getChangeValue2(_position.x));
    onChangeEnd == null ? void 0 : onChangeEnd(getChangeValue2(_position.x));
  };
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowRight": {
        handleArrow(event, { x: position.x + 0.05, y: position.y });
        break;
      }
      case "ArrowLeft": {
        handleArrow(event, { x: position.x - 0.05, y: position.y });
        break;
      }
    }
  };
  const layers = overlays.map((overlay, index5) => import_react190.default.createElement("div", { ...getStyles2("sliderOverlay"), style: overlay, key: index5 }));
  return import_react190.default.createElement(
    Box,
    {
      ...others,
      ref: useMergedRef(sliderRef, ref),
      ...getStyles2("slider"),
      role: "slider",
      "aria-valuenow": value,
      "aria-valuemax": maxValue,
      "aria-valuemin": 0,
      tabIndex: focusable ? 0 : -1,
      onKeyDown: handleKeyDown,
      "data-focus-ring": theme.focusRing,
      __vars: {
        "--_cp-thumb-size": `var(--cp-thumb-size-${size2})`
      }
    },
    layers,
    import_react190.default.createElement(
      Thumb2,
      {
        position,
        ...getStyles2("thumb", { style: { top: rem(1), background: thumbColor } })
      }
    )
  );
});
ColorSlider.displayName = "@mantine/core/ColorSlider";

// node_modules/@mantine/core/esm/components/ColorPicker/converters/parsers.mjs
function round2(number, digits = 0, base = 10 ** digits) {
  return Math.round(base * number) / base;
}
function hslaToHsva({ h, s, l, a }) {
  const ss = s * ((l < 50 ? l : 100 - l) / 100);
  return {
    h,
    s: ss > 0 ? 2 * ss / (l + ss) * 100 : 0,
    v: l + ss,
    a
  };
}
var angleUnits = {
  grad: 360 / 400,
  turn: 360,
  rad: 360 / (Math.PI * 2)
};
function parseHue(value, unit = "deg") {
  return Number(value) * (angleUnits[unit] || 1);
}
var HSL_REGEXP = /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
function parseHsla(color) {
  const match = HSL_REGEXP.exec(color);
  if (!match) {
    return { h: 0, s: 0, v: 0, a: 1 };
  }
  return hslaToHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    l: Number(match[4]),
    a: match[5] === void 0 ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
  });
}
function rgbaToHsva({ r: r2, g, b, a }) {
  const max2 = Math.max(r2, g, b);
  const delta = max2 - Math.min(r2, g, b);
  const hh = delta ? max2 === r2 ? (g - b) / delta : max2 === g ? 2 + (b - r2) / delta : 4 + (r2 - g) / delta : 0;
  return {
    h: round2(60 * (hh < 0 ? hh + 6 : hh), 3),
    s: round2(max2 ? delta / max2 * 100 : 0, 3),
    v: round2(max2 / 255 * 100, 3),
    a
  };
}
function parseHex(color) {
  const hex = color[0] === "#" ? color.slice(1) : color;
  if (hex.length === 3) {
    return rgbaToHsva({
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
      a: 1
    });
  }
  return rgbaToHsva({
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    a: 1
  });
}
function parseHexa(color) {
  const hex = color[0] === "#" ? color.slice(1) : color;
  const roundA = (a2) => round2(parseInt(a2, 16) / 255, 3);
  if (hex.length === 4) {
    const withoutOpacity2 = hex.slice(0, 3);
    const a2 = roundA(hex[3] + hex[3]);
    const hsvaColor2 = { ...parseHex(withoutOpacity2), a: a2 };
    return hsvaColor2;
  }
  const withoutOpacity = hex.slice(0, 6);
  const a = roundA(hex.slice(6, 8));
  const hsvaColor = { ...parseHex(withoutOpacity), a };
  return hsvaColor;
}
var RGB_REGEXP = /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
function parseRgba(color) {
  const match = RGB_REGEXP.exec(color);
  if (!match) {
    return { h: 0, s: 0, v: 0, a: 1 };
  }
  return rgbaToHsva({
    r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
    g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
    b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
    a: match[7] === void 0 ? 1 : Number(match[7]) / (match[8] ? 100 : 1)
  });
}
var VALIDATION_REGEXP = {
  hex: /^#?([0-9A-F]{3}){1,2}$/i,
  hexa: /^#?([0-9A-F]{4}){1,2}$/i,
  rgb: /^rgb\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
  rgba: /^rgba\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
  hsl: /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/i,
  hsla: /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/i
};
var CONVERTERS = {
  hex: parseHex,
  hexa: parseHexa,
  rgb: parseRgba,
  rgba: parseRgba,
  hsl: parseHsla,
  hsla: parseHsla
};
function isColorValid(color) {
  for (const [, regexp] of Object.entries(VALIDATION_REGEXP)) {
    if (regexp.test(color)) {
      return true;
    }
  }
  return false;
}
function parseColor(color) {
  if (typeof color !== "string") {
    return { h: 0, s: 0, v: 0, a: 1 };
  }
  if (color === "transparent") {
    return { h: 0, s: 0, v: 0, a: 0 };
  }
  const trimmed = color.trim();
  for (const [rule, regexp] of Object.entries(VALIDATION_REGEXP)) {
    if (regexp.test(trimmed)) {
      return CONVERTERS[rule](trimmed);
    }
  }
  return { h: 0, s: 0, v: 0, a: 1 };
}

// node_modules/@mantine/core/esm/components/ColorPicker/AlphaSlider/AlphaSlider.mjs
var defaultProps73 = {};
var AlphaSlider = (0, import_react191.forwardRef)((props, ref) => {
  const { value, onChange, onChangeEnd, color, ...others } = useProps(
    "AlphaSlider",
    defaultProps73,
    props
  );
  return import_react191.default.createElement(
    ColorSlider,
    {
      ...others,
      ref,
      value,
      onChange: (val) => onChange == null ? void 0 : onChange(round2(val, 2)),
      onChangeEnd: (val) => onChangeEnd == null ? void 0 : onChangeEnd(round2(val, 2)),
      maxValue: 1,
      round: false,
      "data-alpha": true,
      overlays: [
        {
          backgroundImage: "linear-gradient(45deg, var(--_slider-checkers) 25%, transparent 25%), linear-gradient(-45deg, var(--_slider-checkers) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--_slider-checkers) 75%), linear-gradient(-45deg, var(--mantine-color-body) 75%, var(--_slider-checkers) 75%)",
          backgroundSize: `${rem(8)} ${rem(8)}`,
          backgroundPosition: `0 0, 0 ${rem(4)}, ${rem(4)} -${rem(4)}, -${rem(4)} 0`
        },
        {
          backgroundImage: `linear-gradient(90deg, transparent, ${color})`
        },
        {
          boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${rem(
            4
          )} inset`
        }
      ]
    }
  );
});
AlphaSlider.displayName = "@mantine/core/AlphaSlider";

// node_modules/@mantine/core/esm/components/ColorPicker/HueSlider/HueSlider.mjs
var import_react192 = __toESM(require_react(), 1);
var HueSlider = (0, import_react192.forwardRef)((props, ref) => {
  const { value, onChange, onChangeEnd, color, ...others } = useProps("HueSlider", {}, props);
  return import_react192.default.createElement(
    ColorSlider,
    {
      ...others,
      ref,
      value,
      onChange,
      onChangeEnd,
      maxValue: 360,
      thumbColor: `hsl(${value}, 100%, 50%)`,
      round: true,
      "data-hue": true,
      overlays: [
        {
          backgroundImage: "linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(170,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))"
        },
        {
          boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${rem(
            4
          )} inset`
        }
      ]
    }
  );
});
HueSlider.displayName = "@mantine/core/HueSlider";

// node_modules/@mantine/core/esm/components/ColorPicker/Saturation/Saturation.mjs
var import_react193 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ColorPicker/converters/converters.mjs
function hsvaToRgbaObject({ h, s, v, a }) {
  const _h = h / 360 * 6;
  const _s = s / 100;
  const _v = v / 100;
  const hh = Math.floor(_h);
  const l = _v * (1 - _s);
  const c = _v * (1 - (_h - hh) * _s);
  const d = _v * (1 - (1 - _h + hh) * _s);
  const module = hh % 6;
  return {
    r: round2([_v, c, l, l, d, _v][module] * 255),
    g: round2([d, _v, _v, c, l, l][module] * 255),
    b: round2([l, l, d, _v, _v, c][module] * 255),
    a: round2(a, 2)
  };
}
function hsvaToRgba(color, includeAlpha) {
  const { r: r2, g, b, a } = hsvaToRgbaObject(color);
  if (!includeAlpha) {
    return `rgb(${r2}, ${g}, ${b})`;
  }
  return `rgba(${r2}, ${g}, ${b}, ${round2(a, 2)})`;
}
function hsvaToHsl({ h, s, v, a }, includeAlpha) {
  const hh = (200 - s) * v / 100;
  const result = {
    h: Math.round(h),
    s: Math.round(hh > 0 && hh < 200 ? s * v / 100 / (hh <= 100 ? hh : 200 - hh) * 100 : 0),
    l: Math.round(hh / 2)
  };
  if (!includeAlpha) {
    return `hsl(${result.h}, ${result.s}%, ${result.l}%)`;
  }
  return `hsla(${result.h}, ${result.s}%, ${result.l}%, ${round2(a, 2)})`;
}
function formatHexPart(number) {
  const hex = number.toString(16);
  return hex.length < 2 ? `0${hex}` : hex;
}
function hsvaToHex(color) {
  const { r: r2, g, b } = hsvaToRgbaObject(color);
  return `#${formatHexPart(r2)}${formatHexPart(g)}${formatHexPart(b)}`;
}
function hsvaToHexa(color) {
  const a = Math.round(color.a * 255);
  return `${hsvaToHex(color)}${formatHexPart(a)}`;
}
var CONVERTERS2 = {
  hex: hsvaToHex,
  hexa: (color) => hsvaToHexa(color),
  rgb: (color) => hsvaToRgba(color, false),
  rgba: (color) => hsvaToRgba(color, true),
  hsl: (color) => hsvaToHsl(color, false),
  hsla: (color) => hsvaToHsl(color, true)
};
function convertHsvaTo(format2, color) {
  if (!color) {
    return "#000000";
  }
  if (!(format2 in CONVERTERS2)) {
    return CONVERTERS2.hex(color);
  }
  return CONVERTERS2[format2](color);
}

// node_modules/@mantine/core/esm/components/ColorPicker/Saturation/Saturation.mjs
function Saturation({
  className,
  onChange,
  onChangeEnd,
  value,
  saturationLabel,
  focusable = true,
  size: size2,
  color,
  onScrubStart,
  onScrubEnd,
  ...others
}) {
  const { getStyles: getStyles2 } = useColorPickerContext();
  const [position, setPosition] = (0, import_react193.useState)({ x: value.s / 100, y: 1 - value.v / 100 });
  const positionRef = (0, import_react193.useRef)(position);
  const { ref } = useMove(
    ({ x, y }) => {
      positionRef.current = { x, y };
      onChange({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
    },
    {
      onScrubEnd: () => {
        const { x, y } = positionRef.current;
        onChangeEnd({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
        onScrubEnd == null ? void 0 : onScrubEnd();
      },
      onScrubStart
    }
  );
  (0, import_react193.useEffect)(() => {
    setPosition({ x: value.s / 100, y: 1 - value.v / 100 });
  }, [value.s, value.v]);
  const handleArrow = (event, pos) => {
    event.preventDefault();
    const _position = clampUseMovePosition(pos);
    onChange({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) });
    onChangeEnd({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) });
  };
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp": {
        handleArrow(event, { y: position.y - 0.05, x: position.x });
        break;
      }
      case "ArrowDown": {
        handleArrow(event, { y: position.y + 0.05, x: position.x });
        break;
      }
      case "ArrowRight": {
        handleArrow(event, { x: position.x + 0.05, y: position.y });
        break;
      }
      case "ArrowLeft": {
        handleArrow(event, { x: position.x - 0.05, y: position.y });
        break;
      }
    }
  };
  return import_react193.default.createElement(
    Box,
    {
      ...getStyles2("saturation"),
      ref,
      ...others,
      role: "slider",
      "aria-label": saturationLabel,
      "aria-valuenow": position.x,
      "aria-valuetext": convertHsvaTo("rgba", value),
      tabIndex: focusable ? 0 : -1,
      onKeyDown: handleKeyDown
    },
    import_react193.default.createElement(
      "div",
      {
        ...getStyles2("saturationOverlay", {
          style: { backgroundColor: `hsl(${value.h}, 100%, 50%)` }
        })
      }
    ),
    import_react193.default.createElement(
      "div",
      {
        ...getStyles2("saturationOverlay", {
          style: { backgroundImage: "linear-gradient(90deg, #fff, transparent)" }
        })
      }
    ),
    import_react193.default.createElement(
      "div",
      {
        ...getStyles2("saturationOverlay", {
          style: { backgroundImage: "linear-gradient(0deg, #000, transparent)" }
        })
      }
    ),
    import_react193.default.createElement(Thumb2, { position, ...getStyles2("thumb", { style: { backgroundColor: color } }) })
  );
}
Saturation.displayName = "@mantine/core/Saturation";

// node_modules/@mantine/core/esm/components/ColorPicker/Swatches/Swatches.mjs
var import_react195 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ColorSwatch/ColorSwatch.mjs
var import_react194 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ColorSwatch/ColorSwatch.module.css.mjs
var classes36 = { "root": "m-de3d2490", "colorOverlay": "m-862f3d1b", "shadowOverlay": "m-98ae7f22", "alphaOverlay": "m-95709ac0", "childrenOverlay": "m-93e74e3" };

// node_modules/@mantine/core/esm/components/ColorSwatch/ColorSwatch.mjs
var defaultProps74 = {
  withShadow: true
};
var varsResolver37 = createVarsResolver((_, { radius, size: size2 }) => ({
  root: {
    "--cs-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--cs-size": rem(size2)
  }
}));
var ColorSwatch = polymorphicFactory((_props, ref) => {
  const props = useProps("ColorSwatch", defaultProps74, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    size: size2,
    radius,
    withShadow,
    children,
    variant,
    ...others
  } = useProps("ColorSwatch", defaultProps74, props);
  const getStyles2 = useStyles({
    name: "ColorSwatch",
    props,
    classes: classes36,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver37
  });
  return import_react194.default.createElement(
    Box,
    {
      ref,
      variant,
      size: size2,
      ...getStyles2("root", { focusable: true }),
      ...others
    },
    import_react194.default.createElement("span", { ...getStyles2("alphaOverlay") }),
    withShadow && import_react194.default.createElement("span", { ...getStyles2("shadowOverlay") }),
    import_react194.default.createElement("span", { ...getStyles2("colorOverlay", { style: { backgroundColor: color } }) }),
    import_react194.default.createElement("span", { ...getStyles2("childrenOverlay") }, children)
  );
});
ColorSwatch.classes = classes36;
ColorSwatch.displayName = "@mantine/core/ColorSwatch";

// node_modules/@mantine/core/esm/components/ColorPicker/Swatches/Swatches.mjs
var Swatches = (0, import_react195.forwardRef)(
  ({
    className,
    datatype,
    setValue,
    onChangeEnd,
    size: size2,
    focusable,
    data,
    swatchesPerRow,
    ...others
  }, ref) => {
    const ctx = useColorPickerContext();
    const colors = data.map((color, index5) => import_react195.default.createElement(
      ColorSwatch,
      {
        ...ctx.getStyles("swatch"),
        unstyled: ctx.unstyled,
        component: "button",
        type: "button",
        color,
        key: index5,
        radius: "sm",
        onClick: () => {
          setValue(color);
          onChangeEnd == null ? void 0 : onChangeEnd(color);
        },
        "aria-label": color,
        tabIndex: focusable ? 0 : -1,
        "data-swatch": true
      }
    ));
    return import_react195.default.createElement(Box, { ...ctx.getStyles("swatches"), ref, ...others }, colors);
  }
);
Swatches.displayName = "@mantine/core/Swatches";

// node_modules/@mantine/core/esm/components/ColorPicker/ColorPicker.mjs
var defaultProps75 = {
  swatchesPerRow: 7,
  withPicker: true,
  focusable: true,
  size: "md",
  __staticSelector: "ColorPicker"
};
var varsResolver38 = createVarsResolver((_, { size: size2, swatchesPerRow }) => ({
  wrapper: {
    "--cp-preview-size": getSize(size2, "cp-preview-size"),
    "--cp-width": getSize(size2, "cp-width"),
    "--cp-body-spacing": getSpacing(size2),
    "--cp-swatch-size": `${100 / swatchesPerRow}%`,
    "--cp-thumb-size": getSize(size2, "cp-thumb-size"),
    "--cp-saturation-height": getSize(size2, "cp-saturation-height")
  }
}));
var ColorPicker = factory((_props, ref) => {
  const props = useProps("ColorPicker", defaultProps75, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    format: format2,
    value,
    defaultValue,
    onChange,
    onChangeEnd,
    withPicker,
    size: size2,
    saturationLabel,
    hueLabel,
    alphaLabel,
    focusable,
    swatches,
    swatchesPerRow,
    fullWidth,
    onColorSwatchClick,
    __staticSelector,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: __staticSelector,
    props,
    classes: classes35,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "wrapper",
    vars,
    varsResolver: varsResolver38
  });
  const formatRef = (0, import_react196.useRef)(format2);
  const valueRef = (0, import_react196.useRef)();
  const scrubTimeoutRef = (0, import_react196.useRef)(-1);
  const isScrubbingRef = (0, import_react196.useRef)(false);
  const withAlpha = format2 === "hexa" || format2 === "rgba" || format2 === "hsla";
  const [_value, setValue, controlled] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "#FFFFFF",
    onChange
  });
  const [parsed, setParsed] = (0, import_react196.useState)(parseColor(_value));
  const startScrubbing = () => {
    window.clearTimeout(scrubTimeoutRef.current);
    isScrubbingRef.current = true;
  };
  const stopScrubbing = () => {
    window.clearTimeout(scrubTimeoutRef.current);
    scrubTimeoutRef.current = window.setTimeout(() => {
      isScrubbingRef.current = false;
    }, 200);
  };
  const handleChange = (color) => {
    setParsed((current) => {
      const next = { ...current, ...color };
      valueRef.current = convertHsvaTo(formatRef.current, next);
      return next;
    });
    setValue(valueRef.current);
  };
  useDidUpdate(() => {
    if (isColorValid(value) && !isScrubbingRef.current) {
      setParsed(parseColor(value));
    }
  }, [value]);
  useDidUpdate(() => {
    formatRef.current = format2;
    setValue(convertHsvaTo(format2, parsed));
  }, [format2]);
  return import_react196.default.createElement(ColorPickerProvider, { value: { getStyles: getStyles2, unstyled } }, import_react196.default.createElement(
    Box,
    {
      ref,
      ...getStyles2("wrapper"),
      size: size2,
      mod: { "full-width": fullWidth },
      ...others
    },
    withPicker && import_react196.default.createElement(import_react196.default.Fragment, null, import_react196.default.createElement(
      Saturation,
      {
        value: parsed,
        onChange: handleChange,
        onChangeEnd: ({ s, v }) => onChangeEnd == null ? void 0 : onChangeEnd(convertHsvaTo(formatRef.current, { ...parsed, s, v })),
        color: _value,
        size: size2,
        focusable,
        saturationLabel,
        onScrubStart: startScrubbing,
        onScrubEnd: stopScrubbing
      }
    ), import_react196.default.createElement("div", { ...getStyles2("body") }, import_react196.default.createElement("div", { ...getStyles2("sliders") }, import_react196.default.createElement(
      HueSlider,
      {
        value: parsed.h,
        onChange: (h) => handleChange({ h }),
        onChangeEnd: (h) => onChangeEnd == null ? void 0 : onChangeEnd(convertHsvaTo(formatRef.current, { ...parsed, h })),
        size: size2,
        focusable,
        "aria-label": hueLabel,
        onScrubStart: startScrubbing,
        onScrubEnd: stopScrubbing
      }
    ), withAlpha && import_react196.default.createElement(
      AlphaSlider,
      {
        value: parsed.a,
        onChange: (a) => handleChange({ a }),
        onChangeEnd: (a) => {
          onChangeEnd == null ? void 0 : onChangeEnd(convertHsvaTo(formatRef.current, { ...parsed, a }));
        },
        size: size2,
        color: convertHsvaTo("hex", parsed),
        focusable,
        "aria-label": alphaLabel,
        onScrubStart: startScrubbing,
        onScrubEnd: stopScrubbing
      }
    )), withAlpha && import_react196.default.createElement(
      ColorSwatch,
      {
        color: _value,
        radius: "sm",
        size: "var(--cp-preview-size)",
        ...getStyles2("preview")
      }
    ))),
    Array.isArray(swatches) && import_react196.default.createElement(
      Swatches,
      {
        data: swatches,
        swatchesPerRow,
        focusable,
        setValue,
        onChangeEnd: (color) => {
          const convertedColor = convertHsvaTo(format2, parseColor(color));
          onColorSwatchClick == null ? void 0 : onColorSwatchClick(convertedColor);
          onChangeEnd == null ? void 0 : onChangeEnd(convertedColor);
          if (!controlled) {
            setParsed(parseColor(color));
          }
        }
      }
    )
  ));
});
ColorPicker.classes = classes35;
ColorPicker.displayName = "@mantine/core/ColorPicker";

// node_modules/@mantine/core/esm/components/ColorInput/ColorInput.mjs
var import_react198 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ColorInput/EyeDropperIcon.mjs
var import_react197 = __toESM(require_react(), 1);
function EyeDropperIcon({ style, ...others }) {
  return import_react197.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        width: "var(--ci-eye-dropper-icon-size)",
        height: "var(--ci-eye-dropper-icon-size)",
        ...style
      },
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...others
    },
    import_react197.default.createElement("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
    import_react197.default.createElement("path", { d: "M11 7l6 6" }),
    import_react197.default.createElement("path", { d: "M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" })
  );
}

// node_modules/@mantine/core/esm/components/ColorInput/ColorInput.module.css.mjs
var classes37 = { "eyeDropperIcon": "m-b077c2bc", "colorPreview": "m-c5ccdcab", "dropdown": "m-5ece2cd7" };

// node_modules/@mantine/core/esm/components/ColorInput/ColorInput.mjs
var defaultProps76 = {
  format: "hex",
  fixOnBlur: true,
  withPreview: true,
  swatchesPerRow: 7,
  withPicker: true,
  popoverProps: { transitionProps: { transition: "fade", duration: 0 } },
  withEyeDropper: true
};
var varsResolver39 = createVarsResolver((_, { size: size2 }) => ({
  eyeDropperIcon: {
    "--ci-eye-dropper-icon-size": getSize(size2, "ci-eye-dropper-icon-size")
  },
  colorPreview: {
    "--ci-preview-size": getSize(size2, "ci-preview-size")
  }
}));
var ColorInput = factory((_props, ref) => {
  const props = useProps("ColorInput", defaultProps76, _props);
  const {
    classNames,
    styles,
    unstyled,
    disallowInput,
    fixOnBlur,
    popoverProps,
    withPreview,
    withEyeDropper,
    eyeDropperIcon,
    closeOnColorSwatchClick,
    eyeDropperButtonProps,
    value,
    defaultValue,
    onChange,
    onChangeEnd,
    onClick,
    onFocus,
    onBlur,
    inputProps,
    format: format2,
    wrapperProps,
    readOnly,
    withPicker,
    swatches,
    disabled,
    leftSection,
    rightSection,
    swatchesPerRow,
    ...others
  } = useInputProps("ColorInput", defaultProps76, _props);
  const getStyles2 = useStyles({
    name: "ColorInput",
    props,
    classes: classes37,
    classNames,
    styles,
    unstyled,
    rootSelector: "wrapper",
    vars: props.vars,
    varsResolver: varsResolver39
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const [dropdownOpened, setDropdownOpened] = (0, import_react198.useState)(false);
  const [lastValidValue, setLastValidValue] = (0, import_react198.useState)("");
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const { supported: eyeDropperSupported, open: openEyeDropper } = useEyeDropper();
  const eyeDropper = import_react198.default.createElement(
    ActionIcon,
    {
      ...eyeDropperButtonProps,
      ...getStyles2("eyeDropperButton", {
        className: eyeDropperButtonProps == null ? void 0 : eyeDropperButtonProps.className,
        style: eyeDropperButtonProps == null ? void 0 : eyeDropperButtonProps.style
      }),
      variant: "subtle",
      color: "gray",
      size: inputProps.size,
      unstyled,
      onClick: () => openEyeDropper().then((payload) => {
        if (payload == null ? void 0 : payload.sRGBHex) {
          const color = convertHsvaTo(format2, parseColor(payload.sRGBHex));
          setValue(color);
          onChangeEnd == null ? void 0 : onChangeEnd(color);
        }
      }).catch(() => {
      })
    },
    eyeDropperIcon || import_react198.default.createElement(EyeDropperIcon, { ...getStyles2("eyeDropperIcon") })
  );
  const handleInputFocus = (event) => {
    onFocus == null ? void 0 : onFocus(event);
    setDropdownOpened(true);
  };
  const handleInputBlur = (event) => {
    fixOnBlur && setValue(lastValidValue);
    onBlur == null ? void 0 : onBlur(event);
    setDropdownOpened(false);
  };
  const handleInputClick = (event) => {
    onClick == null ? void 0 : onClick(event);
    setDropdownOpened(true);
  };
  (0, import_react198.useEffect)(() => {
    if (isColorValid(_value) || _value.trim() === "") {
      setLastValidValue(_value);
    }
  }, [_value]);
  useDidUpdate(() => {
    if (isColorValid(_value)) {
      setValue(convertHsvaTo(format2, parseColor(_value)));
    }
  }, [format2]);
  return import_react198.default.createElement(
    Input.Wrapper,
    {
      ...wrapperProps,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      __staticSelector: "ColorInput"
    },
    import_react198.default.createElement(
      Popover,
      {
        __staticSelector: "ColorInput",
        position: "bottom-start",
        offset: 5,
        ...popoverProps,
        opened: dropdownOpened,
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        withRoles: false,
        disabled: readOnly || withPicker === false && (!Array.isArray(swatches) || swatches.length === 0)
      },
      import_react198.default.createElement(Popover.Target, null, import_react198.default.createElement(
        Input,
        {
          autoComplete: "off",
          ...others,
          ...inputProps,
          classNames: resolvedClassNames,
          styles: resolvedStyles,
          disabled,
          ref,
          __staticSelector: "ColorInput",
          onFocus: handleInputFocus,
          onBlur: handleInputBlur,
          onClick: handleInputClick,
          spellCheck: false,
          value: _value,
          onChange: (event) => {
            const inputValue = event.currentTarget.value;
            setValue(inputValue);
            if (isColorValid(inputValue)) {
              onChangeEnd == null ? void 0 : onChangeEnd(convertHsvaTo(format2, parseColor(inputValue)));
            }
          },
          leftSection: leftSection || (withPreview ? import_react198.default.createElement(
            ColorSwatch,
            {
              color: isColorValid(_value) ? _value : "#fff",
              size: "var(--ci-preview-size)",
              ...getStyles2("colorPreview")
            }
          ) : null),
          readOnly: disallowInput || readOnly,
          pointer: disallowInput,
          unstyled,
          rightSection: rightSection || (withEyeDropper && !disabled && !readOnly && eyeDropperSupported ? eyeDropper : null)
        }
      )),
      import_react198.default.createElement(
        Popover.Dropdown,
        {
          onMouseDown: (event) => event.preventDefault(),
          className: classes37.dropdown
        },
        import_react198.default.createElement(
          ColorPicker,
          {
            __staticSelector: "ColorInput",
            value: _value,
            onChange: setValue,
            onChangeEnd,
            format: format2,
            swatches,
            swatchesPerRow,
            withPicker,
            size: inputProps.size,
            focusable: false,
            unstyled,
            styles: resolvedStyles,
            classNames: resolvedClassNames,
            onColorSwatchClick: () => closeOnColorSwatchClick && setDropdownOpened(false)
          }
        )
      )
    )
  );
});
ColorInput.classes = InputBase.classes;
ColorInput.displayName = "@mantine/core/ColorInput";

// node_modules/@mantine/core/esm/components/Combobox/use-combobox/use-virtualized-combobox.mjs
var import_react199 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Combobox/use-combobox/get-index/get-virtualized-index.mjs
function getPreviousIndex3({
  currentIndex,
  isOptionDisabled,
  totalOptionsCount,
  loop
}) {
  for (let i = currentIndex - 1; i >= 0; i -= 1) {
    if (!isOptionDisabled(i)) {
      return i;
    }
  }
  if (loop) {
    for (let i = totalOptionsCount - 1; i > -1; i -= 1) {
      if (!isOptionDisabled(i)) {
        return i;
      }
    }
  }
  return currentIndex;
}
function getNextIndex3({
  currentIndex,
  isOptionDisabled,
  totalOptionsCount,
  loop
}) {
  for (let i = currentIndex + 1; i < totalOptionsCount; i += 1) {
    if (!isOptionDisabled(i)) {
      return i;
    }
  }
  if (loop) {
    for (let i = 0; i < totalOptionsCount; i += 1) {
      if (!isOptionDisabled(i)) {
        return i;
      }
    }
  }
  return currentIndex;
}
function getFirstIndex2({ totalOptionsCount, isOptionDisabled }) {
  for (let i = 0; i < totalOptionsCount; i += 1) {
    if (!isOptionDisabled(i)) {
      return i;
    }
  }
  return -1;
}

// node_modules/@mantine/core/esm/components/Combobox/use-combobox/use-virtualized-combobox.mjs
function useVirtualizedCombobox({
  defaultOpened,
  opened,
  onOpenedChange,
  onDropdownClose,
  onDropdownOpen,
  loop = true,
  totalOptionsCount,
  isOptionDisabled = () => false,
  getOptionId,
  selectedOptionIndex,
  setSelectedOptionIndex,
  activeOptionIndex,
  onSelectedOptionSubmit
} = {
  totalOptionsCount: 0,
  getOptionId: () => null,
  selectedOptionIndex: 1,
  setSelectedOptionIndex: () => {
  },
  onSelectedOptionSubmit: () => {
  }
}) {
  const [dropdownOpened, setDropdownOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange: onOpenedChange
  });
  const listId = (0, import_react199.useRef)(null);
  const searchRef = (0, import_react199.useRef)(null);
  const targetRef = (0, import_react199.useRef)(null);
  const focusSearchTimeout = (0, import_react199.useRef)(-1);
  const focusTargetTimeout = (0, import_react199.useRef)(-1);
  const openDropdown = () => {
    if (!dropdownOpened) {
      setDropdownOpened(true);
      onDropdownOpen == null ? void 0 : onDropdownOpen();
    }
  };
  const closeDropdown = () => {
    if (dropdownOpened) {
      setDropdownOpened(false);
      onDropdownClose == null ? void 0 : onDropdownClose();
    }
  };
  const toggleDropdown = () => {
    if (dropdownOpened) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };
  const selectOption = (index5) => {
    const nextIndex = index5 >= totalOptionsCount ? 0 : index5 < 0 ? totalOptionsCount - 1 : index5;
    setSelectedOptionIndex(nextIndex);
    return getOptionId(nextIndex);
  };
  const selectActiveOption = () => selectOption(activeOptionIndex ?? 0);
  const selectNextOption = () => selectOption(
    getNextIndex3({ currentIndex: selectedOptionIndex, isOptionDisabled, totalOptionsCount, loop })
  );
  const selectPreviousOption = () => selectOption(
    getPreviousIndex3({
      currentIndex: selectedOptionIndex,
      isOptionDisabled,
      totalOptionsCount,
      loop
    })
  );
  const selectFirstOption = () => selectOption(getFirstIndex2({ isOptionDisabled, totalOptionsCount }));
  const resetSelectedOption = () => {
    setSelectedOptionIndex(-1);
  };
  const clickSelectedOption = () => {
    onSelectedOptionSubmit == null ? void 0 : onSelectedOptionSubmit(selectedOptionIndex);
  };
  const setListId = (id) => {
    listId.current = id;
  };
  const focusSearchInput = () => {
    focusSearchTimeout.current = window.setTimeout(() => searchRef.current.focus(), 0);
  };
  const focusTarget = () => {
    focusTargetTimeout.current = window.setTimeout(() => targetRef.current.focus(), 0);
  };
  (0, import_react199.useEffect)(
    () => () => {
      window.clearTimeout(focusSearchTimeout.current);
      window.clearTimeout(focusTargetTimeout.current);
    },
    []
  );
  return {
    dropdownOpened,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    selectedOptionIndex,
    selectOption,
    selectFirstOption,
    selectActiveOption,
    selectNextOption,
    selectPreviousOption,
    resetSelectedOption,
    updateSelectedOptionIndex: () => {
    },
    listId: listId.current,
    setListId,
    clickSelectedOption,
    searchRef,
    focusSearchInput,
    targetRef,
    focusTarget
  };
}

// node_modules/@mantine/core/esm/components/Container/Container.mjs
var import_react200 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Container/Container.module.css.mjs
var classes38 = { "root": "m-7485cace" };

// node_modules/@mantine/core/esm/components/Container/Container.mjs
var defaultProps77 = {};
var varsResolver40 = createVarsResolver((_, { size: size2, fluid }) => ({
  root: {
    "--container-size": fluid ? void 0 : getSize(size2, "container-size")
  }
}));
var Container = factory((_props, ref) => {
  const props = useProps("Container", defaultProps77, _props);
  const { classNames, className, style, styles, unstyled, vars, fluid, ...others } = props;
  const getStyles2 = useStyles({
    name: "Container",
    classes: classes38,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver40
  });
  return import_react200.default.createElement(Box, { ref, mod: { fluid }, ...getStyles2("root"), ...others });
});
Container.classes = classes38;
Container.displayName = "@mantine/core/Container";

// node_modules/@mantine/core/esm/components/CopyButton/CopyButton.mjs
var import_react201 = __toESM(require_react(), 1);
var defaultProps78 = {
  timeout: 1e3
};
function CopyButton(props) {
  const { children, timeout, value, ...others } = useProps("CopyButton", defaultProps78, props);
  const clipboard = useClipboard({ timeout });
  const copy = () => clipboard.copy(value);
  return import_react201.default.createElement(import_react201.default.Fragment, null, children({ copy, copied: clipboard.copied, ...others }));
}
CopyButton.displayName = "@mantine/core/CopyButton";

// node_modules/@mantine/core/esm/components/Dialog/Dialog.mjs
var import_react202 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Dialog/Dialog.module.css.mjs
var classes39 = { "root": "m-e2125a27", "closeButton": "m-5abab665" };

// node_modules/@mantine/core/esm/components/Dialog/Dialog.mjs
var defaultProps79 = {
  shadow: "md",
  p: "md",
  withBorder: false,
  transitionProps: { transition: "pop-top-right", duration: 200 },
  position: {
    bottom: 30,
    right: 30
  }
};
var varsResolver41 = createVarsResolver((_, { size: size2 }) => ({
  root: {
    "--dialog-size": getSize(size2, "dialog-size")
  }
}));
var Dialog = factory((_props, ref) => {
  const props = useProps("Dialog", defaultProps79, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    zIndex,
    position,
    keepMounted,
    opened,
    transitionProps,
    withCloseButton,
    withinPortal,
    children,
    onClose,
    portalProps,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Dialog",
    classes: classes39,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver41
  });
  return import_react202.default.createElement(
    Affix,
    {
      zIndex,
      position,
      ref,
      withinPortal,
      portalProps,
      unstyled
    },
    import_react202.default.createElement(Transition, { keepMounted, mounted: opened, ...transitionProps }, (transitionStyles) => import_react202.default.createElement(
      Paper,
      {
        unstyled,
        ...getStyles2("root", { style: transitionStyles }),
        ...others
      },
      withCloseButton && import_react202.default.createElement(CloseButton, { onClick: onClose, unstyled, ...getStyles2("closeButton") }),
      children
    ))
  );
});
Dialog.classes = classes39;
Dialog.displayName = "@mantine/core/Dialog";

// node_modules/@mantine/core/esm/components/Divider/Divider.mjs
var import_react203 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Divider/Divider.module.css.mjs
var classes40 = { "root": "m-3eebeb36", "label": "m-9e365f20" };

// node_modules/@mantine/core/esm/components/Divider/Divider.mjs
var defaultProps80 = {
  orientation: "horizontal"
};
var varsResolver42 = createVarsResolver((theme, { color, variant, size: size2 }) => ({
  root: {
    "--divider-color": color ? getThemeColor(color, theme) : void 0,
    "--divider-border-style": variant,
    "--divider-size": getSize(size2, "divider-size")
  }
}));
var Divider = factory((_props, ref) => {
  const props = useProps("Divider", defaultProps80, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    orientation,
    label,
    labelPosition,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Divider",
    classes: classes40,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver42
  });
  return import_react203.default.createElement(
    Box,
    {
      ref,
      mod: { orientation, "with-label": !!label },
      ...getStyles2("root"),
      ...others,
      role: "separator"
    },
    label && import_react203.default.createElement(Box, { component: "span", mod: { position: labelPosition }, ...getStyles2("label") }, label)
  );
});
Divider.classes = classes40;
Divider.displayName = "@mantine/core/Divider";

// node_modules/@mantine/core/esm/components/Drawer/Drawer.mjs
var import_react212 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Drawer/DrawerRoot.mjs
var import_react205 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Drawer/Drawer.context.mjs
var import_react204 = __toESM(require_react(), 1);
var [DrawerProvider, useDrawerContext] = createSafeContext(
  "Drawer component was not found in tree"
);

// node_modules/@mantine/core/esm/components/Drawer/Drawer.module.css.mjs
var classes41 = { "root": "m-f11b401e", "header": "m-5a7c2c9", "content": "m-b8a05bbd", "inner": "m-31cd769a" };

// node_modules/@mantine/core/esm/components/Drawer/DrawerRoot.mjs
function getDrawerAlign(position) {
  switch (position) {
    case "top":
      return "flex-start";
    case "bottom":
      return "flex-end";
    default:
      return void 0;
  }
}
function getDrawerFlex(position) {
  if (position === "top" || position === "bottom") {
    return "0 0 calc(100% - var(--drawer-offset, 0rem) * 2)";
  }
  return void 0;
}
var transitions2 = {
  top: "slide-down",
  bottom: "slide-up",
  left: "slide-right",
  right: "slide-left"
};
var rtlTransitions = {
  top: "slide-down",
  bottom: "slide-up",
  right: "slide-right",
  left: "slide-left"
};
var defaultProps81 = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex("modal"),
  position: "left"
};
var varsResolver43 = createVarsResolver((_, { position, size: size2, offset: offset2 }) => ({
  root: {
    "--drawer-size": getSize(size2, "drawer-size"),
    "--drawer-flex": getDrawerFlex(position),
    "--drawer-height": position === "left" || position === "right" ? void 0 : "var(--drawer-size)",
    "--drawer-align": getDrawerAlign(position),
    "--drawer-justify": position === "right" ? "flex-end" : void 0,
    "--drawer-offset": rem(offset2)
  }
}));
var DrawerRoot = factory((_props, ref) => {
  const props = useProps("DrawerRoot", defaultProps81, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    scrollAreaComponent,
    position,
    transitionProps,
    radius,
    ...others
  } = props;
  const { dir } = useDirection();
  const getStyles2 = useStyles({
    name: "Drawer",
    classes: classes41,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver43
  });
  const drawerTransition = (dir === "rtl" ? rtlTransitions : transitions2)[position];
  return import_react205.default.createElement(DrawerProvider, { value: { scrollAreaComponent, getStyles: getStyles2, radius } }, import_react205.default.createElement(
    ModalBase,
    {
      ref,
      ...getStyles2("root"),
      transitionProps: { transition: drawerTransition, ...transitionProps },
      unstyled,
      ...others
    }
  ));
});
DrawerRoot.classes = classes41;
DrawerRoot.displayName = "@mantine/core/DrawerRoot";

// node_modules/@mantine/core/esm/components/Drawer/DrawerBody.mjs
var import_react206 = __toESM(require_react(), 1);
var defaultProps82 = {};
var DrawerBody = factory((_props, ref) => {
  const props = useProps("DrawerBody", defaultProps82, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return import_react206.default.createElement(
    ModalBaseBody,
    {
      ref,
      ...ctx.getStyles("body", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerBody.classes = classes41;
DrawerBody.displayName = "@mantine/core/DrawerBody";

// node_modules/@mantine/core/esm/components/Drawer/DrawerCloseButton.mjs
var import_react207 = __toESM(require_react(), 1);
var defaultProps83 = {};
var DrawerCloseButton = factory((_props, ref) => {
  const props = useProps("DrawerCloseButton", defaultProps83, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return import_react207.default.createElement(
    ModalBaseCloseButton,
    {
      ref,
      ...ctx.getStyles("close", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerCloseButton.classes = classes41;
DrawerCloseButton.displayName = "@mantine/core/DrawerCloseButton";

// node_modules/@mantine/core/esm/components/Drawer/DrawerOverlay.mjs
var import_react208 = __toESM(require_react(), 1);
var defaultProps84 = {};
var DrawerOverlay = factory((_props, ref) => {
  const props = useProps("DrawerOverlay", defaultProps84, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return import_react208.default.createElement(
    ModalBaseOverlay,
    {
      ref,
      ...ctx.getStyles("overlay", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerOverlay.classes = classes41;
DrawerOverlay.displayName = "@mantine/core/DrawerOverlay";

// node_modules/@mantine/core/esm/components/Drawer/DrawerContent.mjs
var import_react209 = __toESM(require_react(), 1);
var defaultProps85 = {};
var DrawerContent = factory((_props, ref) => {
  const props = useProps("DrawerContent", defaultProps85, _props);
  const { classNames, className, style, styles, vars, children, radius, ...others } = props;
  const ctx = useDrawerContext();
  const Scroll = ctx.scrollAreaComponent || NativeScrollArea;
  return import_react209.default.createElement(
    ModalBaseContent,
    {
      ...ctx.getStyles("content", { className, style, styles, classNames }),
      innerProps: ctx.getStyles("inner", { className, style, styles, classNames }),
      ref,
      ...others,
      radius: radius || ctx.radius || 0
    },
    import_react209.default.createElement(Scroll, { style: { height: "100vh" } }, children)
  );
});
DrawerContent.classes = classes41;
DrawerContent.displayName = "@mantine/core/DrawerContent";

// node_modules/@mantine/core/esm/components/Drawer/DrawerTitle.mjs
var import_react210 = __toESM(require_react(), 1);
var defaultProps86 = {};
var DrawerTitle = factory((_props, ref) => {
  const props = useProps("DrawerTitle", defaultProps86, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return import_react210.default.createElement(
    ModalBaseTitle,
    {
      ref,
      ...ctx.getStyles("title", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerTitle.classes = classes41;
DrawerTitle.displayName = "@mantine/core/DrawerTitle";

// node_modules/@mantine/core/esm/components/Drawer/DrawerHeader.mjs
var import_react211 = __toESM(require_react(), 1);
var defaultProps87 = {};
var DrawerHeader = factory((_props, ref) => {
  const props = useProps("DrawerHeader", defaultProps87, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return import_react211.default.createElement(
    ModalBaseHeader,
    {
      ref,
      ...ctx.getStyles("header", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerHeader.classes = classes41;
DrawerHeader.displayName = "@mantine/core/DrawerHeader";

// node_modules/@mantine/core/esm/components/Drawer/Drawer.mjs
var defaultProps88 = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex("modal"),
  withOverlay: true,
  withCloseButton: true
};
var Drawer = factory((_props, ref) => {
  const {
    title,
    withOverlay,
    overlayProps,
    withCloseButton,
    closeButtonProps,
    children,
    ...others
  } = useProps("Drawer", defaultProps88, _props);
  const hasHeader = !!title || withCloseButton;
  return import_react212.default.createElement(DrawerRoot, { ref, ...others }, withOverlay && import_react212.default.createElement(DrawerOverlay, { ...overlayProps }), import_react212.default.createElement(DrawerContent, null, hasHeader && import_react212.default.createElement(DrawerHeader, null, title && import_react212.default.createElement(DrawerTitle, null, title), withCloseButton && import_react212.default.createElement(DrawerCloseButton, { ...closeButtonProps })), import_react212.default.createElement(DrawerBody, null, children)));
});
Drawer.classes = classes41;
Drawer.displayName = "@mantine/core/Drawer";
Drawer.Root = DrawerRoot;
Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Body = DrawerBody;
Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.CloseButton = DrawerCloseButton;

// node_modules/@mantine/core/esm/components/Fieldset/Fieldset.mjs
var import_react213 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Fieldset/Fieldset.module.css.mjs
var classes42 = { "root": "m-e9408a47", "root--default": "m-84c9523a", "root--filled": "m-ef274e49", "root--unstyled": "m-eda993d3", "legend": "m-90794832", "legend--unstyled": "m-74ca27fe" };

// node_modules/@mantine/core/esm/components/Fieldset/Fieldset.mjs
var defaultProps89 = {
  variant: "default"
};
var varsResolver44 = createVarsResolver((_, { radius }) => ({
  root: {
    "--fieldset-radius": radius === void 0 ? void 0 : getRadius(radius)
  }
}));
var Fieldset = factory((_props, ref) => {
  const props = useProps("Fieldset", defaultProps89, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    legend,
    variant,
    children,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Fieldset",
    classes: classes42,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver44
  });
  return import_react213.default.createElement(
    Box,
    {
      component: "fieldset",
      ref,
      variant,
      ...getStyles2("root", { variant }),
      ...others
    },
    legend && import_react213.default.createElement("legend", { ...getStyles2("legend", { variant }) }, legend),
    children
  );
});
Fieldset.classes = classes42;
Fieldset.displayName = "@mantine/core/Fieldset";

// node_modules/@mantine/core/esm/components/FileButton/FileButton.mjs
var import_react214 = __toESM(require_react(), 1);
var defaultProps90 = {
  multiple: false
};
var FileButton = (0, import_react214.forwardRef)(
  (props, ref) => {
    const {
      onChange,
      children,
      multiple,
      accept,
      name,
      form,
      resetRef,
      disabled,
      capture,
      inputProps,
      ...others
    } = useProps("FileButton", defaultProps90, props);
    const inputRef = (0, import_react214.useRef)();
    const onClick = () => {
      var _a;
      !disabled && ((_a = inputRef.current) == null ? void 0 : _a.click());
    };
    const handleChange = (event) => {
      if (multiple) {
        onChange(Array.from(event.currentTarget.files));
      } else {
        onChange(event.currentTarget.files[0] || null);
      }
    };
    const reset = () => {
      inputRef.current.value = "";
    };
    assignRef(resetRef, reset);
    return import_react214.default.createElement(import_react214.default.Fragment, null, children({ onClick, ...others }), import_react214.default.createElement(
      "input",
      {
        style: { display: "none" },
        type: "file",
        accept,
        multiple,
        onChange: handleChange,
        ref: useMergedRef(ref, inputRef),
        name,
        form,
        capture,
        ...inputProps
      }
    ));
  }
);
FileButton.displayName = "@mantine/core/FileButton";

// node_modules/@mantine/core/esm/components/FileInput/FileInput.mjs
var import_react215 = __toESM(require_react(), 1);
var DefaultValue = ({ value }) => import_react215.default.createElement("div", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, Array.isArray(value) ? value.map((file) => file.name).join(", ") : value == null ? void 0 : value.name);
var defaultProps91 = {
  valueComponent: DefaultValue
};
var _FileInput = factory((_props, ref) => {
  const props = useProps("FileInput", defaultProps91, _props);
  const {
    unstyled,
    vars,
    onChange,
    value,
    defaultValue,
    multiple,
    accept,
    name,
    form,
    valueComponent,
    clearable,
    clearButtonProps,
    readOnly,
    capture,
    fileInputProps,
    rightSection,
    size: size2,
    placeholder,
    ...others
  } = props;
  const resetRef = (0, import_react215.useRef)(null);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    onChange,
    finalValue: multiple ? [] : null
  });
  const hasValue = Array.isArray(_value) ? _value.length !== 0 : _value !== null;
  const _rightSection = rightSection || (clearable && hasValue && !readOnly ? import_react215.default.createElement(
    CloseButton,
    {
      ...clearButtonProps,
      variant: "subtle",
      onClick: () => setValue(multiple ? [] : null),
      size: size2,
      unstyled
    }
  ) : null);
  (0, import_react215.useEffect)(() => {
    var _a;
    if (Array.isArray(_value) && _value.length === 0 || _value === null) {
      (_a = resetRef.current) == null ? void 0 : _a.call(resetRef);
    }
  }, [_value]);
  const ValueComponent = valueComponent;
  return import_react215.default.createElement(
    FileButton,
    {
      onChange: setValue,
      multiple,
      accept,
      name,
      form,
      resetRef,
      disabled: readOnly,
      capture,
      inputProps: fileInputProps
    },
    (fileButtonProps) => import_react215.default.createElement(
      InputBase,
      {
        component: "button",
        ref,
        rightSection: _rightSection,
        ...fileButtonProps,
        ...others,
        __staticSelector: "FileInput",
        multiline: true,
        type: "button",
        pointer: true,
        __stylesApiProps: props,
        unstyled,
        size: size2
      },
      !hasValue ? import_react215.default.createElement(Input.Placeholder, null, placeholder) : import_react215.default.createElement(ValueComponent, { value: _value })
    )
  );
});
_FileInput.classes = InputBase.classes;
_FileInput.displayName = "@mantine/core/FileInput";
var FileInput = _FileInput;

// node_modules/@mantine/core/esm/components/Floating/use-delayed-hover.mjs
var import_react216 = __toESM(require_react(), 1);
function useDelayedHover({ open, close, openDelay, closeDelay }) {
  const openTimeout = (0, import_react216.useRef)(-1);
  const closeTimeout = (0, import_react216.useRef)(-1);
  const clearTimeouts = () => {
    window.clearTimeout(openTimeout.current);
    window.clearTimeout(closeTimeout.current);
  };
  const openDropdown = () => {
    clearTimeouts();
    if (openDelay === 0 || openDelay === void 0) {
      open();
    } else {
      openTimeout.current = window.setTimeout(open, openDelay);
    }
  };
  const closeDropdown = () => {
    clearTimeouts();
    if (closeDelay === 0 || closeDelay === void 0) {
      close();
    } else {
      closeTimeout.current = window.setTimeout(close, closeDelay);
    }
  };
  (0, import_react216.useEffect)(() => clearTimeouts, []);
  return { openDropdown, closeDropdown };
}

// node_modules/@mantine/core/esm/components/Grid/Grid.mjs
var import_react221 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Grid/GridCol/GridCol.mjs
var import_react219 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Grid/Grid.context.mjs
var import_react217 = __toESM(require_react(), 1);
var [GridProvider, useGridContext] = createSafeContext(
  "Grid component was not found in tree"
);

// node_modules/@mantine/core/esm/components/Grid/GridCol/GridColVariables.mjs
var import_react218 = __toESM(require_react(), 1);
var getColumnFlexBasis = (colSpan, columns) => {
  if (colSpan === "content") {
    return "auto";
  }
  if (colSpan === "auto") {
    return "0rem";
  }
  return colSpan ? `${100 / (columns / colSpan)}%` : void 0;
};
var getColumnMaxWidth = (colSpan, columns, grow) => {
  if (grow || colSpan === "auto" || colSpan === "content") {
    return "unset";
  }
  return getColumnFlexBasis(colSpan, columns);
};
var getColumnFlexGrow = (colSpan, grow) => {
  if (!colSpan) {
    return void 0;
  }
  return colSpan === "auto" || grow ? "1" : void 0;
};
var getColumnOffset = (offset2, columns) => offset2 === 0 ? "0" : offset2 ? `${100 / (columns / offset2)}%` : void 0;
function GridColVariables({ span, order, offset: offset2, selector }) {
  var _a;
  const theme = useMantineTheme();
  const ctx = useGridContext();
  const baseValue = getBaseValue(span);
  const baseSpan = baseValue === void 0 ? 12 : getBaseValue(span);
  const baseStyles = filterProps({
    "--col-order": (_a = getBaseValue(order)) == null ? void 0 : _a.toString(),
    "--col-flex-grow": getColumnFlexGrow(baseSpan, ctx.grow),
    "--col-flex-basis": getColumnFlexBasis(baseSpan, ctx.columns),
    "--col-width": baseSpan === "content" ? "auto" : void 0,
    "--col-max-width": getColumnMaxWidth(baseSpan, ctx.columns, ctx.grow),
    "--col-offset": getColumnOffset(getBaseValue(offset2), ctx.columns)
  });
  const queries = keys(theme.breakpoints).reduce(
    (acc, breakpoint) => {
      var _a2;
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }
      if (typeof order === "object" && order[breakpoint] !== void 0) {
        acc[breakpoint]["--col-order"] = (_a2 = order[breakpoint]) == null ? void 0 : _a2.toString();
      }
      if (typeof span === "object" && span[breakpoint] !== void 0) {
        acc[breakpoint]["--col-flex-grow"] = getColumnFlexGrow(span[breakpoint], ctx.grow);
        acc[breakpoint]["--col-flex-basis"] = getColumnFlexBasis(span[breakpoint], ctx.columns);
        acc[breakpoint]["--col-width"] = span[breakpoint] === "content" ? "auto" : void 0;
        acc[breakpoint]["--col-max-width"] = getColumnMaxWidth(
          span[breakpoint],
          ctx.columns,
          ctx.grow
        );
      }
      if (typeof offset2 === "object" && offset2[breakpoint] !== void 0) {
        acc[breakpoint]["--col-offset"] = getColumnOffset(offset2[breakpoint], ctx.columns);
      }
      return acc;
    },
    {}
  );
  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );
  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value]})`,
    styles: queries[breakpoint.value]
  }));
  return import_react218.default.createElement(InlineStyles, { styles: baseStyles, media, selector });
}

// node_modules/@mantine/core/esm/components/Grid/Grid.module.css.mjs
var classes43 = { "root": "m-410352e9", "inner": "m-dee7bd2f", "col": "m-96bdd299" };

// node_modules/@mantine/core/esm/components/Grid/GridCol/GridCol.mjs
var defaultProps92 = {
  span: 12
};
var GridCol = factory((_props, ref) => {
  const props = useProps("GridCol", defaultProps92, _props);
  const { classNames, className, style, styles, vars, span, order, offset: offset2, ...others } = props;
  const ctx = useGridContext();
  const responsiveClassName = useRandomClassName();
  return import_react219.default.createElement(import_react219.default.Fragment, null, import_react219.default.createElement(
    GridColVariables,
    {
      selector: `.${responsiveClassName}`,
      span,
      order,
      offset: offset2
    }
  ), import_react219.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("col", {
        className: clsx_default(className, responsiveClassName),
        style,
        classNames,
        styles
      }),
      ...others
    }
  ));
});
GridCol.classes = classes43;
GridCol.displayName = "@mantine/core/GridCol";

// node_modules/@mantine/core/esm/components/Grid/GridVariables.mjs
var import_react220 = __toESM(require_react(), 1);
function GridVariables({ gutter, selector }) {
  const theme = useMantineTheme();
  const baseStyles = filterProps({
    "--grid-gutter": getSpacing(getBaseValue(gutter))
  });
  const queries = keys(theme.breakpoints).reduce(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }
      if (typeof gutter === "object" && gutter[breakpoint] !== void 0) {
        acc[breakpoint]["--grid-gutter"] = getSpacing(gutter[breakpoint]);
      }
      return acc;
    },
    {}
  );
  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );
  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value]})`,
    styles: queries[breakpoint.value]
  }));
  return import_react220.default.createElement(InlineStyles, { styles: baseStyles, media, selector });
}

// node_modules/@mantine/core/esm/components/Grid/Grid.mjs
var defaultProps93 = {
  gutter: "md",
  grow: false,
  columns: 12
};
var varsResolver45 = createVarsResolver((_, { justify, align, overflow }) => ({
  root: {
    "--grid-justify": justify,
    "--grid-align": align,
    "--grid-overflow": overflow
  }
}));
var Grid = factory((_props, ref) => {
  const props = useProps("Grid", defaultProps93, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    grow,
    gutter,
    columns,
    align,
    justify,
    children,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Grid",
    classes: classes43,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver45
  });
  const responsiveClassName = useRandomClassName();
  return import_react221.default.createElement(GridProvider, { value: { getStyles: getStyles2, grow, columns } }, import_react221.default.createElement(GridVariables, { selector: `.${responsiveClassName}`, ...props }), import_react221.default.createElement(Box, { ref, ...getStyles2("root", { className: responsiveClassName }), ...others }, import_react221.default.createElement("div", { ...getStyles2("inner") }, children)));
});
Grid.classes = classes43;
Grid.displayName = "@mantine/core/Grid";
Grid.Col = GridCol;

// node_modules/@mantine/core/esm/components/Highlight/Highlight.mjs
var import_react224 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Mark/Mark.mjs
var import_react223 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Mark/get-mark-color.mjs
var import_react222 = __toESM(require_react(), 1);
function getMarkColor({ color, theme, defaultShade }) {
  const parsed = parseThemeColor({ color, theme });
  if (!parsed.isThemeColor) {
    return color;
  }
  if (parsed.shade === void 0) {
    return `var(--mantine-color-${parsed.color}-${defaultShade})`;
  }
  return `var(${parsed.variable})`;
}

// node_modules/@mantine/core/esm/components/Mark/Mark.module.css.mjs
var classes44 = { "root": "m-bcb3f3c2" };

// node_modules/@mantine/core/esm/components/Mark/Mark.mjs
var defaultProps94 = {
  color: "yellow"
};
var varsResolver46 = createVarsResolver((theme, { color }) => ({
  root: {
    "--mark-bg-dark": getMarkColor({ color, theme, defaultShade: 5 }),
    "--mark-bg-light": getMarkColor({ color, theme, defaultShade: 2 })
  }
}));
var Mark = factory((_props, ref) => {
  const props = useProps("Mark", defaultProps94, _props);
  const { classNames, className, style, styles, unstyled, vars, color, variant, ...others } = props;
  const getStyles2 = useStyles({
    name: "Mark",
    props,
    className,
    style,
    classes: classes44,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver46
  });
  return import_react223.default.createElement(Box, { component: "mark", ref, variant, ...getStyles2("root"), ...others });
});
Mark.classes = classes44;
Mark.displayName = "@mantine/core/Mark";

// node_modules/@mantine/core/esm/components/Highlight/highlighter/highlighter.mjs
function escapeRegex(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
}
function highlighter(value, _highlight) {
  if (_highlight == null) {
    return [{ chunk: value, highlighted: false }];
  }
  const highlight = Array.isArray(_highlight) ? _highlight.map(escapeRegex) : escapeRegex(_highlight);
  const shouldHighlight = Array.isArray(highlight) ? highlight.filter((part) => part.trim().length > 0).length > 0 : highlight.trim() !== "";
  if (!shouldHighlight) {
    return [{ chunk: value, highlighted: false }];
  }
  const matcher = typeof highlight === "string" ? highlight.trim() : highlight.filter((part) => part.trim().length !== 0).map((part) => part.trim()).sort((a, b) => b.length - a.length).join("|");
  const re = new RegExp(`(${matcher})`, "gi");
  const chunks = value.split(re).map((part) => ({ chunk: part, highlighted: re.test(part) })).filter(({ chunk }) => chunk);
  return chunks;
}

// node_modules/@mantine/core/esm/components/Highlight/Highlight.mjs
var defaultProps95 = {};
var Highlight = polymorphicFactory((props, ref) => {
  const { unstyled, children, highlight, highlightStyles, color, ...others } = useProps(
    "Highlight",
    defaultProps95,
    props
  );
  const highlightChunks = highlighter(children, highlight);
  return import_react224.default.createElement(Text, { unstyled, ref, ...others, __staticSelector: "Highlight" }, highlightChunks.map(
    ({ chunk, highlighted }, i) => highlighted ? import_react224.default.createElement(
      Mark,
      {
        unstyled,
        key: i,
        color,
        style: highlightStyles,
        "data-highlight": chunk
      },
      chunk
    ) : import_react224.default.createElement("span", { key: i }, chunk)
  ));
});
Highlight.classes = Text.classes;
Highlight.displayName = "@mantine/core/Highlight";

// node_modules/@mantine/core/esm/components/HoverCard/HoverCard.mjs
var import_react228 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/HoverCard/HoverCard.context.mjs
var import_react225 = __toESM(require_react(), 1);
var [HoverCardContextProvider, useHoverCardContext] = createSafeContext(
  "HoverCard component was not found in the tree"
);

// node_modules/@mantine/core/esm/components/HoverCard/HoverCardDropdown/HoverCardDropdown.mjs
var import_react226 = __toESM(require_react(), 1);
var defaultProps96 = {};
function HoverCardDropdown(props) {
  const { children, onMouseEnter, onMouseLeave, ...others } = useProps(
    "HoverCardDropdown",
    defaultProps96,
    props
  );
  const ctx = useHoverCardContext();
  const handleMouseEnter = createEventHandler(onMouseEnter, ctx.openDropdown);
  const handleMouseLeave = createEventHandler(onMouseLeave, ctx.closeDropdown);
  return import_react226.default.createElement(Popover.Dropdown, { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, ...others }, children);
}
HoverCardDropdown.displayName = "@mantine/core/HoverCardDropdown";

// node_modules/@mantine/core/esm/components/HoverCard/HoverCardTarget/HoverCardTarget.mjs
var import_react227 = __toESM(require_react(), 1);
var defaultProps97 = {
  refProp: "ref"
};
var HoverCardTarget = (0, import_react227.forwardRef)((props, ref) => {
  const { children, refProp, eventPropsWrapperName, ...others } = useProps(
    "HoverCardTarget",
    defaultProps97,
    props
  );
  if (!isElement(children)) {
    throw new Error(
      "HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const ctx = useHoverCardContext();
  const onMouseEnter = createEventHandler(children.props.onMouseEnter, ctx.openDropdown);
  const onMouseLeave = createEventHandler(children.props.onMouseLeave, ctx.closeDropdown);
  const eventListeners = { onMouseEnter, onMouseLeave };
  return import_react227.default.createElement(Popover.Target, { refProp, ref, ...others }, (0, import_react227.cloneElement)(
    children,
    eventPropsWrapperName ? { [eventPropsWrapperName]: eventListeners } : eventListeners
  ));
});
HoverCardTarget.displayName = "@mantine/core/HoverCardTarget";

// node_modules/@mantine/core/esm/components/HoverCard/HoverCard.mjs
var defaultProps98 = {
  openDelay: 0,
  closeDelay: 150,
  initiallyOpened: false
};
function HoverCard(props) {
  const { children, onOpen, onClose, openDelay, closeDelay, initiallyOpened, ...others } = useProps(
    "HoverCard",
    defaultProps98,
    props
  );
  const [opened, { open, close }] = useDisclosure(initiallyOpened, { onClose, onOpen });
  const { openDropdown, closeDropdown } = useDelayedHover({ open, close, openDelay, closeDelay });
  return import_react228.default.createElement(HoverCardContextProvider, { value: { openDropdown, closeDropdown } }, import_react228.default.createElement(Popover, { ...others, opened, __staticSelector: "HoverCard" }, children));
}
HoverCard.displayName = "@mantine/core/HoverCard";
HoverCard.Target = HoverCardTarget;
HoverCard.Dropdown = HoverCardDropdown;
HoverCard.extend = (input) => input;

// node_modules/@mantine/core/esm/components/Image/Image.mjs
var import_react230 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Image/Image.module.css.mjs
var classes45 = { "root": "m-9e117634" };

// node_modules/@mantine/core/esm/components/Image/Image.mjs
var defaultProps99 = {};
var varsResolver47 = createVarsResolver((_, { radius, fit }) => ({
  root: {
    "--image-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--image-object-fit": fit
  }
}));
var Image = polymorphicFactory((_props, ref) => {
  const props = useProps("Image", defaultProps99, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    onError,
    src,
    radius,
    fit,
    fallbackSrc,
    ...others
  } = props;
  const [error, setError] = (0, import_react230.useState)(!src);
  (0, import_react230.useEffect)(() => setError(!src), [src]);
  const getStyles2 = useStyles({
    name: "Image",
    classes: classes45,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver47
  });
  if (error && fallbackSrc) {
    return import_react230.default.createElement(
      Box,
      {
        component: "img",
        src: fallbackSrc,
        ...getStyles2("root"),
        onError,
        mod: "fallback",
        ...others
      }
    );
  }
  return import_react230.default.createElement(
    Box,
    {
      component: "img",
      ref,
      ...getStyles2("root"),
      src,
      onError: (event) => {
        onError == null ? void 0 : onError(event);
        setError(true);
      },
      ...others
    }
  );
});
Image.classes = classes45;
Image.displayName = "@mantine/core/Image";

// node_modules/@mantine/core/esm/components/Indicator/Indicator.mjs
var import_react232 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Indicator/get-position-variables/get-position-variables.mjs
var import_react231 = __toESM(require_react(), 1);
function getPositionVariables(_position = "top-end", offset2 = 0) {
  const variables = {
    "--indicator-top": void 0,
    "--indicator-bottom": void 0,
    "--indicator-left": void 0,
    "--indicator-right": void 0,
    "--indicator-translate-x": void 0,
    "--indicator-translate-y": void 0
  };
  const _offset = rem(offset2);
  const [position, placement] = _position.split("-");
  if (position === "top") {
    variables["--indicator-top"] = _offset;
    variables["--indicator-translate-y"] = "-50%";
  }
  if (position === "middle") {
    variables["--indicator-top"] = "50%";
    variables["--indicator-translate-y"] = "-50%";
  }
  if (position === "bottom") {
    variables["--indicator-bottom"] = _offset;
    variables["--indicator-translate-y"] = "50%";
  }
  if (placement === "start") {
    variables["--indicator-left"] = _offset;
    variables["--indicator-translate-x"] = "-50%";
  }
  if (placement === "center") {
    variables["--indicator-left"] = "50%";
    variables["--indicator-translate-x"] = "-50%";
  }
  if (placement === "end") {
    variables["--indicator-right"] = _offset;
    variables["--indicator-translate-x"] = "50%";
  }
  return variables;
}

// node_modules/@mantine/core/esm/components/Indicator/Indicator.module.css.mjs
var classes46 = { "root": "m-e5262200", "indicator": "m-760d1fb1", "processing": "m-885901b1" };

// node_modules/@mantine/core/esm/components/Indicator/Indicator.mjs
var defaultProps100 = {
  position: "top-end",
  offset: 0,
  inline: false,
  withBorder: false,
  disabled: false,
  processing: false
};
var varsResolver48 = createVarsResolver(
  (theme, { color, position, offset: offset2, size: size2, radius, zIndex }) => ({
    root: {
      "--indicator-color": color ? getThemeColor(color, theme) : void 0,
      "--indicator-size": rem(size2),
      "--indicator-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--indicator-z-index": zIndex == null ? void 0 : zIndex.toString(),
      ...getPositionVariables(position, offset2)
    }
  })
);
var Indicator = factory((_props, ref) => {
  const props = useProps("Indicator", defaultProps100, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    position,
    offset: offset2,
    inline: inline2,
    label,
    radius,
    color,
    withBorder,
    disabled,
    processing,
    zIndex,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Indicator",
    classes: classes46,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver48
  });
  return import_react232.default.createElement(Box, { ref, ...getStyles2("root"), mod: { inline: inline2 }, ...others }, !disabled && import_react232.default.createElement(import_react232.default.Fragment, null, import_react232.default.createElement(
    Box,
    {
      mod: { "with-label": !!label, "with-border": withBorder, processing },
      ...getStyles2("indicator")
    },
    label
  )), children);
});
Indicator.classes = classes46;
Indicator.displayName = "@mantine/core/Indicator";

// node_modules/@mantine/core/esm/components/JsonInput/JsonInput.mjs
var import_react236 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Textarea/Textarea.mjs
var import_react235 = __toESM(require_react(), 1);

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}

// node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.development.esm.js
var React162 = __toESM(require_react());

// node_modules/use-latest/dist/use-latest.esm.js
var React161 = __toESM(require_react());

// node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js
var import_react233 = __toESM(require_react());
var index3 = import_react233.useLayoutEffect;
var use_isomorphic_layout_effect_browser_esm_default = index3;

// node_modules/use-latest/dist/use-latest.esm.js
var useLatest = function useLatest2(value) {
  var ref = React161.useRef(value);
  use_isomorphic_layout_effect_browser_esm_default(function() {
    ref.current = value;
  });
  return ref;
};

// node_modules/use-composed-ref/dist/use-composed-ref.esm.js
var import_react234 = __toESM(require_react());
var updateRef = function updateRef2(ref, value) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  ref.current = value;
};
var useComposedRef = function useComposedRef2(libRef, userRef) {
  var prevUserRef = (0, import_react234.useRef)();
  return (0, import_react234.useCallback)(function(instance) {
    libRef.current = instance;
    if (prevUserRef.current) {
      updateRef(prevUserRef.current, null);
    }
    prevUserRef.current = userRef;
    if (!userRef) {
      return;
    }
    updateRef(userRef, instance);
  }, [userRef]);
};
var use_composed_ref_esm_default = useComposedRef;

// node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.development.esm.js
var HIDDEN_TEXTAREA_STYLE = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
var forceHiddenStyles = function forceHiddenStyles2(node) {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function(key) {
    node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], "important");
  });
};
var forceHiddenStyles$1 = forceHiddenStyles;
var hiddenTextarea = null;
var getHeight = function getHeight2(node, sizingData) {
  var height = node.scrollHeight;
  if (sizingData.sizingStyle.boxSizing === "border-box") {
    return height + sizingData.borderSize;
  }
  return height - sizingData.paddingSize;
};
function calculateNodeHeight(sizingData, value, minRows, maxRows) {
  if (minRows === void 0) {
    minRows = 1;
  }
  if (maxRows === void 0) {
    maxRows = Infinity;
  }
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tabindex", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    forceHiddenStyles$1(hiddenTextarea);
  }
  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }
  var paddingSize = sizingData.paddingSize, borderSize = sizingData.borderSize, sizingStyle = sizingData.sizingStyle;
  var boxSizing = sizingStyle.boxSizing;
  Object.keys(sizingStyle).forEach(function(_key) {
    var key = _key;
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  forceHiddenStyles$1(hiddenTextarea);
  hiddenTextarea.value = value;
  var height = getHeight(hiddenTextarea, sizingData);
  hiddenTextarea.value = value;
  height = getHeight(hiddenTextarea, sizingData);
  hiddenTextarea.value = "x";
  var rowHeight = hiddenTextarea.scrollHeight - paddingSize;
  var minHeight = rowHeight * minRows;
  if (boxSizing === "border-box") {
    minHeight = minHeight + paddingSize + borderSize;
  }
  height = Math.max(minHeight, height);
  var maxHeight = rowHeight * maxRows;
  if (boxSizing === "border-box") {
    maxHeight = maxHeight + paddingSize + borderSize;
  }
  height = Math.min(maxHeight, height);
  return [height, rowHeight];
}
var noop2 = function noop3() {
};
var pick = function pick2(props, obj) {
  return props.reduce(function(acc, prop) {
    acc[prop] = obj[prop];
    return acc;
  }, {});
};
var SIZING_STYLE = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  // non-standard
  "tabSize",
  "textIndent",
  // non-standard
  "textRendering",
  "textTransform",
  "width",
  "wordBreak"
];
var isIE = !!document.documentElement.currentStyle;
var getSizingData = function getSizingData2(node) {
  var style = window.getComputedStyle(node);
  if (style === null) {
    return null;
  }
  var sizingStyle = pick(SIZING_STYLE, style);
  var boxSizing = sizingStyle.boxSizing;
  if (boxSizing === "") {
    return null;
  }
  if (isIE && boxSizing === "border-box") {
    sizingStyle.width = parseFloat(sizingStyle.width) + parseFloat(sizingStyle.borderRightWidth) + parseFloat(sizingStyle.borderLeftWidth) + parseFloat(sizingStyle.paddingRight) + parseFloat(sizingStyle.paddingLeft) + "px";
  }
  var paddingSize = parseFloat(sizingStyle.paddingBottom) + parseFloat(sizingStyle.paddingTop);
  var borderSize = parseFloat(sizingStyle.borderBottomWidth) + parseFloat(sizingStyle.borderTopWidth);
  return {
    sizingStyle,
    paddingSize,
    borderSize
  };
};
var getSizingData$1 = getSizingData;
function useListener(target, type, listener) {
  var latestListener = useLatest(listener);
  React162.useLayoutEffect(function() {
    var handler = function handler2(ev) {
      return latestListener.current(ev);
    };
    if (!target) {
      return;
    }
    target.addEventListener(type, handler);
    return function() {
      return target.removeEventListener(type, handler);
    };
  }, []);
}
var useWindowResizeListener = function useWindowResizeListener2(listener) {
  useListener(window, "resize", listener);
};
var useFontsLoadedListener = function useFontsLoadedListener2(listener) {
  useListener(document.fonts, "loadingdone", listener);
};
var _excluded = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"];
var TextareaAutosize = function TextareaAutosize2(_ref, userRef) {
  var cacheMeasurements = _ref.cacheMeasurements, maxRows = _ref.maxRows, minRows = _ref.minRows, _ref$onChange = _ref.onChange, onChange = _ref$onChange === void 0 ? noop2 : _ref$onChange, _ref$onHeightChange = _ref.onHeightChange, onHeightChange = _ref$onHeightChange === void 0 ? noop2 : _ref$onHeightChange, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (props.style) {
    if ("maxHeight" in props.style) {
      throw new Error("Using `style.maxHeight` for <TextareaAutosize/> is not supported. Please use `maxRows`.");
    }
    if ("minHeight" in props.style) {
      throw new Error("Using `style.minHeight` for <TextareaAutosize/> is not supported. Please use `minRows`.");
    }
  }
  var isControlled = props.value !== void 0;
  var libRef = React162.useRef(null);
  var ref = use_composed_ref_esm_default(libRef, userRef);
  var heightRef = React162.useRef(0);
  var measurementsCacheRef = React162.useRef();
  var resizeTextarea = function resizeTextarea2() {
    var node = libRef.current;
    var nodeSizingData = cacheMeasurements && measurementsCacheRef.current ? measurementsCacheRef.current : getSizingData$1(node);
    if (!nodeSizingData) {
      return;
    }
    measurementsCacheRef.current = nodeSizingData;
    var _calculateNodeHeight = calculateNodeHeight(nodeSizingData, node.value || node.placeholder || "x", minRows, maxRows), height = _calculateNodeHeight[0], rowHeight = _calculateNodeHeight[1];
    if (heightRef.current !== height) {
      heightRef.current = height;
      node.style.setProperty("height", height + "px", "important");
      onHeightChange(height, {
        rowHeight
      });
    }
  };
  var handleChange = function handleChange2(event) {
    if (!isControlled) {
      resizeTextarea();
    }
    onChange(event);
  };
  {
    React162.useLayoutEffect(resizeTextarea);
    useWindowResizeListener(resizeTextarea);
    useFontsLoadedListener(resizeTextarea);
    return React162.createElement("textarea", _extends2({}, props, {
      onChange: handleChange,
      ref
    }));
  }
};
var index4 = React162.forwardRef(TextareaAutosize);

// node_modules/@mantine/core/esm/components/Textarea/Textarea.mjs
var defaultProps101 = {};
var Textarea = factory((props, ref) => {
  const { autosize, maxRows, minRows, __staticSelector, ...others } = useProps(
    "Textarea",
    defaultProps101,
    props
  );
  const autosizeProps = autosize ? { maxRows, minRows } : {};
  return import_react235.default.createElement(
    InputBase,
    {
      component: autosize ? index4 : "textarea",
      ref,
      ...others,
      __staticSelector: __staticSelector || "Textarea",
      multiline: true,
      "data-no-overflow": autosize && maxRows === void 0 || void 0,
      ...autosizeProps
    }
  );
});
Textarea.classes = InputBase.classes;
Textarea.displayName = "@mantine/core/Textarea";

// node_modules/@mantine/core/esm/components/JsonInput/validate-json/validate-json.mjs
function validateJson(value, deserialize) {
  if (typeof value === "string" && value.trim().length === 0) {
    return true;
  }
  try {
    deserialize(value);
    return true;
  } catch (e) {
    return false;
  }
}

// node_modules/@mantine/core/esm/components/JsonInput/JsonInput.mjs
var defaultProps102 = {
  serialize: JSON.stringify,
  deserialize: JSON.parse
};
var JsonInput = factory((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    formatOnBlur,
    validationError,
    serialize,
    deserialize,
    onFocus,
    onBlur,
    readOnly,
    error,
    ...others
  } = useProps("JsonInput", defaultProps102, props);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const [valid, setValid] = (0, import_react236.useState)(validateJson(_value, deserialize));
  const handleFocus = (event) => {
    onFocus == null ? void 0 : onFocus(event);
    setValid(true);
  };
  const handleBlur = (event) => {
    typeof onBlur === "function" && onBlur(event);
    const isValid = validateJson(event.currentTarget.value, deserialize);
    formatOnBlur && !readOnly && isValid && event.currentTarget.value.trim() !== "" && setValue(serialize(deserialize(event.currentTarget.value), null, 2));
    setValid(isValid);
  };
  return import_react236.default.createElement(
    Textarea,
    {
      value: _value,
      onChange: (event) => setValue(event.currentTarget.value),
      onFocus: handleFocus,
      onBlur: handleBlur,
      ref,
      readOnly,
      ...others,
      autoComplete: "off",
      __staticSelector: "JsonInput",
      error: valid ? error : validationError || true,
      "data-monospace": true
    }
  );
});
JsonInput.classes = InputBase.classes;
JsonInput.displayName = "@mantine/core/JsonInput";

// node_modules/@mantine/core/esm/components/Kbd/Kbd.mjs
var import_react237 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Kbd/Kbd.module.css.mjs
var classes47 = { "root": "m-dc6f14e2" };

// node_modules/@mantine/core/esm/components/Kbd/Kbd.mjs
var defaultProps103 = {};
var varsResolver49 = createVarsResolver((_, { size: size2 }) => ({
  root: {
    "--kbd-fz": getSize(size2, "kbd-fz"),
    "--kbd-padding": getSize(size2, "kbd-padding")
  }
}));
var Kbd = factory((_props, ref) => {
  const props = useProps("Kbd", defaultProps103, _props);
  const { classNames, className, style, styles, unstyled, vars, ...others } = props;
  const getStyles2 = useStyles({
    name: "Kbd",
    classes: classes47,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver49
  });
  return import_react237.default.createElement(Box, { component: "kbd", ref, ...getStyles2("root"), ...others });
});
Kbd.classes = classes47;
Kbd.displayName = "@mantine/core/Kbd";

// node_modules/@mantine/core/esm/components/List/List.mjs
var import_react240 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/List/ListItem/ListItem.mjs
var import_react239 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/List/List.context.mjs
var import_react238 = __toESM(require_react(), 1);
var [ListProvider, useListContext] = createSafeContext(
  "List component was not found in tree"
);

// node_modules/@mantine/core/esm/components/List/List.module.css.mjs
var classes48 = { "root": "m-abbac491", "item": "m-abb6bec2", "itemWrapper": "m-75cd9f71", "itemIcon": "m-60f83e5b" };

// node_modules/@mantine/core/esm/components/List/ListItem/ListItem.mjs
var defaultProps104 = {};
var ListItem = factory((_props, ref) => {
  const props = useProps("ListItem", defaultProps104, _props);
  const { classNames, className, style, styles, vars, icon, children, ...others } = props;
  const ctx = useListContext();
  const _icon = icon || ctx.icon;
  const stylesApiProps = { classNames, styles };
  return import_react239.default.createElement(
    Box,
    {
      ...ctx.getStyles("item", { ...stylesApiProps, className, style }),
      component: "li",
      mod: { "with-icon": !!_icon, centered: ctx.center },
      ref,
      ...others
    },
    import_react239.default.createElement("div", { ...ctx.getStyles("itemWrapper", stylesApiProps) }, _icon && import_react239.default.createElement("span", { ...ctx.getStyles("itemIcon", stylesApiProps) }, _icon), import_react239.default.createElement("span", { ...ctx.getStyles("itemLabel", stylesApiProps) }, children))
  );
});
ListItem.classes = classes48;
ListItem.displayName = "@mantine/core/ListItem";

// node_modules/@mantine/core/esm/components/List/List.mjs
var defaultProps105 = {
  type: "unordered"
};
var varsResolver50 = createVarsResolver((_, { size: size2, spacing }) => ({
  root: {
    "--list-fz": getFontSize(size2),
    "--list-lh": getLineHeight(size2),
    "--list-spacing": getSpacing(spacing)
  }
}));
var List = factory((_props, ref) => {
  const props = useProps("List", defaultProps105, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    type,
    withPadding,
    icon,
    spacing,
    center,
    listStyleType,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "List",
    classes: classes48,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver50
  });
  return import_react240.default.createElement(ListProvider, { value: { center, icon, getStyles: getStyles2 } }, import_react240.default.createElement(
    Box,
    {
      ...getStyles2("root", { style: { listStyleType } }),
      component: type === "unordered" ? "ul" : "ol",
      mod: { "with-padding": withPadding },
      ref,
      ...others
    },
    children
  ));
});
List.classes = classes48;
List.displayName = "@mantine/core/List";
List.Item = ListItem;

// node_modules/@mantine/core/esm/components/LoadingOverlay/LoadingOverlay.mjs
var import_react241 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/LoadingOverlay/LoadingOverlay.module.css.mjs
var classes49 = { "root": "m-6e45937b", "loader": "m-e8eb006c", "overlay": "m-df587f17" };

// node_modules/@mantine/core/esm/components/LoadingOverlay/LoadingOverlay.mjs
var defaultProps106 = {
  transitionProps: { transition: "fade", duration: 0 },
  overlayProps: { backgroundOpacity: 0.75 },
  zIndex: getDefaultZIndex("overlay")
};
var varsResolver51 = createVarsResolver((_, { zIndex }) => ({
  root: {
    "--lo-z-index": zIndex == null ? void 0 : zIndex.toString()
  }
}));
var LoadingOverlay = factory((_props, ref) => {
  const props = useProps("LoadingOverlay", defaultProps106, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    transitionProps,
    loaderProps,
    overlayProps,
    visible,
    zIndex,
    ...others
  } = props;
  const theme = useMantineTheme();
  const getStyles2 = useStyles({
    name: "LoadingOverlay",
    classes: classes49,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver51
  });
  const _overlayProps = { ...defaultProps106.overlayProps, ...overlayProps };
  return import_react241.default.createElement(Transition, { transition: "fade", ...transitionProps, mounted: !!visible }, (transitionStyles) => import_react241.default.createElement(Box, { ...getStyles2("root", { style: transitionStyles }), ref, ...others }, import_react241.default.createElement(Loader, { ...getStyles2("loader"), unstyled, ...loaderProps }), import_react241.default.createElement(
    Overlay,
    {
      ..._overlayProps,
      ...getStyles2("overlay"),
      "data-light": true,
      unstyled,
      color: (overlayProps == null ? void 0 : overlayProps.color) || theme.white
    }
  ), import_react241.default.createElement(
    Overlay,
    {
      ..._overlayProps,
      ...getStyles2("overlay"),
      "data-dark": true,
      unstyled,
      color: (overlayProps == null ? void 0 : overlayProps.color) || theme.colors.dark[5]
    }
  )));
});
LoadingOverlay.classes = classes49;
LoadingOverlay.displayName = "@mantine/core/LoadingOverlay";

// node_modules/@mantine/core/esm/components/Menu/Menu.mjs
var import_react248 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Menu/MenuDivider/MenuDivider.mjs
var import_react243 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Menu/Menu.module.css.mjs
var classes50 = { "dropdown": "m-dc9b7c9f", "label": "m-9bfac126", "divider": "m-efdf90cb", "item": "m-99ac2aa1", "itemLabel": "m-5476e0d3", "itemSection": "m-8b75e504" };

// node_modules/@mantine/core/esm/components/Menu/Menu.context.mjs
var import_react242 = __toESM(require_react(), 1);
var [MenuContextProvider, useMenuContext] = createSafeContext(
  "Menu component was not found in the tree"
);

// node_modules/@mantine/core/esm/components/Menu/MenuDivider/MenuDivider.mjs
var defaultProps107 = {};
var MenuDivider = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "MenuDivider",
    defaultProps107,
    props
  );
  const ctx = useMenuContext();
  return import_react243.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("divider", { className, style, styles, classNames }),
      ...others
    }
  );
});
MenuDivider.classes = classes50;
MenuDivider.displayName = "@mantine/core/MenuDivider";

// node_modules/@mantine/core/esm/components/Menu/MenuDropdown/MenuDropdown.mjs
var import_react244 = __toESM(require_react(), 1);
var defaultProps108 = {};
var MenuDropdown = factory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    onMouseEnter,
    onMouseLeave,
    children,
    ...others
  } = useProps("MenuDropdown", defaultProps108, props);
  const wrapperRef = (0, import_react244.useRef)(null);
  const ctx = useMenuContext();
  const handleKeyDown = (event) => {
    var _a, _b;
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      (_b = (_a = wrapperRef.current) == null ? void 0 : _a.querySelectorAll("[data-menu-item]:not(:disabled)")[0]) == null ? void 0 : _b.focus();
    }
  };
  const handleMouseEnter = createEventHandler(
    onMouseEnter,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.openDropdown()
  );
  const handleMouseLeave = createEventHandler(
    onMouseLeave,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.closeDropdown()
  );
  return import_react244.default.createElement(
    Popover.Dropdown,
    {
      ...others,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      role: "menu",
      "aria-orientation": "vertical",
      ref,
      ...ctx.getStyles("dropdown", { className, style, styles, classNames })
    },
    import_react244.default.createElement(
      "div",
      {
        tabIndex: -1,
        "data-menu-dropdown": true,
        "data-autofocus": true,
        onKeyDown: handleKeyDown,
        ref: wrapperRef,
        style: { outline: 0 }
      },
      children
    )
  );
});
MenuDropdown.classes = classes50;
MenuDropdown.displayName = "@mantine/core/MenuDropdown";

// node_modules/@mantine/core/esm/components/Menu/MenuItem/MenuItem.mjs
var import_react245 = __toESM(require_react(), 1);
var defaultProps109 = {};
var MenuItem = polymorphicFactory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    color,
    closeMenuOnClick,
    leftSection,
    rightSection,
    children,
    disabled,
    ...others
  } = useProps("MenuItem", defaultProps109, props);
  const ctx = useMenuContext();
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const itemRef = (0, import_react245.useRef)();
  const itemIndex = ctx.getItemIndex(itemRef.current);
  const _others = others;
  const handleMouseLeave = createEventHandler(_others.onMouseLeave, () => ctx.setHovered(-1));
  const handleMouseEnter = createEventHandler(
    _others.onMouseEnter,
    () => ctx.setHovered(ctx.getItemIndex(itemRef.current))
  );
  const handleClick = createEventHandler(_others.onClick, () => {
    if (typeof closeMenuOnClick === "boolean") {
      closeMenuOnClick && ctx.closeDropdownImmediately();
    } else {
      ctx.closeOnItemClick && ctx.closeDropdownImmediately();
    }
  });
  const handleFocus = createEventHandler(
    _others.onFocus,
    () => ctx.setHovered(ctx.getItemIndex(itemRef.current))
  );
  const colors = color ? theme.variantColorResolver({ color, theme, variant: "light" }) : void 0;
  const parsedThemeColor = color ? parseThemeColor({ color, theme }) : null;
  return import_react245.default.createElement(
    UnstyledButton,
    {
      ...others,
      unstyled: ctx.unstyled,
      tabIndex: -1,
      onFocus: handleFocus,
      ...ctx.getStyles("item", { className, style, styles, classNames }),
      ref: useMergedRef(itemRef, ref),
      role: "menuitem",
      disabled,
      "data-menu-item": true,
      "data-disabled": disabled || void 0,
      "data-hovered": ctx.hovered === itemIndex ? true : void 0,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: "[data-menu-item]",
        parentSelector: "[data-menu-dropdown]",
        activateOnFocus: false,
        loop: ctx.loop,
        dir,
        orientation: "vertical",
        onKeyDown: _others.onKeydown
      }),
      __vars: {
        "--menu-item-color": (parsedThemeColor == null ? void 0 : parsedThemeColor.isThemeColor) && (parsedThemeColor == null ? void 0 : parsedThemeColor.shade) === void 0 ? `var(--mantine-color-${parsedThemeColor.color}-6)` : colors == null ? void 0 : colors.color,
        "--menu-item-hover": colors == null ? void 0 : colors.hover
      }
    },
    leftSection && import_react245.default.createElement("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "left" }, leftSection),
    children && import_react245.default.createElement("div", { ...ctx.getStyles("itemLabel", { styles, classNames }) }, children),
    rightSection && import_react245.default.createElement("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "right" }, rightSection)
  );
});
MenuItem.classes = classes50;
MenuItem.displayName = "@mantine/core/MenuItem";

// node_modules/@mantine/core/esm/components/Menu/MenuLabel/MenuLabel.mjs
var import_react246 = __toESM(require_react(), 1);
var defaultProps110 = {};
var MenuLabel = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "MenuLabel",
    defaultProps110,
    props
  );
  const ctx = useMenuContext();
  return import_react246.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("label", { className, style, styles, classNames }),
      ...others
    }
  );
});
MenuLabel.classes = classes50;
MenuLabel.displayName = "@mantine/core/MenuLabel";

// node_modules/@mantine/core/esm/components/Menu/MenuTarget/MenuTarget.mjs
var import_react247 = __toESM(require_react(), 1);
var defaultProps111 = {
  refProp: "ref"
};
var MenuTarget = (0, import_react247.forwardRef)((props, ref) => {
  const { children, refProp, ...others } = useProps("MenuTarget", defaultProps111, props);
  if (!isElement(children)) {
    throw new Error(
      "Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const ctx = useMenuContext();
  const onClick = createEventHandler(
    children.props.onClick,
    () => (ctx.trigger === "click" || ctx.trigger === "click-hover") && ctx.toggleDropdown()
  );
  const onMouseEnter = createEventHandler(
    children.props.onMouseEnter,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.openDropdown()
  );
  const onMouseLeave = createEventHandler(
    children.props.onMouseLeave,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.closeDropdown()
  );
  return import_react247.default.createElement(Popover.Target, { refProp, popupType: "menu", ref, ...others }, (0, import_react247.cloneElement)(children, {
    onClick,
    onMouseEnter,
    onMouseLeave,
    "data-expanded": ctx.opened ? true : void 0
  }));
});
MenuTarget.displayName = "@mantine/core/MenuTarget";

// node_modules/@mantine/core/esm/components/Menu/Menu.mjs
var defaultProps112 = {
  closeOnItemClick: true,
  loop: true,
  trigger: "click",
  openDelay: 0,
  closeDelay: 100
};
function Menu(_props) {
  const props = useProps("Menu", defaultProps112, _props);
  const {
    children,
    onOpen,
    onClose,
    opened,
    defaultOpened,
    onChange,
    closeOnItemClick,
    loop,
    closeOnEscape: closeOnEscape2,
    trigger,
    openDelay,
    closeDelay,
    classNames,
    styles,
    unstyled,
    variant,
    vars,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Menu",
    classes: classes50,
    props,
    classNames,
    styles,
    unstyled
  });
  const [hovered, { setHovered, resetHovered }] = useHovered();
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange
  });
  const close = () => {
    setOpened(false);
    _opened && (onClose == null ? void 0 : onClose());
  };
  const open = () => {
    setOpened(true);
    !_opened && (onOpen == null ? void 0 : onOpen());
  };
  const toggleDropdown = () => {
    _opened ? close() : open();
  };
  const { openDropdown, closeDropdown } = useDelayedHover({ open, close, closeDelay, openDelay });
  const getItemIndex = (node) => getContextItemIndex("[data-menu-item]", "[data-menu-dropdown]", node);
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  useDidUpdate(() => {
    resetHovered();
  }, [_opened]);
  return import_react248.default.createElement(
    MenuContextProvider,
    {
      value: {
        getStyles: getStyles2,
        opened: _opened,
        toggleDropdown,
        getItemIndex,
        hovered,
        setHovered,
        closeOnItemClick,
        closeDropdown: trigger === "click" ? close : closeDropdown,
        openDropdown: trigger === "click" ? open : openDropdown,
        closeDropdownImmediately: close,
        loop,
        trigger,
        unstyled
      }
    },
    import_react248.default.createElement(
      Popover,
      {
        ...others,
        opened: _opened,
        onChange: toggleDropdown,
        defaultOpened,
        trapFocus: true,
        closeOnEscape: closeOnEscape2,
        __staticSelector: "Menu",
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        variant
      },
      children
    )
  );
}
Menu.extend = (input) => input;
Menu.classes = classes50;
Menu.displayName = "@mantine/core/Menu";
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.Dropdown = MenuDropdown;
Menu.Target = MenuTarget;
Menu.Divider = MenuDivider;

// node_modules/@mantine/core/esm/components/Modal/Modal.mjs
var import_react258 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Modal/ModalRoot.mjs
var import_react251 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Modal/Modal.context.mjs
var import_react250 = __toESM(require_react(), 1);
var [ModalProvider, useModalContext] = createSafeContext(
  "Modal component was not found in tree"
);

// node_modules/@mantine/core/esm/components/Modal/Modal.module.css.mjs
var classes51 = { "root": "m-9df02822", "content": "m-54c44539", "inner": "m-1f958f16", "header": "m-d0e2b9cd" };

// node_modules/@mantine/core/esm/components/Modal/ModalRoot.mjs
var defaultProps113 = {
  __staticSelector: "Modal",
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex("modal"),
  transitionProps: { duration: 200, transition: "pop" },
  yOffset: "5dvh"
};
var varsResolver52 = createVarsResolver(
  (_, { radius, size: size2, yOffset, xOffset }) => ({
    root: {
      "--modal-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--modal-size": getSize(size2, "modal-size"),
      "--modal-y-offset": rem(yOffset),
      "--modal-x-offset": rem(xOffset)
    }
  })
);
var ModalRoot = factory((_props, ref) => {
  const props = useProps("ModalRoot", defaultProps113, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    yOffset,
    scrollAreaComponent,
    radius,
    fullScreen,
    centered,
    xOffset,
    __staticSelector,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: __staticSelector,
    classes: classes51,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver52
  });
  return import_react251.default.createElement(ModalProvider, { value: { yOffset, scrollAreaComponent, getStyles: getStyles2 } }, import_react251.default.createElement(
    ModalBase,
    {
      ref,
      ...getStyles2("root"),
      "data-full-screen": fullScreen || void 0,
      "data-centered": centered || void 0,
      unstyled,
      ...others
    }
  ));
});
ModalRoot.classes = classes51;
ModalRoot.displayName = "@mantine/core/ModalRoot";

// node_modules/@mantine/core/esm/components/Modal/ModalBody.mjs
var import_react252 = __toESM(require_react(), 1);
var defaultProps114 = {};
var ModalBody = factory((_props, ref) => {
  const props = useProps("ModalBody", defaultProps114, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return import_react252.default.createElement(
    ModalBaseBody,
    {
      ref,
      ...ctx.getStyles("body", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalBody.classes = classes51;
ModalBody.displayName = "@mantine/core/ModalBody";

// node_modules/@mantine/core/esm/components/Modal/ModalCloseButton.mjs
var import_react253 = __toESM(require_react(), 1);
var defaultProps115 = {};
var ModalCloseButton = factory((_props, ref) => {
  const props = useProps("ModalCloseButton", defaultProps115, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return import_react253.default.createElement(
    ModalBaseCloseButton,
    {
      ref,
      ...ctx.getStyles("close", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalCloseButton.classes = classes51;
ModalCloseButton.displayName = "@mantine/core/ModalCloseButton";

// node_modules/@mantine/core/esm/components/Modal/ModalOverlay.mjs
var import_react254 = __toESM(require_react(), 1);
var defaultProps116 = {};
var ModalOverlay = factory((_props, ref) => {
  const props = useProps("ModalOverlay", defaultProps116, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return import_react254.default.createElement(
    ModalBaseOverlay,
    {
      ref,
      ...ctx.getStyles("overlay", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalOverlay.classes = classes51;
ModalOverlay.displayName = "@mantine/core/ModalOverlay";

// node_modules/@mantine/core/esm/components/Modal/ModalContent.mjs
var import_react255 = __toESM(require_react(), 1);
var defaultProps117 = {};
var ModalContent = factory((_props, ref) => {
  const props = useProps("ModalContent", defaultProps117, _props);
  const { classNames, className, style, styles, vars, children, ...others } = props;
  const ctx = useModalContext();
  const Scroll = ctx.scrollAreaComponent || NativeScrollArea;
  return import_react255.default.createElement(
    ModalBaseContent,
    {
      ...ctx.getStyles("content", { className, style, styles, classNames }),
      innerProps: ctx.getStyles("inner", { className, style, styles, classNames }),
      ref,
      ...others
    },
    import_react255.default.createElement(Scroll, { style: { maxHeight: `calc(100vh - (${rem(ctx.yOffset)} * 2))` } }, children)
  );
});
ModalContent.classes = classes51;
ModalContent.displayName = "@mantine/core/ModalContent";

// node_modules/@mantine/core/esm/components/Modal/ModalTitle.mjs
var import_react256 = __toESM(require_react(), 1);
var defaultProps118 = {};
var ModalTitle = factory((_props, ref) => {
  const props = useProps("ModalTitle", defaultProps118, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return import_react256.default.createElement(
    ModalBaseTitle,
    {
      ref,
      ...ctx.getStyles("title", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalTitle.classes = classes51;
ModalTitle.displayName = "@mantine/core/ModalTitle";

// node_modules/@mantine/core/esm/components/Modal/ModalHeader.mjs
var import_react257 = __toESM(require_react(), 1);
var defaultProps119 = {};
var ModalHeader = factory((_props, ref) => {
  const props = useProps("ModalHeader", defaultProps119, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return import_react257.default.createElement(
    ModalBaseHeader,
    {
      ref,
      ...ctx.getStyles("header", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalHeader.classes = classes51;
ModalHeader.displayName = "@mantine/core/ModalHeader";

// node_modules/@mantine/core/esm/components/Modal/Modal.mjs
var defaultProps120 = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex("modal"),
  transitionProps: { duration: 200, transition: "pop" },
  withOverlay: true,
  withCloseButton: true
};
var Modal = factory((_props, ref) => {
  const {
    title,
    withOverlay,
    overlayProps,
    withCloseButton,
    closeButtonProps,
    children,
    radius,
    ...others
  } = useProps("Modal", defaultProps120, _props);
  const hasHeader = !!title || withCloseButton;
  return import_react258.default.createElement(ModalRoot, { ref, radius, ...others }, withOverlay && import_react258.default.createElement(ModalOverlay, { ...overlayProps }), import_react258.default.createElement(ModalContent, { radius }, hasHeader && import_react258.default.createElement(ModalHeader, null, title && import_react258.default.createElement(ModalTitle, null, title), withCloseButton && import_react258.default.createElement(ModalCloseButton, { ...closeButtonProps })), import_react258.default.createElement(ModalBody, null, children)));
});
Modal.classes = classes51;
Modal.displayName = "@mantine/core/Modal";
Modal.Root = ModalRoot;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.CloseButton = ModalCloseButton;

// node_modules/@mantine/core/esm/components/MultiSelect/MultiSelect.mjs
var import_react266 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/PillsInput/PillsInput.mjs
var import_react261 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/PillsInput/PillsInput.context.mjs
var import_react259 = __toESM(require_react(), 1);
var [PillsInputProvider, usePillsInputContext] = createOptionalContext();

// node_modules/@mantine/core/esm/components/PillsInput/PillsInputField/PillsInputField.mjs
var import_react260 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/PillsInput/PillsInput.module.css.mjs
var classes52 = { "field": "m-45c4369d" };

// node_modules/@mantine/core/esm/components/PillsInput/PillsInputField/PillsInputField.mjs
var defaultProps121 = {
  type: "visible"
};
var PillsInputField = factory((_props, ref) => {
  const props = useProps("PillsInputField", defaultProps121, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    type,
    disabled,
    id,
    pointer,
    ...others
  } = props;
  const ctx = usePillsInputContext();
  const inputWrapperCtx = useInputWrapperContext();
  const getStyles2 = useStyles({
    name: "PillsInputField",
    classes: classes52,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "field"
  });
  const _disabled = disabled || (ctx == null ? void 0 : ctx.disabled);
  return import_react260.default.createElement(
    Box,
    {
      component: "input",
      ref: useMergedRef(ref, ctx == null ? void 0 : ctx.fieldRef),
      "data-type": type,
      disabled: _disabled,
      mod: { disabled: _disabled, pointer },
      ...getStyles2("field"),
      ...others,
      id: (inputWrapperCtx == null ? void 0 : inputWrapperCtx.inputId) || id,
      "aria-invalid": ctx == null ? void 0 : ctx.hasError,
      "aria-describedby": inputWrapperCtx == null ? void 0 : inputWrapperCtx.describedBy
    }
  );
});
PillsInputField.classes = classes52;
PillsInputField.displayName = "@mantine/core/PillsInputField";

// node_modules/@mantine/core/esm/components/PillsInput/PillsInput.mjs
var defaultProps122 = {};
var PillsInput = factory((_props, ref) => {
  const props = useProps("PillsInput", defaultProps122, _props);
  const {
    children,
    onMouseDown,
    onClick,
    size: size2,
    disabled,
    __staticSelector,
    error,
    variant,
    ...others
  } = props;
  const fieldRef = (0, import_react261.useRef)();
  return import_react261.default.createElement(PillsInputProvider, { value: { fieldRef, size: size2, disabled, hasError: !!error, variant } }, import_react261.default.createElement(
    InputBase,
    {
      size: size2,
      error,
      variant,
      component: "div",
      ref,
      onMouseDown: (event) => {
        var _a;
        event.preventDefault();
        onMouseDown == null ? void 0 : onMouseDown(event);
        (_a = fieldRef.current) == null ? void 0 : _a.focus();
      },
      onClick: (event) => {
        var _a;
        event.preventDefault();
        onClick == null ? void 0 : onClick(event);
        (_a = fieldRef.current) == null ? void 0 : _a.focus();
      },
      ...others,
      multiline: true,
      disabled,
      __staticSelector: __staticSelector || "PillsInput",
      withAria: false
    },
    children
  ));
});
PillsInput.displayName = "@mantine/core/PillsInput";
PillsInput.Field = PillsInputField;

// node_modules/@mantine/core/esm/components/Pill/Pill.mjs
var import_react264 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Pill/PillGroup/PillGroup.mjs
var import_react263 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Pill/PillGroup.context.mjs
var import_react262 = __toESM(require_react(), 1);
var [PillGroupProvider, usePillGroupContext] = createOptionalContext();

// node_modules/@mantine/core/esm/components/Pill/Pill.module.css.mjs
var classes53 = { "root": "m-7cda1cd6", "root--default": "m-44da308b", "root--contrast": "m-e3a01f8", "label": "m-1e0e6180", "remove": "m-ae386778", "group": "m-1dcfd90b" };

// node_modules/@mantine/core/esm/components/Pill/PillGroup/PillGroup.mjs
var defaultProps123 = {};
var varsResolver53 = createVarsResolver((_, { gap }, { size: size2 }) => ({
  group: {
    "--pg-gap": gap !== void 0 ? getSize(gap) : getSize(size2, "pg-gap")
  }
}));
var PillGroup = factory((_props, ref) => {
  const props = useProps("PillGroup", defaultProps123, _props);
  const { classNames, className, style, styles, unstyled, vars, size: size2, disabled, ...others } = props;
  const pillsInputCtx = usePillsInputContext();
  const _size = (pillsInputCtx == null ? void 0 : pillsInputCtx.size) || size2 || void 0;
  const getStyles2 = useStyles({
    name: "PillGroup",
    classes: classes53,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver53,
    stylesCtx: { size: _size },
    rootSelector: "group"
  });
  return import_react263.default.createElement(PillGroupProvider, { value: { size: _size, disabled } }, import_react263.default.createElement(Box, { ref, size: _size, ...getStyles2("group"), ...others }));
});
PillGroup.classes = classes53;
PillGroup.displayName = "@mantine/core/PillGroup";

// node_modules/@mantine/core/esm/components/Pill/Pill.mjs
var defaultProps124 = {
  variant: "default"
};
var varsResolver54 = createVarsResolver((_, { radius }, { size: size2 }) => ({
  root: {
    "--pill-fz": getSize(size2, "pill-fz"),
    "--pill-height": getSize(size2, "pill-height"),
    "--pill-radius": radius === void 0 ? void 0 : getRadius(radius)
  }
}));
var Pill = factory((_props, ref) => {
  const props = useProps("Pill", defaultProps124, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    variant,
    children,
    withRemoveButton,
    onRemove,
    removeButtonProps,
    radius,
    size: size2,
    disabled,
    ...others
  } = props;
  const ctx = usePillGroupContext();
  const pillsInputCtx = usePillsInputContext();
  const _size = size2 || (ctx == null ? void 0 : ctx.size) || void 0;
  const _variant = (pillsInputCtx == null ? void 0 : pillsInputCtx.variant) === "filled" ? "contrast" : variant || "default";
  const getStyles2 = useStyles({
    name: "Pill",
    classes: classes53,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver54,
    stylesCtx: { size: _size }
  });
  return import_react264.default.createElement(
    Box,
    {
      component: "span",
      ref,
      variant: _variant,
      size: _size,
      ...getStyles2("root", { variant: _variant }),
      mod: { "with-remove": withRemoveButton, disabled: disabled || (ctx == null ? void 0 : ctx.disabled) },
      ...others
    },
    import_react264.default.createElement("span", { ...getStyles2("label") }, children),
    withRemoveButton && import_react264.default.createElement(
      CloseButton,
      {
        variant: "transparent",
        radius,
        tabIndex: -1,
        "aria-hidden": true,
        unstyled,
        ...removeButtonProps,
        ...getStyles2("remove", {
          className: removeButtonProps == null ? void 0 : removeButtonProps.className,
          style: removeButtonProps == null ? void 0 : removeButtonProps.style
        }),
        onMouseDown: (event) => {
          var _a;
          event.preventDefault();
          event.stopPropagation();
          (_a = removeButtonProps == null ? void 0 : removeButtonProps.onMouseDown) == null ? void 0 : _a.call(removeButtonProps, event);
        },
        onClick: (event) => {
          var _a;
          event.stopPropagation();
          onRemove == null ? void 0 : onRemove();
          (_a = removeButtonProps == null ? void 0 : removeButtonProps.onClick) == null ? void 0 : _a.call(removeButtonProps, event);
        }
      }
    )
  );
});
Pill.classes = classes53;
Pill.displayName = "@mantine/core/Pill";
Pill.Group = PillGroup;

// node_modules/@mantine/core/esm/components/MultiSelect/filter-picked-values.mjs
var import_react265 = __toESM(require_react(), 1);
function filterPickedValues({ data, value }) {
  const normalizedValue = value.map((item) => item.trim().toLowerCase());
  const filtered = data.reduce((acc, item) => {
    if (isOptionsGroup(item)) {
      acc.push({
        group: item.group,
        items: item.items.filter(
          (option) => normalizedValue.indexOf(option.value.toLowerCase().trim()) === -1
        )
      });
    } else if (normalizedValue.indexOf(item.value.toLowerCase().trim()) === -1) {
      acc.push(item);
    }
    return acc;
  }, []);
  return filtered;
}

// node_modules/@mantine/core/esm/components/MultiSelect/MultiSelect.mjs
var defaultProps125 = {
  maxValues: Infinity,
  withCheckIcon: true,
  checkIconPosition: "left",
  hiddenInputValuesDivider: ","
};
var MultiSelect = factory((_props, ref) => {
  const props = useProps("MultiSelect", defaultProps125, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    value,
    defaultValue,
    onChange,
    onKeyDown,
    variant,
    data,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose,
    selectFirstOptionOnChange,
    onOptionSubmit,
    comboboxProps,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    readOnly,
    disabled,
    onFocus,
    onBlur,
    onPaste,
    radius,
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents,
    rightSectionProps,
    leftSection,
    leftSectionWidth,
    leftSectionPointerEvents,
    leftSectionProps,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    labelProps,
    descriptionProps,
    errorProps,
    wrapperProps,
    description,
    label,
    error,
    maxValues,
    searchable,
    nothingFoundMessage,
    withCheckIcon,
    checkIconPosition,
    hidePickedOptions,
    withErrorStyles,
    name,
    form,
    id,
    clearable,
    clearButtonProps,
    hiddenInputProps,
    placeholder,
    hiddenInputValuesDivider,
    ...others
  } = props;
  const _id = useId(id);
  const parsedData = getParsedComboboxData(data);
  const optionsLockup = getOptionsLockup(parsedData);
  const combobox = useCombobox({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose: () => {
      onDropdownClose == null ? void 0 : onDropdownClose();
      combobox.resetSelectedOption();
    }
  });
  const {
    styleProps,
    rest: { type, ...rest }
  } = extractStyleProps(others);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });
  const [_searchValue, setSearchValue] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: "",
    onChange: onSearchChange
  });
  const getStyles2 = useStyles({
    name: "MultiSelect",
    classes: {},
    props,
    classNames,
    styles,
    unstyled
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    props,
    styles,
    classNames
  });
  const handleInputKeydown = (event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (event.key === "Backspace" && _searchValue.length === 0 && _value.length > 0) {
      setValue(_value.slice(0, _value.length - 1));
    }
  };
  const values = _value.map((item, index5) => {
    var _a;
    return import_react266.default.createElement(
      Pill,
      {
        key: `${item}-${index5}`,
        withRemoveButton: !readOnly,
        onRemove: () => setValue(_value.filter((i) => item !== i)),
        unstyled,
        ...getStyles2("pill")
      },
      ((_a = optionsLockup[item]) == null ? void 0 : _a.label) || item
    );
  });
  (0, import_react266.useEffect)(() => {
    if (selectFirstOptionOnChange) {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, _value]);
  const clearButton = clearable && _value.length > 0 && !disabled && !readOnly && import_react266.default.createElement(
    Combobox.ClearButton,
    {
      size: size2,
      ...clearButtonProps,
      onClear: () => {
        setValue([]);
        setSearchValue("");
      }
    }
  );
  const filteredData = filterPickedValues({ data: parsedData, value: _value });
  return import_react266.default.createElement(import_react266.default.Fragment, null, import_react266.default.createElement(
    Combobox,
    {
      store: combobox,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      unstyled,
      size: size2,
      readOnly,
      __staticSelector: "MultiSelect",
      onOptionSubmit: (val) => {
        onOptionSubmit == null ? void 0 : onOptionSubmit(val);
        setSearchValue("");
        combobox.updateSelectedOptionIndex("selected");
        if (_value.includes(optionsLockup[val].value)) {
          setValue(_value.filter((v) => v !== optionsLockup[val].value));
        } else if (_value.length < maxValues) {
          setValue([..._value, optionsLockup[val].value]);
        }
      },
      ...comboboxProps
    },
    import_react266.default.createElement(Combobox.DropdownTarget, null, import_react266.default.createElement(
      PillsInput,
      {
        ...styleProps,
        __staticSelector: "MultiSelect",
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        size: size2,
        className,
        style,
        variant,
        disabled,
        radius,
        rightSection: rightSection || clearButton || import_react266.default.createElement(Combobox.Chevron, { size: size2, error, unstyled }),
        rightSectionPointerEvents: rightSectionPointerEvents || clearButton ? "all" : "none",
        rightSectionWidth,
        rightSectionProps,
        leftSection,
        leftSectionWidth,
        leftSectionPointerEvents,
        leftSectionProps,
        inputContainer,
        inputWrapperOrder,
        withAsterisk,
        labelProps,
        descriptionProps,
        errorProps,
        wrapperProps,
        description,
        label,
        error,
        multiline: true,
        withErrorStyles,
        __stylesApiProps: { ...props, multiline: true },
        pointer: !searchable,
        onClick: () => searchable ? combobox.openDropdown() : combobox.toggleDropdown(),
        "data-expanded": combobox.dropdownOpened || void 0,
        id: _id
      },
      import_react266.default.createElement(Pill.Group, { disabled, unstyled, ...getStyles2("pillsList") }, values, import_react266.default.createElement(Combobox.EventsTarget, null, import_react266.default.createElement(
        PillsInput.Field,
        {
          ...rest,
          ref,
          id: _id,
          placeholder,
          type: !searchable && !placeholder ? "hidden" : "visible",
          ...getStyles2("inputField"),
          unstyled,
          onFocus: (event) => {
            onFocus == null ? void 0 : onFocus(event);
            searchable && combobox.openDropdown();
          },
          onBlur: (event) => {
            onBlur == null ? void 0 : onBlur(event);
            combobox.closeDropdown();
            searchable && combobox.closeDropdown();
            setSearchValue("");
          },
          onKeyDown: handleInputKeydown,
          value: _searchValue,
          onChange: (event) => {
            setSearchValue(event.currentTarget.value);
            searchable && combobox.openDropdown();
            selectFirstOptionOnChange && combobox.selectFirstOption();
          },
          disabled,
          readOnly: readOnly || !searchable,
          pointer: !searchable
        }
      )))
    )),
    import_react266.default.createElement(
      OptionsDropdown,
      {
        data: hidePickedOptions ? filteredData : parsedData,
        hidden: readOnly || disabled,
        filter,
        search: _searchValue,
        limit,
        hiddenWhenEmpty: !searchable || !nothingFoundMessage || hidePickedOptions && filteredData.length === 0 && _searchValue.trim().length === 0,
        withScrollArea,
        maxDropdownHeight,
        filterOptions: searchable,
        value: _value,
        checkIconPosition,
        withCheckIcon,
        nothingFoundMessage,
        unstyled,
        labelId: `${_id}-label`
      }
    )
  ), import_react266.default.createElement(
    "input",
    {
      type: "hidden",
      name,
      value: _value.join(hiddenInputValuesDivider),
      form,
      disabled,
      ...hiddenInputProps
    }
  ));
});
MultiSelect.classes = { ...InputBase.classes, ...Combobox.classes };
MultiSelect.displayName = "@mantine/core/MultiSelect";

// node_modules/@mantine/core/esm/components/NativeSelect/NativeSelect.mjs
var import_react268 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/NativeSelect/NativeSelectOption.mjs
var import_react267 = __toESM(require_react(), 1);
function isGroup(input) {
  return "group" in input;
}
function NativeSelectOption({ data }) {
  if (isGroup(data)) {
    const items = data.items.map((item) => import_react267.default.createElement(NativeSelectOption, { key: item.value, data: item }));
    return import_react267.default.createElement("optgroup", { label: data.group }, items);
  }
  const { value, label, ...others } = data;
  return import_react267.default.createElement("option", { key: data.value, value: data.value, ...others }, data.label);
}
NativeSelectOption.displayName = "@mantine/core/NativeSelectOption";

// node_modules/@mantine/core/esm/components/NativeSelect/NativeSelect.mjs
var defaultProps126 = {
  rightSectionPointerEvents: "none"
};
var NativeSelect = factory((props, ref) => {
  const { data, children, size: size2, error, rightSection, unstyled, ...others } = useProps(
    "NativeSelect",
    defaultProps126,
    props
  );
  const options = getParsedComboboxData(data).map((item, index5) => import_react268.default.createElement(NativeSelectOption, { key: index5, data: item }));
  return import_react268.default.createElement(
    InputBase,
    {
      component: "select",
      ref,
      ...others,
      __staticSelector: "NativeSelect",
      size: size2,
      pointer: true,
      error,
      unstyled,
      rightSection: rightSection || import_react268.default.createElement(ComboboxChevron, { size: size2, error, unstyled })
    },
    children || options
  );
});
NativeSelect.classes = InputBase.classes;
NativeSelect.displayName = "@mantine/core/NativeSelect";

// node_modules/@mantine/core/esm/components/NavLink/NavLink.mjs
var import_react269 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/NavLink/NavLink.module.css.mjs
var classes54 = { "root": "m-f0824112", "description": "m-57492dcc", "section": "m-690090b5", "label": "m-1f6ac4c4", "body": "m-f07af9d2", "children": "m-e17b862f", "chevron": "m-1fd8a00b" };

// node_modules/@mantine/core/esm/components/NavLink/NavLink.mjs
var defaultProps127 = {};
var varsResolver55 = createVarsResolver(
  (theme, { variant, color, childrenOffset }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      variant: variant || "light"
    });
    return {
      root: {
        "--nl-bg": color || variant ? colors.background : void 0,
        "--nl-hover": color || variant ? colors.hover : void 0,
        "--nl-color": color || variant ? colors.color : void 0
      },
      children: {
        "--nl-offset": getSpacing(childrenOffset)
      }
    };
  }
);
var NavLink = polymorphicFactory((_props, ref) => {
  const props = useProps("NavLink", defaultProps127, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    opened,
    defaultOpened,
    onChange,
    children,
    onClick,
    active,
    disabled,
    leftSection,
    rightSection,
    label,
    description,
    disableRightSectionRotation,
    noWrap,
    childrenOffset,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "NavLink",
    props,
    classes: classes54,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver55
  });
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange
  });
  const withChildren = !!children;
  const handleClick = (event) => {
    if (withChildren) {
      event.preventDefault();
      onClick == null ? void 0 : onClick(event);
      setOpened(!_opened);
    } else {
      onClick == null ? void 0 : onClick(event);
    }
  };
  return import_react269.default.createElement(import_react269.default.Fragment, null, import_react269.default.createElement(
    UnstyledButton,
    {
      ...getStyles2("root"),
      component: "a",
      ref,
      onClick: handleClick,
      unstyled,
      mod: { disabled, active, expanded: _opened },
      ...others
    },
    leftSection && import_react269.default.createElement(Box, { component: "span", ...getStyles2("section"), mod: { position: "left" } }, leftSection),
    import_react269.default.createElement(Box, { ...getStyles2("body"), mod: { "no-wrap": noWrap } }, import_react269.default.createElement(Box, { component: "span", ...getStyles2("label") }, label), import_react269.default.createElement(Box, { component: "span", mod: { active }, ...getStyles2("description") }, description)),
    (withChildren || rightSection) && import_react269.default.createElement(
      Box,
      {
        ...getStyles2("section"),
        component: "span",
        mod: { rotate: _opened && !disableRightSectionRotation, position: "right" }
      },
      withChildren ? rightSection || import_react269.default.createElement(AccordionChevron, { ...getStyles2("chevron") }) : rightSection
    )
  ), import_react269.default.createElement(Collapse, { in: _opened }, import_react269.default.createElement("div", { ...getStyles2("children") }, children)));
});
NavLink.classes = classes54;
NavLink.displayName = "@mantine/core/NavLink";

// node_modules/@mantine/core/esm/components/Notification/Notification.mjs
var import_react270 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Notification/Notification.module.css.mjs
var classes55 = { "root": "m-a513464", "icon": "m-a4ceffb", "loader": "m-b0920b15", "body": "m-a49ed24", "title": "m-3feedf16", "description": "m-3d733a3a", "closeButton": "m-919a4d88" };

// node_modules/@mantine/core/esm/components/Notification/Notification.mjs
var defaultProps128 = {
  withCloseButton: true
};
var varsResolver56 = createVarsResolver((theme, { radius, color }) => ({
  root: {
    "--notification-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--notification-color": color ? getThemeColor(color, theme) : void 0
  }
}));
var Notification = factory((_props, ref) => {
  const props = useProps("Notification", defaultProps128, _props);
  const {
    className,
    color,
    radius,
    loading,
    withCloseButton,
    withBorder,
    title,
    icon,
    children,
    onClose,
    closeButtonProps,
    classNames,
    style,
    styles,
    unstyled,
    variant,
    vars,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Notification",
    classes: classes55,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver56
  });
  return import_react270.default.createElement(
    Box,
    {
      ...getStyles2("root"),
      mod: {
        "data-with-icon": !!icon || loading,
        "data-with-border": withBorder
      },
      ref,
      variant,
      ...others,
      role: "alert"
    },
    icon && !loading && import_react270.default.createElement("div", { ...getStyles2("icon") }, icon),
    loading && import_react270.default.createElement(Loader, { size: 28, color, ...getStyles2("loader") }),
    import_react270.default.createElement("div", { ...getStyles2("body") }, title && import_react270.default.createElement("div", { ...getStyles2("title") }, title), import_react270.default.createElement(Box, { ...getStyles2("description"), mod: { "data-with-title": !!title } }, children)),
    withCloseButton && import_react270.default.createElement(
      CloseButton,
      {
        iconSize: 16,
        color: "gray",
        ...closeButtonProps,
        unstyled,
        onClick: onClose,
        ...getStyles2("closeButton")
      }
    )
  );
});
Notification.classes = classes55;
Notification.displayName = "@mantine/core/Notification";

// node_modules/@mantine/core/esm/components/NumberFormatter/NumberFormatter.mjs
var import_react272 = __toESM(require_react(), 1);

// node_modules/react-number-format/dist/react-number-format.es.js
var import_react271 = __toESM(require_react());
function __rest2(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) {
      t[p] = s[p];
    }
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function") {
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) {
        t[p[i]] = s[p[i]];
      }
    }
  }
  return t;
}
var SourceType;
(function(SourceType2) {
  SourceType2["event"] = "event";
  SourceType2["props"] = "prop";
})(SourceType || (SourceType = {}));
function noop4() {
}
function memoizeOnce(cb) {
  var lastArgs;
  var lastValue = void 0;
  return function() {
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    if (lastArgs && args.length === lastArgs.length && args.every(function(value, index5) {
      return value === lastArgs[index5];
    })) {
      return lastValue;
    }
    lastArgs = args;
    lastValue = cb.apply(void 0, args);
    return lastValue;
  };
}
function charIsNumber(char) {
  return !!(char || "").match(/\d/);
}
function isNil(val) {
  return val === null || val === void 0;
}
function isNanValue(val) {
  return typeof val === "number" && isNaN(val);
}
function isNotValidValue(val) {
  return isNil(val) || isNanValue(val) || typeof val === "number" && !isFinite(val);
}
function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function getThousandsGroupRegex(thousandsGroupStyle) {
  switch (thousandsGroupStyle) {
    case "lakh":
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case "wan":
      return /(\d)(?=(\d{4})+(?!\d))/g;
    case "thousand":
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}
function applyThousandSeparator(str, thousandSeparator, thousandsGroupStyle) {
  var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  var index5 = str.search(/[1-9]/);
  index5 = index5 === -1 ? str.length : index5;
  return str.substring(0, index5) + str.substring(index5, str.length).replace(thousandsGroupRegex, "$1" + thousandSeparator);
}
function usePersistentCallback(cb) {
  var callbackRef = (0, import_react271.useRef)(cb);
  callbackRef.current = cb;
  var persistentCbRef = (0, import_react271.useRef)(function() {
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    return callbackRef.current.apply(callbackRef, args);
  });
  return persistentCbRef.current;
}
function splitDecimal(numStr, allowNegative) {
  if (allowNegative === void 0)
    allowNegative = true;
  var hasNegation = numStr[0] === "-";
  var addNegation = hasNegation && allowNegative;
  numStr = numStr.replace("-", "");
  var parts = numStr.split(".");
  var beforeDecimal = parts[0];
  var afterDecimal = parts[1] || "";
  return {
    beforeDecimal,
    afterDecimal,
    hasNegation,
    addNegation
  };
}
function fixLeadingZero(numStr) {
  if (!numStr) {
    return numStr;
  }
  var isNegative = numStr[0] === "-";
  if (isNegative) {
    numStr = numStr.substring(1, numStr.length);
  }
  var parts = numStr.split(".");
  var beforeDecimal = parts[0].replace(/^0+/, "") || "0";
  var afterDecimal = parts[1] || "";
  return (isNegative ? "-" : "") + beforeDecimal + (afterDecimal ? "." + afterDecimal : "");
}
function limitToScale(numStr, scale, fixedDecimalScale) {
  var str = "";
  var filler = fixedDecimalScale ? "0" : "";
  for (var i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}
function repeat(str, count2) {
  return Array(count2 + 1).join(str);
}
function toNumericString(num) {
  var _num = num + "";
  var sign = _num[0] === "-" ? "-" : "";
  if (sign) {
    _num = _num.substring(1);
  }
  var ref = _num.split(/[eE]/g);
  var coefficient = ref[0];
  var exponent = ref[1];
  exponent = Number(exponent);
  if (!exponent) {
    return sign + coefficient;
  }
  coefficient = coefficient.replace(".", "");
  var decimalIndex = 1 + exponent;
  var coffiecientLn = coefficient.length;
  if (decimalIndex < 0) {
    coefficient = "0." + repeat("0", Math.abs(decimalIndex)) + coefficient;
  } else if (decimalIndex >= coffiecientLn) {
    coefficient = coefficient + repeat("0", decimalIndex - coffiecientLn);
  } else {
    coefficient = (coefficient.substring(0, decimalIndex) || "0") + "." + coefficient.substring(decimalIndex);
  }
  return sign + coefficient;
}
function roundToPrecision(numStr, scale, fixedDecimalScale) {
  if (["", "-"].indexOf(numStr) !== -1) {
    return numStr;
  }
  var shouldHaveDecimalSeparator = (numStr.indexOf(".") !== -1 || fixedDecimalScale) && scale;
  var ref = splitDecimal(numStr);
  var beforeDecimal = ref.beforeDecimal;
  var afterDecimal = ref.afterDecimal;
  var hasNegation = ref.hasNegation;
  var floatValue = parseFloat("0." + (afterDecimal || "0"));
  var floatValueStr = afterDecimal.length <= scale ? "0." + afterDecimal : floatValue.toFixed(scale);
  var roundedDecimalParts = floatValueStr.split(".");
  var intPart = beforeDecimal.split("").reverse().reduce(function(roundedStr, current, idx) {
    if (roundedStr.length > idx) {
      return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
    }
    return current + roundedStr;
  }, roundedDecimalParts[0]);
  var decimalPart = limitToScale(roundedDecimalParts[1] || "", scale, fixedDecimalScale);
  var negation = hasNegation ? "-" : "";
  var decimalSeparator = shouldHaveDecimalSeparator ? "." : "";
  return "" + negation + intPart + decimalSeparator + decimalPart;
}
function setCaretPosition(el, caretPos) {
  el.value = el.value;
  if (el !== null) {
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.move("character", caretPos);
      range.select();
      return true;
    }
    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    }
    el.focus();
    return false;
  }
}
var findChangeRange = memoizeOnce(function(prevValue, newValue) {
  var i = 0, j = 0;
  var prevLength = prevValue.length;
  var newLength = newValue.length;
  while (prevValue[i] === newValue[i] && i < prevLength) {
    i++;
  }
  while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] && newLength - j > i && prevLength - j > i) {
    j++;
  }
  return {
    from: { start: i, end: prevLength - j },
    to: { start: i, end: newLength - j }
  };
});
function clamp4(num, min2, max2) {
  return Math.min(Math.max(num, min2), max2);
}
function geInputCaretPosition(el) {
  return Math.max(el.selectionStart, el.selectionEnd);
}
function addInputMode() {
  return typeof navigator !== "undefined" && !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}
function getDefaultChangeMeta(value) {
  return {
    from: {
      start: 0,
      end: 0
    },
    to: {
      start: 0,
      end: value.length
    },
    lastValue: ""
  };
}
function defaultIsCharacterSame(ref) {
  var currentValue = ref.currentValue;
  var formattedValue = ref.formattedValue;
  var currentValueIndex = ref.currentValueIndex;
  var formattedValueIndex = ref.formattedValueIndex;
  return currentValue[currentValueIndex] === formattedValue[formattedValueIndex];
}
function getCaretPosition(newFormattedValue, lastFormattedValue, curValue, curCaretPos, boundary, isValidInputCharacter, isCharacterSame) {
  if (isCharacterSame === void 0)
    isCharacterSame = defaultIsCharacterSame;
  var firstAllowedPosition = boundary.findIndex(function(b) {
    return b;
  });
  var prefixFormat = newFormattedValue.slice(0, firstAllowedPosition);
  if (!lastFormattedValue && !curValue.startsWith(prefixFormat)) {
    lastFormattedValue = prefixFormat;
    curValue = prefixFormat + curValue;
    curCaretPos = curCaretPos + prefixFormat.length;
  }
  var curValLn = curValue.length;
  var formattedValueLn = newFormattedValue.length;
  var addedIndexMap = {};
  var indexMap = new Array(curValLn);
  for (var i = 0; i < curValLn; i++) {
    indexMap[i] = -1;
    for (var j = 0, jLn = formattedValueLn; j < jLn; j++) {
      var isCharSame = isCharacterSame({
        currentValue: curValue,
        lastValue: lastFormattedValue,
        formattedValue: newFormattedValue,
        currentValueIndex: i,
        formattedValueIndex: j
      });
      if (isCharSame && addedIndexMap[j] !== true) {
        indexMap[i] = j;
        addedIndexMap[j] = true;
        break;
      }
    }
  }
  var pos = curCaretPos;
  while (pos < curValLn && (indexMap[pos] === -1 || !isValidInputCharacter(curValue[pos]))) {
    pos++;
  }
  var endIndex = pos === curValLn || indexMap[pos] === -1 ? formattedValueLn : indexMap[pos];
  pos = curCaretPos - 1;
  while (pos > 0 && indexMap[pos] === -1) {
    pos--;
  }
  var startIndex = pos === -1 || indexMap[pos] === -1 ? 0 : indexMap[pos] + 1;
  if (startIndex > endIndex) {
    return endIndex;
  }
  return curCaretPos - startIndex < endIndex - curCaretPos ? startIndex : endIndex;
}
function getCaretPosInBoundary(value, caretPos, boundary, direction) {
  var valLn = value.length;
  caretPos = clamp4(caretPos, 0, valLn);
  if (direction === "left") {
    while (caretPos >= 0 && !boundary[caretPos]) {
      caretPos--;
    }
    if (caretPos === -1) {
      caretPos = boundary.indexOf(true);
    }
  } else {
    while (caretPos <= valLn && !boundary[caretPos]) {
      caretPos++;
    }
    if (caretPos > valLn) {
      caretPos = boundary.lastIndexOf(true);
    }
  }
  if (caretPos === -1) {
    caretPos = valLn;
  }
  return caretPos;
}
function caretUnknownFormatBoundary(formattedValue) {
  var boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function() {
    return true;
  });
  for (var i = 0, ln = boundaryAry.length; i < ln; i++) {
    boundaryAry[i] = Boolean(charIsNumber(formattedValue[i]) || charIsNumber(formattedValue[i - 1]));
  }
  return boundaryAry;
}
function useInternalValues(value, defaultValue, valueIsNumericString, format2, removeFormatting2, onValueChange) {
  if (onValueChange === void 0)
    onValueChange = noop4;
  var getValues = usePersistentCallback(function(value2, valueIsNumericString2) {
    var formattedValue, numAsString;
    if (isNotValidValue(value2)) {
      numAsString = "";
      formattedValue = "";
    } else if (typeof value2 === "number" || valueIsNumericString2) {
      numAsString = typeof value2 === "number" ? toNumericString(value2) : value2;
      formattedValue = format2(numAsString);
    } else {
      numAsString = removeFormatting2(value2, void 0);
      formattedValue = format2(numAsString);
    }
    return { formattedValue, numAsString };
  });
  var ref = (0, import_react271.useState)(function() {
    return getValues(isNil(value) ? defaultValue : value, valueIsNumericString);
  });
  var values = ref[0];
  var setValues = ref[1];
  var _onValueChange = function(newValues2, sourceInfo) {
    if (newValues2.formattedValue !== values.formattedValue) {
      setValues({
        formattedValue: newValues2.formattedValue,
        numAsString: newValues2.value
      });
    }
    onValueChange(newValues2, sourceInfo);
  };
  var _value = value;
  var _valueIsNumericString = valueIsNumericString;
  if (isNil(value)) {
    _value = values.numAsString;
    _valueIsNumericString = true;
  }
  var newValues = getValues(_value, _valueIsNumericString);
  (0, import_react271.useMemo)(function() {
    setValues(newValues);
  }, [newValues.formattedValue]);
  return [values, _onValueChange];
}
function defaultRemoveFormatting(value) {
  return value.replace(/[^0-9]/g, "");
}
function defaultFormat(value) {
  return value;
}
function NumberFormatBase(props) {
  var type = props.type;
  if (type === void 0)
    type = "text";
  var displayType = props.displayType;
  if (displayType === void 0)
    displayType = "input";
  var customInput = props.customInput;
  var renderText = props.renderText;
  var getInputRef = props.getInputRef;
  var format2 = props.format;
  if (format2 === void 0)
    format2 = defaultFormat;
  var removeFormatting2 = props.removeFormatting;
  if (removeFormatting2 === void 0)
    removeFormatting2 = defaultRemoveFormatting;
  var defaultValue = props.defaultValue;
  var valueIsNumericString = props.valueIsNumericString;
  var onValueChange = props.onValueChange;
  var isAllowed = props.isAllowed;
  var onChange = props.onChange;
  if (onChange === void 0)
    onChange = noop4;
  var onKeyDown = props.onKeyDown;
  if (onKeyDown === void 0)
    onKeyDown = noop4;
  var onMouseUp = props.onMouseUp;
  if (onMouseUp === void 0)
    onMouseUp = noop4;
  var onFocus = props.onFocus;
  if (onFocus === void 0)
    onFocus = noop4;
  var onBlur = props.onBlur;
  if (onBlur === void 0)
    onBlur = noop4;
  var propValue = props.value;
  var getCaretBoundary2 = props.getCaretBoundary;
  if (getCaretBoundary2 === void 0)
    getCaretBoundary2 = caretUnknownFormatBoundary;
  var isValidInputCharacter = props.isValidInputCharacter;
  if (isValidInputCharacter === void 0)
    isValidInputCharacter = charIsNumber;
  var isCharacterSame = props.isCharacterSame;
  var otherProps = __rest2(props, ["type", "displayType", "customInput", "renderText", "getInputRef", "format", "removeFormatting", "defaultValue", "valueIsNumericString", "onValueChange", "isAllowed", "onChange", "onKeyDown", "onMouseUp", "onFocus", "onBlur", "value", "getCaretBoundary", "isValidInputCharacter", "isCharacterSame"]);
  var ref = useInternalValues(propValue, defaultValue, Boolean(valueIsNumericString), format2, removeFormatting2, onValueChange);
  var ref_0 = ref[0];
  var formattedValue = ref_0.formattedValue;
  var numAsString = ref_0.numAsString;
  var onFormattedValueChange = ref[1];
  var lastUpdatedValue = (0, import_react271.useRef)({ formattedValue, numAsString });
  var _onValueChange = function(values, source) {
    lastUpdatedValue.current = { formattedValue: values.formattedValue, numAsString: values.value };
    onFormattedValueChange(values, source);
  };
  var ref$1 = (0, import_react271.useState)(false);
  var mounted = ref$1[0];
  var setMounted = ref$1[1];
  var focusedElm = (0, import_react271.useRef)(null);
  var timeout = (0, import_react271.useRef)({
    setCaretTimeout: null,
    focusTimeout: null
  });
  (0, import_react271.useEffect)(function() {
    setMounted(true);
    return function() {
      clearTimeout(timeout.current.setCaretTimeout);
      clearTimeout(timeout.current.focusTimeout);
    };
  }, []);
  var _format = format2;
  var getValueObject = function(formattedValue2, numAsString2) {
    var floatValue = parseFloat(numAsString2);
    return {
      formattedValue: formattedValue2,
      value: numAsString2,
      floatValue: isNaN(floatValue) ? void 0 : floatValue
    };
  };
  var setPatchedCaretPosition = function(el, caretPos, currentValue) {
    if (el.selectionStart === 0 && el.selectionEnd === el.value.length) {
      return;
    }
    setCaretPosition(el, caretPos);
    timeout.current.setCaretTimeout = setTimeout(function() {
      if (el.value === currentValue && el.selectionStart !== el.selectionEnd) {
        setCaretPosition(el, caretPos);
      }
    }, 0);
  };
  var correctCaretPosition = function(value, caretPos, direction) {
    return getCaretPosInBoundary(value, caretPos, getCaretBoundary2(value), direction);
  };
  var getNewCaretPosition = function(inputValue, newFormattedValue, caretPos) {
    var caretBoundary = getCaretBoundary2(newFormattedValue);
    var updatedCaretPos = getCaretPosition(newFormattedValue, formattedValue, inputValue, caretPos, caretBoundary, isValidInputCharacter, isCharacterSame);
    updatedCaretPos = getCaretPosInBoundary(newFormattedValue, updatedCaretPos, caretBoundary);
    return updatedCaretPos;
  };
  var updateValueAndCaretPosition = function(params) {
    var newFormattedValue = params.formattedValue;
    if (newFormattedValue === void 0)
      newFormattedValue = "";
    var input = params.input;
    var setCaretPosition2 = params.setCaretPosition;
    if (setCaretPosition2 === void 0)
      setCaretPosition2 = true;
    var source = params.source;
    var event = params.event;
    var numAsString2 = params.numAsString;
    var caretPos = params.caretPos;
    if (input) {
      if (caretPos === void 0 && setCaretPosition2) {
        var inputValue = params.inputValue || input.value;
        var currentCaretPosition2 = geInputCaretPosition(input);
        input.value = newFormattedValue;
        caretPos = getNewCaretPosition(inputValue, newFormattedValue, currentCaretPosition2);
      }
      input.value = newFormattedValue;
      if (setCaretPosition2 && caretPos !== void 0) {
        setPatchedCaretPosition(input, caretPos, newFormattedValue);
      }
    }
    if (newFormattedValue !== formattedValue) {
      _onValueChange(getValueObject(newFormattedValue, numAsString2), { event, source });
    }
  };
  (0, import_react271.useEffect)(function() {
    var ref2 = lastUpdatedValue.current;
    var lastFormattedValue = ref2.formattedValue;
    var lastNumAsString = ref2.numAsString;
    if (formattedValue !== lastFormattedValue && (formattedValue !== numAsString || lastFormattedValue !== lastNumAsString)) {
      _onValueChange(getValueObject(formattedValue, numAsString), {
        event: void 0,
        source: SourceType.props
      });
    }
  }, [formattedValue, numAsString]);
  var currentCaretPosition = focusedElm.current ? geInputCaretPosition(focusedElm.current) : void 0;
  var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react271.useLayoutEffect : import_react271.useEffect;
  useIsomorphicLayoutEffect(function() {
    var input = focusedElm.current;
    if (formattedValue !== lastUpdatedValue.current.formattedValue && input) {
      var caretPos = getNewCaretPosition(lastUpdatedValue.current.formattedValue, formattedValue, currentCaretPosition);
      input.value = formattedValue;
      setPatchedCaretPosition(input, caretPos, formattedValue);
    }
  }, [formattedValue]);
  var formatInputValue = function(inputValue, event, source) {
    var changeRange = findChangeRange(formattedValue, inputValue);
    var changeMeta = Object.assign(Object.assign({}, changeRange), { lastValue: formattedValue });
    var _numAsString = removeFormatting2(inputValue, changeMeta);
    var _formattedValue = _format(_numAsString);
    _numAsString = removeFormatting2(_formattedValue, void 0);
    if (isAllowed && !isAllowed(getValueObject(_formattedValue, _numAsString))) {
      var input = event.target;
      var currentCaretPosition2 = geInputCaretPosition(input);
      var caretPos = getNewCaretPosition(inputValue, formattedValue, currentCaretPosition2);
      input.value = formattedValue;
      setPatchedCaretPosition(input, caretPos, formattedValue);
      return false;
    }
    updateValueAndCaretPosition({
      formattedValue: _formattedValue,
      numAsString: _numAsString,
      inputValue,
      event,
      source,
      setCaretPosition: true,
      input: event.target
    });
    return true;
  };
  var _onChange = function(e) {
    var el = e.target;
    var inputValue = el.value;
    var changed = formatInputValue(inputValue, e, SourceType.event);
    if (changed) {
      onChange(e);
    }
  };
  var _onKeyDown = function(e) {
    var el = e.target;
    var key = e.key;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value = el.value;
    if (value === void 0)
      value = "";
    var expectedCaretPosition;
    if (key === "ArrowLeft" || key === "Backspace") {
      expectedCaretPosition = Math.max(selectionStart - 1, 0);
    } else if (key === "ArrowRight") {
      expectedCaretPosition = Math.min(selectionStart + 1, value.length);
    } else if (key === "Delete") {
      expectedCaretPosition = selectionStart;
    }
    if (expectedCaretPosition === void 0 || selectionStart !== selectionEnd) {
      onKeyDown(e);
      return;
    }
    var newCaretPosition = expectedCaretPosition;
    if (key === "ArrowLeft" || key === "ArrowRight") {
      var direction = key === "ArrowLeft" ? "left" : "right";
      newCaretPosition = correctCaretPosition(value, expectedCaretPosition, direction);
      if (newCaretPosition !== expectedCaretPosition) {
        e.preventDefault();
      }
    } else if (key === "Delete" && !isValidInputCharacter(value[expectedCaretPosition])) {
      newCaretPosition = correctCaretPosition(value, expectedCaretPosition, "right");
    } else if (key === "Backspace" && !isValidInputCharacter(value[expectedCaretPosition])) {
      newCaretPosition = correctCaretPosition(value, expectedCaretPosition, "left");
    }
    if (newCaretPosition !== expectedCaretPosition) {
      setPatchedCaretPosition(el, newCaretPosition, value);
    }
    if (e.isUnitTestRun) {
      setPatchedCaretPosition(el, newCaretPosition, value);
    }
    onKeyDown(e);
  };
  var _onMouseUp = function(e) {
    var el = e.target;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value = el.value;
    if (value === void 0)
      value = "";
    if (selectionStart === selectionEnd) {
      var caretPosition = correctCaretPosition(value, selectionStart);
      if (caretPosition !== selectionStart) {
        setPatchedCaretPosition(el, caretPosition, value);
      }
    }
    onMouseUp(e);
  };
  var _onFocus = function(e) {
    if (e.persist) {
      e.persist();
    }
    var el = e.target;
    focusedElm.current = el;
    timeout.current.focusTimeout = setTimeout(function() {
      var selectionStart = el.selectionStart;
      var selectionEnd = el.selectionEnd;
      var value = el.value;
      if (value === void 0)
        value = "";
      var caretPosition = correctCaretPosition(value, selectionStart);
      if (caretPosition !== selectionStart && !(selectionStart === 0 && selectionEnd === value.length)) {
        setPatchedCaretPosition(el, caretPosition, value);
      }
      onFocus(e);
    }, 0);
  };
  var _onBlur = function(e) {
    focusedElm.current = null;
    clearTimeout(timeout.current.focusTimeout);
    clearTimeout(timeout.current.setCaretTimeout);
    onBlur(e);
  };
  var inputMode = mounted && addInputMode() ? "numeric" : void 0;
  var inputProps = Object.assign({ inputMode }, otherProps, {
    type,
    value: formattedValue,
    onChange: _onChange,
    onKeyDown: _onKeyDown,
    onMouseUp: _onMouseUp,
    onFocus: _onFocus,
    onBlur: _onBlur
  });
  if (displayType === "text") {
    return renderText ? import_react271.default.createElement(import_react271.default.Fragment, null, renderText(formattedValue, otherProps) || null) : import_react271.default.createElement("span", Object.assign({}, otherProps, { ref: getInputRef }), formattedValue);
  } else if (customInput) {
    var CustomInput = customInput;
    return import_react271.default.createElement(CustomInput, Object.assign({}, inputProps, { ref: getInputRef }));
  }
  return import_react271.default.createElement("input", Object.assign({}, inputProps, { ref: getInputRef }));
}
function format(numStr, props) {
  var decimalScale = props.decimalScale;
  var fixedDecimalScale = props.fixedDecimalScale;
  var prefix = props.prefix;
  if (prefix === void 0)
    prefix = "";
  var suffix = props.suffix;
  if (suffix === void 0)
    suffix = "";
  var allowNegative = props.allowNegative;
  var thousandsGroupStyle = props.thousandsGroupStyle;
  if (thousandsGroupStyle === void 0)
    thousandsGroupStyle = "thousand";
  if (numStr === "" || numStr === "-") {
    return numStr;
  }
  var ref = getSeparators(props);
  var thousandSeparator = ref.thousandSeparator;
  var decimalSeparator = ref.decimalSeparator;
  var hasDecimalSeparator = decimalScale !== 0 && numStr.indexOf(".") !== -1 || decimalScale && fixedDecimalScale;
  var ref$1 = splitDecimal(numStr, allowNegative);
  var beforeDecimal = ref$1.beforeDecimal;
  var afterDecimal = ref$1.afterDecimal;
  var addNegation = ref$1.addNegation;
  if (decimalScale !== void 0) {
    afterDecimal = limitToScale(afterDecimal, decimalScale, !!fixedDecimalScale);
  }
  if (thousandSeparator) {
    beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
  }
  if (prefix) {
    beforeDecimal = prefix + beforeDecimal;
  }
  if (suffix) {
    afterDecimal = afterDecimal + suffix;
  }
  if (addNegation) {
    beforeDecimal = "-" + beforeDecimal;
  }
  numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || "") + afterDecimal;
  return numStr;
}
function getSeparators(props) {
  var decimalSeparator = props.decimalSeparator;
  if (decimalSeparator === void 0)
    decimalSeparator = ".";
  var thousandSeparator = props.thousandSeparator;
  var allowedDecimalSeparators = props.allowedDecimalSeparators;
  if (thousandSeparator === true) {
    thousandSeparator = ",";
  }
  if (!allowedDecimalSeparators) {
    allowedDecimalSeparators = [decimalSeparator, "."];
  }
  return {
    decimalSeparator,
    thousandSeparator,
    allowedDecimalSeparators
  };
}
function handleNegation(value, allowNegative) {
  if (value === void 0)
    value = "";
  var negationRegex = new RegExp("(-)");
  var doubleNegationRegex = new RegExp("(-)(.)*(-)");
  var hasNegation = negationRegex.test(value);
  var removeNegation = doubleNegationRegex.test(value);
  value = value.replace(/-/g, "");
  if (hasNegation && !removeNegation && allowNegative) {
    value = "-" + value;
  }
  return value;
}
function getNumberRegex(decimalSeparator, global) {
  return new RegExp("(^-)|[0-9]|" + escapeRegExp(decimalSeparator), global ? "g" : void 0);
}
function isNumericString(val, prefix, suffix) {
  if (val === "") {
    return true;
  }
  return !(prefix === null || prefix === void 0 ? void 0 : prefix.match(/\d/)) && !(suffix === null || suffix === void 0 ? void 0 : suffix.match(/\d/)) && typeof val === "string" && !isNaN(Number(val));
}
function removeFormatting(value, changeMeta, props) {
  var assign;
  if (changeMeta === void 0)
    changeMeta = getDefaultChangeMeta(value);
  var allowNegative = props.allowNegative;
  var prefix = props.prefix;
  if (prefix === void 0)
    prefix = "";
  var suffix = props.suffix;
  if (suffix === void 0)
    suffix = "";
  var decimalScale = props.decimalScale;
  var from = changeMeta.from;
  var to = changeMeta.to;
  var start = to.start;
  var end = to.end;
  var ref = getSeparators(props);
  var allowedDecimalSeparators = ref.allowedDecimalSeparators;
  var decimalSeparator = ref.decimalSeparator;
  var isBeforeDecimalSeparator = value[end] === decimalSeparator;
  if (charIsNumber(value) && (value === prefix || value === suffix) && changeMeta.lastValue === "") {
    return value;
  }
  if (end - start === 1 && allowedDecimalSeparators.indexOf(value[start]) !== -1) {
    var separator = decimalScale === 0 ? "" : decimalSeparator;
    value = value.substring(0, start) + separator + value.substring(start + 1, value.length);
  }
  var stripNegation = function(value2, start2, end2) {
    var hasNegation2 = false;
    var hasDoubleNegation = false;
    if (prefix.startsWith("-")) {
      hasNegation2 = false;
    } else if (value2.startsWith("--")) {
      hasNegation2 = false;
      hasDoubleNegation = true;
    } else if (suffix.startsWith("-") && value2.length === suffix.length) {
      hasNegation2 = false;
    } else if (value2[0] === "-") {
      hasNegation2 = true;
    }
    var charsToRemove = hasNegation2 ? 1 : 0;
    if (hasDoubleNegation) {
      charsToRemove = 2;
    }
    if (charsToRemove) {
      value2 = value2.substring(charsToRemove);
      start2 -= charsToRemove;
      end2 -= charsToRemove;
    }
    return { value: value2, start: start2, end: end2, hasNegation: hasNegation2 };
  };
  var toMetadata = stripNegation(value, start, end);
  var hasNegation = toMetadata.hasNegation;
  assign = toMetadata, value = assign.value, start = assign.start, end = assign.end;
  var ref$1 = stripNegation(changeMeta.lastValue, from.start, from.end);
  var fromStart = ref$1.start;
  var fromEnd = ref$1.end;
  var lastValue = ref$1.value;
  var updatedSuffixPart = value.substring(start, end);
  if (value.length && lastValue.length && (fromStart > lastValue.length - suffix.length || fromEnd < prefix.length) && !(updatedSuffixPart && suffix.startsWith(updatedSuffixPart))) {
    value = lastValue;
  }
  var startIndex = 0;
  if (value.startsWith(prefix)) {
    startIndex += prefix.length;
  } else if (start < prefix.length) {
    startIndex = start;
  }
  value = value.substring(startIndex);
  end -= startIndex;
  var endIndex = value.length;
  var suffixStartIndex = value.length - suffix.length;
  if (value.endsWith(suffix)) {
    endIndex = suffixStartIndex;
  } else if (end > suffixStartIndex) {
    endIndex = end;
  } else if (end > value.length - suffix.length) {
    endIndex = end;
  }
  value = value.substring(0, endIndex);
  value = handleNegation(hasNegation ? "-" + value : value, allowNegative);
  value = (value.match(getNumberRegex(decimalSeparator, true)) || []).join("");
  var firstIndex = value.indexOf(decimalSeparator);
  value = value.replace(new RegExp(escapeRegExp(decimalSeparator), "g"), function(match, index5) {
    return index5 === firstIndex ? "." : "";
  });
  var ref$2 = splitDecimal(value, allowNegative);
  var beforeDecimal = ref$2.beforeDecimal;
  var afterDecimal = ref$2.afterDecimal;
  var addNegation = ref$2.addNegation;
  if (to.end - to.start < from.end - from.start && beforeDecimal === "" && isBeforeDecimalSeparator && !parseFloat(afterDecimal)) {
    value = addNegation ? "-" : "";
  }
  return value;
}
function getCaretBoundary(formattedValue, props) {
  var prefix = props.prefix;
  if (prefix === void 0)
    prefix = "";
  var suffix = props.suffix;
  if (suffix === void 0)
    suffix = "";
  var boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function() {
    return true;
  });
  var hasNegation = formattedValue[0] === "-";
  boundaryAry.fill(false, 0, prefix.length + (hasNegation ? 1 : 0));
  var valLn = formattedValue.length;
  boundaryAry.fill(false, valLn - suffix.length + 1, valLn + 1);
  return boundaryAry;
}
function validateAndUpdateProps(props) {
  var ref = getSeparators(props);
  var thousandSeparator = ref.thousandSeparator;
  var decimalSeparator = ref.decimalSeparator;
  var prefix = props.prefix;
  if (prefix === void 0)
    prefix = "";
  var allowNegative = props.allowNegative;
  if (allowNegative === void 0)
    allowNegative = true;
  if (thousandSeparator === decimalSeparator) {
    throw new Error("\n        Decimal separator can't be same as thousand separator.\n        thousandSeparator: " + thousandSeparator + ' (thousandSeparator = {true} is same as thousandSeparator = ",")\n        decimalSeparator: ' + decimalSeparator + " (default value for decimalSeparator is .)\n     ");
  }
  if (prefix.startsWith("-") && allowNegative) {
    console.error("\n      Prefix can't start with '-' when allowNegative is true.\n      prefix: " + prefix + "\n      allowNegative: " + allowNegative + "\n    ");
    allowNegative = false;
  }
  return Object.assign(Object.assign({}, props), { allowNegative });
}
function useNumericFormat(props) {
  props = validateAndUpdateProps(props);
  var _decimalSeparator = props.decimalSeparator;
  var _allowedDecimalSeparators = props.allowedDecimalSeparators;
  var thousandsGroupStyle = props.thousandsGroupStyle;
  var suffix = props.suffix;
  var allowNegative = props.allowNegative;
  var allowLeadingZeros = props.allowLeadingZeros;
  var onKeyDown = props.onKeyDown;
  if (onKeyDown === void 0)
    onKeyDown = noop4;
  var onBlur = props.onBlur;
  if (onBlur === void 0)
    onBlur = noop4;
  var thousandSeparator = props.thousandSeparator;
  var decimalScale = props.decimalScale;
  var fixedDecimalScale = props.fixedDecimalScale;
  var prefix = props.prefix;
  if (prefix === void 0)
    prefix = "";
  var defaultValue = props.defaultValue;
  var value = props.value;
  var valueIsNumericString = props.valueIsNumericString;
  var onValueChange = props.onValueChange;
  var restProps = __rest2(props, ["decimalSeparator", "allowedDecimalSeparators", "thousandsGroupStyle", "suffix", "allowNegative", "allowLeadingZeros", "onKeyDown", "onBlur", "thousandSeparator", "decimalScale", "fixedDecimalScale", "prefix", "defaultValue", "value", "valueIsNumericString", "onValueChange"]);
  var ref = getSeparators(props);
  var decimalSeparator = ref.decimalSeparator;
  var allowedDecimalSeparators = ref.allowedDecimalSeparators;
  var _format = function(numStr) {
    return format(numStr, props);
  };
  var _removeFormatting = function(inputValue, changeMeta) {
    return removeFormatting(inputValue, changeMeta, props);
  };
  var _value = isNil(value) ? defaultValue : value;
  var _valueIsNumericString = valueIsNumericString !== null && valueIsNumericString !== void 0 ? valueIsNumericString : isNumericString(_value, prefix, suffix);
  if (!isNil(value)) {
    _valueIsNumericString = _valueIsNumericString || typeof value === "number";
  } else if (!isNil(defaultValue)) {
    _valueIsNumericString = _valueIsNumericString || typeof defaultValue === "number";
  }
  var roundIncomingValueToPrecision = function(value2) {
    if (isNotValidValue(value2)) {
      return value2;
    }
    if (typeof value2 === "number") {
      value2 = toNumericString(value2);
    }
    if (_valueIsNumericString && typeof decimalScale === "number") {
      return roundToPrecision(value2, decimalScale, Boolean(fixedDecimalScale));
    }
    return value2;
  };
  var ref$1 = useInternalValues(roundIncomingValueToPrecision(value), roundIncomingValueToPrecision(defaultValue), Boolean(_valueIsNumericString), _format, _removeFormatting, onValueChange);
  var ref$1_0 = ref$1[0];
  var numAsString = ref$1_0.numAsString;
  var formattedValue = ref$1_0.formattedValue;
  var _onValueChange = ref$1[1];
  var _onKeyDown = function(e) {
    var el = e.target;
    var key = e.key;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value2 = el.value;
    if (value2 === void 0)
      value2 = "";
    if (selectionStart !== selectionEnd) {
      onKeyDown(e);
      return;
    }
    if (key === "Backspace" && value2[0] === "-" && selectionStart === prefix.length + 1 && allowNegative) {
      setCaretPosition(el, 1);
    }
    if (decimalScale && fixedDecimalScale) {
      if (key === "Backspace" && value2[selectionStart - 1] === decimalSeparator) {
        setCaretPosition(el, selectionStart - 1);
        e.preventDefault();
      } else if (key === "Delete" && value2[selectionStart] === decimalSeparator) {
        e.preventDefault();
      }
    }
    if ((allowedDecimalSeparators === null || allowedDecimalSeparators === void 0 ? void 0 : allowedDecimalSeparators.includes(key)) && value2[selectionStart] === decimalSeparator) {
      setCaretPosition(el, selectionStart + 1);
    }
    var _thousandSeparator = thousandSeparator === true ? "," : thousandSeparator;
    if (key === "Backspace" && value2[selectionStart - 1] === _thousandSeparator) {
      setCaretPosition(el, selectionStart - 1);
    }
    if (key === "Delete" && value2[selectionStart] === _thousandSeparator) {
      setCaretPosition(el, selectionStart + 1);
    }
    onKeyDown(e);
  };
  var _onBlur = function(e) {
    var _value2 = numAsString;
    if (!_value2.match(/\d/g)) {
      _value2 = "";
    }
    if (!allowLeadingZeros) {
      _value2 = fixLeadingZero(_value2);
    }
    if (fixedDecimalScale && decimalScale) {
      _value2 = roundToPrecision(_value2, decimalScale, fixedDecimalScale);
    }
    if (_value2 !== numAsString) {
      var formattedValue2 = format(_value2, props);
      _onValueChange({
        formattedValue: formattedValue2,
        value: _value2,
        floatValue: parseFloat(_value2)
      }, {
        event: e,
        source: SourceType.event
      });
    }
    onBlur(e);
  };
  var isValidInputCharacter = function(inputChar) {
    if (inputChar === decimalSeparator) {
      return true;
    }
    return charIsNumber(inputChar);
  };
  var isCharacterSame = function(ref2) {
    var currentValue = ref2.currentValue;
    var lastValue = ref2.lastValue;
    var formattedValue2 = ref2.formattedValue;
    var currentValueIndex = ref2.currentValueIndex;
    var formattedValueIndex = ref2.formattedValueIndex;
    var curChar = currentValue[currentValueIndex];
    var newChar = formattedValue2[formattedValueIndex];
    var typedRange = findChangeRange(lastValue, currentValue);
    var to = typedRange.to;
    if (currentValueIndex >= to.start && currentValueIndex < to.end && allowedDecimalSeparators && allowedDecimalSeparators.includes(curChar) && newChar === decimalSeparator) {
      return true;
    }
    return curChar === newChar;
  };
  return Object.assign(Object.assign({}, restProps), {
    value: formattedValue,
    valueIsNumericString: false,
    isValidInputCharacter,
    isCharacterSame,
    onValueChange: _onValueChange,
    format: _format,
    removeFormatting: _removeFormatting,
    getCaretBoundary: function(formattedValue2) {
      return getCaretBoundary(formattedValue2, props);
    },
    onKeyDown: _onKeyDown,
    onBlur: _onBlur
  });
}
function NumericFormat(props) {
  var numericFormatProps = useNumericFormat(props);
  return import_react271.default.createElement(NumberFormatBase, Object.assign({}, numericFormatProps));
}

// node_modules/@mantine/core/esm/components/NumberFormatter/NumberFormatter.mjs
var defaultProps129 = {};
function NumberFormatter(_props) {
  const props = useProps("NumberFormatter", defaultProps129, _props);
  const { value, defaultValue, ...others } = props;
  if (value === void 0) {
    return null;
  }
  return import_react272.default.createElement(NumericFormat, { displayType: "text", value, ...others });
}
var extendNumberFormatter = (c) => c;
NumberFormatter.extend = extendNumberFormatter;
NumberFormatter.displayName = "@mantine/core/NumberFormatter";

// node_modules/@mantine/core/esm/components/NumberInput/NumberInput.mjs
var import_react274 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/NumberInput/NumberInputChevron.mjs
var import_react273 = __toESM(require_react(), 1);
function NumberInputChevron({ direction, style, ...others }) {
  return import_react273.default.createElement(
    "svg",
    {
      style: {
        width: "var(--ni-chevron-size)",
        height: "var(--ni-chevron-size)",
        transform: direction === "up" ? "rotate(180deg)" : void 0,
        ...style
      },
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...others
    },
    import_react273.default.createElement(
      "path",
      {
        d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  );
}

// node_modules/@mantine/core/esm/components/NumberInput/NumberInput.module.css.mjs
var classes56 = { "root": "m-e2f5cd4e", "controls": "m-95e17d22", "control": "m-80b4b171" };

// node_modules/@mantine/core/esm/components/NumberInput/NumberInput.mjs
function isValidNumber(value) {
  return (typeof value === "number" || !Number.isNaN(Number(value))) && !Number.isNaN(value);
}
function getDecrementedValue({ value, min: min2, step = 1, allowNegative }) {
  const nextValue = value - step;
  if (min2 !== void 0 && nextValue < min2) {
    return min2;
  }
  if (!allowNegative && nextValue < 0 && min2 === void 0) {
    return value;
  }
  if (min2 !== void 0 && min2 >= 0 && nextValue <= min2) {
    return nextValue;
  }
  return nextValue;
}
function isInRange(value, min2, max2) {
  if (value === void 0) {
    return true;
  }
  const minValid = min2 === void 0 || value >= min2;
  const maxValid = max2 === void 0 || value <= max2;
  return minValid && maxValid;
}
var defaultProps130 = {
  step: 1,
  clampBehavior: "blur",
  allowDecimal: true,
  allowNegative: true,
  startValue: 0
};
var varsResolver57 = createVarsResolver((_, { size: size2 }) => ({
  controls: {
    "--ni-chevron-size": getSize(size2, "ni-chevron-size")
  }
}));
var NumberInput = factory((_props, ref) => {
  const props = useProps("NumberInput", defaultProps130, _props);
  const {
    className,
    classNames,
    styles,
    unstyled,
    vars,
    onChange,
    onValueChange,
    value,
    defaultValue,
    max: max2,
    min: min2,
    step,
    hideControls,
    rightSection,
    isAllowed,
    clampBehavior,
    onBlur,
    allowDecimal,
    decimalScale,
    onKeyDown,
    handlersRef,
    startValue,
    disabled,
    rightSectionPointerEvents,
    allowNegative,
    readOnly,
    size: size2,
    rightSectionWidth,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "NumberInput",
    classes: classes56,
    props,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver57
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    onChange
  });
  const handleValueChange = (payload, event) => {
    if (event.source === "event") {
      setValue(isValidNumber(payload.floatValue) ? payload.floatValue : payload.value);
    }
    onValueChange == null ? void 0 : onValueChange(payload, event);
  };
  const increment = () => {
    if (typeof _value !== "number" || Number.isNaN(_value)) {
      setValue(min2 ?? clamp(startValue, min2, max2));
    } else if (max2 !== void 0) {
      setValue(_value + step <= max2 ? _value + step : max2);
    } else {
      setValue(_value + step);
    }
  };
  const decrement = () => {
    if (typeof _value !== "number" || Number.isNaN(_value)) {
      setValue(max2 ?? clamp(startValue, min2, max2));
    } else {
      setValue(getDecrementedValue({ value: _value, min: min2, step, allowNegative }));
    }
  };
  const handleKeyDown = (event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (readOnly) {
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      increment();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      decrement();
    }
  };
  assignRef(handlersRef, { increment, decrement });
  const controls = import_react274.default.createElement("div", { ...getStyles2("controls") }, import_react274.default.createElement(
    UnstyledButton,
    {
      ...getStyles2("control"),
      tabIndex: -1,
      "aria-hidden": true,
      disabled: disabled || typeof _value === "number" && max2 !== void 0 && _value >= max2,
      mod: { direction: "up" },
      onMouseDown: (event) => event.preventDefault(),
      onPointerDown: increment
    },
    import_react274.default.createElement(NumberInputChevron, { direction: "up" })
  ), import_react274.default.createElement(
    UnstyledButton,
    {
      ...getStyles2("control"),
      tabIndex: -1,
      "aria-hidden": true,
      disabled: disabled || typeof _value === "number" && min2 !== void 0 && _value <= min2,
      mod: { direction: "down" },
      onMouseDown: (event) => event.preventDefault(),
      onPointerDown: decrement
    },
    import_react274.default.createElement(NumberInputChevron, { direction: "down" })
  ));
  return import_react274.default.createElement(
    InputBase,
    {
      component: NumericFormat,
      allowNegative,
      className: clsx_default(classes56.root, className),
      size: size2,
      ...others,
      readOnly,
      disabled,
      value: _value,
      getInputRef: ref,
      onValueChange: handleValueChange,
      rightSection: hideControls || readOnly ? rightSection : rightSection || controls,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      unstyled,
      __staticSelector: "NumberInput",
      decimalScale: allowDecimal ? decimalScale : 0,
      onKeyDown: handleKeyDown,
      rightSectionPointerEvents: rightSectionPointerEvents ?? disabled ? "none" : void 0,
      rightSectionWidth: rightSectionWidth ?? `var(--ni-right-section-width-${size2 || "sm"})`,
      onBlur: (event) => {
        onBlur == null ? void 0 : onBlur(event);
        if (clampBehavior === "blur" && typeof _value === "number") {
          const clampedValue = clamp(_value, min2, max2);
          if (clampedValue !== _value) {
            setValue(clamp(_value, min2, max2));
          }
        }
      },
      isAllowed: (val) => {
        if (clampBehavior === "strict") {
          if (isAllowed) {
            return isAllowed(val) && isInRange(val.floatValue, min2, max2);
          }
          return isInRange(val.floatValue, min2, max2);
        }
        return isAllowed ? isAllowed(val) : true;
      }
    }
  );
});
NumberInput.classes = { ...InputBase.classes, ...classes56 };
NumberInput.displayName = "@mantine/core/NumberInput";

// node_modules/@mantine/core/esm/components/Pagination/Pagination.mjs
var import_react282 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Pagination/PaginationRoot/PaginationRoot.mjs
var import_react276 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Pagination/Pagination.context.mjs
var import_react275 = __toESM(require_react(), 1);
var [PaginationProvider, usePaginationContext] = createSafeContext(
  "Pagination.Root component was not found in tree"
);

// node_modules/@mantine/core/esm/components/Pagination/Pagination.module.css.mjs
var classes57 = { "root": "m-4addd315", "control": "m-326d024a", "dots": "m-4ad7767d" };

// node_modules/@mantine/core/esm/components/Pagination/PaginationRoot/PaginationRoot.mjs
var defaultProps131 = {
  siblings: 1,
  boundaries: 1
};
var varsResolver58 = createVarsResolver(
  (theme, { size: size2, radius, color }) => ({
    root: {
      "--pagination-control-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--pagination-control-size": getSize(size2, "pagination-control-size"),
      "--pagination-control-fz": getFontSize(size2),
      "--pagination-active-bg": color ? getThemeColor(color, theme) : void 0
    }
  })
);
var PaginationRoot = factory((_props, ref) => {
  const props = useProps("PaginationRoot", defaultProps131, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    total,
    value,
    defaultValue,
    onChange,
    disabled,
    siblings,
    boundaries,
    color,
    radius,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    getItemProps,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Pagination",
    classes: classes57,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver58
  });
  const { range, setPage, next, previous, active, first, last } = usePagination({
    page: value,
    initialPage: defaultValue,
    onChange,
    total,
    siblings,
    boundaries
  });
  const handleNextPage = createEventHandler(onNextPage, next);
  const handlePreviousPage = createEventHandler(onPreviousPage, previous);
  const handleFirstPage = createEventHandler(onFirstPage, first);
  const handleLastPage = createEventHandler(onLastPage, last);
  return import_react276.default.createElement(
    PaginationProvider,
    {
      value: {
        total,
        range,
        active,
        disabled,
        getItemProps,
        onChange: setPage,
        onNext: handleNextPage,
        onPrevious: handlePreviousPage,
        onFirst: handleFirstPage,
        onLast: handleLastPage,
        getStyles: getStyles2
      }
    },
    import_react276.default.createElement(Box, { ref, ...getStyles2("root"), ...others })
  );
});
PaginationRoot.classes = classes57;
PaginationRoot.displayName = "@mantine/core/PaginationRoot";

// node_modules/@mantine/core/esm/components/Pagination/PaginationControl/PaginationControl.mjs
var import_react277 = __toESM(require_react(), 1);
var defaultProps132 = {
  withPadding: true
};
var PaginationControl = factory((_props, ref) => {
  const props = useProps("PaginationControl", defaultProps132, _props);
  const { classNames, className, style, styles, vars, active, disabled, withPadding, ...others } = props;
  const ctx = usePaginationContext();
  const _disabled = disabled || ctx.disabled;
  return import_react277.default.createElement(
    UnstyledButton,
    {
      ref,
      disabled: _disabled,
      mod: { active, disabled: _disabled, "with-padding": withPadding },
      ...ctx.getStyles("control", { className, style, classNames, styles, active: !_disabled }),
      ...others
    }
  );
});
PaginationControl.classes = classes57;
PaginationControl.displayName = "@mantine/core/PaginationControl";

// node_modules/@mantine/core/esm/components/Pagination/PaginationDots/PaginationDots.mjs
var import_react279 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Pagination/Pagination.icons.mjs
var import_react278 = __toESM(require_react(), 1);
function PaginationIcon({ style, children, path, ...others }) {
  return import_react278.default.createElement(
    "svg",
    {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        width: "calc(var(--pagination-control-size) / 1.8)",
        height: "calc(var(--pagination-control-size) / 1.8)",
        ...style
      },
      ...others
    },
    import_react278.default.createElement("path", { d: path, fill: "currentColor" })
  );
}
var PaginationNextIcon = (props) => import_react278.default.createElement(
  PaginationIcon,
  {
    ...props,
    path: "M8.781 8l-3.3-3.3.943-.943L10.667 8l-4.243 4.243-.943-.943 3.3-3.3z"
  }
);
var PaginationPreviousIcon = (props) => import_react278.default.createElement(
  PaginationIcon,
  {
    ...props,
    path: "M7.219 8l3.3 3.3-.943.943L5.333 8l4.243-4.243.943.943-3.3 3.3z"
  }
);
var PaginationFirstIcon = (props) => import_react278.default.createElement(
  PaginationIcon,
  {
    ...props,
    path: "M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
  }
);
var PaginationLastIcon = (props) => import_react278.default.createElement(
  PaginationIcon,
  {
    ...props,
    path: "M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
  }
);
var PaginationDotsIcon = (props) => import_react278.default.createElement(
  PaginationIcon,
  {
    ...props,
    path: "M2 8c0-.733.6-1.333 1.333-1.333.734 0 1.334.6 1.334 1.333s-.6 1.333-1.334 1.333C2.6 9.333 2 8.733 2 8zm9.333 0c0-.733.6-1.333 1.334-1.333C13.4 6.667 14 7.267 14 8s-.6 1.333-1.333 1.333c-.734 0-1.334-.6-1.334-1.333zM6.667 8c0-.733.6-1.333 1.333-1.333s1.333.6 1.333 1.333S8.733 9.333 8 9.333 6.667 8.733 6.667 8z"
  }
);

// node_modules/@mantine/core/esm/components/Pagination/PaginationDots/PaginationDots.mjs
var defaultProps133 = {
  icon: PaginationDotsIcon
};
var PaginationDots = factory((_props, ref) => {
  const props = useProps("PaginationDots", defaultProps133, _props);
  const { classNames, className, style, styles, vars, icon, ...others } = props;
  const ctx = usePaginationContext();
  const Icon = icon;
  return import_react279.default.createElement(Box, { ref, ...ctx.getStyles("dots", { className, style, styles, classNames }), ...others }, import_react279.default.createElement(
    Icon,
    {
      style: {
        width: "calc(var(--pagination-control-size) / 1.8)",
        height: "calc(var(--pagination-control-size) / 1.8)"
      }
    }
  ));
});
PaginationDots.classes = classes57;
PaginationDots.displayName = "@mantine/core/PaginationDots";

// node_modules/@mantine/core/esm/components/Pagination/PaginationEdges/PaginationEdges.mjs
var import_react280 = __toESM(require_react(), 1);
function createEdgeComponent({ icon, name, action, type }) {
  const defaultProps174 = { icon };
  const Component = (0, import_react280.forwardRef)((props, ref) => {
    const { icon: _icon, ...others } = useProps(name, defaultProps174, props);
    const Icon = _icon;
    const ctx = usePaginationContext();
    const disabled = type === "next" ? ctx.active === ctx.total : ctx.active === 1;
    return import_react280.default.createElement(
      PaginationControl,
      {
        disabled: ctx.disabled || disabled,
        ref,
        onClick: ctx[action],
        withPadding: false,
        ...others
      },
      import_react280.default.createElement(
        Icon,
        {
          style: {
            width: "calc(var(--pagination-control-size) / 1.8)",
            height: "calc(var(--pagination-control-size) / 1.8)"
          }
        }
      )
    );
  });
  Component.displayName = `@mantine/core/${name}`;
  return createPolymorphicComponent(Component);
}
var PaginationNext = createEdgeComponent({
  icon: PaginationNextIcon,
  name: "PaginationNext",
  action: "onNext",
  type: "next"
});
var PaginationPrevious = createEdgeComponent({
  icon: PaginationPreviousIcon,
  name: "PaginationPrevious",
  action: "onPrevious",
  type: "previous"
});
var PaginationFirst = createEdgeComponent({
  icon: PaginationFirstIcon,
  name: "PaginationFirst",
  action: "onFirst",
  type: "previous"
});
var PaginationLast = createEdgeComponent({
  icon: PaginationLastIcon,
  name: "PaginationLast",
  action: "onLast",
  type: "next"
});

// node_modules/@mantine/core/esm/components/Pagination/PaginationItems/PaginationItems.mjs
var import_react281 = __toESM(require_react(), 1);
function PaginationItems({ dotsIcon }) {
  const ctx = usePaginationContext();
  const items = ctx.range.map((page, index5) => {
    var _a;
    if (page === "dots") {
      return import_react281.default.createElement(PaginationDots, { icon: dotsIcon, key: index5 });
    }
    return import_react281.default.createElement(
      PaginationControl,
      {
        key: index5,
        active: page === ctx.active,
        "aria-current": page === ctx.active ? "page" : void 0,
        onClick: () => ctx.onChange(page),
        disabled: ctx.disabled,
        ...(_a = ctx.getItemProps) == null ? void 0 : _a.call(ctx, page)
      },
      page
    );
  });
  return import_react281.default.createElement(import_react281.default.Fragment, null, items);
}
PaginationItems.displayName = "@mantine/core/PaginationItems";

// node_modules/@mantine/core/esm/components/Pagination/Pagination.mjs
var defaultProps134 = {
  withControls: true,
  siblings: 1,
  boundaries: 1,
  gap: 8
};
var Pagination = factory((_props, ref) => {
  const props = useProps("Pagination", defaultProps134, _props);
  const {
    withEdges,
    withControls,
    getControlProps,
    nextIcon,
    previousIcon,
    lastIcon,
    firstIcon,
    dotsIcon,
    total,
    gap,
    ...others
  } = props;
  if (total <= 0) {
    return null;
  }
  return import_react282.default.createElement(PaginationRoot, { ref, total, ...others }, import_react282.default.createElement(Group, { gap }, withEdges && import_react282.default.createElement(PaginationFirst, { icon: firstIcon, ...getControlProps == null ? void 0 : getControlProps("first") }), withControls && import_react282.default.createElement(PaginationPrevious, { icon: previousIcon, ...getControlProps == null ? void 0 : getControlProps("previous") }), import_react282.default.createElement(PaginationItems, { dotsIcon }), withControls && import_react282.default.createElement(PaginationNext, { icon: nextIcon, ...getControlProps == null ? void 0 : getControlProps("next") }), withEdges && import_react282.default.createElement(PaginationLast, { icon: lastIcon, ...getControlProps == null ? void 0 : getControlProps("last") })));
});
Pagination.classes = classes57;
Pagination.displayName = "@mantine/core/Pagination";
Pagination.Root = PaginationRoot;
Pagination.Control = PaginationControl;
Pagination.Dots = PaginationDots;
Pagination.First = PaginationFirst;
Pagination.Last = PaginationLast;
Pagination.Next = PaginationNext;
Pagination.Previous = PaginationPrevious;
Pagination.Items = PaginationItems;

// node_modules/@mantine/core/esm/components/PasswordInput/PasswordInput.mjs
var import_react284 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/PasswordInput/PasswordToggleIcon.mjs
var import_react283 = __toESM(require_react(), 1);
var PasswordToggleIcon = ({
  reveal
}) => import_react283.default.createElement(
  "svg",
  {
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { width: "var(--psi-icon-size)", height: "var(--psi-icon-size)" }
  },
  import_react283.default.createElement(
    "path",
    {
      d: reveal ? "M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z" : "M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z",
      fill: "currentColor",
      fillRule: "evenodd",
      clipRule: "evenodd"
    }
  )
);

// node_modules/@mantine/core/esm/components/PasswordInput/PasswordInput.module.css.mjs
var classes58 = { "root": "m-f61ca620", "input": "m-ccf8da4c", "innerInput": "m-f2d85dd2", "visibilityToggle": "m-b1072d44" };

// node_modules/@mantine/core/esm/components/PasswordInput/PasswordInput.mjs
var defaultProps135 = {
  visibilityToggleIcon: PasswordToggleIcon
};
var varsResolver59 = createVarsResolver((_, { size: size2 }) => ({
  root: {
    "--psi-icon-size": getSize(size2, "psi-icon-size"),
    "--psi-button-size": getSize(size2, "psi-button-size")
  }
}));
var PasswordInput = factory((_props, ref) => {
  const props = useProps("PasswordInput", defaultProps135, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    required,
    error,
    leftSection,
    disabled,
    id,
    variant,
    inputContainer,
    description,
    label,
    size: size2,
    errorProps,
    descriptionProps,
    labelProps,
    withAsterisk,
    inputWrapperOrder,
    wrapperProps,
    radius,
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents,
    leftSectionWidth,
    visible,
    defaultVisible,
    onVisibilityChange,
    visibilityToggleIcon,
    visibilityToggleButtonProps,
    rightSectionProps,
    leftSectionProps,
    leftSectionPointerEvents,
    ...others
  } = props;
  const uuid = useId(id);
  const [_visible, setVisibility] = useUncontrolled({
    value: visible,
    defaultValue: defaultVisible,
    finalValue: false,
    onChange: onVisibilityChange
  });
  const toggleVisibility = () => setVisibility(!_visible);
  const getStyles2 = useStyles({
    name: "PasswordInput",
    classes: classes58,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver59
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const { styleProps, rest } = extractStyleProps(others);
  const VisibilityToggleIcon = visibilityToggleIcon;
  const visibilityToggleButton = import_react284.default.createElement(
    ActionIcon,
    {
      ...getStyles2("visibilityToggle"),
      disabled,
      radius,
      "aria-hidden": !visibilityToggleButtonProps,
      tabIndex: -1,
      ...visibilityToggleButtonProps,
      variant: "subtle",
      color: "gray",
      unstyled,
      onMouseDown: (event) => {
        var _a;
        event.preventDefault();
        (_a = visibilityToggleButtonProps == null ? void 0 : visibilityToggleButtonProps.onMouseDown) == null ? void 0 : _a.call(visibilityToggleButtonProps, event);
        toggleVisibility();
      },
      onKeyDown: (event) => {
        var _a;
        (_a = visibilityToggleButtonProps == null ? void 0 : visibilityToggleButtonProps.onKeyDown) == null ? void 0 : _a.call(visibilityToggleButtonProps, event);
        if (event.key === " ") {
          event.preventDefault();
          toggleVisibility();
        }
      }
    },
    import_react284.default.createElement(VisibilityToggleIcon, { reveal: _visible })
  );
  return import_react284.default.createElement(
    Input.Wrapper,
    {
      required,
      id: uuid,
      label,
      error,
      description,
      size: size2,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      __staticSelector: "PasswordInput",
      errorProps,
      descriptionProps,
      unstyled,
      withAsterisk,
      inputWrapperOrder,
      inputContainer,
      variant,
      labelProps: { ...labelProps, htmlFor: uuid },
      ...getStyles2("root"),
      ...styleProps,
      ...wrapperProps
    },
    import_react284.default.createElement(
      Input,
      {
        component: "div",
        error,
        leftSection,
        size: size2,
        classNames: { ...resolvedClassNames, input: clsx_default(classes58.input, resolvedClassNames.input) },
        styles: resolvedStyles,
        radius,
        disabled,
        __staticSelector: "PasswordInput",
        rightSectionWidth,
        rightSection: rightSection ?? visibilityToggleButton,
        variant,
        unstyled,
        leftSectionWidth,
        rightSectionPointerEvents: rightSectionPointerEvents || "all",
        rightSectionProps,
        leftSectionProps,
        leftSectionPointerEvents,
        withAria: false
      },
      import_react284.default.createElement(
        "input",
        {
          required,
          "data-invalid": !!error || void 0,
          "data-with-left-section": !!leftSection || void 0,
          ...getStyles2("innerInput"),
          disabled,
          id: uuid,
          ref,
          ...rest,
          autoComplete: rest.autoComplete || "off",
          type: _visible ? "text" : "password"
        }
      )
    )
  );
});
PasswordInput.classes = { ...InputBase.classes, ...classes58 };
PasswordInput.displayName = "@mantine/core/PasswordInput";

// node_modules/@mantine/core/esm/components/PinInput/PinInput.mjs
var import_react285 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/PinInput/create-pin-array/create-pin-array.mjs
function createPinArray(length, value) {
  if (length < 1) {
    return [];
  }
  const values = new Array(length).fill("");
  if (value) {
    const splitted = value.trim().split("");
    for (let i = 0; i < Math.min(length, splitted.length); i += 1) {
      values[i] = splitted[i];
    }
  }
  return values;
}

// node_modules/@mantine/core/esm/components/PinInput/PinInput.module.css.mjs
var classes59 = { "root": "m-f1cb205a", "pinInput": "m-cb288ead" };

// node_modules/@mantine/core/esm/components/PinInput/PinInput.mjs
var regex = {
  number: /^[0-9]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/i
};
var defaultProps136 = {
  gap: "sm",
  length: 4,
  manageFocus: true,
  oneTimeCode: true,
  placeholder: "○",
  type: "alphanumeric",
  ariaLabel: "PinInput"
};
var varsResolver60 = createVarsResolver((_, { size: size2 }) => ({
  root: {
    "--pin-input-size": getSize(size2 ?? defaultProps136.size, "pin-input-size")
  }
}));
var PinInput = factory((props, ref) => {
  const {
    name,
    form,
    className,
    value,
    defaultValue,
    variant,
    gap,
    style,
    size: size2,
    classNames,
    styles,
    unstyled,
    length,
    onChange,
    onComplete,
    manageFocus,
    autoFocus,
    error,
    radius,
    disabled,
    oneTimeCode,
    placeholder,
    type,
    mask,
    readOnly,
    inputType,
    inputMode,
    ariaLabel,
    vars,
    id,
    hiddenInputProps,
    ...others
  } = useProps("PinInput", defaultProps136, props);
  const uuid = useId(id);
  const getStyles2 = useStyles({
    name: "PinInput",
    classes: classes59,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver60
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const [focusedIndex, setFocusedIndex] = (0, import_react285.useState)(-1);
  const [_value, setValues] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const inputsRef = (0, import_react285.useRef)([]);
  const validate = (code) => {
    const re = type instanceof RegExp ? type : type && type in regex ? regex[type] : null;
    return re == null ? void 0 : re.test(code);
  };
  const focusInputField = (dir, index5) => {
    if (!manageFocus)
      return;
    if (dir === "next") {
      const nextIndex = index5 + 1;
      inputsRef.current[nextIndex < (length ?? 0) ? nextIndex : index5].focus();
    }
    if (dir === "prev") {
      const nextIndex = index5 - 1;
      inputsRef.current[nextIndex > -1 ? nextIndex : index5].focus();
    }
  };
  const setFieldValue = (val, index5) => {
    const values = [...createPinArray(length ?? 0, _value)];
    values[index5] = val;
    setValues(values.join(""));
  };
  const handleChange = (event, index5) => {
    const inputValue = event.target.value;
    const nextCharOrValue = inputValue.length === 2 ? inputValue.split("")[inputValue.length - 1] : inputValue;
    const isValid = validate(nextCharOrValue);
    if (nextCharOrValue.length < 2) {
      if (isValid) {
        setFieldValue(nextCharOrValue, index5);
        focusInputField("next", index5);
      } else {
        setFieldValue("", index5);
      }
    } else if (isValid) {
      setValues(inputValue);
    }
  };
  const handleKeyDown = (event, index5) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusInputField("prev", index5);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusInputField("next", index5);
    } else if (event.key === "Delete") {
      event.preventDefault();
      setFieldValue("", index5);
    } else if (event.key === "Backspace") {
      event.preventDefault();
      setFieldValue("", index5);
      if (length === index5 + 1) {
        if (event.target.value === "") {
          focusInputField("prev", index5);
        }
      } else {
        focusInputField("prev", index5);
      }
    }
  };
  const handleFocus = (event, index5) => {
    event.target.select();
    setFocusedIndex(index5);
  };
  const handleBlur = () => {
    setFocusedIndex(-1);
  };
  const handlePaste = (event) => {
    event.preventDefault();
    const copyValue = event.clipboardData.getData("Text");
    const isValid = validate(copyValue);
    if (isValid) {
      setValues(copyValue);
    }
  };
  (0, import_react285.useEffect)(() => {
    if (_value.length !== length)
      return;
    onComplete == null ? void 0 : onComplete(_value);
  }, [_value]);
  return import_react285.default.createElement(import_react285.default.Fragment, null, import_react285.default.createElement(
    Group,
    {
      ...others,
      ...getStyles2("root"),
      role: "group",
      id: uuid,
      gap,
      ref,
      unstyled,
      wrap: "nowrap",
      variant,
      __size: size2
    },
    createPinArray(length ?? 0, _value).map((char, index5) => import_react285.default.createElement(
      Input,
      {
        component: "input",
        ...getStyles2("pinInput", {
          style: {
            "--_input-padding": "0",
            "--_input-text-align": "center"
          }
        }),
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        size: size2,
        __staticSelector: "PinInput",
        id: `${uuid}-${index5 + 1}`,
        key: `${uuid}-${index5}`,
        inputMode: inputMode || (type === "number" ? "numeric" : "text"),
        onChange: (event) => handleChange(event, index5),
        onKeyDown: (event) => handleKeyDown(event, index5),
        onFocus: (event) => handleFocus(event, index5),
        onBlur: handleBlur,
        onPaste: handlePaste,
        type: inputType || (mask ? "password" : type === "number" ? "tel" : "text"),
        radius,
        error,
        variant,
        disabled,
        ref: (node) => {
          inputsRef.current[index5] = node;
        },
        autoComplete: oneTimeCode ? "one-time-code" : "off",
        placeholder: focusedIndex === index5 ? "" : placeholder,
        value: char,
        autoFocus: autoFocus && index5 === 0,
        unstyled,
        "aria-label": ariaLabel,
        readOnly
      }
    ))
  ), import_react285.default.createElement("input", { type: "hidden", name, form, value: _value, ...hiddenInputProps }));
});
PinInput.classes = { ...classes59, ...InputBase.classes };
PinInput.displayName = "@mantine/core/PinInput";

// node_modules/@mantine/core/esm/components/Progress/Progress.mjs
var import_react290 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Progress/ProgressRoot/ProgressRoot.mjs
var import_react287 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Progress/Progress.context.mjs
var import_react286 = __toESM(require_react(), 1);
var [ProgressProvider, useProgressContext] = createSafeContext(
  "Progress.Root component was not found in tree"
);

// node_modules/@mantine/core/esm/components/Progress/Progress.module.css.mjs
var classes60 = { "root": "m-db6d6462", "section": "m-2242eb65", "stripes-animation": "m-81a374bd", "label": "m-91e40b74" };

// node_modules/@mantine/core/esm/components/Progress/ProgressRoot/ProgressRoot.mjs
var defaultProps137 = {};
var varsResolver61 = createVarsResolver((_, { size: size2, radius }) => ({
  root: {
    "--progress-size": getSize(size2, "progress-size"),
    "--progress-radius": radius === void 0 ? void 0 : getRadius(radius)
  }
}));
var ProgressRoot = factory((_props, ref) => {
  const props = useProps("ProgressRoot", defaultProps137, _props);
  const { classNames, className, style, styles, unstyled, vars, ...others } = props;
  const getStyles2 = useStyles({
    name: "Progress",
    classes: classes60,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver61
  });
  return import_react287.default.createElement(ProgressProvider, { value: { getStyles: getStyles2 } }, import_react287.default.createElement(Box, { ref, ...getStyles2("root"), ...others }));
});
ProgressRoot.classes = classes60;
ProgressRoot.displayName = "@mantine/core/ProgressRoot";

// node_modules/@mantine/core/esm/components/Progress/ProgressSection/ProgressSection.mjs
var import_react288 = __toESM(require_react(), 1);
var defaultProps138 = {
  withAria: true
};
var ProgressSection = factory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    value,
    withAria,
    color,
    striped,
    animated,
    ...others
  } = useProps("ProgressSection", defaultProps138, props);
  const ctx = useProgressContext();
  const theme = useMantineTheme();
  const ariaAttributes = withAria ? {
    role: "progressbar",
    "aria-valuemax": 100,
    "aria-valuemin": 0,
    "aria-valuenow": value,
    "aria-valuetext": `${value}%`
  } : {};
  return import_react288.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("section", { className, classNames, styles, style }),
      ...others,
      ...ariaAttributes,
      mod: { striped: striped || animated, animated },
      __vars: {
        "--progress-section-width": `${value}%`,
        "--progress-section-color": getThemeColor(color, theme)
      }
    }
  );
});
ProgressSection.classes = classes60;
ProgressSection.displayName = "@mantine/core/ProgressSection";

// node_modules/@mantine/core/esm/components/Progress/ProgressLabel/ProgressLabel.mjs
var import_react289 = __toESM(require_react(), 1);
var defaultProps139 = {};
var ProgressLabel = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "ProgressLabel",
    defaultProps139,
    props
  );
  const ctx = useProgressContext();
  return import_react289.default.createElement(
    Box,
    {
      ref,
      ...ctx.getStyles("label", { className, style, classNames, styles }),
      ...others
    }
  );
});
ProgressLabel.classes = classes60;
ProgressLabel.displayName = "@mantine/core/ProgressLabel";

// node_modules/@mantine/core/esm/components/Progress/Progress.mjs
var defaultProps140 = {};
var Progress = factory((_props, ref) => {
  const props = useProps("Progress", defaultProps140, _props);
  const {
    value,
    classNames,
    styles,
    vars,
    color,
    striped,
    animated,
    "aria-label": label,
    ...others
  } = props;
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  return import_react290.default.createElement(
    ProgressRoot,
    {
      ref,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      vars,
      ...others
    },
    import_react290.default.createElement(
      ProgressSection,
      {
        value,
        color,
        striped,
        animated,
        "aria-label": label
      }
    )
  );
});
Progress.classes = classes60;
Progress.displayName = "@mantine/core/Progress";
Progress.Section = ProgressSection;
Progress.Root = ProgressRoot;
Progress.Label = ProgressLabel;

// node_modules/@mantine/core/esm/components/Radio/Radio.mjs
var import_react294 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Radio/RadioIcon.mjs
var import_react291 = __toESM(require_react(), 1);
function RadioIcon({ size: size2, style, ...others }) {
  return import_react291.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 5 5",
      style: { width: rem(size2), height: rem(size2), ...style },
      "aria-hidden": true,
      ...others
    },
    import_react291.default.createElement("circle", { cx: "2.5", cy: "2.5", r: "2.5", fill: "currentColor" })
  );
}

// node_modules/@mantine/core/esm/components/Radio/RadioGroup/RadioGroup.mjs
var import_react293 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Radio/RadioGroup.context.mjs
var import_react292 = __toESM(require_react(), 1);
var [RadioGroupProvider, useRadioGroupContext] = createOptionalContext();

// node_modules/@mantine/core/esm/components/Radio/RadioGroup/RadioGroup.mjs
var defaultProps141 = {};
var RadioGroup = factory((props, ref) => {
  const { value, defaultValue, onChange, size: size2, wrapperProps, children, name, ...others } = useProps(
    "RadioGroup",
    defaultProps141,
    props
  );
  const _name = useId(name);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const handleChange = (event) => setValue(event.currentTarget.value);
  return import_react293.default.createElement(RadioGroupProvider, { value: { value: _value, onChange: handleChange, size: size2, name: _name } }, import_react293.default.createElement(
    Input.Wrapper,
    {
      size: size2,
      ref,
      ...wrapperProps,
      ...others,
      labelElement: "div",
      __staticSelector: "RadioGroup"
    },
    import_react293.default.createElement(InputsGroupFieldset, { role: "radiogroup" }, children)
  ));
});
RadioGroup.classes = Input.Wrapper.classes;
RadioGroup.displayName = "@mantine/core/RadioGroup";

// node_modules/@mantine/core/esm/components/Radio/Radio.module.css.mjs
var classes61 = { "root": "m-f3f1af94", "inner": "m-89c4f5e4", "icon": "m-f3ed6b2b", "radio": "m-8a3dbb89", "radio--outline": "m-1bfe9d39" };

// node_modules/@mantine/core/esm/components/Radio/Radio.mjs
var defaultProps142 = {
  labelPosition: "right"
};
var varsResolver62 = createVarsResolver(
  (theme, { size: size2, radius, color, iconColor, variant }) => {
    const parsedColor = parseThemeColor({ color: color || theme.primaryColor, theme });
    const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
    return {
      root: {
        "--radio-size": getSize(size2, "radio-size"),
        "--radio-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--radio-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
        "--radio-icon-color": iconColor ? getThemeColor(iconColor, theme) : void 0,
        "--radio-icon-size": getSize(size2, "radio-icon-size")
      }
    };
  }
);
var Radio = factory((_props, ref) => {
  const props = useProps("Radio", defaultProps142, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    id,
    size: size2,
    label,
    labelPosition,
    description,
    error,
    radius,
    color,
    variant,
    disabled,
    wrapperProps,
    icon: Icon = RadioIcon,
    rootRef,
    iconColor,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Radio",
    classes: classes61,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver62
  });
  const ctx = useRadioGroupContext();
  const contextSize = (ctx == null ? void 0 : ctx.size) ?? size2;
  const componentSize = props.size ? size2 : contextSize;
  const { styleProps, rest } = extractStyleProps(others);
  const uuid = useId(id);
  const contextProps = ctx ? {
    checked: ctx.value === rest.value,
    name: rest.name ?? ctx.name,
    onChange: ctx.onChange
  } : {};
  return import_react294.default.createElement(
    InlineInput,
    {
      ...getStyles2("root"),
      __staticSelector: "Radio",
      __stylesApiProps: props,
      id: uuid,
      size: componentSize,
      labelPosition,
      label,
      description,
      error,
      disabled,
      classNames,
      styles,
      unstyled,
      "data-checked": contextProps.checked || void 0,
      variant,
      ref: rootRef,
      ...styleProps,
      ...wrapperProps
    },
    import_react294.default.createElement(Box, { ...getStyles2("inner"), mod: { "label-position": labelPosition } }, import_react294.default.createElement(
      Box,
      {
        ...getStyles2("radio", { focusable: true, variant }),
        ...rest,
        ...contextProps,
        component: "input",
        mod: { error: !!error },
        ref,
        id: uuid,
        disabled,
        type: "radio"
      }
    ), import_react294.default.createElement(Icon, { ...getStyles2("icon"), "aria-hidden": true }))
  );
});
Radio.classes = classes61;
Radio.displayName = "@mantine/core/Radio";
Radio.Group = RadioGroup;

// node_modules/@mantine/core/esm/components/Rating/Rating.mjs
var import_react299 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Rating/Rating.context.mjs
var import_react295 = __toESM(require_react(), 1);
var [RatingProvider, useRatingContext] = createSafeContext(
  "Rating was not found in tree"
);

// node_modules/@mantine/core/esm/components/Rating/Rating.module.css.mjs
var classes62 = { "root": "m-f8d312f2", "symbolGroup": "m-61734bb7", "starSymbol": "m-5662a89a", "input": "m-211007ba", "label": "m-21342ee4", "symbolBody": "m-fae05d6a" };

// node_modules/@mantine/core/esm/components/Rating/RatingItem/RatingItem.mjs
var import_react298 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Rating/StarSymbol/StarSymbol.mjs
var import_react297 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Rating/StarSymbol/StarIcon.mjs
var import_react296 = __toESM(require_react(), 1);
function StarIcon(props) {
  const { width, height, style, ...others } = props;
  return import_react296.default.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { width, height, ...style },
      ...others
    },
    import_react296.default.createElement("path", { d: "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" })
  );
}
StarIcon.displayName = "@mantine/core/StarIcon";

// node_modules/@mantine/core/esm/components/Rating/StarSymbol/StarSymbol.mjs
function StarSymbol({ type }) {
  const ctx = useRatingContext();
  return import_react297.default.createElement(StarIcon, { ...ctx.getStyles("starSymbol"), "data-filled": type === "full" || void 0 });
}
StarSymbol.displayName = "@mantine/core/StarSymbol";

// node_modules/@mantine/core/esm/components/Rating/RatingItem/RatingItem.mjs
function RatingItem({
  size: size2,
  getSymbolLabel,
  emptyIcon,
  fullIcon,
  full,
  active,
  value,
  readOnly,
  fractionValue,
  color,
  id,
  onBlur,
  onChange,
  onInputChange,
  style,
  ...others
}) {
  var _a;
  const ctx = useRatingContext();
  const _fullIcon = typeof fullIcon === "function" ? fullIcon(value) : fullIcon;
  const _emptyIcon = typeof emptyIcon === "function" ? emptyIcon(value) : emptyIcon;
  const { dir } = useDirection();
  return import_react298.default.createElement(import_react298.default.Fragment, null, !readOnly && import_react298.default.createElement(
    "input",
    {
      ...ctx.getStyles("input"),
      onKeyDown: (event) => event.key === " " && onChange(value),
      id,
      type: "radio",
      "data-active": active || void 0,
      "aria-label": getSymbolLabel == null ? void 0 : getSymbolLabel(value),
      value,
      onBlur,
      onChange: onInputChange,
      ...others
    }
  ), import_react298.default.createElement(
    Box,
    {
      component: readOnly ? "div" : "label",
      ...ctx.getStyles("label"),
      "data-read-only": readOnly || void 0,
      htmlFor: id,
      onClick: () => onChange(value),
      __vars: {
        "--rating-item-z-index": (_a = fractionValue === 1 ? void 0 : active ? 2 : 0) == null ? void 0 : _a.toString()
      }
    },
    import_react298.default.createElement(
      Box,
      {
        ...ctx.getStyles("symbolBody"),
        __vars: {
          "--rating-symbol-clip-path": fractionValue === 1 ? void 0 : dir === "ltr" ? `inset(0 ${active ? 100 - fractionValue * 100 : 100}% 0 0)` : `inset(0 0 0 ${active ? 100 - fractionValue * 100 : 100}% )`
        }
      },
      full ? _fullIcon || import_react298.default.createElement(StarSymbol, { type: "full" }) : _emptyIcon || import_react298.default.createElement(StarSymbol, { type: "empty" })
    )
  ));
}
RatingItem.displayName = "@mantine/core/RatingItem";

// node_modules/@mantine/core/esm/components/Rating/Rating.mjs
function roundValueTo(value, to) {
  var _a;
  const rounded = Math.round(value / to) * to;
  const precision = ((_a = `${to}`.split(".")[1]) == null ? void 0 : _a.length) || 0;
  return Number(rounded.toFixed(precision));
}
var defaultProps143 = {
  size: "sm",
  getSymbolLabel: (value) => `${value}`,
  count: 5,
  fractions: 1,
  color: "yellow"
};
var varsResolver63 = createVarsResolver((theme, { size: size2, color }) => ({
  root: {
    "--rating-size": getSize(size2, "rating-size"),
    "--rating-color": getThemeColor(color, theme)
  }
}));
var Rating = factory((_props, ref) => {
  const props = useProps("Rating", defaultProps143, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    name,
    id,
    value,
    defaultValue,
    onChange,
    fractions,
    count: count2,
    onMouseEnter,
    readOnly,
    onMouseMove,
    onHover,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    size: size2,
    variant,
    getSymbolLabel,
    color,
    emptySymbol,
    fullSymbol,
    highlightSelectedOnly,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Rating",
    classes: classes62,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver63
  });
  const { dir } = useDirection();
  const _name = useId(name);
  const _id = useId(id);
  const rootRef = (0, import_react299.useRef)(null);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 0,
    onChange
  });
  const [hovered, setHovered] = (0, import_react299.useState)(-1);
  const [isOutside, setOutside] = (0, import_react299.useState)(true);
  const _fractions = Math.floor(fractions);
  const _count = Math.floor(count2);
  const decimalUnit = 1 / _fractions;
  const stableValueRounded = roundValueTo(_value, decimalUnit);
  const finalValue = hovered !== -1 ? hovered : stableValueRounded;
  const getRatingFromCoordinates = (x) => {
    const { left, right, width } = rootRef.current.getBoundingClientRect();
    const symbolWidth = width / _count;
    const hoverPosition = dir === "rtl" ? right - x : x - left;
    const hoverValue = hoverPosition / symbolWidth;
    return clamp(roundValueTo(hoverValue + decimalUnit / 2, decimalUnit), decimalUnit, _count);
  };
  const handleMouseEnter = (event) => {
    onMouseEnter == null ? void 0 : onMouseEnter(event);
    !readOnly && setOutside(false);
  };
  const handleMouseMove = (event) => {
    onMouseMove == null ? void 0 : onMouseMove(event);
    if (readOnly) {
      return;
    }
    const rounded = getRatingFromCoordinates(event.clientX);
    setHovered(rounded);
    rounded !== hovered && (onHover == null ? void 0 : onHover(rounded));
  };
  const handleMouseLeave = (event) => {
    onMouseLeave == null ? void 0 : onMouseLeave(event);
    if (readOnly) {
      return;
    }
    setHovered(-1);
    setOutside(true);
    hovered !== -1 && (onHover == null ? void 0 : onHover(-1));
  };
  const handleTouchStart = (event) => {
    event.preventDefault();
    const { touches } = event;
    if (touches.length !== 1) {
      return;
    }
    const touch = touches[0];
    setValue(getRatingFromCoordinates(touch.clientX));
    onTouchStart == null ? void 0 : onTouchStart(event);
  };
  const handleTouchEnd = (event) => {
    event.preventDefault();
    onTouchEnd == null ? void 0 : onTouchEnd(event);
  };
  const handleItemBlur = () => isOutside && setHovered(-1);
  const handleInputChange = (event) => {
    if (!readOnly) {
      if (typeof event === "number") {
        setHovered(event);
      } else {
        setHovered(parseFloat(event.target.value));
      }
    }
  };
  const handleChange = (event) => {
    if (!readOnly) {
      if (typeof event === "number") {
        setValue(event);
      } else {
        setValue(parseFloat(event.target.value));
      }
    }
  };
  const items = Array(_count).fill(0).map((_, index5) => {
    const integerValue = index5 + 1;
    const fractionItems = Array.from(new Array(index5 === 0 ? _fractions + 1 : _fractions));
    const isGroupActive = !readOnly && Math.ceil(hovered) === integerValue;
    return import_react299.default.createElement(
      "div",
      {
        key: integerValue,
        "data-active": isGroupActive || void 0,
        ...getStyles2("symbolGroup")
      },
      fractionItems.map((__, fractionIndex) => {
        const fractionValue = decimalUnit * (index5 === 0 ? fractionIndex : fractionIndex + 1);
        const symbolValue = roundValueTo(integerValue - 1 + fractionValue, decimalUnit);
        return import_react299.default.createElement(
          RatingItem,
          {
            key: `${integerValue}-${symbolValue}`,
            size: size2,
            getSymbolLabel,
            emptyIcon: emptySymbol,
            fullIcon: fullSymbol,
            full: highlightSelectedOnly ? symbolValue === finalValue : symbolValue <= finalValue,
            active: symbolValue === finalValue,
            checked: symbolValue === stableValueRounded,
            readOnly,
            fractionValue,
            value: symbolValue,
            name: _name,
            onChange: handleChange,
            onBlur: handleItemBlur,
            onInputChange: handleInputChange,
            id: `${_id}-${index5}-${fractionIndex}`
          }
        );
      })
    );
  });
  return import_react299.default.createElement(RatingProvider, { value: { getStyles: getStyles2 } }, import_react299.default.createElement(
    Box,
    {
      ref: useMergedRef(rootRef, ref),
      ...getStyles2("root"),
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      variant,
      size: size2,
      id: _id,
      ...others
    },
    items
  ));
});
Rating.classes = classes62;
Rating.displayName = "@mantine/core/Rating";

// node_modules/@mantine/core/esm/components/RingProgress/RingProgress.mjs
var import_react311 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/RingProgress/RingProgress.module.css.mjs
var classes63 = { "root": "m-b32e4812", "svg": "m-d43b5134", "curve": "m-b1ca1fbf", "label": "m-b23f9dc4" };

// node_modules/@mantine/core/esm/components/RingProgress/get-curves/get-curves.mjs
function getCurves({
  size: size2,
  thickness,
  sections,
  renderRoundedLineCaps,
  rootColor
}) {
  const sum = sections.reduce((acc, current) => acc + current.value, 0);
  const accumulated = Math.PI * ((size2 * 0.9 - thickness * 2) / 2) * 2;
  let offset2 = accumulated;
  const curves = [];
  const curvesInOrder = [];
  for (let i = 0; i < sections.length; i += 1) {
    curves.push({ sum, offset: offset2, data: sections[i], root: false });
    offset2 -= sections[i].value / 100 * accumulated;
  }
  curves.push({ sum, offset: offset2, data: { color: rootColor }, root: true });
  curvesInOrder.push({ ...curves[curves.length - 1], lineRoundCaps: false });
  if (curves.length > 2) {
    curvesInOrder.push({ ...curves[0], lineRoundCaps: renderRoundedLineCaps });
    curvesInOrder.push({ ...curves[curves.length - 2], lineRoundCaps: renderRoundedLineCaps });
    for (let i = 1; i <= curves.length - 3; i += 1) {
      curvesInOrder.push({ ...curves[i], lineRoundCaps: false });
    }
  } else {
    curvesInOrder.push({ ...curves[0], lineRoundCaps: renderRoundedLineCaps });
  }
  return curvesInOrder;
}

// node_modules/@mantine/core/esm/components/RingProgress/Curve/Curve.mjs
var import_react310 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs
var import_react308 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Transition/get-transition-props/get-transition-props.mjs
var defaultTransition = {
  duration: 100,
  transition: "fade"
};
function getTransitionProps(transitionProps, componentTransition) {
  return { ...defaultTransition, ...componentTransition, ...transitionProps };
}

// node_modules/@mantine/core/esm/components/Tooltip/TooltipFloating/TooltipFloating.mjs
var import_react302 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Tooltip/Tooltip.module.css.mjs
var classes64 = { "tooltip": "m-1b3c8819", "arrow": "m-f898399f" };

// node_modules/@mantine/core/esm/components/Tooltip/TooltipFloating/use-floating-tooltip.mjs
var import_react300 = __toESM(require_react(), 1);
function useFloatingTooltip({
  offset: offset2,
  position
}) {
  const [opened, setOpened] = (0, import_react300.useState)(false);
  const boundaryRef = (0, import_react300.useRef)();
  const { x, y, elements, refs, update, placement } = useFloating2({
    placement: position,
    middleware: [
      shift({
        crossAxis: true,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  });
  const horizontalOffset = placement.includes("right") ? offset2 : position.includes("left") ? offset2 * -1 : 0;
  const verticalOffset = placement.includes("bottom") ? offset2 : position.includes("top") ? offset2 * -1 : 0;
  const handleMouseMove = (0, import_react300.useCallback)(
    ({ clientX, clientY }) => {
      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            left: clientX + horizontalOffset,
            top: clientY + verticalOffset,
            right: clientX,
            bottom: clientY
          };
        }
      });
    },
    [elements.reference]
  );
  (0, import_react300.useEffect)(() => {
    if (refs.floating.current) {
      const boundary = boundaryRef.current;
      boundary.addEventListener("mousemove", handleMouseMove);
      const parents = getOverflowAncestors(refs.floating.current);
      parents.forEach((parent) => {
        parent.addEventListener("scroll", update);
      });
      return () => {
        boundary.removeEventListener("mousemove", handleMouseMove);
        parents.forEach((parent) => {
          parent.removeEventListener("scroll", update);
        });
      };
    }
    return void 0;
  }, [elements.reference, refs.floating.current, update, handleMouseMove, opened]);
  return { handleMouseMove, x, y, opened, setOpened, boundaryRef, floating: refs.setFloating };
}

// node_modules/@mantine/core/esm/components/Tooltip/TooltipFloating/TooltipFloating.mjs
var defaultProps144 = {
  refProp: "ref",
  withinPortal: true,
  offset: 10,
  position: "right",
  zIndex: getDefaultZIndex("popover")
};
var varsResolver64 = createVarsResolver((theme, { radius, color }) => ({
  tooltip: {
    "--tooltip-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--tooltip-bg": color ? getThemeColor(color, theme) : void 0,
    "--tooltip-color": color ? "var(--mantine-color-white)" : void 0
  }
}));
var TooltipFloating = factory((_props, ref) => {
  const props = useProps("TooltipFloating", defaultProps144, _props);
  const {
    children,
    refProp,
    withinPortal,
    style,
    className,
    classNames,
    styles,
    unstyled,
    radius,
    color,
    label,
    offset: offset2,
    position,
    multiline,
    zIndex,
    disabled,
    variant,
    vars,
    portalProps,
    ...others
  } = props;
  const theme = useMantineTheme();
  const getStyles2 = useStyles({
    name: "TooltipFloating",
    props,
    classes: classes64,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "tooltip",
    vars,
    varsResolver: varsResolver64
  });
  const { handleMouseMove, x, y, opened, boundaryRef, floating, setOpened } = useFloatingTooltip({
    offset: offset2,
    position
  });
  if (!isElement(children)) {
    throw new Error(
      "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const targetRef = useMergedRef(boundaryRef, children.ref, ref);
  const onMouseEnter = (event) => {
    var _a, _b;
    (_b = (_a = children.props).onMouseEnter) == null ? void 0 : _b.call(_a, event);
    handleMouseMove(event);
    setOpened(true);
  };
  const onMouseLeave = (event) => {
    var _a, _b;
    (_b = (_a = children.props).onMouseLeave) == null ? void 0 : _b.call(_a, event);
    setOpened(false);
  };
  return import_react302.default.createElement(import_react302.default.Fragment, null, import_react302.default.createElement(OptionalPortal, { ...portalProps, withinPortal }, import_react302.default.createElement(
    Box,
    {
      ...others,
      ...getStyles2("tooltip", {
        style: {
          ...getStyleObject(style, theme),
          zIndex,
          display: !disabled && opened ? "block" : "none",
          top: (y && Math.round(y)) ?? "",
          left: (x && Math.round(x)) ?? ""
        }
      }),
      variant,
      ref: floating
    },
    label
  )), (0, import_react302.cloneElement)(children, {
    ...children.props,
    [refProp]: targetRef,
    onMouseEnter,
    onMouseLeave
  }));
});
TooltipFloating.classes = classes64;
TooltipFloating.displayName = "@mantine/core/TooltipFloating";

// node_modules/@mantine/core/esm/components/Tooltip/TooltipGroup/TooltipGroup.mjs
var import_react304 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Tooltip/TooltipGroup/TooltipGroup.context.mjs
var import_react303 = __toESM(require_react(), 1);
var TooltipGroupContext = (0, import_react303.createContext)(false);
var TooltipGroupProvider = TooltipGroupContext.Provider;
var useTooltipGroupContext = () => (0, import_react303.useContext)(TooltipGroupContext);

// node_modules/@mantine/core/esm/components/Tooltip/TooltipGroup/TooltipGroup.mjs
var defaultProps145 = {
  openDelay: 0,
  closeDelay: 0
};
function TooltipGroup(props) {
  const { openDelay, closeDelay, children } = useProps("TooltipGroup", defaultProps145, props);
  return import_react304.default.createElement(TooltipGroupProvider, { value: true }, import_react304.default.createElement(FloatingDelayGroup, { delay: { open: openDelay, close: closeDelay } }, children));
}
TooltipGroup.displayName = "@mantine/core/TooltipGroup";

// node_modules/@mantine/core/esm/components/Tooltip/use-tooltip.mjs
var import_react306 = __toESM(require_react(), 1);
function useTooltip(settings) {
  var _a, _b, _c;
  const [uncontrolledOpened, setUncontrolledOpened] = (0, import_react306.useState)(false);
  const controlled = typeof settings.opened === "boolean";
  const opened = controlled ? settings.opened : uncontrolledOpened;
  const withinGroup = useTooltipGroupContext();
  const uid = useId();
  const { delay: groupDelay, currentId, setCurrentId } = useDelayGroupContext();
  const onChange = (0, import_react306.useCallback)(
    (_opened) => {
      setUncontrolledOpened(_opened);
      if (_opened) {
        setCurrentId(uid);
      }
    },
    [setCurrentId, uid]
  );
  const {
    x,
    y,
    context,
    refs,
    update,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
  } = useFloating2({
    placement: settings.position,
    open: opened,
    onOpenChange: onChange,
    middleware: [
      offset(settings.offset),
      shift({ padding: 8 }),
      flip(),
      arrow2({ element: settings.arrowRef, padding: settings.arrowOffset }),
      ...settings.inline ? [inline()] : []
    ]
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: (_a = settings.events) == null ? void 0 : _a.hover,
      delay: withinGroup ? groupDelay : { open: settings.openDelay, close: settings.closeDelay },
      mouseOnly: !((_b = settings.events) == null ? void 0 : _b.touch)
    }),
    useFocus(context, { enabled: (_c = settings.events) == null ? void 0 : _c.focus, keyboardOnly: true }),
    useRole(context, { role: "tooltip" }),
    // cannot be used with controlled tooltip, page jumps
    useDismiss(context, { enabled: typeof settings.opened === "undefined" }),
    useDelayGroup(context, { id: uid })
  ]);
  useFloatingAutoUpdate({
    opened,
    position: settings.position,
    positionDependencies: settings.positionDependencies,
    floating: { refs, update }
  });
  useDidUpdate(() => {
    var _a2;
    (_a2 = settings.onPositionChange) == null ? void 0 : _a2.call(settings, placement);
  }, [placement]);
  const isGroupPhase = opened && currentId && currentId !== uid;
  return {
    x,
    y,
    arrowX,
    arrowY,
    reference: refs.setReference,
    floating: refs.setFloating,
    getFloatingProps,
    getReferenceProps,
    isGroupPhase,
    opened,
    placement
  };
}

// node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs
var defaultProps146 = {
  position: "top",
  refProp: "ref",
  withinPortal: true,
  inline: false,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  offset: 5,
  transitionProps: { duration: 100, transition: "fade" },
  events: { hover: true, focus: false, touch: false },
  zIndex: getDefaultZIndex("popover"),
  positionDependencies: []
};
var varsResolver65 = createVarsResolver((theme, { radius, color }) => ({
  tooltip: {
    "--tooltip-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--tooltip-bg": color ? getThemeColor(color, theme) : void 0,
    "--tooltip-color": color ? "var(--mantine-color-white)" : void 0
  }
}));
var Tooltip = factory((_props, ref) => {
  const props = useProps("Tooltip", defaultProps146, _props);
  const {
    children,
    position,
    refProp,
    label,
    openDelay,
    closeDelay,
    onPositionChange,
    opened,
    withinPortal,
    radius,
    color,
    classNames,
    styles,
    unstyled,
    style,
    className,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    offset: offset2,
    transitionProps,
    multiline,
    events,
    zIndex,
    disabled,
    positionDependencies,
    onClick,
    onMouseEnter,
    onMouseLeave,
    inline: inline2,
    variant,
    keepMounted,
    vars,
    portalProps,
    ...others
  } = useProps("Tooltip", defaultProps146, props);
  const { dir } = useDirection();
  const arrowRef = (0, import_react308.useRef)(null);
  const tooltip = useTooltip({
    position: getFloatingPosition(dir, position),
    closeDelay,
    openDelay,
    onPositionChange,
    opened,
    events,
    arrowRef,
    arrowOffset,
    offset: typeof offset2 === "number" ? offset2 + (withArrow ? arrowSize / 2 : 0) : offset2,
    positionDependencies: [...positionDependencies, children],
    inline: inline2
  });
  const getStyles2 = useStyles({
    name: "Tooltip",
    props,
    classes: classes64,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "tooltip",
    vars,
    varsResolver: varsResolver65
  });
  if (!isElement(children)) {
    throw new Error(
      "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const targetRef = useMergedRef(tooltip.reference, children.ref, ref);
  const transition = getTransitionProps(transitionProps, { duration: 100, transition: "fade" });
  return import_react308.default.createElement(import_react308.default.Fragment, null, import_react308.default.createElement(OptionalPortal, { ...portalProps, withinPortal }, import_react308.default.createElement(
    Transition,
    {
      ...transition,
      keepMounted,
      mounted: !disabled && !!tooltip.opened,
      duration: tooltip.isGroupPhase ? 10 : transition.duration
    },
    (transitionStyles) => import_react308.default.createElement(
      Box,
      {
        ...others,
        variant,
        mod: { multiline },
        ...tooltip.getFloatingProps({
          ref: tooltip.floating,
          className: getStyles2("tooltip").className,
          style: {
            ...getStyles2("tooltip").style,
            ...transitionStyles,
            zIndex,
            top: tooltip.y ?? 0,
            left: tooltip.x ?? 0
          }
        })
      },
      label,
      import_react308.default.createElement(
        FloatingArrow3,
        {
          ref: arrowRef,
          arrowX: tooltip.arrowX,
          arrowY: tooltip.arrowY,
          visible: withArrow,
          position: tooltip.placement,
          arrowSize,
          arrowOffset,
          arrowRadius,
          arrowPosition,
          ...getStyles2("arrow")
        }
      )
    )
  )), (0, import_react308.cloneElement)(
    children,
    tooltip.getReferenceProps({
      onClick,
      onMouseEnter,
      onMouseLeave,
      onMouseMove: props.onMouseMove,
      onPointerDown: props.onPointerDown,
      onPointerEnter: props.onPointerEnter,
      [refProp]: targetRef,
      className: clsx_default(className, children.props.className),
      ...children.props
    })
  ));
});
Tooltip.classes = classes64;
Tooltip.displayName = "@mantine/core/Tooltip";
Tooltip.Floating = TooltipFloating;
Tooltip.Group = TooltipGroup;

// node_modules/@mantine/core/esm/components/RingProgress/Curve/get-curve-props.mjs
function getCurveProps({ size: size2, thickness, sum, value, root, offset: offset2 }) {
  const radius = (size2 * 0.9 - thickness * 2) / 2;
  const deg = Math.PI * radius * 2 / 100;
  const strokeDasharray = root || value === void 0 ? `${(100 - sum) * deg}, ${sum * deg}` : `${value * deg}, ${(100 - value) * deg}`;
  return {
    strokeWidth: Number.isNaN(thickness) ? 12 : thickness,
    cx: size2 / 2 || 0,
    cy: size2 / 2 || 0,
    r: radius || 0,
    transform: root ? `scale(1, -1) translate(0, -${size2})` : void 0,
    strokeDasharray,
    strokeDashoffset: root ? 0 : offset2 || 0
  };
}

// node_modules/@mantine/core/esm/components/RingProgress/Curve/Curve.mjs
function Curve({
  size: size2,
  value,
  offset: offset2,
  sum,
  thickness,
  root,
  color,
  lineRoundCaps,
  tooltip,
  getStyles: getStyles2,
  display,
  ...others
}) {
  const theme = useMantineTheme();
  return import_react310.default.createElement(Tooltip.Floating, { disabled: !tooltip, label: tooltip }, import_react310.default.createElement(
    Box,
    {
      component: "circle",
      ...others,
      ...getStyles2("curve"),
      __vars: { "--curve-color": color ? getThemeColor(color, theme) : void 0 },
      fill: "none",
      strokeLinecap: lineRoundCaps ? "round" : "butt",
      ...getCurveProps({ sum, size: size2, thickness, value, offset: offset2, root })
    }
  ));
}
Curve.displayName = "@mantine/core/Curve";

// node_modules/@mantine/core/esm/components/RingProgress/RingProgress.mjs
function getClampedThickness(thickness, size2) {
  return Math.min(thickness || 12, (size2 || 120) / 4);
}
var defaultProps147 = {
  size: 120,
  thickness: 12
};
var varsResolver66 = createVarsResolver((_, { size: size2, thickness }) => ({
  root: {
    "--rp-size": rem(size2),
    "--rp-label-offset": rem(thickness * 2)
  }
}));
var RingProgress = factory((_props, ref) => {
  const props = useProps("RingProgress", defaultProps147, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    label,
    sections,
    size: size2,
    thickness,
    roundCaps,
    rootColor,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "RingProgress",
    classes: classes63,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver66
  });
  const clampedThickness = getClampedThickness(thickness, size2);
  const curves = getCurves({
    size: size2,
    thickness: clampedThickness,
    sections,
    renderRoundedLineCaps: roundCaps,
    rootColor
  }).map(({ data, sum, root, lineRoundCaps, offset: offset2 }, index5) => import_react311.default.createElement(
    Curve,
    {
      ...data,
      key: index5,
      size: size2,
      thickness: clampedThickness,
      sum,
      offset: offset2,
      color: data == null ? void 0 : data.color,
      root,
      lineRoundCaps,
      getStyles: getStyles2
    }
  ));
  return import_react311.default.createElement(Box, { ...getStyles2("root"), size: size2, ref, ...others }, import_react311.default.createElement("svg", { ...getStyles2("svg") }, curves), label && import_react311.default.createElement("div", { ...getStyles2("label") }, label));
});
RingProgress.classes = classes63;
RingProgress.displayName = "@mantine/core/RingProgress";

// node_modules/@mantine/core/esm/components/SegmentedControl/SegmentedControl.mjs
var import_react312 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/SegmentedControl/get-root-padding.mjs
function getPaddingValue2(value, defaultPaddingValue) {
  const val = parseFloat(value.replace("px", ""));
  return Number.isNaN(val) ? defaultPaddingValue : val;
}
function getRootPadding(root, defaultPaddingValue) {
  const computedStyle = window.getComputedStyle(root);
  return {
    top: getPaddingValue2(computedStyle.getPropertyValue("padding-top"), defaultPaddingValue),
    right: getPaddingValue2(computedStyle.getPropertyValue("padding-right"), defaultPaddingValue),
    bottom: getPaddingValue2(computedStyle.getPropertyValue("padding-bottom"), defaultPaddingValue),
    left: getPaddingValue2(computedStyle.getPropertyValue("padding-left"), defaultPaddingValue)
  };
}

// node_modules/@mantine/core/esm/components/SegmentedControl/SegmentedControl.module.css.mjs
var classes65 = { "root": "m-cf365364", "indicator": "m-9e182ccd", "label": "m-1738fcb2", "input": "m-1714d588", "control": "m-69686b9b" };

// node_modules/@mantine/core/esm/components/SegmentedControl/SegmentedControl.mjs
var WRAPPER_PADDING = 4;
var defaultProps148 = {};
var varsResolver67 = createVarsResolver(
  (theme, { radius, color, transitionDuration, size: size2, transitionTimingFunction }) => ({
    root: {
      "--sc-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--sc-color": color ? getThemeColor(color, theme) : void 0,
      "--sc-shadow": color ? void 0 : "var(--mantine-shadow-xs)",
      "--sc-transition-duration": transitionDuration === void 0 ? void 0 : `${transitionDuration}ms`,
      "--sc-transition-timing-function": transitionTimingFunction,
      "--sc-padding": getSize(size2, "sc-padding"),
      "--sc-font-size": getFontSize(size2)
    }
  })
);
var SegmentedControl = factory((_props, ref) => {
  var _a, _b;
  const props = useProps("SegmentedControl", defaultProps148, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    data,
    value,
    defaultValue,
    onChange,
    size: size2,
    name,
    disabled,
    readOnly,
    fullWidth,
    orientation,
    radius,
    color,
    transitionDuration,
    transitionTimingFunction,
    variant,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "SegmentedControl",
    props,
    classes: classes65,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver67
  });
  const { dir } = useDirection();
  const theme = useMantineTheme();
  const _data = data.map(
    (item) => typeof item === "string" ? { label: item, value: item } : item
  );
  const [_value, handleValueChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: Array.isArray(data) ? ((_a = _data.find((item) => !item.disabled)) == null ? void 0 : _a.value) ?? ((_b = data[0]) == null ? void 0 : _b.value) ?? null : null,
    onChange
  });
  const [activePosition, setActivePosition] = (0, import_react312.useState)({
    width: 0,
    height: 0,
    translate: [0, 0]
  });
  const uuid = useId(name);
  const refs = (0, import_react312.useRef)({});
  const rootRef = (0, import_react312.useRef)(null);
  const [observerRef, containerRect] = useResizeObserver();
  (0, import_react312.useEffect)(() => {
    if (_value in refs.current && observerRef.current) {
      const element = refs.current[_value];
      if (element) {
        const rootPadding = getRootPadding(rootRef.current, WRAPPER_PADDING);
        const elementRect = element.getBoundingClientRect();
        const scaledValue = element.offsetWidth / elementRect.width;
        const width = element.clientWidth * scaledValue || 0;
        const height = element.clientHeight * scaledValue || 0;
        const offsetRight = containerRect.width - element.parentElement.offsetLeft + (dir === "rtl" ? rootPadding.left : rootPadding.right) - width;
        const offsetLeft = element.parentElement.offsetLeft - (dir === "rtl" ? rootPadding.right : rootPadding.left);
        setActivePosition({
          width,
          height,
          translate: [
            dir === "rtl" ? offsetRight * -1 : offsetLeft,
            element.parentElement.offsetTop - rootPadding.top
          ]
        });
      } else {
        setActivePosition({ width: 0, height: 0, translate: [0, 0] });
      }
    }
  }, [_value, containerRect, dir]);
  const controls = _data.map((item) => import_react312.default.createElement(
    Box,
    {
      ...getStyles2("control"),
      mod: { active: _value === item.value, orientation },
      key: item.value
    },
    import_react312.default.createElement(
      "input",
      {
        ...getStyles2("input"),
        disabled: disabled || item.disabled,
        type: "radio",
        name: uuid,
        value: item.value,
        id: `${uuid}-${item.value}`,
        checked: _value === item.value,
        onChange: () => !readOnly && handleValueChange(item.value),
        "data-focus-ring": theme.focusRing
      }
    ),
    import_react312.default.createElement(
      Box,
      {
        component: "label",
        ...getStyles2("label"),
        mod: {
          active: _value === item.value && !(disabled || item.disabled),
          disabled: disabled || item.disabled
        },
        htmlFor: `${uuid}-${item.value}`,
        ref: (node) => {
          refs.current[item.value] = node;
        },
        __vars: {
          "--sc-label-color": color !== void 0 ? "var(--mantine-color-white)" : void 0
        }
      },
      item.label
    )
  ));
  const mergedRef = useMergedRef(observerRef, rootRef, ref);
  if (data.length === 0) {
    return null;
  }
  return import_react312.default.createElement(
    Box,
    {
      ...getStyles2("root"),
      variant,
      size: size2,
      ref: mergedRef,
      mod: { "full-width": fullWidth, orientation },
      ...others,
      role: "radiogroup"
    },
    typeof _value === "string" && import_react312.default.createElement(
      Box,
      {
        component: "span",
        ...getStyles2("indicator"),
        __vars: {
          "--sc-indicator-width": `${activePosition.width}px`,
          "--sc-indicator-height": `${activePosition.height}px`,
          "--sc-indicator-transform": `translate(${activePosition.translate[0]}px, ${activePosition.translate[1]}px)`
        }
      }
    ),
    controls
  );
});
SegmentedControl.classes = classes65;
SegmentedControl.displayName = "@mantine/core/SegmentedControl";

// node_modules/@mantine/core/esm/components/Select/Select.mjs
var import_react313 = __toESM(require_react(), 1);
var defaultProps149 = {
  searchable: false,
  withCheckIcon: true,
  allowDeselect: true,
  checkIconPosition: "left"
};
var Select = factory((_props, ref) => {
  const props = useProps("Select", defaultProps149, _props);
  const {
    classNames,
    styles,
    unstyled,
    vars,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownClose,
    onDropdownOpen,
    onFocus,
    onBlur,
    onClick,
    onChange,
    data,
    value,
    defaultValue,
    selectFirstOptionOnChange,
    onOptionSubmit,
    comboboxProps,
    readOnly,
    disabled,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    size: size2,
    searchable,
    rightSection,
    checkIconPosition,
    withCheckIcon,
    nothingFoundMessage,
    name,
    form,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    allowDeselect,
    error,
    rightSectionPointerEvents,
    id,
    clearable,
    clearButtonProps,
    hiddenInputProps,
    ...others
  } = props;
  const parsedData = (0, import_react313.useMemo)(() => getParsedComboboxData(data), [data]);
  const optionsLockup = (0, import_react313.useMemo)(() => getOptionsLockup(parsedData), [parsedData]);
  const _id = useId(id);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const selectedOption = _value ? optionsLockup[_value] : void 0;
  const [search, setSearch] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: selectedOption ? selectedOption.label : "",
    onChange: onSearchChange
  });
  const combobox = useCombobox({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose: () => {
      onDropdownClose == null ? void 0 : onDropdownClose();
      combobox.resetSelectedOption();
    }
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    props,
    styles,
    classNames
  });
  (0, import_react313.useEffect)(() => {
    if (selectFirstOptionOnChange) {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, _value]);
  (0, import_react313.useEffect)(() => {
    if (value === null) {
      setSearch("");
    }
    if (typeof value === "string" && selectedOption) {
      setSearch(selectedOption.label);
    }
  }, [value, selectedOption]);
  const clearButton = clearable && !!_value && !disabled && !readOnly && import_react313.default.createElement(
    Combobox.ClearButton,
    {
      size: size2,
      ...clearButtonProps,
      onClear: () => {
        setValue(null);
        setSearch("");
      }
    }
  );
  return import_react313.default.createElement(import_react313.default.Fragment, null, import_react313.default.createElement(
    Combobox,
    {
      store: combobox,
      __staticSelector: "Select",
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      unstyled,
      readOnly,
      onOptionSubmit: (val) => {
        onOptionSubmit == null ? void 0 : onOptionSubmit(val);
        const nextValue = allowDeselect ? optionsLockup[val].value === _value ? null : optionsLockup[val].value : optionsLockup[val].value;
        setValue(nextValue);
        setSearch(typeof nextValue === "string" ? optionsLockup[val].label : "");
        combobox.closeDropdown();
      },
      size: size2,
      ...comboboxProps
    },
    import_react313.default.createElement(Combobox.Target, { targetType: searchable ? "input" : "button" }, import_react313.default.createElement(
      InputBase,
      {
        id: _id,
        ref,
        rightSection: rightSection || clearButton || import_react313.default.createElement(Combobox.Chevron, { size: size2, error, unstyled }),
        rightSectionPointerEvents: rightSectionPointerEvents || clearButton ? "all" : "none",
        ...others,
        size: size2,
        __staticSelector: "Select",
        disabled,
        readOnly: readOnly || !searchable,
        value: search,
        onChange: (event) => {
          setSearch(event.currentTarget.value);
          combobox.openDropdown();
          selectFirstOptionOnChange && combobox.selectFirstOption();
        },
        onFocus: (event) => {
          searchable && combobox.openDropdown();
          onFocus == null ? void 0 : onFocus(event);
        },
        onBlur: (event) => {
          var _a;
          searchable && combobox.closeDropdown();
          setSearch(_value != null ? ((_a = optionsLockup[_value]) == null ? void 0 : _a.label) || "" : "");
          onBlur == null ? void 0 : onBlur(event);
        },
        onClick: (event) => {
          searchable ? combobox.openDropdown() : combobox.toggleDropdown();
          onClick == null ? void 0 : onClick(event);
        },
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        pointer: !searchable,
        error
      }
    )),
    import_react313.default.createElement(
      OptionsDropdown,
      {
        data: parsedData,
        hidden: readOnly || disabled,
        filter,
        search,
        limit,
        hiddenWhenEmpty: !searchable || !nothingFoundMessage,
        withScrollArea,
        maxDropdownHeight,
        filterOptions: searchable && (selectedOption == null ? void 0 : selectedOption.label) !== search,
        value: _value,
        checkIconPosition,
        withCheckIcon,
        nothingFoundMessage,
        unstyled,
        labelId: `${_id}-label`
      }
    )
  ), import_react313.default.createElement(
    "input",
    {
      type: "hidden",
      name,
      value: _value || "",
      form,
      disabled,
      ...hiddenInputProps
    }
  ));
});
Select.classes = { ...InputBase.classes, ...Combobox.classes };
Select.displayName = "@mantine/core/Select";

// node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.mjs
var import_react315 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGridVariables.mjs
var import_react314 = __toESM(require_react(), 1);
function SimpleGridVariables({
  spacing,
  verticalSpacing,
  cols,
  selector
}) {
  var _a;
  const theme = useMantineTheme();
  const _verticalSpacing = verticalSpacing === void 0 ? spacing : verticalSpacing;
  const baseStyles = filterProps({
    "--sg-spacing-x": getSpacing(getBaseValue(spacing)),
    "--sg-spacing-y": getSpacing(getBaseValue(_verticalSpacing)),
    "--sg-cols": (_a = getBaseValue(cols)) == null ? void 0 : _a.toString()
  });
  const queries = keys(theme.breakpoints).reduce(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }
      if (typeof spacing === "object" && spacing[breakpoint] !== void 0) {
        acc[breakpoint]["--sg-spacing-x"] = getSpacing(spacing[breakpoint]);
      }
      if (typeof _verticalSpacing === "object" && _verticalSpacing[breakpoint] !== void 0) {
        acc[breakpoint]["--sg-spacing-y"] = getSpacing(_verticalSpacing[breakpoint]);
      }
      if (typeof cols === "object" && cols[breakpoint] !== void 0) {
        acc[breakpoint]["--sg-cols"] = cols[breakpoint];
      }
      return acc;
    },
    {}
  );
  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );
  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value]})`,
    styles: queries[breakpoint.value]
  }));
  return import_react314.default.createElement(InlineStyles, { styles: baseStyles, media, selector });
}

// node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.module.css.mjs
var classes66 = { "root": "m-2415a157" };

// node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.mjs
var defaultProps150 = {
  cols: 1,
  spacing: "md"
};
var SimpleGrid = factory((_props, ref) => {
  const props = useProps("SimpleGrid", defaultProps150, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    cols,
    verticalSpacing,
    spacing,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "SimpleGrid",
    classes: classes66,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars
  });
  const responsiveClassName = useRandomClassName();
  return import_react315.default.createElement(import_react315.default.Fragment, null, import_react315.default.createElement(SimpleGridVariables, { ...props, selector: `.${responsiveClassName}` }), import_react315.default.createElement(Box, { ref, ...getStyles2("root", { className: responsiveClassName }), ...others }));
});
SimpleGrid.classes = classes66;
SimpleGrid.displayName = "@mantine/core/SimpleGrid";

// node_modules/@mantine/core/esm/components/Skeleton/Skeleton.mjs
var import_react316 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Skeleton/Skeleton.module.css.mjs
var classes67 = { "root": "m-18320242", "skeleton-fade": "m-299c329c" };

// node_modules/@mantine/core/esm/components/Skeleton/Skeleton.mjs
var defaultProps151 = {
  visible: true,
  animate: true
};
var varsResolver68 = createVarsResolver(
  (_, { width, height, radius, circle }) => ({
    root: {
      "--skeleton-height": rem(height),
      "--skeleton-width": circle ? rem(height) : rem(width),
      "--skeleton-radius": circle ? "1000px" : radius === void 0 ? void 0 : getRadius(radius)
    }
  })
);
var Skeleton = factory((_props, ref) => {
  const props = useProps("Skeleton", defaultProps151, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    width,
    height,
    circle,
    visible,
    radius,
    animate,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Skeleton",
    classes: classes67,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver68
  });
  return import_react316.default.createElement(Box, { ref, ...getStyles2("root"), mod: { visible, animate }, ...others });
});
Skeleton.classes = classes67;
Skeleton.displayName = "@mantine/core/Skeleton";

// node_modules/@mantine/core/esm/components/Slider/Slider/Slider.mjs
var import_react322 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Slider/SliderRoot/SliderRoot.mjs
var import_react318 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Slider/Slider.context.mjs
var import_react317 = __toESM(require_react(), 1);
var [SliderProvider, useSliderContext] = createSafeContext(
  "SliderProvider was not found in tree"
);

// node_modules/@mantine/core/esm/components/Slider/SliderRoot/SliderRoot.mjs
var SliderRoot = (0, import_react318.forwardRef)(
  ({ size: size2, disabled, variant, color, thumbSize, radius, ...others }, ref) => {
    const { getStyles: getStyles2 } = useSliderContext();
    return import_react318.default.createElement(
      Box,
      {
        tabIndex: -1,
        variant,
        size: size2,
        ref,
        ...getStyles2("root"),
        ...others
      }
    );
  }
);
SliderRoot.displayName = "@mantine/core/SliderRoot";

// node_modules/@mantine/core/esm/components/Slider/Track/Track.mjs
var import_react320 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Slider/Marks/Marks.mjs
var import_react319 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Slider/utils/get-position/get-position.mjs
function getPosition({ value, min: min2, max: max2 }) {
  const position = (value - min2) / (max2 - min2) * 100;
  return Math.min(Math.max(position, 0), 100);
}

// node_modules/@mantine/core/esm/components/Slider/Marks/is-mark-filled.mjs
function isMarkFilled({ mark, offset: offset2, value, inverted = false }) {
  return inverted ? typeof offset2 === "number" ? mark.value <= offset2 || mark.value >= value : mark.value >= value : typeof offset2 === "number" ? mark.value >= offset2 && mark.value <= value : mark.value <= value;
}

// node_modules/@mantine/core/esm/components/Slider/Marks/Marks.mjs
function Marks({ marks, min: min2, max: max2, disabled, value, offset: offset2, inverted }) {
  const { getStyles: getStyles2 } = useSliderContext();
  if (!marks) {
    return null;
  }
  const items = marks.map((mark, index5) => import_react319.default.createElement(
    Box,
    {
      ...getStyles2("markWrapper"),
      __vars: { "--mark-offset": `${getPosition({ value: mark.value, min: min2, max: max2 })}%` },
      key: index5
    },
    import_react319.default.createElement(
      Box,
      {
        ...getStyles2("mark"),
        mod: { filled: isMarkFilled({ mark, value, offset: offset2, inverted }), disabled }
      }
    ),
    mark.label && import_react319.default.createElement("div", { ...getStyles2("markLabel") }, mark.label)
  ));
  return import_react319.default.createElement("div", null, items);
}
Marks.displayName = "@mantine/core/SliderMarks";

// node_modules/@mantine/core/esm/components/Slider/Track/Track.mjs
function Track({
  filled,
  children,
  offset: offset2,
  disabled,
  marksOffset,
  inverted,
  containerProps,
  ...others
}) {
  const { getStyles: getStyles2 } = useSliderContext();
  return import_react320.default.createElement(import_react320.default.Fragment, null, import_react320.default.createElement(Box, { ...getStyles2("trackContainer"), mod: { disabled }, ...containerProps }, import_react320.default.createElement(Box, { ...getStyles2("track"), mod: { inverted, disabled } }, import_react320.default.createElement(
    Box,
    {
      mod: { inverted, disabled },
      __vars: {
        "--slider-bar-width": `calc(${filled}% + var(--slider-size))`,
        "--slider-bar-offset": `calc(${offset2}% - var(--slider-size))`
      },
      ...getStyles2("bar")
    }
  ), children, import_react320.default.createElement(Marks, { ...others, offset: marksOffset, disabled, inverted }))));
}
Track.displayName = "@mantine/core/SliderTrack";

// node_modules/@mantine/core/esm/components/Slider/Thumb/Thumb.mjs
var import_react321 = __toESM(require_react(), 1);
var Thumb3 = (0, import_react321.forwardRef)(
  ({
    max: max2,
    min: min2,
    value,
    position,
    label,
    dragging,
    onMouseDown,
    onKeyDownCapture,
    labelTransitionProps,
    labelAlwaysOn,
    thumbLabel,
    onFocus,
    onBlur,
    showLabelOnHover,
    isHovered,
    children = null,
    disabled
  }, ref) => {
    const { getStyles: getStyles2 } = useSliderContext();
    const [focused, setFocused] = (0, import_react321.useState)(false);
    const isVisible = labelAlwaysOn || dragging || focused || showLabelOnHover && isHovered;
    return import_react321.default.createElement(
      Box,
      {
        tabIndex: 0,
        role: "slider",
        "aria-label": thumbLabel,
        "aria-valuemax": max2,
        "aria-valuemin": min2,
        "aria-valuenow": value,
        ref,
        __vars: { "--slider-thumb-offset": `${position}%` },
        ...getStyles2("thumb", { focusable: true }),
        mod: { dragging, disabled },
        onFocus: () => {
          setFocused(true);
          typeof onFocus === "function" && onFocus();
        },
        onBlur: () => {
          setFocused(false);
          typeof onBlur === "function" && onBlur();
        },
        onTouchStart: onMouseDown,
        onMouseDown,
        onKeyDownCapture,
        onClick: (event) => event.stopPropagation()
      },
      children,
      import_react321.default.createElement(
        Transition,
        {
          mounted: label != null && !!isVisible,
          transition: "fade",
          duration: 0,
          ...labelTransitionProps
        },
        (transitionStyles) => import_react321.default.createElement("div", { ...getStyles2("label", { style: transitionStyles }) }, label)
      )
    );
  }
);
Thumb3.displayName = "@mantine/core/SliderThumb";

// node_modules/@mantine/core/esm/components/Slider/utils/get-change-value/get-change-value.mjs
function getChangeValue({
  value,
  containerWidth,
  min: min2,
  max: max2,
  step,
  precision
}) {
  const left = !containerWidth ? value : Math.min(Math.max(value, 0), containerWidth) / containerWidth;
  const dx = left * (max2 - min2);
  const nextValue = (dx !== 0 ? Math.round(dx / step) * step : 0) + min2;
  const nextValueWithinStep = Math.max(nextValue, min2);
  if (precision !== void 0) {
    return Number(nextValueWithinStep.toFixed(precision));
  }
  return nextValueWithinStep;
}

// node_modules/@mantine/core/esm/components/Slider/utils/get-floating-value/get-gloating-value.mjs
function getFloatingValue(value, precision) {
  return parseFloat(value.toFixed(precision));
}

// node_modules/@mantine/core/esm/components/Slider/utils/get-precision/get-precision.mjs
function getPrecision(step) {
  if (!step)
    return 0;
  const split = step.toString().split(".");
  return split.length > 1 ? split[1].length : 0;
}

// node_modules/@mantine/core/esm/components/Slider/Slider.module.css.mjs
var classes68 = { "root": "m-dd36362e", "label": "m-c9357328", "thumb": "m-c9a9a60a", "trackContainer": "m-a8645c2", "track": "m-c9ade57f", "bar": "m-38aeed47", "markWrapper": "m-b7b0423a", "mark": "m-dd33bc19", "markLabel": "m-68c77a5b" };

// node_modules/@mantine/core/esm/components/Slider/Slider/Slider.mjs
var defaultProps152 = {
  radius: "xl",
  min: 0,
  max: 100,
  step: 1,
  marks: [],
  label: (f) => f,
  labelTransitionProps: { transition: "fade", duration: 0 },
  labelAlwaysOn: false,
  thumbLabel: "",
  showLabelOnHover: true,
  disabled: false,
  scale: (v) => v
};
var varsResolver69 = createVarsResolver(
  (theme, { size: size2, color, thumbSize, radius }) => ({
    root: {
      "--slider-size": getSize(size2, "slider-size"),
      "--slider-color": color ? getThemeColor(color, theme) : void 0,
      "--slider-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--slider-thumb-size": thumbSize !== void 0 ? rem(thumbSize) : "calc(var(--slider-size) * 2)"
    }
  })
);
var Slider = factory((_props, ref) => {
  const props = useProps("Slider", defaultProps152, _props);
  const {
    classNames,
    styles,
    value,
    onChange,
    onChangeEnd,
    size: size2,
    min: min2,
    max: max2,
    step,
    precision: _precision,
    defaultValue,
    name,
    marks,
    label,
    labelTransitionProps,
    labelAlwaysOn,
    thumbLabel,
    showLabelOnHover,
    thumbChildren,
    disabled,
    unstyled,
    scale,
    inverted,
    className,
    style,
    vars,
    hiddenInputProps,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Slider",
    props,
    classes: classes68,
    classNames,
    className,
    styles,
    style,
    vars,
    varsResolver: varsResolver69,
    unstyled
  });
  const { dir } = useDirection();
  const [hovered, setHovered] = (0, import_react322.useState)(false);
  const [_value, setValue] = useUncontrolled({
    value: typeof value === "number" ? clamp(value, min2, max2) : value,
    defaultValue: typeof defaultValue === "number" ? clamp(defaultValue, min2, max2) : defaultValue,
    finalValue: clamp(0, min2, max2),
    onChange
  });
  const valueRef = (0, import_react322.useRef)(_value);
  const root = (0, import_react322.useRef)();
  const thumb = (0, import_react322.useRef)();
  const position = getPosition({ value: _value, min: min2, max: max2 });
  const scaledValue = scale(_value);
  const _label = typeof label === "function" ? label(scaledValue) : label;
  const precision = _precision ?? getPrecision(step);
  const handleChange = (0, import_react322.useCallback)(
    ({ x }) => {
      if (!disabled) {
        const nextValue = getChangeValue({
          value: x,
          min: min2,
          max: max2,
          step,
          precision
        });
        setValue(nextValue);
        valueRef.current = nextValue;
      }
    },
    [disabled, min2, max2, step, precision, setValue]
  );
  const { ref: container, active } = useMove(
    handleChange,
    { onScrubEnd: () => onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current) },
    dir
  );
  const handleTrackKeydownCapture = (event) => {
    var _a, _b, _c, _d, _e, _f;
    if (!disabled) {
      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault();
          (_a = thumb.current) == null ? void 0 : _a.focus();
          const nextValue = getFloatingValue(
            Math.min(Math.max(_value + step, min2), max2),
            precision
          );
          onChangeEnd == null ? void 0 : onChangeEnd(nextValue);
          setValue(nextValue);
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          (_b = thumb.current) == null ? void 0 : _b.focus();
          const nextValue = getFloatingValue(
            Math.min(Math.max(dir === "rtl" ? _value - step : _value + step, min2), max2),
            precision
          );
          onChangeEnd == null ? void 0 : onChangeEnd(nextValue);
          setValue(nextValue);
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          (_c = thumb.current) == null ? void 0 : _c.focus();
          const nextValue = getFloatingValue(
            Math.min(Math.max(_value - step, min2), max2),
            precision
          );
          onChangeEnd == null ? void 0 : onChangeEnd(nextValue);
          setValue(nextValue);
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          (_d = thumb.current) == null ? void 0 : _d.focus();
          const nextValue = getFloatingValue(
            Math.min(Math.max(dir === "rtl" ? _value + step : _value - step, min2), max2),
            precision
          );
          onChangeEnd == null ? void 0 : onChangeEnd(nextValue);
          setValue(nextValue);
          break;
        }
        case "Home": {
          event.preventDefault();
          (_e = thumb.current) == null ? void 0 : _e.focus();
          onChangeEnd == null ? void 0 : onChangeEnd(min2);
          setValue(min2);
          break;
        }
        case "End": {
          event.preventDefault();
          (_f = thumb.current) == null ? void 0 : _f.focus();
          onChangeEnd == null ? void 0 : onChangeEnd(max2);
          setValue(max2);
          break;
        }
      }
    }
  };
  return import_react322.default.createElement(SliderProvider, { value: { getStyles: getStyles2 } }, import_react322.default.createElement(
    SliderRoot,
    {
      ...others,
      ref: useMergedRef(ref, root),
      onKeyDownCapture: handleTrackKeydownCapture,
      onMouseDownCapture: () => {
        var _a;
        return (_a = root.current) == null ? void 0 : _a.focus();
      },
      size: size2,
      disabled
    },
    import_react322.default.createElement(
      Track,
      {
        inverted,
        offset: 0,
        filled: position,
        marks,
        min: min2,
        max: max2,
        value: scaledValue,
        disabled,
        containerProps: {
          ref: container,
          onMouseEnter: showLabelOnHover ? () => setHovered(true) : void 0,
          onMouseLeave: showLabelOnHover ? () => setHovered(false) : void 0
        }
      },
      import_react322.default.createElement(
        Thumb3,
        {
          max: max2,
          min: min2,
          value: scaledValue,
          position,
          dragging: active,
          label: _label,
          ref: thumb,
          labelTransitionProps,
          labelAlwaysOn,
          thumbLabel,
          showLabelOnHover,
          isHovered: hovered,
          disabled
        },
        thumbChildren
      )
    ),
    import_react322.default.createElement("input", { type: "hidden", name, value: scaledValue, ...hiddenInputProps })
  ));
});
Slider.classes = classes68;
Slider.displayName = "@mantine/core/Slider";

// node_modules/@mantine/core/esm/components/Slider/RangeSlider/RangeSlider.mjs
var import_react323 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Slider/utils/get-client-position/get-client-position.mjs
function getClientPosition(event) {
  if ("TouchEvent" in window && event instanceof window.TouchEvent) {
    const touch = event.touches[0];
    return touch.clientX;
  }
  return event.clientX;
}

// node_modules/@mantine/core/esm/components/Slider/RangeSlider/RangeSlider.mjs
var varsResolver70 = createVarsResolver(
  (theme, { size: size2, color, thumbSize, radius }) => ({
    root: {
      "--slider-size": getSize(size2, "slider-size"),
      "--slider-color": color ? getThemeColor(color, theme) : void 0,
      "--slider-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--slider-thumb-size": thumbSize !== void 0 ? rem(thumbSize) : "calc(var(--slider-size) * 2)"
    }
  })
);
var defaultProps153 = {
  min: 0,
  max: 100,
  minRange: 10,
  step: 1,
  marks: [],
  label: (f) => f,
  labelTransitionProps: { transition: "fade", duration: 0 },
  labelAlwaysOn: false,
  showLabelOnHover: true,
  disabled: false,
  scale: (v) => v
};
var RangeSlider = factory((_props, ref) => {
  const props = useProps("RangeSlider", defaultProps153, _props);
  const {
    classNames,
    styles,
    value,
    onChange,
    onChangeEnd,
    size: size2,
    min: min2,
    max: max2,
    minRange,
    maxRange,
    step,
    precision: _precision,
    defaultValue,
    name,
    marks,
    label,
    labelTransitionProps,
    labelAlwaysOn,
    thumbFromLabel,
    thumbToLabel,
    showLabelOnHover,
    thumbChildren,
    disabled,
    unstyled,
    scale,
    inverted,
    className,
    style,
    vars,
    hiddenInputProps,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Slider",
    props,
    classes: classes68,
    classNames,
    className,
    styles,
    style,
    vars,
    varsResolver: varsResolver70,
    unstyled
  });
  const { dir } = useDirection();
  const [focused, setFocused] = (0, import_react323.useState)(-1);
  const [hovered, setHovered] = (0, import_react323.useState)(false);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [min2, max2],
    onChange
  });
  const valueRef = (0, import_react323.useRef)(_value);
  const thumbs = (0, import_react323.useRef)([]);
  const thumbIndex = (0, import_react323.useRef)(void 0);
  const positions = [
    getPosition({ value: _value[0], min: min2, max: max2 }),
    getPosition({ value: _value[1], min: min2, max: max2 })
  ];
  const precision = _precision ?? getPrecision(step);
  const _setValue = (val) => {
    setValue(val);
    valueRef.current = val;
  };
  (0, import_react323.useEffect)(
    () => {
      if (Array.isArray(value)) {
        valueRef.current = value;
      }
    },
    Array.isArray(value) ? [value[0], value[1]] : [null, null]
  );
  const setRangedValue = (val, index5, triggerChangeEnd) => {
    const clone = [...valueRef.current];
    clone[index5] = val;
    if (index5 === 0) {
      if (val > clone[1] - (minRange - 1e-9)) {
        clone[1] = Math.min(val + minRange, max2);
      }
      if (val > (max2 - (minRange - 1e-9) || min2)) {
        clone[index5] = valueRef.current[index5];
      }
      if (clone[1] - val > maxRange) {
        clone[1] = val + maxRange;
      }
    }
    if (index5 === 1) {
      if (val < clone[0] + minRange) {
        clone[0] = Math.max(val - minRange, min2);
      }
      if (val < clone[0] + minRange) {
        clone[index5] = valueRef.current[index5];
      }
      if (val - clone[0] > maxRange) {
        clone[0] = val - maxRange;
      }
    }
    clone[0] = getFloatingValue(clone[0], precision);
    clone[1] = getFloatingValue(clone[1], precision);
    _setValue(clone);
    if (triggerChangeEnd) {
      onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current);
    }
  };
  const handleChange = (val) => {
    if (!disabled) {
      const nextValue = getChangeValue({
        value: val,
        min: min2,
        max: max2,
        step,
        precision
      });
      setRangedValue(nextValue, thumbIndex.current, false);
    }
  };
  const { ref: container, active } = useMove(
    ({ x }) => handleChange(x),
    { onScrubEnd: () => onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current) },
    dir
  );
  function handleThumbMouseDown(index5) {
    thumbIndex.current = index5;
  }
  const handleTrackMouseDownCapture = (event) => {
    container.current.focus();
    const rect = container.current.getBoundingClientRect();
    const changePosition = getClientPosition(event.nativeEvent);
    const changeValue = getChangeValue({
      value: changePosition - rect.left,
      max: max2,
      min: min2,
      step,
      containerWidth: rect.width
    });
    const nearestHandle = Math.abs(_value[0] - changeValue) > Math.abs(_value[1] - changeValue) ? 1 : 0;
    const _nearestHandle = dir === "ltr" ? nearestHandle : nearestHandle === 1 ? 0 : 1;
    thumbIndex.current = _nearestHandle;
  };
  const getFocusedThumbIndex = () => {
    if (focused !== 1 && focused !== 0) {
      setFocused(0);
      return 0;
    }
    return focused;
  };
  const handleTrackKeydownCapture = (event) => {
    if (!disabled) {
      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(
            getFloatingValue(
              Math.min(Math.max(valueRef.current[focusedIndex] + step, min2), max2),
              precision
            ),
            focusedIndex,
            true
          );
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(
            getFloatingValue(
              Math.min(
                Math.max(
                  dir === "rtl" ? valueRef.current[focusedIndex] - step : valueRef.current[focusedIndex] + step,
                  min2
                ),
                max2
              ),
              precision
            ),
            focusedIndex,
            true
          );
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(
            getFloatingValue(
              Math.min(Math.max(valueRef.current[focusedIndex] - step, min2), max2),
              precision
            ),
            focusedIndex,
            true
          );
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(
            getFloatingValue(
              Math.min(
                Math.max(
                  dir === "rtl" ? valueRef.current[focusedIndex] + step : valueRef.current[focusedIndex] - step,
                  min2
                ),
                max2
              ),
              precision
            ),
            focusedIndex,
            true
          );
          break;
        }
      }
    }
  };
  const sharedThumbProps = {
    max: max2,
    min: min2,
    size: size2,
    labelTransitionProps,
    labelAlwaysOn,
    onBlur: () => setFocused(-1)
  };
  const hasArrayThumbChildren = Array.isArray(thumbChildren);
  return import_react323.default.createElement(SliderProvider, { value: { getStyles: getStyles2 } }, import_react323.default.createElement(SliderRoot, { ...others, size: size2, ref, disabled }, import_react323.default.createElement(
    Track,
    {
      offset: positions[0],
      marksOffset: _value[0],
      filled: positions[1] - positions[0],
      marks,
      inverted,
      min: min2,
      max: max2,
      value: _value[1],
      disabled,
      containerProps: {
        ref: container,
        onMouseEnter: showLabelOnHover ? () => setHovered(true) : void 0,
        onMouseLeave: showLabelOnHover ? () => setHovered(false) : void 0,
        onTouchStartCapture: handleTrackMouseDownCapture,
        onTouchEndCapture: () => {
          thumbIndex.current = -1;
        },
        onMouseDownCapture: handleTrackMouseDownCapture,
        onMouseUpCapture: () => {
          thumbIndex.current = -1;
        },
        onKeyDownCapture: handleTrackKeydownCapture
      }
    },
    import_react323.default.createElement(
      Thumb3,
      {
        ...sharedThumbProps,
        value: scale(_value[0]),
        position: positions[0],
        dragging: active,
        label: typeof label === "function" ? label(getFloatingValue(scale(_value[0]), precision)) : label,
        ref: (node) => {
          thumbs.current[0] = node;
        },
        thumbLabel: thumbFromLabel,
        onMouseDown: () => handleThumbMouseDown(0),
        onFocus: () => setFocused(0),
        showLabelOnHover,
        isHovered: hovered,
        disabled
      },
      hasArrayThumbChildren ? thumbChildren[0] : thumbChildren
    ),
    import_react323.default.createElement(
      Thumb3,
      {
        ...sharedThumbProps,
        thumbLabel: thumbToLabel,
        value: scale(_value[1]),
        position: positions[1],
        dragging: active,
        label: typeof label === "function" ? label(getFloatingValue(scale(_value[1]), precision)) : label,
        ref: (node) => {
          thumbs.current[1] = node;
        },
        onMouseDown: () => handleThumbMouseDown(1),
        onFocus: () => setFocused(1),
        showLabelOnHover,
        isHovered: hovered,
        disabled
      },
      hasArrayThumbChildren ? thumbChildren[1] : thumbChildren
    )
  ), import_react323.default.createElement("input", { type: "hidden", name: `${name}_from`, value: _value[0], ...hiddenInputProps }), import_react323.default.createElement("input", { type: "hidden", name: `${name}_to`, value: _value[1], ...hiddenInputProps })));
});
RangeSlider.classes = classes68;
RangeSlider.displayName = "@mantine/core/RangeSlider";

// node_modules/@mantine/core/esm/components/Space/Space.mjs
var import_react324 = __toESM(require_react(), 1);
var defaultProps154 = {};
var Space = factory((props, ref) => {
  const { w, h, miw, mih, ...others } = useProps("Space", defaultProps154, props);
  return import_react324.default.createElement(Box, { ref, ...others, w, miw: miw ?? w, h, mih: mih ?? h });
});
Space.displayName = "@mantine/core/Space";

// node_modules/@mantine/core/esm/components/Spoiler/Spoiler.mjs
var import_react325 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Spoiler/Spoiler.module.css.mjs
var classes69 = { "root": "m-559cce2d", "content": "m-b912df4e", "control": "m-b9131032" };

// node_modules/@mantine/core/esm/components/Spoiler/Spoiler.mjs
var defaultProps155 = {
  maxHeight: 100,
  initialState: false
};
var varsResolver71 = createVarsResolver((_, { transitionDuration }) => ({
  root: {
    "--spoiler-transition-duration": transitionDuration !== void 0 ? `${transitionDuration}ms` : void 0
  }
}));
var Spoiler = factory((_props, ref) => {
  const props = useProps("Spoiler", defaultProps155, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    initialState,
    maxHeight,
    hideLabel,
    showLabel,
    children,
    controlRef,
    transitionDuration,
    id,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Spoiler",
    classes: classes69,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver71
  });
  const _id = useId(id);
  const regionId = `${_id}-region`;
  const [show, setShowState] = (0, import_react325.useState)(initialState);
  const { ref: contentRef, height } = useElementSize();
  const spoilerMoreContent = show ? hideLabel : showLabel;
  const spoiler = spoilerMoreContent !== null && maxHeight < height;
  return import_react325.default.createElement(
    Box,
    {
      ...getStyles2("root"),
      id: _id,
      ref,
      "data-has-spoiler": spoiler || void 0,
      ...others
    },
    spoiler && import_react325.default.createElement(
      Anchor,
      {
        component: "button",
        type: "button",
        ref: controlRef,
        onClick: () => setShowState((opened) => !opened),
        "aria-expanded": show,
        "aria-controls": regionId,
        ...getStyles2("control")
      },
      spoilerMoreContent
    ),
    import_react325.default.createElement(
      "div",
      {
        ...getStyles2("content", {
          style: { maxHeight: !show ? rem(maxHeight) : height ? rem(height) : void 0 }
        }),
        "data-reduce-motion": true,
        role: "region",
        id: regionId
      },
      import_react325.default.createElement("div", { ref: contentRef }, children)
    )
  );
});
Spoiler.classes = classes69;
Spoiler.displayName = "@mantine/core/Spoiler";

// node_modules/@mantine/core/esm/components/Stack/Stack.mjs
var import_react326 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Stack/Stack.module.css.mjs
var classes70 = { "root": "m-6d731127" };

// node_modules/@mantine/core/esm/components/Stack/Stack.mjs
var defaultProps156 = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
};
var varsResolver72 = createVarsResolver((_, { gap, align, justify }) => ({
  root: {
    "--stack-gap": getSpacing(gap),
    "--stack-align": align,
    "--stack-justify": justify
  }
}));
var Stack = factory((_props, ref) => {
  const props = useProps("Stack", defaultProps156, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    align,
    justify,
    gap,
    variant,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Stack",
    props,
    classes: classes70,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver72
  });
  return import_react326.default.createElement(Box, { ref, ...getStyles2("root"), variant, ...others });
});
Stack.classes = classes70;
Stack.displayName = "@mantine/core/Stack";

// node_modules/@mantine/core/esm/components/Stepper/Stepper.mjs
var import_react329 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Stepper/StepperStep/StepperStep.mjs
var import_react328 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Stepper/Stepper.context.mjs
var import_react327 = __toESM(require_react(), 1);
var [StepperProvider, useStepperContext] = createSafeContext(
  "Stepper component was not found in tree"
);

// node_modules/@mantine/core/esm/components/Stepper/Stepper.module.css.mjs
var classes71 = { "root": "m-cbb4ea7e", "steps": "m-aaf89d0b", "separator": "m-2a371ac9", "content": "m-78da155d", "step": "m-cbb57068", "step--horizontal": "m-f56b1e2c", "step--vertical": "m-833edb7e", "verticalSeparator": "m-6496b3f3", "stepWrapper": "m-818e70b", "stepIcon": "m-1959ad01", "stepCompletedIcon": "m-a79331dc", "stepBody": "m-1956aa2a", "stepLabel": "m-12051f6c", "stepDescription": "m-164eea74" };

// node_modules/@mantine/core/esm/components/Stepper/StepperStep/StepperStep.mjs
var getStepFragment = (Fragment5, step) => {
  if (typeof Fragment5 === "function") {
    return import_react328.default.createElement(Fragment5, { step: step || 0 });
  }
  return Fragment5;
};
var defaultProps157 = {
  withIcon: true,
  allowStepClick: true,
  iconPosition: "left"
};
var StepperStep = factory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    step,
    state,
    color,
    icon,
    completedIcon,
    progressIcon,
    label,
    description,
    withIcon,
    iconSize,
    loading,
    allowStepClick,
    allowStepSelect,
    iconPosition,
    orientation,
    ...others
  } = useProps("StepperStep", defaultProps157, props);
  const ctx = useStepperContext();
  const theme = useMantineTheme();
  const stylesApi = { classNames, styles };
  const _icon = state === "stepCompleted" ? null : state === "stepProgress" ? progressIcon : icon;
  const dataAttributes = {
    "data-progress": state === "stepProgress" || void 0,
    "data-completed": state === "stepCompleted" || void 0
  };
  return import_react328.default.createElement(
    UnstyledButton,
    {
      ...ctx.getStyles("step", { className, style, variant: ctx.orientation, ...stylesApi }),
      mod: { "icon-position": iconPosition || ctx.iconPosition, "allow-click": allowStepClick },
      ref,
      ...dataAttributes,
      ...others,
      __vars: { "--step-color": color ? getThemeColor(color, theme) : void 0 },
      tabIndex: allowStepClick ? 0 : -1
    },
    withIcon && import_react328.default.createElement("span", { ...ctx.getStyles("stepWrapper", stylesApi) }, import_react328.default.createElement("span", { ...ctx.getStyles("stepIcon", stylesApi), ...dataAttributes }, import_react328.default.createElement(Transition, { mounted: state === "stepCompleted", transition: "pop", duration: 200 }, (transitionStyles) => import_react328.default.createElement(
      "span",
      {
        ...ctx.getStyles("stepCompletedIcon", { style: transitionStyles, ...stylesApi })
      },
      loading ? import_react328.default.createElement(
        Loader,
        {
          color: "var(--mantine-color-white)",
          size: "calc(var(--stepper-icon-size) / 2)",
          ...ctx.getStyles("stepLoader", stylesApi)
        }
      ) : getStepFragment(completedIcon, step) || import_react328.default.createElement(CheckIcon, { size: "60%" })
    )), state !== "stepCompleted" ? loading ? import_react328.default.createElement(
      Loader,
      {
        ...ctx.getStyles("stepLoader", stylesApi),
        size: "calc(var(--stepper-icon-size) / 2)",
        color
      }
    ) : getStepFragment(_icon || icon, step) : null), orientation === "vertical" && import_react328.default.createElement(
      "span",
      {
        ...ctx.getStyles("verticalSeparator", stylesApi),
        "data-active": state === "stepCompleted" || void 0
      }
    )),
    (label || description) && import_react328.default.createElement(
      "span",
      {
        ...ctx.getStyles("stepBody", stylesApi),
        "data-orientation": ctx.orientation,
        "data-icon-position": iconPosition || ctx.iconPosition
      },
      label && import_react328.default.createElement("span", { ...ctx.getStyles("stepLabel", stylesApi) }, getStepFragment(label, step)),
      description && import_react328.default.createElement("span", { ...ctx.getStyles("stepDescription", stylesApi) }, getStepFragment(description, step))
    )
  );
});
StepperStep.classes = classes71;
StepperStep.displayName = "@mantine/core/StepperStep";

// node_modules/@mantine/core/esm/components/Stepper/StepperCompleted/StepperCompleted.mjs
var StepperCompleted = () => null;
StepperCompleted.displayName = "@mantine/core/StepperCompleted";

// node_modules/@mantine/core/esm/components/Stepper/Stepper.mjs
var defaultProps158 = {
  orientation: "horizontal",
  iconPosition: "left",
  allowNextStepsSelect: true,
  wrap: true
};
var varsResolver73 = createVarsResolver(
  (theme, { color, iconSize, size: size2, contentPadding, radius }) => ({
    root: {
      "--stepper-color": color ? getThemeColor(color, theme) : void 0,
      "--stepper-icon-size": iconSize === void 0 ? getSize(size2, "stepper-icon-size") : rem(iconSize),
      "--stepper-content-padding": getSpacing(contentPadding),
      "--stepper-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--stepper-fz": getFontSize(size2),
      "--stepper-spacing": getSpacing(size2)
    }
  })
);
var Stepper = factory((_props, ref) => {
  var _a, _b, _c;
  const props = useProps("Stepper", defaultProps158, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    onStepClick,
    active,
    icon,
    completedIcon,
    progressIcon,
    color,
    iconSize,
    contentPadding,
    orientation,
    iconPosition,
    size: size2,
    radius,
    allowNextStepsSelect,
    wrap,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Stepper",
    classes: classes71,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver73
  });
  const convertedChildren = import_react329.Children.toArray(children);
  const _children = convertedChildren.filter((child) => child.type !== StepperCompleted);
  const completedStep = convertedChildren.find((item) => item.type === StepperCompleted);
  const items = _children.reduce((acc, item, index5) => {
    const state = active === index5 ? "stepProgress" : active > index5 ? "stepCompleted" : "stepInactive";
    const shouldAllowSelect = () => {
      if (typeof onStepClick !== "function") {
        return false;
      }
      if (typeof item.props.allowStepSelect === "boolean") {
        return item.props.allowStepSelect;
      }
      return state === "stepCompleted" || allowNextStepsSelect;
    };
    const isStepSelectionEnabled = shouldAllowSelect();
    acc.push(
      (0, import_react329.cloneElement)(item, {
        icon: item.props.icon || icon || index5 + 1,
        key: index5,
        step: index5,
        state,
        onClick: () => isStepSelectionEnabled && (onStepClick == null ? void 0 : onStepClick(index5)),
        allowStepClick: isStepSelectionEnabled,
        completedIcon: item.props.completedIcon || completedIcon,
        progressIcon: item.props.progressIcon || progressIcon,
        color: item.props.color || color,
        iconSize,
        radius,
        iconPosition: item.props.iconPosition || iconPosition,
        orientation,
        unstyled
      })
    );
    if (orientation === "horizontal" && index5 !== _children.length - 1) {
      acc.push(
        import_react329.default.createElement(
          "div",
          {
            ...getStyles2("separator"),
            "data-active": index5 < active || void 0,
            "data-orientation": orientation,
            key: `separator-${index5}`
          }
        )
      );
    }
    return acc;
  }, []);
  const stepContent = (_b = (_a = _children[active]) == null ? void 0 : _a.props) == null ? void 0 : _b.children;
  const completedContent = (_c = completedStep == null ? void 0 : completedStep.props) == null ? void 0 : _c.children;
  const content = active > _children.length - 1 ? completedContent : stepContent;
  return import_react329.default.createElement(StepperProvider, { value: { getStyles: getStyles2, orientation, iconPosition } }, import_react329.default.createElement(Box, { ...getStyles2("root"), ref, size: size2, ...others }, import_react329.default.createElement(
    Box,
    {
      ...getStyles2("steps"),
      mod: {
        orientation,
        "icon-position": iconPosition,
        wrap: wrap && orientation !== "vertical"
      }
    },
    items
  ), content && import_react329.default.createElement("div", { ...getStyles2("content") }, content)));
});
Stepper.classes = classes71;
Stepper.displayName = "@mantine/core/Stepper";
Stepper.Completed = StepperCompleted;
Stepper.Step = StepperStep;

// node_modules/@mantine/core/esm/components/Switch/Switch.mjs
var import_react332 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Switch/SwitchGroup.context.mjs
var import_react330 = __toESM(require_react(), 1);
var SwitchGroupContext = (0, import_react330.createContext)(null);
var SwitchGroupProvider = SwitchGroupContext.Provider;
var useSwitchGroupContext = () => (0, import_react330.useContext)(SwitchGroupContext);

// node_modules/@mantine/core/esm/components/Switch/SwitchGroup/SwitchGroup.mjs
var import_react331 = __toESM(require_react(), 1);
var defaultProps159 = {};
var SwitchGroup = factory((props, ref) => {
  const { value, defaultValue, onChange, size: size2, wrapperProps, children, ...others } = useProps(
    "SwitchGroup",
    defaultProps159,
    props
  );
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });
  const handleChange = (event) => {
    const itemValue = event.currentTarget.value;
    setValue(
      _value.includes(itemValue) ? _value.filter((item) => item !== itemValue) : [..._value, itemValue]
    );
  };
  return import_react331.default.createElement(SwitchGroupProvider, { value: { value: _value, onChange: handleChange, size: size2 } }, import_react331.default.createElement(
    Input.Wrapper,
    {
      size: size2,
      ref,
      ...wrapperProps,
      ...others,
      labelElement: "div",
      __staticSelector: "SwitchGroup"
    },
    import_react331.default.createElement(InputsGroupFieldset, { role: "group" }, children)
  ));
});
SwitchGroup.classes = Input.Wrapper.classes;
SwitchGroup.displayName = "@mantine/core/SwitchGroup";

// node_modules/@mantine/core/esm/components/Switch/Switch.module.css.mjs
var classes72 = { "root": "m-5f93f3bb", "input": "m-926b4011", "track": "m-9307d992", "thumb": "m-93039a1d", "trackLabel": "m-8277e082" };

// node_modules/@mantine/core/esm/components/Switch/Switch.mjs
var defaultProps160 = {
  labelPosition: "right"
};
var varsResolver74 = createVarsResolver((theme, { radius, color, size: size2 }) => ({
  root: {
    "--switch-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--switch-height": getSize(size2, "switch-height"),
    "--switch-width": getSize(size2, "switch-width"),
    "--switch-thumb-size": getSize(size2, "switch-thumb-size"),
    "--switch-label-font-size": getSize(size2, "switch-label-font-size"),
    "--switch-track-label-padding": getSize(size2, "switch-track-label-padding"),
    "--switch-color": color ? getThemeColor(color, theme) : void 0
  }
}));
var Switch = factory((_props, ref) => {
  const props = useProps("Switch", defaultProps160, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    label,
    offLabel,
    onLabel,
    id,
    size: size2,
    radius,
    wrapperProps,
    children,
    thumbIcon,
    checked,
    defaultChecked,
    onChange,
    labelPosition,
    description,
    error,
    disabled,
    variant,
    rootRef,
    ...others
  } = props;
  const ctx = useSwitchGroupContext();
  const _size = size2 || (ctx == null ? void 0 : ctx.size);
  const getStyles2 = useStyles({
    name: "Switch",
    props,
    classes: classes72,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver74
  });
  const { styleProps, rest } = extractStyleProps(others);
  const uuid = useId(id);
  const contextProps = ctx ? {
    checked: ctx.value.includes(rest.value),
    onChange: ctx.onChange
  } : {};
  const [_checked, handleChange] = useUncontrolled({
    value: contextProps.checked ?? checked,
    defaultValue: defaultChecked,
    finalValue: false
  });
  return import_react332.default.createElement(
    InlineInput,
    {
      ...getStyles2("root"),
      __staticSelector: "Switch",
      __stylesApiProps: props,
      id: uuid,
      size: _size,
      labelPosition,
      label,
      description,
      error,
      disabled,
      classNames,
      styles,
      unstyled,
      "data-checked": contextProps.checked || void 0,
      variant,
      ref: rootRef,
      ...styleProps,
      ...wrapperProps
    },
    import_react332.default.createElement(
      "input",
      {
        ...rest,
        disabled,
        checked: _checked,
        onChange: (event) => {
          var _a;
          ctx ? (_a = contextProps.onChange) == null ? void 0 : _a.call(contextProps, event) : onChange == null ? void 0 : onChange(event);
          handleChange(event.currentTarget.checked);
        },
        id: uuid,
        ref,
        type: "checkbox",
        ...getStyles2("input")
      }
    ),
    import_react332.default.createElement(
      Box,
      {
        component: "label",
        htmlFor: uuid,
        mod: { error, "label-position": labelPosition },
        ...getStyles2("track")
      },
      import_react332.default.createElement(Box, { component: "span", mod: "reduce-motion", ...getStyles2("thumb") }, thumbIcon),
      import_react332.default.createElement("span", { ...getStyles2("trackLabel") }, _checked ? onLabel : offLabel)
    )
  );
});
Switch.classes = { ...classes72, ...InlineInputClasses };
Switch.displayName = "@mantine/core/Switch";
Switch.Group = SwitchGroup;

// node_modules/@mantine/core/esm/components/Table/Table.mjs
var import_react337 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Table/Table.components.mjs
var import_react334 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Table/Table.context.mjs
var import_react333 = __toESM(require_react(), 1);
var [TableProvider, useTableContext] = createSafeContext(
  "Table component was not found in the tree"
);

// node_modules/@mantine/core/esm/components/Table/Table.module.css.mjs
var classes73 = { "table": "m-b23fa0ef", "th": "m-4e7aa4f3", "tr": "m-4e7aa4fd", "td": "m-4e7aa4ef", "tbody": "m-b2404537", "thead": "m-b242d975", "caption": "m-9e5a3ac7", "scrollContainer": "m-a100c15", "scrollContainerInner": "m-62259741" };

// node_modules/@mantine/core/esm/components/Table/Table.components.mjs
function getDataAttributes(ctx, options) {
  if (!options) {
    return void 0;
  }
  const data = {};
  if (options.columnBorder && ctx.withColumnBorders) {
    data["data-with-column-border"] = true;
  }
  if (options.rowBorder && ctx.withRowBorders) {
    data["data-with-row-border"] = true;
  }
  if (options.striped && ctx.striped) {
    data["data-striped"] = ctx.striped;
  }
  if (options.highlightOnHover && ctx.highlightOnHover) {
    data["data-hover"] = true;
  }
  if (options.captionSide && ctx.captionSide) {
    data["data-side"] = ctx.captionSide;
  }
  if (options.stickyHeader && ctx.stickyHeader) {
    data["data-sticky"] = true;
  }
  return data;
}
function tableElement(element, options) {
  const name = `Table${element.charAt(0).toUpperCase()}${element.slice(1)}`;
  const Component = factory((_props, ref) => {
    const props = useProps(name, {}, _props);
    const { classNames, className, style, styles, ...others } = props;
    const ctx = useTableContext();
    return import_react334.default.createElement(
      Box,
      {
        component: element,
        ref,
        ...getDataAttributes(ctx, options),
        ...ctx.getStyles(element, { className, classNames, style, styles, props }),
        ...others
      }
    );
  });
  Component.displayName = `@mantine/core/${name}`;
  Component.classes = classes73;
  return Component;
}
var TableTh = tableElement("th", { columnBorder: true });
var TableTd = tableElement("td", { columnBorder: true });
var TableTr = tableElement("tr", {
  rowBorder: true,
  striped: true,
  highlightOnHover: true
});
var TableThead = tableElement("thead", { stickyHeader: true });
var TableTbody = tableElement("tbody");
var TableTfoot = tableElement("tfoot");
var TableCaption = tableElement("caption", { captionSide: true });

// node_modules/@mantine/core/esm/components/Table/TableDataRenderer.mjs
var import_react335 = __toESM(require_react(), 1);
function TableDataRenderer({ data }) {
  return import_react335.default.createElement(import_react335.default.Fragment, null, data.caption && import_react335.default.createElement(TableCaption, null, data.caption), data.head && import_react335.default.createElement(TableThead, null, import_react335.default.createElement(TableTr, null, data.head.map((item, index5) => import_react335.default.createElement(TableTh, { key: index5 }, item)))), data.body && import_react335.default.createElement(TableTbody, null, data.body.map((row, rowIndex) => import_react335.default.createElement(TableTr, { key: rowIndex }, row.map((item, index5) => import_react335.default.createElement(TableTd, { key: index5 }, item))))), data.foot && import_react335.default.createElement(TableTfoot, null, import_react335.default.createElement(TableTr, null, data.foot.map((item, index5) => import_react335.default.createElement(TableTh, { key: index5 }, item)))));
}
TableDataRenderer.displayName = "@mantine/core/TableDataRenderer";

// node_modules/@mantine/core/esm/components/Table/TableScrollContainer.mjs
var import_react336 = __toESM(require_react(), 1);
var defaultProps161 = {
  type: "scrollarea"
};
var varsResolver75 = createVarsResolver((_, { minWidth, type }) => ({
  scrollContainer: {
    "--table-min-width": rem(minWidth),
    "--table-overflow": type === "native" ? "auto" : void 0
  }
}));
var TableScrollContainer = factory((_props, ref) => {
  const props = useProps("TableScrollContainer", defaultProps161, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    minWidth,
    type,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "TableScrollContainer",
    classes: classes73,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver75,
    rootSelector: "scrollContainer"
  });
  return import_react336.default.createElement(
    Box,
    {
      component: type === "scrollarea" ? ScrollArea : "div",
      ...type === "scrollarea" ? { offsetScrollbars: "x" } : {},
      ref,
      ...getStyles2("scrollContainer"),
      ...others
    },
    import_react336.default.createElement("div", { ...getStyles2("scrollContainerInner") }, children)
  );
});
TableScrollContainer.classes = classes73;
TableScrollContainer.displayName = "@mantine/core/TableScrollContainer";

// node_modules/@mantine/core/esm/components/Table/Table.mjs
var defaultProps162 = {
  withRowBorders: true,
  verticalSpacing: 7
};
var varsResolver76 = createVarsResolver(
  (theme, {
    layout,
    captionSide,
    horizontalSpacing,
    verticalSpacing,
    borderColor,
    stripedColor,
    highlightOnHoverColor,
    striped,
    highlightOnHover,
    stickyHeaderOffset,
    stickyHeader
  }) => ({
    table: {
      "--table-layout": layout,
      "--table-caption-side": captionSide,
      "--table-horizontal-spacing": getSpacing(horizontalSpacing),
      "--table-vertical-spacing": getSpacing(verticalSpacing),
      "--table-border-color": borderColor ? getThemeColor(borderColor, theme) : void 0,
      "--table-striped-color": striped && stripedColor ? getThemeColor(stripedColor, theme) : void 0,
      "--table-highlight-on-hover-color": highlightOnHover && highlightOnHoverColor ? getThemeColor(highlightOnHoverColor, theme) : void 0,
      "--table-sticky-header-offset": stickyHeader ? rem(stickyHeaderOffset) : void 0
    }
  })
);
var Table = factory((_props, ref) => {
  const props = useProps("Table", defaultProps162, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    horizontalSpacing,
    verticalSpacing,
    captionSide,
    stripedColor,
    highlightOnHoverColor,
    striped,
    highlightOnHover,
    withColumnBorders,
    withRowBorders,
    withTableBorder,
    borderColor,
    layout,
    variant,
    data,
    children,
    stickyHeader,
    stickyHeaderOffset,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Table",
    props,
    className,
    style,
    classes: classes73,
    classNames,
    styles,
    unstyled,
    rootSelector: "table",
    vars,
    varsResolver: varsResolver76
  });
  return import_react337.default.createElement(
    TableProvider,
    {
      value: {
        getStyles: getStyles2,
        stickyHeader,
        striped: striped === true ? "odd" : striped || void 0,
        highlightOnHover,
        withColumnBorders,
        withRowBorders,
        captionSide: captionSide || "bottom"
      }
    },
    import_react337.default.createElement(
      Box,
      {
        component: "table",
        variant,
        ref,
        mod: { "data-with-table-border": withTableBorder },
        ...getStyles2("table"),
        ...others
      },
      children || !!data && import_react337.default.createElement(TableDataRenderer, { data })
    )
  );
});
Table.classes = classes73;
Table.displayName = "@mantine/core/Table";
Table.Td = TableTd;
Table.Th = TableTh;
Table.Tr = TableTr;
Table.Thead = TableThead;
Table.Tbody = TableTbody;
Table.Tfoot = TableTfoot;
Table.Caption = TableCaption;
Table.ScrollContainer = TableScrollContainer;
Table.DataRenderer = TableDataRenderer;

// node_modules/@mantine/core/esm/components/Tabs/Tabs.mjs
var import_react342 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Tabs/Tabs.context.mjs
var import_react338 = __toESM(require_react(), 1);
var [TabsProvider, useTabsContext] = createSafeContext(
  "Tabs component was not found in the tree"
);

// node_modules/@mantine/core/esm/components/Tabs/TabsList/TabsList.mjs
var import_react339 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Tabs/Tabs.module.css.mjs
var classes74 = { "root": "m-89d60db1", "list--default": "m-576c9d4", "list": "m-89d33d6d", "panel": "m-b0c91715", "tab": "m-4ec4dce6", "tabSection": "m-fc420b1f", "tab--default": "m-539e827b", "list--outline": "m-6772fbd5", "tab--outline": "m-b59ab47c", "tab--pills": "m-c3381914" };

// node_modules/@mantine/core/esm/components/Tabs/TabsList/TabsList.mjs
var defaultProps163 = {};
var TabsList = factory((_props, ref) => {
  const props = useProps("TabsList", defaultProps163, _props);
  const { children, className, grow, justify, classNames, styles, style, ...others } = props;
  const ctx = useTabsContext();
  return import_react339.default.createElement(
    Box,
    {
      ...others,
      ...ctx.getStyles("list", {
        className,
        style,
        classNames,
        styles,
        props,
        variant: ctx.variant
      }),
      ref,
      role: "tablist",
      variant: ctx.variant,
      mod: {
        grow,
        orientation: ctx.orientation,
        placement: ctx.orientation === "vertical" && ctx.placement,
        inverted: ctx.inverted
      },
      "aria-orientation": ctx.orientation,
      __vars: { "--tabs-justify": justify }
    },
    children
  );
});
TabsList.classes = classes74;
TabsList.displayName = "@mantine/core/TabsList";

// node_modules/@mantine/core/esm/components/Tabs/TabsPanel/TabsPanel.mjs
var import_react340 = __toESM(require_react(), 1);
var defaultProps164 = {};
var TabsPanel = factory((_props, ref) => {
  const props = useProps("TabsPanel", defaultProps164, _props);
  const { children, className, value, classNames, styles, style, ...others } = props;
  const ctx = useTabsContext();
  const active = ctx.value === value;
  const content = ctx.keepMounted || props.keepMounted ? children : active ? children : null;
  return import_react340.default.createElement(
    Box,
    {
      ...others,
      ...ctx.getStyles("panel", {
        className,
        classNames,
        styles,
        style: [style, !active ? { display: "none" } : void 0],
        props
      }),
      ref,
      mod: { orientation: ctx.orientation },
      role: "tabpanel",
      id: ctx.getPanelId(value),
      "aria-labelledby": ctx.getTabId(value)
    },
    content
  );
});
TabsPanel.classes = classes74;
TabsPanel.displayName = "@mantine/core/TabsPanel";

// node_modules/@mantine/core/esm/components/Tabs/TabsTab/TabsTab.mjs
var import_react341 = __toESM(require_react(), 1);
var defaultProps165 = {};
var TabsTab = factory((_props, ref) => {
  const props = useProps("TabsTab", defaultProps165, _props);
  const {
    className,
    children,
    rightSection,
    leftSection,
    value,
    onClick,
    onKeyDown,
    disabled,
    color,
    style,
    classNames,
    styles,
    vars,
    ...others
  } = props;
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const ctx = useTabsContext();
  const active = value === ctx.value;
  const activateTab = (event) => {
    ctx.onChange(ctx.allowTabDeactivation ? value === ctx.value ? null : value : value);
    onClick == null ? void 0 : onClick(event);
  };
  const stylesApiProps = { classNames, styles, props };
  return import_react341.default.createElement(
    UnstyledButton,
    {
      ...others,
      ...ctx.getStyles("tab", { className, style, variant: ctx.variant, ...stylesApiProps }),
      disabled,
      unstyled: ctx.unstyled,
      variant: ctx.variant,
      mod: {
        active,
        disabled,
        orientation: ctx.orientation,
        inverted: ctx.inverted,
        placement: ctx.orientation === "vertical" && ctx.placement
      },
      ref,
      role: "tab",
      id: ctx.getTabId(value),
      "aria-selected": active,
      tabIndex: active || ctx.value === null ? 0 : -1,
      "aria-controls": ctx.getPanelId(value),
      onClick: activateTab,
      __vars: { "--tabs-color": color ? getThemeColor(color, theme) : void 0 },
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: ctx.activateTabWithKeyboard,
        loop: ctx.loop,
        orientation: ctx.orientation || "horizontal",
        dir,
        onKeyDown
      })
    },
    leftSection && import_react341.default.createElement("span", { ...ctx.getStyles("tabSection", stylesApiProps), "data-position": "left" }, leftSection),
    children && import_react341.default.createElement("span", { ...ctx.getStyles("tabLabel", stylesApiProps) }, children),
    rightSection && import_react341.default.createElement("span", { ...ctx.getStyles("tabSection", stylesApiProps), "data-position": "right" }, rightSection)
  );
});
TabsTab.classes = classes74;
TabsTab.displayName = "@mantine/core/TabsTab";

// node_modules/@mantine/core/esm/components/Tabs/Tabs.mjs
var VALUE_ERROR = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value";
var defaultProps166 = {
  keepMounted: true,
  orientation: "horizontal",
  loop: true,
  activateTabWithKeyboard: true,
  allowTabDeactivation: false,
  unstyled: false,
  inverted: false,
  variant: "default",
  placement: "left"
};
var varsResolver77 = createVarsResolver((theme, { radius, color }) => ({
  root: {
    "--tabs-radius": getRadius(radius),
    "--tabs-color": getThemeColor(color, theme)
  }
}));
var Tabs = factory((_props, ref) => {
  const props = useProps("Tabs", defaultProps166, _props);
  const {
    defaultValue,
    value,
    onChange,
    orientation,
    children,
    loop,
    id,
    activateTabWithKeyboard,
    allowTabDeactivation,
    variant,
    color,
    radius,
    inverted,
    placement,
    keepMounted,
    classNames,
    styles,
    unstyled,
    className,
    style,
    vars,
    ...others
  } = props;
  const uid = useId(id);
  const [currentTab, setCurrentTab] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const getStyles2 = useStyles({
    name: "Tabs",
    props,
    classes: classes74,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver77
  });
  return import_react342.default.createElement(
    TabsProvider,
    {
      value: {
        placement,
        value: currentTab,
        orientation,
        id: uid,
        loop,
        activateTabWithKeyboard,
        getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
        getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
        onChange: setCurrentTab,
        allowTabDeactivation,
        variant,
        color,
        radius,
        inverted,
        keepMounted,
        unstyled,
        getStyles: getStyles2
      }
    },
    import_react342.default.createElement(
      Box,
      {
        ref,
        id: uid,
        variant,
        mod: {
          orientation,
          inverted: orientation === "horizontal" && inverted,
          placement: orientation === "vertical" && placement
        },
        ...getStyles2("root"),
        ...others
      },
      children
    )
  );
});
Tabs.classes = classes74;
Tabs.displayName = "@mantine/core/Tabs";
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.List = TabsList;

// node_modules/@mantine/core/esm/components/TagsInput/TagsInput.mjs
var import_react344 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/TagsInput/get-splitted-tags.mjs
function splitTags(splitChars, value) {
  if (!splitChars)
    return [value];
  return value.split(new RegExp(`[${splitChars.join("")}]`)).map((tag) => tag.trim()).filter((tag) => tag !== "");
}
function getSplittedTags({
  splitChars,
  allowDuplicates,
  maxTags,
  value,
  currentTags
}) {
  const splitted = splitTags(splitChars, value);
  const merged = allowDuplicates ? [...currentTags, ...splitted] : [.../* @__PURE__ */ new Set([...currentTags, ...splitted])];
  return maxTags ? merged.slice(0, maxTags) : merged;
}

// node_modules/@mantine/core/esm/components/TagsInput/filter-picked-tags.mjs
var import_react343 = __toESM(require_react(), 1);
function filterPickedTags({ data, value }) {
  const normalizedValue = value.map((item) => item.trim().toLowerCase());
  const filtered = data.reduce((acc, item) => {
    if (isOptionsGroup(item)) {
      acc.push({
        group: item.group,
        items: item.items.filter(
          (option) => normalizedValue.indexOf(option.label.toLowerCase().trim()) === -1
        )
      });
    } else if (normalizedValue.indexOf(item.label.toLowerCase().trim()) === -1) {
      acc.push(item);
    }
    return acc;
  }, []);
  return filtered;
}

// node_modules/@mantine/core/esm/components/TagsInput/TagsInput.mjs
var defaultProps167 = {
  maxTags: Infinity,
  allowDuplicates: false,
  splitChars: [","],
  hiddenInputValuesDivider: ","
};
var TagsInput = factory((_props, ref) => {
  const props = useProps("TagsInput", defaultProps167, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    value,
    defaultValue,
    onChange,
    onKeyDown,
    maxTags,
    allowDuplicates,
    onDuplicate,
    variant,
    data,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose,
    selectFirstOptionOnChange,
    onOptionSubmit,
    comboboxProps,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    readOnly,
    disabled,
    splitChars,
    onFocus,
    onBlur,
    onPaste,
    radius,
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents,
    rightSectionProps,
    leftSection,
    leftSectionWidth,
    leftSectionPointerEvents,
    leftSectionProps,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    required,
    labelProps,
    descriptionProps,
    errorProps,
    wrapperProps,
    description,
    label,
    error,
    withErrorStyles,
    name,
    form,
    id,
    clearable,
    clearButtonProps,
    hiddenInputProps,
    hiddenInputValuesDivider,
    ...others
  } = props;
  const _id = useId(id);
  const parsedData = getParsedComboboxData(data);
  const optionsLockup = getOptionsLockup(parsedData);
  const combobox = useCombobox({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose: () => {
      onDropdownClose == null ? void 0 : onDropdownClose();
      combobox.resetSelectedOption();
    }
  });
  const {
    styleProps,
    rest: { type, ...rest }
  } = extractStyleProps(others);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });
  const [_searchValue, setSearchValue] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: "",
    onChange: onSearchChange
  });
  const getStyles2 = useStyles({
    name: "TagsInput",
    classes: {},
    props,
    classNames,
    styles,
    unstyled
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    props,
    styles,
    classNames
  });
  const handleInputKeydown = (event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    const inputValue = _searchValue.trim();
    const { length } = inputValue;
    if (splitChars.includes(event.key) && length > 0) {
      setValue(
        getSplittedTags({
          splitChars,
          allowDuplicates,
          maxTags,
          value: _searchValue,
          currentTags: _value
        })
      );
      setSearchValue("");
      event.preventDefault();
    }
    if (event.key === "Enter" && length > 0 && !event.nativeEvent.isComposing) {
      event.preventDefault();
      const isDuplicate = _value.some((tag) => tag.toLowerCase() === inputValue.toLowerCase());
      if (isDuplicate) {
        onDuplicate == null ? void 0 : onDuplicate(inputValue);
      }
      if ((!isDuplicate || isDuplicate && allowDuplicates) && _value.length < maxTags) {
        onOptionSubmit == null ? void 0 : onOptionSubmit(inputValue);
        setSearchValue("");
        if (inputValue.length > 0) {
          setValue([..._value, inputValue]);
        }
      }
    }
    if (event.key === "Backspace" && length === 0 && _value.length > 0) {
      setValue(_value.slice(0, _value.length - 1));
    }
  };
  const handlePaste = (event) => {
    onPaste == null ? void 0 : onPaste(event);
    event.preventDefault();
    if (event.clipboardData) {
      const pastedText = event.clipboardData.getData("text/plain");
      setValue(
        getSplittedTags({
          splitChars,
          allowDuplicates,
          maxTags,
          value: pastedText,
          currentTags: _value
        })
      );
      setSearchValue("");
    }
  };
  const values = _value.map((item, index5) => import_react344.default.createElement(
    Pill,
    {
      key: `${item}-${index5}`,
      withRemoveButton: !readOnly,
      onRemove: () => setValue(_value.filter((i) => item !== i)),
      unstyled,
      ...getStyles2("pill")
    },
    item
  ));
  const clearButton = clearable && _value.length > 0 && !disabled && !readOnly && import_react344.default.createElement(
    Combobox.ClearButton,
    {
      size: size2,
      ...clearButtonProps,
      onClear: () => {
        setValue([]);
        setSearchValue("");
      }
    }
  );
  return import_react344.default.createElement(import_react344.default.Fragment, null, import_react344.default.createElement(
    Combobox,
    {
      store: combobox,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      unstyled,
      size: size2,
      readOnly,
      __staticSelector: "TagsInput",
      onOptionSubmit: (val) => {
        onOptionSubmit == null ? void 0 : onOptionSubmit(val);
        setSearchValue("");
        _value.length < maxTags && setValue([..._value, optionsLockup[val].label]);
      },
      ...comboboxProps
    },
    import_react344.default.createElement(Combobox.DropdownTarget, null, import_react344.default.createElement(
      PillsInput,
      {
        ...styleProps,
        __staticSelector: "TagsInput",
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        size: size2,
        className,
        style,
        variant,
        disabled,
        radius,
        rightSection: rightSection || clearButton,
        rightSectionWidth,
        rightSectionPointerEvents,
        rightSectionProps,
        leftSection,
        leftSectionWidth,
        leftSectionPointerEvents,
        leftSectionProps,
        inputContainer,
        inputWrapperOrder,
        withAsterisk,
        required,
        labelProps,
        descriptionProps,
        errorProps,
        wrapperProps,
        description,
        label,
        error,
        multiline: true,
        withErrorStyles,
        __stylesApiProps: { ...props, multiline: true },
        id: _id
      },
      import_react344.default.createElement(Pill.Group, { disabled, unstyled, ...getStyles2("pillsList") }, values, import_react344.default.createElement(Combobox.EventsTarget, null, import_react344.default.createElement(
        PillsInput.Field,
        {
          ...rest,
          ref,
          ...getStyles2("inputField"),
          unstyled,
          onKeyDown: handleInputKeydown,
          onFocus: (event) => {
            onFocus == null ? void 0 : onFocus(event);
            combobox.openDropdown();
          },
          onBlur: (event) => {
            onBlur == null ? void 0 : onBlur(event);
            combobox.closeDropdown();
          },
          onPaste: handlePaste,
          value: _searchValue,
          onChange: (event) => setSearchValue(event.currentTarget.value),
          required: required && _value.length === 0,
          disabled,
          readOnly,
          id: _id
        }
      )))
    )),
    import_react344.default.createElement(
      OptionsDropdown,
      {
        data: filterPickedTags({ data: parsedData, value: _value }),
        hidden: readOnly || disabled,
        filter,
        search: _searchValue,
        limit,
        hiddenWhenEmpty: true,
        withScrollArea,
        maxDropdownHeight,
        unstyled,
        labelId: `${_id}-label`
      }
    )
  ), import_react344.default.createElement(
    "input",
    {
      type: "hidden",
      name,
      form,
      value: _value.join(hiddenInputValuesDivider),
      disabled,
      ...hiddenInputProps
    }
  ));
});
TagsInput.classes = { ...InputBase.classes, ...Combobox.classes };
TagsInput.displayName = "@mantine/core/TagsInput";

// node_modules/@mantine/core/esm/components/TextInput/TextInput.mjs
var import_react345 = __toESM(require_react(), 1);
var defaultProps168 = {};
var TextInput = factory((props, ref) => {
  const _props = useProps("TextInput", defaultProps168, props);
  return import_react345.default.createElement(InputBase, { component: "input", ref, ..._props, __staticSelector: "TextInput" });
});
TextInput.classes = InputBase.classes;
TextInput.displayName = "@mantine/core/TextInput";

// node_modules/@mantine/core/esm/components/ThemeIcon/ThemeIcon.mjs
var import_react346 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/ThemeIcon/ThemeIcon.module.css.mjs
var classes75 = { "root": "m-7341320d" };

// node_modules/@mantine/core/esm/components/ThemeIcon/ThemeIcon.mjs
var defaultProps169 = {};
var varsResolver78 = createVarsResolver(
  (theme, { size: size2, radius, variant, gradient, color }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled"
    });
    return {
      root: {
        "--ti-size": getSize(size2, "ti-size"),
        "--ti-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--ti-bg": color || variant ? colors.background : void 0,
        "--ti-color": color || variant ? colors.color : void 0,
        "--ti-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
var ThemeIcon = factory((_props, ref) => {
  const props = useProps("ThemeIcon", defaultProps169, _props);
  const { classNames, className, style, styles, unstyled, vars, ...others } = props;
  const getStyles2 = useStyles({
    name: "ThemeIcon",
    classes: classes75,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver78
  });
  return import_react346.default.createElement(Box, { ref, ...getStyles2("root"), ...others });
});
ThemeIcon.classes = classes75;
ThemeIcon.displayName = "@mantine/core/ThemeIcon";

// node_modules/@mantine/core/esm/components/Timeline/Timeline.mjs
var import_react349 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Timeline/TimelineItem/TimelineItem.mjs
var import_react348 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Timeline/Timeline.context.mjs
var import_react347 = __toESM(require_react(), 1);
var [TimelineProvider, useTimelineContext] = createSafeContext(
  "Timeline component was not found in tree"
);

// node_modules/@mantine/core/esm/components/Timeline/Timeline.module.css.mjs
var classes76 = { "root": "m-43657ece", "itemTitle": "m-2ebe8099", "item": "m-436178ff", "itemBullet": "m-8affcee1", "itemBody": "m-540e8f41" };

// node_modules/@mantine/core/esm/components/Timeline/TimelineItem/TimelineItem.mjs
var defaultProps170 = {};
var TimelineItem = factory((_props, ref) => {
  const props = useProps("TimelineItem", defaultProps170, _props);
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    __active,
    __align,
    __lineActive,
    __vars,
    bullet,
    radius,
    color,
    lineVariant,
    children,
    title,
    ...others
  } = props;
  const ctx = useTimelineContext();
  const theme = useMantineTheme();
  const stylesApiProps = { classNames, styles };
  return import_react348.default.createElement(
    Box,
    {
      ...ctx.getStyles("item", { ...stylesApiProps, className, style }),
      mod: { "line-active": __lineActive, active: __active },
      ref,
      __vars: {
        "--tli-radius": radius ? getRadius(radius) : void 0,
        "--tli-color": color ? getThemeColor(color, theme) : void 0,
        "--tli-border-style": lineVariant || void 0
      },
      ...others
    },
    import_react348.default.createElement(
      Box,
      {
        ...ctx.getStyles("itemBullet", stylesApiProps),
        mod: { "with-child": !!bullet, align: __align, active: __active }
      },
      bullet
    ),
    import_react348.default.createElement("div", { ...ctx.getStyles("itemBody", stylesApiProps) }, title && import_react348.default.createElement("div", { ...ctx.getStyles("itemTitle", stylesApiProps) }, title), import_react348.default.createElement("div", { ...ctx.getStyles("itemContent", stylesApiProps) }, children))
  );
});
TimelineItem.classes = classes76;
TimelineItem.displayName = "@mantine/core/TimelineItem";

// node_modules/@mantine/core/esm/components/Timeline/Timeline.mjs
var defaultProps171 = {
  active: -1,
  align: "left",
  reverseActive: false
};
var varsResolver79 = createVarsResolver(
  (theme, { bulletSize, lineWidth, radius, color }) => ({
    root: {
      "--tl-bullet-size": rem(bulletSize),
      "--tl-line-width": rem(lineWidth),
      "--tl-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--tl-color": color ? getThemeColor(color, theme) : void 0
    }
  })
);
var Timeline = factory((_props, ref) => {
  const props = useProps("Timeline", defaultProps171, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    active,
    color,
    radius,
    bulletSize,
    align,
    lineWidth,
    reverseActive,
    ...others
  } = props;
  const getStyles2 = useStyles({
    name: "Timeline",
    classes: classes76,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver79
  });
  const _children = import_react349.Children.toArray(children);
  const items = _children.map(
    (item, index5) => {
      var _a, _b;
      return (0, import_react349.cloneElement)(item, {
        unstyled,
        __align: align,
        __active: ((_a = item.props) == null ? void 0 : _a.active) || (reverseActive ? active >= _children.length - index5 - 1 : active >= index5),
        __lineActive: ((_b = item.props) == null ? void 0 : _b.lineActive) || (reverseActive ? active >= _children.length - index5 - 1 : active - 1 >= index5)
      });
    }
  );
  return import_react349.default.createElement(TimelineProvider, { value: { getStyles: getStyles2 } }, import_react349.default.createElement(Box, { ...getStyles2("root"), mod: { align }, ref, ...others }, items));
});
Timeline.classes = classes76;
Timeline.displayName = "@mantine/core/Timeline";
Timeline.Item = TimelineItem;

// node_modules/@mantine/core/esm/components/Title/Title.mjs
var import_react351 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/Title/get-title-size.mjs
var import_react350 = __toESM(require_react(), 1);
var headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
function getTitleSize(order, size2) {
  const titleSize = size2 !== void 0 ? size2 : `h${order}`;
  if (headings.includes(titleSize)) {
    return {
      fontSize: `var(--mantine-${titleSize}-font-size)`,
      fontWeight: `var(--mantine-${titleSize}-font-weight)`,
      lineHeight: `var(--mantine-${titleSize}-line-height)`
    };
  }
  return {
    fontSize: rem(titleSize),
    fontWeight: `var(--mantine-h${order}-font-weight)`,
    lineHeight: `var(--mantine-h${order}-line-height)`
  };
}

// node_modules/@mantine/core/esm/components/Title/Title.module.css.mjs
var classes77 = { "root": "m-8a5d1357" };

// node_modules/@mantine/core/esm/components/Title/Title.mjs
var defaultProps172 = {
  order: 1
};
var varsResolver80 = createVarsResolver((_, { order, size: size2 }) => {
  const sizeVariables = getTitleSize(order, size2);
  return {
    root: {
      "--title-fw": sizeVariables.fontWeight,
      "--title-lh": sizeVariables.lineHeight,
      "--title-fz": sizeVariables.fontSize
    }
  };
});
var Title = factory((_props, ref) => {
  const props = useProps("Title", defaultProps172, _props);
  const { classNames, className, style, styles, unstyled, order, vars, size: size2, variant, ...others } = props;
  const getStyles2 = useStyles({
    name: "Title",
    props,
    classes: classes77,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver80
  });
  if (![1, 2, 3, 4, 5, 6].includes(order)) {
    return null;
  }
  return import_react351.default.createElement(
    Box,
    {
      ...getStyles2("root"),
      component: `h${order}`,
      variant,
      ref,
      mod: { order },
      size: size2,
      ...others
    }
  );
});
Title.classes = classes77;
Title.displayName = "@mantine/core/Title";

// node_modules/@mantine/core/esm/components/TypographyStylesProvider/TypographyStylesProvider.mjs
var import_react352 = __toESM(require_react(), 1);

// node_modules/@mantine/core/esm/components/TypographyStylesProvider/TypographyStylesProvider.module.css.mjs
var classes78 = { "root": "m-d6493fad" };

// node_modules/@mantine/core/esm/components/TypographyStylesProvider/TypographyStylesProvider.mjs
var defaultProps173 = {};
var TypographyStylesProvider = factory((_props, ref) => {
  const props = useProps("TypographyStylesProvider", defaultProps173, _props);
  const { classNames, className, style, styles, unstyled, ...others } = props;
  const getStyles2 = useStyles({
    name: "TypographyStylesProvider",
    classes: classes78,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled
  });
  return import_react352.default.createElement(Box, { ref, ...getStyles2("root"), ...others });
});
TypographyStylesProvider.classes = classes78;
TypographyStylesProvider.displayName = "@mantine/core/TypographyStylesProvider";

export {
  Combination_default,
  keys,
  deepMerge,
  camelToKebabCase,
  px,
  rem,
  em,
  filterProps,
  isNumberLike,
  isElement,
  createSafeContext,
  createOptionalContext,
  getSafeId,
  findElementAncestor,
  createScopedKeydownHandler,
  getDefaultZIndex,
  noop,
  closeOnEscape,
  getSize,
  getSpacing,
  getRadius,
  getFontSize,
  getLineHeight,
  getShadow,
  createEventHandler,
  getBreakpointValue,
  getSortedBreakpoints,
  getBaseValue,
  getContextItemIndex,
  useHovered,
  createUseExternalEvents,
  createVarsResolver,
  resolveClassNames,
  resolveStyles,
  MantineContext,
  useMantineContext,
  useMantineCssVariablesResolver,
  useMantineClassNamesPrefix,
  useMantineStyleNonce,
  getPrimaryShade,
  parseThemeColor,
  getThemeColor,
  getGradient,
  toRgba,
  darken,
  rgba,
  defaultVariantColorsResolver,
  DEFAULT_THEME,
  validateMantineTheme,
  mergeMantineTheme,
  MantineThemeContext,
  useSafeMantineTheme,
  useMantineTheme,
  MantineThemeProvider,
  convertCssVariables,
  defaultCssVariablesResolver,
  isMantineColorScheme,
  localStorageColorSchemeManager,
  useProviderColorScheme,
  MantineProvider,
  useResolvedStylesApi,
  FOCUS_CLASS_NAMES,
  useStyles,
  lighten,
  isLightColor,
  useMantineColorScheme,
  useComputedColorScheme,
  ColorSchemeScript,
  useProps,
  createTheme,
  mergeThemeOverrides,
  stylesToString,
  InlineStyles,
  extractStyleProps,
  STYlE_PROPS_DATA,
  parseStyleProps,
  useRandomClassName,
  getStyleObject,
  createPolymorphicComponent,
  Box,
  factory,
  polymorphicFactory,
  DirectionContext,
  useDirection,
  DirectionProvider,
  Collapse,
  ScrollArea,
  ScrollAreaAutosize,
  UnstyledButton,
  VisuallyHidden,
  Paper,
  getFloatingPosition,
  FloatingArrow3 as FloatingArrow,
  useFloatingAutoUpdate,
  PopoverTarget,
  Portal,
  OptionalPortal,
  transitions,
  Transition,
  FocusTrap,
  PopoverDropdown,
  Popover,
  defaultLoaders,
  Loader,
  ActionIconGroup,
  ActionIcon,
  CloseIcon,
  CloseButton,
  Group,
  Overlay,
  ModalBase,
  ModalBaseBody,
  ModalBaseCloseButton,
  ModalBaseContent,
  ModalBaseHeader,
  ModalBaseOverlay,
  ModalBaseTitle,
  NativeScrollArea,
  useInputWrapperContext,
  InputLabel,
  InputError,
  InputDescription,
  InputPlaceholder,
  InputWrapper,
  Input,
  useInputProps,
  InputBase,
  FLEX_STYLE_PROPS_DATA,
  Flex,
  AccordionChevron,
  AccordionItem,
  AccordionPanel,
  AccordionControl,
  Accordion,
  Affix,
  Alert,
  Text,
  Anchor,
  AppShellNavbar,
  AppShellHeader,
  AppShellFooter,
  AppShellAside,
  AppShellMain,
  AppShellSection,
  AppShell,
  AspectRatio,
  getParsedComboboxData,
  getOptionsLockup,
  getLabelsLockup,
  ComboboxChevron,
  useCombobox,
  useComboboxTargetProps,
  ComboboxTarget,
  ComboboxDropdown,
  ComboboxOptions,
  ComboboxOption,
  ComboboxSearch,
  ComboboxEmpty,
  ComboboxFooter,
  ComboboxHeader,
  ComboboxEventsTarget,
  ComboboxDropdownTarget,
  ComboboxGroup,
  ComboboxClearButton,
  Combobox,
  CheckboxGroup,
  CheckIcon,
  Checkbox,
  isOptionsGroup,
  defaultOptionsFilter,
  OptionsDropdown,
  Autocomplete,
  AvatarGroup,
  Avatar,
  BackgroundImage,
  Badge,
  Blockquote,
  Breadcrumbs,
  Burger,
  ButtonGroup,
  Button,
  CardSection,
  Card,
  Center,
  ChipGroup,
  Chip,
  Code,
  isColorValid,
  parseColor,
  AlphaSlider,
  HueSlider,
  convertHsvaTo,
  ColorSwatch,
  ColorPicker,
  ColorInput,
  useVirtualizedCombobox,
  Container,
  CopyButton,
  Dialog,
  Divider,
  DrawerRoot,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  Drawer,
  Fieldset,
  FileButton,
  FileInput,
  useDelayedHover,
  GridCol,
  Grid,
  Mark,
  Highlight,
  HoverCardDropdown,
  HoverCardTarget,
  HoverCard,
  Image,
  Indicator,
  Textarea,
  JsonInput,
  Kbd,
  ListItem,
  List,
  LoadingOverlay,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Menu,
  ModalRoot,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalHeader,
  Modal,
  PillsInputField,
  PillsInput,
  PillGroup,
  Pill,
  MultiSelect,
  NativeSelect,
  NavLink,
  Notification,
  NumberFormatter,
  NumberInput,
  PaginationRoot,
  PaginationControl,
  PaginationDots,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  PaginationItems,
  Pagination,
  PasswordInput,
  PinInput,
  ProgressRoot,
  ProgressSection,
  ProgressLabel,
  Progress,
  RadioIcon,
  RadioGroup,
  Radio,
  Rating,
  getTransitionProps,
  TooltipFloating,
  TooltipGroup,
  Tooltip,
  RingProgress,
  SegmentedControl,
  Select,
  SimpleGrid,
  Skeleton,
  Slider,
  RangeSlider,
  Space,
  Spoiler,
  Stack,
  StepperStep,
  StepperCompleted,
  Stepper,
  SwitchGroup,
  Switch,
  TableTh,
  TableTd,
  TableTr,
  TableThead,
  TableTbody,
  TableTfoot,
  TableCaption,
  TableScrollContainer,
  Table,
  TabsList,
  TabsPanel,
  TabsTab,
  Tabs,
  TagsInput,
  TextInput,
  ThemeIcon,
  TimelineItem,
  Timeline,
  Title,
  TypographyStylesProvider
};
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)
*/
//# sourceMappingURL=chunk-2CSGMQ4Z.js.map
