// buttons
const startBtn = document.querySelector('.start button');
const quitRulesBtn = document.querySelector('.quit');
const nextQuestionBtn = document.querySelector('.next');
//boxes
const infoBox = document.querySelector('.info__box'),
    continueBtn = infoBox.querySelector('.box__footer .continue');
// question box
const quizBox = document.querySelector('.quiz__box'),
    questionText = quizBox.querySelector('.question .question__text'),
    answers = quizBox.querySelector('.answer__list'),
    totalQuestion = quizBox.querySelector('.box__footer .total p');
/// result box
const resultBox = document.querySelector('.result_box'),
    questionCount = resultBox.querySelector('.question__count'),
    resultCorrectAnswerCount = resultBox.querySelector('.correct__answer__count'),
    percentageCorrectAnswer = resultBox.querySelector('.percentage__correct__answer'),
    incorrectAnswerCount = resultBox.querySelector('.incorrect__answer__count');
/// restart & exit buttons
const exitQuizBtn = document.querySelector('.quit__quiz__btn');
const restartQuizBtn = document.querySelector('.restart__btn');
//icons
const correctIcon = '<i class="fa-solid fa-check"></i>';
const incorrectIcon = '<i class="fa-solid fa-xmark"></i>';

//// ********* ////
let index = 0;
let errorAnswerCount = 0;
let correctAnswerCount = 0;

let data = [
    {
        question:'What’s the total number of dots on a pair of dice?',
        correct:'42',
        options: [
            '42',
            '38',
            '44',
            '48'
        ]
    },
    {
        question:'Which bird has the largest wingspan?',
        correct:'Albatross',
        options: [
            'eagle',
            'albatross',
            'owl'
        ]
    },
    {
        question:'What is the second smallest country in the world?',
        correct:'monaco',
        options: [
            'San Marino',
            'Vatican',
            'Monaco',
            'Andorra'
        ]
    },
    {
        question:'Is the Horse the fastest animal of the World?',
        correct:'no',
        options: [
            'yes',
            'no'
        ]
    },
    {
        question:'Which chess piece can only move diagonally?',
        correct:'bishop',
        options: [
            'bishop',
            'king',
            'pawn',
            'knight'
        ]
    },
    {
        question:'Which animal has the highest blood pressure?',
        correct:'giraffe',
        options: [
            'dog',
            'tiger',
            'giraffe',
            'elephant'
        ]
    },
];

/// call functions
showQuestions(index);

//// button events
startBtn.addEventListener('click', () => {
    addClass(infoBox,'show__box');
    startBtn.style.display = 'none';
});
quitRulesBtn.addEventListener('click', () => {
    removeClass(infoBox,'show__box');
    startBtn.style.display = 'block';
});
continueBtn.addEventListener('click', () => {
   addClass(quizBox,'show__box');
   removeClass(infoBox,'show__box');
});
nextQuestionBtn.addEventListener('click', () => {
    nextQuestion();
});
/// exit and restart quiz button events
exitQuizBtn.addEventListener('click', () => {
    startBtn.style.display = 'block';
    removeClass(quizBox,'show__box');
    removeClass(resultBox,'show__box');
    reset();
});
restartQuizBtn.addEventListener('click', () => {
   addClass(quizBox,'show__box');
   removeClass(resultBox,'show__box');
   reset();
});


///functions
function addClass(element,classname){
    element.classList.add(classname);
}
function removeClass(element,classname){
    element.classList.remove(classname);
}
function showQuestions(index){
    let answer = '';
    questionText.innerText = data[index].question;
    for (let i = 0; i < data[index].options.length; i++) {
        answer += `<div class="answer">${data[index].options[i]}</div>`
    }
    answers.innerHTML = answer;
    let allAnswers = document.querySelectorAll('.answer');
    for (let i = 0; i < allAnswers.length; i++) {
        allAnswers[i].addEventListener('click', (e) => {
            selectedAnswer(allAnswers[i],e.target);
        });
    }
    totalQuestion.innerText = `${index + 1} / ${data.length}`;
    nextQuestionBtn.style.display = 'none';
}

function nextQuestion() {
    index++;
    if(data.length > index){
        showQuestions(index);
    } else {
        removeClass(quizBox,'show__box');
        addClass(resultBox,'show__box');
        questionCount.innerText = `questions count: ${data.length}`;
        resultCorrectAnswerCount.innerText = `correct answer: ${correctAnswerCount}`;
        incorrectAnswerCount.innerText = `incorrect answer: ${errorAnswerCount}`;
        percentageCorrectAnswer.innerText =
            `correct answer(%): ${Math.round((correctAnswerCount * 100) / data.length)}% `;
    }
    if(data.length - 1 === index){
        nextQuestionBtn.innerText = 'result';
    }
}

function selectedAnswer(answer, target){
    let selected = answer.innerText;
    let correctAnswer = data[index].correct;
    nextQuestionBtn.style.display = 'block';
    let allAnswers = document.querySelectorAll('.answer');
    if(selected.toLowerCase() === correctAnswer.toLowerCase()){
        target.classList.add('correct');
        target.insertAdjacentHTML('beforeend',correctIcon);
        correctAnswerCount++;
    } else {
        target.classList.add('incorrect');
        target.insertAdjacentHTML('beforeend',incorrectIcon);
        errorAnswerCount++;
    }
    for (let i = 0; i < allAnswers.length; i++) {
        allAnswers[i].style.pointerEvents = 'none';
    }
}

function reset() {
    index = 0;
    errorAnswerCount = 0;
    correctAnswerCount = 0;
    nextQuestionBtn.innerText = 'next';
    showQuestions(index);
}