// QUESTIONS
const examPapers = {
  maths: [
    {
      question: "2 + 2 = ?",
      options: ["1", "2", "3", "4"],
      answer: "4"
    },
    {
      question: "5 × 3 = ?",
      options: ["10", "15", "20", "25"],
      answer: "15"
    }
  ],

  reasoning: [
    {
      question: "Which number comes next: 2, 4, 8, ?",
      options: ["10", "12", "16", "18"],
      answer: "16"
    },
    {
      question: "Odd one out?",
      options: ["Dog", "Cat", "Cow", "Chair"],
      answer: "Chair"
    }
  ]
};

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

  examId = selectedExam;                 // 👈 save exam id
  questions = examPapers[selectedExam];  // 👈 load exam questions

  // save student for sheet
  const student = { name, roll };
  localStorage.setItem("currentStudent", JSON.stringify(student));

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
  fetch("https://script.google.com/macros/s/AKfycbxzHCSz9-jW3NkZs1F4_14eCj8UiW-ESWtZ_RrfKeie2boJJC0LFU19I1gF55ikjJwOzQ/exec", {
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























































