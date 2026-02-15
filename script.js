const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. CORE NAVIGATION ---
function handleLocation() {
    const path = window.location.hash || "#dashboard";
    const token = localStorage.getItem("token");
    const stuToken = localStorage.getItem("stuToken");

    // Hide all main containers
    ["dashboard", "teacherAuth", "teacherPanel", "studentLogin", "studentPanel"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    if (path === "#teacherAuth") {
        document.getElementById("teacherAuth").style.display = "block";
    } 
    else if (path === "#studentLogin") {
        document.getElementById("studentLogin").style.display = "block";
    } 
    else if (token && path !== "#studentDashboard") {
        document.getElementById("teacherPanel").style.display = "block";
        const sections = ['welcomeNote', 'createExam', 'addStudent', 'myExams'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (path === "#" + id || (path === "#dashboard" && id === 'welcomeNote')) ? "block" : "none";
        });
        if (path === "#myExams") loadMyExams();
    } 
    else if (stuToken) {
        document.getElementById("studentPanel").style.display = "block";
        if (path === "#studentDashboard" || path === "#dashboard") {
            document.getElementById("studentDashboard").style.display = "block";
            document.getElementById("examWindow").style.display = "none";
            loadStudentExams();
        }
    } 
    else {
        document.getElementById("dashboard").style.display = "flex";
    }
}

window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", handleLocation);

window.navigateTo = (hash) => window.location.hash = hash;

window.goBack = () => {
    const token = localStorage.getItem("token");
    const stuToken = localStorage.getItem("stuToken");
    if (token) window.location.hash = "#welcomeNote";
    else if (stuToken) window.location.hash = "#studentDashboard";
    else window.location.hash = "#dashboard";
};

// --- 2. TEACHER & STUDENT AUTH ---
window.loginTeacher = async function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    try {
        // Body hata kar data URL ke peeche "?" ke sath joda
        const res = await fetch(`${API}/auth/login?email=${email}&password=${password}`, {
            method: "GET"
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
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ regNo, password })
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("stuToken", data.token);
            window.location.hash = "#studentDashboard";
        } else { alert(data.msg); }
    } catch (err) { alert("Login Failed"); }
};

window.logout = () => {
    localStorage.clear();
    window.location.hash = "#dashboard";
    location.reload();
};

window.toggleSidebar = function() {
    const sb = document.getElementById("sidebar");
    // Debugging ke liye console log
    console.log("Sidebar current width:", sb.style.width);

    if (sb.style.width === "250px") {
        sb.style.width = "0";
    } else {
        sb.style.width = "250px";
    }
};

// Jab button click ho toh sidebar band bhi hona chahiye
window.navigateTo = function(hash) {
    window.location.hash = hash;
    const sb = document.getElementById("sidebar");
    if (sb) sb.style.width = "0"; // Automatic close after selection
};

// --- 3. EXAM & STUDENT MGMT ---
window.parseBulkQuestions = function() {
    const text = document.getElementById("bulkQuestions").value;
    const lines = text.split("\n");
    let html = "";
    window.currentExamQuestions = [];
    lines.forEach((line, i) => {
        const p = line.split("|").map(s => s.trim());
        if (p.length >= 6) {
            window.currentExamQuestions.push({ text: p[0], options: [p[1], p[2], p[3], p[4]], answer: p[5] });
            html += `<p>Q${i+1}: ${p[0]} (Ans Index: ${p[5]})</p>`;
        }
    });
    document.getElementById("questionsList").innerHTML = html;
};

window.saveExam = async function() {
    const title = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    try {
        await fetch(`${API}/exams/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, duration, questions: window.currentExamQuestions })
        });
        alert("Exam Saved!");
        window.location.hash = "#myExams";
    } catch (err) { alert("Error saving"); }
};

window.loadMyExams = async function() {
    const div = document.getElementById("examList");
    try {
        const res = await fetch(`${API}/exams/my-exams`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const exams = await res.json();
        div.innerHTML = exams.map(e => `
            <div class="exam-card" style="border:1px solid #ddd; padding:10px; margin:5px;">
                <h4>${e.title}</h4>
                <p>${e.questions.length} Questions</p>
            </div>
        `).join('') || "No exams.";
    } catch (err) { div.innerHTML = "Error loading."; }
};

window.loadStudentExams = async function() {
    const div = document.getElementById("availableExams");
    try {
        const res = await fetch(`${API}/exams/all`);
        const exams = await res.json();
        div.innerHTML = exams.map(e => `
            <div class="exam-card" style="border:1px solid #ddd; padding:15px; margin:10px;">
                <h3>${e.title}</h3>
                <button onclick="alert('Exam Started')">Start Exam</button>
            </div>
        `).join('') || "No exams available.";
    } catch (err) { div.innerHTML = "Error fetching exams."; }
};

window.submitStudent = async function() {
    const name = document.getElementById("studentName").value;
    const regNo = document.getElementById("studentReg").value;
    try {
        await fetch(`${API}/students/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ name, regNo })
        });
        alert("Student Added Successfully!");
    } catch (err) { alert("Error adding student"); }
};

// --- UI HELPERS ---
window.showRegister = () => { document.getElementById("loginBox").style.display="none"; document.getElementById("registerBox").style.display="block"; };
window.showLogin = () => { document.getElementById("loginBox").style.display="block"; document.getElementById("registerBox").style.display="none"; };
window.toggleSidebar = () => { const s = document.getElementById("sidebar"); s.style.width = s.style.width === "250px" ? "0" : "250px"; };
window.togglePass = (id) => { const x = document.getElementById(id); x.type = x.type === "password" ? "text" : "password"; };



