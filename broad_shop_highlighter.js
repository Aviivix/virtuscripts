// ==UserScript==
// @name         VirtuScripts - Broad Shop Highlighter
// @version      1.0
// @description  Highlights shop items that match search terms.
// @author       Aviivix
// @match        https://virtu.pet/viewshop/*
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    // Unlike the more straightforward version, this one allows you to include generic terms.
    // If you're restocking Kauvara's, you could stick terms like "Plushie", "Faerie", "Draik", etc.
    // Your list of terms goes in here. Each one must be in "double quotes" and be comma separated.
    // This is cAsE sEnSiTiVe. (It doesn't have to be, but I'm tired.)
    // Make sure the last item does not have a comma after it.
    var targeted_terms = ["Faerie", "Darigan ", "Baby", "Maraquan", "Plushie", "Grey", "Hissi", "Draik", "Lutari", "Krawk", "Cybunny", "Poogle"];
    // This is for if you want to ONLY target items with a specific phrase in them.
    // You could require "Magical" while restocking plushies/chia pops, or "Morphing" while restocking Kauvara.
    var required_term = "Morphing"
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
        // We're going to have to check the item against every targeted term.
        for (let y = 0; y < targeted_terms.length; y++) {
            // Check if the item name includes the term we're currently checking.
            if (name.includes(targeted_terms[y])) {
                // If so, we can just highlight immediately if the user didn't set a required term.
                if (required_term == "" ) {
                    items[x].style.backgroundColor = highlight_color;
                // Otherwise we only set it if the name also has the required term in it.
                } else if (name.includes(required_term)) {
                    items[x].style.backgroundColor = highlight_color;
                }
            }
        }
        // If the item is not one of our targeted items, then we just ignore it entirely.
        // After all that is said and done, we can move onto the next item.
    }
    // After we go through every item, all our targeted items will be highlighted. Huzzah!
})();
