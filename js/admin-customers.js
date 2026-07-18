// ======================================
// DHUHA ADMIN CUSTOMERS
// ======================================

let customers=[];

document.addEventListener("DOMContentLoaded",()=>{

loadCustomers();

});
async function loadCustomers(){

customers=[

{

name:"Kevin Andrean",

email:"kevin@email.com",

phone:"081234567890",

orders:5,

total:1245000

},

{

name:"Teuku Rizki",

email:"rizki@email.com",

phone:"082234567891",

orders:2,

total:398000

},

{

name:"Ahmad",

email:"ahmad@email.com",

phone:"083345678912",

orders:1,

total:149000

}

];

renderCustomers(customers);

document.getElementById("customer-count").textContent=

customers.length;

}
function renderCustomers(list){

const table=document.getElementById("customer-table");

table.innerHTML="";

list.forEach(customer=>{

table.innerHTML+=`

<tr>

<td>${customer.name}</td>

<td>${customer.email}</td>

<td>${customer.phone}</td>

<td>${customer.orders}</td>

<td>

Rp ${customer.total.toLocaleString("id-ID")}

</td>

<td>

<button class="btn">

Detail

</button>

</td>

</tr>

`;

});

}
const search=document.getElementById("search-customer");

if(search){

search.addEventListener("keyup",()=>{

const keyword=search.value.toLowerCase();

const result=customers.filter(item=>

item.name.toLowerCase().includes(keyword)

||

item.email.toLowerCase().includes(keyword)

||

item.phone.includes(keyword)

);

renderCustomers(result);

});

}
