/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _translator = __webpack_require__(308);
	
	var _translator2 = _interopRequireDefault(_translator);
	
	var _appId = __webpack_require__(420);
	
	var _appId2 = _interopRequireDefault(_appId);
	
	var _tools = __webpack_require__(306);
	
	var _jquery = __webpack_require__(422);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.$ = _jquery2.default;
	_appId2.default.setAppId();
	(0, _tools.asyncChain)().pipe(function checkOauthLogin(done) {
		_appId2.default.oauthLogin(done);
	}).pipe(function translate(done) {
		var translator = new _translator2.default();
		(0, _jquery2.default)('[data-i18n-text]').each(function () {
			(0, _jquery2.default)(this).text(translator.translateText((0, _jquery2.default)(this).attr('data-i18n-text')));
		});
		(0, _jquery2.default)('.spinning').hide();
	}).exec();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	__webpack_require__(2);
	
	__webpack_require__(293);
	
	__webpack_require__(295);
	
	/* eslint max-len: 0 */
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	
	// Should be removed in the next major release:
	
	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}
	
	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);
	
	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(57);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(70);
	__webpack_require__(72);
	__webpack_require__(74);
	__webpack_require__(76);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(85);
	__webpack_require__(87);
	__webpack_require__(89);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(97);
	__webpack_require__(98);
	__webpack_require__(99);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	__webpack_require__(103);
	__webpack_require__(105);
	__webpack_require__(106);
	__webpack_require__(107);
	__webpack_require__(109);
	__webpack_require__(110);
	__webpack_require__(111);
	__webpack_require__(113);
	__webpack_require__(114);
	__webpack_require__(115);
	__webpack_require__(116);
	__webpack_require__(117);
	__webpack_require__(118);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(121);
	__webpack_require__(122);
	__webpack_require__(123);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(126);
	__webpack_require__(131);
	__webpack_require__(132);
	__webpack_require__(136);
	__webpack_require__(137);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(141);
	__webpack_require__(142);
	__webpack_require__(143);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(148);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(166);
	__webpack_require__(167);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(187);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(193);
	__webpack_require__(195);
	__webpack_require__(197);
	__webpack_require__(198);
	__webpack_require__(199);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(211);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(232);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(246);
	__webpack_require__(247);
	__webpack_require__(248);
	__webpack_require__(249);
	__webpack_require__(251);
	__webpack_require__(252);
	__webpack_require__(253);
	__webpack_require__(254);
	__webpack_require__(255);
	__webpack_require__(256);
	__webpack_require__(257);
	__webpack_require__(258);
	__webpack_require__(260);
	__webpack_require__(261);
	__webpack_require__(263);
	__webpack_require__(264);
	__webpack_require__(265);
	__webpack_require__(266);
	__webpack_require__(269);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(272);
	__webpack_require__(273);
	__webpack_require__(274);
	__webpack_require__(275);
	__webpack_require__(276);
	__webpack_require__(278);
	__webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(281);
	__webpack_require__(282);
	__webpack_require__(283);
	__webpack_require__(284);
	__webpack_require__(285);
	__webpack_require__(286);
	__webpack_require__(287);
	__webpack_require__(288);
	__webpack_require__(291);
	__webpack_require__(292);
	module.exports = __webpack_require__(9);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(4)
	  , has            = __webpack_require__(5)
	  , DESCRIPTORS    = __webpack_require__(6)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(18)
	  , META           = __webpack_require__(22).KEY
	  , $fails         = __webpack_require__(7)
	  , shared         = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(24)
	  , uid            = __webpack_require__(19)
	  , wks            = __webpack_require__(25)
	  , wksExt         = __webpack_require__(26)
	  , wksDefine      = __webpack_require__(27)
	  , keyOf          = __webpack_require__(29)
	  , enumKeys       = __webpack_require__(42)
	  , isArray        = __webpack_require__(45)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(16)
	  , createDesc     = __webpack_require__(17)
	  , _create        = __webpack_require__(46)
	  , gOPNExt        = __webpack_require__(49)
	  , $GOPD          = __webpack_require__(51)
	  , $DP            = __webpack_require__(11)
	  , $keys          = __webpack_require__(30)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(44).f  = $propertyIsEnumerable;
	  __webpack_require__(43).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(28)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 4 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(7)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(9)
	  , hide      = __webpack_require__(10)
	  , redefine  = __webpack_require__(18)
	  , ctx       = __webpack_require__(20)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(6) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , toPrimitive    = __webpack_require__(16)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(6) && !__webpack_require__(7)(function(){
	  return Object.defineProperty(__webpack_require__(15)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , hide      = __webpack_require__(10)
	  , has       = __webpack_require__(5)
	  , SRC       = __webpack_require__(19)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(9).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(19)('meta')
	  , isObject = __webpack_require__(13)
	  , has      = __webpack_require__(5)
	  , setDesc  = __webpack_require__(11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(7)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(5)
	  , TAG = __webpack_require__(25)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(23)('wks')
	  , uid        = __webpack_require__(19)
	  , Symbol     = __webpack_require__(4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(25);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(4)
	  , core           = __webpack_require__(9)
	  , LIBRARY        = __webpack_require__(28)
	  , wksExt         = __webpack_require__(26)
	  , defineProperty = __webpack_require__(11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(30)
	  , toIObject = __webpack_require__(32);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(31)
	  , enumBugKeys = __webpack_require__(41);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(5)
	  , toIObject    = __webpack_require__(32)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(39);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(23)('keys')
	  , uid    = __webpack_require__(19);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(30)
	  , gOPS    = __webpack_require__(43)
	  , pIE     = __webpack_require__(44);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 44 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(34);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(47)
	  , enumBugKeys = __webpack_require__(41)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(15)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(48).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(30);
	
	module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(32)
	  , gOPN      = __webpack_require__(50).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(31)
	  , hiddenKeys = __webpack_require__(41).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(44)
	  , createDesc     = __webpack_require__(17)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(16)
	  , has            = __webpack_require__(5)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(46)});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperties: __webpack_require__(47)});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(32)
	  , $getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	__webpack_require__(56)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(9)
	  , fails   = __webpack_require__(7);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(58)
	  , $getPrototypeOf = __webpack_require__(59);
	
	__webpack_require__(56)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(5)
	  , toObject    = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(58)
	  , $keys    = __webpack_require__(30);
	
	__webpack_require__(56)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(56)('getOwnPropertyNames', function(){
	  return __webpack_require__(49).f;
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(22).onFreeze;
	
	__webpack_require__(56)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(22).onFreeze;
	
	__webpack_require__(56)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(22).onFreeze;
	
	__webpack_require__(56)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(13);
	
	__webpack_require__(56)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(13);
	
	__webpack_require__(56)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(13);
	
	__webpack_require__(56)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(8);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(69)});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(30)
	  , gOPS     = __webpack_require__(43)
	  , pIE      = __webpack_require__(44)
	  , toObject = __webpack_require__(58)
	  , IObject  = __webpack_require__(33)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(7)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', {is: __webpack_require__(71)});

/***/ },
/* 71 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(73).set});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(13)
	  , anObject = __webpack_require__(12);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(20)(Function.call, __webpack_require__(51).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(75)
	  , test    = {};
	test[__webpack_require__(25)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(18)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34)
	  , TAG = __webpack_require__(25)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(8);
	
	$export($export.P, 'Function', {bind: __webpack_require__(77)});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(21)
	  , isObject   = __webpack_require__(13)
	  , invoke     = __webpack_require__(78)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11).f
	  , createDesc = __webpack_require__(17)
	  , has        = __webpack_require__(5)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    try {
	      var that = this
	        , name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch(e){
	      return '';
	    }
	  }
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObject       = __webpack_require__(13)
	  , getPrototypeOf = __webpack_require__(59)
	  , HAS_INSTANCE   = __webpack_require__(25)('hasInstance')
	  , FunctionProto  = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(11).f(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(8)
	  , $parseInt = __webpack_require__(82);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var $parseInt = __webpack_require__(4).parseInt
	  , $trim     = __webpack_require__(83).trim
	  , ws        = __webpack_require__(84)
	  , hex       = /^[\-+]?0[xX]/;
	
	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	  , defined = __webpack_require__(35)
	  , fails   = __webpack_require__(7)
	  , spaces  = __webpack_require__(84)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');
	
	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(8)
	  , $parseFloat = __webpack_require__(86);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var $parseFloat = __webpack_require__(4).parseFloat
	  , $trim       = __webpack_require__(83).trim;
	
	module.exports = 1 / $parseFloat(__webpack_require__(84) + '-0') !== -Infinity ? function parseFloat(str){
	  var string = $trim(String(str), 3)
	    , result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(4)
	  , has               = __webpack_require__(5)
	  , cof               = __webpack_require__(34)
	  , inheritIfRequired = __webpack_require__(88)
	  , toPrimitive       = __webpack_require__(16)
	  , fails             = __webpack_require__(7)
	  , gOPN              = __webpack_require__(50).f
	  , gOPD              = __webpack_require__(51).f
	  , dP                = __webpack_require__(11).f
	  , $trim             = __webpack_require__(83).trim
	  , NUMBER            = 'Number'
	  , $Number           = global[NUMBER]
	  , Base              = $Number
	  , proto             = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF        = cof(__webpack_require__(46)(proto)) == NUMBER
	  , TRIM              = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	
	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for(var keys = __webpack_require__(6) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++){
	    if(has(Base, key = keys[j]) && !has($Number, key)){
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(18)(global, NUMBER, $Number);
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(13)
	  , setPrototypeOf = __webpack_require__(73).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(8)
	  , toInteger    = __webpack_require__(38)
	  , aNumberValue = __webpack_require__(90)
	  , repeat       = __webpack_require__(91)
	  , $toFixed     = 1..toFixed
	  , floor        = Math.floor
	  , data         = [0, 0, 0, 0, 0, 0]
	  , ERROR        = 'Number.toFixed: incorrect invocation!'
	  , ZERO         = '0';
	
	var multiply = function(n, c){
	  var i  = -1
	    , c2 = c;
	  while(++i < 6){
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function(n){
	  var i = 6
	    , c = 0;
	  while(--i >= 0){
	    c += data[i];
	    data[i] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function(){
	  var i = 6
	    , s = '';
	  while(--i >= 0){
	    if(s !== '' || i === 0 || data[i] !== 0){
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function(x, n, acc){
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function(x){
	  var n  = 0
	    , x2 = x;
	  while(x2 >= 4096){
	    n += 12;
	    x2 /= 4096;
	  }
	  while(x2 >= 2){
	    n  += 1;
	    x2 /= 2;
	  } return n;
	};
	
	$export($export.P + $export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128..toFixed(0) !== '1000000000000000128'
	) || !__webpack_require__(7)(function(){
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits){
	    var x = aNumberValue(this, ERROR)
	      , f = toInteger(fractionDigits)
	      , s = ''
	      , m = ZERO
	      , e, z, j, k;
	    if(f < 0 || f > 20)throw RangeError(ERROR);
	    if(x != x)return 'NaN';
	    if(x <= -1e21 || x >= 1e21)return String(x);
	    if(x < 0){
	      s = '-';
	      x = -x;
	    }
	    if(x > 1e-21){
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if(e > 0){
	        multiply(0, z);
	        j = f;
	        while(j >= 7){
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while(j >= 23){
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if(f > 0){
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var cof = __webpack_require__(34);
	module.exports = function(it, msg){
	  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(35);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(8)
	  , $fails       = __webpack_require__(7)
	  , aNumberValue = __webpack_require__(90)
	  , $toPrecision = 1..toPrecision;
	
	$export($export.P + $export.F * ($fails(function(){
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function(){
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision){
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
	  }
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(8)
	  , _isFinite = __webpack_require__(4).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(96)});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(13)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(8)
	  , isInteger = __webpack_require__(96)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(8)
	  , $parseFloat = __webpack_require__(86);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(8)
	  , $parseInt = __webpack_require__(82);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(8)
	  , log1p   = __webpack_require__(104)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	$export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 104 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(8)
	  , $asinh  = Math.asinh;
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(8)
	  , $atanh  = Math.atanh;
	
	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(8)
	  , sign    = __webpack_require__(108);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 108 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(8)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(8)
	  , $expm1  = __webpack_require__(112);
	
	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ },
/* 112 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(8)
	  , sign      = __webpack_require__(108)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(8)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , aLen = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < aLen){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(8)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(104)});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {sign: __webpack_require__(108)});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(8)
	  , expm1   = __webpack_require__(112)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(8)
	  , expm1   = __webpack_require__(112)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(8)
	  , toIndex        = __webpack_require__(39)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res  = []
	      , aLen = arguments.length
	      , i    = 0
	      , code;
	    while(aLen > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(8)
	  , toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl  = toIObject(callSite.raw)
	      , len  = toLength(tpl.length)
	      , aLen = arguments.length
	      , res  = []
	      , i    = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < aLen)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(83)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(127)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(128)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(35);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(28)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(18)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(5)
	  , Iterators      = __webpack_require__(129)
	  , $iterCreate    = __webpack_require__(130)
	  , setToStringTag = __webpack_require__(24)
	  , getPrototypeOf = __webpack_require__(59)
	  , ITERATOR       = __webpack_require__(25)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(46)
	  , descriptor     = __webpack_require__(17)
	  , setToStringTag = __webpack_require__(24)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(25)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $at     = __webpack_require__(127)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(8)
	  , toLength  = __webpack_require__(37)
	  , context   = __webpack_require__(133)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(135)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments.length > 1 ? arguments[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(134)
	  , defined  = __webpack_require__(35);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(13)
	  , cof      = __webpack_require__(34)
	  , MATCH    = __webpack_require__(25)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(25)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(8)
	  , context  = __webpack_require__(133)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(135)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(91)
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(8)
	  , toLength    = __webpack_require__(37)
	  , context     = __webpack_require__(133)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(135)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)
	__webpack_require__(140)('anchor', function(createHTML){
	  return function anchor(name){
	    return createHTML(this, 'a', 'name', name);
	  }
	});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	  , fails   = __webpack_require__(7)
	  , defined = __webpack_require__(35)
	  , quot    = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function(string, tag, attribute, value) {
	  var S  = String(defined(string))
	    , p1 = '<' + tag;
	  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function(NAME, exec){
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function(){
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()
	__webpack_require__(140)('big', function(createHTML){
	  return function big(){
	    return createHTML(this, 'big', '', '');
	  }
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()
	__webpack_require__(140)('blink', function(createHTML){
	  return function blink(){
	    return createHTML(this, 'blink', '', '');
	  }
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()
	__webpack_require__(140)('bold', function(createHTML){
	  return function bold(){
	    return createHTML(this, 'b', '', '');
	  }
	});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()
	__webpack_require__(140)('fixed', function(createHTML){
	  return function fixed(){
	    return createHTML(this, 'tt', '', '');
	  }
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)
	__webpack_require__(140)('fontcolor', function(createHTML){
	  return function fontcolor(color){
	    return createHTML(this, 'font', 'color', color);
	  }
	});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)
	__webpack_require__(140)('fontsize', function(createHTML){
	  return function fontsize(size){
	    return createHTML(this, 'font', 'size', size);
	  }
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()
	__webpack_require__(140)('italics', function(createHTML){
	  return function italics(){
	    return createHTML(this, 'i', '', '');
	  }
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)
	__webpack_require__(140)('link', function(createHTML){
	  return function link(url){
	    return createHTML(this, 'a', 'href', url);
	  }
	});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()
	__webpack_require__(140)('small', function(createHTML){
	  return function small(){
	    return createHTML(this, 'small', '', '');
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()
	__webpack_require__(140)('strike', function(createHTML){
	  return function strike(){
	    return createHTML(this, 'strike', '', '');
	  }
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()
	__webpack_require__(140)('sub', function(createHTML){
	  return function sub(){
	    return createHTML(this, 'sub', '', '');
	  }
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()
	__webpack_require__(140)('sup', function(createHTML){
	  return function sup(){
	    return createHTML(this, 'sup', '', '');
	  }
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export     = __webpack_require__(8)
	  , toObject    = __webpack_require__(58)
	  , toPrimitive = __webpack_require__(16);
	
	$export($export.P + $export.F * __webpack_require__(7)(function(){
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key){
	    var O  = toObject(this)
	      , pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = __webpack_require__(8)
	  , fails   = __webpack_require__(7)
	  , getTime = Date.prototype.getTime;
	
	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};
	
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var DateProto    = Date.prototype
	  , INVALID_DATE = 'Invalid Date'
	  , TO_STRING    = 'toString'
	  , $toString    = DateProto[TO_STRING]
	  , getTime      = DateProto.getTime;
	if(new Date(NaN) + '' != INVALID_DATE){
	  __webpack_require__(18)(DateProto, TO_STRING, function toString(){
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var TO_PRIMITIVE = __webpack_require__(25)('toPrimitive')
	  , proto        = Date.prototype;
	
	if(!(TO_PRIMITIVE in proto))__webpack_require__(10)(proto, TO_PRIMITIVE, __webpack_require__(158));

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var anObject    = __webpack_require__(12)
	  , toPrimitive = __webpack_require__(16)
	  , NUMBER      = 'number';
	
	module.exports = function(hint){
	  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Array', {isArray: __webpack_require__(45)});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(20)
	  , $export        = __webpack_require__(8)
	  , toObject       = __webpack_require__(58)
	  , call           = __webpack_require__(161)
	  , isArrayIter    = __webpack_require__(162)
	  , toLength       = __webpack_require__(37)
	  , createProperty = __webpack_require__(163)
	  , getIterFn      = __webpack_require__(164);
	
	$export($export.S + $export.F * !__webpack_require__(165)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(12);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(129)
	  , ITERATOR   = __webpack_require__(25)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(11)
	  , createDesc      = __webpack_require__(17);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(75)
	  , ITERATOR  = __webpack_require__(25)('iterator')
	  , Iterators = __webpack_require__(129);
	module.exports = __webpack_require__(9).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(25)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export        = __webpack_require__(8)
	  , createProperty = __webpack_require__(163);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)
	var $export   = __webpack_require__(8)
	  , toIObject = __webpack_require__(32)
	  , arrayJoin = [].join;
	
	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(33) != Object || !__webpack_require__(168)(arrayJoin)), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(7);
	
	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export    = __webpack_require__(8)
	  , html       = __webpack_require__(48)
	  , cof        = __webpack_require__(34)
	  , toIndex    = __webpack_require__(39)
	  , toLength   = __webpack_require__(37)
	  , arraySlice = [].slice;
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(7)(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(8)
	  , aFunction = __webpack_require__(21)
	  , toObject  = __webpack_require__(58)
	  , fails     = __webpack_require__(7)
	  , $sort     = [].sort
	  , test      = [1, 2, 3];
	
	$export($export.P + $export.F * (fails(function(){
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function(){
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(168)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn){
	    return comparefn === undefined
	      ? $sort.call(toObject(this))
	      : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export  = __webpack_require__(8)
	  , $forEach = __webpack_require__(172)(0)
	  , STRICT   = __webpack_require__(168)([].forEach, true);
	
	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */){
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(20)
	  , IObject  = __webpack_require__(33)
	  , toObject = __webpack_require__(58)
	  , toLength = __webpack_require__(37)
	  , asc      = __webpack_require__(173);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(174);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , isArray  = __webpack_require__(45)
	  , SPECIES  = __webpack_require__(25)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $map    = __webpack_require__(172)(1);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */){
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $filter = __webpack_require__(172)(2);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */){
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $some   = __webpack_require__(172)(3);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $every  = __webpack_require__(172)(4);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */){
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $reduce = __webpack_require__(180);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__(21)
	  , toObject  = __webpack_require__(58)
	  , IObject   = __webpack_require__(33)
	  , toLength  = __webpack_require__(37);
	
	module.exports = function(that, callbackfn, aLen, memo, isRight){
	  aFunction(callbackfn);
	  var O      = toObject(that)
	    , self   = IObject(O)
	    , length = toLength(O.length)
	    , index  = isRight ? length - 1 : 0
	    , i      = isRight ? -1 : 1;
	  if(aLen < 2)for(;;){
	    if(index in self){
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if(isRight ? index < 0 : length <= index){
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $reduce = __webpack_require__(180);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(8)
	  , $indexOf      = __webpack_require__(36)(false)
	  , $native       = [].indexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(168)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(8)
	  , toIObject     = __webpack_require__(32)
	  , toInteger     = __webpack_require__(38)
	  , toLength      = __webpack_require__(37)
	  , $native       = [].lastIndexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(168)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
	    // convert -0 to +0
	    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
	    if(index < 0)index = length + index;
	    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
	    return -1;
	  }
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(8);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(185)});
	
	__webpack_require__(186)('copyWithin');

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(58)
	  , toIndex  = __webpack_require__(39)
	  , toLength = __webpack_require__(37);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(25)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(10)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(8);
	
	$export($export.P, 'Array', {fill: __webpack_require__(188)});
	
	__webpack_require__(186)('fill');

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(58)
	  , toIndex  = __webpack_require__(39)
	  , toLength = __webpack_require__(37);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(8)
	  , $find   = __webpack_require__(172)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(186)(KEY);

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(8)
	  , $find   = __webpack_require__(172)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(186)(KEY);

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(192)('Array');

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(4)
	  , dP          = __webpack_require__(11)
	  , DESCRIPTORS = __webpack_require__(6)
	  , SPECIES     = __webpack_require__(25)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(186)
	  , step             = __webpack_require__(194)
	  , Iterators        = __webpack_require__(129)
	  , toIObject        = __webpack_require__(32);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(128)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 194 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var global            = __webpack_require__(4)
	  , inheritIfRequired = __webpack_require__(88)
	  , dP                = __webpack_require__(11).f
	  , gOPN              = __webpack_require__(50).f
	  , isRegExp          = __webpack_require__(134)
	  , $flags            = __webpack_require__(196)
	  , $RegExp           = global.RegExp
	  , Base              = $RegExp
	  , proto             = $RegExp.prototype
	  , re1               = /a/g
	  , re2               = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW       = new $RegExp(re1) !== re1;
	
	if(__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(7)(function(){
	  re2[__webpack_require__(25)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var tiRE = this instanceof $RegExp
	      , piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function(key){
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  };
	  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(18)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(192)('RegExp');

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(12);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(198);
	var anObject    = __webpack_require__(12)
	  , $flags      = __webpack_require__(196)
	  , DESCRIPTORS = __webpack_require__(6)
	  , TO_STRING   = 'toString'
	  , $toString   = /./[TO_STRING];
	
	var define = function(fn){
	  __webpack_require__(18)(RegExp.prototype, TO_STRING, fn, true);
	};
	
	// 21.2.5.14 RegExp.prototype.toString()
	if(__webpack_require__(7)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
	  define(function toString(){
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if($toString.name != TO_STRING){
	  define(function toString(){
	    return $toString.call(this);
	  });
	}

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	if(__webpack_require__(6) && /./g.flags != 'g')__webpack_require__(11).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(196)
	});

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(200)('match', 1, function(defined, MATCH, $match){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(10)
	  , redefine = __webpack_require__(18)
	  , fails    = __webpack_require__(7)
	  , defined  = __webpack_require__(35)
	  , wks      = __webpack_require__(25);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , fns      = exec(defined, SYMBOL, ''[KEY])
	    , strfn    = fns[0]
	    , rxfn     = fns[1];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return rxfn.call(string, this); }
	    );
	  }
	};

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(200)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(200)('search', 1, function(defined, SEARCH, $search){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(200)('split', 2, function(defined, SPLIT, $split){
	  'use strict';
	  var isRegExp   = __webpack_require__(134)
	    , _split     = $split
	    , $push      = [].push
	    , $SPLIT     = 'split'
	    , LENGTH     = 'length'
	    , LAST_INDEX = 'lastIndex';
	  if(
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ){
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function(separator, limit){
	      var string = String(this);
	      if(separator === undefined && limit === 0)return [];
	      // If `separator` is not a regex, use native split
	      if(!isRegExp(separator))return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while(match = separatorCopy.exec(string)){
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if(lastIndex > lastLastIndex){
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
	            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
	          });
	          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if(output[LENGTH] >= splitLimit)break;
	        }
	        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if(lastLastIndex === string[LENGTH]){
	        if(lastLength || !separatorCopy.test(''))output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
	    $split = function(separator, limit){
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit){
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(28)
	  , global             = __webpack_require__(4)
	  , ctx                = __webpack_require__(20)
	  , classof            = __webpack_require__(75)
	  , $export            = __webpack_require__(8)
	  , isObject           = __webpack_require__(13)
	  , aFunction          = __webpack_require__(21)
	  , anInstance         = __webpack_require__(205)
	  , forOf              = __webpack_require__(206)
	  , speciesConstructor = __webpack_require__(207)
	  , task               = __webpack_require__(208).set
	  , microtask          = __webpack_require__(209)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(25)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(210)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(24)($Promise, PROMISE);
	__webpack_require__(192)(PROMISE);
	Wrapper = __webpack_require__(9)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(165)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 205 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(20)
	  , call        = __webpack_require__(161)
	  , isArrayIter = __webpack_require__(162)
	  , anObject    = __webpack_require__(12)
	  , toLength    = __webpack_require__(37)
	  , getIterFn   = __webpack_require__(164)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(12)
	  , aFunction = __webpack_require__(21)
	  , SPECIES   = __webpack_require__(25)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(20)
	  , invoke             = __webpack_require__(78)
	  , html               = __webpack_require__(48)
	  , cel                = __webpack_require__(15)
	  , global             = __webpack_require__(4)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(34)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , macrotask = __webpack_require__(208).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(34)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(18);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(212);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(213)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(11).f
	  , create      = __webpack_require__(46)
	  , redefineAll = __webpack_require__(210)
	  , ctx         = __webpack_require__(20)
	  , anInstance  = __webpack_require__(205)
	  , defined     = __webpack_require__(35)
	  , forOf       = __webpack_require__(206)
	  , $iterDefine = __webpack_require__(128)
	  , step        = __webpack_require__(194)
	  , setSpecies  = __webpack_require__(192)
	  , DESCRIPTORS = __webpack_require__(6)
	  , fastKey     = __webpack_require__(22).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(4)
	  , $export           = __webpack_require__(8)
	  , redefine          = __webpack_require__(18)
	  , redefineAll       = __webpack_require__(210)
	  , meta              = __webpack_require__(22)
	  , forOf             = __webpack_require__(206)
	  , anInstance        = __webpack_require__(205)
	  , isObject          = __webpack_require__(13)
	  , fails             = __webpack_require__(7)
	  , $iterDetect       = __webpack_require__(165)
	  , setToStringTag    = __webpack_require__(24)
	  , inheritIfRequired = __webpack_require__(88);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(212);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(213)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(172)(0)
	  , redefine     = __webpack_require__(18)
	  , meta         = __webpack_require__(22)
	  , assign       = __webpack_require__(69)
	  , weak         = __webpack_require__(216)
	  , isObject     = __webpack_require__(13)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;
	
	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(213)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(210)
	  , getWeak           = __webpack_require__(22).getWeak
	  , anObject          = __webpack_require__(12)
	  , isObject          = __webpack_require__(13)
	  , anInstance        = __webpack_require__(205)
	  , forOf             = __webpack_require__(206)
	  , createArrayMethod = __webpack_require__(172)
	  , $has              = __webpack_require__(5)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(216);
	
	// 23.4 WeakSet Objects
	__webpack_require__(213)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(8)
	  , $typed       = __webpack_require__(219)
	  , buffer       = __webpack_require__(220)
	  , anObject     = __webpack_require__(12)
	  , toIndex      = __webpack_require__(39)
	  , toLength     = __webpack_require__(37)
	  , isObject     = __webpack_require__(13)
	  , ArrayBuffer  = __webpack_require__(4).ArrayBuffer
	  , speciesConstructor = __webpack_require__(207)
	  , $ArrayBuffer = buffer.ArrayBuffer
	  , $DataView    = buffer.DataView
	  , $isView      = $typed.ABV && ArrayBuffer.isView
	  , $slice       = $ArrayBuffer.prototype.slice
	  , VIEW         = $typed.VIEW
	  , ARRAY_BUFFER = 'ArrayBuffer';
	
	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});
	
	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it){
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});
	
	$export($export.P + $export.U + $export.F * __webpack_require__(7)(function(){
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end){
	    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
	    var len    = anObject(this).byteLength
	      , first  = toIndex(start, len)
	      , final  = toIndex(end === undefined ? len : end, len)
	      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
	      , viewS  = new $DataView(this)
	      , viewT  = new $DataView(result)
	      , index  = 0;
	    while(first < final){
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});
	
	__webpack_require__(192)(ARRAY_BUFFER);

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , hide   = __webpack_require__(10)
	  , uid    = __webpack_require__(19)
	  , TYPED  = uid('typed_array')
	  , VIEW   = uid('view')
	  , ABV    = !!(global.ArrayBuffer && global.DataView)
	  , CONSTR = ABV
	  , i = 0, l = 9, Typed;
	
	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');
	
	while(i < l){
	  if(Typed = global[TypedArrayConstructors[i++]]){
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}
	
	module.exports = {
	  ABV:    ABV,
	  CONSTR: CONSTR,
	  TYPED:  TYPED,
	  VIEW:   VIEW
	};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(4)
	  , DESCRIPTORS    = __webpack_require__(6)
	  , LIBRARY        = __webpack_require__(28)
	  , $typed         = __webpack_require__(219)
	  , hide           = __webpack_require__(10)
	  , redefineAll    = __webpack_require__(210)
	  , fails          = __webpack_require__(7)
	  , anInstance     = __webpack_require__(205)
	  , toInteger      = __webpack_require__(38)
	  , toLength       = __webpack_require__(37)
	  , gOPN           = __webpack_require__(50).f
	  , dP             = __webpack_require__(11).f
	  , arrayFill      = __webpack_require__(188)
	  , setToStringTag = __webpack_require__(24)
	  , ARRAY_BUFFER   = 'ArrayBuffer'
	  , DATA_VIEW      = 'DataView'
	  , PROTOTYPE      = 'prototype'
	  , WRONG_LENGTH   = 'Wrong length!'
	  , WRONG_INDEX    = 'Wrong index!'
	  , $ArrayBuffer   = global[ARRAY_BUFFER]
	  , $DataView      = global[DATA_VIEW]
	  , Math           = global.Math
	  , RangeError     = global.RangeError
	  , Infinity       = global.Infinity
	  , BaseBuffer     = $ArrayBuffer
	  , abs            = Math.abs
	  , pow            = Math.pow
	  , floor          = Math.floor
	  , log            = Math.log
	  , LN2            = Math.LN2
	  , BUFFER         = 'buffer'
	  , BYTE_LENGTH    = 'byteLength'
	  , BYTE_OFFSET    = 'byteOffset'
	  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
	  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
	  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;
	
	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function(value, mLen, nBytes){
	  var buffer = Array(nBytes)
	    , eLen   = nBytes * 8 - mLen - 1
	    , eMax   = (1 << eLen) - 1
	    , eBias  = eMax >> 1
	    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
	    , i      = 0
	    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
	    , e, m, c;
	  value = abs(value)
	  if(value != value || value === Infinity){
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if(value * (c = pow(2, -e)) < 1){
	      e--;
	      c *= 2;
	    }
	    if(e + eBias >= 1){
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if(value * c >= 2){
	      e++;
	      c /= 2;
	    }
	    if(e + eBias >= eMax){
	      m = 0;
	      e = eMax;
	    } else if(e + eBias >= 1){
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function(buffer, mLen, nBytes){
	  var eLen  = nBytes * 8 - mLen - 1
	    , eMax  = (1 << eLen) - 1
	    , eBias = eMax >> 1
	    , nBits = eLen - 7
	    , i     = nBytes - 1
	    , s     = buffer[i--]
	    , e     = s & 127
	    , m;
	  s >>= 7;
	  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if(e === 0){
	    e = 1 - eBias;
	  } else if(e === eMax){
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	};
	
	var unpackI32 = function(bytes){
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function(it){
	  return [it & 0xff];
	};
	var packI16 = function(it){
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function(it){
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function(it){
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function(it){
	  return packIEEE754(it, 23, 4);
	};
	
	var addGetter = function(C, key, internal){
	  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
	};
	
	var get = function(view, bytes, index, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function(view, bytes, index, conversion, value, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = conversion(+value);
	  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	};
	
	var validateArrayBufferArguments = function(that, length){
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length
	    , byteLength   = toLength(numberLength);
	  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};
	
	if(!$typed.ABV){
	  $ArrayBuffer = function ArrayBuffer(length){
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b       = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };
	
	  $DataView = function DataView(buffer, byteOffset, byteLength){
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH]
	      , offset       = toInteger(byteOffset);
	    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };
	
	  if(DESCRIPTORS){
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }
	
	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset){
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset){
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if(!fails(function(){
	    new $ArrayBuffer;     // eslint-disable-line no-new
	  }) || !fails(function(){
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })){
	    $ArrayBuffer = function ArrayBuffer(length){
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
	      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2))
	    , $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	$export($export.G + $export.W + $export.F * !__webpack_require__(219).ABV, {
	  DataView: __webpack_require__(220).DataView
	});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Int8', 1, function(init){
	  return function Int8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	if(__webpack_require__(6)){
	  var LIBRARY             = __webpack_require__(28)
	    , global              = __webpack_require__(4)
	    , fails               = __webpack_require__(7)
	    , $export             = __webpack_require__(8)
	    , $typed              = __webpack_require__(219)
	    , $buffer             = __webpack_require__(220)
	    , ctx                 = __webpack_require__(20)
	    , anInstance          = __webpack_require__(205)
	    , propertyDesc        = __webpack_require__(17)
	    , hide                = __webpack_require__(10)
	    , redefineAll         = __webpack_require__(210)
	    , toInteger           = __webpack_require__(38)
	    , toLength            = __webpack_require__(37)
	    , toIndex             = __webpack_require__(39)
	    , toPrimitive         = __webpack_require__(16)
	    , has                 = __webpack_require__(5)
	    , same                = __webpack_require__(71)
	    , classof             = __webpack_require__(75)
	    , isObject            = __webpack_require__(13)
	    , toObject            = __webpack_require__(58)
	    , isArrayIter         = __webpack_require__(162)
	    , create              = __webpack_require__(46)
	    , getPrototypeOf      = __webpack_require__(59)
	    , gOPN                = __webpack_require__(50).f
	    , getIterFn           = __webpack_require__(164)
	    , uid                 = __webpack_require__(19)
	    , wks                 = __webpack_require__(25)
	    , createArrayMethod   = __webpack_require__(172)
	    , createArrayIncludes = __webpack_require__(36)
	    , speciesConstructor  = __webpack_require__(207)
	    , ArrayIterators      = __webpack_require__(193)
	    , Iterators           = __webpack_require__(129)
	    , $iterDetect         = __webpack_require__(165)
	    , setSpecies          = __webpack_require__(192)
	    , arrayFill           = __webpack_require__(188)
	    , arrayCopyWithin     = __webpack_require__(185)
	    , $DP                 = __webpack_require__(11)
	    , $GOPD               = __webpack_require__(51)
	    , dP                  = $DP.f
	    , gOPD                = $GOPD.f
	    , RangeError          = global.RangeError
	    , TypeError           = global.TypeError
	    , Uint8Array          = global.Uint8Array
	    , ARRAY_BUFFER        = 'ArrayBuffer'
	    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
	    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
	    , PROTOTYPE           = 'prototype'
	    , ArrayProto          = Array[PROTOTYPE]
	    , $ArrayBuffer        = $buffer.ArrayBuffer
	    , $DataView           = $buffer.DataView
	    , arrayForEach        = createArrayMethod(0)
	    , arrayFilter         = createArrayMethod(2)
	    , arraySome           = createArrayMethod(3)
	    , arrayEvery          = createArrayMethod(4)
	    , arrayFind           = createArrayMethod(5)
	    , arrayFindIndex      = createArrayMethod(6)
	    , arrayIncludes       = createArrayIncludes(true)
	    , arrayIndexOf        = createArrayIncludes(false)
	    , arrayValues         = ArrayIterators.values
	    , arrayKeys           = ArrayIterators.keys
	    , arrayEntries        = ArrayIterators.entries
	    , arrayLastIndexOf    = ArrayProto.lastIndexOf
	    , arrayReduce         = ArrayProto.reduce
	    , arrayReduceRight    = ArrayProto.reduceRight
	    , arrayJoin           = ArrayProto.join
	    , arraySort           = ArrayProto.sort
	    , arraySlice          = ArrayProto.slice
	    , arrayToString       = ArrayProto.toString
	    , arrayToLocaleString = ArrayProto.toLocaleString
	    , ITERATOR            = wks('iterator')
	    , TAG                 = wks('toStringTag')
	    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
	    , DEF_CONSTRUCTOR     = uid('def_constructor')
	    , ALL_CONSTRUCTORS    = $typed.CONSTR
	    , TYPED_ARRAY         = $typed.TYPED
	    , VIEW                = $typed.VIEW
	    , WRONG_LENGTH        = 'Wrong length!';
	
	  var $map = createArrayMethod(1, function(O, length){
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });
	
	  var LITTLE_ENDIAN = fails(function(){
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
	    new Uint8Array(1).set({});
	  });
	
	  var strictToLength = function(it, SAME){
	    if(it === undefined)throw TypeError(WRONG_LENGTH);
	    var number = +it
	      , length = toLength(it);
	    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
	    return length;
	  };
	
	  var toOffset = function(it, BYTES){
	    var offset = toInteger(it);
	    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
	    return offset;
	  };
	
	  var validate = function(it){
	    if(isObject(it) && TYPED_ARRAY in it)return it;
	    throw TypeError(it + ' is not a typed array!');
	  };
	
	  var allocate = function(C, length){
	    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };
	
	  var speciesFromList = function(O, list){
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };
	
	  var fromList = function(C, list){
	    var index  = 0
	      , length = list.length
	      , result = allocate(C, length);
	    while(length > index)result[index] = list[index++];
	    return result;
	  };
	
	  var addGetter = function(it, key, internal){
	    dP(it, key, {get: function(){ return this._d[internal]; }});
	  };
	
	  var $from = function from(source /*, mapfn, thisArg */){
	    var O       = toObject(source)
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , iterFn  = getIterFn(O)
	      , i, length, values, result, step, iterator;
	    if(iterFn != undefined && !isArrayIter(iterFn)){
	      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
	        values.push(step.value);
	      } O = values;
	    }
	    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
	    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };
	
	  var $of = function of(/*...items*/){
	    var index  = 0
	      , length = arguments.length
	      , result = allocate(this, length);
	    while(length > index)result[index] = arguments[index++];
	    return result;
	  };
	
	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });
	
	  var $toLocaleString = function toLocaleString(){
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };
	
	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */){
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */){
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */){
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */){
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */){
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */){
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */){
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */){
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator){ // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */){
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse(){
	      var that   = this
	        , length = validate(that).length
	        , middle = Math.floor(length / 2)
	        , index  = 0
	        , value;
	      while(index < middle){
	        value         = that[index];
	        that[index++] = that[--length];
	        that[length]  = value;
	      } return that;
	    },
	    some: function some(callbackfn /*, thisArg */){
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn){
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end){
	      var O      = validate(this)
	        , length = O.length
	        , $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
	      );
	    }
	  };
	
	  var $slice = function slice(start, end){
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };
	
	  var $set = function set(arrayLike /*, offset */){
	    validate(this);
	    var offset = toOffset(arguments[1], 1)
	      , length = this.length
	      , src    = toObject(arrayLike)
	      , len    = toLength(src.length)
	      , index  = 0;
	    if(len + offset > length)throw RangeError(WRONG_LENGTH);
	    while(index < len)this[offset + index] = src[index++];
	  };
	
	  var $iterators = {
	    entries: function entries(){
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys(){
	      return arrayKeys.call(validate(this));
	    },
	    values: function values(){
	      return arrayValues.call(validate(this));
	    }
	  };
	
	  var isTAIndex = function(target, key){
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key){
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc){
	    if(isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ){
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };
	
	  if(!ALL_CONSTRUCTORS){
	    $GOPD.f = $getDesc;
	    $DP.f   = $setDesc;
	  }
	
	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty:           $setDesc
	  });
	
	  if(fails(function(){ arrayToString.call({}); })){
	    arrayToString = arrayToLocaleString = function toString(){
	      return arrayJoin.call(this);
	    }
	  }
	
	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice:          $slice,
	    set:            $set,
	    constructor:    function(){ /* noop */ },
	    toString:       arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function(){ return this[TYPED_ARRAY]; }
	  });
	
	  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
	    CLAMPED = !!CLAMPED;
	    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
	      , ISNT_UINT8 = NAME != 'Uint8Array'
	      , GETTER     = 'get' + KEY
	      , SETTER     = 'set' + KEY
	      , TypedArray = global[NAME]
	      , Base       = TypedArray || {}
	      , TAC        = TypedArray && getPrototypeOf(TypedArray)
	      , FORCED     = !TypedArray || !$typed.ABV
	      , O          = {}
	      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function(that, index){
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function(that, index, value){
	      var data = that._d;
	      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function(that, index){
	      dP(that, index, {
	        get: function(){
	          return getter(this, index);
	        },
	        set: function(value){
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if(FORCED){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME, '_d');
	        var index  = 0
	          , offset = 0
	          , buffer, byteLength, length, klass;
	        if(!isObject(data)){
	          length     = strictToLength(data, true)
	          byteLength = length * BYTES;
	          buffer     = new $ArrayBuffer(byteLength);
	        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if($length === undefined){
	            if($len % BYTES)throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if(TYPED_ARRAY in data){
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while(index < length)addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if(!$iterDetect(function(iter){
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
	        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
	        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
	      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
	      , $iterator         = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	
	    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
	      dP(TypedArrayPrototype, TAG, {
	        get: function(){ return NAME; }
	      });
	    }
	
	    O[NAME] = TypedArray;
	
	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	
	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });
	
	    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	
	    $export($export.P, NAME, proto);
	
	    setSpecies(NAME);
	
	    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});
	
	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	
	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});
	
	    $export($export.P + $export.F * fails(function(){
	      new TypedArray(1).slice();
	    }), NAME, {slice: $slice});
	
	    $export($export.P + $export.F * (fails(function(){
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
	    }) || !fails(function(){
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {toLocaleString: $toLocaleString});
	
	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function(){ /* empty */ };

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Uint8', 1, function(init){
	  return function Uint8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Uint8', 1, function(init){
	  return function Uint8ClampedArray(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Int16', 2, function(init){
	  return function Int16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Uint16', 2, function(init){
	  return function Uint16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Int32', 4, function(init){
	  return function Int32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Uint32', 4, function(init){
	  return function Uint32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Float32', 4, function(init){
	  return function Float32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Float64', 8, function(init){
	  return function Float64Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export   = __webpack_require__(8)
	  , aFunction = __webpack_require__(21)
	  , anObject  = __webpack_require__(12)
	  , rApply    = (__webpack_require__(4).Reflect || {}).apply
	  , fApply    = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(7)(function(){
	  rApply(function(){});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    var T = aFunction(target)
	      , L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export    = __webpack_require__(8)
	  , create     = __webpack_require__(46)
	  , aFunction  = __webpack_require__(21)
	  , anObject   = __webpack_require__(12)
	  , isObject   = __webpack_require__(13)
	  , fails      = __webpack_require__(7)
	  , bind       = __webpack_require__(77)
	  , rConstruct = (__webpack_require__(4).Reflect || {}).construct;
	
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function(){
	  function F(){}
	  return !(rConstruct(function(){}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function(){
	  rConstruct(function(){});
	});
	
	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch(args.length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(11)
	  , $export     = __webpack_require__(8)
	  , anObject    = __webpack_require__(12)
	  , toPrimitive = __webpack_require__(16);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(8)
	  , gOPD     = __webpack_require__(51).f
	  , anObject = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(8)
	  , anObject = __webpack_require__(12);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(130)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(51)
	  , getPrototypeOf = __webpack_require__(59)
	  , has            = __webpack_require__(5)
	  , $export        = __webpack_require__(8)
	  , isObject       = __webpack_require__(13)
	  , anObject       = __webpack_require__(12);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(51)
	  , $export  = __webpack_require__(8)
	  , anObject = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(8)
	  , getProto = __webpack_require__(59)
	  , anObject = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(8)
	  , anObject      = __webpack_require__(12)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(243)});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(50)
	  , gOPS     = __webpack_require__(43)
	  , anObject = __webpack_require__(12)
	  , Reflect  = __webpack_require__(4).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(8)
	  , anObject           = __webpack_require__(12)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(11)
	  , gOPD           = __webpack_require__(51)
	  , getPrototypeOf = __webpack_require__(59)
	  , has            = __webpack_require__(5)
	  , $export        = __webpack_require__(8)
	  , createDesc     = __webpack_require__(17)
	  , anObject       = __webpack_require__(12)
	  , isObject       = __webpack_require__(13);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(8)
	  , setProto = __webpack_require__(73);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	var $export   = __webpack_require__(8)
	  , $includes = __webpack_require__(36)(true);
	
	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(186)('includes');

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(8)
	  , $at     = __webpack_require__(127)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(8)
	  , $pad    = __webpack_require__(250);
	
	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(37)
	  , repeat   = __webpack_require__(91)
	  , defined  = __webpack_require__(35);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength || fillStr == '')return S;
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(8)
	  , $pad    = __webpack_require__(250);
	
	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(83)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(83)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/
	var $export     = __webpack_require__(8)
	  , defined     = __webpack_require__(35)
	  , toLength    = __webpack_require__(37)
	  , isRegExp    = __webpack_require__(134)
	  , getFlags    = __webpack_require__(196)
	  , RegExpProto = RegExp.prototype;
	
	var $RegExpStringIterator = function(regexp, string){
	  this._r = regexp;
	  this._s = string;
	};
	
	__webpack_require__(130)($RegExpStringIterator, 'RegExp String', function next(){
	  var match = this._r.exec(this._s);
	  return {value: match, done: match === null};
	});
	
	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp){
	    defined(this);
	    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
	    var S     = String(this)
	      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
	      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27)('asyncIterator');

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27)('observable');

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export        = __webpack_require__(8)
	  , ownKeys        = __webpack_require__(243)
	  , toIObject      = __webpack_require__(32)
	  , gOPD           = __webpack_require__(51)
	  , createProperty = __webpack_require__(163);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , getDesc = gOPD.f
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key;
	    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
	    return result;
	  }
	});

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(8)
	  , $values = __webpack_require__(259)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(30)
	  , toIObject = __webpack_require__(32)
	  , isEnum    = __webpack_require__(44).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(8)
	  , $entries = __webpack_require__(259)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(8)
	  , toObject        = __webpack_require__(58)
	  , aFunction       = __webpack_require__(21)
	  , $defineProperty = __webpack_require__(11);
	
	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(6) && $export($export.P + __webpack_require__(262), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter){
	    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(28)|| !__webpack_require__(7)(function(){
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function(){ /* empty */});
	  delete __webpack_require__(4)[K];
	});

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(8)
	  , toObject        = __webpack_require__(58)
	  , aFunction       = __webpack_require__(21)
	  , $defineProperty = __webpack_require__(11);
	
	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(6) && $export($export.P + __webpack_require__(262), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter){
	    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(8)
	  , toObject                 = __webpack_require__(58)
	  , toPrimitive              = __webpack_require__(16)
	  , getPrototypeOf           = __webpack_require__(59)
	  , getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(6) && $export($export.P + __webpack_require__(262), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.get;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(8)
	  , toObject                 = __webpack_require__(58)
	  , toPrimitive              = __webpack_require__(16)
	  , getPrototypeOf           = __webpack_require__(59)
	  , getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(6) && $export($export.P + __webpack_require__(262), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.set;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(8);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(267)('Map')});

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(75)
	  , from    = __webpack_require__(268);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(206);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(8);
	
	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(267)('Set')});

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(8);
	
	$export($export.S, 'System', {global: __webpack_require__(4)});

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(8)
	  , cof     = __webpack_require__(34);
	
	$export($export.S, 'Error', {
	  isError: function isError(it){
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  imulh: function imulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >> 16
	      , v1 = $v >> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  umulh: function umulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >>> 16
	      , v1 = $v >>> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(277)
	  , anObject                  = __webpack_require__(12)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	}});

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var Map     = __webpack_require__(211)
	  , $export = __webpack_require__(8)
	  , shared  = __webpack_require__(23)('metadata')
	  , store   = shared.store || (shared.store = new (__webpack_require__(215)));
	
	var getOrCreateMetadataMap = function(target, targetKey, create){
	  var targetMetadata = store.get(target);
	  if(!targetMetadata){
	    if(!create)return undefined;
	    store.set(target, targetMetadata = new Map);
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if(!keyMetadata){
	    if(!create)return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map);
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function(target, targetKey){
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
	    , keys        = [];
	  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
	  return keys;
	};
	var toMetaKey = function(it){
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function(O){
	  $export($export.S, 'Reflect', O);
	};
	
	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , toMetaKey              = metadata.key
	  , getOrCreateMetadataMap = metadata.map
	  , store                  = metadata.store;
	
	metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
	  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
	    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
	  if(metadataMap.size)return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	}});

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , getPrototypeOf         = __webpack_require__(59)
	  , ordinaryHasOwnMetadata = metadata.has
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	var ordinaryGetMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	
	metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var Set                     = __webpack_require__(214)
	  , from                    = __webpack_require__(268)
	  , metadata                = __webpack_require__(277)
	  , anObject                = __webpack_require__(12)
	  , getPrototypeOf          = __webpack_require__(59)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	var ordinaryMetadataKeys = function(O, P){
	  var oKeys  = ordinaryOwnMetadataKeys(O, P)
	    , parent = getPrototypeOf(O);
	  if(parent === null)return oKeys;
	  var pKeys  = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	
	metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                = __webpack_require__(277)
	  , anObject                = __webpack_require__(12)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , getPrototypeOf         = __webpack_require__(59)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	var ordinaryHasMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	
	metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(277)
	  , anObject                  = __webpack_require__(12)
	  , aFunction                 = __webpack_require__(21)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({metadata: function metadata(metadataKey, metadataValue){
	  return function decorator(target, targetKey){
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	}});

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export   = __webpack_require__(8)
	  , microtask = __webpack_require__(209)()
	  , process   = __webpack_require__(4).process
	  , isNode    = __webpack_require__(34)(process) == 'process';
	
	$export($export.G, {
	  asap: function asap(fn){
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/zenparsing/es-observable
	var $export     = __webpack_require__(8)
	  , global      = __webpack_require__(4)
	  , core        = __webpack_require__(9)
	  , microtask   = __webpack_require__(209)()
	  , OBSERVABLE  = __webpack_require__(25)('observable')
	  , aFunction   = __webpack_require__(21)
	  , anObject    = __webpack_require__(12)
	  , anInstance  = __webpack_require__(205)
	  , redefineAll = __webpack_require__(210)
	  , hide        = __webpack_require__(10)
	  , forOf       = __webpack_require__(206)
	  , RETURN      = forOf.RETURN;
	
	var getMethod = function(fn){
	  return fn == null ? undefined : aFunction(fn);
	};
	
	var cleanupSubscription = function(subscription){
	  var cleanup = subscription._c;
	  if(cleanup){
	    subscription._c = undefined;
	    cleanup();
	  }
	};
	
	var subscriptionClosed = function(subscription){
	  return subscription._o === undefined;
	};
	
	var closeSubscription = function(subscription){
	  if(!subscriptionClosed(subscription)){
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};
	
	var Subscription = function(observer, subscriber){
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup      = subscriber(observer)
	      , subscription = cleanup;
	    if(cleanup != null){
	      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
	      else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch(e){
	    observer.error(e);
	    return;
	  } if(subscriptionClosed(this))cleanupSubscription(this);
	};
	
	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe(){ closeSubscription(this); }
	});
	
	var SubscriptionObserver = function(subscription){
	  this._s = subscription;
	};
	
	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if(m)return m.call(observer, value);
	      } catch(e){
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value){
	    var subscription = this._s;
	    if(subscriptionClosed(subscription))throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if(!m)throw value;
	      value = m.call(observer, value);
	    } catch(e){
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    } cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch(e){
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      } cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});
	
	var $Observable = function Observable(subscriber){
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};
	
	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer){
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn){
	    var that = this;
	    return new (core.Promise || global.Promise)(function(resolve, reject){
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next : function(value){
	          try {
	            return fn(value);
	          } catch(e){
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});
	
	redefineAll($Observable, {
	  from: function from(x){
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if(method){
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function(observer){
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          try {
	            if(forOf(x, false, function(it){
	              observer.next(it);
	              if(done)return RETURN;
	            }) === RETURN)return;
	          } catch(e){
	            if(done)throw e;
	            observer.error(e);
	            return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  },
	  of: function of(){
	    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
	    return new (typeof this === 'function' ? this : $Observable)(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          for(var i = 0; i < items.length; ++i){
	            observer.next(items[i]);
	            if(done)return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  }
	});
	
	hide($Observable.prototype, OBSERVABLE, function(){ return this; });
	
	$export($export.G, {Observable: $Observable});
	
	__webpack_require__(192)('Observable');

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(4)
	  , $export    = __webpack_require__(8)
	  , invoke     = __webpack_require__(78)
	  , partial    = __webpack_require__(289)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(290)
	  , invoke    = __webpack_require__(78)
	  , aFunction = __webpack_require__(21);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that = this
	      , aLen = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !aLen)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(aLen > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	  , $task   = __webpack_require__(208);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(193)
	  , redefine      = __webpack_require__(18)
	  , global        = __webpack_require__(4)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(129)
	  , wks           = __webpack_require__(25)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(294)))

/***/ },
/* 294 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        return setTimeout(fun, 0);
	    } else {
	        return cachedSetTimeout.call(null, fun, 0);
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        clearTimeout(marker);
	    } else {
	        cachedClearTimeout.call(null, marker);
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(296);
	module.exports = __webpack_require__(9).RegExp.escape;

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(8)
	  , $re     = __webpack_require__(297)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 297 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */
/***/ function(module, exports) {

	'use strict';
	module.exports = {
		getTokenList: function getTokenList() {
			if (!localStorage.hasOwnProperty('tokenList')) {
				localStorage.tokenList = '[]';
			}
			var tokenList;
			try {
				tokenList = JSON.parse(localStorage.tokenList);
			} catch (e) {
				localStorage.tokenList = '[]';
				tokenList = [];
			}
			return tokenList;
		},
		setTokenList: function setTokenList(tokenList) {
			localStorage.tokenList = JSON.stringify(tokenList);
		},
		findAccount: function findAccount(account_name) {
			var tokenList = this.getTokenList();
			var index = -1;
			tokenList.forEach(function (tokenInfo, i) {
				if (tokenInfo.account_name === account_name) {
					index = i;
				}
			});
			return index;
		},
		addToken: function addToken(token, account_name, isVirtual) {
			var tokenList = this.getTokenList();
			var tokenIndex = this.findToken(token);
			var accountIndex = this.findAccount(account_name);
			if (tokenIndex < 0 && accountIndex < 0) {
				tokenList.push({
					account_name: account_name,
					token: token,
					isVirtual: isVirtual
				});
				this.setTokenList(tokenList);
			}
		},
		findToken: function findToken(token) {
			var tokenList = this.getTokenList();
			var index = -1;
			tokenList.forEach(function (tokenInfo, i) {
				if (tokenInfo.token === token) {
					index = i;
				}
			});
			return index;
		},
		getToken: function getToken(token) {
			var tokenList = this.getTokenList();
			var index = this.findToken(token);
			if (index >= 0) {
				return tokenList[index];
			}
			return {};
		},
		removeToken: function removeToken(token) {
			var tokenList = this.getTokenList();
			var index = this.findToken(token);
			if (index > -1) {
				tokenList.splice(index, 1);
				localStorage.tokenList = tokenList;
			}
		},
		removeAllTokens: function removeAllTokens() {
			delete localStorage.tokenList;
		},
		isDone: function isDone(varName) {
			return localStorage.hasOwnProperty(varName);
		},
		setDone: function setDone(varName) {
			localStorage[varName] = true;
		},
		setNotDone: function setNotDone(varName) {
			delete localStorage[varName];
		},
		set: function set(varName, value) {
			localStorage[varName] = value;
		},
		get: function get(varName) {
			return localStorage[varName];
		},
	};


/***/ },
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
		asyncChain: function asyncChain(){
			return {
				asyncCallChain: [],
				pipe: function pipe(fun){
					this.asyncCallChain.push(fun);
					return this;
				},
				exec: function exec() {
					var wrap = function (call, callback) {
						return function () {
							call(callback);
						};
					};
					for (var i = this.asyncCallChain.length-1; i > -1; i--) {
						this.asyncCallChain[i] = wrap(this.asyncCallChain[i], i < this.asyncCallChain.length - 1 ? this.asyncCallChain[i + 1] : function(){});
					}
					this.asyncCallChain[0]();
				},
			};
		},
		asyncForEach: function asyncForEach(list, func, callback, index) {
			var callbackCalled = false;
			if ( typeof index === 'undefined' ) {
				index = 0;
			} else if ( index === list.length ) {
				if (callback) {
					callback();
				}
				return;
			}
			var toolScope = this;
			func(list[index], index, function(){
				if ( !callbackCalled ) {
					callbackCalled = true;
					toolScope.asyncForEach(list, func, callback, index+1);
				}
			});
		},
		parseQueryString: function parseQueryString() {
			if ( typeof window === 'undefined' ){
				return {};
			}
			var str = window.location.search;
			var objURL = {};
			str.replace(
				new RegExp("([^?=&]+)(=([^&]*))?", "g"),
				function (_0, _1, _2, _3) {
					objURL[_1] = _3;
				}
			);
			return objURL;
		},
		getObjectValue: function getObjectValue(obj) {
			return obj[Object.keys(obj)[0]];
		},
		getObjectKey: function getObjectKey(obj) {
			return Object.keys(obj)[0];
		},
		getUTCTime: function getUTCTime(date) {
			var dateObject = new Date(date);
			return ('0' + dateObject.getUTCHours())
			.slice(-2) + ':' + ('0' + dateObject.getUTCMinutes())
			.slice(-2) + ':' + ('0' + dateObject.getUTCSeconds())
			.slice(-2);
		},
		copyAttributeIfExists: function copyAttributeIfExists(obj1, obj2, name) {
			if (obj2.hasOwnProperty(name)) {
				obj1[name] = obj2[name];
			}
		},
		createXmlFromMarket: function createXmlFromMarket(obj) {
			var xmlStr = '<category name="Markets" colour="345" i18n-text="Markets">\n';
			Object.keys(obj).forEach(function(market){
				xmlStr += '\t<category name="'+ obj[market].name +'" colour="345">\n';
				Object.keys(obj[market].submarkets).forEach(function(submarket){
					xmlStr += '\t\t<category name="'+ obj[market].submarkets[submarket].name +'" colour="345">\n';
					Object.keys(obj[market].submarkets[submarket].symbols).forEach(function(symbol){
						xmlStr += '\t\t\t<block type="'+ symbol.toLowerCase() +'"/>\n';
					});
					xmlStr += '\t\t</category>\n';
				});
				xmlStr += '\t</category>\n';
			});
			xmlStr += '</category>';
			return xmlStr;
		},
		xmlToStr: function xmlToStr(xml){
			var serializer = new XMLSerializer(); 
			return serializer.serializeToString(xml);
		},
		strToXml: function strToXml(str) {
			var xmlDoc;
			var parser;
			if (window.DOMParser) {
				parser = new DOMParser();
				xmlDoc = parser.parseFromString(str, "text/xml");
			} else if (window.ActiveXObject){
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = false;
				xmlDoc.loadXML(str);
			}
			return xmlDoc;
		}
	};


/***/ },
/* 307 */,
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _i18n = __webpack_require__(309);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	var _tools = __webpack_require__(306);
	
	var _tools2 = _interopRequireDefault(_tools);
	
	var _storageManager = __webpack_require__(302);
	
	var _storageManager2 = _interopRequireDefault(_storageManager);
	
	var _zh_tw = __webpack_require__(317);
	
	var _zh_tw2 = _interopRequireDefault(_zh_tw);
	
	var _de = __webpack_require__(318);
	
	var _de2 = _interopRequireDefault(_de);
	
	var _id = __webpack_require__(319);
	
	var _id2 = _interopRequireDefault(_id);
	
	var _zh_cn = __webpack_require__(320);
	
	var _zh_cn2 = _interopRequireDefault(_zh_cn);
	
	var _it = __webpack_require__(321);
	
	var _it2 = _interopRequireDefault(_it);
	
	var _vi = __webpack_require__(322);
	
	var _vi2 = _interopRequireDefault(_vi);
	
	var _ar = __webpack_require__(323);
	
	var _ar2 = _interopRequireDefault(_ar);
	
	var _pl = __webpack_require__(324);
	
	var _pl2 = _interopRequireDefault(_pl);
	
	var _ru = __webpack_require__(325);
	
	var _ru2 = _interopRequireDefault(_ru);
	
	var _pt = __webpack_require__(326);
	
	var _pt2 = _interopRequireDefault(_pt);
	
	var _es = __webpack_require__(327);
	
	var _es2 = _interopRequireDefault(_es);
	
	var _fr = __webpack_require__(328);
	
	var _fr2 = _interopRequireDefault(_fr);
	
	var _en = __webpack_require__(329);
	
	var _en2 = _interopRequireDefault(_en);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Translator = function Translator() {
		if (Translator.instance) {
			return Translator.instance;
		}
		Translator.instance = this;
		var lang = this.getLanguage();
		var resources = {};
		for (var i in this._supportedLanguages) {
			resources[i] = {
				translation: this._supportedLanguages[i]
			};
		}
		_i18n2.default.init({
			lng: lang,
			fallbackLng: 'en',
			ns: ['translation'],
			defaultNS: ['translation'],
			resources: resources
		});
	};
	
	Translator.prototype = Object.create(null, {
		_supportedLanguages: {
			value: {
				zh_tw: _zh_tw2.default,
				de: _de2.default,
				id: _id2.default,
				zh_cn: _zh_cn2.default,
				it: _it2.default,
				vi: _vi2.default,
				ar: _ar2.default,
				pl: _pl2.default,
				ru: _ru2.default,
				pt: _pt2.default,
				es: _es2.default,
				fr: _fr2.default,
				en: _en2.default
			}
		},
		getLanguage: {
			value: function getLanguage() {
				var queryStr = _tools2.default.parseQueryString();
				var lang = 'en';
				if (queryStr.hasOwnProperty('l') && queryStr.l !== '' && this._supportedLanguages.hasOwnProperty(queryStr.l)) {
					lang = queryStr.l;
					_storageManager2.default.set('lang', queryStr.l);
				} else if (typeof window !== 'undefined') {
					if (_storageManager2.default.get('lang')) {
						lang = _storageManager2.default.get('lang');
					} else {
						_storageManager2.default.set('lang', 'en');
					}
				}
				return lang;
			}
		},
		translateText: {
			value: function translateText(str) {
				return _i18n2.default._(str);
			}
		},
		translateXml: {
			value: function translateXml(xml) {
				return _i18n2.default.xml(xml);
			}
		}
	});
	
	module.exports = Translator;

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _sha = __webpack_require__(310);
	
	var _sha2 = _interopRequireDefault(_sha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
		translation: null,
		init: function init(options, callback) {
			this.translation = options.resources[options.lng][options.defaultNS];
		},
		t: function t(key) {
			return this.translation[key];
		},
		_: function _(str, opt) {
			var key = (0, _sha2.default)(str);
			var result = this.t(key);
			return result === '' ? str : result;
		},
		xml: function xml(dom) {
			var categories = dom.getElementsByTagName('category');
			for (var i = 0; i < categories.length; i++) {
				var child = categories[i];
				var str = child.getAttribute('i18n-text');
				var key;
				var hasTranslation = false;
				if (str === null) {
					key = child.getAttribute('i18n');
					if (key !== null) {
						hasTranslation = true;
					}
				} else {
					key = (0, _sha2.default)(str);
					hasTranslation = true;
				}
				var result = this.t(key);
				if (hasTranslation) {
					child.setAttribute('name', result === '' ? str : result);
				}
				if (child.childNodes.length > 0) {
					this.xml(child);
				}
			}
			return dom;
		}
	};

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {(function() {
	  var crypt = __webpack_require__(315),
	      utf8 = __webpack_require__(316).utf8,
	      bin = __webpack_require__(316).bin,
	
	  // The core
	  sha1 = function (message) {
	    // Convert to byte array
	    if (message.constructor == String)
	      message = utf8.stringToBytes(message);
	    else if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(message))
	      message = Array.prototype.slice.call(message, 0);
	    else if (!Array.isArray(message))
	      message = message.toString();
	
	    // otherwise assume byte array
	
	    var m  = crypt.bytesToWords(message),
	        l  = message.length * 8,
	        w  = [],
	        H0 =  1732584193,
	        H1 = -271733879,
	        H2 = -1732584194,
	        H3 =  271733878,
	        H4 = -1009589776;
	
	    // Padding
	    m[l >> 5] |= 0x80 << (24 - l % 32);
	    m[((l + 64 >>> 9) << 4) + 15] = l;
	
	    for (var i = 0; i < m.length; i += 16) {
	      var a = H0,
	          b = H1,
	          c = H2,
	          d = H3,
	          e = H4;
	
	      for (var j = 0; j < 80; j++) {
	
	        if (j < 16)
	          w[j] = m[i + j];
	        else {
	          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
	          w[j] = (n << 1) | (n >>> 31);
	        }
	
	        var t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
	                j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
	                j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
	                j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
	                         (H1 ^ H2 ^ H3) - 899497514);
	
	        H4 = H3;
	        H3 = H2;
	        H2 = (H1 << 30) | (H1 >>> 2);
	        H1 = H0;
	        H0 = t;
	      }
	
	      H0 += a;
	      H1 += b;
	      H2 += c;
	      H3 += d;
	      H4 += e;
	    }
	
	    return [H0, H1, H2, H3, H4];
	  },
	
	  // Public API
	  api = function (message, options) {
	    var digestbytes = crypt.wordsToBytes(sha1(message));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt.bytesToHex(digestbytes);
	  };
	
	  api._blocksize = 16;
	  api._digestsize = 20;
	
	  module.exports = api;
	})();
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(311).Buffer))

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(312)
	var ieee754 = __webpack_require__(313)
	var isArray = __webpack_require__(314)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var rootParent = {}
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }
	
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }
	
	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }
	
	  // Unusual.
	  return fromObject(this, arg)
	}
	
	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'
	
	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)
	
	  that.write(string, encoding)
	  return that
	}
	
	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)
	
	  if (isArray(object)) return fromArray(that, object)
	
	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }
	
	  if (object.length) return fromArrayLike(that, object)
	
	  return fromJsonObject(that, object)
	}
	
	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}
	
	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0
	
	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)
	
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}
	
	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }
	
	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent
	
	  return that
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)
	
	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break
	
	    ++i
	  }
	
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }
	
	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0
	
	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1
	
	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)
	
	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }
	
	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'binary':
	        return binaryWrite(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  if (newBuf.length) newBuf.parent = this.parent || this
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }
	
	  return len
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new RangeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set
	
	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(311).Buffer, (function() { return this; }())))

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 313 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 314 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 315 */
/***/ function(module, exports) {

	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	
	  crypt = {
	    // Bit-wise rotation left
	    rotl: function(n, b) {
	      return (n << b) | (n >>> (32 - b));
	    },
	
	    // Bit-wise rotation right
	    rotr: function(n, b) {
	      return (n << (32 - b)) | (n >>> b);
	    },
	
	    // Swap big-endian to little-endian and vice versa
	    endian: function(n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }
	
	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt.endian(n[i]);
	      return n;
	    },
	
	    // Generate an array of any length of random bytes
	    randomBytes: function(n) {
	      for (var bytes = []; n > 0; n--)
	        bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },
	
	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function(bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
	        words[b >>> 5] |= bytes[i] << (24 - b % 32);
	      return words;
	    },
	
	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function(words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
	        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	      return bytes;
	    },
	
	    // Convert a byte array to a hex string
	    bytesToHex: function(bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },
	
	    // Convert a hex string to a byte array
	    hexToBytes: function(hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2)
	        bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },
	
	    // Convert a byte array to a base-64 string
	    bytesToBase64: function(bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	        for (var j = 0; j < 4; j++)
	          if (i * 8 + j * 6 <= bytes.length * 8)
	            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
	          else
	            base64.push('=');
	      }
	      return base64.join('');
	    },
	
	    // Convert a base-64 string to a byte array
	    base64ToBytes: function(base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');
	
	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
	          imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
	            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
	            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
	      }
	      return bytes;
	    }
	  };
	
	  module.exports = crypt;
	})();


