const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- NAVIGATION SYSTEM ---
window.navigateTo = function(hash) {
    window.location.hash = hash;
};

// --- NAVIGATION SYSTEM FIX ---
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
    } 
    // YEH LINE ADD KI HAI - Student Panel ko dikhane ke liye
    else if (path === "#studentPanel") {
        document.getElementById("studentPanel").style.display = "block";
        const savedId = localStorage.getItem("assignedExamId");
        if(savedId) displayStudentDashboard(savedId);
    } 
    else if (["#welcomeNote", "#createExam", "#myExams", "#addStudent"].includes(path)) {
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



// --- STUDENT LOGIN & DASHBOARD ---
window.studentAuth = async function() {
    const rollNo = document.getElementById("stuRegNo").value;
    if (!rollNo) return alert("Enter Roll No");

    try {
        const res = await fetch(`${API}/student/login?rollNo=${rollNo}`);
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("assignedExamId", data.examId);
            localStorage.setItem("studentName", data.studentName);
            navigateTo("#studentPanel");
            displayStudentDashboard(data.examId);
        } else {
            alert(data.msg);
        }
    } catch (err) { alert("Server Down!"); }
};

window.displayStudentDashboard = async function(examId) {
    const container = document.getElementById("availableExams");
    // ID check: Hum wahi route use karenge jo backend mein working hai
    const url = `${API}/exam/get-exam?examId=${examId}`;

    try {
        const res = await fetch(url);
        const exam = await res.json();

        container.innerHTML = `
            <div class="exam-card" style="background:white; padding:20px; border-radius:10px; border-left:5px solid #3498db;">
                <h3>${exam.examTitle || "Exam"}</h3>
                <p>Duration: ${exam.duration}m | Marks: ${exam.totalMarks}</p>
                <button class="primary-btn" onclick="startExam('${exam._id}')">Start My Exam</button>
            </div>
        `;
    } catch (err) {
        container.innerHTML = "<p>Exam load nahi ho raha.</p>";
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

window.startExam = async function(examId) {
    console.log("Starting exam with ID:", examId);
    // Assigned exam wala route hi reuse karenge
    const url = `${API}/exam/assigned-exam?examId=${examId}`;

    try {
        const res = await fetch(url);
        const exam = await res.json();
        
        if(!exam.questions || exam.questions.length === 0) {
            return alert("Is exam mein koi sawaal nahi hain!");
        }

        // Screen switch
        document.getElementById("studentPanel").style.display = "none";
        document.getElementById("examWindow").style.display = "block";
        
        const questionArea = document.getElementById("questionArea");
        
        questionArea.innerHTML = exam.questions.map((q, index) => `
            <div class="question-box" style="margin-bottom: 25px; padding: 20px; background: #fdfdfd; border: 1px solid #eee; border-radius: 10px;">
                <p style="font-size: 1.1rem;"><strong>Q${index + 1}:</strong> ${q.question}</p>
                <div style="margin-top: 10px;">
                    ${q.options.map((opt, optIndex) => `
                        <label style="display: block; margin: 8px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                            <input type="radio" name="q${index}" value="${opt}"> ${opt}
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');

    } catch (err) {
        console.error("Start Exam Error:", err);
        alert("Facing problem to Exam start! Backend logs check karein.");
    }
};
            
            // 3. Timer start kar sakte ho yahan (Optional)
            startTimer(exam.duration);
        } else {
            questionArea.innerHTML = "<p>No questions found in this exam.</p>";
        }

    } catch (err) {
        alert("Error starting exam: " + err.message);
    }
};

// Timer function (Basic)
function startTimer(duration) {
    let timer = duration * 60;
    const display = document.getElementById("timer");
    const interval = setInterval(() => {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        display.innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (--timer < 0) {
            clearInterval(interval);
            alert("Time's up!");
            submitExam();
        }
    }, 1000);
}



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













