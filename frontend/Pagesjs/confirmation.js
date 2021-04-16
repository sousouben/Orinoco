// récupération du numéro de commande + message de commande
function ordreDeConfirmation(){
const orderId = localStorage.getItem('numero de commande');
console.log(orderId);
const messageDeConfirmation = document.getElementById('orderId');
messageDeConfirmation.innerHTML = 'Votre commande est confirmée <br> sous le n°: '+ orderId + '<br>'+ '<p>Merci d\'avoir choisi Orinounours pour vos achats</p>'+ '<br>' + '<p> A bientôt chez Orinoco !</p>' ;
console.log(messageDeConfirmation);

}

ordreDeConfirmation()