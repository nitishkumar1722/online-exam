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
    const rollNo = document.getElementById("stuRegNo").value;
    const url = `${API}/student/login?rollNo=${rollNo}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("assignedExamId", data.examId);
            navigateTo("#studentPanel");
            // Blank screen hatane ke liye function call karein
            displayStudentDashboard(data.examId); 
        } else {
            alert(data.msg);
        }
    } catch (err) { alert("Login Error!"); }
};

window.displayStudentDashboard = async function(examId) {
    const container = document.getElementById("availableExams");
    if (!container) return; // Agar HTML mein ID nahi mili

    const url = `${API}/exam/assigned-exam?examId=${examId}`;

    try {
        const res = await fetch(url);
        const exam = await res.json();

        // Screen par card dikhana
        container.innerHTML = `
            <div class="exam-card" style="background:#fff; padding:25px; border-radius:15px; box-shadow:0 10px 20px rgba(0,0,0,0.1); border:1px solid #e0e0e0; margin-top:20px;">
                <h2 style="color:#2c3e50; margin-bottom:10px;">📝 ${exam.examTitle || "Test Paper"}</h2>
                <div style="color:#7f8c8d; margin-bottom:20px;">
                    <p>⏱️ Duration: <b>${exam.duration} Minutes</b></p>
                    <p>📊 Total Marks: <b>${exam.totalMarks}</b></p>
                </div>
                <button class="primary-btn" onclick="startOfficialTest('${exam._id}')" style="width:100%;">Start Exam</button>
            </div>
        `;
    } catch (err) {
        container.innerHTML = `<p style="color:red;">Exam load nahi ho paya. Refresh karein.</p>`;
    }
};



window.loadStudentExam = async function(examId) {
    if (!examId) return;

    const url = `${API}/exam/get-exam?examId=${examId}`;

    try {
        const res = await fetch(url);
        const exam = await res.json();

        const container = document.getElementById("availableExams");
        
        // Agar exam mil gaya toh card dikhao
        container.innerHTML = `
            <div class="exam-card" style="border: 2px solid #007bff; padding: 20px; border-radius: 10px; background: white;">
                <h2 style="color: #333;">${exam.examTitle}</h2>
                <p><strong>Total Marks:</strong> ${exam.totalMarks}</p>
                <p><strong>Duration:</strong> ${exam.duration} Minutes</p>
                <hr>
                <button class="primary-btn" onclick="startExam('${exam._id}')">Start Test Now</button>
            </div>
        `;
    } catch (err) {
        console.error("Exam load nahi ho paya:", err);
    }
};

// Exam Start karne ka function
window.startExam = async function(examId) {
    const url = `${API}/exam/get-exam?examId=${examId}`;
    try {
        const res = await fetch(url);
        const exam = await res.json();
        
        document.getElementById("studentDashboard").style.display = "none";
        document.getElementById("examWindow").style.display = "block";
        
        const questionArea = document.getElementById("questionArea");
        
        // Saare questions dikhana
        questionArea.innerHTML = exam.questions.map((q, index) => `
            <div class="question-box" style="margin-bottom: 20px; padding: 15px; border-bottom: 1px solid #eee;">
                <p><strong>Q${index + 1}: ${q.question}</strong></p>
                ${q.options.map((opt, optIndex) => `
                    <label style="display: block; margin: 5px 0;">
                        <input type="radio" name="q${index}" value="${optIndex + 1}"> ${opt}
                    </label>
                `).join('')}
            </div>
        `).join('');

    } catch (err) {
        alert("Facing problem to Exam start!");
    }
};


window.loadStudentPortal = async function(examId) {
    if (!examId) {
        document.getElementById("availableExams").innerHTML = "<p>Koi exam assigned nahi hai.</p>";
        return;
    }

    const url = `${API}/exam/get-assigned?examId=${examId}`;

    try {
        const res = await fetch(url);
        const exam = await res.json();

        // Student Dashboard mein data bharna
        const container = document.getElementById("availableExams");
        container.innerHTML = `
            <div class="exam-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center;">
                <h2 style="color: #2c3e50;">${exam.examTitle || "Untitled Exam"}</h2>
                <p style="color: #7f8c8d;">Time: ${exam.duration} mins | Marks: ${exam.totalMarks}</p>
                <button class="primary-btn" onclick="startOfficialExam('${exam._id}')">Start Exam Now</button>
            </div>
        `;
    } catch (err) {
        console.error("Error loading portal:", err);
    }
};

// Exam start karne ka function jo blank screen ko hatayega
window.startOfficialExam = async function(id) {
    // Yahan hum wahi startExam wala logic use karenge jo questions render karta hai
    navigateTo("#examWindow"); 
    // ... baaki questions dikhane ka code yahan aayega
};



// UI Helpers
window.showRegister = () => { document.getElementById("loginBox").style.display="none"; document.getElementById("registerBox").style.display="block"; };
window.showLogin = () => { document.getElementById("loginBox").style.display="block"; document.getElementById("registerBox").style.display="none"; };
window.logout = () => { localStorage.clear(); navigateTo("#dashboard"); };
window.toggleSidebar = () => { const s = document.getElementById("sidebar"); s.style.width = s.style.width === "250px" ? "0" : "250px"; };








