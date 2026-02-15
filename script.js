const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. NAVIGATION & ROUTING ---
window.addEventListener("load", handleLocation);
window.addEventListener("hashchange", handleLocation);

function handleLocation() {
    const path = window.location.hash || "#dashboard";
    const token = localStorage.getItem("token");
    const stuToken = localStorage.getItem("stuToken");

    hideAll();

    // Sections for Teacher
    const teacherSections = ['welcomeNote', 'createExam', 'addStudent', 'myExams'];
    // Sections for Student
    const studentSections = ['studentDashboard', 'examWindow'];

    // LOGIC: Kaun sa panel dikhana hai
    if (token) {
        // Teacher logged in
        document.getElementById("teacherPanel").style.display = "block";
        teacherSections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (path === "#" + id) ? "block" : "none";
        });
        if (path === "#myExams") loadMyExams();
        if (path === "#dashboard") document.getElementById("welcomeNote").style.display = "block";
    } 
    else if (stuToken) {
        // Student logged in
        document.getElementById("studentPanel").style.display = "block";
        studentSections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (path === "#" + id) ? "block" : "none";
        });
        if (path === "#studentDashboard") loadStudentExams();
    } 
    else {
        // Not logged in (Guest)
        if (path === "#teacherAuth") {
            document.getElementById("teacherAuth").style.display = "block";
            showLogin();
        } else if (path === "#studentLogin") {
            document.getElementById("studentLogin").style.display = "block";
        } else {
            document.getElementById("dashboard").style.display = "flex";
        }
    }
}

window.navigateTo = function(hash) {
    window.location.hash = hash;
};

// --- BACK BUTTON LOGIC ---
window.goBack = function() {
    const token = localStorage.getItem("token");
    const stuToken = localStorage.getItem("stuToken");

    if (token) window.location.hash = "#welcomeNote";
    else if (stuToken) window.location.hash = "#studentDashboard";
    else window.location.hash = "#dashboard";
};

// --- 2. AUTH FUNCTIONS ---

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
        } else { alert(data.msg || "Login Failed"); }
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
        } else { alert(data.msg || "Login Failed"); }
    } catch (err) { alert("Invalid Student Credentials"); }
};

window.logout = function() {
    localStorage.clear();
    window.location.hash = "#dashboard";
    location.reload();
};

// --- 3. TEACHER ACTIONS ---

window.parseBulkQuestions = function() {
    const text = document.getElementById("bulkQuestions").value;
    const lines = text.split("\n");
    const questionsList = document.getElementById("questionsList");
    let html = "";
    let processedQuestions = [];

    lines.forEach((line, index) => {
        if (!line.trim()) return;
        const parts = line.split("|").map(p => p.trim());
        if (parts.length >= 6) {
            processedQuestions.push({
                text: parts[0],
                options: [parts[1], parts[2], parts[3], parts[4]],
                answer: parts[5],
                type: 'mcq'
            });
            html += `<div style="padding:10px; border-bottom:1px solid #ddd;">
                <b>Q${index+1}:</b> ${parts[0]} <br>
                <small>Ans Index: ${parts[5]}</small>
            </div>`;
        }
    });
    questionsList.innerHTML = html;
    window.currentExamQuestions = processedQuestions;
};

window.saveExam = async function() {
    const title = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    if(!window.currentExamQuestions?.length) return alert("Add questions first!");

    try {
        await fetch(`${API}/exams/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, duration, questions: window.currentExamQuestions })
        });
        alert("Exam Published!");
        window.location.hash = "#myExams";
    } catch (err) { alert("Save failed"); }
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
            <div class="exam-card" style="border:1px solid #ddd; padding:15px; margin:10px; border-radius:10px;">
                <h3>${e.title}</h3>
                <p>Questions: ${e.questions.length} | Time: ${e.duration}m</p>
                <button onclick="deleteExam('${e._id}')" style="background:red; color:white;">Delete</button>
            </div>
        `).join('') || "No exams found.";
    } catch (err) { div.innerHTML = "Error loading exams."; }
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
        alert("Student Added Successfully!");
        document.getElementById("studentName").value = "";
        document.getElementById("studentReg").value = "";
    } catch (err) { alert("Failed to add student"); }
};

// --- 4. STUDENT ACTIONS ---

window.loadStudentExams = async function() {
    const div = document.getElementById("availableExams");
    try {
        const res = await fetch(`${API}/exams/all`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("stuToken")}` }
        });
        const exams = await res.json();
        div.innerHTML = exams.map(e => `
            <div class="exam-card" style="border:1px solid #ddd; padding:15px; margin:10px;">
                <h3>${e.title}</h3>
                <button onclick="startExamProcess('${e._id}')">Start Exam</button>
            </div>
        `).join('');
    } catch (err) { div.innerHTML = "No exams available."; }
};

// --- UI HELPERS ---
window.hideAll = function() {
    ["dashboard", "teacherAuth", "teacherPanel", "studentLogin", "studentPanel"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
};
window.showRegister = () => { document.getElementById("loginBox").style.display = "none"; document.getElementById("registerBox").style.display = "block"; };
window.showLogin = () => { document.getElementById("loginBox").style.display = "block"; document.getElementById("registerBox").style.display = "none"; };
