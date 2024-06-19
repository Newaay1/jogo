document.addEventListener('DOMContentLoaded', () => {
    const draggableItems = document.querySelectorAll('.comidasdrag img, .comidasdrag2 img');
    const caixas = document.querySelectorAll('.caixa1, .caixa2');

    draggableItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    caixas.forEach(caixa => {
        caixa.addEventListener('dragover', dragOver);
        caixa.addEventListener('drop', drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const item = document.getElementById(id);
        const targetBox = event.target.closest('.caixa1, .caixa2');

        if (item && targetBox) {
            if (item.getAttribute('data-target') === targetBox.id) {
                const pos = positions[item.id];
                if (pos) {
                    item.style.position = 'absolute';
                    item.style.left = `${pos.x}px`;
                    item.style.top = `${pos.y}px`;
                    item.style.visibility = 'visible';
                }
                playSound('correct');
            } else {
                playSound('error');
            }
        }
    }

    function playSound(type) {
        let audio;
        if (type === 'correct') {
            audio = new Audio('assets/correto.mp3');
        } else if (type === 'error') {
            audio = new Audio('assets/erro.mp3');
        }
        audio.play();
    }
});
