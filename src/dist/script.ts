class Main {
    mainNameSite: string | undefined;
    nameGame: string | undefined;
    constructor(srcName: string | undefined = undefined, nameGame: string | undefined = undefined) {
        this.mainNameSite = srcName;
        this.nameGame = nameGame;
    }

    setup(data) {
        if(this.mainNameSite == undefined) this.mainNameSite = data['main']['title'];
        this.setupSiteHeader(data, 'nav');
        this.setupSiteName(data, 'name')

        this.returnName()
        this.returnNameGame()

        this.setupAbout(data, 'abouts-src');
    }

    returnNameGame() {
        let main = document.querySelectorAll(".nameGame")
        main.forEach(data => {
            console.log(data)
            data.textContent = this.nameGame;
        })
    }
    returnName() {
        let main = document.querySelectorAll(".nameMain")
        main.forEach(data => {
            data.textContent = this.mainNameSite;
        })
    }
    
    setupAbout(data, nameId: string) {
        if(Array.isArray(data['abouts'])) {
            let abouts_src = document.getElementById(nameId)
            if(abouts_src) {
                abouts_src.innerHTML = '';
                data['abouts'].forEach(function (element) {
                    if(element.title && element.img && element.description && element.video && element.align && element.animation) {
                        const divMain = document.createElement("div");

                        const boxAboutDiv = document.createElement('div');
                        boxAboutDiv.classList.add('box-about');

                        const imgElement = document.createElement('img');
                        imgElement.src = element.img;
                        imgElement.classList.add('orie-img')
                        
                        const h3Element = document.createElement('h3');
                        h3Element.textContent = element.title;

                        const pElement = document.createElement('p');
                        pElement.textContent = element.description;

                        const externalVideo = document.createElement('img')
                        externalVideo.src = element.video;
                        externalVideo.classList.add("imgAbout")

                        const gifVideo = document.createElement('img')
                        gifVideo.src = element.animation;
                        gifVideo.classList.add("gifAbout")

                        const left = function (): void {
                            divMain.classList.add('flex-left');
                            divMain.appendChild(boxAboutDiv)
                            divMain.appendChild(externalVideo)
                            divMain.appendChild(gifVideo)
                        }

                        const right = function (): void {
                            divMain.classList.add('flex-right');
                            divMain.appendChild(gifVideo)
                            divMain.appendChild(externalVideo)
                            divMain.appendChild(boxAboutDiv)
                        }

                        boxAboutDiv.appendChild(imgElement);
                        boxAboutDiv.appendChild(h3Element)
                        boxAboutDiv.appendChild(pElement)

                        if(element.align == "left") {
                            left();
                        } else if (element.align == "right") {
                            right();
                        } else {
                            left();
                        }

                        abouts_src.appendChild(divMain);

                    }
                })
            }
        }

    }
    setupSiteName(data, nameId: string) {
        let main = document.getElementById(nameId)
        main.textContent = data['main'].title;
        this.nameGame = data['main'].game;
    }

    setupSiteHeader(data, navId: string) {
        if(Array.isArray(data['navigation'])) {
            let navLink = document.getElementById(navId);
            if (navLink) {
                navLink.innerHTML = '';
                data['navigation'].forEach(function (element) {
                    if (element.text && element.href) {
                        let anchor = document.createElement('a');
                        anchor.textContent = element.text;
                        anchor.href = element.href;
                        navLink.appendChild(anchor);
                    }
                })
            } else {
                return "Error"
            }
        }
    }
}

function setup() {
    const main = new Main();

    fetch("/src/config/data.json")
       .then(r => {
        if(!r.ok) {
            throw new Error("Arquivo de configuração não encontrado")
        } 
        return r.json()
       })
       .then(data => {
        if(data) {
            main.setup(data);
        }
       })
       .catch(err => {
        console.log("Error", err);
        throw err;
       })
}

document.addEventListener('DOMContentLoaded', setup)