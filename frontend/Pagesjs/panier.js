let URLAPI = "http://localhost:3000/api/teddies/";

let affichageLocalStoragePanier = localStorage.getItem("Panier"); //Récupérer le panier créé à la page précédente
affichageLocalStoragePanier = JSON.parse(affichageLocalStoragePanier);

function generateCart(cart) {
    let element = document.getElementById("Panier"); //appel affichage du panier
	let totalPanier = 0;
	//affichage panier et total
	if(cart && cart.length > 0){
	
		for (let i = 0; i < cart.length; i++) {
			element.innerHTML +='<div class="container__cart__page">'
            +`<tr class="text-center">` 
            +`<td class="img_produit align-middle"> <img src='${cart[i].imageUrl}' alt=''></td>`
            +`<td class="nom_produit align-middle">${cart[i].name}</td>` 
            +`<td class="prix-produit align-middle">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart[i].price/100)}</td>` 
            +`<td class=" align-middle"><button class="btn" id="btn-${i}"><i class="fas fa-times fa-lg"></i></button></td>` 
            +`</tr>`
            +`</div>`;

			totalPanier += cart[i].price/100;				
        }

        totalPanier = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPanier)
		element.innerHTML += `<th>TOTAL TTC</th>` 
        + `<th></th>` 
        + `<th>${totalPanier}</th>`
        + `<th></th>`;
		//local storage pour l'affichage du total du panier sur la page de confirmation
		localStorage.setItem("total", totalPanier);  
		generateForm();
	} 
    else{//affichage panier vide
        document.getElementById('formContact').style.display = 'none';
        document.getElementById('panier-vide').innerHTML= "<p class='color'>Votre panier Orinounours est vide <i class='fas fa-frown'></i></p>";
    } 
}
window.onload = generateCart(affichageLocalStoragePanier);

//Retirer un produit du panier
function clickOnDelete(i) {
	affichageLocalStoragePanier.splice(i,1)
	localStorage.setItem("Panier", JSON.stringify(affichageLocalStoragePanier)) //Mise à jour du panier 
	document.location.reload(true); //Rechargement de la page
}

window.addEventListener("load", function(event) {
    for(let i=0; i<affichageLocalStoragePanier.length; i++){
        document.getElementById("btn-" + i).addEventListener('click', ()=> {clickOnDelete(i)})        
    }
});

