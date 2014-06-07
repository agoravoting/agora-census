(function() {
    var Init = this.Init = {};
    Init.divs = [
        "welcome-view",
        "home-view",
        "login-view",
    ];

    Init.js = [
        // base
        "user.js",
        "acensus.js",

        // views
        "views/login.js",
        "views/menu.js",

        // models
        "models/user.js"
    ];

    Init.addDivs = function() {
        var base = document.querySelector("#divcontainer");
        Init.divs.forEach(function(div) {
            var html = document.createElement('div');
            html.id = div;
            base.appendChild(html);
        });
    };

    Init.loadScripts = function(scripts, base, end) {
        if (_.isEmpty(scripts)) {
            end();
        } else {
            var head = document.getElementsByTagName('head')[0];

            var js = _.first(scripts);
            var rest = _.rest(scripts);
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.onreadystatechange = function () {
                if (this.readyState == 'complete') Init.loadScripts(rest, base, end);
            }
            script.onload = function () { Init.loadScripts(rest, base, end); };

            script.src = base + js;
            head.appendChild(script);
        }
    };

    Init.loadJs = function (next) {
        var base = 'static/js/';

        Init.loadScripts(Init.js, "static/js/", function() {
            next();
        });
    };

    Init.init = function (next) {
        Init.addDivs();
        Init.loadJs(next);
    };
}).call(this);
