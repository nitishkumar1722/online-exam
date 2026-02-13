document.addEventListener("DOMContentLoaded", function () {

  const API = "https://exam-backend-production-407b.up.railway.app/api";
  
  const dashboard = document.getElementById("dashboard");
  const teacherAuth = document.getElementById("teacherAuth");
  const teacherPanel = document.getElementById("teacherPanel");
  const studentLogin = document.getElementById("studentLogin");
  const studentPanel = document.getElementById("studentPanel");

  const registerBox = document.getElementById("registerBox");
  const loginBox = document.getElementById("loginBox");
  const forgotBox = document.getElementById("forgotBox");

  function hideAll() {
    dashboard.style.display = "none";
    teacherAuth.style.display = "none";
    teacherPanel.style.display = "none";
    studentLogin.style.display = "none";
    studentPanel.style.display = "none";
  }

  window.openTeacherAuth = function () {
    hideAll();
    teacherAuth.style.display = "block";
  };

  window.openStudentLogin = function () {
    hideAll();
    studentLogin.style.display = "block";
  };

  window.goHome = function () {
    hideAll();
    dashboard.style.display = "grid";
  };

});


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

  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    alert(data.message || "Registered Successfully");
    showLogin();

  } catch (error) {
    console.log(error);
    alert("Backend not connected");
  }
}


async function loginTeacher() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

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
  const email = document.getElementById("forgotEmail").value;
  const newPass = document.getElementById("newPassword").value;

  await fetch(`${API}/auth/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword: newPass })
  });

  alert("Password Updated");
  showLogin();
}


// ================= TEACHER =================

async function createExam() {
  const title = document.getElementById("examTitle").value;
  const duration = document.getElementById("examDuration").value;

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/exam/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ title, duration })
  });

  const data = await res.json();
  document.getElementById("teacherOutput").innerHTML =
    data.message || "Exam Created";
}


async function addStudent() {
  const name = document.getElementById("studentName").value;
  const reg = document.getElementById("studentReg").value;

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/exam/add-student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ name, reg })
  });

  const data = await res.json();

  document.getElementById("teacherOutput").innerHTML =
    data.message || "Student Added";
}


// ================= STUDENT =================

async function studentLogin() {
  const name = document.getElementById("studentLoginName").value;
  const reg = document.getElementById("studentLoginReg").value;

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



window.togglePassword = function(id) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}