//--------------------FORMULAIRE----------------
//Critères de vérification des inputs dans le formulaire de contact: email conforme et caractères spéciaux non-autorisés
const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const checkCaracteresSpeciaux = /[§!@#$%^&*().?":{}|<>]/;
function checktext(text,email){
	if(email && !checkMail.test(text)){
        alert("Votre adresse email est incorrecte")
		return false
    }else if(email && checkMail.test(text)){
        return true
    }
	if (checkCaracteresSpeciaux.test(text) ) {
		alert("Attention ne pas utiliser de caractères spéciaux!");
		return false;
	}
}

//Création du formulaire de contact 
function generateForm(){
	let form = document.getElementById("formContact");
	form.innerHTML =
		`<h2 class="row my-5">Formulaire de commande</h2>
		<form id="formulaire">
			<div class="row">
				<div class="col">
					<label for="prenom">Prenom</label>
					<input id="prenom" type="text" class="form-control" placeholder="Prénom" required>
				</div>
				<div class="col">
					<label for="nom">Nom</label>
					<input id="nom" type="text" class="form-control" placeholder="Nom" required>
				</div>
			</div>
			<div class="row my-4">
				<div class="col">
					<label for="adresse">Adresse</label>
					<input id="adresse" type="text" class="form-control" placeholder="Adresse" required>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<label for="codepostal">Code Postal</label>
					<input id="codepostal" type="number" class="form-control" placeholder="Code Postal" required>
				</div>
				<div class="col">
					<label for="ville">Ville</label>
					<input id="ville" type="text" class="form-control" placeholder="Ville" required>
				</div>
			</div>
			<div class="row my-4">
				<div class="col">
					<label for="email">Email</label>
					<input id="email" type="email" class="form-control" placeholder="Adresse électronique" required>
				</div>
			</div>
			<div class="row my-4">
				<div class="col">
					<button type="submit" class="btn btn-secondary btn-lg btn-block">Valider</button>
				</div>
			</div>
		</form>`;
}

//Vérification des inputs du formulaire
document.getElementById("formulaire").addEventListener("submit", (event) => {
    event.preventDefault();
	let ok = true;
    if(checktext(nom.value, false)===false){ok = false}
    if(checktext(prenom.value, false)===false){ok = false}
    if(checktext(email.value, true)===false){ok = false}
    if(checktext(ville.value, false)===false){ok = false}
    if(checktext(adresse.value, false)===false){ok = false}

    //bloquer la suite de l'éxécution du code si les vérifications ne donnent pas de résultats conformes
    if(ok){
        let contact = {
            firstName: document.getElementById("prenom").value,
            lastName: document.getElementById("nom").value,
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("email").value,
        }
        //envoi de l'object contact si les vérifications donnent des résultats conformes
        sendOrder(contact);
    }
});

function sendOrder(contact){
    //parcourir le tableau panier et récupérer les attributs id pour en faire un tableau
    const products = affichageLocalStoragePanier.map(item => item.id)
    const send = {
        contact, products
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(send),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // envoi de la requête post en fetch asynchrone - paramètres URL (renvoi une promesse)
    fetch(URLAPI + "order", options)
        .then(response => response.json()) //récupère la promesse puis la réponse promise - conversion JSON
        .then(response => {
            localStorage.removeItem("Panier");
            localStorage.setItem("numero de commande", response.orderId); 
            window.location.replace("confirmation.html")
        })
        .catch(error => {
            console.log("Il y a une erreur :" + error.stack);
        })
}

/*
//--------------------FORMULAIRE----------------

//Récupération des inputs
let nom = document.getElementById("name");
let prenom = document.getElementById("firstname");
let email = document.getElementById("email");
let adresse = document.getElementById("adress");
let ville = document.getElementById("city");
let formulaire = document.getElementById('submit');
let valid1;
let valid2;
let valid3;
let valid4;
let valid5;

//validation du formulaire et redirection vers la page de confirmation
formulaire.addEventListener('click', function (e) {
    e.preventDefault();
    if (valid1 && valid2 && valid3 && valid4 && valid5) {
        let contact = {
            firstName: nom.value,
            lastName: prenom.value,
            address: adresse.value,
            city: ville.value,
            email: email.value
        }
        let products = affichageLocalStoragePanier
         // création d'un objet regroupant contact et produits
        let object = {
            contact, products
        }
        // envoie des données au serveur
        const option = {
            method: "POST",
            body: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json"
            }
        }
        console.log(object);
        console.log(option);
        fetch(URLAPI + 'order', option)
            .then(response => response.json())
            .then(response => {
                localStorage.removeItem("Panier")//vider le panier
                localStorage.setItem("numero de commande", response.orderId)//récupération du numéro de commande 
                console.log(response.orderId);//numéro de commande                
            })
        window.location.href = "confirmation.html";//ouverture de la page confirmation
        console.log('le formulaire est valide');
    } else {
        console.log("le formulaire est incorrect");
        alert("veuillez remplir le formulaire pour valider la commande...");
    }
});

// écouter les modidfications
nom.addEventListener('change', function () {
    valid1 = validName(this);
});

prenom.addEventListener('change', function () {
    valid2 = validFirstName(this);
});

email.addEventListener('change', function () {
    valid3 = validEmail(this);
});

adresse.addEventListener('change', function () {
    valid4 = validAdresse(this);
});

ville.addEventListener('change', function () {
    valid5 = validCity(this);
});

//validation du nom
const validName = function (inputUserLastName) {
    let msg;//message a afficher dans le small 
    let valid = false;
    //au moins 3 caractères 
    if (inputUserLastName.value.length < 2) {
        msg = 'le nom doit contenir au moins 2 caractères';
    }
    else if (/[0-9]/.test(inputUserLastName.value)) {
        msg = 'le nom ne doit pas contenir de chiffre';
    }
    else if (!/[a-zA-Z]/.test(inputUserLastName.value)) {
        msg = 'le nom doit contenir que des lettres';
    }
    //nom valide
    else {
        msg = 'le nom est valide';
        valid = true;//lorsque tous les tests sont passé la variable devient vrai
    }
    //affichage
    // récupréation balise small
    let small = inputUserLastName.nextElementSibling;//permet de cibler l'element après input

    //on test l'expression régulière
    if (valid) {
        small.innerHTML = 'Nom valide';
        small.classList.remove('text-danger');// le texte devient rouge lorsqu'il est faux
        small.classList.add('text-success');// le texte devient vert lorqu'il est bon
        return true;
    }
    else {
        small.innerHTML = msg;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

//////validation du prénom

const validFirstName = function (inputUserFurstName) {
    let msg;
    let valid = false;

    if (inputUserFurstName.value.length < 2) {
        msg = 'le prénom doit contenir au moins 2 caractères';
    }
    else if (/[0-9]/.test(inputUserFurstName.value)) {
        msg = 'le prénom ne doit pas contenir de chiffre';
    }
    else if (!/[a-zA-Z]/.test(inputUserFurstName.value)) {
        msg = 'le prénom doit contenir que des lettres';
    }

    else {
        msg = 'le prénom est valide';
        valid = true;
    }
    let small = inputUserFurstName.nextElementSibling;

    //on test l'expression régulière
    if (valid) {
        small.innerHTML = 'Prénom valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    }
    else {
        small.innerHTML = msg;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

//////validation de l'adresse

const validAdresse = function (inputUserAdress) {
    let msg;
    let valid = false;

    if (inputUserAdress.value.length < 3) {
        msg = 'l\'adresse doit contenir au moins 3 caractères';
    }
    else if (!/[0-9]/.test(inputUserAdress.value)) {
        msg = 'l\'adresse doit contenir des chiffres';
    }

    else if (!/[a-zA-Z]/.test(inputUserAdress.value)) {
        msg = 'l\'adresse doit contenir au moins 1 lettre';
    }

    else {
        msg = 'l\'adress est valide';
        valid = true;
    }
    let small = inputUserAdress.nextElementSibling;

    //on test l'expression régulière
    if (valid) {
        small.innerHTML = 'Adresse valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    }
    else {
        small.innerHTML = msg;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

//////validation de la ville

const validCity = function (inputUserCity) {
    let msg;
    let valid = false;

    if (inputUserCity.value.length < 3) {
        msg = 'la ville doit contenir au moins 3 caractères';
    }
    else if (/[0-9]/.test(inputUserCity.value)) {
        msg = 'la ville ne doit pas contenir de chiffre';
    }
    else if (!/[a-zA-Z]/.test(inputUserCity.value)) {
        msg = 'la ville doit contenir que des lettres';
    }

    else {
        msg = 'la ville est valide';
        valid = true;
    }
    let small = inputUserCity.nextElementSibling;

    //on test l'expression régulière
    if (valid) {
        small.innerHTML = 'Ville valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    }
    else {
        small.innerHTML = msg;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

///// validation email***********************************
const validEmail = function (inputEmail) {

    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    let small = inputEmail.nextElementSibling;
    console.log(small);

    //on test l'expression régulière
    if (emailRegExp.test(inputEmail.value)) {
        small.innerHTML = 'Email valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    }
    else {
        small.innerHTML = 'Email invalide';
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};*/

