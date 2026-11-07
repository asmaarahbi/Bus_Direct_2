import {trips} from "./store.js"
import { estcomplet, placeLibres } from "./reservations.js"
 
export function renderTrips(modifierTrips,page,size){
    const conteneurListe= document.getElementById("listeTrajets")
    const paginationHTML= document.getElementById("pagination")
    if(!conteneurListe) return ;

    conteneurListe.innerHTML="";
    const safeTrips=modifierTrips || [];
    if(safeTrips.length===0){
        conteneurListe.innerHTML=`<div class="col-span-full bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200>
        <p class = " text-base font-bold text-gray-700">Aucun resultat trouvé </p>
        <p class= "text-sm text-gray-500 mt-1>Aucun trajet ne correspond a votre recherche </p>
        </div>`;
        if(paginationHTML) paginationHTML.innerHTML="";
        return;
    }

    const startIndex=(page -1)*size;
    const endIndex= startIndex+size;
    const selectedTrips = safeTrips.slice(startIndex,endIndex)
    selectedTrips.forEach((trip)=> {
        const isComplet =estcomplet(trip);
        const card =document.createElement("article");
        card.className="bg-white rounded -xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between"
        card.innerHTML= ` 
        <div>
        <div class="flex justify-between items center mb-4">
        <h2 class="text-lg-font-bold  text-gray-800">${trip.departure} → ${trip.destination}</h2>
                    <span class="px-3 py-1 text-xs font-bold rounded-full ${isComplet ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}">
                        ${isComplet ? "Complet" : "Disponible"}
                    </span>
                </div>
                
                <div class="space-y-2 text-sm text-gray-600 mb-6">
                    <p><strong>Départ : </strong> ${trip.departureTime}</p>
                    <p><strong>Arrivée : </strong> ${trip.arrivalTime}</p>
                    <p><strong>Places libres : </strong> ${placeLibres(trip)} / ${trip.capacity}</p>
                    <p><strong>En attente : </strong> ${trip.waitingList.length}</p>
                </div>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <span class="text-xl font-bold text-blue-600">${trip.price} DH</span>
                <a href="cabine.html?id=${trip.id}" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                    Réserver
                </a>
            </div>`;
            conteneurListe.appendChild(card);

    })
renderPagination(safeTrips,page,size) 
}
export function handleFiltrer() {
  const searchVille = document.getElementById("recherche");
  const statutSelector = document.getElementById("statut");   
  const city = searchVille ? searchVille.value.toLowerCase().trim() : "";
  const statut = statutSelector ? statutSelector.value : "tous";

  const filtrerTrips = trips.filter((trip) => {
    const departure = trip.departure.toLowerCase();
    const destination = trip.destination.toLowerCase();   
    const matchCity = departure.includes(city) || destination.includes(city);

    const complet = estcomplet(trip);
    let matchStatut = true;                               
    if (statut === "disponible") matchStatut = !complet; 
    if (statut === "complet") matchStatut = complet;

    return matchCity && matchStatut;
  });

  renderTrips(filtrerTrips, 1, 6);
}

 export function renderPagination(modifierTrips,courantPage,pageSize){
    const paginationHTML = document.getElementById("pagination")
    if(!paginationHTML) return;

    paginationHTML.innerHTML=""
    const totalPages=Math.ceil(modifierTrips.length/pageSize)
    if(totalPages <= 1) return;
    if (courantPage>1){
        const prevBtn =document.createElement("button")
        prevBtn.innerText="<";
        prevBtn.className = "px-3 py-1.5 rounded-lg border bg-white text-gray-700 hover: bg-gray-100 font-semibold"
        prevBtn.addEventListener("click",()=> renderTrips(modifierTrips,courantPage -1,pageSize))
        paginationHTML.appendChild(prevBtn);
    }

    for(let i = 1; i <= totalPages;i++){
        const btn = document.createElement("button")
        btn.innerText= i ;
        btn.className = i === courantPage
        ? " px-4 py-2 rounded-lg bg-blue-600 text-white text-white font-bold"
        : "px-4 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-100";
        const pageNum = i;
        btn.addEventListener("click",()=>renderTrips(modifierTrips,pageNum,pageSize))
        paginationHTML.appendChild(btn);
    }

    if(courantPage < totalPages){
        const nextBtn = document.createElement("button")
        nextBtn.innerHTML=">"
        nextBtn.className="px-3 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 font-semibold"
        nextBtn.addEventListener("click",()=>renderTrips(modifierTrips, courantPage +1 , pageSize))
        paginationHTML.appendChild(nextBtn);
    }
 }


