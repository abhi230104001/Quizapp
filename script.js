const questions =[{
 question: "which is largest animal in the world?",
 answers:[
    {text:"Shark",correct: false},
    {text:"Blue whale",correct: true},
    {text:"Elephant",correct: false},
    {text:"Giraffe",correct: false}

 ]
},
{
    question: "which is largest desert in the world?",
 answers: [
    {text:"Kalahari", correct: false},
    {text:"Gobi", correct: false},
    {text:"Sahara", correct: false},
    {text:"Antartica", correct: true}

 ]
},
{
    question: "which is largest continent  in the world?",
 answers:[
    {text:"Asia",correct: true},
    {text:"Australia",correct: false},
    {text:"Artic",correct: false},
    {text:"Africa",correct: false}

 ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion(){
resetstate();

    let currentQuestion = questions[currentQuestionIndex];
     let questionNo = currentQuestionIndex+1;
      questionElement.innerHTML = questionNo+". "+currentQuestion.question;
       currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)

       });
}
 function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
 }

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct==='true';
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==='true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
 function showScore(){
    resetstate();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display ="block";
 }
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
        if(currentQuestionIndex<questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
});


startQuiz();