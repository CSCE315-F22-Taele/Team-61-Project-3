const link = 'https://project3-7bzcyqo3va-uc.a.run.app';
//const link = 'http://localhost:5555';

function fetchEntree() {
    fetch(link + '/getEntreeOptions')
    .then(response => response.json())
    .then(data => loadEntreeOptions(data['data']));

    fetch(link + '/getEntreeQuantity')
    .then(response => response.json())
    .then(data => loadQuantities(data['data']));
}

function fetchProtein() {
    fetch(link + '/getProteinOptions')
    .then(response => response.json())
    .then(data => loadProteinOptions(data['data']));

    fetch(link + '/getProteinPrices')
    .then(response => response.json())
    .then(data => loadProteinPrices(data['data']));

    fetch(link + '/getProteinQuantity')
    .then(response => response.json())
    .then(data => loadQuantities(data['data']));
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

    fetch(link + '/getSideQuantity')  
    .then(response => response.json())
    .then(data => loadQuantities(data['data']));

    fetch(link + '/getToppingQuantity')  
    .then(response => response.json())
    .then(data => loadQuantities(data['data']));
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
            if (item === 'bowl' || item === 'tacos' || item === 'burrito') {
                htmlString += `<div class='itembox'><a href='../customer/proteins.html'><img src='pictures/${item}.png' class='itemimage' onclick="setEntree('${item}')"></a><div class='itemtag'>${item}</div></div>`;    
            } else {
                htmlString += `<div class='itembox'><a href='../customer/proteins.html'><img src='pictures/newitem.png' class='itemimage' onclick="setEntree('${item}')"></a><div class='itemtag'>${item}</div></div>`;   
            }          
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
            htmlString += `<div class='checks'><input type="checkbox" id="${item}CheckBox" name="side" value="${item}" value="0" onclick="updateSideCheckBoxValue('${item}')" /><label for="${item}">${item}</label></div>`;
        }
    }
    return htmlString;
}

function createToppingHtmlString(data) {
    var htmlString = "";
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            htmlString += `<div class='checks'><input type="checkbox" class="toppingOptions" id="${item}CheckBox" name="side" value="0" onclick="updateToppingCheckBoxValue('${item}')"/><label for="${item}">${item}</label></div>`;
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

function loadQuantities(data) {
    for (var key in data.rows) {
        var item = (data.rows[key])['item_name'];
        var quantity = (data.rows[key])['quantity'];
        console.log(item + "Quantity: " + quantity);
        localStorage.setItem(item + "Quantity", quantity);
    }
}

function setEntree(entreeType) {
    localStorage.setItem("entree", entreeType);
}

function setProtein(proteinType) {
    localStorage.setItem("protein", proteinType);
}

/*
function setSide(side) {
    const sides = localStorage.getItem("sides");
    if (sides === 'null') {
        localStorage.setItem("sides", side);
    } else {
        localStorage.setItem("sides", sides + " " + side);
    }
}
*/

function addSide(side) {
    const sides = JSON.parse(localStorage.getItem('sides'));  
    if (sides == undefined) {
        localStorage.setItem('sides', JSON.stringify([side]));
    } else {
        sides.push(side);
        localStorage.setItem('sides', JSON.stringify(sides));
    }
}

function removeSide(side) {
    const sides = JSON.parse(localStorage.getItem('sides'));

    const index = sides.indexOf(side);
    const updatedSides = sides.splice(index, 1);

    localStorage.setItem('sides', JSON.stringify(updatedSides));
}

function updateSideCheckBoxValue(item) {
    var btn = document.getElementById(item + "CheckBox");
    var val = btn.value;
    if (val == 1) { 
        //uncheck
        btn.value = 0;
        removeSide(item);
    } else { 
        //check
        btn.value = 1;
        addSide(item);
    }
}

function addTopping(topping) {
    const toppings = JSON.parse(localStorage.getItem('toppings'));  
    if (toppings == undefined) {
        localStorage.setItem('toppings', JSON.stringify([topping]));
    } else {
        toppings.push(topping);
        localStorage.setItem('toppings', JSON.stringify(toppings));
    }
}

function removeTopping(topping) {
    const toppings = JSON.parse(localStorage.getItem('toppings'));

    const index = toppings.indexOf(topping);
    const updatedToppings = toppings.splice(index, 1);

    localStorage.setItem('toppings', JSON.stringify(updatedToppings));
}

function updateToppingCheckBoxValue(item) {
    var btn = document.getElementById(item + "CheckBox");
    var val = btn.value;
    if (val == 1) { 
        //uncheck
        btn.value = 0;
        removeTopping(item);
    } else { 
        //check
        btn.value = 1;
        addTopping(item);
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
    const sides = JSON.parse(localStorage.getItem('sides'));

    var totalPrice = 0.00;
    const meal = new Meal(0, new Date().toLocaleDateString(), "", "", 0, 0, 0, 0, 0);

    meal.sale_id = saleID;
    meal.entree_type = entree;
    meal.protein = protein;

    totalPrice += parseFloat(localStorage.getItem(protein + "Price"));
    
    for (var i = 0; i < sides.length; i++) {
        if (sides[i] === 'chips_and_salsa') {
            meal.chips_and_salsa = 1;
        }
        if (sides[i] === 'chips_and_queso') {
            meal.chips_and_queso = 1;
        }
        if (sides[i] === 'chips_and_guac') {
            meal.chips_and_guac = 1;
        }
        if (sides[i] === 'drink') {
            meal.drink = 1;
        }
        if (sides[i] === 'null') {
            break;
        }
        totalPrice += parseFloat(localStorage.getItem(sides[i] + "Price"));
    }
    meal.cost = totalPrice.toFixed(2);

    const orders = JSON.parse(localStorage.getItem('orders'));  
    if (orders == undefined) {
        localStorage.setItem('orders', JSON.stringify([meal]));
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
        insertMeal(meal.sale_id, meal.date, meal.entree_type, meal.protein, meal.chips_and_salsa, meal.chips_and_queso, meal.chips_and_guac, meal.drink, meal.cost);
        updateProteinQuantity(meal.protein);
        i++;
    }
    updateSideQuantities();
    updateToppingQuantities();

    clearOrder();
    orderTextBox.innerHTML = "Order: Complete";
    orderHeader.innerHTML = "Thank you!";

    fetch(link + '/getNextSaleID') 
    .then(response => response.json())
    .then(data => loadSaleID(data['data']));
}

function insertMeal(sale_id, date, entree_type, protein, chips_and_salsa, chips_and_queso, chips_and_guac, drink, cost) {
    fetch(link + '/insert', {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 
            sale_id : sale_id, 
            date : date,
            entree_type : entree_type,
            protein : protein,
            chips_and_salsa : chips_and_salsa,
            chips_and_queso : chips_and_queso,
            chips_and_guac : chips_and_guac,
            drink : drink,
            cost : cost
        })
    })
    .then(response => response.json());
}

