const addressInput = document.getElementById("addressSearch");
const addressResult = document.getElementById("addressResult");

const city = document.getElementById("city");
const province = document.getElementById("province");
const postcode = document.getElementById("postcode");

let timer = null;
addressInput.addEventListener("keyup", () => {

clearTimeout(timer);

const keyword = addressInput.value.trim();

if(keyword.length < 3){

addressResult.style.display="none";

addressResult.innerHTML="";

return;

}

timer = setTimeout(searchAddress,500);

});
async function searchAddress(){

const keyword = addressInput.value.trim();

const url =
`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(keyword)}&countrycodes=id&limit=5`;

const response = await fetch(url);

const data = await response.json();

showAddress(data);

    }
function showAddress(data){

addressResult.innerHTML="";

addressResult.style.display="block";

data.forEach(item=>{

addressResult.innerHTML += `

<div class="address-item"

onclick="selectAddress('${item.display_name.replace(/'/g,"")}')">

${item.display_name}

</div>

`;

});

}
function selectAddress(address){

addressInput.value = address;

addressResult.innerHTML = "";

addressResult.style.display = "none";

loadAddressDetail(address);

}
async function loadAddressDetail(address){

const url =
`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(address)}&addressdetails=1&limit=1`;

const response = await fetch(url);

const data = await response.json();

if(data.length === 0) return;

const detail = data[0].address;

city.value =
detail.city ||
detail.town ||
detail.county ||
detail.municipality ||
"";

province.value =
detail.state || "";

postcode.value =
detail.postcode || "";

}
document.addEventListener("click",(e)=>{

if(
!addressResult.contains(e.target) &&
e.target !== addressInput
){

addressResult.style.display="none";

}

});
