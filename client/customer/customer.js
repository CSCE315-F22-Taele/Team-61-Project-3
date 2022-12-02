const link = 'https://project3-7bzcyqo3va-uc.a.run.app'
//const link = 'http://localhost:5555';

document.addEventListener('DOMContentLoaded', function() {
    fetch(link + '/getEntreeOptions')
    .then(response => response.json())
    .then(data => loadEntreeOptions(data['data']));

    fetch(link + '/getProteinOptions')
    .then(response => response.json())
    .then(data => loadProteinOptions(data['data']));

    fetch(link + '/getSideOptions')  
    .then(response => response.json())
    .then(data => loadSideOptions(data['data']));

    fetch(link + '/getToppingOptions')  
    .then(response => response.json())
    .then(data => loadToppingOptions(data['data']));

    fetch(link + '/getProteinPrices')
    .then(response => response.json())
    .then(data => loadProteinPrices(data['data']));

    fetch(link + '/getSidePrices')  
    .then(response => response.json())
    .then(data => loadSidePrices(data['data']));

    fetch(link + '/getNextSaleID') 
    .then(response => response.json())
    .then(data => loadSaleID(data['data']));
}); 

function loadEntrees() {
    fetch(link + '/getEntreeOptions')
    .then(response => response.json())
    .then(data => loadEntreeOptions(data['data']));
}
function createEntreeHtmlString(data) {
    var htmlString = "";
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            htmlString += `<div class='itembox'><a href='../customer/proteins.html'><img src='pictures/${item}.png' class='itemimage' onclick="setEntree('${item}')"></a><div class='itemtag'>${item}</div></div>`;            
        }
    }
    return htmlString;
}

function createProteinHtmlString(data) {
    var htmlString = "";
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            if (item === "chicken") {
                htmlString += `<div class='itembox'><a href='../customer/extras.html'><img src='pictures/chicken2.png' class='itemimage' onclick="setProtein('${item}')"></a><div class='itemtag'>${item}</div></div>`;
            }
            else if (item === "steak") {
                htmlString += `<div class='itembox'><a href='../customer/extras.html'><img src='pictures/steak3.png' class='itemimage' onclick="setProtein('${item}')"></a><div class='itemtag'>${item}</div></div>`;
            }
            else if (item === "vegetable medley") {
                htmlString += `<div class='itembox'><a href='../customer/extras.html'><img src='pictures/vegetables7.png' class='itemimage' onclick="setProtein('${item}')"></a><div class='itemtag'>${item}</div></div>`;
            }
            else if (item === "beef") {
                htmlString += `<div class='itembox'><a href='../customer/extras.html'><img src='pictures/beef2.png' class='itemimage' onclick="setProtein('${item}')"></a><div class='itemtag'>${item}</div></div>`;
            }
        }
    }
    return htmlString;
}

function createSideHtmlString(data) {
    var htmlString = "";
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            htmlString += `<div class='checks'><input type="checkbox" id="${item}" name="side" value="${item}" /><label for="${item}">${item}</label></div>`;
        }
    }
    return htmlString;
}

function createToppingHtmlString(data) {
    var htmlString = "";
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            htmlString += `<div class='checks'><input type="checkbox" id="${item}" name="side" value="${item}" /><label for="${item}">${item}</label></div>`;
        }
    }
    return htmlString;
}

function loadEntreeOptions(entrees) {    
    const entreeList = document.querySelector('.menuitems'); 
    entreeList.innerHTML += createEntreeHtmlString(entrees);
}

function loadProteinOptions(protein) {    
    const proteinList = document.querySelector('.proteinitems'); 
    proteinList.innerHTML = createProteinHtmlString(protein);
}

function loadSideOptions(sides) {    
    const sidesList = document.querySelector('.sideitems'); 
    sidesList.innerHTML += createSideHtmlString(sides);
}

function loadToppingOptions(toppings) {    
    const toppingsList = document.querySelector('.toppingitems'); 
    toppingsList.innerHTML += createToppingHtmlString(toppings);
}

function loadProteinPrices(data) {
    for (var key in data.rows) {
        var item = (data.rows[key])['item_name'];
        var price = (data.rows[key])['sale_cost'];
        localStorage.setItem(item + "Price", price);
    }
}

function loadSidePrices(data) {
    for (var key in data.rows) {
        var item = (data.rows[key])['item_name'];
        var price = (data.rows[key])['sale_cost'];
        localStorage.setItem(item + "Price", price);
    }
}

function setEntree(entreeType) {
    localStorage.setItem("entree", entreeType);
}

function setProtein(proteinType) {
    localStorage.setItem("protein", proteinType);
}

function finalizeOrder() {
    const entree = localStorage.getItem("entree");
    const protein = localStorage.getItem("protein");

    const order = document.getElementById("items");
    order.innerHTML += (entree + " "+ protein);

    const proteinPrice = localStorage.getItem(protein + "Price");

    const total = document.getElementById("total");
    total.innerHTML += proteinPrice;
}
