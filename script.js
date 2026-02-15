const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. NAVIGATION & ROUTING ---
window.addEventListener("load", handleLocation);
window.addEventListener("hashchange", handleLocation);

function handleLocation() {
    const path = window.location.hash || "#dashboard";
    const token = localStorage.getItem("token");
    const stuToken = localStorage.getItem("stuToken");

    hideAll();

    // 1. Guest Pages Logic
    const guestPages = ["#dashboard", "#teacherAuth", "#studentLogin", "#forgotPass"];
    
    // Teacher Access
    if (token) {
        document.getElementById("teacherPanel").style.display = "block";
        const sections = ['welcomeNote', 'createExam', 'addStudent', 'myExams'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (path === "#" + id) ? "block" : "none";
        });
        if (path === "#myExams") loadMyExams();
        if (path === "#dashboard" || path === "#welcomeNote") {
            document.getElementById("welcomeNote").style.display = "block";
        }
    } 
    // Student Access
    else if (stuToken) {
        document.getElementById("studentPanel").style.display = "block";
        const stuSections = ['studentDashboard', 'examWindow'];
        stuSections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (path === "#" + id) ? "block" : "none";
        });
        if (path === "#studentDashboard") loadStudentExams();
    }
    // Guest Access
    else {
        if (path === "#teacherAuth") {
            document.getElementById("teacherAuth").style.display = "block";
            showLogin();
        } else if (path === "#studentLogin") {
            document.getElementById("studentLogin").style.display = "block";
        } else if (path === "#forgotPass") {
            document.getElementById("teacherAuth").style.display = "block";
            showForgotBox();
        } else {
            document.getElementById("dashboard").style.display = "flex";
        }
    }
}

// Global Navigate with Sidebar Close
window.navigateTo = function(hash) {
    window.location.hash = hash;
    const sb = document.getElementById("sidebar");
    if (sb) sb.style.width = "0"; 
};

// Global Back Button Logic
window.goBack = function() {
    if (localStorage.getItem("token")) window.location.hash = "#welcomeNote";
    else if (localStorage.getItem("stuToken")) window.location.hash = "#studentDashboard";
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
        } else { alert(data.msg || "Invalid Registration"); }
    } catch (err) { alert("Server error! Backend check karein."); }
};

window.logout = function() {
    localStorage.clear();
    window.location.hash = "#dashboard";
    location.reload();
};

// --- 3. TEACHER DASHBOARD LOGIC (EXAMS & STUDENTS) ---

window.saveExam = async function() {
    const title = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    if(!window.currentExamQuestions?.length) return alert("Pehle questions process karein!");

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
    } catch (err) { alert("Error saving exam"); }
};

window.loadMyExams = async function() {
    const list = document.getElementById("examList");
    if (!list) return;
    list.innerHTML = "Loading...";
    try {
        const res = await fetch(`${API}/exams/my-exams`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const exams = await res.json();
        list.innerHTML = exams.length ? exams.map(e => `
            <div class="exam-card" style="border:1px solid #ddd; padding:15px; margin-bottom:10px; border-radius:8px;">
                <h3>${e.title}</h3>
                <p>Time: ${e.duration} mins | Questions: ${e.questions.length}</p>
                <button onclick="deleteExam('${e._id}')" style="background:red; color:white;">Delete</button>
            </div>
        `).join('') : "No exams created yet.";
    } catch (err) { list.innerHTML = "Error loading exams."; }
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
        alert(`Student ${name} Added Successfully!`);
        document.getElementById("studentName").value = "";
        document.getElementById("studentReg").value = "";
    } catch (err) { alert("Error adding student"); }
};

// --- 4. STUDENT EXAM INTERFACE ---

window.loadStudentExams = async function() {
    const list = document.getElementById("availableExams");
    try {
        const res = await fetch(`${API}/exams/all`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("stuToken")}` }
        });
        const exams = await res.json();
        list.innerHTML = exams.map(e => `
            <div class="exam-card" style="border:1px solid #ccc; padding:15px; margin:10px;">
                <h4>${e.title}</h4>
                <button class="primary-btn" onclick="startExamProcess('${e._id}')">Start Exam</button>
            </div>
        `).join('');
    } catch (err) { list.innerHTML = "No exams available."; }
};

window.startExamProcess = async function(id) {
    try {
        const res = await fetch(`${API}/exams/${id}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("stuToken")}` }
        });
        const exam = await res.json();
        document.getElementById("studentDashboard").style.display = "none";
        document.getElementById("examWindow").style.display = "block";
        renderQuestions(exam.questions);
        startTimer(exam.duration);
    } catch (err) { alert("Exam Load Error"); }
};

function renderQuestions(qs) {
    document.getElementById("questionArea").innerHTML = qs.map((q, i) => `
        <div class="q-block" style="margin-bottom:20px;">
            <p><strong>Q${i+1}: ${q.text}</strong></p>
            ${q.options.map((opt, idx) => `<label style="display:block;"><input type="radio" name="q${i}" value="${idx}"> ${opt}</label>`).join('')}
        </div>
    `).join('');
}

function startTimer(mins) {
    let time = mins * 60;
    const timerEl = document.getElementById("timer");
    const interval = setInterval(() => {
        let m = Math.floor(time / 60), s = time % 60;
        timerEl.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (time-- <= 0) { clearInterval(interval); submitExam(); }
    }, 1000);
}

// --- UI HELPERS ---
window.hideAll = function() {
    ["dashboard", "teacherAuth", "teacherPanel", "studentLogin", "studentPanel"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
};

window.showRegister = () => { document.getElementById("loginBox").style.display = "none"; document.getElementById("registerBox").style.display = "block"; };
window.showLogin = () => { document.getElementById("loginBox").style.display = "block"; document.getElementById("registerBox").style.display = "none"; };
