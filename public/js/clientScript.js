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

    


    navItems.forEach((navItem) => {
        navItem.addEventListener("click", onNavItemSelect);
    });
    window.addEventListener("load", async () => {
        const items = await loadItems();
        populateTable(table_body, items);
    });

    select.addEventListener("change", async () => {
        const items = await loadItems(select.value);
        populateTable(table_body, items);
    });

    filter_btn.addEventListener("click", onLowStockBtnClick);

})();

