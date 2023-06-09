// ==UserScript==
// @name         VirtuScripts - Simple Shop Highlighter
// @version      1.0
// @description  Highlights shop items that are in your list of desired items.
// @author       Aviivix
// @match        https://virtu.pet/viewshop/*
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    // Your list of items goes in here. Each one must be in "double quotes" and be comma separated.
    // This is cAsE sEnSiTiVe. (It doesn't have to be, but I'm tired.)
    // Make sure the last item does not have a comma after it, and make sure there are no extra spaces at the start or end of item names!
    var targeted_items = ["Item One", "Item Two ", "Item Three"];
    // Your preferred highlight color goes here, as a hex code inside 'single quotes'. By default, it's '#63ffff', or light cyan.
    var highlight_color = '#63ffff'
    // This is where it fetches the list of items in the shop.
    // Each item is an element with the class "shop-grid-item", so it just fetches all of those.
    // This allows us to point to the actual container to change the background color of it.
    var items = document.getElementsByClassName("shop-grid-item");
    // Now we need the item text...
    // The "item-name" class is only used by the shop grids, we just do the same exact thing with the "item-name" class.
    // It will always be in the same order, because there is one "item-name" inside every "shop-grid-item".
    var names = document.getElementsByClassName("item-name");
    // Now we go through all the items to check them each.
    // The "x" variable will keep our place in the list.
    for (let x = 0; x < items.length; x++) {
        // The "item name" is actually an element that contains the HTML for the name, stock, and cost.
        // This grabs the text part of the item name, separating it from the other HTML.
        // The "children" are just every other HTML tag inside it.
        // The first one (or, 0th one since code counts from zero) is the "b" tag for the bold item name! That's what we want.
        // So we grab the Xth element from our names, get the first child, then get the "textContent" of that, which is just the text itself.
        // In the end, our name variable is JUST the text name, like "Faerie Pteri Plushie" or "Maraquan Techo Morphing Potion".
        let name = names[x].children[0].textContent
        // Now we simply check if the "targeted items" list contains the item we're checking.
        if (targeted_items.includes(name)) {
            // If it does, then that means it's an item we're searching for, so we highlight it.
            // Remember how the "shop-grid-item" elements and "item-name" elements are in the same order?
            // That's convenient here, as we can just use the same "x" variable to get the "shop-grid-item" box the item is in.
            // Then we simply set the backgroundColor style to whatever the preferred highlight color is.
            items[x].style.backgroundColor = highlight_color;
            // Now this item is highlighted!
        }
        // If the item is not one of our targeted items, then we just ignore it entirely.
        // After all that is said and done, we can move onto the next item.
    }
    // After we go through every item, all our targeted items will be highlighted. Huzzah!
})();
