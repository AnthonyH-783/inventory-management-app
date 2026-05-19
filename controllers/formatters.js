const {intlFormatDistance} = require("date-fns");

exports.formatPrice = (stockPrice) => {
    const params = { style: "currency", currency: "CAD", notation: "compact", currencyDisplay: 'narrowSymbol' };
    const formater = new Intl.NumberFormat("en-CA", params);
    if(!stockPrice) return formater.format(0);
    return formater.format(stockPrice);
}

exports.formatLastUpdated = (date) =>{
    if(!date) return;
    const formatted = intlFormatDistance(date, new Date());
    return formatted;
}

exports.formatTableRows = (items) => {
    items.forEach((item) => {
        console.log(item);
        item.price = this.formatPrice(parseInt(item.price));
        item.updated_at = this.formatLastUpdated(item.updated_at); 
    })
}