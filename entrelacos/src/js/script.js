const btn = document.querySelectorAll('div button');
const addcar = document.querySelector('#addcar')
const opencar = document.querySelector('.carrinho')
const classs = document.querySelector('.adicionar')
const real = document.querySelector('label'.value)
console.log(Number(real.value))
const produto = []
const valor = Number(real.value)
console.log(valor.value)
for (botao in btn) {
    btn[botao].addEventListener(`click`, cores)
}

function cores() {
    if (this.className == 'adicionar') {
        console.log('abrindo carrinho')
        opencar.style.display = 'block'
        initCar()
    } else
        if (this.className != btn.className) {
            console.log('escolhendo cor')
            this.parentNode.parentNode.querySelector('img').src = 'src/pictures/' + this.name + '-' + this.id + '.jpg'
        } else {
            erro()
        }



}

function initCar() {
    for (botaoCar in btn) {
        if (this[botaoCar] == btn.name || this[botaoCar] == btn.name) {
            console.log("carrinho aberto")
            return alert('Item adicionado ao carrinho.');
        } else {
            erro()
        }
    }
}

function erro() {
    alert('ERRO')
}