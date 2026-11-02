export function placeLibres(trip){
    return trip.capacity-trip.reservation.length;
}

export function estcomplet(trip){
    return placeLibres(trip)===0;
}