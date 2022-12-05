// const link = 'https://project3-7bzcyqo3va-uc.a.run.app';
const link = 'http://localhost:5555';

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
}); 

function createHtmlString(data, type) {
    var htmlString = "";
    htmlString += `<button class = "dropdown_btn_`+type+`" id="allBtn`+type+`" onclick="change_color('allBtn`+type+`')">All</button>`;
    htmlString += `<button class = "dropdown_btn_`+type+`" id="noneBtn`+type+`" onclick="change_color('noneBtn`+type+`')">NONE</button>`; 
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            htmlString += `<button class="dropdown_btn_`+type+`" id="${item}Btn" onclick="change_color('${item}Btn')">${item}</button>`;
        }
    }
    return htmlString;
}

function loadEntreeOptions(entrees) {    
    const entreeList = document.getElementById('entree_dropdown'); 
    entreeList.innerHTML = createHtmlString(entrees, "entree");
}

function loadProteinOptions(protein) {    
    const proteinList = document.getElementById('protein_dropdown'); 
    proteinList.innerHTML = createHtmlString(protein, "protein");
}

function loadSideOptions(sides) {    
    const sidesList = document.getElementById('sides_dropdown'); 
    sidesList.innerHTML = createHtmlString(sides, "sides");
}

// function fetchAllOrders() {
//     fetch(link + '/getAllOrders')
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }

// function fetchNoneOrders() {
//     fetch(link + '/getNoneOrders')
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }

// function fetchbowlOrders() {
//     fetch(link + '/getBowlOrders')
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }

// function fetchburritoOrders() {
//     fetch(link + '/getBurritoOrders')  
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }

// function fetchtacosOrders() {
//     fetch(link + '/getTacoOrders')
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody'); 
    
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='9'>No Data</td></tr>";
        return;
    }

    var tableHTML = "";

    for (var key in data.rows) {
        tableHTML += "<tr>";
        for (var keyName in data.rows[key]) {
            var dataEntry = (data.rows[key])[keyName];
            if (keyName == 'date') {
                dataEntry = new Date(dataEntry).toLocaleDateString();
            } 
            tableHTML += `<td>${dataEntry}</td>`;
        }
        tableHTML += "</tr>";
    }

    table.innerHTML = tableHTML;
}

function change_color(id){
    var btn = document.getElementById(id);
    var all_btns = document.getElementsByClassName(btn.className);
    if (btn.style.backgroundColor == 'rgb(249, 182, 24)'){
        btn.style.backgroundColor = '#1995AA'; 
    }
    else{
        btn.style.backgroundColor = '#F9B618'; 
    }
    for (var i = 0; i < all_btns.length; i++){
        if (all_btns[i].id != id){
            // console.log("button with id: ", all_btns[i].id, " should be changing color");
            all_btns[i].style.backgroundColor = '#1995AA'; 
        }
    }
}

// How to access drop down buttons IDs after they are created

function displayButtonNames() {
    const table = document.querySelector('table tbody'); 
    const entreeButtons = document.querySelectorAll('.dropdown_btn_entree');
    for (let i = 0; i < entreeButtons.length; i++) {
        table.innerHTML += "<p>" + entreeButtons[i].id + "</p>"; 
    }
    table.innerHTML += "<br>";
    const proteinButtons = document.querySelectorAll('.dropdown_btn_protein');
    for (let i = 0; i < proteinButtons.length; i++) {
        table.innerHTML += "<p>" + proteinButtons[i].id + "</p>"; 
    }
    table.innerHTML += "<br>";
    const sideButtons = document.querySelectorAll('.dropdown_btn_sides');
    for (let i = 0; i < sideButtons.length; i++) {
        table.innerHTML += "<p>" + sideButtons[i].id + "</p>"; 
    }
}