function updateSideQuantities() {
    const sides = JSON.parse(localStorage.getItem('sides'));
    let sideCount = {};
    for (let i = 0; i < sides.length; i++) {
        if(!sideCount[sides[i]]) {
            sideCount[sides[i]] = 0;
        }
        sideCount[sides[i]]++;
    }

    let updatedCount = {};
    for (let i = 0; i < Object.keys(sideCount).length; i++) {
        updatedCount[Object.keys(sideCount)[i]] = localStorage.getItem(Object.keys(sideCount)[i]+"Quantity") - sideCount[Object.keys(sideCount)[i]];
    }

    for (let i = 0; i < Object.keys(updatedCount).length; i++) {
        let sideName = Object.keys(updatedCount)[i];
        let newQuantity = updatedCount[Object.keys(updatedCount)[i]];

        fetch(link + '/updateQuantity', {
            headers: {
                'Content-type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                item : sideName,
                quantity : newQuantity,
            })
        })
        .then(response => response.json());
    }
}

function updateToppingQuantities() {
    const toppings = JSON.parse(localStorage.getItem('toppings'));
    let toppingCount = {};
    for (let i = 0; i < toppings.length; i++) {
        if(!toppingCount[toppings[i]]) {
            toppingCount[toppings[i]] = 0;
        }
        toppingCount[toppings[i]]++;
    }

    let updatedCount = {};
    for (let i = 0; i < Object.keys(toppingCount).length; i++) {
        updatedCount[Object.keys(toppingCount)[i]] = localStorage.getItem(Object.keys(toppingCount)[i]+"Quantity") - toppingCount[Object.keys(toppingCount)[i]];
    }

    for (let i = 0; i < Object.keys(updatedCount).length; i++) {
        let toppingName = Object.keys(updatedCount)[i];
        let newQuantity = updatedCount[Object.keys(updatedCount)[i]];

        fetch(link + '/updateQuantity', {
            headers: {
                'Content-type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                item : toppingName,
                quantity : newQuantity,
            })
        })
        .then(response => response.json());
    }
}

function updateProteinQuantity(protein) {
    let quantityProtein = localStorage.getItem(protein + "Quantity");
    quantityProtein--;
    
    fetch(link + '/updateQuantity', {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 
            item : protein,
            quantity : quantityProtein,
        })
    })
    .then(response => response.json());
}
