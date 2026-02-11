// GLOBAL VARIABLES
let questions = [];
let examId = "";

// LOAD EXAMS ON PAGE LOAD
window.onload = function () {
  loadExamList();
};

// START EXAM
function startExam() {
  const name = studentName.value.trim();
  const roll = rollNumber.value.trim();
  const selectedExam = examSelect.value;

  if (!name || !roll || !selectedExam) {
    alert("Fill all details");
    return;
  }

  const allPapers = JSON.parse(localStorage.getItem("examPapers")) || {};

  if (!allPapers[selectedExam]) {
    alert("Exam not found");
    return;
  }

  examId = selectedExam;
  questions = allPapers[selectedExam];

  localStorage.setItem("currentStudent", JSON.stringify({ name, roll }));

  document.getElementById("studentSection").style.display = "none";
  document.querySelector(".dashboardContainer").style.display = "none";

  loadQuestions();
  submitBtn.style.display = "block";
}

// LOAD QUESTIONS
function loadQuestions() {
  quiz.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.id = `question-${index}`;
    div.className = "questionBox";

    div.innerHTML = `
      <p><b>${index + 1}. ${q.question}</b></p>
      <label><input type="radio" name="q${index}" value="A"> ${q.options[0]}</label><br>
      <label><input type="radio" name="q${index}" value="B"> ${q.options[1]}</label><br>
      <label><input type="radio" name="q${index}" value="C"> ${q.options[2]}</label><br>
      <label><input type="radio" name="q${index}" value="D"> ${q.options[3]}</label><br>
      <div id="answer-${index}" style="display:none;"></div>
    `;

    quiz.appendChild(div);
  });
}

// SUBMIT QUIZ
function submitQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const qDiv = document.getElementById(`question-${index}`);
    const ansDiv = document.getElementById(`answer-${index}`);

    if (selected && selected.value === q.answer) {
      score++;
      qDiv.style.border = "2px solid green";
      ansDiv.innerHTML = "✅ Correct";
    } else if (selected) {
      qDiv.style.border = "2px solid red";
      ansDiv.innerHTML = `❌ Wrong | Correct: ${q.answer}`;
    } else {
      qDiv.style.border = "2px solid orange";
      ansDiv.innerHTML = `⚠ Not Attempted | Correct: ${q.answer}`;
    }

    ansDiv.style.display = "block";
  });

  result.innerText = `Score: ${score} / ${questions.length}`;

  submitBtn.disabled = true;

  document.querySelectorAll("input[type=radio]").forEach(r => r.disabled = true);
}



// SAVE QUESTION
function saveQuestion() {
  if (!currentTeacher) {
    alert("Login required");
    return;
  }

  const exam = examName.value.trim();
  const question = qText.value.trim();
  const options = [optA.value, optB.value, optC.value, optD.value];
  const answer = correct.value;

  if (!exam || !question || options.includes("")) {
    alert("Fill all fields");
    return;
  }

  let data = JSON.parse(localStorage.getItem("examData")) || {};

  if (!data[currentTeacher]) data[currentTeacher] = {};
  if (!data[currentTeacher][exam]) data[currentTeacher][exam] = [];

  data[currentTeacher][exam].push({
    question,
    options,
    answer
  });

  localStorage.setItem("examData", JSON.stringify(data));

  alert("Question Saved!");
}



// LOAD EXAM LIST
function loadExamList() {
  examSelect.innerHTML = "<option value=''>-- Select Exam --</option>";

  const data = JSON.parse(localStorage.getItem("examData")) || {};

  Object.keys(data).forEach(teacher => {
    Object.keys(data[teacher]).forEach(exam => {
      const opt = document.createElement("option");
      opt.value = teacher + "|" + exam;
      opt.textContent = exam + " (By " + teacher + ")";
      examSelect.appendChild(opt);
    });
  });
}



// NAVIGATION
function openTeacher() {
  document.querySelector(".dashboardContainer").style.display = "none";
  teacherAuth.style.display = "block";
}


function openStudent() {
  document.querySelector(".dashboardContainer").style.display = "none";
  studentSection.style.display = "block";
}

function openResult() {
  window.open("YOUR_GOOGLE_SHEET_LINK");
}

function goBack() {
  teacherAuth.style.display = "none";
  teacherSection.style.display = "none";
  studentSection.style.display = "none";
  quiz.innerHTML = "";
  submitBtn.style.display = "none";
  result.innerText = "";
  document.querySelector(".dashboardContainer").style.display = "grid";
}




let currentTeacher = null;

function registerTeacher() {
  const id = newTeacherId.value.trim();
  const pass = newTeacherPass.value.trim();

  if (!id || !pass) {
    alert("Fill all fields");
    return;
  }

  let teachers = JSON.parse(localStorage.getItem("teachers")) || {};

  if (teachers[id]) {
    alert("Teacher already exists");
    return;
  }

  teachers[id] = { password: pass };

  localStorage.setItem("teachers", JSON.stringify(teachers));

  alert("Registration successful!");
}

function loginTeacher() {
  const id = teacherId.value.trim();
  const pass = teacherPass.value.trim();

  let teachers = JSON.parse(localStorage.getItem("teachers")) || {};

  if (!teachers[id] || teachers[id].password !== pass) {
    alert("Invalid ID or Password");
    return;
  }

  currentTeacher = id;
  localStorage.setItem("currentTeacher", id);

  teacherAuth.style.display = "none";
  teacherSection.style.display = "block";
}



