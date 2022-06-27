/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ 1223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);
var create = __webpack_require__(30);
var definePropertyModule = __webpack_require__(3070);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ 4019:
/***/ (function(module) {

// eslint-disable-next-line es-x/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),

/***/ 260:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(4019);
var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var hasOwn = __webpack_require__(2597);
var classof = __webpack_require__(648);
var tryToString = __webpack_require__(6330);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineProperty = (__webpack_require__(3070).f);
var isPrototypeOf = __webpack_require__(7976);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var wellKnownSymbol = __webpack_require__(5112);
var uid = __webpack_require__(9711);

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = uid('TYPED_ARRAY_CONSTRUCTOR');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 7741:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8544:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var createNonEnumerableProperty = __webpack_require__(8880);
var makeBuiltIn = __webpack_require__(6339);
var setGlobal = __webpack_require__(3505);

module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return O;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
  return O;
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var setGlobal = __webpack_require__(3505);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 2104:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 490:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 8340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 614:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    defineProperty(value, 'name', { value: name, configurable: true });
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  if (options && hasOwn(options, 'constructor') && options.constructor) {
    if (DESCRIPTORS) try {
      defineProperty(value, 'prototype', { writable: false });
    } catch (error) { /* empty */ }
  } else value.prototype = undefined;
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 6277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(1340);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 30:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(9670);
var definePropertiesModule = __webpack_require__(6048);
var enumBugKeys = __webpack_require__(748);
var hiddenKeys = __webpack_require__(3501);
var html = __webpack_require__(490);
var documentCreateElement = __webpack_require__(317);
var sharedKey = __webpack_require__(6200);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 6048:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var toIndexedObject = __webpack_require__(5656);
var objectKeys = __webpack_require__(1956);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var global = __webpack_require__(7854);
var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var TypeError = global.TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 9518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var hasOwn = __webpack_require__(2597);
var isCallable = __webpack_require__(614);
var toObject = __webpack_require__(7908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 1956:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(1702);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 2626:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(3070).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 4488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 3505:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var setGlobal = __webpack_require__(3505);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.22.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.22.5/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var requireObjectCoercible = __webpack_require__(4488);

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 4590:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var toPositiveInteger = __webpack_require__(3002);

var RangeError = global.RangeError;

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ 3002:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var toIntegerOrInfinity = __webpack_require__(9303);

var RangeError = global.RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var classof = __webpack_require__(648);

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 9191:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var isPrototypeOf = __webpack_require__(7976);
var setPrototypeOf = __webpack_require__(7674);
var copyConstructorProperties = __webpack_require__(9920);
var proxyAccessor = __webpack_require__(2626);
var inheritIfRequired = __webpack_require__(9587);
var normalizeStringArgument = __webpack_require__(6277);
var installErrorCause = __webpack_require__(8340);
var clearErrorStack = __webpack_require__(7741);
var ERROR_STACK_INSTALLABLE = __webpack_require__(2914);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 6699:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var $includes = (__webpack_require__(1318).includes);
var fails = __webpack_require__(7293);
var addToUnscopables = __webpack_require__(1223);

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 1703:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var apply = __webpack_require__(2104);
var wrapErrorConstructorWithCause = __webpack_require__(9191);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 8675:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var lengthOfArrayLike = __webpack_require__(6244);
var toIntegerOrInfinity = __webpack_require__(9303);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod('at', function at(index) {
  var O = aTypedArray(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});


/***/ }),

/***/ 3462:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var ArrayBufferViewCore = __webpack_require__(260);
var lengthOfArrayLike = __webpack_require__(6244);
var toOffset = __webpack_require__(4590);
var toIndexedObject = __webpack_require__(7908);
var fails = __webpack_require__(7293);

var RangeError = global.RangeError;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails(function () {
  // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  call($set, array, { length: 1, 0: 3 }, 1);
  return array[1] !== 3;
});

// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
  var array = new Int8Array(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toIndexedObject(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return call($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike(src);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);


/***/ }),

/***/ 89:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
}); // runtime helper for setting properties on components
// in a tree-shakable way

exports.Z = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;

  for (const [key, val] of props) {
    target[key] = val;
  }

  return target;
};

/***/ }),

/***/ 1445:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "img/line-1.83ec0396.jpg";

/***/ }),

/***/ 5685:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "img/line-2.52f1c1bd.jpg";

/***/ }),

/***/ 3589:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "img/ring-1.83feda20.jpg";

/***/ }),

/***/ 7188:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "img/ring-2.bb355162.jpg";

/***/ }),

/***/ 2476:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "img/ring-3.667cc2d4.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(1703);
;// CONCATENATED MODULE: ./globalCom/js/drag/debounce.js


/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';
/** Used as references for various `Number` constants. */

var NAN = 0 / 0;
/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Used for built-in method references. */

var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;

var now = function () {
  return root.Date.now();
};

function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  wait = toNumber(wait) || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;
    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    } // Restart the timer.


    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

/* harmony default export */ var drag_debounce = (debounce);
;// CONCATENATED MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
;// CONCATENATED MODULE: ./globalCom/js/store/store.js
// 创建一个简单的store状态管理
 // 全局状态管理（响应式）

const storeState = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
  isViewer: false,
  //viewer初始化标志
  changeLayers: 0,
  //图层改变加载完毕监听
  changeGeometrys: 0 //三维分析体改变标志

});
const actions = {
  setIsViewer(newValue) {
    storeState.isViewer = newValue;
  },

  setChangeLayers(newValue) {
    storeState.changeLayers += 1;
  },

  setGeometrys(newValue) {
    storeState.changeGeometrys += 1;
  }

}; // 全局公共数据

const storeDate = {
  geometrys: {},
  //存储当前存在的三位空间查询体：如天际线体，可视域体
  layers: null
};
/* harmony default export */ var store = ({
  storeState,
  actions,
  storeDate
});

;// CONCATENATED MODULE: ./globalCom/js/drag/drag.js


/* harmony default export */ function drag(app, isDrag) {
  app.config.globalProperties.store = store;
  app.directive('drag', {
    mounted(a, binding) {
      // if(isDrag === false || isDrag === 'false'){
      //   return;
      // }
      let isStart = false; // 是否已经开始拖拽

      let distance = {}; // 拖动的距离

      let l, t, x, y; // 当前被拖动的距离

      let w; // 当前屏幕宽度

      let h; // 当前屏幕的高度 // 移动端

      const dragElem = a;
      let firstTime = '',
          lastTime = ''; //记录鼠标按下松开时间

      dragElem.addEventListener('touchstart', function (e) {
        isStart = true; // 如果没有开始拖拽， 则可以拖拽

        if (!e.changedTouches[0]) return;
        const {
          clientX,
          clientY
        } = e.changedTouches[0];
        x = clientX - e.changedTouches[0].target.x;
        y = clientY - e.changedTouches[0].target.y;
        w = document.body.clientWidth; // 当前屏幕宽度

        h = document.body.clientHeight; // 当前屏幕的高度
      }, {
        passive: false
      });
      drag_debounce; //防抖;

      dragElem.addEventListener('touchmove', drag_debounce(function (e) {
        e.preventDefault();
        l = e.changedTouches[0].clientX - x;
        t = e.changedTouches[0].clientY - y;

        if (l < 0 && t < 0) {
          a.style.left = 0 + 'px';
          a.style.top = 0 + 'px';
        } else if (l < 0 && t + a.clientHeight < h) {
          a.style.left = 0 + 'px';
          a.style.top = t + 'px';
        } else if (l < 0 && t + a.clientHeight >= h) {
          a.style.left = 0 + 'px';
          a.style.top = h - a.clientHeight + 'px';
        } else if (l + a.clientWidth > w && t < 0) {
          a.style.left = w - a.clientWidth + 'px';
          a.style.top = 0 + 'px';
        } else if (l + a.clientWidth < w && t + a.clientHeight >= h) {
          a.style.left = l + 'px';
          a.style.top = h - a.clientHeight + 'px';
        } else if (l + a.clientWidth < w && t < 0) {
          a.style.left = l + 'px';
          a.style.top = 0 + 'px';
        } else if (l + a.clientWidth > w && t + a.clientHeight < h) {
          a.style.left = w - a.clientWidth + 'px';
          a.style.top = t + 'px';
        } else if (l + a.clientWidth > w && t + a.clientHeight >= h) {
          a.style.left = w - a.clientWidth + 'px';
          a.style.top = h - a.clientHeight + 'px';
        } else {
          a.style.left = l + 'px';
          a.style.top = t + 'px';
        }
      }, 5), {
        passive: false
      });
      dragElem.addEventListener('touchend', function (e) {
        isStart = false;
        document.ontouchmove = null;
        document.ontouchmove = null;
        distance = {
          type: 'move',
          clientX: x - e.changedTouches[0].clientX,
          // 拖动的 x 距离
          clientY: y - e.changedTouches[0].clientY // 拖动的 y 距离

        }; // binding.value(distance) // 返回拖动的距离
      }, {
        passive: false
      });

      dragElem.onmousedown = function (e) {
        // e.stopPropagation();
        // e.preventDefault()
        // dragElem.setAttribute('data-flag', false) //防止拖动时触发点击事件
        // firstTime = new Date().getTime();
        w = document.body.clientWidth; // 当前屏幕宽度

        h = document.body.clientHeight; // 当前屏幕的高度

        if (isStart) return; // 如果已经开始拖拽， 返回

        isStart = true; // 如果没有开始拖拽， 则可以拖拽

        const {
          clientX,
          clientY
        } = e;
        const x = clientX - a.offsetLeft;
        const y = clientY - a.offsetTop;
        document.onmousemove = drag_debounce(function (e) {
          // e.preventDefault()
          // e.stopPropagation();
          l = e.clientX - x;
          t = e.clientY - y;

          if (l < 0 && t < 0) {
            a.style.left = 0 + 'px';
            a.style.top = 0 + 'px';
          } else if (l < 0 && t + a.clientHeight < h) {
            a.style.left = 0 + 'px';
            a.style.top = t + 'px';
          } else if (l < 0 && t + a.clientHeight >= h) {
            a.style.left = 0 + 'px';
            a.style.top = h - a.clientHeight + 'px';
          } else if (l + a.clientWidth > w && t < 0) {
            a.style.left = w - a.clientWidth + 'px';
            a.style.top = 0 + 'px';
          } else if (l + a.clientWidth < w && t + a.clientHeight >= h) {
            a.style.left = l + 'px';
            a.style.top = h - a.clientHeight + 'px';
          } else if (l + a.clientWidth < w && t < 0) {
            a.style.left = l + 'px';
            a.style.top = 0 + 'px';
          } else if (l + a.clientWidth > w && t + a.clientHeight < h) {
            a.style.left = w - a.clientWidth + 'px';
            a.style.top = t + 'px';
          } else if (l + a.clientWidth > w && t + a.clientHeight >= h) {
            a.style.left = w - a.clientWidth + 'px';
            a.style.top = h - a.clientHeight + 'px';
          } else {
            a.style.left = l + 'px';
            a.style.top = t + 'px';
          }
        }, 5);

        document.onmouseup = function (e) {
          document.onmousedown = null;
          document.onmousemove = null;
          isStart = false; // onmouseup 时的时间，并计算差值
          // lastTime = new Date().getTime();
          // if ((lastTime - firstTime) < 200) {
          //   dragElem.setAttribute('data-flag', true)
          // }
          // distance = {
          //   type: 'move',
          //   clientX: clientX - e.clientX, // 拖动的 x 距离
          //   clientY: clientY - e.clientY // 拖动的 y 距离
          // }
          // binding.value(distance) // 返回拖动的距离
        };
      };
    }

  });
  /*阻止拖拽*/

  app.directive('stopdrag', {
    mounted(a, binding) {
      a.onmousedown = e => {
        // if (e.target.className == 'ant-input-number-input') return;
        // if (e.target.className == 'ant-layout-sider') return;
        e.stopPropagation();
      };
    }

  });
}
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/common/panel/panel.vue?vue&type=template&id=1c0b3382&scoped=true

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_stopdrag = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveDirective)("stopdrag");

  const _directive_drag = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveDirective)("drag");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)(((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
    class: "sm-panel",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)({
      width: $props.pWidth + 'px'
    })
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)(((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "default", {}, undefined, true)])), [[_directive_stopdrag]])], 4)), [[_directive_drag]]);
}
;// CONCATENATED MODULE: ./globalCom/common/panel/panel.vue?vue&type=template&id=1c0b3382&scoped=true

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/common/panel/panel.vue?vue&type=script&lang=js

/* harmony default export */ var panelvue_type_script_lang_js = ({
  name: "Sm3dPanel",
  components: {},
  props: {
    // pHeight: {
    //   type: Number,
    //   default: 100,
    // },
    pWidth: {
      type: Number,
      default: 100
    }
  },

  setup() {
    return {};
  }

});
;// CONCATENATED MODULE: ./globalCom/common/panel/panel.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/common/panel/panel.vue?vue&type=style&index=0&id=1c0b3382&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/common/panel/panel.vue?vue&type=style&index=0&id=1c0b3382&lang=scss&scoped=true

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(89);
;// CONCATENATED MODULE: ./globalCom/common/panel/panel.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(panelvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-1c0b3382"]])

/* harmony default export */ var panel = (__exports__);
;// CONCATENATED MODULE: ./globalCom/common/panel/index.js
// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

panel.install = function (app) {
  app.component(panel.name, panel);
};

/* harmony default export */ var common_panel = (panel);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/viewer/viewer.vue?vue&type=template&id=72e6ea0c

const _hoisted_1 = {
  id: "Container"
};
function viewervue_type_template_id_72e6ea0c_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "default")]);
}
;// CONCATENATED MODULE: ./globalCom/components/viewer/viewer.vue?vue&type=template&id=72e6ea0c

;// CONCATENATED MODULE: ./globalCom/js/common/eventManager/EventDispatcher.js
function EventDispatcher() {}

Object.assign(EventDispatcher.prototype, {
  /**
  * 添加监听器
  * @param type{string} 监听器类型
  * @param listener{function} 方法
  * @param mutexStatus{boolean} 互斥开关
  */
  addEventListener: function (type, listener, mutexStatus = false) {
    if (this._listeners === undefined) this._listeners = {};
    this._mutex = this._mutex || {};
    const mutex = this._mutex;
    var listeners = this._listeners;

    if (listeners[type] === undefined) {
      listeners[type] = [];
    }

    if (listeners[type].indexOf(listener) === -1) {
      // 如果启用功能互斥
      if (mutexStatus) {
        mutex[type] = listener;
      }

      listeners[type].push(listener);
    }
  },
  hasEventListener: function (type, listener) {
    if (this._listeners === undefined) return false;
    var listeners = this._listeners;
    return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
  },
  removeEventListener: function (type, listener) {
    if (this._listeners === undefined) return;
    var listeners = this._listeners;
    var listenerArray = listeners[type]; // 移除指定的功能互斥

    if (this._mutex[type] === listener) {
      this._mutex[type] = null;
    }

    if (listenerArray !== undefined) {
      var index = listenerArray.indexOf(listener);

      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  },

  /**
  * 派发事件
  * @param event{{type: string, message?: *}}
  */
  dispatchEvent: function (event) {
    if (this._listeners === undefined) return;
    var listeners = this._listeners;
    var listenerArray = listeners[event.type];

    if (listenerArray !== undefined) {
      event.target = this; // Make a copy, in case listeners are removed while iterating.

      var array = listenerArray.slice(0);

      if (this._mutex[event.type]) {
        const find = array.find(item => item === this._mutex[event.type]);
        find.call(this, event); // console.log(' 事件互斥已启动')

        return;
      }

      for (var i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }
    }
  },

  removeAllListener() {
    this._mutex = {};

    for (const key in this._listeners) {
      this._listeners[key] = [];
    }
  }

});

;// CONCATENATED MODULE: ./globalCom/js/common/eventManager/EventConstant.js
// 事件管理类型
/* harmony default export */ var EventConstant = ({
  CLICK: 'CLICK',
  //鼠标左键点击事件 
  LEFT_DOWN: 'LEFT_DOWN',
  //鼠标左键按下事件 
  LEFT_UP: 'LEFT_UP',
  //鼠标左键抬起事件 
  MOUSE_MOVE: 'MOUSE_MOVE',
  //鼠标移动事件 
  RIGHT_CLICK: 'RIGHT_CLICK',
  //鼠标右键点击事件 
  LEFT_DOWN_MOUSE_MOVE: 'LEFT_DOWN_MOUSE_MOVE',
  //鼠标左键按下时移动事件 
  RENDER: 'RENDER',
  //渲染事件 
  KEYUP: 'KEYUP',
  //键盘抬起事件 
  KEYDOWN: 'KEYDOWN' //键盘按下事件 

});
;// CONCATENATED MODULE: ./globalCom/js/common/eventManager/EventManager.js


class EventManager extends EventDispatcher {
  /**
   * 视图对象
   * @type {Scene}
   */
  // scene = null

  /**
   * 事件处理器
   * @type{ScreenSpaceEventHandler}
   */
  // handler = null

  /**
   * 按下左键
   * @type {boolean}
   */
  // press = false

  /**
   * 创建事件管理工具
   * @param viewer
   */
  constructor(scene, ScreenSpaceEventHandler, ScreenSpaceEventType) {
    super();
    this.scene = scene; // 创建事件管理器

    this.handler = new ScreenSpaceEventHandler(scene.canvas); // 派发左键单击事件

    this.handler.setInputAction(e => {
      this.dispatchEvent({
        type: EventConstant.CLICK,
        message: e
      });
    }, ScreenSpaceEventType.LEFT_CLICK); // 左键按下事件

    this.handler.setInputAction(e => {
      this.press = true;
      this.dispatchEvent({
        type: EventConstant.LEFT_DOWN,
        message: e
      });
    }, ScreenSpaceEventType.LEFT_DOWN); // 右键按下事件

    this.handler.setInputAction(e => {
      this.press = false;
      this.dispatchEvent({
        type: EventConstant.LEFT_UP,
        message: e
      });
    }, ScreenSpaceEventType.LEFT_UP); // 派发右键单击事件

    this.handler.setInputAction(e => {
      this.dispatchEvent({
        type: EventConstant.RIGHT_CLICK,
        message: e
      });
    }, ScreenSpaceEventType.RIGHT_CLICK); // 鼠标移动事件

    this.handler.setInputAction(e => {
      // 左键按下移动事件
      if (this.press) {
        this.dispatchEvent({
          type: EventConstant.LEFT_DOWN_MOUSE_MOVE,
          message: e
        });
      }

      this.dispatchEvent({
        type: EventConstant.MOUSE_MOVE,
        message: e
      });
    }, ScreenSpaceEventType.MOUSE_MOVE); // // 派发渲染事件
    // this.scene.postRender.addEventListener((e, time) => {
    //     TWEEN && TWEEN.update()
    //     this.scene.stats && this.scene.stats.update()
    //     this.dispatchEvent({
    //         type: EventConstant.RENDER,
    //         message: {
    //             scene: e,
    //             time: time
    //         }
    //     })
    // })
    // // 键盘抬起事件
    // document.addEventListener(EventConstant.KEYUP, (e) => {
    //     this.dispatchEvent({
    //         type: EventConstant.KEYUP,
    //         message: {
    //             e: e
    //         }
    //     })
    // })
    // // 键盘按下事件
    // document.addEventListener(EventConstant.KEYDOWN, (e) => {
    //     this.dispatchEvent({
    //         type: EventConstant.KEYDOWN,
    //         message: {
    //             e: e
    //         }
    //     })
    // })
  }
  /**
   * 添加相机位置监听方法
   * @param fn{Function} 监听方法
   */


  addCameraMoveListener(fn) {
    this.scene.camera.changed.addEventListener(fn);
  }
  /**
   * 移除相机位置监听
   * @param fn{Function} 监听方法
   */


  removeCameraMoveListener(fn) {
    this.scene.camera.changed.removeEventListener(fn);
  }

}
;// CONCATENATED MODULE: ./globalCom/components/viewer/viewer.js
 //局部状态管理



function initGlobe(SuperMap3D, props) {
  const viewer = new SuperMap3D.Viewer("Container");
  let scene = viewer.scene; // 挂载注册屏幕事件

  scene.eventManager = new EventManager(scene, SuperMap3D.ScreenSpaceEventHandler, SuperMap3D.ScreenSpaceEventType); // 挂载_element

  scene._element = document.body;
  window.scene = scene;
  actions.setIsViewer(true); //初始化viewer标志
  // 添加图层

  try {
    if (props && props.afterInitviewer) {
      props.afterInitviewer();
    }

    if (props && props.sceneUrl) {
      scene.open(props.sceneUrl);
    }

    if (props && props.s3mScps) {
      // addS3mLayers(props.s3mScps, props.addLayerCallback);
      // scene.addS3MTilesLayerByScp(props.s3mScps[0].url, props.s3mScps[0].options.name)
      scene.addS3MTilesLayerByScp(props.s3mScps[0].url);
    }
  } catch (e) {
    console.log('错误信息', e);
  }
}

/* harmony default export */ var viewer_viewer = (initGlobe);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/viewer/viewer.vue?vue&type=script&lang=js


/* harmony default export */ var viewervue_type_script_lang_js = ({
  name: "Sm3dViewer",
  props: {
    sceneUrl: {
      //场景接口
      type: String
    },
    s3mScps: {
      //s3m图层接口
      type: Array
    },
    afterInitviewer: {
      //初始化viewer后回调函数
      type: Function
    },
    addLayerCallback: {
      //默认添加图层回调函数
      type: Function
    } // openingAnimation: {
    //   //开场动画
    //   type: Boolean,
    //   default: false,
    // },

  },

  setup(props) {
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      // console.log('SuperMap3D viewer', SuperMap3D.Viewer());
      viewer_viewer(SuperMap3D, props);
      openingAnimation(); // 加载影像
      // scene.imageryLayers.addImageryProvider(
      //   new SuperMap3D.SuperMapImageryProvider({
      //     // url: "./images/GlobalBkLayer.jpg",
      //     url: "http://www.supermapol.com/realspace/services/map-World/rest/maps/World_Google",
      //   })
      // );
      // scene.imageryLayers.addImageryProvider(
      //   new SuperMap3D.BingMapsImageryProvider({
      //     key: 'AuY224ZCXZhjQ17Ywh2M7-5RhjJg2bEFEzIho3vWtxEDfXFshZsq4_FFJ2m1s1I3', //可至官网（https://www.bingmapsportal.com/）申请key,
      //     url: '//dev.virtualearth.net',
      //   })
      // );
      // 加载模式数据
      // scene.open(
      //   "http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace"
      // );
      // scene.terrainProvider = new SuperMap3D.SuperMapTerrainProvider({
      //   url: "https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path",
      //   requestWaterMask: true,
      //   requestVertexNormals: true,
      //   isSct: false,
      // });
      // 设置相机视角
      // scene.camera.setView({
      //   destination: SuperMap3D.Cartesian3.fromDegrees(88.3648, 29.0946, 90000),
      //   orientation: {
      //     heading: 6.10547067016156,
      //     pitch: -0.8475077031996778,
      //     roll: 6.2831853016686185,
      //   },
      // });
      // BIM
      // scene.open('http://www.supermapol.com/realspace/services/3D-BIMbuilding/rest/realspace')
    });

    const openingAnimation = () => {
      scene.camera.flyTo({
        destination: new SuperMap3D.Cartesian3(6788287.844465209, -41980756.10214644, 29619220.04004376),
        duration: 0,
        complete: function () {
          scene.camera.flyTo({
            destination: new SuperMap3D.Cartesian3.fromDegrees(110.60396458865515, 34.54408834959379, 30644793.325518917),
            duration: 5
          });
        }
      });
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/viewer/viewer.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/viewer/viewer.vue?vue&type=style&index=0&id=72e6ea0c&lang=scss
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/viewer/viewer.vue?vue&type=style&index=0&id=72e6ea0c&lang=scss

;// CONCATENATED MODULE: ./globalCom/components/viewer/viewer.vue




;


const viewer_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(viewervue_type_script_lang_js, [['render',viewervue_type_template_id_72e6ea0c_render]])

/* harmony default export */ var components_viewer_viewer = (viewer_exports_);
;// CONCATENATED MODULE: ./globalCom/components/viewer/index.js


components_viewer_viewer.install = function (app) {
  app.component(components_viewer_viewer.name, components_viewer_viewer);
};

/* harmony default export */ var components_viewer = (components_viewer_viewer);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/measure/measure.vue?vue&type=template&id=d6137eb6&scoped=true


const _withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.pushScopeId)("data-v-d6137eb6"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.popScopeId)(), n);

const measurevue_type_template_id_d6137eb6_scoped_true_hoisted_1 = {
  class: "sm-global-row"
};

const _hoisted_2 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", {
  class: "sm-global-row-title"
}, "模式", -1));

const _hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("空间量算");

const _hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("贴地量算");

const _hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("CGCS2000");

const _hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("XIAN80");

const _hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("WGS84");

const _hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("平面投影");

const _hoisted_9 = {
  class: "sm-measure-tool"
};
const _hoisted_10 = ["disabled"];

const _hoisted_11 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("i", {
  class: "iconfont iconkongjianjuli",
  title: "测距"
}, null, -1));

const _hoisted_12 = [_hoisted_11];
const _hoisted_13 = ["disabled"];

const _hoisted_14 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("i", {
  class: "iconfont icongaoduceliang",
  title: "测高"
}, null, -1));

const _hoisted_15 = [_hoisted_14];

const _hoisted_16 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("i", {
  class: "iconfont iconkongjianmianji",
  title: "测面"
}, null, -1));

const _hoisted_17 = [_hoisted_16];

const _hoisted_18 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("i", {
  class: "iconfont iconqingchu",
  title: "清除"
}, null, -1));

const _hoisted_19 = [_hoisted_18];
function measurevue_type_template_id_d6137eb6_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 200
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", measurevue_type_template_id_d6137eb6_scoped_true_hoisted_1, [_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      class: "sm-global-select",
      value: $setup.measureMode,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.measureMode = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "Space"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_3]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "Ground"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_4]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "CGCS2000"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_5]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "XIAN80"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_6]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "WGS84"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_7]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "null"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_8]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_9, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => $setup.distanceClk && $setup.distanceClk(...args)),
      disabled: $setup.measureMode === 'null',
      class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($setup.measureMode === 'null' ? 'sm-measure-disabled-color' : '')
    }, _hoisted_12, 10, _hoisted_10), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("button", {
      onClick: _cache[2] || (_cache[2] = (...args) => $setup.heightClk && $setup.heightClk(...args)),
      disabled: $setup.measureMode != 'Space' && $setup.measureMode != 'Ground',
      class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($setup.measureMode != 'Space' && $setup.measureMode != 'Ground' ? 'sm-measure-disabled-color' : '')
    }, _hoisted_15, 10, _hoisted_13), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("button", {
      onClick: _cache[3] || (_cache[3] = (...args) => $setup.areaClk && $setup.areaClk(...args))
    }, _hoisted_17), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("button", {
      onClick: _cache[4] || (_cache[4] = (...args) => $setup.clear && $setup.clear(...args))
    }, _hoisted_19)])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/measure/measure.vue?vue&type=template&id=d6137eb6&scoped=true

;// CONCATENATED MODULE: ./globalCom/js/tool/tool.js
/*
* 常用工具类
*/
//axios本版本不支持jsonp
const axiosJsonp = url => {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!');
    return;
  }

  return new Promise((resolve, reject) => {
    window.jsonCallBack = result => {
      resolve(result);
    };

    var JSONP = document.createElement("script");
    JSONP.type = "text/javascript";
    JSONP.src = `${url}&callback=jsonCallBack`;
    document.getElementsByTagName("head")[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName("head")[0].removeChild(JSONP);
    }, 500);
  });
}; //判断两数组或对象相等


const isEqualArr = (arg1, arg2) => {
  if (!arg1 || !arg2) return true;
  let bol = true;

  if (Object.keys(arg1).length != Object.keys(arg2).length) {
    return false;
  }

  for (let key in arg1) {
    if (typeof arg1[key] == 'object') {
      bol = isSame(arg1[key], arg2[key]);

      if (!bol) {
        break;
      }
    } else if (arg1[key] != arg2[key]) {
      bol = false;
      break;
    }
  }

  return bol;
}; //坐标转化
//笛卡尔转经纬度


const CartesiantoDegrees = Cartesians => {
  let array = [].concat(Cartesians);
  let positions = [];

  for (let i = 0, len = array.length; i < len; i++) {
    let cartographic = SuperMap3D.Cartographic.fromCartesian(array[i]);
    let longitude = SuperMap3D.Math.toDegrees(cartographic.longitude);
    let latitude = SuperMap3D.Math.toDegrees(cartographic.latitude);
    let h = cartographic.height;

    if (positions.indexOf(longitude) == -1 && positions.indexOf(latitude) == -1) {
      positions.push(longitude);
      positions.push(latitude);
      positions.push(h);
    }
  }

  return positions;
}; //笛卡尔转经纬度(每个点是独立的对象)


const CartesiantoDegreesObjs = Cartesians => {
  let array = [].concat(Cartesians);
  let positions = [];

  for (let i = 0, len = array.length; i < len; i++) {
    let cartographic = SuperMap3D.Cartographic.fromCartesian(array[i]);
    let obj = {
      longitude: SuperMap3D.Math.toDegrees(cartographic.longitude),
      latitude: SuperMap3D.Math.toDegrees(cartographic.latitude),
      height: cartographic.height
    };
    positions.push(obj);
  }

  return positions;
}; // 弧度转经纬度


const CartographictoDegrees = wgsPosition => {
  let longitude = SuperMap3D.Math.toDegrees(wgsPosition.longitude);
  let latitude = SuperMap3D.Math.toDegrees(wgsPosition.latitude);
  let height = wgsPosition.height;
  return [longitude, latitude, height];
}; //去重函数  数组


const unique = arr => {
  let res = [];
  let json = {};

  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }

  return res;
}; // 获取渐变色函数


function gradientColors(start, end, steps, gamma) {
  var i,
      j,
      ms,
      me,
      output = [],
      so = [];
  gamma = gamma || 1;

  var normalize = function (channel) {
    return Math.pow(channel / 255, gamma);
  };

  start = parseColor(start).map(normalize);
  end = parseColor(end).map(normalize);

  for (i = 0; i < steps; i++) {
    ms = i / (steps - 1);
    me = 1 - ms;

    for (j = 0; j < 3; j++) {
      so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
    }

    output.push('#' + so.join(''));
  }

  return output;

  function parseColor(hexStr) {
    return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) {
      return 0x11 * parseInt(s, 16);
    }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
      return parseInt(s, 16);
    });
  }

  ; // zero-pad 1 digit to 2

  function pad(s) {
    return s.length === 1 ? '0' + s : s;
  }
}

; // 获取两点的角度和弧度

function getAngleAndRadian(pointA, pointB) {
  //建立以点A为原点，X轴为east,Y轴为north,Z轴朝上的坐标系
  const transform = SuperMap3D.Transforms.eastNorthUpToFixedFrame(pointA); //向量AB

  const positionvector = SuperMap3D.Cartesian3.subtract(pointB, pointA, new SuperMap3D.Cartesian3()); //因transform是将A为原点的eastNorthUp坐标系中的点转换到世界坐标系的矩阵
  //AB为世界坐标中的向量
  //因此将AB向量转换为A原点坐标系中的向量，需乘以transform的逆矩阵。

  const vector = SuperMap3D.Matrix4.multiplyByPointAsVector(SuperMap3D.Matrix4.inverse(transform, new SuperMap3D.Matrix4()), positionvector, new SuperMap3D.Cartesian3()); //归一化

  const direction = SuperMap3D.Cartesian3.normalize(vector, new SuperMap3D.Cartesian3()); //heading

  const heading1 = Math.atan2(direction.y, direction.x) - SuperMap3D.Math.PI_OVER_TWO;
  let radian = SuperMap3D.Math.TWO_PI - SuperMap3D.Math.zeroToTwoPi(heading1);
  var angle = radian * (180 / Math.PI);

  if (angle < 0) {
    angle = angle + 360;
  }

  return {
    angle,
    radian
  };
}

function getPitch(pointA, pointB) {
  let transfrom = SuperMap3D.Transforms.eastNorthUpToFixedFrame(pointA);
  const vector = SuperMap3D.Cartesian3.subtract(pointB, pointA, new SuperMap3D.Cartesian3());
  let direction = SuperMap3D.Matrix4.multiplyByPointAsVector(SuperMap3D.Matrix4.inverse(transfrom, transfrom), vector, vector);
  SuperMap3D.Cartesian3.normalize(direction, direction); //因为direction已归一化，斜边长度等于1，所以余弦函数等于direction.z

  let radian = SuperMap3D.Math.PI_OVER_TWO - SuperMap3D.Math.acosClamped(direction.z);
  var angle = radian * (180 / Math.PI);

  if (angle < 0) {
    angle = angle + 360;
  }

  return {
    angle,
    radian
  };
}

/* harmony default export */ var tool = ({
  axiosJsonp,
  isEqualArr,
  CartesiantoDegrees,
  CartesiantoDegreesObjs,
  unique,
  gradientColors,
  getAngleAndRadian,
  CartographictoDegrees,
  getPitch
});

;// CONCATENATED MODULE: ./globalCom/js/local/resourceCN.js
/* harmony default export */ var resourceCN = ({
  showRenderLoopErrors: '渲染时发生错误，已停止渲染。',
  AttributeError: '该组件props没有这个属性：',
  NoPickPositionSupported: "不支持深度纹理,无法绘制多边形，地形操作功能无法使用！",
  NoTerrain: "请在地形里使用地形组件！",
  initViewerWarn: '请先初始化viewer!',
  MoveMouseHeightBox: '点击鼠标左键结束矩形绘制，移动鼠标绘制box高度',
  RightClickEndDrawing: '右键单击结束绘制',
  LeftClickBottomBox: '点击鼠标左键，开始绘制矩形作为box底面',
  ClickModelAddBox: '点击模型，添加裁剪盒子',
  SkyLineWarn: "获取天际线体前，请先绘制天际线！",
  SkyLineBody: '天际线体',
  ShadowqueryWarn: "此操作需要先开启阴影！",
  VeiwshedBody: '可视体',
  VeiwshedBodyHidden: '不可视体',
  EchartsErr: "二维显示需要echarts支持，未找到相关依赖！",
  BaseMapImg: '底图',
  tip1: '<p>点击左键确定操作区域中间点</p><p>右键单击结束绘制</p>'
});
;// CONCATENATED MODULE: ./globalCom/js/local/lang.js
// 组件内部的语言资源：主要包括提示信息



var currentLanguage, lang_Resource;
var cookieLanguage = getLang().toLowerCase();

function getLang() {
  //浏览器语言  IE用browserLanguage，非IE使用language进行判断
  let lang = (navigator.language || navigator.browserLanguage).toLowerCase();
  window.lang = lang; //判断portal设置语言 通过cookie获取
  //   const cookies = document.cookie.split(';');
  //   if (cookies.length > 0) {
  //     cookies.forEach(function (cookie) {
  //       const arr = cookie.split('=');
  //       if (arr[0].toLowerCase().trim() === 'language') {
  //         lang = arr[1];
  //         return;
  //       }
  //     });
  //   }

  return lang;
}

;

function inputCSS(href) {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.getElementsByTagName("HEAD")[0].appendChild(link);
}

if (cookieLanguage !== undefined) {
  currentLanguage = cookieLanguage;
} else {
  currentLanguage = (navigator.language || navigator.browserLanguage).toLowerCase(); // 获取当前浏览器的语言
}

if (currentLanguage.startsWith('zh')) {
  lang_Resource = resourceCN;
} else if (currentLanguage.startsWith('ja')) {
  lang_Resource = resourceCN;
} else {
  lang_Resource = resourceCN;
}

function initLang(languageType) {
  if (languageType) {
    switch (languageType) {
      case 'zh':
        lang_Resource = ResourceCN;
        break;

      case 'ja':
        lang_Resource = ResourceJA;
        break;

      case 'en':
        lang_Resource = ResourceEN;
        break;

      default:
        lang_Resource = ResourceCN;
        break;
    }
  }
}

/* harmony default export */ var lang = (lang_Resource);

;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/measure/measure.js
// 引入依赖

 //提示等工具

 //语言资源

 //简单局部状态管理

function measure(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    measureMode: 'Space',
    //测量模式
    clampMode: SuperMap3D.ClampMode.Space,
    //贴地模式
    Ellipsoid: null,
    //椭球选择
    contourColor: '#ff7d00',
    //等高线颜色
    isShowDVH: false,
    //显示等高线界面
    isShowLine: true,
    //显示等高线
    pickPointEnabled: true //开启顶点捕捉

  }); // 初始化数据

  let layers,
      handlerDis,
      handlerArea,
      handlerHeight,
      isoline,
      lineHeight,
      setHypFlag,
      height_0 = 0; // 等高线

  isoline = new SuperMap3D.HypsometricSetting();
  isoline.DisplayMode = SuperMap3D.HypsometricSettingEnum.DisplayMode.LINE;
  let colorTable = new SuperMap3D.ColorTable();
  isoline._lineColor = SuperMap3D.Color.fromCssColorString(state.contourColor);
  isoline.ColorTable = colorTable;
  isoline.Opacity = 0.6;
  isoline.MaxVisibleValue = -100;
  isoline.MinVisibleValue = -100;

  var init = () => {
    layers = scene.layers && scene.layers.layerQueue;
    scene.globe.HypsometricSetting = {
      hypsometricSetting: isoline,
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
    };

    if (storeState.changeLayers) {
      setHypsometricSetting();
    }

    handlerDis = new SuperMap3D.MeasureHandler(scene, SuperMap3D.MeasureMode.Distance, state.clampMode);
    handlerArea = new SuperMap3D.MeasureHandler(scene, SuperMap3D.MeasureMode.Area, state.clampMode);
    handlerHeight = new SuperMap3D.MeasureHandler(scene, SuperMap3D.MeasureMode.DVH); //初始化测量距离

    handlerDis.activeEvt.addEventListener(isActive => {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        scene.pickPointEnabled = state.pickPointEnabled;
      } else {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        scene.pickPointEnabled = false;
      }
    }); //注册测距功能事件

    handlerDis.measureEvt.addEventListener(result => {
      let dis = Number(result.distance);
      let mode = state.measureMode;

      if (mode == "CGCS2000" || mode == "XIAN80" || mode == "WGS84") {
        dis = Number(calcClampDistance(result.positions));
      }

      let distance = dis > 1000 ? (dis / 1000).toFixed(2) + "km" : dis.toFixed(2) + "m";
      handlerDis.disLabel.text = "距离:" + distance;
    }); //初始化测量面积

    handlerArea.activeEvt.addEventListener(isActive => {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        scene.pickPointEnabled = state.pickPointEnabled;
      } else {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        scene.pickPointEnabled = false;
      }
    });
    handlerArea.measureEvt.addEventListener(result => {
      let mj = Number(result.area);
      let mode = state.measureMode;

      if (mode == "CGCS2000" || mode == "XIAN80" || mode == "WGS84") {
        mj = Number(calcClampValue(result.positions));
      } else if (mode == "6") {
        mj = Number(calcAreaWithoutHeight(result.positions));
      }

      let area = mj > 1000000 ? (mj / 1000000).toFixed(2) + "km²" : mj.toFixed(2) + "㎡";
      handlerArea.areaLabel.text = "面积:" + area;
    });
    let point1, point2; //初始化测量高度

    handlerHeight.measureEvt.addEventListener(result => {
      let distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + "km" : (result.distance / 1).toFixed(2) + "m";
      let vHeight = result.verticalHeight > 1000 ? (result.verticalHeight / 1000).toFixed(2) + "km" : (result.verticalHeight / 1).toFixed(2) + "m";
      let hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance / 1000).toFixed(2) + "km" : (result.horizontalDistance / 1).toFixed(2) + "m";
      handlerHeight.disLabel.text = "空间距离:" + distance;
      handlerHeight.vLabel.text = "垂直高度:" + vHeight;
      handlerHeight.vLabel.horizontalOrigin = SuperMap3D.HorizontalOrigin.RIGHT;
      handlerHeight.hLabel.text = "水平距离:" + hDistance;
      handlerHeight.hLabel.verticalOrigin = SuperMap3D.VerticalOrigin.BOTTOM; //实时等高线显示

      point1 = SuperMap3D.Cartographic.fromCartesian(result.verticalPositions[0]);
      point2 = SuperMap3D.Cartographic.fromCartesian(result.verticalPositions[1]);
      if (point1.height > point2.height) lineHeight = Number(result.verticalHeight) + height_0;else lineHeight = -Number(result.verticalHeight) + height_0;
      if (state.isShowLine) updateContourLine(lineHeight);
    });
    handlerHeight.activeEvt.addEventListener(isActive => {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        scene.pickPointEnabled = state.pickPointEnabled;
      } else {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        scene.pickPointEnabled = false;
      }
    });
  };

  if (storeState.isViewer) {
    init();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) init();
  }); //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    setHypsometricSetting();
  }); // 初始化设置图层等高线

  function setHypsometricSetting() {
    if (!layers) return;

    for (let i = 0; i < layers.length; i++) {
      layers[i].hypsometricSetting = {
        hypsometricSetting: isoline,
        analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
      };
    }

    setHypFlag = true;
  } // 分析
  //椭球贴地距离


  function calcClampDistance(positions) {
    let lonlat = [];

    for (let i = 0; i < positions.length; i++) {
      let cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      let lon = SuperMap3D.Math.toDegrees(cartographic.longitude);
      let lat = SuperMap3D.Math.toDegrees(cartographic.latitude);
      lonlat.push(lon, lat);
    }

    let gemetry = new SuperMap3D.PolylineGeometry({
      positions: SuperMap3D.Cartesian3.fromDegreesArray(lonlat)
    });
    return scene.globe.computeSurfaceDistance(gemetry, state.Ellipsoid);
  }

  ; //椭球贴地面积

  function calcClampValue(positions) {
    let lonlat = [];

    for (let i = 0; i < positions.length; i++) {
      let cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      let lon = SuperMap3D.Math.toDegrees(cartographic.longitude);
      let lat = SuperMap3D.Math.toDegrees(cartographic.latitude);
      lonlat.push(lon, lat);
    }

    let gemetry = new SuperMap3D.PolygonGeometry.fromPositions({
      positions: SuperMap3D.Cartesian3.fromDegreesArray(lonlat)
    });
    return scene.globe.computeSurfaceArea(gemetry, state.Ellipsoid);
  }

  ; //投影面积

  function calcAreaWithoutHeight(positions) {
    let totalLon = 0;

    for (let i = 0; i < positions.length; i++) {
      let cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      let lon = SuperMap3D.Math.toDegrees(cartographic.longitude);
      totalLon += lon;
    }

    let dh = Math.round((totalLon / positions.length + 6) / 6); //带号

    let centralMeridian = dh * 6 - 3; //高斯投影

    let projection = new SuperMap3D.CustomProjection({
      name: "tmerc",
      centralMeridian: centralMeridian,
      primeMeridian: 0,
      standardParallel_1: 0,
      standardParallel_2: 0,
      eastFalse: 500000.0,
      northFalse: 0.0,
      semimajorAxis: 6378137,
      inverseFlattening: 298.257222101
    });
    let cartesians = [];

    for (let i = 0; i < positions.length; i++) {
      let cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      let cartesian = projection.project(cartographic);
      cartesians.push(cartesian);
    }

    cartesians.push(cartesians[0]); //首尾相接

    let value = SuperMap3D.getPreciseArea(cartesians, "China2000", centralMeridian, dh, 1);
    return value;
  }

  ; //   设置等值线

  function updateContourLine(height) {
    scene.globe.HypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
    scene.globe.HypsometricSetting.hypsometricSetting.MinVisibleValue = height;
    if (!setHypFlag) return;

    for (let i = 0; i < layers.length; i++) {
      if (layers[i].hypsometricSetting.hypsometricSetting) {
        layers[i].hypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
        layers[i].hypsometricSetting.hypsometricSetting.MinVisibleValue = height;
      } else {
        setHypsometricSetting();
      }
    }
  }

  ;

  function distanceClk() {
    deactiveAll();
    handlerDis && handlerDis.activate();
  }

  ;

  function areaClk() {
    deactiveAll();
    handlerArea && handlerArea.activate();
  }

  ;

  function heightClk() {
    if (!setHypFlag) setHypsometricSetting();
    clearLine(); //鼠标左键事件监听

    scene.eventManager.addEventListener("CLICK", measureHeightClk, true);
    deactiveAll();
    state.isShowDVH = true;
    handlerHeight && handlerHeight.activate();
  }

  ;

  function measureHeightClk(e) {
    let position = scene.pickPosition(e.message.position);
    let p = tool.CartesiantoDegrees(position); // 将获取的点的位置转化成经纬度

    height_0 = p[2];
  } // 清除


  function clearAll() {
    deactiveAll();
    handlerDis && handlerDis.clear();
    handlerArea && handlerArea.clear();
    handlerHeight && handlerHeight.clear();
    clearLine();
  }

  ; //   清除等值线

  function clearLine() {
    updateContourLine(-10000);
    scene.eventManager.removeEventListener("CLICK", measureHeightClk); //移除鼠标点击事件监听
  }

  ;

  function deactiveAll() {
    if (!handlerDis) init();
    handlerDis && handlerDis.deactivate();
    handlerArea && handlerArea.deactivate();
    handlerHeight && handlerHeight.deactivate();
    state.isShowDVH = false;
    state.Ellipsoid = null;
    lineHeight = -10000;
  }

  ;

  function clear() {
    clearAll();
    scene.pickPointEnabled = false;
  }

  ; // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.isShowLine, val => {
    if (!val) {
      updateContourLine(-10000);
    } else {
      updateContourLine(lineHeight);
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.pickPointEnabled, val => {
    scene.pickPointEnabled = val;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.measureMode, val => {
    if (val == "Space") {
      state.clampMode = SuperMap3D.ClampMode.Space;
      handlerArea.clampMode = SuperMap3D.ClampMode.Space;
      handlerDis.clampMode = SuperMap3D.ClampMode.Space;
    } else {
      state.clampMode = SuperMap3D.ClampMode.Ground;
      handlerArea.clampMode = SuperMap3D.ClampMode.Ground;
      handlerDis.clampMode = SuperMap3D.ClampMode.Ground;

      if (val == "XIAN80") {
        state.Ellipsoid = SuperMap3D.Ellipsoid.XIAN80;
      } else if (val == "CGCS2000") {
        state.Ellipsoid = SuperMap3D.Ellipsoid.CGCS2000;
      } else if (val == "WGS84") {
        state.Ellipsoid = SuperMap3D.Ellipsoid.WGS84;
      } else {
        state.Ellipsoid = null;
      }
    }
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    isoline.destroy();
    layers = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    distanceClk,
    areaClk,
    heightClk,
    clear
  };
}

;
/* harmony default export */ var measure_measure = (measure);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/measure/measure.vue?vue&type=script&lang=js


/* harmony default export */ var measurevue_type_script_lang_js = ({
  name: "Sm3dMeasure",
  components: {
    Panel: panel
  },

  setup(props) {
    let {
      measureMode,
      //测量模式
      isShowDVH,
      //显示勾选界面
      interval,
      //等值线距
      isShowLine,
      //显示等高线
      distanceClk,
      //点击测距函数
      areaClk,
      //点击测面
      heightClk,
      //点击测高
      clear //清除

    } = measure_measure(props);
    return {
      measureMode,
      //测量模式
      isShowDVH,
      //显示勾选界面
      interval,
      //等值线距
      isShowLine,
      //显示等高线
      distanceClk,
      areaClk,
      heightClk,
      clear
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/measure/measure.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/measure/measure.vue?vue&type=style&index=0&id=d6137eb6&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/measure/measure.vue?vue&type=style&index=0&id=d6137eb6&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/measure/measure.vue




;


const measure_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(measurevue_type_script_lang_js, [['render',measurevue_type_template_id_d6137eb6_scoped_true_render],['__scopeId',"data-v-d6137eb6"]])

/* harmony default export */ var analysis_3d_measure_measure = (measure_exports_);
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/measure/index.js
// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

analysis_3d_measure_measure.install = function (app) {
  app.component(analysis_3d_measure_measure.name, analysis_3d_measure_measure);
};

/* harmony default export */ var analysis_3d_measure = (analysis_3d_measure_measure);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/openness/openness.vue?vue&type=template&id=7e949a4d

const opennessvue_type_template_id_7e949a4d_hoisted_1 = {
  class: "sm-global-row"
};

const opennessvue_type_template_id_7e949a4d_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "附加高度", -1);

const opennessvue_type_template_id_7e949a4d_hoisted_3 = {
  class: "sm-global-row"
};

const opennessvue_type_template_id_7e949a4d_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "开始角度", -1);

const opennessvue_type_template_id_7e949a4d_hoisted_5 = {
  class: "sm-global-row"
};

const opennessvue_type_template_id_7e949a4d_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "终止角度", -1);

const opennessvue_type_template_id_7e949a4d_hoisted_7 = {
  class: "sm-global-row"
};

const opennessvue_type_template_id_7e949a4d_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "观察半径", -1);

const opennessvue_type_template_id_7e949a4d_hoisted_9 = {
  class: "sm-global-row"
};

const opennessvue_type_template_id_7e949a4d_hoisted_10 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "可视区颜色", -1);

const opennessvue_type_template_id_7e949a4d_hoisted_11 = {
  class: "sm-global-row"
};

const opennessvue_type_template_id_7e949a4d_hoisted_12 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "不可视颜色", -1);

const opennessvue_type_template_id_7e949a4d_hoisted_13 = {
  class: "sm-global-row"
};

const opennessvue_type_template_id_7e949a4d_hoisted_14 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "显示模式", -1);

const opennessvue_type_template_id_7e949a4d_hoisted_15 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("全部显示");

const opennessvue_type_template_id_7e949a4d_hoisted_16 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("可视部分");

const opennessvue_type_template_id_7e949a4d_hoisted_17 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("不可视部分");

const opennessvue_type_template_id_7e949a4d_hoisted_18 = {
  class: "sm-global-row"
};

const opennessvue_type_template_id_7e949a4d_hoisted_19 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("是否封口");

const _hoisted_20 = {
  class: "sm-global-button"
};

const _hoisted_21 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("分析");

const _hoisted_22 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function opennessvue_type_template_id_7e949a4d_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_checkbox = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-checkbox");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 200
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", opennessvue_type_template_id_7e949a4d_hoisted_1, [opennessvue_type_template_id_7e949a4d_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.addHeight,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.addHeight = $event),
      min: 0,
      step: 0.1,
      max: 10
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", opennessvue_type_template_id_7e949a4d_hoisted_3, [opennessvue_type_template_id_7e949a4d_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.startAngle,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.startAngle = $event),
      min: 0,
      max: 360
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", opennessvue_type_template_id_7e949a4d_hoisted_5, [opennessvue_type_template_id_7e949a4d_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.endAngle,
      "onUpdate:value": _cache[2] || (_cache[2] = $event => $setup.endAngle = $event),
      min: 0,
      max: 360
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", opennessvue_type_template_id_7e949a4d_hoisted_7, [opennessvue_type_template_id_7e949a4d_hoisted_8, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.endAngle,
      "onUpdate:value": _cache[3] || (_cache[3] = $event => $setup.endAngle = $event),
      min: 0,
      max: 360
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", opennessvue_type_template_id_7e949a4d_hoisted_9, [opennessvue_type_template_id_7e949a4d_hoisted_10, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      class: "sm-global-color",
      type: "color",
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => _ctx.skylineColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, _ctx.skylineColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", opennessvue_type_template_id_7e949a4d_hoisted_11, [opennessvue_type_template_id_7e949a4d_hoisted_12, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      class: "sm-global-color",
      type: "color",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => _ctx.skylineColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, _ctx.skylineColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", opennessvue_type_template_id_7e949a4d_hoisted_13, [opennessvue_type_template_id_7e949a4d_hoisted_14, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      class: "sm-global-select",
      value: _ctx.measureMode,
      "onUpdate:value": _cache[6] || (_cache[6] = $event => _ctx.measureMode = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "Space"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [opennessvue_type_template_id_7e949a4d_hoisted_15]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "Ground"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [opennessvue_type_template_id_7e949a4d_hoisted_16]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "CGCS2000"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [opennessvue_type_template_id_7e949a4d_hoisted_17]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", opennessvue_type_template_id_7e949a4d_hoisted_18, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_checkbox, {
      checked: _ctx.ignoreGlobe,
      "onUpdate:checked": _cache[7] || (_cache[7] = $event => _ctx.ignoreGlobe = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [opennessvue_type_template_id_7e949a4d_hoisted_19]),
      _: 1
    }, 8, ["checked"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_20, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      onClick: $setup.analysis
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_21]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      onClick: $setup.clear
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_22]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/openness/openness.vue?vue&type=template&id=7e949a4d

;// CONCATENATED MODULE: ./globalCom/js/tool/tooltip.js
function createTooltip(frameDiv) {
  var tooltip = function (frameDiv) {
    var div = document.createElement('DIV');
    div.className = "twipsy right";
    var arrow = document.createElement('DIV');
    arrow.className = "twipsy-arrow";
    div.appendChild(arrow);
    var title = document.createElement('DIV');
    title.className = "twipsy-inner";
    div.appendChild(title);
    this._div = div;
    this._title = title;
    this.message = ''; // add to frame div and display coordinates

    frameDiv.appendChild(div);
    var that = this;

    div.onmousemove = function (evt) {
      that.showAt({
        x: evt.clientX,
        y: evt.clientY
      }, that.message);
    };
  };

  tooltip.prototype.setVisible = function (visible) {
    this._div.style.display = visible ? 'block' : 'none';
  };

  tooltip.prototype.showAt = function (position, message) {
    if (position && message) {
      this.setVisible(true);
      this._title.innerHTML = message;
      this._div.style.left = position.x + 10 + "px";
      this._div.style.top = position.y - this._div.clientHeight / 2 + "px";
      this.message = message;
    }
  };

  return new tooltip(frameDiv);
}

/* harmony default export */ var tool_tooltip = (createTooltip);
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/openness/openness.js
// 引入依赖

 //提示等工具

 //语言资源

 //简单局部状态管理



function openness(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    addHeight: 1,
    //附加高度
    viewPosition: null,
    //分析位置
    viewDomeRadius: 100,
    //分析半径
    domeType: "ALLDOME",
    //分析类型
    isClosed: false,
    //是否封口
    visibleAreaColor: "rgba(9,199,112,0.5)",
    //可见区颜色
    hiddenAreaColor: "rgba(238,114,22,0.5)",
    //不可见颜色
    startAngle: 0,
    //开始角度
    endAngle: 360 //终止角度

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let scene,
      viewDome,
      Entypositions,
      tipFlag = true;

  if (storeState.isViewer) {
    if (!window.tooltip) {
      window.tooltip = tool_tooltip(document.body);
    }

    init();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      if (!window.tooltip) {
        window.tooltip = tool_tooltip(document.body);
      }

      init();
    }
  });

  function init() {
    //初始化
    viewDome = new SuperMap3D.ViewDome(scene); //构造新的开敞度分析对象

    viewDome.viewPosition = [0, 0, 0]; //初始化视点位置

    viewDome.distance = Number(state.viewDomeRadius); //可视距离

    viewDome.domeType = SuperMap3D.ViewDomeType[state.domeType]; //开敞度类型,分为可视部分、不可视部分, 全部显示

    viewDome.visibleAreaColor = SuperMap3D.Color.fromCssColorString(state.visibleAreaColor); //可视部颜色

    viewDome.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(state.hiddenAreaColor); //隐藏部分颜色

    viewDome.startAngle = Number(state.startAngle); //起始角度

    viewDome.endAngle = Number(state.endAngle); //终止角度

    viewDome.isClosed = state.isClosed; //封口

    viewDome.build(); //执行开敞度分析
  }

  ;
  /*
   ***分析模块***
  */
  //分析

  function analysis() {
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur");

    if (tipFlag) {
      //只提示一次
      window.tooltip.showAt(' <p>点击鼠标左键确认分析位置</p>', '250px');
      tipFlag = false;
    }

    addPoint(); //鼠标左键事件监听

    scene.eventManager.addEventListener("CLICK", LEFT_CLICK, true);
    scene.eventManager.addEventListener("MOUSE_MOVE", MOUSE_MOVE, true);
  }

  ; //   点击左键确认观察者点

  function LEFT_CLICK(e) {
    scene.enableCursorStyle = true;
    document.body.classList.remove("measureCur"); //获取点击位置笛卡尔坐标

    let position = scene.pickPosition(e.message.position); //将笛卡尔坐标转化为经纬度坐标

    let positions = tool.CartesiantoDegrees(position);
    positions[2] += Number(state.addHeight); //点击位置同步到显示框

    state.viewPosition = {
      longitude: positions[0].toFixed(6),
      latitude: positions[1].toFixed(6),
      height: positions[2].toFixed(2)
    };
    viewDome.viewPosition = positions;
    viewDome.build();
    window.tooltip.setVisible(false);
    scene.eventManager.removeEventListener("CLICK", LEFT_CLICK);
    scene.eventManager.removeEventListener("MOUSE_MOVE", MOUSE_MOVE);
    viewDome.startAngle = Number(state.startAngle); //改变属性后，加上才能更新效果（应该是缺陷）
  }

  ;

  function addPoint() {
    scene.trackingLayer.removeById('opennessPoint');
    scene.trackingLayer.add({
      id: 'opennessPoint',
      point: new SuperMap3D.PointGraphics({
        color: SuperMap3D.Color.fromCssColorString('rgba(238,114,22,1)'),
        pixelSize: 8
      }),
      // position: p
      position: new SuperMap3D.CallbackProperty(() => {
        return Entypositions;
      }, false)
    });
  } // 鼠标移动实时分析


  function MOUSE_MOVE(e) {
    Entypositions = scene.pickPosition(e.message.endPosition);
  } //改变经纬度动态移动


  function move(val) {}

  ; // 清除

  function clear() {
    scene.trackingLayer.removeById('opennessPoint');
    document.body.classList.remove("measureCur");
    window.tooltip.setVisible(false);
    state.viewPosition = null; // viewDome.clear()

    viewDome.viewPosition = [0, 0, 0]; //初始化视点位置

    viewDome.startAngle = Number(state.startAngle); //起始角度
  }

  ; // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.viewDomeRadius, val => {
    if (val == "") return;
    viewDome.distance = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.domeType, val => {
    if (val == "") return;
    viewDome.domeType = SuperMap3D.ViewDomeType[val];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.isClosed, val => {
    if (val == "") return;
    viewDome.isClosed = val;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.startAngle, val => {
    if (val == "") return;
    viewDome.startAngle = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.endAngle, val => {
    if (val == "") return;
    viewDome.endAngle = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibleAreaColor, val => {
    if (val == "") return;
    let VisibleColor = SuperMap3D.Color.fromCssColorString(val);
    viewDome.visibleAreaColor = VisibleColor;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.hiddenAreaColor, val => {
    if (val == "") return;
    let HiddenColor = SuperMap3D.Color.fromCssColorString(val);
    viewDome.hiddenAreaColor = HiddenColor;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.addHeight, (val, oldval) => {
    let h = val - oldval;
    h = SuperMap3D.defaultValue(h, 0);
    viewDome.viewPosition[2] += Number(h);
    Entypositions = SuperMap3D.Cartesian3.fromDegrees(viewDome.viewPosition[0], viewDome.viewPosition[1], viewDome.viewPosition[2]);
    viewDome.startAngle = Number(state.startAngle);
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    clear();
    viewDome.destroy();
    viewDome = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    analysis,
    clear
  };
}

;
/* harmony default export */ var openness_openness = (openness);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/openness/openness.vue?vue&type=script&lang=js



/* harmony default export */ var opennessvue_type_script_lang_js = ({
  name: "Sm3dOpenness",
  components: {
    Panel: panel
  },
  props: {
    //附加高度
    addHeight: {
      type: Number,
      default: 1
    },
    //分析位置
    viewPosition: {
      type: Array
    },
    //分析半径
    viewDomeRadius: {
      type: Number,
      default: 100
    },
    //分析类型
    domeType: {
      type: String,
      default: "ALLDOME"
    },
    //是否封口
    isClosed: {
      type: Boolean,
      default: false
    },
    //可见区颜色
    visibleAreaColor: {
      type: String,
      default: "rgba(9,199,112,0.5)"
    },
    //不可见颜色
    hiddenAreaColor: {
      type: String,
      default: "rgba(238,114,22,0.5)"
    },
    //开始角度
    startAngle: {
      type: Number,
      default: 10
    },
    //终止角度
    endAngle: {
      type: Number,
      default: 360
    }
  },

  setup(props) {
    let {
      addHeight,
      //附加高度
      viewDomeRadius,
      //分析半径
      domeType,
      //分析类型
      isClosed,
      //是否封口
      visibleAreaColor,
      //可见区颜色
      hiddenAreaColor,
      //不可见颜色
      startAngle,
      //开始角度
      endAngle,
      //终止角度
      analysis,
      clear
    } = openness_openness(props); // 滑块提示函数

    function formatTooltip(val) {
      return val + "米";
    }

    return {
      addHeight,
      //附加高度
      viewDomeRadius,
      //分析半径
      domeType,
      //分析类型
      isClosed,
      //是否封口
      visibleAreaColor,
      //可见区颜色
      hiddenAreaColor,
      //不可见颜色
      startAngle,
      //开始角度
      endAngle,
      //终止角度
      analysis,
      clear,
      formatTooltip
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/openness/openness.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/openness/openness.vue




;
const openness_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(opennessvue_type_script_lang_js, [['render',opennessvue_type_template_id_7e949a4d_render]])

/* harmony default export */ var analysis_3d_openness_openness = (openness_exports_);
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/openness/index.js
// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

analysis_3d_openness_openness.install = function (app) {
  app.component(analysis_3d_openness_openness.name, analysis_3d_openness_openness);
};

/* harmony default export */ var analysis_3d_openness = (analysis_3d_openness_openness);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/sight-line/sight-line.vue?vue&type=template&id=1f2c0970

const sight_linevue_type_template_id_1f2c0970_hoisted_1 = {
  class: "sm-global-row"
};

const sight_linevue_type_template_id_1f2c0970_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", {
  class: "sm-title"
}, "线宽度", -1);

const sight_linevue_type_template_id_1f2c0970_hoisted_3 = {
  class: "sm-global-row"
};

const sight_linevue_type_template_id_1f2c0970_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "可视区颜色", -1);

const sight_linevue_type_template_id_1f2c0970_hoisted_5 = {
  class: "sm-global-row"
};

const sight_linevue_type_template_id_1f2c0970_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "不可视颜色", -1);

const sight_linevue_type_template_id_1f2c0970_hoisted_7 = {
  class: "sm-global-button"
};

const sight_linevue_type_template_id_1f2c0970_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("分析");

const sight_linevue_type_template_id_1f2c0970_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function sight_linevue_type_template_id_1f2c0970_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 250
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", sight_linevue_type_template_id_1f2c0970_hoisted_1, [sight_linevue_type_template_id_1f2c0970_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.lineWidth,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.lineWidth = $event),
      min: 1,
      step: 1,
      max: 10
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", sight_linevue_type_template_id_1f2c0970_hoisted_3, [sight_linevue_type_template_id_1f2c0970_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      class: "sm-global-color",
      type: "color",
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $setup.visibleColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.visibleColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", sight_linevue_type_template_id_1f2c0970_hoisted_5, [sight_linevue_type_template_id_1f2c0970_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      class: "sm-global-color",
      type: "color",
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.hiddenColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.hiddenColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", sight_linevue_type_template_id_1f2c0970_hoisted_7, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      onClick: $setup.analysis,
      size: "small"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [sight_linevue_type_template_id_1f2c0970_hoisted_8]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      onClick: $setup.clear,
      size: "small"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [sight_linevue_type_template_id_1f2c0970_hoisted_9]),
      _: 1
    }, 8, ["onClick"])])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/sight-line/sight-line.vue?vue&type=template&id=1f2c0970

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/sight-line/sight-line.js

// 引入依赖

 //提示等工具

 //语言资源

 //简单局部状态管理   

 // import DragEntity from '../../../js/common/dragEntity.js'

function sightLine(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    viewPosition: null,
    visibleColor: "rgb(0, 200, 0)",
    hiddenColor: "rgb(200, 0, 0)",
    barrierColor: "rgba(255, 186, 1, 1)",
    highlightBarrier: false,
    lineWidth: 3,
    showBarrierPoints: true
  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据
  // let  sightline, dragEntity


  let sightline;
  let timer,
      tipFlag = true,
      clickFlag = false,
      ObjectIds = [];
  let point_index = 0,
      sightTargetPoints = [],
      sightBarrierPoints = [],
      sightBarrierPointsColor = [];
  let viewPointPosition;

  if (storeState.isViewer) {
    // if (!window.tooltip) {
    //     window.tooltip = createTooltip(scene._element);
    // }
    init();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      if (!window.tooltip) {
        window.tooltip = tool_tooltip(scene._element);
      }

      init();
    }
  });

  function init() {
    sightline = new SuperMap3D.Sightline(scene);
    sightline.visibleColor = SuperMap3D.Color.fromCssColorString(state.visibleColor);
    sightline.hiddenColor = SuperMap3D.Color.fromCssColorString(state.hiddenColor);
    sightline.lineWidth = Number(state.lineWidth); // dragEntity = new DragEntity(scene, 'sightPoint_', _moveEndCallBack, _leftUpCallBack)
  }

  ;
  /*
   ***分析模块***
  */
  //分析

  function analysis() {
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur"); // if (tipFlag) {   //只提示一次
    //     window.tooltip.showAt(' <p>点击鼠标左键确认观察者位置</p><p>再点击左键确认目标位置</p> <p>右键单击结束分析</p>', '400px');
    //     tipFlag = false
    // }
    // dragEntity.removeEventListener() //清除编辑交互事件
    //鼠标左键事件监听

    scene.eventManager.addEventListener("CLICK", LEFT_CLICK, true);
    scene.eventManager.addEventListener("MOUSE_MOVE", MOUSE_MOVE);
    scene.eventManager.addEventListener("RIGHT_CLICK", RIGHT_CLICK, true);
  }

  ; //   点击左键确认观察者点和目标点

  function LEFT_CLICK(e) {
    clickFlag = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      clickFlag = false;
    }, 20); //添加点时延迟移动添加目标点

    let position = scene.pickPosition(e.message.position);
    let p = tool.CartesiantoDegrees(position); // 将获取的点的位置转化成经纬度

    if (p[2] < 0) {
      p[2] = 0;
      position = SuperMap3D.Cartesian3.fromDegrees(p[0], p[1], p[2]);
    }

    if (state.viewPosition) {
      sightline.addTargetPoint({
        position: p,
        name: "sightPoint_Target" + point_index
      });
      sightTargetPoints.push(position);
      point_index += 1; // 添加障碍点

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          sightline.getBarrierPoint('sightPoint_Target' + point_index, obj => {
            addSightPoint_Target(point_index); //添加目标点 

            if (obj && obj.position) {
              obj.position.height += 2;
              let position = SuperMap3D.Cartographic.toCartesian(obj.position);
              sightBarrierPoints.push(position); //记录障碍点信息
              // 记录障碍物id

              let ObjectId = sightline.getObjectIds();

              if (!ObjectId) {
                return;
              }

              ObjectIds.push(ObjectId);
              sightBarrierPointsColor.push(state.hiddenColor);
            } else {
              sightBarrierPoints.push({
                x: 6378137,
                y: 0,
                z: 0
              });
              sightBarrierPointsColor.push(state.visibleColor);
            }

            addBarrierCone(point_index); //添加障碍点
          });
        });
      });
    } else {
      sightline.viewPosition = p; // 观察者信息记录

      state.viewPosition = p;
      sightline.build();
      addSightPoint_view();
      viewPointPosition = position;
    }
  }

  ; // 添加观察点

  function addSightPoint_view() {
    scene.trackingLayer.add({
      id: 'sightPoint_view',
      point: new SuperMap3D.PointGraphics({
        color: SuperMap3D.Color.fromCssColorString(state.barrierColor),
        pixelSize: 10
      }),
      position: new SuperMap3D.CallbackProperty(() => {
        return viewPointPosition;
      }, false)
    });
  }

  function addSightPoint_Target(i) {
    scene.trackingLayer.add({
      id: 'sightPoint_Target' + i,
      point: new SuperMap3D.PointGraphics({
        // color: SuperMap3D.Color.fromCssColorString(state.barrierColor),
        color: new SuperMap3D.CallbackProperty(() => {
          return SuperMap3D.Color.fromCssColorString(sightBarrierPointsColor[i]);
        }, false),
        pixelSize: 10
      }),
      position: new SuperMap3D.CallbackProperty(() => {
        return sightTargetPoints[i];
      }, false)
    });
  } // 绘制障碍点圆锥


  let barrierCones = [];

  function addBarrierCone(i) {
    let ab = scene.trackingLayer.add({
      name: 'Point_Barrier' + i,
      position: new SuperMap3D.CallbackProperty(() => {
        return sightBarrierPoints[i];
      }, false),
      // orientation: SuperMap3D.Transforms.headingPitchRollQuaternion(sightBarrierPoints[i], new SuperMap3D.HeadingPitchRoll(0, 0, Math.PI)),
      cylinder: {
        length: 3,
        topRadius: 2,
        bottomRadius: 0,
        material: SuperMap3D.Color.fromCssColorString("#d60000")
      }
    });
    barrierCones.push(ab);
  } // 鼠标移动实时分析


  function MOUSE_MOVE(e) {
    if (!state.viewPosition || clickFlag) return; //获取鼠标屏幕坐标,并将其转化成笛卡尔坐标

    let endPosition = scene.pickPosition(e.message.endPosition);
    let p = tool.CartesiantoDegrees(endPosition); // 将获取的点的位置转化成经纬度

    sightline.addTargetPoint({
      position: p,
      name: "point"
    });
  } // //鼠标右键确认分析距离和方向，不再执行鼠标移动事件中对可视域的操作


  function RIGHT_CLICK() {
    // window.tooltip.setVisible(false);
    document.body.classList.remove("measureCur");

    if (state.highlightBarrier) {
      getHighlightBarriers();
    }

    sightline.removeTargetPoint('point');
    sightline.build(); //拖拽编辑点
    // dragEntity.addEventListener()

    scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //移除鼠标点击事件监听

    scene.eventManager.removeEventListener("MOUSE_MOVE", MOUSE_MOVE); //移除鼠标点击事件监听

    scene.eventManager.removeEventListener("RIGHT_CLICK", RIGHT_CLICK); //移除鼠标点击事件监听
  }

  ;

  function _moveEndCallBack(Entity) {
    if (!Entity.id) return;

    if (Entity.id.includes('sightPoint_Target')) {
      let p = tool.CartesiantoDegrees(Entity.position._value); // 将获取的点的位置转化成经纬度

      sightline.addTargetPoint({
        position: p,
        name: Entity.id
      });
    } else if (Entity.id.includes('sightPoint_view')) {
      let p = tool.CartesiantoDegrees(Entity.position._value); // 将获取的点的位置转化成经纬度

      sightline.viewPosition = p;
    }
  }

  function _leftUpCallBack(Entity) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!Entity.id) return;

        if (Entity.id.includes('sightPoint_view')) {
          for (let i = 0, j = sightBarrierPoints.length; i < j; i++) {
            setBarrierPoints('sightPoint_Target' + i, true);
          }
        } else if (Entity.id.includes('sightPoint_Target')) {
          setBarrierPoints(Entity.id);
        }

        function setBarrierPoints(Barrier_id, isPointView) {
          sightline.getBarrierPoint(Barrier_id, obj => {
            let index = Barrier_id.charAt(Barrier_id.length - 1);

            if (obj && obj.position) {
              obj.position.height += 2;
              let position = SuperMap3D.Cartographic.toCartesian(obj.position);
              let distance;

              if (isPointView) {
                let lan_lon = sightline._targetPoints.values[index];
                let Cartesian = SuperMap3D.Cartesian3.fromDegrees(lan_lon[0], lan_lon[1], lan_lon[2]);
                distance = SuperMap3D.Cartesian3.distance(Cartesian, position);
              } else {
                distance = SuperMap3D.Cartesian3.distance(Entity.position._value, position);
              }

              if (distance >= 2.5) {
                sightBarrierPoints[index] = position; //更新障碍点信息

                sightBarrierPointsColor[index] = state.hiddenColor;
              } else {
                sightBarrierPoints[index] = {
                  x: 6378137,
                  y: 0,
                  z: 0
                }; //更新障碍点信息

                sightBarrierPointsColor[index] = state.visibleColor;
              } // 更新障碍物id


              let ObjectId = sightline.getObjectIds();
              ObjectIds.splice(index, 1, ObjectId);

              if (state.highlightBarrier) {
                for (let layer of scene.layers.layerQueue) {
                  layer.removeAllObjsColor();
                }

                getHighlightBarriers();
              }
            } else {
              sightBarrierPoints[index] = {
                x: 6378137,
                y: 0,
                z: 0
              }; //更新障碍点信息

              sightBarrierPointsColor[index] = state.visibleColor;
            }
          });
        }
      });
    });
  } // 获取障碍物


  function getHighlightBarriers(barrierColor) {
    let color = SuperMap3D.defaultValue(barrierColor, SuperMap3D.Color.fromCssColorString(state.barrierColor));

    try {
      if (ObjectIds.length === 0) return;
      ObjectIds.forEach(ObjectId => {
        for (let index in ObjectId) {
          let layer = scene.layers.findByIndex(Number(index) - 3); // 底层索引从3开始

          let ids = ObjectId[index];
          layer.setObjsColor(ids, color);
        }
      });
    } catch (error) {
      console.log(error);
    }
  } // 清除


  function clear() {
    sightline.removeAllTargetPoint();

    for (let layer of scene.layers.layerQueue) {
      layer.removeAllObjsColor();
    }

    point_index = 0;
    ObjectIds.length = 0;
    sightTargetPoints.length = 0;
    sightBarrierPoints.length = 0;
    sightBarrierPointsColor.length = 0; // dragEntity.removeEventListener()

    scene.trackingLayer.removeAll();
    document.body.classList.remove("measureCur"); // window.tooltip.setVisible(false);

    state.viewPosition = null;
    barrierCones.length = 0;
    scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //移除鼠标点击事件监听

    scene.eventManager.removeEventListener("MOUSE_MOVE", MOUSE_MOVE); //移除鼠标点击事件监听

    scene.eventManager.removeEventListener("RIGHT_CLICK", RIGHT_CLICK); //移除鼠标点击事件监听
  }

  ; // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.lineWidth, val => {
    if (sightline) sightline.lineWidth = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibleColor, val => {
    if (sightline) sightline.visibleColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.hiddenColor, val => {
    if (sightline) sightline.hiddenColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.barrierColor, val => {
    if (ObjectIds.length === 0) return;
    let color = SuperMap3D.Color.fromCssColorString(val);
    getHighlightBarriers(color);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.highlightBarrier, newValue => {
    if (newValue) {
      getHighlightBarriers();
    } else {
      for (let layer of scene.layers.layerQueue) {
        layer.removeAllObjsColor();
      }
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.showBarrierPoints, val => {
    if (barrierCones.length === 0) return;
    barrierCones.forEach(b => {
      b.show = val;
    });
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    clear();
    sightline = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    analysis,
    clear
  };
}

;
/* harmony default export */ var sight_line = (sightLine);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/sight-line/sight-line.vue?vue&type=script&lang=js



/* harmony default export */ var sight_linevue_type_script_lang_js = ({
  name: "Sm3dSightline",
  components: {
    Panel: panel
  },
  props: {
    //s初始视点位置
    viewPosition: {
      type: Array
    },
    //可见部分颜色
    visibleColor: {
      type: String,
      default: "#00C800"
    },
    //不可见颜色
    hiddenColor: {
      type: String,
      default: "#C80000"
    },
    //高亮障碍物颜色
    barrierColor: {
      type: String,
      default: "#FFBA01"
    },
    //是否显示高亮障碍物
    highlightBarrier: {
      type: Boolean,
      default: false
    },
    //通视线宽
    lineWidth: {
      type: Number,
      default: 3
    },
    showBarrierPoints: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    let {
      lineWidth,
      visibleColor,
      hiddenColor,
      barrierColor,
      highlightBarrier,
      showBarrierPoints,
      analysis,
      clear
    } = sight_line(props);
    return {
      lineWidth,
      visibleColor,
      hiddenColor,
      barrierColor,
      highlightBarrier,
      showBarrierPoints,
      analysis,
      clear
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/sight-line/sight-line.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/sight-line/sight-line.vue




;
const sight_line_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(sight_linevue_type_script_lang_js, [['render',sight_linevue_type_template_id_1f2c0970_render]])

/* harmony default export */ var sight_line_sight_line = (sight_line_exports_);
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/sight-line/index.js
// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

sight_line_sight_line.install = function (app) {
  app.component(sight_line_sight_line.name, sight_line_sight_line);
};

/* harmony default export */ var analysis_3d_sight_line = (sight_line_sight_line);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/profile/profile.vue?vue&type=template&id=b16efca2&scoped=true


const profilevue_type_template_id_b16efca2_scoped_true_withScopeId = n => (_pushScopeId("data-v-b16efca2"), n = n(), _popScopeId(), n);

const profilevue_type_template_id_b16efca2_scoped_true_hoisted_1 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("剖面信息");

const profilevue_type_template_id_b16efca2_scoped_true_hoisted_2 = {
  class: "sm-global-button"
};

const profilevue_type_template_id_b16efca2_scoped_true_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("分析");

const profilevue_type_template_id_b16efca2_scoped_true_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

const profilevue_type_template_id_b16efca2_scoped_true_hoisted_5 = {
  ref: "echarts_box",
  id: "echarts_box"
};
function profilevue_type_template_id_b16efca2_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_checkbox = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-checkbox");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_Panel, {
    pWidth: 150
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_checkbox, {
      checked: $setup.profile2d,
      "onUpdate:checked": _cache[0] || (_cache[0] = $event => $setup.profile2d = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [profilevue_type_template_id_b16efca2_scoped_true_hoisted_1]),
      _: 1
    }, 8, ["checked"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", profilevue_type_template_id_b16efca2_scoped_true_hoisted_2, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.analysis
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [profilevue_type_template_id_b16efca2_scoped_true_hoisted_3]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clear
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [profilevue_type_template_id_b16efca2_scoped_true_hoisted_4]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", profilevue_type_template_id_b16efca2_scoped_true_hoisted_5, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.profile2d]])], 64);
}
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/profile/profile.vue?vue&type=template&id=b16efca2&scoped=true

;// CONCATENATED MODULE: ./globalCom/js/common/drawHandler.js
//DrawHandler封装


 //语言资源

/**
 * 初始化
 * DrawMode：类型
 * clampMode：模式
 */

const initHandler = function (DrawMode, clampMode) {
  let clampmode = 0;

  if (clampMode) {
    clampmode = clampMode;
  }

  ;

  switch (DrawMode) {
    case "Point":
      window.handlerPoint = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Point);
      break;

    case "Polyline":
      window.handlerPolyline = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Line, clampmode);
      break;

    case "Polygon":
      window.handlerPolygon = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Polygon, clampmode);
      break;

    case "Marker":
      window.handlerMarker = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Marker, clampmode);
      break;

    case "Box":
      window.handlerBox = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Box, clampmode);
      break;

    default:
      null;
  }

  ; // if (!window.tooltip) {
  //     window.tooltip = createTooltip(scene._element);
  // }
  // 半透线创建

  if (!window.polylineCollection) {
    window.polylineCollection = new SuperMap3D.PolylineCollection({
      translucentRS: SuperMap3D.RenderState.fromCache({
        depthMask: false,
        depthTest: {
          enabled: false
        }
      })
    });
    window.polylineTransparent = window.polylineCollection.add({
      width: 2,
      material: SuperMap3D.Material.fromType(SuperMap3D.Material.ColorType, {
        color: SuperMap3D.Color.fromCssColorString("#51ff00").withAlpha(0.3)
      })
    });
    scene.primitives.add(window.polylineCollection);
  }
};
/**
 * 绘制
 * PolyType：类型 
 * lineVisib：绘制时是否显示绘制线（boolean）
 * toolTipObj：绘制时提示内容{beforeDrawing：绘制开始前提示(string)，isDrawing：正在绘制时提示,即绘制过程中（string）}
 */


const handlerDrawing = function (PolyType, lineVisib, toolTipObj) {
  let lineVisible = true;

  if (lineVisib === false) {
    lineVisible = lineVisib;
  }

  let DrawHandler = judgeDrawHandlerType(PolyType); //获取操作对象

  return new Promise((resolve, reject) => {
    //做一些异步操作
    // let tooltip = window.tooltip;
    let clearActFn = DrawHandler.activeEvt.addEventListener(isActive => {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = '';

        if (PolyType == "Point" || PolyType == "Marker") {
          document.body.classList.add("measureCur");
        } else {
          document.body.classList.add("drawCur");
        }
      } else {
        scene.enableCursorStyle = true; // tooltip.setVisible(false);

        if (PolyType == "Point" || PolyType == "Marker") {
          document.body.classList.remove('measureCur');
        } else {
          document.body.classList.remove('drawCur');
        }
      }
    });
    let clearMovFn = DrawHandler.movingEvt.addEventListener(windowPosition => {
      if (windowPosition.x < 200 && windowPosition.y < 150) {
        // tooltip.setVisible(false);
        return;
      }

      ; // if (tiptext) {
      //     tooltip.showAt(windowPosition, tiptext);
      // } else if (toolTipObj && toolTipObj.beforeDrawing) {
      //     tooltip.showAt(windowPosition, toolTipObj.beforeDrawing);
      // }else if (DrawHandler.isDrawing && toolTipObj.isDrawing) {
      //     tooltip.showAt(windowPosition, toolTipObj.isDrawing);
      // }

      if (DrawHandler.polyline && DrawHandler.isDrawing) {
        let p = [...DrawHandler.polyline.positions];

        if (PolyType == "Polygon") {
          //画面时，需要首尾相连
          p.push(p[0]);
        }

        ;
        window.polylineTransparent.show = true;
        window.polylineTransparent.positions = p;
      }
    });
    let clearDrawFn = DrawHandler.drawEvt.addEventListener(result => {
      if (!result.object.positions && PolyType != "Point" && PolyType != "Box") {
        // tooltip.showAt(result, '<p>请绘制正确的多边形</p>');
        DrawHandler.polygon.show = false;
        DrawHandler.polyline.show = false;
        DrawHandler.deactivate();
        DrawHandler.activate();
        return;
      }

      ; // tooltip.setVisible(false);

      if (PolyType == "Box") {
        resolve({
          result: result
        });
        return;
      }

      if (PolyType == "Point" || PolyType == "Marker") {
        DrawHandler.clear(); // 不显示绘制的点

        resolve({
          result: result
        });
      } else {
        //半透线
        window.polylineTransparent.show = lineVisible;

        if (lineVisible) {
          if (PolyType == "Polygon" && lineVisible) {
            DrawHandler.polygon._polygon._material._color._value.alpha = 0.1; //绘制面透明度

            let p2 = [...result.object.positions]; //画面时，需要首尾相连

            p2.push(p2[0]);
            window.polylineTransparent.positions = p2;
          }

          ;
        }

        let positions = CartesiantoDegrees(result.object.positions);
        resolve({
          result: result,
          positions: positions
        });
      }

      ; //清除监听事件

      clearActFn();
      clearMovFn();
      clearDrawFn();
    });
  });
}; //清除


const clearHandlerDrawing = PolyType => {
  let DrawHandler;

  if (!PolyType) {
    DrawHandler = window.handlerPolygon;
  } else {
    DrawHandler = judgeDrawHandlerType(PolyType);
  }

  ;
  if (!DrawHandler) return;
  DrawHandler.deactivate();
  DrawHandler.clear();
  scene.enableCursorStyle = true; // document.body.classList.remove("drawCur");
  // document.body.classList.remove("measureCur");
  // window.tooltip.setVisible(false);

  if (window.polylineTransparent) {
    window.polylineTransparent.show = false;
  }
}; // 类型判断


const judgeDrawHandlerType = PolyType => {
  let DrawHandler;

  switch (PolyType) {
    case "Point":
      DrawHandler = window.handlerPoint;
      break;

    case "Polyline":
      DrawHandler = window.handlerPolyline;
      break;

    case "Polygon":
      DrawHandler = window.handlerPolygon;
      break;

    case "Marker":
      DrawHandler = window.handlerMarker;
      break;

    case "Box":
      DrawHandler = window.handlerBox;
      break;

    default:
      null;
  }

  return DrawHandler;
};

/* harmony default export */ var drawHandler = ({
  initHandler,
  handlerDrawing,
  clearHandlerDrawing
});

;// CONCATENATED MODULE: ./globalCom/js/common/editHandler.js

/**
 * 编辑功能
 * EditPositions：编辑前的区域，用于编辑后的比较变化（array）
 * isEditZ：是否编辑z轴
 * callback：编辑后触发的回调函数
 * 注意：为了更好的性能，编辑功能是全局的唯一的，所以只能进行当前操作的编辑
 */

const Edit = (EditPositions, isEditZ, callback) => {
  if (!window.selectHandler) {
    window.selectHandler = new SuperMap3D.ScreenSpaceEventHandler(scene.canvas);
  }

  let selectHandler = window.selectHandler;

  if (window.handlerPolygon && window.handlerPolygon.polygon) {
    window.handlerPolygon.polygon.show = true;
  }

  selectHandler.setInputAction(() => {
    let entity = scene.selectedEntity;
    let editHandler = window.editHandler;

    if (!entity) {
      if (editHandler) {
        editHandler && editHandler.deactivate();
      }

      return;
    }

    if (!editHandler) {
      window.editHandler = new SuperMap3D.EditHandler(scene, entity);

      if (isEditZ) {
        window.editHandler.isEditZ = isEditZ;
      } else {
        window.editHandler.isEditZ = false;
      }

      window.editHandler.activate();
    } else {
      editHandler.deactivate();
      editHandler.setEditObject(entity);
      editHandler.activate();
    }

    selectHandler.setInputAction(() => {
      entity = scene.selectedEntity;
      editHandler = window.editHandler;

      if (!entity) {
        return;
      }

      if (editHandler && editHandler._positions) {
        let positions = CartesiantoDegrees(editHandler._positions);

        if (isEqualArr(EditPositions, positions)) {
          return;
        } else {
          EditPositions = positions;

          if (callback) {
            callback(positions, window.editHandler);
          }
        }

        if (window.handlerPolygon && window.handlerPolygon.polygon && window.handlerPolygon.polygon.show) {
          let p3 = [...editHandler._positions];
          p3.push(p3[0]);
          window.polylineTransparent.positions = p3; //半透线
        }
      }
    }, SuperMap3D.ScreenSpaceEventType.LEFT_UP);
  }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
};

const clearEditHandler = () => {
  if (window.editHandler) {
    window.editHandler.deactivate();
    window.editHandler.clear();
  }

  ;

  if (window.selectHandler) {
    //移除鼠标移动事件监听
    window.selectHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_UP);
    window.selectHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
    window.selectHandler.destroy();
    window.selectHandler = null;
  }
};


;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/profile/profile.js
// 引入依赖

 //提示等工具

 //语言资源

 //简单局部状态管理

 //公共handler.js

 //公共handler.js



function profile(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    profile2d: false,
    //显示剖面分析结果
    polylineColor: "rgb(250, 213, 6)",
    //贴线颜色
    polylineWidth: 5,
    //贴线宽度
    initEchartsOption: null,
    //初始化自定义echarts配置对象
    updateEchartsOption: null //自定义更新echarts配置对象

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let myChart, count, //插值点个数
  Entypositions; //当前图标的位置

  let tipFlag = true; //提示操作提醒一次

  let LatAndLons = []; //所有点的经纬度

  let Cartesians = []; //所有点的笛卡尔

  let EditPositions = null; //编辑时保存之前位置

  const echarts_box = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
    initMyChart();
  });

  if (storeState.isViewer) {
    if (!window.tooltip) {
      window.tooltip = tool_tooltip(scene._element);
    }
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      if (!window.tooltip) {
        window.tooltip = tool_tooltip(scene._element);
      }
    }
  }); //初始化echarts

  function initMyChart() {
    if (window.echarts) {
      if (!myChart) {
        myChart = window.echarts.init(echarts_box.value); //初始化echarts

        window.onresize = function () {
          myChart.resize(); //自适应屏幕
        };
      }
    } else {
      tool.Message.warnMsg(lang.EchartsErr);
      return;
    }

    if (state.initEchartsOption) {
      myChart.setOption(state.initEchartsOption);
      return;
    }

    myChart.setOption({
      title: {
        text: "剖面分析",
        textStyle: {
          fontSize: 14
        }
      },
      grid: {
        left: 30,
        right: 0,
        top: 30,
        bottom: 8
      },
      tooltip: {},
      xAxis: {
        data: []
      },
      yAxis: {
        data: []
      },
      series: [{
        type: "bar",
        data: []
      }]
    });
  }

  ;
  /*
   ***分析模块***
  */
  //分析

  function analysis() {
    if (tipFlag) {
      //只提示一次
      tooltip.showAt(' <p>点击鼠标左键开始绘制</p> <p>单击右键结束分析</p><p>选中可进行编辑</p>', '250px');
      tipFlag = false;
    }

    if (!window.handlerPolyline) {
      initHandler("Polyline");
    }

    handlerDrawing("Polyline").then(res => {
      myChart.showLoading();
      EditPositions = res.positions;
      DrawPolylineUpdate(res.positions); //划线效果

      let handlerPolyline = window.handlerPolyline;
      handlerPolyline.polyline.show = false;
      window.polylineTransparent.show = false; //半透线隐藏

      handlerPolyline.deactivate();
      updataProfile3D('', res.result.object); //更新剖面

      Edit(EditPositions, false, updataProfile3D); //编辑功能

      tooltip.setVisible(false);
    }, err => {
      console.log(err);
    });
    window.handlerPolyline.activate();
  }

  ; // 绘制剖面分析的线

  function DrawPolylineUpdate(position) {
    scene.trackingLayer.removeById('polyline-profile');
    scene.trackingLayer.removeById('location4');
    let fullLineColor = SuperMap3D.Color.fromCssColorString(state.polylineColor);
    scene.trackingLayer.add({
      id: "polyline-profile",
      polyline: {
        positions: SuperMap3D.Cartesian3.fromDegreesArrayHeights(position),
        width: state.polylineWidth,
        material: fullLineColor,
        clampToGround: true //线贴地
        // classificationType: SuperMap3D.ClassificationType.S3M_TILE, //线面贴对象

      }
    });
    entityUpdate();
  }

  ; // 更新剖面分析二维图

  function updataProfile3D(position, line) {
    state.profile2d = true; //打开echarts

    myChart.clear();
    myChart.showLoading(); //position参数不起作用，是为了edit函数不冲突

    LatAndLons.length = 0; //清空之前的点数据

    Cartesians.length = 0; //清空之前的点数据

    let positions = []; //折线实现

    for (let i = 1, j = line._positions.length; i < j; i++) {
      let startPoint = line._positions[i - 1];
      let endPoint = line._positions[i];
      let d = SuperMap3D.Cartesian3.distance(startPoint, endPoint);
      getCount(parseInt(d));

      for (let i = 1, j = count; i <= j; i++) {
        positions.push(SuperMap3D.Cartesian3.lerp(startPoint, endPoint, i / count, new SuperMap3D.Cartesian3()));
      }
    }

    scene.clampToHeightMostDetailed(positions).then(clampedCartesians => {
      Cartesians = clampedCartesians; //记录所有点的笛卡尔坐标

      LatAndLons = tool.CartesiantoDegreesObjs(Cartesians); //记录所有点的经纬度坐标

      echartsOption(); //更新echarts
    });
  }

  ; //精度计算count插值

  function getCount(distance) {
    if (distance / 10000 > 1) {
      count = parseInt(distance / 100); //  (>10000)  100m
    } else if (distance / 1000 > 5) {
      count = parseInt(distance / 10); // (5000-10000)  10m
    } else if (distance / 1000 > 2) {
      count = parseInt(distance / 5); // (2000-5000)  5m
    } else if (distance / 1000 > 1) {
      count = parseInt(distance / 2); // (1000-2000)  2m
    } else if (distance / 100 > 5) {
      count = parseInt(distance / 1.5); //  (500-1000) 1.5m
    } else if (distance / 100 > 2) {
      count = distance; // (200-500) 1m 
    } else {
      count = distance * 2; //   (<200) 0.5m
    }
  } // 更新交互图标


  function entityUpdate() {
    if (scene.trackingLayer.getById("location4")) {
      return;
    }

    scene.trackingLayer.add({
      id: "location4",
      position: new SuperMap3D.CallbackProperty(() => {
        return Entypositions;
      }, false),
      billboard: {
        image: "src/style/images/location4.png",
        width: 30,
        height: 40,
        scaleByDistance: new SuperMap3D.NearFarScalar(10, 1.0, 2000, 0.6),
        eyeOffset: new SuperMap3D.Cartesian3(0, 1, -5) // heightReference :SuperMap3D.HeightReference.RELATIVE_TO_GROUND
        // disableDepthTestDistance :5000,
        // pixelOffset : new SuperMap3D.Cartesian2(0.0, 1.0),
        // pixelOffsetScaleByDistance : new SuperMap3D.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0)

      }
    });
  }

  ; // 更新图表数据

  function echartsOption() {
    myChart.hideLoading();
    myChart.clear();

    if (state.updateEchartsOption) {
      myChart.setOption(state.updateEchartsOption);
      return;
    }

    let option = {
      title: {
        text: "剖面信息",
        textStyle: {
          fontSize: 14
        }
      },
      // 定位
      grid: {
        left: 50,
        right: 8,
        top: 40,
        bottom: 20
      },
      // backgroundColor: "rgba(73,139,156,0.0)",
      tooltip: {
        trigger: "axis",
        backgroundColor: "#ffffff",
        textStyle: {
          color: "#000"
        },
        formatter: param => {
          let dataIndex = param[0].dataIndex;
          Entypositions = Cartesians[dataIndex];
          return ["当前位置: " + '<hr size=1 style="margin: 3px 0">', "经度: " + LatAndLons[dataIndex].longitude.toFixed(6) + "<br/>", "纬度: " + LatAndLons[dataIndex].latitude.toFixed(6) + "<br/>", "海拔: " + LatAndLons[dataIndex].height.toFixed(2) + "米" + "<br/>"].join("");
        }
      },
      xAxis: {
        data: LatAndLons.map(function (item, index) {
          return index;
        }),
        show: false
      },
      yAxis: {
        min: function (value) {
          return value.min < 20 ? 0 : Math.floor(value.min);
        },
        axisLabel: {
          interval: "auto",
          formatter: function (value, index) {
            return value > 999 ? (value / 1000).toFixed(2) + "km" : value + "m";
          }
        },
        splitLine: {
          show: true
        }
      },
      toolbox: {
        left: "right",
        feature: {
          dataZoom: {
            yAxisIndex: "none"
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [{
        type: "inside",
        xAxisIndex: 0,
        filterMode: "filter",
        start: 0,
        end: 100
      }],
      series: {
        name: "height",
        type: "line",
        data: LatAndLons.map(function (item) {
          return item.height;
        }),
        areaStyle: {}
      }
    };
    myChart.setOption(option);
  }

  ; // 清除

  function clear() {
    state.profile2d = false;
    scene.trackingLayer.removeById('location4');
    scene.trackingLayer.removeById('polyline-profile');
    myChart.clear();
    LatAndLons.length = 0; //清空之前的点数据

    Cartesians.length = 0; //清空之前的点数据

    clearHandlerDrawing("Polyline");
    clearEditHandler();
    initMyChart();
    tooltip.setVisible(false);
  }

  ; // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.profile2d, newValue => {
    if (!newValue || !myChart) {
      state.getSkyline2d = false;
      return;
    }

    setTimeout(() => {
      myChart.resize(); //自适应屏幕
    }, 200);
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    clear();
    myChart.clear();
    LatAndLons.length = 0; //清空之前的点数据

    Cartesians.length = 0; //清空之前的点数据
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    echarts_box,
    myChart,
    Entypositions,
    LatAndLons,
    //所有点的经纬度
    Cartesians,
    //所有点的笛卡尔
    analysis,
    clear
  };
}

;
/* harmony default export */ var profile_profile = (profile);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/profile/profile.vue?vue&type=script&lang=js



/* harmony default export */ var profilevue_type_script_lang_js = ({
  name: "Sm3dProfile",
  components: {
    Panel: panel
  },
  props: {
    //显示剖面分析结果
    profile2d: {
      type: Boolean,
      default: false
    },
    //贴线颜色
    polylineColor: {
      type: String,
      default: "rgb(250, 213, 6)"
    },
    //贴线宽度
    polylineWidth: {
      type: Number,
      default: 5
    },
    //初始化自定义echarts配置对象
    initEchartsOption: {
      type: Object
    },
    //自定义更新echarts配置对象
    updateEchartsOption: {
      type: Object
    }
  },

  setup(props) {
    let {
      profile2d,
      analysis,
      clear,
      echarts_box
    } = profile_profile(props);
    return {
      profile2d,
      analysis,
      clear,
      echarts_box
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/profile/profile.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/profile/profile.vue?vue&type=style&index=0&id=b16efca2&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/profile/profile.vue?vue&type=style&index=0&id=b16efca2&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/profile/profile.vue




;


const profile_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(profilevue_type_script_lang_js, [['render',profilevue_type_template_id_b16efca2_scoped_true_render],['__scopeId',"data-v-b16efca2"]])

/* harmony default export */ var analysis_3d_profile_profile = (profile_exports_);
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/profile/index.js
// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

analysis_3d_profile_profile.install = function (app) {
  app.component(analysis_3d_profile_profile.name, analysis_3d_profile_profile);
};

/* harmony default export */ var analysis_3d_profile = (analysis_3d_profile_profile);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/spatial-query3d/spatial-query3d.vue?vue&type=template&id=0b98e97c

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_1 = {
  class: "sm-global-row"
};

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "缩放", -1);

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_3 = {
  class: "sm-global-row"
};

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "查询图层", -1);

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_5 = {
  class: "sm-global-row"
};

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "位置模式", -1);

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("相交");

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("相离");

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("包含");

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_10 = {
  class: "sm-global-row"
};

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_11 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "Box填充颜色", -1);

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_12 = {
  class: "sm-global-row"
};

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_13 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "Box线框颜色", -1);

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_14 = {
  class: "sm-global-row"
};

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_15 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "查询结果颜色", -1);

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_16 = {
  class: "sm-global-button"
};

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_17 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("查询");

const spatial_query3dvue_type_template_id_0b98e97c_hoisted_18 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function spatial_query3dvue_type_template_id_0b98e97c_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 300
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", spatial_query3dvue_type_template_id_0b98e97c_hoisted_1, [spatial_query3dvue_type_template_id_0b98e97c_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.scale,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.scale = $event),
      min: 0.2,
      max: 10,
      step: 0.2,
      class: "sm-global-slider"
    }, null, 8, ["value", "min", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", spatial_query3dvue_type_template_id_0b98e97c_hoisted_3, [spatial_query3dvue_type_template_id_0b98e97c_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.selectedLayerName,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.selectedLayerName = $event),
      class: "sm-global-select"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.layerNames, (layer, index) => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_a_select_option, {
          key: index,
          value: layer
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(layer), 1)]),
          _: 2
        }, 1032, ["value"]);
      }), 128))]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", spatial_query3dvue_type_template_id_0b98e97c_hoisted_5, [spatial_query3dvue_type_template_id_0b98e97c_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.positionMode,
      "onUpdate:value": _cache[2] || (_cache[2] = $event => $setup.positionMode = $event),
      class: "sm-global-select"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "intersects"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [spatial_query3dvue_type_template_id_0b98e97c_hoisted_7]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "disjoint"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [spatial_query3dvue_type_template_id_0b98e97c_hoisted_8]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "contains"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [spatial_query3dvue_type_template_id_0b98e97c_hoisted_9]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", spatial_query3dvue_type_template_id_0b98e97c_hoisted_10, [spatial_query3dvue_type_template_id_0b98e97c_hoisted_11, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $setup.FillColor = $event),
      class: "sm-global-color"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.FillColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", spatial_query3dvue_type_template_id_0b98e97c_hoisted_12, [spatial_query3dvue_type_template_id_0b98e97c_hoisted_13, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.WireFrameColor = $event),
      class: "sm-global-color"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.WireFrameColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", spatial_query3dvue_type_template_id_0b98e97c_hoisted_14, [spatial_query3dvue_type_template_id_0b98e97c_hoisted_15, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $setup.searchColor = $event),
      class: "sm-global-color"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.searchColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", spatial_query3dvue_type_template_id_0b98e97c_hoisted_16, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.analysis
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [spatial_query3dvue_type_template_id_0b98e97c_hoisted_17]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clear
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [spatial_query3dvue_type_template_id_0b98e97c_hoisted_18]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/spatial-query3d/spatial-query3d.vue?vue&type=template&id=0b98e97c

;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/spatial-query3d/spatial-query3d.js

// 引入依赖

 //提示等工具

 //语言资源

 //简单局部状态管理



function spatialQuery3d(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    layerNames: [],
    //当前存在的可选择图层
    selectedLayerName: null,
    //默认选择图层名称
    scale: 3,
    //缩放
    positionMode: "intersects",
    //位置模式
    Xpitch: 0,
    //x旋转
    Yroll: 0,
    //y旋转
    Zheading: 0,
    //z旋转
    geometryType: "box",
    //选择模型类型
    drawType: "Fill_And_WireFrame",
    //模型显示类型
    FillColor: "#FFFB19",
    //模型填充颜色
    WireFrameColor: "#FFFF00",
    // 模型线框颜色
    searchColor: "#FFBA01",
    //查询结果颜色
    GeometryBodyNames: [],
    //场景存在的天际线体对象等存在的数组
    //默认geometry参数
    boxParameters: [100, 100, 100],
    sphereParameters: [100],
    coneParameters: [100, 200],
    cylinderParameters: [100, 100, 200],
    ellicpseParameters: [100, 50, 50],
    rotateOrigin: null,
    showTable: false,
    //属性查询表格显示
    atributesData: [],
    //属性查询值
    selectIds: [] //表格id选中

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let tipFlag = true;
  let layers, spatialQuery;
  let geometry,
      GeometryBodys = [];
  let editEntity, s3mInstanceColc;
  let modelUrl = 'public/data/s3m/box.s3m';
  let modelEditor;

  if (storeState.isViewer) {
    if (!window.tooltip) {
      window.tooltip = tool_tooltip(scene._element);
    }

    init();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      if (!window.tooltip) {
        window.tooltip = tool_tooltip(scene._element);
      }

      init();
    }
  }); //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    getLayerNames();
  });

  if (storeState.changeGeometrys) {
    setGeometryBodys();
  } //监听场景存在其他三维体


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeGeometrys, val => {
    setGeometryBodys();
  });

  function setGeometryBodys() {
    state.GeometryBodyNames = [];
    GeometryBodys = [];

    if (storeDate.geometrys) {
      for (const key in storeDate.geometrys) {
        GeometryBodys.push(key);
        let name = storeDate.geometrys[key].name;

        if (!state.GeometryBodyNames.includes(name)) {
          state.GeometryBodyNames.push(name);
        }
      }
    }

    if (state.GeometryBodyNames.length === 0) {
      if (props && props.geometryType) {
        state.geometryType = props.geometryType;
      } else {
        state.geometryType = 'box';
      }
    }
  }

  function init() {
    layers = scene.layers && scene.layers.layerQueue;
    spatialQuery = new SuperMap3D.SpatialQuery3D(scene);
    spatialQuery.outlineColor = SuperMap3D.Color.fromCssColorString(state.WireFrameColor);
    spatialQuery.fillColor = SuperMap3D.Color.fromCssColorString(state.FillColor);
    spatialQuery.fillStyle = SuperMap3D.FillStyle[state.drawType];
    getGeometry(state.geometryType);
    getPositionMode(state.positionMode);
    spatialQuery.build();
    setTimeout(() => {
      if (state.layerNames.length === 0) {
        getLayerNames();
      }
    }, 1000);
    s3mInstanceColc = new SuperMap3D.S3MInstanceCollection(scene._context);
    scene.primitives.add(s3mInstanceColc);
  }

  ;

  function getLayerNames() {
    let layer = getLayer(state.selectedLayerName);

    if (spatialQuery && spatialQuery.layers) {
      spatialQuery.layers = layer ? [layer] : [];
    }

    state.layerNames.length = 0;

    if (layers && layers.length > 0) {
      layers.forEach((element, index) => {
        if (!state.layerNames.includes(element._name)) {
          state.layerNames.push(element._name);
        }
      });

      if (!state.selectedLayerName) {
        state.selectedLayerName = state.layerNames[0];
      }
    }
  }
  /*
   ***分析模块***
  */
  //分析


  function analysis() {
    try {
      let layer = getLayer(state.selectedLayerName);

      if (!layer) {
        tool.Message.warnMsg('请选择需要查询的图层！');
        return;
      }

      spatialQuery.layers = [layer];
      tooltip.setVisible(false);
      layer.selectedColor = SuperMap3D.Color.fromCssColorString(state.searchColor);
      layer.selectColorType = SuperMap3D.SelectColorType.REPLACE;
      layer.selectEnabled = false;

      if (typeof state.geometryType === 'number') {
        //三维体查询,目前只支持这两种
        getGeometry(state.geometryType);
        spatialQuery.build();
        return;
      }

      spatialQuery.build();
      scene.enableCursorStyle = false;
      scene._element.style.cursor = "";
      document.body.classList.add("measureCur");

      if (tipFlag) {
        //只提示一次
        window.tooltip.showAt(' <p>点击鼠标左键确认查询位置</p>', '300px');
        tipFlag = false;
      } //鼠标左键事件监听


      scene.eventManager.addEventListener("CLICK", LEFT_CLICK, true);
    } catch (err) {
      console.error(err);
    }
  }

  ;

  function LEFT_CLICK(e) {
    document.body.classList.remove("measureCur"); // 获取鼠标点击的笛卡尔坐标

    let cartesian = scene.pickPosition(e.message.position);
    let position = tool.CartesiantoDegrees(cartesian); // 将获取的点的位置转化成经纬度

    setPosition(position); // let h = position[2] + 60;
    // addModel(SuperMap3D.Cartesian3.fromDegrees(position[0], position[1], h)); //添加编辑模型

    tooltip.setVisible(false);
    scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //移除鼠标点击事件监听

    setTimeout(() => {
      getAtributes();
    }, 1000);
  }

  function getLayer(layerName) {
    return layers.find(function (item, index) {
      return item._name === layerName;
    });
  }

  ;

  function getQueryIDs() {
    return spatialQuery.getQueryIDs();
  }

  ;

  function getGeometry(geometryType) {
    switch (geometryType) {
      case "box":
        {
          let p = state.boxParameters;
          geometry = new SuperMap3D.GeoBox(p[0], p[1], p[2]);
        }
        break;

      case "sphere":
        {
          let p = state.sphereParameters;
          geometry = new SuperMap3D.GeoSphere(p[0]);
        }
        break;

      case "cone":
        {
          let p = state.coneParameters;
          geometry = new SuperMap3D.GeoCone(p[0], p[1]);

          if (state.rotateOrigin) {
            geometry.rotateOrigin = getRotateOrigin();
          }
        }
        break;

      case "cylinder":
        {
          let p = state.cylinderParameters;
          geometry = new SuperMap3D.GeoCylinder(p[0], p[1], p[2]);
        }
        break;

      case "ellicpse":
        {
          let p = state.ellicpseParameters;
          geometry = new SuperMap3D.GeoEllipsoid(p[0], p[1], p[2]);
        }
        break;

      default:
        {
          geometry = new SuperMap3D.GeoModel3D();
          geometry.geoModel = storeDate.geometrys.SkyLineBody;
          spatialQuery.clear();
        }
        break;
    }

    spatialQuery.geometry = geometry;
  }

  ; //获取圆锥绕点旋转方式

  function getRotateOrigin() {
    let r = state.rotateOrigin;

    if (r == "APEX") {
      return SuperMap3D.RotationOrigin.APEX;
    } else {
      return SuperMap3D.RotationOrigin.CENTER;
    }
  }

  ;

  function getPositionMode(positionMode) {
    let mode;

    switch (positionMode) {
      case "intersects":
        mode = SuperMap3D.PositionMode.Intersects;
        break;

      case "disjoint":
        mode = SuperMap3D.PositionMode.Disjoint;
        break;

      case "contains":
        mode = SuperMap3D.PositionMode.Contains;
        break;

      default:
        mode = SuperMap3D.PositionMode.Intersects;
        break;
    }

    spatialQuery.positionMode = mode;
  }

  ; //设置查询中心点位置,可用于动态改变如机场预警范例

  function setPosition(newPosArr) {
    //传入经纬度数组
    if (spatialQuery && spatialQuery.geometry) {
      spatialQuery.geometry.geoPosition = new SuperMap3D.Point3D(newPosArr[0], newPosArr[1], newPosArr[2]);
    }
  }

  ;

  function addModel(centerPositions) {
    s3mInstanceColc.add(modelUrl, {
      id: 'spatialQuery-model',
      position: centerPositions,
      // hpr: new SuperMap3D.HeadingPitchRoll(heading, 0, 0),
      // color:SuperMap3D.Color.RED,
      scale: new SuperMap3D.Cartesian3(0.1, 0.1, 0.1)
    });
    editEntity = s3mInstanceColc.getInstance(modelUrl, 'spatialQuery-model');
    if (!modelEditor) addModelEditor(editEntity);else {
      modelEditor.setEditObject(editEntity);
      modelEditor.activate();
    }
  }

  function addModelEditor(model) {
    modelEditor = new SuperMap3D.ModelEditor({
      model: model,
      scene: scene,
      axesShow: {
        "translation": true,
        "rotation": true,
        "scale": false
      }
    });
    modelEditor.activate();
    modelEditor.changedEvt.addEventListener(param => {
      console.log(param);
      let Cartesian3 = new SuperMap3D.Cartesian3();
      SuperMap3D.Matrix4.getTranslation(param.modelMatrix, Cartesian3);

      if (Cartesian3) {}
    });
  }

  let queryIDs = [];

  function getAtributes() {
    state.atributesData.length = 0;
    let selectLayer = getLayer(state.selectedLayerName);
    selectLayer.indexedDBSetting.isAttributesSave = true;
    let query = spatialQuery.getQueryIDs();
    queryIDs = query[0].ids;
    selectLayer.setSelection(queryIDs);
    if (query.length < 1) return;

    for (let i = 0; i < queryIDs.length; i++) {
      selectLayer.getAttributesById(queryIDs[i]).then(data => {
        if (data) {
          console.log(data);
          delete data.Field_SmUserID;
          delete data.SmUserID;
          delete data.X;
          delete data.Y;
          delete data.Z;
          state.atributesData.push(data);
          if (i == queryIDs.length - 1) state.showTable = true;
        }
      });
    }
  } // 清除


  function clear() {
    state.showTable = false;
    state.atributesData.length = 0;
    let layer = getLayer(state.selectedLayerName);
    layer.removeAllObjsColor();

    if (layer) {
      layer.selectedColor = new SuperMap3D.Color(0.7, 0.7, 1, 1);
      layer.setSelection([]);
      layer.selectColorType = SuperMap3D.SelectColorType.MIX;
    }

    spatialQuery.clear();
    tooltip.setVisible(false);
    document.body.classList.remove("measureCur");
    spatialQuery.geometry.geoPosition = new SuperMap3D.Point3D(0, 0, 0);
    scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //移除鼠标点击事件监听
  }

  ; // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.Xpitch, val => {
    if (val == "") return;
    geometry.geoRotationX = parseFloat(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.Yroll, val => {
    if (val == "") return;
    geometry.geoRotationY = parseFloat(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.Zheading, val => {
    if (val == "") return;
    geometry.geoRotationZ = parseFloat(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.scale, val => {
    if (val == "") return;
    geometry.geoScaleX = parseFloat(val);
    geometry.geoScaleY = parseFloat(val);
    geometry.geoScaleZ = parseFloat(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.positionMode, val => {
    if (val == "") return;
    getPositionMode(val);
    setTimeout(() => getAtributes(), 1000);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.geometryType, val => {
    if (val === "") return;
    getGeometry(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.drawType, val => {
    if (val == "") return;
    spatialQuery.fillStyle = SuperMap3D.FillStyle[val];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.FillColor, val => {
    if (val == "") return;
    spatialQuery.fillColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.WireFrameColor, val => {
    if (val == "") return;
    spatialQuery.outlineColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.searchColor, val => {
    if (val == "") return;
    getLayer(state.selectedLayerName).selectedColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedLayerName, (val, oldval) => {
    let layer = getLayer(oldval);

    if (layer) {
      layer.selectedColor = new SuperMap3D.Color(0.7, 0.7, 1, 1);
      layer.setSelection([]);
      layer.selectColorType = SuperMap3D.SelectColorType.MIX;
    }

    clear();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectIds, val => {
    let layer = getLayer(state.selectedLayerName);
    let ids = []; // layer.removeAllObjsColor();

    layer.removeObjsColor(queryIDs);
    val.forEach(el => {
      if (el.SmID) ids.push(el.SmID);
    });
    let oldids = [...queryIDs];
    oldids = oldids.filter(id => {
      return !ids.includes(Number(id));
    });
    layer.setSelection(oldids);
    layer.setObjsColor(ids, new SuperMap3D.Color(221 / 255, 104 / 255, 219 / 255, 1));
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    spatialQuery.destroy();
    spatialQuery = undefined;
    layers = undefined;
    geometry = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    setPosition,
    getQueryIDs,
    analysis,
    clear
  };
}

;
/* harmony default export */ var spatial_query3d = (spatialQuery3d);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/spatial-query3d/spatial-query3d.vue?vue&type=script&lang=js


/* harmony default export */ var spatial_query3dvue_type_script_lang_js = ({
  name: "Sm3dSpatialQuery3d",
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String
    },
    //x旋转
    Xpitch: {
      type: Number
    },
    //y旋转
    Yroll: {
      type: Number
    },
    //z旋转
    Zheading: {
      type: Number
    },
    //缩放
    scale: {
      type: Number
    },
    //位置模式
    positionMode: {
      type: String
    },
    //选择模型类型
    geometryType: {
      type: String
    },
    //模型显示类型
    drawType: {
      type: String
    },
    //模型填充颜色
    FillColor: {
      type: String
    },
    //模型线框颜色
    WireFrameColor: {
      type: String
    },
    //查询结果颜色
    searchColor: {
      type: String
    },
    //设置长方体类型参数
    boxParameters: {
      type: Array
    },
    //设置球体类型参数
    sphereParameters: {
      type: Array
    },
    //设置圆锥类型参数
    coneParameters: {
      type: Array
    },
    //设置圆柱类型参数
    cylinderParameters: {
      type: Array
    },
    //设置椭圆类型参数
    ellicpseParameters: {
      type: Array
    },
    //圆锥绕点旋转方式
    rotateOrigin: {
      type: String
    },
    //表格选中id
    selectIds: {
      type: Array
    }
  },
  components: {
    Panel: panel
  },

  setup(props) {
    let {
      scale,
      selectedLayerName,
      layerNames,
      positionMode,
      GeometryBodyNames,
      geometryType,
      analysis,
      clear,
      FillColor,
      WireFrameColor,
      searchColor,
      showTable,
      atributesData,
      selectIds
    } = spatial_query3d(props);

    function getIDs(ids) {
      selectIds.value = ids;
    }

    return {
      scale,
      selectedLayerName,
      layerNames,
      positionMode,
      GeometryBodyNames,
      geometryType,
      analysis,
      clear,
      FillColor,
      WireFrameColor,
      searchColor,
      showTable,
      atributesData,
      getIDs
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/spatial-query3d/spatial-query3d.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/spatial-query3d/spatial-query3d.vue




;
const spatial_query3d_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(spatial_query3dvue_type_script_lang_js, [['render',spatial_query3dvue_type_template_id_0b98e97c_render]])

/* harmony default export */ var spatial_query3d_spatial_query3d = (spatial_query3d_exports_);
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/spatial-query3d/index.js


spatial_query3d_spatial_query3d.install = function (app) {
  app.component(spatial_query3d_spatial_query3d.name, spatial_query3d_spatial_query3d);
};

/* harmony default export */ var analysis_3d_spatial_query3d = (spatial_query3d_spatial_query3d);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/viewshed/viewshed.vue?vue&type=template&id=b0acf062

const viewshedvue_type_template_id_b0acf062_hoisted_1 = {
  class: "sm-global-row"
};

const viewshedvue_type_template_id_b0acf062_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "附加高度", -1);

const viewshedvue_type_template_id_b0acf062_hoisted_3 = {
  class: "sm-global-row"
};

const viewshedvue_type_template_id_b0acf062_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "垂直视角", -1);

const viewshedvue_type_template_id_b0acf062_hoisted_5 = {
  class: "sm-global-row"
};

const viewshedvue_type_template_id_b0acf062_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "水平视角", -1);

const viewshedvue_type_template_id_b0acf062_hoisted_7 = {
  class: "sm-global-row"
};

const viewshedvue_type_template_id_b0acf062_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "提示线颜色", -1);

const viewshedvue_type_template_id_b0acf062_hoisted_9 = {
  class: "sm-global-row"
};

const viewshedvue_type_template_id_b0acf062_hoisted_10 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "可视区颜色", -1);

const viewshedvue_type_template_id_b0acf062_hoisted_11 = {
  class: "sm-global-row"
};

const viewshedvue_type_template_id_b0acf062_hoisted_12 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "隐藏区颜色", -1);

const viewshedvue_type_template_id_b0acf062_hoisted_13 = {
  class: "sm-global-row"
};

const viewshedvue_type_template_id_b0acf062_hoisted_14 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "不可视体颜色", -1);

const viewshedvue_type_template_id_b0acf062_hoisted_15 = {
  class: "sm-global-row"
};

const viewshedvue_type_template_id_b0acf062_hoisted_16 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "不可视颜色", -1);

const viewshedvue_type_template_id_b0acf062_hoisted_17 = {
  class: "sm-global-button"
};

const viewshedvue_type_template_id_b0acf062_hoisted_18 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("分析");

const viewshedvue_type_template_id_b0acf062_hoisted_19 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function viewshedvue_type_template_id_b0acf062_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 270
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", viewshedvue_type_template_id_b0acf062_hoisted_1, [viewshedvue_type_template_id_b0acf062_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.addheight,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.addheight = $event),
      min: 1,
      step: 0.1,
      max: 10
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", viewshedvue_type_template_id_b0acf062_hoisted_3, [viewshedvue_type_template_id_b0acf062_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.verticalFov,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.verticalFov = $event),
      min: 1,
      max: 179
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", viewshedvue_type_template_id_b0acf062_hoisted_5, [viewshedvue_type_template_id_b0acf062_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.horizontalFov,
      "onUpdate:value": _cache[2] || (_cache[2] = $event => $setup.horizontalFov = $event),
      min: 1,
      max: 179
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", viewshedvue_type_template_id_b0acf062_hoisted_7, [viewshedvue_type_template_id_b0acf062_hoisted_8, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      class: "sm-global-color",
      type: "color",
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $setup.hintLineColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.hintLineColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", viewshedvue_type_template_id_b0acf062_hoisted_9, [viewshedvue_type_template_id_b0acf062_hoisted_10, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      class: "sm-global-color",
      type: "color",
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.visibleAreaColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.visibleAreaColor]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, !$setup.visibleBody && !$setup.invisibleBody]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", viewshedvue_type_template_id_b0acf062_hoisted_11, [viewshedvue_type_template_id_b0acf062_hoisted_12, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      class: "sm-global-color",
      type: "color",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $setup.hiddenAreaColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.hiddenAreaColor]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, !$setup.visibleBody && !$setup.invisibleBody]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", viewshedvue_type_template_id_b0acf062_hoisted_13, [viewshedvue_type_template_id_b0acf062_hoisted_14, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      class: "sm-global-color",
      type: "color",
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $setup.visibleBodyColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.visibleBodyColor]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.visibleBody]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", viewshedvue_type_template_id_b0acf062_hoisted_15, [viewshedvue_type_template_id_b0acf062_hoisted_16, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      class: "sm-global-color",
      type: "color",
      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $setup.invisibleBodyColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.invisibleBodyColor]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.invisibleBody]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", viewshedvue_type_template_id_b0acf062_hoisted_17, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.analysis
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [viewshedvue_type_template_id_b0acf062_hoisted_18]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clear
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [viewshedvue_type_template_id_b0acf062_hoisted_19]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/viewshed/viewshed.vue?vue&type=template&id=b0acf062

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.at.js
var es_typed_array_at = __webpack_require__(8675);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.set.js
var es_typed_array_set = __webpack_require__(3462);
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/viewshed/viewshed.js



/* 动态图层实现动态可视域  */
// 引入依赖

 //提示等工具

 //语言资源

 //简单局部状态管理

 //公共handler.js



function viewshed(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    viewshedSpatialUrl: "http://www.supermapol.com/realspace/services/spatialAnalysis-data_all/restjsr/spatialanalyst/geometry/3d/viewshedbody.json",
    observerInformation: null,
    //观察者信息
    direction: 1.0,
    //方向
    pitch: 1.0,
    //俯仰角度
    addheight: 1.8,
    //附加高度
    distance: 200,
    //距离
    verticalFov: 60,
    //  垂直视角
    horizontalFov: 90,
    //水平视角
    hintLineColor: "#D4CA2D",
    //提示线颜色
    visibleAreaColor: "#09C770",
    //可视区域颜色
    hiddenAreaColor: "#EE7216",
    //不可视区域颜色
    visibleBodyColor: "#09C770",
    //可视域体颜色
    invisibleBodyColor: "#EE7216",
    //不可视域体颜色
    visibleBody: true,
    //显示可视域体
    invisibleBody: true,
    //显示不可视域体
    viewshedAnimation: true,
    //动画演示
    DynamicLine: [],
    //路线点
    DynamicSpeed: 10 //动态分析行进速度

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let viewshed3D, handler, s3mInstanceColc, startPosition;
  let tipFlag = true;
  let Carurls = ['public/data/s3m/car1.s3m'],
      timers,
      dynamicLayer3D;

  if (storeState.isViewer) {
    // if (!window.tooltip) {
    //     window.tooltip = createTooltip(scene._element);
    // }
    init();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      // if (!window.tooltip) {
      //     window.tooltip = createTooltip(scene._element);
      // }
      init();
    }
  });

  function init() {
    viewshed3D = new SuperMap3D.ViewShed3D(scene);
    handler = new SuperMap3D.ScreenSpaceEventHandler(scene.canvas);
    viewshed3D.hintLineColor = SuperMap3D.Color.fromCssColorString(state.hintLineColor);
    viewshed3D.visibleAreaColor = SuperMap3D.Color.fromCssColorString(state.visibleAreaColor);
    viewshed3D.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(state.hiddenAreaColor);
    s3mInstanceColc = new SuperMap3D.S3MInstanceCollection(scene._context);
    scene.primitives.add(s3mInstanceColc);
    dynamicLayer3D = new SuperMap3D.DynamicLayer3D(scene.context, Carurls);
    dynamicLayer3D.updateInterval = 100;
    dynamicLayer3D.setCullEnabled(Carurls[0], SuperMap3D.CullFace.BACK);
    dynamicLayer3D.maxVisibleAltitude = 2000;
    dynamicLayer3D.minVisibleAltitude = 0;
    scene.primitives.add(dynamicLayer3D);
  }

  ;
  /*
   ***分析模块***
  */
  //分析

  function analysis() {
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur");

    if (state.viewshedAnimation) {
      if (timers) {
        clear();
        state.viewshedAnimation = true;
        document.body.classList.add("measureCur");
      }

      handlerPolyline();
    } else {
      // if (tipFlag) {   //只提示一次
      //     window.tooltip.showAt(' <p>点击鼠标左键确认观察者位置</p> <p>右键单击结束分析</p>', '450px');
      //     tipFlag = false
      // }
      LEFT_CLICK();
    }
  } //   点击左键确认观察者点


  function LEFT_CLICK() {
    s3mInstanceColc.removeCollection("VeiwshedBody");
    s3mInstanceColc.removeCollection("VeiwshedBodyHidden");
    viewshed3D.distance = 0.00001;
    viewshed3D.visibleAreaColor = SuperMap3D.Color.fromCssColorString(state.visibleAreaColor);
    viewshed3D.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(state.hiddenAreaColor);
    handler.setInputAction(function (e) {
      let position = scene.pickPosition(e.position);
      startPosition = position; //记录分析观察者笛卡尔坐标

      let p = tool.CartesiantoDegrees(position); // 将获取的点的位置转化成经纬度

      p[2] += Number(state.addheight); //添加附加高度

      viewshed3D.viewPosition = p;
      viewshed3D.build(); // 观察者信息记录

      state.observerInformation = p;
      document.body.classList.remove("measureCur");
      removeInputAction('LEFT_CLICK');
      MOUSE_MOVE();
      RIGHT_CLICK(); // 添加观察者点

      let p2 = SuperMap3D.Cartesian3.fromDegrees(p[0], p[1], p[2]);
      addPoint(p2);
    }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
  }

  ;

  function addPoint(p) {
    scene.trackingLayer.removeById('viewshedPoint');
    scene.trackingLayer.add({
      id: 'viewshedPoint',
      point: new SuperMap3D.PointGraphics({
        color: colorUpdate(state.hiddenAreaColor),
        pixelSize: 8
      }),
      position: p
    });
  } // 鼠标移动实时分析


  function MOUSE_MOVE() {
    handler.setInputAction(function (e) {
      // tooltip.setVisible(false);
      //获取鼠标屏幕坐标,并将其转化成笛卡尔坐标
      let position = e.endPosition;
      let endPosition = scene.pickPosition(position); //计算该点与视口位置点坐标的距离

      let distance = SuperMap3D.Cartesian3.distance(startPosition, endPosition);

      if (distance > 0) {
        let p2 = tool.CartesiantoDegrees(endPosition); // 将获取的点的位置转化成经纬度
        // 通过该点设置可视域分析对象的距离及方向

        viewshed3D.setDistDirByPoint(p2);
      }
    }, SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
  } // //鼠标右键确认分析距离和方向，不再执行鼠标移动事件中对可视域的操作


  function RIGHT_CLICK() {
    handler.setInputAction(function (e) {
      state.direction = viewshed3D.direction.toFixed(2);
      state.pitch = viewshed3D.pitch.toFixed(2);
      state.distance = viewshed3D.distance.toFixed(2);
      state.horizontalFov = viewshed3D.horizontalFov;
      state.verticalFov = viewshed3D.verticalFov;

      if (state.visibleBody) {
        getVisibleResult();
      }

      if (state.invisibleBody) {
        getInVisibleResult();
      } // tooltip.setVisible(false);


      removeInputAction('MOUSE_MOVE');
      removeInputAction('RIGHT_CLICK');
    }, SuperMap3D.ScreenSpaceEventType.RIGHT_CLICK);
  } //移除鼠标事件


  function removeInputAction(type) {
    switch (type) {
      case 'LEFT_CLICK':
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
        break;

      case 'MOUSE_MOVE':
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
        break;

      case 'RIGHT_CLICK':
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.RIGHT_CLICK);
        break;

      case 'ALL':
      default:
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.RIGHT_CLICK);
        break;
    }
  } // 可视域体走数据服务


  function getVisibleResult() {
    let obj = viewshed3D.getViewshedParameter();
    let geometryViewShedBodyvisibleParameter = {
      viewerPoint: obj.viewPosition,
      point3DsList: obj.point3DList,
      radius: obj.distance,
      lonlat: true,
      viewShedType: "VISIBLEBODY"
    };
    let queryData = JSON.stringify(geometryViewShedBodyvisibleParameter);
    let color = SuperMap3D.Color.fromCssColorString(state.visibleBodyColor); //先发送POST请求

    window.axios.post(state.viewshedSpatialUrl, queryData).then(function (response) {
      //再发送一次GET请求  获取到运算结果
      window.axios.get(response.data.newResourceLocation + ".json").then(function (response) {
        let data = response.data; //失败 没有内容

        if (data.geometry == null) {
          tool.Message.errorMsg('获取geometry失败');
          return;
        } //将二进制流构建arrayBuffer 添加至S3MInstanceCollection


        let u8 = new Uint8Array(data.geometry.model);
        let ab = u8.buffer; //注意  若添加多个模型 请保证各个名称唯一  否则可能引起显示错乱问题

        s3mInstanceColc.add("VeiwshedBody", {
          id: 1,
          position: SuperMap3D.Cartesian3.fromDegrees(data.geometry.position.x, data.geometry.position.y, data.geometry.position.z),
          hpr: new SuperMap3D.HeadingPitchRoll(0, 0, 0),
          //scale : new SuperMap3D.Cartesian3(39.37007900000045,39.37007900000045,39.37007900000045),
          color: color //offset : new SuperMap3D.Cartesian3(0,0,690)

        }, ab, false);
        data.geometry.model = [4, 0, 0, 0].concat(data.geometry.model); // 分析区域颜色和可视域体颜色会影响，所以先透明

        viewshed3D.visibleAreaColor = SuperMap3D.Color.fromCssColorString("rgba(0,0,0,0)");
        viewshed3D.hiddenAreaColor = SuperMap3D.Color.fromCssColorString("rgba(0,0,0,0)"); // // 传到store可以做gpu查询

        data.geometry["name"] = lang.VeiwshedBody;
        storeDate.geometrys.VeiwshedBody = data.geometry;
        actions.setGeometrys();
      }).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  ;

  function getInVisibleResult() {
    let obj = viewshed3D.getViewshedParameter();
    let geometryViewShedBodyvisibleParameter = {
      viewerPoint: obj.viewPosition,
      point3DsList: obj.point3DList,
      radius: obj.distance,
      lonlat: true,
      viewShedType: "HIDDENBODY"
    };
    let queryData = JSON.stringify(geometryViewShedBodyvisibleParameter);
    let color = SuperMap3D.Color.fromCssColorString(state.invisibleBodyColor); //先发送POST请求

    window.axios.post(state.viewshedSpatialUrl, queryData).then(function (response) {
      //再发送一次GET请求  获取到运算结果
      window.axios.get(response.data.newResourceLocation + ".json").then(function (response) {
        let data = response.data; //失败 没有内容

        if (data.geometry == null) {
          tool.Message.errorMsg('获取geometry失败');
          return;
        } //将二进制流构建arrayBuffer 添加至S3MInstanceCollection


        let u8 = new Uint8Array(data.geometry.model);
        let ab = u8.buffer; //注意  若添加多个模型 请保证各个名称唯一  否则可能引起显示错乱问题

        s3mInstanceColc.add("VeiwshedBodyHidden", {
          id: 1,
          position: SuperMap3D.Cartesian3.fromDegrees(data.geometry.position.x, data.geometry.position.y, data.geometry.position.z),
          hpr: new SuperMap3D.HeadingPitchRoll(0, 0, 0),
          //scale : new SuperMap3D.Cartesian3(39.37007900000045,39.37007900000045,39.37007900000045),
          color: color //offset : new SuperMap3D.Cartesian3(0,0,690)

        }, ab, false);
        data.geometry.model = [4, 0, 0, 0].concat(data.geometry.model);
        viewshed3D.visibleAreaColor = SuperMap3D.Color.fromCssColorString("rgba(0,0,0,0)");
        viewshed3D.hiddenAreaColor = SuperMap3D.Color.fromCssColorString("rgba(0,0,0,0)"); // // 传到store可以做gpu查询

        data.geometry["name"] = lang.VeiwshedBodyHidden;
        storeDate.geometrys.VeiwshedBodyHidden = data.geometry;
        actions.setGeometrys();
      }).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
      console.log(error);
    });
  } // 清除


  function clear() {
    clearViewshed();
    dynamicLayer3D.clearState(Carurls[0], [1]);
    clearInterval(timers);
    timers = null;
    state.viewshedAnimation = false;
    clearHandlerDrawing("Polyline");
  }

  ;

  function clearViewshed() {
    // tooltip.setVisible(false);
    scene.trackingLayer.removeById('viewshedPoint');
    document.body.classList.remove("measureCur");
    viewshed3D.distance = 0.00001;
    viewshed3D.viewPosition = [0, 0, 0];
    state.visibleBody = false;
    state.invisibleBody = false;
    state.observerInformation = null;
  }
  /*
  动态可视域模块
  */
  //绘制路线


  function handlerPolyline() {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    }

    if (props.DynamicLine) {
      //如果传入路线,就不需要绘制路线了
      setCarState();
      return;
    }

    handlerDrawing("Polyline", SuperMap3D.ClampMode.Ground).then(res => {
      let handlerPolyline = window.handlerPolyline;
      handlerPolyline.polyline.show = false;
      window.polylineTransparent.show = true; //半透线隐藏

      handlerPolyline.deactivate();
      state.DynamicLine = res.result.object._positions; // tooltip.setVisible(false);

      if (state.DynamicLine.length < 2) {
        tool.Message.warnMsg('至少需要两个点！');
        return;
      }

      ;
      setCarState();
    }, err => {
      console.log(err);
    });
    window.handlerPolyline.activate();
  } // 添加动态可视域动画模型


  function setCarState() {
    viewshed3D.distance = state.distance;
    viewshed3D.build();
    let points = state.DynamicLine;
    let points2 = [];

    for (let i = 1, j = points.length; i < j; i++) {
      let startPoint = points[i - 1];
      let endPoint = points[i];
      let d = SuperMap3D.Cartesian3.distance(startPoint, endPoint);
      let count = parseInt(d / (state.DynamicSpeed * 0.05)) + 1;

      for (let i = 1, j = count; i <= j; i++) {
        points2.push(SuperMap3D.Cartesian3.lerp(startPoint, endPoint, i / count, new SuperMap3D.Cartesian3()));
      }
    }

    let positions = tool.CartesiantoDegreesObjs(points2);
    let CarState = new SuperMap3D.DynamicObjectState({
      id: 1,
      longitude: positions[0].longitude,
      latitude: positions[0].latitude,
      altitude: positions[0].height,
      scale: new SuperMap3D.Cartesian3(1, 1, 1)
    });
    dynamicLayer3D.updateObjectWithModel(Carurls[0], [CarState]);
    let index = 1;
    timers = setInterval(() => {
      if (index >= positions.length) {
        clearInterval(timers);
        return;
      }

      CarState.longitude = positions[index].longitude;
      CarState.latitude = positions[index].latitude;
      CarState.altitude = positions[index].height;
      dynamicLayer3D.updateObjectWithModel(Carurls[0], [CarState]);
      let getAngleAndRadian = tool.getAngleAndRadian(points2[index - 1], points2[index]);
      viewshed3D.direction = getAngleAndRadian.angle;
      viewshed3D.viewPosition = [CarState.longitude, CarState.latitude, CarState.altitude + Number(state.addheight)];
      index += 1;
    }, 50);
  } // 监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibleBody, val => {
    if (val && state.observerInformation) {
      getVisibleResult();
    } else {
      s3mInstanceColc.removeCollection("VeiwshedBody");

      if (!state.invisibleBody) {
        viewshed3D.visibleAreaColor = SuperMap3D.Color.fromCssColorString(state.visibleAreaColor);
        viewshed3D.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(state.hiddenAreaColor);
      }

      if (storeDate.geometrys.VeiwshedBody) {
        delete storeDate.geometrys.VeiwshedBody;
        actions.setGeometrys();
      }
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.invisibleBody, val => {
    if (val && state.observerInformation) {
      getInVisibleResult();
    } else {
      s3mInstanceColc.removeCollection("VeiwshedBodyHidden");

      if (!state.visibleBody) {
        viewshed3D.visibleAreaColor = SuperMap3D.Color.fromCssColorString(state.visibleAreaColor);
        viewshed3D.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(state.hiddenAreaColor);
      }

      if (storeDate.geometrys.VeiwshedBodyHidden) {
        delete storeDate.geometrys.VeiwshedBodyHidden;
        actions.setGeometrys();
      }
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.addheight, val => {
    if (val === '' || val < 0) {
      // 避免删除导致崩溃
      val = 0;
    }

    if (state.observerInformation) {
      state.observerInformation[2] += parseFloat(val);
      viewshed3D.viewPosition = state.observerInformation;
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.pitch, val => {
    if (val === '' || val < 0) {
      // 避免删除导致崩溃
      val = 0;
    }

    viewshed3D.pitch = parseFloat(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.direction, val => {
    if (val === '' || val < 0) {
      // 避免删除导致崩溃
      val = 0;
    }

    viewshed3D.direction = parseFloat(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.distance, val => {
    if (val === '' || val < 0) {
      // 避免删除导致崩溃
      val = 0;
    }

    viewshed3D.distance = parseFloat(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.verticalFov, val => {
    if (val === '' || val < 0) {
      // 避免删除导致崩溃
      val = 0;
    }

    viewshed3D.verticalFov = parseFloat(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.horizontalFov, val => {
    if (val === '' || val < 0) {
      // 避免删除导致崩溃
      val = 0;
    }

    viewshed3D.horizontalFov = parseFloat(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.hintLineColor, val => {
    viewshed3D.hintLineColor = colorUpdate(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibleAreaColor, val => {
    viewshed3D.visibleAreaColor = colorUpdate(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibleBodyColor, val => {
    s3mInstanceColc.getInstance("VeiwshedBody", 1).updateColor(colorUpdate(val));
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.hiddenAreaColor, val => {
    viewshed3D.hiddenAreaColor = colorUpdate(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.invisibleBodyColor, val => {
    s3mInstanceColc.getInstance("VeiwshedBodyHidden", 1).updateColor(colorUpdate(val));
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.viewshedAnimation, val => {
    if (val) {
      clearViewshed(); // tooltip.showAt('<p>点击分析按钮激活事件</p><p>点击鼠标左键确认模型移动路线</p><p>单击右键结束分析</p>', '300px');
    } else {
      clear();
    }
  });

  function colorUpdate(val) {
    if (val == "") return;
    return SuperMap3D.Color.fromCssColorString(val);
  } // 销毁


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    clear();
    s3mInstanceColc.destroy();
    viewshed3D.destroy();
    handler.destroy();
    dynamicLayer3D.destroy();
    viewshed3D = undefined;
    handler = undefined;
    s3mInstanceColc = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    analysis,
    clear
  };
}

;
/* harmony default export */ var viewshed_viewshed = (viewshed);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/analysis_3d/viewshed/viewshed.vue?vue&type=script&lang=js



/* harmony default export */ var viewshedvue_type_script_lang_js = ({
  components: {
    Panel: panel
  },
  name: "Sm3dViewshed",
  props: {
    //可视域体数据服务
    viewshedSpatialUrl: {
      type: String
    },
    //初始化观察者信息
    observerInformation: {
      type: Object
    },
    //方向角
    direction: {
      type: Number
    },
    //俯仰角
    pitch: {
      type: Number
    },
    //附加高度
    addheight: {
      type: Number
    },
    //可视域距离
    distance: {
      type: Number
    },
    //水平视角
    verticalFov: {
      type: Number
    },
    //垂直视角
    horizontalFov: {
      type: Number
    },
    //可视线颜色
    hintLineColor: {
      type: String
    },
    //可视区域颜色
    visibleAreaColor: {
      type: String
    },
    //不可视域颜色
    hiddenAreaColor: {
      type: String
    },
    //可视域体颜色
    visibleBodyColor: {
      type: String
    },
    //不可视域体颜色
    invisibleBodyColor: {
      type: String
    },
    //显示可视域体
    visibleBody: {
      type: Boolean
    },
    //显示不可视域体
    invisibleBody: {
      type: Boolean
    },
    //动态可视域设置
    viewshedAnimation: {
      type: Boolean
    },
    //动态可视域路线点
    DynamicLine: {
      type: Array
    },
    //动态分析行进速度
    DynamicSpeed: {
      type: Number
    }
  },

  setup(props) {
    let {
      visibleBody,
      invisibleBody,
      viewshedAnimation,
      analysis,
      clear,
      addheight,
      verticalFov,
      horizontalFov,
      hintLineColor,
      visibleAreaColor,
      hiddenAreaColor,
      visibleBodyColor,
      invisibleBodyColor
    } = viewshed_viewshed(props);
    return {
      addheight,
      verticalFov,
      horizontalFov,
      hintLineColor,
      visibleAreaColor,
      hiddenAreaColor,
      visibleBodyColor,
      invisibleBodyColor,
      visibleBody,
      invisibleBody,
      viewshedAnimation,
      analysis,
      clear
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/viewshed/viewshed.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/viewshed/viewshed.vue




;
const viewshed_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(viewshedvue_type_script_lang_js, [['render',viewshedvue_type_template_id_b0acf062_render]])

/* harmony default export */ var analysis_3d_viewshed_viewshed = (viewshed_exports_);
;// CONCATENATED MODULE: ./globalCom/components/analysis_3d/viewshed/index.js
// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

analysis_3d_viewshed_viewshed.install = function (app) {
  app.component(analysis_3d_viewshed_viewshed.name, analysis_3d_viewshed_viewshed);
};

/* harmony default export */ var analysis_3d_viewshed = (analysis_3d_viewshed_viewshed);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-operation/terrain-operation.vue?vue&type=template&id=41ae73d8&scoped=true


const terrain_operationvue_type_template_id_41ae73d8_scoped_true_withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.pushScopeId)("data-v-41ae73d8"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.popScopeId)(), n);

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_1 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("地形开挖");

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("地形修改");

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_3 = {
  class: "sm-to-dig"
};

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_4 = /*#__PURE__*/terrain_operationvue_type_template_id_41ae73d8_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "开挖深度", -1));

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_5 = {
  class: "sm-global-button"
};

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("修改");

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_8 = {
  class: "sm-global-button"
};

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("开挖");

const terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_10 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function terrain_operationvue_type_template_id_41ae73d8_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_radio = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio");

  const _component_a_radio_group = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio-group");

  const _component_a_input_number = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-input-number");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 230,
    pHeight: 150
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio_group, {
      value: $setup.operationType,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.operationType = $event),
      class: "sm-global-row"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "dig"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_1]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "modify"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_2]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_3, [terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      class: "sm-global-input-number",
      value: $setup.digDepth,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.digDepth = $event),
      min: 0
    }, null, 8, ["value"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.operationType === 'dig']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_5, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.modifyTerrain
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_6]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearModify
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_7]),
      _: 1
    }, 8, ["onClick"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.operationType === 'modify']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_8, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.digTerrain
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_9]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearDig
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_operationvue_type_template_id_41ae73d8_scoped_true_hoisted_10]),
      _: 1
    }, 8, ["onClick"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.operationType === 'dig']])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-operation/terrain-operation.vue?vue&type=template&id=41ae73d8&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-operation/terrain-operation.js
// 引入依赖

 //公共handler.js

 //编辑

 //提示等工具

 //语言资源

function terrainAnalysis(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    digDepth: 500,
    isEdit: false,
    isEditZ: false,
    lineVisible: true,
    digPositions: [],
    modifyPositions: [],
    operationType: 'dig',
    terrainVisible: "terrainVisible"
  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 非响应式数据定义


  let digPosition = [];
  let modifyPosition = [];
  let operationType = "dig";
  /*
   ***挖掘模块***
  */
  //初始化挖掘区域(暂时只支持一个开挖区域)

  if (props && props.digPositions) {
    digUpdate(props.digPositions);
  }

  function digTerrain(e) {
    e.preventDefault();
    operationType = "dig";

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", state.lineVisible).then(res => {
      digPosition = res.positions;
      let handlerPolygon = window.handlerPolygon;
      digUpdate(res.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();

      if (state.isEdit) {
        Edit(digPosition, state.isEditZ, digUpdate);
      }
    }, err => {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(lang.NoPickPositionSupported);
    }
  } //更新地形挖掘


  function digUpdate(dig_position) {
    if (dig_position) {
      digPosition = dig_position;
    }

    scene.globe.removeAllExcavationRegion();
    scene.globe.addExcavationRegion({
      name: "dig_terrain",
      position: digPosition,
      height: state.digDepth,
      transparent: false
    });
  } // 清除


  function clearDig(e) {
    e.preventDefault();
    digPosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.removeAllExcavationRegion();
    clearHandlerDrawing("Polygon");
    clearEditHandler("Polygon");
  }

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.digDepth, val => {
    if (digPosition.length == 0) {
      return;
    }

    digUpdate();
  });
  /*
   ***地形修改模块***
   */

  function modifyTerrain(e) {
    e.preventDefault();
    operationType = "modify"; // if (viewer.terrainProvider.tablename) {

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", state.lineVisible).then(res => {
      modifyPosition = res.positions;
      let handlerPolygon = window.handlerPolygon;
      modifyUpdate(res.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;

      if (state.isEdit) {
        Edit(modifyPosition, state.isEditZ, modifyUpdate);
      }
    }, err => {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (e) {
      console.log(e);
    } // }

  }

  function clearModify(e) {
    e.preventDefault();
    if (!window.handlerPolygon) return;
    scene.globe.removeAllModifyRegion();
    clearHandlerDrawing("Polygon");
    clearEditHandler("Polygon");
  } //更新地形修改


  function modifyUpdate(modify_positions) {
    if (modify_positions) {
      modifyPosition = modify_positions;
    }

    scene.globe.removeAllModifyRegion();
    scene.globe.addModifyRegion({
      name: "ggg",
      position: modifyPosition
    });
  } // 编辑


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.isEdit, val => {
    if (val && window.handlerPolygon) {
      if (operationType === "dig") {
        Edit(digPosition, state.isEditZ, digUpdate);
      } else {
        Edit(modifyPosition, state.isEditZ, modifyUpdate);
      }
    } else {
      clearEditHandler("Polygon");

      if (window.handlerPolygon && window.handlerPolygon.polygon) {
        window.handlerPolygon.polygon.show = false;
      }
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.isEditZ, val => {
    if (window.editHandler) {
      window.editHandler.isEditZ = val;
    }
  }); //地形显隐  （此功能当前还有缺陷）

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.terrainVisible, val => {
    switch (val) {
      case "terrainVisible":
        scene.terrainProvider._visible = true;
        break;

      case "terrainUnvisible":
        scene.terrainProvider._visible = false;
        break;

      default:
        break;
    }
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    digTerrain,
    clearDig,
    modifyTerrain,
    clearModify,
    digPosition,
    //导出开挖区域，便于用户需要保存当前开挖区域数据方案，使用组件时可以通过digPositions默认传入
    modifyPosition //同上导出修改区域

  };
}

;
/* harmony default export */ var terrain_operation = (terrainAnalysis);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-operation/terrain-operation.vue?vue&type=script&lang=js



/* harmony default export */ var terrain_operationvue_type_script_lang_js = ({
  name: "Sm3dTerrainOperation",
  components: {
    Panel: panel
  },
  props: {
    //挖掘深度
    digDepth: {
      type: Number,
      default: 500
    },
    //初始化传入挖掘区域
    digPositions: {
      type: Array
    },
    //初始化传入修改区域
    modifyPositions: {
      type: Array
    },
    //是否编辑
    isEdit: {
      type: Boolean,
      default: false
    },
    //是否编辑Z轴
    isEditZ: {
      type: Boolean,
      default: false
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    let {
      digDepth,
      isEdit,
      isEditZ,
      terrainVisible,
      digTerrain,
      clearDig,
      modifyTerrain,
      clearModify,
      operationType
    } = terrain_operation(props);
    return {
      digDepth,
      isEdit,
      isEditZ,
      terrainVisible,
      digTerrain,
      clearDig,
      modifyTerrain,
      clearModify,
      operationType
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-operation/terrain-operation.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-operation/terrain-operation.vue?vue&type=style&index=0&id=41ae73d8&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-operation/terrain-operation.vue?vue&type=style&index=0&id=41ae73d8&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-operation/terrain-operation.vue




;


const terrain_operation_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(terrain_operationvue_type_script_lang_js, [['render',terrain_operationvue_type_template_id_41ae73d8_scoped_true_render],['__scopeId',"data-v-41ae73d8"]])

/* harmony default export */ var terrain_operation_terrain_operation = (terrain_operation_exports_);
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-operation/index.js


terrain_operation_terrain_operation.install = function (app) {
  app.component(terrain_operation_terrain_operation.name, terrain_operation_terrain_operation);
};

/* harmony default export */ var terrain_analysis_terrain_operation = (terrain_operation_terrain_operation);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-isoline/terrain-isoline.vue?vue&type=template&id=3c01c24a&scoped=true


const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.pushScopeId)("data-v-3c01c24a"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.popScopeId)(), n);

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_1 = {
  class: "sm-global-row"
};

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_2 = /*#__PURE__*/terrain_isolinevue_type_template_id_3c01c24a_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "可见高度", -1));

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_3 = {
  class: "sm-global-row sm-il-margin"
};

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_4 = /*#__PURE__*/terrain_isolinevue_type_template_id_3c01c24a_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "等值距(米)", -1));

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_5 = {
  class: "sm-global-row sm-il-margin"
};

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_6 = /*#__PURE__*/terrain_isolinevue_type_template_id_3c01c24a_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "显示模式", -1));

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("等高线填充");

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("等高面填充");

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("等高线面填充");

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_10 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("无颜色表");

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_11 = {
  class: "sm-ti-button"
};

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_12 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("分析");

const terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_13 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function terrain_isolinevue_type_template_id_3c01c24a_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_input_number = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-input-number");

  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 240,
    pHeight: 180
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_1, [terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.fillHeight,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.fillHeight = $event),
      min: 0,
      max: 9000,
      range: "",
      step: 1,
      "input-size": "mini",
      debounce: 500,
      "tooltip-class": "tooltip-class",
      "format-tooltip": _ctx.formatTooltip
    }, null, 8, ["value", "format-tooltip"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_3, [terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.equivalentIsoline,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.equivalentIsoline = $event),
      min: 0,
      placeholder: "深度",
      style: {
        "width": "140px"
      }
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_5, [terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.fillOptionsSelected,
      "onUpdate:value": _cache[2] || (_cache[2] = $event => $setup.fillOptionsSelected = $event),
      style: {
        "width": "140px"
      }
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "Line"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_7]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "Region"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_8]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "Line_Region"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_9]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "None"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_10]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_11, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.isoLineAnalysis
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_12]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearIsoLine
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_isolinevue_type_template_id_3c01c24a_scoped_true_hoisted_13]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-isoline/terrain-isoline.vue?vue&type=template&id=3c01c24a&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-isoline/terrain-isoline.js
// 引入依赖

 //公共handler.js

 //编辑

 //提示等工具

 //语言资源

function terrainIsoline(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    fillMaxHeight: 9000,
    //最大可见高程
    fillMinHeight: 0,
    //最小可见高程
    fillHeight: [0, 9000],
    equivalentIsoline: 100,
    //等值距
    fillOptionsSelected: 'Line',
    //当前选择模式
    lineColor: "#FF8040",
    //颜色
    isEdit: false,
    //是否编辑
    isolinePositions: [],
    lineVisible: true //是否显示绘制线

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let hyp = new SuperMap3D.HypsometricSetting();
  let DisplayModeHyp = SuperMap3D.HypsometricSettingEnum.DisplayMode.LINE; //显示模式

  let colorTable = new SuperMap3D.ColorTable(); //建立颜色表

  colorTableInit(colorTable);
  let isolinePosition = []; //保存当前分析区域

  /*
   ***等值线分析模块***
  */
  //初始化分析区域 （后面有需要可以添加监听）

  if (props && props.isolinePositions) {
    isolineUpdate(props.isolinePositions);
  } // 分析


  function isoLineAnalysis(e) {
    e.preventDefault(); //参数配置

    hyp.DisplayMode = DisplayModeHyp;
    hyp._lineColor = SuperMap3D.Color.fromCssColorString(state.lineColor);
    hyp.LineInterval = parseFloat(state.equivalentIsoline);
    hyp.MaxVisibleValue = parseFloat(state.fillMaxHeight);
    hyp.MinVisibleValue = parseFloat(state.fillMinHeight);
    hyp.ColorTableMinKey = 2736.88110351563;
    hyp.ColorTableMaxKey = 5597.06640625;
    hyp.ColorTable = colorTable; // hyp.Opacity = 0.4;

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", state.lineVisible).then(res => {
      isolinePosition = res.positions;
      let handlerPolygon = window.handlerPolygon; //分析区域为指定区域

      isolineUpdate(isolinePosition);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();

      if (state.isEdit) {
        Edit(isolinePosition, false, isolineUpdate);
      }
    }, err => {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(lang.NoPickPositionSupported);
    }
  }

  ; // 更新

  function isolineUpdate(p) {
    if (p) {
      isolinePosition = p;
    }

    if (isolinePosition.length == 0) return;

    if (p) {
      hyp.CoverageArea = p;
    }

    scene.globe.HypsometricSetting = {
      hypsometricSetting: hyp,
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    };
  }

  ; // 清除

  function clearIsoLine(e) {
    e.preventDefault();
    isolinePosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.HypsometricSetting = undefined;
    hyp && (hyp.MaxVisibleValue = -1000);
    hyp && (hyp.MinVisibleValue = -1000);
    clearHandlerDrawing("Polygon");
    clearEditHandler("Polygon");
  }

  ; //监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.fillMaxHeight, val => {
    hyp.MaxVisibleValue = parseFloat(val);

    if (isolinePosition.length == 0) {
      return;
    }

    isolineUpdate();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.fillMinHeight, val => {
    hyp.MinVisibleValue = parseFloat(val);

    if (isolinePosition.length == 0) {
      return;
    }

    isolineUpdate();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.fillHeight, val => {
    state.fillMinHeight = val[0];
    state.fillMaxHeight = val[1];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.equivalentIsoline, val => {
    hyp.LineInterval = parseFloat(val);

    if (isolinePosition.length == 0) {
      return;
    }

    isolineUpdate();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.lineColor, val => {
    if (val) {
      console.log(hyp); // hyp._lineColor = SuperMap3D.Color.fromCssColorString(val);
      // hyp.Opacity  = Number(rgbaNum(val, 3)) ;

      if (isolinePosition.length == 0) {
        return;
      }

      isolineUpdate();
    } else {
      console.warn('err: color is  null');
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.fillOptionsSelected, val => {
    debugger;

    switch (val) {
      case "None":
        {
          DisplayModeHyp = undefined;
        }
        break;

      case "Line":
        {
          DisplayModeHyp = SuperMap3D.HypsometricSettingEnum.DisplayMode.LINE;
          hyp.Opacity = 1;
        }
        break;

      case "Region":
        {
          DisplayModeHyp = SuperMap3D.HypsometricSettingEnum.DisplayMode.FACE;
          hyp.Opacity = 0.5;
        }
        break;

      case "Line_Region":
        {
          DisplayModeHyp = SuperMap3D.HypsometricSettingEnum.DisplayMode.FACE_AND_LINE;
          hyp.Opacity = 0.5;
        }
        break;

      default:
        break;
    }

    hyp.DisplayMode = DisplayModeHyp;

    if (isolinePosition.length == 0) {
      return;
    }

    isolineUpdate(isolinePosition);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.isEdit, val => {
    if (val && window.handlerPolygon) {
      Edit(isolinePosition, false, isolineUpdate);
    } else {
      clearEditHandler("Polygon");

      if (window.handlerPolygon && window.handlerPolygon.polygon) {
        window.handlerPolygon.polygon.show = false;
      }
    }
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    hyp.destroy();
    colorTable.destroy();
    hyp = undefined;
    colorTable = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    isoLineAnalysis,
    clearIsoLine,
    isolinePosition
  };
}

;
/* harmony default export */ var terrain_isoline = (terrainIsoline);

function colorTableInit(colorTable) {
  colorTable.insert(5597.06640625, new SuperMap3D.Color(0, 0, 255 / 255));
  colorTable.insert(5406.3873860677086, new SuperMap3D.Color(0, 51 / 255, 255 / 255));
  colorTable.insert(5215.7083658854172, new SuperMap3D.Color(0, 102 / 255, 255 / 255));
  colorTable.insert(5025.0293457031257, new SuperMap3D.Color(0, 153 / 255, 255 / 255));
  colorTable.insert(4834.3503255208343, new SuperMap3D.Color(0, 204 / 255, 255 / 255));
  colorTable.insert(4643.6713053385429, new SuperMap3D.Color(0, 255 / 255, 255 / 255));
  colorTable.insert(4452.9922851562524, new SuperMap3D.Color(51 / 255, 255 / 255, 204 / 255));
  colorTable.insert(4262.3132649739609, new SuperMap3D.Color(102 / 255, 255 / 255, 153 / 255));
  colorTable.insert(4071.6342447916695, new SuperMap3D.Color(153 / 255, 255 / 255, 102 / 255));
  colorTable.insert(3880.9552246093781, new SuperMap3D.Color(204 / 255, 255 / 255, 51 / 255));
  colorTable.insert(3690.2762044270867, new SuperMap3D.Color(255 / 255, 255 / 255, 0));
  colorTable.insert(3499.5971842447952, new SuperMap3D.Color(255 / 255, 204 / 255, 0));
  colorTable.insert(3308.9181640625038, new SuperMap3D.Color(255 / 255, 153 / 255, 0));
  colorTable.insert(3118.2391438802129, new SuperMap3D.Color(255 / 255, 102 / 255, 0));
  colorTable.insert(2927.5601236979214, new SuperMap3D.Color(255 / 255, 51 / 255, 0));
  colorTable.insert(2736.88110351563, new SuperMap3D.Color(255 / 255, 0, 0));
}

; // 获取rgba里的数值(rgba:传入的rgba格式颜色值，index:想要获取第几位，有0、1、2、3)

function rgbaNum(rgba, index) {
  let val = rgba.match(/(\d(\.\d+)?)+/g);
  return val[index];
}
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-isoline/terrain-isoline.vue?vue&type=script&lang=js



/* harmony default export */ var terrain_isolinevue_type_script_lang_js = ({
  components: {
    Panel: panel
  },
  name: "Sm3dTerrainIsoline",
  props: {
    //最大可见高层
    fillMaxHeight: {
      type: Number
    },
    //最小可见高程
    fillMinHeight: {
      type: Number
    },
    //等值距
    equivalentIsoline: {
      type: Number
    },
    //颜色
    lineColor: {
      type: String
    },
    //显示模式
    fillOptionsSelected: {
      type: String
    },
    //是否编辑
    isEdit: {
      type: Boolean
    },
    //初始化传入分析区域
    isolinePositions: {
      type: Array
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    let {
      fillMaxHeight,
      fillMinHeight,
      fillHeight,
      equivalentIsoline,
      lineColor,
      fillOptionsSelected,
      isEdit,
      isoLineAnalysis,
      clearIsoLine
    } = terrain_isoline(props);
    return {
      fillMaxHeight,
      fillMinHeight,
      fillHeight,
      equivalentIsoline,
      lineColor,
      fillOptionsSelected,
      isEdit,
      isoLineAnalysis,
      clearIsoLine
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-isoline/terrain-isoline.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-isoline/terrain-isoline.vue?vue&type=style&index=0&id=3c01c24a&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-isoline/terrain-isoline.vue?vue&type=style&index=0&id=3c01c24a&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-isoline/terrain-isoline.vue




;


const terrain_isoline_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(terrain_isolinevue_type_script_lang_js, [['render',terrain_isolinevue_type_template_id_3c01c24a_scoped_true_render],['__scopeId',"data-v-3c01c24a"]])

/* harmony default export */ var terrain_isoline_terrain_isoline = (terrain_isoline_exports_);
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-isoline/index.js


terrain_isoline_terrain_isoline.install = function (app) {
  app.component(terrain_isoline_terrain_isoline.name, terrain_isoline_terrain_isoline);
};

/* harmony default export */ var terrain_analysis_terrain_isoline = (terrain_isoline_terrain_isoline);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-slope/terrain-slope.vue?vue&type=template&id=5eea6642&scoped=true


const terrain_slopevue_type_template_id_5eea6642_scoped_true_withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.pushScopeId)("data-v-5eea6642"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.popScopeId)(), n);

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_1 = {
  class: "sm-global-row"
};

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_2 = /*#__PURE__*/terrain_slopevue_type_template_id_5eea6642_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "分析区域", -1));

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("指定多边形区域");

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("全部区域参与分析");

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("全部区域不参与分析");

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_6 = {
  class: "sm-global-row"
};

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_7 = /*#__PURE__*/terrain_slopevue_type_template_id_5eea6642_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "坡度区间", -1));

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_8 = {
  class: "sm-global-button"
};

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("分析");

const terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_10 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function terrain_slopevue_type_template_id_5eea6642_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 270,
    pHeight: 140
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_1, [terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.analysisArea,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.analysisArea = $event),
      style: {
        "width": "170px"
      }
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "ARM_REGION"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_3]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "ARM_ALL"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_4]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "ARM_NONE"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_5]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_6, [terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_7, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.slopeInterval,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.slopeInterval = $event),
      min: 0,
      max: 90,
      range: "",
      step: 1
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_8, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.startSlope
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_9]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearSlope
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_slopevue_type_template_id_5eea6642_scoped_true_hoisted_10]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-slope/terrain-slope.vue?vue&type=template&id=5eea6642&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-slope/terrain-slope.js
// 引入依赖

 //公共handler.js

 //编辑

 //提示等工具

 //语言资源


 //简单局部状态管理

function terrainSlope(props) {
  // 设置默认值数据
  let slopData = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    analysisArea: 'ARM_REGION',
    //分析区域
    displayMode: 'FACE_AND_ARROW',
    //显示模式
    wideMaxR: 90,
    //最大坡度
    wideMinR: 0,
    //最小坡度
    slopeInterval: [0, 90],
    trans: 0.8,
    //透明度
    isEdit: false,
    //是否编辑
    slopePositions: [],
    lineVisible: true //是否显示绘制线

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (slopData.hasOwnProperty(key)) {
        if (props[key] != undefined) slopData[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let tipFlag = true;
  let slope = new SuperMap3D.SlopeSetting(); //分析对象

  let wide = SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode[slopData.analysisArea]; //默认分析区域值

  let disMode = SuperMap3D.SlopeSettingEnum.DisplayMode[slopData.displayMode]; //显示模式

  let SlopColorTable = new SuperMap3D.ColorTable(); //颜色

  let slopePosition = []; //保存当前分析区域

  SlopColorTable.insert(80, new SuperMap3D.Color(255 / 255, 0 / 255, 0 / 255));
  SlopColorTable.insert(50, new SuperMap3D.Color(221 / 255, 224 / 255, 7 / 255));
  SlopColorTable.insert(30, new SuperMap3D.Color(20 / 255, 187 / 255, 18 / 255));
  SlopColorTable.insert(20, new SuperMap3D.Color(0, 161 / 255, 1));
  SlopColorTable.insert(0, new SuperMap3D.Color(9 / 255, 9 / 255, 255 / 255));
  /*
   ***坡度分析模块***
  */
  //初始化分析区域 （后面有需要可以添加监听）

  if (props && props.slopePositions) {
    slopeUpdate(props.slopePositions);
  }

  if (storeState.isViewer) {// if (!window.tooltip) {
    //     window.tooltip = createTooltip(scene._element);
    // }
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {// if (!window.tooltip) {
      //     window.tooltip = createTooltip(scene._element);
      // }
    }
  }); // 分析

  function startSlope(e) {
    e.preventDefault(); // tooltip.setVisible(false);
    // if (tipFlag) {   //只提示一次
    //     window.tooltip.showAt(' <p>点击鼠标左键绘制分析区域</p><p>点击鼠标右键结束绘制</p><p>坡度坡向分析需要带法线地形</p>', '250px');
    //     tipFlag = false
    // }

    slope.DisplayMode = disMode;
    slope.MaxVisibleValue = slopData.wideMaxR;
    slope.MinVisibleValue = slopData.wideMinR;
    slope.ColorTable = SlopColorTable;
    slope.Opacity = slopData.trans; // this.positions = [];
    // viewer.scene.globe.enableLighting = true;

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", slopData.lineVisible).then(res => {
      slopePosition = res.positions;
      slopeUpdate(slopePosition);
      let handlerPolygon = window.handlerPolygon;
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();

      if (slopData.isEdit) {
        Edit(slopePosition, false, slopeUpdate);
      }
    }, err => {
      console.log(err);
    });
    handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(lang.NoPickPositionSupported);
    }
  }

  ; // 更新

  function slopeUpdate(p) {
    if (p) {
      slopePosition = p;
    }

    slope.CoverageArea = p;
    scene.globe.SlopeSetting = {
      slopeSetting: slope,
      analysisMode: wide
    };
  }

  ; // 清除

  function clearSlope(e) {
    e.preventDefault();
    slopePosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.SlopeSetting = {
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_NONE
    }; // tooltip.setVisible(false);

    clearHandlerDrawing("Polygon");
    clearEditHandler("Polygon");
  }

  ;
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => slopData.analysisArea, val => {
    switch (val) {
      case "ARM_REGION":
        {
          wide = SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION;
        }
        break;

      case "ARM_ALL":
        {
          wide = SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL;
        }
        break;

      case "ARM_NONE":
        {
          wide = SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_NONE;
        }
        break;

      default:
        break;
    }

    if (slopePosition.length == 0) {
      return;
    }

    slopeUpdate(slopePosition);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => slopData.wideMaxR, val => {
    slope.MaxVisibleValue = parseFloat(val);

    if (slopePosition.length == 0) {
      return;
    }

    scene.globe.SlopeSetting = {
      slopeSetting: slope,
      analysisMode: wide
    };
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => slopData.wideMinR, val => {
    slope.MinVisibleValue = parseFloat(val);

    if (slopePosition.length == 0) {
      return;
    }

    scene.globe.SlopeSetting = {
      slopeSetting: slope,
      analysisMode: wide
    };
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => slopData.slopeInterval, val => {
    slopData.wideMinR = val[0];
    slopData.wideMaxR = val[1]; // slope.MinVisibleValue = parseFloat(val[0]);
    // slope.MaxVisibleValue = parseFloat(val[1]);
    // if (slopePosition.length == 0) {
    //     return;
    // }
    // viewer.scene.globe.SlopeSetting = {
    //     slopeSetting: slope,
    //     analysisMode: wide,
    // };
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => slopData.displayMode, val => {
    switch (val) {
      case "FACE":
        {
          disMode = SuperMap3D.SlopeSettingEnum.DisplayMode.FACE;
        }
        break;

      case "ARROW":
        {
          disMode = SuperMap3D.SlopeSettingEnum.DisplayMode.ARROW;
        }
        break;

      case "FACE_AND_ARROW":
        {
          disMode = SuperMap3D.SlopeSettingEnum.DisplayMode.FACE_AND_ARROW;
        }
        break;

      default:
        break;
    }

    slope.DisplayMode = disMode;

    if (slopePosition.length == 0) {
      return;
    }

    slopeUpdate(slopePosition);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => slopData.trans, val => {
    slope.Opacity = parseFloat(val);

    if (slopePosition.length == 0) {
      return;
    }

    scene.globe.SlopeSetting = {
      slopeSetting: slope,
      analysisMode: wide
    };
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => slopData.isEdit, val => {
    if (val && window.handlerPolygon) {
      Edit(slopePosition, false, slopeUpdate);
    } else {
      clearEditHandler("Polygon");

      if (window.handlerPolygon && window.handlerPolygon.polygon) {
        window.handlerPolygon.polygon.show = false;
      }
    }
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    slope.destroy();
    SlopColorTable.destroy();
    slope = undefined;
    SlopColorTable = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(slopData),
    startSlope,
    clearSlope,
    slopePosition
  };
}

;
/* harmony default export */ var terrain_slope = (terrainSlope);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-slope/terrain-slope.vue?vue&type=script&lang=js



/* harmony default export */ var terrain_slopevue_type_script_lang_js = ({
  components: {
    Panel: panel
  },
  name: "Sm3dTerrainSlope",
  props: {
    //分析区域
    analysisArea: {
      type: String,
      default: "ARM_REGION"
    },
    //显示模式
    displayMode: {
      type: String,
      default: "FACE_AND_ARROW"
    },
    //最大坡度
    wideMaxR: {
      type: Number,
      default: 90
    },
    //最小坡度
    wideMinR: {
      type: Number,
      default: 0
    },
    //透明度
    trans: {
      type: Number,
      default: 0.8
    },
    //是否编辑
    isEdit: {
      type: Boolean,
      default: false
    },
    //初始化传入分析区域
    slopePositions: {
      type: Array
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true
    }
  },
  methods: {},

  setup(props) {
    let {
      analysisArea,
      displayMode,
      wideMaxR,
      wideMinR,
      trans,
      isEdit,
      slopeInterval,
      startSlope,
      clearSlope
    } = terrain_slope(props);

    function formatTooltip(val) {
      return Resource.slope + val + "°";
    }

    return {
      analysisArea,
      displayMode,
      wideMaxR,
      wideMinR,
      trans,
      isEdit,
      slopeInterval,
      startSlope,
      clearSlope,
      formatTooltip
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-slope/terrain-slope.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-slope/terrain-slope.vue?vue&type=style&index=0&id=5eea6642&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-slope/terrain-slope.vue?vue&type=style&index=0&id=5eea6642&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-slope/terrain-slope.vue




;


const terrain_slope_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(terrain_slopevue_type_script_lang_js, [['render',terrain_slopevue_type_template_id_5eea6642_scoped_true_render],['__scopeId',"data-v-5eea6642"]])

/* harmony default export */ var terrain_slope_terrain_slope = (terrain_slope_exports_);
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-slope/index.js


terrain_slope_terrain_slope.install = function (app) {
  app.component(terrain_slope_terrain_slope.name, terrain_slope_terrain_slope);
};

/* harmony default export */ var terrain_analysis_terrain_slope = (terrain_slope_terrain_slope);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-flood/terrain-flood.vue?vue&type=template&id=57f4546b&scoped=true


const terrain_floodvue_type_template_id_57f4546b_scoped_true_withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.pushScopeId)("data-v-57f4546b"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.popScopeId)(), n);

const terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_1 = {
  class: "sm-global-row"
};

const terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_2 = /*#__PURE__*/terrain_floodvue_type_template_id_57f4546b_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "可见高度", -1));

const terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_3 = {
  class: "sm-global-row"
};

const terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_4 = /*#__PURE__*/terrain_floodvue_type_template_id_57f4546b_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "当前高程", -1));

const terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_5 = {
  class: "sm-global-row"
};

const terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_6 = /*#__PURE__*/terrain_floodvue_type_template_id_57f4546b_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "淹没速度", -1));

const terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_7 = {
  class: "sm-global-button"
};

const terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("分析");

const terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function terrain_floodvue_type_template_id_57f4546b_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_input_number = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-input-number");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 230,
    pHeight: 180
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_1, [terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.floodHeight,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.floodHeight = $event),
      min: 0,
      max: 9000,
      range: "",
      step: 1
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_3, [terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      class: "sm-global-input-number",
      value: $setup.currentHeight,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.currentHeight = $event),
      min: 0,
      disabled: ""
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_5, [terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.floodSpeed,
      "onUpdate:value": _cache[2] || (_cache[2] = $event => $setup.floodSpeed = $event),
      max: 1000,
      min: 1
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_7, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.floodBegin
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_8]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.floodClear
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [terrain_floodvue_type_template_id_57f4546b_scoped_true_hoisted_9]),
      _: 1
    }, 8, ["onClick"])])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-flood/terrain-flood.vue?vue&type=template&id=57f4546b&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-flood/terrain-flood.js
// 引入依赖

 //公共handler等js

 //提示等工具

 //语言资源

function terrainFlood(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    maxHeight: 9000,
    //最大可见高程
    minHeight: 1000,
    //最小可见高程
    floodHeight: [1000, 9000],
    currentHeight: 1000,
    //当前高程
    floodTrans: 0.8,
    //透明度
    cheackedBand: 'band1',
    //当前选择颜色
    colorBandShow: false,
    //颜色下拉框显隐
    floodSpeed: 800,
    //速度
    floodPositions: [],
    lineVisible: true //是否显示绘制线

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let floodDisplayMode = SuperMap3D.HypsometricSettingEnum.DisplayMode.FACE;
  let hypFlood = new SuperMap3D.HypsometricSetting();
  let floodColorTable = new SuperMap3D.ColorTable();
  let colors = tool.gradientColors("#95E9F9", "#002794", 20, 0.8); // 0-4500米颜色取值

  colors.forEach((color, index) => {
    let h = 500 + 200 * index;
    floodColorTable.insert(h, SuperMap3D.Color.fromCssColorString(color));
  });
  floodColorTable.insert(9000, new SuperMap3D.Color(0, 39 / 255, 148 / 255, 1));
  floodColorTable.insert(0, new SuperMap3D.Color(149 / 255, 232 / 255, 249 / 255, 0.5));
  let interval;
  let floodPosition = [];
  /*
   ***地形淹没分析模块***
  */
  // 分析

  function floodBegin(e) {
    e.preventDefault();
    hypFlood.DisplayMode = floodDisplayMode;
    hypFlood._lineColor = new SuperMap3D.Color(1.0, 0.0, 0.0, 1.0);
    hypFlood.MinVisibleValue = state.minHeight;
    hypFlood.MaxVisibleValue = 0;
    hypFlood.ColorTableMinKey = 1;
    hypFlood.ColorTableMaxKey = 9000;
    hypFlood.ColorTable = floodColorTable;
    hypFlood.Opacity = state.floodTrans;
    hypFlood.LineInterval = 200.0;

    if (!window.handlerPolygon) {
      drawHandler.initHandler("Polygon");
    }

    if (props && props.floodPositions) {
      floodUpdate(props.floodPositions);
      return;
    }

    drawHandler.handlerDrawing("Polygon", state.lineVisible).then(res => {
      let handlerPolygon = window.handlerPolygon;
      floodUpdate(res.positions);
      handlerPolygon.polygon.show = false; // handlerPolygon.polyline.show = false;

      handlerPolygon.deactivate();
    }, err => {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(lang.NoPickPositionSupported);
    }
  }

  ;

  function floodUpdate(positions) {
    if (positions) {
      floodPosition = positions;
    }

    let currentH = parseFloat(state.minHeight);
    hypFlood.CoverageArea = positions;
    interval = setInterval("flood()", 100);

    window.flood = () => {
      if (currentH <= state.maxHeight) {
        state.currentHeight = parseInt(currentH);
      }

      if (currentH > state.maxHeight) {
        state.currentHeight = state.maxHeight;
        clearInterval(interval);
        return;
      }

      hypFlood.MaxVisibleValue = currentH;

      try {
        scene.globe.HypsometricSetting = {
          hypsometricSetting: hypFlood,
          analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
        };
      } catch (err) {
        console.log(err);
        clearInterval(interval);
      }

      ;
      currentH += parseFloat(state.floodSpeed) / 10;
    };
  }

  ; // 清除

  function floodClear(e) {
    e.preventDefault();
    floodPosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.HypsometricSetting = undefined;
    clearInterval(interval);
    drawHandler.clearHandlerDrawing("Polygon");
  }

  ; //选择颜色带bands

  function changeColor(band) {
    state.colorBandShow = false;
    state.cheackedBand = band;
  }

  ; //监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.floodTrans, val => {
    hypFlood.Opacity = parseFloat(val);

    if (floodPosition.length == 0) {
      return;
    }

    scene.globe.HypsometricSetting = {
      hypsometricSetting: hypFlood,
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    };
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.floodHeight, val => {
    state.minHeight = val[0];
    state.maxHeight = val[1];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.minHeight, val => {
    hypFlood.MinVisibleValue = parseInt(val);

    if (floodPosition.length == 0) {
      state.currentHeight = parseInt(val);
      return;
    }

    scene.globe.HypsometricSetting = {
      hypsometricSetting: hypFlood,
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    };
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.maxHeight, val => {
    hypFlood.MaxVisibleValue = parseInt(val);

    if (floodPosition.length == 0) {
      return;
    }

    scene.globe.HypsometricSetting = {
      hypsometricSetting: hypFlood,
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    };
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.cheackedBand, val => {
    floodColorTable = colorBandsChange(val);
    hypFlood.ColorTable = floodColorTable;

    if (floodPosition.length == 0) {
      return;
    }

    if (interval) {
      scene.globe.HypsometricSetting = {
        hypsometricSetting: hypFlood,
        analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
      };
    }
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    hypFlood.destroy();
    floodColorTable.destroy();
    hypFlood = undefined;
    floodColorTable = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    floodBegin,
    floodClear,
    changeColor,
    floodPosition
  };
}

;
/* harmony default export */ var terrain_flood = (terrainFlood);

function colorBandsChange(val) {
  let floodColorTable = new SuperMap3D.ColorTable();

  switch (val) {
    case "band1":
      floodColorTable.insert(9000, new SuperMap3D.Color(0, 39 / 255, 148 / 255));
      floodColorTable.insert(0, new SuperMap3D.Color(149 / 255, 232 / 255, 249 / 255));
      break;

    case "band2":
      floodColorTable.insert(9000, new SuperMap3D.Color(162 / 255, 251 / 255, 194 / 255));
      floodColorTable.insert(0, new SuperMap3D.Color(1, 103 / 255, 103 / 255));
      break;

    case "band3":
      floodColorTable.insert(9000, new SuperMap3D.Color(230 / 255, 198 / 255, 1));
      floodColorTable.insert(0, new SuperMap3D.Color(157 / 255, 0, 1));
      break;

    case "band4":
      floodColorTable.insert(9000, new SuperMap3D.Color(210 / 255, 15 / 255, 15 / 255));
      floodColorTable.insert(6000, new SuperMap3D.Color(221 / 255, 224 / 255, 7 / 255));
      floodColorTable.insert(5000, new SuperMap3D.Color(20 / 255, 187 / 255, 18 / 255));
      floodColorTable.insert(4000, new SuperMap3D.Color(0, 161 / 255, 1));
      floodColorTable.insert(0, new SuperMap3D.Color(9 / 255, 9 / 255, 212 / 255));
      break;

    case "band5":
      floodColorTable.insert(9000, new SuperMap3D.Color(186 / 255, 1, 229 / 255));
      floodColorTable.insert(0, new SuperMap3D.Color(26 / 255, 185 / 255, 156 / 255));
      break;

    default:
      floodColorTable.insert(9000, new SuperMap3D.Color(0, 39 / 255, 148 / 255));
      floodColorTable.insert(0, new SuperMap3D.Color(149 / 255, 232 / 255, 249 / 255));
      break;
  }

  ;
  return floodColorTable;
}
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-flood/terrain-flood.vue?vue&type=script&lang=js


/* harmony default export */ var terrain_floodvue_type_script_lang_js = ({
  name: "Sm3dTerrainFlood",
  components: {
    Panel: panel
  },
  props: {
    //最大可见高层
    maxHeight: {
      type: Number,
      default: 8000
    },
    //最小可见高程
    minHeight: {
      type: Number,
      default: 1000
    },
    //选择颜色
    cheackedBand: {
      type: String,
      default: "band1"
    },
    //淹没速度
    floodSpeed: {
      type: Number,
      default: 800
    },
    //透明度
    floodTrans: {
      type: Number,
      default: 0.8
    },
    //初始化传入分析区域
    floodPositions: {
      type: Array
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    let {
      floodHeight,
      currentHeight,
      floodSpeed,
      floodBegin,
      floodClear
    } = terrain_flood(props);

    function formatTooltip(val) {
      return val + "米";
    }

    function formatTooltip2(val) {
      return val + "米/秒";
    }

    return {
      floodHeight,
      currentHeight,
      floodSpeed,
      floodBegin,
      floodClear,
      formatTooltip,
      formatTooltip2
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-flood/terrain-flood.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/terrain-analysis/terrain-flood/terrain-flood.vue?vue&type=style&index=0&id=57f4546b&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-flood/terrain-flood.vue?vue&type=style&index=0&id=57f4546b&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-flood/terrain-flood.vue




;


const terrain_flood_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(terrain_floodvue_type_script_lang_js, [['render',terrain_floodvue_type_template_id_57f4546b_scoped_true_render],['__scopeId',"data-v-57f4546b"]])

/* harmony default export */ var terrain_flood_terrain_flood = (terrain_flood_exports_);
;// CONCATENATED MODULE: ./globalCom/components/terrain-analysis/terrain-flood/index.js


terrain_flood_terrain_flood.install = function (app) {
  app.component(terrain_flood_terrain_flood.name, terrain_flood_terrain_flood);
};

/* harmony default export */ var terrain_analysis_terrain_flood = (terrain_flood_terrain_flood);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/clip/clip-box/clip-box.vue?vue&type=template&id=37a724f0


const clip_boxvue_type_template_id_37a724f0_hoisted_1 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪内部");

const clip_boxvue_type_template_id_37a724f0_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪外部");

const clip_boxvue_type_template_id_37a724f0_hoisted_3 = {
  class: "sm-global-button"
};

const clip_boxvue_type_template_id_37a724f0_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪");

const clip_boxvue_type_template_id_37a724f0_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function clip_boxvue_type_template_id_37a724f0_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_radio = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio");

  const _component_a_radio_group = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio-group");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 250,
    pHeight: 100
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio_group, {
      value: $setup.clipModel,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.clipModel = $event),
      class: "sm-global-row"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "ClipInside"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_boxvue_type_template_id_37a724f0_hoisted_1]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "ClipOutside"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_boxvue_type_template_id_37a724f0_hoisted_2]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_boxvue_type_template_id_37a724f0_hoisted_3, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.BoxClipByEitor
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_boxvue_type_template_id_37a724f0_hoisted_4]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearBoxClipByEitor
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_boxvue_type_template_id_37a724f0_hoisted_5]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-box/clip-box.vue?vue&type=template&id=37a724f0

;// CONCATENATED MODULE: ./globalCom/components/clip/clip-box/clip-box.js
// 引入依赖

 //提示等工具

 //语言资源


 //简单局部状态管理

function clipBoxAnalysis(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    clipModel: 'ClipInside' //裁剪模式js

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let clipMode = 'clip_behind_all_plane'; //裁剪模式值 外部: clip_behind_any_plane

  let layers, handlerBox, boxEntity, editorBox;

  if (storeState.isViewer) {
    layers = scene.layers && scene.layers.layerQueue;
    handlerBox = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Box);

    if (!window.tooltip) {
      window.tooltip = tool_tooltip(scene._element);
    }
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      layers = scene.layers && scene.layers.layerQueue;
      handlerBox = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Box);

      if (!window.tooltip) {
        window.tooltip = tool_tooltip(scene._element);
      }
    }
  });
  /*
   ***裁剪交互分析模块***
  */
  // 分析

  function BoxClipByEitor() {
    clearBoxClipByEitor();

    if (editorBox) {
      handlerBox.activate();
      return;
    } // 设置裁剪线颜色


    setAllLayersClipColor(); //交互绘制box

    handlerBox.movingEvt.addEventListener(windowPosition => {
      if (handlerBox.isDrawing) {
        tooltip.showAt(' <p>点击鼠标左键结束绘制box底面</p><p>移动鼠标绘制box高度</p><p>点击鼠标右键结束绘制</p>', '230px');
      } else {
        tooltip.showAt(' <p>点击鼠标左键开始绘制box底面</p>', '230px');
      }
    });
    handlerBox.drawEvt.addEventListener(e => {
      boxEntity = e.object; // let boxEntity = this.boxEntity;

      let newDim = boxEntity.box.dimensions.getValue();
      let position = boxEntity.position.getValue(0);
      let boxOption = {
        dimensions: newDim,
        position: position,
        clipMode: clipMode,
        heading: 0
      }; //box编辑

      editorBox = new SuperMap3D.BoxEditor(scene, boxEntity);
      editorBox.editEvt.addEventListener(e => {
        boxEntity.box.dimensions = e.dimensions;
        boxEntity.position = e.position;
        boxEntity.orientation = e.orientation;
        setClipBox();
      });
      editorBox.activate();
      setAllLayersClipOptions(boxOption);
      tooltip.setVisible(false);
      handlerBox.clear();
      handlerBox.deactivate();
    });
    handlerBox.activate();
  }

  ; // 更新

  function setClipBox() {
    if (typeof boxEntity == "undefined") {
      return;
    }

    let newDim = boxEntity.box.dimensions.getValue();
    let position = boxEntity.position.getValue(0);
    let heading = 0;

    if (typeof boxEntity.orientation != "undefined") {
      let rotationM3 = SuperMap3D.Matrix3.fromQuaternion(boxEntity.orientation._value, new SuperMap3D.Matrix3());
      let localFrame = SuperMap3D.Matrix4.fromRotationTranslation(rotationM3, SuperMap3D.Cartesian3.ZERO, new SuperMap3D.Matrix4());
      let inverse = SuperMap3D.Matrix4.inverse(SuperMap3D.Transforms.eastNorthUpToFixedFrame(position), new SuperMap3D.Matrix4());
      let hprm = SuperMap3D.Matrix4.multiply(inverse, localFrame, new SuperMap3D.Matrix4());
      let rotation = SuperMap3D.Matrix4.getMatrix3(hprm, new SuperMap3D.Matrix3());
      let hpr = SuperMap3D.HeadingPitchRoll.fromQuaternion(SuperMap3D.Quaternion.fromRotationMatrix(rotation));
      heading = hpr.heading;
    }

    let boxOptions = {
      dimensions: newDim,
      position: position,
      clipMode: clipMode,
      heading: heading
    };
    setAllLayersClipOptions(boxOptions);
  }

  ; //设置图层裁剪

  function setAllLayersClipOptions(boxOptions) {
    for (let i = 0, j = layers.length; i < j; i++) {
      layers[i].setCustomClipBox(boxOptions);
    }
  }

  ; //设置线颜色

  function setAllLayersClipColor() {
    for (let i = 0, j = layers.length; i < j; i++) {
      layers[i].selectEnabled = false;
      layers[i].clipLineColor = new SuperMap3D.Color(1, 1, 1, 0);
    }
  }

  ; // 清除

  function clearBoxClipByEitor() {
    if (handlerBox) {
      handlerBox.deactivate();
      tooltip.setVisible(false);
    }

    if (!boxEntity) {
      return;
    }

    for (let layer of layers) {
      layer.clearCustomClipBox();
    }

    boxEntity = undefined;
    editorBox.deactivate();
    scene.trackingLayer.removeAll();
    handlerBox.clear();
  }

  ; // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.clipModel, val => {
    switch (val) {
      case "ClipInside":
        clipMode = 'clip_behind_all_plane';
        break;

      case "ClipOutside":
        clipMode = 'clip_behind_any_plane';
        break;

      default:
        break;
    }

    if (boxEntity) {
      setClipBox();
    }
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    if (editorBox) {
      editorBox.destroy();
    }

    editorBox = undefined;
    layers = undefined;
    handlerBox = undefined;
    boxEntity = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    BoxClipByEitor,
    clearBoxClipByEitor
  };
}

;
/* harmony default export */ var clip_box = (clipBoxAnalysis);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/clip/clip-box/clip-box.vue?vue&type=script&lang=js



/* harmony default export */ var clip_boxvue_type_script_lang_js = ({
  name: "Sm3dClipBox",
  components: {
    Panel: panel
  },
  props: {
    //裁剪模式
    clipModel: {
      type: String,
      default: "ClipInside"
    }
  },

  setup(props) {
    let {
      clipModel,
      BoxClipByEitor,
      clearBoxClipByEitor
    } = clip_box(props);
    return {
      clipModel,
      BoxClipByEitor,
      clearBoxClipByEitor,
      clipBoxAnalysis: clip_box
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-box/clip-box.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-box/clip-box.vue




;
const clip_box_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(clip_boxvue_type_script_lang_js, [['render',clip_boxvue_type_template_id_37a724f0_render]])

/* harmony default export */ var clip_box_clip_box = (clip_box_exports_);
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-box/index.js
// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

clip_box_clip_box.install = function (app) {
  app.component(clip_box_clip_box.name, clip_box_clip_box);
};

/* harmony default export */ var clip_clip_box = (clip_box_clip_box);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/clip/clip-cross/clip-cross.vue?vue&type=template&id=9d5bcb4c&scoped=true


const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.pushScopeId)("data-v-9d5bcb4c"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.popScopeId)(), n);

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_1 = {
  class: "sm-global-row"
};

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_2 = /*#__PURE__*/clip_crossvue_type_template_id_9d5bcb4c_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "裁剪宽度", -1));

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_3 = {
  class: "sm-cc-slider-input"
};
const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_4 = {
  class: "sm-global-row"
};

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_5 = /*#__PURE__*/clip_crossvue_type_template_id_9d5bcb4c_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "裁剪高度", -1));

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_6 = {
  class: "sm-cc-slider-input"
};
const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_7 = {
  class: "sm-global-row"
};

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_8 = /*#__PURE__*/clip_crossvue_type_template_id_9d5bcb4c_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "绕X轴旋转", -1));

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_9 = {
  class: "sm-cc-slider-input"
};
const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_10 = {
  class: "sm-global-row"
};

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_11 = /*#__PURE__*/clip_crossvue_type_template_id_9d5bcb4c_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "绕Y轴旋转", -1));

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_12 = {
  class: "sm-cc-slider-input"
};
const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_13 = {
  class: "sm-global-row"
};

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_14 = /*#__PURE__*/clip_crossvue_type_template_id_9d5bcb4c_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "绕Z轴旋转", -1));

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_15 = {
  class: "sm-cc-slider-input"
};
const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_16 = {
  class: "sm-global-row"
};

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_17 = /*#__PURE__*/clip_crossvue_type_template_id_9d5bcb4c_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "拉伸高度", -1));

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_18 = {
  class: "sm-cc-slider-input"
};
const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_19 = {
  class: "sm-global-button"
};

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_20 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪");

const clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_21 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function clip_crossvue_type_template_id_9d5bcb4c_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_input_number = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-input-number");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 300
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_1, [clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_3, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-cc-slider",
      value: $setup.clipWidth,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.clipWidth = $event),
      min: 1,
      step: 1
    }, null, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.clipWidth,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.clipWidth = $event),
      min: 1
    }, null, 8, ["value"])])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_4, [clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_5, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_6, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-cc-slider",
      value: $setup.clipHeight,
      "onUpdate:value": _cache[2] || (_cache[2] = $event => $setup.clipHeight = $event),
      min: 1
    }, null, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.clipHeight,
      "onUpdate:value": _cache[3] || (_cache[3] = $event => $setup.clipHeight = $event),
      min: 1
    }, null, 8, ["value"])])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_7, [clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_8, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_9, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-cc-slider",
      value: $setup.pitch,
      "onUpdate:value": _cache[4] || (_cache[4] = $event => $setup.pitch = $event),
      min: 1,
      step: 1,
      max: 360
    }, null, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.pitch,
      "onUpdate:value": _cache[5] || (_cache[5] = $event => $setup.pitch = $event),
      min: 0,
      max: 360
    }, null, 8, ["value"])])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_10, [clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_11, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_12, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-cc-slider",
      value: $setup.roll,
      "onUpdate:value": _cache[6] || (_cache[6] = $event => $setup.roll = $event),
      min: 0,
      step: 1,
      max: 360
    }, null, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.roll,
      "onUpdate:value": _cache[7] || (_cache[7] = $event => $setup.roll = $event),
      min: 0,
      max: 360
    }, null, 8, ["value"])])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_13, [clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_14, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_15, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-cc-slider",
      value: $setup.heading,
      "onUpdate:value": _cache[8] || (_cache[8] = $event => $setup.heading = $event),
      min: 0,
      step: 1,
      max: 360
    }, null, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.heading,
      "onUpdate:value": _cache[9] || (_cache[9] = $event => $setup.heading = $event),
      min: 0,
      max: 360
    }, null, 8, ["value"])])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_16, [clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_17, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_18, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-cc-slider",
      value: $setup.extrude,
      "onUpdate:value": _cache[10] || (_cache[10] = $event => $setup.extrude = $event),
      min: 1,
      step: 1
    }, null, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.extrude,
      "onUpdate:value": _cache[11] || (_cache[11] = $event => $setup.extrude = $event),
      min: 1
    }, null, 8, ["value"])])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_19, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.startCross
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_20]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearCross
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_crossvue_type_template_id_9d5bcb4c_scoped_true_hoisted_21]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-cross/clip-cross.vue?vue&type=template&id=9d5bcb4c&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/clip/clip-cross/clip-cross.js
// 引入依赖

 //提示等工具

 //语言资源

 //简单局部状态管理

function clipCrossAnalysis(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    clipWidth: 5,
    clipHeight: 5,
    heading: 0,
    pitch: 0,
    roll: 0,
    extrude: 1
  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let layers;
  let screenSpaceEventHandler;
  let startClip, //裁剪标志
  box, boxPosition, dim, //entity
  position; //裁剪区域

  if (storeState.isViewer) {
    screenSpaceEventHandler = new SuperMap3D.ScreenSpaceEventHandler(scene.canvas);
    layers = scene.layers && scene.layers.layerQueue;
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      screenSpaceEventHandler = new SuperMap3D.ScreenSpaceEventHandler(scene.canvas);
      layers = scene.layers && scene.layers.layerQueue;
    }
  });
  /*
   ***cross分析模块***
  */
  // 分析

  function startCross(e) {
    e.preventDefault();

    if (!scene) {
      return;
    }

    if (box) {
      clearCross();
    }

    start();
    startClip = true;
    box.show = true;
  }

  ;

  function start() {
    for (let layer of layers) {
      layer.selectEnabled = false;
    } // 添加盒子


    boxPosition = SuperMap3D.Cartesian3.fromDegrees(0, 0, 0);
    dim = new SuperMap3D.Cartesian3(state.clipWidth, state.clipHeight, 0.1);
    box = scene.trackingLayer.add({
      // 标识盒
      id: "cross-clip-identify-box",
      position: boxPosition,
      show: false,
      box: {
        dimensions: dim,
        fill: false,
        outline: true,
        outlineColor: SuperMap3D.Color.AQUA,
        outlineWidth: 5.0
      }
    });
    let hpr;
    screenSpaceEventHandler.setInputAction(movement => {
      if (startClip) {
        boxPosition = scene.pickPosition(movement.endPosition);

        if (!boxPosition) {
          return;
        }

        box.position = boxPosition;

        if (!hpr) {
          hpr = new SuperMap3D.HeadingPitchRoll(SuperMap3D.Math.toRadians(state.heading), SuperMap3D.Math.toRadians(state.pitch), SuperMap3D.Math.toRadians(state.roll));
        }

        let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(boxPosition, hpr);
        box.orientation = orientation;
      }
    }, SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
    screenSpaceEventHandler.setInputAction(evt => {
      if (startClip) {
        position = scene.pickPosition(evt.position);

        if (!position) {
          return;
        }

        updateClip();
        startClip = false;
        box.show = false;
      }

      screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
      screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
      hpr = null;
    }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
  }

  ; // 更新

  function updateClip() {
    for (let layer of layers) {
      layer.setCustomClipCross({
        position: position,
        dimensions: dim,
        heading: state.heading,
        pitch: state.pitch,
        roll: state.roll,
        extrudeDistance: Number(state.extrude)
      });
    }
  }

  ; // 清除

  function clearCross() {
    box && scene.trackingLayer.removeById("cross-clip-identify-box");

    for (let layer of layers) {
      layer.clearCustomClipBox();
    }

    startClip = false;
    box = undefined;
    screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
    screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
  }

  ; // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.clipWidth, val => {
    let temp_width = Number(val);

    if (temp_width <= 0 || !box) {
      return;
    }

    box.box.dimensions = new SuperMap3D.Cartesian3(state.clipWidth, state.clipHeight, 0.1);
    dim = new SuperMap3D.Cartesian3(temp_width, state.clipHeight, state.extrude);
    updateClip();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.clipHeight, val => {
    let temp_height = Number(val);

    if (temp_height <= 0 || !box) {
      return;
    }

    box.box.dimensions = new SuperMap3D.Cartesian3(state.clipWidth, state.clipHeight, 0.1);
    dim = new SuperMap3D.Cartesian3(state.clipWidth, temp_height, state.extrude);
    updateClip();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.pitch, val => {
    if (val === "" || !box) {
      return;
    }

    let pitch = Number(val);
    let hpr = new SuperMap3D.HeadingPitchRoll(SuperMap3D.Math.toRadians(state.heading), SuperMap3D.Math.toRadians(pitch), SuperMap3D.Math.toRadians(state.roll));
    let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(boxPosition, hpr);
    box.orientation = orientation;
    updateClip();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.roll, val => {
    if (val === "" || !box) {
      return;
    }

    let roll = Number(val);
    let hpr = new SuperMap3D.HeadingPitchRoll(SuperMap3D.Math.toRadians(state.heading), SuperMap3D.Math.toRadians(state.pitch), SuperMap3D.Math.toRadians(roll));
    let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(boxPosition, hpr);
    box.orientation = orientation;
    updateClip();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.heading, val => {
    if (val === "" || !box) {
      return;
    }

    let heading = Number(val);
    let hpr = new SuperMap3D.HeadingPitchRoll(SuperMap3D.Math.toRadians(heading), SuperMap3D.Math.toRadians(state.pitch), SuperMap3D.Math.toRadians(state.roll));
    let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(boxPosition, hpr);
    box.orientation = orientation;
    updateClip();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.extrude, val => {
    let temp_extrudeDistance = Number(val);

    if (temp_extrudeDistance <= 0 || !box) {
      return;
    }

    updateClip();
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    screenSpaceEventHandler.destroy();
    layers = undefined;
    box = undefined;
    screenSpaceEventHandler = undefined;
    dim = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    startCross,
    clearCross
  };
}

;
/* harmony default export */ var clip_cross = (clipCrossAnalysis);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/clip/clip-cross/clip-cross.vue?vue&type=script&lang=js



/* harmony default export */ var clip_crossvue_type_script_lang_js = ({
  components: {
    Panel: panel
  },
  name: "Sm3dClipCross",
  props: {
    //宽度
    clipWidth: {
      type: Number,
      default: 5
    },
    //高度
    clipHeight: {
      type: Number,
      default: 5
    },
    //绕X选转
    heading: {
      type: Number,
      default: 0
    },
    //绕Y
    pitch: {
      type: Number,
      default: 0
    },
    //绕Z
    roll: {
      type: Number,
      default: 0
    },
    //拉伸
    extrude: {
      type: Number,
      default: 1
    }
  },

  setup(props) {
    let {
      clipWidth,
      clipHeight,
      heading,
      pitch,
      roll,
      extrude,
      startCross,
      clearCross
    } = clip_cross(props);
    return {
      clipWidth,
      clipHeight,
      heading,
      pitch,
      roll,
      extrude,
      startCross,
      clearCross
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-cross/clip-cross.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/clip/clip-cross/clip-cross.vue?vue&type=style&index=0&id=9d5bcb4c&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/clip/clip-cross/clip-cross.vue?vue&type=style&index=0&id=9d5bcb4c&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/clip/clip-cross/clip-cross.vue




;


const clip_cross_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(clip_crossvue_type_script_lang_js, [['render',clip_crossvue_type_template_id_9d5bcb4c_scoped_true_render],['__scopeId',"data-v-9d5bcb4c"]])

/* harmony default export */ var clip_cross_clip_cross = (clip_cross_exports_);
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-cross/index.js
// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

clip_cross_clip_cross.install = function (app) {
  app.component(clip_cross_clip_cross.name, clip_cross_clip_cross);
};

/* harmony default export */ var clip_clip_cross = (clip_cross_clip_cross);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/clip/clip-plane/clip-plane.vue?vue&type=template&id=a4e22f70

const clip_planevue_type_template_id_a4e22f70_hoisted_1 = {
  class: "sm-global-row"
};

const clip_planevue_type_template_id_a4e22f70_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "平面方向", -1);

const clip_planevue_type_template_id_a4e22f70_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("竖直方向");

const clip_planevue_type_template_id_a4e22f70_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("水平方向");

const clip_planevue_type_template_id_a4e22f70_hoisted_5 = {
  class: "sm-global-row"
};

const clip_planevue_type_template_id_a4e22f70_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "裁剪模式", -1);

const clip_planevue_type_template_id_a4e22f70_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪内部");

const clip_planevue_type_template_id_a4e22f70_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪外部");

const clip_planevue_type_template_id_a4e22f70_hoisted_9 = {
  class: "sm-global-button"
};

const clip_planevue_type_template_id_a4e22f70_hoisted_10 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪");

const clip_planevue_type_template_id_a4e22f70_hoisted_11 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function clip_planevue_type_template_id_a4e22f70_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 220,
    pHeight: 140
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_planevue_type_template_id_a4e22f70_hoisted_1, [clip_planevue_type_template_id_a4e22f70_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.planeDirection,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.planeDirection = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "vertical"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_planevue_type_template_id_a4e22f70_hoisted_3]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "parallel"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_planevue_type_template_id_a4e22f70_hoisted_4]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_planevue_type_template_id_a4e22f70_hoisted_5, [clip_planevue_type_template_id_a4e22f70_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.clipMode,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.clipMode = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "ClipInside"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_planevue_type_template_id_a4e22f70_hoisted_7]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "ClipOutside"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_planevue_type_template_id_a4e22f70_hoisted_8]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_planevue_type_template_id_a4e22f70_hoisted_9, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clipPlaneStart
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_planevue_type_template_id_a4e22f70_hoisted_10]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearClipPlane
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_planevue_type_template_id_a4e22f70_hoisted_11]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-plane/clip-plane.vue?vue&type=template&id=a4e22f70

;// CONCATENATED MODULE: ./globalCom/components/clip/clip-plane/clip-plane.js
// 引入依赖

 //公共handler.js

 //提示等工具

 //语言资源


 //简单局部状态管理

function clipPlane(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    clipMode: 'ClipInside',
    //裁剪模式
    planeDirection: 'vertical' //裁剪方向

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let layers;
  let planePositionObj;
  let editEntity, s3mInstanceColc;
  let modelUrl = 'public/data/s3m/box.s3m';
  let modelEditor;
  /*
   ***平面分析模块***
  */
  //监听图层加载完成或改变触发

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    layers = scene.layers && scene.layers.layerQueue;

    for (let layer of layers) {
      layer.selectEnabled = false;
      layer.clipLineColor = new SuperMap3D.Color(1, 1, 1, 0);
    }
  });

  if (storeState.isViewer) {
    init();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    init();
  });

  function init() {
    layers = scene.layers && scene.layers.layerQueue;
    s3mInstanceColc = new SuperMap3D.S3MInstanceCollection(scene._context);
    scene.primitives.add(s3mInstanceColc);

    if (!window.tooltip) {
      window.tooltip = tool_tooltip(scene._element);
    }
  } // 分析


  function clipPlaneStart(e) {
    e.preventDefault();
    if (planeSurface) clearClipPlane();
    tooltip.setVisible(false);
    tooltip.showAt('<p>点击鼠标左键开始绘制平面的一条边</p><p>绘制两点即可</p><p>点击鼠标右键结束绘制</p>', '350px');

    if (!window.handlerPolygon) {
      initHandler("Polyline");
    }

    handlerDrawing("Polyline").then(res => {
      let handlerPolyline = window.handlerPolyline;
      handlerPolyline.polyline.show = false;
      window.polylineTransparent.show = false; //半透线隐藏

      handlerPolyline.deactivate();
      setPlanePositions(res.positions, res.result.object._positions);
      tooltip.setVisible(false);
    }, err => {
      console.log(err);
    });
    window.handlerPolyline.activate();
  }

  ; // 垂直地面裁剪面设置

  function verticalGroundPlane(linePositions, carPos, width) {
    let point1 = linePositions.slice(0, 3);
    let point2 = linePositions.slice(3, 6);
    let point3 = point2.slice(0, 2).concat(point2[2] + width);
    let point4 = point1.slice(0, 2).concat(point1[2] + width);
    let catPoints = [].concat(carPos);
    catPoints.push(SuperMap3D.Cartesian3.fromDegrees(point3[0], point3[1], point3[2]));
    catPoints.push(SuperMap3D.Cartesian3.fromDegrees(point4[0], point4[1], point4[2]));
    return catPoints;
  } // 平行地面的裁剪面


  function parallelGroundPlane(carPos, width) {
    let Vab = new SuperMap3D.Cartesian3(0, 0, 0);
    let Vbc = new SuperMap3D.Cartesian3(0, 0, 0);
    let py = new SuperMap3D.Cartesian3(0, 0, 0);
    let point3 = new SuperMap3D.Cartesian3(0, 0, 0);
    let point4 = new SuperMap3D.Cartesian3(0, 0, 0);
    SuperMap3D.Cartesian3.subtract(carPos[0], carPos[1], Vab);
    SuperMap3D.Cartesian3.cross(Vab, carPos[0], Vbc);
    SuperMap3D.Cartesian3.normalize(Vbc, Vbc);
    SuperMap3D.Cartesian3.multiplyComponents(Vbc, new SuperMap3D.Cartesian3(width, width, width), py);
    SuperMap3D.Cartesian3.add(carPos[0], py, point4);
    SuperMap3D.Cartesian3.add(carPos[1], py, point3);
    let catPoints = [carPos[0], carPos[1], point3, point4];
    return catPoints;
  }

  function setPlanePositions(linePositions, carPos) {
    let cartPositions;
    let width = SuperMap3D.Cartesian3.distance(carPos[0], carPos[1]);
    width = SuperMap3D.defaultValue(width, 100);
    if (state.planeDirection === 'vertical') cartPositions = verticalGroundPlane(linePositions, carPos, width);else cartPositions = parallelGroundPlane(carPos, width);
    let centerP = SuperMap3D.BoundingSphere.fromPoints(cartPositions).center;
    planePositionObj = {
      cartPositions: cartPositions,
      centerPositions: centerP
    };
    addsurface();
    clipPlaneUpdate();
  }

  let planeSurface;

  function addsurface() {
    planeSurface = scene.trackingLayer.add({
      id: "clip-plane",
      polygon: {
        hierarchy: new SuperMap3D.CallbackProperty(() => {
          return {
            positions: planePositionObj.cartPositions,
            holes: []
          };
        }, false),
        material: SuperMap3D.Color.GOLD.withAlpha(0.2),
        outline: true,
        outlineColor: SuperMap3D.Color.GOLD,
        perPositionHeight: true
      }
    });
    addModel();
  }

  function addModel() {
    let getAngleAndRadian = tool.getAngleAndRadian(planePositionObj.cartPositions[0], planePositionObj.cartPositions[1]);
    let heading = getAngleAndRadian.radian;
    let id = "clip-model";
    s3mInstanceColc.add(modelUrl, {
      id: id,
      position: planePositionObj.centerPositions,
      hpr: new SuperMap3D.HeadingPitchRoll(heading, 0, 0),
      // color:SuperMap3D.Color.RED,
      scale: new SuperMap3D.Cartesian3(0.1, 0.1, 0.1)
    });
    editEntity = s3mInstanceColc.getInstance(modelUrl, id);
    if (!modelEditor) addModelEditor(editEntity);else {
      modelEditor.setEditObject(editEntity);
      modelEditor.activate();
    }
  }

  function addModelEditor(model) {
    modelEditor = new SuperMap3D.ModelEditor({
      model: model,
      scene: scene,
      axesShow: {
        "translation": true,
        "rotation": false,
        "scale": false
      }
    });
    modelEditor.activate();
    modelEditor.changedEvt.addEventListener(param => {
      let Cartesian3 = new SuperMap3D.Cartesian3();
      SuperMap3D.Matrix4.getTranslation(param.modelMatrix, Cartesian3);

      if (Cartesian3) {
        let subx = Cartesian3.x - planePositionObj.centerPositions.x;
        let suby = Cartesian3.y - planePositionObj.centerPositions.y;
        let subz = Cartesian3.z - planePositionObj.centerPositions.z;

        for (let i = 0; i < 4; i++) {
          planePositionObj.cartPositions[i].x += subx;
          planePositionObj.cartPositions[i].y += suby;
          planePositionObj.cartPositions[i].z += subz;
        }

        planePositionObj.centerPositions = Cartesian3;
        clipPlaneUpdate();
      }
    });
  } // 更新


  function clipPlaneUpdate() {
    if (!planePositionObj.cartPositions) return;

    for (let layer of layers) {
      // layer.clearCustomClipBox();
      layer.setCustomClipPlane(planePositionObj.cartPositions[0], planePositionObj.cartPositions[1], planePositionObj.cartPositions[2]);
    }
  }

  ; // 清除

  function clearClipPlane() {
    tooltip.setVisible(false);

    if (planeSurface) {
      scene.trackingLayer.remove(planeSurface);
      modelEditor.deactivate();
      s3mInstanceColc.removeCollection(modelUrl);
      planeSurface = null;
      planePositionObj = null;
    }

    if (!window.handlerPolyline) return;
    clearHandlerDrawing("Polyline");

    for (let layer of layers) {
      layer.clearCustomClipBox();
    }
  }

  ; // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.clipMode, val => {
    if (planePositionObj) {
      let pos = [...planePositionObj.cartPositions];
      let newPos = [pos[1], pos[0], pos[3], pos[2]];
      planePositionObj.cartPositions = newPos;
      clipPlaneUpdate();
    }
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    layers = undefined;
    if (modelEditor) modelEditor.destroy();
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    clipPlaneStart,
    clearClipPlane
  };
}

;
/* harmony default export */ var clip_plane = (clipPlane);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/clip/clip-plane/clip-plane.vue?vue&type=script&lang=js



/* harmony default export */ var clip_planevue_type_script_lang_js = ({
  name: "Sm3dClipPlane",
  components: {
    Panel: panel
  },

  setup(props) {
    let {
      clipPlaneStart,
      clearClipPlane,
      clipMode,
      planeDirection
    } = clip_plane(props);
    return {
      clipPlaneStart,
      clearClipPlane,
      clipMode,
      planeDirection
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-plane/clip-plane.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-plane/clip-plane.vue




;
const clip_plane_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(clip_planevue_type_script_lang_js, [['render',clip_planevue_type_template_id_a4e22f70_render]])

/* harmony default export */ var clip_plane_clip_plane = (clip_plane_exports_);
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-plane/index.js


clip_plane_clip_plane.install = function (app) {
  app.component(clip_plane_clip_plane.name, clip_plane_clip_plane);
};

/* harmony default export */ var clip_clip_plane = (clip_plane_clip_plane);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/clip/clip-polygon/clip-polygon.vue?vue&type=template&id=2ca01cbd


const clip_polygonvue_type_template_id_2ca01cbd_hoisted_1 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪内部");

const clip_polygonvue_type_template_id_2ca01cbd_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪外部");

const clip_polygonvue_type_template_id_2ca01cbd_hoisted_3 = {
  class: "sm-global-button"
};

const clip_polygonvue_type_template_id_2ca01cbd_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪");

const clip_polygonvue_type_template_id_2ca01cbd_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function clip_polygonvue_type_template_id_2ca01cbd_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_radio = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio");

  const _component_a_radio_group = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio-group");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 250,
    pHeight: 100
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio_group, {
      value: $setup.clipModelPolygon,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.clipModelPolygon = $event),
      class: "sm-global-row"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "ClipInside"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_polygonvue_type_template_id_2ca01cbd_hoisted_1]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "ClipOutside"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_polygonvue_type_template_id_2ca01cbd_hoisted_2]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", clip_polygonvue_type_template_id_2ca01cbd_hoisted_3, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clipPolygon
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_polygonvue_type_template_id_2ca01cbd_hoisted_4]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearClipPolygon
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [clip_polygonvue_type_template_id_2ca01cbd_hoisted_5]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-polygon/clip-polygon.vue?vue&type=template&id=2ca01cbd

;// CONCATENATED MODULE: ./globalCom/components/clip/clip-polygon/clip-polygon.js
// 引入依赖

 //公共handler.js

 //编辑

 //提示等工具

 //语言资源


 //简单局部状态管理

function clipPolygonAnalysis(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    clipModelPolygon: 'ClipInside',
    //裁剪模式js
    isEdit: false,
    //是否编辑
    isEditZ: false,
    lineVisible: true //是否显示绘制线

  }); // 传入props改变默认值
  // if (props) {
  //     for (let key in props) {
  //         if (state.hasOwnProperty(key)) {
  //             if(props[key] != undefined)
  //             state[key] = props[key]
  //         } else {
  //             tool.Message.errorMsg(resource.AttributeError + key);
  //         }
  //     }
  // }
  // 初始化数据

  let clipMode = SuperMap3D.ModifyRegionMode.CLIP_INSIDE; //裁剪模式值 外部: SuperMap3D.ModifyRegionMode.CLIP_OUTSIDE;

  let layers,
      tipFlag = true;
  let polygonPosition = [];
  /*
   ***裁剪平面分析模块***
  */
  //初始化分析区域 （后面有需要可以添加监听）

  if (props && props.polygonPositions) {
    clipPolygonUpdate(props.slopePositions);
  }

  if (storeState.isViewer) {
    layers = scene.layers && scene.layers.layerQueue; // if (!window.tooltip) {
    //     window.tooltip = createTooltip(scene._element);
    // }
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      layers = scene.layers && scene.layers.layerQueue; // if (!window.tooltip) {
      //     window.tooltip = createTooltip(scene._element);
      // }
    }
  }); // 分析

  function clipPolygon(e) {
    e.preventDefault(); // tooltip.setVisible(false);
    // if (tipFlag) {   //只提示一次
    //     tooltip.showAt(' <p>点击鼠标左键开始绘制多边形</p><p>点击鼠标右键结束绘制</p>', '230px');
    //     tipFlag = false
    // }

    if (!layers) {
      layers = scene.layers && scene.layers.layerQueue;
    }

    for (let layer of layers) {
      layer.selectEnabled = false; // 设置被裁剪对象的颜色

      layer.clipLineColor = new SuperMap3D.Color(1, 1, 1, 0);
    }

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", state.lineVisible).then(res => {
      clipPolygonUpdate(res.positions);
      let handlerPolygon = window.handlerPolygon;
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();

      if (state.isEdit) {
        Edit(polygonPosition, state.isEditZ, clipPolygonUpdate);
      }
    }, err => {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(lang.NoPickPositionSupported);
    }
  }

  ; // 更新

  function clipPolygonUpdate(p) {
    polygonPosition = p;

    for (let layer of layers) {
      layer.setModifyRegions([p], clipMode);
    }
  }

  ; // 清除

  function clearClipPolygon(e) {
    e.preventDefault();
    polygonPosition = []; // tooltip.setVisible(false);

    if (!window.handlerPolygon) return;
    clearHandlerDrawing("Polygon");

    for (let layer of layers) {
      layer.clearModifyRegions();
    }
  }

  ; // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.clipModelPolygon, val => {
    switch (val) {
      case "ClipInside":
        clipMode = SuperMap3D.ModifyRegionMode.CLIP_INSIDE;
        break;

      case "ClipOutside":
        clipMode = SuperMap3D.ModifyRegionMode.CLIP_OUTSIDE;
        break;

      default:
        break;
    }

    if (polygonPosition.length > 0) {
      clipPolygonUpdate(polygonPosition);
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.isEdit, val => {
    if (val && window.handlerPolygon) {
      Edit(polygonPosition, state.isEditZ, clipPolygonUpdate);
    } else {
      clearEditHandler("Polygon");

      if (window.handlerPolygon && window.handlerPolygon.polygon) {
        window.handlerPolygon.polygon.show = false;
      }
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.isEditZ, val => {
    if (window.editHandler) {
      window.editHandler.isEditZ = val;
    }
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    layers = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    clipPolygon,
    clearClipPolygon,
    polygonPosition
  };
}

;
/* harmony default export */ var clip_polygon = (clipPolygonAnalysis);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/clip/clip-polygon/clip-polygon.vue?vue&type=script&lang=js



/* harmony default export */ var clip_polygonvue_type_script_lang_js = ({
  name: "Sm3dClipPolygon",
  components: {
    Panel: panel
  },
  props: {
    //裁剪模式
    clipModelPolygon: {
      type: String,
      default: "ClipInside"
    },
    //是否编辑
    isEdit: {
      type: Boolean,
      default: false
    },
    //是否编辑Z轴
    isEditZ: {
      type: Boolean,
      default: false
    },
    //初始化传入分析区域
    polygonPositions: {
      type: Array
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    let {
      clipModelPolygon,
      isEdit,
      isEditZ,
      clipPolygon,
      clearClipPolygon
    } = clip_polygon(props);
    return {
      clipModelPolygon,
      isEdit,
      isEditZ,
      clipPolygon,
      clearClipPolygon
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-polygon/clip-polygon.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-polygon/clip-polygon.vue




;
const clip_polygon_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(clip_polygonvue_type_script_lang_js, [['render',clip_polygonvue_type_template_id_2ca01cbd_render]])

/* harmony default export */ var clip_polygon_clip_polygon = (clip_polygon_exports_);
;// CONCATENATED MODULE: ./globalCom/components/clip/clip-polygon/index.js
// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

clip_polygon_clip_polygon.install = function (app) {
  app.component(clip_polygon_clip_polygon.name, clip_polygon_clip_polygon);
};

/* harmony default export */ var clip_clip_polygon = (clip_polygon_clip_polygon);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/s3mlayer-attribute/s3mlayer-attribute.vue?vue&type=template&id=c192761e

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_1 = {
  class: "sm-global-row"
};

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "选择图层", -1);

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("暂无s3m图层");

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_4 = {
  class: "sm-global-row"
};

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "亮度", -1);

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_6 = {
  class: "sm-global-row"
};

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "对比度", -1);

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_8 = {
  class: "sm-global-row"
};

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "色调", -1);

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_10 = {
  class: "sm-global-row"
};

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_11 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "饱和度", -1);

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_12 = {
  class: "sm-global-row"
};

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_13 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "伽马", -1);

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_14 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("关闭阴影");

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_15 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("开启阴影");

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_16 = {
  class: "sm-global-row"
};

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_17 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "阴影明暗度", -1);

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_18 = {
  class: "sm-global-row"
};

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_19 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "可见性", -1);

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_20 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("仅选中对象可见");

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_21 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("仅选中对象隐藏");

const s3mlayer_attributevue_type_template_id_c192761e_hoisted_22 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("显示全部");

function s3mlayer_attributevue_type_template_id_c192761e_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_radio = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio");

  const _component_a_radio_group = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio-group");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 300
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_attributevue_type_template_id_c192761e_hoisted_1, [s3mlayer_attributevue_type_template_id_c192761e_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.selectedLayerName,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.selectedLayerName = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.layerNames, (layer, index) => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_a_select_option, {
          key: index,
          value: layer
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(layer), 1)]),
          _: 2
        }, 1032, ["value"]);
      }), 128)), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "none"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_attributevue_type_template_id_c192761e_hoisted_3]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_attributevue_type_template_id_c192761e_hoisted_4, [s3mlayer_attributevue_type_template_id_c192761e_hoisted_5, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.brightness,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.brightness = $event),
      min: 0,
      max: 3,
      step: 0.05
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_attributevue_type_template_id_c192761e_hoisted_6, [s3mlayer_attributevue_type_template_id_c192761e_hoisted_7, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.contrast,
      "onUpdate:value": _cache[2] || (_cache[2] = $event => $setup.contrast = $event),
      min: 0,
      max: 3,
      step: 0.05,
      "input-size": "mini"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_attributevue_type_template_id_c192761e_hoisted_8, [s3mlayer_attributevue_type_template_id_c192761e_hoisted_9, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.hue,
      "onUpdate:value": _cache[3] || (_cache[3] = $event => $setup.hue = $event),
      min: 0,
      max: 3,
      step: 0.05,
      "input-size": "mini"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_attributevue_type_template_id_c192761e_hoisted_10, [s3mlayer_attributevue_type_template_id_c192761e_hoisted_11, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.saturation,
      "onUpdate:value": _cache[4] || (_cache[4] = $event => $setup.saturation = $event),
      min: 0,
      max: 3,
      step: 0.05,
      "input-size": "mini"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_attributevue_type_template_id_c192761e_hoisted_12, [s3mlayer_attributevue_type_template_id_c192761e_hoisted_13, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.gamma,
      "onUpdate:value": _cache[5] || (_cache[5] = $event => $setup.gamma = $event),
      min: 0,
      max: 3,
      step: 0.05,
      "input-size": "mini"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio_group, {
      value: $setup.shadowMode,
      "onUpdate:value": _cache[6] || (_cache[6] = $event => $setup.shadowMode = $event),
      class: "sm-global-row"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "noShadow"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_attributevue_type_template_id_c192761e_hoisted_14]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "allShadow"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_attributevue_type_template_id_c192761e_hoisted_15]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_attributevue_type_template_id_c192761e_hoisted_16, [s3mlayer_attributevue_type_template_id_c192761e_hoisted_17, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      value: $setup.shadowDarkness,
      "onUpdate:value": _cache[7] || (_cache[7] = $event => $setup.shadowDarkness = $event),
      min: 0,
      max: 1,
      step: 0.05,
      "input-size": "mini"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_attributevue_type_template_id_c192761e_hoisted_18, [s3mlayer_attributevue_type_template_id_c192761e_hoisted_19, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.visibility,
      "onUpdate:value": _cache[8] || (_cache[8] = $event => $setup.visibility = $event),
      style: {
        "width": "150px"
      }
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "onlyShowSlection"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_attributevue_type_template_id_c192761e_hoisted_20]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "onlyHideSlection"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_attributevue_type_template_id_c192761e_hoisted_21]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "showAll"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_attributevue_type_template_id_c192761e_hoisted_22]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-attribute/s3mlayer-attribute.vue?vue&type=template&id=c192761e

;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-attribute/s3mlayer-attribute.js

// 引入依赖

 //简单局部状态管理

 //提示等工具

 //语言资源

function s3mlayerAttribute(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    layerNames: [],
    //当前存在的可选择s3m图层
    selectedLayerName: 'none',
    //默认选择图层名称
    brightness: 1,
    contrast: 1,
    hue: 0,
    saturation: 1,
    gamma: 1,
    shadowMode: 'noShadow',
    shadowDarkness: 0.3,
    selectEnabled: true,
    multiChoose: false,
    cullEnabled: false,
    visibility: 'showAll'
  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let layers, selectedLayer;

  if (storeState.isViewer) {
    getLayerNames();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      getLayerNames();
    }
  }); //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    getLayerNames();
  }); //初始化图层

  function getLayerNames() {
    layers = scene.layers && scene.layers.layerQueue;

    if (layers && layers.length > 0) {
      layers.forEach((element, index) => {
        if (!state.layerNames.includes(element._name)) {
          state.layerNames.push(element._name);
        }
      });

      if (state.selectedLayerName = 'none') {
        state.selectedLayerName = state.layerNames[0];
        selectedLayer = layers[0];
      }
    }
  } // 销毁


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {// layers = scene = null;
  }); // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedLayerName, val => {
    let index = state.layerNames.indexOf(val);
    if (index == -1) return;
    selectedLayer = layers[index];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.brightness, val => {
    if (selectedLayer) selectedLayer.brightness = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.contrast, val => {
    if (selectedLayer) selectedLayer.contrast = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.hue, val => {
    if (selectedLayer) selectedLayer.hue = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.saturation, val => {
    if (selectedLayer) selectedLayer.saturation = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.gamma, val => {
    if (selectedLayer) selectedLayer.gamma = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.shadowMode, val => {
    if (selectedLayer) switch (val) {
      case "noShadow":
        scene.shadows = false;
        selectedLayer.shadowType = SuperMap3D.ShadowType.NONE;
        break;

      case "chooseShadow":
        scene.shadows = true;
        selectedLayer.shadowType = SuperMap3D.ShadowType.SELECTION;
        selectedLayer.refresh();
        break;

      case "allShadow":
        scene.shadows = true;
        selectedLayer.shadowType = SuperMap3D.ShadowType.ALL;
        selectedLayer.refresh();
        break;

      default:
        null;
        break;
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.shadowDarkness, val => {
    scene.shadowMap.darkness = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.multiChoose, val => {
    if (selectedLayer) selectedLayer.multiChoose = val;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectEnabled, val => {
    if (selectedLayer) selectedLayer.selectEnabled = val;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.cullEnabled, val => {
    if (selectedLayer) selectedLayer.cullEnabled = val;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibility, val => {
    if (selectedLayer) switch (val) {
      case "showAll":
        selectedLayer.setObjsVisible([], false);
        break;

      case "onlyHideSlection":
        let chooseIDs = selectedLayer.getSelection();
        selectedLayer.setObjsVisible(chooseIDs, false);
        break;

      case "onlyShowSlection":
        let chooseIDs2 = selectedLayer.getSelection();
        selectedLayer.setObjsVisible(chooseIDs2, true);
        break;

      default:
        null;
        break;
    }
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state)
  };
}

;
/* harmony default export */ var s3mlayer_attribute = (s3mlayerAttribute);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/s3mlayer-attribute/s3mlayer-attribute.vue?vue&type=script&lang=js



/* harmony default export */ var s3mlayer_attributevue_type_script_lang_js = ({
  components: {
    Panel: panel
  },
  name: "Sm3dS3mlayerAttribute",
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String
    },
    //默认亮度
    brightness: {
      type: Number
    },
    //对比度
    contrast: {
      type: Number
    },
    //色调
    hue: {
      type: Number
    },
    //饱和度
    saturation: {
      type: Number
    },
    //伽马
    gamma: {
      type: Number
    },
    //阴影模式
    shadowMode: {
      type: String
    },
    //阴影明暗度
    shadowDarkness: {
      type: Number
    },
    //多选
    multiChoose: {
      type: Boolean
    },
    //双面渲染
    cullEnabled: {
      type: Boolean
    },
    //图层可见性
    visibility: {
      type: String
    }
  },

  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      brightness,
      contrast,
      hue,
      saturation,
      gamma,
      shadowMode,
      shadowDarkness,
      selectEnabled,
      multiChoose,
      cullEnabled,
      visibility
    } = s3mlayer_attribute(props);
    return {
      layerNames,
      selectedLayerName,
      brightness,
      contrast,
      hue,
      saturation,
      gamma,
      shadowMode,
      shadowDarkness,
      selectEnabled,
      multiChoose,
      cullEnabled,
      visibility
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-attribute/s3mlayer-attribute.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-attribute/s3mlayer-attribute.vue




;
const s3mlayer_attribute_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(s3mlayer_attributevue_type_script_lang_js, [['render',s3mlayer_attributevue_type_template_id_c192761e_render]])

/* harmony default export */ var s3mlayer_attribute_s3mlayer_attribute = (s3mlayer_attribute_exports_);
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-attribute/index.js


s3mlayer_attribute_s3mlayer_attribute.install = function (app) {
  app.component(s3mlayer_attribute_s3mlayer_attribute.name, s3mlayer_attribute_s3mlayer_attribute);
};

/* harmony default export */ var layer_s3mlayer_attribute = (s3mlayer_attribute_s3mlayer_attribute);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/s3mlayer-style/s3mlayer-style.vue?vue&type=template&id=0be7be03

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_1 = {
  class: "sm-global-row"
};

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "选择图层", -1);

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("暂无s3图层");

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_4 = {
  class: "sm-global-row"
};

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "前景色", -1);

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_6 = {
  class: "sm-global-row"
};

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "线颜色", -1);

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_8 = {
  class: "sm-global-row"
};

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "选中色", -1);

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_10 = {
  class: "sm-global-row"
};

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_11 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "选中色模式", -1);

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_12 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("混合");

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_13 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("替换");

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_14 = {
  class: "sm-global-row"
};

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_15 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "底部高层", -1);

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_16 = {
  class: "sm-global-row"
};

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_17 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "LOD", -1);

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_18 = {
  class: "sm-global-row"
};

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_19 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "图层透明度", -1);

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_20 = {
  class: "sm-global-row"
};

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_21 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "填充风格", -1);

const s3mlayer_stylevue_type_template_id_0be7be03_hoisted_22 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("填充模式");

const _hoisted_23 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("线框模式");

const _hoisted_24 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("填充和线框模式");

const _hoisted_25 = {
  class: "sm-global-row"
};

const _hoisted_26 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "最小可见距离", -1);

const _hoisted_27 = {
  class: "sm-global-row"
};

const _hoisted_28 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "最大可见距离", -1);

function s3mlayer_stylevue_type_template_id_0be7be03_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_radio = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio");

  const _component_a_radio_group = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio-group");

  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_a_input_number = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-input-number");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 300
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_stylevue_type_template_id_0be7be03_hoisted_1, [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.selectedLayerName,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.selectedLayerName = $event),
      class: "sm-global-select"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.layerNames, (layer, index) => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_a_select_option, {
          key: index,
          value: layer
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(layer), 1)]),
          _: 2
        }, 1032, ["value"]);
      }), 128)), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "none"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_3]),
        _: 1
      }, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.layerNames.length == 0]])]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_stylevue_type_template_id_0be7be03_hoisted_4, [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_5, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $setup.foreColor = $event),
      class: "sm-global-color"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.foreColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_stylevue_type_template_id_0be7be03_hoisted_6, [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_7, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.lineColor = $event),
      class: "sm-global-color"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.lineColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_stylevue_type_template_id_0be7be03_hoisted_8, [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_9, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $setup.selectedColor = $event),
      class: "sm-global-color"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.selectedColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_stylevue_type_template_id_0be7be03_hoisted_10, [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_11, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio_group, {
      value: $setup.selectColorMode,
      "onUpdate:value": _cache[4] || (_cache[4] = $event => $setup.selectColorMode = $event),
      class: "sm-global-row"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "mix"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_12]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "replace"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_13]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_stylevue_type_template_id_0be7be03_hoisted_14, [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_15, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.bottomAltitude,
      "onUpdate:value": _cache[5] || (_cache[5] = $event => $setup.bottomAltitude = $event),
      min: 0,
      step: 1,
      max: 1000,
      class: "sm-global-slider"
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_stylevue_type_template_id_0be7be03_hoisted_16, [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_17, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.LODScale,
      "onUpdate:value": _cache[6] || (_cache[6] = $event => $setup.LODScale = $event),
      min: 0,
      max: 10,
      step: 0.5,
      class: "sm-global-slider"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_stylevue_type_template_id_0be7be03_hoisted_18, [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_19, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.layerTrans,
      "onUpdate:value": _cache[7] || (_cache[7] = $event => $setup.layerTrans = $event),
      min: 0,
      max: 1,
      step: 0.1,
      class: "sm-global-slider"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_stylevue_type_template_id_0be7be03_hoisted_20, [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_21, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.fillStyle,
      "onUpdate:value": _cache[8] || (_cache[8] = $event => $setup.fillStyle = $event),
      class: "sm-global-select"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "fill"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_stylevue_type_template_id_0be7be03_hoisted_22]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "wireframe"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_23]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "fill-and-wireframe"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_24]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_25, [_hoisted_26, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.visibleDistanceMin,
      "onUpdate:value": _cache[9] || (_cache[9] = $event => $setup.visibleDistanceMin = $event),
      min: 0,
      class: "sm-global-input-number"
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_27, [_hoisted_28, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.visibleDistanceMax,
      "onUpdate:value": _cache[10] || (_cache[10] = $event => $setup.visibleDistanceMax = $event),
      min: 0,
      class: "sm-global-input-number"
    }, null, 8, ["value"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-style/s3mlayer-style.vue?vue&type=template&id=0be7be03

;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-style/s3mlayer-style.js

// 引入依赖

 //简单局部状态管理

 //提示等工具

 //语言资源

function s3mlayerStyle(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    layerNames: [],
    //当前存在的可选择s3m图层
    selectedLayerName: 'none',
    //默认选择图层名称
    foreColor: "#ffffff",
    //前景色
    lineColor: "rgba(27, 27, 27, 1)",
    //线颜色
    selectedColor: "#A40FF4",
    //选中色
    selectColorMode: 'mix',
    //选中色模式
    bottomAltitude: 0,
    //底部高程
    LODScale: 5,
    //LOD
    layerTrans: 1,
    //图层透明度
    fillStyle: 'fill',
    //填充风格
    visibleDistanceMin: 0,
    //最小可见距离
    visibleDistanceMax: 10000 //最大可见距离

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let layers, selectedLayer;

  if (storeState.isViewer) {
    getLayerNames();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      getLayerNames();
    }
  }); //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    getLayerNames();
  }); //初始化图层

  function getLayerNames() {
    layers = scene.layers && scene.layers.layerQueue;

    if (layers && layers.length > 0) {
      layers.forEach((element, index) => {
        if (!state.layerNames.includes(element._name)) {
          state.layerNames.push(element._name);
        }
      });

      if (state.selectedLayerName = 'none') {
        state.selectedLayerName = state.layerNames[0];
        selectedLayer = layers[0];
      }
    }
  } // 销毁


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    layers = null;
  }); // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedLayerName, val => {
    let index = state.layerNames.indexOf(val);
    if (index == -1) return;
    selectedLayer = layers[index];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.foreColor, val => {
    if (selectedLayer) selectedLayer.style3D.fillForeColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.lineColor, val => {
    if (selectedLayer) selectedLayer.style3D.lineColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedColor, val => {
    if (selectedLayer) selectedLayer.selectedColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectColorMode, val => {
    if (selectedLayer) selectedLayer.selectColorType = val === 'mix' ? 0 : 1;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.bottomAltitude, val => {
    if (selectedLayer) selectedLayer.style3D.bottomAltitude = Number(val);
    selectedLayer.refresh();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.fillStyle, val => {
    if (selectedLayer) switch (val) {
      case "fill":
        selectedLayer.style3D.fillStyle = SuperMap3D.FillStyle.Fill;
        break;

      case "wireframe":
        selectedLayer.style3D.fillStyle = SuperMap3D.FillStyle.WireFrame;
        selectedLayer.style3D.lineColor = SuperMap3D.Color.fromCssColorString(state.lineColor);
        break;

      case "fill-and-wireframe":
        selectedLayer.style3D.fillStyle = SuperMap3D.FillStyle.Fill_And_WireFrame;
        selectedLayer.style3D.lineColor = SuperMap3D.Color.fromCssColorString(state.lineColor);
        break;

      default:
        break;
    }
    selectedLayer.refresh();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.LODScale, val => {
    if (selectedLayer) selectedLayer.lodRangeScale = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.layerTrans, val => {
    if (selectedLayer) selectedLayer.style3D.fillForeColor.alpha = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibleDistanceMin, val => {
    if (val == "") {
      val = 0.0;
    }

    if (selectedLayer) selectedLayer.visibleDistanceMin = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibleDistanceMax, val => {
    if (val == "") {
      val = this.maxNumber;
    }

    if (selectedLayer) selectedLayer.cullEnabled = val;
    selectedLayer.visibleDistanceMax = Number(val);
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state)
  };
}

;
/* harmony default export */ var s3mlayer_style = (s3mlayerStyle);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/s3mlayer-style/s3mlayer-style.vue?vue&type=script&lang=js



/* harmony default export */ var s3mlayer_stylevue_type_script_lang_js = ({
  name: "Sm3dS3mlayerStyle",
  components: {
    Panel: panel
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String
    },
    //前景色
    foreColor: {
      type: String
    },
    //线颜色
    lineColor: {
      type: String
    },
    //选中色
    selectedColor: {
      type: String
    },
    //选中模式
    selectColorMode: {
      type: String
    },
    //底部高层
    bottomAltitude: {
      type: Number
    },
    //lod
    LODScale: {
      type: Number
    },
    //图层透明度
    layerTrans: {
      type: Number
    },
    //填充风格
    fillStyle: {
      type: String
    },
    //最小可见高度
    visibleDistanceMin: {
      type: Number
    },
    //最大可见高度
    visibleDistanceMax: {
      type: Number
    }
  },

  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      foreColor,
      lineColor,
      selectedColor,
      selectColorMode,
      bottomAltitude,
      LODScale,
      layerTrans,
      fillStyle,
      visibleDistanceMin,
      visibleDistanceMax
    } = s3mlayer_style(props);
    return {
      layerNames,
      selectedLayerName,
      foreColor,
      lineColor,
      selectedColor,
      selectColorMode,
      bottomAltitude,
      LODScale,
      layerTrans,
      fillStyle,
      visibleDistanceMin,
      visibleDistanceMax
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-style/s3mlayer-style.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-style/s3mlayer-style.vue




;
const s3mlayer_style_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(s3mlayer_stylevue_type_script_lang_js, [['render',s3mlayer_stylevue_type_template_id_0be7be03_render]])

/* harmony default export */ var s3mlayer_style_s3mlayer_style = (s3mlayer_style_exports_);
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-style/index.js


s3mlayer_style_s3mlayer_style.install = function (app) {
  app.component(s3mlayer_style_s3mlayer_style.name, s3mlayer_style_s3mlayer_style);
};

/* harmony default export */ var layer_s3mlayer_style = (s3mlayer_style_s3mlayer_style);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/s3mlayer-operation/s3mlayer-operation.vue?vue&type=template&id=2ca50cfe

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_1 = {
  class: "sm-global-row"
};

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "选择图层", -1);

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)(" 暂无s3m图层 ");

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("选择偏移");

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_5 = {
  class: "sm-global-row"
};

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "沿X轴偏移", -1);

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_7 = {
  class: "sm-global-row"
};

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "沿Y轴偏移", -1);

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_9 = {
  class: "sm-global-row"
};

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_10 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "沿Z轴偏移", -1);

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_11 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("多边形偏移");

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_12 = {
  class: "sm-global-row"
};

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_13 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "偏移因子", -1);

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_14 = {
  class: "sm-global-row"
};

const s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_15 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "偏移量", -1);

function s3mlayer_operationvue_type_template_id_2ca50cfe_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_checkbox = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-checkbox");

  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 300
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_1, [s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.selectedLayerName,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.selectedLayerName = $event),
      class: "sm-global-select"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.layerNames, (layer, index) => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_a_select_option, {
          key: index,
          value: layer
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(layer), 1)]),
          _: 2
        }, 1032, ["value"]);
      }), 128)), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "none"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_3]),
        _: 1
      }, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.layerNames.length == 0]])]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_checkbox, {
      checked: $setup.selectedoffset,
      "onUpdate:checked": _cache[1] || (_cache[1] = $event => $setup.selectedoffset = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_4]),
      _: 1
    }, 8, ["checked"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_5, [s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      modelValue: $setup.offsetX,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.offsetX = $event),
      min: -50,
      max: 50,
      step: 1
    }, null, 8, ["modelValue"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_7, [s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_8, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      modelValue: $setup.offsetY,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $setup.offsetY = $event),
      min: -50,
      max: 50,
      step: 1
    }, null, 8, ["modelValue"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_9, [s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_10, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      modelValue: $setup.offsetZ,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.offsetZ = $event),
      min: -50,
      max: 50,
      step: 1
    }, null, 8, ["modelValue"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_checkbox, {
      checked: $setup.polygonOffset,
      "onUpdate:checked": _cache[5] || (_cache[5] = $event => $setup.polygonOffset = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_11]),
      _: 1
    }, 8, ["checked"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_12, [s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_13, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      modelValue: $setup.polygonOffsetFactor,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $setup.polygonOffsetFactor = $event),
      min: -50,
      max: 50,
      step: 1
    }, null, 8, ["modelValue"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_14, [s3mlayer_operationvue_type_template_id_2ca50cfe_hoisted_15, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      class: "sm-global-slider",
      modelValue: $setup.polygonOffsetUnit,
      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $setup.polygonOffsetUnit = $event),
      min: -50,
      max: 50,
      step: 1
    }, null, 8, ["modelValue"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-operation/s3mlayer-operation.vue?vue&type=template&id=2ca50cfe

;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-operation/s3mlayer-operation.js

// 引入依赖

 //简单局部状态管理

 //提示等工具

 //语言资源

function s3mlayer_operation_s3mlayerStyle(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    layerNames: [],
    //当前存在的可选择s3m图层
    selectedLayerName: 'none',
    //默认选择图层名称
    foreColor: "#ffffff",
    //前景色
    lineColor: "rgba(27, 27, 27, 1)",
    //线颜色
    selectedColor: "#A40FF4",
    //选中色
    selectColorMode: 'mix',
    //选中色模式
    bottomAltitude: 0,
    //底部高程
    LODScale: 5,
    //LOD
    layerTrans: 1,
    //图层透明度
    fillStyle: 'fill',
    //填充风格
    visibleDistanceMin: 0,
    //最小可见距离
    visibleDistanceMax: 10000 //最大可见距离

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {// tool.Message.errorMsg(resource.AttributeError + key);
      }
    }
  } // 初始化数据


  let layers, selectedLayer;

  if (storeState.isViewer) {
    getLayerNames();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      getLayerNames();
    }
  }); //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    getLayerNames();
  }); //初始化图层

  function getLayerNames() {
    layers = scene.layers && scene.layers.layerQueue;

    if (layers && layers.length > 0) {
      layers.forEach((element, index) => {
        if (!state.layerNames.includes(element._name)) {
          state.layerNames.push(element._name);
        }
      });

      if (state.selectedLayerName = 'none') {
        state.selectedLayerName = state.layerNames[0];
        selectedLayer = layers[0];
      }
    }
  } // 销毁


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    layers = scene = null;
  }); // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedLayerName, val => {
    let index = state.layerNames.indexOf(val);
    if (index == -1) return;
    selectedLayer = layers[index];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.foreColor, val => {
    if (selectedLayer) selectedLayer.style3D.fillForeColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.lineColor, val => {
    if (selectedLayer) selectedLayer.style3D.lineColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedColor, val => {
    if (selectedLayer) selectedLayer.selectedColor = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectColorMode, val => {
    if (selectedLayer) selectedLayer.selectColorType = val === 'mix' ? 0 : 1;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.bottomAltitude, val => {
    if (selectedLayer) selectedLayer.style3D.bottomAltitude = Number(val);
    selectedLayer.refresh();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.fillStyle, val => {
    if (selectedLayer) switch (val) {
      case "fill":
        selectedLayer.style3D.fillStyle = SuperMap3D.FillStyle.Fill;
        break;

      case "wireframe":
        selectedLayer.style3D.fillStyle = SuperMap3D.FillStyle.WireFrame;
        selectedLayer.style3D.lineColor = SuperMap3D.Color.fromCssColorString(state.lineColor);
        break;

      case "fill-and-wireframe":
        selectedLayer.style3D.fillStyle = SuperMap3D.FillStyle.Fill_And_WireFrame;
        selectedLayer.style3D.lineColor = SuperMap3D.Color.fromCssColorString(state.lineColor);
        break;

      default:
        break;
    }
    selectedLayer.refresh();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.LODScale, val => {
    if (selectedLayer) selectedLayer.lodRangeScale = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.layerTrans, val => {
    if (selectedLayer) selectedLayer.style3D.fillForeColor.alpha = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibleDistanceMin, val => {
    if (val == "") {
      val = 0.0;
    }

    if (selectedLayer) selectedLayer.visibleDistanceMin = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.visibleDistanceMax, val => {
    if (val == "") {
      val = this.maxNumber;
    }

    if (selectedLayer) selectedLayer.cullEnabled = val;
    selectedLayer.visibleDistanceMax = Number(val);
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state)
  };
}

;
/* harmony default export */ var s3mlayer_operation = (s3mlayer_operation_s3mlayerStyle);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/s3mlayer-operation/s3mlayer-operation.vue?vue&type=script&lang=js



/* harmony default export */ var s3mlayer_operationvue_type_script_lang_js = ({
  name: "Sm3dS3mlayerOperation",
  components: {
    Panel: panel
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String
    },
    //选中偏移
    selectedoffset: {
      type: Boolean
    },
    //沿X轴偏移
    offsetX: {
      type: Number
    },
    //沿Y轴偏移
    offsetY: {
      type: Number
    },
    //沿Z轴偏移
    offsetZ: {
      type: Number
    },
    //多边形偏移
    polygonOffset: {
      type: Boolean
    },
    //偏移因子
    polygonOffsetFactor: {
      type: Number
    },
    //偏移单位
    polygonOffsetUnit: {
      type: Number
    }
  },

  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      selectedoffset,
      offsetX,
      //沿X轴偏移
      offsetY,
      //沿X轴偏移
      offsetZ,
      //沿Z轴偏移
      polygonOffset,
      //多边形偏移
      polygonOffsetFactor,
      //偏移因子
      polygonOffsetUnit //偏移单位

    } = s3mlayer_operation(props);
    return {
      layerNames,
      selectedLayerName,
      selectedoffset,
      offsetX,
      //沿X轴偏移
      offsetY,
      //沿X轴偏移
      offsetZ,
      //沿Z轴偏移
      polygonOffset,
      //多边形偏移
      polygonOffsetFactor,
      //偏移因子
      polygonOffsetUnit //偏移单位

    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-operation/s3mlayer-operation.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-operation/s3mlayer-operation.vue




;
const s3mlayer_operation_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(s3mlayer_operationvue_type_script_lang_js, [['render',s3mlayer_operationvue_type_template_id_2ca50cfe_render]])

/* harmony default export */ var s3mlayer_operation_s3mlayer_operation = (s3mlayer_operation_exports_);
;// CONCATENATED MODULE: ./globalCom/components/layer/s3mlayer-operation/index.js


s3mlayer_operation_s3mlayer_operation.install = function (app) {
  app.component(s3mlayer_operation_s3mlayer_operation.name, s3mlayer_operation_s3mlayer_operation);
};

/* harmony default export */ var layer_s3mlayer_operation = (s3mlayer_operation_s3mlayer_operation);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/layer-manage/layer-manage.vue?vue&type=template&id=c5169932

const layer_managevue_type_template_id_c5169932_hoisted_1 = {
  id: "contextmenu",
  ref: "domContextmenu"
};
function layer_managevue_type_template_id_c5169932_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_tree = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-tree");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_Panel, {
    pWidth: 200
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_tree, {
      "tree-data": $setup.TreeDatas,
      ref: "tree",
      onCheck: $setup.checkNode
    }, null, 8, ["tree-data", "onCheck"])]),
    _: 1
  }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", layer_managevue_type_template_id_c5169932_hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", {
    onClick: _cache[0] || (_cache[0] = (...args) => $setup.deleteLayer && $setup.deleteLayer(...args)),
    style: {
      "color": "red"
    }
  }, "清除")], 512)], 64);
}
;// CONCATENATED MODULE: ./globalCom/components/layer/layer-manage/layer-manage.vue?vue&type=template&id=c5169932

;// CONCATENATED MODULE: ./globalCom/components/layer/layer-manage/layer-manage.js
// 引入依赖

 //语言资源

 //简单局部状态管理

function layerManage(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    TreeDatas: [],
    expandedKeys: []
  }); // 初始化数据

  let layers, imgLayers, terrainLayers, mvtLayers, terrainProvider;
  let dom, wide, heide;
  let tree = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
  let node_rightClick,
      domContextmenu = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null); //保存右键选中的节点

  let deleteCallback = () => {}; //右键删除图层的回调函数初始化


  if (props && props.deleteCallback) {
    deleteCallback = props.deleteCallback;
  } //监听图层加载完成


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    initLayers();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
    setTimeout(() => {
      initLayers();
    }, 500);
  }); //初始化图层

  function initLayers() {
    dom = document.getElementById('container');
    wide = document.body.clientWidth - dom.clientWidth; //定位矫正

    heide = document.body.clientHeight - dom.clientHeight;
    layers = scene.layers && scene.layers.layerQueue;
    imgLayers = scene.imageryLayers && scene.imageryLayers._layers;
    mvtLayers = scene._vectorTileMaps && scene._vectorTileMaps._layerQueue;
    terrainLayers = scene.terrainProvider;
    state.TreeDatas.length = 0;
    updataS3MLayer();
    updataImgLayers();
    updataMvtLayers();
    updataTerrainLayers();
    setTimeout(() => {
      tree.value.setCheckedNodes(state.TreeDatas);
    }, 500);
    console.log(mvtLayers);
  } // 分析
  // updatS3M图层


  function updataS3MLayer() {
    if (layers.length == 0) {
      if (state.TreeDatas[0]) tree.value.remove(state.TreeDatas[0]);
      return;
    }

    let S3MLayersObj = {
      id: 's3m',
      label: "S3M图层",
      children: []
    };
    layers.forEach((layer, index) => {
      let S3Mlayer = {
        id: 's3m-' + index,
        label: layer._name
      };
      S3MLayersObj.children.push(S3Mlayer);
    });
    state.TreeDatas[0] = S3MLayersObj;
  } //updatImg


  function updataImgLayers() {
    if (imgLayers.length == 1) {
      if (state.TreeDatas[1]) tree.value.remove(state.TreeDatas[1]);
      return;
    }

    let imgLayersObj = {
      id: 'img',
      label: "IMG图层",
      children: []
    };
    imgLayers.forEach((layer, index) => {
      let isMvt = layer._imageryProvider instanceof SuperMap3D.MvtProviderGL;
      if (index === 0 || isMvt) return true;
      let IMGlayer = {
        id: 'img-' + index,
        label: lang.BaseMapImg
      };

      if (layer._imageryProvider.tablename) {
        IMGlayer.label = layer._imageryProvider.tablename;
      }

      imgLayersObj.children.unshift(IMGlayer);
    });
    if (imgLayersObj.children.length > 0) state.TreeDatas[1] = imgLayersObj;
  } //updatMVT


  function updataMvtLayers() {
    if (mvtLayers.length == 0) {
      if (state.TreeDatas[2]) tree.value.remove(state.TreeDatas[2]);
      return;
    }

    let mvtLayersObj = {
      id: 'mvt',
      label: "MVT图层",
      children: []
    };
    mvtLayers.forEach((layer, index) => {
      let IMGlayer = {
        id: 'mvt-' + index,
        label: layer.name
      };
      mvtLayersObj.children.unshift(IMGlayer);
    });
    state.TreeDatas[2] = mvtLayersObj;
  } //updatTerrain


  function updataTerrainLayers() {
    if (!terrainLayers.tablename) {
      return;
    }

    let terrainLayersObj = {
      id: 'terrain',
      label: "地形图层",
      children: []
    };
    let TerrainLayer = {
      id: 'terrain-0',
      label: terrainLayers.tablename
    };
    terrainLayersObj.children.push(TerrainLayer);
    state.TreeDatas[3] = terrainLayersObj;
  } //勾选节点函数


  function checkNode(data) {
    let node = tree.value.getNode(data);
    let ids = data.id.split('-');
    setVisible(ids, node.checked);
  } //设置图层显隐


  function setVisible(ids, checked) {
    let type = ids[0];
    let index = ids[1];

    switch (type) {
      case 's3m':
        if (!index) {
          for (let i = 0; i < layers.length; i++) {
            layers[i].visible = checked;
          }

          return;
        }

        layers[index].visible = checked;
        break;

      case 'img':
        if (!index) {
          for (let i = 1; i < imgLayers.length; i++) {
            imgLayers[i].show = checked;
          }

          return;
        }

        imgLayers[index].show = checked;
        break;

      case 'mvt':
        if (!index) {
          for (let i = 0; i < mvtLayers.length; i++) {
            mvtLayers[i].show = checked;
          }

          return;
        }

        mvtLayers[index].show = checked;
        break;

      case 'terrain':
        if (!checked) {
          terrainProvider = scene.terrainProvider;
          scene.terrainProvider = new SuperMap3D.EllipsoidTerrainProvider();
        } else {
          scene.terrainProvider = terrainProvider;
        }

        break;

      default:
        null;
    }
  }

  ; //点击节点函数

  function nodeClick(data) {
    let ids = data.id.split('-');
    flytoLayer(ids);
  } //定位飞向指定图层


  function flytoLayer(ids) {
    let type = ids[0];
    let index = ids[1];
    let layer;

    switch (type) {
      case 's3m':
        if (index) layer = layers[index];
        break;

      case 'img':
        if (index) layer = imgLayers[index];
        break;

      case 'mvt':
        if (index) layer = mvtLayers[index];
        break;

      case 'terrain':
        break;

      default:
        null;
    }

    if (layer) scene.flyTo(layer);
  }

  ; // 节点右键事件

  function nodeContextmenu(event, data) {
    let ids = data.id.split('-');
    if (!ids[1]) return;
    node_rightClick = data;
    domContextmenu.value.style.left = event.clientX + 30 - wide + 'px';
    if (event.clientX >= 1810) domContextmenu.value.style.left = event.clientX - 80 - wide + 'px';
    domContextmenu.value.style.top = event.clientY - heide + 'px';
    domContextmenu.value.style.display = 'block';
  } // 点击任意隐藏右键弹出的操作框


  document.onclick = function (e) {
    e.stopPropagation();
    domContextmenu.value.style.display = 'none';
  }; // 删除图层函数


  function deleteLayer() {
    domContextmenu.value.style.display = 'none';
    let ids = node_rightClick.id.split('-');
    let type = ids[0];
    let index = ids[1];

    switch (type) {
      case 's3m':
        if (index) {
          // layers[index].destroy();
          scene.layers.remove(layers[index]._name);
          updataS3MLayer();
          setTimeout(() => {
            state.expandedKeys = ['s3m'];
            tree.value.setCheckedNodes(state.TreeDatas);
          }, 50);
        }

        ;
        break;

      case 'img':
        if (index) {
          // imgLayers[index].destroy();
          scene.imageryLayers.remove(imgLayers[index]);
          updataImgLayers();
          setTimeout(() => {
            tree.value.setCheckedNodes(state.TreeDatas);
          }, 50);
        }

        ;
        break;

      case 'mvt':
        if (index) {
          // mvtLayers[index].destroy();
          scene.removeVectorTilesMap(mvtLayers[index].name);
          updataMvtLayers();
          setTimeout(() => {
            tree.value.setCheckedNodes(state.TreeDatas);
          }, 100);
        }

        ;
        break;

      case 'terrain':
        scene.terrainProvider = new SuperMap3D.EllipsoidTerrainProvider();
        terrainProvider = null;
        let node = tree.value.getNode(type);
        tree.value.remove(node);
        break;

      default:
        null;
    }

    ;
    actions.setChangeLayers();
    deleteCallback(node_rightClick); //删除图层回调，用于外部在图层删除后的操作
  } // 销毁


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    document.onclick = () => {};
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    tree,
    domContextmenu,
    checkNode,
    nodeContextmenu,
    nodeClick,
    deleteLayer
  };
}

;
/* harmony default export */ var layer_manage = (layerManage);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/layer-manage/layer-manage.vue?vue&type=script&lang=js


/* harmony default export */ var layer_managevue_type_script_lang_js = ({
  name: "Sm3dLayerManage",
  components: {
    Panel: panel
  },
  props: {
    //删除图层回调，返回删除的树节点
    deleteCallback: {
      type: Function
    }
  },

  setup(props) {
    let {
      nodeContextmenu,
      //节点右键点击事件
      nodeClick,
      //节点左键点击事件
      TreeDatas,
      //树数据
      tree,
      //树节点
      domContextmenu,
      //右键弹出操作框节点
      checkNode,
      //勾选事件
      deleteLayer,
      //删除事件
      expandedKeys //默认展开keys数组

    } = layer_manage(props);
    return {
      nodeContextmenu,
      nodeClick,
      TreeDatas,
      tree,
      domContextmenu,
      checkNode,
      deleteLayer,
      expandedKeys
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/layer/layer-manage/layer-manage.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/layer/layer-manage/layer-manage.vue




;
const layer_manage_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(layer_managevue_type_script_lang_js, [['render',layer_managevue_type_template_id_c5169932_render]])

/* harmony default export */ var layer_manage_layer_manage = (layer_manage_exports_);
;// CONCATENATED MODULE: ./globalCom/components/layer/layer-manage/index.js


layer_manage_layer_manage.install = function (app) {
  app.component(layer_manage_layer_manage.name, layer_manage_layer_manage);
};

/* harmony default export */ var layer_layer_manage = (layer_manage_layer_manage);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/imglayer-attribute/imglayer-attribute.vue?vue&type=template&id=482176bd

const imglayer_attributevue_type_template_id_482176bd_hoisted_1 = {
  class: "sm-global-row"
};

const imglayer_attributevue_type_template_id_482176bd_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "选择图层", -1);

const imglayer_attributevue_type_template_id_482176bd_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)(" 暂无影像图层 ");

const imglayer_attributevue_type_template_id_482176bd_hoisted_4 = {
  class: "sm-global-row"
};

const imglayer_attributevue_type_template_id_482176bd_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "亮度", -1);

const imglayer_attributevue_type_template_id_482176bd_hoisted_6 = {
  class: "sm-global-row"
};

const imglayer_attributevue_type_template_id_482176bd_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "对比度", -1);

const imglayer_attributevue_type_template_id_482176bd_hoisted_8 = {
  class: "sm-global-row"
};

const imglayer_attributevue_type_template_id_482176bd_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "色调", -1);

const imglayer_attributevue_type_template_id_482176bd_hoisted_10 = {
  class: "sm-global-row"
};

const imglayer_attributevue_type_template_id_482176bd_hoisted_11 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "饱和度", -1);

const imglayer_attributevue_type_template_id_482176bd_hoisted_12 = {
  class: "sm-global-row"
};

const imglayer_attributevue_type_template_id_482176bd_hoisted_13 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "伽马", -1);

const imglayer_attributevue_type_template_id_482176bd_hoisted_14 = {
  class: "sm-global-row"
};

const imglayer_attributevue_type_template_id_482176bd_hoisted_15 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "透明度", -1);

const imglayer_attributevue_type_template_id_482176bd_hoisted_16 = {
  class: "sm-global-row"
};

const imglayer_attributevue_type_template_id_482176bd_hoisted_17 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "透明色", -1);

const imglayer_attributevue_type_template_id_482176bd_hoisted_18 = {
  class: "sm-global-row"
};

const imglayer_attributevue_type_template_id_482176bd_hoisted_19 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "透明色容限", -1);

function imglayer_attributevue_type_template_id_482176bd_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-slider");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 300
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", imglayer_attributevue_type_template_id_482176bd_hoisted_1, [imglayer_attributevue_type_template_id_482176bd_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.selectedLayerName,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.selectedLayerName = $event),
      class: "sm-global-select"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.layerNames, (layer, index) => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_a_select_option, {
          key: index,
          value: layer
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(layer), 1)]),
          _: 2
        }, 1032, ["value"]);
      }), 128)), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "none"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [imglayer_attributevue_type_template_id_482176bd_hoisted_3]),
        _: 1
      }, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.layerNames.length == 0]])]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", imglayer_attributevue_type_template_id_482176bd_hoisted_4, [imglayer_attributevue_type_template_id_482176bd_hoisted_5, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.brightness,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.brightness = $event),
      min: 0,
      max: 3,
      step: 0.05,
      class: "sm-global-slider"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", imglayer_attributevue_type_template_id_482176bd_hoisted_6, [imglayer_attributevue_type_template_id_482176bd_hoisted_7, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.contrast,
      "onUpdate:value": _cache[2] || (_cache[2] = $event => $setup.contrast = $event),
      min: 0,
      max: 3,
      step: 0.05,
      class: "sm-global-slider"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", imglayer_attributevue_type_template_id_482176bd_hoisted_8, [imglayer_attributevue_type_template_id_482176bd_hoisted_9, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.hue,
      "onUpdate:value": _cache[3] || (_cache[3] = $event => $setup.hue = $event),
      min: 0,
      max: 3,
      step: 0.05,
      class: "sm-global-slider"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", imglayer_attributevue_type_template_id_482176bd_hoisted_10, [imglayer_attributevue_type_template_id_482176bd_hoisted_11, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.saturation,
      "onUpdate:value": _cache[4] || (_cache[4] = $event => $setup.saturation = $event),
      min: 0,
      max: 3,
      step: 0.05,
      class: "sm-global-slider"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", imglayer_attributevue_type_template_id_482176bd_hoisted_12, [imglayer_attributevue_type_template_id_482176bd_hoisted_13, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.gamma,
      "onUpdate:value": _cache[5] || (_cache[5] = $event => $setup.gamma = $event),
      min: 0,
      max: 3,
      step: 0.05,
      class: "sm-global-slider"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", imglayer_attributevue_type_template_id_482176bd_hoisted_14, [imglayer_attributevue_type_template_id_482176bd_hoisted_15, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.alpha,
      "onUpdate:value": _cache[6] || (_cache[6] = $event => $setup.alpha = $event),
      min: 0,
      max: 1,
      step: 0.01,
      class: "sm-global-slider"
    }, null, 8, ["value", "step"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", imglayer_attributevue_type_template_id_482176bd_hoisted_16, [imglayer_attributevue_type_template_id_482176bd_hoisted_17, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      class: "sm-global-color",
      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $setup.transparentBackColor = $event)
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.transparentBackColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", imglayer_attributevue_type_template_id_482176bd_hoisted_18, [imglayer_attributevue_type_template_id_482176bd_hoisted_19, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_slider, {
      value: $setup.transparentBackColorTolerance,
      "onUpdate:value": _cache[8] || (_cache[8] = $event => $setup.transparentBackColorTolerance = $event),
      min: 0,
      max: 1,
      step: 0.01,
      class: "sm-global-slider"
    }, null, 8, ["value", "step"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/layer/imglayer-attribute/imglayer-attribute.vue?vue&type=template&id=482176bd

;// CONCATENATED MODULE: ./globalCom/components/layer/imglayer-attribute/imglayer-attribute.js

// 引入依赖

 //简单局部状态管理

 //提示等工具

 //语言资源

function imglayer_attribute_s3mlayerAttribute(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    layerNames: [],
    //当前存在的可选择s3m图层
    selectedLayerName: 'none',
    //默认选择图层名称
    brightness: 1,
    contrast: 1,
    hue: 0,
    saturation: 1,
    gamma: 1,
    alpha: 1,
    transparentBackColor: '#eecccc',
    transparentBackColorTolerance: 0
  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let layers, selectedLayer;

  if (storeState.isViewer) {
    getLayerNames();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      getLayerNames();
    }
  }); //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    getLayerNames();
  }); //初始化图层

  function getLayerNames() {
    layers = scene.imageryLayers._layers && scene.imageryLayers._layers;

    if (layers && layers.length > 1) {
      layers.forEach((layer, index) => {
        let isMvt = layer._imageryProvider instanceof SuperMap3D.MvtProviderGL;
        if (index === 0 || isMvt) return true;

        if (!state.layerNames.includes(layer._imageryProvider.tablename)) {
          state.layerNames.push(layer._imageryProvider.tablename);
        }
      });

      if (state.selectedLayerName = 'none') {
        state.selectedLayerName = state.layerNames[0];
        selectedLayer = layers[1];
      }
    }
  } // 销毁
  // onBeforeUnmount(() => {
  //     layers = scene = null;
  // });
  // 监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedLayerName, val => {
    let index = state.layerNames.indexOf(val);
    if (index == -1) return;
    selectedLayer = layers[index + 1];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.brightness, val => {
    if (selectedLayer) selectedLayer.brightness = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.contrast, val => {
    if (selectedLayer) selectedLayer.contrast = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.hue, val => {
    if (selectedLayer) selectedLayer.hue = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.saturation, val => {
    if (selectedLayer) selectedLayer.saturation = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.gamma, val => {
    if (selectedLayer) selectedLayer.gamma = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.alpha, val => {
    if (selectedLayer) selectedLayer.alpha = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.transparentBackColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selectedLayer) selectedLayer.transparentBackColor = color;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.transparentBackColorTolerance, val => {
    if (selectedLayer) selectedLayer.transparentBackColorTolerance = Number(val);
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state)
  };
}

;
/* harmony default export */ var imglayer_attribute = (imglayer_attribute_s3mlayerAttribute);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/imglayer-attribute/imglayer-attribute.vue?vue&type=script&lang=js



/* harmony default export */ var imglayer_attributevue_type_script_lang_js = ({
  name: "Sm3dImglayerAttribute",
  components: {
    Panel: panel
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String
    },
    //默认亮度
    brightness: {
      type: Number
    },
    //对比度
    contrast: {
      type: Number
    },
    //色调
    hue: {
      type: Number
    },
    //饱和度
    saturation: {
      type: Number
    },
    //伽马
    gamma: {
      type: Number
    },
    alpha: {
      type: Number
    },
    transparentBackColor: {
      type: String
    },
    transparentBackColorTolerance: {
      type: Number
    }
  },

  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      brightness,
      contrast,
      hue,
      saturation,
      gamma,
      alpha,
      transparentBackColor,
      transparentBackColorTolerance
    } = imglayer_attribute(props);
    return {
      layerNames,
      selectedLayerName,
      brightness,
      contrast,
      hue,
      saturation,
      gamma,
      alpha,
      transparentBackColor,
      transparentBackColorTolerance
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/layer/imglayer-attribute/imglayer-attribute.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/layer/imglayer-attribute/imglayer-attribute.vue




;
const imglayer_attribute_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(imglayer_attributevue_type_script_lang_js, [['render',imglayer_attributevue_type_template_id_482176bd_render]])

/* harmony default export */ var imglayer_attribute_imglayer_attribute = (imglayer_attribute_exports_);
;// CONCATENATED MODULE: ./globalCom/components/layer/imglayer-attribute/index.js


imglayer_attribute_imglayer_attribute.install = function (app) {
  app.component(imglayer_attribute_imglayer_attribute.name, imglayer_attribute_imglayer_attribute);
};

/* harmony default export */ var layer_imglayer_attribute = (imglayer_attribute_imglayer_attribute);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/oblique-photography/oblique-photography.vue?vue&type=template&id=54e01d1c

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_1 = {
  class: "sm-global-row"
};

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "选择图层", -1);

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)(" 暂无s3m图层 ");

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("开挖");

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("压平");

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("a- ");

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_7 = {
  class: "sm-global-button"
};

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("开挖");

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_10 = {
  class: "sm-global-button"
};

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_11 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)(" 压平 ");

const oblique_photographyvue_type_template_id_54e01d1c_hoisted_12 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function oblique_photographyvue_type_template_id_54e01d1c_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_radio = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio");

  const _component_a_radio_group = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio-group");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 250
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", oblique_photographyvue_type_template_id_54e01d1c_hoisted_1, [oblique_photographyvue_type_template_id_54e01d1c_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.selectedLayerName,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.selectedLayerName = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.layerNames, (layer, index) => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_a_select_option, {
          key: index,
          value: layer
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(layer), 1)]),
          _: 2
        }, 1032, ["value"]);
      }), 128)), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "none"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [oblique_photographyvue_type_template_id_54e01d1c_hoisted_3]),
        _: 1
      }, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.layerNames.length == 0]])]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio_group, {
      value: $setup.operationType,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.operationType = $event),
      class: "sm-global-row"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "Excavation"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [oblique_photographyvue_type_template_id_54e01d1c_hoisted_4]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "Flatten"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [oblique_photographyvue_type_template_id_54e01d1c_hoisted_5]),
        _: 1
      }), oblique_photographyvue_type_template_id_54e01d1c_hoisted_6]),
      _: 1
    }, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", oblique_photographyvue_type_template_id_54e01d1c_hoisted_7, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      onClick: $setup.startExcavation
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [oblique_photographyvue_type_template_id_54e01d1c_hoisted_8]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      onClick: $setup.clearExcavation
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [oblique_photographyvue_type_template_id_54e01d1c_hoisted_9]),
      _: 1
    }, 8, ["onClick"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.operationType === 'Excavation']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", oblique_photographyvue_type_template_id_54e01d1c_hoisted_10, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      onClick: $setup.startFlatten
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [oblique_photographyvue_type_template_id_54e01d1c_hoisted_11]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      onClick: $setup.clearFlatten
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [oblique_photographyvue_type_template_id_54e01d1c_hoisted_12]),
      _: 1
    }, 8, ["onClick"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.operationType === 'Flatten']])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/layer/oblique-photography/oblique-photography.vue?vue&type=template&id=54e01d1c

;// CONCATENATED MODULE: ./globalCom/components/layer/oblique-photography/oblique-photography.js

// 引入依赖

 //公共handler.js

 //提示等工具

 //语言资源

 //简单局部状态管理

function obliquePhotography(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    layerNames: [],
    //当前存在的可选择s3m图层
    selectedLayerName: 'none',
    //默认选择图层名称
    operationType: 'Excavation',
    //操作类型
    lineVisible: true
  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {// tool.Message.errorMsg(resource.AttributeError + key);
      }
    }
  } // 非响应式数据定义


  let excavationPositions = [];
  let flattenPositions = [];
  let layers, selectedLayer;

  if (storeState.isViewer) {
    getLayerNames();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      getLayerNames();
    }
  }); //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    getLayerNames();
  }); //初始化图层

  function getLayerNames() {
    layers = scene.layers && scene.layers.layerQueue;

    if (layers && layers.length > 0) {
      layers.forEach((element, index) => {
        if (!state.layerNames.includes(element._name)) {
          state.layerNames.push(element._name);
        }
      });

      if (state.selectedLayerName = 'none') {
        state.selectedLayerName = state.layerNames[0];
        selectedLayer = layers[0];
      }
    }
  }
  /*
   ***挖掘模块***
  */


  function startExcavation(e) {
    e.preventDefault();

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    if (props && props.excavationPositions) {
      excavationUpdate(props.excavationPositions);
      return;
    }

    handlerDrawing("Polygon", state.lineVisible).then(res => {
      let handlerPolygon = window.handlerPolygon;
      excavationUpdate(res.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();
    }, err => {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (e) {
      console.log(e);
    }
  } //更新地形挖掘


  function excavationUpdate(excavation_position) {
    if (excavation_position) {
      excavationPositions = excavation_position;
    }

    selectedLayer.addExcavationRegion({
      position: excavation_position,
      name: "excavation_" + Math.random()
    });
  } // 清除


  function clearExcavation(e) {
    e.preventDefault();
    excavationPositions = [];
    if (!window.handlerPolygon) return;
    selectedLayer.removeAllExcavationRegion();
    clearHandlerDrawing("Polygon");
  }
  /*
   ***压平模块***
   */


  function startFlatten(e) {
    e.preventDefault();

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    if (props && props.flattenPositions) {
      flattenUpdate(props.flattenPositions);
      return;
    }

    handlerDrawing("Polygon", state.lineVisible).then(res => {
      let handlerPolygon = window.handlerPolygon;
      flattenUpdate(res.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
    }, err => {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (e) {
      console.log(e);
    }
  }

  function clearFlatten(e) {
    e.preventDefault();
    if (!window.handlerPolygon) return;
    selectedLayer.removeAllFlattenRegion();
    clearHandlerDrawing("Polygon");
  } //更新地形修改


  function flattenUpdate(positions) {
    if (positions) {
      flattenPositions = positions;
    }

    selectedLayer.addFlattenRegion({
      position: positions,
      name: "flatten" + Math.random()
    });
  } // 监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedLayerName, val => {
    let index = state.layerNames.indexOf(val);
    if (index == -1) return;
    selectedLayer = layers[index];
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    layers = scene = null;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    startExcavation,
    //开始挖掘
    clearExcavation,
    startFlatten,
    //开始压平
    clearFlatten,
    //清除压平
    excavationPositions,
    //返回当前操作区域
    flattenPositions //返回当前操作区域

  };
}

;
/* harmony default export */ var oblique_photography = (obliquePhotography);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/oblique-photography/oblique-photography.vue?vue&type=script&lang=js



/* harmony default export */ var oblique_photographyvue_type_script_lang_js = ({
  name: "Sm3dObliquePhotography",
  components: {
    Panel: panel
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String
    },
    //操作类型
    operationType: {
      type: String
    },
    //初始化传入挖掘区域
    excavationPositions: {
      type: Array
    },
    //初始化传入压平区域
    flattenPositions: {
      type: Array
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      operationType,
      startExcavation,
      //开始挖掘
      clearExcavation,
      startFlatten,
      //开始压平
      clearFlatten //清除压平

    } = oblique_photography(props);
    return {
      layerNames,
      selectedLayerName,
      operationType,
      startExcavation,
      //开始挖掘
      clearExcavation,
      startFlatten,
      //开始压平
      clearFlatten //清除压平

    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/layer/oblique-photography/oblique-photography.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/layer/oblique-photography/oblique-photography.vue




;
const oblique_photography_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(oblique_photographyvue_type_script_lang_js, [['render',oblique_photographyvue_type_template_id_54e01d1c_render]])

/* harmony default export */ var oblique_photography_oblique_photography = (oblique_photography_exports_);
;// CONCATENATED MODULE: ./globalCom/components/layer/oblique-photography/index.js


oblique_photography_oblique_photography.install = function (app) {
  app.component(oblique_photography_oblique_photography.name, oblique_photography_oblique_photography);
};

/* harmony default export */ var layer_oblique_photography = (oblique_photography_oblique_photography);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/pbr-material/pbr-material.vue?vue&type=template&id=f810448c


const pbr_materialvue_type_template_id_f810448c_hoisted_1 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "选择图层", -1);

const pbr_materialvue_type_template_id_f810448c_hoisted_2 = ["value"];
const pbr_materialvue_type_template_id_f810448c_hoisted_3 = {
  value: "none"
};

const pbr_materialvue_type_template_id_f810448c_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "选择材质", -1);

const pbr_materialvue_type_template_id_f810448c_hoisted_5 = ["value"];
const pbr_materialvue_type_template_id_f810448c_hoisted_6 = {
  class: "sm-button-button"
};

const pbr_materialvue_type_template_id_f810448c_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("开挖");

const pbr_materialvue_type_template_id_f810448c_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function pbr_materialvue_type_template_id_f810448c_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 200,
    pHeight: 200
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [pbr_materialvue_type_template_id_f810448c_hoisted_1, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.selectedLayerName,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.selectedLayerName = $event),
      style: {
        "width": "120px"
      }
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.layerNames, (layer, index) => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("option", {
          key: index,
          value: layer
        }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(layer), 9, pbr_materialvue_type_template_id_f810448c_hoisted_2);
      }), 128)), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("option", pbr_materialvue_type_template_id_f810448c_hoisted_3, "暂无图层", 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.layerNames.length == 0]])]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [pbr_materialvue_type_template_id_f810448c_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.selectedPbr,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.selectedPbr = $event),
      style: {
        "width": "120px"
      }
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.pbrLibrary, (value, key, index) => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("option", {
          key: index,
          value: key
        }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(value), 9, pbr_materialvue_type_template_id_f810448c_hoisted_5);
      }), 128))]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", pbr_materialvue_type_template_id_f810448c_hoisted_6, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      "on:click": $setup.addPBR
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [pbr_materialvue_type_template_id_f810448c_hoisted_7]),
      _: 1
    }, 8, ["on:click"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clear
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [pbr_materialvue_type_template_id_f810448c_hoisted_8]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/layer/pbr-material/pbr-material.vue?vue&type=template&id=f810448c

;// CONCATENATED MODULE: ./globalCom/components/layer/pbr-material/config.js
/*
** pbr材质配置，文件名即路径
*/
/* harmony default export */ var config = ({
  Iron: '铁',
  Steel: '钢',
  Aluminum: '铝',
  Bronze: '铜',
  Ceramic: '陶瓷',
  Concrete: '混凝土',
  Rubber: '橡胶',
  Glass: '玻璃',
  Paint: '油漆',
  Plastic: '塑料',
  SelfLuminous: '自发光',
  Wood: '木材',
  PVC_White: 'PVC'
});
;// CONCATENATED MODULE: ./globalCom/components/layer/pbr-material/pbr-material.js

// 引入依赖

 //简单局部状态管理

 //提示等工具

 //语言资源

 //语言资源

function pbr_material_s3mlayerAttribute(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    layerNames: [],
    //当前存在的可选择s3m图层
    selectedLayerName: 'none',
    //默认选择图层名称
    selectedPbr: 'Iron' //默认选中铁

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let layers, scene, selectedLayer;

  if (storeState.isViewer) {
    getLayerNames();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      getLayerNames();
    }
  }); //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    getLayerNames();
  }); //初始化图层

  function getLayerNames() {
    scene = viewer.scene;
    layers = viewer.scene.layers.layerQueue;

    if (layers && layers.length > 0) {
      layers.forEach((element, index) => {
        if (!state.layerNames.includes(element._name)) {
          state.layerNames.push(element._name);
        }
      });

      if (state.selectedLayerName = 'none') {
        state.selectedLayerName = state.layerNames[0];
        selectedLayer = layers[0];
      }
    }

    let terrainLayers = viewer.terrainProvider;
    if (terrainLayers instanceof SuperMap3D.EllipsoidTerrainProvider) return;
    if (state.layerNames.includes('地形')) return;
    state.layerNames.push('地形');
    if (state.selectedLayerName = 'none') state.selectedLayerName = state.layerNames[0];
  }

  function addPBR() {
    let url = "public/data/pbr/jsons/" + state.selectedPbr + ".json";

    if (state.selectedLayerName === '地形') {
      viewer.scene.globe.setPBRMaterialFromJSON(url);
      return;
    }

    if (selectedLayer) selectedLayer.setPBRMaterialFromJSON(url);
  }

  function clear() {
    if (state.selectedLayerName === '地形') {
      viewer.scene.globe.removePBRMaterial();
      return;
    }

    if (selectedLayer) selectedLayer.removePBRMaterial();
  } // 销毁


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    layers = scene = null;
  }); // 监听

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedLayerName, val => {
    if (val === '地形') return;
    let index = state.layerNames.indexOf(val);

    if (index == -1) {
      selectedLayer = undefined;
      return;
    }

    selectedLayer = layers[index];
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    pbrLibrary: config,
    addPBR,
    clear
  };
}

;
/* harmony default export */ var pbr_material = (pbr_material_s3mlayerAttribute);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/layer/pbr-material/pbr-material.vue?vue&type=script&lang=js



/* harmony default export */ var pbr_materialvue_type_script_lang_js = ({
  name: "Sm3dAddPbr",
  components: {
    Panel: panel
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String
    }
  },

  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      pbrLibrary,
      selectedPbr,
      addPBR,
      clear
    } = pbr_material(props);
    return {
      layerNames,
      selectedLayerName,
      pbrLibrary,
      selectedPbr,
      addPBR,
      clear
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/layer/pbr-material/pbr-material.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/layer/pbr-material/pbr-material.vue




;
const pbr_material_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(pbr_materialvue_type_script_lang_js, [['render',pbr_materialvue_type_template_id_f810448c_render]])

/* harmony default export */ var pbr_material_pbr_material = (pbr_material_exports_);
;// CONCATENATED MODULE: ./globalCom/components/layer/pbr-material/index.js


pbr_material_pbr_material.install = function (app) {
  app.component(pbr_material_pbr_material.name, pbr_material_pbr_material);
};

/* harmony default export */ var layer_pbr_material = (pbr_material_pbr_material);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/scene/split-screen/split-screen.vue?vue&type=template&id=35deb811

const split_screenvue_type_template_id_35deb811_hoisted_1 = {
  class: "sm-global-row"
};

const split_screenvue_type_template_id_35deb811_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "分屏显示", -1);

const split_screenvue_type_template_id_35deb811_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("不使用分屏");

const split_screenvue_type_template_id_35deb811_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("水平分屏");

const split_screenvue_type_template_id_35deb811_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("垂直分屏");

const split_screenvue_type_template_id_35deb811_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("三视口");

const split_screenvue_type_template_id_35deb811_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("四视口");

function split_screenvue_type_template_id_35deb811_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 220
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", split_screenvue_type_template_id_35deb811_hoisted_1, [split_screenvue_type_template_id_35deb811_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.multiViewport,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.multiViewport = $event),
      style: {
        "width": "120px"
      }
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "NONE"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [split_screenvue_type_template_id_35deb811_hoisted_3]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "HORIZONTAL"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [split_screenvue_type_template_id_35deb811_hoisted_4]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "VERTICAL"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [split_screenvue_type_template_id_35deb811_hoisted_5]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "TRIPLE"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [split_screenvue_type_template_id_35deb811_hoisted_6]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "QUAD"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [split_screenvue_type_template_id_35deb811_hoisted_7]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/scene/split-screen/split-screen.vue?vue&type=template&id=35deb811

;// CONCATENATED MODULE: ./globalCom/components/scene/split-screen/split-screen.js
// 引入依赖

 //提示等工具

 //语言资源

 //简单局部状态管理

function splitScreen(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    multiViewport: "NONE",
    selectedViewport: '0',
    TreeDatas: []
  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let layers, imgLayers, terrainLayers, mvtLayers;
  let tree = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null); //记录视口的选中状态

  let KeysViewports = {
    KeysViewport1: [],
    KeysViewport2: [],
    KeysViewport3: [],
    KeysViewport4: []
  };
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
    setTimeout(() => {
      initLayers();
    }, 500);
  }); //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    initLayers();
  }); //初始化图层

  function initLayers() {
    layers = scene.layers && scene.layers.layerQueue;
    imgLayers = scene.imageryLayers._layers;
    mvtLayers = scene._vectorTileMaps && scene._vectorTileMaps._layerQueue;
    terrainLayers = scene.terrainProvider;
    state.TreeDatas.length = 0;
    updataS3MLayer();
    updataImgLayers();
    updataMvtLayers(); // setTimeout(() => {
    //     tree.value.setCheckedNodes(state.TreeDatas);
    //     let keys = tree.value.getCheckedKeys(true);
    //     KeysViewports.KeysViewport1 = [...keys];
    //     KeysViewports.KeysViewport2 = [...keys];
    //     KeysViewports.KeysViewport3 = [...keys];
    //     KeysViewports.KeysViewport4 = [...keys];
    // }, 500)
  } // 分析
  // updatS3M图层


  function updataS3MLayer() {
    if (layers.length == 0) {
      return;
    }

    let S3MLayersObj = {
      id: 's3m',
      label: "S3M图层",
      children: []
    };
    layers.forEach((layer, index) => {
      let S3Mlayer = {
        id: 's3m-' + index,
        label: layer._name
      };
      S3MLayersObj.children.push(S3Mlayer);
    });
    state.TreeDatas[0] = S3MLayersObj;
  } //updatImg


  function updataImgLayers() {
    if (imgLayers.length == 1) {
      return;
    }

    let imgLayersObj = {
      id: 'img',
      label: "IMG图层",
      children: []
    };
    imgLayers.forEach((layer, index) => {
      let isMvt = layer._imageryProvider instanceof SuperMap3D.MvtProviderGL;
      if (index === 0 || isMvt) return true;
      let IMGlayer = {
        id: 'img-' + index,
        label: lang.BaseMapImg
      };

      if (layer._imageryProvider.tablename) {
        IMGlayer.label = layer._imageryProvider.tablename;
      }

      imgLayersObj.children.unshift(IMGlayer);
    });
    if (imgLayersObj.children.length > 0) state.TreeDatas[1] = imgLayersObj;
  } //updatMVT


  function updataMvtLayers() {
    if (!mvtLayers) {
      return;
    }

    if (mvtLayers.length == 0) {
      return;
    }

    let mvtLayersObj = {
      id: 'mvt',
      label: "MVT图层",
      children: []
    };
    mvtLayers.forEach((layer, index) => {
      let IMGlayer = {
        id: 'mvt-' + index,
        label: layer.name
      };
      mvtLayersObj.children.unshift(IMGlayer);
    });
    state.TreeDatas[2] = mvtLayersObj;
  } //updatTerrain


  function updataTerrainLayers() {
    if (!terrainLayers.tablename) {
      return;
    }

    let terrainLayersObj = {
      id: 'terrain',
      label: "地形图层",
      children: []
    };
    let TerrainLayer = {
      id: 'terrain-0',
      label: terrainLayers.tablename
    };
    terrainLayersObj.children.push(TerrainLayer);
    state.TreeDatas[4] = terrainLayersObj;
  } //勾选节点函数


  function checkNode(data) {
    let node = tree.value.getNode(data);
    let ids = data.id.split('-');
    setVisibleInViewport(ids, node.checked);
  } //设置图层视口显隐


  function setVisibleInViewport(ids, checked) {
    let type = ids[0];
    let index = ids[1];

    switch (type) {
      case 's3m':
        if (!index) {
          for (let i = 0; i < layers.length; i++) {
            layers[i].setVisibleInViewport(Number(state.selectedViewport), checked);
          }

          return;
        }

        layers[index].setVisibleInViewport(Number(state.selectedViewport), checked);
        break;

      case 'img':
        if (!index) {
          for (let i = 0; i < imgLayers.length; i++) {
            imgLayers[i].setVisibleInViewport(Number(state.selectedViewport), checked);
          }

          return;
        }

        imgLayers[index].setVisibleInViewport(Number(state.selectedViewport), checked);
        break;

      case 'mvt':
        if (!index) {
          for (let i = 0; i < mvtLayers.length; i++) {
            mvtLayers[i].setVisibleInViewport(Number(state.selectedViewport), checked);
          }

          return;
        }

        mvtLayers[index].setVisibleInViewport(Number(state.selectedViewport), checked);
        break;

      default:
        null;
    }
  } //监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.multiViewport, val => {
    scene.multiViewportMode = SuperMap3D.MultiViewportMode[val];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedViewport, (val, oldval) => {
    let keys = tree.value.getCheckedKeys(true);
    KeysViewports['KeysViewport' + oldval] = keys;
    tree.value.setCheckedKeys(KeysViewports['KeysViewport' + val], true);
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    layers = null;
    imgLayers = null;
    terrainLayers = null;
    mvtLayers = null;
    KeysViewports = null;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    tree,
    checkNode
  };
}

;
/* harmony default export */ var split_screen = (splitScreen);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/scene/split-screen/split-screen.vue?vue&type=script&lang=js



/* harmony default export */ var split_screenvue_type_script_lang_js = ({
  name: "Sm3dSplitScreen",
  components: {
    Panel: panel
  },

  setup(props) {
    let {
      multiViewport,
      selectedViewport,
      TreeDatas,
      tree,
      checkNode
    } = split_screen(props);
    return {
      multiViewport,
      selectedViewport,
      TreeDatas,
      tree,
      checkNode
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/scene/split-screen/split-screen.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/scene/split-screen/split-screen.vue




;
const split_screen_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(split_screenvue_type_script_lang_js, [['render',split_screenvue_type_template_id_35deb811_render]])

/* harmony default export */ var split_screen_split_screen = (split_screen_exports_);
;// CONCATENATED MODULE: ./globalCom/components/scene/split-screen/index.js


split_screen_split_screen.install = function (app) {
  app.component(split_screen_split_screen.name, split_screen_split_screen);
};

/* harmony default export */ var scene_split_screen = (split_screen_split_screen);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/scene/roller/roller.vue?vue&type=template&id=e7a95052

const rollervue_type_template_id_e7a95052_hoisted_1 = {
  class: "sm-global-row"
};

const rollervue_type_template_id_e7a95052_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "卷帘模式", -1);

const rollervue_type_template_id_e7a95052_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("左右卷帘");

const rollervue_type_template_id_e7a95052_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("上下卷帘");

const rollervue_type_template_id_e7a95052_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("自定义卷帘");

const rollervue_type_template_id_e7a95052_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("使用卷帘");

const rollervue_type_template_id_e7a95052_hoisted_7 = {
  id: "verticalSliderLeft",
  ref: "verticalSliderLeft"
};
const rollervue_type_template_id_e7a95052_hoisted_8 = {
  id: "verticalSliderRight",
  ref: "verticalSliderRight"
};
const rollervue_type_template_id_e7a95052_hoisted_9 = {
  id: "horizontalSliderTop",
  ref: "horizontalSliderTop"
};
const rollervue_type_template_id_e7a95052_hoisted_10 = {
  id: "horizontalSliderBottom",
  ref: "horizontalSliderBottom"
};
function rollervue_type_template_id_e7a95052_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_checkbox = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-checkbox");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 230,
    pHeight: 200
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", rollervue_type_template_id_e7a95052_hoisted_1, [rollervue_type_template_id_e7a95052_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.rollerMode,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.rollerMode = $event),
      style: {
        "width": "120px"
      }
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "lrRoller"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [rollervue_type_template_id_e7a95052_hoisted_3]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "tbRoller"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [rollervue_type_template_id_e7a95052_hoisted_4]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "customRoller"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [rollervue_type_template_id_e7a95052_hoisted_5]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_checkbox, {
      checked: $setup.useRoller,
      "onUpdate:checked": _cache[1] || (_cache[1] = $event => $setup.useRoller = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [rollervue_type_template_id_e7a95052_hoisted_6]),
      _: 1
    }, 8, ["checked"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", rollervue_type_template_id_e7a95052_hoisted_7, null, 512), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", rollervue_type_template_id_e7a95052_hoisted_8, null, 512), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", rollervue_type_template_id_e7a95052_hoisted_9, null, 512), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", rollervue_type_template_id_e7a95052_hoisted_10, null, 512)]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/scene/roller/roller.vue?vue&type=template&id=e7a95052

;// CONCATENATED MODULE: ./globalCom/components/scene/roller/roller.js
// 引入依赖

 //提示等工具

 //语言资源

 //简单局部状态管理

function roller(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    useRoller: false,
    //使用卷帘
    rollerMode: "lrRoller",
    //卷帘模式
    lrRoller: "1",
    //左右卷帘时默认屏蔽左边
    tbRoller: "4",
    //上下卷帘时默认屏蔽上面
    TreeDatas: [] //图层树

  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let layers, imgLayers, terrainLayers, mvtLayers;
  let dom = document.getElementById('container');
  let wide = document.body.clientWidth - dom.clientWidth; //定位矫正

  let heide = document.body.clientHeight - dom.clientHeight;
  let width = dom.clientWidth; // 界面宽度

  let height = dom.clientHeight; // 界面高度

  let tree = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
  let verticalSliderLeft = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
  let verticalSliderRight = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
  let horizontalSliderTop = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
  let horizontalSliderBottom = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
  let scratchSwipeRegion = new SuperMap3D.BoundingRectangle(); // 卷帘配置参数，以对象方式实现地址传递

  let rollerShutterConfig = {
    startX: 0.33,
    //x方向左卷帘条比例
    startY: 0.33,
    //y方向上卷帘条比例
    endX: 0.66,
    //x方向右卷帘条比例
    endY: 0.66,
    //y方向下卷帘条比例
    index: 1,
    //当前控制卷帘条
    mode: 1 //卷帘模式

  }; //监听图层加载完成

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.changeLayers, val => {
    initLayers();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
    bindSliderEvt(); //绑定事件

    setTimeout(() => {
      initLayers();
    }, 500);
  }); //初始化图层

  function initLayers() {
    layers = scene.layers && scene.layers.layerQueue;
    imgLayers = scene.imageryLayers && scene.imageryLayers._layers;
    mvtLayers = scene._vectorTileMaps && scene._vectorTileMaps._layerQueue;
    terrainLayers = scene.terrainProvider;
    state.TreeDatas.length = 0;
    updataS3MLayer();
    updataImgLayers();
    updataMvtLayers();
    updataTerrainLayers(); // setTimeout(() => {
    //     tree.value.setCheckedNodes(state.TreeDatas); //默认全部勾选参与卷帘
    //     if (state.useRoller) setRollerShutterSplit();
    // }, 500)
  }

  ; // 分析
  // updatS3M图层

  function updataS3MLayer() {
    if (!layers) return;

    if (layers.length == 0) {
      return;
    }

    let S3MLayersObj = {
      id: 's3m',
      label: "S3M图层",
      children: []
    };
    layers.forEach((layer, index) => {
      let S3Mlayer = {
        id: 's3m-' + index,
        label: layer._name
      };
      S3MLayersObj.children.push(S3Mlayer);
    });
    state.TreeDatas[0] = S3MLayersObj;
  }

  ; //updatImg

  function updataImgLayers() {
    if (!imgLayers) return;

    if (imgLayers.length == 1) {
      return;
    }

    let imgLayersObj = {
      id: 'img',
      label: "IMG图层",
      children: []
    };
    imgLayers.forEach((layer, index) => {
      if (index === 0) return true;
      let isMvt = layer._imageryProvider instanceof SuperMap3D.MvtProviderGL;
      if (isMvt) return true;
      let IMGlayer = {
        id: 'img-' + index,
        label: lang.BaseMapImg
      };

      if (layer._imageryProvider.tablename) {
        IMGlayer.label = layer._imageryProvider.tablename;
      }

      imgLayersObj.children.unshift(IMGlayer);
    });
    if (imgLayersObj.children.length > 0) state.TreeDatas[1] = imgLayersObj;
  }

  ; //updatMVT

  function updataMvtLayers() {
    if (!mvtLayers) return;

    if (!mvtLayers) {
      return;
    }

    if (mvtLayers.length == 0) {
      return;
    }

    let mvtLayersObj = {
      id: 'mvt',
      label: "MVT图层",
      children: []
    };
    mvtLayers.forEach((layer, index) => {
      let IMGlayer = {
        id: 'mvt-' + index,
        label: layer.name
      };
      mvtLayersObj.children.unshift(IMGlayer);
    });
    state.TreeDatas[2] = mvtLayersObj;
  }

  ; //updatTerrain(地表)

  function updataTerrainLayers() {
    // if (!terrainLayers.tablename) {
    //     return;
    // }
    let terrainLayersObj = {
      id: 'globe',
      label: "地球",
      children: []
    };
    let TerrainLayer = {
      id: 'globe-0',
      label: '地表'
    };
    terrainLayersObj.children.push(TerrainLayer);
    state.TreeDatas[4] = terrainLayersObj;
  }

  ; //勾选节点函数

  function checkNode(data) {
    let node = tree.value.getNode(data);
    let ids = data.id.split('-');
    setLayersRoller(ids, node.checked);
  }

  ;
  /**
       * 设置卷帘的分割方向及分割条的位置。
       *
  */

  function setRollerShutterSplit() {
    let startX = rollerShutterConfig.startX;
    let startY = rollerShutterConfig.startY;
    let endX = rollerShutterConfig.endX;
    let endY = rollerShutterConfig.endY;
    let mode = rollerShutterConfig.mode; // 左右卷帘使用left slider滑动，上下卷帘使用top slider滑动

    switch (mode) {
      case 1:
        SuperMap3D.BoundingRectangle.unpack([startX, 0, 1, 1], 0, scratchSwipeRegion);
        break;

      case 2:
        SuperMap3D.BoundingRectangle.unpack([0, 0, startX, 1], 0, scratchSwipeRegion);
        break;

      case 4:
        SuperMap3D.BoundingRectangle.unpack([0, startY, 1, 1], 0, scratchSwipeRegion);
        break;

      case 8:
        SuperMap3D.BoundingRectangle.unpack([0, 0, 1, startY], 0, scratchSwipeRegion);
        break;

      case 15:
        SuperMap3D.BoundingRectangle.unpack([startX, startY, endX - startX, endY - startY], 0, scratchSwipeRegion);
        break;

      default:
        SuperMap3D.BoundingRectangle.unpack([0, 0, 1, 1], 0, scratchSwipeRegion);
        break;
    } // let checkedKeys = tree.value.getCheckedKeys(true);
    // checkedKeys.forEach((key) => {
    //     let ids = key.split('-');
    //     setLayersRoller(ids, true);
    // })

  }

  ; //设置各类图层的卷帘

  function setLayersRoller(ids, checked) {
    let type = ids[0];
    let index = ids[1];

    switch (type) {
      case 's3m':
        if (!index) {
          for (let i = 0; i < layers.length; i++) {
            layers[i].swipeEnabled = checked;
            layers[i].swipeRegion = scratchSwipeRegion;
          }

          return;
        }

        layers[index].swipeEnabled = checked;
        layers[index].swipeRegion = scratchSwipeRegion;
        break;

      case 'img':
        if (!index) {
          for (let i = 1; i < imgLayers.length; i++) {
            imgLayers[i].swipeEnabled = checked;
            imgLayers[i].swipeRegion = scratchSwipeRegion;
          }

          return;
        }

        imgLayers[index].swipeEnabled = checked;
        imgLayers[index].swipeRegion = scratchSwipeRegion;
        break;

      case 'mvt':
        if (!index) {
          for (let i = 0; i < mvtLayers.length; i++) {
            mvtLayers[i].swipeEnabled = checked;
            mvtLayers[i].swipeRegion = scratchSwipeRegion;
          }

          return;
        }

        mvtLayers[index].swipeEnabled = checked;
        mvtLayers[index].swipeRegion = scratchSwipeRegion;
        break;

      case 'globe':
        scene.globe.swipeEnabled = checked;
        scene.globe.swipeRegion = scratchSwipeRegion;
        break;

      default:
        null;
    }
  }

  ; // 取消所有图层的卷帘

  function cancelLayersRoller() {
    setLayersRoller(['s3m'], false);
    setLayersRoller(['img'], false);
    setLayersRoller(['mvt'], false);
    setLayersRoller(['globe'], false);
  } //设置卷帘条显隐


  function enableSlider(index) {
    verticalSliderLeft.value.style.display = 'none';
    verticalSliderRight.value.style.display = 'none';
    horizontalSliderTop.value.style.display = 'none';
    horizontalSliderBottom.value.style.display = 'none';

    if (index & 1) {
      verticalSliderLeft.value.style.display = 'block';
    }

    if (index & 2) {
      verticalSliderRight.value.style.display = 'block';
    }

    if (index & 4) {
      horizontalSliderTop.value.style.display = 'block';
    }

    if (index & 8) {
      horizontalSliderBottom.value.style.display = 'block';
    }
  }
  /**
   * 注册卷帘分割条的拖拽事件。
   */


  function bindSliderEvt() {
    verticalSliderLeft.value.addEventListener('mousedown', function (e) {
      mouseDown(e, 1);
    }, false);

    verticalSliderRight.value.onmousedown = function (e) {
      mouseDown(e, 3);
    };

    horizontalSliderTop.value.onmousedown = function (e) {
      mouseDown(e, 2);
    };

    horizontalSliderBottom.value.onmousedown = function (e) {
      mouseDown(e, 4);
    };

    window.addEventListener('resize', function () {
      width = document.body.clientWidth - wide; // 窗口宽度

      height = document.body.clientHeight - heide; // 窗口高度
    });
    document.addEventListener('mouseup', mouseUp, false);

    function mouseUp(e) {
      document.removeEventListener('mousemove', sliderMove, false);
    }

    function mouseDown(e, index) {
      rollerShutterConfig.index = index;
      document.addEventListener('mousemove', sliderMove, false);
    }

    function sliderMove(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }

      switch (rollerShutterConfig.index) {
        case 1:
          verticalSliderLeft.value.style.left = e.clientX - wide + 'px';
          rollerShutterConfig.startX = (e.clientX - wide) / width;
          break;

        case 2:
          horizontalSliderTop.value.style.top = e.clientY - heide + 'px';
          rollerShutterConfig.startY = (e.clientY - heide) / height;
          break;

        case 3:
          verticalSliderRight.value.style.left = e.clientX - wide + 'px';
          rollerShutterConfig.endX = (e.clientX - wide) / width;
          break;

        case 4:
          horizontalSliderBottom.value.style.top = e.clientY - heide + 'px';
          rollerShutterConfig.endY = (e.clientY - heide) / height;
          break;
      }

      setRollerShutterSplit();
    }
  } //监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.multiViewport, val => {
    scene.multiViewportMode = SuperMap3D.MultiViewportMode[val];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedViewport, (val, oldval) => {
    let keys = tree.value.getCheckedKeys(true);
    state['KeysViewport' + oldval] = keys;
    tree.value.setCheckedKeys(state['KeysViewport' + val], true);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.useRoller, val => {
    if (val) {
      if (rollerShutterConfig.mode == 1 || rollerShutterConfig.mode == 2) {
        enableSlider(1);
        return;
      } else if (rollerShutterConfig.mode == 4 || rollerShutterConfig.mode == 8) {
        enableSlider(4);
        return;
      } else if (rollerShutterConfig.mode == 15) {
        enableSlider(15);
        return;
      } else {
        setRollerShutterSplit();
      }
    } else {
      enableSlider(0);
      cancelLayersRoller();
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.rollerMode, val => {
    switch (val) {
      case "lrRoller":
        if (state.useRoller) enableSlider(1);
        rollerShutterConfig.mode = Number(state.lrRoller);
        break;

      case "tbRoller":
        if (state.useRoller) enableSlider(4);
        rollerShutterConfig.mode = Number(state.tbRoller);
        break;

      case "customRoller":
        if (state.useRoller) enableSlider(15);
        rollerShutterConfig.mode = 15;
        break;

      default:
        break;
    }

    if (!state.useRoller) return;
    setRollerShutterSplit();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.lrRoller, val => {
    if (!state.useRoller) return;
    rollerShutterConfig.mode = Number(val);
    setRollerShutterSplit();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.tbRoller, val => {
    if (!state.useRoller) return;
    rollerShutterConfig.mode = Number(val);
    setRollerShutterSplit();
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    layers = undefined;
    imgLayers = undefined;
    terrainLayers = undefined;
    mvtLayers = undefined;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    tree,
    checkNode,
    verticalSliderLeft,
    verticalSliderRight,
    horizontalSliderTop,
    horizontalSliderBottom
  };
}

;
/* harmony default export */ var roller_roller = (roller);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/scene/roller/roller.vue?vue&type=script&lang=js



/* harmony default export */ var rollervue_type_script_lang_js = ({
  name: "Sm3dRoller",
  components: {
    Panel: panel
  },
  props: {
    //卷帘模式
    rollerMode: {
      type: String
    }
  },

  setup(props) {
    let {
      useRoller,
      rollerMode,
      lrRoller,
      tbRoller,
      TreeDatas,
      tree,
      checkNode,
      verticalSliderLeft,
      verticalSliderRight,
      horizontalSliderTop,
      horizontalSliderBottom
    } = roller_roller(props);
    return {
      useRoller,
      rollerMode,
      lrRoller,
      tbRoller,
      TreeDatas,
      tree,
      checkNode,
      verticalSliderLeft,
      verticalSliderRight,
      horizontalSliderTop,
      horizontalSliderBottom
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/scene/roller/roller.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./globalCom/components/scene/roller/roller.vue




;
const roller_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(rollervue_type_script_lang_js, [['render',rollervue_type_template_id_e7a95052_render]])

/* harmony default export */ var scene_roller_roller = (roller_exports_);
;// CONCATENATED MODULE: ./globalCom/components/scene/roller/index.js


scene_roller_roller.install = function (app) {
  app.component(scene_roller_roller.name, scene_roller_roller);
};

/* harmony default export */ var scene_roller = (scene_roller_roller);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/draw/draw-line-surface/draw-line-surface.vue?vue&type=template&id=6c804cfe&scoped=true


const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.pushScopeId)("data-v-6c804cfe"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.popScopeId)(), n);

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_1 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("绘制线");

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("绘制面");

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_3 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_4 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "绘制模式", -1));

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("空间模式");

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("贴地模式");

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_7 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("贴对象模式");

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_8 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("编辑");

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_10 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("编辑Z轴");

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_11 = {
  class: "sm-dl-box"
};
const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_12 = ["onClick"];
const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_13 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_14 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "线颜色", -1));

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_15 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_16 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "线宽", -1));

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_17 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_18 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "间隔颜色", -1));

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_19 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_20 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "分量长度", -1));

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_21 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_22 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "轮廓颜色", -1));

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_23 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_24 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "轮廓宽度", -1));

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_25 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_26 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "光晕强度", -1));

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_27 = {
  class: "sm-global-row"
};

const draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_28 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "尾迹占比", -1));

const _hoisted_29 = {
  class: "sm-dl-box"
};
const _hoisted_30 = ["onClick"];
const _hoisted_31 = {
  class: "sm-global-row"
};

const _hoisted_32 = /*#__PURE__*/draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "面颜色", -1));

const _hoisted_33 = {
  class: "sm-global-button"
};

const _hoisted_34 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("绘制");

const _hoisted_35 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_radio = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio");

  const _component_a_radio_group = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio-group");

  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_checkbox = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-checkbox");

  const _component_a_input_number = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-input-number");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 250
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio_group, {
      value: $setup.drawType,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.drawType = $event),
      class: "sm-global-row"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "polyline"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_1]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "polygon"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_2]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_3, [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.drawModle,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.drawModle = $event),
      style: {
        "width": "120px"
      }
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "space"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_5]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "stick"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_6]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "postObject"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_7]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_8, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_checkbox, {
      checked: $setup.isEdit,
      "onUpdate:checked": _cache[2] || (_cache[2] = $event => $setup.isEdit = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_9]),
      _: 1
    }, 8, ["checked"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_checkbox, {
      checked: $setup.isEditZ,
      "onUpdate:checked": _cache[3] || (_cache[3] = $event => $setup.isEditZ = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_10]),
      _: 1
    }, 8, ["checked"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_11, [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.config.polyline, line => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
        key: line.id,
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)(["sm-dl-line-item", {
          'sm-dl-theme-color': line.id === $setup.currentId
        }]),
        onClick: $event => $setup.changeSelect(line.id)
      }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)(["iconfont", line.iconfont])
      }, null, 2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(line.lineName), 1)], 10, draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_12);
    }), 128))]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_13, [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_14, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.lineColor = $event),
      class: "sm-global-color"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.lineColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_15, [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_16, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.lineWidth,
      "onUpdate:value": _cache[5] || (_cache[5] = $event => $setup.lineWidth = $event),
      min: 1,
      class: "sm-global-input-number"
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_17, [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_18, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $setup.dottedColor = $event),
      class: "sm-global-input-number"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.dottedColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_19, [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_20, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.dottedLength,
      "onUpdate:value": _cache[7] || (_cache[7] = $event => $setup.dottedLength = $event),
      min: 1,
      class: "sm-global-input-number"
    }, null, 8, ["value"])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.currentId === '2']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_21, [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_22, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => $setup.outLineColor = $event),
      class: "sm-global-input-number"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.outLineColor]])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_23, [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_24, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.outLineWidth,
      "onUpdate:value": _cache[9] || (_cache[9] = $event => $setup.outLineWidth = $event),
      min: 0,
      class: "sm-global-input-number"
    }, null, 8, ["value"])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.currentId === '3']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_25, [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_26, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.glowStrength,
      "onUpdate:value": _cache[10] || (_cache[10] = $event => $setup.glowStrength = $event),
      min: "0",
      step: "0.1",
      class: "sm-global-input-number"
    }, null, 8, ["value"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.currentId === '5']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_27, [draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_hoisted_28, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.trailPercentage,
      "onUpdate:value": _cache[11] || (_cache[11] = $event => $setup.trailPercentage = $event),
      min: "0",
      step: "0.1",
      class: "sm-global-input-number"
    }, null, 8, ["value"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.currentId === '6']])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.drawType === 'polyline']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_29, [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.config.polygon, polygon => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
        key: polygon.id,
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)(["sm-dl-line-item", {
          'theme-color': polygon.id === $setup.currentId
        }]),
        onClick: $event => $setup.changeSelect(polygon.id)
      }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("i", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)(["iconfont", polygon.iconfont])
      }, null, 2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(polygon.faceName), 1)], 10, _hoisted_30);
    }), 128))]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_31, [_hoisted_32, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => $setup.solidColor = $event),
      class: "sm-global-input-number"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, $setup.solidColor]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.drawType === 'polygon']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_33, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.draw
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_34]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clear
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [_hoisted_35]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/draw/draw-line-surface/draw-line-surface.vue?vue&type=template&id=6c804cfe&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/draw/draw-line-surface/config.js
/* harmony default export */ var draw_line_surface_config = ({
  polyline: [{
    id: '1',
    iconfont: 'iconshixian',
    lineName: '实线'
  }, {
    id: '2',
    iconfont: 'iconxuxian',
    lineName: '虚线'
  }, {
    id: '3',
    iconfont: 'iconlunkuoxian',
    lineName: '轮廓线'
  }, {
    id: '4',
    iconfont: 'iconjiantouxian',
    lineName: '箭头线'
  }, {
    id: '5',
    iconfont: 'iconguangyunxian',
    lineName: '光晕线'
  }, {
    id: '6',
    iconfont: 'iconweijixian',
    lineName: '尾迹线'
  }, {}, {}],
  polygon: [{
    id: '1',
    iconfont: 'iconchunse',
    faceName: '纯色'
  } // {
  //     id:'2' ,
  //     iconfont:'iconwangge',
  //     faceName:'网格'
  //  },
  //  {
  //     id:'3' ,
  //     iconfont:'icontiaowen',
  //     faceName:'条纹'
  //  },
  ]
});
;// CONCATENATED MODULE: ./globalCom/components/draw/draw-line-surface/draw-line-surface.js
// 引入依赖

 //简单局部状态管理

 //提示等工具

 //语言资源

 //公共handler.js

 //公共handler.js


 //语言资源



function draw(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    drawModle: "space",
    //绘制模式
    currentId: "1",
    //当前选中线id
    config: draw_line_surface_config,
    //线类型配置  
    lineColor: "#FAC441",
    //设置线颜色
    lineWidth: 5,
    //设置选中线宽
    dottedColor: "#FAC441",
    //间隔颜色
    dottedLength: 30,
    outLineColor: "#1DCEC8",
    outLineWidth: 2,
    glowStrength: 0.5,
    trailPercentage: 0.3,
    trailPeroid: 2,
    isEdit: true,
    isEditZ: false,
    //面
    drawType: 'polyline',
    solidColor: "#FAC441",
    gridColor: "#FAC441",
    gridWidth: 1,
    gridCount: 8,
    gridCellAlpha: 0.1,
    stripeEvenColor: "#FFFFFF",
    stripeOddColor: "#000000",
    stripeRepeat: 12,
    stripeOffset: 0,
    stripeOrientation: "horizontal"
  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let clampToGround = undefined,
      classificationType = undefined;
  let perPositionHeight = true,
      clampToS3M = undefined,
      classificationType_gon = SuperMap3D.ClassificationType.TERRAIN;
  let selected_line = undefined;
  let selected_gon = undefined;
  let setHeight = undefined;

  if (storeState.isViewer) {
    // if (!window.tooltip) {
    //     window.tooltip = createTooltip(scene._element);
    // }
    scene.eventManager.addEventListener("CLICK", LEFT_CLICK_Listener, false);
    Edit(); //编辑功能
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      // if (!window.tooltip) {
      //     window.tooltip = createTooltip(scene._element);
      // }
      scene.eventManager.addEventListener("CLICK", LEFT_CLICK_Listener, false);
      Edit(); //编辑功能
    }
  });

  function changeSelect(id) {
    state.currentId = id;
  }

  function drawPolyline() {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    } // window.tooltip.showAt(' <p>点击鼠标左键开始绘制</p><p>右键单击结束分析</p><p>选中对象进行编辑或清除</p>', '50%');


    handlerDrawing("Polyline").then(res => {
      creat_entity_line(res.result.object.positions);
      let handlerPolyline = window.handlerPolyline;
      handlerPolyline.polyline.show = false;
      window.polylineTransparent.show = false; //半透线隐藏

      handlerPolyline.deactivate(); // tooltip.setVisible(false);
    }, err => {
      console.log(err);
    });
    window.handlerPolyline.activate();
  }

  function creat_entity_line(position) {
    let lineColor = SuperMap3D.Color.fromCssColorString(state.lineColor);
    let lineWidth = Number(state.lineWidth);
    let material;

    switch (state.currentId) {
      case '1':
        material = lineColor;
        break;

      case '2':
        let dottedColor = SuperMap3D.Color.fromCssColorString(state.dottedColor); //间隔颜色

        let dottedLength = Number(state.dottedLength);
        material = new SuperMap3D.PolylineDashMaterialProperty({
          color: lineColor,
          gapColor: dottedColor,
          dashLength: dottedLength
        });
        break;

      case '3':
        let outLineColor = SuperMap3D.Color.fromCssColorString(state.outLineColor); //轮廓颜色

        let outLineWidth = Number(state.outLineWidth);
        material = new SuperMap3D.PolylineOutlineMaterialProperty({
          color: lineColor,
          outlineWidth: outLineWidth,
          outlineColor: outLineColor
        });
        break;

      case '4':
        material = new SuperMap3D.PolylineArrowMaterialProperty(lineColor);
        break;

      case '5':
        let glowStrength = Number(state.glowStrength);
        material = new SuperMap3D.PolylineGlowMaterialProperty({
          glowPower: glowStrength,
          color: lineColor
        });
        break;

      case '6':
        let trailPercentage = Number(state.trailPercentage);
        material = new SuperMap3D.PolylineTrailMaterialProperty({
          color: lineColor,
          trailLength: trailPercentage,
          period: state.trailPeroid
        });
        break;

      default:
        material = lineColor;
        break;
    }

    ;
    selected_line = scene.trackingLayer.add({
      id: "polyline-symbol-line-" + new Date().getTime(),
      polyline: {
        positions: position,
        width: lineWidth,
        material: material,
        clampToGround: clampToGround,
        //线贴地
        classificationType: classificationType,
        //线面贴对象
        height: setHeight
      }
    });
  }

  function LEFT_CLICK_Listener(e) {
    //获取点击位置笛卡尔坐标
    let selectedEntity = scene.pick(e.message.position);

    if (selectedEntity && selectedEntity.id && selectedEntity.id.id && typeof selectedEntity.id.id === 'string') {
      if (selectedEntity.id.id.indexOf("polyline-symbol-line") != -1) {
        selected_line = selectedEntity.id;
      }

      if (selectedEntity.id.id.indexOf("polygon-symbol-gon") != -1) {
        selected_gon = selectedEntity.id;
      }
    }
  }

  function clear() {
    if (selected_line && state.drawType === 'polyline') scene.trackingLayer.removeById(selected_line.id);
    if (selected_gon && state.drawType === 'polygon') scene.trackingLayer.removeById(selected_gon.id); // window.tooltip.setVisible(false);

    clearHandlerDrawing('Polyline');
    clearHandlerDrawing('Polygon');
    if (window.editHandler) window.editHandler.clear();
  }

  function draw() {
    if (state.drawType === 'polyline') drawPolyline();else drawPolygon();
  }

  function drawPolygon() {
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", false).then(res => {
      let handlerPolygon = window.handlerPolygon;
      creat_entity_gon(res.result.object.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();
    }, err => {
      console.log(err);
    });
    window.handlerPolygon.activate();
  }

  function creat_entity_gon(position) {
    console.log(position);
    let material;

    switch (state.currentId) {
      case '1':
        let polygonColor = SuperMap3D.Color.fromCssColorString(state.solidColor);
        material = polygonColor;
        break;

      case '2':
        let gridColor = SuperMap3D.Color.fromCssColorString(state.gridColor); //间隔颜色

        let gridWidth = Number(state.gridWidth);
        let gridCount = Number(state.gridCount);
        let gridCellAlpha = Number(state.gridCellAlpha);
        material = new SuperMap3D.GridMaterialProperty({
          color: gridColor,
          cellAlpha: gridCellAlpha,
          lineCount: new SuperMap3D.Cartesian2(gridCount, gridCount),
          lineThickness: new SuperMap3D.Cartesian2(gridWidth, gridWidth)
        });
        break;

      case '3':
        let stripeEvenColor = SuperMap3D.Color.fromCssColorString(state.stripeEvenColor); //间隔颜色

        let stripeOddColor = SuperMap3D.Color.fromCssColorString(state.stripeOddColor); //间隔颜色

        let stripeRepeat = Number(state.stripeRepeat);
        let stripeOffset = Number(state.stripeOffset);
        material = new SuperMap3D.StripeMaterialProperty({
          evenColor: stripeEvenColor,
          oddColor: stripeOddColor,
          repeat: stripeRepeat,
          offset: stripeOffset,
          orientation: state.stripeOrientation === 'horizontal' ? 0 : 1
        });
        break;

      default:
        break;
    }

    ;
    selected_gon = scene.trackingLayer.add({
      id: "polygon-symbol-gon-" + new Date().getTime(),
      polygon: {
        hierarchy: {
          positions: position
        },
        material: material // perPositionHeight: perPositionHeight,
        // heightReference: SuperMap3D.HeightReference.NONE 

      } // clampToS3M: clampToS3M
      // classificationType: classificationType, //面贴对象
      // height: setHeight

    });
  } // 销毁


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    if (scene) scene.eventManager.removeEventListener("CLICK", LEFT_CLICK_Listener);
  }); // 监听

  function setLineMode(val1, val2, val3) {
    clampToGround = val1;
    classificationType = val2;
    setHeight = val3;

    if (selected_line) {
      selected_line.polyline.clampToGround = clampToGround;
      selected_line.polyline.classificationType = classificationType;
      selected_line.polyline.height = val3;
    }
  } // 


  function setGonMode(val1, val2, val3) {
    perPositionHeight = val1;
    classificationType = val2;
    setHeight = val3;

    if (selected_gon) {
      selected_gon.polygon.perPositionHeight = perPositionHeight;
      selected_gon.classificationType = classificationType;
      selected_gon.polygon.height = val3;
    }
  }

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.drawModle, val => {
    let isLine = state.drawType === 'polyline' ? true : false;

    switch (val) {
      case "space":
        if (isLine) setLineMode(undefined, undefined, undefined);else setGonMode(true, undefined, undefined);
        break;

      case "stick":
        if (isLine) setLineMode(true, SuperMap3D.ClassificationType.TERRAIN, 0);else setGonMode(false, SuperMap3D.ClassificationType.TERRAIN, 0);
        break;

      case "postObject":
        if (isLine) setLineMode(true, SuperMap3D.ClassificationType.S3M_TILE, undefined);else setGonMode(false, SuperMap3D.ClassificationType.S3M_TILE, undefined);
        break;

      default:
        setLineMode(undefined, undefined, undefined);
        setGonMode(true, false, undefined);
        break;
    }

    ;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.lineColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_line) selected_line.polyline.material.color = color;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.lineWidth, val => {
    if (selected_line) selected_line.polyline.width = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.dottedColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_line) selected_line.polyline.material.gapColor = color;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.dottedLength, val => {
    if (selected_line) selected_line.polyline.material.dashLength = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.outLineColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_line) selected_line.polyline.material.outlineColor = color;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.outLineWidth, val => {
    if (selected_line) selected_line.polyline.material.outlineWidth = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.glowStrength, val => {
    if (selected_line) selected_line.polyline.material.glowPower = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.trailPercentage, val => {
    if (selected_line) selected_line.polyline.material.trailLength = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.isEdit, val => {
    if (!selected_line) return;

    if (val) {
      Edit();
      return;
    }

    clearEditHandler();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.isEditZ, val => {
    if (!selected_line) return;

    if (window.editHandler) {
      window.editHandler.isEditZ = val;
    }
  }); //面

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.drawType, val => {
    state.currentId = '1';
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.solidColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_gon) selected_gon.polygon.material = color;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.gridColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_gon) selected_gon.polygon.material.color = color;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.gridWidth, val => {
    if (selected_gon) selected_gon.polygon.material.lineThickness = new SuperMap3D.Cartesian2(Number(val), Number(val));
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.gridCount, val => {
    if (selected_gon) selected_gon.polygon.material.lineCount = new SuperMap3D.Cartesian2(Number(val), Number(val));
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.gridCellAlpha, val => {
    if (selected_gon) selected_gon.polygon.material.cellAlpha = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.stripeEvenColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_gon) selected_gon.polygon.material.evenColor = color;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.stripeOddColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_gon) selected_gon.polygon.material.oddColor = color;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.stripeRepeat, val => {
    if (selected_gon) selected_gon.polygon.material.repeat = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.stripeOffset, val => {
    if (selected_gon) selected_gon.polygon.material.offset = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.stripeOrientation, val => {
    if (!selected_gon) return;
    let or = val === 'horizontal' ? 0 : 1;
    selected_gon.polygon.material.orientation = or;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    draw,
    changeSelect,
    clear
  };
}

;
/* harmony default export */ var draw_line_surface = (draw);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/draw/draw-line-surface/draw-line-surface.vue?vue&type=script&lang=js



/* harmony default export */ var draw_line_surfacevue_type_script_lang_js = ({
  name: "Sm3dDrawLinePolygon",
  components: {
    Panel: panel
  },

  setup(props) {
    let {
      drawModle,
      currentId,
      lineColor,
      lineWidth,
      config,
      draw,
      changeSelect,
      clear,
      isEdit,
      isEditZ,
      dottedColor,
      //间隔颜色
      dottedLength,
      outLineColor,
      outLineWidth,
      glowStrength,
      trailPercentage,
      drawType,
      solidColor,
      gridColor,
      gridWidth,
      gridCount,
      gridCellAlpha,
      stripeEvenColor,
      stripeOddColor,
      stripeRepeat,
      stripeOffset,
      stripeOrientation
    } = draw_line_surface(props);
    return {
      drawModle,
      currentId,
      lineColor,
      lineWidth,
      config,
      draw,
      changeSelect,
      clear,
      isEdit,
      isEditZ,
      dottedColor,
      //间隔颜色
      dottedLength,
      outLineColor,
      outLineWidth,
      glowStrength,
      trailPercentage,
      drawType,
      solidColor,
      gridColor,
      gridWidth,
      gridCount,
      gridCellAlpha,
      stripeEvenColor,
      stripeOddColor,
      stripeRepeat,
      stripeOffset,
      stripeOrientation
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/draw/draw-line-surface/draw-line-surface.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/draw/draw-line-surface/draw-line-surface.vue?vue&type=style&index=0&id=6c804cfe&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/draw/draw-line-surface/draw-line-surface.vue?vue&type=style&index=0&id=6c804cfe&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/draw/draw-line-surface/draw-line-surface.vue




;


const draw_line_surface_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(draw_line_surfacevue_type_script_lang_js, [['render',draw_line_surfacevue_type_template_id_6c804cfe_scoped_true_render],['__scopeId',"data-v-6c804cfe"]])

/* harmony default export */ var draw_line_surface_draw_line_surface = (draw_line_surface_exports_);
;// CONCATENATED MODULE: ./globalCom/components/draw/draw-line-surface/index.js


draw_line_surface_draw_line_surface.install = function (app) {
  app.component(draw_line_surface_draw_line_surface.name, draw_line_surface_draw_line_surface);
};

/* harmony default export */ var draw_draw_line_surface = (draw_line_surface_draw_line_surface);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/special-effects/scan-effect/scan-effect.vue?vue&type=template&id=7ec4e8d0&scoped=true


const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.pushScopeId)("data-v-7ec4e8d0"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.popScopeId)(), n);

const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_1 = {
  class: "sm-global-row"
};

const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_2 = /*#__PURE__*/scan_effectvue_type_template_id_7ec4e8d0_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "扫描模式", -1));

const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("现状扫描");

const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("环状扫描");

const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_5 = {
  class: "sm-global-row"
};

const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_6 = /*#__PURE__*/scan_effectvue_type_template_id_7ec4e8d0_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "扫描纹理", -1));

const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_7 = {
  class: "sm-global-button"
};

const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("添加");

const scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_9 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function scan_effectvue_type_template_id_7ec4e8d0_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_radio = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio");

  const _component_a_radio_group = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-radio-group");

  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 300,
    pHeight: 130
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_1, [scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio_group, {
      value: $setup.scanMode,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.scanMode = $event),
      name: "radioGroup"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "lineMode"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_3]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_radio, {
        value: "ringMode"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_4]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_5, [scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.selectedTextureIndex,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.selectedTextureIndex = $event),
      class: "sm-sc-select"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($setup.scanTextures, (texture, index) => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_a_select_option, {
          value: index,
          key: index
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(texture.name), 1)]),
          _: 2
        }, 1032, ["value"]);
      }), 128))]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_7, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.addScans
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_8]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clear
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [scan_effectvue_type_template_id_7ec4e8d0_scoped_true_hoisted_9]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/special-effects/scan-effect/scan-effect.vue?vue&type=template&id=7ec4e8d0&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/special-effects/scan-effect/textures.js
/* harmony default export */ var textures = ([{
  name: '线状纹理1',
  type: 'line',
  url: __webpack_require__(1445)
}, {
  name: '线状纹理2',
  type: 'line',
  url: __webpack_require__(5685)
}, {
  name: '环状纹理1',
  type: 'ring',
  url: __webpack_require__(3589)
}, {
  name: '环状纹理2',
  type: 'ring',
  url: __webpack_require__(7188)
}, {
  name: '环状六边形纹理',
  type: 'ring',
  url: __webpack_require__(2476)
}]);
;// CONCATENATED MODULE: ./globalCom/components/special-effects/scan-effect/scan-effect.js
// 引入依赖

 //简单局部状态管理

 //提示等工具

 //语言资源

 //公共handler.js


 // 设置默认值数据

function scanEffect(props) {
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    scanMode: "lineMode",
    scanColor: "#0F7AF4",
    scanTextures: [],
    selectedTextureIndex: 0,
    bloomShow: false,
    //开启反光
    openHDR: false,
    //开启HDR
    threshold: 0.01,
    //亮度阈值
    intensity: 0.5,
    //泛光强度
    lineWidth: 100,
    //获取或设置线状扫描线的宽度，单位：米。
    period: 3.0,
    //获取或设置扫描线的运行周期，单位：秒。
    speed: 100,
    //获取或设置扫描线的运行速度，单位：米/秒。
    addTextures: null,
    //[{name:纹理1,type:'line / ring',url:xxx}]
    scanShow: false
  }); // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  } // 初始化数据


  let lineScanTextures = [{
    name: '无纹理',
    type: 'line',
    url: ''
  }];
  let circleScanTextures = [{
    name: '无纹理',
    type: 'ring',
    url: ''
  }];
  getTextures(textures);

  function getTextures(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].type === 'line') {
        lineScanTextures.push(arr[i]);
      } else {
        circleScanTextures.push(arr[i]);
      }
    }

    state.scanTextures = state.scanMode === 'lineMode' ? lineScanTextures : circleScanTextures;
  }

  ;

  if (storeState.isViewer) {
    // if (!window.tooltip) {
    //     window.tooltip = createTooltip(scene._element);
    // }
    init();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      // if (!window.tooltip) {
      //     window.tooltip = createTooltip(scene._element);
      // }
      init();
    }
  });

  function init() {
    scene.scanEffect.color = SuperMap3D.Color.fromCssColorString(state.scanColor);
    scene.scanEffect.textureUrl = '';
    scene.scanEffect.lineWidth = Number(state.lineWidth);
    scene.scanEffect.period = Number(state.period);
    scene.scanEffect.speed = Number(state.speed);
    scene.scanEffect.centerPostion = new SuperMap3D.Cartesian3.fromDegrees(0, 0, 0);
  }

  ;

  function drawPolyline() {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    } // window.tooltip.showAt(' <p>点击鼠标左键开始绘制</p><p>绘制两点确定扫描线方向</p><p>鼠标右键结束绘制</p>', '350px');


    handlerDrawing("Polyline").then(res => {
      addLineScans(res.result.object.positions);
      let handlerPolyline = window.handlerPolyline;
      handlerPolyline.polyline.show = false;
      window.polylineTransparent.show = false; //半透线隐藏

      handlerPolyline.deactivate(); // tooltip.setVisible(false);
    }, err => {
      console.log(err);
    });
    window.handlerPolyline.activate();
  }

  function addLineScans(positions) {
    let dir = new SuperMap3D.Cartesian3();
    SuperMap3D.Cartesian3.subtract(positions[1], positions[0], dir); // 获取扫描方向向量

    if (state.scanShow) {
      scene.scanEffect.add(positions[0]);
      scene.scanEffect.lineMoveDirection = dir;
      return;
    }

    scene.scanEffect.centerPostion = positions[0];
    scene.scanEffect.lineMoveDirection = dir;
    state.scanShow = true;
  }

  function addCircleScans(e) {
    scene.eventManager.removeEventListener("CLICK", addCircleScans);
    scene.enableCursorStyle = true;
    document.body.classList.remove("measureCur");
    let centerPosition = scene.pickPosition(e.message.position);

    if (state.scanShow) {
      scene.scanEffect.add(centerPosition);
      return;
    }

    scene.scanEffect.centerPostion = centerPosition;
    state.scanShow = true;
  }

  function addScans() {
    if (state.scanMode === 'lineMode') {
      drawPolyline();
      return;
    }

    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur");
    scene.eventManager.addEventListener("CLICK", addCircleScans, true);
  }

  function clear() {
    state.scanShow = false;
    let index = scene.scanEffect.count;

    for (let i = 0; i < index; i++) {
      scene.scanEffect.remove(i);
    }

    scene.eventManager.removeEventListener("CLICK", addCircleScans);
    clearHandlerDrawing('Polyline');
  } // 监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.scanShow, val => {
    scene.scanEffect.show = val;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.scanMode, val => {
    if (val === "lineMode") {
      scene.scanEffect.mode = SuperMap3D.ScanEffectMode.LINE;
      state.scanTextures = lineScanTextures;
      return;
    }

    scene.scanEffect.mode = SuperMap3D.ScanEffectMode.CIRCLE;
    state.scanTextures = circleScanTextures;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.scanColor, val => {
    scene.scanEffect.color = SuperMap3D.Color.fromCssColorString(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.selectedTextureIndex, val => {
    scene.scanEffect.textureUrl = state.scanTextures[val].url;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.scanTextures, val => {
    state.selectedTextureIndex = 0;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.bloomShow, val => {
    scene.bloomEffect.show = val;
    scene.bloomEffect.threshold = Number(state.threshold);
    scene.bloomEffect.bloomIntensity = Number(state.intensity);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.openHDR, val => {
    scene.hdrEnabled = val;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.threshold, val => {
    scene.bloomEffect.threshold = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.intensity, val => {
    scene.bloomEffect.bloomIntensity = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.lineWidth, val => {
    scene.scanEffect.lineWidth = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.period, val => {
    scene.scanEffect.period = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.speed, val => {
    scene.scanEffect.speed = Number(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.scanShow, val => {
    scene.scanEffect.scanShow = val;
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.addTextures, val => {
    if (typeof val === 'object') {
      getTextures(val);
    } else {
      console.log('addTextures类型不是数组！');
    }
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {});
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    addScans,
    clear
  };
}

;
/* harmony default export */ var scan_effect = (scanEffect);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/special-effects/scan-effect/scan-effect.vue?vue&type=script&lang=js



/* harmony default export */ var scan_effectvue_type_script_lang_js = ({
  components: {
    Panel: panel
  },
  name: "Sm3dScanEffect",
  props: {
    //扫描线模式lineMode/ringMode
    scanMode: {
      type: String
    },
    scanColor: {
      type: String
    },
    selectedTextureIndex: {
      type: Number
    },
    //开启反光
    bloomShow: {
      type: Boolean
    },
    //开启HDR
    openHDR: {
      type: Boolean
    },
    //亮度阈值
    threshold: {
      type: Number
    },
    //泛光强度
    intensity: {
      type: Number
    },
    //获取或设置线状扫描线的宽度，单位：米。
    lineWidth: {
      type: Number
    },
    //获取或设置扫描线的运行周期，单位：秒。
    period: {
      type: Number
    },
    //获取或设置扫描线的运行速度，单位：米/秒。
    speed: {
      type: Number
    },
    //添加纹理[{name:纹理1,type:'line / ring',url:xxx}]
    addTextures: {
      type: Object
    },
    scanShow: {
      type: Boolean
    }
  },

  setup(props) {
    let {
      scanMode,
      scanTextures,
      selectedTextureIndex,
      addScans,
      clear
    } = scan_effect(props);
    return {
      scanMode,
      scanTextures,
      selectedTextureIndex,
      addScans,
      clear
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/special-effects/scan-effect/scan-effect.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/special-effects/scan-effect/scan-effect.vue?vue&type=style&index=0&id=7ec4e8d0&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/special-effects/scan-effect/scan-effect.vue?vue&type=style&index=0&id=7ec4e8d0&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/special-effects/scan-effect/scan-effect.vue




;


const scan_effect_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(scan_effectvue_type_script_lang_js, [['render',scan_effectvue_type_template_id_7ec4e8d0_scoped_true_render],['__scopeId',"data-v-7ec4e8d0"]])

/* harmony default export */ var scan_effect_scan_effect = (scan_effect_exports_);
;// CONCATENATED MODULE: ./globalCom/components/special-effects/scan-effect/index.js


scan_effect_scan_effect.install = function (app) {
  app.component(scan_effect_scan_effect.name, scan_effect_scan_effect);
};

/* harmony default export */ var special_effects_scan_effect = (scan_effect_scan_effect);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/model/geological-body/geological-body.vue?vue&type=template&id=c36566bc&scoped=true


const geological_bodyvue_type_template_id_c36566bc_scoped_true_withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.pushScopeId)("data-v-c36566bc"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.popScopeId)(), n);

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_1 = {
  class: "sm-global-row"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_2 = /*#__PURE__*/geological_bodyvue_type_template_id_c36566bc_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "操作类型", -1));

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("拉伸与剖切");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_4 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("开挖");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("转孔");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_7 = {
  class: "sm-global-row"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_8 = /*#__PURE__*/geological_bodyvue_type_template_id_c36566bc_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "拉伸系数", -1));

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_9 = {
  class: "sm-gb-button"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_10 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("画线");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_11 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("剖切");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_12 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_13 = {
  class: "sm-global-row"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_14 = /*#__PURE__*/geological_bodyvue_type_template_id_c36566bc_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "开挖深度", -1));

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_15 = {
  class: "sm-gb-button"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_16 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("开挖");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_17 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_18 = {
  class: "sm-global-row"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_19 = /*#__PURE__*/geological_bodyvue_type_template_id_c36566bc_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "钻孔半径", -1));

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_20 = {
  class: "sm-global-row"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_21 = /*#__PURE__*/geological_bodyvue_type_template_id_c36566bc_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "钻孔深度", -1));

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_22 = {
  class: "sm-gb-button"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_23 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("钻孔");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_24 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_25 = {
  class: "sm-global-row"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_26 = /*#__PURE__*/geological_bodyvue_type_template_id_c36566bc_scoped_true_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", null, "裁剪模式", -1));

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_27 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪外部");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_28 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪内部");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_29 = {
  class: "sm-gb-button"
};

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_30 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("裁剪");

const geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_31 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("清除");

function geological_bodyvue_type_template_id_c36566bc_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select-option");

  const _component_a_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-select");

  const _component_a_input_number = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-input-number");

  const _component_a_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("a-button");

  const _component_Panel = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("Panel");

  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_Panel, {
    pWidth: 220,
    pHeight: 170
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_1, [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      value: $setup.operationType,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => $setup.operationType = $event),
      class: "sm-global-select"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "stretch_cut"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_3]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "dig"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_4]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "drilling"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_5]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "clip"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_6]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_7, [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_8, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.stretchHeight,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => $setup.stretchHeight = $event),
      min: 1,
      class: "sm-global-input-number"
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_9, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.drawLine
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_10]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.startCut
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_11]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearCut
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_12]),
      _: 1
    }, 8, ["onClick"])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.operationType === 'stretch_cut']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_13, [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_14, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.digHeight,
      "onUpdate:value": _cache[2] || (_cache[2] = $event => $setup.digHeight = $event),
      min: 1,
      class: "sm-global-input-number"
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_15, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.startDig
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_16]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearDig
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_17]),
      _: 1
    }, 8, ["onClick"])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.operationType === 'dig']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_18, [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_19, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.drillRadius,
      "onUpdate:value": _cache[3] || (_cache[3] = $event => $setup.drillRadius = $event),
      min: 1,
      class: "sm-global-input-number"
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_20, [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_21, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_input_number, {
      value: $setup.drillHeight,
      "onUpdate:value": _cache[4] || (_cache[4] = $event => $setup.drillHeight = $event),
      min: 1,
      class: "sm-global-input-number"
    }, null, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_22, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.startDrilling
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_23]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearDrilling
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_24]),
      _: 1
    }, 8, ["onClick"])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.operationType === 'drilling']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_25, [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_26, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select, {
      ref: "select",
      value: $setup.drawClipMode,
      "onUpdate:value": _cache[5] || (_cache[5] = $event => $setup.drawClipMode = $event)
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "KeepInside"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_27]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_select_option, {
        value: "KeepOutside"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_28]),
        _: 1
      })]),
      _: 1
    }, 8, ["value"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_29, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.startClip
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_30]),
      _: 1
    }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)(_component_a_button, {
      size: "small",
      onClick: $setup.clearClip
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [geological_bodyvue_type_template_id_c36566bc_scoped_true_hoisted_31]),
      _: 1
    }, 8, ["onClick"])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.operationType === 'clip']])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./globalCom/components/model/geological-body/geological-body.vue?vue&type=template&id=c36566bc&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/model/geological-body/geological-body.js
// 引入依赖

 //简单局部状态管理

 //提示等工具

 //语言资源

 //公共handler.js

 // import models from './models.js'

function geological_body_scanEffect(props) {
  // 设置默认值数据
  let state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
    operationType: 'stretch_cut',
    //操作类型
    stretchHeight: 1,
    //拉伸高度
    modelUrls: null,
    //模型配置
    digHeight: 500,
    drillRadius: 400,
    drillHeight: 2000,
    clipType: 'drawClip',
    drawClipMode: 'KeepInside'
  });
  state.modelUrls = [{
    id: 1,
    model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer1/features/1.stream",
    color: new SuperMap3D.Color(179 / 255, 179 / 255, 179 / 255, 1)
  }, {
    id: 2,
    model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer2/features/1.stream",
    color: new SuperMap3D.Color(94 / 255, 179 / 255, 59 / 255, 1)
  }, {
    id: 3,
    model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer3/features/1.stream",
    color: new SuperMap3D.Color(52 / 255, 94 / 255, 35 / 255, 1)
  }, {
    id: 4,
    model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer4/features/1.stream",
    color: new SuperMap3D.Color(115 / 255, 115 / 255, 115 / 255, 1)
  }, {
    id: 5,
    model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer5/features/1.stream",
    color: new SuperMap3D.Color(171 / 255, 85 / 255, 66 / 255, 1)
  }, {
    id: 6,
    model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer6/features/1.stream",
    color: new SuperMap3D.Color(68 / 255, 68 / 255, 68 / 255, 1)
  }]; // 传入props改变默认值

  if (props) {
    for (let key in props) {
      if (state.hasOwnProperty(key)) {
        if (props[key] != undefined) state[key] = props[key];
      } else {
        tool.Message.errorMsg(lang.AttributeError + key);
      }
    }
  }

  console.log('vue页面重新刷新'); // 初始化数据

  let solidModelsProfile,
      entitie_ids = []; //剖切

  let drillConeCounts = 0,
      drillPoints = []; //钻孔

  let editorBox, geoBox; //裁剪

  if (storeState.isViewer) {
    // if (!window.tooltip) {
    //     window.tooltip = createTooltip(scene._element);
    // }
    init();
  } //viewer 初始化完成的监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => storeState.isViewer, val => {
    if (val) {
      // if (!window.tooltip) {
      //     window.tooltip = createTooltip(scene._element);
      // }
      init();
    }
  });

  function init() {
    scene.logarithmicDepthBuffer = true;
    scene.camera.frustum.near = 0.1;
    scene.globe.show = false;
    scene.skyAtmosphere.show = false;
    solidModelsProfile = new SuperMap3D.SolidModelsProfile(scene);
    solidModelsProfile.addModels(state.modelUrls);
    console.log(solidModelsProfile);
    solidModelsProfile.addedEvent.addEventListener(param => {
      console.log(solidModelsProfile._s3mInstanceCollection.getInstance(state.modelUrls[2].model, 3));
    });
    scene.camera.setView({
      destination: new SuperMap3D.Cartesian3(-2167835.4408299956, 4423497.534529096, 4095839.2845661934),
      orientation: {
        heading: 4.029329438295484,
        pitch: -0.23796647219353817,
        roll: 8.994289757424667e-10
      }
    });
  }

  ; // 拉伸剖切

  function drawLine() {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    } // window.tooltip.showAt(' <p>点击鼠标左键开始绘制</p><p>鼠标右键结束绘制</p><p>可以绘制多条线段</p>', '350px');


    handlerDrawing("Polyline").then(res => {
      addCutLine(res.result.object.positions);
      let handlerPolyline = window.handlerPolyline;
      handlerPolyline.polyline.show = false; // window.polylineTransparent.show = false; //半透线隐藏

      handlerPolyline.deactivate(); // tooltip.setVisible(false);

      let id = 'geologicalbody_cutline-' + new Date().getTime();
      entitie_ids.push(id);
      scene.trackingLayer.add({
        id: id,
        polyline: {
          positions: res.result.object.positions,
          width: 2,
          material: SuperMap3D.Color.fromCssColorString('#51ff00') // clampToGround: true, //线贴地
          // classificationType: SuperMap3D.ClassificationType.S3M_TILE, //线面贴对象

        }
      });
    }, err => {
      console.log(err);
    });
    window.handlerPolyline.activate();
  }

  function addCutLine(positions) {
    let pointArray = [];
    if (positions.length < 2) return;

    for (let i = 0; i < positions.length - 1; i++) {
      pointArray.length = 0;
      pointArray.push(positions[i]);
      pointArray.push(positions[i + 1]);
      solidModelsProfile.addProfileGeometry(pointArray);
    }
  }

  function startCut() {
    // tooltip.setVisible(false);
    clearHandlerDrawing('Polyline');

    if (entitie_ids.length === 0) {
      // window.tooltip.showAt(' <p>请先绘制剖切的线段</p>', '350px');
      return;
    }

    solidModelsProfile.build();
  }

  function clearCut() {
    // tooltip.setVisible(false);
    solidModelsProfile.clearProfile();
    clearHandlerDrawing('Polyline');
    entitie_ids.forEach(id => {
      scene.trackingLayer.removeById(id);
    });
    entitie_ids.length = 0;
  } //开挖


  function addProfileGeometry(positions) {
    let point3ds = new SuperMap3D.Point3Ds();
    let points = tool.CartesiantoDegreesObjs(positions);
    points.forEach(point => {
      let point3d = new SuperMap3D.Point3D(point.longitude, point.latitude, point.height + 1000);
      point3ds.add(point3d);
    });
    let geometry = new SuperMap3D.GeoRegion3D([point3ds]);

    if (state.operationType === 'dig') {
      solidModelsProfile.clippingType = SuperMap3D.ClippingType.KeepOutside;
      geometry.extrudedHeight = -Number(state.digHeight); //封底

      let geometry2 = new SuperMap3D.GeoRegion3D([point3ds]);
      geometry2.isLatLon = false;
      geometry2.bottomAltitude = geometry.extrudedHeight;
      solidModelsProfile.addProfileGeometry(geometry2);
    } else {
      // solidModelsProfile.clippingType = SuperMap3D.ClippingType.KeepOutside;
      geometry.extrudedHeight = -7000;
    }

    geometry.isLatLon = false;
    solidModelsProfile.setClipGeometry(geometry); //封边

    for (let i = 0; i < positions.length; i++) {
      let singleA = [];
      singleA.push(positions[i]);

      if (i == positions.length - 1) {
        singleA.push(positions[0]);
      } else {
        singleA.push(positions[i + 1]);
      }

      solidModelsProfile.addProfileGeometry(singleA);
      solidModelsProfile.build();
    }
  }

  function drawPolygon() {
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", false).then(res => {
      let handlerPolygon = window.handlerPolygon;
      addProfileGeometry(res.result.object.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();
    }, err => {
      console.log(err);
    });
    window.handlerPolygon.activate();
  }

  ;

  function startDig() {
    clearDig();
    drawPolygon();
  }

  function clearDig() {
    // tooltip.setVisible(false);
    solidModelsProfile.clearProfile();
    clearHandlerDrawing();
  } //钻孔


  function startDrilling() {
    clearDrilling();
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur"); // window.tooltip.showAt(' <p>点击鼠标左键确认钻孔位置</p><p>鼠标右键结束绘制并执行钻孔</p>', '350px');

    console.log(1);
    scene.eventManager.addEventListener("CLICK", click_point, true);
    scene.eventManager.addEventListener("RIGHT_CLICK", click_right, true);
  }

  ;

  function click_point(e) {
    let position = scene.pickPosition(e.message.position);
    addDrillCone(position);
    drillPoints.push(position);
  }

  function click_right(e) {
    // window.tooltip.setVisible(false);
    document.body.classList.remove("measureCur");
    let points = tool.CartesiantoDegreesObjs(drillPoints);
    points.forEach(point => {
      let geoCylinder = new SuperMap3D.GeoCylinder(Number(state.drillRadius), Number(state.drillRadius), Number(state.drillHeight));
      let height = Number(state.drillHeight) / 2;
      geoCylinder.geoPosition = new SuperMap3D.Point3D(point.longitude, point.latitude, point.height - height);
      solidModelsProfile.addProfileGeometry(geoCylinder);
    });

    for (let i = 1; i <= drillConeCounts; i++) {
      scene.trackingLayer.removeById('Drill_Point-' + i);
    }

    solidModelsProfile.build();
    scene.eventManager.removeEventListener("CLICK", click_point);
    scene.eventManager.removeEventListener("RIGHT_CLICK", click_right);
  }

  function clearDrilling() {
    // tooltip.setVisible(false);
    solidModelsProfile.clearProfile();
    document.body.classList.remove("measureCur");

    for (let i = 1; i <= drillConeCounts; i++) {
      scene.trackingLayer.removeById('Drill_Point-' + i);
    }

    scene.eventManager.removeEventListener("CLICK", click_point);
    scene.eventManager.removeEventListener("RIGHT_CLICK", click_right);
    drillConeCounts = 0;
    drillPoints.length = 0;
  } // 绘制转空点


  function addDrillCone(position) {
    drillConeCounts++;
    scene.trackingLayer.add({
      id: 'Drill_Point-' + drillConeCounts,
      position: position,
      cylinder: {
        length: 100,
        topRadius: Number(state.drillRadius),
        bottomRadius: Number(state.drillRadius),
        material: SuperMap3D.Color.fromCssColorString("#d60000")
      }
    });
  } //裁剪


  function startClip() {
    clearClip();
    solidModelsProfile.clippingType = SuperMap3D.ClippingType[state.drawClipMode];

    if (state.clipType === 'drawClip') {
      drawPolygon();
      return;
    }

    BoxClipByEitor();
  }

  function clearClip() {
    clearDig();
    clearHandlerDrawing('Box');

    if (editorBox) {
      editorBox.deactivate();
      editorBox.destroy();
      editorBox = null;
    }
  } //box裁剪


  function BoxClipByEitor() {
    if (editorBox) {
      editorBox.deactivate();
    }

    tooltip.showAt(' <p>点击鼠标左键开始绘制box底面</p><p>然后移动鼠标绘制box高度</p><p>点击鼠标右键结束绘制</p>', '350px');

    if (!window.handlerBox) {
      initHandler("Box");
    }

    handlerDrawing("Box", false).then(res => {
      let handlerBox = window.handlerBox;
      updateClipBox(res.result.object);
      handlerBox.deactivate();
    }, err => {
      console.log(err);
    });
    window.handlerBox.activate();
  }

  ;

  function updateClipBox(object) {
    object.show = false; //绘制的盒子裁剪模型

    let newDim = object.box.dimensions.getValue();
    let position = SuperMap3D.Cartographic.fromCartesian(object.position.getValue(0));
    geoBox = new SuperMap3D.GeoBox(newDim.x, newDim.y, newDim.z);
    geoBox.geoPosition = new SuperMap3D.Point3D(SuperMap3D.Math.toDegrees(position.longitude), SuperMap3D.Math.toDegrees(position.latitude), position.height);
    solidModelsProfile.addProfileGeometry(geoBox);
    solidModelsProfile.build(); // 编辑盒子

    if (!editorBox) {
      editorBox = new SuperMap3D.BoxEditor(scene, object);
      editorBox.color = SuperMap3D.Color.WHITE.withAlpha(0.0); //设置盒子透明

      editorBox.hoverColor = SuperMap3D.Color.BLUE; //设置编辑轴的选中色

      let editBoxEvt = function (e) {
        let newDim = e.dimensions;
        geoBox.geoWidth = newDim.y;
        geoBox.geoHeight = newDim.z;
        geoBox.geoLength = newDim.x;
        let position = tool.CartesiantoDegrees(e.position);
        geoBox.geoPosition = new SuperMap3D.Point3D(position[0], position[1], position[2]);
        geoBox.geoRotationZ = editorBox.hpr.heading * (180 / SuperMap3D.Math.PI);
      };

      editorBox.editEvt.addEventListener(editBoxEvt);
    } else {
      editorBox.setEditObject(object); //
    }

    editorBox.activate();
  } //叠加体元


  function clearAll() {
    clearCut();
    clearClip();
    clearDrilling();
  } // 监听


  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.modelUrls, val => {
    solidModelsProfile.addModels(val);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.stretchHeight, val => {
    if (!state.modelUrls || state.modelUrls.length == 0) return;

    for (let model of state.modelUrls) {
      let url = model.model;
      let instance = solidModelsProfile._s3mInstanceCollection._group[url].instances._array[0];
      instance.updateScale(new SuperMap3D.Cartesian3(1, 1, Number(val)));
    }
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.operationType, val => {
    clearAll();
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.drawClipMode, val => {
    solidModelsProfile.clippingType = SuperMap3D.ClippingType[val];
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => state.clipType, val => {
    clearClip();
  }); // 销毁

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    solidModelsProfile.clear();
    scene.globe.show = true;
    scene.skyAtmosphere.show = true;
    clearAll();
    scene = null;
    solidModelsProfile = null;
    geoBox = null;
  });
  return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
    drawLine,
    startCut,
    clearCut,
    startDig,
    clearDig,
    startDrilling,
    clearDrilling,
    startClip,
    clearClip
  };
}

;
/* harmony default export */ var geological_body = (geological_body_scanEffect);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/model/geological-body/geological-body.vue?vue&type=script&lang=js


/* harmony default export */ var geological_bodyvue_type_script_lang_js = ({
  name: "Sm3dGeologicalBody",
  components: {
    Panel: panel
  },

  setup(props) {
    let {
      operationType,
      stretchHeight,
      drawLine,
      startCut,
      clearCut,
      digHeight,
      startDig,
      clearDig,
      startDrilling,
      clearDrilling,
      drillHeight,
      drillRadius,
      startClip,
      clearClip,
      clipType,
      drawClipMode
    } = geological_body(props);
    return {
      operationType,
      stretchHeight,
      drawLine,
      startCut,
      clearCut,
      digHeight,
      startDig,
      clearDig,
      startDrilling,
      clearDrilling,
      drillHeight,
      drillRadius,
      startClip,
      clearClip,
      clipType,
      drawClipMode
    };
  }

});
;// CONCATENATED MODULE: ./globalCom/components/model/geological-body/geological-body.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./globalCom/components/model/geological-body/geological-body.vue?vue&type=style&index=0&id=c36566bc&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./globalCom/components/model/geological-body/geological-body.vue?vue&type=style&index=0&id=c36566bc&lang=scss&scoped=true

;// CONCATENATED MODULE: ./globalCom/components/model/geological-body/geological-body.vue




;


const geological_body_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(geological_bodyvue_type_script_lang_js, [['render',geological_bodyvue_type_template_id_c36566bc_scoped_true_render],['__scopeId',"data-v-c36566bc"]])

/* harmony default export */ var geological_body_geological_body = (geological_body_exports_);
;// CONCATENATED MODULE: ./globalCom/components/model/geological-body/index.js


geological_body_geological_body.install = function (app) {
  app.component(geological_body_geological_body.name, geological_body_geological_body);
};

/* harmony default export */ var model_geological_body = (geological_body_geological_body);
;// CONCATENATED MODULE: ./globalCom/index.js
// 引入iconfont
 // 引入全局样式

 // 引入拖拽

 // 通用组件

 // 引入

 // 导入组件

 // 球
// // 三维工具

 //量算

 // 通视分析

 // 通视分析
// import skyLine from './components/analysis_3d/sky-line/index.js' // 天际线

 // 剖面

 // 三维空间查询

 // 可视域分析
// 地形分析

 // 地形开挖

 // 等值线

 // 坡度坡向分析

 // 淹没分析
// 裁剪

 // box裁剪

 // cross裁剪

 // 平面裁剪

 // 多裁剪
// 图层

 // S3M图层属性设置

 // S3M图层风格设置

 // S3M图层操作


 // 

 // 倾斜摄影模型操作

 // 倾斜摄影模型操作
// 场景

 // 分屏

 // 卷帘
// 绘制

 // 绘制线面
// import addPointSymbol from './components/draw/add-point-symbol/index' // 添加小品
// 特效

 // 扫描
// 模型

 // 模型 地质体
// 以数组的结构保存组件，便于遍历

const components = [common_panel, components_viewer, analysis_3d_measure, analysis_3d_openness, analysis_3d_sight_line, // skyLine,
analysis_3d_profile, analysis_3d_spatial_query3d, analysis_3d_viewshed, terrain_analysis_terrain_operation, terrain_analysis_terrain_isoline, terrain_analysis_terrain_slope, terrain_analysis_terrain_flood, clip_clip_box, clip_clip_cross, clip_clip_plane, clip_clip_polygon, layer_s3mlayer_attribute, layer_s3mlayer_style, layer_s3mlayer_operation, layer_layer_manage, layer_imglayer_attribute, layer_oblique_photography, layer_pbr_material, scene_split_screen, scene_roller, draw_draw_line_surface, // addPointSymbol,
special_effects_scan_effect, model_geological_body]; // 定义 install 方法

const install = function (app) {
  drag(app); //默认可拖拽

  console.log('组件中的app', app);
  if (install.installed) return;
  install.installed = true; // 遍历并注册全局组件

  components.map(component => {
    app.component(component.name, component);
  });
}; // 判断是否是直接引入文件


if (typeof window !== 'undefined' && window.Vue) {
  // install(window.Vue)
  window.webgl3d = install;
  console.log('打包之前的window.webgl3d', window.webgl3d);
}

window.store = store;
/* harmony default export */ var globalCom = ({
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  ...components
});
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (globalCom);


}();
module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=webgl3d.common.js.map