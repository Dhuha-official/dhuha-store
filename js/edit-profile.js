// ======================================
// DHUHA EDIT PROFILE
// ======================================

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const image = document.getElementById("profile-image");
const upload = document.getElementById("profile-upload");

const saveBtn = document.getElementById("save-profile");

let user = null;

// ======================================
// LOAD PROFILE
// ======================================

async function loadProfile(){

    const {
        data:{user:currentUser},
        error
    } = await window.supabaseClient.auth.getUser();

    if(error || !currentUser){

        location.href="login.html";
        return;

    }

    user = currentUser;

    email.value = user.email;

    const {data} =
    await window.supabaseClient
    .from("profiles")
    .select("*")
    .eq("id",user.id)
    .single();

    if(data){

        fullname.value = data.full_name || "";

        phone.value = data.phone || "";

        if(data.avatar_url){

            image.src = data.avatar_url;

        }

    }

}

loadProfile();

// ======================================
// PREVIEW FOTO
// ======================================

upload.onchange = ()=>{

    const file = upload.files[0];

    if(file){

        image.src = URL.createObjectURL(file);

    }

};
