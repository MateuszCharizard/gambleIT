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

/***/ "(pages-dir-node)/./context/AuthContext.js":
/*!********************************!*\
  !*** ./context/AuthContext.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/supabase */ \"(pages-dir-node)/./lib/supabase.js\");\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            // Check initial session\n            const getSession = {\n                \"AuthProvider.useEffect.getSession\": async ()=>{\n                    const { data: { session } } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.getSession();\n                    setUser(session?.user ?? null);\n                    setLoading(false);\n                }\n            }[\"AuthProvider.useEffect.getSession\"];\n            getSession();\n            // Listen for auth state changes\n            const { data: authListener } = _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.onAuthStateChange({\n                \"AuthProvider.useEffect\": (event, session)=>{\n                    setUser(session?.user ?? null);\n                    setLoading(false);\n                }\n            }[\"AuthProvider.useEffect\"]);\n            return ({\n                \"AuthProvider.useEffect\": ()=>{\n                    authListener.subscription.unsubscribe();\n                }\n            })[\"AuthProvider.useEffect\"];\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    const signUp = async ({ email, password })=>{\n        const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signUp({\n            email,\n            password\n        });\n        if (error) return {\n            error\n        };\n        return {\n            user: data.user\n        };\n    };\n    const signIn = async ({ email, password })=>{\n        const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signInWithPassword({\n            email,\n            password\n        });\n        if (error) return {\n            error\n        };\n        return {\n            user: data.user\n        };\n    };\n    const signOut = async ()=>{\n        const { error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signOut();\n        if (error) return {\n            error\n        };\n        setUser(null);\n    };\n    const value = {\n        user,\n        loading,\n        signUp,\n        signIn,\n        signOut\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/workspaces/gambleIT/context/AuthContext.js\",\n        lineNumber: 62,\n        columnNumber: 10\n    }, this);\n}\nfunction useAuth() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHQvQXV0aENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBdUU7QUFDNUI7QUFFM0MsTUFBTUssNEJBQWNMLG9EQUFhQTtBQUUxQixTQUFTTSxhQUFhLEVBQUVDLFFBQVEsRUFBRTtJQUN2QyxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1AsK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDUSxTQUFTQyxXQUFXLEdBQUdULCtDQUFRQSxDQUFDO0lBRXZDQyxnREFBU0E7a0NBQUM7WUFDUix3QkFBd0I7WUFDeEIsTUFBTVM7cURBQWE7b0JBQ2pCLE1BQU0sRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUUsRUFBRSxHQUFHLE1BQU1WLG1EQUFRQSxDQUFDVyxJQUFJLENBQUNILFVBQVU7b0JBQzVESCxRQUFRSyxTQUFTTixRQUFRO29CQUN6QkcsV0FBVztnQkFDYjs7WUFDQUM7WUFFQSxnQ0FBZ0M7WUFDaEMsTUFBTSxFQUFFQyxNQUFNRyxZQUFZLEVBQUUsR0FBR1osbURBQVFBLENBQUNXLElBQUksQ0FBQ0UsaUJBQWlCOzBDQUFDLENBQUNDLE9BQU9KO29CQUNyRUwsUUFBUUssU0FBU04sUUFBUTtvQkFDekJHLFdBQVc7Z0JBQ2I7O1lBRUE7MENBQU87b0JBQ0xLLGFBQWFHLFlBQVksQ0FBQ0MsV0FBVztnQkFDdkM7O1FBQ0Y7aUNBQUcsRUFBRTtJQUVMLE1BQU1DLFNBQVMsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRTtRQUN2QyxNQUFNLEVBQUVWLElBQUksRUFBRVcsS0FBSyxFQUFFLEdBQUcsTUFBTXBCLG1EQUFRQSxDQUFDVyxJQUFJLENBQUNNLE1BQU0sQ0FBQztZQUNqREM7WUFDQUM7UUFDRjtRQUNBLElBQUlDLE9BQU8sT0FBTztZQUFFQTtRQUFNO1FBQzFCLE9BQU87WUFBRWhCLE1BQU1LLEtBQUtMLElBQUk7UUFBQztJQUMzQjtJQUVBLE1BQU1pQixTQUFTLE9BQU8sRUFBRUgsS0FBSyxFQUFFQyxRQUFRLEVBQUU7UUFDdkMsTUFBTSxFQUFFVixJQUFJLEVBQUVXLEtBQUssRUFBRSxHQUFHLE1BQU1wQixtREFBUUEsQ0FBQ1csSUFBSSxDQUFDVyxrQkFBa0IsQ0FBQztZQUM3REo7WUFDQUM7UUFDRjtRQUNBLElBQUlDLE9BQU8sT0FBTztZQUFFQTtRQUFNO1FBQzFCLE9BQU87WUFBRWhCLE1BQU1LLEtBQUtMLElBQUk7UUFBQztJQUMzQjtJQUVBLE1BQU1tQixVQUFVO1FBQ2QsTUFBTSxFQUFFSCxLQUFLLEVBQUUsR0FBRyxNQUFNcEIsbURBQVFBLENBQUNXLElBQUksQ0FBQ1ksT0FBTztRQUM3QyxJQUFJSCxPQUFPLE9BQU87WUFBRUE7UUFBTTtRQUMxQmYsUUFBUTtJQUNWO0lBRUEsTUFBTW1CLFFBQVE7UUFDWnBCO1FBQ0FFO1FBQ0FXO1FBQ0FJO1FBQ0FFO0lBQ0Y7SUFFQSxxQkFBTyw4REFBQ3RCLFlBQVl3QixRQUFRO1FBQUNELE9BQU9BO2tCQUFRckI7Ozs7OztBQUM5QztBQUVPLFNBQVN1QjtJQUNkLE9BQU83QixpREFBVUEsQ0FBQ0k7QUFDcEIiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL2dhbWJsZUlUL2NvbnRleHQvQXV0aENvbnRleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSAnLi4vbGliL3N1cGFiYXNlJztcblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIENoZWNrIGluaXRpYWwgc2Vzc2lvblxuICAgIGNvbnN0IGdldFNlc3Npb24gPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB7IGRhdGE6IHsgc2Vzc2lvbiB9IH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFNlc3Npb24oKTtcbiAgICAgIHNldFVzZXIoc2Vzc2lvbj8udXNlciA/PyBudWxsKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH07XG4gICAgZ2V0U2Vzc2lvbigpO1xuXG4gICAgLy8gTGlzdGVuIGZvciBhdXRoIHN0YXRlIGNoYW5nZXNcbiAgICBjb25zdCB7IGRhdGE6IGF1dGhMaXN0ZW5lciB9ID0gc3VwYWJhc2UuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZSgoZXZlbnQsIHNlc3Npb24pID0+IHtcbiAgICAgIHNldFVzZXIoc2Vzc2lvbj8udXNlciA/PyBudWxsKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGF1dGhMaXN0ZW5lci5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2lnblVwID0gYXN5bmMgKHsgZW1haWwsIHBhc3N3b3JkIH0pID0+IHtcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25VcCh7XG4gICAgICBlbWFpbCxcbiAgICAgIHBhc3N3b3JkLFxuICAgIH0pO1xuICAgIGlmIChlcnJvcikgcmV0dXJuIHsgZXJyb3IgfTtcbiAgICByZXR1cm4geyB1c2VyOiBkYXRhLnVzZXIgfTtcbiAgfTtcblxuICBjb25zdCBzaWduSW4gPSBhc3luYyAoeyBlbWFpbCwgcGFzc3dvcmQgfSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbkluV2l0aFBhc3N3b3JkKHtcbiAgICAgIGVtYWlsLFxuICAgICAgcGFzc3dvcmQsXG4gICAgfSk7XG4gICAgaWYgKGVycm9yKSByZXR1cm4geyBlcnJvciB9O1xuICAgIHJldHVybiB7IHVzZXI6IGRhdGEudXNlciB9O1xuICB9O1xuXG4gIGNvbnN0IHNpZ25PdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XG4gICAgaWYgKGVycm9yKSByZXR1cm4geyBlcnJvciB9O1xuICAgIHNldFVzZXIobnVsbCk7XG4gIH07XG5cbiAgY29uc3QgdmFsdWUgPSB7XG4gICAgdXNlcixcbiAgICBsb2FkaW5nLFxuICAgIHNpZ25VcCxcbiAgICBzaWduSW4sXG4gICAgc2lnbk91dCxcbiAgfTtcblxuICByZXR1cm4gPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvQXV0aENvbnRleHQuUHJvdmlkZXI+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlQXV0aCgpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xufSJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0Iiwic3VwYWJhc2UiLCJBdXRoQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImdldFNlc3Npb24iLCJkYXRhIiwic2Vzc2lvbiIsImF1dGgiLCJhdXRoTGlzdGVuZXIiLCJvbkF1dGhTdGF0ZUNoYW5nZSIsImV2ZW50Iiwic3Vic2NyaXB0aW9uIiwidW5zdWJzY3JpYmUiLCJzaWduVXAiLCJlbWFpbCIsInBhc3N3b3JkIiwiZXJyb3IiLCJzaWduSW4iLCJzaWduSW5XaXRoUGFzc3dvcmQiLCJzaWduT3V0IiwidmFsdWUiLCJQcm92aWRlciIsInVzZUF1dGgiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./context/AuthContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./lib/supabase.js":
