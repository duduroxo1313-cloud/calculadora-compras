const botoesAdicionar = document.querySelectorAll(".btn-add");
const listaCarrinho = document.getElementById("lista-carrinho");
const valorTotal = document.getElementById("valor-total");
const btnEsvaziar = document.getElementById("btn-esvaziar");

let total = 0;


function atualizarTotal() {
    valorTotal.textContent = total.toFixed(2).replace(".", ",");
}


botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const nome = botao.dataset.nome;
        const preco = Number(botao.dataset.preco);

       
        let itemExistente = listaCarrinho.querySelector(`li[data-nome="${nome}"]`);

        if (itemExistente) {
           
            let qtd = Number(itemExistente.dataset.qtd) + 1;
            itemExistente.dataset.qtd = qtd;
            itemExistente.textContent = `${nome} x${qtd} - R$ ${(preco * qtd).toFixed(2).replace(".", ",")}`;
        } else {
            
            const item = document.createElement("li");
            item.dataset.nome = nome;
            item.dataset.preco = preco;
            item.dataset.qtd = 1;
            item.textContent = `${nome} x1 - R$ ${preco.toFixed(2).replace(".", ",")}`;
            item.style.cursor = "pointer";

            
            item.addEventListener("click", () => {
                const qtdAtual = Number(item.dataset.qtd);
                const precoUnitario = Number(item.dataset.preco);

                
                total -= precoUnitario * qtdAtual;
                if (total < 0) total = 0;
                item.remove();
                atualizarTotal();
            });

            listaCarrinho.appendChild(item);
        }

        
        total += preco;
        atualizarTotal();
    });
});


btnEsvaziar.addEventListener("click", () => {
    listaCarrinho.innerHTML = "";
    total = 0;                  
    atualizarTotal();
});