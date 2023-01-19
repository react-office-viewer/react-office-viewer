'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var pdfjs = require('pdfjs-dist');
var pdf_viewer = require('pdfjs-dist/web/pdf_viewer');
var XLSX = require('xlsx');
var react = require('@handsontable/react');
require('handsontable/dist/handsontable.full.css');
var PropTypes = require('prop-types');
var mammoth = require('mammoth');
var getFileTypeFromArrayBuffer = require('@yiiran/get-file-type');
var reactI18next = require('react-i18next');
var i18n = require('i18next');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var pdfjs__namespace = /*#__PURE__*/_interopNamespace(pdfjs);
var XLSX__namespace = /*#__PURE__*/_interopNamespace(XLSX);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var mammoth__default = /*#__PURE__*/_interopDefaultLegacy(mammoth);
var getFileTypeFromArrayBuffer__default = /*#__PURE__*/_interopDefaultLegacy(getFileTypeFromArrayBuffer);
var i18n__default = /*#__PURE__*/_interopDefaultLegacy(i18n);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$3 = ":root {\n  --dir-factor: 1;\n  --sidebar-width: 200px;\n  --sidebar-transition-duration: 200ms;\n  --sidebar-transition-timing-function: ease;\n  --scale-select-container-width: 140px;\n  --scale-select-overflow: 22px;\n  --toolbar-height: 32px;\n  --viewer-padding-top: 6px;\n  --canvas-wrapper-border: 9px solid transparent;\n  --toolbar-icon-opacity: 1;\n  --doorhanger-icon-opacity: 0.9;\n  --doorhanger-border-color-whcm: 1px solid ButtonText;\n  --main-color: #0c0c0d;\n  --body-bg-color: #ededf0;\n  /*#if !MOZCENTRAL*/\n  --errorWrapper-bg-color: #ff6e6e;\n  /*#endif*/\n  --progressBar-percent: 0%;\n  --progressBar-end-offset: 0;\n  --progressBar-color: #0a84ff;\n  --progressBar-indeterminate-bg-color: #ddddde;\n  --progressBar-indeterminate-blend-color: #74b1ef;\n  --scrollbar-color: auto;\n  --scrollbar-bg-color: auto;\n  --toolbar-icon-bg-color: #000000;\n  --toolbar-icon-hover-bg-color: #000000;\n  --sidebar-narrow-bg-color: rgba(237, 237, 240, 0.9);\n  --sidebar-toolbar-bg-color: #f5f6f7;\n  --toolbar-bg-color: #474747;\n  --toolbar-border-color: #474747;\n  --button-hover-color: #000000;\n  --toggled-btn-color: #000000;\n  --toggled-btn-bg-color: rgba(0, 0, 0, 0.3);\n  --toggled-hover-active-btn-color: rgba(0, 0, 0, 0.4);\n  --dropdown-btn-bg-color: #d7d7db;\n  --separator-color: rgba(0, 0, 0, 0.3);\n  --field-color: #060606;\n  --field-bg-color: #ffffff;\n  --field-border-color: #bbbbbc;\n  --treeitem-color: rgba(0, 0, 0, 0.8);\n  --treeitem-hover-color: rgba(0, 0, 0, 0.9);\n  --treeitem-selected-color: rgba(0, 0, 0, 0.9);\n  --treeitem-selected-bg-color: rgba(0, 0, 0, 0.25);\n  --sidebaritem-bg-color: rgba(0, 0, 0, 0.15);\n  --doorhanger-bg-color: #ffffff;\n  --doorhanger-border-color: rgba(12, 12, 13, 0.2);\n  --doorhanger-hover-color: #0c0c0d;\n  --doorhanger-hover-bg-color: #ededed;\n  --doorhanger-separator-color: #dedede;\n  --dialog-button-border: 0 none;\n  --dialog-button-bg-color: rgba(12, 12, 13, 0.1);\n  --dialog-button-hover-bg-color: rgba(12, 12, 13, 0.3);\n  --toolbarSidebar-box-shadow: none;\n  --toolbarSidebar-border-bottom: 1px solid var(--toolbar-border-color);\n  --loading-icon: url('data:image/gif;base64,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');\n  --toobar-background: url('data:image/png;base64,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');\n  --page-border-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAA1ElEQVQ4jbWUWw6EIAxFy2NFs/8NzR4UJhpqLsdi5mOmSSMUOfYWqv3S0gMr4XlYH/64gZa/gN3ANYA7KAXALt4ktoQ5MI9YxqaG8bWmsIysMuT6piSQCa4whZThCu8CM4zP9YJaKci9jicPq3NcBWYoPMGUlhG7ivtkB+gVyFY75wXghOvh8t5mto1Mdim6e+MBqH6XsY+YAwjpq3vGF7weTWQptLEDVCZvPTMl5JZZsdh47FHW6qFMyvLYqjcnmdFfY9Xk/KDOlzCusX2mi/ofM7MPkzBcSp4Q1/wAAAAASUVORK5CYII=');\n  --treeitem-expanded-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEwIDEzbDQtN0g2eiIvPjwvc3ZnPg==');\n  --treeitem-collapsed-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEzIDlMNiA1djh6Ii8+PC9zdmc+');\n  --toolbarButton-editorFreeText-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik04LjYyNSAyLjk0MkM4LjYyNSAyLjcyNSA4LjczNSAyLjUyNyA4LjkxOCAyLjQxMkwxMC4wMjYgMS43MkMxMC4xMjYgMS42NTggMTAuMjQgMS42MjUgMTAuMzU4IDEuNjI1SDEyVjAuMzc1SDEwLjM1OEMxMC4wMDYgMC4zNzUgOS42NjMgMC40NzQgOS4zNjQgMC42Nkw4LjI1NiAxLjM1M0M4LjE2MSAxLjQxMiA4LjA4MSAxLjQ4OCA4IDEuNTYyQzcuOTE4IDEuNDg4IDcuODM5IDEuNDEyIDcuNzQ0IDEuMzUzTDYuNjM1IDAuNjZDNi4zMzYgMC40NzQgNS45OTMgMC4zNzUgNS42NDIgMC4zNzVINFYxLjYyNUg1LjY0MkM1Ljc1OSAxLjYyNSA1Ljg3NCAxLjY1OCA1Ljk3NCAxLjcyTDcuMDgyIDIuNDEyQzcuMjY2IDIuNTI3IDcuMzc2IDIuNzI1IDcuMzc2IDIuOTQyVjhWMTMuMDU4QzcuMzc2IDEzLjI3NSA3LjI2NiAxMy40NzMgNy4wODIgMTMuNTg4TDUuOTczIDE0LjI4QzUuODczIDE0LjM0MiA1Ljc1OSAxNC4zNzUgNS42NDEgMTQuMzc1SDRWMTUuNjI1SDUuNjQyQzUuOTk0IDE1LjYyNSA2LjMzNyAxNS41MjYgNi42MzYgMTUuMzRMNy43NDQgMTQuNjQ4QzcuODQgMTQuNTg4IDcuOTE5IDE0LjUxMiA4IDE0LjQzOUM4LjA4MSAxNC41MTIgOC4xNjEgMTQuNTg4IDguMjU2IDE0LjY0OEw5LjM2NSAxNS4zNDFDOS42NjQgMTUuNTI3IDEwLjAwNyAxNS42MjYgMTAuMzU5IDE1LjYyNkgxMlYxNC4zNzZIMTAuMzU4QzEwLjI0MSAxNC4zNzYgMTAuMTI2IDE0LjM0MyAxMC4wMjYgMTQuMjgxTDguOTE4IDEzLjU4OUM4LjczNCAxMy40NzQgOC42MjUgMTMuMjc2IDguNjI1IDEzLjA1OVY4VjIuOTQyWiIgZmlsbD0iI2ZmZiIvPg0KPC9zdmc+DQo=');\n  --toolbarButton-editorInk-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0yLjQ5OTEzIDEyLjYyNTFDMi42MTkxMyAxMi42MjUxIDIuNzM5MTMgMTIuNjA1MSAyLjg1NzEzIDEyLjU2NjFMNi4yOTAxMyAxMS40MjAxTDEzLjI4OTEgNC40MjIxQzE0LjAxOTEgMy42OTExIDE0LjAxOTEgMi41MDExIDEzLjI4OTEgMS43NzAxTDEyLjIyOTEgMC43MTAwOThDMTEuNDk3MSAtMC4wMTk5MDIzIDEwLjMwOTEgLTAuMDE5OTAyMyA5LjU3NzEzIDAuNzEwMDk4TDIuNTc4MTMgNy43MDkxTDEuNDMzMTMgMTEuMTQ1MUMxLjI5ODEzIDExLjU1MTEgMS40MDIxMyAxMS45OTMxIDEuNzA1MTMgMTIuMjk1MUMxLjkyMTEzIDEyLjUxMDEgMi4yMDYxMyAxMi42MjUxIDIuNDk5MTMgMTIuNjI1MVpNMTAuNDYxMSAxLjU5NTFDMTAuNzAzMSAxLjM1MTEgMTEuMTAyMSAxLjM1MTEgMTEuMzQ0MSAxLjU5NTFMMTIuNDA1MSAyLjY1NjFDMTIuNjQ5MSAyLjg5OTEgMTIuNjQ5MSAzLjI5NjEgMTIuNDA1MSAzLjUzOTFMMTEuMzQwMSA0LjYwNTFMOS4zOTUxMyAyLjY2MDFMMTAuNDYxMSAxLjU5NTFaTTMuNjcwMTMgOC4zODUxTDguNTEwMTMgMy41NDUxTDEwLjQ1NDEgNS40ODkxTDUuNjE0MTMgMTAuMzMwMUwyLjY5NzEzIDExLjMwMzFMMy42NzAxMyA4LjM4NTFaIiBmaWxsPSIjZmZmIi8+DQo8cGF0aCBkPSJNMTQuODE2OSAxMy4zMTRMMTMuMDIyOSAxMy44NjJDMTIuMzMwOSAxNC4wNzMgMTEuNTkwOSAxNC4xMTEgMTAuODg1OSAxMy45NjhMOC44MDM5MSAxMy41NTFDNy41ODQ5MSAxMy4zMDggNi4yOTc5MSAxMy40OCA1LjE4NDkxIDE0LjAzNkMzLjk1MjkxIDE0LjY1MiAyLjQ2NjkxIDE0LjQxMiAxLjQ5MTkxIDEzLjQzNkwxLjQ0MDkxIDEzLjM4NUwwLjYwNzkxIDE0LjMyMUMxLjQ2MjkxIDE1LjE3NSAyLjU5OTkxIDE1LjYyNSAzLjc1MjkxIDE1LjYyNUM0LjQyODkxIDE1LjYyNSA1LjEwOTkxIDE1LjQ3MSA1Ljc0MzkxIDE1LjE1M0M2LjYwODkxIDE0LjcyMSA3LjYwODkxIDE0LjU4NiA4LjU1ODkxIDE0Ljc3N0wxMC42NDA5IDE1LjE5NEMxMS41NTA5IDE1LjM3NiAxMi41MDA5IDE1LjMyNyAxMy4zODc5IDE1LjA1NkwxNS4xODE5IDE0LjUwOEwxNC44MTY5IDEzLjMxNFoiIGZpbGw9IiNmZmYiLz4NCjwvc3ZnPg0K');\n  --toolbarButton-menuArrow-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik04LjIzMzM2IDEwLjQ2NjRMMTEuODQ3NCA2Ljg1MzM5QzExLjg5NCA2LjgwNzEgMTEuOTMxIDYuNzUyMDMgMTEuOTU2MyA2LjY5MTM2QzExLjk4MTYgNi42MzA2OSAxMS45OTQ2IDYuNTY1NjIgMTEuOTk0NiA2LjQ5OTg5QzExLjk5NDYgNi40MzQxNyAxMS45ODE2IDYuMzY5MSAxMS45NTYzIDYuMzA4NDNDMTEuOTMxIDYuMjQ3NzYgMTEuODk0IDYuMTkyNjkgMTEuODQ3NCA2LjE0NjM5QzExLjc1MzYgNi4wNTI2NiAxMS42MjY0IDYgMTEuNDkzOSA2QzExLjM2MTMgNiAxMS4yMzQxIDYuMDUyNjYgMTEuMTQwNCA2LjE0NjM5TDcuOTkyMzYgOS4yOTMzOUw0Ljg0NzM2IDYuMTQ3MzlDNC43NTMwNSA2LjA1NjMxIDQuNjI2NzUgNi4wMDU5MiA0LjQ5NTY2IDYuMDA3MDZDNC4zNjQ1NiA2LjAwODIgNC4yMzkxNSA2LjA2MDc4IDQuMTQ2NDUgNi4xNTM0OEM0LjA1Mzc0IDYuMjQ2MTkgNC4wMDExNiA2LjM3MTU5IDQuMDAwMDIgNi41MDI2OUMzLjk5ODg4IDYuNjMzNzkgNC4wNDkyOCA2Ljc2MDA5IDQuMTQwMzYgNi44NTQzOUw3Ljc1MjM2IDEwLjQ2NzRMOC4yMzMzNiAxMC40NjY0WiIgZmlsbD0iYmxhY2siLz4NCjwvc3ZnPg0K');\n  --toolbarButton-sidebarToggle-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTYgNFYxMi4yNUMxNiAxMi43ODA0IDE1Ljc4OTMgMTMuMjg5MSAxNS40MTQyIDEzLjY2NDJDMTUuMDM5MSAxNC4wMzkzIDE0LjUzMDQgMTQuMjUgMTQgMTQuMjVIMkMxLjQ2OTU3IDE0LjI1IDAuOTYwODU5IDE0LjAzOTMgMC41ODU3ODYgMTMuNjY0MkMwLjIxMDcxNCAxMy4yODkxIDAgMTIuNzgwNCAwIDEyLjI1VjRDMCAzLjQ2OTU3IDAuMjEwNzE0IDIuOTYwODYgMC41ODU3ODYgMi41ODU3OUMwLjk2MDg1OSAyLjIxMDcxIDEuNDY5NTcgMiAyIDJIMTRDMTQuNTMwNCAyIDE1LjAzOTEgMi4yMTA3MSAxNS40MTQyIDIuNTg1NzlDMTUuNzg5MyAyLjk2MDg2IDE2IDMuNDY5NTcgMTYgNFpNMS4yNSAzLjg1VjEyLjRMMS44NSAxM0g2Ljc1VjMuMjVIMS44NUwxLjI1IDMuODVaTTE0LjE1IDEzSDhWMy4yNUgxNC4xNUwxNC43NSAzLjg1VjEyLjRMMTQuMTUgMTNaTTUuMzUzNTUgMTAuMTQ2NEM1LjQ0NzMyIDEwLjI0MDIgNS41IDEwLjM2NzQgNS41IDEwLjVDNS41IDEwLjYzMjYgNS40NDczMiAxMC43NTk4IDUuMzUzNTUgMTAuODUzNkM1LjI1OTc5IDEwLjk0NzMgNS4xMzI2MSAxMSA1IDExSDNDMi44NjczOSAxMSAyLjc0MDIxIDEwLjk0NzMgMi42NDY0NSAxMC44NTM2QzIuNTUyNjggMTAuNzU5OCAyLjUgMTAuNjMyNiAyLjUgMTAuNUMyLjUgMTAuMzY3NCAyLjU1MjY4IDEwLjI0MDIgMi42NDY0NSAxMC4xNDY0QzIuNzQwMjEgMTAuMDUyNyAyLjg2NzM5IDEwIDMgMTBINUM1LjEzMjYxIDEwIDUuMjU5NzkgMTAuMDUyNyA1LjM1MzU1IDEwLjE0NjRaTTUuNSA4QzUuNSA3Ljg2NzM5IDUuNDQ3MzIgNy43NDAyMSA1LjM1MzU1IDcuNjQ2NDVDNS4yNTk3OSA3LjU1MjY4IDUuMTMyNjEgNy41IDUgNy41SDNDMi44NjczOSA3LjUgMi43NDAyMSA3LjU1MjY4IDIuNjQ2NDUgNy42NDY0NUMyLjU1MjY4IDcuNzQwMjEgMi41IDcuODY3MzkgMi41IDhDMi41IDguMTMyNjEgMi41NTI2OCA4LjI1OTc5IDIuNjQ2NDUgOC4zNTM1NUMyLjc0MDIxIDguNDQ3MzIgMi44NjczOSA4LjUgMyA4LjVINUM1LjEzMjYxIDguNSA1LjI1OTc5IDguNDQ3MzIgNS4zNTM1NSA4LjM1MzU1QzUuNDQ3MzIgOC4yNTk3OSA1LjUgOC4xMzI2MSA1LjUgOFpNNS4zNTM1NSA1LjE0NjQ1QzUuNDQ3MzIgNS4yNDAyMSA1LjUgNS4zNjczOSA1LjUgNS41QzUuNSA1LjYzMjYxIDUuNDQ3MzIgNS43NTk3OSA1LjM1MzU1IDUuODUzNTVDNS4yNTk3OSA1Ljk0NzMyIDUuMTMyNjEgNiA1IDZIM0MyLjg2NzM5IDYgMi43NDAyMSA1Ljk0NzMyIDIuNjQ2NDUgNS44NTM1NUMyLjU1MjY4IDUuNzU5NzkgMi41IDUuNjMyNjEgMi41IDUuNUMyLjUgNS4zNjczOSAyLjU1MjY4IDUuMjQwMjEgMi42NDY0NSA1LjE0NjQ1QzIuNzQwMjEgNS4wNTI2OCAyLjg2NzM5IDUgMyA1SDVDNS4xMzI2MSA1IDUuMjU5NzkgNS4wNTI2OCA1LjM1MzU1IDUuMTQ2NDVaIiBmaWxsPSIiLz4NCjwvc3ZnPg0K');\n  --toolbarButton-secondaryToolbarToggle-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMi41MzQwNiAxMy44MThMNy45OTkwNiA4LjM1MjAzTDguMDAwMDYgNy42NDcwM0wyLjUzNjA2IDIuMTgyMDNDMi40MTc2OSAyLjA2OTY1IDIuMjYwMTIgMi4wMDc5NSAyLjA5NjkyIDIuMDEwMDZDMS45MzM3MiAyLjAxMjE4IDEuNzc3OCAyLjA3Nzk1IDEuNjYyMzkgMi4xOTMzNkMxLjU0Njk4IDIuMzA4NzcgMS40ODEyMSAyLjQ2NDY5IDEuNDc5MDkgMi42Mjc4OUMxLjQ3Njk3IDIuNzkxMDkgMS41Mzg2OCAyLjk0ODY3IDEuNjUxMDYgMy4wNjcwM0w2LjU4NTA2IDcuOTk4MDNMMS42NTAwNiAxMi45MzJDMS41Mzc1NCAxMy4wNTAzIDEuNDc1NjUgMTMuMjA3OCAxLjQ3NzU4IDEzLjM3MUMxLjQ3OTUxIDEzLjUzNDIgMS41NDUxMSAxMy42OTAyIDEuNjYwMzkgMTMuODA1N0MxLjc3NTY3IDEzLjkyMTMgMS45MzE1MiAxMy45ODcyIDIuMDk0NzIgMTMuOTg5NUMyLjI1NzkyIDEzLjk5MTggMi40MTU1NyAxMy45MzAzIDIuNTM0MDYgMTMuODE4Wk04LjUzNDA2IDEzLjgxOEwxMy45OTkxIDguMzUyMDNMMTQuMDAwMSA3LjY0NzAzTDguNTM2MDYgMi4xODIwM0M4LjQxNzcgMi4wNjk2NSA4LjI2MDEyIDIuMDA3OTUgOC4wOTY5MiAyLjAxMDA2QzcuOTMzNzIgMi4wMTIxOCA3Ljc3NzggMi4wNzc5NSA3LjY2MjM5IDIuMTkzMzZDNy41NDY5OCAyLjMwODc3IDcuNDgxMjEgMi40NjQ2OSA3LjQ3OTA5IDIuNjI3ODlDNy40NzY5NyAyLjc5MTA5IDcuNTM4NjggMi45NDg2NyA3LjY1MTA2IDMuMDY3MDNMMTIuNTg1MSA3Ljk5ODAzTDcuNjUwMDYgMTIuOTMyQzcuNTM3NTQgMTMuMDUwMyA3LjQ3NTY1IDEzLjIwNzggNy40Nzc1OCAxMy4zNzFDNy40Nzk1MSAxMy41MzQyIDcuNTQ1MTEgMTMuNjkwMiA3LjY2MDM5IDEzLjgwNTdDNy43NzU2NyAxMy45MjEzIDcuOTMxNTIgMTMuOTg3MiA4LjA5NDcyIDEzLjk4OTVDOC4yNTc5MiAxMy45OTE4IDguNDE1NTcgMTMuOTMwMyA4LjUzNDA2IDEzLjgxOFoiIGZpbGw9IiIvPg0KPC9zdmc+DQo=');\n  --toolbarButton-pageUp-icon: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAvUlEQVR4AZXPMcrCQBDF8WksLHMCz2Bh6YfgLSwtvIp4BFsLWwmRxMJGVFAQBAshEPkkBNEDJE2K54PssktcC/ObZtg/hJEfP6xIbAJbhAdF34IQGVLKELqCJZ/uSsqtFgT4x83gFtiBjwRxTQJfBwuuV4eYLyKctvSEcDG4E1/sD2fDfebJ0nQE5Q4HLe/kUuFozzn2WjEppMLRpgNssFWO6H/8Qrzx8DUr18yIyQieCVTCw7rqxD9pSUPkDcScIefy5+KaAAAAAElFTkSuQmCC');\n  --toolbarButton-pageDown-icon: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAtUlEQVR4AY3KQQqCQBTG8QdBJ6hFq+7gCTpEB4k6ULQQEUQYqBNI0CIIWgRFgZSFONLehX3F1PON2aL5LebB96c/HrqYIMXdSDDHACQIRG3qT8e4IHm54vZI7YS/zsHFmRWLglh1zIaIWXksiVXHqIeThZgcLeyFHYidqAcKsbG1xIYyATlaYdOkFTn0eU4eYl2XhzKbJAuwElnAs5VoH8s37duznXiIEGlP5mbialfmn8n3/ATF/vfFQRwIrAAAAABJRU5ErkJggg==');\n  --toolbarButton-zoomOut-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMy4zNzUgOS4yNUMxMy41NDA4IDkuMjUgMTMuNjk5NyA5LjE4NDE1IDEzLjgxNjkgOS4wNjY5NEMxMy45MzQyIDguOTQ5NzMgMTQgOC43OTA3NiAxNCA4LjYyNUMxNCA4LjQ1OTI0IDEzLjkzNDIgOC4zMDAyNyAxMy44MTY5IDguMTgzMDZDMTMuNjk5NyA4LjA2NTg1IDEzLjU0MDggOCAxMy4zNzUgOEgyLjYyNUMyLjQ1OTI0IDggMi4zMDAyNyA4LjA2NTg1IDIuMTgzMDYgOC4xODMwNkMyLjA2NTg1IDguMzAwMjcgMiA4LjQ1OTI0IDIgOC42MjVDMiA4Ljc5MDc2IDIuMDY1ODUgOC45NDk3MyAyLjE4MzA2IDkuMDY2OTRDMi4zMDAyNyA5LjE4NDE1IDIuNDU5MjQgOS4yNSAyLjYyNSA5LjI1SDEzLjM3NVoiIGZpbGw9IiIvPg0KPC9zdmc+DQo=');\n  --toolbarButton-zoomIn-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik03LjAwNDg4IDkuNzVWMTRDNy4wMDQ4OCAxNC4xNjU4IDcuMDcwNzMgMTQuMzI0NyA3LjE4Nzk0IDE0LjQ0MTlDNy4zMDUxNSAxNC41NTkyIDcuNDY0MTIgMTQuNjI1IDcuNjI5ODggMTQuNjI1QzcuNzk1NjQgMTQuNjI1IDcuOTU0NjEgMTQuNTU5MiA4LjA3MTgzIDE0LjQ0MTlDOC4xODkwNCAxNC4zMjQ3IDguMjU0ODggMTQuMTY1OCA4LjI1NDg4IDE0VjkuNzVMOC43NTQ4OCA5LjI1SDEzLjAwNDlDMTMuMTcwNiA5LjI1IDEzLjMyOTYgOS4xODQxNSAxMy40NDY4IDkuMDY2OTRDMTMuNTY0IDguOTQ5NzMgMTMuNjI5OSA4Ljc5MDc2IDEzLjYyOTkgOC42MjVDMTMuNjI5OSA4LjQ1OTI0IDEzLjU2NCA4LjMwMDI3IDEzLjQ0NjggOC4xODMwNkMxMy4zMjk2IDguMDY1ODUgMTMuMTcwNiA4IDEzLjAwNDkgOEg4Ljc1NDg4TDguMjU0ODggNy41VjMuMjVDOC4yNTQ4OCAzLjA4NDI0IDguMTg5MDQgMi45MjUyNyA4LjA3MTgzIDIuODA4MDZDNy45NTQ2MSAyLjY5MDg1IDcuNzk1NjQgMi42MjUgNy42Mjk4OCAyLjYyNUM3LjQ2NDEyIDIuNjI1IDcuMzA1MTUgMi42OTA4NSA3LjE4Nzk0IDIuODA4MDZDNy4wNzA3MyAyLjkyNTI3IDcuMDA0ODggMy4wODQyNCA3LjAwNDg4IDMuMjVWNy41TDYuNTA0ODggOEgyLjI1NDg4QzIuMDg5MTIgOCAxLjkzMDE1IDguMDY1ODUgMS44MTI5NCA4LjE4MzA2QzEuNjk1NzMgOC4zMDAyNyAxLjYyOTg4IDguNDU5MjQgMS42Mjk4OCA4LjYyNUMxLjYyOTg4IDguNzkwNzYgMS42OTU3MyA4Ljk0OTczIDEuODEyOTQgOS4wNjY5NEMxLjkzMDE1IDkuMTg0MTUgMi4wODkxMiA5LjI1IDIuMjU0ODggOS4yNUg2LjM5MTg4TDcuMDA0ODggOS43NVoiIGZpbGw9IiIvPg0KPC9zdmc+DQo=');\n  --toolbarButton-presentationMode-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTS41IDFIN3MwLTEgMS0xIDEgMSAxIDFoNi41cy41IDAgLjUuNS0uNS41LS41LjVILjVTMCAyIDAgMS41LjUgMSAuNSAxek0xIDNoMTR2N2MwIDItMSAyLTIgMkgzYy0xIDAtMiAwLTItMnptNSAxdjdsNi0zLjV6TTMuNzIgMTUuMzNsLjUzLTJzMC0uNS42NS0uMzVjLjUxLjEzLjM4LjYzLjM4LjYzbC0uNTMgMnMwIC41LS42NC4zNWMtLjUzLS4xMy0uMzktLjYzLS4zOS0uNjN6TTExLjI0IDE1LjYxbC0uNTMtMS45OXMwLS41LjM4LS42M2MuNTEtLjEzLjY0LjM1LjY0LjM1bC41MyAyczAgLjUtLjM4LjYzYy0uNS4xMy0uNjQtLjM1LS42NS0uMzV6Ii8+PC9zdmc+');\n  --toolbarButton-print-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZD0iTTEzIDRIMTJWMkMxMiAxLjQ2OTU3IDExLjc4OTMgMC45NjA4NTkgMTEuNDE0MiAwLjU4NTc4NkMxMS4wMzkxIDAuMjEwNzE0IDEwLjUzMDQgMCAxMCAwTDYgMEM1LjQ2OTU3IDAgNC45NjA4NiAwLjIxMDcxNCA0LjU4NTc5IDAuNTg1Nzg2QzQuMjEwNzEgMC45NjA4NTkgNCAxLjQ2OTU3IDQgMlY0SDNDMi40Njk1NyA0IDEuOTYwODYgNC4yMTA3MSAxLjU4NTc5IDQuNTg1NzlDMS4yMTA3MSA0Ljk2MDg2IDEgNS40Njk1NyAxIDZWMTFDMSAxMS41MzA0IDEuMjEwNzEgMTIuMDM5MSAxLjU4NTc5IDEyLjQxNDJDMS45NjA4NiAxMi43ODkzIDIuNDY5NTcgMTMgMyAxM0g0VjE0QzQgMTQuNTMwNCA0LjIxMDcxIDE1LjAzOTEgNC41ODU3OSAxNS40MTQyQzQuOTYwODYgMTUuNzg5MyA1LjQ2OTU3IDE2IDYgMTZIMTBDMTAuNTMwNCAxNiAxMS4wMzkxIDE1Ljc4OTMgMTEuNDE0MiAxNS40MTQyQzExLjc4OTMgMTUuMDM5MSAxMiAxNC41MzA0IDEyIDE0VjEzSDEzQzEzLjUzMDQgMTMgMTQuMDM5MSAxMi43ODkzIDE0LjQxNDIgMTIuNDE0MkMxNC43ODkzIDEyLjAzOTEgMTUgMTEuNTMwNCAxNSAxMVY2QzE1IDUuNDY5NTcgMTQuNzg5MyA0Ljk2MDg2IDE0LjQxNDIgNC41ODU3OUMxNC4wMzkxIDQuMjEwNzEgMTMuNTMwNCA0IDEzIDRWNFpNMTAuNzUgMTQuMTVMMTAuMTUgMTQuNzVINS44NUw1LjI1IDE0LjE1VjEwSDEwLjc1VjE0LjE1Wk0xMC43NSA0SDUuMjVWMS44NUw1Ljg1IDEuMjVIMTAuMTVMMTAuNzUgMS44NVY0VjRaTTEzIDcuNkwxMi42IDhIMTEuNEwxMSA3LjZWNi40TDExLjQgNkgxMi42TDEzIDYuNFY3LjZaIiBmaWxsPSIiLz4NCjwvc3ZnPg0K');\n  /*#if GENERIC*/\n  --toolbarButton-openFile-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAuNDI4NyAxLjA4Mzk4QzEwLjUxMTEgMS4wMjkwNSAxMC42MDggMC45OTk4MjQgMTAuNzA3IDFIMTQuN0wxNSAxLjNWNS4yOTNDMTUgNS4zOTE5NCAxNC45NzA2IDUuNDg4NjQgMTQuOTE1NiA1LjU3MDg4QzE0Ljg2MDYgNS42NTMxMSAxNC43ODI0IDUuNzE3MTggMTQuNjkxIDUuNzU0OThDMTQuNTk5NiA1Ljc5Mjc3IDE0LjQ5OSA1LjgwMjU5IDE0LjQwMiA1Ljc4MzE5QzE0LjMwNDkgNS43NjM3OSAxNC4yMTU5IDUuNzE2MDUgMTQuMTQ2IDUuNjQ2TDEyLjk3MyA0LjQ3M0wxMi42OTIgNC4xOTJMOS4wNjcgNy44MTdDOC45NDkyMyA3LjkzMzQ3IDguNzkwMzQgNy45OTg4OCA4LjYyNDcgNy45OTkwN0M4LjQ1OTA3IDcuOTk5MjUgOC4zMDAwMyA3LjkzNDIxIDguMTgyIDcuODE4QzguMDY1MTggNy43MDAzNiA3Ljk5OTYyIDcuNTQxMjkgNy45OTk2MiA3LjM3NTVDNy45OTk2MiA3LjIwOTcxIDguMDY1MTggNy4wNTA2NSA4LjE4MiA2LjkzM0wxMS44MDcgMy4zMDhMMTAuMzUzIDEuODU0QzEwLjI4MjkgMS43ODQwNyAxMC4yMzUxIDEuNjk0OSAxMC4yMTU4IDEuNTk3NzlDMTAuMTk2NCAxLjUwMDY4IDEwLjIwNjMgMS40MDAwMSAxMC4yNDQyIDEuMzA4NTRDMTAuMjgyMSAxLjIxNzA3IDEwLjM0NjQgMS4xMzg5MSAxMC40Mjg3IDEuMDgzOThaTTcuODE2OTQgMi4wNjY5NEM3LjY5OTczIDIuMTg0MTUgNy41NDA3NiAyLjI1IDcuMzc1IDIuMjVIMi44NUwyLjI1IDIuODVWMTMuMTVMMi44NSAxMy43NUgxMy4xNUwxMy43NSAxMy4xNVY4LjYyNUMxMy43NSA4LjQ1OTI0IDEzLjgxNTggOC4zMDAyNyAxMy45MzMxIDguMTgzMDZDMTQuMDUwMyA4LjA2NTg1IDE0LjIwOTIgOCAxNC4zNzUgOEMxNC41NDA4IDggMTQuNjk5NyA4LjA2NTg1IDE0LjgxNjkgOC4xODMwNkMxNC45MzQyIDguMzAwMjcgMTUgOC40NTkyNCAxNSA4LjYyNVYxM0MxNSAxMy41MzA0IDE0Ljc4OTMgMTQuMDM5MSAxNC40MTQyIDE0LjQxNDJDMTQuMDM5MSAxNC43ODkzIDEzLjUzMDQgMTUgMTMgMTVIM0MyLjQ2OTU3IDE1IDEuOTYwODYgMTQuNzg5MyAxLjU4NTc5IDE0LjQxNDJDMS4yMTA3MSAxNC4wMzkxIDEgMTMuNTMwNCAxIDEzVjNDMSAyLjQ2OTU3IDEuMjEwNzEgMS45NjA4NiAxLjU4NTc5IDEuNTg1NzlDMS45NjA4NiAxLjIxMDcxIDIuNDY5NTcgMSAzIDFINy4zNzVDNy41NDA3NiAxIDcuNjk5NzMgMS4wNjU4NSA3LjgxNjk0IDEuMTgzMDZDNy45MzQxNSAxLjMwMDI3IDggMS40NTkyNCA4IDEuNjI1QzggMS43OTA3NiA3LjkzNDE1IDEuOTQ5NzMgNy44MTY5NCAyLjA2Njk0WiIgZmlsbD0iI2ZmZiIvPg0KPC9zdmc+DQo=');\n  /*#endif*/\n  --toolbarButton-download-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik05Ljc5NDA3IDcuMzE4MTFINy44NjMwN0M3LjQxODA3IDcuMzE4MTEgNy4xOTQwNyA3Ljg1NzExIDcuNTA5MDcgOC4xNzIxMUwxMC4xOTExIDEwLjg1NDFDMTAuMzg2MSAxMS4wNDkxIDEwLjcwMzEgMTEuMDQ5MSAxMC44OTgxIDEwLjg1NDFMMTMuNTgwMSA4LjE3MjExQzEzLjg5NTEgNy44NTcxMSAxMy42NzIxIDcuMzE4MTEgMTMuMjI2MSA3LjMxODExSDExLjI5NDFWNC4zODIxMUgxMS4yOTYxVjMuMTMyMTFIMTEuMjk0MVYyLjMwODExSDkuNzk0MDdWMy4xMzIxMUg5Ljc5MTA3VjQuMzgyMTFIOS43OTUwN1Y3LjMxODExSDkuNzk0MDdaIiBmaWxsPSIjZmZmIi8+DQo8cGF0aCBkPSJNMTQgMy4xMzIwOEgxMi43OTZWNC4zODIwOEgxNEMxNC4zNDUgNC4zODIwOCAxNC42MjUgNC42NjIwOCAxNC42MjUgNS4wMDcwOFYxMy4wMDcxQzE0LjYyNSAxMy4zNTIxIDE0LjM0NSAxMy42MzIxIDE0IDEzLjYzMjFIMkMxLjY1NSAxMy42MzIxIDEuMzc1IDEzLjM1MjEgMS4zNzUgMTMuMDA3MVYzLjAwNzA4QzEuMzc1IDIuNjYyMDggMS42NTUgMi4zODIwOCAyIDIuMzgyMDhINS42NDNDNS44MiAyLjM4MjA4IDUuOTg5IDIuNDU4MDggNi4xMDggMi41ODkwOEw3LjUzNiA0LjE3NTA4QzcuNjU0IDQuMzA3MDggNy44MjMgNC4zODIwOCA4IDQuMzgyMDhIOC4yOTFWMy4xMzIwOEg4LjI3OEw3LjAzNiAxLjc1MjA4QzYuNjgxIDEuMzU4MDggNi4xNzMgMS4xMzIwOCA1LjY0MiAxLjEzMjA4SDJDMC45NjYgMS4xMzIwOCAwLjEyNSAxLjk3MzA4IDAuMTI1IDMuMDA3MDhWMTMuMDA3MUMwLjEyNSAxNC4wNDExIDAuOTY2IDE0Ljg4MjEgMiAxNC44ODIxSDE0QzE1LjAzNCAxNC44ODIxIDE1Ljg3NSAxNC4wNDExIDE1Ljg3NSAxMy4wMDcxVjUuMDA3MDhDMTUuODc1IDMuOTczMDggMTUuMDM0IDMuMTMyMDggMTQgMy4xMzIwOFoiIGZpbGw9IiNmZmYiLz4NCjwvc3ZnPg0K');\n  --toolbarButton-bookmark-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHBhdGggZD0iTTQgMTZWMnMwLTEgMS0xaDZzMSAwIDEgMXYxNGwtNC01eiIvPjwvc3ZnPg==');\n  --toolbarButton-viewThumbnail-icon: url('data:image/svg+xml;base64,PCEtLSBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljDQogICAtIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMNCiAgIC0gZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gLS0+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxnIHN0eWxlPSItLWRhcmtyZWFkZXItaW5saW5lLWZpbGw6cmdiYSg4MSwgODIsIDgzLCAwLjgpOyIgZGF0YS1kYXJrcmVhZGVyLWlubGluZS1maWxsPSIiPjxyZWN0IHg9IjEiIHk9IjEiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHJ4PSIxIiByeT0iMSI+PC9yZWN0PjxyZWN0IHg9IjkiIHk9IjEiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHJ4PSIxIiByeT0iMSI+PC9yZWN0PjxyZWN0IHg9IjEiIHk9IjkiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHJ4PSIxIiByeT0iMSI+PC9yZWN0PjxyZWN0IHg9IjkiIHk9IjkiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHJ4PSIxIiByeT0iMSI+PC9yZWN0PjwvZz48L3N2Zz4=');\n  --toolbarButton-viewOutline-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHBhdGggZD0iTTE0IDlIOGMtMS4zIDAtMS4zIDIgMCAyaDZjMS4zIDAgMS4zLTIgMC0yem0wLThINUMzLjcgMSAzLjcgMyA1IDNoOWMxLjMgMCAxLjMtMiAwLTJ6TTIgMUMxIDEgLjcgMiAxLjMgMi43IDIgMy4zIDMgMyAzIDJjMC0uNS0uNC0xLTEtMXptMyA4Yy0xIDAtMS4zIDEtLjcgMS43LjYuNiAxLjcuMiAxLjctLjcgMC0uNS0uNC0xLTEtMXpNMTQgNUg1QzMuNiA1IDMuNiA3IDUgN2g5YzEuMyAwIDEuMy0yIDAtMnpNMiA1Yy0uOSAwLTEuNCAxLS43IDEuN0MyIDcuMyAzIDYuOSAzIDZjMC0uNi0uNS0xLTEtMXpNMTQgMTNINWMtMS4zIDAtMS4zIDIgMCAyaDljMS4zIDAgMS4zLTIgMC0yek0yIDEzYy0xIDAtMS4zIDEtLjcgMS43LjcuNiAxLjcuMiAxLjctLjcxMiAwLS41LS40LTEtMS0xeiIvPjwvc3ZnPg==');\n  --toolbarButton-viewAttachments-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHBhdGggZD0iTTYuMiAycy41LS41IDEuMDYgMGMuNS41IDAgMSAwIDFsLTQuNiA0LjYxcy0yLjUgMi41IDAgNSA1IDAgNSAwTDEzLjggNi40czEuNi0xLjYgMC0zLjItMy4yIDAtMy4yIDBMNS44IDhzLS43LjcgMCAxLjQgMS40IDAgMS40IDBsMy45LTMuOXMuNi0uNSAxIDBjLjUuNSAwIDEgMCAxbC0zLjggNHMtMS44IDEuOC0zLjUgMEMzIDguNyA0LjggNyA0LjggN2w0LjctNC45czIuNy0yLjYgNS4zIDBjMi42IDIuNiAwIDUuMyAwIDUuM2wtNi4yIDYuM3MtMy41IDMuNS03IDAgMC03IDAtN3oiLz48L3N2Zz4=');\n  --toolbarButton-viewLayers-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0LjIzMyA0LjIzMyIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij48cGF0aCBkPSJNLjE1IDIuOTkyYy0uMTk4LjEtLjIuMjY2LS4wMDIuMzY1bDEuNjA0LjgwMmEuOTMuOTMgMCAwMC43MjktLjAwMWwxLjYwMi0uODAxYy4xOTgtLjEuMTk3LS4yNjQgMC0uMzY0bC0uNjk1LS4zNDhjLTEuMzA2LjU5NS0yLjU0MiAwLTIuNTQyIDBtLS4yNjQuNTNsLjY1OC0uMzI5Yy42LjI1MiAxLjIzOC4yNDQgMS43NTQgMGwuNjU5LjMyOS0xLjUzNi43Njh6TS4xNSAxLjkzNWMtLjE5OC4xLS4xOTguMjY1IDAgLjM2NGwxLjYwNC44MDJhLjkyNi45MjYgMCAwMC43MjcgMGwxLjYwMy0uODAyYy4xOTgtLjA5OS4xOTgtLjI2NCAwLS4zNjNsLS42OTQtLjM1Yy0xLjE0LjU2LTIuNTQ2LjAwMS0yLjU0Ni4wMDFtLS4yNjQuNTNsLjY2NC0uMzMyYy41Mi4yNjYgMS4yNjEuMjM1IDEuNzUuMDAybC42NTkuMzMtMS41MzcuNzY4ek0uMTUuODc3Yy0uMTk4LjA5OS0uMTk4LjI2NCAwIC4zNjNsMS42MDQuODAyYS45MjYuOTI2IDAgMDAuNzI3IDBsMS42MDMtLjgwMmMuMTk4LS4wOTkuMTk4LS4yNjQgMC0uMzYzTDIuNDgxLjA3NWEuOTI2LjkyNiAwIDAwLS43MjcgMHptLjQzLjE4MkwyLjExNy4yOWwxLjUzOC43NjktMS41MzguNzY4eiIvPjwvc3ZnPg==');\n  --toolbarButton-currentOutlineItem-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHBhdGggZD0ibTE0IDloLTZjLTEuMyAwLTEuMyAyIDAgMmg2YzEuMyAwIDEuMy0yIDAtMnptLTUuMi04aC0zLjhjLTEuMyAwLTEuMyAyIDAgMmgxLjd6bS02LjggMGMtMSAwLTEuMyAxLTAuNyAxLjcgMC43IDAuNiAxLjcgMC4zIDEuNy0wLjcgMC0wLjUtMC40LTEtMS0xem0zIDhjLTEgMC0xLjMgMS0wLjcgMS43IDAuNiAwLjYgMS43IDAuMiAxLjctMC43IDAtMC41LTAuNC0xLTEtMXptMC4zLTRoLTAuM2MtMS40IDAtMS40IDIgMCAyaDIuM3ptLTMuMyAwYy0wLjkgMC0xLjQgMS0wLjcgMS43IDAuNyAwLjYgMS43IDAuMiAxLjctMC43IDAtMC42LTAuNS0xLTEtMXptMTIgOGgtOWMtMS4zIDAtMS4zIDIgMCAyaDljMS4zIDAgMS4zLTIgMC0yem0tMTIgMGMtMSAwLTEuMyAxLTAuNyAxLjcgMC43IDAuNiAxLjcgMC4yIDEuNy0wLjcxMiAwLTAuNS0wLjQtMS0xLTF6Ii8+PHBhdGggZD0ibTcuMzcgNC44MzggMy45My0zLjkxMXYyLjEzOGgzLjYyOXYzLjU0NmgtMy42Mjl2Mi4xMzhsLTMuOTMtMy45MTEiLz48L3N2Zz4=');\n  --toolbarButton-search-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNMTAuMDg5IDEwLjk3M0wxMy45MzQgMTQuODE3QzEzLjk5MTggMTQuODc1NCAxNC4wNjA1IDE0LjkyMTggMTQuMTM2NCAxNC45NTM0QzE0LjIxMjIgMTQuOTg1MSAxNC4yOTM2IDE1LjAwMTMgMTQuMzc1NyAxNS4wMDEyQzE0LjQ1NzkgMTUuMDAxMSAxNC41MzkyIDE0Ljk4NDcgMTQuNjE0OSAxNC45NTI5QzE0LjY5MDcgMTQuOTIxMSAxNC43NTk0IDE0Ljg3NDYgMTQuODE3IDE0LjgxNkMxNC44NzUgMTQuNzU3OSAxNC45MjEgMTQuNjg4OSAxNC45NTIzIDE0LjYxM0MxNC45ODM2IDE0LjUzNzIgMTQuOTk5NyAxNC40NTU5IDE0Ljk5OTYgMTQuMzczOEMxNC45OTk1IDE0LjI5MTcgMTQuOTgzMyAxNC4yMTA0IDE0Ljk1MTggMTQuMTM0NkMxNC45MjAzIDE0LjA1ODggMTQuODc0MSAxMy45OSAxNC44MTYgMTMuOTMyTDEwLjk4MyAxMC4xTDEwLjk4OSA5LjY3Mjk5QzExLjQ4OSA4Ljk2Njc0IDExLjgxNTIgOC4xNTI0OSAxMS45NDEzIDcuMjk2NDJDMTIuMDY3NCA2LjQ0MDM0IDExLjk4OTcgNS41NjY2IDExLjcxNDUgNC43NDYyMUMxMS40Mzk0IDMuOTI1ODIgMTAuOTc0NSAzLjE4MTkyIDEwLjM1NzggMi41NzQ5OEM5Ljc0MTA0IDEuOTY4MDQgOC45ODk3OSAxLjUxNTE5IDguMTY1MDkgMS4yNTMyMkM3LjM0MDM5IDAuOTkxMjU1IDYuNDY1NTEgMC45Mjc1NzIgNS42MTE1NyAxLjA2NzM1QzQuNzU3NjMgMS4yMDcxMiAzLjk0ODcxIDEuNTQ2NDEgMy4yNTA1NyAyLjA1NzY0QzIuNTUyNDMgMi41Njg4NyAxLjk4NDc2IDMuMjM3NjEgMS41OTM3MSA0LjAwOTVDMS4yMDI2NSA0Ljc4MTQgMC45OTkyMzYgNS42MzQ2OCAxIDYuNDk5OTlDMSA3Ljk1ODY4IDEuNTc5NDYgOS4zNTc2MyAyLjYxMDkxIDEwLjM4OTFDMy42NDIzNiAxMS40MjA1IDUuMDQxMzEgMTIgNi41IDEyQzcuNjg5IDEyIDguNzg4IDExLjYyIDkuNjg3IDEwLjk3OEwxMC4wODkgMTAuOTczVjEwLjk3M1pNNi41IDEwLjc1QzQuMTU3IDEwLjc1IDIuMjUgOC44NDI5OSAyLjI1IDYuNDk5OTlDMi4yNSA0LjE1Njk5IDQuMTU3IDIuMjQ5OTkgNi41IDIuMjQ5OTlDOC44NDMgMi4yNDk5OSAxMC43NSA0LjE1Njk5IDEwLjc1IDYuNDk5OTlDMTAuNzUgOC44NDI5OSA4Ljg0MyAxMC43NSA2LjUgMTAuNzVaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo=');\n  --findbarButton-previous-icon: url('data:image/svg+xml;base64,PCEtLSBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljDQogICAtIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMNCiAgIC0gZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gLS0+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGQ9Ik0xMyAxMWExIDEgMCAwIDEtLjcwNy0uMjkzTDggNi40MTRsLTQuMjkzIDQuMjkzYTEgMSAwIDAgMS0xLjQxNC0xLjQxNGw1LTVhMSAxIDAgMCAxIDEuNDE0IDBsNSA1QTEgMSAwIDAgMSAxMyAxMXoiPjwvcGF0aD48L3N2Zz4=');\n  --findbarButton-next-icon: url('data:image/svg+xml;base64,PCEtLSBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljDQogICAtIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMNCiAgIC0gZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gLS0+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGQ9Ik04IDEyYTEgMSAwIDAgMS0uNzA3LS4yOTNsLTUtNWExIDEgMCAwIDEgMS40MTQtMS40MTRMOCA5LjU4Nmw0LjI5My00LjI5M2ExIDEgMCAwIDEgMS40MTQgMS40MTRsLTUgNUExIDEgMCAwIDEgOCAxMnoiPjwvcGF0aD48L3N2Zz4=');\n  --secondaryToolbarButton-firstPage-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEzIDEzYy0uMyAwLS41LS4xLS43LS4zTDggOC40bC00LjMgNC4zYy0uOS45LTIuMy0uNS0xLjQtMS40bDUtNWMuNC0uNCAxLS40IDEuNCAwbDUgNWMuNi42LjIgMS43LS43IDEuN3ptMC0xMUgzQzEuNyAyIDEuNyA0IDMgNGgxMGMxLjMgMCAxLjMtMiAwLTJ6Ii8+PC9zdmc+');\n  --secondaryToolbarButton-lastPage-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTggMTBjLS4zIDAtLjUtLjEtLjctLjNsLTUtNWMtLjktLjkuNS0yLjMgMS40LTEuNEw4IDcuNmw0LjMtNC4zYy45LS45IDIuMy41IDEuNCAxLjRsLTUgNWMtLjIuMi0uNC4zLS43LjN6bTUgMkgzYy0xLjMgMC0xLjMgMiAwIDJoMTBjMS4zIDAgMS4zLTIgMC0yeiIvPjwvc3ZnPg==');\n  --secondaryToolbarButton-rotateCcw-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTEgMWExIDEgMCAwMTEgMXYyLjRBNyA3IDAgMTE4IDE1YTcgNyAwIDAxLTQuOS0yIDEgMSAwIDAxMS40LTEuNSA1IDUgMCAxMC0xLTUuNUg2YTEgMSAwIDAxMCAySDFhMSAxIDAgMDEtMS0xVjJhMSAxIDAgMDExLTF6Ii8+PC9zdmc+');\n  --secondaryToolbarButton-rotateCw-icon: url('data:image/svg+xml;base64,PCEtLSBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljDQogICAtIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMNCiAgIC0gZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gLS0+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0xNSAxYTEgMSAwIDAgMC0xIDF2Mi40MThBNi45OTUgNi45OTUgMCAxIDAgOCAxNWE2Ljk1NCA2Ljk1NCAwIDAgMCA0Ljk1LTIuMDUgMSAxIDAgMCAwLTEuNDE0LTEuNDE0QTUuMDE5IDUuMDE5IDAgMSAxIDEyLjU0OSA2SDEwYTEgMSAwIDAgMCAwIDJoNWExIDEgMCAwIDAgMS0xVjJhMSAxIDAgMCAwLTEtMXoiPjwvcGF0aD48L3N2Zz4=');\n  --secondaryToolbarButton-selectTool-icon: url('data:image/svg+xml;base64,PCEtLSBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljDQogICAtIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMNCiAgIC0gZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gLS0+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGQ9Ik0xMi40MDggOC4yMTdsLTguMDgzLTYuN0EuMi4yIDAgMCAwIDQgMS42NzJWMTIuM2EuMi4yIDAgMCAwIC4zMzMuMTQ2bDIuNTYtMi4zNzIgMS44NTcgMy45QTEuMTI1IDEuMTI1IDAgMSAwIDEwLjc4MiAxM0w4LjkxMyA5LjA3NWwzLjQtLjUxYS4yLjIgMCAwIDAgLjA5NS0uMzQ4eiI+PC9wYXRoPjwvc3ZnPg==');\n  --secondaryToolbarButton-handTool-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHBhdGggZD0iTTE1IDMuN1YxM2MwIDEuNS0xLjUzIDMtMyAzSDcuMTNjLS43MiAwLTEuNjMtLjUtMi4xMy0xbC01LTVzLjg0LTEgLjg3LTFjLjEzLS4xLjMzLS4yLjUzLS4yLjEgMCAuMy4xLjQuMkw0IDEwLjZWMi43YzAtLjYuNC0xIDEtMXMxIC40IDEgMXY0LjZoMVYxYzAtLjYuNC0xIDEtMXMxIC40IDEgMXY2LjNoMVYxLjdjMC0uNi40LTEgMS0xczEgLjQgMSAxdjUuN2gxVjMuN2MwLS42LjQtMSAxLTFzMSAuNCAxIDF6Ii8+PC9zdmc+');\n  --secondaryToolbarButton-scrollPage-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHBhdGggZD0iTTkuNSA0YzEgMCAxLjUuNSAxLjUgMS41djVjMCAxLS41IDEuNS0xLjUgMS41aC0zYy0xIDAtMS41LS41LTEuNS0xLjV2LTVDNSA0LjUgNS41IDQgNi41IDR6Ii8+PC9zdmc+');\n  --secondaryToolbarButton-scrollVertical-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHBhdGggZD0iTTkuNSA0YzEgMCAxLjUuNSAxLjUgMS41djVjMCAxLS41IDEuNS0xLjUgMS41aC0zYy0xIDAtMS41LS41LTEuNS0xLjV2LTVDNSA0LjUgNS41IDQgNi41IDR6TTExIDB2LjVjMCAxLS41IDEuNS0xLjUgMS41aC0zQzUuNSAyIDUgMS41IDUgLjVWMGg2ek0xMSAxNnYtLjVjMC0xLS41LTEuNS0xLjUtMS41aC0zYy0xIDAtMS41LjUtMS41IDEuNXYuNWg2eiIvPjwvc3ZnPg==');\n  --secondaryToolbarButton-scrollHorizontal-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHBhdGggZD0iTTAgNGgxLjVjMSAwIDEuNS41IDEuNSAxLjV2NWMwIDEtLjUgMS41LTEuNSAxLjVIMHpNOS41IDRjMSAwIDEuNS41IDEuNSAxLjV2NWMwIDEtLjUgMS41LTEuNSAxLjVoLTNjLTEgMC0xLjUtLjUtMS41LTEuNXYtNUM1IDQuNSA1LjUgNCA2LjUgNHpNMTYgNGgtMS41Yy0xIDAtMS41LjUtMS41IDEuNXY1YzAgMSAuNSAxLjUgMS41IDEuNUgxNnoiLz48L3N2Zz4=');\n  --secondaryToolbarButton-scrollWrapped-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTUuNSA0YzEgMCAxLjUuNSAxLjUgMS41djVjMCAxLS41IDEuNS0xLjUgMS41aC0zYy0xIDAtMS41LS41LTEuNS0xLjV2LTVDMSA0LjUgMS41IDQgMi41IDR6TTcgMHYuNUM3IDEuNSA2LjUgMiA1LjUgMmgtM0MxLjUgMiAxIDEuNSAxIC41VjBoNnpNNyAxNnYtLjVjMC0xLS41LTEuNS0xLjUtMS41aC0zYy0xIDAtMS41LjUtMS41IDEuNXYuNWg2ek0xMy41IDRjMSAwIDEuNS41IDEuNSAxLjV2NWMwIDEtLjUgMS41LTEuNSAxLjVoLTNjLTEgMC0xLjUtLjUtMS41LTEuNXYtNWMwLTEgLjUtMS41IDEuNS0xLjV6TTE1IDB2LjVjMCAxLS41IDEuNS0xLjUgMS41aC0zQzkuNSAyIDkgMS41IDkgLjVWMGg2ek0xNSAxNnYtLjUwN2MwLTEtLjUtMS41LTEuNS0xLjVoLTNDOS41IDE0IDkgMTQuNSA5IDE1LjV2LjVoNnoiLz48L3N2Zz4=');\n  --secondaryToolbarButton-spreadNone-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHBhdGggZD0iTTYgM2MtMSAwLTEuNS41LTEuNSAxLjV2N2MwIDEgLjUgMS41IDEuNSAxLjVoNGMxIDAgMS41LS41IDEuNS0xLjV2LTdjMC0xLS41LTEuNS0xLjUtMS41eiIvPjwvc3ZnPg==');\n  --secondaryToolbarButton-spreadOdd-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEwLjU2IDMuNUM5LjU2IDMuNSA5IDQgOSA1djYuNWMwIDEgLjUgMS41IDEuNSAxLjVoNGMxIDAgMS41LS41IDEuNS0xLjVWNWMwLTEtLjUtMS41LTEuNS0xLjV6bTEuOTMgMS4yYy44IDAgMS40LjIgMS44LjY0LjUuNC43IDEgLjcgMS43IDAgLjUtLjIgMS0uNSAxLjQ0LS4yLjMtLjYuNi0xIC45M2wtLjYuNGMtLjQuMy0uNi40LS43LjU1LS4xLjEtLjIuMi0uMy40aDMuMnYxLjI3aC01YzAtLjUuMS0xIC4zLTEuNDMuMi0uNDkuNy0xIDEuNS0xLjU0LjctLjUgMS4xLS44IDEuMy0xLjAyLjMtLjMuNC0uNy40LTEuMDUgMC0uMy0uMS0uNi0uMy0uNzctLjItLjItLjQtLjMtLjctLjMtLjQgMC0uNy4yLS45LjUtLjEuMi0uMS41LS4yLjloLTEuNGMwLS42LjItMS4xLjMtMS41LjQtLjcgMS4xLTEuMSAyLTEuMXpNMS41NCAzLjVDLjU0IDMuNSAwIDQgMCA1djYuNWMwIDEgLjUgMS41IDEuNTQgMS41aDRjMSAwIDEuNS0uNSAxLjUtMS41VjVjMC0xLS41LTEuNS0xLjUtMS41em0xLjggMS4xMjVINC41VjEySDNWNi45SDEuM3YtMWMuNSAwIC44IDAgLjk3LS4wMy4zMy0uMDcuNTMtLjE3LjczLS4zNy4xLS4yLjItLjMuMjUtLjUuMDUtLjIuMDUtLjMuMDUtLjN6Ii8+PC9zdmc+');\n  --secondaryToolbarButton-spreadEven-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEuNSAzLjVDLjUgMy41IDAgNCAwIDV2Ni41YzAgMSAuNSAxLjUgMS41IDEuNWg0YzEgMCAxLjUtLjUgMS41LTEuNVY1YzAtMS0uNS0xLjUtMS41LTEuNXptMiAxLjJjLjggMCAxLjQuMiAxLjguNi41LjQuNyAxIC43IDEuNyAwIC41LS4yIDEtLjUgMS40LS4yLjMtLjUuNy0xIDFsLS42LjRjLS40LjMtLjYuNC0uNzUuNTYtLjE1LjE0LS4yNS4yNC0uMzUuNDRINnYxLjNIMWMwLS42LjEtMS4xLjMtMS41LjMtLjYuNy0xIDEuNS0xLjYuNy0uNCAxLjEtLjggMS4yOC0xIC4zMi0uMy40Mi0uNi40Mi0xIDAtLjMtLjEtLjYtLjIzLS44LS4xNy0uMi0uMzctLjMtLjc3LS4zcy0uNy4xLS45LjVjLS4wNC4yLS4xLjUtLjEuOUgxLjFjMC0uNi4xLTEuMS4zLTEuNS40LS43IDEuMS0xLjEgMi4xLTEuMXpNMTAuNTQgMy41NEM5LjUgMy41NCA5IDQgOSA1djYuNWMwIDEgLjUgMS41IDEuNTQgMS41aDRjLjk2IDAgMS40Ni0uNSAxLjQ2LTEuNVY1YzAtMS0uNS0xLjQ2LTEuNS0xLjQ2em0xLjkuOTVjLjcgMCAxLjMuMiAxLjcuNS40LjQuNi44LjYgMS40IDAgLjQtLjEuOC0uNCAxLjEtLjIuMi0uMy4zLS41LjQuMSAwIC4zLjEuNi4zLjQuMy41LjguNSAxLjQgMCAuNi0uMiAxLjItLjYgMS42LS40LjUtMS4xLjctMS45LjctMSAwLTEuOC0uMy0yLjItMS0uMTQtLjI5LS4yNC0uNjktLjI0LTEuMjloMS40YzAgLjMgMCAuNS4xLjcuMi40LjUuNSAxIC41LjMgMCAuNS0uMS43LS4zLjItLjIuMy0uNS4zLS44IDAtLjUtLjItLjgtLjYtLjk1LS4yLS4wNS0uNS0uMTUtMS0uMTV2LTFjLjUgMCAuOC0uMSAxLS4xNC4zLS4xLjUtLjQuNS0uOSAwLS4zLS4xLS41LS4yLS43LS4yLS4yLS40LS4zLS43LS4zLS4zIDAtLjYuMS0uNzUuMy0uMi4yLS4yLjUtLjIuODZoLTEuMzRjMC0uNC4xLS43LjE5LTEuMSAwLS4xMi4yLS4zMi40LS42Mi4yLS4yLjQtLjMuNy0uNC4zLS4xLjYtLjEgMS0uMXoiLz48L3N2Zz4=');\n  --secondaryToolbarButton-documentProperties-icon: url('data:image/svg+xml;base64,PCEtLSBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljDQogICAtIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMNCiAgIC0gZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gLS0+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYNCjE2Ij4NCjxwYXRoIA0KICAgZD0iTTggMTZhOCA4IDAgMSAxIDgtOCA4LjAwOSA4LjAwOSAwIDAgMS04IDh6TTggMmE2IDYgMCAxIDAgNiA2IDYuMDA2IDYuMDA2IDAgMCAwLTYtNnoiPg0KPC9wYXRoPg0KPHBhdGggDQogICBkPSJNOCA3YTEgMSAwIDAgMC0xIDF2M2ExIDEgMCAwIDAgMiAwVjhhMSAxIDAgMCAwLTEtMXoiPg0KPC9wYXRoPg0KPGNpcmNsZQ0KICAgY3g9IjgiIGN5PSI1IiByPSIxLjE4OCI+DQo8L2NpcmNsZT4NCjwvc3ZnPg==');\n}\n.viewer_hidden__J48w1,\n[hidden] {\n  display: none !important;\n}\n.viewer_container__aWaE6 {\n  position: relative;\n  min-width: 800px;\n}\n.viewer_wrapper__hMjlo {\n  position: relative;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  min-width: 350px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.viewer_viewerContainer__-4p-s {\n  overflow: auto;\n  position: relative;\n  top: 0;\n  width: 100%;\n  outline: none;\n  background-color: var(--body-bg-color);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.viewer_viewerContainer__-4p-s .viewer_page__-ex9y {\n  position: relative;\n  margin-top: var(--viewer-padding-top);\n}\n.viewer_viewerContainer__-4p-s .viewer_canvasWrapper__eUYVl {\n  position: absolute;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  border: var(--canvas-wrapper-border);\n  -o-border-image: var(--page-border-image) 9 9 repeat;\n     border-image: var(--page-border-image) 9 9 repeat;\n}\n.viewer_viewerContainer__-4p-s .viewer_textLayer__QrLKG {\n  position: absolute;\n  left: 50%;\n  border-top: var(--canvas-wrapper-border);\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  display: inline-block;\n  opacity: 0.2;\n  overflow: hidden;\n}\n.viewer_viewerContainer__-4p-s .viewer_textLayer__QrLKG > span {\n  position: absolute;\n  color: transparent;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  cursor: text;\n  white-space: nowrap;\n}\n.viewer_viewerContainer__-4p-s .viewer_textLayer__QrLKG ::-moz-selection {\n  color: transparent;\n  background: #0000ff;\n}\n.viewer_viewerContainer__-4p-s .viewer_textLayer__QrLKG ::selection {\n  color: transparent;\n  background: #0000ff;\n}\n.viewer_toolbarContainer__---t3 {\n  width: 100%;\n}\n.viewer_toolbarContainer__---t3,\n.viewer_findbar__T3389,\n.viewer_secondaryToolbar__zze7-,\n.viewer_editorParamsToolbar__i1hMT {\n  position: relative;\n  height: var(--toolbar-height);\n  background-color: var(--toolbar-bg-color);\n  background-image: var(--toobar-background), linear-gradient(hsla(0, 0%, 32%, 0.99), hsla(0, 0%, 27%, 0.95));\n  box-shadow: 0 1px 0 var(--toolbar-border-color);\n}\n.viewer_toolbarViewer__t2QET {\n  height: var(--toolbar-height);\n  display: flex;\n  justify-content: space-between;\n}\n.viewer_loadingBar__s2htQ {\n  position: absolute;\n  inset-inline: 0 var(--progressBar-end-offset);\n  height: 4px;\n  background-color: var(--body-bg-color);\n  border-bottom: 1px solid var(--toolbar-border-color);\n  transition-property: inset-inline-start;\n  transition-duration: var(--sidebar-transition-duration);\n  transition-timing-function: var(--sidebar-transition-timing-function);\n}\n.viewer_loadingBar__s2htQ .viewer_progress__AqMuE {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  -webkit-transform: scaleX(var(--progressBar-percent));\n          transform: scaleX(var(--progressBar-percent));\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  height: 100%;\n  background-color: var(--progressBar-color);\n  overflow: hidden;\n  transition: -webkit-transform 200ms;\n  transition: transform 200ms;\n  transition: transform 200ms, -webkit-transform 200ms;\n}\n.viewer_findbar__T3389,\n.viewer_secondaryToolbar__zze7-,\n.viewer_editorParamsToolbar__i1hMT {\n  top: 32px;\n  position: absolute;\n  z-index: 10000;\n  height: auto;\n  padding: 0 4px;\n  margin: 4px 2px;\n  font-size: 12px;\n  line-height: 14px;\n  text-align: left;\n  cursor: default;\n}\n.viewer_pagination__zVcUz {\n  display: flex;\n  align-items: center;\n}\n.viewer_pagination__zVcUz .viewer_pageNumber__ERlrQ {\n  width: 35px;\n}\n.viewer_pagination__zVcUz .viewer_numPages__99peB {\n  color: #ccc;\n}\n.viewer_toolbarViewerMiddle__eERXZ {\n  position: absolute;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  display: flex;\n}\n.viewer_toolbarViewerLeft__uaFc9 > *,\n.viewer_toolbarViewerMiddle__eERXZ > *,\n.viewer_toolbarViewerRight__3lZ6C > *,\n.viewer_toolbarSidebarLeft__scE2T *,\n.viewer_toolbarSidebarRight__0C3RI *,\n.viewer_findbar__T3389 * {\n  position: relative;\n}\n.viewer_toolbarViewerLeft__uaFc9 {\n  -webkit-padding-start: 1px;\n          padding-inline-start: 1px;\n  display: flex;\n}\n.viewer_toolbarViewerRight__3lZ6C {\n  -webkit-padding-end: 1px;\n          padding-inline-end: 1px;\n  display: flex;\n}\n.viewer_toolbarSidebarRight__0C3RI {\n  display: flex;\n  -webkit-padding-end: 2px;\n          padding-inline-end: 2px;\n}\n.viewer_splitToolbarButton__dhs5l {\n  margin: 2px;\n  display: flex;\n}\n.viewer_toolbarButton__CtIcb,\n.viewer_secondaryToolbarButton__8TUAJ,\n.viewer_dialogButton__vHtr6 {\n  border: 0 none;\n  background: none;\n  width: 28px;\n  height: 28px;\n}\n.viewer_toolbarButton__CtIcb > span {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  overflow: hidden;\n}\n.viewer_toolbarButton__CtIcb[disabled],\n.viewer_secondaryToolbarButton__8TUAJ[disabled],\n.viewer_dialogButton__vHtr6[disabled] {\n  opacity: 0.5;\n}\n.viewer_splitToolbarButton__dhs5l > .viewer_toolbarButton__CtIcb:hover,\n.viewer_splitToolbarButton__dhs5l > .viewer_toolbarButton__CtIcb:focus-visible {\n  background-color: var(--button-hover-color);\n}\n.viewer_splitToolbarButton__dhs5l > .viewer_toolbarButton__CtIcb {\n  position: relative;\n  margin: 0;\n}\n.viewer_toolbarSidebar__8W5NB .viewer_splitToolbarButton__dhs5l > .viewer_toolbarButton__CtIcb {\n  -webkit-margin-end: 2px;\n          margin-inline-end: 2px;\n}\n.viewer_splitToolbarButtonSeparator__ga-bJ {\n  float: inline-start;\n  margin: 4px 0;\n  width: 1px;\n  height: 20px;\n  background-color: var(--separator-color);\n}\n.viewer_toolbarButton__CtIcb,\n.viewer_dropdownToolbarButton__ftK75,\n.viewer_secondaryToolbarButton__8TUAJ,\n.viewer_dialogButton__vHtr6 {\n  min-width: 16px;\n  margin: 2px 1px;\n  padding: 2px 6px 0;\n  border: none;\n  border-radius: 2px;\n  color: var(--main-color);\n  font-size: 12px;\n  line-height: 14px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  box-sizing: border-box;\n}\n.viewer_toolbarButton__CtIcb > input {\n  cursor: pointer;\n}\n.viewer_toolbarButton__CtIcb:hover,\n.viewer_toolbarButton__CtIcb:focus-visible {\n  background-color: var(--button-hover-color);\n}\n.viewer_secondaryToolbarButton__8TUAJ:hover,\n.viewer_secondaryToolbarButton__8TUAJ:focus-visible {\n  background-color: var(--doorhanger-hover-bg-color);\n  color: var(--doorhanger-hover-color);\n}\n.viewer_toolbarButton__CtIcb.viewer_toggled__-Qkm6,\n.viewer_splitToolbarButton__dhs5l.viewer_toggled__-Qkm6 > .viewer_toolbarButton__CtIcb.viewer_toggled__-Qkm6,\n.viewer_secondaryToolbarButton__8TUAJ.viewer_toggled__-Qkm6 {\n  background-color: var(--toggled-btn-bg-color);\n  color: var(--toggled-btn-color);\n}\n.viewer_toolbarButton__CtIcb.viewer_toggled__-Qkm6::before,\n.viewer_secondaryToolbarButton__8TUAJ.viewer_toggled__-Qkm6::before {\n  background-color: var(--toggled-btn-color);\n}\n.viewer_toolbarSidebar__8W5NB .viewer_toolbarButton__CtIcb.viewer_toggled__-Qkm6::before {\n  background-color: transparent;\n}\n.viewer_toolbarButton__CtIcb.viewer_toggled__-Qkm6:hover:active,\n.viewer_splitToolbarButton__dhs5l.viewer_toggled__-Qkm6 > .viewer_toolbarButton__CtIcb.viewer_toggled__-Qkm6:hover:active,\n.viewer_secondaryToolbarButton__8TUAJ.viewer_toggled__-Qkm6:hover:active {\n  background-color: var(--toggled-hover-active-btn-color);\n}\n.viewer_dropdownToolbarButton__ftK75 {\n  width: var(--scale-select-container-width);\n  padding: 0;\n  overflow: hidden;\n  background-color: var(--dropdown-btn-bg-color);\n}\n.viewer_dropdownToolbarButton__ftK75::after {\n  top: 6px;\n  inset-inline-end: 7px;\n  pointer-events: none;\n  background-image: var(--toolbarButton-menuArrow-icon);\n}\n.viewer_dropdownToolbarButton__ftK75 > select {\n  width: calc(var(--scale-select-container-width) + var(--scale-select-overflow));\n  height: 28px;\n  font-size: 12px;\n  color: var(--main-color);\n  margin: 0;\n  padding: 1px 0 2px;\n  -webkit-padding-start: 4px;\n          padding-inline-start: 4px;\n  border: none;\n  background-color: var(--dropdown-btn-bg-color);\n}\n.viewer_dropdownToolbarButton__ftK75 > select:hover,\n.viewer_dropdownToolbarButton__ftK75 > select:focus-visible {\n  background-color: #fff;\n}\n.viewer_dropdownToolbarButton__ftK75 > select > option {\n  background: var(--doorhanger-bg-color);\n  color: var(--main-color);\n}\n.viewer_toolbarButtonSpacer__IrRyn {\n  width: 30px;\n  display: inline-block;\n  height: 1px;\n}\n.viewer_toolbarButton__CtIcb::before,\n.viewer_secondaryToolbarButton__8TUAJ::before,\n.viewer_dropdownToolbarButton__ftK75::after,\n.viewer_treeItemToggler__1TJaV::before {\n  /* All matching have a size of 16x16\n   * All relevant containers have a size of 28x28 */\n  position: absolute;\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  content: \"\";\n  background-size: cover;\n}\n.viewer_toolbarButton__CtIcb::before {\n  opacity: var(--toolbar-icon-opacity);\n  top: 6px;\n  left: 6px;\n}\n.viewer_secondaryToolbarButton__8TUAJ::before {\n  opacity: var(--doorhanger-icon-opacity);\n  top: 5px;\n  inset-inline-start: 12px;\n}\n.viewer_sidebarToggle__G6KUz::before {\n  background-image: var(--toolbarButton-sidebarToggle-icon);\n  -webkit-transform: scaleX(var(--dir-factor));\n          transform: scaleX(var(--dir-factor));\n}\n.viewer_secondaryToolbarToggle__zTbyK::before {\n  background-image: var(--toolbarButton-secondaryToolbarToggle-icon);\n  -webkit-transform: scaleX(var(--dir-factor));\n          transform: scaleX(var(--dir-factor));\n}\n.viewer_previous__WVoOd::before {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAvUlEQVR4AZXPMcrCQBDF8WksLHMCz2Bh6YfgLSwtvIp4BFsLWwmRxMJGVFAQBAshEPkkBNEDJE2K54PssktcC/ObZtg/hJEfP6xIbAJbhAdF34IQGVLKELqCJZ/uSsqtFgT4x83gFtiBjwRxTQJfBwuuV4eYLyKctvSEcDG4E1/sD2fDfebJ0nQE5Q4HLe/kUuFozzn2WjEppMLRpgNssFWO6H/8Qrzx8DUr18yIyQieCVTCw7rqxD9pSUPkDcScIefy5+KaAAAAAElFTkSuQmCC');\n}\n.viewer_next__8B0Po::before {\n  background-image: var(--toolbarButton-pageDown-icon);\n}\n.viewer_zoomOut__IeNmj::before {\n  background-image: var(--toolbarButton-zoomOut-icon);\n}\n.viewer_zoomIn__OAdd9::before {\n  background-image: var(--toolbarButton-zoomIn-icon);\n}\n.viewer_print__usybp::before,\n.viewer_secondaryPrint__EwTaO::before {\n  background-image: var(--toolbarButton-print-icon);\n}\n/*#if GENERIC*/\n.viewer_openFile__TMsbi::before,\n.viewer_secondaryOpenFile__tWb6i::before {\n  background-image: var(--toolbarButton-openFile-icon);\n}\n/*#endif*/\n.viewer_download__cwU1J::before,\n.viewer_secondaryDownload__27K2e::before {\n  background-image: var(--toolbarButton-download-icon);\n}\n.viewer_pageRotateCw__il7aD::before {\n  background-image: var(--secondaryToolbarButton-rotateCw-icon);\n}\n.viewer_pageRotateCcw__aKbou::before {\n  background-image: var(--secondaryToolbarButton-rotateCcw-icon);\n}\n.viewer_viewThumbnail__-7pU2::before {\n  background-image: var(--toolbarButton-viewThumbnail-icon);\n}\n.viewer_loadingPage__aPdlt {\n  position: absolute;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n}\n.viewer_loadingPage__aPdlt .viewer_loading__Xb87C {\n  position: absolute;\n  z-index: 100;\n  left: 50%;\n  -webkit-transform: translate(-50%, 300px) scale(1.5);\n          transform: translate(-50%, 300px) scale(1.5);\n}\n.viewer_errorLine__cxsr5 {\n  width: 100%;\n  height: 32px;\n  position: absolute;\n  z-index: 2000;\n  top: var(--toolbar-height);\n  background-color: #e21e1e;\n  color: #fff;\n  padding: 4px 10px;\n  display: flex;\n  justify-content: space-between;\n}\n.viewer_errorLine__cxsr5 > button {\n  color: #666;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n.viewer_sidebarContainer__zONLS {\n  position: absolute;\n  left: 0;\n  top: 32px;\n  bottom: 0;\n  opacity: 0;\n  width: var(--sidebar-width);\n  visibility: hidden;\n  z-index: 100;\n  font: message-box;\n  border-top: 1px solid #333333;\n  -webkit-border-end: var(--doorhanger-border-color-whcm);\n          border-inline-end: var(--doorhanger-border-color-whcm);\n  transition-property: opacity;\n  transition-duration: var(--sidebar-transition-duration);\n  transition-timing-function: var(--sidebar-transition-timing-function);\n}\n.viewer_outerContainer__OT6Jn {\n  position: relative;\n  width: 100%;\n  left: 0;\n  right: 0;\n  cursor: default;\n}\n.viewer_outerContainer__OT6Jn.viewer_sidebarMoving__GczhR .viewer_sidebarContainer__zONLS,\n.viewer_outerContainer__OT6Jn.viewer_sidebarOpen__NLbFg .viewer_sidebarContainer__zONLS {\n  visibility: visible;\n}\n.viewer_outerContainer__OT6Jn.viewer_sidebarOpen__NLbFg .viewer_sidebarContainer__zONLS {\n  opacity: 1;\n}\n.viewer_sidebarContent__m3K9w {\n  top: 32px;\n  bottom: 0;\n  inset-inline-start: 0;\n  overflow: auto;\n  position: absolute;\n  width: 100%;\n  background-color: rgba(247, 247, 247, 0.9);\n  box-shadow: inset calc(-1px * var(--dir-factor)) 0 0 rgba(0, 0, 0, 0.25);\n}\n.viewer_toolbarSidebar__8W5NB {\n  width: 100%;\n  height: 32px;\n  background-color: var(--sidebar-toolbar-bg-color);\n  box-shadow: var(--toolbarSidebar-box-shadow);\n  border-bottom: var(--toolbarSidebar-border-bottom);\n}\n.viewer_sidebarResizer__CHscN {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  inset-inline-end: -6px;\n  width: 6px;\n  z-index: 200;\n  cursor: ew-resize;\n}\n.viewer_thumbnailView__h-sab,\n.viewer_outlineView__7uKUu,\n.viewer_attachmentsView__paHkT,\n.viewer_layersView__FOT8q {\n  position: absolute;\n  width: calc(100% - 8px);\n  top: 0;\n  bottom: 0;\n  padding: 4px 4px 0;\n  overflow: auto;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.viewer_thumbnailView__h-sab {\n  width: calc(100% - 60px);\n  padding: 10px 30px 0;\n  box-sizing: content-box;\n}\n.viewer_thumbnail__us8Tn {\n  float: inline-start;\n  cursor: pointer;\n  margin: 0 10px 10px;\n  border: 1px solid rgba(0, 0, 0, 0);\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.3);\n  opacity: 0.8;\n  z-index: 99;\n  background-color: #ffffff;\n  background-clip: content-box;\n}\n.viewer_thumbnail__us8Tn:hover,\n.viewer_thumbnail__us8Tn.viewer_selected__SIeqA {\n  box-shadow: 0px 0px 9px #000;\n  background-clip: padding-box;\n  color: rgba(255, 255, 255, 0.9);\n  margin: 0 6px 5px;\n  padding: 6px;\n}\n.viewer_thumbnail__us8Tn.viewer_selected__SIeqA {\n  opacity: 1;\n}\n.viewer_thumbnailImage__9D1ce {\n  border: 1px solid rgba(0, 0, 0, 0);\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);\n  opacity: 0.8;\n  z-index: 99;\n  background-color: #ffffff;\n  background-clip: content-box;\n}\n.viewer_thumbnailSelectionRing__XZoPk {\n  border-radius: 2px;\n  padding: 7px;\n}\n.viewer_thumbnail__us8Tn.viewer_selected__SIeqA > .viewer_thumbnailSelectionRing__XZoPk > .viewer_thumbnailImage__9D1ce {\n  opacity: 1;\n}\n.viewer_thumbnail__us8Tn.viewer_selected__SIeqA > .viewer_thumbnailSelectionRing__XZoPk {\n  background-color: var(--sidebaritem-bg-color);\n  background-clip: padding-box;\n  color: #ffffff;\n}\n.viewer_print-iframe__YiWkQ {\n  display: none;\n  height: 100%;\n}\n/* chrome */\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n}\n/* 火狐浏览器 */\ninput[type=\"number\"] {\n  -moz-appearance: textfield;\n}\n";
var styles$3 = {"hidden":"viewer_hidden__J48w1","container":"viewer_container__aWaE6","wrapper":"viewer_wrapper__hMjlo","viewerContainer":"viewer_viewerContainer__-4p-s","page":"viewer_page__-ex9y","canvasWrapper":"viewer_canvasWrapper__eUYVl","textLayer":"viewer_textLayer__QrLKG","toolbarContainer":"viewer_toolbarContainer__---t3","findbar":"viewer_findbar__T3389","secondaryToolbar":"viewer_secondaryToolbar__zze7-","editorParamsToolbar":"viewer_editorParamsToolbar__i1hMT","toolbarViewer":"viewer_toolbarViewer__t2QET","loadingBar":"viewer_loadingBar__s2htQ","progress":"viewer_progress__AqMuE","pagination":"viewer_pagination__zVcUz","pageNumber":"viewer_pageNumber__ERlrQ","numPages":"viewer_numPages__99peB","toolbarViewerMiddle":"viewer_toolbarViewerMiddle__eERXZ","toolbarViewerLeft":"viewer_toolbarViewerLeft__uaFc9","toolbarViewerRight":"viewer_toolbarViewerRight__3lZ6C","toolbarSidebarLeft":"viewer_toolbarSidebarLeft__scE2T","toolbarSidebarRight":"viewer_toolbarSidebarRight__0C3RI","splitToolbarButton":"viewer_splitToolbarButton__dhs5l","toolbarButton":"viewer_toolbarButton__CtIcb","secondaryToolbarButton":"viewer_secondaryToolbarButton__8TUAJ","dialogButton":"viewer_dialogButton__vHtr6","toolbarSidebar":"viewer_toolbarSidebar__8W5NB","splitToolbarButtonSeparator":"viewer_splitToolbarButtonSeparator__ga-bJ","dropdownToolbarButton":"viewer_dropdownToolbarButton__ftK75","toggled":"viewer_toggled__-Qkm6","toolbarButtonSpacer":"viewer_toolbarButtonSpacer__IrRyn","treeItemToggler":"viewer_treeItemToggler__1TJaV","sidebarToggle":"viewer_sidebarToggle__G6KUz","secondaryToolbarToggle":"viewer_secondaryToolbarToggle__zTbyK","previous":"viewer_previous__WVoOd","next":"viewer_next__8B0Po","zoomOut":"viewer_zoomOut__IeNmj","zoomIn":"viewer_zoomIn__OAdd9","print":"viewer_print__usybp","secondaryPrint":"viewer_secondaryPrint__EwTaO","openFile":"viewer_openFile__TMsbi","secondaryOpenFile":"viewer_secondaryOpenFile__tWb6i","download":"viewer_download__cwU1J","secondaryDownload":"viewer_secondaryDownload__27K2e","pageRotateCw":"viewer_pageRotateCw__il7aD","pageRotateCcw":"viewer_pageRotateCcw__aKbou","viewThumbnail":"viewer_viewThumbnail__-7pU2","loadingPage":"viewer_loadingPage__aPdlt","loading":"viewer_loading__Xb87C","errorLine":"viewer_errorLine__cxsr5","sidebarContainer":"viewer_sidebarContainer__zONLS","outerContainer":"viewer_outerContainer__OT6Jn","sidebarMoving":"viewer_sidebarMoving__GczhR","sidebarOpen":"viewer_sidebarOpen__NLbFg","sidebarContent":"viewer_sidebarContent__m3K9w","sidebarResizer":"viewer_sidebarResizer__CHscN","thumbnailView":"viewer_thumbnailView__h-sab","outlineView":"viewer_outlineView__7uKUu","attachmentsView":"viewer_attachmentsView__paHkT","layersView":"viewer_layersView__FOT8q","thumbnail":"viewer_thumbnail__us8Tn","selected":"viewer_selected__SIeqA","thumbnailImage":"viewer_thumbnailImage__9D1ce","thumbnailSelectionRing":"viewer_thumbnailSelectionRing__XZoPk","print-iframe":"viewer_print-iframe__YiWkQ"};
styleInject(css_248z$3);

