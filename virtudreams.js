// ==UserScript==
// @name         VirtuDreams
// @version      0.1
// @description  The VirtuPets Dream Database!
// @author       Aviivix
// @match        https://virtu.pet/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=virtu.pet
// @grant GM_xmlhttpRequest
// @connect virtudreams-default-rtdb.firebaseio.com
// @connect console.firebase.google.com
// ==/UserScript==

// Fetch Username
var user = document.getElementsByClassName("username sf")[0].textContent

// Database Ping
var items
var users
var shops = [{"name": "Fresh Foods", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/4353.gif"}, {"name": "Kauvara's Magic Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/14998.gif"}, {"name": "Toy Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/2944.gif"}, {"name": "Uni's Clothing Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/8494.gif"}, {"name": "Grooming Parlour", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/8721.gif"}, {"name": "", "ic": ""}, {"name": "Magical Bookshop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/11262.gif"}, {"name": "Wizards Trading Card Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/items/trading_card/malevolent_sentient_poogle_plushie__tcg_.gif"}, {"name": "Battle Magic", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/8966.gif"}, {"name": "Defence Magic", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/7286.gif"}, {"name": "", "ic": ""}, {"name": "Neopian Garden Centre", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/34038.gif"}, {"name": "Neopian Pharmacy", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/1405.gif"}, {"name": "Chocolate Factory", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/353.gif"}, {"name": "Bakery", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/27228.gif"}, {"name": "Health Foods", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/491.gif"}, {"name": "Neopian Gift Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/887.gif"}, {"name": "Smoothie Store", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/367.gif"}, {"name": "", "ic": ""}, {"name": "Tropical Food", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/19609.gif"}, {"name": "Tiki Tack", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/items/island_merchandise/tombola_keyring.gif"}, {"name": "Grundos Cafe", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/18817.gif"}, {"name": "Space Weaponry", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/10765.gif"}, {"name": "Space Armour", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/5661.gif"}, {"name": "Neopian Petpet Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/424.gif"}, {"name": "Robo-Petpet Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/3748.gif"}, {"name": "The Rock Pool", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/3514.gif"}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "Spooky Food", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/19679.gif"}, {"name": "Spooky Petpets", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/212.gif"}, {"name": "The Apothecary", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/items/mystic_mushroom/ugly_mushroom.gif"}, {"name": "", "ic": ""}, {"name": "The Coffee Cove", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/20059.gif"}, {"name": "Slushie Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/22728.gif"}, {"name": "Ice Crystal Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/316.gif"}, {"name": "Super Happy Icy Fun Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/18566.gif"}, {"name": "Faerieland Bookshop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/3698.gif"}, {"name": "Faerie Foods", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/573.gif"}, {"name": "Faerieland Petpets", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/19000.gif"}, {"name": "Neopian Furniture", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/18416.gif"}, {"name": "Tyrannian Foods", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/3569.gif"}, {"name": "Tyrannian Furniture", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/24123.gif"}, {"name": "Tyrannian Petpets", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/15605.gif"}, {"name": "Tyrannian Weaponry", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/21410.gif"}, {"name": "Hubert's Hot Dogs", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/22843.gif"}, {"name": "Pizzaroo", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/5300.gif"}, {"name": "Usukiland", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/2782.gif"}, {"name": "Lost Desert Foods", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/653.gif"}, {"name": "Peopatra's Petpets", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/13969.gif"}, {"name": "Sutek's Scrolls", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/4643.gif"}, {"name": "", "ic": ""}, {"name": "Neopian School Supplies", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/26953.gif"}, {"name": "Sakhmet Battle Supplies", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/610.gif"}, {"name": "Osiri's Pottery", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/33582.gif"}, {"name": "Merifoods", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/9929.gif"}, {"name": "Ye Olde Petpets", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/13356.gif"}, {"name": "Neopian Post Office", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/9233.gif"}, {"name": "Haunted Weaponry", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/9263.gif"}, {"name": "Spooky Furniture", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/2680.gif"}, {"name": "Wintery petpets", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/15845.gif"}, {"name": "Jelly Foods", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/1745.gif"}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "Kiko Lake Treats", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/2798.gif"}, {"name": "Kiko Lake Carpentry", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/16287.gif"}, {"name": "Collectable Coins", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/14168.gif"}, {"name": "Petpet Supplies", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/37530.gif"}, {"name": "Booktastic Books", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/237.gif"}, {"name": "Kreludan Homes", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/943.gif"}, {"name": "Cafe Kreludor", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/15486.gif"}, {"name": "Kayla's Potion Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/2557.gif"}, {"name": "Darigan Toys", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/26285.gif"}, {"name": "Faerie Furniture", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/16538.gif"}, {"name": "Roo Island Souvenirs", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/34429.gif"}, {"name": "Brightvale Books", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/21710.gif"}, {"name": "The Scrollery", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/4511.gif"}, {"name": "Brightvale Glaziers", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/3139.gif"}, {"name": "Brightvale Armoury", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/5519.gif"}, {"name": "Brightvale Fruits", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/2518.gif"}, {"name": "Brightvale Motery", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/617.gif"}, {"name": "Royal Potionery", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/9397.gif"}, {"name": "Neopian Music Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/9141.gif"}, {"name": "Lost Desert Medicine", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/4661.gif"}, {"name": "Collectable Sea Shells", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/7147.gif"}, {"name": "Maractite Marvels", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/8999.gif"}, {"name": "Maraquan Petpets", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/8537.gif"}, {"name": "Geraptiku Petpets", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/8125.gif"}, {"name": "Qasalan Delights", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/4333.gif"}, {"name": "Desert Arms", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/1266.gif"}, {"name": "Words of Antiquity", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/21769.gif"}, {"name": "Faerie Weapon Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/10681.gif"}, {"name": "Illustrious Armoury", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/5355.gif"}, {"name": "Exquisite Ambrosia", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/5338.gif"}, {"name": "Magical Marvels", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/888.gif"}, {"name": "Legendary Petpets", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/977.gif"}, {"name": "Plushie Palace", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/11478.gif"}, {"name": "", "ic": ""}, {"name": "Wonderous Weaponry", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/14718.gif"}, {"name": "Shenkuu Farm Market", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/14504.gif"}, {"name": "Remarkable Restoratives", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/14524.gif"}, {"name": "Fanciful Fauna", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/26561.gif"}, {"name": "Chesterdrawers' Antiques", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/21016.gif"}, {"name": "The Crumpet Monger", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/8338.gif"}, {"name": "Neovian Printing Press", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/22275.gif"}, {"name": "Prigpants & Swolthy, Tailors", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/21010.gif"}, {"name": "Collectable Card Shop", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/4640.gif"}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "Springy Things", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/misc/shops_dir/5743.gif"}, {"name": "Shosple Colupis' Scrupulous Solutions", "ic": "https://virtupetsbucket.s3.us-east-2.amazonaws.com/images/items/magic_item/yuletide_zafara_morphing_potion.gif"}, {"name": "", "ic": ""}, {"name": "", "ic": ""}, {"name": "", "ic": ""}]
GM_xmlhttpRequest({
    method: "GET",
    url: "https://virtudreams-default-rtdb.firebaseio.com/items.json",
    onload: function(response) {
        items = JSON.parse(response.responseText)
        console.log(response.responseText)
        loaded()
    }
})

