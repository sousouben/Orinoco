/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/
let URLAPI = "http://localhost:3000/api/teddies";//Au choix entre : "cameras" - "furniture" - "teddies"

window.onload = function () {
    fetch(URLAPI)//fetch  récupérer des ressources à travers le réseau de manière asynchrone.
        .then(response => response.json())// fetch va chercher l'URL + transformation de la réponse en json
        .then(response => {
            let element = document.getElementById("listeProduit");//Lien avec la page index HTML

            for (let i = 0; i < response.length; i++) {
                element.innerHTML +='<article id="produit">'//création de la structure index HTML
                + '<a href="pages/article.html?id=' + response[i]._id + '">'
                + '<div class="main_produit">'
                + '<div class="image">'
                + '<section class="produit_item">'
                + '<div class="img_produit">'
                + '<img src="' + response[i].imageUrl + '" >'
                + '</div>'
                + '<div class="nom_produit">'
                + '<h3>' + response[i].name + '</h3>'
                + '</div>'
                + '<div class="prix-produit">'
                + '<p>' + response[i].price / 100 + '€</p>'
                + '</div>'
                + '<div>'            
                + '<button> voir ce produit </button>'            
                + '</div>'
                + '</section>'
                + '</div>'
                + '</div>'
                + '</a>'
                + '</article>';
                    
            }
        })
        .catch(error => {
            //Récupération des messages d'erreurs en cas de problèmes(s) avec la ligne grace à .stack
            console.log("Il y a une erreur :"+ error.stack);            
        });
}



/*function Produit() {             
    fetch(URLAPI) //fetch  récupérer des ressources à travers le réseau de manière asynchrone.
        .then(response => response.json())// fetch va chercher l'URL + transformation de la réponse en jso
        .then(data => insertProduit(data))//.then sert à attacher les functions  
        .catch(error => {
            //Récupération des messages d'erreurs en cas de problèmes(s) avec la ligne grace à .stack
            console.log("Il y a une erreur :"+ error.stack);            
        })
};

function insertProduit(data) {     
    let articleProduit = document.getElementById("listeProduit");//Lien avec la page index HTML
    for (let i = 0; i < data.length; i++) {
        articleProduit.innerHTML += '<article id="produit">'//création de la structure index HTML
            + '<a href="pages/article.html?id=' + data[i]._id + '">'
            + '<div class="main_produit">'
            + '<div class="image">'
            + '<section class="produit_item">'
            + '<div class="img_produit">'
            + '<img src="' + data[i].imageUrl + '" >'
            + '</div>'
            + '<div class="nom_produit">'
            + '<h3>' + data[i].name + '</h3>'
            + '</div>'
            + '<div class="prix-produit">'
            + '<p>' + data[i].price / 100 + '€</p>'
            + '</div>'
            + '<div>'            
            + '<button> voir ce produit </button>'            
            + '</div>'
            + '</section>'
            + '</div>'
            + '</div>'
            + '</a>'
            + '</article>';
    }
}

// Appel de fonctions
window.onload = Produit();*/
