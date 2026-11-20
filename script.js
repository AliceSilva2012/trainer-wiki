const treinadorSprite = document.getElementById('treinador-sprite');
const treinadorName = document.getElementById('treinador-name');
const treinadorTeam = document.getElementById('treinador-team');
const treinadorRegion = document.getElementById('treinador-region');
const treinadorClass = document.getElementById('treinador-class');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let treinadores = [];
let currentIndex = 0;

async function chamarTreinador() {
    try {
        const response = await fetch('./trainer.json');
        treinadores = await response.json();
        renderTreinador(currentIndex); // <-- Corrigido aqui
    } catch (error) {
        console.error('Erro ao carregar treinadores.json:', error);
    }
}

function renderTreinador(index) {
    const treinador = treinadores[index];
    if (!treinador) return;

    treinadorSprite.src = treinador.sprite;
    treinadorSprite.alt = treinador.nome;
    treinadorName.textContent = treinador.nome;
    treinadorRegion.textContent = treinador.regiao;
    treinadorClass.textContent = treinador.cargo;

    treinadorTeam.innerHTML = '';
    treinador.time.forEach((pokemonId) => {
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        img.alt = `Pokémon #${pokemonId}`;
        treinadorTeam.appendChild(img);
    });
}

function nextTreinador() {
    if (!treinadores.length) return;
    currentIndex = (currentIndex + 1) % treinadores.length;
    renderTreinador(currentIndex);
}

function prevTreinador() {
    if (!treinadores.length) return;
    currentIndex = (currentIndex - 1 + treinadores.length) % treinadores.length;
    renderTreinador(currentIndex);
}

btnNext.addEventListener('click', nextTreinador);
btnPrev.addEventListener('click', prevTreinador);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') nextTreinador();
    if (event.key === 'ArrowLeft') prevTreinador();
});

chamarTreinador();