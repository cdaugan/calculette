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

    function poserQuestion(question) {
        $('#question').text(question);
    }

    function nouvelleQuestion() {
        let op1 = (Math.floor(Math.random() * 9) + 1);
        let operation = (Math.floor(Math.random() * 3));
        let op2 = (Math.floor(Math.random() * 9) + 1);
        return {
            op1: op1,
            operation: operation,
            op2: op2,
        };
    }


    let question = nouvelleQuestion();
    poserQuestion(question.op1 + operations[question.operation].nom + question.op2 + ' =');



    $('#reponse-decor').on('submit', function (e) {
        e.preventDefault();
        let reponse = $('#reponse').val();
        console.log('Ta réponse est ' + reponse);
        let bonneReponse = operations[question.operation].calcul(question.op1, question.op2);
        if (reponse == bonneReponse) {
            console.log('Bravo bonne réponse');
        } else {
            console.log('Désolé, la bonne réponse était ' + bonneReponse);

        }
    })


})