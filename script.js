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
        const list = document.getElementById("examsList"); // HTML ID check karna
        
        if (exams.length === 0) {
            list.innerHTML = "<p>No exams created yet.</p>";
            return;
        }

        list.innerHTML = exams.map(ex => `
            <div class="exam-card" style="border:1px solid #ccc; padding:15px; margin-bottom:10px; border-radius:8px;">
                <h4 style="margin:0; color:#333;">${ex.examTitle || "Untitled Exam"}</h4> 
                <p style="margin:5px 0; color:#666;">Marks: ${ex.totalMarks} | Time: ${ex.duration}m</p>
                <button onclick="copyExamId('${ex._id}')" class="secondary-btn" style="font-size:12px;">Copy Exam ID</button>
            </div>
        `).join('');
    } catch (err) { 
        console.error("Error loading exams:", err); 
    }
};

// Exam ID copy karne ke liye function
window.copyExamId = (id) => {
    navigator.clipboard.writeText(id);
    alert("Exam ID Copied: " + id);
};


window.submitStudent = async function() {
    const name = document.getElementById("studentName").value;
    const rollNo = document.getElementById("studentReg").value;
    // Hum Exam ID prompt se mang sakte hain ya My Exams list se pick kar sakte hain
    const examId = prompt("Pehle Exam ID paste karein (My Exams se copy karke):");

    if(!name || !rollNo || !examId) return alert("Pura data daalo!");

    const url = `${API}/student/add?name=${encodeURIComponent(name)}&rollNo=${rollNo}&examId=${examId}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        alert(data.msg || data.message);
        
        // Input clear kar do
        document.getElementById("studentName").value = "";
        document.getElementById("studentReg").value = "";
    } catch (err) {
        alert("Server error! Railway check karo.");
    }
};



window.studentAuth = async function() {
    const rollNo = document.getElementById("stuRegNo").value; // HTML ID matching

    if (!rollNo) return alert("Registration Number daalo bhai!");

    const url = `${API}/student/login?rollNo=${rollNo}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
            alert("Welcome " + data.studentName);
            // Student ka data save kar lo taaki exam dikha sako
            localStorage.setItem("studentRoll", rollNo);
            localStorage.setItem("assignedExamId", data.examId);
            
            navigateTo("#studentPanel");
            loadStudentExam(data.examId); // Exam load karne ka function
        } else {
            alert(data.msg);
        }
    } catch (err) {
        alert("Student Portal Error! Check Connection.");
    }
};



// UI Helpers
window.showRegister = () => { document.getElementById("loginBox").style.display="none"; document.getElementById("registerBox").style.display="block"; };
window.showLogin = () => { document.getElementById("loginBox").style.display="block"; document.getElementById("registerBox").style.display="none"; };
window.logout = () => { localStorage.clear(); navigateTo("#dashboard"); };
window.toggleSidebar = () => { const s = document.getElementById("sidebar"); s.style.width = s.style.width === "250px" ? "0" : "250px"; };





