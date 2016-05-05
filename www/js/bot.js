/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Bot = {};
	var translator = __webpack_require__(1); // must be on top
	var i18n = __webpack_require__(3);
	translator.Translator(function(){
		Bot.config = __webpack_require__(11);
		Bot.globals = __webpack_require__(12);
		Bot.utils = __webpack_require__(14);
		Bot.version = __webpack_require__(16);
		Bot.conditions = __webpack_require__(17);
		Bot.markets = __webpack_require__(18);
		Bot.trade = __webpack_require__(19);
		Bot.toggleDebug = __webpack_require__(12).toggleDebug;
		var view = __webpack_require__(22); 
	  $('[data-i18n-text]').each(function(){
	    $(this).text(i18n._($(this).attr('data-i18n-text')));
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	var i18n = __webpack_require__(3);
	var sha1 = __webpack_require__(4);
	// handle language in localStorage and query string
	var supportedLanguages = ['zh_tw', 'de', 'id', 'zh_cn', 'it', 'vi', 'ar', 'pl', 'ru', 'pt', 'es', 'fr', 'en'];
	var parseQueryString = function parseQueryString() {
		var str = window.location.search;
		var objURL = {};
		str.replace(
			new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
			function( $0, $1, $2, $3 ){
				objURL[ $1 ] = $3;
			}
		);
		return objURL;
	};
	$('#language').change(function change(e){
		localStorage.lang = e.target.value;
		window.location.search = '?l=' + e.target.value;
	});
	var queryStr = parseQueryString();
	if ( queryStr.hasOwnProperty('l') && queryStr.l !== '' && supportedLanguages.indexOf(queryStr.l) >= 0 ) {
		window.lang = queryStr.l;
		localStorage.lang = queryStr.l;
	} else if (localStorage.lang){
		window.lang = localStorage.lang;
	} else {
		window.lang = 'en';
	}
	$('#language').val(window.lang);
	// end of handling language

	// define the _ function for i18n
	i18n._ = function _(str, opt){
		var key = sha1(str);
		var result = i18n.t(key);
		return (result === '') ? str : result;
	};

	// to include script tag in html without warning
	$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
		options.async = true;
	});

	// definition of the xml function for i18n
	i18n.xml = function xml(dom){
		for ( var i in dom.children ) {
			if ( dom.children.hasOwnProperty(i) && !isNaN(+i) ) {
				var child = dom.children[i];
				var str = child.getAttribute('i18n-text');
				var key;
				var hasTranslation = false;
				if ( str === null ) {
					key = child.getAttribute('i18n');
					if ( key !== null ) {
						hasTranslation = true;
					}
				} else {
					key = sha1(str);
					hasTranslation = true;
				}
				var result = i18n.t(key);
				if ( hasTranslation ) {
					child.setAttribute('name', (result === '') ? str : result);
				}
				if ( child.children.length > 0 ) {
					i18n.xml(child);
				}
			}
		}
		return dom;
	};

	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	var blocklyLang;
	if ( lang === 'zh_tw' ) {
		blocklyLang = 'zh-hant';
	} else if ( lang === 'zh_cn' ) {
		blocklyLang = 'zh-hans';
	} else {
		blocklyLang = lang;
	}
	script.src = 'node_modules/blockly/msg/js/' + blocklyLang + '.js';
	$('body').append(script);

	module.exports = {
		Translator: function Translator(callback){
			// load the language file (this should not be called en)
			$.get('www/i18n/' + lang + '.json', function(translation) {
				var resources = {
					en: {
						translation: translation
					},
				};
				i18n.init({
					lng: 'en',
					fallbackLng: 'en',
					ns: [
						'translation'
					],
					defaultNS: [
						'translation'
					],
					resources: resources
				}, function() {
					callback();
				});
			});
		},
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = i18next;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {(function() {
	  var crypt = __webpack_require__(9),
	      utf8 = __webpack_require__(10).utf8,
	      bin = __webpack_require__(10).bin,

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(6)
	var ieee754 = __webpack_require__(7)
	var isArray = __webpack_require__(8)

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer, (function() { return this; }())))

/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var i18n = __webpack_require__(3);
	module.exports = {
		lists: {
			PAYOUTTYPE: [
				[i18n._('Payout'), 'payout'],
				[i18n._('Stake'), 'stake']
			],
			CURRENCY: [
				['USD', 'USD'],
				['EUR', 'EUR'],
				['GBP', 'GBP'],
				['AUD', 'AUD']
			],
			DETAILS: [
				[i18n._('statement'), '1'],
				[i18n._('ask price'), '2'],
				[i18n._('payout'), '3'],
				[i18n._('profit'), '4'],
				[i18n._('contract type'), '5'],
				[i18n._('entry spot'), '6'],
				[i18n._('entry value'), '7'],
				[i18n._('exit spot'), '8'],
				[i18n._('exit value'), '9'],
				[i18n._('barrier'), '10'],
			],
			CHECK_RESULT: [
				[i18n._('Win'), 'win'],
				[i18n._('Loss'), 'loss'],
			],
			CHECK_DIRECTION: [
				[i18n._('Up'), 'up'],
				[i18n._('Down'), 'down'],
				[i18n._('No Change'), ''],
			],
		},

		opposites: {
			UPDOWN: [{
				'CALL': i18n._('Up')
			}, {
				'PUT': i18n._('Down')
			}],
			ASIAN: [{
				'ASIANU': i18n._('Asian Up')
			}, {
				'ASIAND': i18n._('Asian Down')
			}],
			MATCHESDIFFERS: [{
				'DIGITMATCH': i18n._('Matches')
			}, {
				'DIGITDIFF': i18n._('Differs')
			}],
			EVENODD: [{
				'DIGITEVEN': i18n._('Even')
			}, {
				'DIGITODD': i18n._('Odd')
			}],
			OVERUNDER: [{
				'DIGITOVER': i18n._('Over')
			}, {
				'DIGITUNDER': i18n._('Under')
			}],
		},

		opposites_have_barrier: [
			'MATCHESDIFFERS',
			'OVERUNDER',
		],

		conditions: ['updown', 'asian', 'matchesdiffers', 'evenodd', 'overunder'],
		ticktrade_markets: ['r_25', 'r_50', 'r_75', 'r_100', 'rdbear', 'rdbull'],
		ticktrade_market_names: [i18n._('Volatility 25 Index'), i18n._('Volatility 50 Index'), i18n._('Volatility 75 Index'), i18n._('Volatility 100 Index'), i18n._('Bear Market Index'), i18n._('Bull Market Index')],
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	var $ = __webpack_require__(2);
	var i18n = __webpack_require__(3);
	var debug = false;
	var logQueue = [];

	var on_finish = function () {};
	var on_strategy = function () {};

	var tour = null;

	var accounts = [
		[i18n._('Please add a token first'), '']
	];
	var purchase_choices = [
		[i18n._('Click to select'), '']
	];


	var tradeInfo = {
		numOfRuns: 0,
		totalProfit: '',
		totalPayout: '',
		totalStake: '',
		lastProfit: '',
		lastResult: '',
		balance: '',
		tradeTable: [],
		tradesCount: 10000,
		tableSize: 5,
	};

	var initialTradeInfo = {};

	var copyObjectKeys = function copyObjectKeys(obj1, obj2) {
		$.extend(obj1, JSON.parse(JSON.stringify(obj2)));
	};

	copyObjectKeys(initialTradeInfo, tradeInfo);

	var resetTradeInfo = function resetTradeInfo() {
		copyObjectKeys(tradeInfo, initialTradeInfo);
		updateTradeInfo();
		showTradeInfo();
	};

	var updateTradeInfo = function updateTradeInfo() {
		Object.keys(tradeInfo)
			.forEach(function (key) {
				$('.' + key)
					.text(tradeInfo[key]);
				if (key === 'totalProfit' || key === 'lastProfit') {
					if (+tradeInfo[key] > 0) {
						$('.' + key)
							.css('color', 'green');
					} else if (+tradeInfo[key] < 0) {
						$('.' + key)
							.css('color', 'red');
					} else {
						$('.' + key)
							.css('color', 'black');
					}
				}
			});
	};

	var undoBlocks = function undoBlocks() {
		blockly.mainWorkspace.undo();
	};

	var redoBlocks = function redoBlocks() {
		blockly.mainWorkspace.undo(true);
	};

	var addTradeInfo = function addTradeInfo(trade) {
		trade.number = tradeInfo.numOfRuns;
		// tradeInfo.tradeTable.reverse(); //reverse the table row growth
		if (tradeInfo.tradeTable.length > tradeInfo.tradesCount) {
			tradeInfo.tradeTable.shift();
		}
		tradeInfo.tradeTable.push(trade);
		// tradeInfo.tradeTable.reverse();
		showTradeInfo();
	};

	var showTradeInfo = function showTradeInfo() {
		$('#tradesDisplay tbody')
			.children()
			.remove();
		var count = 0;
		tradeInfo.tradeTable.forEach(function (trade, index) {
			var lastProfit = +(+trade.sell_price - (+trade.buy_price))
				.toFixed(2);
			var element = '<tr>' + '<td>' + trade.number + '</td>' + '<td>' + trade.transaction_ids.buy + '</td>' + '<td>' + trade.contract_type + '</td>' + '<td>' + trade.entry_tick + '</td>' + '<td>' + trade.exit_tick + '</td>' + '<td>' + trade.buy_price + '</td>' + '<td>' + trade.sell_price + '</td>' + '<td>' + lastProfit + '</td>' + '</tr>';
			$('#tradesDisplay tbody')
				.append(element);
			count += 1;
		});
		for (var i = count; i < tradeInfo.tableSize; i += 1) {
			var element = '<tr>';
			for (var j = 0; j < 8; j += 1) {
				element += '<td></td>';
			}
			element += '</tr>';
			$('#tradesDisplay tbody')
				.append(element);
		}
		$('.table-scroll')
			.scrollTop($('.table-scroll')[0].scrollHeight);
	};

	var toggleDebug = function toggleDebug() {
		debug = !debug;
		if (debug) {
			logQueue.forEach(function (log) {
				console.log.apply(console, log);
			});
			logQueue = [];
		}
	};

	var addLogToQueue = function addLogToQueue() {
		logQueue.push(Array.prototype.slice.apply(arguments));
	};

	var isDebug = function isDebug() {
		return debug;
	};

	var disableRun = function disableRun(disabled) {
		$('#runButton')
			.prop('disabled', disabled);
	};

	module.exports = {
		tradeInfo: tradeInfo,
		resetTradeInfo: resetTradeInfo,
		updateTradeInfo: updateTradeInfo,
		undoBlocks: undoBlocks,
		redoBlocks: redoBlocks,
		addTradeInfo: addTradeInfo,
		showTradeInfo: showTradeInfo,
		toggleDebug: toggleDebug,
		addLogToQueue: addLogToQueue,
		isDebug: isDebug,
		accounts: accounts,
		purchase_choices: purchase_choices,
		disableRun: disableRun,
		on_finish: on_finish,
		on_strategy: on_strategy,
		tour: tour,
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = Blockly;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	var storageManager = __webpack_require__(15);
	var globals = __webpack_require__(12);
	var config = __webpack_require__(11);
	var i18n = __webpack_require__(3);

	var getUTCTime = function getUTCTime(date) {
		var dateObject = new Date(date);
		return ('0' + dateObject.getUTCHours())
			.slice(-2) + ':' + ('0' + dateObject.getUTCMinutes())
			.slice(-2) + ':' + ('0' + dateObject.getUTCSeconds())
			.slice(-2);
	};

	var showError = function showError(error) {
		if (error.stack) {
			if (globals.isDebug()) {
				console.log('%c' + error.stack, 'color: red');
			} else {
				globals.addLogToQueue('%c' + error.stack, 'color: red');
			}
		}
		var message;
		if (error.message) {
			message = error.message;
		} else {
			message = error;
		}
		$.notify(message, {
			position: 'bottom right',
			className: 'error',
		});
		if (globals.isDebug()) {
			console.log('%cError: ' + message, 'color: red');
		} else {
			globals.addLogToQueue('%cError: ' + message, 'color: red');
		}
	};

	var log = function log(message, notify_type, position) {
		if (notify_type !== undefined) {
			$.notify(message, {
				position: (position === undefined) ? 'bottom right' : position,
				className: notify_type,
			});
		}
		if (globals.isDebug()) {
			console.log(message);
		} else {
			globals.addLogToQueue(message);
		}
	};

	var broadcast = function broadcast(eventName, data) {
		window.dispatchEvent(new CustomEvent(eventName, {
			detail: data
		}));
	};

	var findTopParentBlock = function findTopParentBlock(block) {
		var pblock = block.parentBlock_;
		if (pblock === null) {
			return null;
		}
		while (pblock !== null) {
			block = pblock;
			pblock = block.parentBlock_;
		}
		return block;
	};

	var updateTokenList = function updateTokenList(tokenToAdd) {
		var tokenList = storageManager.getTokenList();
		blockly.WidgetDiv.hideIfOwner(blockly.mainWorkspace.getBlockById('trade')
			.getField('ACCOUNT_LIST'));
		if (tokenList.length === 0) {
			globals.accounts = [
				[i18n._('Please add a token first'), '']
			];
			blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.setValue('');
			blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.setText(i18n._('Please add a token first'));
		} else {
			globals.accounts = [];
			tokenList.forEach(function (tokenInfo) {
				globals.accounts.push([tokenInfo.account_name, tokenInfo.token]);
			});
			var tokenInfoToAdd = tokenList[0];
			if (tokenToAdd !== undefined) {
				var tokenInfoIndex = storageManager.findToken(tokenToAdd);
				if (tokenInfoIndex >= 0) {
					tokenInfoToAdd = tokenList[tokenInfoIndex];
				}
			}
			if (blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.getValue() !== tokenInfoToAdd.token) {
				blockly.mainWorkspace.getBlockById('trade')
					.getField('ACCOUNT_LIST')
					.setValue(tokenInfoToAdd.token);
			}
			if (blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.getText() !== tokenInfoToAdd.account_name) {
				blockly.mainWorkspace.getBlockById('trade')
					.getField('ACCOUNT_LIST')
					.setText(tokenInfoToAdd.account_name);
			}
		}
	};

	var addPurchaseOptions = function addPurchaseOptions() {
		var firstOption = {};
		var secondOption = {};
		var trade = blockly.mainWorkspace.getBlockById('trade');
		if (trade !== null && trade.getInputTargetBlock('SUBMARKET') !== null && trade.getInputTargetBlock('SUBMARKET')
			.getInputTargetBlock('CONDITION') !== null) {
			var condition_type = trade.getInputTargetBlock('SUBMARKET')
				.getInputTargetBlock('CONDITION')
				.type;
			var opposites = config.opposites[condition_type.toUpperCase()];
			globals.purchase_choices = [];
			opposites.forEach(function (option, index) {
				if (index === 0) {
					firstOption = {
						condition: Object.keys(option)[0],
						name: option[Object.keys(option)[0]],
					};
				} else {
					secondOption = {
						condition: Object.keys(option)[0],
						name: option[Object.keys(option)[0]],
					};
				}
				globals.purchase_choices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
			});
			var purchases = [];
			blockly.mainWorkspace.getAllBlocks()
				.forEach(function (block) {
					if (block.type === 'purchase') {
						purchases.push(block);
					}
				});
			purchases.forEach(function (purchase) {
				var value = purchase.getField('PURCHASE_LIST')
					.getValue();
				blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'));
				if (value === firstOption.condition) {
					purchase.getField('PURCHASE_LIST')
						.setText(firstOption.name);
				} else if (value === secondOption.condition) {
					purchase.getField('PURCHASE_LIST')
						.setText(secondOption.name);
				} else {
					purchase.getField('PURCHASE_LIST')
						.setValue(firstOption.condition);
					purchase.getField('PURCHASE_LIST')
						.setText(firstOption.name);
				}
			});
		}
	};

	module.exports = {
		showError: showError,
		log: log,
		getUTCTime: getUTCTime,
		broadcast: broadcast,
		findTopParentBlock: findTopParentBlock,
		updateTokenList: updateTokenList,
		addPurchaseOptions: addPurchaseOptions,
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	var getTokenList = function getTokenList() {
		if (!localStorage.hasOwnProperty('tokenList')) {
			localStorage.tokenList = JSON.stringify([]);
		}
		return JSON.parse(localStorage.tokenList);
	};

	var findToken = function findToken(token) {
		var tokenList = getTokenList();
		var index = -1;
		tokenList.forEach(function (tokenInfo, i) {
			if (tokenInfo.token === token) {
				index = i;
			}
		});
		return index;
	};

	var setTokenList = function setTokenList(tokenList) {
		localStorage.tokenList = JSON.stringify(tokenList);
	};

	var addToken = function addToken(token, account_name) {
		var tokenList = getTokenList();
		var index = findToken(token);
		if (index < 0) {
			tokenList.push({
				account_name: account_name,
				token: token
			});
			setTokenList(tokenList);
		}
	};
	var removeToken = function removeToken(token) {
		var tokenList = getTokenList();
		var index = findToken(token);
		if (index > -1) {
			tokenList.splice(index, 1);
			setTokenList(tokenList);
		}
	};
	var removeAllTokens = function removeAllTokens() {
		delete localStorage.tokenList;
	};
	var isDone = function isDone(varName) {
		return localStorage.hasOwnProperty(varName);
	};
	var setDone = function setDone(varName) {
		localStorage[varName] = true;
	};
	var setNotDone = function setNotDone(varName) {
		delete localStorage[varName];
	};
	module.exports = {
		getTokenList: getTokenList,
		findToken: findToken,
		setTokenList: setTokenList,
		addToken: addToken,
		removeToken: removeToken,
		removeAllTokens: removeAllTokens,
		isDone: isDone,
		setDone: setDone,
		setNotDone: setNotDone,
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(12);
	var version = '1.1.6';
	if (globals.debug) {
		console.log('%cBinary Bot (v' + version + ') started.', 'color: green');
	} else {
		globals.addLogToQueue('%cBinary Bot (v' + version + ') started.', 'color: green');
	}
	module.exports = version;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(11);
	module.exports = {
		ticktrade: function ticktrade(parameters) {
			var options = [];
			var opposites = config.opposites[parameters.condition];
			opposites.forEach(function (option) {
				var option_name = Object.keys(option)[0];
				var option_data = {
					'amount': parameters.amount,
					'basis': parameters.payouttype,
					'contract_type': option_name,
					'currency': parameters.currency,
					'duration': parameters.duration,
					'duration_unit': 't',
				};
				if (parameters.hasOwnProperty('barrier')) {
					option_data.barrier = parameters.barrier;
				}
				options.push(option_data);
			});

			return options;
		}
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(11);
	var trade = __webpack_require__(19);
	var markets = {};
	markets.volatility = {};
	config.ticktrade_markets.forEach(function (market) {
		markets.volatility[market] = function (options) {
			var symbol = market.toUpperCase();

			trade.setSymbol(symbol);
			options.forEach(function (option) {
				option.symbol = symbol;
			});

			var submarket = function submarket(cb) {
				trade.submitProposal(options[0]);
				trade.submitProposal(options[1]);
			};

			return submarket;
		};
	});
	module.exports = markets;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(12);
	var utils = __webpack_require__(14);
	var storageManager = __webpack_require__(15);
	var i18n = __webpack_require__(3);
	var LiveApi = __webpack_require__(20);
	var BinaryCharts = __webpack_require__(21);
	var showError = utils.showError;
	var log = utils.log;
	var api = new LiveApi();
	var ticks = [];
	var contractForChart = null;
	var symbol;
	var purchasedContractId;
	var strategyEnabled;
	var balance;
	var balance_currency;
	var contracts;
	var authorizeCallback;
	var lastAuthorized;
	var token;
	var chart;

	// influences display, calls on_finish
	var on_contract_finish = function on_contract_finish(contract) {
		var result = (+contract.sell_price === 0) ? 'loss' : 'win';
		globals.addTradeInfo(contract);
		globals.tradeInfo.lastProfit = +(+contract.sell_price - +contract.buy_price)
			.toFixed(2);
		globals.tradeInfo.totalStake = +(+globals.tradeInfo.totalStake + (+contract.buy_price))
			.toFixed(2);
		globals.tradeInfo.totalPayout = +(+globals.tradeInfo.totalPayout + (+contract.sell_price))
			.toFixed(2);
		globals.tradeInfo.totalProfit = +(+globals.tradeInfo.totalProfit + (+globals.tradeInfo.lastProfit))
			.toFixed(2);
		globals.tradeInfo.lastResult = result;
		globals.updateTradeInfo();

		var detail_list = [
			contract.transaction_ids.buy, +contract.buy_price, +contract.sell_price,
			globals.tradeInfo.lastProfit,
			contract.contract_type, +contract.entry_tick,
			utils.getUTCTime(new Date(parseInt(contract.entry_tick_time + '000'))), +contract.exit_tick,
			utils.getUTCTime(new Date(parseInt(contract.exit_tick_time + '000'))), +((contract.barrier) ? contract.barrier : 0),
		];

		log(i18n._('Purchase was finished, result is:') + ' ' + result, (result === 'win') ? 'success' : 'error');

		globals.on_finish(result, detail_list);
		on_contract_update(contract);
		purchasedContractId = null;
		contractForChart = null;
		globals.disableRun(false);
	};

	var updateChart = function updateChart() {
		var contract;
		if (checkBought(contractForChart)) {
			contract = {
				barrier: contractForChart.barrier,
				entry_tick_time: contractForChart.entry_tick_time,
				contract_type: contractForChart.contract_type,
			};
			if (contractForChart.exit_tick_time) {
				contract.exit_tick_time = contractForChart.exit_tick_time;
			} else {
				contract.date_expiry = contractForChart.date_expiry;
			}
		}
		if ( !chart ) {
			chart = BinaryCharts('chart', {
				ticks: [],
				pipSize: 2,
			});
		}
		chart.updateChart({
			ticks: ticks,
			contract: contract,
			pipSize: 2,
		});
	};

	var on_contract_update = function on_contract_update(contract) {
		contractForChart = contract;
		updateChart();
	};

	var callStrategy = function callStrategy() {
		if (strategyEnabled) {
			var direction = '';
			if (ticks.length > 1) {
				if (+ticks.slice(-1)[0].quote > +ticks.slice(-2)
					.quote) {
					direction = 'up';
				} else if (+ticks.slice(-1)[0].quote < +ticks.slice(-2)
					.quote) {
					direction = 'down';
				}
			}
			globals.on_strategy(+ticks.slice(-1)[0].quote, direction);
		}
	};

	var getTotalProfit = function getTotalProfit() {
		return +globals.tradeInfo.totalProfit;
	};

	var getBalance = function getBalance(balance_type) {
		if (!isNaN(parseFloat(balance))) {
			return (balance_type === 'NUM') ? parseFloat(balance) : balance_currency + ' ' + parseFloat(balance);
		} else {
			return 0;
		}
	};

	var findToken = function findToken(token) {
		var index = -1;
		globals.accounts.forEach(function (tokenInfo, i) {
			if (tokenInfo[1] === token) {
				index = i;
			}
		});
		return index;
	};

	var removeToken = function removeToken(token) {
		storageManager
			.removeToken(token);
		utils.updateTokenList();
	};

	var logout = function logout() {
		storageManager
			.removeAllTokens();
		utils.updateTokenList();
		log(i18n._('Logged you out!'), 'info');
	};

	var addAccount = function addAccount(token) {
		var index = findToken(token);
		if (index >= 0) {
			log(i18n._('Token already added.'), 'info');
			return;
		}
		if (token === '') {
			showError(i18n._('Token cannot be empty'));
		} else if (token !== null) {
			var api = new LiveApi();
			api.authorize(token)
				.then(function (response) {
					api.disconnect();
					storageManager
						.addToken(token, response.authorize.loginid);
					utils.updateTokenList(token);
					log(i18n._('Your token was added successfully'), 'info');
				}, function (reason) {
					api.disconnect();
					removeToken(token);
					showError(i18n._('Authentication failed using token:') + ' ' + token);
				});
		}
	};

	var updateBalance = function updateBalance(data) {
		balance = data.balance;
		balance_currency = data.currency;
		globals.tradeInfo.balance = balance_currency + ' ' + parseFloat(balance);
		globals.updateTradeInfo();
	};

	var requestBalance = function requestBalance() {
		api.send({
				balance: 1,
			})
			.then(function (response) {
				updateBalance(response.balance);
			}, function (reason) {
				log(i18n._('Could not get balance'));
			});
	};

	var observeTicks = function observeTicks() {
		api.events.on('tick', function (feed) {
			log(i18n._('tick received at:') + ' ' + feed.tick.epoch);
			ticks = ticks.concat({
				epoch: +feed.tick.epoch,
				quote: +feed.tick.quote,
			});
			updateChart();
			callStrategy();
		});

		api.events.on('history', function (feed) {
			ticks = [];
			feed.history.times.forEach(function (time, index) {
				ticks.push({
					epoch: +time,
					quote: +feed.history.prices[index]
				});
			});
		});
	};

	var requestHistory = function requestHistory() {
		api.getTickHistory(symbol, {
				"end": "latest",
				"count": 600,
				"subscribe": 1
			})
			.then(function (value) {
				log(i18n._('Request received for history'));
			}, function (reason) {
				log(reason);
				reconnect();
			});
	};

	var requestTransaction = function requestTransaction() {
		api.subscribeToTransactions();
	};

	var observeTransaction = function observeTransaction() {
		api.events.on('transaction', function (response) {
			var transaction = response.transaction;
			updateBalance(transaction);
			if (transaction.contract_id === purchasedContractId) {
				if (transaction.action === 'buy') {
					api.unsubscribeFromAllProposals()
						.then(function () {
							contracts = [];
						});
				} else if (transaction.action === 'sell') {
					getContractInfo();
				}
			}
		});
	};

	var checkBought = function checkBought(contract) {
		return (contract !== null && (!contract.hasOwnProperty('is_sold') || contract.is_sold === 1));
	};

	var observeOpenContracts = function observeOpenContracts() {
		api.events.on('proposal_open_contract', function (response) {
			var contract = response.proposal_open_contract;
			if (!contract.is_expired || contract.is_valid_to_sell) {
				if (checkBought(contract)) {
					on_contract_update(contract);
				}
			}
		});
	};

	var observeProposal = function observeProposal(options) {
		api.events.on('proposal', function (value) {
			if (contracts.length === 2) {
				contracts = [];
				strategyEnabled = false;
			}
			contracts.push(value);
			if (contracts.length === 2) {
				log(i18n._('Contracts are ready to be purchased by the strategy'), 'info');
				strategyEnabled = true;
			}
		});
	};

	var submitProposal = function submitProposal(options) {
		api.subscribeToPriceForContractProposal(options)
			.then(function (value) {}, function (reason) {
				stop();
				showError(reason);
			});
	};

	var getContractInfo = function getContractInfo(callback) {
		api.send({
				proposal_open_contract: 1,
				contract_id: purchasedContractId,
			})
			.then(function (response) {
				var contract = response.proposal_open_contract;
				if (contract.is_expired) {
					on_contract_finish(contract);
					if (callback) {
						callback(contract);
					}
				}
			}, function (reason) {
				showError(reason);
				reconnect();
			});
	};

	var purchase = function purchase(option) {
		strategyEnabled = false;
		var proposalContract = (option === contracts[1].echo_req.contract_type) ? contracts[1] : contracts[0];
		log(i18n._('Purchased') + ': ' + proposalContract.proposal.longcode, 'info');
		api.buyContract(proposalContract.proposal.id, proposalContract.proposal.ask_price)
			.then(function (purchaseContract) {
				purchasedContractId = purchaseContract.buy.contract_id;
				api.subscribeToOpenContract(purchasedContractId);
				globals.tradeInfo.numOfRuns++;
				globals.updateTradeInfo();
				globals.disableRun(true);
			}, function (reason) {
				stop();
				showError(reason);
			});
	};

	var restartContracts = function restartContracts() {
		strategyEnabled = false;
		api.unsubscribeFromAllProposals()
			.then(function (response) {
				authorizeCallback();
			}, function (reason) {
				showError(reason);
			});
	};

	var observeAuthorize = function observeAuthorize() {
		api.events.on('authorize', function (response) {
			if (response.error) {
				showError(response.error);
			} else {
				var now = parseInt((new Date()
					.getTime()) / 1000);
				if (lastAuthorized === undefined || now - lastAuthorized >= 1) { // prevent live-api to call this many times in case of disconnect
					lastAuthorized = now;
					log(i18n._('Authenticated using token:') + ' ' + token, 'info');
					if (purchasedContractId) {
						getContractInfo(function () {
							restartContracts();
						});
					} else {
						restartContracts();
					}
					requestBalance();
					requestHistory();
					requestTransaction();
				}
			}
		});
	};

	var reconnect = function reconnect() {
		stop();
		api.token = token;
		api.connect();
		api.authorize(token);
	};

	var stop = function stop() {
		if (api) {
			try {
				api.disconnect();
			} catch (e) {}
		}
	};

	var setSymbol = function setSymbol(_symbol) {
		symbol = _symbol;
	};

	var trade = function trade(_token, callback, trade_again) {
		if (token === '') {
			showError(i18n._('No token is available to authenticate'));
		} else {
			authorizeCallback = callback;
			purchasedContractId = null;
			globals.disableRun(false);
			contracts = [];
			if (trade_again) {
				restartContracts();
			} else {
				token = _token;
				stop();
				api = new LiveApi();
				observeTicks();
				observeProposal();
				observeTransaction();
				observeOpenContracts();
				observeAuthorize();
				api.authorize(token);
			}
		}
	};

	module.exports = {
		addAccount: addAccount,
		stop: stop,
		logout: logout,
		getTotalProfit: getTotalProfit,
		getBalance: getBalance,
		submitProposal: submitProposal,
		purchase: purchase,
		setSymbol: setSymbol,
		trade: trade,
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = window["binary-live-api"].LiveApi;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = window["binary-charts"].PlainChart;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(14);
	var globals = __webpack_require__(12);
	var storageManager = __webpack_require__(15);
	var blockly = __webpack_require__(13);
	__webpack_require__(23);
	__webpack_require__(41);
	__webpack_require__(60);
	var trade = __webpack_require__(19);
	var i18n = __webpack_require__(3);
	var workspace;
	var activeTutorial = null;
	var tours = {}; // e

	$.get('www/xml/toolbox.xml', function (toolbox) {
		workspace = blockly.inject('blocklyDiv', {
			media: 'node_modules/blockly/media/',
			toolbox: i18n.xml(toolbox.getElementsByTagName('xml')[0]),
			zoom: {
				controls: true,
				wheel: false,
				startScale: 1.0,
				maxScale: 3,
				minScale: 0.3,
				scaleSpeed: 1.2
			},
			trashcan: true,
		});
		$.get('www/xml/main.xml', function (main) {
			blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace);
			blockly.mainWorkspace.getBlockById('trade')
				.setDeletable(false);
			blockly.mainWorkspace.getBlockById('strategy')
				.setDeletable(false);
			blockly.mainWorkspace.getBlockById('finish')
				.setDeletable(false);
			utils.updateTokenList();
			utils.addPurchaseOptions();
			blockly.mainWorkspace.clearUndo();
			tours.introduction = __webpack_require__(61);
			tours.welcome = __webpack_require__(62);
			tours.welcome.welcome();
		});
	});

	var handleFileSelect = function handleFileSelect(e) {
		var files;
		if (e.type === 'drop') {
			e.stopPropagation();
			e.preventDefault();
			files = e.dataTransfer.files;
		} else {
			files = e.target.files;
		}
		files = Array.prototype.slice.apply(files);
		var file = files[0];
		if (file) {
			if (file.type.match('text/xml')) {
				readFile(file);
			} else {
				utils.log(i18n._('File is not supported:' + ' ') + file.name, 'info');
			}
		}
	};

	var readFile = function readFile(f) {
		reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				try {
					blockly.mainWorkspace.clear();
					var xml = blockly.Xml.textToDom(e.target.result);
					blockly.Xml.domToWorkspace(xml, blockly.mainWorkspace);
					utils.addPurchaseOptions();
					var tokenList = storageManager
						.getTokenList();
					if (tokenList.length !== 0) {
						blockly.mainWorkspace.getBlockById('trade')
							.getField('ACCOUNT_LIST')
							.setValue(tokenList[0].token);
						blockly.mainWorkspace.getBlockById('trade')
							.getField('ACCOUNT_LIST')
							.setText(tokenList[0].account_name);
					}
					blockly.mainWorkspace.clearUndo();
					blockly.mainWorkspace.zoomToFit();
					utils.log(i18n._('Blocks are loaded successfully'), 'success');
				} catch (err) {
					utils.showError(err);
				}
			};
		})(f);
		reader.readAsText(f);
	};

	var handleDragOver = function handleDragOver(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	};

	var dropZone = document.getElementById('drop_zone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);
	document.getElementById('files')
		.addEventListener('change', handleFileSelect, false);

	$('#tutorialButton')
		.bind('click', startTutorial);
	$('#stopButton')
		.text(i18n._('Reset'));
	$('#stopButton')
		.bind('click', reset);

	$('#summaryPanel .exitPanel')
		.click(function () {
			$(this)
				.parent()
				.hide();
		});

	$('#summaryPanel')
		.hide();

	$('#summaryPanel')
		.drags();

	$('#chart')
		.mousedown(function (e) { // prevent chart to trigger draggable
			e.stopPropagation();
		});

	$('table')
		.mousedown(function (e) { // prevent tables to trigger draggable
			e.stopPropagation();
		});

	globals.showTradeInfo();

	var uiComponents = {
		tutorialList: '.tutorialList',
		logout: '.logout',
		workspace_inside: 'svg > .blocklyWorkspace > .blocklyBlockCanvas',
		workspace: '.blocklyWorkspace',
		toolbox: '.blocklyToolboxDiv',
		file_management: '.intro-file-management',
		token: '.intro-token',
		run_stop: '.intro-run-stop',
		trash: '.blocklyTrash',
		undo_redo: '.intro-undo-redo',
		summary: '.intro-summary',
		center: '#center',
		flyout: '.blocklyFlyoutBackground',
		submarket: ".blocklyDraggable:contains('Submarket'):last",
		strategy: ".blocklyDraggable:contains('Strategy'):last",
		finish: ".blocklyDraggable:contains('Finish'):last",
	};

	var doNotHide = ['center', 'flyout', 'workspace_inside', 'trash', 'submarket', 'strategy', 'finish'];

	var getUiComponent = function getUiComponent(component) {
		return $(uiComponents[component]);
	};

	var addAccount = function addAccount() {
		var token = prompt(i18n._('Please enter your token here:'), '');
		trade.addAccount(token);
	};

	var saveXml = function saveXml(showOnly) {
		var xmlDom = blockly.Xml.workspaceToDom(blockly.mainWorkspace);
		Array.prototype.slice.apply(xmlDom.getElementsByTagName('field'))
			.forEach(function (field) {
				if (field.getAttribute('name') === 'ACCOUNT_LIST') {
					if (field.childNodes.length >= 1) {
						field.childNodes[0].nodeValue = '';
					}
				}
			});
		Array.prototype.slice.apply(xmlDom.getElementsByTagName('block'))
			.forEach(function (block) {
				switch (block.getAttribute('type')) {
				case 'trade':
					block.setAttribute('id', 'trade');
					break;
				case 'on_strategy':
					block.setAttribute('id', 'strategy');
					break;
				case 'on_finish':
					block.setAttribute('id', 'finish');
					break;
				default:
					block.removeAttribute('id');
					break;
				}
			});
		var xmlText = blockly.Xml.domToPrettyText(xmlDom);
		if (showOnly) {
			utils.log(xmlText);
		} else {
			var filename = 'binary-bot' + parseInt(new Date()
				.getTime() / 1000) + '.xml';
			var blob = new Blob([xmlText], {
				type: 'text/xml;charset=utf-8'
			});
			saveAs(blob, filename);
		}
	};

	var showCode = function showCode() {
		// Generate JavaScript code and display it.
		try {
			blockly.JavaScript.INFINITE_LOOP_TRAP = null;
			var code = blockly.JavaScript.workspaceToCode(blockly.mainWorkspace);
			utils.log(code);
		} catch (e) {
			utils.showError(e);
		}

	};

	var run = function run() {
		// Generate JavaScript code and run it.
		try {
			window.LoopTrap = 1000;
			blockly.JavaScript.INFINITE_LOOP_TRAP =
				'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
			var code = blockly.JavaScript.workspaceToCode(blockly.mainWorkspace);
			blockly.JavaScript.INFINITE_LOOP_TRAP = null;
			var EVAL_BLOCKLY_CODE = eval;
			EVAL_BLOCKLY_CODE(code);
			$('#stopButton')
				.text('Stop');
			$('#runButton')
				.text('Restart');
			$('#summaryPanel')
				.show();
			$('#stopButton')
				.unbind('click', reset);
			$('#stopButton')
				.bind('click', stop);
		} catch (e) {
			utils.showError(e);
		}
	};

	var startTutorial = function startTutorial(e) {
		if (e) {
			e.preventDefault();
		}
		if (activeTutorial) {
			activeTutorial.stop();
		}
		activeTutorial = tours[$('#tours')
			.val()];
		activeTutorial.start();
		$('#tutorialButton')
			.unbind('click', startTutorial);
		$('#tutorialButton')
			.bind('click', stopTutorial);
		$('#tutorialButton')
			.text(i18n._('Stop!'));
	};

	var stopTutorial = function stopTutorial(e) {
		if (e) {
			e.preventDefault();
		}
		if (activeTutorial) {
			if (e) {
				activeTutorial.stop();
			}
			activeTutorial = null;
		}
		$('#tutorialButton')
			.unbind('click', stopTutorial);
		$('#tutorialButton')
			.bind('click', startTutorial);
		$('#tutorialButton')
			.text(i18n._('Go!'));
	};

	var reset = function reset(e) {
		if (e) {
			e.preventDefault();
		}
		globals.resetTradeInfo();
		utils.log(i18n._('Reset successful'), 'success');
	};

	var stop = function stop(e) {
		if (e) {
			e.preventDefault();
		}
		trade.stop();
		globals.disableRun(false);
		$('#stopButton')
			.text(i18n._('Reset'));
		$('#runButton')
			.text(i18n._('Run'));
		$('#stopButton')
			.unbind('click', stop);
		$('#stopButton')
			.bind('click', reset);
	};

	var setOpacityForAll = function setOpacityForAll(enabled, opacity) {
		if (enabled) {
			Object.keys(uiComponents)
				.forEach(function (key) {
					if (doNotHide.indexOf(key) < 0) {
						getUiComponent(key)
							.css('opacity', opacity);
						var disabled = +opacity < 1;
						getUiComponent(key)
							.find('button')
							.prop('disabled', disabled);
						getUiComponent(key)
							.find('input')
							.prop('disabled', disabled);
						getUiComponent(key)
							.find('select')
							.prop('disabled', disabled);
					}
				});
		}
	};

	var setOpacity = function setOpacity(enabled, componentName, opacity) {
		if (enabled) {
			getUiComponent(componentName)
				.css('opacity', opacity);
			var disabled = +opacity < 1;
			getUiComponent(componentName)
				.find('button')
				.prop('disabled', disabled);
			getUiComponent(componentName)
				.find('input')
				.prop('disabled', disabled);
			getUiComponent(componentName)
				.find('select')
				.prop('disabled', disabled);
		}
	};

	$('#saveXml')
		.click(function (e) {
			saveXml();
		});

	$('#addAccount')
		.click(function (e) {
			addAccount();
		});

	$('#undo')
		.click(function (e) {
			globals.undoBlocks();
		});

	$('#redo')
		.click(function (e) {
			globals.redoBlocks();
		});

	$('#showSummary')
		.click(function (e) {
			$('#summaryPanel')
				.show();
		});

	$('#run')
		.click(function (e) {
			run();
		});

	$('#logout')
		.click(function (e) {
			trade.logout();
		});

	$('#logout')
		.click(function (e) {
			trade.logout();
		});

	$('#runButton')
		.click(function (e) {
			run();
		});

	module.exports = {
		uiComponents: uiComponents,
		getUiComponent: getUiComponent,
		addAccount: addAccount,
		saveXml: saveXml,
		showCode: showCode,
		setOpacityForAll: setOpacityForAll,
		setOpacity: setOpacity,
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(40);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	blockly.JavaScript.trade = function (block) {
		var account = block.getFieldValue('ACCOUNT_LIST');
		var submarket = blockly.JavaScript.statementToCode(block, 'SUBMARKET');
		if (submarket === '') {
			throw {
				message: i18n._('You have to add a submarket first')
			};
		}
		// TODO: Assemble JavaScript into code variable.
		var code = 'var trade = function(trade_again){\nBot.trade.trade(\'' + account.trim() + '\', ' + submarket.trim() + ', trade_again);\n};\ntrade();\n';
		return code;
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.balance = function(block) {
	  var balance_type = block.getFieldValue('BALANCE_TYPE');
		var code = 'Bot.trade.getBalance(\''+ balance_type +'\')';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.notify = function(block) {
	  var notification_type = block.getFieldValue('NOTIFICATION_TYPE');
	  var message = blockly.JavaScript.valueToCode(block, 'MESSAGE', blockly.JavaScript.ORDER_ATOMIC);
	  // TODO: Assemble JavaScript into code variable.
	  var code = 'Bot.utils.log('+ message +', \''+ notification_type +'\', \'bottom left\');\n';
	  return code;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.total_profit = function(block) {
		var code = 'Bot.trade.getTotalProfit()';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	var config = __webpack_require__(11);
	config.ticktrade_markets.forEach(function(market){
		blockly.JavaScript[market] = function(block) {
			if ( this.parentBlock_ === null ) {
				return '';
			}
			var condition = blockly.JavaScript.statementToCode(block, 'CONDITION');
			if ( !condition ) {
				throw {message: 'A condition has to be defined for the market'};
			}
			var code = 'Bot.markets.volatility.' + market + '('+condition.trim()+')';
			return code;
		};
	});


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.check_direction = function(block) {
		var check_with = block.getFieldValue('CHECK_DIRECTION');
		var code = '(direction === \'' + check_with + '\')';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.direction = function(block) {
		var code = 'direction';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.purchase = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var purchase_list = block.getFieldValue('PURCHASE_LIST');
		var code = purchase_list;
		code = 'Bot.trade.purchase(\'' + code + '\');\n';
		return code;
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.on_strategy = function(block) {
	  var stack = blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
	  var code = 'Bot.globals.on_strategy = function on_strategy(tick, direction){\n' + stack + '\n};\n';
	  return code;
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.tick = function(block) {
		var code = 'tick';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.contract_check_result = function(block) {
		var check_with = block.getFieldValue('CHECK_RESULT');
		var code = '(result === \'' + check_with + '\')';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.contract_details = function(block) {
		var code = 'details';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.on_finish = function(block) {
	  var stack = blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
	  var code = 'Bot.globals.on_finish = function on_finish(result, details){\n' + stack + '\n};\n';
	  return code;
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.read_details = function(block) {
	  var detail_index = block.getFieldValue('DETAIL_INDEX');
	  // TODO: Assemble JavaScript into code variable.
	  var code = '((details instanceof Array && details.length === Bot.config.lists.DETAILS.length) ? details[' + ( parseInt(detail_index.trim()) - 1 ) + '] : \'\' )';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.contract_result = function(block) {
		var code = 'result';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	blockly.JavaScript.trade_again = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var code = 'trade(true);\n';
		return code;
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	var config = __webpack_require__(11);
	Object.keys(config.opposites).forEach(function(opposites){
		blockly.JavaScript[opposites.toLowerCase()] = function(block) {
			if ( this.parentBlock_ === null ) {
				return '';
			}
			var duration = blockly.JavaScript.valueToCode(block, 'DURATION', blockly.JavaScript.ORDER_ATOMIC);
			var payouttype = block.getFieldValue('PAYOUTTYPE_LIST');
			var currency = block.getFieldValue('CURRENCY_LIST');
			var amount = blockly.JavaScript.valueToCode(block, 'AMOUNT', blockly.JavaScript.ORDER_ATOMIC);
			var prediction;
			if ( config.opposites_have_barrier.indexOf(opposites) > -1 ) {
				prediction = blockly.JavaScript.valueToCode(block, 'PREDICTION', blockly.JavaScript.ORDER_ATOMIC);
				if ( prediction === '' ) {
					throw {message: 'All condition options are required'};
				}
			}
			if (opposites === '' || duration === '' || payouttype === '' || currency === '' || amount === ''){
				throw {message: 'All condition options are required'};
			}
			var code = 'Bot.conditions.ticktrade({\n'+
				'condition: \'' + opposites + '\',\n'+
				'duration: ' + duration + ',\n'+
				'payouttype: \'' + payouttype + '\',\n'+
				'currency: \'' + currency + '\',\n'+
				'amount: (' + amount + ').toFixed(2),\n'+
				((config.opposites_have_barrier.indexOf(opposites) > -1 && prediction !== '' )? 'barrier: ' + prediction + ',\n' : '' )+
			'})';
			return code;
		};
	});


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(42);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(43);
	var globals = __webpack_require__(12);
	blockly.Blocks.trade = {
		init: function () {
			this.appendDummyInput()
				.appendField(i18n._("Trade With Account:"))
				.appendField(new blockly.FieldDropdown(globals.accounts), "ACCOUNT_LIST");
			this.appendStatementInput("SUBMARKET")
				.setCheck("Submarket")
				.appendField(i18n._("Submarket"));
			this.setPreviousStatement(true, null);
			this.setColour(60);
			this.setTooltip(i18n._('The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts.'));
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function (ev) {
			relationChecker.trade(this, ev);
		},
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	var config = __webpack_require__(11);
	var utils = __webpack_require__(14);
	var i18n = __webpack_require__(3);
	var getNumField = function getNumField(block, fieldName) {
		var field = block.getInputTargetBlock(fieldName);
		if (field !== null && field.type === 'math_number') {
			field = field.getFieldValue('NUM')
				.trim();
			return field;
		}
		return '';
	};

	var isInteger = function isInteger(amount) {
		return !isNaN(+amount) && parseInt(amount) === parseFloat(amount);
	};

	var isInRange = function isInRange(amount, min, max) {
		return !isNaN(+amount) && +amount >= min && +amount <= max;
	};

	var trade = function trade(_trade, ev) {
		if (ev.type === 'create') {
			if (config.ticktrade_markets.indexOf(blockly.mainWorkspace.getBlockById(ev.blockId)
					.type) >= 0) {
				utils.broadcast('tour:submarket_created');
			}
			if (config.conditions.indexOf(blockly.mainWorkspace.getBlockById(ev.blockId)
					.type) >= 0) {
				utils.broadcast('tour:condition_created');
			}
			if (blockly.mainWorkspace.getBlockById(ev.blockId)
				.type === 'math_number') {
				utils.broadcast('tour:number');
			}
			if (blockly.mainWorkspace.getBlockById(ev.blockId)
				.type === 'purchase') {
				utils.broadcast('tour:purchase_created');
			}
			if (blockly.mainWorkspace.getBlockById(ev.blockId)
				.type === 'trade_again') {
				utils.broadcast('tour:trade_again_created');
			}
		}
		if (_trade.childBlocks_.length > 0 && config.ticktrade_markets.indexOf(_trade.childBlocks_[0].type) < 0) {
			utils.log(i18n._('The trade block can only accept submarket blocks'), 'warning');
			Array.prototype.slice.apply(_trade.childBlocks_)
				.forEach(function (child) {
					child.unplug();
				});
		} else if (_trade.childBlocks_.length > 0) {
			submarket(_trade.childBlocks_[0], ev);
			utils.broadcast('tour:submarket');
			if (ev.hasOwnProperty('newInputName')) {
				utils.addPurchaseOptions();
			}
		}
		var topParent = utils.findTopParentBlock(_trade);
		if (topParent !== null) {
			if (config.ticktrade_markets.indexOf(topParent.type) >= 0 || topParent.type === 'on_strategy' || topParent.type === 'on_finish') {
				utils.log(i18n._('The trade block cannot be inside binary blocks'), 'warning');
				_trade.unplug();
			}
		}
	};
	var submarket = function submarket(_submarket, ev) {
		if (_submarket.childBlocks_.length > 0 && config.conditions.indexOf(_submarket.childBlocks_[0].type) < 0) {
			utils.log(i18n._('Submarket blocks can only accept condition blocks'), 'warning');
			Array.prototype.slice.apply(_submarket.childBlocks_)
				.forEach(function (child) {
					child.unplug();
				});
		} else if (_submarket.childBlocks_.length > 0) {
			condition(_submarket.childBlocks_[0], ev, true);
		}
		if (_submarket.parentBlock_ !== null) {
			if (_submarket.parentBlock_.type !== 'trade') {
				utils.log(i18n._('Submarket blocks have to be added to the trade block'), 'warning');
				_submarket.unplug();
			}
		}
	};
	var condition = function condition(_condition, ev, calledByParent) {
		if (_condition.parentBlock_ !== null) {
			if (config.ticktrade_markets.indexOf(_condition.parentBlock_.type) < 0) {
				utils.log(i18n._('Condition blocks have to be added to submarket blocks'), 'warning');
				_condition.unplug();
			} else {
				utils.broadcast('tour:condition');
				if (!calledByParent) {
					if ((ev.type === 'change' && ev.element && ev.element === 'field') || (ev.type === 'move' && typeof ev.newInputName === 'string')) {
						var added = [];
						var duration = getNumField(_condition, 'DURATION');
						if (duration !== '') {
							if (!isInteger(duration) || !isInRange(duration, 5, 15)) {
								utils.log(i18n._('Number of ticks must be between 5 and 10'), 'warning');
							} else {
								utils.broadcast('tour:ticks');
								added.push('DURATION');
							}
						}
						var amount = getNumField(_condition, 'AMOUNT');
						if (amount !== '') {
							added.push('AMOUNT');
						}
						var prediction = getNumField(_condition, 'PREDICTION');
						if (prediction !== '') {
							if (!isInteger(prediction) || !isInRange(prediction, 0, 9)) {
								utils.log(i18n._('Prediction must be one digit'), 'warning');
							} else {
								added.push('PREDICTION');
							}
						}
						if (added.indexOf('AMOUNT') >= 0 && added.indexOf('DURATION') >= 0) {
							if (_condition.inputList.slice(-1)[0].name === 'PREDICTION') {
								if (added.indexOf('PREDICTION') >= 0) {
									utils.broadcast('tour:options');
								}
							} else {
								utils.broadcast('tour:options');
							}
						}
					}
				}
			}
		}
	};
	var inside_strategy = function inside_strategy(blockObject, ev, name) {
		var topParent = utils.findTopParentBlock(blockObject);
		if (topParent !== null && (topParent.type === 'on_finish' || topParent.type === 'trade')) {
			utils.log(name + ' ' + i18n._('must be added inside the strategy block'), 'warning');
			blockObject.unplug();
		} else if (topParent !== null && topParent.type === 'on_strategy') {
			if (blockObject.type === 'purchase') {
				utils.broadcast('tour:purchase');
			}
		}
	};
	var inside_finish = function inside_finish(blockObject, ev, name) {
		var topParent = utils.findTopParentBlock(blockObject);
		if (topParent !== null && (topParent.type === 'on_strategy' || topParent.type === 'trade')) {
			utils.log(name + ' ' + i18n._('must be added inside the finish block'), 'warning');
			blockObject.unplug();
		} else if (topParent !== null && topParent.type === 'on_finish') {
			if (blockObject.type === 'trade_again') {
				utils.broadcast('tour:trade_again');
			}
		}
	};
	module.exports = {
		trade: trade,
		submarket: submarket,
		condition: condition,
		inside_strategy: inside_strategy,
		inside_finish: inside_finish,
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kqvz7z
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);

	blockly.Blocks.balance = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Balance:"))
	        .appendField(new blockly.FieldDropdown([[i18n._("string"), "STR"], [i18n._("number"), "NUM"]]), "BALANCE_TYPE");
	    this.setOutput(true, null);
	    this.setColour(180);
	    this.setTooltip(i18n._('Get balance number or string'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pmhydb
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);

	blockly.Blocks.notify = {
	  init: function() {
	    this.appendValueInput("MESSAGE")
	        .setCheck(null)
	        .appendField(i18n._("Notify type:"))
	        .appendField(new blockly.FieldDropdown([[i18n._("success"), "success"], [i18n._("information"), "info"], [i18n._("warning"), "warn"], [i18n._("error"), "error"]]), "NOTIFICATION_TYPE");
	    this.setPreviousStatement(true, null);
	    this.setNextStatement(true, null);
	    this.setColour(180);
	    this.setTooltip(i18n._('Creates notification'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);

	blockly.Blocks.total_profit = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Total Profit"));
	    this.setOutput(true, "Number");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the total profit'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#abpy8a
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var config = __webpack_require__(11);
	var relationChecker = __webpack_require__(43);

	config.ticktrade_markets.forEach(function(market, index){
		blockly.Blocks[market] = {
			init: function() {
				this.appendDummyInput()
					.appendField(config.ticktrade_market_names[index]);
				this.appendStatementInput("CONDITION")
					.setCheck("Condition");
				this.setInputsInline(true);
				this.setPreviousStatement(true, "Submarket");
				this.setColour(345);
				this.setTooltip(i18n._('Chooses the market:') + ' ' + config.ticktrade_market_names[index]);
				this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
			},
			onchange: function(ev){
				relationChecker.submarket(this, ev);
			}
		};
	});


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(43);
	var config = __webpack_require__(11);
	blockly.Blocks.check_direction = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Direction is"))
					.appendField(new blockly.FieldDropdown(config.lists.CHECK_DIRECTION), "CHECK_DIRECTION");
	    this.setOutput(true, "Boolean");
	    this.setColour(180);
	    this.setTooltip(i18n._('True if the direction matches the selection'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_strategy(this, ev, 'Check Direction');
		},
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n3drko
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(43);

	blockly.Blocks.direction = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Tick Direction"));
	    this.setOutput(true, "String");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the tick direction received by a strategy block, its value could be "up" if the tick is more than before, "down" if less than before and empty ("") if the tick is equal to the previous tick'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_strategy(this, ev, 'Tick Direction');
		},
	};



/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(43);
	var globals = __webpack_require__(12);

	blockly.Blocks.purchase = {
		init: function() {
			this.appendDummyInput()
				.appendField(i18n._("Purchase"))
				.appendField(new blockly.FieldDropdown(globals.purchase_choices), "PURCHASE_LIST");
			this.setPreviousStatement(true, 'Purchase');
			this.setColour(180);
			this.setTooltip(i18n._('Purchases a chosen contract. Accepts index to choose between the contracts.'));
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev) {
			relationChecker.inside_strategy(this, ev, 'Purchase');
		},
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u7tjez
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);

	blockly.Blocks.on_strategy = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Strategy (Decide when to purchase with each tick)"));
	    this.appendStatementInput("STRATEGY_STACK")
	        .setCheck('Purchase');
	    this.setColour(290);
	    this.setTooltip(i18n._('This block decides what to do each time a new tick is received'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335

	var blockly = __webpack_require__(13);
	var relationChecker = __webpack_require__(43);
	var i18n = __webpack_require__(3);

	blockly.Blocks.tick = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Tick Value"));
	    this.setOutput(true, "Number");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the tick value received by a strategy block'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_strategy(this, ev, 'Tick Value');
		},
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var config = __webpack_require__(11);
	var relationChecker = __webpack_require__(43);
	blockly.Blocks.contract_check_result = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Result is"))
					.appendField(new blockly.FieldDropdown(config.lists.CHECK_RESULT), "CHECK_RESULT");
	    this.setOutput(true, "Boolean");
	    this.setColour(180);
	    this.setTooltip(i18n._('True if the result matches the selection'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Check Result');
		},
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xq4ajc
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(43);

	blockly.Blocks.contract_details = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Contract Details"));
	    this.setOutput(true, "Array");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the list of details for the finished contract'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Contract Details');
		},
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);

	blockly.Blocks.on_finish = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("On Finish (Decide what to do after the contract is finished)"));
	    this.appendStatementInput("FINISH_STACK")
	        .setCheck("TradeAgain");
	    this.setColour(290);
	    this.setTooltip(i18n._('This block decides what to do when a purchased contract is finished'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u8i287
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(43);
	var config = __webpack_require__(11);

	blockly.Blocks.read_details = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Contract Detail:"))
	        .appendField(new blockly.FieldDropdown(config.lists.DETAILS), "DETAIL_INDEX");
			this.setOutput(true, null);
	    this.setColour(180);
	    this.setTooltip(i18n._('Reads a selected option from contract details list'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Read Contract Details');
		},
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e54skh
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(43);

	blockly.Blocks.contract_result = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Contract Result"));
	    this.setOutput(true, "String");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the result of the finished contract'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Contract Result');
		},
	};



/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xkasg4
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(43);

	blockly.Blocks.trade_again = {
		init: function() {
			this.appendDummyInput()
				.appendField(i18n._("Trade Again"));
			this.setPreviousStatement(true, 'TradeAgain');
			this.setColour(180);
			this.setTooltip(i18n._('Runs the trade block again'));
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Trade Again');
		},
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#cur8so
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var config = __webpack_require__(11);
	var utils = __webpack_require__(14);
	var relationChecker = __webpack_require__(43);

	Object.keys(config.opposites).forEach(function(opposites){
		blockly.Blocks[opposites.toLowerCase()] = {
			init: function() {
				var option_names = [];
				config.opposites[opposites].forEach(function(options){
					
					var option_alias = Object.keys(options)[0];
					var option_name = options[option_alias];
					option_names.push(option_name);	
				});
				this.appendDummyInput()
					.appendField(option_names[0] + '/' + option_names[1]);
				this.appendValueInput("DURATION")
					.setCheck("Number")
					.appendField(i18n._("Ticks:"));
				this.appendDummyInput()
					.appendField(i18n._("Payout:"))
					.appendField(new blockly.FieldDropdown(config.lists.PAYOUTTYPE), "PAYOUTTYPE_LIST");
				this.appendDummyInput()
					.appendField(i18n._("Currency:"))
					.appendField(new blockly.FieldDropdown(config.lists.CURRENCY), "CURRENCY_LIST");
				this.appendValueInput("AMOUNT")
					.setCheck("Number")
					.appendField(i18n._("Amount:"));
				if ( config.opposites_have_barrier.indexOf(opposites) > -1 ) {
					this.appendValueInput("PREDICTION")
						.setCheck("Number")
						.appendField(i18n._("Prediction:"));
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true, "Condition");
				this.setColour(15);
				this.setTooltip(i18n._('Provides the contract conditions:') + ' ' + option_names[0] + '/' + option_names[1]);
				this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
			},
			onchange: function(ev){
				relationChecker.condition(this, ev);
			},
		};
	});


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint ignore:start */
	var $ = __webpack_require__(2);
	$.fn.drags = function (opt) {

		opt = $.extend({
			handle: "",
			cursor: "move"
		}, opt);

		if (opt.handle === "") {
			var $el = this;
		} else {
			var $el = this.find(opt.handle);
		}

		return $el.css('cursor', opt.cursor)
			.on("mousedown", function (e) {
				if (opt.handle === "") {
					var $drag = $(this)
						.addClass('draggable');
				} else {
					var $drag = $(this)
						.addClass('active-handle')
						.parent()
						.addClass('draggable');
				}
				var z_idx = $drag.css('z-index'),
					drg_h = $drag.outerHeight(),
					drg_w = $drag.outerWidth(),
					pos_y = $drag.offset()
					.top + drg_h - e.pageY,
					pos_x = $drag.offset()
					.left + drg_w - e.pageX;
				$drag.css('z-index', 1000)
					.parents()
					.on("mousemove", function (e) {
						$('.draggable')
							.offset({
								top: e.pageY + pos_y - drg_h,
								left: e.pageX + pos_x - drg_w
							})
							.on("mouseup", function () {
								$(this)
									.removeClass('draggable')
									.css('z-index', z_idx);
							});
					});
				e.preventDefault(); // disable selection
			})
			.on("mouseup", function () {
				if (opt.handle === "") {
					$(this)
						.removeClass('draggable');
				} else {
					$(this)
						.removeClass('active-handle')
						.parent()
						.removeClass('draggable');
				}
			});
	};
	/* jshint ignore:end */


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(12);
	var view = __webpack_require__(22);
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var steps = [{
		content: '<p>' + i18n._("Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot.") + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + i18n._("You will need to add the blocks to this area which is called the <b>workspace</b>.") + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'workspace', 1);
		},
		teardown: function (tour, options) {},
	}, {
		content: '<p>' + i18n._("To start pick a <b>submarket</b> block from volatility markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a submarket from left should lead you to the next step.)") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_submarket_created'],
		tour_submarket_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:submarket_created', this.tour_submarket_created);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].reveal(true);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].select();
			view.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:submarket_created', this.tour_submarket_created);
			view.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("Great! Now add it to the <b>trade</b> block.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		bind: ['tour_submarket_added'],
		tour_submarket_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:submarket', this.tour_submarket_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:submarket', this.tour_submarket_added);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Alright! Now pick a <b>condition</b> block.") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_condition_created'],
		tour_condition_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:condition_created', this.tour_condition_created);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[1].select();
			view.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:condition_created', this.tour_condition_created);
			view.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("OK! Now add it to the submarket you added in the previous step.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_condition_added'],
		tour_condition_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:condition', this.tour_condition_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:condition', this.tour_condition_added);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Very good! It's time to add the options needed by the condition block, pick a number") + ' (<img src="www/image/number.png"/>) ' + i18n._("from the Math menu") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_number_created'],
		tour_number_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:number', this.tour_number_created);
			blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
			view.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:number', this.tour_number_created);
			view.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("Click on the number block to edit its value") + ' (<img src="www/image/number_editing.png"/>), ' + i18n._("change the value to 5 and add it to the <b>ticks</b> field of the condition block") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_ticks_added'],
		tour_ticks_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:ticks', this.tour_ticks_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:ticks', this.tour_ticks_added);
		},
	}, {
		content: '<p>' + i18n._("OK, Now add all remaining options to the condition block") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_options_added'],
		tour_options_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
			window.addEventListener('tour:options', this.tour_options_added);
			view.getUiComponent('toolbox')
				.css('opacity', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:options', this.tour_options_added);
			view.getUiComponent('toolbox')
				.css('opacity', 1);
		},
	}, {
		content: '<p>' + i18n._("That's it, now you have a complete trade block with its options. It's time to define a strategy") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
		setup: function (tour, options) {
			view.getUiComponent('toolbox')
				.css('opacity', 1);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
		},
		teardown: function (tour, options) {
			view.getUiComponent('toolbox')
				.css('opacity', 0.3);
		},
	}, {
		content: '<p>' + i18n._("For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_purchase_created'],
		tour_purchase_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
			view.getUiComponent('toolbox')
				.css('opacity', 1);
			window.addEventListener('tour:purchase_created', this.tour_purchase_created);
		},
		teardown: function (tour, options) {
			view.getUiComponent('toolbox')
				.css('opacity', 0.3);
			window.removeEventListener('tour:purchase_created', this.tour_purchase_created);
		},
	}, {
		content: '<p>' + i18n._("Now add it to the Strategy block.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		bind: ['tour_purchase_added'],
		tour_purchase_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:purchase', this.tour_purchase_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:purchase', this.tour_purchase_added);
		},
	}, {
		content: '<p>' + i18n._("Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your condition block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("After a purchase was started, the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_trade_again_created'],
		tour_trade_again_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].reveal(true);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].select();
			view.getUiComponent('toolbox')
				.css('opacity', 1);
			window.addEventListener('tour:trade_again_created', this.tour_trade_again_created);
		},
		teardown: function (tour, options) {
			view.getUiComponent('toolbox')
				.css('opacity', 0.3);
			window.removeEventListener('tour:trade_again_created', this.tour_trade_again_created);
		},
	}, {
		content: '<p>' + i18n._("Now add it to the On Finish block") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		bind: ['tour_trade_again'],
		tour_trade_again: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:trade_again', this.tour_trade_again);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:trade_again', this.tour_trade_again);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its condition is unmet.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
		teardown: function (tour, options) {
			view.setOpacityForAll(started, 1);
		},
	}, {
		content: '<p>' + i18n._("If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo") + '</p>',
		target: view.getUiComponent('undo_redo'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can save/load your blocks using these tools") + '</p>',
		target: view.getUiComponent('file_management'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on these buttons. Please make sure you have chosen a Virtual Account before running the blocks.") + '</p>',
		target: view.getUiComponent('run_stop'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can choose the token you want by the <b>Account</b> dropdown on the trade block. If you do not have any token in the dropdown please add one using the <b>Add Token</b> button above. Please make sure to use Virtual Account tokens for testing.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can add a token to the bot using the <b>Add Token</b> button.") + '</p>',
		target: view.getUiComponent('token'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can see the summary of your trades by clicking on this button.") + '</p>',
		target: view.getUiComponent('summary'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("Go ahead and run the blocks. You can stop the code anytime you want using the stop button, or reset the values in the result panels using the reset button.") + '</p>',
		target: view.getUiComponent('run_stop'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
		teardown: function (tour, options) {
			view.stopTutorial();
		},
	}, ];

	var tour = new Tourist.Tour({
		steps: steps
	});

	var started = false;

	module.exports = {
		start: function start() {
			if (!globals.tour) {
				started = true;
				globals.tour = tour;
				globals.tour.start();
			}
		},
		stop: function stop() {
			view.setOpacityForAll(true, 1);
			started = false;
			globals.tour.stop();
			blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete globals.tour;
		},
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(12);
	var view = __webpack_require__(22);
	var storageManager = __webpack_require__(15);
	var blockly = __webpack_require__(13);
	var i18n = __webpack_require__(3);
	var steps = [{
		content: '<p>' + i18n._('Welcome to the binary bot, a blockly based automation tool for binary.com trades') + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + i18n._('The blocks you put in here will create a binary bot code which you can then execute using the run button.') + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'workspace', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'workspace', 0.3);
		},
	}, {
		content: '<p>' + i18n._('You can add blocks from here to the workspace') + '</p>',
		target: view.getUiComponent('toolbox'),
		nextButton: true,
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		setup: function (tour, options) {
			view.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Erase the blocks by dropping them in here.') + '</p>',
		target: view.getUiComponent('trash'),
		nextButton: true,
		highlightTarget: true,
		my: 'right bottom',
		at: 'left top',
		setup: function (tour, options) {
			view.setOpacity(started, 'trash', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'trash', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to load and save blocks') + '</p>',
		target: view.getUiComponent('file_management'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'file_management', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'file_management', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Click to add a token, at least one token is needed. Get your token from') + ' <a href="https://www.binary.com/user/api_tokenws" target="_blank">' + i18n._('here') + '</a></p>',
		target: view.getUiComponent('token'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'token', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'token', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to Undo/Redo changes to your blocks.') + '</p>',
		target: view.getUiComponent('undo_redo'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'undo_redo', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'undo_redo', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Click on this button to see the summary of your trades.') + '</p>',
		target: view.getUiComponent('summary'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'summary', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'summary', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to run or stop your blocks, or reset your result panels.') + '</p>',
		target: view.getUiComponent('run_stop'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'run_stop', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'run_stop', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Good Luck!') + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		teardown: function (tour, options) {
			view.setOpacityForAll(started, 1);
			view.getStorageManager()
				.setDone('welcomeFinished');
			view.stopTutorial();
		},
	}, ];

	var tour = new Tourist.Tour({
		steps: steps
	});

	var started = false;

	module.exports = {
		start: function start() {
			if (!globals.tour) {
				started = true;
				globals.tour = tour;
				globals.tour.start();
			}
		},
		welcome: function welcome() {
			if (!storageManager.isDone('welcomeFinished')) {
				if (!globals.tour) {
					started = true;
					globals.tour = tour;
					globals.tour.start();
				}
			}
		},
		stop: function stop() {
			view.setOpacityForAll(true, 1);
			started = false;
			globals.tour.stop();
			blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete globals.tour;
		},
	};


/***/ }
/******/ ]);