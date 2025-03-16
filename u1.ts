<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Online MCQ Exam</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            text-align: center;
            background-color: #e3f2fd;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background: white;
            padding: 30px;
            box-shadow: 0px 5px 15px rgba(0,0,0,0.2);
            border-radius: 12px;
        }
        .hidden { display: none; }
        .btn {
            background: linear-gradient(90deg, #007bff, #0056b3);
            color: white;
            border: none;
            padding: 12px 20px;
            cursor: pointer;
            border-radius: 8px;
            font-size: 16px;
            transition: 0.3s;
        }
        .btn:hover {
            background: linear-gradient(90deg, #0056b3, #004494);
        }
        .option {
            padding: 10px;
            border: 1px solid #ccc;
            margin: 5px;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.2s;
        }
        .option:hover, .selected {
            background-color: yellow;
        }
        .correct { color: green; font-weight: bold; }
        .incorrect { color: red; font-weight: bold; }
    </style>
</head>
<body>

    <div class="container" id="captchaContainer">
        <h2>Enter Captcha to Start Exam</h2>
        <p id="captcha">Loading...</p>
        <input type="text" id="captchaInput" placeholder="Enter Captcha" required>
        <br>
        <button class="btn" onclick="verifyCaptcha()">Verify & Start Exam</button>
    </div>

    <div class="container hidden" id="examContainer">
        <h2>Online Exam</h2>
        <p id="timer">Time Left: 10:00</p>
        <div id="questionsContainer"></div>
        <button class="btn" onclick="submitExam()">Submit</button>
    </div>

    <script>
        let questions = [
            { q: "What is 5 + 7?", options: { A: "10", B: "12", C: "14", D: "16" }, correct: "B" },
            { q: "Solve: 9 x 3", options: { A: "27", B: "30", C: "21", D: "24" }, correct: "A" },
            { q: "What is the square root of 64?", options: { A: "6", B: "8", C: "10", D: "12" }, correct: "B" },
            { q: "Solve: 15 ÷ 3", options: { A: "4", B: "5", C: "6", D: "3" }, correct: "B" },
            { q: "What is 20% of 50?", options: { A: "5", B: "10", C: "15", D: "20" }, correct: "B" }
        ];

        let selectedOptions = Array(questions.length).fill(null);

        function generateCaptcha() {
            document.getElementById("captcha").innerText = Math.random().toString(36).substr(2, 6).toUpperCase();
        }

        function verifyCaptcha() {
            if (document.getElementById("captchaInput").value.toUpperCase() === document.getElementById("captcha").innerText) {
                document.getElementById("captchaContainer").classList.add("hidden");
                document.getElementById("examContainer").classList.remove("hidden");
                loadQuestions();
            } else {
                alert("❌ Incorrect Captcha! Try Again.");
                generateCaptcha();
                document.getElementById("captchaInput").value = "";
            }
        }

        function loadQuestions() {
            let container = document.getElementById("questionsContainer");
            container.innerHTML = "";

            questions.forEach((item, index) => {
                let optionsHtml = Object.entries(item.options)
                    .map(([key, value]) =>
                        `<div class="option" data-value="${key}" onclick="selectOption(${index}, '${key}')" id="option-${index}-${key}">(${key}) ${value}</div>`
                    )
                    .join("");

                container.innerHTML += `
                    <div class="question" id="question-${index}">
                        <p><strong>Q${index + 1}.</strong> ${item.q}</p>
                        <div>${optionsHtml}</div>
                        <p id='feedback${index}'></p>
                    </div>
                `;
            });
        }

        document.addEventListener("keydown", function(event) {
            let allowedKeys = ["A", "B", "C", "D", "ArrowUp", "ArrowDown"];
            let key = event.key.toUpperCase();

            if (!allowedKeys.includes(key)) {
                event.preventDefault();
                return;
            }

            if (["A", "B", "C", "D"].includes(key)) {
                let currentIndex = findCurrentQuestion();
                if (currentIndex !== -1) {
                    selectOption(currentIndex, key);
                }
            } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                event.preventDefault();
                navigateQuestions(event.key);
            }
        });

        function findCurrentQuestion() {
            let activeQuestion = document.activeElement.closest(".question");
            return activeQuestion ? parseInt(activeQuestion.id.split("-")[1]) : -1;
        }

        function navigateQuestions(direction) {
            let questionsList = document.querySelectorAll(".question");
            let currentIndex = findCurrentQuestion();

            if (currentIndex === -1) return;

            let nextIndex = (direction === "ArrowUp")
                ? (currentIndex - 1 + questions.length) % questions.length
                : (currentIndex + 1) % questions.length;

            questionsList[nextIndex].querySelector(".option").focus();
        }

        function selectOption(qIndex, answer) {
            selectedOptions[qIndex] = answer;

            let options = document.querySelectorAll(`#question-${qIndex} .option`);
            options.forEach(opt => opt.classList.remove("selected"));

            let selectedElement = document.getElementById(`option-${qIndex}-${answer}`);
            if (selectedElement) {
                selectedElement.classList.add("selected");
            }

            checkAnswer(qIndex, answer);
        }

        function checkAnswer(qIndex, userAnswer) {
            let feedback = document.getElementById(`feedback${qIndex}`);
            if (userAnswer === questions[qIndex].correct) {
                feedback.innerText = "✅ Correct!";
                feedback.className = "correct";
            } else {
                feedback.innerText = `❌ Incorrect! The correct answer is: ${questions[qIndex].correct}`;
                feedback.className = "incorrect";
            }
        }

        function submitExam() {
            let score = selectedOptions.filter((ans, i) => ans === questions[i].correct).length;
            alert(`You scored ${score}/${questions.length}`);
        }

        window.onload = generateCaptcha;
    </script>

</body>
</html>
