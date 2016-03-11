(function(window, $) {
    "use strict";
    var constant = { division: "#!" };
    var actions = [];
    var params = {};

    function initRoute(){
    	var hash = window.location.hash;
    	var index = hash.indexOf("//");
    	if(index>0){

    	} 
    }


    function Route() {
    };
    Route.prototype.go = function() {
        //此处可增加url合法性验证
        var hash = [];
        var i = 0;
        hash[i] = constant.division;
        for (var key in actions) {
            hash[++i] = actions[key];
        }
        if (i > 0) {
            hash[++i] = "";
        }
        for (var key in params) {
            hash[++i] = key;
            hash[++i] = params[key];
        }
        window.location.href = window.location.href.replace(window.location.hash, hash.join("/"));
    };


    Route.prototype.setParam = function(key, value) {
        if (typeof key !== "string" || typeof value !== "string") {
            console.err("key or value 参数不合法");
            return;
        }
        var url = window.location.href;
        var hash = window.location.hash;


    }

    var r = new Route();





}(window, jQuery))
