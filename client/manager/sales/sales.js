const link = 'https://project3-7bzcyqo3va-uc.a.run.app';

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

function submitOrder() {
    console.log(`entree:${entree} protein:${protein} cas: ${chipsAndSalsa} caq: ${chipsAndQueso} cag: ${chipsAndGuac} drink: ${drinkOption}`);
    fetch(link + '/getOrders/'+entree)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}
    
