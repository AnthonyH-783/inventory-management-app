export async function loadItems0(category = "all"){
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
export async function loadItems({category, lowStock}){
    const params = new URLSearchParams();
    if(category && category !== 'all') params.append('category', category);
    if(lowStock) params.append('lowStock', true);
    const res = await fetch(`/api/items?${params}`);
    return res.json();
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