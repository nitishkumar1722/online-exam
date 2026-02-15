const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- REGISTER FUNCTION ---
window.registerTeacher = async function() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    // URL MEIN PASSWORD DIKHEGA
    const url = `${API}/auth/register?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
    console.log("Full Request URL:", url);

    try {
        const res = await fetch(url, { method: "GET" }); // SIRF GET
        const data = await res.json();
        alert(data.message || data.msg);
        if(res.ok) showLogin();
    } catch (err) {
        alert("Server Error! Check Railway Logs.");
    }
};

// --- LOGIN FUNCTION ---
window.loginTeacher = async function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const url = `${API}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
        const res = await fetch(url, { method: "GET" }); // SIRF GET
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.hash = "#welcomeNote";
            alert("Login Successful! Check URL bar.");
        } else {
            alert(data.msg);
        }
    } catch (err) {
        alert("Login Server Error");
    }
};

// --- Baki UI Functions ---
window.showRegister = () => {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
};
window.showLogin = () => {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
};