// import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
// import { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api';

function isFunction(value) {
  return typeof value === 'function';
}
var eventBus = new pdf_viewer.EventBus();
var usePdf = function usePdf(_ref) {
  var canvasRef = _ref.canvasRef,
    pageWrapperRef = _ref.pageWrapperRef,
    file = _ref.file,
    onDocumentLoadSuccess = _ref.onDocumentLoadSuccess,
    onDocumentLoadFail = _ref.onDocumentLoadFail,
    onPageLoadSuccess = _ref.onPageLoadSuccess,
    onPageLoadFail = _ref.onPageLoadFail,
    onPageRenderSuccess = _ref.onPageRenderSuccess,
    onPageRenderFail = _ref.onPageRenderFail,
    _ref$scale = _ref.scale,
    scale = _ref$scale === void 0 ? 1.5 : _ref$scale,
    _ref$rotate = _ref.rotate,
    rotate = _ref$rotate === void 0 ? 0 : _ref$rotate,
    _ref$page = _ref.page,
    page = _ref$page === void 0 ? 1 : _ref$page,
    cMapUrl = _ref.cMapUrl,
    cMapPacked = _ref.cMapPacked,
    _ref$workerSrc = _ref.workerSrc,
    workerSrc = _ref$workerSrc === void 0 ? "//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(pdfjs__namespace.version, "/pdf.worker.js") : _ref$workerSrc,
    _ref$withCredentials = _ref.withCredentials,
    withCredentials = _ref$withCredentials === void 0 ? true : _ref$withCredentials;
  //console.log('viewer.js运行')
  var _useState = React.useState(),
    _useState2 = _slicedToArray(_useState, 2),
    pdfDocument = _useState2[0],
    setPdfDocument = _useState2[1];
  var _useState3 = React.useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    pdfPage = _useState4[0],
    setPdfPage = _useState4[1];
  var renderTask = React.useRef(null);
  var scaleRef = React.useRef(scale);
  var pdfPageRef = React.useRef(pdfPage);
  var onDocumentLoadSuccessRef = React.useRef(onDocumentLoadSuccess);
  var onDocumentLoadFailRef = React.useRef(onDocumentLoadFail);
  var onPageLoadSuccessRef = React.useRef(onPageLoadSuccess);
  var onPageLoadFailRef = React.useRef(onPageLoadFail);
  var onPageRenderSuccessRef = React.useRef(onPageRenderSuccess);
  var onPageRenderFailRef = React.useRef(onPageRenderFail);
  // assign callbacks to refs to avoid redrawing
  React.useEffect(function () {
    onDocumentLoadSuccessRef.current = onDocumentLoadSuccess;
  }, [onDocumentLoadSuccess]);
  React.useEffect(function () {
    onDocumentLoadFailRef.current = onDocumentLoadFail;
  }, [onDocumentLoadFail]);
  React.useEffect(function () {
    onPageLoadSuccessRef.current = onPageLoadSuccess;
  }, [onPageLoadSuccess]);
  React.useEffect(function () {
    onPageLoadFailRef.current = onPageLoadFail;
  }, [onPageLoadFail]);
  React.useEffect(function () {
    onPageRenderSuccessRef.current = onPageRenderSuccess;
  }, [onPageRenderSuccess]);
  React.useEffect(function () {
    onPageRenderFailRef.current = onPageRenderFail;
  }, [onPageRenderFail]);
  React.useEffect(function () {
    pdfjs__namespace.GlobalWorkerOptions.workerSrc = workerSrc;
  }, [workerSrc]);
  React.useEffect(function () {
    scaleRef.current = scale;
  }, [scale]);
  React.useEffect(function () {
    pdfPageRef.current = pdfPage;
  }, [pdfPage]);
  React.useEffect(function () {
    if (!file) return;
    var config = {
      withCredentials: withCredentials
    };
    if (isFunction(file)) {
      config.url = file();
    } else {
      config.url = file;
    }
    if (cMapUrl) {
      config.cMapUrl = cMapUrl;
      config.cMapPacked = cMapPacked;
    }
    pdfjs__namespace.getDocument(config).promise.then(function (loadedPdfDocument) {
      setPdfDocument(loadedPdfDocument);
      if (isFunction(onDocumentLoadSuccessRef.current)) {
        onDocumentLoadSuccessRef.current(loadedPdfDocument);
      }
    }, function (info) {
      if (isFunction(onDocumentLoadFailRef.current)) {
        onDocumentLoadFailRef.current(info);
      }
    });
  }, [file, withCredentials, cMapUrl, cMapPacked]);
  React.useEffect(function () {
    if (pdfDocument) {
      pdfDocument.getPage(page).then(function (loadedPdfPage) {
        setPdfPage(loadedPdfPage);
        if (isFunction(onPageLoadSuccessRef.current)) {
          onPageLoadSuccessRef.current(loadedPdfPage);
        }
      }, function (e) {
        console.log('onPageLoadFail', e);
        if (isFunction(onPageLoadFailRef.current)) {
          onPageLoadFailRef.current();
        }
      });
    }
  }, [canvasRef, pageWrapperRef, pdfDocument, page]);
  React.useEffect(function () {
    var drawPDF = function drawPDF(page) {
      // Because this page's rotation option overwrites pdf default rotation value,
      // calculating page rotation option value from pdf default and this component prop rotate.
      var rotation = rotate === 0 ? page.rotate : page.rotate + rotate;
      var dpRatio = 1.00071 ;
      var adjustedScale = scaleRef.current * dpRatio;
      var viewport = page.getViewport({
        scale: adjustedScale,
        rotation: rotation
      });
      var canvasEl = canvasRef.current;
      if (!canvasEl) {
        return;
      }
      var canvasContext = canvasEl.getContext('2d');
      if (!canvasContext) {
        return;
      }
      var pageWrapper = pageWrapperRef.current;
      pageWrapper.style.width = "".concat(viewport.width / dpRatio, "px");
      pageWrapper.style.height = "".concat(viewport.height / dpRatio, "px");
      canvasEl.style.width = "".concat(viewport.width / dpRatio, "px");
      canvasEl.style.height = "".concat(viewport.height / dpRatio, "px");
      var resolution = 2; //增加图像清晰度
      canvasEl.height = resolution * viewport.height;
      canvasEl.width = resolution * viewport.width;

      // if previous render isn't done yet, we cancel it
      if (renderTask.current) {
        renderTask.current.cancel();
        return;
      }
      renderTask.current = page.render({
        canvasContext: canvasContext,
        viewport: viewport,
        transform: [resolution, 0, 0, resolution, 0, 0]
      });
      return renderTask.current.promise.then(function () {
        renderTask.current = null;
        if (isFunction(onPageRenderSuccessRef.current)) {
          onPageRenderSuccessRef.current(page);
        }
        // return page.streamTextContent({
        //     includeMarkedContent: false,
        // })
        return page.getTextContent();
      }, function (reason) {
        renderTask.current = null;
        if (reason && reason.name === 'RenderingCancelledException') {
          drawPDF(pdfPageRef.current);
        } else if (isFunction(onPageRenderFailRef.current)) {
          onPageRenderFailRef.current();
        }
      }).then(function (textContent) {
        createTextlayer(pageWrapper, textContent, page, viewport, canvasEl.style.width, canvasEl.style.height);
      });
    };
    if (pdfPage) {
      drawPDF(pdfPage);
    }
  }, [pdfPage, scale, rotate]);
  var createTextlayer = function createTextlayer(wrapper, text, page, viewport, width, height) {
    // console.log('tt', text);
    if (text) {
      var oldDiv = document.getElementById('pdf_viewer_textLayer');
      var textLayerDiv = document.createElement('div');
      textLayerDiv.setAttribute('id', 'pdf_viewer_textLayer');
      textLayerDiv.setAttribute('style', "width:".concat(width, ";height:").concat(height, ";word-break:keep-all"));
      textLayerDiv.setAttribute('class', styles$3.textLayer);
      if (oldDiv) {
        wrapper.replaceChild(textLayerDiv, oldDiv);
      } else {
        wrapper.appendChild(textLayerDiv);
      }
      var textLayer = new pdf_viewer.TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        eventBus: eventBus,
        pageIndex: page.pageIndex,
        viewport: viewport
      });
      //textLayer.setTextContentStream(text);
      textLayer.setTextContent(text);
      textLayer.render();
    }
  };
  return {
    pdfDocument: pdfDocument,
    pdfPage: pdfPage
  };
};

