import { estVIP,prixSiege } from "./reservations.js";

const prix_siege = 80;

const formulaire1 = document.getElementById("formulaire1");
const namepassager = document.getElementById("nomReserver");
const seatSelect = document.getElementById("siegeReserver");

const formAnnuler = document.getElementById("formAnnuler");
const passagerAnnuler = document.getElementById("passagerAnnuler");
const passagerModifier =document.getElementById("passagerModifier");
const siegeModifier = document.getElementById("siegeModifier");

let reservations = [];
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
    let div = document.querySelector('[data-seat="' + i + '"]');
    if (!div) continue ; 
    const vip = estVIP(i);
    div.className="siege p-3 rounded-xl text-center font-bold text-xs flex flex-col justify-center items-center shadow border";
    if (vip){
      div.classList.add("bg-yellow-600",text-black);
    }else{
      div.classList.add("bg-blue-800",text-white);
    }
    let numero = i < 10 ? "0"+ i : i ;
    }
    div.innerHTML =`"<b>${ numero}</b>${vip ?'<span class="bg-yellow-300 text-yellow-900 px-1 rounded text-[9px] ml-1">VIP</span>' : ''}<br>Libre`;
  }

  for (let j = 0; j < reservations.length; j++) {
    let siegeNum = reservations[j].siege;
    let div = document.querySelector('[data-seat="' + siegeNum + '"]');
    if(!div) continue;
    const vip = estVIP(siegeNum)
   div.className = "p-3 rounded-xl text-center font-bold text-xs flex flex-col justify-center items-center shadow border bg-purple-600 text-white";
    let numero =siegeNum<10 ? "0" + siegeNum : siegeNum;
    
    div.innerHTML = `"<b>${ numero}</b>${estVIP ?'<span class="bg-yellow-300 text-yellow-900 px-1 rounded text-[9px] ml-1">VIP</span>' : ''}<br>Libre`+ reservations[j].nom;
  

  const occupes = reservations.length;

  document.getElementById("libres").textContent = 20 - occupes;
  document.getElementById("occupes").textContent = occupes;
  
  const chiffreAffaires = reservations.reduce((total,r)=>{
    return total + prixSiege(prix_siege,Number(r.siege))},0);
  
  document.getElementById("chiffre").textContent = chiffreAffaires;
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

  enregister();
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
enregister();
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
 
 enregister()
 afficher() 



alert("Modification réussie !")
formModifier.reset()
})

getItem();
afficher();