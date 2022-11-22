document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5555/getEntreeOptions')
    //fetch('https://project3-7bzcyqo3va-uc.a.run.app/getEntreeOptions')  
    .then(response => response.json())
    .then(data => loadEntreeOptions(data['data']));

    fetch('http://localhost:5555/getProteinOptions')
    //fetch('https://project3-7bzcyqo3va-uc.a.run.app/getProteinOptions')  
    .then(response => response.json())
    .then(data => loadProteinOptions(data['data']));

    fetch('http://localhost:5555/getSideOptions')
    //fetch('https://project3-7bzcyqo3va-uc.a.run.app/getSideOptions')   
    .then(response => response.json())
    .then(data => loadSideOptions(data['data']));
}); 

function createHtmlString(data) {
    var htmlString = "";
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            htmlString += `<button id="${item}" onclick="changeBtnColor('${item}')">${item}</button>`;
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

function changeBtnColor(id) {
    if (document.getElementById(id).style.backgroundColor === "#008000") {
        document.getElementById(id).style.backgroundColor = "";
    } else {
        document.getElementById(id).style.backgroundColor = "#008000";
    }

}

