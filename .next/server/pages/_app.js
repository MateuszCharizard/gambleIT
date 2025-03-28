/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./context/GameContext.js":
/*!********************************!*\
  !*** ./context/GameContext.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameProvider: () => (/* binding */ GameProvider),\n/* harmony export */   useGame: () => (/* binding */ useGame)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst GameContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction GameProvider({ children }) {\n    const [tokens, setTokens] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [inventory, setInventory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [userStats, setUserStats] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        casesOpened: 0,\n        totalValueWon: 0\n    });\n    // Function to update user stats\n    const updateUserStats = (newStats)=>{\n        setUserStats((prevStats)=>({\n                ...prevStats,\n                ...newStats\n            }));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GameContext.Provider, {\n        value: {\n            tokens,\n            setTokens,\n            inventory,\n            setInventory,\n            userStats,\n            updateUserStats\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/workspaces/gambleIT/context/GameContext.js\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, this);\n}\nfunction useGame() {\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(GameContext);\n    if (!context) {\n        // Return a default value during SSR or if context is not available\n        return {\n            tokens: 0,\n            setTokens: ()=>{},\n            inventory: [],\n            setInventory: ()=>{},\n            userStats: {\n                casesOpened: 0,\n                totalValueWon: 0\n            },\n            updateUserStats: ()=>{}\n        };\n    }\n    return context;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHQvR2FtZUNvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE0RDtBQUU1RCxNQUFNRyw0QkFBY0gsb0RBQWFBO0FBRTFCLFNBQVNJLGFBQWEsRUFBRUMsUUFBUSxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUNNLFdBQVdDLGFBQWEsR0FBR1AsK0NBQVFBLENBQUMsRUFBRTtJQUM3QyxNQUFNLENBQUNRLFdBQVdDLGFBQWEsR0FBR1QsK0NBQVFBLENBQUM7UUFDekNVLGFBQWE7UUFDYkMsZUFBZTtJQUNqQjtJQUVBLGdDQUFnQztJQUNoQyxNQUFNQyxrQkFBa0IsQ0FBQ0M7UUFDdkJKLGFBQWEsQ0FBQ0ssWUFBZTtnQkFDM0IsR0FBR0EsU0FBUztnQkFDWixHQUFHRCxRQUFRO1lBQ2I7SUFDRjtJQUVBLHFCQUNFLDhEQUFDWixZQUFZYyxRQUFRO1FBQ25CQyxPQUFPO1lBQUVaO1lBQVFDO1lBQVdDO1lBQVdDO1lBQWNDO1lBQVdJO1FBQWdCO2tCQUUvRVQ7Ozs7OztBQUdQO0FBRU8sU0FBU2M7SUFDZCxNQUFNQyxVQUFVbkIsaURBQVVBLENBQUNFO0lBQzNCLElBQUksQ0FBQ2lCLFNBQVM7UUFDWixtRUFBbUU7UUFDbkUsT0FBTztZQUNMZCxRQUFRO1lBQ1JDLFdBQVcsS0FBTztZQUNsQkMsV0FBVyxFQUFFO1lBQ2JDLGNBQWMsS0FBTztZQUNyQkMsV0FBVztnQkFBRUUsYUFBYTtnQkFBR0MsZUFBZTtZQUFFO1lBQzlDQyxpQkFBaUIsS0FBTztRQUMxQjtJQUNGO0lBQ0EsT0FBT007QUFDVCIsInNvdXJjZXMiOlsiL3dvcmtzcGFjZXMvZ2FtYmxlSVQvY29udGV4dC9HYW1lQ29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBHYW1lQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWVQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgW3Rva2Vucywgc2V0VG9rZW5zXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbaW52ZW50b3J5LCBzZXRJbnZlbnRvcnldID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbdXNlclN0YXRzLCBzZXRVc2VyU3RhdHNdID0gdXNlU3RhdGUoe1xuICAgIGNhc2VzT3BlbmVkOiAwLFxuICAgIHRvdGFsVmFsdWVXb246IDAsXG4gIH0pO1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSB1c2VyIHN0YXRzXG4gIGNvbnN0IHVwZGF0ZVVzZXJTdGF0cyA9IChuZXdTdGF0cykgPT4ge1xuICAgIHNldFVzZXJTdGF0cygocHJldlN0YXRzKSA9PiAoe1xuICAgICAgLi4ucHJldlN0YXRzLFxuICAgICAgLi4ubmV3U3RhdHMsXG4gICAgfSkpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEdhbWVDb250ZXh0LlByb3ZpZGVyXG4gICAgICB2YWx1ZT17eyB0b2tlbnMsIHNldFRva2VucywgaW52ZW50b3J5LCBzZXRJbnZlbnRvcnksIHVzZXJTdGF0cywgdXBkYXRlVXNlclN0YXRzIH19XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvR2FtZUNvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VHYW1lKCkge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChHYW1lQ29udGV4dCk7XG4gIGlmICghY29udGV4dCkge1xuICAgIC8vIFJldHVybiBhIGRlZmF1bHQgdmFsdWUgZHVyaW5nIFNTUiBvciBpZiBjb250ZXh0IGlzIG5vdCBhdmFpbGFibGVcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5zOiAwLFxuICAgICAgc2V0VG9rZW5zOiAoKSA9PiB7fSxcbiAgICAgIGludmVudG9yeTogW10sXG4gICAgICBzZXRJbnZlbnRvcnk6ICgpID0+IHt9LFxuICAgICAgdXNlclN0YXRzOiB7IGNhc2VzT3BlbmVkOiAwLCB0b3RhbFZhbHVlV29uOiAwIH0sXG4gICAgICB1cGRhdGVVc2VyU3RhdHM6ICgpID0+IHt9LFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQ7XG59Il0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJHYW1lQ29udGV4dCIsIkdhbWVQcm92aWRlciIsImNoaWxkcmVuIiwidG9rZW5zIiwic2V0VG9rZW5zIiwiaW52ZW50b3J5Iiwic2V0SW52ZW50b3J5IiwidXNlclN0YXRzIiwic2V0VXNlclN0YXRzIiwiY2FzZXNPcGVuZWQiLCJ0b3RhbFZhbHVlV29uIiwidXBkYXRlVXNlclN0YXRzIiwibmV3U3RhdHMiLCJwcmV2U3RhdHMiLCJQcm92aWRlciIsInZhbHVlIiwidXNlR2FtZSIsImNvbnRleHQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./context/GameContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _context_GameContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/GameContext */ \"(pages-dir-node)/./context/GameContext.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n // If you have global styles\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_GameContext__WEBPACK_IMPORTED_MODULE_1__.GameProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/workspaces/gambleIT/pages/_app.js\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/workspaces/gambleIT/pages/_app.js\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFzRDtBQUN2QixDQUFDLDRCQUE0QjtBQUU3QyxTQUFTQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3BELHFCQUNFLDhEQUFDSCw4REFBWUE7a0JBQ1gsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUIiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL2dhbWJsZUlUL3BhZ2VzL19hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbnRleHQvR2FtZUNvbnRleHRcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiOyAvLyBJZiB5b3UgaGF2ZSBnbG9iYWwgc3R5bGVzXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxHYW1lUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9HYW1lUHJvdmlkZXI+XG4gICk7XG59Il0sIm5hbWVzIjpbIkdhbWVQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.js"));
module.exports = __webpack_exports__;

})();