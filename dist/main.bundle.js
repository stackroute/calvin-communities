webpackJsonp([1,5],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__communities_service__ = __webpack_require__(107);
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
    return CommunitiesComponent;
}());
CommunitiesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(453),
        styles: [__webpack_require__(429)],
        providers: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__communities_service__["a" /* CommunitiesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__communities_service__["a" /* CommunitiesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
], CommunitiesComponent);

var _a, _b, _c;
//# sourceMappingURL=communities.component.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(10);
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
    return CommunitiesService;
}());
CommunitiesService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], CommunitiesService);

var _a;
//# sourceMappingURL=communities.service.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__community_page_service__ = __webpack_require__(109);
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
    return CommunityPageComponent;
}());
CommunityPageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(454),
        styles: [__webpack_require__(430)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__community_page_service__["a" /* CommunityPageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__community_page_service__["a" /* CommunityPageService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
], CommunityPageComponent);

var _a, _b, _c;
//# sourceMappingURL=community-page.component.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(10);
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
    return CommunityPageService;
}());
CommunityPageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], CommunityPageService);

var _a;
//# sourceMappingURL=community-page.service.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(10);
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



var DashboardGraphService = (function () {
    function DashboardGraphService(http) {
        this.http = http;
    }
    ;
    DashboardGraphService.prototype.getPurposes = function () {
        return this.http.get("/api/v1/communitytemplates/allpurposes").map(function (res) { return res.json(); });
    };
    DashboardGraphService.prototype.getAllCommunities = function () {
        return this.http.get("/api/v1/communities").map(function (res) { return res.json(); });
    };
    return DashboardGraphService;
}());
DashboardGraphService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], DashboardGraphService);

var _a;
//# sourceMappingURL=dashboard-graphs.service.js.map

/***/ }),

/***/ 111:
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
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(456),
        styles: [__webpack_require__(432)]
    })
], DashboardComponent);

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_service__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(33);
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
        this.singular = ' Community ';
        this.plural = ' Communities ';
    }
    TemplatesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.TemplateService.selectTemplates().subscribe(function (data) {
            _this.getResults = data;
            _this.getResults.forEach(function (data) {
                if (!(_this.getPurpose.includes(data.purpose))) {
                    _this.getPurpose.push(data.purpose);
                }
            });
            _this.getCount();
        });
    };
    TemplatesComponent.prototype.select = function (val) {
        var _this = this;
        this.TemplateService.getAllTemplates(val).subscribe(function (data) {
            _this.getResults = data;
        });
    };
    TemplatesComponent.prototype.getCount = function () {
        var _this = this;
        var flag = false;
        var count = 0;
        this.TemplateService.selectTemplates()
            .subscribe(function (p) {
            _this.getpurpose = p;
            _this.TemplateService.getAllCommunities()
                .subscribe(function (domains) {
                _this.domains = domains;
                _this.getpurpose.forEach(function (template) {
                    _this.domains.forEach(function (domain) {
                        if (domain.template.toLowerCase() === template.name.toLowerCase()) {
                            count++;
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
    TemplatesComponent.prototype.redirect = function (template, count) {
        if (count !== 0) {
            this.router.navigate(['/templates/communities/' + template]);
        }
    };
    return TemplatesComponent;
}());
TemplatesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(460),
        styles: [__webpack_require__(436)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__templates_service__["a" /* TemplatesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__templates_service__["a" /* TemplatesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object])
], TemplatesComponent);

var _a, _b, _c;
//# sourceMappingURL=templates.component.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(10);
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
    return TemplatesService;
}());
TemplatesService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], TemplatesService);

var _a;
//# sourceMappingURL=templates.service.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_tools_service__ = __webpack_require__(115);
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
    return ToolsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('tools'),
    __metadata("design:type", String)
], ToolsComponent.prototype, "domain", void 0);
ToolsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'Tools',
        template: __webpack_require__(462),
        styles: [__webpack_require__(437)],
        providers: [__WEBPACK_IMPORTED_MODULE_1__tools_tools_service__["a" /* ToolService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__tools_tools_service__["a" /* ToolService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__tools_tools_service__["a" /* ToolService */]) === "function" && _a || Object])
], ToolsComponent);

var _a;
//# sourceMappingURL=tools.component.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(10);
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
    return ToolService;
}());
ToolService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ToolService);

var _a;
//# sourceMappingURL=tools.service.js.map

/***/ }),

