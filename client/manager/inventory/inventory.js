/**
 * This file is used for the neccessary calls to our database for accessing and updating the inventory
 * @author Brandon Moon 
 */

function fetchAllInventory() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAllInventory') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

const allButton = document.getElementById('allBtn');
allButton.addEventListener('click', function() {
    fetchAllInventory();
});


function fetchAllProtein() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAllProteinInventory') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var proteinButton = document.getElementById('proteinBtn');
proteinButton.addEventListener('click', fetchAllProtein);


function fetchAllSides() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAllSideInventory') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var sideButton = document.getElementById('sideBtn');
sideButton.addEventListener('click', fetchAllSides);


function fetchAllToppings() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAllToppingInventory') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var toppingButton = document.getElementById('toppingBtn');
toppingButton.addEventListener('click', fetchAllToppings);


function fetchAllTortillas() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAllTortillaInventory') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var tortillaButton = document.getElementById('tortillaBtn');
tortillaButton.addEventListener('click', fetchAllTortillas);


function fetchAllMiscInventory() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAllMiscInventory') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var miscButton = document.getElementById('miscBtn');
miscButton.addEventListener('click', fetchAllMiscInventory);


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
            tableHTML += `<td>${dataEntry}</td>`;
        }
        tableHTML += "</tr>";
    }

    table.innerHTML = tableHTML;
}


var btns = document.getElementsByClassName('dropdown_btn'); 
var button; 
for (var i = 0; i < btns.length; i++){
    btns[i].onclick = change_color; 
}


function change_color(){
    if (this.style.backgroundColor == 'rgb(249, 182, 24)'){
        this.style.backgroundColor = '#1995AA'; 
    }
    else{
        this.style.backgroundColor = '#F9B618'; 
    }
    var all_btns = document.getElementsByClassName("dropdown_btn");
    for (var i = 0; i < all_btns.length; i++){
        if (all_btns[i].id != this.id){
            // console.log("button with id: ", all_btns[i].id, " should be changing color");
            all_btns[i].style.backgroundColor = '#1995AA'; 
        }
    }
}