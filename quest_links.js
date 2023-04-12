// ==UserScript==
// @name         VirtuScripts - Quest Item Links
// @version      1.0
// @description  Converts Taelia and Esophagor's initial item requests into SDB links for easy fetching.
// @author       Aviivix
// @match        https://virtu.pet/winter/snowfaerie
// @match https://virtu.pet/hauntedwoods/esophagor
// @run-at document-idle
// ==/UserScript==

(function() {
    'use strict';
    // Finds the items on the page...
    var items = document.getElementsByClassName("inventory-item");
    for (let x = 0; x < items.length; x++) {
        // Url needs to replace spaces with +
        var name = items[x].children[2].textContent.toLowerCase().replace(/\s/g, "+")
        // crudely assemble the url string
        var url = "https://virtu.pet/safetydeposit/?page=1&type=name&query=" + name + "&category="
        // add the link
        items[x].children[0].href = url
    }
})();
