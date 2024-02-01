//Dados iniciais
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

//Eventos
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//Funções
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;


        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"> <span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    
    } else {
        finishQuiz();
    }

}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = "Voce tá longe de ser um Charles Henriquepédia!";
        document.querySelector('.scoreText1').style.color = '#ff0000';
    } else if(points >= 30 && points< 70) {
        document.querySelector('.scoreText1').innerHTML = "Você passou no TCC de Noveleiro";
        document.querySelector('.scoreText1').style.color = '#ffff00';
    } else if(points >=70) {
        document.querySelector('.scoreText1').innerHTML = "Sai do fake Charles Henriquepédia!";
        document.querySelector('.scoreText1').style.color = '#0d630d';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} Questões e acertou ${correctAnswers}.`

    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';

    document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvent(){
    correctAnswers= 0;
    currentQuestion=0;
    showQuestion();
}