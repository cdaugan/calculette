$(function () {
    console.log('Hello');

    const operations = [{
            nom: '+',
            calcul: function (op1, op2) {
                return op1 + op2;
            }
        },
        {
            nom: '-',
            calcul: function (op1, op2) {
                return op1 - op2;
            }
        },
        {
            nom: 'x',
            calcul: function (op1, op2) {
                return op1 * op2;
            }
        }
    ];


    function genererQuestion() {
        let op1 = (Math.floor(Math.random() * 9) + 1);
        let operation = (Math.floor(Math.random() * 3));
        let op2 = (Math.floor(Math.random() * 9) + 1);
        return {
            op1: op1,
            operation: operation,
            op2: op2,
        };
    }

    let score = 0;
    let nbQuestions = 0;

    function afficherQuestion(question) {
        $('#question').text(question);
        $('#score').text(score);
        $('#scorePourcent').text(nbQuestions == 0 ? '0% - #' : Math.floor((score/nbQuestions*100 )) + '% - #');
    }

    let question = null;

    function nouvelleQuestion() {
        question = genererQuestion();
        afficherQuestion(question.op1 + operations[question.operation].nom + question.op2 + ' =');
        $('#reponse').trigger('focus');
        $('#reponse').val('');
    }

    $('#reponse-decor').on('submit', function (e) {
        e.preventDefault();
        let reponse = $('#reponse').val();
        console.log('Ta réponse est ' + reponse);
        let bonneReponse = operations[question.operation].calcul(question.op1, question.op2);
        $('#reponse').removeClass("bonne").removeClass("mauvaise");
        if (reponse == bonneReponse) {
            console.log('Bravo bonne réponse');
            $('#reponse').addClass("bonne");
            score++; // score = score + 1; score += 1;
        } else {
            console.log('Désolé, la bonne réponse était ' + bonneReponse);
            $('#reponse').addClass("mauvaise"); 
        }
        nbQuestions++;
        nouvelleQuestion();
    })

    // Initialisation : première question
    nouvelleQuestion();
})