var ALL_FILE_TYPES = ['xlsx', 'docx', 'pptx', 'pdf', 'xls', 'doc', 'ppt', 'file2003', 'file2007', 'other']; //所有可能出现的文件类型 判断结果
var fileTypeMap = {
  'application/pdf': 'pdf',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
};
var fileTypeMapReverse = {
  'pdf': 'application/pdf',
  'xls': 'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'ppt': 'application/vnd.ms-powerpoint',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'default': 'text/plain'
};
//pdf专用的
function _getBlobUrl(_x, _x2) {
  return _getBlobUrl2.apply(this, arguments);
}
function _getBlobUrl2() {
  _getBlobUrl2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, pdfDocument) {
    var unit8ArrayData, blob;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(url.indexOf("blob:") == 0)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return", url);
          case 2:
            _context.next = 4;
            return pdfDocument.getData();
          case 4:
            unit8ArrayData = _context.sent;
            blob = new Blob([unit8ArrayData], {
              type: 'application/pdf'
            });
            return _context.abrupt("return", _getObjectUrl(blob));
          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getBlobUrl2.apply(this, arguments);
}
function _getBlobUrlFromBuffer(arrayBuffer, fileType) {
  var type = fileTypeMapReverse[fileType] || fileTypeMapReverse['default'];
  var blob = new Blob([arrayBuffer], {
    type: type
  });
  return _getObjectUrl(blob);
}
function _getObjectUrl(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  }
  return url;
}
/**
 * 
 * @param {*} blobUrl 
 * @param {*} fileName 
 * @param {*} ext 文件后缀名
 */
