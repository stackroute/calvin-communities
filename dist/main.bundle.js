webpackJsonp([1,5],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunityPageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommunityPageService = (function () {
    function CommunityPageService(_http) {
        this._http = _http;
    }
    CommunityPageService.prototype.getCommunityDetails = function (domain) {
        return this._http.get('/api/v1/communities/' + domain).map(function (res) { return res.json(); });
    };
    CommunityPageService.prototype.getMembers = function (domain) {
        return this._http.get('/api/v1/communitymembership/' + domain + '/members').map(function (res) { return res.json(); });
    };
    CommunityPageService.prototype.getTools = function (domain) {
        return this._http.get('/api/v1/communitytools/' + domain).map(function (res) { return res.json(); });
    };
    CommunityPageService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], CommunityPageService);
    return CommunityPageService;
    var _a;
}());

//# sourceMappingURL=community-page.service.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardGraphService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var url = "http://localhost:3000";
var DashboardGraphService = (function () {
    function DashboardGraphService(http) {
        this.http = http;
    }
    ;
    DashboardGraphService.prototype.getPurposes = function () {
        return this.http.get(url + "/api/v1/communitytemplates/allpurposes").map(function (res) { return res.json(); });
    };
    DashboardGraphService.prototype.getAllCommunities = function () {
        return this.http.get(url + "/api/v1/communities").map(function (res) { return res.json(); });
    };
    DashboardGraphService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], DashboardGraphService);
    return DashboardGraphService;
    var _a;
}());

//# sourceMappingURL=dashboard-graphs.service.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__(447),
            styles: [__webpack_require__(422)]
        })
    ], DashboardComponent);
    return DashboardComponent;
}());

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TemplatesComponent = (function () {
    function TemplatesComponent(TemplateService, route, router) {
        this.TemplateService = TemplateService;
        this.route = route;
        this.router = router;
        this.getResults = [];
        this.getPurpose = [];
        this.counter = [];
    }
    TemplatesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.TemplateService.selectTemplates().subscribe(function (data) {
            _this.getResults = data;
            _this.getResults.forEach(function (data) {
                console.log(_this.getPurpose.includes(data.purpose));
                if (!(_this.getPurpose.includes(data.purpose))) {
                    _this.getPurpose.push(data.purpose);
                }
            });
            _this.getCount();
        });
    };
    TemplatesComponent.prototype.select = function (val) {
        var _this = this;
        console.log(val);
        this.TemplateService.getAllTemplates(val).subscribe(function (data) {
            _this.getResults = data;
        });
    };
    TemplatesComponent.prototype.getCount = function () {
        var _this = this;
        var flag = false;
        var count = 0;
        console.log("result");
        this.TemplateService.selectTemplates()
            .subscribe(function (p) {
            _this.getpurpose = p;
            _this.TemplateService.getAllCommunities()
                .subscribe(function (domains) {
                _this.domains = domains;
                _this.getpurpose.forEach(function (template) {
                    _this.domains.forEach(function (domain) {
                        if (domain.template.toLowerCase() === template.name.toLowerCase()) {
                            console.log(domain.template);
                            console.log(template.name);
                            count++;
                            console.log(count);
                            flag = true;
                        }
                    });
                    _this.counter.push({ value: count, type: template.name });
                    count = 0;
                });
            });
        });
    };
    //  console.log(this.getResults);
    TemplatesComponent.prototype.redirect = function (template) {
        this.router.navigate(['/templates/communities/' + template]);
    };
    TemplatesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__(451),
            styles: [__webpack_require__(426)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__templates_service__["a" /* TemplatesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__templates_service__["a" /* TemplatesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object])
    ], TemplatesComponent);
    return TemplatesComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=templates.component.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatesService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TemplatesService = (function () {
    function TemplatesService(http) {
        this.http = http;
    }
    ;
    TemplatesService.prototype.selectTemplates = function () {
        return this.http.get("api/v1/communitytemplates/").map(function (response) { return response.json(); });
    };
    TemplatesService.prototype.getAllTemplates = function (value) {
        console.log("hello");
        return this.http.get('/api/v1/communitytemplates?purpose=' + value).map(function (res) { return res.json(); });
    };
    TemplatesService.prototype.getAllCommunities = function () {
        return this.http.get("/api/v1/communities").map(function (res) { return res.json(); });
    };
    TemplatesService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], TemplatesService);
    return TemplatesService;
    var _a;
}());

//# sourceMappingURL=templates.service.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_tools_service__ = __webpack_require__(106);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToolsComponent = (function () {
    function ToolsComponent(toolservice) {
        this.toolservice = toolservice;
        this.tools = [];
    }
    ToolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.toolservice.getTools().subscribe(function (data) {
            _this.tools = data;
            console.log(_this.tools);
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('tools'),
        __metadata("design:type", String)
    ], ToolsComponent.prototype, "domain", void 0);
    ToolsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'Tools',
            template: __webpack_require__(453),
            styles: [__webpack_require__(427)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__tools_tools_service__["a" /* ToolService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__tools_tools_service__["a" /* ToolService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__tools_tools_service__["a" /* ToolService */]) === "function" && _a || Object])
    ], ToolsComponent);
    return ToolsComponent;
    var _a;
}());

//# sourceMappingURL=tools.component.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ToolService = (function () {
    function ToolService(http) {
        this.http = http;
    }
    ToolService.prototype.getTools = function () {
        return this.http
            .get('/api/v1/tools')
            .map(function (response) { return response.json(); });
    };
    ToolService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], ToolService);
    return ToolService;
    var _a;
}());

