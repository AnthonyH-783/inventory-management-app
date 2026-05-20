console.log("file loaded");
import {stockInputChangeHandler} from "./handlers.js";
console.log("file imported");

(function FormController(){

    const qtyInput = document.getElementById("quantity");
    const thresholdInput = document.getElementById("threshold");

    qtyInput.addEventListener("change", stockInputChangeHandler);
    thresholdInput.addEventListener("change", stockInputChangeHandler);

})();