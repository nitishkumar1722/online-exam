const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. NAVIGATION & ROUTING ---
window.addEventListener("load", handleLocation);
window.addEventListener("hashchange", handleLocation);

function handleLocation() {
    const path = window.location.hash || "#dashboard";
    const token = localStorage.getItem("token");

    // 1. Pehle sab kuchh chhupao
    hideAll();

    // 2. Security Check
    const guestPages = ["#dashboard", "#teacherAuth", "#studentLogin", "#forgotPass"];
    if (!token && !guestPages.includes(path)) {
        window.location.hash = "#dashboard";
        return;
    }

    // 3. UI RENDERING LOGIC
    if (token) {
        // Teacher Login hai toh Panel dikhao
        document.getElementById("teacherPanel").style.display = "block";
        
        // Saare sections yahan list karein
        const sections = ['welcomeNote', 'createExam', 'addStudent', 'myExams'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.display = (path === "#" + id) ? "block" : "none";
            }
        });

        // Agar user direct Dashboard ya Auth page par aaye login ke baad
        if (path === "#dashboard" || path === "#teacherAuth" || path === "#welcomeNote") {
            // Default screen "createExam" rakhte hain ya welcomeNote
            document.getElementById("welcomeNote").style.display = "block";
        }

        // AGAR PATH #myExams HAI TO EXAMS LOAD KARO
        if (path === "#myExams") {
            loadMyExams();
        }

    } else {
        // Login nahi hai toh Auth pages dikhao
        if (path === "#teacherAuth") {
            document.getElementById("teacherAuth").style.display = "block";
            showLogin(); // Login box dikhao
        } else if (path === "#forgotPass") {
            document.getElementById("teacherAuth").style.display = "block";
            showForgotBox(); // Forgot box dikhao
        } else if (path === "#studentLogin") {
            const stuDiv = document.getElementById("studentLogin");
            if(stuDiv) stuDiv.style.display = "block";
        } else {
            document.getElementById("dashboard").style.display = "flex";
        }
    }
}
// --- 2. TEACHER AUTH FUNCTIONS ---

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
            window.location.hash = "#createExam";
        } else { alert(data.msg || "Login Failed"); }
    } catch (err) { alert("Server error"); }
};

window.registerTeacher = async function() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    try {
        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        alert(data.msg || "Registration Successful");
        showLogin();
    } catch (err) { alert("Server error"); }
};

window.logout = function() {
    localStorage.removeItem("token");
    window.location.hash = "#dashboard";
    location.reload();
};

// --- 3. UI HELPERS ---

window.togglePass = function(id) {
    const x = document.getElementById(id);
    x.type = x.type === "password" ? "text" : "password";
};

window.showRegister = () => {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
};

window.showLogin = () => {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "none";
};

window.showForgotBox = () => {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "block";
};

window.hideAll = function() {
    ["dashboard", "teacherAuth", "teacherPanel"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
};

window.goHome = () => window.location.hash = "#dashboard";

window.toggleSidebar = function() {
    const sb = document.getElementById("sidebar");
    sb.style.width = (sb.style.width === "250px") ? "0" : "250px";
};


let questions = [];

window.addQuestionField = function(type) {
    const qId = Date.now();
    const qDiv = document.createElement('div');
    qDiv.className = "question-item";
    qDiv.id = `q-${qId}`;

    if (type === 'mcq') {
        qDiv.innerHTML = `
            <input type="text" placeholder="MCQ Question Text" class="q-text">
            <input type="text" placeholder="Opt A" class="opt">
            <input type="text" placeholder="Opt B" class="opt">
            <input type="text" placeholder="Correct Answer (A/B)" class="q-ans">
            <button onclick="removeQ(${qId})">Remove</button>
        `;
    } else {
        qDiv.innerHTML = `
            <input type="text" placeholder="Subjective Question Text" class="q-text">
            <p>(Answer will be text-based)</p>
            <button onclick="removeQ(${qId})">Remove</button>
        `;
    }
    document.getElementById('questionsList').appendChild(qDiv);
};




// --- 2. ADD STUDENT FIX ---
window.submitStudent = async function() {
    const name = document.getElementById("studentName").value;
    const regNo = document.getElementById("studentReg").value;

    try {
        const res = await fetch(`${API}/students/add`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ name, regNo })
        });
        const data = await res.json();
        alert(data.msg || "Student Added!");
    } catch (err) { alert("Check if Reg No is unique"); }
};


