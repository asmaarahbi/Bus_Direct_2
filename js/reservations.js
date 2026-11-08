export function placeLibres(trip){

const reservationsCount=trip.reservations ?trip.reservations.length : 0;
    return trip.capacity-reservationsCount;
}

export function estcomplet(trip){
    return placeLibres(trip)<=0 ;
 }

 export function estVIP (numero){
    const num = Number(numero);
    return num>=1 && num<= 4;

 }


 export function prixSiege (prixDeBase,numero){
    if (estVIP(numero)){
        return Math.round(prixDeBase*1.1);

    }
    return prixDeBase;
 }