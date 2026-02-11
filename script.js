const API = "http://localhost:5000/api";

const dashboard = document.getElementById("dashboard");
const teacherAuth = document.getElementById("teacherAuth");
const teacherPanel = document.getElementById("teacherPanel");
const studentLogin = document.getElementById("studentLogin");
const studentPanel = document.getElementById("studentPanel");

// ================= NAVIGATION =================

function openTeacherAuth() {
  hideAll();
  teacherAuth.style.display = "block";
  showRegister();
}

function openStudentLogin() {
  hideAll();
  studentLogin.style.display = "block";
}

function goHome() {
  hideAll();
  dashboard.style.display = "grid";
}

function hideAll() {
  dashboard.style.display = "none";
  teacherAuth.style.display = "none";
  teacherPanel.style.display = "none";
  studentLogin.style.display = "none";
  studentPanel.style.display = "none";
}

function logout() {
  localStorage.removeItem("token");
  goHome();
}

// ================= TOGGLE =================

function showLogin() {
  registerBox.style.display = "none";
  forgotBox.style.display = "none";
  loginBox.style.display = "block";
}

function showRegister() {
  loginBox.style.display = "none";
  forgotBox.style.display = "none";
  registerBox.style.display = "block";
}

function showForgot() {
  loginBox.style.display = "none";
  forgotBox.style.display = "block";
}

// ================= AUTH =================

async function registerTeacher() {
  const email = regEmail.value;
  const password = regPassword.value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message || "Registered");
  showLogin();
}

async function loginTeacher() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    hideAll();
    teacherPanel.style.display = "block";
  } else {
    alert(data.msg || "Login Failed");
  }
}

async function resetPassword() {
  const email = forgotEmail.value;
  const newPassword = newPassword.value;

  await fetch(`${API}/auth/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword })
  });

  alert("Password Updated");
  showLogin();
}

// ================= TEACHER =================

async function createExam() {
  const title = examTitle.value;
  const duration = examDuration.value;

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/exam/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title, duration })
  });

  const data = await res.json();
  teacherOutput.innerHTML = data.message || "Exam Created";
}

async function addStudent() {
  const name = studentName.value;
  const reg = studentReg.value;

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/exam/add-student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ name, reg })
  });

  const data = await res.json();
  teacherOutput.innerHTML = data.message || "Student Added";
}

// ================= STUDENT =================

async function studentLogin() {
  const name = studentLoginName.value;
  const reg = studentLoginReg.value;

  const res = await fetch(`${API}/student/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, reg })
  });

  const data = await res.json();

  if (data.success) {
    hideAll();
    studentPanel.style.display = "block";
    loadStudentExams();
  } else {
    alert("Access Denied");
  }
}

async function loadStudentExams() {
  const res = await fetch(`${API}/student/exams`);
  const data = await res.json();

  studentExamList.innerHTML = data.map(e => `
    <div>
      <h4>${e.title}</h4>
      <p>Duration: ${e.duration} min</p>
    </div>
  `).join("");
}

