import { initialiser, sauvegarder } from "./store.js";
import { estVIP, prixSiege, estcomplet,placeLibres } from "./reservations.js";


const params = new URLSearchParams(window.location.search);
const idTrajet = Number(params.get("id"));
let trajet = null;
let reservations = [];


const bus = document.getElementById("bus");
const boiteMessage = document.getElementById("message");

const formulaire1 = document.getElementById("formulaire1");
const namepassager = document.getElementById("nomReserver");
const seatSelect = document.getElementById("siegeReserver");

const formAnnuler = document.getElementById("formAnnuler");
const passagerAnnuler = document.getElementById("passagerAnnuler");

const formModifier = document.getElementById("formModifier");
const passagerModifier = document.getElementById("passagerModifier");
const siegeModifier = document.getElementById("siegeModifier");
const nouveauNom = document.getElementById("nouveauNom");
const regexTel=/^(0|\+212)[67]\d{8}$/;

const formAttente = document.getElementById("formAttente");
const nomAttente = document.getElementById("nomAttente");
const telAttente = document.getElementById("telAttente");
let minuteur = null;

function afficherMessage(texte, type) {
  boiteMessage.textContent = texte;
  boiteMessage.className = "rounded-xl px-4 py-3 mb-6 font-semibold ";

  if (type === "succes") {
    boiteMessage.className += "bg-green-100 text-green-700";
  } else {
    boiteMessage.className += "bg-red-100 text-red-700";
  }

  clearTimeout(minuteur);
  minuteur = setTimeout(function () {
    boiteMessage.className = "hidden";
  }, 4000);
}


function creerSieges() {
  bus.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");
    div.setAttribute("data-seat", i);
    bus.appendChild(div);
  }
}


function remplirliste() {
  seatSelect.innerHTML = '<option value="">-- Choisir un siège --</option>';
  siegeModifier.innerHTML = '<option value="">-- Choisir un siège --</option>';
  passagerAnnuler.innerHTML = '<option value="">-- Choisir un passager --</option>';
  passagerModifier.innerHTML = '<option value="">-- Choisir un passager --</option>';

  for (let i = 1; i <= 20; i++) {
    let occup = false;
    for (let j = 0; j < reservations.length; j++) {
      if (reservations[j].seat === i) {
        occup = true;
      }
    }

    if (occup === false) {
      let texte = i;
      if (estVIP(i)) {
        texte = i + " (VIP)";
      }
      seatSelect.innerHTML += '<option value="' + i + '">' + texte + "</option>";
      siegeModifier.innerHTML += '<option value="' + i + '">' + texte + "</option>";
    }
  }

  for (let j = 0; j < reservations.length; j++) {
    const option = '<option value="' + reservations[j].name + '">' + reservations[j].name + "</option>";
    passagerAnnuler.innerHTML += option;
    passagerModifier.innerHTML += option;
  }
}

// liste attente 
function afficherAttente() {
  const liste = document.getElementById("listeAttente");
  liste.innerHTML = "";
  document.getElementById("nbAttente").textContent = trajet.waitingList.length;

  if (trajet.waitingList.length === 0) {
    liste.innerHTML = '<li class="text-gray-500 text-sm">Aucune personne en attente</li>';
    return;
  }
  const places =  placeLibres(trajet);

  for (let i = 0; i < trajet.waitingList.length; i++) {
    const personne = trajet.waitingList[i];
    const li = document.createElement("li")
    li.className = "flex items-center gap-3 border-b border-gray-100 py-2"
    li.innerHTML =
       '<span class = "font-semibold">'+ personne.name +"</span>";
       '<span class = "text-gray-500 text-sm">'+ personne.phone +"</span>";
      

  // ajouter bouton si la place est lbre
  if(places>0){
    const bouton =document.createElement("button")
    bouton.textContent="Ajouter"
    bouton.className = "ml-auto bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition";
    bouton.addEventListener("click",function(){
    ajouterDepuisAttente(i);
  
  });
  li.appendChild(bouton);
  }
  liste.appendChild(li);
}
}
// prendre premier siege libre et apres les siege vi^p
function premiersiegeLibre() {
  const ordre = [];
  for (let i = 5; i <= 20; i++) {
    ordre.push(i);
  }
  for (let i = 1; i <= 4; i++) {
    ordre.push(i);
  }

  for (let k = 0; k < ordre.length; k++) {
    let pris = false;
    for (let j = 0; j < reservations.length; j++) {
      if (reservations[j].seat === ordre[k]) {
        pris = true;
      }
    }
    if (pris === false) {
      return ordre[k];
    }
  }
  return 0;
}

