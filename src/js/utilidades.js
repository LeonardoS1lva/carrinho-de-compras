export const catalogo = [{
    id: "1",
    marca: 'Marca',
    nome: 'Camisa Larga com Bolsos',
    preco: 70,
    imagem: 'product-1',
    feminino: false,
},
{
    id: "2",
    marca: 'Marca',
    nome: 'Casaco Reto com Lã',
    preco: 85,
    imagem: 'product-2',
    feminino: true,
},
{
    id: "3",
    marca: 'Marca',
    nome: 'Jaqueta com Efeito Camurça',
    preco: 60,
    imagem: 'product-3',
    feminino: false,
},
{
    id: "4",
    marca: 'Marca',
    nome: 'Sobretudo em Mescla de Lã',
    preco: 160,
    imagem: 'product-4',
    feminino: false,
},
{
    id: "5",
    marca: 'Marca',
    nome: 'Camisa Larga Acolchoada de Veludo Cotelê',
    preco: 110,
    imagem: 'product-5',
    feminino: false,
},
{
    id: "6",
    marca: 'Marca',
    nome: 'Casaco de Lã com Botões',
    preco: 170,
    imagem: 'product-6',
    feminino: true,
},
{
    id: "7",
    marca: 'Marca',
    nome: 'Casaco com Botões',
    preco: 75,
    imagem: 'product-7',
    feminino: true,
},
{
    id: "8",
    marca: 'Marca',
    nome: 'Colete Comprido com Cinto',
    preco: 88,
    imagem: 'product-8',
    feminino: true,
}];

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
    localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto) {
    const produto = catalogo.find(p => p.id === idProduto);
    const containerProdutoCarrinho = document.getElementById(idContainerHtml);

    const elementoArticle = document.createElement("article");
    const articleClasses = ["flex", "bg-stone-200", "rounded-lg", "p-1", "relative", "mb-2", "w-96"];

    for (const articleClasse of articleClasses) {
        elementoArticle.classList.add(articleClasse);
    }

    const cartaoProdutoCarrinho =
        `<img class="h-24 rounded-lg" src="./assets/img/${produto.imagem}.jpg" alt="Carrinho: ${produto.nome}">
        <div class="p-2 flex flex-col justify-between">
          <p class="text-slate-900 text-sm">${produto.nome}</p>
          <p class="text-slate-400 text-xs">Tamanho: M</p>
          <p class="text-green-700 text-lg">$${produto.preco}</p>
        </div>
        <div class="flex items-end absolute right-2 bottom-1 text-slate-950 text-lg">
          <p id="quantidade-${produto.id}" class="ml-2">${quantidadeProduto}</p>
        </div>`;
    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutoCarrinho.appendChild(elementoArticle);
}