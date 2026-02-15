const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- REGISTER FUNCTION ---
const API = "https://exam-backend-production-407b.up.railway.app/api";

window.registerTeacher = async function() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    // URL mein password attach kiya
    const url = `${API}/auth/register?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
    console.log("Registering via:", url);

    try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        alert(data.message || data.error);
        if(res.ok) showLogin();
    } catch (err) {
        alert("Server Error! Railway Logs check karo.");
    }
};

window.loginTeacher = async function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const url = `${API}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", email);
            window.location.hash = "#welcomeNote";
        } else {
            alert(data.msg);
        }
    } catch (err) {
        alert("Login Error");
    }
};
// --- Baki UI Functions ---
window.showRegister = () => {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
};
window.showLogin = () => {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
};


// --- CREATE EXAM ---
window.createExam = async function() {
    const examName = document.getElementById("examName").value;
    const duration = document.getElementById("duration").value;
    const totalMarks = document.getElementById("totalMarks").value;
    const teacherEmail = localStorage.getItem("userEmail"); // Login ke waqt save kar lena

    const url = `${API}/exam/create?examName=${examName}&duration=${duration}&totalMarks=${totalMarks}&teacherEmail=${teacherEmail}`;

    try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        alert(data.message);
        window.location.hash = "#myExams";
    } catch (err) { alert("Exam Creation Failed"); }
};

// --- ADD STUDENT ---
window.addStudent = async function(examId) {
    const name = prompt("Enter Student Name:");
    const rollNo = prompt("Enter Roll No:");
    
    const url = `${API}/student/add?name=${name}&rollNo=${rollNo}&examId=${examId}`;

    try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        alert(data.message);
    } catch (err) { alert("Error adding student"); }
};

// --- LOAD MY EXAMS ---
window.loadMyExams = async function() {
    const teacherEmail = localStorage.getItem("userEmail");
    const url = `${API}/exam/my-exams?teacherEmail=${teacherEmail}`;

    try {
        const res = await fetch(url, { method: "GET" });
        const exams = await res.json();
        
        const container = document.getElementById("examsList");
        container.innerHTML = exams.map(exam => `
            <div class="exam-card">
                <h3>${exam.examName}</h3>
                <p>Marks: ${exam.totalMarks} | Time: ${exam.duration} mins</p>
                <button onclick="addStudent('${exam._id}')">Add Student</button>
            </div>
        `).join('');
    } catch (err) { console.error("Error loading exams"); }
};
