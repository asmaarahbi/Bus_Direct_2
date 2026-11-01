export function creationCarte(trajet) {
    return`
    <article>
    <div class ="carte_trajet">
    <h2>${trajet.departure}-${trajet.destination}</h2>
    <p> Départ : ${trajet.departureTime}</p>
    <p> Arrivee : ${trajet.arrivalTime}</p>
    <p> prix : ${trajet.price}DH</p>
    <button id="btn_reserver" data-id = "${trajet.id}">Réserver </button>
    </div>
    </article>
    `
}
