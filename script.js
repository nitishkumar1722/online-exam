const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- NAVIGATION SYSTEM ---
window.navigateTo = function(hash) {
    window.location.hash = hash;
};

function handleLocation() {
    const path = window.location.hash || "#dashboard";
    
    // Sab sections ko hide karo
    const sections = ['#dashboard', '#teacherAuth', '#teacherPanel', '#studentLogin', '#studentPanel', '#examWindow'];
    sections.forEach(id => {
        const el = document.querySelector(id);
        if (el) el.style.display = "none";
    });
    
    document.querySelectorAll('.page-section').forEach(el => el.style.display = "none");

    if (path === "#dashboard") {
        document.getElementById("dashboard").style.display = "grid";
    } 
    else if (path === "#teacherAuth") {
        document.getElementById("teacherAuth").style.display = "block";
    } 
    else if (path === "#studentLogin") {
        document.getElementById("studentLogin").style.display = "block";
    } 
    else if (path === "#studentPanel") {
        document.getElementById("studentPanel").style.display = "block";
        const savedId = localStorage.getItem("assignedExamId");
        if(savedId) displayStudentDashboard(savedId);
    }
    else if (path === "#examWindow") {
        document.getElementById("examWindow").style.display = "block";
    }
    else if (["#welcomeNote", "#createExam", "#myExams", "#addStudent"].includes(path)) {
        document.getElementById("teacherPanel").style.display = "block";
        const targetSection = document.querySelector(path);
        if (targetSection) targetSection.style.display = "block";
        if (path === "#myExams") loadMyExams();
    }
}

window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", handleLocation);

// --- TEACHER FUNCTIONS ---
window.registerTeacher = async function() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    try {
        const res = await fetch(`${API}/auth/register?email=${email}&password=${password}`);
        const data = await res.json();
        alert(data.message || data.error);
        if(res.ok) showLogin();
    } catch (err) { alert("Server Down"); }
};

window.loginTeacher = async function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        const res = await fetch(`${API}/auth/login?email=${email}&password=${password}`);
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("userEmail", email);
            navigateTo("#welcomeNote");
        } else { alert(data.msg); }
    } catch (err) { alert("Login Error"); }
};

