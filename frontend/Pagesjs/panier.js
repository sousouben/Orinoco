function getId(){ console.log('ok');
    let panier= localStorage.getItem("Panier");
    panier=JSON.parse(panier);
    for(let i=0 ; i<panier.length; i++){
        Produit(panier[i]);
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
        articlePanier.innerHTML +='<template id="cartTemp">'
        + '<div class="cart__item">'
        +'<div class="item__img">'
        +'<img src="" alt="">'
        +'</div>'
        +'<div class="item__list">'
        +'<p class="item__name"></p>'
        +'<p class="item__option"></p>'
        +'<p class="item__price"></p>'
        +'</div>'
        +'<i class="fas fa-times fa-lg"></i>'
        +'</div>'
        +'<hr>'
        +'</template>'
        +'<div class="container__cart__page">'
        +'<div class="cart__page">'
        +'<div class="container container__cart">'
        +'<span class="clearCart" id="clearCart">'
        +'Vider le Panier'
        +'<i class="fas fa-trash-alt fa-lg">'
        +'</i>'
        +'</span>'
        +'<div class="cart" id="cart__list">'
        +'</div>'
        +'<p class="total__price">'
        +'PRIX TOTAL : '
        +'<span id="totalPrice">'
        +'</span>'
        +'€'
        +'</p>'
        +'</div>'
        +'</div>'
        +'<div class="payer">'
        +'<div class="container container__info">'
        +'<div class="cart__page">'
        +'<div class="container container__cart">'
        +'<span class="clearCart" id="clearCart">'
        +'Vider le Panier'
        +'<i class="fas fa-trash-alt fa-lg">'
        +'</i>'
        +'</span>'
        +'<div class="cart" id="cart__list">'
        +'</div>'
        +'<p class="total__price">'
        +'PRIX TOTAL : '
        +'<span id="totalPrice">'
        +'</span>'
        +'€'
        +'</p>'
        +'</div>'
        +'</div>'
        +'<div class="payer">'
        +'<div class="container container__info">'
        +'<div class="container container__payer">'
        +'<div class="info">'
        +'<h2>Informations de livraison</h2>'
        +'<div class="form__row">'
        +'<div class="form__col">'
        +'<label for="firstname">'
        +'Prénom :'
        +'</label>'
        +'<input type="text" id="firstname" name="user_firstname">'
        +'</div>';
}
window.onload= getId();
        