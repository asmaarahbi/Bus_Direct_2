export function creationCarte(trajet) {
    return`
    <article class ="rounded-lg bg-white p-4">
    <h2 class= "text-xl font-bold">${trajet.departure}-${trajet.destination}</h2>
    <p> Départ : ${trajet.departureTime}</p>
    <p> Arrivee : ${trajet.arrivalTime}</p>
    <p> prix : ${trajet.price}DH</p>
    <button class="btn_reserver w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-900" data-id = "${trajet.id}">Réserver </button>
    
    `
    
}