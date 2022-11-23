document.addEventListener('DOMContentLoaded', function() {
    //fetch('http://localhost:5555/getEntreeOptions')
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getEntreeOptions')  
    .then(response => response.json())
    .then(data => loadEntreeOptions(data['data']));

    //fetch('http://localhost:5555/getProteinOptions')
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getProteinOptions')  
    .then(response => response.json())
    .then(data => loadProteinOptions(data['data']));

    //fetch('http://localhost:5555/getSideOptions')
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getSideOptions')   
    .then(response => response.json())
    .then(data => loadSideOptions(data['data']));
}); 

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
    entreeList.innerHTML = createHtmlString(entrees);
}

function loadProteinOptions(protein) {    
    const proteinList = document.querySelector('.protein'); 
    proteinList.innerHTML = createHtmlString(protein);
}

function loadSideOptions(sides) {    
    const sidesList = document.querySelector('.sides'); 
    sidesList.innerHTML = createHtmlString(sides);
}

function itemPrice(item) {
    var price;
    switch (item) {
        case "chicken":
            price = 8.50;
            break;
        case "steak":
            price = 8.89;
            break;
        case "beef":
            price = 8.79;
            break;
        case "vegetable medley":
            price = 7.89;
            break;
        case "chips_and_queso":
            price = 3.49;
            break;
        case "chips_and_guac":
            price = 3.69;
            break;
        case "chips_and_salsa":
            price = 2.19;
            break;
        case "drink":
            price = 2.45;
            break;
        default:
            price = 0.00;
            break;
    }
    return price;
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

let order = [];

function updateOrder() {
    var orderTextBox = document.getElementById("items");
    var htmlString = "<p>";
    var totalPrice = 0.00;
    const meal = new Meal(0, new Date().toLocaleDateString(), "", "", 0, 0, 0, 0, 0);

    const entreeButtons = document.querySelectorAll('.entree .itemBtns');
    for (var i = 0; i < entreeButtons.length; i++) {
        var btn = entreeButtons[i];
        if (btn.value == 1) {
            meal.entree_type = btn.id;
            htmlString += btn.id + " ";
            totalPrice += itemPrice(btn.id);
        }
    }
    const proteinButtons = document.querySelectorAll('.protein .itemBtns');
    for (var i = 0; i < proteinButtons.length; i++) {
        var btn = proteinButtons[i];
        if (btn.value == 1) {
            meal.protein = btn.id;
            htmlString += btn.id + " ";
            totalPrice += itemPrice(btn.id);
        }
    }
    const sideButtons = document.querySelectorAll('.sides .itemBtns');
    for (var i = 0; i < sideButtons.length; i++) {
        var btn = sideButtons[i];
        if (btn.value == 1) {
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
            htmlString += btn.id + " ";
            totalPrice += itemPrice(btn.id);
        }
    }
    orderTextBox.innerHTML += htmlString + "$" + totalPrice.toFixed(2).toString() + "</p>";
    updateTotal(totalPrice);
    meal.cost = totalPrice.toFixed(2);
    order.push(meal);
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
    //fetch('http://localhost:5555/getNextSaleID')
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getSideOptions')   
    .then(response => response.json())
    .then(data => loadSaleID(data['data']));

    var i = 1;
    for (const meal of order) {

        meal.sale_id = saleID + i;
        i++;

        fetch('https://project3-7bzcyqo3va-uc.a.run.app/insert', {
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
        
        var orderTextBox = document.getElementById("items");
        orderTextBox.innerHTML = "Order: ";

        var orderTextBox = document.getElementById("total");
        orderTextBox.innerHTML = "Total: ";

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
                if (btn.id == "chips_and_salsa") {
                    btn.style.backgroundColor = '#ffffff';
                    btn.value = 0;
                }
                if (btn.id == "chips_and_guac") {
                    btn.style.backgroundColor = '#ffffff';
                    btn.value = 0;
                }
                if (btn.id == "chips_and_queso") {
                    btn.style.backgroundColor = '#ffffff';
                    btn.value = 0;
                }
                if (btn.id == "drink") {
                    btn.style.backgroundColor = '#ffffff';
                    btn.value = 0;
                }
            }
        }
    }
}
