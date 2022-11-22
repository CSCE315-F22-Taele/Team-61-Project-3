document.addEventListener('DOMContentLoaded', function() {
    //fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAll')   //fetch from server on gcloud
    fetch('http://localhost:5555/getEntreeOptions')
    .then(response => response.json())
    .then(data => loadEntreeOptions(data['data']));

    fetch('http://localhost:5555/getProteinOptions')
    .then(response => response.json())
    .then(data => loadProteinOptions(data['data']));

    fetch('http://localhost:5555/getSideOptions')
    .then(response => response.json())
    .then(data => loadSideOptions(data['data']));
}); 

function createHtmlString(data) {
    var htmlString = "";
    for (var key in data.rows) {
        for (var keyName in data.rows[key]) {
            var item = (data.rows[key])[keyName];
            htmlString += `<button>${item}</button>`;
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

