/**
 * This file is used for the backend functionality needed for adding new items to our database
 * @author Brandon Moon, Roee Belkin
 * @param {*} id holds the id of elements that need their color changed
 */


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
// const link = 'https://project3-7bzcyqo3va-uc.a.run.app'
const link = 'http://localhost:5555';
var item_type = "";
const entreeBtn = document.querySelector('#entreeBtn');
entreeBtn.addEventListener('click', function() {
    item_type = 'entree';
})
const proteinBtn = document.querySelector('#proteinBtn');
proteinBtn.addEventListener('click', function() {
    item_type = 'protein';
})
const sideBtn = document.querySelector('#sideBtn');
sideBtn.addEventListener('click', function() {
    item_type = 'side';
})
const toppingBtn = document.querySelector('#toppingBtn');
toppingBtn.addEventListener('click', function() {
    item_type = 'topping';
})

const submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener('click', function() {
    const item_id = document.getElementById('id').value;
    const item_name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const cost = document.getElementById('cost').value;
    const supply = document.getElementById('supply').value;
    console.log(item_id, item_name, quantity, cost, supply);
    fetch(link + '/insertNewItem', {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 
            item_id : item_id, 
            item_name : item_name,
            item_type : item_type,
            quantity : quantity,
            cost : cost,
            supply : supply
        })
    })
    .then(response => response.json());
    alert("Item added to database successfully!");
})
    
