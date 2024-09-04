class MySite {
    constructor() {
        this.mainNavLink = document.getElementById("nav");
        this.mainLink = document.getElementById("script-name-main");

        this.srcNav = "/src/config/data.json";
        this.ArrayNav = "navigation";
        this.MainSite = "main-site";
    }

    setupSite() {
        this.setupNavLinks(this.mainNavLink, this.srcNav, this.ArrayNav);
        this.setupMain(this.mainLink, this.srcNav, this.MainSite)
    }

    fetchData(endpoint) {
        return fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao Abrir Arquivo de configuração`);
                }
                return response.json();
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
                throw error;
            });
    }

    setupMain(navLink, srcNav, nameField) {
        if(navLink) {
            this.fetchData(srcNav)
              .then(data => {
                if(data[nameField]['title']) {
                    navLink.textContent = data[nameField]['title']
                }
              })
        }
    }

    setupNavLinks(navLink, srcNav, nameArray) {
        if(navLink) {
            this.fetchData(srcNav)
              .then(data => {
                if(Array.isArray(data[nameArray])) {
                    navLink.innerHTML = '';
                    data[nameArray].forEach(element => {
                        let anchor;
                        if(element.text && element.href) {
                            anchor = document.createElement('a');
                            anchor.textContent = element.text;
                            anchor.href = element.href;
                            navLink.appendChild(anchor);
                        }
                    });
                }
              })
              .catch(err => {
                navLink.innerHTML = 'ERRO: ' + err.message;
              })
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mainSite = new MySite();
    mainSite.setupSite();
});