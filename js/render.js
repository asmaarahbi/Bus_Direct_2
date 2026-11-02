import { placeLibres } from "./reservations";

export function creationCarte(trip) {
    return`
    <article class="carte">
    <h2>${trajet.departure}-${trajet.destination}</h2>
    <p> Départ : ${trajet.departureTime}</p>
    <p> Arrivee : ${trajet.arrivalTime}</p>
    <p> prix : ${trajet.price}DH</p>
    <p> Places libres :${placeLibres(trip)}</p>
    <p> En attente : ${trip.waitngList.length}</p>
    <a class="btn_reserver" href="cabine.html?id=${id}<button id="btn_reserver" data-id = "${trajet.id}">Réserver </button></a>
    </article>
    `
}
