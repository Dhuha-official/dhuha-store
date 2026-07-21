let addresses =
JSON.parse(localStorage.getItem("addresses")) || [];

const list =
document.getElementById("address-list");

function renderAddress(){

    list.innerHTML = "";

    if(addresses.length===0){

        list.innerHTML=`

        <div class="empty-address">

            <h3>Belum ada alamat</h3>

            <p>Tambahkan alamat pengiriman.</p>

        </div>

        `;

        return;

    }

    addresses.forEach((item,index)=>{

        list.innerHTML+=`

        <div class="address-card">

            <h3>${item.name}</h3>

            <p>${item.phone}</p>

            <p>

            ${item.address}

            </p>

            <p>

            ${item.city},

            ${item.province}

            ${item.postcode}

            </p>

            <div class="address-action">

                <button onclick="editAddress(${index})">

                Edit

                </button>

                <button onclick="deleteAddress(${index})">

                Hapus

                </button>

            </div>

        </div>

        `;

    });

}

function deleteAddress(index){

    addresses.splice(index,1);

    localStorage.setItem(
        "addresses",
        JSON.stringify(addresses)
    );

    renderAddress();

}

function editAddress(index){

    const data=addresses[index];

    const name=prompt("Nama",data.name);
    const phone=prompt("No WA",data.phone);
    const province=prompt("Provinsi",data.province);
    const city=prompt("Kota",data.city);
    const postcode=prompt("Kode Pos",data.postcode);
    const address=prompt("Alamat",data.address);

    addresses[index]={

        name,
        phone,
        province,
        city,
        postcode,
        address

    };

    localStorage.setItem(
        "addresses",
        JSON.stringify(addresses)
    );

    renderAddress();

}

document.getElementById("addAddressBtn").onclick=()=>{

    const name=prompt("Nama");
    const phone=prompt("Nomor WA");
    const province=prompt("Provinsi");
    const city=prompt("Kota");
    const postcode=prompt("Kode Pos");
    const address=prompt("Alamat");

    if(!name) return;

    addresses.push({

        name,
        phone,
        province,
        city,
        postcode,
        address

    });

    localStorage.setItem(
        "addresses",
        JSON.stringify(addresses)
    );

    renderAddress();

};

renderAddress();
