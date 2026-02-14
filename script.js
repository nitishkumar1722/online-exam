const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. NAVIGATION & ROUTING ---
window.addEventListener("load", handleLocation);
window.addEventListener("hashchange", handleLocation);

function handleLocation() {
    const path = window.location.hash || "#dashboard";
    const token = localStorage.getItem("token");

    // Guest Pages (Bina login wale)
    const guestPages = ["#dashboard", "#teacherAuth", "#studentLogin", "#forgotPass"];

    if (!token && !guestPages.includes(path)) {
        window.location.hash = "#dashboard";
        return;
    }

    hideAll();

    if (token) {
        // Teacher Dashboard View
        document.getElementById("teacherPanel").style.display = "block";
        const sections = ['createExam', 'addStudent'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (path === "#" + id) ? "block" : "none";
        });
        // Default section agar dashboard par ho
        if (path === "#dashboard" || path === "#teacherAuth") {
            window.location.hash = "#createExam";
        }
    } else {
        // Auth Pages View
        if (path === "#teacherAuth") {
            document.getElementById("teacherAuth").style.display = "block";
            showLogin();
        } else if (path === "#forgotPass") {
            document.getElementById("teacherAuth").style.display = "block";
            showForgotBox();
        } else if (path === "#studentLogin") {
            // Student login div handle karein agar hai
        } else {
            document.getElementById("dashboard").style.display = "flex";
        }
    }
}

window.navigateTo = function(hash) {
    window.location.hash = hash;
    const sb = document.getElementById("sidebar");
    if (sb) sb.style.width = "0"; 
};

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

window.saveExam = async function() {
    const title = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    
    // Yahan saare questions ko collect karenge
    const qItems = document.querySelectorAll('.question-item');
    let examData = { title, duration, questions: [] };

    qItems.forEach(item => {
        examData.questions.push({
            text: item.querySelector('.q-text').value,
            type: item.querySelector('.opt') ? 'mcq' : 'subjective',
            options: item.querySelector('.opt') ? [item.querySelectorAll('.opt')[0].value, item.querySelectorAll('.opt')[1].value] : [],
            answer: item.querySelector('.q-ans') ? item.querySelector('.q-ans').value : ""
        });
    });

    try {
        const res = await fetch(`${API}/exams/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(examData)
        });
        alert("Exam Created Successfully!");
        navigateTo('#myExams');
    } catch (err) { alert("Error saving exam"); }
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


// --- 3. TEACHER'S VISIBLE EXAMS ---
window.loadMyExams = async function() {
    try {
        const res = await fetch(`${API}/exams/my-exams`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const exams = await res.json();
        let html = exams.map(e => `<div class="exam-card"><h4>${e.title}</h4><p>${e.duration} mins</p></div>`).join('');
        document.getElementById("examList").innerHTML = html || "No exams found.";
    } catch (err) { console.log("Error loading exams"); }
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

