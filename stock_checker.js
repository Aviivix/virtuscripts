// ==UserScript==
// @name         VirtuScripts - Stock Checker
// @version      1.0
// @description  Adds a blurb to your shop stock page telling you which items are out of stock.
// @author       Aviivix
// @match        https://virtu.pet/market
// @match        https://virtu.pet/market/
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    // This is the list of items you want to keep in stock. Case sensitive.
    var valid_items = ["Blueberry Faerie Bubble", "Cheese Flower Cracker", "Crazy Crisp Taco"];
    // This is the number you want to keep each of those items at.
    var ideal_stock = 2
    // TODO: Make a dict version of this so users can set custom ideal stocks for each item.
    // whoops my python is showing
    // I track the low stock items as just a string because they're all gonna be converted to a string anyway lol.
    var message = ""
    // This fetches the contents of the shop table.
    var shoptable = document.getElementsByClassName("table-auto striped-table my-3")[0].children[1];
    var in_stock = {}
    // Going through each shop item...
    for (let x = 0; x < shoptable.children.length; x++ ) {
        // This is a temporary text variable...
        let itxt = shoptable.children[x].children[1].innerText
        // This is the item name itself.
        let name = itxt.substring(0, itxt.indexOf("\n"))
        // This is the number of that item that are in stock.
        let stock = parseInt(shoptable.children[x].children[3].innerText)
        // Only check if the item is one of the items you want to keep in stock.
        if ( valid_items.includes(name)) {
            // Pushes the info into the list of target items in stock.
            in_stock[name] = stock
        }
    }
    // Go through each item in alphabetical order.
    for (let x = 0; x < valid_items.length; x++) {
        let name = valid_items[x]
        let urlname = name.toLowerCase().replace(/\s/g, "+")
        let url = `https://virtu.pet/safetydeposit/?page=1&type=name&query=${urlname}&category=`
        let needed_stock = ideal_stock
        // Check how much is needed
        if ( in_stock.hasOwnProperty(name)) {
            if (in_stock[name] < ideal_stock) {
                needed_stock = ideal_stock - in_stock[name]
            } else {
                needed_stock = 0
            }
        }
        if (needed_stock != 0) {
            message += `${needed_stock} ${name} (<a href="${url}">SDB</a>)<br>`
        }
    }
    // This replaces the "your shop is not a gallery" notice because why is that still even there?
    var descrip = document.getElementsByClassName("content")[0].children[6].children[6];
    if ( message == "" ) {
        descrip.innerHTML = "<b>Your shop is fully stocked, yay!</b>"
    } else {
        // Cuts off the last <br>
        descrip.innerHTML = `<b>The following items are out of stock:</b><br>${message}`
    }
})();
