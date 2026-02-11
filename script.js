// QUESTIONS
const examPapers = {
  
let questions = [];
let examId = "";




// START EXAM
function startExam() {
  const name = document.getElementById("studentName").value.trim();
  const roll = document.getElementById("rollNumber").value.trim();
  const selectedExam = document.getElementById("examSelect").value;

  if (!name || !roll || !selectedExam) {
    alert("Please enter Name, Roll Number and select Exam");
    return;
  }

  // 🔹 Load exams from localStorage
  const allPapers = JSON.parse(localStorage.getItem("examPapers")) || {};

  if (!allPapers[selectedExam]) {
    alert("Selected exam not found");
    return;
  }

  // 🔹 Set global variables
  examId = selectedExam;
  questions = allPapers[selectedExam];

  // 🔹 Save student for Google Sheet
  const student = { name, roll };
  localStorage.setItem("currentStudent", JSON.stringify(student));

  // 🔹 UI changes
  document.getElementById("studentSection").style.display = "none";
  loadQuestions();
  document.getElementById("submitBtn").style.display = "inline-block";
}




// LOAD QUESTIONS
function loadQuestions() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.id = `question-${index}`;
    div.style.padding = "10px";
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <p><b>${index + 1}. ${q.question}</b></p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${index}" value="${opt}">
          ${opt}
        </label><br>
      `).join("")}
      <div id="answer-${index}" style="display:none;"></div>
    `;

    quizDiv.appendChild(div);
  });
}



// SUBMIT QUIZ
function submitQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="q${index}"]:checked`
    );

    const qDiv = document.getElementById(`question-${index}`);
    const ansDiv = document.getElementById(`answer-${index}`);

    if (selected && selected.value === q.answer) {
      score++;
      qDiv.style.border = "2px solid green";
      ansDiv.innerHTML = "✅ Correct";
    } 
    else if (selected) {
      qDiv.style.border = "2px solid red";
      ansDiv.innerHTML = `❌ Wrong | Correct: <b>${q.answer}</b>`;
    } 
    else {
      qDiv.style.border = "2px solid orange";
      ansDiv.innerHTML = `⚠ Not Attempted | Correct: <b>${q.answer}</b>`;
    }

    ansDiv.style.display = "block";
  });

  document.getElementById("result").innerText =
    `Score: ${score} / ${questions.length}`;

  const student = JSON.parse(localStorage.getItem("currentStudent"));
sendResultToGoogleSheet(student, score);
}



function sendResultToGoogleSheet(student, score) {
  fetch("https://script.google.com/macros/s/AKfycbzs_Gvns96H1feVgyUvt2sXyQYXDGnlQst12OzQajf2jjork7ofEraKGd3jAVY4QcsxfQ/exec", {
    method: "POST",
    body: JSON.stringify({
      name: student.name,
      roll: student.roll,
      score: score,
      total: questions.length,
      exam: examId
    })
  })
  .then(res => res.text())
  .then(txt => console.log("Sheet response:", txt))
  .catch(err => console.error("Fetch error:", err));
}

function openTeacher() {
  document.getElementById("roleSelect").style.display = "none";
  document.getElementById("teacherSection").style.display = "block";
}

function openStudent() {
  document.getElementById("roleSelect").style.display = "none";
  document.getElementById("studentSection").style.display = "block";
}

function openResult() {
  window.open("YOUR_GOOGLE_SHEET_LINK");
}



function saveQuestion() {
  const exam = document.getElementById("examName").value.trim();
  const question = document.getElementById("qText").value.trim();
  const options = [
    document.getElementById("optA").value,
    document.getElementById("optB").value,
    document.getElementById("optC").value,
    document.getElementById("optD").value
  ];
  const answer = document.getElementById("correct").value.trim();

  if (!exam || !question || !answer) {
    alert("Fill all fields");
    return;
  }

  let papers = JSON.parse(localStorage.getItem("examPapers")) || {};
  if (!papers[exam]) papers[exam] = [];

  papers[exam].push({ question, options, answer });
  localStorage.setItem("examPapers", JSON.stringify(papers));

  alert("Question Saved!");
}



function loadExamList() {
  const select = document.getElementById("examSelect");
  select.innerHTML = "<option value=''>-- Select Exam --</option>";

  const papers = JSON.parse(localStorage.getItem("examPapers")) || {};
  Object.keys(papers).forEach(exam => {
    const opt = document.createElement("option");
    opt.value = exam;
    opt.textContent = exam;
    select.appendChild(opt);
  });
}


function goBack() {
  document.getElementById("teacherSection").style.display = "none";
  document.getElementById("studentSection").style.display = "none";
  document.getElementById("quiz").innerHTML = "";
  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("result").innerText = "";
  document.getElementById("roleSelect").style.display = "block";
}




























