GM_xmlhttpRequest({
    method: "GET",
    url: "https://virtudreams-default-rtdb.firebaseio.com/users.json",
    onload: function(response) {
        users = JSON.parse(response.responseText)
        loaded()
    }
});

// On Load
function loaded() {
    if (items === undefined || users === undefined) {
        return
    }
    if (document.URL.startsWith("https://virtu.pet/search/?")) {
        return
    } else if (document.URL.startsWith("https://virtu.pet/search/")) {
        search_header()
    } else if (document.URL.startsWith("https://virtu.pet/aviivix/~scrip")) {
        dashboard()

    }
}

'use strict';
function dashboard() {
    // Elements
    var content = document.getElementsByClassName("settings")[0]
    console.log(content.textContent)
    if (content.textContent == "Whoops! You don't seem to have any VirtuScripts installed that use the Dashboard.") {
        content.textContent = ""
    }
    var divHeader = document.createElement("div");
    divHeader.innerHTML = `<p><b>VirtuDreams</b></p>`
    content.appendChild(divHeader)
    var divContent = document.createElement("div");
    divContent.innerHTML = `<p><img src="https://cdn.discordapp.com/emojis/905527527655735349.gif?size=96&quality=lossless" height=15> Connecting to the Dream Database...</p>`
    content.appendChild(divContent)
    var divBrowser = document.createElement("div");
    divBrowser.innerHTML = `<p></p>`
    front_page();
    content.appendChild(divBrowser)
    var divider = document.createElement("div");
    divider.innerHTML = `<hr align="center" noshade="" size="1">`
    content.appendChild(divider)
    if (users.hasOwnProperty(user)) {
        divContent.innerHTML = `<p>Welcome back to VirtuDreams, <b>${user}</b>.</p>`
    } else {
        divContent.innerHTML = `<p>Welcome to VirtuDreams, <b>${user}</b>! It looks like you've never listed a Dream before. Don't worry, you can still browse Dreams without adding your own. But if you want to list your own Dreams, we want to make sure you know that the data (your username and the items you add) will be stored on an <i>external</i> database that is not affiliated with VirtuPets.</p><p align="center">You cool with that?<br><br><input type="submit" value="Sounds good!" id="agree_button"></p>`
    }

    var agree_button = document.querySelector ("#agree_button");
    if (agree_button) {
        agree_button.addEventListener ("click", add_user_to_database , false);
    }

    function add_user_to_database() {
        GM_xmlhttpRequest({
            method: "PATCH",
            url: `https://virtudreams-default-rtdb.firebaseio.com/users.json`,
            data: `{ "${user}": true }`,
            onload: function(response) {
                divContent.innerHTML = `<p>Awesome! Welcome to VirtuDreams, <b>${user}</b>! You can click on the Faerie Pteri on item search pages to add them to your Dreams.</p>`
            }
        });
    }
}

