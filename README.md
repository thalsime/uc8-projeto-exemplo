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
sistema executado na UC5; o recorte (entidades e telas) entra no encontro 3, em `src/types/`.
