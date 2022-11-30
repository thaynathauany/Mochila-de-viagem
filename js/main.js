// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()
const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || [] //usamos array de objetos quando utilizamos um grupo de informações daquele mesmo elemento
//Verifica se há alguma coisa no local storage se não houver o array fica vazio
//JSON.parse transforma os dados pro javascript
//console.log(itens)

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página 
itens.forEach( (elemento) => {
    criaElemento(elemento)
})

// Refatoração do addEventListener para receber as funções extras da função criaElemento
form.addEventListener("submit", (evento) => {
    evento.preventDefault() //evita que o formulário envie os dados apenas para a URL

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    //  Const para conferir elemento nome no array itens  
    //Toda vez que o formulario é enviado, perguntamos ao itens se aquele elemento já existe
    const existe = itens.find( elemento => elemento.nome === nome.value ) 

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id //cria-se ID a partir do que já existe

        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual //Garante a busca do elemento correto e atualizando o conteúdo daquele elemento
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id +1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)    
    }

    

    //Esse método te permite gravar os valores dentro do localStorage no browser do usuário.//
    localStorage.setItem("itens", JSON.stringify(itens)) //stringfy transforma o objeto em string

    nome.value = ""
    quantidade.value = ""

})
// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 
function criaElemento(item){

    // <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")
    
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem) //Coloca um elemento criado dentro do outro

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
     document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText  = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()
    //console.log(id); - Confirma, pelo ID se estou removendo o item certo
    itens.splice(itens.findIndex(elemento => elemento.id == id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}