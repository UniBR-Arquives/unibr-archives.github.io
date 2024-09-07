var Main = /** @class */ (function () {
    function Main(srcName, nameGame) {
        if (srcName === void 0) { srcName = undefined; }
        if (nameGame === void 0) { nameGame = undefined; }
        this.mainNameSite = srcName;
        this.nameGame = nameGame;
    }
    Main.prototype.setup = function (data) {
        if (this.mainNameSite == undefined)
            this.mainNameSite = data['main']['title'];
        this.setupSiteHeader(data, 'nav');
        this.setupSiteName(data, 'name');
        this.returnName();
        this.returnNameGame();
        this.setupAbout(data, 'abouts-src');
    };
    Main.prototype.returnNameGame = function () {
        var _this = this;
        var main = document.querySelectorAll(".nameGame");
        main.forEach(function (data) {
            console.log(data);
            data.textContent = _this.nameGame;
        });
    };
    Main.prototype.returnName = function () {
        var _this = this;
        var main = document.querySelectorAll(".nameMain");
        main.forEach(function (data) {
            data.textContent = _this.mainNameSite;
        });
    };
    Main.prototype.setupAbout = function (data, nameId) {
        if (Array.isArray(data['abouts'])) {
            var abouts_src_1 = document.getElementById(nameId);
            if (abouts_src_1) {
                abouts_src_1.innerHTML = '';
                data['abouts'].forEach(function (element) {
                    if (element.title && element.img && element.description && element.video && element.align && element.animation) {
                        var divMain_1 = document.createElement("div");
                        var boxAboutDiv_1 = document.createElement('div');
                        boxAboutDiv_1.classList.add('box-about');
                        var imgElement = document.createElement('img');
                        imgElement.src = element.img;
                        imgElement.classList.add('orie-img');
                        var h3Element = document.createElement('h3');
                        h3Element.textContent = element.title;
                        var pElement = document.createElement('p');
                        pElement.textContent = element.description;
                        var externalVideo_1 = document.createElement('img');
                        externalVideo_1.src = element.video;
                        externalVideo_1.classList.add("imgAbout");
                        var gifVideo_1 = document.createElement('img');
                        gifVideo_1.src = element.animation;
                        gifVideo_1.classList.add("gifAbout");
                        var left = function () {
                            divMain_1.classList.add('flex-left');
                            divMain_1.appendChild(boxAboutDiv_1);
                            divMain_1.appendChild(externalVideo_1);
                            divMain_1.appendChild(gifVideo_1);
                        };
                        var right = function () {
                            divMain_1.classList.add('flex-right');
                            divMain_1.appendChild(gifVideo_1);
                            divMain_1.appendChild(externalVideo_1);
                            divMain_1.appendChild(boxAboutDiv_1);
                        };
                        boxAboutDiv_1.appendChild(imgElement);
                        boxAboutDiv_1.appendChild(h3Element);
                        boxAboutDiv_1.appendChild(pElement);
                        if (element.align == "left") {
                            left();
                        }
                        else if (element.align == "right") {
                            right();
                        }
                        else {
                            left();
                        }
                        abouts_src_1.appendChild(divMain_1);
                    }
                });
            }
        }
    };
    Main.prototype.setupSiteName = function (data, nameId) {
        var main = document.getElementById(nameId);
        main.textContent = data['main'].title;
        this.nameGame = data['main'].game;
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
