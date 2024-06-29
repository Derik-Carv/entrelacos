const btn = document.querySelectorAll('div button');
const carrinho = document.querySelector('#addcar')
for (let i=0; i < btn.length; i++) {
    btn[i].addEventListener(`click`, cores)
}
function cores() {
    if (this.name != carrinho.name) {
        this.parentNode.parentNode.querySelector('img').src = 'src/pictures/'+this.name+'-'+this.id+'.jpg'    
    } else {
        return alert('Item adicionado ao carrinho.')
    }  
}
