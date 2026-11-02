import {init} from "./store.js"
import { creationCarte } from "./render.js"
import { estcomplet } from "./reservations.js";

const listes = document.querySelector("#listeTrajets")
const pagination = document.querySelector("#pagination")
const champRecherche = document.querySelector("#recherche")

let trajet=[];
let resultats=[];
let page = 1;
const champStatut=document.querySelector("#statut")

function filtrer(){
let texte= champRecherche.value.toLocaleLowerCase();
let statut=champStatut.value;
let resultats=[];
let trajets=[];
for(let i =0 ;i < trajets.length;i++){
let trip = trajets[i]
let trouville = false
    if(trip.departure.toLocaleLowerCase().includes(texte)){
        trouville=true;
        }
    if (trip.destination.toLocaleLowerCase().includes(texte)){
        trouville=true;
    } 
    let statutok=true;
    if(statut==="complet"&& estcomplet(trip)===false){
        statutok=false
    }
    if(statut==="disponible"&& estcomplet(trip)===true){
        statutok=false;
    }
    if (trouville===true && statutok===true){
        resultats.push(trip);
    }

}
page = 1 ;
affichierCartes()
affichierBoutton()
}


function affichierCartes(){
    listes.innerHTML="";
    if(resultats.length===0){
    listes.innerHTML="<p> Aucun trajet ne correspond</p>"
    return
    }

    let debut = (page-1)*6;
    let fin = debut + 6;
    let index = resultats.slice(debut,fin);
    
 for(let i =0 ; i<index.length; i++){
    listes.innerHTML+=creationCarte(index[i])
 }

}

function affichierBoutton(){
    let nombrePages = Math.ceil(resultats.length/6);
    pagination.innerHTML="";
    for( let i = 1 ; i<=nombrePages;i++) {
        let classe = "";
         if ( i === page){
            classe = "active"
         }
        pagination.innerHTML+= `<button class="${classe}" data-page="${i}" >${i}</button>`;
    }

}

champRecherche.addEventListener("input",filtrer);
champStatut.addEventListener("change",filtrer);
pagination.addEventListener("click",function(e){
    if(e.target.tagName==="BUTTON"){
        page.Number(e.target.dataset.page)
        affichierCartes()
        affichierBoutton()
    }

});
async function affichierTrajets() {
    trajet=await init();
    let totalPassagers= 0 ;
    let recette = 0;
    for(let i=0;i<trajet.length;i++){
        totalPassagers+=trajet[i].reservations.length;
         recette+= trajet[i].reservations.length*trajet.price;
    }
    document.querySelector("#totalPassagers").textContent=totalPassagers;
    document.querySelector("#recetteReseau").textContent=recette+"DH";
filtrer()      
}