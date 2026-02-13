// 1. API URL ko sabse upar rakhein taaki saare functions ise dekh sakein
const API = "https://exam-backend-production-407b.up.railway.app/api";

// Ye variables global hone chahiye taaki har jagah mil sakein
let dashboard, teacherAuth, teacherPanel, studentLoginDiv, studentPanel;
let registerBox, loginBox, forgotBox;

document.addEventListener("DOMContentLoaded", function () {
    // 2. Elements ko assign karein
    dashboard = document.getElementById("dashboard");
    teacherAuth = document.getElementById("teacherAuth");
    teacherPanel = document.getElementById("teacherPanel");
    studentLoginDiv = document.getElementById("studentLogin");
    studentPanel = document.getElementById("studentPanel");

    registerBox = document.getElementById("registerBox");
    loginBox = document.getElementById("loginBox");
    forgotBox = document.getElementById("forgotBox");

    function hideAll() {
        if(dashboard) dashboard.style.display = "none";
        if(teacherAuth) teacherAuth.style.display = "none";
        if(teacherPanel) teacherPanel.style.display = "none";
        if(studentLoginDiv) studentLoginDiv.style.display = "none";
        if(studentPanel) studentPanel.style.display = "none";
    }

    window.openTeacherAuth = function () {
        hideAll();
        teacherAuth.style.display = "block";
    };

    window.openStudentLogin = function () {
        hideAll();
        studentLoginDiv.style.display = "block";
    };

    window.goHome = function () {
        hideAll();
        dashboard.style.display = "grid";
    };
});

// ================= TOGGLE =================
function showLogin() {
    registerBox.style.display = "none";
    forgotBox.style.display = "none";
    loginBox.style.display = "block";
}

function showRegister() {
    loginBox.style.display = "none";
    forgotBox.style.display = "none";
    registerBox.style.display = "block";
}

function showForgot() {
    loginBox.style.display = "none";
    forgotBox.style.display = "block";
}

// ================= AUTH =================
async function registerTeacher() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        console.log("Connecting to:", `${API}/auth/register`);
        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.message || "Registered Successfully!");
            showLogin();
        } else {
            alert(data.message || "Registration Failed");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Backend not connected. Check console.");
    }
}

async function loginTeacher() {
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
            // Dashboard hide karke panel dikhane ka logic
            document.getElementById("teacherAuth").style.display = "none";
            document.getElementById("teacherPanel").style.display = "block";
        } else {
            alert(data.msg || "Login Failed");
        }
    } catch (e) {
        alert("Login Error");
    }
}



// Sidebar kholne aur band karne ke liye
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

// Menu ke buttons par click karne par section badalne ke liye
function showPage(pageId) {
    // Pehle saari window chhupao
    document.getElementById("welcomeNote").style.display = "none";
    document.getElementById("createExam").style.display = "none";
    document.getElementById("addStudent").style.display = "none";
    
    // Jo manga hai use dikhao
    document.getElementById(pageId).style.display = "block";
    
    // Sidebar band kar do section change hone ke baad
    toggleSidebar();
}
