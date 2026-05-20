
const { totalCount } = require("../db/pool");
const {getItemCount,
       getCategoryCount,
       getInStockItemsCount,
       getLowStockItemsCount,
       getOutOfStockItemsCount,
       getInventoryValue,
       getItemsByCategory } = require("../db/queries");

const {formatInventoryPrice, formatPercentage} = require("./formatters");



exports.getDashboardStats = async (req, res) => {
    const [itemCount, categoryCount, inStock, lowStock, outOfStock, stockValue] = await Promise.all([
        getItemCount(),
        getCategoryCount(),
        getInStockItemsCount(),
        getLowStockItemsCount(),
        getOutOfStockItemsCount(),
        getInventoryValue()
    ]);

    const cards = [
        {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box-icon lucide-box"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
            title: "Total items",
            value: itemCount,
            subtitle: `${categoryCount} categories`,
            variant: "default"
        },
        {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
            title: "In stock",
            value: inStock,
            subtitle: `${formatPercentage(inStock, itemCount)} of items`,
            variant: "default"
        },
        {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
            title: "Low stock",
            value: lowStock,
            subtitle: "needs reorder",
            variant: "warning"
        },
        {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`,
            title: "Out of Stock",
            value: outOfStock,
            subtitle: "Urgent",
            variant: "danger"
        },
        {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign-icon lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
            title: "Stock value",
            value: formatInventoryPrice(stockValue),
            subtitle: "Entire inventory",
            variant: "default"
        }
    ]
    
    res.render("index", {itemCount, categoryCount, inStock, lowStock, outOfStock, stockValue, cards});

}