/***/ 275:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 275;


/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(313);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_dashboard_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_templates_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__communities_communities_component__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tools_tools_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__community_page_community_page_component__ = __webpack_require__(108);
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
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(routes, { useHash: true })],
        exports: [__WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 303:
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
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'calvin-root',
        template: __webpack_require__(452),
        styles: [__webpack_require__(428)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(299);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MaterialModule = (function () {
    function MaterialModule() {
    }
    return MaterialModule;
}());
MaterialModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MdInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdSelectModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdCheckboxModule */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MdInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdSelectModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdCheckboxModule */],
        ]
    })
], MaterialModule);

//# sourceMappingURL=app.material.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_material_module__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_d3__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_nvd3__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_nvd3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_nvd3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_nvd3__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_nvd3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng2_nvd3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_charts__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_routing_module__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dashboard_dashboard_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__dashboard_graphs_dashboard_graphs_component__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__dashboard_graphs_dashboard_graphs_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__notifications_notifications_component__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__templates_templates_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__communities_communities_component__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__communities_communities_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__templates_templates_service__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__tools_tools_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__tools_tools_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__tools_graph_tools_graph_component__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__community_page_community_page_service__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__community_page_community_page_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__foot_note_foot_note_component__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__navigation_navigation_component__ = __webpack_require__(308);
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
    return AppModule;
}());
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
            __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_13__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_12_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_4__app_material_module__["a" /* MaterialModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_24__tools_tools_service__["a" /* ToolService */], __WEBPACK_IMPORTED_MODULE_22__templates_templates_service__["a" /* TemplatesService */],
            __WEBPACK_IMPORTED_MODULE_17__dashboard_graphs_dashboard_graphs_service__["a" /* DashboardGraphService */], __WEBPACK_IMPORTED_MODULE_21__communities_communities_service__["a" /* CommunitiesService */], __WEBPACK_IMPORTED_MODULE_26__community_page_community_page_service__["a" /* CommunityPageService */],],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */]],
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_graphs_service__ = __webpack_require__(110);
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
    return DashboardGraphsComponent;
}());
DashboardGraphsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'calvin-dashboard-graphs',
        template: __webpack_require__(455),
        styles: [__webpack_require__(427), __webpack_require__(431)],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__dashboard_graphs_service__["a" /* DashboardGraphService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dashboard_graphs_service__["a" /* DashboardGraphService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
], DashboardGraphsComponent);

var _a, _b, _c;
//# sourceMappingURL=dashboard-graphs.component.js.map

/***/ }),

/***/ 307:
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
    return FootNoteComponent;
}());
FootNoteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'calvin-foot-note',
        template: __webpack_require__(457),
        styles: [__webpack_require__(433)]
    })
], FootNoteComponent);

//# sourceMappingURL=foot-note.component.js.map

/***/ }),

/***/ 308:
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
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'calvin-navigation',
        template: __webpack_require__(458),
        styles: [__webpack_require__(434)]
    }),
    __metadata("design:paramtypes", [])
], NavigationComponent);

//# sourceMappingURL=navigation.component.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_service__ = __webpack_require__(310);
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
    //private count = 0;
    function NotificationsComponent(socketService, router) {
        this.socketService = socketService;
        this.router = router;
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        this.notifications = [];
        this.initIoConnection();
    };
    NotificationsComponent.prototype.redirect = function (domain) {
        this.router.navigate(['/communities/' + domain]);
    };
    NotificationsComponent.prototype.initIoConnection = function () {
        var _this = this;
        this.ioConnection = this.socketService.get().subscribe(function (newNotification) {
            _this.notifications.unshift(newNotification);
        });
        // this.notifications.forEach((data) => {
        // if(data.event === 'memberadded')
        // {
        //     console.log(this.count,"his")
        //     this.count++;
        // }
        // });
    };
    return NotificationsComponent;
}());
NotificationsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'calvin-notifications',
        template: __webpack_require__(459),
        styles: [__webpack_require__(435)],
        providers: [__WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], NotificationsComponent);

