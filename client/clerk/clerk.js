const link = 'https://project3-7bzcyqo3va-uc.a.run.app'
//const link = 'http://localhost:5555';

document.addEventListener('DOMContentLoaded', function() {
    localStorage.clear();

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

    fetch(link + '/getEntreeQuantity')
    .then(response => response.json())
    .then(data => loadQuantities(data['data']));

    fetch(link + '/getProteinQuantity')
    .then(response => response.json())
    .then(data => loadQuantities(data['data']));

    fetch(link + '/getSideQuantity')  
    .then(response => response.json())
    .then(data => loadQuantities(data['data']));

    fetch(link + '/getToppingQuantity')  
    .then(response => response.json())
    .then(data => loadQuantities(data['data']));
}); 

function loadQuantities(data) {
    for (var key in data.rows) {
        var item = (data.rows[key])['item_name'];
        var quantity = (data.rows[key])['quantity'];
        localStorage.setItem(item + "Quantity", quantity);
    }
}

function createHtmlString(data) {
    var htmlString = "";
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            htmlString += `<button class="itemBtns" id="${item}" value="0" onclick="changeBtnColor('${item}')">${item}</button>`;
        }
    }
    return htmlString;
}

function loadEntreeOptions(entrees) {    
    const entreeList = document.querySelector('.entree'); 
    entreeList.innerHTML += createHtmlString(entrees);
}

function loadProteinOptions(protein) {    
    const proteinList = document.querySelector('.protein'); 
    proteinList.innerHTML += createHtmlString(protein);
}

function loadSideOptions(sides) {    
    const sidesList = document.querySelector('.sides'); 
    sidesList.innerHTML += createHtmlString(sides);
}

function loadToppingOptions(toppings) {    
    const toppingsList = document.querySelector('.toppings'); 
    toppingsList.innerHTML += createHtmlString(toppings);
}

const proteinPrices = new Map();
function loadProteinPrices(data) {
    for (var key in data.rows) {
        var item = (data.rows[key])['item_name'];
        var price = (data.rows[key])['sale_cost'];
        proteinPrices.set(item, price);
    }
}
const sidePrices = new Map();
function loadSidePrices(data) {
    for (var key in data.rows) {
        var item = (data.rows[key])['item_name'];
        var price = (data.rows[key])['sale_cost'];
        sidePrices.set(item, price);
    }
}

