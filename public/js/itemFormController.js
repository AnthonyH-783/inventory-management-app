console.log("file loaded");
import {stockInputChangeHandler} from "./handlers.js";
console.log("file imported");

(function FormController(){

    const pills = Array.from(document.getElementById("pill-selection"));
    const qtyInput = document.getElementById("quantity");
    const thresholdInput = document.getElementById("threshold");
    const priceStock = document.querySelector(".price-stock");

console.log(pills, qtyInput, thresholdInput, priceStock);
    qtyInput.addEventListener("change", stockInputChangeHandler);
    thresholdInput.addEventListener("change", stockInputChangeHandler);

})();