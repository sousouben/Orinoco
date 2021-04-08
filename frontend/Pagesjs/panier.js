//    Affichage des articles mis au panier dans la page panier
function getProduitsPaniers(){ console.log('articles mis au panier');
    let affichagePanier= localStorage.getItem("Panier");
    if(affichagePanier == null){
        document.getElementById('loginForm').style.display='none';
    }else{
        affichagePanier=JSON.parse(affichagePanier);
    for(let i=0 ; i<affichagePanier.length; i++){
        Produit(affichagePanier[i]);
    }
    }
    
}

let URLAPI = "http://localhost:3000/api/teddies/";

function Produit(iD) {
    fetch(URLAPI+iD)
    .then(responce=>responce.json())
    .then(responce=>insertPanier(responce))
    }

function insertPanier(responce){
    let articlePanier= document.getElementById("Panier");  
    console.log(responce)  
        articlePanier.innerHTML +='<div class="container__cart__page">'
        +'<div class="cart__page">'
        +'<div class="img_produit">'
        + '<img src="'+responce.imageUrl +'" >' 
        + '</div>'
        +'<div class="item__list">'
        +'<div class="nom_produit">'
        + '<h3>'+responce.name+'</h3>'
        +'</div>' 
        + '<div class="prix-produit">'
        + '<p>'+ responce.price/100+'€</p>'
        + '</div>'
        +'<i class="fas fa-times fa-lg"></i>'
        +'</div>'
               
}
window.onload= getProduitsPaniers();


              