export function placeLibres(trip){

const reservationsCount=trip.reservations ?trip.reservations.length : 0;
    return trip.capacity-reservationsCount;
}

export function estcomplet(trip){
    return placeLibres(trip)<=0 ;
 }