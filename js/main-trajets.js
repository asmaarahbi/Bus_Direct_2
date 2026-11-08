import {initialiser} from "./store.js"
import { renderTrips,handleFiltrer} from "./render.js"

function calculerEtAffichierStats(tripsData){
    let totalPassagers=0
    let recette=0
    tripsData.forEach((trip) => {
        totalPassagers+=trip.reservations.length;
        recette+=trip.reservations.length*trip.price;

        
    });
    const passagersElem = document.getElementById("totalPassagers");
    const recetteElem = document.getElementById("recetteReseau");
    if(passagersElem) passagersElem.textContent=totalPassagers;
    if(recetteElem) recetteElem.textContent= recette + "DH";
}

async function demarrer() {
    const tripsData = await initialiser();
    
    calculerEtAffichierStats(tripsData);
    renderTrips(tripsData, 1, 6);

    const rechercheInput = document.getElementById("recherche");
    const statutSelect = document.getElementById("statut");

    if (rechercheInput) {
        rechercheInput.addEventListener("input", handleFiltrer);
    }
    if (statutSelect) {
        statutSelect.addEventListener("change", handleFiltrer);
    }
}

demarrer();


