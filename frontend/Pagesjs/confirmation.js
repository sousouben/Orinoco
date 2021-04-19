// récupération du numéro de commande + message de commande
function ordreDeConfirmation(){
const orderId = localStorage.getItem('numero de commande');
console.log(orderId);
const messageDeConfirmation = document.getElementById('orderId');
messageDeConfirmation.innerHTML = 'Votre commande est confirmée <br> sous le n°: '+ orderId + '<br>'+ '<p>Merci d\'avoir choisi Orinounours pour vos achats</p>' ;
console.log(messageDeConfirmation);
const totalPrix = localStorage.getItem("totalOrder");
const PrixConfirm = document.getElementById('total-prix');
PrixConfirm.innerHTML = 'Prix total :' + totalPrix + '€' + '<br>'+'<br>' + '<p> A bientôt chez Orinoco !</p>';

}

ordreDeConfirmation()