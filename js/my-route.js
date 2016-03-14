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
    var Route = {
        get: function(key, param) {
            var key += ".";
            var index = key.lastIndexOf(".");
            var str = key.substr(0, index);
            while (typeof this[str] === "object") {
                if (typeof this[str][param] !== "undefined")
                    return this[str][param];
                index = str.lastIndexOf(".");
                str = key.substr(0, index);
            }
            return false;
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
        var arr = hash.substr(index + 2);
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


    }


    function Route() {
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
        if (i == hash.length - 1) {
            hash[++i] = "";
        }
        window.location.href = window.location.href.replace(window.location.hash, "") + hash.join("/");
    };

    Route.prototype.setParam = function(key, value) {
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
    }

    Route.prototype.addModule = function(name, fc) {
        Controllers[name] = fc;
    }

    Route.prototype.setRoute = function(obj) {
        if (typeof obj !== "object") {
            console.error("参数错误！");
            return false;
        }
        for (var key in obj) {
            Route[key] = obj[key];
        }
    }

    window.MyRoute = Route;

}(window, jQuery))
