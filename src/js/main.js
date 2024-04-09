import { renderizarCatalogo } from "./cartaoProduto";
import { inicializarFiltros } from "./filtrosCatalogo";
import { atualizarPrecoCarrinho, inicializarCarrinho, renderizarProdutosCarrinho } from "./menuCarrinho";

renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();