// --- MY EXAMS KO LOAD KARNE KA LOGIC ---
window.loadMyExams = async function() {
    const examListDiv = document.getElementById("examList");
    if (!examListDiv) return;

    // Loading indicator dikhao
    examListDiv.innerHTML = "<p style='text-align:center;'>Exams load ho rahe hain, kripya intezar karein...</p>";

    try {
        const res = await fetch(`${API}/exams/my-exams`, {
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        });
        
        const exams = await res.json();

        // Agar koi exam nahi mila
        if (!exams || exams.length === 0) {
            examListDiv.innerHTML = `
                <div style="text-align:center; padding:20px; border: 2px dashed #ccc;">
                    <p>Aapne abhi tak koi exam nahi banaya hai.</p>
                    <button onclick="navigateTo('#createExam')" class="primary-btn">Pehla Exam Banayein</button>
                </div>`;
            return;
        }

        // HTML Cards generate karna
        let html = "";
        exams.forEach(exam => {
            html += `
                <div class="exam-card" style="background:#fff; border-radius:10px; padding:15px; margin-bottom:15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 6px solid #4CAF50;">
                    <h3 style="margin:0; color:#2c3e50;">${exam.title}</h3>
                    <div style="margin: 10px 0; font-size: 14px; color: #555;">
                        <span>⏱️ <b>Duration:</b> ${exam.duration} mins</span> | 
                        <span>❓ <b>Questions:</b> ${exam.questions ? exam.questions.length : 0}</span>
                    </div>
                    <div style="display:flex; gap:10px;">
                        <button onclick="deleteExam('${exam._id}')" style="background:#e74c3c; color:white; border:none; padding:8px 12px; border-radius:5px; cursor:pointer; font-weight:bold;">Delete</button>
                        <button onclick="alert('Exam ID: ${exam._id}')" style="background:#3498db; color:white; border:none; padding:8px 12px; border-radius:5px; cursor:pointer; font-weight:bold;">Details</button>
                    </div>
                </div>
            `;
        });
        examListDiv.innerHTML = html;

    } catch (err) {
        console.error("Fetch Error:", err);
        examListDiv.innerHTML = "<p style='color:red; text-align:center;'>⚠️ Server se connect nahi ho pa rahe. Internet check karein.</p>";
    }
};
// --- 4. STUDENT PASSWORD SETUP ---
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
            alert("Login Successful");
        } else { alert(data.msg); }
    } catch (err) { alert("Student not registered by teacher"); }
};

// Update handleLocation to include 'myExams'
// sections.forEach(id => { ... add 'myExams' to the list ... });



window.parseBulkQuestions = function() {
    const text = document.getElementById("bulkQuestions").value;
    const lines = text.split("\n"); // Har line ek sawal hai
    const questionsList = document.getElementById("questionsList");
    
    let html = "";
    let processedQuestions = [];

    lines.forEach((line, index) => {
        if (line.trim() === "") return;

        // Pipe (|) ke basis par todna
        const parts = line.split("|").map(p => p.trim());

        if (parts.length >= 6) {
            const questionObj = {
                text: parts[0],
                options: [parts[1], parts[2], parts[3], parts[4]],
                answer: parts[5], // Correct Option ka index (0, 1, 2, 3)
                type: 'mcq'
            };
            processedQuestions.push(questionObj);

            // UI par preview dikhane ke liye
            html += `
                <div class="q-preview">
                    <strong>Q${index + 1}:</strong> ${parts[0]} <br>
                    <small>A: ${parts[1]}, B: ${parts[2]}, C: ${parts[3]}, D: ${parts[4]} | <b>Ans: ${parts[5]}</b></small>
                </div>
            `;
        }
    });

    questionsList.innerHTML = html;
    // Data ko global variable mein save karein taaki saveExam() use kar sake
    window.currentExamQuestions = processedQuestions;
    alert(`${processedQuestions.length} Questions processed! Check preview below.`);
};

// Save function ko update karein taaki wo window.currentExamQuestions ko pick kare
window.saveExam = async function() {
    const title = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    
    if(!window.currentExamQuestions || window.currentExamQuestions.length === 0) {
        return alert("Pehle questions process karein!");
    }

    const examData = {
        title,
        duration,
        questions: window.currentExamQuestions
    };

    try {
        const res = await fetch(`${API}/exams/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(examData)
        });
        alert("Exam Created with " + window.currentExamQuestions.length + " questions!");
        navigateTo('#myExams');
    } catch (err) { alert("Error saving exam"); }
};


// --- EXAM DELETE KARNE KA LOGIC ---
window.deleteExam = async function(id) {
    if(!confirm("Kya aap wakayi is exam ko delete karna chahte hain?")) return;

    try {
        const res = await fetch(`${API}/exams/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        
        if(res.ok) {
            alert("Exam delete ho gaya!");
            loadMyExams(); // List ko refresh karo
        } else {
            alert("Delete nahi ho paya.");
        }
    } catch (err) {
        alert("Server error!");
    }
};
