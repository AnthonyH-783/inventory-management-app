import { onNavItemSelect } from "./handlers.js";

(function ScreenController(){
    const nav = document.querySelector("nav");
    const navList = nav.querySelector(".nav-items");
    const navItems = Array.from(navList.children);
    console.log(navItems);


    navItems.forEach((navItem) => {
        navItem.addEventListener("click", onNavItemSelect);
    })

})();