function _download(blobUrl, fileName) {
  var ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'txt';
  var a = document.createElement('a');
  var _fileName = fileName || new Date().toLocaleDateString() + ".".concat(ext);
  if (a.click) {
    a.href = blobUrl;
    a.target = '_parent';
    if ('download' in a) {
      a.download = _fileName;
    }
    (document.body || document.documentElement).appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
  } else {
    if (window.top === window && blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
      var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
      blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
    }
    window.open(blobUrl, '_parent');
  }
}
//判断文件类型
function getFileTypeFromUploadType(type) {
  return fileTypeMap[type] || 'other';
}

var THUMBNAIL_WIDTH = 98; // px

var ThumbnailView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var pdfDocument = props.pdfDocument,
    onPageSearch = props.onPageSearch;
    props.page;
  var sidebarRef = React.useRef();
  var viewportRef = React.useRef();
  var selectedPageRef = React.useRef();
  React.useImperativeHandle(ref, function () {
    //将ref绑定在该方法上用于父组件调用
    return {
      handleScrollView: handleScrollView
    };
  }, []);
  React.useEffect(function () {
    if (pdfDocument) {
      //循环遍历每一页pdf
      var numPages = pdfDocument.numPages;
      var pagePromiseArr = [],
        documentPromiseArr = [];
      for (var i = 1; i <= numPages; i++) {
        documentPromiseArr.push(pdfDocument.getPage(i));
      }
      Promise.all(documentPromiseArr).then(function (pdfPages) {
        pdfPages.forEach(function (page) {
          pagePromiseArr.push(getRenderTask(page));
        });
        serialDrawPage(pagePromiseArr);
      })["catch"](function (err) {
        // if (isFunction(onPageLoadFailRef.current)) {
        //     onPageLoadFailRef.current(err);
        // }
      });
    }
    return function () {
      resetThumbnail();
    };
  }, [pdfDocument]);
  var getRenderTask = function getRenderTask(page) {
    var adjustScale = 1;
    if (!viewportRef.current) {
      var viewport = page.getViewport({
        scale: 1,
        rotation: 0
      });
      var _viewport = viewport,
        width = _viewport.width;
        _viewport.height;
      //let pageRatio = width / height;
      var canvasWidth = THUMBNAIL_WIDTH;
      //let canvasHeight = canvasWidth / pageRatio;
      adjustScale = canvasWidth / width;
      viewport = page.getViewport({
        scale: adjustScale,
        rotation: 0
      });
      viewportRef.current = viewport;
    }
    var _viewportRef$current = viewportRef.current,
      pageWidth = _viewportRef$current.width,
      pageHeight = _viewportRef$current.height;
    //console.log('vvv2', viewportRef.current);
    var canvasEl = document.createElement('canvas');
    var canvasContext = canvasEl.getContext('2d');
    canvasEl.style.width = "".concat(pageWidth, "px");
    canvasEl.style.height = "".concat(pageHeight, "px");
    canvasEl.height = pageHeight;
    canvasEl.width = pageWidth;

    // if previous render isn't done yet, we cancel it
    return {
      renderTask: page.render({
        canvasContext: canvasContext,
        viewport: viewportRef.current
      }).promise,
      pageInfo: {
        page: page,
        canvasEl: canvasEl
      }
    };
  };
  // 串行执行Promise，保证页码按顺序返回
  var serialDrawPage = function serialDrawPage(renderTasks) {
    var maxCount = renderTasks.length;
    var count = 0;
    function next(task) {
      if (count >= maxCount) return;
      task.renderTask.then(function (res) {
        var viewer = sidebarRef.current;
        var canvasEl = task.pageInfo.canvasEl;
        if (!viewer) return;
        var img = document.createElement('img');
        if (canvasEl.toBlob) {
          canvasEl.toBlob(function (blob) {
            img.src = _getObjectUrl(blob);
            // img.src = canvasEl.toDataURL();
          });
        } else {
          img.src = canvasEl.toDataURL();
        }
        var pageDiv = document.getElementById("page=".concat(count + 1));
        if (!pageDiv) {
          //新加载的页面
          var className = styles$3['thumbnail'];
          pageDiv = document.createElement('div');
          pageDiv.setAttribute('id', "page=".concat(count + 1));
          if (count == 0) {
            if (!selectedPageRef.current) {
              //第一页默认设置成选中状态
              selectedPageRef.current = pageDiv;
              className = "".concat(styles$3['thumbnail'], " ").concat(styles$3['selected']);
            }
          }
          pageDiv.setAttribute('class', className);
          viewer.appendChild(pageDiv);
          pageDiv.appendChild(img);
        } else {
          //已存在，则替换
          var canvasImgDom = pageDiv.children[0];
          if (canvasImgDom) {
            pageDiv.replaceChild(img, canvasImgDom);
          }
        }
        count++;
        next(renderTasks[count]);
      });
    }
    next(renderTasks[count]);
  };
  var handleChangePage = function handleChangePage(e) {
    var pageDiv = e.target.parentNode;
    if (!pageDiv.id.includes('page=')) return;
    var className = pageDiv.getAttribute('class');
    if (className && className.includes('selected')) return;
    pageDiv.setAttribute('class', 'thumbnail selected');
    if (selectedPageRef.current) {
      selectedPageRef.current.setAttribute('class', 'thumbnail');
    }
    selectedPageRef.current = pageDiv;
    var pageNo = pageDiv.id.split('=')[1];
    if (pageNo * 1 > 0) {
      onPageSearch(pageNo * 1);
    }
    //console.log('ee', e.target.parentNode.id)
  };

  var handleScrollView = function handleScrollView(numPages, page) {
    var _viewportRef$current2;
    //将scroll移动到页码对应位置
    if ((_viewportRef$current2 = viewportRef.current) !== null && _viewportRef$current2 !== void 0 && _viewportRef$current2.height) {
      var _viewportRef$current3;
      if (numPages * ((_viewportRef$current3 = viewportRef.current) === null || _viewportRef$current3 === void 0 ? void 0 : _viewportRef$current3.height) > sidebarRef.current.clientHeight) {
        var _viewportRef$current4;
        sidebarRef.current.scrollTo(0, (page - 1) * ((_viewportRef$current4 = viewportRef.current) === null || _viewportRef$current4 === void 0 ? void 0 : _viewportRef$current4.height));
      }
    }
    //改变当前聚焦页样式
    var pageDiv = sidebarRef.current.children[page - 1];
    if (pageDiv) {
      pageDiv.setAttribute('class', 'thumbnail selected');
      if (selectedPageRef.current) {
        selectedPageRef.current.setAttribute('class', 'thumbnail');
      }
      selectedPageRef.current = pageDiv;
    }
  };
  var resetThumbnail = function resetThumbnail() {
    selectedPageRef.current = null;
    viewportRef.current = null;
    sidebarRef.current.innerHTML = "";
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["sidebarContent"],
    style: {
      height: document.body.offsetHeight - 62 + 'px'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["thumbnailView"],
    ref: sidebarRef,
    onClick: handleChangePage
  }));
});

