(function () {

    const newClientBtn = document.querySelector('#newCLient');
    const modalNovoCliente = document.querySelector('#modalNovoCliente');
    const closeModalBtn = document.querySelector('#closeModal');

    modalNovoCliente.classList.add('hidden');

    newClientBtn?.addEventListener('click', () => {
        modalNovoCliente.classList.toggle('hidden');
    });

    closeModalBtn?.addEventListener('click', () => {
        modalNovoCliente.classList.add('hidden');
    });


    let n = 1;
    function showEtapa(n) {
        for (let i = 1; i <= 5; i++) {
            const card = document.getElementById('etapa' + i);
            if (card) {
                card.classList.remove('active');
                card.classList.add('etapa');
            }
            const step = document.getElementById('step' + i);
            if (step) step.classList.remove('active');
        }
        const currentCard = document.getElementById('etapa' + n);
        if (currentCard) {
            currentCard.classList.add('active');
            currentCard.classList.remove('etapa');
        }
        const currentStep = document.getElementById('step' + n);
        if (currentStep) currentStep.classList.add('active');
        const progress = document.getElementById('progressBarFill');
        if (progress) progress.style.width = (n * 20) + '%';
    }

    showEtapa(n);

    document.getElementById('btnProximo1').onclick = function () { showEtapa(2); };
    document.getElementById('btnVoltar2').onclick = function () { showEtapa(1); };
    document.getElementById('btnProximo2').onclick = function () { showEtapa(3); };
})();