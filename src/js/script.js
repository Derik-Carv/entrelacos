console.log(window.screen.width)
document.addEventListener(`scroll`, () =>{
    const header = document.querySelector(`header`);
    if (window.scrollY > 70){
        header.classList.add(`scrolled`);
        header.style.height = '100px'
        header.querySelector('.intro').style.margin = '0px'
        document.querySelector('.apresent').style.display = 'none'
        if (window.screen.width > '673') {
            header.querySelector('#titleMobile').style.display = 'none'
        } else {
            header.querySelector('#titleMobile').style.display = 'flex'
        }
    } else {
        header.classList.remove(`scrolled`);
        document.querySelector('.apresent').style.display = 'flex'
        header.style.height = '290px'
        header.querySelector('.intro').style.marginTop = '2%'
        header.querySelector('#titleMobile').style.display = 'none'
    }
})
document.querySelectorAll('.pedir').forEach((btn, i) => { // inicia a função de adiocionar pedido
    btn.addEventListener('click', () => {
        let info = document.querySelectorAll('.info')[i]; // seleciona a div do item correspondente ao botão clicado
        let nome = info.querySelector('h3').textContent; // pega o nome do item
        const precos = info.querySelectorAll('label.preco'); // pega todos os preços
        const tamanho = info.querySelector('#tamanho').value
        const selectColor = info.querySelector('.selectColor'); // Seleciona apenas o primeiro elemento
        precos.forEach(preco => { // busca o preço correspondente
            adicionarAoCarrinho(nome, preco, tamanho, selectColor) // da inicio a função de criar o carrinho com as informações validadas
        });
    });
});
let ButtonMenuMobileView = document.querySelector(`button .menuMob`) // button para abrir menu mobile
ButtonMenuMobileView.addEventListener('click', () => { // evento de click e function
    let menuMobileView = document.querySelector('.cabecalhoMob')  // pega o button pra abrir o menu mobile
    menuMobileView.style.display = 'block' // deixa visivel o menu mobile
    let closeMenuMob = menuMobileView.querySelector(`.close`) // button para fechar menu mobile
    closeMenuMob.addEventListener('click', () => { // evento click e function
        document.querySelector(`.cabecalhoMob`).style.display = 'none'  // fecha visualização do menu mobile
    })
    for (let goTo = 0; goTo<menuMobileView.querySelectorAll('li .linkGuia').length; goTo++) { // pega toda a class do menu de navegação
        menuMobileView.querySelectorAll('li .linkGuia')[goTo].addEventListener('click', () =>{
            document.querySelector(`.cabecalhoMob`).style.display = 'none'  // fecha visualização do menu mobile
        })
    }
    let abrirModalMob = menuMobileView.querySelector('#ulCar .fimCar') // chama function click para abrir modal itens
    abrirModalMob.addEventListener('click', () =>{
        finalizarCompra() // chama modal vizualização do carrinho e pagamento
        document.querySelector(`.cabecalhoMob`).style.display = 'none'  // fecha visualização do menu mobile
    })
})
let btnConfirmar = document.querySelector('.fimCar');  // declara a região que vai aparecer as infos rapidas do carrinho
btnConfirmar.addEventListener('click', finalizarCompra); // chama o o modal de revisão de itens e pagamento
function finalizarCompra() { // function de chamar vizualização de itens e ingressar no pagamento
    let modal = document.querySelector('.modal'); // declara a div que vai se comportar o modal de pagamento
    modal.classList.add('active'); // class criada para identificar quando o modal está ativo
    modal.style.display = 'block'; // deixa o modal visivel
    let btnClose = modal.querySelector('.close');
    btnClose.addEventListener('click', () => { // chama o botão e função de fechar o modal
        modal.classList.remove('active'); // remove a classe de status ativo do modal
        modal.style.display = 'none'; // tira a visualização do modal
    });
    let btnConfirmarDados = modal.querySelector('.janela .buttonconfirmardados'); // chama o button responsavel por pegar os dados e forma de pagamento do cliente.
    btnConfirmarDados.addEventListener('click', () => {
        let molPag = modal.querySelectorAll('input[type="checkbox"]'); // pega os checkbox`s de opção de pagamento
        let selectedPag = Array.from(molPag).filter(molPag => molPag.checked); // vasculha o array das opções de pagamento e verificar qual está marcada
        if (selectedPag.length === 0) { // valida se tem opção de pagamento marcada.
            alert("Por favor, selecione uma opção.");
            return;
        }
        let metodoPagamento = selectedPag[0].nextSibling.textContent.trim(); // pega o texto do checkbox de pagamento
        let nomeCompleto = modal.querySelector('.nomecompleto').value; // pega o nome completo do cliente
        let endereco = modal.querySelector('.endereco').value; // pega o enderenço preenchido
        let confirmardadosclient = modal.querySelector('li'); // introduz o texto na li criada na linha 132
        confirmardadosclient.classList.add('resumo')
        confirmardadosclient.innerHTML =    `CONFIRME SEUS DADOS: <br>
                                            A sua forma de pagamento é <strong>${metodoPagamento}</strong>, 
                                            seu nome completo é <strong>${nomeCompleto}</strong>, 
                                            e seu endereço é: <strong>${endereco}</strong>. <br> 
                                            O valor total do pedido é: <strong>R$${precoTotal.toFixed(2)}</strong> <br>
                                            Pode confirmar seus dados apertando o botão abaixo.`; // introduz o texto na li
        let buttonSubmit = document.createElement('button'); // cria o button de pagamento
        buttonSubmit.type = 'submit'; // cria o type do button
        buttonSubmit.textContent = 'Pagar'; // introduz o texto do button
        buttonSubmit.className = 'button-pagar'; // cria a classe do button
        confirmardadosclient.appendChild(buttonSubmit); // põe o button na li
        buttonSubmit.addEventListener('click', () => {  // ação de pagamento ao clicar no button pagar
            alert("Pagamento efetuado com sucesso!"); // alerta na tela
            modal.classList.remove('active'); // desativa o modal ao finalizar compra
            modal.style.display = 'none'; // fecha a vizualização do modal
            location.reload(); // recarrega a página
        });
    });
}
let cor = document.querySelectorAll('.cores button'); // pega os botões de cores
cor.forEach(button => {
    button.addEventListener('click', function () {
        cor.forEach(btn => btn.classList.remove('selectColor')); // desmarca todas as cores
        this.classList.add('selectColor')
    });
});
var quant = 0; // variavel para incrementar quantidade ao adicionar ao carrinho
var quantTotalItens = 0; // variavel que irá armazenar o total de itens
var carrinho = []; // array que armazena os itens do carrinho
var precoTotal = 0; // variavel que para armazenar o total do pedido
function adicionarAoCarrinho(nome, preco, tamanho, selectColor) { // function de adiocionar item ao carrinho
    if (selectColor == null) {
        alert('Selecione a cor!')
    } else {
        preco = parseFloat(preco.textContent.replace('R$', '').replace(',', '.')); // filtra o texto do preço para pegar só os números
        corOn = selectColor.id
        carrinho.push({ // adiciona um novo item ao carrinho
            nome: nome,
            preco: preco,
            cor: corOn,
            tamanho: tamanho
        });
        quant = preco // pega preço do ultimo item selecionado
        precoTotal += quant; // atualiza o preço total
        quantTotalItens = carrinho.length; // verifica a quantidade de itens adicionados
        const carrinhoIcon = document.querySelector('button i.bi-cart'); // parte que é exibida no cabeçalho com as informações de quantidade e preço total de itens, sem detalhar.
        carrinhoIcon.innerHTML = `<span> <span class='quant'>${quantTotalItens}</span> = R$${precoTotal.toFixed(2)} </span>`; // expressa visualmente o preço total e quantidade total
        verCar(nome, preco, quantTotalItens); // chama a function que exibe os itens do carrinho detalhados
    }
}
let btnAbrirCar = document.querySelector('.janela'); // abrir o carrrinho para ver as compras.
btnAbrirCar.addEventListener('click', () => {
    verCar (a, b, quantidade)
}); // ao clicar clicar em `seu carrinho` com as infos rapidas, abre o modal do carrinho detalhado
function verCar (a, b, quantidade) { // a = pega o nome do item, b = pega o preço do item, c pega quantidade.
    let li = document.createElement('li'); // cria li no modal
    let verNome = document.createElement('span');
    let verPreco = document.createElement('span');
    let menos = document.createElement('span');
    let mais = document.createElement('span');
    let qtdCar = document.createElement('span');
    qtdCar.textContent = quantidade
    menos.innerHTML = '-'
    mais.innerHTML = '+'
    verNome.textContent = (a)
    verPreco.textContent = (b)
    btnAbrirCar.appendChild(li)
    li.appendChild(menos)
    li.appendChild(qtdCar)
    li.appendChild(mais)
    li.appendChild(verNome)
    li.appendChild(verPreco)
    qtdCar.classList.add('itemQtd')
    verNome.classList.add('itemCarNome')
    verPreco.classList.add('itemCarPreco')
}