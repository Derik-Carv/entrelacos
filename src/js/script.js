const btn = document.querySelectorAll('div button');
console.log(btn)
const addcar = document.querySelector('#addcar')
const opencar = document.querySelector('.carrinho')
for (let i=0; i < btn.length; i++) {
    btn[i].addEventListener(`click`, cores)
}
function cores() {
    if (this.name != addcar.name) {
        this.parentNode.parentNode.querySelector('img').src = 'src/pictures/'+this.name+'-'+this.id+'.jpg'   
    } else {
        opencar.style.display = 'block'
        return alert('Item adicionado ao carrinho.');
    }
}