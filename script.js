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

  loadQuestions();
    // 👇 Submit button show karo
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
      'input[name="q' + index + '"]:checked'
    );
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("result").innerText =
    "Score: " + score + " / " + questions.length;
}



















































