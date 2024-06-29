const btn = document.querySelectorAll('div button');
for (let i=0; i < btn.length; i++) {
    btn[i].addEventListener(`click`, cores)
}
function cores() {
    this.parentNode.parentNode.querySelector('img').src = 'src/pictures/'+this.name+'-'+this.id+'.jpg'
}