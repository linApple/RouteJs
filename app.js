$(function(window, $, MyRoute) {
    "use strict";
    $(function() {
        var route = new MyRoute();
        window.route = route;
        route.setRoute({
            "background.navi": {
                view: "leftMenu",
                autoLoad:true
            },
            "background.navi.privilege": {
                url: "background/privilege/index.html"
            },
            "background.navi.department": {
                url: "background/department/index.html"
            },
            "background.navi.member": {
                url: "background/member/index.html"
            }
        });

    });

}(window, jQuery, MyRoute))
