document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    try {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            alert(error.message);
            return;
        }

    
        window.location.href = "account.html";

    } catch (err) {
        alert(err.message);
    }
});
