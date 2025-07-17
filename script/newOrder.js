(function () {
    for (let i = 1; i <= 5; i++) {
        const card = document.getElementById('etapa' + i);
        if (card) card.classList.remove('active');
        const step = document.getElementById('step' + i);
        if (step) step.classList.remove('active');
    }
    const currentCard = document.getElementById('etapa' + n);
    if (currentCard) currentCard.classList.add('active');
    const currentStep = document.getElementById('step' + n);
    if (currentStep) currentStep.classList.add('active');
    // Atualiza barra de progresso
    const progress = document.getElementById('progressBarFill');
    if (progress) progress.style.width = (n * 20) + '%';

    document.getElementById('btnProximo1').onclick = function () { showEtapa(2); };
    document.getElementById('btnVoltar2').onclick = function () { showEtapa(1); };
    document.getElementById('btnProximo2').onclick = function () { /* showEtapa(3); */ };
})();