//# sourceMappingURL=tools.service.js.map

/***/ }),

/***/ 265:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 265;


/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(303);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_templates_component__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__communities_communities_component__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tools_tools_component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__community_page_community_page_component__ = __webpack_require__(99);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__["a" /* DashboardComponent */]
    },
    {
        path: 'tools',
        component: __WEBPACK_IMPORTED_MODULE_5__tools_tools_component__["a" /* ToolsComponent */]
    },
    {
        path: 'templates',
        component: __WEBPACK_IMPORTED_MODULE_2__templates_templates_component__["a" /* TemplatesComponent */]
    },
    {
        path: 'communities/:domain',
        component: __WEBPACK_IMPORTED_MODULE_6__community_page_community_page_component__["a" /* CommunityPageComponent */]
    },
    {
        path: 'communities',
        component: __WEBPACK_IMPORTED_MODULE_3__communities_communities_component__["a" /* CommunitiesComponent */]
    },
    {
        path: 'templates/communities/:template',
        component: __WEBPACK_IMPORTED_MODULE_3__communities_communities_component__["a" /* CommunitiesComponent */]
    },
    {
        path: 'purpose/communities/:purpose',
        component: __WEBPACK_IMPORTED_MODULE_3__communities_communities_component__["a" /* CommunitiesComponent */]
    },
    { path: '**', redirectTo: '/dashboard' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(routes, { useHash: true })],
            exports: [__WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calvin-root',
            template: __webpack_require__(443),
            styles: [__webpack_require__(418)]
        })
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_d3__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_nvd3__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_nvd3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_nvd3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_nvd3__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_nvd3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng2_nvd3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_charts__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_routing_module__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dashboard_dashboard_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__dashboard_graphs_dashboard_graphs_component__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__dashboard_graphs_dashboard_graphs_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__notifications_notifications_component__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__templates_templates_component__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__communities_communities_component__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__communities_communities_service__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__templates_templates_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__tools_tools_component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__tools_tools_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__tools_graph_tools_graph_component__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__community_page_community_page_service__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__community_page_community_page_component__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__foot_note_foot_note_component__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__navigation_navigation_component__ = __webpack_require__(298);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_15__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_16__dashboard_graphs_dashboard_graphs_component__["a" /* DashboardGraphsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__notifications_notifications_component__["a" /* NotificationsComponent */],
                __WEBPACK_IMPORTED_MODULE_19__templates_templates_component__["a" /* TemplatesComponent */],
                __WEBPACK_IMPORTED_MODULE_20__communities_communities_component__["a" /* CommunitiesComponent */],
                __WEBPACK_IMPORTED_MODULE_23__tools_tools_component__["a" /* ToolsComponent */],
                __WEBPACK_IMPORTED_MODULE_25__tools_graph_tools_graph_component__["a" /* ToolsGraphComponent */],
                __WEBPACK_IMPORTED_MODULE_11_ng2_nvd3__["NvD3Component"],
                __WEBPACK_IMPORTED_MODULE_27__community_page_community_page_component__["a" /* CommunityPageComponent */],
                __WEBPACK_IMPORTED_MODULE_28__foot_note_foot_note_component__["a" /* FootNoteComponent */],
                __WEBPACK_IMPORTED_MODULE_29__navigation_navigation_component__["a" /* NavigationComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MaterialModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__["FlexLayoutModule"],
                __WEBPACK_IMPORTED_MODULE_13__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_12_ng2_charts__["ChartsModule"]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_24__tools_tools_service__["a" /* ToolService */], __WEBPACK_IMPORTED_MODULE_22__templates_templates_service__["a" /* TemplatesService */],
                __WEBPACK_IMPORTED_MODULE_17__dashboard_graphs_dashboard_graphs_service__["a" /* DashboardGraphService */], __WEBPACK_IMPORTED_MODULE_21__communities_communities_service__["a" /* CommunitiesService */], __WEBPACK_IMPORTED_MODULE_26__community_page_community_page_service__["a" /* CommunityPageService */],],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */]],
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_graphs_service__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardGraphsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardGraphsComponent = (function () {
    function DashboardGraphsComponent(GraphService, router, route) {
        this.GraphService = GraphService;
        this.router = router;
        this.route = route;
        this.count = [];
    }
    DashboardGraphsComponent.prototype.ngOnInit = function () {
        this.flag = 0;
        this.getGraphDetails();
    };
    DashboardGraphsComponent.prototype.getGraphDetails = function () {
        var _this = this;
        var flag = false;
        var count = 0;
        this.GraphService.getPurposes()
            .subscribe(function (p) {
            _this.purposes = p;
            _this.GraphService.getAllCommunities()
                .subscribe(function (domains) {
                _this.domains = domains;
                _this.purposes.forEach(function (purpose) {
                    _this.domains.forEach(function (domain) {
                        if (domain.purpose.toLowerCase() == purpose.toLowerCase()) {
                            count++;
                            flag = true;
                        }
                    });
                    _this.count.push({ type: purpose, value: count });
                    count = 0;
                });
                _this.flag = 1;
                if (flag) {
                    _this.getGraph(_this.count);
                }
                if (!flag) {
                    _this.getGraph([]);
                }
            });
        });
    };
    DashboardGraphsComponent.prototype.getGraph = function (data) {
        var _this = this;
        this.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function (d) { return d.type; },
                y: function (d) { return d.value; },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.02,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                },
                pie: {
                    dispatch: {
                        elementClick: function (e) {
                            _this.router.navigate(['/purpose/communities/' + e.data.type]);
                        },
                    }
                }
            }
        };
        this.data = data;
    };
    DashboardGraphsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calvin-dashboard-graphs',
            template: __webpack_require__(446),
            styles: [__webpack_require__(417), __webpack_require__(421)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__dashboard_graphs_service__["a" /* DashboardGraphService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dashboard_graphs_service__["a" /* DashboardGraphService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
    ], DashboardGraphsComponent);
    return DashboardGraphsComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=dashboard-graphs.component.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FootNoteComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FootNoteComponent = (function () {
    function FootNoteComponent() {
    }
    FootNoteComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calvin-foot-note',
            template: __webpack_require__(448),
            styles: [__webpack_require__(423)]
        })
    ], FootNoteComponent);
    return FootNoteComponent;
}());

//# sourceMappingURL=foot-note.component.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavigationComponent = (function () {
    function NavigationComponent() {
        this.isDarkTheme = false;
        this.navigation = [
            { logo: 'dashboard', link: 'dashboard', label: 'Dashboard' },
            { logo: 'group', link: 'communities', label: 'Communities' },
            { logo: 'build', link: 'tools', label: 'Tools' },
            { logo: 'bookmark', link: 'templates', label: 'Templates' },
        ];
    }
    NavigationComponent.prototype.ngOnInit = function () { };
    NavigationComponent.prototype.toggle = function () {
        this.isDarkTheme = this.isDarkTheme === false ? true : false;
    };
    NavigationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calvin-navigation',
            template: __webpack_require__(449),
            styles: [__webpack_require__(424)]
        }),
        __metadata("design:paramtypes", [])
    ], NavigationComponent);
    return NavigationComponent;
}());

//# sourceMappingURL=navigation.component.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_service__ = __webpack_require__(300);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationsComponent = (function () {
    function NotificationsComponent(socketService) {
        this.socketService = socketService;
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        this.initIoConnection();
    };
    NotificationsComponent.prototype.initIoConnection = function () {
        var _this = this;
        this.ioConnection = this.socketService.get().subscribe(function (newNotification) {
            _this.notifications.push(newNotification);
        });
    };
    NotificationsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calvin-notifications',
            template: __webpack_require__(450),
            styles: [__webpack_require__(425)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__socket_service__["a" /* SocketService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__socket_service__["a" /* SocketService */]) === "function" && _a || Object])
    ], NotificationsComponent);
    return NotificationsComponent;
    var _a;
}());

