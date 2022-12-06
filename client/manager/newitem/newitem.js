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
            console.log("button with id: ", all_btns[i].id, " should be changing color");
            all_btns[i].style.backgroundColor = '#1995AA'; 
        }
    }
}