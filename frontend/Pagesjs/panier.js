let URLAPI = "http://localhost:3000/api/teddies/";

let affichageLocalStoragePanier = localStorage.getItem("Panier", []) || 0; //Récupérer le panier créé à la page précédente
affichageLocalStoragePanier = JSON.parse(affichageLocalStoragePanier);

function insertPanier(cart) {
    let element = document.getElementById("Panier"); //appel affichage du panier
    let totalPanier = 0;
    //affichage panier et total
    if (cart && cart.length > 0) {

        for (let i = 0; i < cart.length; i++) {
            element.innerHTML +=
                `<div class="container__cart__page">
                <tr class="text-center">
                    <td class="img_produit align-middle">
                        <img src=${cart[i].imageUrl} alt=''>
                    </td>
                    <td class="nom_produit align-middle">
                        ${cart[i].name}
                    </td>
                    <td class="prix-produit align-middle">
                        ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart[i].price / 100)}
                    </td>
                    <td class=" align-middle">
                        <button class="btn" id="btn-${i}">
                            <i class="fas fa-times fa-lg"></i>
                        </button>
                    </td>
                </tr>
            </div>`;

            totalPanier += cart[i].price / 100;
        }

        totalPanier = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPanier)
        element.innerHTML += `<th>TOTAL TTC</th>`
            + `<th></th>`
            + `<th>${totalPanier}</th>`
            + `<th></th>`;
        //local storage pour l'affichage du total du panier sur la page de confirmation
        localStorage.setItem("total", totalPanier);
        insertForm();
    }
    else {//affichage panier vide
        document.getElementById('formContact').style.display = 'none';
        document.getElementById('panier-vide').innerHTML = "<p class='color'>Votre panier Orinounours est vide <i class='fas fa-frown'></i></p>";
    }
}
window.onload = insertPanier(affichageLocalStoragePanier);

//Supprimer un produit du panier
function supprimerClick(i) {
    affichageLocalStoragePanier.splice(i, 1)
    localStorage.setItem("Panier", JSON.stringify(affichageLocalStoragePanier)) //Mise à jour du panier 
    document.location.reload(true); //Rechargement de la page
}

window.addEventListener("load", function (event) {
    for (let i = 0; i < affichageLocalStoragePanier.length; i++) {
        document.getElementById("btn-" + i).addEventListener('click', () => {
            supprimerClick(i);
            alert('Votre article va être supprimé...')
        });

    }
});

//--------------------FORMULAIRE----------------
//Critères de vérification des inputs dans le formulaire de contact: email conforme et caractères spéciaux non-autorisés
const regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexCaracteresSpeciaux = /[§!@#$%^&*().?":{}|<>]/;
function regexText(text, email) {
    if (email && !regexMail.test(text)) {
        alert("Votre adresse email est incorrecte")
        return false
    } else if (email && regexMail.test(text)) {
        return true
    }
    if (regexCaracteresSpeciaux.test(text)) {
        alert("Attention ne pas utiliser de caractères spéciaux!");
        return false;
    }
}

//Création du formulaire de contact 
function insertForm() {
    let form = document.getElementById("formContact");
    form.innerHTML =
        `<h2 class="row my-5 justify-content-center font-weight-bold">Formulaire de commande</h2>
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
					    <input id="email" type="email" class="form-control" placeholder="adressemail@valide.com" required>
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
let formulaire = document.getElementById("formulaire");

formulaire && formulaire.addEventListener("submit", (event) => {
    event.preventDefault();
    let ok = true;
    if (regexText(nom.value, false) === false) { ok = false }
    if (regexText(prenom.value, false) === false) { ok = false }
    if (regexText(email.value, true) === false) { ok = false }
    if (regexText(ville.value, false) === false) { ok = false }
    if (regexText(adresse.value, false) === false) { ok = false }

    //bloquer la suite de l'éxécution du code si les vérifications ne donnent pas de résultats conformes
    if (ok) {
        let contact = {
            firstName: document.getElementById("prenom").value,
            lastName: document.getElementById("nom").value,
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("email").value,
        }
        //envoi de l'object contact si les vérifications donnent des résultats conformes
        insertOrder(contact);
    }
});

function insertOrder(contact) {
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
            //Récupération des messages d'erreurs en cas de problèmes(s) avec la ligne grace à .stack
            console.log("Il y a une erreur :" + error.stack);
        });
}