/**
 * Entidades do recorte do projeto-exemplo.
 *
 * O sistema de origem é o controle de estoque construído na UC5. O aplicativo
 * mobile leva apenas uma parte dele: as três entidades abaixo e as cinco telas
 * descritas no README. Cadastro de usuários, permissões, fornecedores e
 * relatórios gerenciais ficam de fora.
 *
 * Duas convenções valem para todas as entidades desta unidade:
 *
 * - Relação entre entidades por identificador (`categoriaId`, `produtoId`), e
 *   não por objeto aninhado. É a forma que o SQLite do módulo 7 vai usar.
 * - Data como `string` em ISO 8601. Em JSON e no SQLite a data vira texto de
 *   qualquer maneira; `Date` entra quando houver conversão explícita.
 */

/** Os dois sentidos de uma movimentação de estoque. */
export type TipoMovimentacao = 'entrada' | 'saida';

/** Agrupamento de produtos. Existe para classificar, não gera movimento. */
export interface Categoria {
  id: number;
  nome: string;
}

/** A entidade central: é o que o usuário consulta e edita todo dia. */
export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  categoriaId: number;
  quantidade: number;
}

/** O movimento que altera a quantidade de um produto. */
export interface Movimentacao {
  id: number;
  produtoId: number;
  tipo: TipoMovimentacao;
  quantidade: number;
  /** ISO 8601, por exemplo '2026-09-10T18:30:00.000Z'. */
  data: string;
}