/***/ },
/* 316 */
/***/ function(module, exports) {

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },
	
	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },
	
	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      for (var bytes = [], i = 0; i < str.length; i++)
	        bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },
	
	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++)
	        str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};
	
	module.exports = charenc;


/***/ },
/* 317 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 318 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 319 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 320 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 321 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 322 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 323 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 324 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 325 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 326 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 327 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 328 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 329 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  "3d52a6d8fedcc48a65297c07bf5f7e3e41aab5aa": "Logic",
	  "3edf0df49942da6d11a1a217e4d3af4a5a8e64f2": "Math",
	  "c3328c39b0e29f78e9ff45db674248b1d245887d": "Text",
	  "a1fffaaafb7cc996685bceb829c053cc4f7de43d": "List",
	  "19de69cb601f53a4ea7af22a65c71ae63251365c": "Variable",
	  "2b961dea1dc0c60ddf9a2c8e9d090f6f7d082483": "Functions",
	  "66639f7d455dd71faa9147f5d69e5ce885d8bebd": "Binary",
	  "753cb2a65ee92d0f86eba6da481d1f1ad1d933d8": "Trade Types",
	  "f94510322ecd9b3a2af67a10bd51ecc4ac6a24e7": "Up/Down",
	  "9c7960c6b11d35ac9d6cdc1ebaad3af43b2065c5": "Asians",
	  "2260ce49306460c8a2ef501939f29ad6ddd4e934": "Digits",
	  "69fb26dda8edc2e1edaa7ba4e1f7884f838f271c": "Strategy",
	  "b74bdee9c34f37b6b9b0d20a8ca8a9bf6797f6e1": "Finish",
	  "4fa8cc860c52b268dc6a3adcde7305e9415db5bb": "Tools",
	  "d55369eede07dd2ab46a239e3c464ed09429a8a4": "Select a Tour",
	  "e52e5e6cd50ef4de30d8a4fafbbfab41180cc200": "Welcome!",
	  "2473e96bc614a911821242119918a241a41836d6": "Introduction",
	  "6e78c91f5a05fc0d4f1a787d38e3d6fe2f856d46": "Log out",
	  "f7c400ed695f898b8ee9d21664aa17b5bb693828": "Log in",
	  "612e12d29278b5519294bc25cdaddffec6d0f1c6": "Results",
	  "12b71c3e0fe5f7c0b8d17cc03186e281412da4a8": "Summary",
	  "d847919a30d31c0be624087f3370492b3fdf80c6": "No. of runs",
	  "1e5e614c900bd1584f0bb286450d6386955b486a": "Total Stake",
	  "03969004b50f3f14cd77e318eaaca1945c128ed4": "Total Payout",
	  "5405a1f68d262cc4d6f2b8dc93382afe6cf31778": "Total Profit/Loss",
	  "90eef613042c5a51f542421065b68b886d473807": "Balance",
	  "597b1092b35773a3b65fbcb4e6424c2bcc006dd1": "Trades",
	  "b7baa1d40c4ea29afc9098732bffee2a861a6c44": "Number",
	  "db1c784524e1b54011a95823026161f7c8517fe0": "Reference",
	  "74751e67c3e1010c343095eaf543e7cb21ced2ef": "Trade Type",
	  "6541776503f0f949109cde78e6634d07d3528cd3": "Entry Spot",
	  "77bcdf0da628448afd03ab5259f31f56c9071ca6": "Exit Spot",
	  "257d4c5a3f637e1a35bfc26330dd3ebee92f5dd0": "Buy Price",
	  "8875c6d210e37a0772b7d1a37a48d345c90440d8": "Final Price",
	  "772fbced18230220d2d9be1456be16fc1b271d25": "Profit/Loss",
	  "18d76188e5c5d9df16ea3b7375c0da13c4fa8756": "Load block file",
	  "56bb242d8211b81fb557f03bce8ef4c3dd4bc736": "Block file",
	  "608061fb5aab975013fa70c5c814a1d8ba30c152": "Trade More Efficiently Than You Ever Thought Possible",
	  "e4ce8dc3e416e69262ba642dc57d3975d6616980": "Interested in automating your preferred strategies for trading binary options?",
	  "f261237ca8beec6f77b76c4121feb8da22818c56": "Binary Bot is our leading-edge programming tool which allows you to build trading apps with a simple “jigsaw puzzle-like” drag-and-drop function.",
	  "f6c85c68616eeaaa15fcd53fdc52f6eb5c886357": "Dream up any number of binary options trading bots, from incredibly simple formulas to vastly complex algorithms. Then let them trade for you, even while you sleep.",
	  "e6906a0d1c28b202f9bd49da4a6abbddca57399a": "Best of all, once you’ve built a bot, we can help you sell it to fellow traders in the",
	  "1dd0cf79c572bcdbdfabbd54ee95710a21234d73": "Binary.com Shop",
	  "abeef9a35ae6256796ba2462e4f64d308de42359": "Receive 80% of the sales revenue from every purchase of your bot in our app store.",
	  "104f798e4ad21ffd30587ecac37a08a981a80474": "A basic background of programming is required to work with Blockly and therefore Binary Bot. You can find good material to get started and build your computational thinking skills here:",
	  "e9d9b7307276b8a24685291fc134cbff636cab5b": "Learn Programming with Blockly",
	  "4aaa021babcace3ae5f45193e347ce85b102c9e2": "Computational thinking and programming using blockly",
	  "c9682cd9c0d26c6a70d2fd02ab46f490ad8b3335": "Computational Thinking Course",
	  "f3aba0f8c31987cb145508d84e29ee64e7ea2794": "Or only the",
	  "0606f0b7763ee6e8094a3dab7873d34c08fd3670": "Begin Building a Bot Now",
	  "221acaf3a0290adafe08cdcb8c66121c73d8b4a3": "Need further assistance?",
	  "4832e45812a2724f16a15f9ae87adfc8ae4168cf": "Contact us",
	  "9bb396940adb9705fe57eba6ea8b578e6aafa792": "Payout",
	  "78d7103a319e808455d397513279d99f3b3f3768": "Stake",
	  "bbb930cc426507ed3f6b7c343c75dd0e041494b7": "statement",
	  "e6e886cdcdefeb6d3edb4c31bed06dd183ac4153": "ask price",
	  "50e72909992bdc37c7c07769d1b7efac5e52874c": "payout",
	  "ecb5ba7044417916ba12de5fa9e6fccac3e5d475": "profit",
	  "c980b910204c7babdffe8ff3f7e755f30133383c": "contract type",
	  "a726c6955157f1b8b92f9932652434a7150f80f8": "entry spot",
	  "a66d5c7ef2c63dbc9a8f9e6ae4e2bc575e74a36e": "entry value",
	  "7674920c033ca14277c577e19c037a6754d4fa80": "exit spot",
	  "e8b8bd9f2eabc12875605a37c93e7f04a713fcb8": "exit value",
	  "779455ee3bde8494d9629b353e17b19e92357ba8": "barrier",
	  "37a5301a88da334dc5afc5b63979daa0f3f45e68": "result",
	  "4973f4c599d5f42cf7bde52d66c3ed8ef77accb1": "Win",
	  "12e24a7d8ac40579e8a0aef4869288afe7ed6745": "Loss",
	  "563339f82447b4e758ad76d5a0b63b5698594fba": "Rise",
	  "5c1ae82c29543ac887703776bf3da2c7dcce683d": "Fall",
	  "2fc096bb7b6596ab243d0286c9f43fdf2b9b406d": "No Change",
	  "93d13bad1d2c2841db127cb70cc35bfc98059fc9": "Asian Up",
	  "c098658ce3d3a258e4d155949a60072966b36db7": "Asian Down",
	  "ee2dbd5d6d82d0833069b07e7dd2848d3bf4d83a": "Matches",
	  "8444b7ce28bbc3443cc5cf73359b8353989b2a4b": "Differs",
	  "9e767ad03e5547f251044e0724dc1d9f3e75aeed": "Even",
	  "dc28f5f3c65ec611f0f30022650d24382d27448e": "Odd",
	  "18a63f5512afb5573e5b44deba78d629f0635317": "Over",
	  "2a268b89b83f8cb38ea48e46e93dd8840db512f9": "Under",
	  "4f381a323fe782c731f91a730a921ef612663d8f": "Connection lost, recovering...",
	  "af145748c9cf765a3b059eec20cb1dbb899297d8": "Blocks are loaded successfully",
	  "e99811bd3b1ad17e74614060ecb180602be35ad6": "Logged you out!",
	  "5506eb6161a07356d96e91770d25d5a0f22200ef": "Conditions",
	  "8b70c504aa09cadfdc4baac6909b492d9d63db71": "Purchased",
	  "c3c49d3e838c8fe813d360aea7dc6b792948afde": "Markets",
	  "312677f238bced75f4a7998263a4cd831c007be9": "The trade block can only accept submarket blocks",
	  "7386b7aecaf7dee307dffabf3024e6fea8b3e964": "The trade block cannot be inside binary blocks",
	  "762d334c830574af86dd1fc75ce6003b0e57548c": "Submarket blocks can only accept trade type blocks",
	  "a8dc1b431f260fc1aed77d54595779c1b49c4f5b": "Submarket blocks have to be added to the trade block",
	  "9bec3db35af828e22b2b5e9702a359fa011b03e9": "Trade Type blocks have to be added to submarket blocks",
	  "b3214afd299cfa3952efc8d8853c7b5a7f340405": "does not support category:",
	  "4166e06fcdc703410a1edb28a7bcea9ed0a4bfdb": "Allowed categories are",
	  "5283ac04c9a8ba8a937d1edb4ba986aeefce8bf1": "Number of ticks must be between 5 and 10",
	  "fed3e7bd6696fb97a12d720845ab5388456bfc3b": "Prediction must be one digit",
	  "f561afb9f2cdb16af20dd7553a825e99f761d590": "must be added inside the strategy block",
	  "9a13790ed481fe5c946705cb2dc761a5252b1893": "must be added inside the finish block",
	  "aac1569ccf6b1a11b0ad0fbefdb9ffc777b4c733": "Click to select",
	  "1c89b0a9ffe86e1db3b9f926d215e57f5a7b445d": "Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "401ddc8376746eceaddf4dba5b8c91dc6d5f6fbe": ")</b> on the keyboard.",
	  "625a8ce764f231dee4f6daf9a85c097bf23a7374": "You will need to add the blocks to this area which is called the <b>workspace</b>.",
	  "535d175b893509fc05cdb56e7e2376d4bb0ae7a5": "You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.",
	  "3e2769027bf3c973c38103dcce6482586b993374": "You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.",
	  "f4bad39e0da47ce1f413083ec703c9bdb4e821bc": "To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)",
	  "befc05c5b14b4c155cea1552fc019fc100adeddb": "Great! Now add it to the <b>Define Trade</b> block.",
	  "25d5b0a626412f2ba48c10ec8a56c9efc62b5a49": "Alright! Now pick a <b>trade type</b> block.",
	  "a8ce204c869e6df24277611290801e35b787c870": "OK! Now add it to the symbol you added in the previous step.",
	  "d518cd463b95acf6b2b42414c41f19408521cd00": "Very good! It's time to add the options needed by the trade type block, pick a number",
	  "e20d6b63e449cc63246eb171e6d4368c060a60f5": "from the Math menu",
	  "80f10315585e12fc0dd2f7b7faa8a09a8034b79c": "Click on the number block to edit its value",
	  "fc8045d8d70d2ae8c31c79b57623fc59609135e7": "change the value to 5 and add it to the <b>ticks</b> field of the trade type block",
	  "6e317f95b71981900a70cb465671f1021bbbf5a8": "OK, Now add all remaining options to the trade type block",
	  "282ea251bdfda29ddf988b813e77ebb65c7d6c0d": "That's it, now you have a complete trade block with its options. It's time to define a strategy",
	  "061c155afc9f43271499f20bcce319696f4aa313": "This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.",
	  "696c77bbfeb462218ecc62ad7c3cb026357d14d2": "The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu",
	  "a4fda48ca1d26066926c0c7c007036585e797626": "For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block",
	  "40cb4329c38e75111dfcf1c3a7d53f9ec44f63d2": "Now add it to the Strategy block.",
	  "173d2a614b296045030345bbd17f49c5a36e7167": "Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.",
	  "039b5485ec321d83859b48fc91bf895e52429312": "A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.",
	  "6818232027fc3ec833d6aafc70e8814bde778205": "After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block",
	  "2eb458fc248cf538e898779cd4814e28af5db24b": "Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.",
	  "0ecb627b112c26389825381d5280f557345ab194": "A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.",
	  "6d08f40f24b29cd87eaf796ece4852012ac1a76c": "Now add it to the On Finish block",
	  "86aa77e65de8324cd6d0b7f9d5b7b74546786185": "Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.",
	  "5670fb9533116ca78adec7a1bb8bc2f77212bf73": "OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.",
	  "505f22f919520c4cd40739be12fb611c7d8b15d8": "You can use Ctrl + -/+ to zoom out/in the blocks",
	  "f49c79f5e096ac6909e0fc364980583fd20c46b6": "You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.",
	  "21fe96f872d9140d436c194537e731ef280d3810": "You can save/load your blocks using these buttons",
	  "d4ab4221f6388023bec13302714e98a84bbfb4c9": "If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo",
	  "803adad740b5756a975629ac142e7f520af7303e": "You can see the summary of your trades in this menu.",
	  "ac7be34f6a4c0ee0b7bce119b46b901c6723253c": "You can reset your blocks to their initial state.",
	  "0350a7131fa13a57dc525910b2b5f691f10ae33f": "At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.",
	  "281aee66a3d239cc45deca55a360f54fbd8fdbef": "Welcome to the binary bot, a blockly based automation tool for binary.com trades. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (",
	  "ec58d9b45b6d9d2873a67648e21affc43d4108bc": "The blocks you put in here will create a binary bot code which you can then execute using the run button.",
	  "cb5ec2c49b4eb83efeef0acf765d51003e0059af": "You can pick blocks from here to add to the workspace",
	  "832de13f8c6c6b3374ff2f2b48061902b33b0ad5": "Press Ctrl + -/+ to zoom out/in the blocks",
	  "129b4372ce84996fae10be0a001a0ca53d593737": "You need to login before running the bot.",
	  "719c817f94ff88a1f89650ba01933e35bc7d0ceb": "Use these buttons to save/load your blocks",
	  "18c372be48fb3fb91352cc721df2d256fea4e4e8": "Use these buttons to Undo/Redo changes to your blocks.",
	  "3f71217a42b6920b422b3d9a6b37c5d39cdbbf19": "Open the summary panel.",
	  "e84cfcc4f99349deba320207fafa8bad2c57c93b": "Reset your blocks.",
	  "d202d8ee13996bc1811c4ad42a4902070213f88f": "Use the run/stop buttons in this menu to run or stop your blocks.",
	  "e8077186267c1038681326ccb5ee9e7f97f8d8e5": "Good Luck!",
	  "eb1b2e79531173699a9af8e770d43db39ae8dd0d": "You have to add a submarket first",
	  "c70e6d2dae1e18a270c5932bbc604048773463de": "Ticks:",
	  "15edb47b74a0ecf67e8799087491cb5d6720ff00": "Payout:",
	  "b66c8f6ee4d73f0dba18e50ae286261a97f3bf56": "Currency:",
	  "281473c482d95cec4e27bd02ca724c2eb198afe0": "Amount:",
	  "7b6c4800c92fc89b77fdb39901052847d12caf18": "Prediction:",
	  "450f7c5ae87fc05ec200be3b2aa09706c4d003af": "Provides the trade types:",
	  "cd5f85b6f187605f82386eacd680f93820af8d11": "Result is",
	  "1e38ce3d180cefae485a6986ca7c67841e30376f": "True if the result matches the selection",
	  "130859d75b98316e103257c1f3c21832b3e80dc4": "Contract Details",
	  "011b5c3886f99f18d9239534f3423849fd75450b": "Returns the list of details for the finished contract",
	  "3405bc7f3ebe12f8558d450f889a4e96732a8cbc": "Step 3: Result",
	  "ccf476d7438b63183405e945a10a1d9aca2b9a2b": "This block decides what to do when a purchased contract is finished",
	  "5098e2bcc96ee227983c9f7eeddfd226c220ca00": "Contract Detail:",
	  "251c830f8f869e0887e8b4dc4c30ba1738c7097e": "Reads a selected option from contract details list",
	  "dc3f26688f5ef436999ab59f699bcda077e65738": "Contract Result",
	  "d645c153b95989901238e9e8b7f9bac49abd053d": "Returns the result of the finished contract",
	  "b3b543c80063a116ced4965d8537b7b62d14c0b7": "Trade Again",
	  "a1eeb7c1e92e9a5d9323ed8ebd7ca7ffed8b0232": "Runs the trade block again",
	  "30de51af8df6b6a7f6b6d26a113fa5e2eea54415": "Accepts",
	  "cc7695342b437bfe37baba92b657b8ad21b350d8": "Chooses the symbol:",
	  "e4bed3e67e58b2334ee4b9c6ce59ac7a95d80aaf": "Direction is",
	  "ad47561efb1dcbd7246d9b64487f615647fda036": "True if the direction matches the selection",
	  "05bef508aadd62bf3967dcf67d769da296f19989": "Tick Direction",
	  "230b14492d37df00d7485b303e67078db37f5369": "Returns the tick direction received by a strategy block, its value could be \"up\" if the tick is more than before, \"down\" if less than before and empty (\"\") if the tick is equal to the previous tick",
	  "160f06d4799c85021a810f68c5b517eea37a2737": "Purchase",
	  "784ba27b2e50c4862a6b9505b0efdecf7e837c5c": "Purchases a chosen contract. Accepts index to choose between the contracts.",
	  "910683f4207913f247c0d6987dd4d0ed15b8187f": "Step 2: Strategy",
	  "8ee54ad5dcb2ec7a856487ea5bb324381394987b": "This block decides what to do each time a new tick is received",
	  "88c520a73a83c8dce589b07d01da0e032241e40b": "Tick Value",
	  "ac53c550baa891c764bb707f3648d86ed115d009": "Returns the tick value received by a strategy block",
	  "802dc02469ae51067ca620ff57dfb5bdb3e524ac": "Balance:",
	  "ecb252044b5ea0f679ee78ec1a12904739e2904d": "string",
	  "53b0a1b2fadf4e040cdc2155a7340de24aca93cb": "number",
	  "c4ee8e12b2484cd5b47cdf00bfa2c50b83e91d3d": "Get balance number or string",
	  "4ed7e4dc35aee385ba2bd0078693e978f64b35f0": "Notify type:",
	  "53a5687cb26dc41f2ab4033e97e13adefd3740d6": "success",
	  "83dd9d6af43f8cbee08acd981417321e144b776b": "information",
	  "383fd7bf84aa027bdc40159c5d7c5805664a8eb2": "warning",
	  "11f9578d05e6f7bb58a3cdd00107e9f4e3882671": "error",
	  "a2d0c89fdfff3176efd4a443eb0f6607067b93e7": "Creates notification",
	  "45ebd38f4c641ebf6f72be8c3a79dfa50cf9f20e": "Total Profit",
	  "ffb465875e1ff2b49bcaa7c6b70965ffe39fa59d": "Returns the total profit",
	  "c984e8501b46a2eaa045c3cda6840b1e96bc77b5": "Step 1: Define Trade",
	  "f9319cd2e3dca2de438eb9565eb196e2dc8f04e0": "The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts."
	};

/***/ },
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["binary-live-api"] = factory();
		else
			root["binary-live-api"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 16);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		var LiveEvents = function () {
		    function LiveEvents() {
		        _classCallCheck(this, LiveEvents);
		
		        this.messageHandlers = {};
		    }
		
		    _createClass(LiveEvents, [{
		        key: 'emitSingle',
		        value: function emitSingle(msgType, msgData) {
		            var handlers = this.messageHandlers[msgType] || [];
		            handlers.forEach(function (handler) {
		                handler(msgData);
		            });
		        }
		    }, {
		        key: 'emitWildcard',
		        value: function emitWildcard(msgData) {
		            var handlers = this.messageHandlers['*'] || [];
		            handlers.forEach(function (handler) {
		                handler(msgData);
		            });
		        }
		    }, {
		        key: 'emit',
		        value: function emit(msgType, msgData) {
		            this.emitSingle(msgType, msgData);
		            this.emitWildcard(msgData);
		        }
		    }, {
		        key: 'on',
		        value: function on(msgType, callback) {
		            if (!this.messageHandlers[msgType]) {
		                this.messageHandlers[msgType] = [callback];
		            } else {
		                this.messageHandlers[msgType].push(callback);
		            }
		        }
		    }]);
		
		    return LiveEvents;
		}();
		
		exports.default = LiveEvents;
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.OAuth = exports.LiveApi = exports.LiveEvents = undefined;
		
		var _LiveEvents2 = __webpack_require__(0);
		
		var _LiveEvents3 = _interopRequireDefault(_LiveEvents2);
		
		var _LiveApi2 = __webpack_require__(2);
		
		var _LiveApi3 = _interopRequireDefault(_LiveApi2);
		
		var _OAuth2 = __webpack_require__(3);
		
		var _OAuth = _interopRequireWildcard(_OAuth2);
		
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		exports.LiveEvents = _LiveEvents3.default;
		exports.LiveApi = _LiveApi3.default;
		exports.OAuth = _OAuth;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		var _getUniqueId = __webpack_require__(14);
		
		var _getUniqueId2 = _interopRequireDefault(_getUniqueId);
		
		var _LiveEvents = __webpack_require__(0);
		
		var _LiveEvents2 = _interopRequireDefault(_LiveEvents);
		
		var _ServerError = __webpack_require__(4);
		
		var _ServerError2 = _interopRequireDefault(_ServerError);
		
		var _calls = __webpack_require__(6);
		
		var calls = _interopRequireWildcard(_calls);
		
		var _stateful = __webpack_require__(12);
		
		var stateful = _interopRequireWildcard(_stateful);
		
		var _custom = __webpack_require__(11);
		
		var customCalls = _interopRequireWildcard(_custom);
		
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		(0, _getUniqueId2.default)(); // skip 0 value
		var defaultApiUrl = 'wss://ws.binaryws.com/websockets/v3';
		var MockWebSocket = function MockWebSocket() {};
		var WebSocket = typeof window !== 'undefined' ? window.WebSocket : MockWebSocket;
		
		var shouldIgnoreError = function shouldIgnoreError(error) {
		    return error.message.includes('You are already subscribed to') || error.message.includes('Input validation failed: forget');
		};
		
		var LiveApi = function () {
		    function LiveApi() {
		        var _this = this;
		
		        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		
		        var _ref$apiUrl = _ref.apiUrl;
		        var apiUrl = _ref$apiUrl === undefined ? defaultApiUrl : _ref$apiUrl;
		        var _ref$language = _ref.language;
		        var language = _ref$language === undefined ? 'en' : _ref$language;
		        var _ref$appId = _ref.appId;
		        var appId = _ref$appId === undefined ? 0 : _ref$appId;
		        var websocket = _ref.websocket;
		        var connection = _ref.connection;
		        var keepAlive = _ref.keepAlive;
		
		        _classCallCheck(this, LiveApi);
		
		        this.apiUrl = apiUrl;
		        this.language = language;
		        this.appId = appId;
		        if (keepAlive) {
		            setInterval(function () {
		                return _this.ping();
		            }, 60 * 1000);
		        }
		
		        if (websocket) {
		            WebSocket = websocket;
		        }
		
		        this.status = LiveApi.Status.Unknown;
		
		        this.bufferedSends = [];
		        this.bufferedExecutes = [];
		        this.unresolvedPromises = {};
		
		        this.events = new _LiveEvents2.default();
		
		        this.bindCallsAndStateMutators();
		
		        this.connect(connection);
		    }
		
		    _createClass(LiveApi, [{
		        key: 'bindCallsAndStateMutators',
		        value: function bindCallsAndStateMutators() {
		            var _this2 = this;
		
		            Object.keys(calls).forEach(function (callName) {
		                _this2[callName] = function () {
		                    if (stateful[callName]) {
		                        stateful[callName].apply(stateful, arguments);
		                    }
		                    return _this2.send(calls[callName].apply(calls, arguments));
		                };
		            });
		
		            Object.keys(customCalls).forEach(function (callName) {
		                _this2[callName] = function () {
		                    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
		                        params[_key] = arguments[_key];
		                    }
		
		                    return customCalls[callName].apply(customCalls, [_this2].concat(params));
		                }; // seems to be a good place to do some simple cache
		            });
		        }
		    }, {
		        key: 'connect',
		        value: function connect(connection) {
		            var urlPlusParams = this.apiUrl + '?l=' + this.language + '&app_id=' + this.appId;
		
		            try {
		                this.socket = connection || new WebSocket(urlPlusParams);
		            } catch (err) {
		                // swallow connection error, we can't do anything about it
		            } finally {
		                this.socket.onopen = this.onOpen.bind(this);
		                this.socket.onclose = this.onClose.bind(this);
		                this.socket.onmessage = this.onMessage.bind(this);
		            }
		        }
		    }, {
		        key: 'disconnect',
		        value: function disconnect() {
		            this.token = '';
		            this.socket.onclose = undefined;
		            this.socket.close();
		        }
		    }, {
		        key: 'resubscribe',
		        value: function resubscribe() {
		            var _this3 = this;
		
		            var _stateful$getState = stateful.getState();
		
		            var token = _stateful$getState.token;
		            var balance = _stateful$getState.balance;
		            var portfolio = _stateful$getState.portfolio;
		            var transactions = _stateful$getState.transactions;
		            var ticks = _stateful$getState.ticks;
		            var proposals = _stateful$getState.proposals;
		
		
		            var delayedCallAfterAuthSuccess = function delayedCallAfterAuthSuccess() {
		                if (balance) {
		                    _this3.subscribeToBalance();
		                }
		
		                if (transactions) {
		                    _this3.subscribeToTransactions();
		                }
		
		                if (portfolio) {
		                    _this3.subscribeToAllOpenContracts();
		                }
		
		                _this3.onAuth = undefined;
		            };
		            this.onAuth = delayedCallAfterAuthSuccess;
		
		            if (token) {
		                this.authorize(token);
		            }
		
		            ticks.forEach(function (tick) {
		                return _this3.subscribeToTick(tick);
		            });
		
		            proposals.forEach(function (proposal) {
		                return _this3.subscribeToPriceForContractProposal(proposal);
		            });
		        }
		    }, {
		        key: 'changeLanguage',
		        value: function changeLanguage(ln) {
		            if (ln === this.language) {
		                return;
		            }
		            this.socket.onclose = undefined;
		            this.socket.close();
		            this.language = ln;
		            this.connect();
		            this.resubscribe();
		        }
		    }, {
		        key: 'isReady',
		        value: function isReady() {
		            return this.socket && this.socket.readyState === 1;
		        }
		    }, {
		        key: 'sendBufferedSends',
		        value: function sendBufferedSends() {
		            while (this.bufferedSends.length > 0) {
		                this.socket.send(JSON.stringify(this.bufferedSends.shift()));
		            }
		        }
		    }, {
		        key: 'executeBufferedExecutes',
		        value: function executeBufferedExecutes() {
		            while (this.bufferedExecutes.length > 0) {
		                this.bufferedExecutes.shift()();
		            }
		        }
		    }, {
		        key: 'onOpen',
		        value: function onOpen() {
		            this.sendBufferedSends();
		            this.executeBufferedExecutes();
		        }
		    }, {
		        key: 'onClose',
		        value: function onClose() {
		            this.reconnect();
		        }
		    }, {
		        key: 'reconnect',
		        value: function reconnect() {
		            this.connect();
		            this.resubscribe();
		        }
		    }, {
		        key: 'resolvePromiseForResponse',
		        value: function resolvePromiseForResponse(json) {
		            if (typeof json.req_id === 'undefined') {
		                return Promise.resolve();
		            }
		
		            var reqId = json.req_id.toString();
		            var promise = this.unresolvedPromises[reqId];
		
		            if (!promise) {
		                return Promise.resolve();
		            }
		
		            delete this.unresolvedPromises[reqId];
		            if (!json.error) {
		                return promise.resolve(json);
		            }
		
		            if (!shouldIgnoreError(json.error)) {
		                return promise.reject(new _ServerError2.default(json));
		            }
		
		            return Promise.resolve();
		        }
		    }, {
		        key: 'onMessage',
		        value: function onMessage(message) {
		            var json = JSON.parse(message.data);
		
		            if (!json.error) {
		                if (json.msg_type === 'authorize' && this.onAuth) {
		                    this.onAuth();
		                }
		                this.events.emit(json.msg_type, json);
		            } else {
		                this.events.emit('error', json);
		            }
		
		            return this.resolvePromiseForResponse(json);
		        }
		    }, {
		        key: 'generatePromiseForRequest',
		        value: function generatePromiseForRequest(json) {
		            var _this4 = this;
		
		            var reqId = json.req_id.toString();
		
		            return new Promise(function (resolve, reject) {
		                _this4.unresolvedPromises[reqId] = { resolve: resolve, reject: reject };
		            });
		        }
		    }, {
		        key: 'sendRaw',
		        value: function sendRaw(json) {
		            if (this.isReady()) {
		                this.socket.send(JSON.stringify(json));
		            } else {
		                this.bufferedSends.push(json);
		            }
		
		            if (typeof json.req_id !== 'undefined') {
		                return this.generatePromiseForRequest(json);
		            }
		        }
		    }, {
		        key: 'send',
		        value: function send(json) {
		            var reqId = (0, _getUniqueId2.default)();
		            return this.sendRaw(_extends({
		                req_id: reqId
		            }, json));
		        }
		    }, {
		        key: 'execute',
		        value: function execute(func) {
		            if (this.isReady()) {
		                func();
		            } else {
		                this.bufferedExecutes.push(func);
		            }
		        }
		    }]);
		
		    return LiveApi;
		}();
		
		LiveApi.Status = {
		    Unknown: 'unknown',
		    Connected: 'connected'
		};
		exports.default = LiveApi;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		var oauthUrl = exports.oauthUrl = function oauthUrl(appId) {
		    return 'https://www.binary.com/oauth2/authorize?app_id=' + appId;
		};
		
		var oauthUrlWithLanguage = exports.oauthUrlWithLanguage = function oauthUrlWithLanguage(appId, langCode) {
		    return 'https://www.binary.com/oauth2/authorize?app_id=' + appId + '&l=' + langCode;
		};
		
		var parseOAuthResponse = exports.parseOAuthResponse = function parseOAuthResponse(responseUrl) {
		    var matcher = /acct\d=(\w+)&token\d=([\w-]+)/g;
		    var urlParts = responseUrl.split('/redirect?');
		    if (urlParts.length !== 2) throw new Error('Not a valid url');
		
		    var params = urlParts[1].split(matcher);
		
		    var accounts = [];
		
		    for (var i = 1; i < params.length; i += 3) {
		        accounts.push({
		            account: params[i],
		            token: params[i + 1]
		        });
		    }
		
		    return accounts;
		};
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
		
		var ServerError = function (_Error) {
		    _inherits(ServerError, _Error);
		
		    function ServerError() {
		        var errorObj = arguments.length <= 0 || arguments[0] === undefined ? { error: {} } : arguments[0];
		
		        _classCallCheck(this, ServerError);
		
		        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ServerError).call(this, errorObj));
		
		        _this.stack = new Error().stack;
		        _this.error = errorObj;
		        _this.name = _this.constructor.name;
		
		        var message = errorObj.error.message;
		        var echo_req = errorObj.echo_req;
		
		        _this.message = "[ServerError] " + message + "\n" + JSON.stringify(echo_req, 2);
		        return _this;
		    }
		
		    return ServerError;
		}(Error);
		
		exports.default = ServerError;
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		var deleteApiToken = exports.deleteApiToken = function deleteApiToken(token) {
		    return {
		        api_token: 1,
		        delete_token: token
		    };
		};
		
		var getApiTokens = exports.getApiTokens = function getApiTokens() {
		    return {
		        api_token: 1
		    };
		};
		
		var createApiToken = exports.createApiToken = function createApiToken(token, scopes) {
		    return {
		        api_token: 1,
		        new_token: token,
		        new_token_scopes: scopes
		    };
		};
		
		var changePassword = exports.changePassword = function changePassword(oldPw, newPw) {
		    return {
		        change_password: 1,
		        old_password: oldPw,
		        new_password: newPw
		    };
		};
		
		var registerApplication = exports.registerApplication = function registerApplication(options) {
		    return _extends({
		        app_register: 1
		    }, options);
		};
		
		var getAllAppList = exports.getAllAppList = function getAllAppList() {
		    return {
		        app_list: 1
		    };
		};
		
		var getAppslistById = exports.getAppslistById = function getAppslistById(appid) {
		    return {
		        app_get: appid
		    };
		};
		
		var deleteApplication = exports.deleteApplication = function deleteApplication(appid) {
		    return {
		        app_delete: appid
		    };
		};
		
		var createRealAccountMaltaInvest = exports.createRealAccountMaltaInvest = function createRealAccountMaltaInvest(options) {
		    return _extends({
		        new_account_maltainvest: 1
		    }, options);
		};
		
		var createRealAccount = exports.createRealAccount = function createRealAccount(options) {
		    return _extends({
		        new_account_real: 1
		    }, options);
		};
		
		var setAccountCurrency = exports.setAccountCurrency = function setAccountCurrency(currency) {
		    return {
		        set_account_currency: currency
		    };
		};
		
		var setSelfExclusion = exports.setSelfExclusion = function setSelfExclusion(options) {
		    return _extends({
		        set_self_exclusion: 1
		    }, options);
		};
		
		var setAccountSettings = exports.setAccountSettings = function setAccountSettings(options) {
		    return _extends({
		        set_settings: 1
		    }, options);
		};
		
		var setTnCApproval = exports.setTnCApproval = function setTnCApproval() {
		    return {
		        tnc_approval: 1
		    };
		};
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _unauthenticated = __webpack_require__(10);
		
		Object.keys(_unauthenticated).forEach(function (key) {
		  if (key === "default") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _unauthenticated[key];
		    }
		  });
		});
		
		var _read = __webpack_require__(8);
		
		Object.keys(_read).forEach(function (key) {
		  if (key === "default") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _read[key];
		    }
		  });
		});
		
		var _trade = __webpack_require__(9);
		
		Object.keys(_trade).forEach(function (key) {
		  if (key === "default") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _trade[key];
		    }
		  });
		});
		
		var _payments = __webpack_require__(7);
		
		Object.keys(_payments).forEach(function (key) {
		  if (key === "default") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _payments[key];
		    }
		  });
		});
		
		var _admin = __webpack_require__(5);
		
		Object.keys(_admin).forEach(function (key) {
		  if (key === "default") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _admin[key];
		    }
		  });
		});
	
	/***/ },
	/* 7 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		var getCashierLockStatus = exports.getCashierLockStatus = function getCashierLockStatus() {
		    return {
		        cashier_password: 1
		    };
		};
		
		var setCashierLock = exports.setCashierLock = function setCashierLock(options) {
		    return _extends({
		        cashier_password: 1
		    }, options);
		};
		
		var withdrawToPaymentAgent = exports.withdrawToPaymentAgent = function withdrawToPaymentAgent(options) {
		    return _extends({
		        paymentagent_withdraw: 1
		    }, options);
		};
		
		var paymentAgentTransfer = exports.paymentAgentTransfer = function paymentAgentTransfer(options) {
		    return _extends({
		        paymentagent_transfer: 1
		    }, options);
		};
		
		var transferBetweenAccounts = exports.transferBetweenAccounts = function transferBetweenAccounts(options) {
		    return _extends({
		        transfer_between_accounts: 1
		    }, options);
		};
	
	/***/ },
	/* 8 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		var getAccountLimits = exports.getAccountLimits = function getAccountLimits() {
		    return {
		        get_limits: 1
		    };
		};
		
		var getAccountSettings = exports.getAccountSettings = function getAccountSettings() {
		    return {
		        get_settings: 1
		    };
		};
		
		var getAccountStatus = exports.getAccountStatus = function getAccountStatus() {
		    return {
		        get_account_status: 1
		    };
		};
		
		var getSelfExclusion = exports.getSelfExclusion = function getSelfExclusion() {
		    return {
		        get_self_exclusion: 1
		    };
		};
		
		var logOut = exports.logOut = function logOut() {
		    return {
		        logout: 1
		    };
		};
		
		var getStatement = exports.getStatement = function getStatement(options) {
		    return _extends({
		        statement: 1
		    }, options);
		};
		
		var getPortfolio = exports.getPortfolio = function getPortfolio() {
		    return {
		        portfolio: 1
		    };
		};
		
		var getProfitTable = exports.getProfitTable = function getProfitTable(options) {
		    return _extends({
		        profit_table: 1
		    }, options);
		};
		
		var getRealityCheckSummary = exports.getRealityCheckSummary = function getRealityCheckSummary() {
		    return {
		        reality_check: 1
		    };
		};
		
		var subscribeToBalance = exports.subscribeToBalance = function subscribeToBalance() {
		    return {
		        balance: 1,
		        subscribe: 1
		    };
		};
		
		var unsubscribeFromBalance = exports.unsubscribeFromBalance = function unsubscribeFromBalance() {
		    return {
		        balance: 1,
		        subscribe: 0
		    };
		};
		
		var subscribeToOpenContract = exports.subscribeToOpenContract = function subscribeToOpenContract(contractId) {
		    return {
		        proposal_open_contract: 1,
		        subscribe: 1,
		        contract_id: contractId
		    };
		};
		
		var getContractInfo = exports.getContractInfo = function getContractInfo(contractId) {
		    return {
		        proposal_open_contract: 1,
		        contract_id: contractId
		    };
		};
		
		var subscribeToAllOpenContracts = exports.subscribeToAllOpenContracts = function subscribeToAllOpenContracts() {
		    return {
		        proposal_open_contract: 1,
		        subscribe: 1
		    };
		};
		
		var unsubscribeFromAllOpenContracts = exports.unsubscribeFromAllOpenContracts = function unsubscribeFromAllOpenContracts() {
		    return {
		        proposal_open_contract: 1,
		        subscribe: 0
		    };
		};
		
		var subscribeToTransactions = exports.subscribeToTransactions = function subscribeToTransactions() {
		    return {
		        transaction: 1,
		        subscribe: 1
		    };
		};
		
		var unsubscribeFromTransactions = exports.unsubscribeFromTransactions = function unsubscribeFromTransactions() {
		    return {
		        transaction: 1,
		        subscribe: 0
		    };
		};
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		var buyContract = exports.buyContract = function buyContract(contractId, price) {
		    return {
		        buy: contractId,
		        price: price
		    };
		};
		
		var sellContract = exports.sellContract = function sellContract(contractId, price) {
		    return {
		        sell: contractId,
		        price: price
		    };
		};
		
		var sellExpiredContracts = exports.sellExpiredContracts = function sellExpiredContracts() {
		    return {
		        sell_expired: 1
		    };
		};
		
		var topUpVirtualAccount = exports.topUpVirtualAccount = function topUpVirtualAccount() {
		    return {
		        topup_virtual: 1
		    };
		};
	
	/***/ },
	/* 10 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		var getActiveSymbolsBrief = exports.getActiveSymbolsBrief = function getActiveSymbolsBrief() {
		    return {
		        active_symbols: 'brief'
		    };
		};
		
		var getActiveSymbolsFull = exports.getActiveSymbolsFull = function getActiveSymbolsFull() {
		    return {
		        active_symbols: 'full'
		    };
		};
		
		var getAssetIndex = exports.getAssetIndex = function getAssetIndex() {
		    return {
		        asset_index: 1
		    };
		};
		
		var authorize = exports.authorize = function authorize(token) {
		    return {
		        authorize: token
		    };
		};
		
		var getContractsForSymbol = exports.getContractsForSymbol = function getContractsForSymbol(symbol) {
		    return {
		        contracts_for: symbol
		    };
		};
		
		var unsubscribeFromTick = exports.unsubscribeFromTick = function unsubscribeFromTick(symbol) {
		    return {
		        forget: symbol
		    };
		};
		
		var unsubscribeFromTicks = exports.unsubscribeFromTicks = function unsubscribeFromTicks(symbols) {
		    return symbols.forEach(undefined.unsubscribeFromTick);
		};
		
		var unsubscribeByID = exports.unsubscribeByID = function unsubscribeByID(id) {
		    return {
		        forget: id
		    };
		};
		
		var unsubscribeFromAllTicks = exports.unsubscribeFromAllTicks = function unsubscribeFromAllTicks() {
		    return {
		        forget_all: 'ticks'
		    };
		};
		
		var unsubscribeFromAllProposals = exports.unsubscribeFromAllProposals = function unsubscribeFromAllProposals() {
		    return {
		        forget_all: 'proposal'
		    };
		};
		
		var unsubscribeFromAllPortfolios = exports.unsubscribeFromAllPortfolios = function unsubscribeFromAllPortfolios() {
		    return {
		        forget_all: 'portfolio'
		    };
		};
		
		var unsubscribeFromAlProposals = exports.unsubscribeFromAlProposals = function unsubscribeFromAlProposals() {
		    return {
		        forget_all: 'proposal_open_contract'
		    };
		};
		
		var getLandingCompany = exports.getLandingCompany = function getLandingCompany(landingCompany) {
		    return {
		        landing_company: landingCompany
		    };
		};
		
		var getLandingCompanyDetails = exports.getLandingCompanyDetails = function getLandingCompanyDetails(landingCompany) {
		    return {
		        landing_company_details: landingCompany
		    };
		};
		
		var createVirtualAccount = exports.createVirtualAccount = function createVirtualAccount(options) {
		    return _extends({
		        new_account_virtual: 1
		    }, options);
		};
		
		var ping = exports.ping = function ping() {
		    return {
		        ping: 1
		    };
		};
		
		var getPaymentAgentsForCountry = exports.getPaymentAgentsForCountry = function getPaymentAgentsForCountry(countryCode) {
		    return {
		        paymentagent_list: countryCode
		    };
		};
		
		var getPayoutCurrencies = exports.getPayoutCurrencies = function getPayoutCurrencies() {
		    return {
		        payout_currencies: 1
		    };
		};
		
		var getPriceProposalForContract = exports.getPriceProposalForContract = function getPriceProposalForContract(options) {
		    return _extends({
		        proposal: 1
		    }, options);
		};
		
		var subscribeToPriceForContractProposal = exports.subscribeToPriceForContractProposal = function subscribeToPriceForContractProposal(options) {
		    return _extends({
		        proposal: 1,
		        subscribe: 1
		    }, options);
		};
		
		var getResidences = exports.getResidences = function getResidences() {
		    return {
		        residence_list: 1
		    };
		};
		
		var getStatesForCountry = exports.getStatesForCountry = function getStatesForCountry(countryCode) {
		    return {
		        states_list: countryCode
		    };
		};
		
		var subscribeToTick = exports.subscribeToTick = function subscribeToTick(symbol) {
		    return {
		        ticks: symbol
		    };
		};
		
		var subscribeToTicks = exports.subscribeToTicks = function subscribeToTicks(symbols) {
		    return {
		        ticks: symbols
		    };
		};
		
		var getTickHistory = exports.getTickHistory = function getTickHistory(symbol, options) {
		    return _extends({
		        ticks_history: symbol
		    }, options || { end: 'latest' });
		};
		
		var getCandles = exports.getCandles = function getCandles(symbol, options) {
		    return _extends({
		        ticks_history: symbol,
		        style: 'candles'
		    }, options || { end: 'latest' });
		};
		
		var getCandlesForLastNDays = exports.getCandlesForLastNDays = function getCandlesForLastNDays(symbol, ndays) {
		    return {
		        ticks_history: symbol,
		        style: 'candles',
		        start: Math.floor(Date.now() / 1000) - (ndays - 1) * 60 * 60 * 24,
		        end: 'latest',
		        granularity: 60 * 60 * 24,
		        count: 30
		    };
		};
		
		var getServerTime = exports.getServerTime = function getServerTime() {
		    return {
		        time: 1
		    };
		};
		
		var getTradingTimes = exports.getTradingTimes = function getTradingTimes(date) {
		    return {
		        trading_times: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		    };
		};
		
		var verifyEmail = exports.verifyEmail = function verifyEmail(email, type) {
		    return {
		        verify_email: email,
		        type: type
		    };
		};
		
		var getWebsiteStatus = exports.getWebsiteStatus = function getWebsiteStatus() {
		    return {
		        website_status: 1
		    };
		};
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		exports.getDataForSymbol = getDataForSymbol;
		exports.getDataForContract = getDataForContract;
		
		var _nowAsEpoch = __webpack_require__(15);
		
		var _nowAsEpoch2 = _interopRequireDefault(_nowAsEpoch);
		
		var _durationToSecs = __webpack_require__(13);
		
		var _durationToSecs2 = _interopRequireDefault(_durationToSecs);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var responseSizeLimit = 700;
		
		var granularities = [60, 120, 180, 300, 600, 900, 1800, 3600, 7200, 14400, 28800, 86400];
		var ohlcDataToTicks = function ohlcDataToTicks(candles) {
		    return candles.map(function (data) {
		        return { quote: +data.open, epoch: +data.epoch };
		    });
		};
		var hcUnitConverter = function hcUnitConverter(type) {
		    switch (type) {
		        case 'second':
		            return 's';
		        case 'minute':
		            return 'm';
		        case 'hour':
		            return 'h';
		        case 'day':
		            return 'd';
		        default:
		            return 'd';
		    }
		};
		
		var autoAdjustGetData = function autoAdjustGetData(api, symbol, start, end) {
		    var style = arguments.length <= 4 || arguments[4] === undefined ? 'ticks' : arguments[4];
		    var subscribe = arguments[5];
		    var extra = arguments.length <= 6 || arguments[6] === undefined ? {} : arguments[6];
		
		    var secs = end - start;
		    var ticksCount = secs / 2;
		    if (ticksCount >= responseSizeLimit || style === 'candles') {
		        var _ret = function () {
		            var idealGranularity = secs / responseSizeLimit;
		            var finalGranularity = 60;
		            granularities.forEach(function (g, i) {
		                if (idealGranularity > g && idealGranularity <= granularities[i + 1]) {
		                    finalGranularity = granularities[i + 1];
		                }
		            });
		            finalGranularity = Math.min(86400, finalGranularity);
		            return {
		                v: api.getTickHistory(symbol, {
		                    start: start,
		                    end: end,
		                    adjust_start_time: 1,
		                    count: responseSizeLimit,
		                    style: 'candles',
		                    granularity: finalGranularity,
		                    subscribe: subscribe ? 1 : undefined
		                }).then(function (r) {
		                    if (style === 'ticks') {
		                        return _extends({}, extra, {
		                            ticks: ohlcDataToTicks(r.candles),
		                            symbol: symbol
		                        });
		                    }
		                    return _extends({}, extra, {
		                        candles: r.candles,
		                        symbol: symbol
		                    });
		                })
		            };
		        }();
		
		        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		    }
		    return api.getTickHistory(symbol, {
		        start: start,
		        end: end,
		        adjust_start_time: 1,
		        count: responseSizeLimit,
		        style: 'ticks',
		        subscribe: subscribe ? 1 : undefined
		    }).then(function (r) {
		        var ticks = r.history.times.map(function (t, idx) {
		            var quote = r.history.prices[idx];
		            return { epoch: +t, quote: +quote };
		        });
		        return _extends({}, extra, {
		            ticks: ticks,
		            symbol: symbol
		        });
		    });
		};
		
		/**
		 *
		 * @param api
		 * @param symbol
		 * @param durationCount
		 * @param durationType
		 */
		function getDataForSymbol(api, symbol) {
		    var durationCount = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
		    var durationType = arguments.length <= 3 || arguments[3] === undefined ? 'all' : arguments[3];
		    var style = arguments.length <= 4 || arguments[4] === undefined ? 'ticks' : arguments[4];
		    var subscribe = arguments[5];
		
		    var durationUnit = hcUnitConverter(durationType);
		    var end = (0, _nowAsEpoch2.default)();
		    var start = end - (0, _durationToSecs2.default)(durationCount, durationUnit);
		    return autoAdjustGetData(api, symbol, start, end, style, subscribe);
		}
		
		/**
		 * get data of contract
		 * @param api                      - will be injected by library
		 * @param getContract              - function that accept nothing and return a Promise containing contract
		 * @param durationCount            - number of duration
		 * @param durationType             - type of duration, check http://api.highcharts.com/highstock#rangeSelector.buttons
		 * @param style                    - one of ['ticks', 'candles'], this will affect the return data shape,
		 *                                   internally library might not always use this param when requesting, eg. when data is too large,
		 *                                   library will use `candles` instead of `ticks`, this is handle by library so user do not need to worry
		 * @param granularity              - default to 60, check https://developers.binary.com/api/#ticks_history
		 * @returns {*|Promise.<TResult>}
		 */
		function getDataForContract(api, getContract, durationCount) {
		    var durationType = arguments.length <= 3 || arguments[3] === undefined ? 'all' : arguments[3];
		    var style = arguments.length <= 4 || arguments[4] === undefined ? 'ticks' : arguments[4];
		    var subscribe = arguments[5];
		
		    var getAllData = function getAllData() {
		        return getContract().then(function (contract) {
		            var symbol = contract.underlying;
		            if (contract.tick_count) {
		                var _start = +contract.date_start - 5;
		                var exitTime = +contract.exit_tick_time + 5;
		                var _end = exitTime || (0, _nowAsEpoch2.default)();
		                return autoAdjustGetData(api, symbol, _start, _end, style, subscribe, { isSold: !!contract.sell_time });
		            }
		
		            var bufferSize = 0.05; // 5 % buffer
		            var contractStart = +contract.date_start;
		            var contractEnd = +contract.exit_tick_time || +contract.date_expiry;
		
		            // handle Contract not started yet
		            if (contractStart > (0, _nowAsEpoch2.default)()) {
		                return autoAdjustGetData(api, symbol, (0, _nowAsEpoch2.default)() - 600, (0, _nowAsEpoch2.default)(), style, subscribe);
		            }
		
		            var buffer = (contractEnd - contractStart) * bufferSize;
		            var start = buffer ? contractStart - buffer : contractStart;
		            var bufferedExitTime = contractEnd + buffer;
		            var end = contractEnd ? bufferedExitTime : (0, _nowAsEpoch2.default)();
		
		            return autoAdjustGetData(api, symbol, Math.round(start), Math.round(end), style, subscribe, { isSold: !!contract.sell_time });
		        });
		    };
		
		    if (durationType === 'all') {
		        return getAllData();
		    }
		
		    return getContract().then(function (contract) {
		        var symbol = contract.underlying;
		        var startTime = +contract.date_start;
		
		        // handle Contract not started yet
		        if (startTime > (0, _nowAsEpoch2.default)()) {
		            return autoAdjustGetData(api, symbol, (0, _nowAsEpoch2.default)() - 600, (0, _nowAsEpoch2.default)(), style, subscribe, { isSold: !!contract.sell_time });
		        }
		
		        var sellT = contract.sell_time;
		        var end = sellT || (0, _nowAsEpoch2.default)();
		
		        var buffer = (end - startTime) * 0.05;
		
		        var durationUnit = hcUnitConverter(durationType);
		        var start = Math.min(startTime - buffer, end - (0, _durationToSecs2.default)(durationCount, durationUnit));
		        return autoAdjustGetData(api, symbol, Math.round(start), Math.round(end), style, subscribe, { isSold: !!contract.sell_time });
		    });
		}
	
	/***/ },
	/* 12 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
		
		var getInitialState = function getInitialState() {
		    return {
		        token: '',
		        balance: false,
		        portfolio: false,
		        transactions: false,
		        ticks: new Set(),
		        proposals: new Set()
		    };
		};
		
		var state = getInitialState();
		
		var resetState = exports.resetState = function resetState() {
		    state = getInitialState();
		};
		
		var getState = exports.getState = function getState() {
		    return state;
		};
		
		var authorize = exports.authorize = function authorize(token) {
		    state.token = token;
		};
		
		var subscribeToBalance = exports.subscribeToBalance = function subscribeToBalance() {
		    state.balance = true;
		};
		
		var unsubscribeFromBalance = exports.unsubscribeFromBalance = function unsubscribeFromBalance() {
		    state.balance = false;
		};
		
		// export const subscribeToOpenContract = contractId => {
		//     state.portfolio.add(contractId);
		// };
		
		var subscribeToAllOpenContracts = exports.subscribeToAllOpenContracts = function subscribeToAllOpenContracts() {
		    state.portfolio = true;
		};
		
		var unsubscribeFromAllOpenContracts = exports.unsubscribeFromAllOpenContracts = function unsubscribeFromAllOpenContracts() {
		    state.portfolio = false;
		};
		
		var subscribeToTransactions = exports.subscribeToTransactions = function subscribeToTransactions() {
		    state.transactions = true;
		};
		
		var unsubscribeFromTransactions = exports.unsubscribeFromTransactions = function unsubscribeFromTransactions() {
		    state.transactions = false;
		};
		
		var subscribeToTick = exports.subscribeToTick = function subscribeToTick(symbol) {
		    state.ticks.add(symbol);
		};
		
		var subscribeToTicks = exports.subscribeToTicks = function subscribeToTicks(symbols) {
		    var _state$ticks;
		
		    (_state$ticks = state.ticks).add.apply(_state$ticks, _toConsumableArray(symbols));
		};
		
		var unsubscribeFromTick = exports.unsubscribeFromTick = function unsubscribeFromTick(symbol) {
		    state.ticks.delete(symbol);
		};
		
		var unsubscribeFromAllTicks = exports.unsubscribeFromAllTicks = function unsubscribeFromAllTicks() {
		    state.ticks.clear();
		};
		
		var subscribeToPriceForContractProposal = exports.subscribeToPriceForContractProposal = function subscribeToPriceForContractProposal(options) {
		    state.proposals.add(options);
		};
		
		var unsubscribeFromAllProposals = exports.unsubscribeFromAllProposals = function unsubscribeFromAllProposals() {
		    state.proposals.clear();
		};
	
	/***/ },
	/* 13 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		exports.default = function (duration, unit) {
		    switch (unit) {
		        case 's':
		            return 1 * duration;
		        case 'm':
		            return 60 * duration;
		        case 'h':
		            return 3600 * duration;
		        case 'd':
		            return 86400 * duration;
		        default:
		            return undefined;
		    }
		};
	
	/***/ },
	/* 14 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var uniqueId = 0;
		
		exports.default = function () {
		  return uniqueId++;
		};
	
	/***/ },
	/* 15 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		exports.default = function () {
		    return Math.floor(Date.now() / 1000);
		};
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(1);
	
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=binary-live-api.js.map

/***/ },
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LiveApi = __webpack_require__(334).LiveApi;
	var storageManager = __webpack_require__(302);
	
	module.exports = {
		addTokenIfValid: function addTokenIfValid(token, callback) {
			var api;
			if ( typeof WebSocket === 'undefined' ) {
				api = new LiveApi({websocket: __webpack_require__(339)});
			} else {
				api = new LiveApi();
			}
			api.authorize(token)
				.then(function (response) {
					api.disconnect();
					storageManager.addToken(token, response.authorize.loginid, response.authorize.is_virtual);
					if (callback) {
						callback(null);
					}
				}, function (reason) {
					api.disconnect();
					storageManager.removeToken(token);
					if (callback) {
						callback('Error');
					}
				});
		},
		logoutAllTokens: function logoutAllTokens(callback) {
			var api;
			if ( typeof WebSocket === 'undefined' ) {
				api = new LiveApi({websocket: __webpack_require__(339)});
			} else {
				api = new LiveApi();
			}
			var tokenList = storageManager.getTokenList();
			var token = tokenList[0].token;
			api.authorize(token)
				.then(function (response) {
					storageManager.removeAllTokens();
					api.logOut().then(function(){
						api.disconnect();
						if ( callback ) {
							callback();
						}
					});
				}, function reject(response){
					if ( response.error && response.error.code === 'InvalidToken' ) {
						api.disconnect();
						storageManager.removeAllTokens();
						if ( callback ) {
							callback();
						}
					}
				});
		}
	};


