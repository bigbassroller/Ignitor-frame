{"version":3,"sources":["webpack:///contact.min.js","webpack:///webpack/bootstrap f8c9692a82589b9f90cf","webpack:///./server/web/contact/index.js"],"names":["modules","__webpack_require__","moduleId","installedModules","exports","module","id","loaded","call","m","c","p","register","server","options","next","route","method","path","handler","request","reply","view","attributes","name"],"mappings":"CAAS,SAAUA,GCInB,QAAAC,GAAAC,GAGA,GAAAC,EAAAD,GACA,MAAAC,GAAAD,GAAAE,OAGA,IAAAC,GAAAF,EAAAD,IACAE,WACAE,GAAAJ,EACAK,QAAA,EAUA,OANAP,GAAAE,GAAAM,KAAAH,EAAAD,QAAAC,IAAAD,QAAAH,GAGAI,EAAAE,QAAA,EAGAF,EAAAD,QAvBA,GAAAD,KAqCA,OATAF,GAAAQ,EAAAT,EAGAC,EAAAS,EAAAP,EAGAF,EAAAU,EAAA,GAGAV,EAAA,KDMM,SAASI,EAAQD,EAASH,GAE/BI,EAAOD,QAAUH,EAAoB,IAKhC,SAASI,EAAQD,GEnDvBA,EAAAQ,SAAA,SAAAC,EAAAC,EAAAC,GAEAF,EAAAG,OACAC,OAAA,MACAC,KAAA,WACAC,QAAA,SAAAC,EAAAC,GAEA,MAAAA,GAAAC,KAAA,oBAIAP,KAIAX,EAAAQ,SAAAW,YACAC,KAAA","file":"contact.min.js","sourcesContent":["/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports, __webpack_require__) {\n\n\tmodule.exports = __webpack_require__(1);\n\n\n/***/ },\n/* 1 */\n/***/ function(module, exports) {\n\n\texports.register = function (server, options, next) {\n\t\n\t    server.route({\n\t        method: 'GET',\n\t        path: '/contact',\n\t        handler: function (request, reply) {\n\t\n\t            return reply.view('contact/index');\n\t        }\n\t    });\n\t\n\t    next();\n\t};\n\t\n\t\n\texports.register.attributes = {\n\t    name: 'web/contact'\n\t};\n\n\n/***/ }\n/******/ ]);\n\n\n/** WEBPACK FOOTER **\n ** contact.min.js\n **/"," \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId])\n \t\t\treturn installedModules[moduleId].exports;\n\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\texports: {},\n \t\t\tid: moduleId,\n \t\t\tloaded: false\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.loaded = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = \"\";\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(0);\n\n\n\n/** WEBPACK FOOTER **\n ** webpack/bootstrap f8c9692a82589b9f90cf\n **/","exports.register = function (server, options, next) {\n\n    server.route({\n        method: 'GET',\n        path: '/contact',\n        handler: function (request, reply) {\n\n            return reply.view('contact/index');\n        }\n    });\n\n    next();\n};\n\n\nexports.register.attributes = {\n    name: 'web/contact'\n};\n\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/web/contact/index.js\n ** module id = 1\n ** module chunks = 0\n **/"],"sourceRoot":""}