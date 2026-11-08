
export let trips=[];
export async function initialiser() {
    const donneeLocale= localStorage.getItem("trips")
    if (donneeLocale){
        trips=JSON.parse(donneeLocale);

    }
    else{
    const reponse = await fetch("./data/trips.json");
    const trips= await reponse.json();
    localStorage.setItem("trips",JSON.stringify(trips))
    }
     return trips;
    
}
export function sauvegarder(){
    localStorage.setItem("trips",JSON.stringify(trips));
}