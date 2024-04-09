import { catalogo, lerLocalStorage, salvarLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[-360px]");
  document.getElementById("carrinho").classList.add("right-[0px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() {
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  window.location.href = "./checkout.html";
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botaoIrParaCheckout = document.getElementById("finalizar-compra")

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoIrParaCheckout.addEventListener("click", irParaCheckout);
}

function removerCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    removerCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoCarrinho(idProduto) {
  const produto = catalogo.find(p => p.id === idProduto);
  const containerProdutoCarrinho = document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article");
  const articleClasses = ["flex", "bg-slate-100", "rounded-lg", "p-1", "relative"];

  for (const articleClasse of articleClasses) {
    elementoArticle.classList.add(articleClasse);
  }

  const cartaoProdutoCarrinho =
    ` <button id="remover-item-${produto.id}" 
        class="text-xl text-slate-500 hover:text-slate-800 absolute right-2 top-1">
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
      <img class="h-24 rounded-lg" src="./assets/img/${produto.imagem}.jpg" alt="Carrinho: ${produto.nome}">
      <div class="p-2 flex flex-col justify-between">
        <p class="text-slate-900 text-sm">${produto.nome}</p>
        <p class="text-slate-400 text-xs">Tamanho: M</p>
        <p class="text-green-700 text-lg">$${produto.preco}</p>
      </div>
      <div class="flex items-end absolute right-2 bottom-1 text-slate-950 text-lg">
        <button id="decrementar-produto-${produto.id}">-</button>
        <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
        <button class="ml-2" id="incrementar-produto-${produto.id}">+</button>
      </div>`;
  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutoCarrinho.appendChild(elementoArticle);

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const containerProdutoCarrinho = document.getElementById("produtos-carrinho");
  containerProdutoCarrinho.innerHTML = "";
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto] = 1;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  desenharProdutoCarrinho(idProduto);
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;

  for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}