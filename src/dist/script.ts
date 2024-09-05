class Main {
    mainNameSite: string | undefined;
    constructor(srcName: string | undefined = undefined) {
        this.mainNameSite = srcName;
    }

    setup(data) {
        if(this.mainNameSite == undefined) this.mainNameSite = data['main']['title'];
        this.setupSiteHeader(data, 'nav');
        this.setupSiteName(data, 'name')

        this.returnName()
    }

    returnName() {
        let main = document.querySelectorAll(".nameMain")
        main.forEach(data => {
            data.textContent = this.mainNameSite;
        })
    }

    setupSiteName(data, nameId: string) {
        let main = document.getElementById(nameId)
        main.textContent = data['main'].title;
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