var _a, _b;
//# sourceMappingURL=notifications.component.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(499);
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
        this.socket.emit('message', { message: "hai" });
    };
    SocketService.prototype.get = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('communityEvent', function (data) {
                console.log("----->", JSON.parse(data));
                observer.next(JSON.parse(data));
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    return SocketService;
}());
SocketService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], SocketService);

//# sourceMappingURL=socket.service.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_graph_service__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(10);
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
    return ToolsGraphComponent;
}());
ToolsGraphComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'calvin-tools-graph',
        template: __webpack_require__(461)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__tools_graph_service__["a" /* ToolsGraphService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__tools_graph_service__["a" /* ToolsGraphService */]) === "function" && _a || Object])
], ToolsGraphComponent);

var _a;
//# sourceMappingURL=tools-graph.component.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(10);
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



var ToolsGraphService = (function () {
    function ToolsGraphService(http) {
        this.http = http;
    }
    ;
    ToolsGraphService.prototype.getDomainsAndTools = function () {
        return this.http.get("/api/v1/tools").map(function (res) { return res.json(); });
    };
    return ToolsGraphService;
}());
ToolsGraphService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ToolsGraphService);

var _a;
//# sourceMappingURL=tools-graph.service.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "md-card{\n\tmargin:10px;\n}\nmd-card-content p{\n\ttext-align: justify;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".search {\n  margin-top: 20px;\n  text-align: center;\n  width: 100%;\n  min-height: 100px;\n}\n\n.search>a {\n  width: 100%;\n  height: 100%;\n}\n\n.container {\n  margin-top: 1px;\n}\n\nbutton {\n  min-height: 50px;\n  width: 100%;\n  text-align: left;\n  font-weight: bold;\n}\n\n.column-2,\n.column-1,\nmd-nav-list {\n  background-color: #2d3e4e;\n  color: white;\n}\n.md-headline {\n    font-size: 20px;\n    font-weight: bold;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".top-gap {\n\tmargin-top: 30px;\n}\n\n.nv-label text{\n    font-size:16px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".top-gap {\n\tmargin-top: 30px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "md-sidenav {\n\twidth: 300px;\n  max-width: 300px;\n}\n\n.logo {\n\tmargin-left: 20px;\n\theight: 60%;\n}\n\n\n#sidebar-logo {\n\theight: 60%;\n}\n\n.spacer {\n\t-webkit-box-flex: 1;\n\t    -ms-flex: 1 1 auto;\n\t        flex: 1 1 auto;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".top-gap {\n\tmargin-top: 60px;\n}\n\n.content{\n   max-height: 500px;\n   overflow-y:auto;\n}\n.content::-webkit-scrollbar {\n  display: none;\n}\n\n.notifications {\n\ttext-align: left;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "\nmd-card {\n\tmargin: 10px;\n}\n\n\n.list-communities\n{\n    margin-left: 20px;\n    margin-right: 10px;\n}\n/*\n.tools{\n    margin-left: 60px;\n}\n\n.roles{\n    margin-left:-10px;\n}*/\n\n.height {\n  height: 300px;\n}\n.chip\n{\n    padding-right: 2%;\n    padding-top: 5px;\n\n}\n.chiprole\n{\n padding-right: 2%;\npadding-top: 5px;\n   \n   \n}\n.chipsrole\n{\n   background:#FBFCFC;\n   color:#2C3E50;\n}\n.chips\n{\n background:#FBFCFC;\n   color:#2C3E50  ;\n}\n.roles\n{\n      padding-top: 10px;\n}\n.chiptool\n{\n    padding-right: 2%;\n    padding-top: 5px;\n}\n.tools\n{\n  padding-top: 10px;\n}\n.example-form {\n  width: 100%;\n}\n\n.example-full-width {\n  width: 100%;\n}\n.end{\n    margin-top: 5px;\n    color:#2C3E50\n}\na{\n    cursor:pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "/*.card-align\n{\n    background-color: #A8BABA;\n    padding-left:10%;\n}*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 137,
	"./af.js": 137,
	"./ar": 144,
	"./ar-dz": 138,
	"./ar-dz.js": 138,
	"./ar-kw": 139,
	"./ar-kw.js": 139,
	"./ar-ly": 140,
	"./ar-ly.js": 140,
	"./ar-ma": 141,
	"./ar-ma.js": 141,
	"./ar-sa": 142,
	"./ar-sa.js": 142,
	"./ar-tn": 143,
	"./ar-tn.js": 143,
	"./ar.js": 144,
	"./az": 145,
	"./az.js": 145,
	"./be": 146,
	"./be.js": 146,
	"./bg": 147,
	"./bg.js": 147,
	"./bn": 148,
	"./bn.js": 148,
	"./bo": 149,
	"./bo.js": 149,
	"./br": 150,
	"./br.js": 150,
	"./bs": 151,
	"./bs.js": 151,
	"./ca": 152,
	"./ca.js": 152,
	"./cs": 153,
	"./cs.js": 153,
	"./cv": 154,
	"./cv.js": 154,
	"./cy": 155,
	"./cy.js": 155,
	"./da": 156,
	"./da.js": 156,
	"./de": 159,
	"./de-at": 157,
	"./de-at.js": 157,
	"./de-ch": 158,
	"./de-ch.js": 158,
	"./de.js": 159,
	"./dv": 160,
	"./dv.js": 160,
	"./el": 161,
	"./el.js": 161,
	"./en-au": 162,
	"./en-au.js": 162,
	"./en-ca": 163,
	"./en-ca.js": 163,
	"./en-gb": 164,
	"./en-gb.js": 164,
	"./en-ie": 165,
	"./en-ie.js": 165,
	"./en-nz": 166,
	"./en-nz.js": 166,
	"./eo": 167,
	"./eo.js": 167,
	"./es": 169,
	"./es-do": 168,
	"./es-do.js": 168,
	"./es.js": 169,
	"./et": 170,
	"./et.js": 170,
	"./eu": 171,
	"./eu.js": 171,
	"./fa": 172,
	"./fa.js": 172,
	"./fi": 173,
	"./fi.js": 173,
	"./fo": 174,
	"./fo.js": 174,
	"./fr": 177,
	"./fr-ca": 175,
	"./fr-ca.js": 175,
	"./fr-ch": 176,
	"./fr-ch.js": 176,
	"./fr.js": 177,
	"./fy": 178,
	"./fy.js": 178,
	"./gd": 179,
	"./gd.js": 179,
	"./gl": 180,
	"./gl.js": 180,
	"./gom-latn": 181,
	"./gom-latn.js": 181,
	"./he": 182,
	"./he.js": 182,
	"./hi": 183,
	"./hi.js": 183,
	"./hr": 184,
	"./hr.js": 184,
	"./hu": 185,
	"./hu.js": 185,
	"./hy-am": 186,
	"./hy-am.js": 186,
	"./id": 187,
	"./id.js": 187,
	"./is": 188,
	"./is.js": 188,
	"./it": 189,
	"./it.js": 189,
	"./ja": 190,
	"./ja.js": 190,
	"./jv": 191,
	"./jv.js": 191,
	"./ka": 192,
	"./ka.js": 192,
	"./kk": 193,
	"./kk.js": 193,
	"./km": 194,
	"./km.js": 194,
	"./kn": 195,
	"./kn.js": 195,
	"./ko": 196,
	"./ko.js": 196,
	"./ky": 197,
	"./ky.js": 197,
	"./lb": 198,
	"./lb.js": 198,
	"./lo": 199,
	"./lo.js": 199,
	"./lt": 200,
	"./lt.js": 200,
	"./lv": 201,
	"./lv.js": 201,
	"./me": 202,
	"./me.js": 202,
	"./mi": 203,
	"./mi.js": 203,
	"./mk": 204,
	"./mk.js": 204,
	"./ml": 205,
	"./ml.js": 205,
	"./mr": 206,
	"./mr.js": 206,
	"./ms": 208,
	"./ms-my": 207,
	"./ms-my.js": 207,
	"./ms.js": 208,
	"./my": 209,
	"./my.js": 209,
	"./nb": 210,
	"./nb.js": 210,
	"./ne": 211,
	"./ne.js": 211,
	"./nl": 213,
	"./nl-be": 212,
	"./nl-be.js": 212,
	"./nl.js": 213,
	"./nn": 214,
	"./nn.js": 214,
	"./pa-in": 215,
	"./pa-in.js": 215,
	"./pl": 216,
	"./pl.js": 216,
	"./pt": 218,
	"./pt-br": 217,
	"./pt-br.js": 217,
	"./pt.js": 218,
	"./ro": 219,
	"./ro.js": 219,
	"./ru": 220,
	"./ru.js": 220,
	"./sd": 221,
	"./sd.js": 221,
	"./se": 222,
	"./se.js": 222,
	"./si": 223,
	"./si.js": 223,
	"./sk": 224,
	"./sk.js": 224,
	"./sl": 225,
	"./sl.js": 225,
	"./sq": 226,
	"./sq.js": 226,
	"./sr": 228,
	"./sr-cyrl": 227,
	"./sr-cyrl.js": 227,
	"./sr.js": 228,
	"./ss": 229,
	"./ss.js": 229,
	"./sv": 230,
	"./sv.js": 230,
	"./sw": 231,
	"./sw.js": 231,
	"./ta": 232,
	"./ta.js": 232,
	"./te": 233,
	"./te.js": 233,
	"./tet": 234,
	"./tet.js": 234,
	"./th": 235,
	"./th.js": 235,
	"./tl-ph": 236,
	"./tl-ph.js": 236,
	"./tlh": 237,
	"./tlh.js": 237,
	"./tr": 238,
	"./tr.js": 238,
	"./tzl": 239,
	"./tzl.js": 239,
	"./tzm": 241,
	"./tzm-latn": 240,
	"./tzm-latn.js": 240,
	"./tzm.js": 241,
	"./uk": 242,
	"./uk.js": 242,
	"./ur": 243,
	"./ur.js": 243,
	"./uz": 245,
	"./uz-latn": 244,
	"./uz-latn.js": 244,
	"./uz.js": 245,
	"./vi": 246,
	"./vi.js": 246,
	"./x-pseudo": 247,
	"./x-pseudo.js": 247,
	"./yo": 248,
	"./yo.js": 248,
	"./zh-cn": 249,
	"./zh-cn.js": 249,
	"./zh-hk": 250,
	"./zh-hk.js": 250,
	"./zh-tw": 251,
	"./zh-tw.js": 251
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
webpackContext.id = 442;


