function checkAnswers() {
    let score = 0;

    const answers = {
        q1: "4",
        q2: "Paris"
    };

    for (let question in answers) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        if (selected && selected.value === answers[question]) {
            score++;
        }
    }

    document.getElementById("result").innerText =
        `Your score: ${score} / ${Object.keys(answers).length}`;
}