var grandTotal = 0.00;
function updateTotal(amount) {
    grandTotal += amount;
    var htmlString = "Total: $" + grandTotal.toFixed(2).toString();
    var totalTextBox = document.getElementById("total");
    totalTextBox.innerHTML = htmlString;
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

let proteinQuantites = new Map();
let sideQuantites = new Map();
let toppingQuantites = new Map();

let order = [];

function updateOrder() {
    var orderTextBox = document.getElementById("items");
    var htmlString = "<p>";
    var totalPrice = 0.00;
    const meal = new Meal(0, new Date().toLocaleDateString(), "null", "null", 0, 0, 0, 0, 0);
    let entreeSelected = false;
    let proteinSelected = false;
    let toppingSelected = false;
    let sideSelected = false;

    if (order.length === 0) {
        orderTextBox.innerHTML = "Order: ";
    }

    const entreeButtons = document.querySelectorAll('.entree .itemBtns');
    for (var i = 0; i < entreeButtons.length; i++) {
        var btn = entreeButtons[i];
        if (btn.value == 1) {
            meal.entree_type = btn.id;
            htmlString += btn.id + ", ";
            entreeSelected = true;
        }
    }
    const proteinButtons = document.querySelectorAll('.protein .itemBtns');
    for (var i = 0; i < proteinButtons.length; i++) {
        var btn = proteinButtons[i];
        if (btn.value == 1) {
            if (entreeSelected === true) {
                meal.protein = btn.id;
                htmlString += btn.id + ", ";
                totalPrice += proteinPrices.get(btn.id);
    
                let quantity = proteinQuantites.get(proteinButtons[i].id);
                if (quantity == undefined) {
                    quantity = 0;
                }
                proteinQuantites.set(proteinButtons[i].id, ++quantity);
            }
            proteinSelected = true;
        }
    }
    const sideButtons = document.querySelectorAll('.sides .itemBtns');
    for (var i = 0; i < sideButtons.length; i++) {
        var btn = sideButtons[i];
        if (btn.value == 1) {
            if ((entreeSelected === false && proteinSelected === false) || (entreeSelected === true && proteinSelected === true)) {
                if (btn.id == "chips_and_salsa") {
                    meal.chips_and_salsa = 1;
                }
                if (btn.id == "chips_and_guac") {
                    meal.chips_and_guac = 1;
                }
                if (btn.id == "chips_and_queso") {
                    meal.chips_and_queso = 1;
                }
                if (btn.id == "drink") {
                    meal.drink = 1;
                }

                let quantity = sideQuantites.get(sideButtons[i].id);
                if (quantity == undefined) {
                    quantity = 0;
                }
                sideQuantites.set(sideButtons[i].id, ++quantity);
            }
            htmlString += btn.id + ", ";
            totalPrice += sidePrices.get(btn.id);
            sideSelected = true;
        }
    }
    const toppingButtons = document.querySelectorAll('.toppings .itemBtns');
    for (var i = 0; i < toppingButtons.length; i++) {
        if (toppingButtons[i].value == 1) {
            if (entreeSelected === true && proteinSelected === true) {
                let quantity = toppingQuantites.get(toppingButtons[i].id);
                if (quantity == undefined) {
                    quantity = 0;
                }
                toppingQuantites.set(toppingButtons[i].id, ++quantity);
            }
            toppingSelected = true;
        }
    }

    if (toppingSelected === false && entreeSelected === false && proteinSelected === false && sideSelected === false) {
        clearButtons();
        return;
    }
    if (toppingSelected === true && entreeSelected === false && proteinSelected === false) {
        clearButtons();
        return;
    }
    if (entreeSelected === true && proteinSelected === false) {
        clearButtons();
        return;
    }
    if (entreeSelected === false && proteinSelected === true) {
        clearButtons();
        return;
    }
    if (entreeSelected === true && sideSelected === true && proteinSelected === false) {
        clearButtons();
        return;
    }

    orderTextBox.innerHTML += htmlString + "$" + totalPrice.toFixed(2).toString() + "</p>";
    updateTotal(totalPrice);
    meal.cost = totalPrice.toFixed(2);
    order.push(meal);
    clearButtons();
}

function changeBtnColor(id) {
    var btn = document.getElementById(id);
    var val = btn.value;
    if (val == 1) {
        btn.style.backgroundColor = "#ffffff";
        btn.value = 0;
    } else {
        btn.style.backgroundColor = "#008000";
        btn.value = 1;
    }
}

function completeOrder() {
    if (order.length === 0) {
        return;
    }
    var i = 1;
    for (const meal of order) {
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
        .then(response => response.json());
    }
    clearTextBoxes();
    grandTotal = 0.00;

    const proteinButtons = document.querySelectorAll('.protein .itemBtns');
    for (let i = 0; i < proteinButtons.length; i++) {
        let protein = proteinButtons[i].id;
        let proteinQuantity = proteinQuantites.get(protein);
        if (proteinQuantity == undefined) {
            proteinQuantity = 0;
        }
        let newProteinQuantity = localStorage.getItem(protein + "Quantity") - proteinQuantity;
        updateQuantity(protein, newProteinQuantity);
    }

    const sideButtons = document.querySelectorAll('.sides .itemBtns');
    for (let i = 0; i < sideButtons.length; i++) {
        let side = sideButtons[i].id;
        let sideQuantity = sideQuantites.get(side);
        if (sideQuantity == undefined) {
            sideQuantity = 0;
        }
        let newSideQuantity = localStorage.getItem(side + "Quantity") - sideQuantity;
        updateQuantity(side, newSideQuantity);
    }

    const toppingButtons = document.querySelectorAll('.toppings .itemBtns');
    for (let i = 0; i < toppingButtons.length; i++) {
        let topping = toppingButtons[i].id;
        let toppingQuantity = toppingQuantites.get(topping);
        if (toppingQuantity == undefined) {
            toppingQuantity = 0;
        }
        let newToppingQuantity = localStorage.getItem(topping + "Quantity") - toppingQuantity;
        updateQuantity(topping, newToppingQuantity);
    }

    fetch(link + '/getNextSaleID') 
    .then(response => response.json())
    .then(data => loadSaleID(data['data']));

    localStorage.clear();
}

function clearTextBoxes() {
    var orderTextBox = document.getElementById("items");
    orderTextBox.innerHTML = "Order: ";

    var orderTextBox = document.getElementById("total");
    orderTextBox.innerHTML = "Total: ";
}

function clearButtons() {
    const entreeButtons = document.querySelectorAll('.entree .itemBtns');
    for (var i = 0; i < entreeButtons.length; i++) {
        var btn = entreeButtons[i];
        if (btn.value == 1) {
            btn.style.backgroundColor = '#ffffff';
            btn.value = 0;
        }
    }
    const proteinButtons = document.querySelectorAll('.protein .itemBtns');
    for (var i = 0; i < proteinButtons.length; i++) {
        var btn = proteinButtons[i];
        if (btn.value == 1) {
            btn.style.backgroundColor = '#ffffff';
            btn.value = 0;
        }
    }
    const sideButtons = document.querySelectorAll('.sides .itemBtns');
    for (var i = 0; i < sideButtons.length; i++) {
        var btn = sideButtons[i];
        if (btn.value == 1) {
            btn.style.backgroundColor = '#ffffff';
            btn.value = 0;
        }
    }
    const toppingButtons = document.querySelectorAll('.toppings .itemBtns');
    for (var i = 0; i < toppingButtons.length; i++) {
        var btn = toppingButtons[i];
        if (btn.value == 1) {
            btn.style.backgroundColor = '#ffffff';
            btn.value = 0;
        }
    }
}

function updateQuantity(item, quantity) {
    fetch(link + '/updateQuantity', {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 
            item : item,
            quantity : quantity,
        })
    })
    .then(response => response.json());
}