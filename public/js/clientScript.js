import { onNavItemSelect, populateTable } from "./handlers.js";
import { loadItems } from "./api.js";

(function ScreenController(){
    const nav = document.querySelector("nav");
    const navList = nav.querySelector(".nav-items");
    const navItems = Array.from(navList.children);
    const table = document.getElementById("inventory-table");
    const table_body = table.querySelector("tbody");
  
    


    navItems.forEach((navItem) => {
        navItem.addEventListener("click", onNavItemSelect);
    });
    window.addEventListener("load", async () => {

        const items = await loadItems();
        console.log(items);
        populateTable(table_body, items);
        

    });

})();