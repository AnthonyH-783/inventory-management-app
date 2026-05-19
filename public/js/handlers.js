
function onNavItemSelect(e){
    const listItem = e.target.closest("li");
    if (!listItem ||
        listItem.tagName.toLowerCase() !== "li" ||
        listItem.classList.contains("selected-item")) return;
        
    toggleNavHighlight(listItem);


}

function toggleNavHighlight(listItem){
    // Undoing previous selection
    const prev = listItem.closest("ul").querySelector(".selected-item");
    if(prev){
        prev.classList.remove("selected-item");
        prev.querySelector("svg").setAttribute("stroke", "#373737");
        prev.querySelector("span").classList.replace("dm-sans-500", "dm-sans-400");
    }
    // Applying selection styling to new item
    listItem.classList.add("selected-item");
    const svg = listItem.querySelector("svg");
    const text = listItem.querySelector("span");
    svg.setAttribute("stroke", "#27500A");
    text.classList.replace("dm-sans-400", "dm-sans-500");
}

function populateTable(tbody, items){

    tbody.innerHTML = "";
    items.forEach(item => {
        const variant = (item.quantity > item.threshold) ? "success" :
                        (item.quantity === 0) ? "danger" : "warning";
        const text = {"success": "In stock", "warning": "Low stock", "danger": "Out of stock"};
                    
        const row = document.createElement("tr");
        row.classList.add("row");
        row.innerHTML = `
        <td>
            <div class="svg-title-wrapper">
                <img src=${item.image_url} alt="">
                <span class="dm-sans-400">${item.name}</span>
            </div>
        </td>
        <td class="dm-sans-400">${item.sku}</td>
        <td class="dm-sans-400">${item.quantity}</td>
        <td class="dm-sans-400">${item.price}</td>
        <td class="dm-sans-500">
            <div class="status-pill ${variant}">
                <span>${text[variant]}</span>
            </div>
        </td>
        <td class="dm-sans-400">
        ${(item.updated_at)}
        </td>
        <td><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></td>

        `

        tbody.appendChild(row);
    });
    

}




export {onNavItemSelect, populateTable};


