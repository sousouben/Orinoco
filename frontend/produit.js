/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/
let URLAPI = "http://localhost:3000/api/teddies";

window.onload = function () {
    fetch(URLAPI)
        .then(response => response.json())
        .then(response => {
            let element = document.getElementById("listeProduit");

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

