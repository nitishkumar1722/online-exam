const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. NAVIGATION SYSTEM ---
function handleLocation() {
    const path = window.location.hash || "#dashboard";
    const token = localStorage.getItem("token");
    const stuToken = localStorage.getItem("stuToken");

    // Pehle sab kuch hide karo
    const allDivs = ["dashboard", "teacherAuth", "teacherPanel", "studentLogin", "studentPanel"];
    allDivs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    // ROUTING LOGIC
    if (path === "#teacherAuth") {
        document.getElementById("teacherAuth").style.display = "block";
        showLogin();
    } 
    else if (path === "#studentLogin") {
        document.getElementById("studentLogin").style.display = "block";
    } 
    else if (token && path.startsWith("#")) {
        // Teacher Sections
        document.getElementById("teacherPanel").style.display = "block";
        const sections = ['welcomeNote', 'createExam', 'addStudent', 'myExams'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (path === "#" + id) ? "block" : "none";
        });
        if (path === "#myExams") loadMyExams();
        if (path === "#dashboard") document.getElementById("welcomeNote").style.display = "block";
    } 
    else if (stuToken && path === "#studentDashboard") {
        document.getElementById("studentPanel").style.display = "block";
        document.getElementById("studentDashboard").style.display = "block";
        loadStudentExams();
    } 
    else {
        // Default Home Dashboard
        document.getElementById("dashboard").style.display = "flex";
    }
}

// Listen for hash changes
window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", handleLocation);

window.navigateTo = function(hash) {
    window.location.hash = hash;
};

window.goBack = function() {
    if (localStorage.getItem("token")) window.location.hash = "#welcomeNote";
    else if (localStorage.getItem("stuToken")) window.location.hash = "#studentDashboard";
    else window.location.hash = "#dashboard";
};

// --- 2. TEACHER & STUDENT AUTH ---

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
            window.location.hash = "#welcomeNote";
        } else { alert(data.msg); }
    } catch (err) { alert("Server error"); }
};

window.studentAuth = async function() {
    const regNo = document.getElementById("stuRegNo").value;
    const password = document.getElementById("stuPass").value;
    try {
        const res = await fetch(`${API}/students/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ regNo, password })
        });
        const data = await res.json();
        if(data.token) {
            localStorage.setItem("stuToken", data.token);
            window.location.hash = "#studentDashboard";
        } else { alert(data.msg); }
    } catch (err) { alert("Student Login Failed"); }
};

window.logout = function() {
    localStorage.clear();
    window.location.hash = "#dashboard";
    location.reload();
};

// --- 3. EXAM LOGIC ---

window.saveExam = async function() {
    const title = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    if(!window.currentExamQuestions?.length) return alert("Add questions!");

    try {
        const res = await fetch(`${API}/exams/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, duration, questions: window.currentExamQuestions })
        });
        if(res.ok) {
            alert("Exam Created!");
            window.location.hash = "#myExams";
        }
    } catch (err) { alert("Save Error"); }
};

window.loadMyExams = async function() {
    const div = document.getElementById("examList");
    if(!div) return;
    div.innerHTML = "Loading...";
    try {
        const res = await fetch(`${API}/exams/my-exams`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const exams = await res.json();
        div.innerHTML = exams.map(e => `
            <div style="border:1px solid #ddd; padding:10px; margin:10px; border-radius:5px;">
                <h3>${e.title}</h3>
                <p>Time: ${e.duration}m | Questions: ${e.questions.length}</p>
                <button onclick="deleteExam('${e._id}')" style="color:red;">Delete</button>
            </div>
        `).join('') || "No exams found.";
    } catch (err) { div.innerHTML = "Error loading."; }
};

window.submitStudent = async function() {
    const name = document.getElementById("studentName").value;
    const regNo = document.getElementById("studentReg").value;
    try {
        await fetch(`${API}/students/add`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ name, regNo })
        });
        alert("Student Added!");
        document.getElementById("studentName").value = "";
        document.getElementById("studentReg").value = "";
    } catch (err) { alert("Add failed"); }
};

// --- 4. HELPERS ---
window.showRegister = () => { document.getElementById("loginBox").style.display = "none"; document.getElementById("registerBox").style.display = "block"; };
window.showLogin = () => { document.getElementById("loginBox").style.display = "block"; document.getElementById("registerBox").style.display = "none"; };