//# sourceMappingURL=notifications.component.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SocketService = (function () {
    function SocketService() {
        this.initSocket();
    }
    SocketService.prototype.initSocket = function () {
        //No URL is being passed, as it default connects with current host itself
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__();
    };
    SocketService.prototype.send = function (message) {
        this.socket.emit('message', message);
    };
    SocketService.prototype.get = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('notification', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], SocketService);
    return SocketService;
}());

//# sourceMappingURL=socket.service.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_graph_service__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolsGraphComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ToolsGraphComponent = (function () {
    function ToolsGraphComponent(GraphService) {
        this.GraphService = GraphService;
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = [this.tools];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: this.tools, label: 'Tools' },
            { data: this.count, label: 'Domains' }
        ];
    }
    ;
    ToolsGraphComponent.prototype.ngOnInit = function () {
        this.getToolsGraphDetails();
    };
    ToolsGraphComponent.prototype.getToolsGraphDetails = function () {
        var _this = this;
        var count, tool;
        this.GraphService.getDomainsAndTools()
            .subscribe(function (tools) {
            _this.tools = tools;
            _this.tools.forEach(function (tool) {
                count = tool.domains.length;
            });
            console.log("length", count);
            console.log("check", _this.tools);
        });
    };
    // events
    ToolsGraphComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ToolsGraphComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ToolsGraphComponent.prototype.randomize = function () {
        var clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = this.data;
        this.barChartData = clone;
    };
    ToolsGraphComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calvin-tools-graph',
            template: __webpack_require__(452)
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__tools_graph_service__["a" /* ToolsGraphService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__tools_graph_service__["a" /* ToolsGraphService */]) === "function" && _a || Object])
    ], ToolsGraphComponent);
    return ToolsGraphComponent;
    var _a;
}());

//# sourceMappingURL=tools-graph.component.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolsGraphService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var url = "http://localhost:3000";
var ToolsGraphService = (function () {
    function ToolsGraphService(http) {
        this.http = http;
    }
    ;
    ToolsGraphService.prototype.getDomainsAndTools = function () {
        return this.http.get(url + "/api/v1/tools").map(function (res) { return res.json(); });
    };
    ToolsGraphService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], ToolsGraphService);
    return ToolsGraphService;
    var _a;
}());