var entree = "";
var protein = "";
var chipsAndSalsa = "";
var chipsAndQueso = "";
var chipsAndGuac = "";
var drinkOption = "";
var sideBtnPressed = "";
function enableButtons() {
    // ENTREE OPTIONS
    const allEntreeBtn = document.querySelector('#allBtnentree');
    allEntreeBtn.addEventListener('click', function() {
        entree = ['tacos', 'burrito', 'bowl'];
    });

    const noneEntreeBtn = document.querySelector('#noneBtnentree');
    noneEntreeBtn.addEventListener('click', function() {
        entree = 'none';
    })

    const bowlEntreeBtn = document.querySelector('#bowlBtn');
    bowlEntreeBtn.addEventListener('click', function() {
        entree = 'bowl';
    })

    const burritoEntreeBtn = document.querySelector('#burritoBtn');
    burritoEntreeBtn.addEventListener('click', function() {
        entree = 'burrito';
    })

    const tacosEntreeBtn = document.querySelector('#tacosBtn');
    tacosEntreeBtn.addEventListener('click', function() {
        entree = 'tacos';
    })

    // PROTEIN OPTIONS
    const allProteinBtn = document.querySelector('#allBtnprotein');
    allProteinBtn.addEventListener('click', function() {
        protein = ['steak', 'vegetable medley', 'beef', 'chicken'];
    });

    const noneProteinBtn = document.querySelector('#noneBtnprotein');
    noneProteinBtn.addEventListener('click', function() {
        protein = 'none';
    })

    const steakProteinBtn = document.querySelector('#steakBtn');
    steakProteinBtn.addEventListener('click', function() {
        protein = 'steak';
    })

    const vegProteinBtn = document.getElementById('vegetable medleyBtn');
    vegProteinBtn.addEventListener('click', function() {
        protein = 'vegetable medley';
    })

    const beefProteinBtn = document.querySelector('#beefBtn');
    beefProteinBtn.addEventListener('click', function() {
        protein = 'beef';
    })

    const chickenProteinBtn = document.querySelector('#chickenBtn');
    chickenProteinBtn.addEventListener('click', function() {
        protein = 'chicken';
    })

    // SIDE OPTIONS
    const allSidesBtn = document.querySelector('#allBtnsides');
    allSidesBtn.addEventListener('click', function() {
        sideBtnPressed = 'All';
        chipsAndSalsa = '1';
        chipsAndQueso = '1';
        chipsAndGuac = '1';
        drinkOption = '1';
    })

    const noneSidesBtn = document.querySelector('#noneBtnsides');
    noneSidesBtn.addEventListener('click', function() {
        sideBtnPressed = 'none'
        chipsAndSalsa = '0';
        chipsAndQueso = '0';
        chipsAndGuac = '0';
        drinkOption = '0';
    })

    const chipsAndSalsaBtn = document.querySelector('#chips_and_salsaBtn');
    chipsAndSalsaBtn.addEventListener('click', function() {
        sideBtnPressed = 'chips_and_salsa';
        chipsAndSalsa = '1';
        chipsAndQueso = '0';
        chipsAndGuac = '0';
        drinkOption = '0';
    })

    const chipsAndQuesoBtn = document.querySelector('#chips_and_quesoBtn');
    chipsAndQuesoBtn.addEventListener('click', function() {
        sideBtnPressed = 'chips_and_queso';
        chipsAndSalsa = '0';
        chipsAndQueso = '1';
        chipsAndGuac = '0';
        drinkOption = '0';
    })

    const chipsAndGuacBtn = document.querySelector('#chips_and_guacBtn');
    chipsAndGuacBtn.addEventListener('click', function() {
        sideBtnPressed = 'chips_and_guac';
        chipsAndSalsa = '0';
        chipsAndQueso = '0';
        chipsAndGuac = '1';
        drinkOption = '0';
    })

    const drinkOptionBtn = document.querySelector('#drinkBtn');
    drinkOptionBtn.addEventListener('click', function() {
        sideBtnPressed = 'drink';
        chipsAndSalsa = '0';
        chipsAndQueso = '0';
        chipsAndGuac = '0';
        drinkOption = '1';
    })
}

function submitOrder() {
    console.log(`entree:${entree} protein:${protein} cas: ${chipsAndSalsa} caq: ${chipsAndQueso} cag: ${chipsAndGuac} drink: ${drinkOption}`);
    fetch(link + '/getOrders/'+entree)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

// function fetchtacosOrders() {
//     fetch(link + '/getTacoOrders')
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }
    
