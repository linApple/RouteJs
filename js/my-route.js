(function(window, $) {
    "use strict";
    var constant = {
        division: "#!",
        routeAttrName: "route-url",
        controllerAttrName: "route-controller",
        viewAttrName: "route-view"
    };
    var Actions = [];
    var Params = {};
    var Controllers = {};
    var Scopes = {};

    var RouteParams = {
        set: function(key, obj) {
            var that = this;
            this[key] = $.extend(true, {}, obj);
            this[key].get = function(param) {
                var pkey = key + ".";
                var index = pkey.lastIndexOf(".");
                var str = pkey.substr(0, index);
                while (typeof that[str] === "object") {
                    if (typeof that[str][param] !== "undefined")
                        return that[str][param];
                    index = str.lastIndexOf(".");
                    str = pkey.substr(0, index);
                }
                return "";
            };
        }
    };




    function initRoute() {
        var hash = window.location.hash;
        if (hash.length == 0)
            return;
        var index = hash.indexOf("//");
        if (index > 0) {
            Actions = hash.substr(hash.indexOf("/") + 1, index - hash.indexOf("/") - 1).split("/");
        }
        var arr = hash.substr(index + 2).split("/");
        if (arr.length % 2 == 1) {
            console.error("当前url参数格式有误！");
            return false;
        }
        for (var i = 0; i < arr.length; i += 2) {
            Params[arr[i]] = arr[i + 1];
        }
        return true;
    }

    function routeUrlBind() {
        $("[" + constant.routeAttrName + "]").click(function() {
            var str = $(this).attr(constant.routeAttrName);
            var index = str.indexOf("{");
            Actions = str.substr(0, index).split(".");
            try {
                Params = eval('(' + str.substr(index) + ')');
            } catch (e) {
                console.error(str + ":参数格式错误!");
                return;
            }
            RouteGo();
        });
    }

    function hashChange(arg) {
        initRoute(); //单通过浏览器前进后退按钮来改变地址时需要重新解析
        var r = RouteParams[Actions.join(".")];
        if (r !== "undefined") {
            var view = $("[" + constant.viewAttrName + "='" + r.get('view') + "']");
            var autoLoad = r.get("autoLoad");
            if (view.length > 0 && (autoLoad != false || autoLoad != "false")) {
                $.get(r.get("url"), Params, function(data) {
                    view.html(data);
                });
            }
            var controller = r.get("controller");
            controller = controller === "" ? Actions.join(".") : controller;
            if (Controllers[controller]) {
                Controllers[controller].apply();
            }
        }

    }


    function Route() {
        this.initRoute = {
            setRoute: false,
            controller: false
        };
        if (initRoute() != false) {
            routeUrlBind();
            window.onhashchange = hashChange;
        } else {
            console.log("error");
        }

    };


    function RouteGo() {
        var hash = [];
        var i = 0;
        hash[i] = constant.division;
        for (var key in Actions) {
            hash[++i] = Actions[key];
        }
        if (i > 0) {
            hash[++i] = "";
        }
        for (var key in Params) {
            hash[++i] = key;
            hash[++i] = Params[key];
        }
        if ($.isEmptyObject(Params)) {
            hash[++i] = "";
        }
        window.location.href = window.location.href.replace(window.location.hash, "") + hash.join("/");
    };

    /*    Route.prototype.setParam = function(key, value) {
            if (typeof key !== "string" || typeof value !== "string") {
                console.error("key or value 参数不合法");
                return;
            }
            Params[key] = value;
            RouteGo();
        }

        Route.prototype.setAction = function(path) {
            Actions = path.split(".");
            RouteGo();
        }*/

    Route.prototype.setRoute = function(obj) {//注册路由
        if (typeof obj !== "object") {
            console.error("参数错误！");
            return false;
        }
        for (var key in obj) {
            RouteParams.set(key, obj[key]);
        }
        this.routeGo("setRoute");
    }
    Route.prototype.controller = function(action, fc) {//注册控制器
        Controllers[action] = fc;
        Scopes[action] = {};
        this.routeGo("controller");
        return this;
    }

    Route.prototype.routeGo = function(key) {//页面首次加载或者刷新页面时调用
        if (typeof(this.initRoute) !== "object")
            return;
        this.initRoute[key] = true;
        for (var k in this.initRoute) {
            if (!this.initRoute[k])
                return;
        }
        this.initRoute = true;
        hashChange();
    }

    window.MyRoute = Route;

}(window, jQuery))
