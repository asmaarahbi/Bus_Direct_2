import {init} from "./store.js"
import { creationCarte } from "./render.js"
async function affichierTrajets() { 
    const trajets = await init();
    const listes=document.querySelector("#listeTrajets")
    listes.innerHTML="";
    for(let i =0 ;i<trajets.length;i++){
        listes.innerHTML+=creationCarte(trajets[i]);
    }
}
affichierTrajets(); 
