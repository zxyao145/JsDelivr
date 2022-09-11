/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/layout/layout.scss":
/*!*************************************!*\
  !*** ./src/scss/layout/layout.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************************!*\
  !*** ./src/ts/layout/back-layout.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ../../scss/layout/layout.scss */ "./src/scss/layout/layout.scss");
(function () {
    //#region 导航菜单
    var parseMenu = function (menuArr) {
        var navItemArr = [];
        for (var i = 0; i < menuArr.length; i++) {
            var menuItem = menuArr[i];
            var navItem = void 0;
            if (menuItem.sub && menuItem.sub.length > 0) {
                var subNavItemArr = [];
                var sub = menuItem.sub;
                var subId = menuItem.subId;
                for (var j = 0; j < sub.length; j++) {
                    var menuSubItem = sub[j];
                    var subItem = "<li class=\"nav-item\">\n    <a class=\"nav-link\" href=\"" + menuSubItem.href + "\">" + menuSubItem.title + "</a>\n</li>";
                    subNavItemArr.push(subItem);
                }
                var subNav = "<div class=\"collapse\" id=\"" + subId + "\">\n    <ul class=\"nav flex-column sub-menu\">\n       " + subNavItemArr.join(" ") + "\n    </ul>\n</div>";
                navItem =
                    "<li class=\"nav-item\">\n    <a class=\"nav-link collapsed\" data-toggle=\"collapse\" href=\"#" + subId + "\" aria-expanded=\"false\" aria-controls=\"ui-basic\">\n        <i class=\"" + menuItem.icon + "\"></i>\n        <span class=\"menu-title\">" + menuItem.title + "</span>\n        <i class=\"menu-arrow\"></i>\n    </a>\n    " + subNav + "\n</li>";
            }
            else {
                navItem = "<li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"" + menuItem.href + "\">\n                            <i class=\"" + menuItem.icon + "\"></i>\n                            <span class=\"menu-title\">" + menuItem.title + "</span>\n                        </a>\n                    </li>";
            }
            navItemArr.push(navItem);
        }
        $("#sidebar>.nav").html(navItemArr.join(" "));
        window.activeMenu();
    };
    function getMenu() {
        $.get("/api/BackCmsHome/GetMenu", function (msg) {
            parseMenu(msg);
        });
    }
    //#endregion
    getMenu();
})();

})();

/******/ })()
;
//# sourceMappingURL=back-layout.bundle.js.map