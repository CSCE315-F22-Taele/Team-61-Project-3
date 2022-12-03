//const link = 'https://project3-7bzcyqo3va-uc.a.run.app'
const link = 'http://localhost:5555';

function fetchEntree() {
    fetch(link + '/getEntreeOptions')
    .then(response => response.json())
    .then(data => loadEntreeOptions(data['data']));
}

function fetchProtein() {
    fetch(link + '/getProteinOptions')
    .then(response => response.json())
    .then(data => loadProteinOptions(data['data']));

    fetch(link + '/getProteinPrices')
    .then(response => response.json())
    .then(data => loadProteinPrices(data['data']));
}

function fetchExtras() {
    fetch(link + '/getSideOptions')  
    .then(response => response.json())
    .then(data => loadSideOptions(data['data']));

    fetch(link + '/getToppingOptions')  
    .then(response => response.json())
    .then(data => loadToppingOptions(data['data']));

    fetch(link + '/getSidePrices')  
    .then(response => response.json())
    .then(data => loadSidePrices(data['data']));
}

function fetchSaleID() {
    fetch(link + '/getNextSaleID') 
    .then(response => response.json())
    .then(data => loadSaleID(data['data']));
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
            else {
                htmlString += `<div class='itembox'><a href='../customer/extras.html'><img src='pictures/newitem.png' class='itemimage' onclick="setProtein('${item}')"></a><div class='itemtag'>${item}</div></div>`;
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
            htmlString += `<div class='checks'><input type="checkbox" id="${item}" name="side" value="${item}" onclick="setSide('${item}')" /><label for="${item}">${item}</label></div>`;
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

function setSide(side) {
    const sides = localStorage.getItem("sides");
    if (sides === 'null') {
        localStorage.setItem("sides", side);
    } else {
        localStorage.setItem("sides", sides + " " + side);
    }
}

class Meal {
    constructor(sale_id, date, entree_type, protein, chips_and_salsa, chips_and_queso, chips_and_guac, drink, cost) {
        this.sale_id = sale_id;
        this.date = date;
        this.entree_type = entree_type;
        this.protein = protein;
        this.chips_and_salsa = chips_and_salsa;
        this.chips_and_queso = chips_and_queso;
        this.chips_and_guac = chips_and_guac;
        this.drink = drink;
        this.cost = cost;
    }
}

var saleID;
function loadSaleID(data) {
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            saleID = (data.rows[key])[keyName];
        }
    }
}

function loadOrder() {
    const orderTextBox = document.getElementById("items");
    const totalTextBox = document.getElementById("total");
    
    const entree = localStorage.getItem("entree");
    const protein = localStorage.getItem("protein");
    const sides = localStorage.getItem("sides");

    const sidesArray = sides.split(" ");

    var totalPrice = 0.00;
    const meal = new Meal(0, new Date().toLocaleDateString(), "", "", 0, 0, 0, 0, 0);

    meal.sale_id = saleID;
    meal.entree_type = entree;
    meal.protein = protein;

    totalPrice += parseFloat(localStorage.getItem(protein + "Price"));
    
    for (var i = 0; i < sidesArray.length; i++) {
        if (sidesArray[i] === 'chips_and_salsa') {
            meal.chips_and_salsa = 1;
        }
        if (sidesArray[i] === 'chips_and_queso') {
            meal.chips_and_queso = 1;
        }
        if (sidesArray[i] === 'chips_and_guac') {
            meal.chips_and_guac = 1;
        }
        if (sidesArray[i] === 'drink') {
            meal.drink = 1;
        }
        if (sidesArray[i] === 'null') {
            break;
        }
        totalPrice += parseFloat(localStorage.getItem(sidesArray[i] + "Price"));
    }
    meal.cost = totalPrice.toFixed(2);

    const orders = JSON.parse(localStorage.getItem('orders'));  
    if (orders == undefined) {
        localStorage.setItem('orders', JSON.stringify([meal]))
        orderTextBox.innerHTML += getHtmlMealString(meal, 1);
        totalTextBox.innerHTML = "Total: $"+(meal.cost).toString();
    }
    else {
        orders.push(meal);
        localStorage.setItem('orders', JSON.stringify(orders));

        htmlString = "";
        total = 0.00;
        for (var i = 0; i < orders.length - 1; i++) {
            htmlString += getHtmlMealString(orders[i], i + 1);
            total += parseFloat(orders[i].cost);
        }
        htmlString += getHtmlMealString(meal, orders.length);
        total += parseFloat(meal.cost);

        orderTextBox.innerHTML += htmlString;
        totalTextBox.innerHTML = "Total: $" + total.toFixed(2).toString();
    }
}

function getHtmlMealString(meal, i) {
    var htmlString = "<p>";
    htmlString += "Item #" + (i).toString() + ": ";
    htmlString += meal.entree_type + ", ";
    htmlString += meal.protein + ", ";
    if (meal.chips_and_salsa === 1) {
        htmlString += "chips and salsa, ";
    }
    if (meal.chips_and_queso === 1) {
        htmlString += "chips and queso, ";
    }
    if (meal.chips_and_guac === 1) {
        htmlString += "chips and guac, ";
    }
    if (meal.drink === 1) {
        htmlString += "drink, ";
    }
    htmlString += ("$"+(meal.cost).toString() + "</p>");
    return htmlString;
}

function addMoreItems() {
    localStorage.setItem("sides", 'null');
}

function clearOrder() {
    localStorage.clear();
    localStorage.setItem("sides", 'null');
    const orderTextBox = document.getElementById("items");
    const totalTextBox = document.getElementById("total");
    orderTextBox.innerHTML = "Order: Cleared";
    totalTextBox.innerHTML = "Total: $0.00";
}

function finalizeOrder() {
    const orders = JSON.parse(localStorage.getItem('orders'));
    const orderTextBox = document.getElementById("items");
    const orderHeader = document.getElementById("orderHeader");

    let i = 1;
    for (const meal of orders) {
        meal.sale_id = saleID + i;
        i++;
        fetch(link + '/insert', {
            headers: {
                'Content-type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                sale_id : meal.sale_id, 
                date : meal.date,
                entree_type : meal.entree_type,
                protein : meal.protein,
                chips_and_salsa : meal.chips_and_salsa,
                chips_and_queso : meal.chips_and_queso,
                chips_and_guac : meal.chips_and_guac,
                drink : meal.drink,
                cost : meal.cost
            })
        })
        .then(response => response.json())
    }
    clearOrder();
    orderTextBox.innerHTML = "Order: Complete";
    orderHeader.innerHTML = "Thank you!";

    fetch(link + '/getNextSaleID') 
    .then(response => response.json())
    .then(data => loadSaleID(data['data']));
}