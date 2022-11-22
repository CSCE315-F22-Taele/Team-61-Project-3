document.addEventListener('DOMContentLoaded', function() {
    //fetch('https://project3-7bzcyqo3va-uc.a.run.app/getAll')   //fetch from server on gcloud
    fetch('http://localhost:5555/getAll') 
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}); 

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