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

function createHtmlString(data) {
    var htmlString = "";
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            htmlString += `<button class="dropdown_btn" id="${item}btn">${item}</button>`;
        }
    }
    return htmlString;
}

function loadEntreeOptions(entrees) {    
    const entreeList = document.querySelector('entree_dropdown'); 
    entreeList.innerHTML = createHtmlString(entrees);
}

function fetchAllOrders() {
    fetch(link + '/getAllOrders')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var allButton = document.getElementById('allBtn');
allButton.addEventListener('click', fetchAllOrders);


function fetchBowlOrders() {
    fetch(link + '/getBowlOrders')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var bowlButton = document.getElementById('bowlBtn');
bowlButton.addEventListener('click', fetchBowlOrders);


function fetchNoneOrders() {
    fetch(link + '/getNoneOrders')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var noneButton = document.getElementById('noneBtn');
noneButton.addEventListener('click', fetchNoneOrders);


function fetchBurritoOrders() {
    fetch(link + '/getBurritoOrders')  
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var burritoButton = document.getElementById('burritoBtn');
burritoButton.addEventListener('click', fetchBurritoOrders);


function fetchTacoOrders() {
    fetch(link + '/getTacoOrders')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var tacoButton = document.getElementById('tacoBtn');
tacoButton.addEventListener('click', fetchTacoOrders);


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

var btns = document.getElementsByClassName('dropdown_btn'); 
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
}

