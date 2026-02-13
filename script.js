const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. PAGE LOAD LOGIC ---
document.addEventListener("DOMContentLoaded", function () {
    // Check karein ki user pehle se login hai ya reload hua hai
    handleLocation();

    // Agar user URL badalta hai (Hash change), toh page update karein
    window.addEventListener("hashchange", handleLocation);
});

// --- 2. NAVIGATION LOGIC (Refresh ke liye) ---
function handleLocation() {
    const path = window.location.hash; 
    const token = localStorage.getItem("token");

    if (!token && path !== "" && path !== "#teacherAuth" && path !== "#studentLogin") {
        window.location.hash = ""; // URL saaf karo
        goHome(); // Home page par bhej do
        return;
    }

    
    // Agar token nahi hai, toh sirf Login ya Home dikhao
    if (!token) {
        if (path === "#teacherAuth") {
            openTeacherAuth();
        } else if (path === "#studentLogin") {
            openStudentLogin();
        } else {
            goHome();
        }
        return;
    }

    // Agar token hai, toh Dashboard dikhao
    hideAll();
    document.getElementById("teacherPanel").style.display = "block";

    // Hash ke hisaab se sahi section kholo
    if (path === "#addStudent") {
        showSection('addStudent');
    } else if (path === "#createExam") {
        showSection('createExam');
    } else {
        showSection('welcomeNote'); // Default dashboard
    }
}

// URL badalne ke liye function
window.navigateTo = function(hash) {
    window.location.hash = hash;
}

function showSection(id) {
    // Saare sections chhupao
    document.getElementById("welcomeNote").style.display = "none";
    document.getElementById("createExam").style.display = "none";
    document.getElementById("addStudent").style.display = "none";
    
    // Target section dikhao
    if(document.getElementById(id)) {
        document.getElementById(id).style.display = "block";
    }
}

// --- 3. AUTH FUNCTIONS ---

window.openTeacherAuth = function () {
    hideAll();
    window.location.hash = "#teacherAuth";
    document.getElementById("teacherAuth").style.display = "block";
};

window.goHome = function () {
    hideAll();
    window.location.hash = "";
    document.getElementById("dashboard").style.display = "flex";
};

async function loginTeacher() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.hash = "#welcomeNote"; // Dashboard par bhej do
        handleLocation();
    } else {
        alert(data.msg || "Login Failed");
    }
}

window.logout = function() {
    localStorage.removeItem("token");
    window.location.hash = "";
    location.reload();
};

// --- 4. PASSWORD HIDE/SHOW ---
window.togglePass = function(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling; 

    if (input.type === "password") {
        input.type = "text";
        icon.innerText = "🔒"; 
    } else {
        input.type = "password";
        icon.innerText = "👁️"; 
    }
}

// --- 5. HELPERS ---
function hideAll() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("teacherAuth").style.display = "none";
    document.getElementById("teacherPanel").style.display = "none";
    if(document.getElementById("studentLogin")) document.getElementById("studentLogin").style.display = "none";
}

function toggleSidebar() {
    const sb = document.getElementById("sidebar");
    sb.style.width = sb.style.width === "250px" ? "0" : "250px";
}

