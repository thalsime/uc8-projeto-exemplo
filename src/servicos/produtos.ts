import type { Categoria, Produto } from '../types/entidades';

/** Simula a demora de uma operação assíncrona, como a rede ou o banco de dados. */
export function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const produtosSimulados: Produto[] = [
  { id: 1, nome: 'Parafuso M6', categoriaId: 1, quantidade: 120 },
  { id: 2, nome: 'Chave Phillips', descricao: 'Ponta PH2', categoriaId: 2, quantidade: 0 },
];

const categoriasSimuladas: Categoria[] = [
  { id: 1, nome: 'Fixação' },
  { id: 2, nome: 'Ferramentas' },
];

/**
 * Carrega os produtos. Hoje devolve dados simulados; no módulo 6 o corpo passa a
 * buscar na API e, no módulo 7, a ler do SQLite. A assinatura não muda.
 */
export async function carregarProdutos(): Promise<Produto[]> {
  await esperar(500);
  return produtosSimulados;
}

/** Carrega as categorias, com a mesma forma de `carregarProdutos`. */
export async function carregarCategorias(): Promise<Categoria[]> {
  await esperar(300);
  return categoriasSimuladas;
}
