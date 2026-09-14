import type { Categoria, Produto } from '../types/entidades';

/**
 * Verificação de tipo (type guard): quando devolve `true`, o compilador passa a
 * tratar `item` como `Produto`. A função afirma o tipo; ela não converte o valor.
 */
export function ehProduto(item: Produto | Categoria): item is Produto {
  return 'quantidade' in item;
}
