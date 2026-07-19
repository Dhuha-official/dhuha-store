let addressData = {};

const province = document.getElementById("province");
const city = document.getElementById("city");
const district = document.getElementById("district");
const village = document.getElementById("village");
const postcode = document.getElementById("postcode");

async function loadAddress(){

const response = await fetch("data/address.json");

addressData = await response.json();

loadProvince();

}

loadAddress();
function loadProvince(){

province.innerHTML =
'<option value="">Pilih Provinsi</option>';

for(const item in addressData){

province.innerHTML +=

`<option value="${item}">${item}</option>`;

}

}
province.onchange = function(){

city.innerHTML =
'<option value="">Pilih Kota / Kabupaten</option>';

district.innerHTML =
'<option value="">Pilih Kecamatan</option>';

village.innerHTML =
'<option value="">Pilih Kelurahan</option>';

postcode.value="";

const data = addressData[this.value];

for(const item in data){

city.innerHTML +=

`<option value="${item}">${item}</option>`;

}

}
city.onchange = function(){

district.innerHTML =
'<option value="">Pilih Kecamatan</option>';

village.innerHTML =
'<option value="">Pilih Kelurahan</option>';

postcode.value="";

const data =
addressData[province.value][this.value];

for(const item in data){

district.innerHTML +=

`<option value="${item}">${item}</option>`;

}

}
district.onchange = function(){

village.innerHTML =
'<option value="">Pilih Kelurahan</option>';

postcode.value="";

const data =
addressData[province.value][city.value][this.value];

for(const item in data){

village.innerHTML +=

`<option value="${item}">${item}</option>`;

}

}
village.onchange = function(){

postcode.value =

addressData
[province.value]
[city.value]
[district.value]
[this.value];

}