var printView = (function (pdfDocument, container) {
  return new Promise(function (resolve) {
    if (pdfDocument) {
      //循环遍历每一页pdf
      var numPages = pdfDocument.numPages;
      var pagePromiseArr = [],
        documentPromiseArr = [];
      for (var i = 1; i <= numPages; i++) {
        documentPromiseArr.push(pdfDocument.getPage(i));
      }
      Promise.all(documentPromiseArr).then(function (pdfPages) {
        pdfPages.forEach(function (page) {
          pagePromiseArr.push(getRenderTask(page));
        });
        serialDrawPage(pagePromiseArr);
      })["catch"](function (err) {
        // if (isFunction(onPageLoadFailRef.current)) {
        //     onPageLoadFailRef.current(err);
        // }
      });
    }
    var getRenderTask = function getRenderTask(page) {
      // let adjustScale = 1;
      var viewport = page.getViewport({
        scale: 1,
        rotation: 0
      });
      var width = viewport.width,
        height = viewport.height;
      var canvasEl = document.createElement('canvas');
      var canvasContext = canvasEl.getContext('2d');
      canvasEl.style.width = "".concat(width, "px");
      canvasEl.style.height = "".concat(height, "px");
      var resolution = 2;
      canvasEl.height = resolution * viewport.height;
      canvasEl.width = resolution * viewport.width;

      // if previous render isn't done yet, we cancel it
      return {
        renderTask: page.render({
          canvasContext: canvasContext,
          viewport: viewport,
          intent: 'print',
          transform: [resolution, 0, 0, resolution, 0, 0]
        }).promise,
        pageInfo: {
          page: page,
          canvasEl: canvasEl
        }
      };
    };
    // 串行执行Promise，保证页码按顺序返回
    var serialDrawPage = function serialDrawPage(renderTasks) {
      var maxCount = renderTasks.length;
      var loadCount = 0;
      var count = 0;
      function next(task) {
        if (count >= maxCount) {
          // resolve();
          return;
        }
        task.renderTask.then(function (res) {
          var viewer = container;
          var canvasEl = task.pageInfo.canvasEl;
          if (!viewer) return;
          var img = document.createElement('img');
          if (canvasEl.toBlob) {
            canvasEl.toBlob(function (blob) {
              img.src = _getObjectUrl(blob);
            });
          } else {
            img.src = canvasEl.toDataURL();
          }
          var pageDiv = document.createElement('div');
          pageDiv.setAttribute('class', 'printedPage');
          pageDiv.appendChild(img);
          viewer.appendChild(pageDiv);
          count++;
          img.onload = function () {
            loadCount++;
            if (loadCount == maxCount) {
              resolve();
            }
          };
          // if (count == maxCount) {
          //     img.onload = () => {
          //         resolve();
          //     }
          // }
          next(renderTasks[count]);
        });
      }
      next(renderTasks[count]);
    };
  });
});