/*!*************************!*\
  !*** ./lib/supabase.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = 'https://hawjgysofnwidxanykrr.supabase.co';\nconst supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd2pneXNvZm53aWR4YW55a3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNTQ2MzQsImV4cCI6MjA1ODczMDYzNH0.o9Sb14acr7EJNdt7BLgw1566A5pEg5ZEfCiDuDqiAhI';\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9zdXBhYmFzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFFckQsTUFBTUMsY0FBYztBQUNwQixNQUFNQyxjQUFjO0FBQ2IsTUFBTUMsV0FBV0gsbUVBQVlBLENBQUNDLGFBQWFDLGFBQWEiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL2dhbWJsZUlUL2xpYi9zdXBhYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xuXG5jb25zdCBzdXBhYmFzZVVybCA9ICdodHRwczovL2hhd2pneXNvZm53aWR4YW55a3JyLnN1cGFiYXNlLmNvJztcbmNvbnN0IHN1cGFiYXNlS2V5ID0gJ2V5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSnpkWEJoWW1GelpTSXNJbkpsWmlJNkltaGhkMnBuZVhOdlptNTNhV1I0WVc1NWEzSnlJaXdpY205c1pTSTZJbUZ1YjI0aUxDSnBZWFFpT2pFM05ETXhOVFEyTXpRc0ltVjRjQ0k2TWpBMU9EY3pNRFl6TkgwLm85U2IxNGFjcjdFSk5kdDdCTGd3MTU2NkE1cEVnNVpFZkNpRHVEcWlBaEknO1xuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSk7Il0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwic3VwYWJhc2VLZXkiLCJzdXBhYmFzZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/supabase.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/AuthContext */ \"(pages-dir-node)/./context/AuthContext.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_3__]);\nreact_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n // Assuming you have global styles\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AuthContext__WEBPACK_IMPORTED_MODULE_1__.AuthProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/workspaces/gambleIT/pages/_app.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hot_toast__WEBPACK_IMPORTED_MODULE_3__.Toaster, {}, void 0, false, {\n                fileName: \"/workspaces/gambleIT/pages/_app.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/workspaces/gambleIT/pages/_app.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBc0Q7QUFDdkIsQ0FBQyxrQ0FBa0M7QUFDeEI7QUFFMUMsU0FBU0UsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNyQyxxQkFDRSw4REFBQ0osOERBQVlBOzswQkFDWCw4REFBQ0c7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7OzBCQUN4Qiw4REFBQ0gsb0RBQU9BOzs7Ozs7Ozs7OztBQUdkO0FBRUEsaUVBQWVDLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL2dhbWJsZUlUL3BhZ2VzL19hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC9BdXRoQ29udGV4dCc7XG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7IC8vIEFzc3VtaW5nIHlvdSBoYXZlIGdsb2JhbCBzdHlsZXNcbmltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tICdyZWFjdC1ob3QtdG9hc3QnO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8QXV0aFByb3ZpZGVyPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPFRvYXN0ZXIgLz5cbiAgICA8L0F1dGhQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7Il0sIm5hbWVzIjpbIkF1dGhQcm92aWRlciIsIlRvYXN0ZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-hot-toast":
/*!**********************************!*\
  !*** external "react-hot-toast" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

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