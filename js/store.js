
export let trips=[];
export async function initialiser() {
    const localData= localStorage.getItem("trips")
    if (localData){
        trips=JSON.parse(localData);

    }
    else{
    const reponse = await fetch("./data/trips.json");
    const trips= await reponse.json();
    localStorage.setItem("trips",JSON.stringify(trips))
    }
     return trips;
    
}