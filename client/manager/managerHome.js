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


function fetchAllOrders() {
    fetch(link + '/getAllOrders')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


function fetchBowlOrders() {
    fetch(link + '/getBowlOrders')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


// function fetchNoneOrders() {
//     fetch('https://project3-7bzcyqo3va-uc.a.run.app/getNoneOrders')
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }
// var noneButton = document.getElementById('noneBtn');
// noneButton.addEventListener('click', fetchNoneOrders);


function fetchBurritoOrders() {
    fetch(link + '/getBurritoOrders')  
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


// function fetchTacoOrders() {
//     fetch('https://project3-7bzcyqo3va-uc.a.run.app/getTacoOrders')
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }
// var tacoButton = document.getElementById('tacoBtn');
// tacoButton.addEventListener('click', fetchTacoOrders);


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
        //console.log("id is", all_btns[i]); 
        if (all_btns[i].id != id){
            console.log("button with id: ", all_btns[i].id, " should be changing color");
            all_btns[i].style.backgroundColor = '#1995AA'; 
        }
    }
}

