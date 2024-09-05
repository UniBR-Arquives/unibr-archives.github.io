var Main = /** @class */ (function () {
    function Main(srcName) {
        if (srcName === void 0) { srcName = undefined; }
        this.mainNameSite = srcName;
    }
    Main.prototype.setup = function (data) {
        if (this.mainNameSite == undefined)
            this.mainNameSite = data['main']['title'];
        this.setupSiteHeader(data, 'nav');
        this.setupSiteName(data, 'name');
        this.returnName();
    };
    Main.prototype.returnName = function () {
        var _this = this;
        var main = document.querySelectorAll(".nameMain");
        main.forEach(function (data) {
            data.textContent = _this.mainNameSite;
        });
    };
    Main.prototype.setupSiteName = function (data, nameId) {
        var main = document.getElementById(nameId);
        main.textContent = data['main'].title;
    };
    Main.prototype.setupSiteHeader = function (data, navId) {
        if (Array.isArray(data['navigation'])) {
            var navLink_1 = document.getElementById(navId);
            if (navLink_1) {
                navLink_1.innerHTML = '';
                data['navigation'].forEach(function (element) {
                    if (element.text && element.href) {
                        var anchor = document.createElement('a');
                        anchor.textContent = element.text;
                        anchor.href = element.href;
                        navLink_1.appendChild(anchor);
                    }
                });
            }
            else {
                return "Error";
            }
        }
    };
    return Main;
}());
function setup() {
    var main = new Main();
    fetch("/src/config/data.json")
        .then(function (r) {
        if (!r.ok) {
            throw new Error("Arquivo de configuração não encontrado");
        }
        return r.json();
    })
        .then(function (data) {
        if (data) {
            main.setup(data);
        }
    })["catch"](function (err) {
        console.log("Error", err);
        throw err;
    });
}
document.addEventListener('DOMContentLoaded', setup);