function ajouterDepuisAttente(index){
  const siege = premiersiegeLibre();
  if(siege===0 ){
    afficherMessage("Aucun place libre","erreur");
    return;
  }
  const personne= trajet.waitingList.splice(index,1)[0];
  reservations.push({seat:siege,name:personne.name, phone:personne.phone})
  sauvegarder()
  afficher()
  afficherMessage(personne.name+" est ajouté au siège "+siege,"succes")
}

function afficher() {
  document.getElementById("trajetTitre").textContent = trajet.departure + " → " + trajet.destination;
  document.getElementById("trajetPrix").textContent =
    trajet.price + " DH / place · VIP : " + prixSiege(trajet.price, 1) + " DH";

  const base = "rounded-lg p-3 text-center text-sm ";

  // sièges libres
  for (let i = 1; i <= 20; i++) {
    const div = document.querySelector('[data-seat="' + i + '"]');

    let numero = i;
    if (i < 10) {
      numero = "0" + i;
    }

    if (estVIP(i)) {
      div.className = base + "bg-yellow-500 text-gray-900";
      div.innerHTML = "<b>" + numero + "</b><br>VIP";
    } else {
      div.className = base + "bg-blue-800 text-white";
      div.innerHTML = "<b>" + numero + "</b><br>Libre";
    }
  }

  // sièges occupés
  let recette = 0;
  for (let j = 0; j < reservations.length; j++) {
    const div = document.querySelector('[data-seat="' + reservations[j].seat + '"]');

    let numero = reservations[j].seat;
    if (numero < 10) {
      numero = "0" + numero;
    }

    div.className = base + "bg-violet-300 text-gray-900";
    div.innerHTML = "<b>" + numero + "</b><br>" + reservations[j].name;

    recette = recette + prixSiege(trajet.price, reservations[j].seat);
  }

  const occupes = reservations.length;
  document.getElementById("libres").textContent = 20 - occupes;
  document.getElementById("occupes").textContent = occupes;
  document.getElementById("chiffre").textContent = recette;

  const bouton = document.getElementById("btnReserver");
  if (estcomplet(trajet)) {
    bouton.textContent = "Rejoindre la liste d’attente";
  } else {
    bouton.textContent = "Confirmer";
  }

  afficherAttente();
  remplirliste();
}

// Réservation
formulaire1.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomPassager = namepassager.value.trim();
  const numero = Number(seatSelect.value);
  const complet = estcomplet(trajet);

  if (nomPassager === "") {
    afficherMessage("Veuillez remplir le nom du passager", "erreur");
    return;
  }
  if (complet === false && numero === 0) {
    afficherMessage("Veuillez choisir un siège", "erreur");
    return;
  }

  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].name.toLowerCase() === nomPassager.toLowerCase()) {
      afficherMessage("Ce nom existe déjà.", "erreur");
      return;
    }
  }
  for (let i = 0; i < trajet.waitingList.length; i++) {
    if (trajet.waitingList[i].name.toLowerCase() === nomPassager.toLowerCase()) {
      afficherMessage("Ce nom est déjà en liste d’attente.", "erreur");
      return;
    }
  }

  
  if (complet) {
    trajet.waitingList.push({ name: nomPassager, phone: "" });
    sauvegarder();
    afficher();
    afficherMessage(nomPassager + " est en liste d’attente (n° " + trajet.waitingList.length + ")", "succes");
    formulaire1.reset();
    return;
  }

  reservations.push({ seat: numero, name: nomPassager, phone: "" });
  sauvegarder();
  afficher();
  afficherMessage("Réservation réussie ! Siège " + numero + " pour " + nomPassager, "succes");
  formulaire1.reset();
});

