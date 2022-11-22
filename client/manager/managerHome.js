var btns = document.getElementsByClassName('dropdown_btn'); 
var main_btns = document.getElementsByClassName('dropbtn'); 
var button; 
for (var i = 0; i < btns.length; i++){
    btns[i].onclick = change_color; 
}
for (var i = 0; i < main_btns.length; i++){
    main_btns[i].onclick = change_color; 
}


function change_color(){
    if (this.style.backgroundColor == 'rgb(249, 182, 24)'){
        this.style.backgroundColor = '#1995AA'; 
    }
    else{
        this.style.backgroundColor = '#F9B618'; 
    }
}

