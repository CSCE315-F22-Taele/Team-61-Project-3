// document.addEventListener('DOMContentLoaded', function() {
//     // fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAll')   //fetch from server on gcloud
//     fetch('http://localhost:5555/getAllInventory') // fetches the getAll function locally
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }); 

// fetch the GET request for the query that selects all items in the inventory table
function fetchAllInventory() {
    fetch('http://localhost:5555/getAllInventory') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var allButton = document.getElementById('allBtn');
allButton.addEventListener('click', fetchAllInventory);

// fetch the GET request for the query that selects all the protein options in inventory table
function fetchAllProtein() {
    fetch('http://localhost:5555/getAllProteinOptions') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var proteinButton = document.getElementById('proteinBtn');
proteinButton.addEventListener('click', fetchAllProtein);

// fetch the GET request for the query that selects all the protein options in inventory table
function fetchAllSides() {
    fetch('http://localhost:5555/getAllSideOptions') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var sideButton = document.getElementById('sideBtn');
sideButton.addEventListener('click', fetchAllSides);

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
}