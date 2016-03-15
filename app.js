$(function(window, $, MyRoute) {
    "use strict";
    $(function() {
        var route = new MyRoute();
        window.route = route;
        route.setRoute({
            "background.navi": {
                view: "leftMenu",
                autoLoad: true
            },
            "background.navi.privilege": {
                url: "templete/privilege/left.html"
            },
            "background.navi.department": {
                url: "templete/department/left.html"
            },
            "background.navi.member": {
                url: "templete/member/left.html"
            }
        });

        route.controller("background.navi.privilege", function() {
            console.log("privilege");
        });
        route.controller("background.navi.department", function() {
            console.log("department");
        });
        route.controller("background.navi.member", function() {
            console.log("department");
        });

    });

}(window, jQuery, MyRoute))
