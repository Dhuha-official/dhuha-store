// ======================================
// DHUHA EDIT PROFILE
// ======================================

const fullname = document.getElementById("fullname");
const phone = document.getElementById("phone");
const birth = document.getElementById("birth_date");
const email = document.getElementById("email");
const saveBtn = document.getElementById("save-profile");

let currentUser = null;

// ======================================
// LOAD PROFILE
// ======================================

async function loadProfile() {

    const {
        data: { user },
        error
    } = await window.supabaseClient.auth.getUser();

    if (error || !user) {

        location.href = "login.html";
        return;

    }

    currentUser = user;

    email.value = user.email;

    const { data } =
    await window.supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

    if (data) {

        fullname.value = data.name || "";
        phone.value = data.phone || "";
        birth.value = data.birth_date || "";

    }

}

loadProfile();

// ======================================
// SAVE PROFILE
// ======================================

saveBtn.onclick = async () => {

    const { error } =
    await window.supabaseClient
    .from("profiles")
    .upsert({

        id: currentUser.id,

        name: fullname.value.trim(),

        phone: phone.value.trim(),

        birth_date: birth.value,

        updated_at: new Date().toISOString()

    });

    if (error) {

        alert(error.message);
        return;

    }

    alert("Profil berhasil diperbarui.");

};
