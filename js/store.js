export async function init() {
    const reponse = await fetch("../data/trips.json");
    const trajets = await reponse.json();
     localStorage.setItem("trips",JSON.stringify(trajets))
     return trajets;
    
}