var Toolbar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var pdfDocument = props.pdfDocument;
    props.pdfPage;
    var onShowError = props.onShowError,
    onZoomSearch = props.onZoomSearch,
    onPageSearch = props.onPageSearch,
    onRotateChange = props.onRotateChange,
    onDownloadFile = props.onDownloadFile,
    onUploadFile = props.onUploadFile,
    onShowLoading = props.onShowLoading,
    pageOut = props.pageOut,
    scaleOut = props.scaleOut,
    SCALE_STEP = props.SCALE_STEP,
    MAX_SCALE = props.MAX_SCALE,
    MIN_SCALE = props.MIN_SCALE,
    FILE_LIMIT = props.FILE_LIMIT;
  var _useState = React.useState(1),
    _useState2 = _slicedToArray(_useState, 2),
    pageNo = _useState2[0],
    setPageNo = _useState2[1]; //本组件维护，可能是不合法的页码
  var _useState3 = React.useState('page-actual'),
    _useState4 = _slicedToArray(_useState3, 2),
    scale = _useState4[0],
    setScale = _useState4[1]; //本组件维护，可能是string类型
  var _useState5 = React.useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    customValue = _useState6[0],
    setCustomValue = _useState6[1];
  var _useState7 = React.useState(''),
    _useState8 = _slicedToArray(_useState7, 2),
    sidebarOpen = _useState8[0],
    setSidebarOpen = _useState8[1];
  var _useState9 = React.useState(true),
    _useState10 = _slicedToArray(_useState9, 2),
    showDownload = _useState10[0],
    setShowDownload = _useState10[1];
  var sidebarOpenRef = React.useRef(sidebarOpen);
  var inputRef = React.useRef();
  var pageRef = React.useRef(pageNo);
  var pageOutRef = React.useRef(pageOut);
  var inputFileRef = React.useRef();
  var thumbRef = React.useRef();
  var printFrameRef = React.useRef();
  var sidebarContainerRef = React.useRef();
  React.useImperativeHandle(ref, function () {
    //将ref绑定在该方法上用于父组件调用
    return {
      initZoomStatus: initZoomStatus
    };
  }, []);
  React.useEffect(function () {
    addEvent(window, 'keydown', handleKeyEnter);
    var sidebarContainer = sidebarContainerRef.current;
    addEvent(sidebarContainer, 'transitionend', removeClass);
    return function () {
      removeEvent(window, 'keydown', handleKeyEnter);
      removeEvent(sidebarContainer, 'transitionend', removeClass);
    };
  }, [pdfDocument]);
  React.useEffect(function () {
    pageOutRef.current = pageOut; //固定pageOut值
    setPageNo(pageOut);
  }, [pageOut]);
  React.useEffect(function () {
    pageRef.current = pageNo; //保证用当前最新的pageNo值
  }, [pageNo]);
  React.useEffect(function () {
    sidebarOpenRef.current = sidebarOpen;
  }, [sidebarOpen]);
  function addEvent(obj, type, callback) {
    if (obj.addEventListener) {
      // W3C内核
      obj.addEventListener(type, callback, false);
    } else {
      // IE内核
      obj.attachEvent('on' + type, callback);
    }
  }
  function removeEvent(obj, type, callback) {
    if (obj.removeEventListener) {
      // W3C内核
      obj.removeEventListener(type, callback);
    } else {
      // IE内核
      obj.detachEvent('on' + type, callback);
    }
  }
  function handleKeyEnter(e) {
    if (e.keyCode === 13) {
      if (inputRef.current == document.activeElement) {
        onPageBlur();
      }
    }
  }
  function removeClass(e) {
    if (!sidebarOpenRef.current.includes(styles$3["sidebarOpen"])) {
      setSidebarOpen("");
    }
  }
  var onPageChange = function onPageChange(e) {
    setPageNo(e.target.value);
  };
  var _onPageSearch = function _onPageSearch(page) {
    thumbRef.current.handleScrollView(pdfDocument.numPages, page);
    onPageSearch(page);
  };
  var onPagePrev = function onPagePrev(e) {
    if (pageNo === 1) return;
    _onPageSearch(pageNo - 1);
  };
  var onPageNext = function onPageNext(e) {
    if (pageNo == pdfDocument.numPages) {
      return;
    }
    _onPageSearch(pageNo * 1 + 1);
  };
  var onPageBlur = function onPageBlur() {
    var newPageNo = pageRef.current;
    if (!newPageNo || newPageNo * 1 < 1 || newPageNo * 1 > pdfDocument.numPages) {
      setPageNo(pageOutRef.current);
      return;
    }
    _onPageSearch(newPageNo * 1);
  };
  var initZoomStatus = function initZoomStatus() {
    setScale('page-actual');
    onZoomSearch('page-actual');
  };
  var onZoomChange = function onZoomChange(e) {
    setScale(e.target.value);
    onZoomSearch(e.target.value);
  };
  var onZoomIn = function onZoomIn(e) {
    var newValue = Math.round((scaleOut + SCALE_STEP) * 100) + '%';
    setScale('customValue');
    setCustomValue(newValue);
    onZoomSearch(scaleOut + SCALE_STEP);
  };
  var onZoomOut = function onZoomOut(e) {
    var newValue = Math.round((scaleOut - SCALE_STEP) * 100) + '%';
    setScale('customValue');
    setCustomValue(newValue);
    onZoomSearch(scaleOut - SCALE_STEP);
  };
  var onRotateClock = function onRotateClock(e) {
    onRotateChange(true);
  };
  var onRotateAntiClock = function onRotateAntiClock(e) {
    onRotateChange(false);
  };
  var handleInputFileChange = function handleInputFileChange(e) {
    var files = inputFileRef.current.files;
    if (files.length > 0) {
      if (files[0].type !== 'application/pdf') {
        onShowError(true, t('formatInfo'));
        return;
      }
      if (files[0].size > FILE_LIMIT) {
        onShowError(true, t('sizeInfo'));
        return;
      }
      onUploadFile(files[0]);
      setShowDownload(false);
    }
    //console.log('file', inputFileRef.current.files)
  };

  var onShowSidebar = function onShowSidebar() {
    if (sidebarOpen.includes('sidebarOpen')) {
      //关闭侧栏
      setSidebarOpen(styles$3['sidebarMoving']);
    } else {
      //打开侧栏
      setSidebarOpen("".concat(styles$3['sidebarOpen'], " ").concat(styles$3['sidebarMoving']));
    }
  };
  var onPrint = function onPrint() {
    var iframe = printFrameRef.current;
    var doc = iframe.contentWindow.document;
    var printContainer = iframe.contentWindow.document.body;
    printContainer.innerHTML = '';
    var style = doc.head.getElementsByTagName('style')[0];
    if (!style) {
      style = document.createElement('style');
      style.textContent = ".printedPage{width:100%;height:100%;\n                page-break-after:always;\n                page-break-inside:avoid;\n                display: flex;\n                flex-direction: column;\n                justify-content: center;\n                align-items: center;\n            }\n            .printedPage img{\n                max-width: 100%;\n                max-height: 100%;\n                direction: ltr;\n                display: block;\n            }\n            ";
      doc.head.append(style);
    }
    iframe.contentWindow.focus();
    onShowLoading(true);
    printView(pdfDocument, printContainer).then(function (res) {
      onShowLoading(false);
      iframe.contentWindow.print();
    });
  };
  var onDownload = function onDownload() {
    onDownloadFile();
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(styles$3["outerContainer"], " ").concat(sidebarOpen)
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["toolbarContainer"]
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["toolbarViewer"]
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["toolbarViewerLeft"]
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["sidebarToggle"]),
    title: t("sidebarToggle"),
    onClick: onShowSidebar
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["toolbarButtonSpacer"]
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(styles$3["splitToolbarButton"], " ").concat(styles$3["hiddenSmallView"])
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["previous"]),
    title: t("previous"),
    onClick: onPagePrev,
    disabled: pageNo == 1
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["splitToolbarButtonSeparator"]
  }), /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["next"]),
    title: t('next'),
    onClick: onPageNext,
    disabled: !pdfDocument || pageNo >= pdfDocument.numPages
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3['pagination']
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    ref: inputRef,
    type: "number",
    className: "".concat(styles$3["toolbarField"], " ").concat(styles$3["pageNumber"]),
    title: t("pageNumber"),
    value: pageNo,
    min: "1",
    autocomplete: "off",
    onChange: onPageChange,
    onBlur: onPageBlur,
    disabled: !pdfDocument
  }), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "".concat(styles$3["numPages"], " ").concat(styles$3["toolbarLabel"])
  }, "/", (pdfDocument === null || pdfDocument === void 0 ? void 0 : pdfDocument.numPages) || 0))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["toolbarViewerRight"]
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["openFile"]),
    title: t("openFile"),
    onChange: handleInputFileChange
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    type: "file",
    style: {
      opacity: 0,
      width: '100%'
    },
    ref: inputFileRef
  })), /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["print"]),
    title: t("print"),
    onClick: onPrint
  }), showDownload && /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["download"]),
    title: t("download"),
    onClick: onDownload
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["splitToolbarButton"]
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["pageRotateCw"]),
    title: t("pageRotateCw"),
    onClick: onRotateClock
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["splitToolbarButtonSeparator"]
  }), /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["pageRotateCcw"]),
    title: t("pageRotateCcw"),
    onClick: onRotateAntiClock
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["toolbarViewerMiddle"]
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["splitToolbarButton"]
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["zoomOut"]),
    title: t("zoomOut"),
    onClick: onZoomOut,
    disabled: scaleOut === MIN_SCALE
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "splitToolbarButtonSeparator"
  }), /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["toolbarButton"], " ").concat(styles$3["zoomIn"]),
    title: t("zoomIn"),
    onClick: onZoomIn,
    disabled: scaleOut === MAX_SCALE
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "".concat(styles$3["scaleSelectContainer"], " ").concat(styles$3["dropdownToolbarButton"])
  }, /*#__PURE__*/React__default["default"].createElement("select", {
    title: t("scaleSelect"),
    onChange: onZoomChange,
    value: scale
  }, /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "auto"
  }, t('pageAutoOption')), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "page-actual"
  }, t('pageActualOption')), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "page-fit"
  }, t('pageFitOption')), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "page-width"
  }, t('pageWidthOption')), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "customValue",
    disabled: true,
    hidden: "true"
  }, customValue), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "0.5"
  }, "50%"), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "0.75"
  }, "75%"), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "1"
  }, "100%"), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "1.25"
  }, "125%"), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "1.5"
  }, "150%"), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "2"
  }, "200%"), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "3"
  }, "300%"), /*#__PURE__*/React__default["default"].createElement("option", {
    title: "",
    value: "4"
  }, "400%"))))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(styles$3["loadingBar"], " ").concat(styles$3["hidden"])
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["progress"]
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["glimmer"]
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["sidebarContainer"],
    ref: sidebarContainerRef
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["toolbarSidebar"]
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["toolbarSidebarLeft"]
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(styles$3["sidebarViewButtons"], " ").concat(styles$3["splitToolbarButton"], " ").concat(styles$3["toggled"]),
    role: "radiogroup"
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    className: "".concat(styles$3["viewThumbnail"], " ").concat(styles$3["toolbarButton"], " ").concat(styles$3["toggled"]),
    title: t("viewThumbnail")
  })))), /*#__PURE__*/React__default["default"].createElement(ThumbnailView, {
    ref: thumbRef,
    pdfDocument: pdfDocument,
    onPageSearch: onPageSearch,
    page: pageOut
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3["sidebarResizer"]
  })), /*#__PURE__*/React__default["default"].createElement("iframe", {
    className: styles$3["print-iframe"],
    ref: printFrameRef,
    frameborder: "0"
  }));
});

