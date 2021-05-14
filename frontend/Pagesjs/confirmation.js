// récupération du numéro de commande + message de commande

function Confirmation() {

    let element = document.getElementById("confirm");
    let total = localStorage.getItem("total");
    let orderId = localStorage.getItem("numero de commande")
  
    if(orderId === null ) window.location.replace("/")

  //Création éléments HTML & affichage de l'orderId et du total du panier
    element.innerHTML =
    `<div class="row justify-content-center">
      <div class="col-12">
        <div class="my-5 py-2 text-center font-weight-bold">
            <p id="orderId">Votre numéro de commande : ${orderId}</p>
            <p id="total-prix">Total de votre commande : ${total} euros</p>
            <p>Merci d\'avoir choisi Orinounours pour vos achats</p>
            <p> A bientôt chez Orinoco !</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <img class="gif" src="../image/icegif-25.gif" alt="gif ours">
    </div>`;
  
      localStorage.clear();
  
  }
  window.onload = Confirmation();
