const questions = [
  {
    question: "What is the unit digit of 347?",
    options: ["1", "3", "7", "9"],
    answer: "7"
  },
  {
    question: "Find the LCM of 8, 12, and 15.",
    options: ["60", "120", "180", "240"],
    answer: "120"
  },
  {
    question: "Find the HCF of 36 and 84.",
    options: ["6", "12", "18", "24"],
    answer: "12"
  },
  {
    question: "What is the remainder when 735 is divided by 6?",
    options: ["1", "3", "5", "7"],
    answer: "3"
  },
  {
    question: "Which of the following numbers is divisible by 11?",
    options: ["121", "132", "143", "156"],
    answer: "121"
  },
  {
    question: "Convert 0.375 into a fraction.",
    options: ["3/4", "5/8", "7/8", "3/8"],
    answer: "3/8"
  },
  {
    question: "Find the smallest number divisible by 6, 10, and 15.",
    options: ["30", "60", "90", "120"],
    answer: "30"
  },
  {
    question: "What is 25% of 640?",
    options: ["120", "140", "160", "180"],
    answer: "160"
  },
  {
    question: "Which of the following is a prime number?",
    options: ["51", "57", "59", "91"],
    answer: "59"
  },
  {
    question: "Simplify: (24 ÷ 6) × (5 + 3)",
    options: ["24", "32", "36", "48"],
    answer: "32"
  },
  {
    question: "The sum of two numbers is 48 and their HCF is 6. Which of the following cannot be their LCM?",
    options: ["48", "72", "96", "120"],
    answer: "48"
  },
  {
    question: "What is the unit digit of 988?",
    options: ["1", "3", "7", "9"],
    answer: "8"
  },
  {
    question: "How many prime numbers are there between 10 and 30?",
    options: ["4", "5", "6", "7"],
    answer: "6"
  },
  {
    question: "Find the remainder when 256 is divided by 7.",
    options: ["1", "2", "3", "4"],
    answer: "4"
  },
  {
    question: "Which of the following is a perfect square?",
    options: ["225", "243", "256", "Both A and C"],
    answer: "Both A and C"
  },
  {
    question: "If the product of two numbers is 180 and their HCF is 6, find their LCM.",
    options: ["30", "60", "90", "120"],
    answer: "30"
  },
  {
    question: "What is 5/8 of 320?",
    options: ["180", "200", "220", "240"],
    answer: "200"
  },
  {
    question: "Which number when divided by 9 leaves remainder 4?",
    options: ["49", "58", "67", "76"],
    answer: "67"
  },
  {
    question: "The smallest prime number is:",
    options: ["0", "1", "2", "3"],
    answer: "2"
  },
  {
    question: "What is the cube of 5?",
    options: ["25", "75", "100", "125"],
    answer: "125"
  },
  {
    question: "Find the LCM of 16 and 24.",
    options: ["24", "32", "48", "64"],
    answer: "48"
  },
  {
    question: "What is the value of √144 + √81?",
    options: ["15", "17", "21", "25"],
    answer: "21"
  },
  {
    question: "Which of the following numbers is even?",
    options: ["135", "247", "368", "579"],
    answer: "368"
  },
  {
    question: "How many factors does 18 have?",
    options: ["4", "5", "6", "8"],
    answer: "6"
  },
  {
    question: "Find the remainder when 1025 is divided by 9.",
    options: ["0", "1", "7", "9"],
    answer: "1"
  },
  {
    question: "What is 0.2 as a fraction?",
    options: ["1/2", "1/4", "1/5", "2/5"],
    answer: "1/5"
  },
  {
    question: "Which of the following is a composite number?",
    options: ["13", "17", "19", "21"],
    answer: "21"
  },
  {
    question: "If a number is divisible by 2 and 3, it must be divisible by:",
    options: ["4", "5", "6", "9"],
    answer: "6"
  },
  {
    question: "Find the square of 14.",
    options: ["186", "194", "196", "204"],
    answer: "196"
  },
  {
    question: "The sum of first 10 natural numbers is:",
    options: ["45", "50", "55", "60"],
    answer: "55"
  },
  {
    question: "Which of the following is not a prime number?",
    options: ["2", "3", "5", "9"],
    answer: "9"
  },
  {
    question: "What is the smallest 2-digit prime number?",
    options: ["11", "13", "17", "19"],
    answer: "11"
  },
  {
    question: "Find the HCF of 45 and 75.",
    options: ["5", "15", "25", "45"],
    answer: "15"
  },
  {
    question: "If a number is multiplied by zero, the result is:",
    options: ["0", "1", "Same number", "Undefined"],
    answer: "0"
  },
  {
    question: "Which of the following is a perfect cube?",
    options: ["64", "81", "100", "121"],
    answer: "64"
  }
];


function loadQuestions() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";

    div.innerHTML = `
      <p>${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${index}" value="${opt}">
          ${opt}
        </label><br>
      `).join("")}
    `;

    quizDiv.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="q${index}"]:checked`
    );
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("result").innerText =
    `Score: ${score} / ${questions.length}`;
}

window.onload = loadQuestions;