var loadingImg = "data:image/gif;base64,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";

// if (!PDFJS.GlobalWorkerOptions.workerSrc) {
//     // 此处的 pdf work 文件放置到了 根目录/public/js/pdfjs 下  ../../assets/js/pdfjs/pdf.worker.js
//     PDFJS.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.js';
// }

var MAX_SCALE = 4;
var MIN_SCALE = 0.5;
var SCALE_STEP = 0.1;
var FILE_LIMIT = 1024 * 1024 * 50;
var DEFAULT_SIZE = 1;
function Preview(props) {
  var outFile = props.file,
    outFileName = props.fileName,
    width = props.width,
    height = props.height;
  var _useState = React.useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    file = _useState2[0],
    setFile = _useState2[1];
  var _useState3 = React.useState(1),
    _useState4 = _slicedToArray(_useState3, 2),
    page = _useState4[0],
    setPage = _useState4[1];
  var _useState5 = React.useState(1),
    _useState6 = _slicedToArray(_useState5, 2),
    scale = _useState6[0],
    setScale = _useState6[1];
  var _useState7 = React.useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    rotate = _useState8[0],
    setRotate = _useState8[1];
  var _useState9 = React.useState('document.pdf'),
    _useState10 = _slicedToArray(_useState9, 2),
    fileName = _useState10[0],
    setFileName = _useState10[1];
  var _useState11 = React.useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showLoading = _useState12[0],
    setShowLoading = _useState12[1];
  var _useState13 = React.useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    showError = _useState14[0],
    setShowError = _useState14[1];
  var _useState15 = React.useState(''),
    _useState16 = _slicedToArray(_useState15, 2),
    errorInfo = _useState16[0],
    setErrorInfo = _useState16[1];
  var canvasRef = React.useRef(null);
  var containerRef = React.useRef(null);
  var pageWrapperRef = React.useRef(null);
  var toolbarRef = React.useRef(null);
  var _useState17 = React.useState({
      pageWidthScale: 1,
      pageHeightScale: 1,
      pageWidth: 0,
      pageHeight: 0
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    pageScaleMap = _useState18[0],
    setPageScaleMap = _useState18[1];
  React.useEffect(function () {
    var fileUrl = "";
    if (outFile) {
      setShowLoading(true);
      if (outFile instanceof File) {
        fileUrl = _getObjectUrl(outFile);
        setFileName(outFile.name);
      } else if (typeof outFile === 'string') {
        fileUrl = outFile;
      }
      setFile(fileUrl || outFile);
    }
  }, [outFile]);
  React.useEffect(function () {
    if (outFileName) {
      setFileName(outFileName);
    }
  }, [outFileName]);
  var _usePdf = usePdf({
      file: file,
      page: page,
      scale: scale,
      rotate: rotate,
      canvasRef: canvasRef,
      pageWrapperRef: pageWrapperRef,
      //workerSrc: location.origin + '/js/pdf.worker.js',
      cMapPacked: true,
      cMapUrl: location.origin + '/cmap/',
      // onPageLoadSuccess,
      onPageRenderSuccess: onPageRenderSuccess,
      onDocumentLoadFail: onDocumentLoadFail,
      onDocumentLoadSuccess: onDocumentLoadSuccess
    }),
    pdfDocument = _usePdf.pdfDocument,
    pdfPage = _usePdf.pdfPage;
  React.useEffect(function () {
    setShowLoading(true);
    handleLayout();
  }, [pageScaleMap, scale]);
  React.useEffect(function () {
    //旋转之后需要更新页面比例数据
    refreshScaleMap(pdfPage, rotate);
  }, [rotate]);
  function onDocumentLoadSuccess(pdfDocument) {
    setShowLoading(false);
    pdfDocument.getPage(1).then(function (pdfPage) {
      //初始化页面比例数据
      refreshScaleMap(pdfPage);
    });
  }
  function onDocumentLoadFail(info) {
    console.log('document fail', info);
    setShowLoading(false);
    onShowError(true, info.message);
  }
  function onPageRenderSuccess(pdfPage) {
    setShowLoading(false);
    //console.log('success render', pdfPage)
  }

  var onPageSearch = function onPageSearch(value) {
    setPage(value);
  };
  var onZoomSearch = function onZoomSearch(value) {
    var pageWidthScale = pageScaleMap.pageWidthScale,
      pageHeightScale = pageScaleMap.pageHeightScale,
      pageWidth = pageScaleMap.pageWidth,
      pageHeight = pageScaleMap.pageHeight;
    var scale = parseFloat(value);
    if (scale > 0) ; else {
      // if (!pdfPage) {
      //     return;
      // }
      switch (value) {
        case 'page-actual':
          scale = DEFAULT_SIZE;
          break;
        case 'page-fit':
          scale = Math.min(pageWidthScale, pageHeightScale);
          break;
        case 'page-width':
          scale = pageWidthScale;
          break;
        case 'auto':
          var isLandscape = pageWidth > pageHeight;
          var horizontalScale = isLandscape ? Math.min(pageHeightScale, pageWidthScale) : pageWidthScale;
          scale = Math.min(MAX_SCALE, horizontalScale);
          break;
        default:
          console.error('PDFViewer._setScale: "' + value + '" is an unknown zoom value.');
          return;
      }
    }
    setScale(scale);
  };
  var onRotateChange = function onRotateChange(isClock) {
    if (isClock) {
      setRotate(rotate + 90);
    } else {
      setRotate(rotate - 90);
    }
  };
  //更新初始比例数据
  var refreshScaleMap = function refreshScaleMap(pdfPage) {
    var rotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!pdfPage) return;
    if (!containerRef.current) return;
    var pageView = pdfPage._pageInfo.view;
    var pageWidth = pageView[2];
    var pageHeight = pageView[3];
    var rotation = rotate % 360;
    if (rotation == 90 || rotation == 270) {
      pageWidth = pageView[3];
      pageHeight = pageView[2];
    }
    var container = containerRef.current;
    var pageWidthScale = Math.round(container.clientWidth / pageWidth * 10) / 10;
    var pageHeightScale = Math.round(container.clientHeight / pageHeight * 10) / 10;
    setPageScaleMap({
      pageWidthScale: pageWidthScale,
      pageHeightScale: pageHeightScale,
      pageWidth: pageWidth,
      pageHeight: pageHeight
    });
  };
  //根据页面比例大小调整居中或居左
  var handleLayout = function handleLayout() {
    var pageWidthScale = pageScaleMap.pageWidthScale;
    if (!containerRef.current) return;
    var isCenter = window.getComputedStyle(containerRef.current, null)['align-items'];
    //console.log('ss', scale, pageWidthScale, isCenter)
    if (scale >= pageWidthScale) {
      if (isCenter === 'center') {
        containerRef.current.style['align-items'] = 'flex-start';
      }
    } else {
      if (isCenter !== 'center') {
        containerRef.current.style['align-items'] = 'center';
      }
    }
    setShowLoading(false);
  };
  var onUploadFile = function onUploadFile(file) {
    setShowLoading(true);
    setPage(1);
    setRotate(0);
    if (toolbarRef.current) {
      toolbarRef.current.initZoomStatus();
    }
    setFile(_getObjectUrl(file));
  };
  var onDownloadFile = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var fileUrl;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setShowLoading(true);
              _context.next = 3;
              return _getBlobUrl(file, pdfDocument);
            case 3:
              fileUrl = _context.sent;
              _download(fileUrl, fileName, 'pdf');
              setShowLoading(false);
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function onDownloadFile() {
      return _ref.apply(this, arguments);
    };
  }();
  var onShowError = function onShowError(status, info) {
    setShowError(status);
    setErrorInfo(info);
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3.container,
    style: {
      width: width || '100%'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3.loadingPage,
    style: {
      display: showLoading ? 'block' : 'none'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3.loading
  }, /*#__PURE__*/React__default["default"].createElement("img", {
    src: loadingImg
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3.wrapper
  }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Toolbar, {
    ref: toolbarRef,
    pdfDocument: pdfDocument,
    pdfPage: pdfPage,
    onPageSearch: onPageSearch,
    onZoomSearch: onZoomSearch,
    onRotateChange: onRotateChange,
    pageOut: page,
    scaleOut: scale,
    MAX_SCALE: MAX_SCALE,
    MIN_SCALE: MIN_SCALE,
    SCALE_STEP: SCALE_STEP,
    FILE_LIMIT: FILE_LIMIT,
    onShowError: onShowError,
    onUploadFile: onUploadFile,
    onDownloadFile: onDownloadFile,
    onShowLoading: setShowLoading
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3.errorLine,
    style: {
      display: showError ? 'flex' : 'none'
    }
  }, /*#__PURE__*/React__default["default"].createElement("em", null, t('invalidFile'), " ", errorInfo), /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: function onClick() {
      return onShowError(false, '');
    }
  }, t("close"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3.viewerContainer,
    style: {
      height: height || document.body.offsetHeight - 30 + 'px'
    },
    ref: containerRef
  }, pdfDocument && /*#__PURE__*/React__default["default"].createElement("article", {
    className: styles$3.page,
    ref: pageWrapperRef
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$3.canvasWrapper
  }, /*#__PURE__*/React__default["default"].createElement("canvas", {
    ref: canvasRef
  })))))));
}

var css_248z$2 = ".style_wbSheets_wrapper__JKilx {\n  position: relative;\n  padding: 1em;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n.style_wbSheets_clas_ul__5B-Wu {\n  text-align: center;\n  list-style: none;\n  border-top: 1px solid #ccc;\n  line-height: 35px;\n  height: 38px;\n  overflow: hidden;\n  font-size: 12px;\n  padding: 0em 0.2em 0.2em;\n}\n.style_wbSheets_clas_ul__5B-Wu li {\n  border: 1px solid #aaa;\n  background: #d1d1d1;\n  background: linear-gradient(top, #ececec 50%, #d1d1d1 100%);\n  display: inline-block;\n  position: relative;\n  z-index: 0;\n  border-bottom-left-radius: 6px;\n  border-bottom-right-radius: 6px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 #fff;\n  text-shadow: 0 1px #fff;\n  margin: 0 -5px;\n  padding: 0 30px;\n}\n.style_wbSheets_clas_ul__5B-Wu li.style_selected__T2M0M {\n  background: #fff;\n  color: #333;\n  z-index: 2;\n  border-top-color: #fff;\n}\n.style_wbSheets_clas_ul__5B-Wu li a {\n  color: #555;\n  text-decoration: none;\n}\n.style_wbSheets_clas_ul__5B-Wu:before {\n  position: absolute;\n  content: \"\";\n  width: 100%;\n  top: 0;\n  left: 0;\n  border-top: 1px solid #aaa;\n  z-index: 1;\n}\n.style_wbSheets_clas_ul__5B-Wu li:before,\n.style_wbSheets_clas_ul__5B-Wu li:after {\n  border: 1px solid #aaa;\n  position: absolute;\n  top: -1px;\n  width: 6px;\n  height: 6px;\n  content: \"\";\n}\n.style_wbSheets_clas_ul__5B-Wu li:before {\n  left: -7px;\n  border-top-right-radius: 6px;\n  border-width: 1px 1px 0px 0px;\n  box-shadow: 2px 0px 0 #ececec;\n}\n.style_wbSheets_clas_ul__5B-Wu li:after {\n  right: -7px;\n  border-top-left-radius: 6px;\n  border-width: 1px 0px 0px 1px;\n  box-shadow: -2px 0px 0 #ececec;\n}\n.style_wbSheets_clas_ul__5B-Wu li.style_selected__T2M0M:before {\n  box-shadow: 2px 0px 0 #fff;\n}\n.style_wbSheets_clas_ul__5B-Wu li.style_selected__T2M0M:after {\n  box-shadow: -2px 0px 0 #fff;\n}\n.style_loadingPage__JCJEO {\n  position: absolute;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n}\n.style_loadingPage__JCJEO .style_loading__juEbG {\n  position: absolute;\n  z-index: 100;\n  left: 50%;\n  -webkit-transform: translate(-50%, 300px) scale(1.5);\n          transform: translate(-50%, 300px) scale(1.5);\n}\n.style_errorLine__TZgZp {\n  width: 100%;\n  height: 32px;\n  position: absolute;\n  z-index: 2000;\n  top: 0;\n  left: 0;\n  background-color: #e21e1e;\n  color: #fff;\n  padding: 4px 10px;\n  display: flex;\n  justify-content: space-between;\n}\n.style_errorLine__TZgZp > button {\n  color: #666;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n.style_title__ZuK1F {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2px 10px;\n  margin-top: 1em;\n  margin-bottom: 0;\n  width: 100%;\n  /* border: 1px solid; */\n  background: #1e8e3edb;\n  color: #fff;\n}\n.style_download__bceuJ {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n}\n";
var styles$2 = {"wbSheets_wrapper":"style_wbSheets_wrapper__JKilx","wbSheets_clas_ul":"style_wbSheets_clas_ul__5B-Wu","selected":"style_selected__T2M0M","loadingPage":"style_loadingPage__JCJEO","loading":"style_loading__juEbG","errorLine":"style_errorLine__TZgZp","title":"style_title__ZuK1F","download":"style_download__bceuJ"};
styleInject(css_248z$2);

var css_248z$1 = ".style_title__FRdLc {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2px 10px;\n  margin-top: 0;\n  margin-bottom: 0;\n  width: 100%;\n  /* border: 1px solid; */\n  color: #fff;\n}\n.style_download__Tv-Fp {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n}\n.style_loadingPage__SG90X {\n  position: absolute;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n}\n.style_loadingPage__SG90X .style_loading__SZRuZ {\n  position: absolute;\n  z-index: 100;\n  left: 50%;\n  top: 20px;\n  -webkit-transform: translate(-50%, 100px) scale(1.5);\n          transform: translate(-50%, 100px) scale(1.5);\n}\n.style_errorLine__prTMF {\n  width: 100%;\n  height: 32px;\n  position: absolute;\n  z-index: 2000;\n  top: 0;\n  left: 0;\n  background-color: #e21e1e;\n  color: #fff;\n  padding: 4px 10px;\n  display: flex;\n  justify-content: space-between;\n}\n.style_errorLine__prTMF > button {\n  color: #666;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n";
var styles$1 = {"title":"style_title__FRdLc","download":"style_download__Tv-Fp","loadingPage":"style_loadingPage__SG90X","loading":"style_loading__SZRuZ","errorLine":"style_errorLine__prTMF"};
styleInject(css_248z$1);

function Loading(props) {
  var _props$showLoading = props.showLoading,
    showLoading = _props$showLoading === void 0 ? false : _props$showLoading;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$1.loadingPage,
    style: {
      display: showLoading ? 'block' : 'none'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$1.loading
  }, /*#__PURE__*/React__default["default"].createElement("img", {
    src: loadingImg
  })));
}

var downloadImg = "data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22%23fff%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M9.79407%207.31811H7.86307C7.41807%207.31811%207.19407%207.85711%207.50907%208.17211L10.1911%2010.8541C10.3861%2011.0491%2010.7031%2011.0491%2010.8981%2010.8541L13.5801%208.17211C13.8951%207.85711%2013.6721%207.31811%2013.2261%207.31811H11.2941V4.38211H11.2961V3.13211H11.2941V2.30811H9.79407V3.13211H9.79107V4.38211H9.79507V7.31811H9.79407Z%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M14%203.13208H12.796V4.38208H14C14.345%204.38208%2014.625%204.66208%2014.625%205.00708V13.0071C14.625%2013.3521%2014.345%2013.6321%2014%2013.6321H2C1.655%2013.6321%201.375%2013.3521%201.375%2013.0071V3.00708C1.375%202.66208%201.655%202.38208%202%202.38208H5.643C5.82%202.38208%205.989%202.45808%206.108%202.58908L7.536%204.17508C7.654%204.30708%207.823%204.38208%208%204.38208H8.291V3.13208H8.278L7.036%201.75208C6.681%201.35808%206.173%201.13208%205.642%201.13208H2C0.966%201.13208%200.125%201.97308%200.125%203.00708V13.0071C0.125%2014.0411%200.966%2014.8821%202%2014.8821H14C15.034%2014.8821%2015.875%2014.0411%2015.875%2013.0071V5.00708C15.875%203.97308%2015.034%203.13208%2014%203.13208Z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E";

function TitleWithDownload(props) {
  var fileName = props.fileName,
    handleDownload = props.handleDownload,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$backgroundColo = props.backgroundColor,
    backgroundColor = _props$backgroundColo === void 0 ? '#1e8e3edb' : _props$backgroundColo;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$1.title,
    style: {
      backgroundColor: backgroundColor
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", null, fileName), /*#__PURE__*/React__default["default"].createElement("button", {
    className: styles$1["download"],
    title: t("download"),
    onClick: handleDownload,
    disabled: disabled
  }, /*#__PURE__*/React__default["default"].createElement("img", {
    src: downloadImg
  })));
}

function ErrorLine(props) {
  var _props$showError = props.showError,
    showError = _props$showError === void 0 ? false : _props$showError,
    errorInfo = props.errorInfo,
    onShowError = props.onShowError;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles$1.errorLine,
    style: {
      display: showError ? 'flex' : 'none'
    }
  }, /*#__PURE__*/React__default["default"].createElement("em", null, t('invalidFile'), " ", errorInfo), /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: function onClick() {
      return onShowError(false);
    }
  }, t("close")));
}

