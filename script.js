alert("JS LOADED");
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
  },
  {
    question: "Q1. If + means ×, − means ÷, × means +, ÷ means −, find the value of 8 + 4 − 2.",
    options: ["18", "10", "4", "16"],
    answer: "18"
  },
  {
    question: "Q2. If A @ B means A × B + A, find 6 @ 4.",
    options: ["24", "30", "28", "26"],
    answer: "30"
  },
  {
    question: "Q3. If × means ÷ and ÷ means ×, find 24 × 6 ÷ 2.",
    options: ["72", "8", "12", "48"],
    answer: "8"
  },
  {
    question: "Q4. If + means − and − means +, find 18 + 7 − 5.",
    options: ["20", "10", "30", "6"],
    answer: "20"
  },
  {
    question: "Q5. If A # B = (A + B) × 2, find 5 # 7.",
    options: ["20", "24", "26", "30"],
    answer: "24"
  },
  {
    question: "Q6. If + means ÷, − means ×, × means −, ÷ means +, find 8 + 4 − 2 × 6 ÷ 3.",
    options: ["6", "10", "12", "14"],
    answer: "10"
  },
  {
    question: "Q7. If A $ B = A² − B², find 9 $ 5.",
    options: ["56", "64", "36", "81"],
    answer: "56"
  },
  {
    question: "Q8. If A * B = (A + B) ÷ (A − B), find 10 * 6.",
    options: ["4", "2", "8", "1"],
    answer: "4"
  },
  {
    question: "Q9. If + means × and × means +, find 7 + 5 × 3.",
    options: ["22", "26", "36", "21"],
    answer: "22"
  },
  {
    question: "Q10. If A % B = (A ÷ B) + (B ÷ A), find 8 % 2.",
    options: ["4.25", "4", "2.5", "5"],
    answer: "4.25"
  },
  {
    question: "Q11. If − means ÷ and ÷ means +, find 18 − 6 ÷ 3.",
    options: ["6", "9", "7", "12"],
    answer: "9"
  },
  {
    question: "Q12. If A @ B @ C = A × B − C, find 5 @ 4 @ 6.",
    options: ["14", "20", "26", "10"],
    answer: "14"
  },
  {
    question: "Q13. If + means −, − means ×, × means ÷, find 16 + 4 − 2 × 4.",
    options: ["3", "4", "6", "8"],
    answer: "3"
  },
  {
    question: "Q14. If A & B = (A + B)² − (A − B)², find 6 & 4.",
    options: ["96", "48", "40", "80"],
    answer: "96"
  },
  {
    question: "Q15. If ÷ means − and − means +, find 20 ÷ 8 − 5.",
    options: ["23", "17", "7", "13"],
    answer: "23"
  },
  {
    question: "Q16. If A ⊕ B = A² + B² − 2AB, find 7 ⊕ 3.",
    options: ["16", "10", "20", "8"],
    answer: "16"
  },
  {
    question: "Q17. If + means ×, − means +, × means ÷, ÷ means −, find 18 + 6 − 3 × 9 ÷ 2.",
    options: ["52", "48", "30", "36"],
    answer: "52"
  },
  {
    question: "Q18. If A Δ B = (A × B) + (A ÷ B), find 12 Δ 4.",
    options: ["51", "49", "48", "52"],
    answer: "51"
  },
  {
    question: "Q19. If A * B = A³ − B³, find 5 * 2.",
    options: ["117", "125", "27", "98"],
    answer: "117"
  },
  {
    question: "Q20. If + means ÷ and ÷ means ×, find 16 + 4 ÷ 2.",
    options: ["2", "8", "32", "10"],
    answer: "8"
  },
  {
    question: "Q1. Which sector is known as the backbone of the Indian economy?",
    options: ["Industrial", "Agricultural", "Service", "Banking"],
    answer: "Agricultural"
  },
  {
    question: "Q2. What is meant by GDP?",
    options: ["Total income of citizens", "Total production within country", "Total exports", "Total government revenue"],
    answer: "Total production within country"
  },
  {
    question: "Q3. Which of the following is a non-tax revenue?",
    options: ["Income tax", "GST", "Customs duty", "Dividend"],
    answer: "Dividend"
  },
  {
    question: "Q4. Which bank issues currency notes in India?",
    options: ["SBI", "Ministry of Finance", "Reserve Bank of India", "NABARD"],
    answer: "Reserve Bank of India"
  },
  {
    question: "Q5. What does LPG stand for in economic reforms?",
    options: ["Liberalisation, Privatisation, Globalisation", "Labour, Production, Growth", "Law, Policy, Governance", "Localisation, Production, Growth"],
    answer: "Liberalisation, Privatisation, Globalisation"
  },
  {
    question: "Q6. Which year marks the beginning of economic reforms in India?",
    options: ["1985", "1990", "1991", "1995"],
    answer: "1991"
  },
  {
    question: "Q7. Which tax replaced multiple indirect taxes in India?",
    options: ["VAT", "Service Tax", "Excise Duty", "GST"],
    answer: "GST"
  },
  {
    question: "Q8. Which sector contributes the maximum share to India’s GDP?",
    options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
    answer: "Tertiary"
  },
  {
    question: "Q9. What is fiscal deficit?",
    options: ["Excess of revenue over expenditure", "Excess of expenditure over revenue", "Excess of exports over imports", "Excess of savings over investment"],
    answer: "Excess of expenditure over revenue"
  },
  {
    question: "Q10. Which committee recommended banking sector reforms in India?",
    options: ["Rangarajan Committee", "Kelkar Committee", "Narasimham Committee", "Sukhamoy Chakravarty Committee"],
    answer: "Narasimham Committee"
  },
  {
    question: "Q11. What is inflation?",
    options: ["Fall in prices", "Rise in prices", "Increase in income", "Increase in production"],
    answer: "Rise in prices"
  },
  {
    question: "Q12. Which index measures inflation at the consumer level?",
    options: ["WPI", "CPI", "IIP", "GDP Deflator"],
    answer: "CPI"
  },
  {
    question: "Q13. Which institution regulates monetary policy in India?",
    options: ["SEBI", "Finance Ministry", "RBI", "NITI Aayog"],
    answer: "RBI"
  },
  {
    question: "Q14. What is the full form of NITI?",
    options: ["National Institution for Transforming India", "National Institute of Trade in India", "National Investment Trust of India", "National Infrastructure Team of India"],
    answer: "National Institution for Transforming India"
  },
  {
    question: "Q15. Which plan replaced the Planning Commission?",
    options: ["RBI", "Finance Commission", "NITI Aayog", "SEBI"],
    answer: "NITI Aayog"
  },
  {
    question: "Q16. Which sector shows disguised unemployment in India?",
    options: ["Industrial", "Service", "Agricultural", "Banking"],
    answer: "Agricultural"
  },
  {
    question: "Q17. What is meant by Balance of Trade?",
    options: ["Difference between exports and imports", "Difference between revenue and expenditure", "Difference between savings and investment", "Difference between assets and liabilities"],
    answer: "Difference between exports and imports"
  },
  {
    question: "Q18. What is stagflation?",
    options: ["Inflation without unemployment", "Inflation with unemployment", "Deflation with growth", "Growth without inflation"],
    answer: "Inflation with unemployment"
  },
  {
    question: "Q19. Which tax is levied directly on income?",
    options: ["GST", "Excise duty", "Income tax", "Customs duty"],
    answer: "Income tax"
  },
  {
    question: "Q20. What is repo rate?",
    options: ["Rate at which banks lend to public", "Rate at which RBI lends to banks", "Rate of interest on deposits", "Rate on government bonds"],
    answer: "Rate at which RBI lends to banks"
  },
  {
    question: "Q21. Which organisation prepares India’s Union Budget?",
    options: ["RBI", "NITI Aayog", "Finance Ministry", "Planning Commission"],
    answer: "Finance Ministry"
  },
  {
    question: "Q22. Which indicator measures industrial growth?",
    options: ["CPI", "IIP", "GDP", "WPI"],
    answer: "IIP"
  },
  {
    question: "Q23. What is capital formation?",
    options: ["Consumption of goods", "Creation of assets", "Destruction of assets", "Export of capital"],
    answer: "Creation of assets"
  },
  {
    question: "Q24. Which sector is also called the service sector?",
    options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
    answer: "Tertiary"
  },
  {
    question: "Q25. Which Indian bank is known as the banker’s bank?",
    options: ["SBI", "RBI", "NABARD", "PNB"],
    answer: "RBI"
  },
  {
    question: "Q26. Which tax is not shared between Centre and States?",
    options: ["Income tax", "Corporation tax", "GST", "Customs duty"],
    answer: "Customs duty"
  },
  {
    question: "Q27. What is the full form of SEBI?",
    options: ["Securities and Exchange Board of India", "Stock Exchange Board of India", "Securities and Economic Board of India", "Share Exchange Board of India"],
    answer: "Securities and Exchange Board of India"
  },
  {
    question: "Q28. Which plan period introduced Green Revolution?",
    options: ["First", "Second", "Third", "Fourth"],
    answer: "Third"
  },
  {
    question: "Q29. What does per capita income indicate?",
    options: ["National income", "Average income", "Government income", "Tax income"],
    answer: "Average income"
  },
  {
    question: "Q30. Which sector involves mining and fishing?",
    options: ["Primary", "Secondary", "Tertiary", "Service"],
    answer: "Primary"
  },
  {
    question: "Q31. Who controls fiscal policy in India?",
    options: ["RBI", "Parliament", "Finance Ministry", "SEBI"],
    answer: "Finance Ministry"
  },
  {
    question: "Q32. What is deficit financing?",
    options: ["Tax collection", "Printing of money", "Export promotion", "Import substitution"],
    answer: "Printing of money"
  },
  {
    question: "Q33. Which body regulates capital markets in India?",
    options: ["RBI", "SEBI", "NABARD", "IRDA"],
    answer: "SEBI"
  },
  {
    question: "Q34. Which tax is levied on goods manufactured in India?",
    options: ["Customs duty", "Excise duty", "Income tax", "Sales tax"],
    answer: "Excise duty"
  },
  {
    question: "Q35. Which sector converts raw material into finished goods?",
    options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
    answer: "Secondary"
  },
  {
    question: "Q36. What is the tenure of Finance Commission?",
    options: ["3 years", "4 years", "5 years", "6 years"],
    answer: "5 years"
  },
  {
    question: "Q37. Which bank provides long-term credit to agriculture?",
    options: ["SBI", "RBI", "NABARD", "PNB"],
    answer: "NABARD"
  },
  {
    question: "Q38. Which type of unemployment is common among educated youth?",
    options: ["Seasonal", "Disguised", "Structural", "Educated unemployment"],
    answer: "Educated unemployment"
  },
  {
    question: "Q39. What is the main objective of GST?",
    options: ["Increase inflation", "One Nation One Tax", "Reduce exports", "Increase subsidies"],
    answer: "One Nation One Tax"
  },
  {
    question: "Q40. Which sector includes transport, banking, and insurance?",
    options: ["Primary", "Secondary", "Tertiary", "Agricultural"],
    answer: "Tertiary"
  }
];


function loadQuestions() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";
    div.id = `question-${index}`;

    div.innerHTML = `
      <p><b>Q${index + 1}.</b> ${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${index}" value="${opt}">
          ${opt}
        </label><br>
      `).join("")}
      <p id="answer-${index}" style="display:none;"></p>
      <hr>
    `;

    quizDiv.appendChild(div);
  });
}

// START EXAM
function startExam() {
  document.getElementById("studentForm").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("submitBtn").style.display = "inline-block";

  loadQuestions();
}

// SUBMIT QUIZ (SCORE + RIGHT/WRONG)
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
}



















