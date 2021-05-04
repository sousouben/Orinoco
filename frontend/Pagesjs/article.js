let URLAPI = "http://localhost:3000/api/teddies/";

let idProduct;

function getId() { 
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    const iD = params.get("id"); 
    idProduct = iD;
    Produit(iD);
}

function Produit(iD) {//création d'une fonction pour récupérer les identifiants pour chaque produit
    fetch(URLAPI + iD)
        .then(response => response.json())
        .then(response => {
            insertProduit(response);
            idProduct = response;
        })
        .catch(error => {
            console.log("Il y a une erreur :" + error.stack);
        })
};

function insertProduit(response) {
    let articleProduit = document.getElementById("article_ours");
    articleProduit.innerHTML += '<article id="page_produit">'
        + '<section class="produit_page1">'
        + '<div class="img_produit">'
        + `<img src="${response.imageUrl}" >`
        + '</div>'
        + '<div class="info_produit">'
        + '<div class="nom_produit">'
        + `<h3>${response.name} </h3>`
        + '</div>'
        + '<hr></hr>'
        + '<div class="prix-produit">'
        + `<p>${response.price / 100} €</p>`
        + '</div>'
        + '<div class="description">'
        + '<h4>Description</h4>'
        + `<p>${response.description}</p>`
        + '<div class="bouton">'
        + '<select id="select"><option selected disabled value="">choose..</option></select>'
        + '<a href="#">'
        + '<button id="ajouter"> ajouter au panier </button>'
        + '</a>'
        + '</div>'
        + '</section>'
        + '</article>';


    let listeColor = document.getElementById("select");//création d'option de séléction des couleurs
    for (let i = 0; i < response.colors.length; i++) {
        listeColor.innerHTML += '<option value="' + response.colors[i] + '">'
            + response.colors[i]
            + '</option>';
    }

    document.getElementById("ajouter").addEventListener("click", function () {
        let panier = JSON.parse(localStorage.getItem("Panier"))
        if (panier == null) {
            panier = [];
        }
        panier.push({
            id: idProduct._id,
            imageUrl: idProduct.imageUrl,
            name: idProduct.name,
            price: idProduct.price
        }); 
        localStorage.setItem("Panier", JSON.stringify(panier));
        if (window.confirm("Article bien ajouté au panier. Souhaitez vous consulter votre panier ?")) {
            window.location.href = "Panier.html";
        } else {
            window.location.href = "../index.html";
        }
    });
}

// Appel de fonctions
window.onload = getId();