/***/ },
/* 339 */
/***/ function(module, exports) {

	module.exports = ws;

/***/ },
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _tools = __webpack_require__(306);
	
	var _tools2 = _interopRequireDefault(_tools);
	
	var _account = __webpack_require__(338);
	
	var _account2 = _interopRequireDefault(_account);
	
	var _storageManager = __webpack_require__(302);
	
	var _storageManager2 = _interopRequireDefault(_storageManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AppId = {
		setAppId: function setAppId() {
			var appId = 0;
			if (document.location.port === '8080') {
				appId = 1168; // binary bot on localhost
			} else if (document.location.hostname.indexOf('github.io') >= 0) {
				appId = 1180; // binary bot github.io
			} else if (document.location.pathname.indexOf('/beta') >= 0) {
				appId = 1261; // binary bot beta
			} else {
				appId = 1169; // binary bot 
			}
			_storageManager2.default.set('appId', appId);
		},
		oauthLogin: function getToken(done) {
			var queryStr = _tools2.default.parseQueryString();
			var tokenList = [];
			Object.keys(queryStr).forEach(function (key) {
				if (key.indexOf('token') === 0) {
					tokenList.push(queryStr[key]);
				}
			});
			if (tokenList.length) {
				$('#main').hide();
				_tools2.default.asyncForEach(tokenList, function (token, index, next) {
					_account2.default.addTokenIfValid(token, function () {
						next();
					});
				}, function () {
					document.location = 'bot.html';
				});
			} else {
				if (done) {
					done();
				}
			}
		}
	};
	
	module.exports = AppId;

/***/ },
/* 421 */,
/* 422 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-05-20T17:23Z
	 */
	
	(function( global, factory ) {
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];
	
	var document = window.document;
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var support = {};
	
	
	
	var
		version = "2.2.4",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
	
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
	
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// Start with an empty selector
		selector: "",
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?
	
				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :
	
				// Return all the elements in a clean array
				slice.call( this );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor();
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
	
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
	
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {
	
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend( {
	
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
	
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},
	
		isPlainObject: function( obj ) {
			var key;
	
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}
	
			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}
	
			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}
	
			return key === undefined || hasOwn.call( obj, key );
		},
	
		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
	
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;
	
			code = jQuery.trim( code );
	
			if ( code ) {
	
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
	
					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval
	
					indirect( code );
				}
			}
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		each: function( obj, callback ) {
			var length, i = 0;
	
			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );
	
	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */
	
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );
	
	function isArrayLike( obj ) {
	
		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
	
		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
		rescape = /'|\\/g,
	
		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,
	
			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;
	
		results = results || [];
	
		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
	
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;
	
			if ( documentIsHTML ) {
	
				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
	
					// ID selector
					if ( (m = match[1]) ) {
	
						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {
	
								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
	
						// Element context
						} else {
	
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {
	
								results.push( elem );
								return results;
							}
						}
	
					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
	
					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {
	
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
	
				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	
					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;
	
					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {
	
						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}
	
						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );
	
						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}
	
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");
	
		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );
	
		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
	
			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});
	
		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];
	
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return document;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {
	
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
	
								// Seek `elem` from a previously-cached index
	
								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});
	
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
	
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});
	
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});
	
									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}
	
								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
	
										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {
	
											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});
	
												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});
	
												uniqueCache[ type ] = [ dirruns, diff ];
											}
	
											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},
	
			"disabled": function( elem ) {
				return elem.disabled === true;
			},
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
	
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
	
							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}
	
				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;
	
				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {
	
			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	
	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;
	
		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};
	
	
	var siblings = function( n, elem ) {
		var matched = [];
	
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}
	
		return matched;
	};
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
	
		}
	
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
	
		}
	
		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}
	
			qualifier = jQuery.filter( qualifier, elements );
		}
	
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};
	
	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	
		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {
	
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
	
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );
	
						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
	
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}
	
						this.context = document;
						this.selector = selector;
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
	
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;
	
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
	
					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :
	
						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {
	
						matched.push( cur );
						break;
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );
	
	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
	
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );
	
	
	
	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );
	
		var // Flag to know if list is currently firing
			firing,
	
			// Last fire value for non-forgettable lists
			memory,
	
			// Flag to know if list was already fired
			fired,
	
			// Flag to prevent firing
			locked,
	
			// Actual callback list
			list = [],
	
			// Queue of execution data for repeatable lists
			queue = [],
	
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
	
			// Fire callbacks
			fire = function() {
	
				// Enforce single-firing
				locked = options.once;
	
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {
	
						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {
	
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
	
				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}
	
				firing = false;
	
				// Clean up if we're done firing for good
				if ( locked ) {
	
					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];
	
					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
	
			// Actual Callbacks object
			self = {
	
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
	
						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}
	
						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {
	
									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );
	
						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
	
							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},
	
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},
	
				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},
	
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
	
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
	
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
	
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	jQuery.extend( {
	
		Deferred: function( func ) {
			var tuples = [
	
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
	
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
	
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Keep pipe for back-compat
			promise.pipe = promise.then;
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];
	
				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add( function() {
	
						// state = [ resolved | rejected ]
						state = stateString;
	
					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}
	
				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,
	
				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
	
				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	
				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},
	
				progressValues, progressContexts, resolveContexts;
	
			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}
	
			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}
	
			return deferred.promise();
		}
	} );
	
	
	// The deferred used on DOM ready
	var readyList;
	
	jQuery.fn.ready = function( fn ) {
	
		// Add the callback
		jQuery.ready.promise().done( fn );
	
		return this;
	};
	
	jQuery.extend( {
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
	
			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );
	
	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}
	
	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {
	
			readyList = jQuery.Deferred();
	
			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );
	
			} else {
	
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );
	
				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};
	
	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
	
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}
	
		return chainable ?
			elems :
	
			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {
	
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	
	
	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	
	Data.prototype = {
	
		register: function( owner, initial ) {
			var value = initial || {};
	
			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;
	
			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {
	
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}
	
			// Check if the owner object already has a cache
			var value = owner[ this.expando ];
	
			// If not, create one
			if ( !value ) {
				value = {};
	
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {
	
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;
	
					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}
	
			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );
	
			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
	
				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;
	
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {
	
				stored = this.get( owner, key );
	
				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}
	
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];
	
			if ( cache === undefined ) {
				return;
			}
	
			if ( key === undefined ) {
				this.register( owner );
	
			} else {
	
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
	
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
	
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
	
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}
	
				i = name.length;
	
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
	
			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
	
				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();
	
	var dataUser = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
	
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}
	
				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );
	
	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );
	
					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}
	
			return access( this, function( value ) {
				var data, camelKey;
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
	
					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||
	
						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );
	
					if ( data !== undefined ) {
						return data;
					}
	
					camelKey = jQuery.camelCase( key );
	
					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {
	
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );
	
					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );
	
					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );
	
	
	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );
	
	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}
	
			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
	
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
	
	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
	
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHidden = function( elem, el ) {
	
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};
	
	
	
	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );
	
		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
	
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];
	
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
	
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
	
			do {
	
				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";
	
				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );
	
			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}
	
		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
	
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );
	
	var rtagName = ( /<([\w:-]+)/ );
	
	var rscriptType = ( /^$|\/(?:java|ecma)script/i );
	
	
	
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
	
		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
		_default: [ 0, "", "" ]
	};
	
	// Support: IE9
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	
	function getAll( context, tag ) {
	
		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}
	
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	
	var rhtml = /<|&#?\w+;/;
	
	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			elem = elems[ i ];
	
			if ( elem || elem === 0 ) {
	
				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
	
					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );
	
				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
	
					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
	
					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}
	
					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );
	
					// Remember the top-level container
					tmp = fragment.firstChild;
	
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
	
		// Remove wrapper from fragment
		fragment.textContent = "";
	
		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {
	
			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}
	
			contains = jQuery.contains( elem.ownerDocument, elem );
	
			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );
	
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}
	
			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}
	
		return fragment;
	}
	
	
	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;
	
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
	
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
	
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}
	
		if ( data == null && fn == null ) {
	
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
	
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
	
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}
	
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
	
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
	
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {
	
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
	
			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},
	
		dispatch: function( event ) {
	
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );
	
			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}
	
			return handlerQueue;
		},
	
		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),
	
		fixHooks: {},
	
		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {
	
				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}
	
				return event;
			}
		},
	
		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;
	
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
	
					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}
	
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}
	
				return event;
			}
		},
	
		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}
	
			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];
	
			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
			event = new jQuery.Event( originalEvent );
	
			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}
	
			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}
	
			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}
	
			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},
	
		special: {
			load: {
	
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
	
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
	
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	
		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};
	
	jQuery.Event = function( src, props ) {
	
		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
	
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );
	
	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
	
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
	
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
	
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );
	
	
	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
	
		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
	
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?
	
			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}
	
		return elem;
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			dataUser.set( dest, udataCur );
		}
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	function domManip( collection, args, callback, ignored ) {
	
		// Flatten any nested arrays
		args = concat.apply( [], args );
	
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );
	
		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}
	
		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;
	
			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}
	
			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;
	
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;
	
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );
	
						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
	
							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}
	
					callback.call( collection[ i ], node, i );
				}
	
				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;
	
					// Reenable scripts
					jQuery.map( scripts, restoreScript );
	
					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {
	
							if ( node.src ) {
	
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}
	
		return collection;
	}
	
	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;
	
		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}
	
			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}
	
		return elem;
	}
	
	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},
	
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
	
						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {
	
						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );
	
	jQuery.fn.extend( {
	
		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,
	
		detach: function( selector ) {
			return remove( this, selector, true );
		},
	
		remove: function( selector ) {
			return remove( this, selector );
		},
	
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},
	
		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},
	
		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},
	
		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},
	
		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = jQuery.htmlPrefilter( value );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var ignored = [];
	
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;
	
				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}
	
			// Force callback invocation
			}, ignored );
		}
	} );
	
	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	} );
	
	
	var iframe,
		elemdisplay = {
	
			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};
	
	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
	
			display = jQuery.css( elem[ 0 ], "display" );
	
		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();
	
		return display;
	}
	
	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];
	
		if ( !display ) {
			display = actualDisplay( nodeName, doc );
	
			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {
	
				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );
	
				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;
	
				// Support: IE
				doc.write();
				doc.close();
	
				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}
	
			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}
	
		return display;
	}
	var rmargin = ( /^margin/ );
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
	
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;
	
			if ( !view || !view.opener ) {
				view = window;
			}
	
			return view.getComputedStyle( elem );
		};
	
	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	var documentElement = document.documentElement;
	
	
	
	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}
	
		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =
	
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );
	
			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";
	
			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";
	
			documentElement.removeChild( container );
		}
	
		jQuery.extend( support, {
			pixelPosition: function() {
	
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
	
				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
	
				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {
	
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );
	
				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
	
					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );
	
				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );
	
				documentElement.removeChild( container );
				div.removeChild( marginDiv );
	
				return ret;
			}
		} );
	} )();
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;
	
		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}
	
		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
	
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
	
			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
	
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
	
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}
	
	
	var
	
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}
	
	function setPositiveNumber( elem, value, subtract ) {
	
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?
	
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
	
			// If we already have the right measurement, avoid augmentation
			4 :
	
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
	
			val = 0;
	
		for ( ; i < 4; i += 2 ) {
	
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
	
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
	
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
	
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}
	
			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;
	
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
	
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}
	
				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );
	
				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}
	
		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}
	
		return elements;
	}
	
	jQuery.extend( {
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );
	
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}
	
				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {
	
					style[ name ] = value;
				}
	
			} else {
	
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
	
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );
	
	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);
	
				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {
	
					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}
	
				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );
	
	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);
	
	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );
	
	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
	
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
	
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back Compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );
	
		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always( function() {
	
				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}
	
		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
	
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );
	
			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;
	
			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	
		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
	
			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}
	
		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}
	
			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;
	
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
	
				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}
	
		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {
	
				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ] );
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
	
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilters: [ defaultPrefilter ],
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
	
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {
	
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );
	
	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );
	
	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
	
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		window.clearInterval( timerId );
	
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
	
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};
	
	
	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;
	
		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();
	
	
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );
	
	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}
	
			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}
	
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				elem.setAttribute( name, value + "" );
				return value;
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			ret = jQuery.find.attr( elem, name );
	
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
	
		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;
	
					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
	
						// Set corresponding property to false
						elem[ propName ] = false;
					}
	
					elem.removeAttribute( name );
				}
			}
		}
	} );
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
	
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
	
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	
	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );
	
	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				return ( elem[ name ] = value );
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			return elem[ name ];
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
	
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );
	
					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},
	
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );
	
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	
	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );
	
	
	
	
	var rclass = /[\t\r\n\f]/g;
	
	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}
	
	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
	
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
	
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}
	
			return this.each( function() {
				var className, i, self, classNames;
	
				if ( type === "string" ) {
	
					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];
	
					while ( ( className = classNames[ i++ ] ) ) {
	
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {
	
						// Store className if set
						dataPriv.set( this, "__className__", className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},
	
		hasClass: function( selector ) {
			var className, elem,
				i = 0;
	
			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}
	
			return false;
		}
	} );
	
	
	
	
	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;
	
	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}
	
					ret = elem.value;
	
					return typeof ret === "string" ?
	
						// Handle most common string cases
						ret.replace( rreturn, "" ) :
	
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each( function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );
	
	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {
	
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
	
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
	
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );
	
	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
	
	jQuery.extend( jQuery.event, {
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "." ) > -1 ) {
	
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);
	
			jQuery.event.trigger( e, null, elem );
		}
	
	} );
	
	jQuery.fn.extend( {
	
		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );
	
	
	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );
	
	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );
	
	
	
	
	support.focusin = "onfocusin" in window;
	
	
	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );
	
					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;
	
	var nonce = jQuery.now();
	
	var rquery = ( /\?/ );
	
	
	
	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
	
				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {
	
					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
	
					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
	
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
	
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
	
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
	
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend( {
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
	
				// URL without anti-cache param
				cacheURL,
	
				// Response headers
				responseHeadersString,
				responseHeaders,
	
				// timeout handle
				timeoutTimer,
	
				// Url cleanup var
				urlAnchor,
	
				// To know if global events are to be dispatched
				fireGlobals,
	
				// Loop variable
				i,
	
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
	
				// Callbacks context
				callbackContext = s.context || s,
	
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,
	
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
	
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
	
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
	
				// The jqXHR state
				state = 0,
	
				// Default abort message
				strAbort = "canceled",
	
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
	
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
	
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
	
			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
	
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );
	
				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
	
					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
	
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
	
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?
	
						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :
	
						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
	
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
	
				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}
	
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
	
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
	
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Called once
				if ( state === 2 ) {
					return;
				}
	
				// State is "done" now
				state = 2;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
	
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
	
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,
	
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};
	
	
	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;
	
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}
	
			if ( this[ 0 ] ) {
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map( function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				} ).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}
	
			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			} );
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},
	
		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );
	
	
	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {
	
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};
	
	
	
	
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
	
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
	
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
	
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
	
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
	
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
	
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};
	
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );
	
		} else {
	
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};
	
	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {
	
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();
	
				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};
	
	var xhrSuccessStatus = {
	
			// File protocol always yields status code 0, assume 200
			0: 200,
	
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();
	
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
	
									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(
	
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
	
										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );
	
					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
	
							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {
	
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}
	
					// Create the abort callback
					callback = callback( "abort" );
	
					try {
	
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
	
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
	
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// Force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always( function() {
	
				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );
	
				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}
	
				// Save back as free
				if ( s[ callbackName ] ) {
	
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			} );
	
			// Delegate to script
			return "script";
		}
	} );
	
	
	
	
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;
	
		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}
	
		parsed = buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	// Keep a copy of the old load method
	var _load = jQuery.fn.load;
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}
	
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );
	
		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,
	
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );
	
	
	
	
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};
	
	
	
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
	
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}
	
			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;
	
			if ( !doc ) {
				return;
			}
	
			docElem = doc.documentElement;
	
			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}
	
			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
	
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
	
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;
	
				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || documentElement;
			} );
		}
	} );
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );
	
	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
	
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {
	
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
	
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
	
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );
	
	
	jQuery.fn.extend( {
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
	
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );
	
	jQuery.fn.andSelf = jQuery.fn.addBack;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	var
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	
	return jQuery;
	}));


/***/ }
/******/ ]);
//# sourceMappingURL=index-403b5864d9bb68d1cb6b.map