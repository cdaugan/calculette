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
        },
        {
            nom: ':',
            calcul: function (op1, op2) {
                return op1 / op2;
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
    let temps_Restant = 60;

    function afficherQuestion(question) {
        $('#question').text(question);
        $('#score').text(score);
        $('#scorePourcent').text(nbQuestions == 0 ? '0% - #' : Math.floor((score / nbQuestions * 100)) + '% - #');
    }

    let question = null;

    function demarrer() {
        score =0;
        nbQuestions=0;
        temps_Restant = 60;
        let miseAJourTemps = function () {
            // Mettre à jour le temps restant
            $('#tempsRestant').text('' + temps_Restant + 's');

        }
        debugger;
        let miseAJourTempsDans1s = function () {
            setTimeout(function () {
                temps_Restant = temps_Restant - 1;
                miseAJourTemps();
                if (temps_Restant < 0) {
                    $('#tempsRestant').text('Terminé !');
                    $("#start").show();
                } else {
                    miseAJourTempsDans1s();
                }
            }, 1000);
        };
        miseAJourTemps();
        miseAJourTempsDans1s();

        // Initialisation : première question
        nouvelleQuestion();
    }

    function play(type) {
        var audio = $('#audio-' + type)[0];
        audio.play();
        setTimeout(function () {
            audio.pause();
            audio.currentTime = 0;
        }, 1000);
    }

    function nouvelleQuestion() {
        question = genererQuestion();
        let bonneReponse = operations[question.operation].calcul(question.op1, question.op2);
        if (bonneReponse < 0 || Math.floor(bonneReponse) != bonneReponse) {
            // Pas de nombre négatif authorisé ni de décimaux
            nouvelleQuestion();
            return;
        }
        afficherQuestion(question.op1 + operations[question.operation].nom + question.op2 + ' =');
        $('#reponse').trigger('focus');
        $('#reponse').val('');
    }

    $('#reponse-decor').on('submit', function (e) {
        e.preventDefault();
        let reponse = $('#reponse').val();
        console.log('Ta réponse est ' + reponse);
        let bonneReponse = operations[question.operation].calcul(question.op1, question.op2);
        if (reponse == bonneReponse) {
            console.log('Bravo bonne réponse');
            // $('#reponse').addClass("bonne");
            $('body').removeClass("mauvaise");
            $('body').addClass("bonne");
            play("bonne");

            score++; // score = score + 1; score += 1;
        } else {
            console.log('Désolé, la bonne réponse était ' + bonneReponse);
            // $('#reponse').addClass("mauvaise"); 
            $('body').removeClass("bonne");
            $('body').addClass("mauvaise");
            play("mauvaise");
        }
        nbQuestions++;
        nouvelleQuestion();
    })


    $("#bouton-bonne").on("click", function () {
        play("bonne");
    });
    $("#bouton-mauvaise").on("click", function () {
        play("mauvaise");
    });

    $("#start").on("click", function () {
        demarrer();
        $("#start").hide();
    });
})