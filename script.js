// QUESTIONS
const questions = [
  {
    question: "2 + 2 = ?",
    options: ["1", "2", "3", "4"],
    answer: "4"
  },
  {
    question: "5 × 3 = ?",
    options: ["10", "15", "20", "25"],
    answer: "15"
  },
  {
    question: "10 − 4 = ?",
    options: ["5", "6", "7", "8"],
    answer: "6"
  }
];



// START EXAM
function startExam() {
  const name = document.getElementById("studentName").value.trim();
  const roll = document.getElementById("rollNumber").value.trim();

  if (name === "" || roll === "") {
    alert("Please enter Name and Roll Number");
    return;
  }

  // Student details hide
  document.getElementById("studentSection").style.display = "none";

  // Questions load
  loadQuestions();

  // Submit button show
  document.getElementById("submitBtn").style.display = "inline-block";
}




// LOAD QUESTIONS
function loadQuestions() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  questions.forEach((q, index) => {
    quizDiv.innerHTML += `
      <p>${index + 1}. ${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${index}" value="${opt}">
          ${opt}
        </label><br>
      `).join("")}
      <hr>
    `;
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
      dob: student.dob,
      score: score,
      total: questions.length,
      exam: examId
    })
  })
  .then(res => res.text())
  .then(txt => console.log("Sheet response:", txt))
  .catch(err => console.error("Fetch error:", err));
}





















































