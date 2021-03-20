/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/
let URLAPI = "http://localhost:3000/api/teddies";//Au choix entre : "cameras" - "furniture" - "teddies"

function Produit() {
    fetch(URLAPI).then(responce=>responce.json())
    .then(responce=>insertProduit(responce))
    }

function insertProduit(responce){
    let articleProduit= document.getElementById("listeProduit");
    for(let i=0 ; i<responce.length; i++){
        articleProduit.innerHTML += '<article id="produit">' + '<div class="main_produit">' +'<div class="image">'+ '<section class="produit_item">' +'<div class="img_produit">' + '<img src="'+responce[i].imageUrl +'" >' + '</div>'+ '<div class="nom_produit">'+ '<h3>'+responce[i].name+'</h3>'+'</div>' + '<div class="prix-produit">'+ '<p>'+ responce[i].price/100 +'€</p>'+ '</div>'+'<div>'+ '<a href="pages/Page%20Produit%20.html?id='+ responce[i]._id +'">'+ 'voir la fiche produit'+ '</a>'+'</div>' +'</section>' +'</div>' + '</div>' + '</article>';
    }
}

window.onload= Produit();
