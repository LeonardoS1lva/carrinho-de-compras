import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./menuCarrinho";

export function renderizarCatalogo() {

    const containerProduto = document.getElementById("container-produto");

    for (const produto of catalogo) {

        const cartaoProduto = `
        <div 
            class="border-solid w-48 m-2 flex flex-col p-2 justify-between shadow-xl shadow-slate-400 rounded-lg group ${produto.feminino ? "feminino" : "masculino"}" 
            id="card-produto-${produto.id}">
            <img class="group-hover:scale-110 duration-300 my-3 rounded-lg" src="./assets/img/${produto.imagem}.jpg" alt="Produto ${produto.id}">
            <p class="text-sm">${produto.marca}</p>
            <p class="text-sm">${produto.nome}</p>
            <p class="text-sm">$${produto.preco}</p>
            <button id="adicionar-${produto.id}" class="bg-slate-950 text-slate-200 hover:bg-slate-700">
                <i class="fa-solid fa-cart-plus"></i>
            </button>
        </div>`;

        containerProduto.innerHTML += cartaoProduto;
    }

    for (const produto of catalogo) {
        document
            .getElementById(`adicionar-${produto.id}`)
            .addEventListener("click", () => adicionarAoCarrinho(produto.id));
    }
}
