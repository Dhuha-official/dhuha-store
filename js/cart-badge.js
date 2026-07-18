function updateCartBadge(){

const badge = document.getElementById("cart-count");

if(!badge) return;

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item=>{

total += item.qty;

});

badge.innerText = total;

if(total===0){

badge.style.display="none";

}else{

badge.style.display="flex";

}

}

updateCartBadge();
