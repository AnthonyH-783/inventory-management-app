import { loadItems, loadLowStockItems } from "./api.js";
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
        //row.classList.add("row");
        row.innerHTML = `
    
        <td>
            <div class="item-name-wrapper">
                <img src="${item.image_url}" alt="">
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

        <td class="more-options"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            <div data-item_id="${item.id}" class="dropdown hidden card-template dm-sans-400">
                <div class="card-title">
                    <span class="dropdown-title">ACTIONS</span>
                </div>
                <ul class="dropdown-body">

                    <li class="svg-title-wrapper">
                        <form action="/items/${item.id}" method="GET">
                            <button type="submit" class="dropdown-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a6fd4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                <span>View details</span>
                            </button>
                        </form>
                    </li>

                    <li class="svg-title-wrapper">
                        <form action="/items/${item.id}/edit" method="GET">
                            <button type="submit" class="dropdown-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                                <span>Update</span>
                            </button>
                        </form>
                    </li>

                    <li class=" svg-title-wrapper gray-border-top">
                        <form action="/items/${item.id}/delete" method="POST">
                            <button type="submit" class="dropdown-btn dropdown-delete">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d63b3b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                <span>Delete</span>
                            </button>
                        </form>
                    </li>

                </ul>
            </div>
        </td>
    

        `

        tbody.appendChild(row);
    });
}

async function onLowStockBtnClick(e){
    // Finding needed dom elements
    const btn = e.target.closest(".filter-btn");
    if(!btn) return;
    const table_body = btn.closest("#dashboard").querySelector("tbody");
    const category = btn.closest("#dashboard").querySelector("select").value;

    btn.classList.toggle("success"); // Toggling button active value
    if(btn.classList.contains("success")){
        // Filtering based on stock quantity
        const items = await loadLowStockItems();
        populateTable(table_body, items);
    }
    else{
        // Removing quantity filter
        const items = await loadItems(category);
        populateTable(table_body, items);
    }

}

function stockInputChangeHandler(e){

        const container = e.target.closest(".price-stock");
        if(!container) return;
        const qtyInput = container.querySelector("#quantity");
        const thresholdInput = container.querySelector("#threshold");
        const pills = container.querySelector("#pill-selection");

       
        const quantity = Number(qtyInput.value);
        const threshold = Number(thresholdInput.value);

        if(quantity !== "" && threshold !== ""){
             let index;
        if(quantity === 0){
            index = 2; // danger
        } else if(quantity <= threshold){
            index = 1; // warning
        } else {
            index = 0; // success
}
            console.log(index);
            selectStockBtn(pills, index);

        }
    };

function selectStockBtn(pills, index){
    // Unselect previous one
    const prev = pills.querySelector(".selected");
    const map = {0: ".success", 1: ".warning", 2: ".danger"};
    if(prev){
        prev.style.borderWidth = "1px";
        prev.classList.remove("selected");
        prev.style.fontWeight = 400;
    
    }

    // Selecting new pill
    const pill = pills.querySelector(map[index]);
    pill.classList.add("selected");
    pill.style.borderWidth = "2px";
    pill.style.fontWeight = 600;
    

    }

    function onMoreOptionsClick(e){
        const target = e.target;
        const node = target.closest(".more-options");
        if(!node) return;
        node.querySelector(".dropdown").classList.toggle("hidden");
    }

    function onDropdownOptionSelection(e){
        const target = e.target;
        const node = target.closest(".dropdown");
        if(!node) return;
        console.log(node.dataset.item_id);
    }



export {onNavItemSelect, populateTable, onLowStockBtnClick,
     stockInputChangeHandler, selectStockBtn, onMoreOptionsClick,
      onDropdownOptionSelection};


