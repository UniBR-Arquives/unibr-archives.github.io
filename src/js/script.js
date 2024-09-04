function navLinks() {
    const ContentNavLinks = document.getElementById("nav");
    function fetchNavLinks() {
        fetch("/src/config/nav.json")
           .then(r => {
            if(!r.ok) {
                throw new Error("Arquivo de Navegação Não Encontrado");
            }

            return r.json();

           })
           .then(data => {
            if(Array.isArray(data)) {
                NavLinksP(data);
            }
           })
           .catch(err => {
            ContentNavLinks.innerHTML = 'ERRO: ' + err.message;
           })
    }

    function NavLinksP(links) {
        ContentNavLinks.innerHTML = '';
        links.forEach(element => {
            let anchor;
            if(element['text'] && element['href']) {
                anchor = document.createElement('a');
                anchor.textContent = element['text'];
                anchor.href = element['href'];
                ContentNavLinks.appendChild(anchor);

            } else {
                anchor = document.createElement('a');
                anchor.textContent = "HOME";
                anchor.href = "/index.html"
                ContentNavLinks.appendChild(anchor);
            }
        });
    }
    fetchNavLinks();
}


function baseIndex() {
    const ContentNavLinks = document.getElementById("nav");
    function fetchNavLinks() {
        fetch("/src/config/nav.json")
           .then(r => {
            if(!r.ok) {
                throw new Error("Arquivo de Navegação Não Encontrado");
            }

            return r.json();

           })
           .then(data => {
            if(Array.isArray(data)) {
                NavLinksP(data);
            }
           })
           .catch(err => {
            ContentNavLinks.innerHTML = 'ERRO: ' + err.message;
           })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    navLinks();
})