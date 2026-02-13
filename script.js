const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. NAVIGATION CONTROL (Back Button & Refresh Fix) ---
window.addEventListener("load", handleLocation);
window.addEventListener("hashchange", handleLocation);

function handleLocation() {
    const path = window.location.hash;
    const token = localStorage.getItem("token");

    // Agar token nahi hai aur koi andar jana chahe (Security)
    if (!token && path !== "" && path !== "#teacherAuth" && path !== "#studentLogin" && path !== "#forgotPass") {
        window.location.hash = "";
        goHome();
        return;
    }

    // Login se pehle wale pages
    if (!token) {
        if (path === "#teacherAuth") {
            hideAll();
            document.getElementById("teacherAuth").style.display = "block";
            showLoginBox();
        } else if (path === "#studentLogin") {
            hideAll();
            if(document.getElementById("studentLogin")) document.getElementById("studentLogin").style.display = "block";
        } else if (path === "#forgotPass") {
            showForgotBox();
        } else {
            goHome();
        }
        return;
    }

    // Login ke baad (Teacher Dashboard)
    hideAll();
    document.getElementById("teacherPanel").style.display = "block";

    const sections = ['welcomeNote', 'createExam', 'addStudent'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (path === "#" + id) ? "block" : "none";
    });

    if (path === "" || path === "#welcomeNote") {
        document.getElementById("welcomeNote").style.display = "block";
    }
}

// --- 2. GLOBAL FUNCTIONS (Buttons ke liye) ---

window.navigateTo = function(hash) {
    window.location.hash = hash;
    const sb = document.getElementById("sidebar");
    if (sb) sb.style.width = "0"; // Sidebar band karein
};

window.openTeacherAuth = function() {
    window.navigateTo("#teacherAuth");
};

window.openStudentLogin = function() {
    window.navigateTo("#studentLogin");
};

window.goHome = function() {
    hideAll();
    window.location.hash = "";
    document.getElementById("dashboard").style.display = "flex";
};

window.logout = function() {
    localStorage.removeItem("token");
    window.location.hash = "";
    location.reload();
};

// --- 3. UI HELPERS ---

window.hideAll = function() {
    const ids = ["dashboard", "teacherAuth", "teacherPanel", "studentLogin"];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
};

window.toggleSidebar = function() {
    const sb = document.getElementById("sidebar");
    if (sb) sb.style.width = (sb.style.width === "250px") ? "0" : "250px";
};

function showLoginBox() {
    if(document.getElementById("loginBox")) document.getElementById("loginBox").style.display = "block";
    if(document.getElementById("registerBox")) document.getElementById("registerBox").style.display = "none";
    if(document.getElementById("forgotBox")) document.getElementById("forgotBox").style.display = "none";
}

function showForgotBox() {
    hideAll();
    document.getElementById("teacherAuth").style.display = "block";
    if(document.getElementById("loginBox")) document.getElementById("loginBox").style.display = "none";
    if(document.getElementById("forgotBox")) document.getElementById("forgotBox").style.display = "block";
}
