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

function Produit(iD) {
    fetch(URLAPI+iD)
    .then(response=>response.json())
    .then(data=>insertProduit(data))
    .catch((err) => console.log('Erreur :' + err));
};
    

function insertProduit(data){
    let articleProduit= document.getElementById("article_ours");  
    console.log(data);  
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
         +'<div>'
         +'<select id="select"><option selected disabled value="">choose..</option></select>'
         + '<a href="#">'
         + '<button id="ajouter"> ajouter au panier </button>'
         + '</a>'
         +'</div>' 
         +'</section>' 
         +'</article>';
        

         let listeColor=document.getElementById("select");
            for(let i= 0;i < data.colors.length; i++){
                listeColor.innerHTML+='<option value="'+ data.colors[i]+ '">'                
                + data.colors[i]
                +'</option>';                
            }

            document.getElementById("ajouter").addEventListener("click",function(){
                let panier= JSON.parse(localStorage.getItem("Panier"))
                if(panier==null){ 
                    panier=[];
                    }
                panier.push(idProduct);
                localStorage.setItem("Panier",JSON.stringify(panier));
                if(window.confirm("Article bien ajouté au panier.Souhaitez vous consulter votre panier ?")){
                    window.location.href = "Panier.html";
                } else {
                    window.location.href = "../index.html";
                }
                
            });
}

// Appel de fonctions
window.onload= getId();


   
