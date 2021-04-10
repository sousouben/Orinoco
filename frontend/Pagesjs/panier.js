//    Affichage des articles mis dans le localstorage panier 
function getProduitsPaniers() {
    console.log('articles mis au panier');
    let affichageLocalStoragePanier = localStorage.getItem("Panier");
    if (affichageLocalStoragePanier == null) {
        document.getElementById('loginForm').style.display = 'none';
        console.log('panier vide');
    } else {
        affichageLocalStoragePanier = JSON.parse(affichageLocalStoragePanier);
        for (let i = 0; i < affichageLocalStoragePanier.length; i++) {
            Produit(affichageLocalStoragePanier[i]);
        }
    }
};

let URLAPI = "http://localhost:3000/api/teddies/";
/*if (URLAPI == null) {
    alert("Nous sommes désolés, le serveur ne répond pas !");    // plan test
} else {
    console.log('Vous etes connecté');
};*/

function Produit(iD) {
    fetch(URLAPI + iD)
        .then(responce => responce.json())
        .then(responce => insertPanier(responce))
};

function insertPanier(responce) {
    let articlePanier = document.getElementById("Panier");
    console.log(responce);
    articlePanier.innerHTML += '<div class="container__cart__page">'
        + '<div class="cart__page">'
        + '<div class="img_produit">'
        + '<img src="' + responce.imageUrl + '" >'
        + '</div>'
        + '<div class="item__list">'
        + '<div class="nom_produit">'
        + '<h3>' + responce.name + '</h3>'
        + '</div>'
        + '<div class="prix-produit">'
        + '<p>' + responce.price / 100 + '€</p>'
        + '</div>'
        + '<button class="supprimer"><i class="fas fa-times fa-lg"></i></button>'
        + '</div>'
        + '<hr>';
    // gestion des suppression des produits
    let btnSupprimer = document.querySelectorAll('.supprimer');
    console.log(btnSupprimer);

    for (let j = 0; j < btnSupprimer.length; j++) {
        btnSupprimer[j].addEventListener("click", (event) => {
            event.preventDefault();
            console.log(event); //pour verifier si le click se fait correctement   
        }
        )
    }


};
window.onload = getProduitsPaniers();




/*function totalPanier()*/


//---------------------------FORMULAIRE----------------

//Récupération des inputs

let nom = document.getElementById("name");
let prenom = document.getElementById("firstname");
let email = document.getElementById("email");
let adresse = document.getElementById("adress");
let ville = document.getElementById("city");


// écouter les modidfications

nom.addEventListener('change', function () {
    validName(this);
});

prenom.addEventListener('change', function () {
    validFirstName(this);
});

email.addEventListener('change', function () {
    validEmail(this);
});

adresse.addEventListener('change', function () {
    validAdresse(this);
});

ville.addEventListener('change', function () {
    validCity(this);
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
    let small = inputUserLastName.nextElementSibling;

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

//validation du prénom

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

//validation de l'adresse

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

//validation de la ville

const validCity = function (inputUserCity) {
    let msg;
    let valid = false;

    if (inputUserCity.value.length < 3) {
        msg = 'le prénom doit contenir au moins 3 caractères';
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

// validation email***********************************
const validEmail = function (inputEmail) {

    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    let small = inputEmail.nextElementSibling;
    console.log(small);

    //on test l'expression régulière
    if (emailRegExp.test(inputEmail.value)) {
        small.innerHTML = 'Adresse valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    }
    else {
        small.innerHTML = 'Adresse invalide';
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }

};


