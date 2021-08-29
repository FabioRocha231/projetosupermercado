import Carrinho from "./carrinho.js";
import Produto from "./produtos/produto.js";
import Carro from "./produtos/carro.js";
import Alimentacao from "./produtos/alimentacao.js";
import Limpeza from "./produtos/limpeza.js";


/*declaraçao dos seletores html*/ 
const seletores = {
    nomeProduto: document.querySelector("#nomeProd"),
    valorProduto : document.querySelector("#valorProd"),
    tipoProduto: document.querySelector("#tipoProd"),
    codigoProduto: document.querySelector("#codigoProd"),
    dataProduto: document.querySelector("#dataProd"),
    botaoAdd: document.querySelector("#adiconarProd"),
    botaoRemove: document.querySelector("#removaProd"),
    botaoDesconto: document.querySelector("#aplicaDesconto"),
    valorTotal: document.querySelector("#valorTotal"),
    valorFinal: document.querySelector("#valorFinal"),
    listaProd: document.querySelector(".lista_prod"),
    carrinho: new Carrinho()
};
/**declaraçao dos seletores
 * optei por declarar assim afim de diminuir o tanto de "const´s" chamadas
 */
const {nomeProduto, valorProduto, tipoProduto, codigoProduto, botaoAdd, botaoRemove, botaoDesconto, valorTotal, valorFinal,listaProd, carrinho, dataProduto } = seletores;

/*seletores de eventos */
botaoAdd.addEventListener('click', () => adicionaProduto());
botaoRemove.addEventListener('click', () => removeProduto());
botaoDesconto.addEventListener('click', () => aplicaDesconto());
tipoProduto.addEventListener('input',() => flagDataValidade());

function criaProduto(){
    let produto;
    if(tipoProduto.value === 'alimentacao'){
       produto = new Alimentacao(nomeProduto.value, Number(valorProduto.value), codigoProduto.value, tipoProduto.value, dataProduto.value );
    }else if(tipoProduto.value === 'carro'){
       produto = new Carro(nomeProduto.value, Number(valorProduto.value), codigoProduto.value, tipoProduto.value);
    }else if(tipoProduto.value === 'limpeza'){
       produto = new Limpeza(nomeProduto.value, Number(valorProduto.value), codigoProduto.value, tipoProduto.value);
    }else if(tipoProduto.value === 'outro'){
       produto = new Produto(nomeProduto.value, Number(valorProduto.value), codigoProduto.value, tipoProduto.value);
    }
    return produto;
};

function adicionaProduto(){
    const produto = criaProduto();
    carrinho.adicionarProduto(produto);
    exibeProdutos();
    atualizaValorTotal();
    console.log(produto)
};

function removeProduto(){
    carrinho.removerProduto();
    exibeProdutos();
    atualizaValorTotal();
}

function atualizaValorTotal(){
    valorTotal.textContent = `Valor total: R$ ${carrinho.valor}`
};

function aplicaDesconto(){
    valorFinal.textContent = `Valor final: R$ ${carrinho.calcularValorFinal()}`
}

function exibeProdutos(){
    let saida = "";
    carrinho.listaDeProdutos.forEach((produto) => {
        saida +=`<div class="produto"><p >${produto.nome}</p><p>${produto.tipo}</p><p>${produto.valor}</p></div>`
    });
    listaProd.innerHTML = saida;
};

function flagDataValidade(){
    if(document.querySelector("#tipoProd").value === "alimentacao"){
        document.querySelector("#dataProd").style.display = "block";
    }else{
        document.querySelector("#dataProd").style.display = "none";
    }
};


