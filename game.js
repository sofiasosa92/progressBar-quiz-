// this is where i am going to pull the quiz questions from to display on web.

const question =document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    { //question one 
        question: "what is bla bla bla",
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '5',
        asnwer: 2,
    },
    {
        question: "who is bla bla bla",
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '5',
        asnwer: 4,
    },
    {
        question: "where is bla bla bla",
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '5',
        asnwer: 6,
    },
    {
        question: "When is bla bla bla",
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '5',
        asnwer: 5,
    },
]
//capitals means we dont plan on changing it

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'


    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}
   

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.asnwer ? 'correct' :
            'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}