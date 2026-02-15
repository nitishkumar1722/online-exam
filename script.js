const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- NAVIGATION SYSTEM ---
window.navigateTo = function(hash) {
    window.location.hash = hash;
};

function handleLocation() {
    const path = window.location.hash || "#dashboard";
    
    // Sab sections ko hide karo
    document.querySelectorAll('#dashboard, #teacherAuth, #teacherPanel, #studentLogin, #studentPanel, .page-section').forEach(el => {
        el.style.display = "none";
    });

    if (path === "#dashboard") {
        document.getElementById("dashboard").style.display = "grid";
    } else if (path === "#teacherAuth") {
        document.getElementById("teacherAuth").style.display = "block";
    } else if (path === "#studentLogin") {
        document.getElementById("studentLogin").style.display = "block";
    } else if (["#welcomeNote", "#createExam", "#myExams", "#addStudent"].includes(path)) {
        document.getElementById("teacherPanel").style.display = "block";
        document.querySelector(path).style.display = "block";
        if(path === "#myExams") loadMyExams();
    }
}

window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", handleLocation);

// --- TEACHER FUNCTIONS (GET METHOD) ---

window.registerTeacher = async function() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const url = `${API}/auth/register?email=${email}&password=${password}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        alert(data.message || data.error);
        if(res.ok) showLogin();
    } catch (err) { alert("Server Down"); }
};

window.loginTeacher = async function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const url = `${API}/auth/login?email=${email}&password=${password}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("userEmail", email);
            navigateTo("#welcomeNote");
        } else { alert(data.msg); }
    } catch (err) { alert("Login Error"); }
};

window.createExam = async function() {
    const examName = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    const totalMarks = document.getElementById("totalMarks") ? document.getElementById("totalMarks").value : "100";
    const teacherEmail = localStorage.getItem("userEmail");

    const url = `${API}/exam/create?examName=${examName}&duration=${duration}&totalMarks=${totalMarks}&teacherEmail=${teacherEmail}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        alert(data.message);
        navigateTo("#myExams");
    } catch (err) { alert("Exam Create Error"); }
};


window.createBulkExam = async function() {
    const examTitle = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    const totalMarks = document.getElementById("totalMarks").value;
    const rawQuestions = document.getElementById("bulkQuestions").value;
    const teacherEmail = localStorage.getItem("userEmail");

    if(!examTitle || !rawQuestions) return alert("Kuch toh likho bhai!");

    // Line breaks ko separator mein badlo
    const questionsData = rawQuestions.trim().split("\n").join("###");

    const url = `${API}/exam/create?examTitle=${encodeURIComponent(examTitle)}&duration=${duration}&totalMarks=${totalMarks}&teacherEmail=${teacherEmail}&questionsData=${encodeURIComponent(questionsData)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        // data.msg ya data.message dono check kar lo
        alert(data.msg || data.message || "Unknown Response"); 
        if(res.ok) navigateTo("#myExams");
    } catch (err) {
        alert("Network Error: Backend crashed!");
    }
};



window.loadMyExams = async function() {
    const email = localStorage.getItem("userEmail");
    const url = `${API}/exam/my-exams?teacherEmail=${email}`;

    try {
        const res = await fetch(url);
        const exams = await res.json();
        const list = document.getElementById("examsList");
        list.innerHTML = exams.map(ex => `
            <div style="border:1px solid #ccc; padding:10px; margin:5px;">
                <h4>${ex.examName}</h4>
                <p>Marks: ${ex.totalMarks} | Time: ${ex.duration}m</p>
            </div>
        `).join('');
    } catch (err) { console.log(err); }
};

// UI Helpers
window.showRegister = () => { document.getElementById("loginBox").style.display="none"; document.getElementById("registerBox").style.display="block"; };
window.showLogin = () => { document.getElementById("loginBox").style.display="block"; document.getElementById("registerBox").style.display="none"; };
window.logout = () => { localStorage.clear(); navigateTo("#dashboard"); };
window.toggleSidebar = () => { const s = document.getElementById("sidebar"); s.style.width = s.style.width === "250px" ? "0" : "250px"; };


