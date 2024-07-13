const btn = document.querySelectorAll('div button'); //declarando todos os button para array
const addcar = document.querySelector('#addcar') //declarando id do adicionar ao carrinho
const opencar = document.querySelector('.carrinho') // abrindo display do carrinho
const cs = document.querySelector('.adicionar') // definindo classe do adicionar ao carrinho
const produto = ['nome', 'cor', 'tamanho', 'preço'] // declaranddo array, com as caracteristicas dos produtos
let newId; //declarando variavel global para substituir o ID
const corClass = document.querySelectorAll('.cor'); // pegando a classe cor dos botões reservados a cor do produto
corClass.forEach(button => { // declarando função responsável pela troca do id da imagem pelo id da cor
    button.addEventListener('click', corProduto); //ação de chamada da troca de id
});
let removeOutline; // variavel para resetar o outline
function corProduto() {
    newId = this.id; //função apra trocar id
    corClass.forEach(button => { //passando array para pegar todos botões de cor
        button.style.outline = 'none' // reset da outline
    })
}
let valProd;  // declaranddo variavel para preço
const lab = document.querySelectorAll('label') // pegando label para definir preço
lab.forEach(label => {
    valProd = label.innerText //pegando o valor
    valProd = valProd.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) // convertendo para moeda
});
let resetNow
const sel = document.querySelector('select') // declarando select para definir o tamanho

for (botao in btn) { // definindo array para button
    btn[botao].addEventListener(`click`, initCar) //ação de chamada para todos os button
}
function initCar() {
    let corIn = this.parentNode.parentNode.parentNode.parentNode.querySelector('img') //manipulando DOM para pegar a imagem
    corIn.id = newId // substutindo o Id do adicionar ao carrinho para o id da cor selecionada

    if (this.className == 'adicionar') { // inicia comparação para identificar que o button se trata do adicionar ao carrinho
            console.log('abrindo carrinho')
            opencar.style.display = 'block' // abrindo carrinho
            let nome = (produto[0] = this.name) // pegando nome do produto
            let cor = (produto[1] = corIn.id) // pegando a cor
            let tamanho = (produto[2] = sel.value) // pegando o tamanho
            let valor = (produto[3] = valProd) // pegando o preço
            alert(`${nome} foi adicionado ao carrinho!`)
            console.log(`produto selecionado: ${nome}. Cor escolhida: ${cor}, Tamanho selecionado: ${tamanho}. Preço: ${valor}`) // validando produto
    } else
        if (this.className != btn.className) { // comparando classe para executar a troca de imagem
            this.style.outline = '2px solid green'; // definindo outline para mostrar cor selecionada
            this.style.outlineOffset = '1px' // espaçamento entre a outline e o botão
            this.parentNode.parentNode.querySelector('img').src = 'src/pictures/' + this.name + '-' + this.id + '.jpg'
            // manipulando DOM para concatenar o nome e o id como planejado, para mudar o src da imagem
    } else {
        erro() // função para erros (pensanda para futuras ações)
    }
}
function erro() {
    alert('ERRO')
}