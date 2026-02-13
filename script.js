const API = "https://exam-backend-production-407b.up.railway.app/api";

// Elements
const dashboard = document.getElementById("dashboard");
const teacherAuth = document.getElementById("teacherAuth");
const teacherPanel = document.getElementById("teacherPanel");
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

function hideAll() {
    dashboard.style.display = "none";
    teacherAuth.style.display = "none";
    teacherPanel.style.display = "none";
}

window.goHome = function() {
    hideAll();
    dashboard.style.display = "flex";
}

window.openTeacherAuth = function() {
    hideAll();
    teacherAuth.style.display = "block";
    showLogin();
}

function showLogin() {
    loginBox.style.display = "block";
    registerBox.style.display = "none";
}

function showRegister() {
    loginBox.style.display = "none";
    registerBox.style.display = "block";
}

// TOGGLE SIDEBAR
function toggleSidebar() {
    const sb = document.getElementById("sidebar");
    sb.style.width = sb.style.width === "250px" ? "0" : "250px";
}

// SHOW PAGE
function showPage(pageId) {
    document.getElementById("createExam").style.display = "none";
    document.getElementById("addStudent").style.display = "none";
    document.getElementById(pageId).style.display = "block";
    toggleSidebar();
}

// LOGIN TEACHER
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
            hideAll();
            teacherPanel.style.display = "block"; // Login ke baad Dashboard dikhao
            alert("Login Successful!");
        } else {
            alert(data.msg || "Invalid Credentials");
        }
    } catch (err) {
        alert("Backend not connected");
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("token");
    location.reload(); // Page refresh karke wapas home par
}

// REGISTER TEACHER (Pehle wala function)
async function registerTeacher() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    try {
        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        alert(data.message || "Registered!");
        showLogin();
    } catch (err) { alert("Error"); }
}


function togglePass(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling; // Span icon ko pakdega

    if (input.type === "password") {
        input.type = "text";
        icon.innerText = "🔒"; // Password dikhne par lock icon
    } else {
        input.type = "password";
        icon.innerText = "👁️"; // Password hide hone par eye icon
    }
}