/***/ }),

/***/ 452:
/***/ (function(module, exports) {

module.exports = "<calvin-navigation></calvin-navigation>"

/***/ }),

/***/ 453:
/***/ (function(module, exports) {

module.exports = "<!-- <md-input-container>\n  <input mdInput color=\"accent\" mode=\"search\" placeholder=\"Search for a community...\">\n</md-input-container> -->\n<div fxLayout fxLayout.xs=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"30px\">\n  <div *ngIf=\"getFinalResults\" fxFlex=\"96%\" fxLayoutGap=\"2%\" fxLayoutWrap>\n    <div class=\"list-communities\" fxFlex=\"31%\" *ngFor=\"let data of getFinalResults\" fx-flex-fill>\n      <md-card>\n        <md-card-header>\n          <md-card-title>{{data.name}}</md-card-title>\n          <img md-card-avatar src={{data.avatar}}>\n          <md-card-title>{{data.domain}}</md-card-title>\n        </md-card-header>\n        <md-card-content>\n          <md-card-title>Purpose</md-card-title>\n          {{data.purpose}}\n        </md-card-content>\n        <md-card-content>\n          <md-card-title>Description</md-card-title>\n          {{data.description}}\n        </md-card-content>\n        <md-card-content>\n          <md-card-title>Tools</md-card-title>\n          <div *ngFor=\"let tools of data.toolid\">\n            <md-list>{{tools.toolid}}</md-list>\n          </div>\n        </md-card-content>\n        <md-card-actions fxLayoutAlign=\"end\">\n          <button md-raised-button color=\"accent\" (click)=\"redirect(data.domain)\">CommunityDetails</button>\n        </md-card-actions>\n      </md-card>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 454:
/***/ (function(module, exports) {

module.exports = "<div fxLayout fxLayout.xs=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\".2\">\n  <md-card fxFlex=\"55%\" class=\"parent card\">\n    <md-card-header>\n        <!-- <img md-card-avatar src={{communityObj.avatar}} /> -->\n        <!-- {{communityObj | json }} -->\n        <md-card-title>{{communityObj.name}}</md-card-title>\n        <md-card-subtitle>{{communityObj.purpose}}</md-card-subtitle>\n        <md-card-subtitle>Created by : {{communityObj.createdby}} On {{communityObj.createdon}}</md-card-subtitle>\n        <md-card-subtitle>Last Updated On : {{communityObj.updatedon}}</md-card-subtitle>\n    </md-card-header>\n    <br>\n    <md-card-content>\n      <div>\n        <img md-card-image src={{communityObj.avatar}} />\n      </div>\n      <div>\n        <h2>Description:</h2>\n        {{communityObj.description}}\n      </div>\n      <div><hr><br>\n        <h2 class=\"title\">Tools</h2>\n        <hr/>\n        <div>\n          <!--{{communityTools | json }}-->\n          <md-list>\n            <md-list-item *ngFor=\"let tool of communityTools.tools\">\n              <!-- <md-icon md-list-icon>keyboard_arrow_right</md-icon> -->\n              <img md-card-avatar src={{tool.avatar}}>\n              <h4 md-line>{{tool.toolid}}</h4>\n            </md-list-item>\n            <md-divider></md-divider>\n          </md-list>\n        </div>\n      </div>\n      <br>\n      <div>\n        <h2 class=\"title\">Members</h2>\n        <hr/>\n        <div>\n         <!--{{communityMembers | json }}-->\n          <md-list>\n            <md-list-item *ngFor=\"let member of communityMembers.MemberDetails\">\n              <md-icon md-list-icon>person</md-icon>\n              <h4 md-line>{{member.username}}</h4>\n              <p md-line> {{member.role}} </p>\n            </md-list-item>\n            <md-divider></md-divider>\n          </md-list>\n        </div>\n      </div>\n\n    </md-card-content>\n  </md-card>\n</div>\n"

/***/ }),

/***/ 455:
/***/ (function(module, exports) {

module.exports = "<div fxLayout fxLayout.xs=\"column\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\n  <div  fxFlex>\n    <md-card>\n      <md-card-title>Communities</md-card-title>\n      <md-card-subtitle>on the Basis of Purposes</md-card-subtitle>\n      <md-card-content>\n        <nvd3 *ngIf=\"flag===1\" [options]=\"options\" [data]=\"data\"></nvd3>\n        <div fxLayoutAlign=\"center center\">\n          <md-progress-spinner *ngIf=\"flag===0\" color=\"accent\" mode=\"indeterminate\">\n          </md-progress-spinner>\n        </div>\n      </md-card-content>\n    </md-card>\n  </div>\n</div>\n"

/***/ }),

/***/ 456:
/***/ (function(module, exports) {

module.exports = "<div class=\"top-gap\"\n     fxLayout\n     fxLayout.xs=\"column\"\n     fxLayoutAlign=\"center\"\n     fxLayoutGap=\"50px\"\n     fxLayoutGap.xs=\"0\">\n       <div #graphs fxFlex=\"60%\" >\n       <calvin-dashboard-graphs></calvin-dashboard-graphs>\n       </div>\n  <div #notifications fxFlex=\"25%\" >\n  <calvin-notifications></calvin-notifications>\n  </div>"

/***/ }),

/***/ 457:
/***/ (function(module, exports) {

module.exports = "<footer fxLayout=\"row\" fxLayoutAlign=\"center center\">\n   <h5>Copyright &#9400; Apache License 2.0 | All Rights Reserved</h5>\n </footer>"

/***/ }),

/***/ 458:
/***/ (function(module, exports) {

module.exports = "<div [class.dark]=\"isDarkTheme\">\n  <md-sidenav-container fullscreen class=\"sidenav-container\">\n    <md-sidenav #sidenav mode=\"push\" opened=\"false\">\n      <md-toolbar color=\"primary\">\n        <img routerLink=\"\" src=\"/assets/logo/logo.png\" id=\"sidebar-logo\" />\n        <div routerLink=\"\" class=\"mdc-typography--display4 logo\"><label routerLink=\"\">Calvin</label></div>\n      </md-toolbar>\n      <md-nav-list>\n        <a md-list-item *ngFor=\"let item of navigation\" (click)=\"sidenav.close()\" [routerLink]=\"[item.link]\" routerLinkActive=\"active\">\n          <md-icon>{{item.logo}}</md-icon> {{item.label}}\n        </a>\n      </md-nav-list>\n    </md-sidenav>\n    <md-toolbar color=\"primary\" class=\"mat-elevation-z2\">\n      <button md-icon-button class=\"hidden-md-up\" (click)=\"sidenav.toggle()\">\n        <md-icon>menu</md-icon>\n      </button>\n      <img routerLink=\"\" src=\"/assets/logo/logo.png\" class=\"logo\" />\n      <div class=\"mdc-typography--display4 logo\"><label routerLink=\"\">Calvin</label></div>\n      <span class=\"spacer\"></span>\n      <div class=\"mdc-typography--display4\">\n        <button md-button class=\"hidden-sm-down nav-button\" *ngFor=\"let item of navigation\" [routerLink]=\"[item.link]\" routerLinkActive=\"active\">\n          {{item.label}}\n        </button>\n        <md-slide-toggle color=\"primary\" (click)=\"toggle()\">\n        </md-slide-toggle>\n      </div>\n    </md-toolbar>\n    <div fxLayout=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\n      <div fxFlex>\n        <router-outlet></router-outlet>\n      </div>\n      <div fxFlex>\n       <!--  <calvin-foot-note></calvin-foot-note> -->\n      </div>\n    </div>\n  </md-sidenav-container>\n</div>\n"

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

module.exports = "<md-card overflow-y=\"none\">\n<div >\n  <div fxLayout fxLayout.xs=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\n    <div>\n      <md-card-title>Notifications <!-- ( {{notifications.length}} ) --></md-card-title>\n    </div>\n  </div>\n  <div class=\"content\">\n  <div *ngFor= \"let message of notifications\" fx-flex-fill>\n    <md-card class=\"notifications\" *ngIf=\"message.event === 'newcommunityadded'\" (click)=\"redirect(message.domain)\">\n    <p><md-icon>language</md-icon> {{message.domain}} Community is Created</p>\n    </md-card>\n    <md-card class=\"notifications\" *ngIf=\"message.event === 'memberadded'\" (click)=\"redirect(message.domain)\">\n    <p><md-icon>face</md-icon> New Member added to {{message.domain}} Community</p>\n    </md-card>\n    <md-card class=\"notifications\" *ngIf=\"message.event === 'newinvitees'\" (click)=\"redirect(message.domain)\">\n    <p>A New Member is invited to {{message.domain}} Community</p>\n    </md-card>\n    <md-card class=\"notifications\" *ngIf=\"message.event === 'rejectinvitees'\" (click)=\"redirect(message.domain)\">\n    <p>The invited Member rejected the invite from {{message.domain}} Community</p>\n    </md-card>\n    <md-card class=\"notifications\" *ngIf=\"message.event === 'rolemodifiedformember'\" (click)=\"redirect(message.domain)\">\n    <p>Role Modified for the Member in  {{message.domain}} Community</p>\n    </md-card>\n    <md-card class=\"notifications\" *ngIf=\"message.event === 'memberdeleted'\" (click)=\"redirect(message.domain)\">\n    <p>Member removed from {{message.domain}} Community</p>\n    </md-card>\n   </div>\n  </div>\n</div>\n</md-card>"

/***/ }),

/***/ 460:
/***/ (function(module, exports) {

module.exports = "<div>\n <md-select placeholder=\"Select your option\" style=\"margin-top:2%\"[(ngModel)]=\"selectedValue\" fxflex=\"100%\" fxLayoutAlign=\"center\">\n   <div *ngFor=\"let value of getPurpose\">\n    <md-option (click)=\"select(value)\">{{value}}\n    </md-option></div>\n    \n  </md-select>\n</div>\n\n\n<div fxLayout fxLayout.xs=\"column\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\n  <div *ngIf=\"getResults\" fxFlex=\"100%\" fxLayoutGap=\"2%\" fxLayoutWrap>\n    <div class=\"list-communities\" fxFlex=\"30%\" *ngFor=\"let data of getResults\" fx-flex-fill>\n      <div *ngFor=\"let data1 of counter\">\n        <div *ngIf=\"data1.type === data.name\">\n      <md-card>\n\n        <md-card-header>\n          <!--<img md-card-avatar src={{data.image}}>-->\n          <md-card-title><strong>{{data.name}}</strong></md-card-title>\n          <md-card-subtitle>{{data.purpose}}</md-card-subtitle>\n        </md-card-header>\n\n       <img md-card-image class=\"height\" src={{data.image}}>\n\n\n        <md-card-content>\n          <p>\n            {{data.description}}\n          </p>\n        </md-card-content>\n\n         <md-card-title class=\"tags\"><h6><strong>Tags</strong></h6></md-card-title>\n         <md-chip-list >\n         <div  *ngFor=\"let tag of data.tags\" class=\"chip\">\n        \n       <md-chip color=\"accent\" selected=\"true\">{{tag}}</md-chip>\n        </div>\n        </md-chip-list>\n        \n        <div>\n         <md-card-title class=\"tools\"><h6><strong>Tools</strong></h6></md-card-title>\n         <md-chip-list>\n         <div *ngFor=\"let tool of data.tools\" class=\"chiptool\" fxFlex=\"100%\">\n        <md-chip fxFlexLayout.xs=\"column\" fxFlex=\"100%\" class=\"chipsrole\">\n          <img md-card-avatar src={{tool.avatar}}>\n         <span>{{tool.toolId}}</span>\n        </md-chip>\n        </div>\n        </md-chip-list>\n        </div>\n\n        <md-card-title class=\"roles\"><h6><strong>Roles</strong></h6></md-card-title>\n         <md-chip-list>\n         <div *ngFor=\"let roles of data.roleActions\" class=\"chiprole\">\n        <md-chip class=\"chips\">{{roles.role}}</md-chip>\n        </div>\n        </md-chip-list>\n        <div fxLayoutAlign=\"end\" class=\"end\">\n        <a *ngIf=\"data1.value <= 1\" (click)=\"redirect(data.name, data1.value)\">{{data1.value}} {{singular}}</a>          \n        <a *ngIf=\"data1.value > 1\" (click)=\"redirect(data.name, data1.value)\">{{data1.value}} {{plural}}</a>\n        </div>\n      </md-card>\n      </div>  \n      </div>\n    </div>\n    </div>\n    </div>\n"

/***/ }),

/***/ 461:
/***/ (function(module, exports) {

module.exports = "\n    <div\n     fxLayout\n     fxLayout.xs=\"row\"\n     fxLayoutAlign=\"center\"\n     fxLayoutGap=\"10px\"\n     fxLayoutGap.xs=\"0\">\n       <div class=\"item item-3\" fxFlex >\n       <md-card>\n       <md-card-title>ToolsGraph</md-card-title>\n    <md-card-subtitle>Tools Used Frequently</md-card-subtitle>\n\n  <div style=\"display: block\">\n    <canvas baseChart\n            [datasets]=\"barChartData\"\n            [labels]=\"barChartLabels\"\n            [options]=\"barChartOptions\"\n            [legend]=\"barChartLegend\"\n            [chartType]=\"barChartType\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n  </div>\n  <button (click)=\"randomize()\">Update</button>\n  </md-card>\n</div>\n</div>\n \n\n\n"

/***/ }),

/***/ 462:
/***/ (function(module, exports) {

module.exports = "<div class=\"abc\">\n   <md-paginator [length]=\"100\" [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\">\n  </md-paginator>\n\n <md-list>\n    <h3 md-subheader>Tools-list listed</h3>\n    <md-list-item *ngFor=\"let val of tools\">\n      <img md-list-avatar src=\"{{val.avatar}}\">\n      <h4 md-line>{{val.toolname}}</h4>\n      <p md-line class=\"demo-2\"> {{val.toolid}} </p>\n     <p md-line class=\"demo-3\">{{val.domains.length}} Communities are Connected</p>\n    </md-list-item>\n  </md-list>\n\n</div>"

/***/ }),

/***/ 506:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(276);


/***/ })

},[507]);
//# sourceMappingURL=main.bundle.js.map