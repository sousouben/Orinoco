/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/
let URLAPI = "http://localhost:3000/api/teddies";//Au choix entre : "cameras" - "furniture" - "teddies"

function Produit() {
    fetch(URLAPI)
    .then(responce=>responce.json())// fetch va chercher l'URL + transformation de la réponse en json
    .then(responce=>insertProduit(responce))//.then sert à attacher les functions 
    }

function insertProduit(responce){
    let articleProduit= document.getElementById("listeProduit");//Lien avec la page index HTML
    for(let i=0 ; i<responce.length; i++){
        articleProduit.innerHTML += '<article id="produit">' //création de la structure index HTML
        + '<div class="main_produit">' 
        +'<div class="image">'
        + '<section class="produit_item">' 
        +'<div class="img_produit">' 
        + '<img src="'+responce[i].imageUrl +'" >' 
        + '</div>'
        + '<div class="nom_produit">'
        + '<h3>'+responce[i].name+'</h3>'
        +'</div>'
        + '<div class="prix-produit">'
        + '<p>'+ responce[i].price/100 +'€</p>'
        + '</div>'
        +'<div>'
        + '<a href="pages/Page%20article.html?id='+ responce[i]._id +'">'
        + '<button> voir ce produit </button>'
        + '</a>'
        +'</div>' 
        +'</section>' 
        +'</div>' 
        + '</div>' 
        + '</article>';
    }
}

window.onload= Produit();
//événement se déclenche lorsque tout le contenu de votre page est chargé



