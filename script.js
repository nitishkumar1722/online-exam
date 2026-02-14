const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- 1. NAVIGATION & ROUTING ---
window.addEventListener("load", handleLocation);
window.addEventListener("hashchange", handleLocation);

function handleLocation() {
    const path = window.location.hash || "#dashboard";
    const token = localStorage.getItem("token");

    // Sabse pehle saare main divs chhupao
    hideAll();

    // Security Check: Bina token ke dashboard block karna
    const guestPages = ["#dashboard", "#teacherAuth", "#studentLogin", "#forgotPass"];
    if (!token && !guestPages.includes(path)) {
        window.location.hash = "#dashboard";
        return;
    }

    if (token) {
        // TEACHER LOGGED IN
        document.getElementById("teacherPanel").style.display = "block";
        
        const sections = ['welcomeNote', 'createExam', 'addStudent', 'myExams'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (path === "#" + id) ? "block" : "none";
        });

        // Default screen handle karein
        if (path === "#dashboard" || path === "#teacherAuth" || path === "#welcomeNote") {
            document.getElementById("welcomeNote").style.display = "block";
        }

        // AGAR PATH #myExams HAI TO EXAMS LOAD KARO
        if (path === "#myExams") {
            loadMyExams();
        }

    } else {
        // GUEST / NOT LOGGED IN
        if (path === "#teacherAuth") {
            document.getElementById("teacherAuth").style.display = "block";
            showLogin();
        } else if (path === "#forgotPass") {
            document.getElementById("teacherAuth").style.display = "block";
            showForgotBox();
        } else if (path === "#studentLogin") {
            const stuDiv = document.getElementById("studentLogin");
            if(stuDiv) stuDiv.style.display = "block";
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
            window.location.hash = "#welcomeNote";
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

// --- 4. EXAM & QUESTION LOGIC ---
window.parseBulkQuestions = function() {
    const text = document.getElementById("bulkQuestions").value;
    const lines = text.split("\n");
    const questionsList = document.getElementById("questionsList");
    let html = "";
    let processedQuestions = [];

    lines.forEach((line, index) => {
        if (line.trim() === "") return;
        const parts = line.split("|").map(p => p.trim());

        if (parts.length >= 6) {
            processedQuestions.push({
                text: parts[0],
                options: [parts[1], parts[2], parts[3], parts[4]],
                answer: parts[5],
                type: 'mcq'
            });
            // Yahan preview mein options bhi jodein
            html += `
                <div class="q-preview" style="background:#f9f9f9; padding:10px; margin:5px; border-radius:5px; border-left:3px solid #007bff;">
                    <strong>Q${index + 1}:</strong> ${parts[0]} <br>
                    <small>A: ${parts[1]} | B: ${parts[2]} | C: ${parts[3]} | D: ${parts[4]}</small> <br>
                    <span style="color:green">Ans Index: ${parts[5]}</span>
                </div>`;
        }
    });
    questionsList.innerHTML = html;
    window.currentExamQuestions = processedQuestions;
};

window.saveExam = async function() {
    const title = document.getElementById("examTitle").value;
    const duration = document.getElementById("examDuration").value;
    
    if(!window.currentExamQuestions || window.currentExamQuestions.length === 0) {
        return alert("Pehle questions process karein!");
    }

    try {
        const res = await fetch(`${API}/exams/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, duration, questions: window.currentExamQuestions })
        });
        alert("Exam Created Successfully!");
        window.location.hash = "#myExams";
    } catch (err) { alert("Error saving exam"); }
};

window.loadMyExams = async function() {
    const examListDiv = document.getElementById("examList");
    if (!examListDiv) return;
    examListDiv.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(`${API}/exams/my-exams`, {
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        });

        // Agar response 200 (OK) nahi hai
        if (!res.ok) {
            const errorData = await res.json();
            console.error("Backend Error:", errorData);
            examListDiv.innerHTML = `<p style="color:red;">Server Error: ${errorData.msg || "Unauthorized"}</p>`;
            return;
        }

        const exams = await res.json();
        // Baki ka rendering logic...
        
    } catch (err) { 
        console.error("Connection Error:", err);
        examListDiv.innerHTML = "Internet/Server connection error."; 
    }
};


window.deleteExam = async function(id) {
    if(!confirm("Delete this exam?")) return;
    try {
        await fetch(`${API}/exams/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        loadMyExams();
    } catch (err) { alert("Delete failed"); }
};

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
        alert("Student Added!");
    } catch (err) { alert("Error adding student"); }
};



// 1. Student jab registration no. se login karega
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
            localStorage.setItem("stuToken", data.token); // Student token alag rakhein
            window.location.hash = "#studentDashboard";
        } else { alert(data.msg); }
    } catch (err) { alert("Server error! Backend check karein."); }
};

// 2. Available Exams dikhana
window.loadAvailableExams = async function() {
    try {
        const res = await fetch(`${API}/exams/all`); // Sabhi exams lene ke liye
        const exams = await res.json();
        let html = exams.map(e => `
            <div class="exam-card">
                <h3>${e.title}</h3>
                <button onclick="startExam('${e._id}')">Start Now</button>
            </div>`).join('');
        document.getElementById("availableExamsList").innerHTML = html;
    } catch(err) { console.log("Exams load nahi huye"); }
}


