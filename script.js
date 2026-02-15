const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- REGISTER FUNCTION ---
const API = "https://exam-backend-production-407b.up.railway.app/api";

window.registerTeacher = async function() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    // URL mein password attach kiya
    const url = `${API}/auth/register?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
    console.log("Registering via:", url);

    try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        alert(data.message || data.error);
        if(res.ok) showLogin();
    } catch (err) {
        alert("Server Error! Railway Logs check karo.");
    }
};

window.loginTeacher = async function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const url = `${API}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.hash = "#welcomeNote";
        } else {
            alert(data.msg);
        }
    } catch (err) {
        alert("Login Error");
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

