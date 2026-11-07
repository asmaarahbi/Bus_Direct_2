import { initialiser,sauvegarder } from "./store.js";
const param = new URLSearchParams (window.location.search);
const idTrajet =Number(param.get("id"));
let trajet= null;
let reservations=[];
const formulaire1 = document.getElementById("formulaire1");
const namepassager = document.getElementById("nomReserver");
const seatSelect = document.getElementById("siegeReserver");
const formModifier = document.getElementById("formModifier")
const formAnnuler = document.getElementById("formAnnuler");
const passagerAnnuler = document.getElementById("passagerAnnuler");
const passagerModifier =document.getElementById("passagerModifier");
const siegeModifier = document.getElementById("siegeModifier");

const nouveauNom = document.getElementById("nouveauNom");

function enregister(){
  localStorage.setItem("reservations",JSON.stringify(reservations));
}
function getItem(){
  const got = localStorage.getItem("reservations")
  if(got !== null)
    reservations = JSON.parse(got);
}




function remplirliste() {
  seatSelect.innerHTML = '<option value="">-- Choisir un siège --</option>';
  passagerAnnuler.innerHTML = '<option value="">-- Choisir un passager --</option>';
  passagerModifier.innerHTML =  '<option value="">--Choisir un passager--</option>';
  siegeModifier.innerHTML='<option value="">-- Choisir un siège --</option>';
  for (let i = 1; i <= 20; i++) {
    let occup = false;

    for (let j = 0; j < reservations.length; j++) {
      if (reservations[j].seat === i) {
        occup = true;
      }
    }

    if (occup === false) {
      seatSelect.innerHTML += '<option value="' + i + '">' + i + "</option>";
      siegeModifier.innerHTML+='<option value="'+ i +'">'+i+"</option>";
    }
  }


  for (let j = 0; j < reservations.length; j++) {
    const options= '<option value="' + reservations[j].name + '">' + reservations[j].name + "</option>";
    passagerModifier.innerHTML+=options;
    passagerAnnuler.innerHTML+=options;
  }
}


function afficher() {
  for (let i = 1; i <= 20; i++) {
    let div = document.querySelector('[data-seat="' + i + '"]');
    div.classList.remove("bg-violet-300");
    div.classList.add("bg-blue-800");

    let numero = i;
    if (i < 10) {
      numero = "0" + i;
    }
    div.innerHTML = "<b>" + numero + "</b><br>Libre";
  }

  for (let j = 0; j < reservations.length; j++) {
    let div = document.querySelector('[data-seat="' + reservations[j].seat + '"]');
    div.classList.remove("bg-blue-800");
    div.classList.add("bg-violet-300");

    let numero = reservations[j].seat;
    if (numero < 10) {
      numero = "0" + numero;
    }
    div.innerHTML = "<b>" + numero + "</b><br>" + reservations[j].name;
  }

  const occupes = reservations.length;

  document.getElementById("libres").textContent = 20 - occupes;
  document.getElementById("occupes").textContent = occupes;
  document.getElementById("chiffre").textContent = occupes * trajet.price;
  remplirliste();
}

// Partie réservation//
formulaire1.addEventListener("submit", function (event) {
  event.prevent
  
  
  
  
  
  
  
  
  Default();

  const nomPassager = namepassager.value.trim();
  let numero = Number(seatSelect.value);

  if (nomPassager === "") {
    alert("Veuillez remplir ce champs");
    return;
  }

  if (numero === 0) {
    alert("Veuillez choisir un siège");
    return;
  }

  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].name.toLowerCase() === nomPassager.toLowerCase()) {
      alert("Ce nom existe déjà.");
      return;
    }
  }

  reservations.push({
    seat: numero,
    name: nomPassager
    
  });

  sauvegarder();
  afficher();
  alert("Réservation réussie !");
  formulaire1.reset();
});



// Partie annulation
formAnnuler.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomChoisi = passagerAnnuler.value;

  if (nomChoisi === "") {
    alert("Veuillez choisir un passager");
    return;
  }

  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].name === nomChoisi) {
      reservations.splice(i, 1);
    }
  }
sauvegarder();
  afficher();
  alert("Réservation annulée !");
  formAnnuler.reset();
});





formModifier.addEventListener("submit", function (event) {
  event.preventDefault();
console.log("from ,odifoer khdama")
  const ancienNom = passagerModifier.value;
  const nomNouveau = nouveauNom.value.trim();
  let numero = Number(siegeModifier.value);


  if (ancienNom === "") {
    alert("Veuillez choisir un passager");
    return;
  }
 

  if (nomNouveau === "" && numero === 0) {
    alert("Entrez un nouveau nom ou choisissez un nouveau siège");
    return;
  
  

  }
  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].name.toLowerCase() === ancienNom.toLowerCase()) {
      if(nomNouveau !==""){
        reservations[i].name = nomNouveau;
      }
    if(numero!== 0){
      reservations[i].seat=numero;
    } 
      
  }
  }
 

  
 

sauvegarder();
afficher();
alert("Modification réussie !")
formModifier.reset();
})  
async function demarrer() {
  const tousLesTrajets = await initialiser();
  trajet = tousLesTrajets.find((t) => t.id === idTrajet);

  if (!trajet) {
    alert("Trajet introuvable");
    return;
  }

  reservations = trajet.reservations;   
  afficher();
}

demarrer();