//# sourceMappingURL=tools-graph.service.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "md-card{\n\tmargin:10px;\n}\nmd-card-content p{\n\ttext-align: justify;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".search {\n  margin-top: 20px;\n  text-align: center;\n  width: 100%;\n  min-height: 100px;\n}\n\n.search>a {\n  width: 100%;\n  height: 100%;\n}\n\n.container {\n  margin-top: 1px;\n}\n\nbutton {\n  min-height: 50px;\n  width: 100%;\n  text-align: left;\n  font-weight: bold;\n}\n\n.column-2,\n.column-1,\nmd-nav-list {\n  background-color: #2d3e4e;\n  color: white;\n}\n.md-headline {\n    font-size: 20px;\n    font-weight: bold;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".top-gap {\n\tmargin-top: 30px;\n}\n\n.nv-label text{\n    font-size:16px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".top-gap {\n\tmargin-top: 30px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "md-sidenav {\n\twidth: 300px;\n  max-width: 300px;\n}\n\n.logo {\n\tmargin-left: 20px;\n\theight: 60%;\n}\n\n\n#sidebar-logo {\n\theight: 60%;\n}\n\n.spacer {\n\t-webkit-box-flex: 1;\n\t    -ms-flex: 1 1 auto;\n\t        flex: 1 1 auto;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".top-gap {\n\tmargin-top: 60px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "\nmd-card {\n\tmargin: 10px;\n}\n\n\n.list-communities\n{\n    margin-left: 20px;\n    margin-right: 10px;\n}\n/*\n.tools{\n    margin-left: 60px;\n}\n\n.roles{\n    margin-left:-10px;\n}*/\n\n.height {\n  height: 300px;\n}\n.chip\n{\n    padding-right: 2%;\n    padding-top: 5px;\n\n}\n.chiprole\n{\n padding-right: 2%;\npadding-top: 5px;\n   \n   \n}\n.chipsrole\n{\n   background:#FBFCFC;\n   color:#2C3E50;\n}\n.chips\n{\n background:#FBFCFC;\n   color:#2C3E50  ;\n}\n.roles\n{\n      padding-top: 10px;\n}\n.chiptool\n{\n    padding-right: 2%;\n    padding-top: 5px;\n}\n.tools\n{\n  padding-top: 10px;\n}\n.example-form {\n  width: 100%;\n}\n\n.example-full-width {\n  width: 100%;\n}\n.end{\n    margin-top: 5px;\n    color:#2C3E50\n}\na{\n    cursor:pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "/*.card-align\n{\n    background-color: #A8BABA;\n    padding-left:10%;\n}*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 127,
	"./af.js": 127,
	"./ar": 134,
	"./ar-dz": 128,
	"./ar-dz.js": 128,
	"./ar-kw": 129,
	"./ar-kw.js": 129,
	"./ar-ly": 130,
	"./ar-ly.js": 130,
	"./ar-ma": 131,
	"./ar-ma.js": 131,
	"./ar-sa": 132,
	"./ar-sa.js": 132,
	"./ar-tn": 133,
	"./ar-tn.js": 133,
	"./ar.js": 134,
	"./az": 135,
	"./az.js": 135,
	"./be": 136,
	"./be.js": 136,
	"./bg": 137,
	"./bg.js": 137,
	"./bn": 138,
	"./bn.js": 138,
	"./bo": 139,
	"./bo.js": 139,
	"./br": 140,
	"./br.js": 140,
	"./bs": 141,
	"./bs.js": 141,
	"./ca": 142,
	"./ca.js": 142,
	"./cs": 143,
	"./cs.js": 143,
	"./cv": 144,
	"./cv.js": 144,
	"./cy": 145,
	"./cy.js": 145,
	"./da": 146,
	"./da.js": 146,
	"./de": 149,
	"./de-at": 147,
	"./de-at.js": 147,
	"./de-ch": 148,
	"./de-ch.js": 148,
	"./de.js": 149,
	"./dv": 150,
	"./dv.js": 150,
	"./el": 151,
	"./el.js": 151,
	"./en-au": 152,
	"./en-au.js": 152,
	"./en-ca": 153,
	"./en-ca.js": 153,
	"./en-gb": 154,
	"./en-gb.js": 154,
	"./en-ie": 155,
	"./en-ie.js": 155,
	"./en-nz": 156,
	"./en-nz.js": 156,
	"./eo": 157,
	"./eo.js": 157,
	"./es": 159,
	"./es-do": 158,
	"./es-do.js": 158,
	"./es.js": 159,
	"./et": 160,
	"./et.js": 160,
	"./eu": 161,
	"./eu.js": 161,
	"./fa": 162,
	"./fa.js": 162,
	"./fi": 163,
	"./fi.js": 163,
	"./fo": 164,
	"./fo.js": 164,
	"./fr": 167,
	"./fr-ca": 165,
	"./fr-ca.js": 165,
	"./fr-ch": 166,
	"./fr-ch.js": 166,
	"./fr.js": 167,
	"./fy": 168,
	"./fy.js": 168,
	"./gd": 169,
	"./gd.js": 169,
	"./gl": 170,
	"./gl.js": 170,
	"./gom-latn": 171,
	"./gom-latn.js": 171,
	"./he": 172,
	"./he.js": 172,
	"./hi": 173,
	"./hi.js": 173,
	"./hr": 174,
	"./hr.js": 174,
	"./hu": 175,
	"./hu.js": 175,
	"./hy-am": 176,
	"./hy-am.js": 176,
	"./id": 177,
	"./id.js": 177,
	"./is": 178,
	"./is.js": 178,
	"./it": 179,
	"./it.js": 179,
	"./ja": 180,
	"./ja.js": 180,
	"./jv": 181,
	"./jv.js": 181,
	"./ka": 182,
	"./ka.js": 182,
	"./kk": 183,
	"./kk.js": 183,
	"./km": 184,
	"./km.js": 184,
	"./kn": 185,
	"./kn.js": 185,
	"./ko": 186,
	"./ko.js": 186,
	"./ky": 187,
	"./ky.js": 187,
	"./lb": 188,
	"./lb.js": 188,
	"./lo": 189,
	"./lo.js": 189,
	"./lt": 190,
	"./lt.js": 190,
	"./lv": 191,
	"./lv.js": 191,
	"./me": 192,
	"./me.js": 192,
	"./mi": 193,
	"./mi.js": 193,
	"./mk": 194,
	"./mk.js": 194,
	"./ml": 195,
	"./ml.js": 195,
	"./mr": 196,
	"./mr.js": 196,
	"./ms": 198,
	"./ms-my": 197,
	"./ms-my.js": 197,
	"./ms.js": 198,
	"./my": 199,
	"./my.js": 199,
	"./nb": 200,
	"./nb.js": 200,
	"./ne": 201,
	"./ne.js": 201,
	"./nl": 203,
	"./nl-be": 202,
	"./nl-be.js": 202,
	"./nl.js": 203,
	"./nn": 204,
	"./nn.js": 204,
	"./pa-in": 205,
	"./pa-in.js": 205,
	"./pl": 206,
	"./pl.js": 206,
	"./pt": 208,
	"./pt-br": 207,
	"./pt-br.js": 207,
	"./pt.js": 208,
	"./ro": 209,
	"./ro.js": 209,
	"./ru": 210,
	"./ru.js": 210,
	"./sd": 211,
	"./sd.js": 211,
	"./se": 212,
	"./se.js": 212,
	"./si": 213,
	"./si.js": 213,
	"./sk": 214,
	"./sk.js": 214,
	"./sl": 215,
	"./sl.js": 215,
	"./sq": 216,
	"./sq.js": 216,
	"./sr": 218,
	"./sr-cyrl": 217,
	"./sr-cyrl.js": 217,
	"./sr.js": 218,
	"./ss": 219,
	"./ss.js": 219,
	"./sv": 220,
	"./sv.js": 220,
	"./sw": 221,
	"./sw.js": 221,
	"./ta": 222,
	"./ta.js": 222,
	"./te": 223,
	"./te.js": 223,
	"./tet": 224,
	"./tet.js": 224,
	"./th": 225,
	"./th.js": 225,
	"./tl-ph": 226,
	"./tl-ph.js": 226,
	"./tlh": 227,
	"./tlh.js": 227,
	"./tr": 228,
	"./tr.js": 228,
	"./tzl": 229,
	"./tzl.js": 229,
	"./tzm": 231,
	"./tzm-latn": 230,
	"./tzm-latn.js": 230,
	"./tzm.js": 231,
	"./uk": 232,
	"./uk.js": 232,
	"./ur": 233,
	"./ur.js": 233,
	"./uz": 235,
	"./uz-latn": 234,
	"./uz-latn.js": 234,
	"./uz.js": 235,
	"./vi": 236,
	"./vi.js": 236,
	"./x-pseudo": 237,
	"./x-pseudo.js": 237,
	"./yo": 238,
	"./yo.js": 238,
	"./zh-cn": 239,
	"./zh-cn.js": 239,
	"./zh-hk": 240,
	"./zh-hk.js": 240,
	"./zh-tw": 241,
	"./zh-tw.js": 241
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 433;


