import { atualizarPrecoCarrinho } from "./menuCarrinho";
import { apagarDoLocalStorage, desenharProdutoCarrinhoSimples, lerLocalStorage, salvarLocalStorage } from "./utilidades";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoCarrinhoSimples(idProduto, "container-produto-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}

function finalizarCompra(evento) {
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }
    const historicoDePedidos = lerLocalStorage("historico") ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
    salvarLocalStorage("historico", historicoDePedidosAtualizado);
    apagarDoLocalStorage("carrinho");
    window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();
atualizarPrecoCarrinho();

document.addEventListener("submit", (e) => finalizarCompra(e));