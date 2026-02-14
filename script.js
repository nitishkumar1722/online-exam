const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. NAVIGATION & ROUTING ---
window.addEventListener("load", handleLocation);
window.addEventListener("hashchange", handleLocation);

function handleLocation() {
    const path = window.location.hash || "#dashboard";
    const token = localStorage.getItem("token");

    // Guest Pages (Bina login wale)
    const guestPages = ["#dashboard", "#teacherAuth", "#studentLogin", "#forgotPass"];

    if (!token && !guestPages.includes(path)) {
        window.location.hash = "#dashboard";
        return;
    }

    hideAll();

    if (token) {
        // Teacher Dashboard View
        document.getElementById("teacherPanel").style.display = "block";
        const sections = ['createExam', 'addStudent'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (path === "#" + id) ? "block" : "none";
        });
        // Default section agar dashboard par ho
        if (path === "#dashboard" || path === "#teacherAuth") {
            window.location.hash = "#createExam";
        }
    } else {
        // Auth Pages View
        if (path === "#teacherAuth") {
            document.getElementById("teacherAuth").style.display = "block";
            showLogin();
        } else if (path === "#forgotPass") {
            document.getElementById("teacherAuth").style.display = "block";
            showForgotBox();
        } else if (path === "#studentLogin") {
            // Student login div handle karein agar hai
        } else {
            document.getElementById("dashboard").style.display = "flex";
        }
    }
}

window.navigateTo = function(hash) {
    window.location.hash = hash;
    const sb = document.getElementById("sidebar");
    if (sb) sb.style.width = "0"; 
};

// --- 2. TEACHER AUTH FUNCTIONS ---

window.loginTeacher = async function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.hash = "#createExam";
        } else { alert(data.msg || "Login Failed"); }
    } catch (err) { alert("Server error"); }
};

window.registerTeacher = async function() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    try {
        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        alert(data.msg || "Registration Successful");
        showLogin();
    } catch (err) { alert("Server error"); }
};

window.logout = function() {
    localStorage.removeItem("token");
    window.location.hash = "#dashboard";
    location.reload();
};

// --- 3. UI HELPERS ---

window.togglePass = function(id) {
    const x = document.getElementById(id);
    x.type = x.type === "password" ? "text" : "password";
};

window.showRegister = () => {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
};

window.showLogin = () => {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "none";
};

window.showForgotBox = () => {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "block";
};

window.hideAll = function() {
    ["dashboard", "teacherAuth", "teacherPanel"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
};

window.goHome = () => window.location.hash = "#dashboard";

window.toggleSidebar = function() {
    const sb = document.getElementById("sidebar");
    sb.style.width = (sb.style.width === "250px") ? "0" : "250px";
};
