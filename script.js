const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. PAGE LOAD & NAVIGATION LOGIC ---
window.addEventListener("load", handleLocation);
window.addEventListener("hashchange", handleLocation);

function handleLocation() {
    const path = window.location.hash;
    const token = localStorage.getItem("token");

    // Security: Login ke bina dashboard block karna
    if (!token && path !== "" && path !== "#teacherAuth" && path !== "#forgotPass") {
        window.location.hash = "";
        goHome();
        return;
    }

    if (!token) {
        if (path === "#teacherAuth") {
            hideAll();
            document.getElementById("teacherAuth").style.display = "block";
            showLoginBox();
        } else if (path === "#forgotPass") {
            showForgotBox();
        } else {
            goHome();
        }
        return;
    }

    // Dashboard dikhao
    hideAll();
    document.getElementById("teacherPanel").style.display = "block";

    // Sections toggle (Add Student / Create Exam)
    const sections = ['welcomeNote', 'createExam', 'addStudent'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = (path === "#" + id) ? "block" : "none";
        }
    });

    // Default view
    if (path === "" || path === "#welcomeNote") {
        document.getElementById("welcomeNote").style.display = "block";
    }
}

// Sidebar links ke liye function
window.navigateTo = function(hash) {
    window.location.hash = hash;
    closeSidebar(); 
};

window.logout = function() {
    localStorage.removeItem("token");
    window.location.hash = "";
    location.reload();
};
// --- 2. FORGOT PASSWORD ---
window.resetPassword = async function() {
    const email = document.getElementById("resetEmail").value;
    if (!email) return alert("Email fill karein!");

    try {
        const res = await fetch(`${API}/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        alert(data.msg || "Reset link sent!");
        navigateTo("#teacherAuth");
    } catch (err) {
        alert("Server error!");
    }
};

window.showForgotBox = function() {
    hideAll();
    document.getElementById("teacherAuth").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "block";
};

// --- 3. UI HELPERS ---
function showLoginBox() {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
    if (document.getElementById("forgotBox")) document.getElementById("forgotBox").style.display = "none";
}

window.hideAll = function() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("teacherAuth").style.display = "none";
    document.getElementById("teacherPanel").style.display = "none";
};

window.goHome = function() {
    hideAll();
    window.location.hash = "";
    document.getElementById("dashboard").style.display = "flex";
};

window.toggleSidebar = function() {
    const sb = document.getElementById("sidebar");
    sb.style.width = (sb.style.width === "250px") ? "0" : "250px";
};

function closeSidebar() {
    const sb = document.getElementById("sidebar");
    if (sb) sb.style.width = "0";
}