function XlsxViewer(props) {
  var outFile = props.file,
    outFileName = props.fileName,
    width = props.width,
    height = props.height,
    _fileType = props._fileType,
    timeout = props.timeout;
  var _useState = React.useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = React.useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    file = _useState4[0],
    setFile = _useState4[1];
  var _useState5 = React.useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    fileArrayBuffer = _useState6[0],
    setFileArrayBuffer = _useState6[1]; //ArrayBuffer类型的文件
  var _useState7 = React.useState(''),
    _useState8 = _slicedToArray(_useState7, 2),
    fileName = _useState8[0],
    setFileName = _useState8[1];
  var _useState9 = React.useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    showLoading = _useState10[0],
    setShowLoading = _useState10[1];
  var _useState11 = React.useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showError = _useState12[0],
    setShowError = _useState12[1];
  var _useState13 = React.useState(t('formatInfoXlsx')),
    _useState14 = _slicedToArray(_useState13, 2),
    errorInfo = _useState14[0],
    setErrorInfo = _useState14[1];
  var _useState15 = React.useState(''),
    _useState16 = _slicedToArray(_useState15, 2),
    activeTabKey = _useState16[0],
    setActiveTabKey = _useState16[1];
  var _useState17 = React.useState([]),
    _useState18 = _slicedToArray(_useState17, 2),
    sheetNames = _useState18[0],
    setSheetNames = _useState18[1];
  React.useEffect(function () {
    setFile(outFile);
  }, [outFile]);
  React.useEffect(function () {
    if (outFileName) {
      setFileName(outFileName);
    }
  }, [outFileName]);
  React.useEffect(function () {
    if (file) {
      onShowError(false);
      setShowLoading(true);
      if (typeof file === 'string') {
        //console.log('file', file);
        try {
          var req = new XMLHttpRequest();
          req.open("GET", file);
          req.responseType = "arraybuffer"; //arraybuffer blob
          var xhrTimeOut = setTimeout(function () {
            req.abort();
            onShowError(true);
          }, timeout);
          req.onload = function (e) {
            clearTimeout(xhrTimeOut);
            try {
              setFileArrayBuffer(req.response);
              var data = new Uint8Array(req.response);
              var workbook = XLSX__namespace.read(data, {
                type: "array"
              });
              //console.log('workbook', workbook)
              loadData(workbook);
            } catch (e) {
              onShowError(true);
            }
          };
          req.send();
        } catch (e) {
          onShowError(true);
        }
      } else if (file instanceof File) {
        var fName = file.name;
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function (e) {
          setFileName(fName);
          var data = e.target.result;
          setFileArrayBuffer(data);
          var workbook = XLSX__namespace.read(data, {
            type: "array"
          });
          //console.log('workbook', workbook)
          loadData(workbook);
        };

        // } else {
        //     onShowError(true)
        // }
      } else {
        onShowError(true);
      }
    }
  }, [file]);
  var onShowError = function onShowError(status, info) {
    setShowLoading(false);
    setShowError(status);
    if (info) {
      setErrorInfo(info);
    }
  };
  var loadData = function loadData(workbook) {
    var sheetNames = workbook.SheetNames;
    if (sheetNames && sheetNames.length > 0) {
      setSheetNames(sheetNames);
      setActiveTabKey('wbSheets_0');
    }
    sheetNames.forEach(function (sheetName, idx) {
      var subDivId = 'wbSheets_' + idx;
      var json = XLSX__namespace.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: "A",
        blankrows: false
      });
      setData(function (data) {
        return _objectSpread2(_objectSpread2({}, data), {}, _defineProperty({}, subDivId, json));
      });
    });
    setShowLoading(false);
  };
  var onChangeTab = function onChangeTab(e, subDivId) {
    e.preventDefault();
    setActiveTabKey(subDivId);
  };
  var handleDownload = function handleDownload(e) {
    var fileUrl = _getBlobUrlFromBuffer(fileArrayBuffer, _fileType);
    _download(fileUrl, fileName, _fileType);
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    id: "wbSheets_wrapper_id",
    className: styles$2["wbSheets_wrapper"],
    style: {
      width: width || '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React__default["default"].createElement(Loading, {
    showLoading: showLoading
  }), /*#__PURE__*/React__default["default"].createElement(ErrorLine, {
    errorInfo: errorInfo,
    showError: showError,
    onShowError: onShowError
  }), /*#__PURE__*/React__default["default"].createElement(TitleWithDownload, {
    handleDownload: handleDownload,
    disabled: !fileArrayBuffer,
    fileName: fileName
  }), /*#__PURE__*/React__default["default"].createElement(react.HotTable, {
    licenseKey: "non-commercial-and-evaluation",
    data: data[activeTabKey],
    colHeaders: true,
    rowHeaders: true,
    title: fileName,
    settings: {
      columns: false,
      fixedColumnsLeft: 0,
      fixedRowsTop: 0,
      stretchH: "none",
      colWidths: 200,
      startRows: 1,
      startCols: 1,
      wordWrap: true,
      autoRowSize: true,
      autoColumnSize: true
    },
    width: "100%",
    height: height || document.body.offsetHeight - 45 + 'px'
  }), /*#__PURE__*/React__default["default"].createElement("ul", {
    className: styles$2["wbSheets_clas_ul"]
  }, sheetNames.map(function (item, index) {
    return /*#__PURE__*/React__default["default"].createElement("li", {
      className: activeTabKey == 'wbSheets_' + index ? styles$2['selected'] : ''
    }, /*#__PURE__*/React__default["default"].createElement("a", {
      href: 'wbSheets_' + index,
      onClick: function onClick(e) {
        return onChangeTab(e, 'wbSheets_' + index);
      }
    }, item));
  })));
}
XlsxViewer.defaultProps = {
  timeout: 10000
};
XlsxViewer.propTypes = {
  file: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].shape({
    name: PropTypes__default["default"].string,
    type: PropTypes__default["default"].string
  })]),
  timeout: PropTypes__default["default"].number,
  width: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  height: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number])
};

var css_248z = ".style_pg-viewer-wrapper__SLdiy {\n  position: relative;\n  padding: 1em;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS {\n  padding: 30px;\n  background: white;\n  margin: auto;\n  /* Begin bidirectionality settings (do not change) */\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS html,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS bodyaddress,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS blockquote,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS body,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS dd,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS div,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS dl,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS dt,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS fieldset,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS form,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS frame,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS frameset,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h1,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h2,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h3,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h4,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h5,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h6,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS noframes,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ol,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS p,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ul,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS center,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS dir,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS hr,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS menu,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS pre {\n  display: block;\n  unicode-bidi: embed;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS li {\n  display: list-item;\n  list-style-type: disc;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS head {\n  display: none;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS table {\n  display: table;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS img {\n  width: 100%;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS tr {\n  display: table-row;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS thead {\n  display: table-header-group;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS tbody {\n  display: table-row-group;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS tfoot {\n  display: table-footer-group;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS col {\n  display: table-column;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS colgroup {\n  display: table-column-group;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS th {\n  display: table-cell;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS td {\n  display: table-cell;\n  border-bottom: 1px solid #ccc;\n  border-right: 1px solid #ccc;\n  padding: 0.2em 0.5em;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS caption {\n  display: table-caption;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS th {\n  font-weight: bolder;\n  text-align: center;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS caption {\n  text-align: center;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS body {\n  margin: 8px;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h2 {\n  font-size: 1.5em;\n  margin: 0.75em 0;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h3 {\n  font-size: 1.17em;\n  margin: 0.83em 0;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h4,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS p,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS blockquote,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ul,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS fieldset,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS form,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ol,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS dl,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS dir,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS menu {\n  margin: 1.12em 0;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h5 {\n  font-size: 0.83em;\n  margin: 1.5em 0;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h6 {\n  font-size: 0.75em;\n  margin: 1.67em 0;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h1,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h2,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h3,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h4,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h5,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h6,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS b,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS strong {\n  font-weight: bolder;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS blockquote {\n  margin-left: 40px;\n  margin-right: 40px;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS i,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS cite,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS em,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS var,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS address {\n  font-style: italic;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS pre,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS tt,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS code,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS kbd,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS samp {\n  font-family: monospace;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS pre {\n  white-space: pre;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS button,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS textarea,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS input,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS select {\n  display: inline-block;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS big {\n  font-size: 1.17em;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS small,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS sub,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS sup {\n  font-size: 0.83em;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS sub {\n  vertical-align: sub;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS sup {\n  vertical-align: super;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS table {\n  border-spacing: 2px;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS thead,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS tbody,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS tfoot {\n  vertical-align: middle;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS td,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS th,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS tr {\n  vertical-align: inherit;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS s,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS strike,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS del {\n  text-decoration: line-through;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS hr {\n  border: 1px inset;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ol,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ul,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS dir,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS menu,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS dd {\n  margin-left: 40px;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ol {\n  list-style-type: decimal;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ol ul,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ol ul,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ul ol,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ul ol,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ul ul,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ul ul,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ol ol,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ol ol {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS u,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ins {\n  text-decoration: underline;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS br:before {\n  content: \"\\A\";\n  white-space: pre-line;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS center {\n  text-align: center;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS :link,\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS :visited {\n  text-decoration: underline;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS :focus {\n  outline: thin dotted invert;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS BDO[DIR=\"ltr\"] {\n  direction: ltr;\n  unicode-bidi: bidi-override;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS BDO[DIR=\"rtl\"] {\n  direction: rtl;\n  unicode-bidi: bidi-override;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS *[DIR=\"ltr\"] {\n  direction: ltr;\n  unicode-bidi: embed;\n}\n.style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS *[DIR=\"rtl\"] {\n  direction: rtl;\n  unicode-bidi: embed;\n}\n@media print {\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h1 {\n    page-break-before: always;\n  }\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h1,\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h2,\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h3,\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h4,\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h5,\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS h6 {\n    page-break-after: avoid;\n  }\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ul,\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS ol,\n  .style_pg-viewer-wrapper__SLdiy .style_document-container__j8LLS dl {\n    page-break-before: avoid;\n  }\n}\n";
var styles = {"pg-viewer-wrapper":"style_pg-viewer-wrapper__SLdiy","document-container":"style_document-container__j8LLS"};
styleInject(css_248z);

function DocxViewer$1(props) {
  var file = props.file,
    outFileName = props.fileName,
    width = props.width,
    height = props.height;
  var _useState = React.useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    docHtmlStr = _useState2[0],
    setDocHtmlStr = _useState2[1];
  var _useState3 = React.useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    fileName = _useState4[0],
    setFileName = _useState4[1];
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showError = _useState6[0],
    setShowError = _useState6[1];
  var _useState7 = React.useState(t('formatInfoDocx')),
    _useState8 = _slicedToArray(_useState7, 2),
    errorInfo = _useState8[0];
    _useState8[1];
  var _useState9 = React.useState(),
    _useState10 = _slicedToArray(_useState9, 2),
    fileArrayBuffer = _useState10[0],
    setFileArrayBuffer = _useState10[1]; //ArrayBuffer类型的文件
  var _useState11 = React.useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showLoading = _useState12[0],
    setShowLoading = _useState12[1];
  React.useEffect(function () {
    if (outFileName) {
      setFileName(outFileName);
    }
  }, [outFileName]);
  React.useEffect(function () {
    if (file) {
      setShowLoading(true);
      if (typeof file === 'string') {
        try {
          var req = new XMLHttpRequest();
          req.open("GET", file);
          req.responseType = "arraybuffer"; //arraybuffer blob
          req.onload = function (e) {
            setFileArrayBuffer(req.response);
            loadContent(req.response);
          };
          req.send();
        } catch (e) {
          console.log('error', e);
          setShowError(true);
          setShowLoading(false);
        }
      } else if (file instanceof File) {
        var fName = file.name;
        var fileType = getFileTypeFromUploadType(file.type);
        if (fileType !== 'docx') {
          onShowError(true);
          setShowLoading(false);
          return;
        }
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function (e) {
          setFileName(fName);
          var data = e.target.result;
          setFileArrayBuffer(data);
          loadContent(data);
        };
      } else {
        onShowError(true);
        setShowLoading(false);
      }
    }
  }, [file]);
  var loadContent = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(arrayBuffer) {
      var data, _yield$mammoth$conver, value, div, domList;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setShowLoading(true);
              _context.prev = 1;
              data = new Uint8Array(arrayBuffer);
              _context.next = 5;
              return mammoth__default["default"].convertToHtml({
                arrayBuffer: data
              }, {
                includeDefaultStyleMap: true
              });
            case 5:
              _yield$mammoth$conver = _context.sent;
              value = _yield$mammoth$conver.value;
              div = document.createElement('div');
              div.innerHTML = value;
              //处理所有的a标签，使其在新标签页打开
              domList = div.getElementsByTagName('a');
              Array.from(domList).forEach(function (item) {
                item.setAttribute('target', '_blank');
              });
              setDocHtmlStr(div.innerHTML);
              _context.next = 18;
              break;
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              console.log('error', _context.t0);
              setShowError(true);
            case 18:
              _context.prev = 18;
              setShowLoading(false);
              return _context.finish(18);
            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 14, 18, 21]]);
    }));
    return function loadContent(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleDownload = function handleDownload() {
    var fileUrl = _getBlobUrlFromBuffer(fileArrayBuffer, 'docx');
    _download(fileUrl, fileName, 'docx');
  };
  var onShowError = function onShowError(status) {
    setShowError(status);
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles['pg-viewer-wrapper'],
    style: {
      width: width || '100%',
      height: height || document.body.offsetHeight - 45 + 'px'
    }
  }, /*#__PURE__*/React__default["default"].createElement(Loading, {
    showLoading: showLoading
  }), /*#__PURE__*/React__default["default"].createElement(ErrorLine, {
    errorInfo: errorInfo,
    showError: showError,
    onShowError: onShowError
  }), /*#__PURE__*/React__default["default"].createElement(TitleWithDownload, {
    backgroundColor: "rgba(35,100,155,0.9)",
    handleDownload: handleDownload,
    fileName: fileName,
    disabled: !fileArrayBuffer
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: styles['document-container'],
    style: {
      width: '100%',
      height: '85%',
      overflow: 'auto'
    },
    dangerouslySetInnerHTML: {
      __html: docHtmlStr
    }
  }));
}

var enUsTrans = {
  'previous': 'Previous Page',
  'next': 'Next Page',
  'pageNumber': 'Page',
  'openFile': 'Open File',
  'print': 'Print',
  'download': 'Download',
  'pageRotateCw': 'Rotate Clockwise',
  'pageRotateCcw': 'Rotate Counterclockwise',
  'zoomOut': 'Zoom Out',
  'zoomIn': 'Zoom In',
  'scaleSelect': 'Zoom',
  'pageAutoOption': 'Automatic Zoom',
  'pageActualOption': 'Actual Size',
  'pageFitOption': 'Page Fit',
  'pageWidthOption': 'Page Width',
  'sidebarToggle': 'Toggle Sidebar',
  'viewThumbnail': 'Show Thumbnails',
  'close': 'Close',
  'invalidFile': 'Invalid or corrupt file. Details：',
  'formatInfo': 'Please upload a file in pdf format!',
  'formatInfoXlsx': 'Please upload a xls/xlsx file of url or File format!',
  'formatInfoDocx': 'Please upload a file in docx format!',
  'formatInfoPPTx': 'PPT/PPTX format is not supported at the moment. Please pay attention to the following updates',
  'sizeInfo': 'Please upload a file with size less than 50M',
  'supportFileTypes': 'Only xlsx, xls, pdf files are supported currently!'
};

var zhCnTrans = {
  'previous': '上一页',
  'next': '下一页',
  'pageNumber': '页码',
  'openFile': '打开文件',
  'print': '打印',
  'download': '下载',
  'pageRotateCw': '顺时针旋转',
  'pageRotateCcw': '逆时针旋转',
  'zoomOut': '缩小',
  'zoomIn': '放大',
  'scaleSelect': '缩放',
  'pageAutoOption': '自动缩放',
  'pageActualOption': '实际大小',
  'pageFitOption': '适合高度',
  'pageWidthOption': '适合页宽',
  'sidebarToggle': '切换侧栏',
  'viewThumbnail': '显示缩略图',
  'close': '关闭',
  'invalidFile': '无效或损坏的文件。详细信息：',
  'formatInfo': '请上传pdf格式的文件！',
  'formatInfoXlsx': '仅支持url与File类型的xls/xlsx文件！',
  'formatInfoDocx': '暂不支持doc格式的文件，请上传docx格式的文件！',
  'formatInfoPPTx': '暂不支持ppt/pptx文件预览，请关注后续更新！',
  'sizeInfo': '请上传50M以内大小的文件！',
  'supportFileTypes': '目前仅支持xlsx,xls,docx,pdf格式的文件！'
};

i18n__default["default"].use(reactI18next.initReactI18next).init({
  resources: {
    en: {
      translation: enUsTrans
    },
    zh: {
      translation: zhCnTrans
    }
  },
  lng: 'zh',
  //默认语言
  // fallbackLng: "zh",
  debug: false,
  interpolation: {
    escapeValue: false
  }
});

function WithI18nComp(Comp) {
  return function I18n(props) {
    var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;
    var locale = props.locale;
    React.useEffect(function () {
      if (locale) {
        i18n.changeLanguage(locale);
        window.t = t;
      }
    }, [locale]);
    window.t = t;
    return /*#__PURE__*/React__default["default"].createElement(Comp, props);
  };
}
function _AutoFormatViewer(props) {
  var outFile = props.file;
    props.fileName;
    var timeout = props.timeout;
  var _useState = React.useState(),
    _useState2 = _slicedToArray(_useState, 2),
    file = _useState2[0],
    setFile = _useState2[1];
  var _useState3 = React.useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    fileType = _useState4[0],
    setFileType = _useState4[1];
  React.useEffect(function () {
    setFile(outFile);
  }, [outFile]);
  React.useEffect(function () {
    if (file) {
      if (typeof file === 'string') {
        try {
          var req = new XMLHttpRequest();
          req.open("GET", file);
          req.responseType = "arraybuffer"; //arraybuffer blob
          var xhrTimeOut = setTimeout(function () {
            req.abort();
          }, timeout);
          req.onload = function (e) {
            clearTimeout(xhrTimeOut);
            var fileType = getFileTypeFromArrayBuffer__default["default"](req.response);
            setFileType(fileType);
            //console.log('fileType', fileType)
          };

          req.send();
        } catch (e) {
          console.log('error', e);
        }
      } else if (file instanceof File) {
        var _fileType = getFileTypeFromUploadType(file.type);
        //console.log('fileType', fileType)
        setFileType(_fileType);
      }
    }
  }, [file]);
  var onFlieChange = function onFlieChange(e) {
    var inputFileObj = e.target.files[0];
    setFile(inputFileObj);
  };
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("input", {
    type: "file",
    onChange: onFlieChange
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      position: 'relative'
    }
  }, ALL_FILE_TYPES.includes(fileType) ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, fileType == 'pdf' && /*#__PURE__*/React__default["default"].createElement(PdfViewer, _extends({}, props, {
    file: file
  })), (fileType == 'xlsx' || fileType == 'xls') && /*#__PURE__*/React__default["default"].createElement(SheetViewer, _extends({}, props, {
    file: file,
    _fileType: fileType
  })), fileType == 'docx' && /*#__PURE__*/React__default["default"].createElement(DocxViewer, _extends({}, props, {
    file: file
  })), fileType == 'doc' && /*#__PURE__*/React__default["default"].createElement("p", {
    className: styles$2.errorLine
  }, t('formatInfoDocx')), (fileType == 'ppt' || fileType == 'pptx') && /*#__PURE__*/React__default["default"].createElement("p", {
    className: styles$2.errorLine
  }, t('formatInfoPPTx')), fileType == 'other' && /*#__PURE__*/React__default["default"].createElement("p", {
    className: styles$2.errorLine
  }, t('supportFileTypes'))) : null));
}
_AutoFormatViewer.defaultProps = {
  timeout: 10000
};
_AutoFormatViewer.propTypes = {
  file: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].shape({
    name: PropTypes__default["default"].string,
    type: PropTypes__default["default"].string
  })]).isRequired,
  timeout: PropTypes__default["default"].number,
  fileName: PropTypes__default["default"].string,
  width: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  height: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  locale: PropTypes__default["default"].oneOf(['zh', 'en'])
};
var PdfViewer = WithI18nComp(Preview);
var SheetViewer = WithI18nComp(XlsxViewer);
var DocxViewer = WithI18nComp(DocxViewer$1);
var index = WithI18nComp(_AutoFormatViewer);

exports.DocxViewer = DocxViewer;
exports.PdfViewer = PdfViewer;
exports.SheetViewer = SheetViewer;
exports["default"] = index;
