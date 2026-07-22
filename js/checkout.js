// ======================================
// DHUHA CHECKOUT FINAL
// ======================================

const postcode = document.getElementById("postcode");

if(postcode){

    postcode.addEventListener("input",function(){

        this.value=this.value.replace(/\D/g,"");

    });

}

// ======================================
// LOAD CART
// ======================================

let buyNow =
JSON.parse(localStorage.getItem("buyNow"));

let cart =
buyNow && buyNow.length
? buyNow
: JSON.parse(localStorage.getItem("cart")) || [];

// ======================================
// ELEMENT
// ======================================

const checkoutList =
document.getElementById("checkout-list");

const subtotalElement =
document.getElementById("subtotal");

const shippingCostElement =
document.getElementById("shippingCost");

const shippingTotalElement =
document.getElementById("shippingTotal");

const shippingEstimateElement =
document.getElementById("shippingEstimate");

const totalElement =
document.getElementById("checkout-total");

const checkoutBtn =
document.getElementById("checkoutBtn");

let subtotal = 0;
let shippingCost = 0;
let shippingEstimate = "";
// ======================================
// RENDER CHECKOUT
// ======================================

function renderCheckout(){

    if(!checkoutList) return;

    checkoutList.innerHTML="";

    subtotal=0;

    if(cart.length===0){

        checkoutList.innerHTML=`

<p style="text-align:center;padding:40px;">

Keranjang kosong.

</p>

`;

        subtotalElement.innerHTML="Rp 0";
        totalElement.innerHTML="Rp 0";

        if(checkoutBtn){

            checkoutBtn.disabled=true;

        }

        return;

    }

    if(checkoutBtn){

        checkoutBtn.disabled=false;

    }

    cart.forEach(item=>{

        const qty=item.qty||1;

        const total=
        qty*Number(item.price);

        subtotal+=total;

        checkoutList.innerHTML+=`

<div class="checkout-item">

<div>

<strong>${item.name}</strong>

<br>

<small>

${qty} x Rp ${Number(item.price).toLocaleString("id-ID")}

${item.size ? "<br>Ukuran : "+item.size : ""}

${item.color ? "<br>Warna : "+item.color : ""}

</small>

</div>

<strong>

Rp ${total.toLocaleString("id-ID")}

</strong>

</div>

`;

    });

    subtotalElement.innerHTML=

    "Rp "+subtotal.toLocaleString("id-ID");

    updateShipping();

}

// ======================================
// ONGKIR
// ======================================

function updateShipping(){

    const courier=

    document.querySelector(

    "input[name='shipping']:checked"

    ).value;

    switch(courier){

        case "JNE":

            shippingCost=28000;

            shippingEstimate="2-4 Hari";

            break;

        case "J&T":

            shippingCost=30500;

            shippingEstimate="1-3 Hari";

            break;

        case "SiCepat":

            shippingCost=32000;

            shippingEstimate="2-3 Hari";

            break;

    }

    shippingCostElement.innerHTML=

    "Rp "+shippingCost.toLocaleString("id-ID");

    shippingTotalElement.innerHTML=

    "Rp "+shippingCost.toLocaleString("id-ID");

    shippingEstimateElement.innerHTML=

    shippingEstimate;

    totalElement.innerHTML=

    "Rp "+(subtotal+shippingCost).toLocaleString("id-ID");

}

document

.querySelectorAll("input[name='shipping']")

.forEach(item=>{

    item.addEventListener(

        "change",

        updateShipping

    );

});
// ======================================
// CHECKOUT
// ======================================

checkoutBtn.onclick = async () => {

    const customer_name =
    document.getElementById("fullname").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const province =
    document.getElementById("province").value.trim();

    const city =
    document.getElementById("city").value.trim();

    const postcode =
    document.getElementById("postcode").value.trim();

    const address =
    document.getElementById("detailAddress").value.trim();

    if(
        !customer_name ||
        !phone ||
        !province ||
        !city ||
        !postcode ||
        !address
    ){

        alert("Mohon lengkapi data penerima.");

        return;

    }

    const courier =
    document.querySelector(
        "input[name='shipping']:checked"
    ).value;

    const payment =
    document.querySelector(
        "input[name='payment']:checked"
    ).value;

    try{

        for(const item of cart){

            const { error } =
            await window.supabaseClient
            .from("orders")
            .insert({

                product_id:item.id,

                product_name:item.name,

                customer_name:customer_name,

                phone:phone,

                province:province,

                city:city,

                postcode:postcode,

                address:address,

                price:item.price,

                quantity:item.qty,

                total:item.price*item.qty,

                courier:courier,

                payment:payment,

                status:"Menunggu Pembayaran"

            });

            if(error) throw error;

        }

        localStorage.setItem(

            "buyNow",

            JSON.stringify(cart)

        );

        localStorage.removeItem("cart");

        if(typeof updateCartBadge==="function"){

            updateCartBadge();

        }

        location.href="payment.html";

    }catch(err){

        console.error(err);

        alert(err.message);

    }

};
// ======================================
// CLEAR BUY NOW SETELAH PEMBAYARAN
// ======================================

window.addEventListener("pageshow", () => {

    if (!performance.navigation ||
        performance.navigation.type !== 2) {

        localStorage.removeItem("buyNow");

    }

});

// ======================================
// AUTO REFRESH ONGKIR
// ======================================

document.querySelectorAll(
"input[name='shipping']"
).forEach(item => {

    item.addEventListener("change", () => {

        updateShipping();

    });

});

// ======================================
// LOAD
// ======================================

renderCheckout();

// ======================================
// UPDATE ICON
// ======================================

if (typeof lucide !== "undefined") {

    lucide.createIcons();

}
