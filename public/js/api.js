export async function loadItems(category = "all"){
    try{
        const url = `/api/${category}`;
        const res = await fetch(url);
        if(!res.ok) throw new Error("Failed to fetch data");
        const items = await res.json();
        return items;
    }
    catch(err){
        console.log(err);
    }
}

export async function loadLowStockItems(){
    try{
        const url = `/api/lowStock`;
        const res = await fetch(url);
        if(!res.ok) throw new Error("Failed to fetch data");
        const items = await res.json();
        return items;
    }
    catch(err){
        console.log(err);
    }
}