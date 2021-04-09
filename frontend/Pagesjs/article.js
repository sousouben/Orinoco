let idProduct;

function getId(){ console.log('ok');
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    const iD = params.get("id");
    console.log(iD);
    idProduct=iD;
    Produit(iD);
    }

let URLAPI = "http://localhost:3000/api/teddies/";
if (URLAPI == null) {
    alert("Nous sommes désolés, le serveur ne répond pas !");    // plan test
} else {
    console.log('Vous etes connecté');    
}

function Produit(iD) {
    fetch(URLAPI+iD)
    .then(responce=>responce.json())
    .then(responce=>insertProduit(responce))
    }

function insertProduit(responce){
    let articleProduit= document.getElementById("article_ours");  
    console.log(responce)  
        articleProduit.innerHTML += '<article id="page_produit">' 
        + '<section class="produit_page1">' 
        +'<div class="img_produit">'
        + '<img src="'+responce.imageUrl +'" >' 
        + '</div>'
        + '<div class="info_produit">'
        +'<div class="nom_produit">'
        + '<h3>'+responce.name+'</h3>'
        +'</div>' 
        +'<hr></hr>'
        + '<div class="prix-produit">'
        + '<p>'+ responce.price/100+'€</p>'
         + '</div>'
         +'<div class="description">'
         +'<h4>Description</h4>'
         +'<p>'+responce.description+'</p>'
         +'<div>'
         +'<select id="select"></select>'
         + '<a href="#">'
         + '<button id="ajouter"> ajouter au panier </button>'
         + '</a>'
         +'</div>' 
         +'</section>' 
         +'</article>';
         let listeColor=document.getElementById("select");
            for(let i=0 ; i<responce.colors.length; i++){
                listeColor.innerHTML+='<option value="'+responce.colors[i]+ '">'
                +responce.colors[i]
                +'</option>'
            }
            document.getElementById("ajouter").addEventListener("click",function(){
                let panier= JSON.parse(localStorage.getItem("Panier"))
                if(panier==null){ 
                    panier=[];
                    }
                panier.push(idProduct);
                localStorage.setItem("Panier",JSON.stringify(panier));
                alert("produit bien ajouté au panier");
            });
}

window.onload= getId();

   