// Annulation
formAnnuler.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomChoisi = passagerAnnuler.value;
  if (nomChoisi === "") {
    afficherMessage("Veuillez choisir un passager", "erreur");
    return;
  }

  let siegeLibere = 0;
  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].name === nomChoisi) {
      siegeLibere = reservations[i].seat;
      reservations.splice(i, 1);
      break;
    }
  }

  let texte = "Réservation annulée.";

  if (trajet.waitingList.length > 0) {
    const premier = trajet.waitingList.shift();
    reservations.push({ seat: siegeLibere, name: premier.name, phone: premier.phone });
    texte = texte + " " + premier.name + " passe de la liste d’attente au siège " + siegeLibere + ".";
  }

  sauvegarder();
  afficher();
  afficherMessage(texte, "succes");
  formAnnuler.reset();
});

formModifier.addEventListener("submit", function (event) {
  event.preventDefault();

  const ancienNom = passagerModifier.value;
  const nomNouveau = nouveauNom.value.trim();
  const numero = Number(siegeModifier.value);

  if (ancienNom === "") {
    afficherMessage("Veuillez choisir un passager", "erreur");
    return;
  }
  if (nomNouveau === "" && numero === 0) {
    afficherMessage("Entrez un nouveau nom ou choisissez un nouveau siège", "erreur");
    return;
  }

  if (nomNouveau !== "") {
    for (let i = 0; i < reservations.length; i++) {
      const memeNom = reservations[i].name.toLowerCase() === nomNouveau.toLowerCase();
      const autrePassager = reservations[i].name !== ancienNom;
      if (memeNom && autrePassager) {
        afficherMessage("Nom déjà existant, choisissez un autre nom.", "erreur");
        return;
      }
    }
  }

  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].name === ancienNom) {
      if (nomNouveau !== "") {
        reservations[i].name = nomNouveau;
      }
      if (numero !== 0) {
        reservations[i].seat = numero;
      }
    }
  }

  sauvegarder();
  afficher();
  afficherMessage("Modification réussie !", "succes");
  formModifier.reset();
});
// form de liste att
formAttente.addEventListener("submit", function (event) {
event.preventDefault();
const nom = nomAttente.value.trim();
const tel = telAttente.value.trim();

if (nom === "") {
  afficherMessage("Veuillez remplir le nom", "erreur");
  return;
}

if (regexTel.test(tel) === false) {
  afficherMessage("Téléphone invalide (ex : 0612345678)", "erreur");
  return;
}

for (let i = 0; i < reservations.length; i++) {
  if (reservations[i].name.toLowerCase() === nom.toLowerCase() || reservations[i].phone === tel) {
    afficherMessage("Cette personne a déjà une réservation", "erreur");
    return;
  }
}
for (let i = 0; i < trajet.waitingList.length; i++) {
  if (trajet.waitingList[i].name.toLowerCase() === nom.toLowerCase() || trajet.waitingList[i].phone === tel) {
    afficherMessage("Cette personne est déjà en liste d’attente", "erreur");
    return;
  }
}

  trajet.waitingList.push({ name: nom, phone: tel });
  sauvegarder();
  afficher();
  afficherMessage(nom + " a été ajouté à la liste d’attente", "succes");
  formAttente.reset();
});
async function demarrer() {
  const tousLesTrajets = await initialiser();
  trajet = tousLesTrajets.find((t) => t.id === idTrajet);

  if (!trajet) {
    document.getElementById("trajetTitre").textContent =
      "Trajet introuvable : choisissez un trajet depuis la page d’accueil";
    return;
  }

  reservations = trajet.reservations;
  creerSieges();
  afficher();
}

demarrer();