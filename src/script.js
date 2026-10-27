const prix_siege = 80;

const formulaire1 = document.getElementById("formulaire1");
const namepassager = document.getElementById("nomReserver");
const seatSelect = document.getElementById("siegeReserver");

const formAnnuler = document.getElementById("formAnnuler");
const passagerAnnuler = document.getElementById("passagerAnnuler");

let reservations = JSON.parse(localStorage.getItem("reservations"))||[];
function enregister(){
  localStorage.setItem("reservation",JSON.stringify(reservations));
}




function remplirliste() {
  seatSelect.innerHTML = '<option value="">-- Choisir un siège --</option>';
  passagerAnnuler.innerHTML = '<option value="">-- Choisir un passager --</option>';
  passagerModifier.innerHTML =  '<option value="">--Choisir un passager--</option>';
  siegeModifier.innerHTML='<option value="">-- Choisir un siège --</option>';
  for (let i = 1; i <= 20; i++) {
    let occup = false;

    for (let j = 0; j < reservations.length; j++) {
      if (reservations[j].siege === i) {
        occup = true;
      }
    }

    if (occup === false) {
      seatSelect.innerHTML += '<option value="' + i + '">' + i + "</option>";
      siegeModifier.innerHTML+='<option value="'+ i +'">'+i+"</option>";
    }
  }

  for (let j = 0; j < reservations.length; j++) {
    const options= '<option value="' + reservations[j].nom + '">' + reservations[j].nom + "</option>";
    passagerModifier.innerHTML+=options;
    passagerAnnuler.innerHTML+=options;
  }
}


function afficher() {
  for (let i = 1; i <= 20; i++) {
    const div = document.querySelector('[data-seat="' + i + '"]');
    div.classList.remove("bg-violet-300");
    div.classList.add("bg-blue-800");

    let numero = i;
    if (i < 10) {
      numero = "0" + i;
    }
    div.innerHTML = "<b>" + numero + "</b><br>Libre";
  }

  for (let j = 0; j < reservations.length; j++) {
    const div = document.querySelector('[data-seat="' + reservations[j].siege + '"]');
    div.classList.remove("bg-blue-800");
    div.classList.add("bg-violet-300");

    let numero = reservations[j].siege;
    if (numero < 10) {
      numero = "0" + numero;
    }
    div.innerHTML = "<b>" + numero + "</b><br>" + reservations[j].nom;
  }

  const occupes = reservations.length;

  document.getElementById("libres").textContent = 20 - occupes;
  document.getElementById("occupes").textContent = occupes;
  document.getElementById("chiffre").textContent = occupes * prix_siege;
  enregister();
  remplirliste();
}


// Partie réservation//
formulaire1.addEventListener("submit", function (event) {
  event.preventDefault();

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
    if (reservations[i].nom.toLowerCase() === nomPassager.toLowerCase()) {
      alert("Ce nom existe déjà.");
      return;
    }
  }

  reservations.push({
    siege: numero,
    nom: nomPassager
  });
  
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
    if (reservations[i].nom === nomChoisi) {
      reservations.splice(i, 1);
    }
  }

  afficher();
  alert("Réservation annulée !");
  formAnnuler.reset();
});


afficher();


formModifier.addEventListener("submit", function (event) {
  event.preventDefault();

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
    if (reservations[i].nom.toLowerCase() === ancienNom.toLowerCase()) {
      if(nomNouveau !==""){
        reservations[i].nom = nomNouveau;
      }
    if(numero!== 0){
      reservations[i].siege=numero;
    }

  }
 
}
afficher()
alert("Modification réussie !")
formModifier.reset()
})
afficher();