//    Affichage des articles mis au panier dans la page panier
function getId(){ console.log('articles mis au panier');
    let affichagePanier= localStorage.getItem("Panier");
    affichagePanier=JSON.parse(affichagePanier);
    for(let i=0 ; i<affichagePanier.length; i++){
        Produit(affichagePanier[i]);
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
window.onload= getId();



/*function validPanier(responce){
    let valider=document.getElementById("clearCart");
    console.log(responce)
        valider.innerHTML= '<div class="container__cart__page">'
            +'<div class="cart__page">'
            +'<div class="container container__cart">'
            +'<button class="clearCart">'
            +'Vider le Panier'
            +'<i class="fas fa-trash-alt fa-lg"></i>'
            +'</button>'
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
            +'</div>'      
}
window.onload=getId();
        


            
        
               <div class="payer">
                    <div class="container container__info">
                        <div class="container container__payer">
                            
                            <div class="info">
                                <h2>Informations de livraison</h2>
                                <div class="form__row">
                                    <div class="form__col">
                                        <label for="firstname">Prénom :</label>
                                        <input type="text" id="firstname" name="user_firstname">
                                    </div>
                                    <div class="form__col">
                                        <label for="name">Nom :</label>
                                        <input type="text" id="name" name="user_name">
                                    </div>
                                </div>
                                <div class="form__row">
                                    <div class="form__col">
                                        <label for="adress">Adresse :</label>
                                        <input type="text" id="adress" name="user_adress">
                                    </div>
                                    <div class="form__col">
                                        <label for="city">Ville :</label>
                                        <input type="text" id="city" name="user_city">
                                    </div>
                                </div>
                                <div class="form__row">
                                    <div class="form__col">
                                        <label for="code_postal">Code Postal :</label>
                                        <input type="number" id="code_postal" name="user_code_postal">
                                    </div>
                                    <div class="form__col">
                                        <label for="mail">e-mail :</label>
                                        <input type="email" id="mail" name="user_mail">
                                    </div>
                                </div>
                            </div>
                           
                            <div class="mode_payment">
                                <h2>Informations de paiement</h2>
                                <div class="form__row">
                                    <div class="form__col">
                                        <label for="card_cvv">Méthode de Paiement :</label>
                                        <div class="card__type__container">
                                            <div>
                                                <img id="cardType" class="card__type" src="../logo/visa_card.jpg" alt="">
                                            </div>
                                            <select name="select__card" id="card__option" class="card__select">
                                                <option value="0">VISA</option>
                                                <option value="1">CARTE BLEUE</option>
                                                <option value="2">MASTERCARD</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form__row">
                                    <div class="form__col">
                                        <label for="card_number">N° de carte :</label>
                                        <input type="number" id="card_number" name="card_number">
                                    </div>
                                    <div class="form__col">
                                        <label for="card_cvv">CVV :</label>
                                        <input type="number" id="card_cvv" name="card_cvv">
                                    </div>
                                </div>
                                <div class="form__row">
                                    <div class="form__col">
                                        <label for="card_date">Date d'expiration :</label>
                                        <div class="exp__container">
                                            <input type="number" id="card_date" name="card_date">
                                            <input type="number" id="card_year" name="card_year">
                                        </div>
                                    </div>
                                    <div class="form__col">
                                        <label for="card_name">Nom :</label>
                                        <input type="text" id="card_name" name="card_name">
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <button class="button">Confirmer le paiement</button>
                                      
                    </div>
                </div>
            </div>
            */