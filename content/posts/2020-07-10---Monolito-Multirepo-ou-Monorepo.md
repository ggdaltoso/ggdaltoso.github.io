---
title: "Monolito, Multirepo ou Monorepo?"
date: "2020-07-10T00:00:00.0000"
template: "post"
draft: false
slug: "/posts/monolito-multirepo-ou-monorepo/"
category: "Arquitetura"
tags:
  - "Arquitetura"
  - "Monorepo"
  - "Monolito"
  - "Multirepo"

description: "Monolito é fácil para começar um projeto. Multirepo pode ser bom 
quando o problema é espaço. Monorepo tem vários projetos que compartilham o 
mesmo repositório. Qual deles é bom pra mim?"
---

Muitos projetos adotam o modelo de monorepo para estruturar seu repositório.
Grandes nomes como [Angular](https://github.com/angular/angular),
[Babel](https://github.com/babel/babel) e
[React](https://github.com/facebook/react), por exemplo, utilizam essa
estratégia. Por outro lado, a Uber passou de [Monorepo para Multirepo](https://www.youtube.com/watch?v=lV8-1S28ycM) e o [VSCode](https://github.com/microsoft/vscode) continua sendo
um monolito. Qual será a melhor para o meu projeto?

Antes de começar a discutir o quão bom ou ruim é uma estrutura de repositório,
acho importante falar um pouco de cada uma delas.

### Monolito

<span class="figure float-left">
  <img 
    src="/media/monorepo/monolith.png" 
    width="180" 
    alt="Diagrama de um monolito" 
    title="Monolito.png" 
  />
</span>

Esse modelo consiste em ter tudo em um único lugar. Tudo junto e misturado.
Geralmente é a mais comum entre os projetos antigos (famoso legado) pois era a
forma mais fácil de se começar e continuar um projeto, já que não haviam
ferramentas suficientes para se fazer o manuseio de multiplos módulos em um
mesmo repositório. Resumidamente: **1 repositório e 1 projeto**.

<br />
<br />

### Multirepo ou Polirepo

<span class="figure float-right">
  <img 
    src="/media/monorepo/multirepo.png" 
    alt="Diagrama de um multirepo ou Polirepo" 
    width="160" 
    title="Multirepo.png" 
  />
</span>

Em um cenário onde um projeto possa ser subdivido em múltiplos módulos (ou em
vários projetos), podemos atribuir para cada um deles, seu próprio repositório,
ou seja, **N repositórios para N projetos**.

<br />
<br />

### Monorepo

<span class="figure float-left">
  <img 
    src="/media/monorepo/monorepo.png" 
    alt="Diagrama de um monorepo" 
    width="160" 
    title="Monorepo.png" 
  />
</span>

Por fim, quando temos vários projetos que compartilham do mesmo repositório,
damos o nome a essa estrutura de Monorepo que, em minha opinião, é uma extensão
do Monolito, lidando com **1 repositório para N projetos**.

<br />

Qual dessas estruturas eu devo colocar em meu projeto? Bom, depende...

## Minha lista de receitas

<span class="figure float-left">
  <img
    src="/media/monorepo/simple-structure.png"
    alt="Estrutura simples do projeto inicial"
    width="250"
    title="Minha lista de Receitas.png"
  />
</span>

Um projeto é tudo aquilo que tem começo, meio e fim e aqui ele vai ser
considerado como algo que possa ser versionado também, para fins ilustrativos.
Para exemplificar mais um pouco, vamos criar um projeto fictício para poder
acompanhar a gente durante o raciocínio.
Consideraremos também que esse é um projeto pessoal que vai sendo desenvolvido
conforme as que necessidades vão aparecendo. Nosso projeto se chamará _Minha
lista de Receitas_.

<br />

O mais importante aqui é começar. Apenas com a ideia na cabeça, o mais comum de
se fazer é criar o repositório vazio seguido por um visual simples.

Dessa forma teremos um projeto para um repositório, caracterizando-o como
Monolito. No meu ponto de vista, essa é a estrutura mais simples que esse
repositório pode ter e a mais fácil também.

O desenvolvimento vai se saindo muito bem e você fica muito orgulhoso de como
ele está ficando bonito. Chega um ponto em que você percebe que seria bom
se conseguisse usar seus estilos em um outro projeto, como um pacote separado.
Ou seja, você precisa quebrar seu projeto principal em 2 projetos: 1 para o
_Minha lista de Receitas_ e 1 para os estilos, que vou chamar de
_Receitas.Styles_.

A partir desse momento a estrutura de Monolito já não comporta nossas
necessidades mais (N projetos). Precisamos escolher entre Multirepo e Monorepo.

## A escolha

Para o _Minha lista de Receitas_ ou para o que você esteja fazendo, a escolha do
que implementar pode variar conforme vários fatores. Pela minha própria
experiência, vou listar alguns para ajudar a gente escolher qual estrutura seria
a melhor.

#### Dependências

- Monorepo: Tudo que envolva seu projeto e subprojetos será instalado,
  [compartilhando aquilo que tiver em comum](https://classic.yarnpkg.com/en/docs/workspaces).
  No nosso exemplo, se você precisar fazer apenas uma alteração nos estilos,
  você precisará instalar as dependências tanto do _Minha lista de Receitas_
  quanto do _Receitas.Styles_.
- Multirepo: Cada repositório tem suas dependências e, mesmo que sejam as
  mesmas, ficarão duplicadas em sua máquina. Se seus projetos forem do NPM, por
  exemplo, você terá que usar [`npm link`](https://docs.npmjs.com/cli/link) para
  fazer com que eles se comuniquem enquanto desenvolve. Se você pesquisar um
  pouco sobre isso ou mesmo tentar usar, vai ver que não é tão mágico quanto
  dizem e nem sempre funcionam com outras bibliotecas por aí.

#### _Issues_ e _Pull Requests_

- Monorepo: Todas as _issues_ e _pull requests_ estarão em um único lugar
  (repositório) e você vai ter que pensar em
  [uma forma](https://github.com/actions/labeler) de agrupá-las ou
  diferenciá-las se não quiser ficar tudo misturado e jogado.
- Multirepo: Sempre que quiser responder uma _issue_ ou mergear um _pull
  request_, você vai ter que trocar de contexto, instalar tudo de novo, linkar
  os projetos pra testar e por aí vai.

Eu colocaria [_CI/CD_](https://en.wikipedia.org/wiki/CI/CD) como um outro fator
importante nessa escolha mas tem um ponto a ser considerado antes. Tanto em
Multirepos quanto em Monorepos eu nunca tive problemas em manusear os processos
de publicação e/ou _deploy_. O mais importante é saber as etapas de cada projeto
para que seu repositório fique bem.

Dado esses pontos, qual estrutura é a melhor para o projeto _Minha lista de
Receitas_?

Eu, particularmente, escolheria Monorepo por já ter trabalhado com algo similar
e, inclusive, implementei a transição de um
[Monolito para um Monorepo](https://github.com/React95/React95/pull/117), no
React95.

Qual você escolheria?