window.createBulkExam = async function() {
    const examTitle = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    const totalMarks = document.getElementById("totalMarks").value;
    const rawQuestions = document.getElementById("bulkQuestions").value;
    const teacherEmail = localStorage.getItem("userEmail");

    if(!examTitle || !rawQuestions) return alert("Details bhariye!");

    const questionsData = rawQuestions.trim().split("\n").join("###");
    const url = `${API}/exam/create?examTitle=${encodeURIComponent(examTitle)}&duration=${duration}&totalMarks=${totalMarks}&teacherEmail=${teacherEmail}&questionsData=${encodeURIComponent(questionsData)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        alert(data.msg || data.message); 
        if(res.ok) navigateTo("#myExams");
    } catch (err) { alert("Network Error: Backend issues"); }
};

window.loadMyExams = async function() {
    const email = localStorage.getItem("userEmail");
    try {
        const res = await fetch(`${API}/exam/my-exams?teacherEmail=${email}`);
        const exams = await res.json();
        const list = document.getElementById("examsList");
        if (exams.length === 0) {
            list.innerHTML = "<p>No exams created yet.</p>";
            return;
        }
        list.innerHTML = exams.map(ex => `
            <div class="exam-card" style="border:1px solid #ccc; padding:15px; margin-bottom:10px; border-radius:8px;">
                <h4>${ex.examTitle || "Untitled"}</h4> 
                <p>Marks: ${ex.totalMarks} | Time: ${ex.duration}m</p>
                <button onclick="copyExamId('${ex._id}')" class="secondary-btn">Copy Exam ID</button>
            </div>
        `).join('');
    } catch (err) { console.error(err); }
};

window.copyExamId = (id) => {
    navigator.clipboard.writeText(id);
    alert("ID Copied!");
};

window.submitStudent = async function() {
    const name = document.getElementById("studentName").value;
    const rollNo = document.getElementById("studentReg").value;
    const examId = prompt("Enter Exam ID:");
    if(!name || !rollNo || !examId) return alert("Missing fields!");

    try {
        const res = await fetch(`${API}/student/add?name=${encodeURIComponent(name)}&rollNo=${rollNo}&examId=${examId}`);
        const data = await res.json();
        alert(data.msg || data.message);
    } catch (err) { alert("Error adding student"); }
};

// --- STUDENT FUNCTIONS ---
window.studentAuth = async function() {
    const rollNo = document.getElementById("stuRegNo").value;
    try {
        const res = await fetch(`${API}/student/login?rollNo=${rollNo}`);
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("assignedExamId", data.examId);
            localStorage.setItem("studentName", data.studentName);
            navigateTo("#studentPanel");
            displayStudentDashboard(data.examId);
        } else { alert(data.msg); }
    } catch (err) { alert("Server Down!"); }
};

window.displayStudentDashboard = async function(examId) {
    const container = document.getElementById("availableExams");
    try {
        const res = await fetch(`${API}/exam/get-exam?examId=${examId}`);
        const exam = await res.json();
        container.innerHTML = `
            <div style="background:white; padding:20px; border-radius:10px; border-left:5px solid #3498db;">
                <h3>${exam.examTitle}</h3>
                <p>Duration: ${exam.duration}m | Marks: ${exam.totalMarks}</p>
                <button class="primary-btn" onclick="startExam('${exam._id}')">Start Exam</button>
            </div>`;
    } catch (err) { container.innerHTML = "Error loading exam."; }
};

window.startExam = async function(examId) {
    try {
        const res = await fetch(`${API}/exam/get-exam?examId=${examId}`);
        const exam = await res.json();
        navigateTo("#examWindow");
        const questionArea = document.getElementById("questionArea");
        
        questionArea.innerHTML = exam.questions.map((q, index) => `
            <div class="question-box" style="margin-bottom:20px; background:#f9f9f9; padding:15px; border-radius:8px;">
                <p><strong>Q${index + 1}:</strong> ${q.question}</p>
                ${q.options.map(opt => `
                    <label style="display:block;"><input type="radio" name="q${index}" value="${opt}"> ${opt}</label>
                `).join('')}
            </div>`).join('');
        startTimer(exam.duration);
    } catch (err) { alert("Failed to start exam"); }
};

function startTimer(duration) {
    let timer = duration * 60;
    const display = document.getElementById("timer");
    const interval = setInterval(() => {
        let min = Math.floor(timer / 60);
        let sec = timer % 60;
        display.innerText = `Time Left: ${min}:${sec < 10 ? '0' : ''}${sec}`;
        if (--timer < 0) {
            clearInterval(interval);
            alert("Time's Up!");
            submitExam();
        }
    }, 1000);
}



window.submitExam = async function() {
    const examId = localStorage.getItem("assignedExamId");
    const studentName = localStorage.getItem("studentName") || "Student";
    
    try {
        const res = await fetch(`${API}/exam/get-exam?examId=${examId}`);
        const exam = await res.json();
        
        let score = 0;
        let analysisHTML = "<h3>Detailed Analysis:</h3>";

        exam.questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            
            // Format check: Backend se correctOption number (1-4) aayega
            const correctNum = parseInt(q.correctOption); 
            const correctAnswerText = q.options[correctNum - 1];
            
            let status = "";
            let color = "";

            if (!selected) {
                status = "⚠️ Unattempted";
                color = "orange";
            } else if (selected.value === correctAnswerText) {
                score++;
                status = "✅ Correct";
                color = "green";
            } else {
                status = `❌ Wrong (Correct: ${correctAnswerText})`;
                color = "red";
            }

            analysisHTML += `
                <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                    <p><strong>Q${index + 1}:</strong> ${q.question}</p>
                    <p style="color: ${color}; font-weight: bold;">${status}</p>
                </div>`;
        });

        // 1. Result UI dikhao
        navigateTo("#resultSection");
        document.getElementById("resTitle").innerText = `Result: ${exam.examTitle}`;
        document.getElementById("resStudentInfo").innerText = `Name: ${studentName}`;
        document.getElementById("resScore").innerText = `Final Score: ${score} / ${exam.questions.length}`;
        document.getElementById("resAnalysis").innerHTML = analysisHTML;

        // 2. Result Backend par save karo (Is API call ko dhyan se dekho)
        await fetch(`${API}/exam/save-result?name=${encodeURIComponent(studentName)}&examTitle=${encodeURIComponent(exam.examTitle)}&marks=${score}`);

    } catch (err) {
        alert("Exam Submit Error: Backend se contact nahi ho raha!");
    }
};


// --- TEACHER: VIEW ALL RESULTS ---
window.viewAllResults = async function() {
    navigateTo("#myExams");
    const list = document.getElementById("examsList");
    list.innerHTML = "<h3>Student Results</h3><p>Loading...</p>";

    try {
        const res = await fetch(`${API}/exam/all-results`);
        if (!res.ok) throw new Error("API Issue");
        
        const results = await res.json();

        if (results.length === 0) {
            list.innerHTML = "<h3>Student Results</h3><p>No results found in database.</p>";
            return;
        }

        let html = `
            <table style="width:100%; border-collapse: collapse; background: white;">
                <tr style="background:#2c3e50; color:white;">
                    <th style="padding:10px; border:1px solid #ddd;">Student</th>
                    <th style="padding:10px; border:1px solid #ddd;">Exam</th>
                    <th style="padding:10px; border:1px solid #ddd;">Marks</th>
                </tr>
        `;

        results.forEach(r => {
            html += `
                <tr style="text-align:center;">
                    <td style="padding:10px; border:1px solid #ddd;">${r.studentName || r.name}</td>
                    <td style="padding:10px; border:1px solid #ddd;">${r.examTitle || r.exam}</td>
                    <td style="padding:10px; border:1px solid #ddd; font-weight:bold; color:#27ae60;">${r.marks}</td>
                </tr>
            `;
        });

        list.innerHTML = "<h3>Student Results</h3>" + html + "</table>";
    } catch (err) {
        list.innerHTML = "<h3>Student Results</h3><p style='color:red;'>Error: Backend ka /all-results route nahi mil raha.</p>";
    }
};




// --- UI HELPERS ---
window.showRegister = () => { document.getElementById("loginBox").style.display="none"; document.getElementById("registerBox").style.display="block"; };
window.showLogin = () => { document.getElementById("loginBox").style.display="block"; document.getElementById("registerBox").style.display="none"; };
window.logout = () => { localStorage.clear(); navigateTo("#dashboard"); };
window.toggleSidebar = () => { const s = document.getElementById("sidebar"); s.style.width = s.style.width === "250px" ? "0" : "250px"; };