function search_header() {
    let pteri = document.createElement("div");
    pteri.innerHTML = `<div id="new_dream_button"><input type="image" src="https://cdn.discordapp.com/attachments/709603171449700373/1106795982835957870/pixiepteri1.png" name="newDream" id="newDream" /></div>`
    let banner = document.getElementsByClassName("site-banner")[0]
    banner.appendChild(pteri)
    let new_dream_button = document.querySelector ("#new_dream_button");
    if (new_dream_button) {
        new_dream_button.addEventListener ("click", add_dream , false);
    }
}



function add_dream(zEvent) {
    let new_dream_form = document.createElement("div");
    let main_content = document.getElementsByClassName("main-content")[0]
    let content = document.getElementsByClassName("content")[0]
    main_content.appendChild(new_dream_form)
    main_content.insertBefore(new_dream_form, content)
    if (!users.hasOwnProperty(user)) {
        new_dream_form.innerHTML = `<p align="center">Woah, hold on! You haven't given us <a href="https://virtu.pet/aviivix/~script#panel"><b>permission</b></a> to store this information yet!</p>`
        main_content.appendChild(new_dream_form)
        main_content.insertBefore(new_dream_form, content)
        return
    }
    let dream = { "data": { "category": null, "icon": null, "rarity": null, "shop": "None"}, "users": { } }
    dream.users[user] = { "desc": "An item I want!", "offer": "1000", "qty": "1" }
    if (document.getElementsByClassName("flex-wrap")[0].children[0].children[1].innerText.startsWith("This item stocks at")) {
        dream.data.shop = document.getElementsByClassName("flex-wrap")[0].children[0].children[1].children[1].href.slice(-1)
    }
    dream.data.icon = document.getElementsByClassName("item-image")[0].children[0].src
    let item_info = document.getElementsByClassName("item-info")[0].children[1].children
    let itemname = item_info[0].children[0].innerText
    dream.data.rarity = parseInt(item_info[1].children[0].innerText)
    dream.data.category = item_info[2].children[0].innerText
    new_dream_form.innerHTML = `<div id="new_dream_form" align="center"><p><b>How many of this item do you dream of?</b></p><p><input type="text" id="qty" maxlength="10" size="6"></p><p><b>What would you offer to make this dream come true?</b></p><p><input type="text" id="offer" maxlength="80" size="20"></p><p><b>Any other info about this dream?</b></p><p><input type="text" id="desc" maxlength="255" size="80"></p><p><input type="submit" value="Add Dream!" id="add_dream_button"></p></div>`
    let add_dream_button = document.querySelector ("#add_dream_button");
    if (add_dream_button) {
        add_dream_button.addEventListener ("click", function(){
            console.log(JSON.stringify(dream))
            dream.users[user].qty = document.querySelector ("#qty").value
            dream.users[user].offer = document.querySelector ("#offer").value
            dream.users[user].desc = document.querySelector ("#desc").value
            GM_xmlhttpRequest({
                method: "PATCH",
                url: `https://virtudreams-default-rtdb.firebaseio.com/items/${itemname}.json`,
                data: JSON.stringify(dream),
                onload: function(response) {
                    new_dream_form.innerHTML = `<p align="center">Your Dream has been added! To view, edit or remove this Dream, visit your <b>Dashboard</b>.</p>`
                }
            });
        } , false);
    }
}
