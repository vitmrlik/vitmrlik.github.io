(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\home\vitmrlik.github.io\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @agm/core */ "pxUr");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var agm_overlays__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! agm-overlays */ "isNg");




const _c0 = function (a0) { return { "opacity": a0 }; };
function AppComponent_agm_overlay_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "agm-overlay", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("latitude", ctx_r0.oldMapPosition.lat)("longitude", ctx_r0.oldMapPosition.lng)("bounds", ctx_r0.oldMapPosition.bounds);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c0, ctx_r0.opacity));
} }
function AppComponent_agm_marker_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "agm-marker", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "agm-info-window");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Vytvo\u0159it m\u00EDsto ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " + ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const m_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("latitude", m_r2.lat)("longitude", m_r2.lng)("label", m_r2.label)("markerDraggable", m_r2.draggable);
} }
class AppComponent {
    constructor(zone) {
        this.zone = zone;
        this.title = 'mal-maps';
        this.showOldMap = true;
        this.opacity = 0.1;
        // map zoom level
        this.zoom = 15;
        // initial center position for the map
        this.defaultMapPosition = {
            lat: 49.20812882290773,
            lng: 17.595279087712342,
        };
        this.oldMapPosition = {
            lat: 49.20169028265298,
            lng: 17.589803490611967,
            bounds: {
                x: {
                    latitude: 0,
                    longitude: 0
                },
                y: {
                    latitude: 0.0108,
                    longitude: 0.0132
                }
            }
        };
        this.markers = [
        // {
        //   lat: 51.673858,
        //   lng: 7.815982,
        //   label: 'A',
        //   draggable: true
        // },
        // {
        //   lat: 51.373858,
        //   lng: 7.215982,
        //   label: 'B',
        //   draggable: false
        // },
        // {
        //   lat: 51.723858,
        //   lng: 7.895982,
        //   label: 'C',
        //   draggable: true
        // }
        ];
    }
    oldMapShowToggle() {
        this.showOldMap = !this.showOldMap;
    }
    mapClicked(lat, lng) {
        console.log(`{
        lat: ${lat},
        lng: ${lng},
      }`);
        this.oldMapPosition = Object.assign(Object.assign({}, this.oldMapPosition), { lat: lat, lng: lng });
        // this.markers.push({
        //   lat: lat,
        //   lng: lng,
        //   draggable: false
        // });
    }
    mapReadyHandler(map) {
        this.map = map;
        this.mapClickListener = this.map.addListener('click', (e) => {
            this.zone.run(() => {
                this.mapClicked(e.latLng.lat(), e.latLng.lng());
            });
        });
    }
    ngOnDestroy() {
        if (this.mapClickListener) {
            this.mapClickListener.remove();
        }
    }
    setOpacity(number) {
        this.showOldMap = true;
        this.opacity = number;
    }
    setBoundLat(number) {
        this.showOldMap = false;
        this.oldMapPosition.bounds.y.latitude = this.oldMapPosition.bounds.y.latitude + number;
        this.oldMapPosition.bounds.y.longitude = this.oldMapPosition.bounds.y.longitude + number;
        this.showOldMap = true;
        console.log(this.oldMapPosition.bounds.y);
    }
    setBoundLng(number) {
        this.oldMapPosition.bounds.y.longitude = this.oldMapPosition.bounds.y.longitude + number;
        console.log(this.oldMapPosition.bounds);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 14, vars: 7, consts: [[2, "margin", "8px"], [3, "click"], [3, "latitude", "longitude", "zoom", "disableDefaultUI", "zoomControl", "mapReady"], [3, "latitude", "longitude", "bounds", 4, "ngIf"], [3, "latitude", "longitude", "label", "markerDraggable", 4, "ngFor", "ngForOf"], [3, "latitude", "longitude", "bounds"], ["src", "assets/old-map-md.jpg", "alt", "mapa", 2, "width", "1px", "height", "1px", 3, "ngStyle"], [3, "latitude", "longitude", "label", "markerDraggable"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Historick\u00E1 Mapka Malenovic");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_3_listener() { return ctx.oldMapShowToggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "zobrazit/skr\u00FDt mapu");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_5_listener() { return ctx.setOpacity(0.1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "0.1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_7_listener() { return ctx.setOpacity(0.4); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "0.4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_9_listener() { return ctx.setOpacity(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "1.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "agm-map", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mapReady", function AppComponent_Template_agm_map_mapReady_11_listener($event) { return ctx.mapReadyHandler($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, AppComponent_agm_overlay_12_Template, 2, 6, "agm-overlay", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, AppComponent_agm_marker_13_Template, 6, 4, "agm-marker", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("latitude", ctx.defaultMapPosition.lat)("longitude", ctx.defaultMapPosition.lng)("zoom", ctx.zoom)("disableDefaultUI", false)("zoomControl", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showOldMap);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.markers);
    } }, directives: [_agm_core__WEBPACK_IMPORTED_MODULE_1__["AgmMap"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], agm_overlays__WEBPACK_IMPORTED_MODULE_3__["AgmOverlay"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgStyle"], _agm_core__WEBPACK_IMPORTED_MODULE_1__["AgmMarker"], _agm_core__WEBPACK_IMPORTED_MODULE_1__["AgmInfoWindow"]], styles: ["agm-map[_ngcontent-%COMP%] {\n  height: 800px;\n}\n\nh2[_ngcontent-%COMP%] {\n  font-family: -webkit-pictograph, sans-serif !important;\n  color: dimgray;\n  margin: 10px;\n}\n\nbutton[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 12px;\n  margin-right: 4px;\n  margin-left: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0Usc0RBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0Usc0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYWdtLW1hcCB7XHJcbiAgaGVpZ2h0OiA4MDBweDtcclxufVxyXG5cclxuaDIge1xyXG4gIGZvbnQtZmFtaWx5OiAtd2Via2l0LXBpY3RvZ3JhcGgsIHNhbnMtc2VyaWYgIWltcG9ydGFudDtcclxuICBjb2xvcjogZGltZ3JheTtcclxuICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbmJ1dHRvbiB7XHJcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDA7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @agm/core */ "pxUr");
/* harmony import */ var agm_overlays__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! agm-overlays */ "isNg");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _agm_core__WEBPACK_IMPORTED_MODULE_4__["AgmCoreModule"].forRoot({
                // please get your own API key here:
                // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
                apiKey: ''
            }),
            agm_overlays__WEBPACK_IMPORTED_MODULE_5__["AgmOverlays"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _agm_core__WEBPACK_IMPORTED_MODULE_4__["AgmCoreModule"], agm_overlays__WEBPACK_IMPORTED_MODULE_5__["AgmOverlays"]] }); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map