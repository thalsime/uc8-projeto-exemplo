# uc8-projeto-exemplo

Projeto-exemplo da **UC8 - Desenvolver aplicações mobile**, do curso Técnico em
Desenvolvimento de Sistemas.

É o aplicativo que o docente constrói junto com a turma, encontro a encontro. Não é o
projeto de nenhum aluno: é a referência que acompanha as aulas e mostra, a cada etapa, o
estado esperado do código.

## Como acompanhar a evolução

- Cada encontro que altera código recebe um commit e uma **tag `aulaN`** (`aula1`, `aula2`,
  e assim por diante). A tag marca o código exatamente como ficou ao fim daquele encontro.
- Para ver o projeto como estava em um encontro:

  ```bash
  git checkout aula1
  ```

  Para voltar ao estado mais recente: `git checkout main`. Para listar as tags: `git tag`.
- A branch `main` sempre aponta para o estado mais recente. A evolução entra por pull
  request, um por encontro, para que a diferença entre duas aulas fique legível no
  histórico.

| Tag | Encontro | O que entrou |
|---|---|---|
| `aula1` | 1 | Projeto criado pelo template `blank-typescript`, sem alteração de código |
| `aula2` | 2 | README: caminhos de execução corrigidos e estrutura do projeto comentada; sem alteração de código |
| `aula3` | 3 | Recorte do sistema definido e as três entidades tipadas em `src/types/entidades.ts` |
| `aula4` | 4 | Carga assíncrona com dados simulados em `src/servicos/produtos.ts` e a verificação de tipo `ehProduto` em `src/utils/guardas.ts` |

## Stack

| Camada | Escolha |
|---|---|
| Framework | React Native com Expo (SDK 57) |
| Linguagem | TypeScript 6, na faixa que o SDK define (`~6.0.3` no `package.json`) |
| Execução | Expo Go em celular Android ou iPhone. No laboratório da turma, por cabo USB com `adb reverse` (a rede bloqueia túneis); em casa, pela rede local ou por um túnel sem conta (cloudflared) |
| Navegação | React Navigation, a partir do módulo 4 |
| Dados locais | SQLite via `expo-sqlite`, a partir do módulo 7 |
| Build | EAS Build na nuvem, gerando APK, no módulo 9 |

Regra mantida da UC5: `any` é proibido, com exceção documentada em código de terceiros.

## Como rodar

Requisitos no computador: Node.js (o material é testado na versão 24), Git e VS Code. No
celular: Android com o aplicativo Expo Go compatível com o SDK 57.

```bash
git clone https://github.com/thalsime/uc8-projeto-exemplo.git
cd uc8-projeto-exemplo
npm install
npx expo start
```

No Expo Go, toque em **Scan QR** e aponte para o QR Code do terminal. Isso basta quando o
computador e o celular estão na mesma rede Wi-Fi. Em rede que isola os dois (o caso do
laboratório), o caminho é o cabo USB, com `adb reverse tcp:8081 tcp:8081` e a variável
`REACT_NATIVE_PACKAGER_HOSTNAME=127.0.0.1` antes do `npx expo start`. O `--tunnel` do Expo
não é usado no material: o serviço gratuito por trás dele deixou de ter garantia. O passo a
passo de cada caminho e o diagnóstico dos erros mais comuns estão no guia de ambiente
publicado no Classroom da turma.

Verificações que precisam passar antes de cada tag:

```bash
npx tsc --noEmit
npx expo-doctor
```

## Como o projeto foi criado

Mesmo comando do material de aula, no encontro 1:

```bash
npx create-expo-app@latest uc8-projeto-exemplo --template blank-typescript
```

O template já traz `.claude/`, `AGENTS.md` e `CLAUDE.md`, arquivos de configuração de
assistentes de programação; ficam como vieram. Foi acrescentado um `.gitattributes` com
`* text=auto eol=lf`, para que o Git for Windows não marque arquivos inteiros como
alterados ao abrir o repositório em outra máquina.

## Estrutura inicial

| Arquivo | Para que serve |
|---|---|
| `index.ts` | Ponto de entrada, que registra o `App` no Expo |
| `App.tsx` | A primeira tela |
| `app.json` | A configuração do aplicativo |
| `tsconfig.json` | A configuração do TypeScript |
| `package.json` | A lista de dependências |
| `package-lock.json` | A versão exata de cada pacote instalado; vai para o Git |
| `assets/` | Ícone, tela de abertura e favicon |
| `node_modules/` | As dependências baixadas, que nunca vão para o Git |
| `.gitignore` | O que fica fora do Git: `node_modules/`, `.expo/`, `dist/` e arquivos nativos |
| `AGENTS.md`, `CLAUDE.md`, `.claude/` | Instruções para assistentes de código, do próprio template: pedem a documentação da versão 57 antes de qualquer código. Ficam; não obrigam a usar assistente |
| `LICENSE` | Licença que veio com o template |

A anatomia foi assunto do encontro 2. O tema do projeto é o controle de estoque, o mesmo
sistema executado na UC5; o recorte entrou no encontro 3, e está descrito abaixo.

## O recorte, definido no encontro 3

O aplicativo é **uma parte** do sistema da UC5, não o sistema inteiro. O celular mostra e
edita; a administração fica no desktop.

**Sistema de origem:** o controle de estoque construído na UC5.

**Entidades, e os campos que o aplicativo usa** (`src/types/entidades.ts`):

| Entidade | Campos | Papel |
|---|---|---|
| `Produto` | `id`, `nome`, `descricao?`, `categoriaId`, `quantidade` | O centro: é o que o usuário consulta e edita todo dia |
| `Categoria` | `id`, `nome` | Classifica os produtos; não gera movimento |
| `Movimentacao` | `id`, `produtoId`, `tipo`, `quantidade`, `data` | Registra entrada e saída, e é o que altera a quantidade |

**As cinco telas:**

1. Lista de produtos, com a quantidade em estoque
2. Detalhe de um produto
3. Novo produto
4. Entrada e saída de estoque
5. Sobre o aplicativo

**O que fica de fora:** cadastro de usuários e permissões, fornecedores e relatórios
gerenciais - tudo que é administração, e não consulta ou movimento do dia a dia.

Duas convenções que valem para as entidades desta unidade, e que o arquivo de tipos
documenta: a relação entre entidades é por **identificador** (`categoriaId`, `produtoId`),
que é a forma que o SQLite do módulo 7 vai usar; e data é **`string` em ISO 8601**, porque
em JSON e no SQLite ela vira texto de qualquer maneira - `Date` entra quando houver
conversão explícita.

O recorte pode mudar ao longo da unidade. Quando mudar, muda aqui e nos tipos, no mesmo
commit.
