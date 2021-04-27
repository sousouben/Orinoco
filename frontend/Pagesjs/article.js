let idProduct;

function getId(){ 
    const querystring = window.location.search;//Renvoie un objet Location contenant des informations concernant l'URL actuelle du document et fournit des méthodes pour modifier cette URL.search La partie de l'URL qui suit le symbole « ? », avec ce symbole inclus
    const params = new URLSearchParams(querystring);// fournit des informations pour l'analyse et le formatage des chaînes de requête d'URL.
    const iD = params.get("id"); // La syntaxe get permet de lier une propriété d'un objet à une fonction qui sera appelée lorsqu'on accédera à la propriété.  
    idProduct=iD;//let idProduct devient iD
    Produit(iD);
    }

let URLAPI = "http://localhost:3000/api/teddies/";

function Produit(iD) {//création d'une fonction pour avoir un identifiant pour chaque produit
    fetch(URLAPI+iD)
    .then(response=>response.json())
    .then(data=>insertProduit(data))
    .catch(error => {        
        console.log("Il y a une erreur :"+ error.stack);
    })
    
};

function insertProduit(data){    
    let articleProduit= document.getElementById("article_ours");  
    console.log(data);  //pour avoir un objet avec toutes les information sur le produit
        articleProduit.innerHTML += '<article id="page_produit">' 
        + '<section class="produit_page1">' 
        +'<div class="img_produit">'
        + '<img src="'+ data.imageUrl +'" >' 
        + '</div>'
        + '<div class="info_produit">'
        +'<div class="nom_produit">'
        + '<h3>'+ data.name+'</h3>'
        +'</div>' 
        +'<hr></hr>'
        + '<div class="prix-produit">'
        + '<p>'+ data.price/100+'€</p>'
         + '</div>'
         +'<div class="description">'
         +'<h4>Description</h4>'
         +'<p>'+ data.description+'</p>'
         +'<div class="bouton">'
         +'<select id="select"><option selected disabled value="">choose..</option></select>'
         + '<a href="#">'
         + '<button id="ajouter"> ajouter au panier </button>'
         + '</a>'
         +'</div>' 
         +'</section>' 
         +'</article>';
        

         let listeColor = document.getElementById("select");//création d'option de séléction des couleurs
            for(let i = 0;i < data.colors.length; i++){
                listeColor.innerHTML+='<option value="'+ data.colors[i]+ '">'                
                + data.colors[i]
                +'</option>';                
            }
            
            document.getElementById("ajouter").addEventListener("click",function(){
                let panier = JSON.parse(localStorage.getItem("Panier"))//La méthode JSON.parse() analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne.
                if(panier == null){ 
                    panier = [];
                    }
                panier.push(idProduct); //ajout du produit dans le panier               
                localStorage.setItem("Panier",JSON.stringify(panier));//La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON.
                if(window.confirm("Article bien ajouté au panier. Souhaitez vous consulter votre panier ?")){
                    window.location.href = "Panier.html";
                } else {
                    window.location.href = "../index.html";
                }
                
            });
}

// Appel de fonctions
window.onload= getId();


   
