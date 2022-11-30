function fetchAllOrders() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAllOrders')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var allButton = document.getElementById('allBtn');
allButton.addEventListener('click', fetchAllOrders);


function fetchBowlOrders() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getBowlOrders')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var bowlButton = document.getElementById('bowlBtn');
bowlButton.addEventListener('click', fetchBowlOrders);


function fetchNoneOrders() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getNoneOrders')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var noneButton = document.getElementById('noneBtn');
noneButton.addEventListener('click', fetchNoneOrders);


function fetchBurritoOrders() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getBurritoOrders')  
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
var burritoButton = document.getElementById('burritoBtn');
burritoButton.addEventListener('click', fetchBurritoOrders);


function fetchTacoOrders() {
    fetch('https://project3-7bzcyqo3va-uc.a.run.app/getTacoOrders')
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
                dataEntry = new Date(dataEntry);
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

