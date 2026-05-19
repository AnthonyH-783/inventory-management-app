import { onNavItemSelect, populateTable, onLowStockBtnClick } from "./handlers.js";
import { loadItems, loadLowStockItems } from "./api.js";


(function ScreenController(){
    const nav = document.querySelector("nav");
    const navList = nav.querySelector(".nav-items");
    const navItems = Array.from(navList.children);
    const table = document.getElementById("inventory-table");
    const table_body = table.querySelector("tbody");
    const select = document.querySelector("select");
    const filter_btn = document.querySelector(".filter-btn");

    const filters = {
        category: 'all',
        lowStock: false
    };

    


    navItems.forEach((navItem) => {
        navItem.addEventListener("click", onNavItemSelect);
    });
    window.addEventListener("load", async () => {
        const items = await loadItems(filters);
        populateTable(table_body, items);
    });

    select.addEventListener("change", async () => {
        filters.category = select.value;
        const items = await loadItems(filters);
        populateTable(table_body, items);
    });

    filter_btn.addEventListener("click", async(e) => {
        filters.lowStock = !filters.lowStock;
        filter_btn.classList.toggle("success");
        const items = await loadItems(filters);
        populateTable(table_body, items);
    });

})();

