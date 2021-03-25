function getId(){ console.log('ok');
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    const iD = params.get("id");
    console.log(iD);
    Produit(iD);
}

let URLAPI = "http://localhost:3000/api/teddies/";//Au choix entre : "cameras" - "furniture" - "teddies"

function Produit(iD) {
    fetch(URLAPI+iD).then(responce=>responce.json())// fetch va chercher l'URL + transformation de la réponse en json
    .then(responce=>insertProduit(responce))//.then sert à attacher les functions 
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
        + '<div class="prix-produit">'
        + '<p>'+ responce.price/100+'€</p>'
         + '</div>'
         +'<div class="description">'
         +'<h4>'+responce.description+'</h4>'
         +'<div>'
         +'<select id="select"></select>'
         + '<a href="#">'+ 'ajouter au panier'+ '</a>'
         +'</div>' 
         +'</section>' 
         +'</article>';
         let select=document.getElementById("select");
            for(let i=0 ; i<responce.colors.length; i++){
                select.innerHTML+='<option value="'+responce.colors[i]+ '">'+responce.colors[i]+'</option>'

            }
         
    
}

window.onload= getId();


