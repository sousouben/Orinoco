//    Affichage des articles mis dans le localstorage panier 
function getProduitsPaniers() {
        if (affichageLocalStoragePanier == null || affichageLocalStoragePanier.length === 0) {// si le panier est vide 
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('panier-vide').innerHTML= "<p class='color'>Votre panier Orinounours est vide <i class='fas fa-frown'></i></p>";
       
    } else {
        for (let i = 0; i < affichageLocalStoragePanier.length; i++) {
            Produit(affichageLocalStoragePanier[i], i);
            console.log('articles mis au panier');
        }
    }
};


let affichageLocalStoragePanier = localStorage.getItem("Panier");
affichageLocalStoragePanier = JSON.parse(affichageLocalStoragePanier);
/*console.log(affichageLocalStoragePanier);*/

let URLAPI = "http://localhost:3000/api/teddies/";

function Produit(iD, i) {
    fetch(URLAPI + iD)
        .then(response => response.json())
        .then(data => insertPanier(data, i))
        .catch((err) => console.log('Erreur :' + err));
};


function insertPanier(data, i) {
    let articlePanier = document.getElementById("Panier");
    console.log(data);
    articlePanier.innerHTML += '<div class="container__cart__page">'
        + '<tr class="text-center">'
        + '<td class="img_produit align-middle">'
        + '<img src="' + data.imageUrl + '" >'
        + '</td>'
        + '<td class="nom_produit align-middle">'
        + '<h3>' + data.name + '</h3>'
        + '</td>'
        + '<td class="prix-produit align-middle">'
        + '<p>' + data.price / 100 + '€</p>'
        + '</td>'
        + '<td class=" align-middle">'
        + '<button id="supprimer' + i + '"><i class="fas fa-times fa-lg"></i></button>'
        + '</td>'
        + '</tr>'
        + '</div>'
        ;
    // ----------gestion des suppressions des produits

    for (let j = 0; j < affichageLocalStoragePanier.length; j++) {
        let btnSupprimer = document.getElementById('supprimer' + j).addEventListener("click", (event) => {
            supprimerProduit(j)
        }
        )
        
    }

   
    //----------prix total
    for(k = 0;k < affichageLocalStoragePanier.length; k++){
        let totalPrix=data.price;
        let total = 0 ;        
        total =  totalPrix + affichageLocalStoragePanier;
        console.log(total.length);
        //Stockage du prix dans le localStorage pour la page de confirmation
        localStorage.setItem("totalOrder", JSON.stringify(total));
    }

    
};

function supprimerProduit(j) {
    console.log(affichageLocalStoragePanier);
    affichageLocalStoragePanier.splice(j, 1);
    localStorage.setItem("Panier", JSON.stringify(affichageLocalStoragePanier));
    document.location.reload(true);
}

//---------------------------FORMULAIRE----------------

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

// écouter les modidfications
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
        let object = {
            contact, products
        }
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
                console.log(response.orderId);//numéro decommande
                
            })
        window.location.href = "confirmation.html";//ouverture de la page confirmation
        console.log('le formulaire est valide');
    } else {
        console.log("le formulaire est incorrect");
        alert("veuillez remplir le formulaire pour valider la commande...");
    }
});

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

};


/////////////////////// Appel de fonctions////////////////////////////////
window.onload = getProduitsPaniers();