/***/ }),

/***/ 443:
/***/ (function(module, exports) {

module.exports = "<calvin-navigation></calvin-navigation>"

/***/ }),

/***/ 444:
/***/ (function(module, exports) {

module.exports = "<!-- <md-input-container>\n  <input mdInput color=\"accent\" mode=\"search\" placeholder=\"Search for a community...\">\n</md-input-container> -->\n<div fxLayout fxLayout.xs=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"30px\">\n  <div *ngIf=\"getFinalResults\" fxFlex=\"96%\" fxLayoutGap=\"2%\" fxLayoutWrap>\n    <div class=\"list-communities\" fxFlex=\"31%\" *ngFor=\"let data of getFinalResults\" fx-flex-fill>\n      <md-card>\n        <md-card-header>\n          <md-card-title>{{data.name}}</md-card-title>\n          <img md-card-avatar src={{data.avatar}}>\n          <md-card-title>{{data.domain}}</md-card-title>\n        </md-card-header>\n        <md-card-content>\n          <md-card-title>Purpose</md-card-title>\n          {{data.purpose}}\n        </md-card-content>\n        <md-card-content>\n          <md-card-title>Description</md-card-title>\n          {{data.description}}\n        </md-card-content>\n        <md-card-content>\n          <md-card-title>Tools</md-card-title>\n          <div *ngFor=\"let tools of data.toolid\">\n            <md-list>{{tools.toolid}}</md-list>\n          </div>\n        </md-card-content>\n        <md-card-actions fxLayoutAlign=\"end\">\n          <button md-raised-button color=\"accent\" (click)=\"redirect(data.domain)\">CommunityDetails</button>\n        </md-card-actions>\n      </md-card>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 445:
/***/ (function(module, exports) {

module.exports = "<div fxLayout fxLayout.xs=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\".2\">\n  <md-card fxFlex=\"55%\" class=\"parent card\">\n    <md-card-header>\n        <!-- <img md-card-avatar src={{communityObj.avatar}} /> -->\n        <!-- {{communityObj | json }} -->\n        <md-card-title>{{communityObj.name}}</md-card-title>\n        <md-card-subtitle>{{communityObj.purpose}}</md-card-subtitle>\n        <md-card-subtitle>Created by : {{communityObj.createdby}} On {{communityObj.createdon}}</md-card-subtitle>\n        <md-card-subtitle>Last Updated On : {{communityObj.updatedon}}</md-card-subtitle>\n    </md-card-header>\n    <br>\n    <md-card-content>\n      <div>\n        <img md-card-image src={{communityObj.avatar}} />\n      </div>\n      <div>\n        <h2>Description:</h2>\n        {{communityObj.description}}\n      </div>\n      <div><hr><br>\n        <h2 class=\"title\">Tools</h2>\n        <hr/>\n        <div>\n          <!--{{communityTools | json }}-->\n          <md-list>\n            <md-list-item *ngFor=\"let tool of communityTools.tools\">\n              <!-- <md-icon md-list-icon>keyboard_arrow_right</md-icon> -->\n              <h4 md-line>{{tool.toolid}}</h4>\n            </md-list-item>\n            <md-divider></md-divider>\n          </md-list>\n        </div>\n      </div>\n      <br>\n      <div>\n        <h2 class=\"title\">Members</h2>\n        <hr/>\n        <div>\n         <!--{{communityMembers | json }}-->\n          <md-list>\n            <md-list-item *ngFor=\"let member of communityMembers.MemberDetails\">\n              <md-icon md-list-icon>person</md-icon>\n              <h4 md-line>{{member.username}}</h4>\n              <p md-line> {{member.role}} </p>\n            </md-list-item>\n            <md-divider></md-divider>\n          </md-list>\n        </div>\n      </div>\n\n    </md-card-content>\n  </md-card>\n</div>\n"

/***/ }),

/***/ 446:
/***/ (function(module, exports) {

module.exports = "<div fxLayout fxLayout.xs=\"column\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\n  <div  fxFlex>\n    <md-card>\n      <md-card-title>Communities</md-card-title>\n      <md-card-subtitle>on the Basis of Purposes</md-card-subtitle>\n      <md-card-content>\n        <nvd3 *ngIf=\"flag===1\" [options]=\"options\" [data]=\"data\"></nvd3>\n        <div fxLayoutAlign=\"center center\">\n          <md-progress-spinner *ngIf=\"flag===0\" color=\"accent\" mode=\"indeterminate\">\n          </md-progress-spinner>\n        </div>\n      </md-card-content>\n    </md-card>\n  </div>\n</div>\n"

/***/ }),

/***/ 447:
/***/ (function(module, exports) {

module.exports = "<div class=\"top-gap\"\n     fxLayout\n     fxLayout.xs=\"column\"\n     fxLayoutAlign=\"center\"\n     fxLayoutGap=\"50px\"\n     fxLayoutGap.xs=\"0\">\n       <div #graphs fxFlex=\"60%\" >\n       <calvin-dashboard-graphs></calvin-dashboard-graphs>\n       </div>\n  <div #notifications fxFlex=\"20%\" >\n  <calvin-notifications></calvin-notifications>\n  </div>"

/***/ }),

/***/ 448:
/***/ (function(module, exports) {

module.exports = "<footer fxLayout=\"row\" fxLayoutAlign=\"center center\">\n   <h5>Copyright &#9400; Apache License 2.0 | All Rights Reserved</h5>\n </footer>"

/***/ }),

/***/ 449:
/***/ (function(module, exports) {

module.exports = "<div [class.dark]=\"isDarkTheme\">\n  <md-sidenav-container fullscreen class=\"sidenav-container\">\n    <md-sidenav #sidenav mode=\"push\" opened=\"false\">\n      <md-toolbar color=\"primary\">\n        <img routerLink=\"\" src=\"/assets/logo/logo.png\" id=\"sidebar-logo\" />\n        <div routerLink=\"\" class=\"mdc-typography--display4 logo\"><label routerLink=\"\">Calvin</label></div>\n      </md-toolbar>\n      <md-nav-list>\n        <a md-list-item *ngFor=\"let item of navigation\" (click)=\"sidenav.close()\" [routerLink]=\"[item.link]\" routerLinkActive=\"active\">\n          <md-icon>{{item.logo}}</md-icon> {{item.label}}\n        </a>\n      </md-nav-list>\n    </md-sidenav>\n    <md-toolbar color=\"primary\" class=\"mat-elevation-z2\">\n      <button md-icon-button class=\"hidden-md-up\" (click)=\"sidenav.toggle()\">\n        <md-icon>menu</md-icon>\n      </button>\n      <img routerLink=\"\" src=\"/assets/logo/logo.png\" class=\"logo\" />\n      <div class=\"mdc-typography--display4 logo\"><label routerLink=\"\">Calvin</label></div>\n      <span class=\"spacer\"></span>\n      <div class=\"mdc-typography--display4\">\n        <button md-button class=\"hidden-sm-down nav-button\" *ngFor=\"let item of navigation\" [routerLink]=\"[item.link]\" routerLinkActive=\"active\">\n          {{item.label}}\n        </button>\n        <md-slide-toggle color=\"primary\" (click)=\"toggle()\">\n        </md-slide-toggle>\n      </div>\n    </md-toolbar>\n    <div fxLayout=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\n      <div fxFlex>\n        <router-outlet></router-outlet>\n      </div>\n      <div fxFlex>\n       <!--  <calvin-foot-note></calvin-foot-note> -->\n      </div>\n    </div>\n  </md-sidenav-container>\n</div>\n"

/***/ }),

/***/ 450:
/***/ (function(module, exports) {

module.exports = "<div fxLayout fxLayout.xs=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\n  <div fxFlex=\"60%\" *ngFor=\"let message of notifications\" fx-flex-fill>\n    {{message}}\n  </div>\n</div>"

/***/ }),

/***/ 451:
/***/ (function(module, exports) {

module.exports = "<div>\n <md-select placeholder=\"Select your option\" style=\"margin-top:2%\"[(ngModel)]=\"selectedValue\" fxflex=\"100%\" fxLayoutAlign=\"center\">\n   <div *ngFor=\"let value of getPurpose\">\n    <md-option (click)=\"select(value)\">{{value}}\n    </md-option></div>\n    \n  </md-select>\n</div>\n\n\n<div fxLayout fxLayout.xs=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\n  <div *ngIf=\"getResults\" fxFlex=\"100%\" fxLayoutGap=\"2%\" fxLayoutWrap>\n    <div class=\"list-communities\" fxFlex=\"30%\" *ngFor=\"let data of getResults\" fx-flex-fill>\n      <div *ngFor=\"let data1 of counter\">\n        <div *ngIf=\"data1.type === data.name\">\n      <md-card>\n\n        <md-card-header>\n          <!--<img md-card-avatar src={{data.image}}>-->\n          <md-card-title><strong>{{data.name}}</strong></md-card-title>\n          <md-card-subtitle>{{data.purpose}}</md-card-subtitle>\n        </md-card-header>\n\n       <img md-card-image class=\"height\" src={{data.image}}>\n\n\n        <md-card-content>\n          <p>\n            {{data.description}}\n          </p>\n        </md-card-content>\n\n         <md-card-title class=\"tags\"><h6><strong>Tags</strong></h6></md-card-title>\n         <md-chip-list >\n         <div  *ngFor=\"let tag of data.tags\" class=\"chip\">\n        \n       <md-chip color=\"accent\" selected=\"true\">{{tag}}</md-chip>\n        </div>\n        </md-chip-list>\n        \n        <div>\n         <md-card-title class=\"tools\"><h6><strong>Tools</strong></h6></md-card-title>\n         <md-chip-list>\n         <div *ngFor=\"let tool of data.tools\" class=\"chiptool\" fxFlex=\"100%\">\n        <md-chip fxFlexLayout.xs=\"column\" fxFlex=\"100%\" class=\"chipsrole\">\n          <img md-card-avatar src={{tool.avatar}}>\n         <span>{{tool.toolId}}</span>\n        </md-chip>\n        </div>\n        </md-chip-list>\n        </div>\n\n        <md-card-title class=\"roles\"><h6><strong>Roles</strong></h6></md-card-title>\n         <md-chip-list>\n         <div *ngFor=\"let roles of data.roleActions\" class=\"chiprole\">\n        <md-chip class=\"chips\">{{roles.role}}</md-chip>\n        </div>\n        </md-chip-list>\n        <div fxLayoutAlign=\"end\" class=\"end\">\n        <a (click)=\"redirect(data.name)\">Communities-{{data1.value}}</a>\n        </div>\n      </md-card>\n      </div>  \n      </div>\n    </div>\n    </div>\n    </div>\n"

/***/ }),

/***/ 452:
/***/ (function(module, exports) {

module.exports = "\n    <div\n     fxLayout\n     fxLayout.xs=\"row\"\n     fxLayoutAlign=\"center\"\n     fxLayoutGap=\"10px\"\n     fxLayoutGap.xs=\"0\">\n       <div class=\"item item-3\" fxFlex >\n       <md-card>\n       <md-card-title>ToolsGraph</md-card-title>\n    <md-card-subtitle>Tools Used Frequently</md-card-subtitle>\n\n  <div style=\"display: block\">\n    <canvas baseChart\n            [datasets]=\"barChartData\"\n            [labels]=\"barChartLabels\"\n            [options]=\"barChartOptions\"\n            [legend]=\"barChartLegend\"\n            [chartType]=\"barChartType\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n  </div>\n  <button (click)=\"randomize()\">Update</button>\n  </md-card>\n</div>\n</div>\n \n\n\n"

/***/ }),

/***/ 453:
/***/ (function(module, exports) {

module.exports = "<div class=\"abc\">\n   <md-paginator [length]=\"100\" [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\">\n  </md-paginator>\n\n <md-list>\n    <h3 md-subheader>Tools-list listed</h3>\n    <md-list-item *ngFor=\"let val of tools\">\n      <img md-list-avatar src=\"{{val.avatar}}\">\n      <h4 md-line>{{val.toolname}}</h4>\n      <p md-line class=\"demo-2\"> {{val.toolid}} </p>\n     <p md-line class=\"demo-3\">{{val.domains.length}} Communities are Connected</p>\n    </md-list-item>\n  </md-list>\n\n</div>"

/***/ }),

/***/ 497:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(266);


/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__communities_service__ = __webpack_require__(98);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunitiesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommunitiesComponent = (function () {
    function CommunitiesComponent(communitiesService, router, route) {
        this.communitiesService = communitiesService;
        this.router = router;
        this.route = route;
        this.getCommunityResults = [];
        this.getToolsResults = [];
        this.getFinalResults = [];
    }
    ;
    CommunitiesComponent.prototype.getCommunity = function (value) {
        var _this = this;
        this.communitiesService.selectTools(value.domain).subscribe(function (resultTools) {
            _this.getToolsResults = resultTools;
            _this.getFinalResults.push({ domain: value.domain, name: value.name, purpose: value.purpose, description: value.description, avatar: value.avatar, owner: value.owner, updatedon: value.updatedon, status: value.status, toolid: resultTools.tools });
        }, function (error) { return console.log(error); }, function () { return console.log("finished"); });
    };
    CommunitiesComponent.prototype.doFilter = function (value) {
        this.template = this.route.snapshot.params['template'];
        this.purpose = this.route.snapshot.params['purpose'];
        if (this.template || this.purpose) {
            if (this.template) {
                if (value.template === this.template) {
                    this.getCommunity(value);
                }
            }
            else if (this.purpose) {
                if (value.purpose === this.purpose) {
                    this.getCommunity(value);
                }
            }
        }
    };
    CommunitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        if ((this.route.snapshot.params['template'] !== undefined) || (this.route.snapshot.params['purpose']) !== undefined) {
            this.communitiesService.selectCommunities().subscribe(function (resultCommunity) {
                _this.getCommunityResults = resultCommunity;
                resultCommunity.forEach(function (data) {
                    _this.doFilter(data);
                });
            }, function (error) { return (error); }, function () { return console.log("finished"); });
        }
        else {
            this.communitiesService.selectCommunities().subscribe(function (resultCommunity) {
                _this.getCommunityResults = resultCommunity;
                resultCommunity.forEach(function (data) {
                    _this.getCommunity(data);
                });
            }, function (error) { return (error); }, function () { return console.log("finished"); });
        }
    };
    CommunitiesComponent.prototype.redirect = function (domain) {
        this.router.navigate(['/communities/' + domain]);
    };
    CommunitiesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__(444),
            styles: [__webpack_require__(419)],
            providers: []
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__communities_service__["a" /* CommunitiesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__communities_service__["a" /* CommunitiesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
    ], CommunitiesComponent);
    return CommunitiesComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=communities.component.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunitiesService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommunitiesService = (function () {
    function CommunitiesService(http) {
        this.http = http;
    }
    ;
    CommunitiesService.prototype.selectCommunities = function () {
        return this.http.get("api/v1/communities")
            .map(function (response) { return response.json(); });
    };
    CommunitiesService.prototype.selectTools = function (domain) {
        return this.http.get('api/v1/communitytools/' + domain)
            .map(function (response) { return response.json(); });
    };
    CommunitiesService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], CommunitiesService);
    return CommunitiesService;
    var _a;
}());

//# sourceMappingURL=communities.service.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__community_page_service__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunityPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommunityPageComponent = (function () {
    function CommunityPageComponent(getpurposeservice, router, route) {
        this.getpurposeservice = getpurposeservice;
        this.router = router;
        this.route = route;
        this.alldata = ["domain1", "domain2"];
        this.arr = [];
        this.communityObj = {};
        this.communityMembers = {};
        this.communityTools = {};
        this.memberArray = [];
        this.toolsArray = [];
    }
    ;
    CommunityPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*  this.alldata.forEach(function(data)
            { */
        this.getpurposeservice.getCommunityDetails(this.route.snapshot.params['domain'])
            .subscribe(function (data) {
            _this.createdon = data.createdon;
            _this.updatedon = data.updatedon;
            //console.log("tryinggggggggggggg",this.createdon);
            _this.communityObj = data;
            //console.log("checking for prakhar",this.communityObj);
            data.createdon = __WEBPACK_IMPORTED_MODULE_3_moment__(_this.createdon).subtract(1, 'days').calendar();
            data.updatedon = __WEBPACK_IMPORTED_MODULE_3_moment__(_this.updatedon).subtract(1, 'days').calendar();
            //console.log("this is converted",this.createdon);
            _this.arr.push(data);
            //console.log("Angular Data",data);
            _this.getMembers(_this.route.snapshot.params['domain']);
            _this.getTools(_this.route.snapshot.params['domain']);
        }, function (error) { console.log(error); }, function () { return console.log("finished"); });
        /*})*/
    };
    CommunityPageComponent.prototype.getMembers = function (domain) {
        var _this = this;
        this.getpurposeservice.getMembers(domain)
            .subscribe(function (data) {
            _this.communityMembers = data;
            console.log(data.domain);
            // console.log(data.MemberDetails[0].username);        
            _this.memberArray.push(data);
            // console.log(this.memberArray);
        });
    };
    CommunityPageComponent.prototype.getTools = function (domain) {
        var _this = this;
        this.getpurposeservice.getTools(domain)
            .subscribe(function (data) {
            _this.communityTools = data;
            console.log(data);
            _this.toolsArray.push(data);
        });
    };
    CommunityPageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__(445),
            styles: [__webpack_require__(420)],
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__community_page_service__["a" /* CommunityPageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__community_page_service__["a" /* CommunityPageService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
    ], CommunityPageComponent);
    return CommunityPageComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=community-page.component.js.map

/***/ })

},[498]);
//# sourceMappingURL=main.bundle.js.map