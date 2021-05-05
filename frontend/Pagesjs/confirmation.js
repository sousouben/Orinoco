// récupération du numéro de commande + message de commande

window.onload = function () {

    let element = document.getElementById("orderId");
    let total = localStorage.getItem("total");
    let orderId = localStorage.getItem("numero de commande")
  
    if(orderId === null ) window.location.replace("/")

  //Création éléments HTML & affichage de l'orderId et du total du panier
    element.innerHTML =
    `<li class="list-group-item">Votre numéro de commande : ${orderId}</li>
      <li class="list-group-item">Total de votre commande : ${total} euros</li><p>Merci d\'avoir choisi Orinounours pour vos achats</p><p> A bientôt chez Orinoco !</p>`;
  
      localStorage.clear();
  
  }
