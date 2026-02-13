const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. INITIALIZATION & ROUTING ---

// Jab page load ho ya refresh ho
window.addEventListener("load", handleLocation);

// Jab mobile ka back button ya browser back/forward dabaya jaye
window.addEventListener("hashchange", handleLocation);

function handleLocation() {
    const path = window.location.hash;
    const token = localStorage.getItem("token");

    // Security Check: Agar token nahi hai aur koi andar ke page par jana chahe
    if (!token && path !== "" && path !== "#teacherAuth" && path !== "#studentLogin") {
        window.location.hash = "";
        goHome();
        return;
    }

    // Agar user login nahi hai
    if (!token) {
        if (path === "#teacherAuth") {
            hideAll();
            document.getElementById("teacherAuth").style.display = "block";
        } else {
            goHome();
        }
        return;
    }

    // Agar user login hai, dashboard dikhao
    hideAll();
    document.getElementById("teacherPanel").style.display = "block";

    // Hash ke hisab se sahi section load karo
    if (path === "#addStudent") {
        showSection('addStudent');
    } else if (path === "#createExam") {
        showSection('createExam');
    } else {
        showSection('welcomeNote'); // Default dashboard screen
    }
}

// URL change karne ke liye (Buttons ke liye)
window.navigateTo = function(hash) {
    window.location.hash = hash;
};

// --- 2. AUTHENTICATION FUNCTIONS ---

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
            window.location.hash = "#welcomeNote"; // Dashboard par bhej do
        } else {
            alert(data.msg || "Login Failed");
        }
    } catch (err) {
        alert("Server error! Please try again.");
    }
};

window.logout = function() {
    localStorage.removeItem("token");
    window.location.hash = ""; // URL saaf karo
    location.reload(); // App reset karo
};

// --- 3. UI DISPLAY FUNCTIONS ---

window.showSection = function(id) {
    // Saare dashboard sections ki list
    const sections = ['welcomeNote', 'createExam', 'addStudent'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = "none";
    });
    
    // Target section dikhao
    const target = document.getElementById(id);
    if (target) target.style.display = "block";
};

window.hideAll = function() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("teacherAuth").style.display = "none";
    document.getElementById("teacherPanel").style.display = "none";
    if (document.getElementById("studentLogin")) {
        document.getElementById("studentLogin").style.display = "none";
    }
};

window.goHome = function() {
    hideAll();
    window.location.hash = "";
    document.getElementById("dashboard").style.display = "flex";
};

window.openTeacherAuth = function() {
    hideAll();
    window.location.hash = "#teacherAuth";
    document.getElementById("teacherAuth").style.display = "block";
    showLoginBox();
};

function showLoginBox() {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
}

// --- 4. UTILS & HELPERS ---

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
};

window.toggleSidebar = function() {
    const sb = document.getElementById("sidebar");
    if (sb) {
        sb.style.width = sb.style.width === "250px" ? "0" : "250px";
    }
};
