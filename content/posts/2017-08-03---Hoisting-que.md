---
title: 'Hoisting. Quê?'
date: '2017-08-03T00:35:06.000Z'
template: 'post'
draft: false
slug: '/posts/hoisting-que/'
category: 'JavaScript'
tags:
  - 'JavaScript'

description: 'O que é hoisting?'
---

"Quê?" mesmo. Eu falei exatamente isso na primeira vez que ouvi essa palavra: Housing? Routing? Ahn? Quê?

Esses dias me deparei com esse tweet:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Javascript simple quiz. <br><br>What&#39;s the output? And why? <br><br>No cheating 😂 👀 <a href="https://t.co/Vqacfzhh4n">pic.twitter.com/Vqacfzhh4n</a></p>&mdash; Rowland I. Ekemezie (@rowlandekemezie) <a href="https://twitter.com/rowlandekemezie/status/884752434953945088?ref_src=twsrc%5Etfw">July 11, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Ele é justamente o tema do post. Quando perguntei para algumas pessoas se elas sabiam o que era isso ou se já ouviram falar, a resposta não foi única e então resolvi comentar um pouco desse assunto.

Segundo o [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) a definição de _hoisting_ é:

> Em JavaScript, funções e variáveis são **hoisted** (ou "levados ao topo"). Hoisting é um comportamento do JavaScript de mover declarações para o topo de um escopo (o escopo global ou da função em que se encontra).

Quê?

Isso quer dizer que não importa onde suas funções e variáveis são declaradas, elas serão movidas para o topo independentemente se seu escopo for local ou global. Reforçando que somente a declaração é movida; a atribuição fica no mesmo lugar.

E isso é o que possibilita a chamada de uma função antes de sua implementação!

## undefined vs ReferenceError

Antes de sair codando exemplos, vamos partir pelo começo.

Quando imprimimos uma variável (foo) que não foi declarada, o resultado é esse:

```javascript
console.log(typeof foo); // undefined
```

O que nos leva a um ponto interessante:
Em JavaScript, uma variável que não foi declarada recebe, em tempo de execução, o valor `undefined` e seu tipo também é `undefined`.

E um outro ponto é quando tentamos acessar uma variável que não foi declarada:

```javascript
console.log(foo); // ReferenceError: variable is not defined
```

O comportamento do JavaScript no controle e manipulação de variáveis se torna diferenciado por causa do _hoisting_, que veremos a seguir.

## Variáveis

A forma com que as variáveis são declaradas e inicializadas em JavaScript, acontece da seguinte maneira:

```javascript
var foo; // Declaração

foo = 42; // Inicialização/Atribuição

foo + 42; // Uso
```

Entretando, podemos declarar e inicializar variáveis simultaneamente, como vemos normalmente:

```javascript
var foo = 42;
```

O importante é destacar que o JavaScript fará a **declaração** e a **inicialização** das variáveis.

Mas, como falei ali em cima, todas as funções e variáveis são movidas para cima do escopo, tendo suas declarações feitas antes de qualquer trecho de código ser executado.

Existem casos em que variáveis não declaradas recebem valores sendo então declaradas somente no momento da execução do código. Essas variáveis são criadas implicitamente como variáveis globais, o que nos leva a concluir que _variáveis não declaradas são sempre globais_.

Esse trecho de código vai ajudar a esclarecer:

```javascript
function global() {
  foo = 42;
  var bar = 142;
}

global();

// Quando invocamos a função global, ela cria a variável foo no escopo global
// e, portanto, conseguimos acessá-la de fora
console.log(foo); // 42

// De maneira oposta, se tentarmos acessar a outra variável, não conseguiremos
console.log(bar); // RefereceError: b is not defined
```

## var

Em ES5, uma variável declarada com `var` possui seu escopo como o atual contexto, que pode ser dentro ou fora de uma função (global).

### Variáveis globais

```javascript
console.log(foo); // undefined

var foo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
```

Quê!?

O resultado do log era para ser `ReferenceError: foo is not defined`, mas ao invés disso, temos `undefined`!?

O que aconteceu foi exatamente o que estamos falando: O JavaScript jogou a declaração para o topo. Na real, o que aconteceu foi o seguinte:

```javascript
var foo;

console.log(foo); // undefined
foo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
```

Por causa desse comportamento é que podemos usar as variáveis antes mesmo de tê-las declarado, só precisamos ter cuidado porque toda variável declarada dessa forma é inicializada com `undefined`. A melhor maneira seria declarar e inicializar antes de usar.

### Variáveis dentro de uma função

Aqui a coisa acontece de forma parecida, só muda o contexto:

```javascript
function foo() {
  console.log(bar);
  var bar = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
}

foo();
```

Não coloquei a saída ali porque gostaria que pensasse um pouquinho.

...

Se pensou em `undefined` mandou bem! Caso contrário, essa é a forma com que o código foi interpretado:

```javascript
function foo() {
  var bar;
  console.log(bar);
  bar = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
}

foo();
```

Nesse caso, note que o escopo é outro (`function`) e nos indica que o topo de onde a declaração é feita não é mais o global.

Um conselho pessoal é: evite esse tipo de armadilha. Dê preferência, sempre, em declarar e inicializar uma variável antes de utilizá-la.

```javascript
function foo() {
  var bar = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  console.log(bar);
}

foo(); // Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

### Strict Mode

Em ES5 temos uma utilidade chamada _strict-mode_, da qual eu provavelmente vá escrever um outro post, que nos dá um pouco mais de controle em como as variáveis são declaradas.

```javascript
'use strict';

// ou
'use strict';
```

O que isso faz, resumidamente, é não deixar que variáveis sejam utilizadas antes de sua declaração.

Agora, se executarmos um dos testes anteriores em _sctrict-mode_, temos o seguinte resultado:

```javascript
'use strict';
console.log(foo); // ReferenceError: foo is not defined

var foo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
```

Interessante, né?

## ES6

Aí me aparece um tal de [ECMAScript 6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla), conhecido como ES6, com algumas coisas novas para o ES5.

Algumas delas envolvem declaração e inicialização de variáveis.

### let

Vamos começar pela keyword `let`. Todas as variáveis que sejam declaradas dessa forma, [são variáveis locais no escopo do bloco atual](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let).

```javascript
console.log(foo); // ReferenceError: foo is not defined
let foo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
```

Quê?

Assim como a keyword `var`, o esperado é que o log fosse `undefined`. Entretando, o `let` não nos deixa usar variáveis não declaradas, o que explica o `ReferenceError`. Hm...

Ainda assim, temos que tomar cuidado pois uma implementação como essa:

```javascript
let foo;

console.log(foo); // undefined
foo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
```

nos dará `undefined` ao invés de `ReferenceError`.

Só para não esquecer: declare e atribua valores às variáveis antes de usá-las.

### const

A keyword `const` apareceu com o intuito de fazer com que a variável [seja uma constante e imutável](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), sem a possibilidade de ter seu valor alterado:

```javascript
const PI = 3.14;

PI = 22 / 7; // TypeError: Assignment to constant variable.
```

Em nosso caso:

```javascript
console.log(PI); // ReferenceError: PI is not defined
const PI = 3.14;
```

Da mesma forma que no `let`, temos `ReferenceError` e isso também acontece se usarmos uma variável `const` dentro de funções:

```javascript
function getArea(raio) {
  console.log(area);
  area = PI * raio * raio;
  const PI = 3.14;
}

getArea(5); // ReferenceError: area is not defined.
```

Se você utilizar uma ferramenta para verificar seu código, como [jshint](http://jshint.com/) por exemplo, ele dá esse aviso:

`'PI' was used before it was declared, which is illegal for 'const' variables.`

Se tentarmos só declarar uma variável com `const` já "dá ruim":

```javascript
const PI; // SyntaxError: Missing initializer in const declaration
```

Resumindo:

1. Uma variável `const` precisa, necessariamente, ser declarada e inicializada antes de ser utilizada.
2. Variáveis declaradas com `let` e `const` não são **inicializadas** no começo da execução, ao contrário de `var` que tem seu valor inicializado como **undefined**.

## Functions

Funções em JavaScript podem ser classificadas como sendo **declaradas** ou **expressas** e em ambos os tipos existe _hoisting_.

### Declaradas

Lembra lá de cima onde falei que funções e variáveis são jogadas para o topo? Pois é. Esse é um exemplo disso acontecendo e é por isso que conseguimos executar uma função antes de declará-la.

```javascript
foo(); // Lorem ipsum dolor sit amet, consectetur adipiscing elit.

function foo() {
  console.log('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
}
```

### Expressas

Aqui já é mais simples. Temos alguns exemplos anteriormente parecidos com esse:

```javascript
foo(); // TypeError: foo is not a function.

var foo = function() {
  console.log('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
};
```

O que fica interessante é a junção das duas formas:

```javascript
bar(); // TypeError: bar is not a function.

var bar = function foo() {
  console.log('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
};
```

Aqui acontece como nas variáveis, lembra? A declaração da variável `var bar` foi movida para o topo (_hoisted_) mas sua atribuição, não. Consequentemente, o interpretador lança um `TypeError`, já que ele enxerga `bar` como uma variável e não uma função.

## Ordem

Temos sempre que lembrar que tudo em JavaScript tem uma ordem:

1. Atribuição de valores a variáveis
2. Declaração de função
3. Declaração de variáveis.

Disso, tiramos isso:

> A declaração de funções são _hoisted_ acima da declaração de variáveis mas não acima da atribuição de valores às variáveis.

Quê!?

Acho que com exemplos fica mais fácil.

### Atribuição de variáveis acima de declaração de função

```javascript
var double = 20;

function double(value) {
  return value * 2;
}

console.log(typeof double); // number
```

### Declaração de função acima de atribuição de variáveis

```javascript
var double;

function double(value) {
  return value * 2;
}

console.log(typeof double); // function
```

Aqui vale até um exercício: mesmo trocando a posição das declarações, o interpretador JavaScript vai considerar `double` como `function`.

## Classes

Classe também é algo novo e foi introduzido junto com `let` e `const`, [no ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
Assim como funções, temos duas classificações para classes: **declaradas** ou **expressas**.

### Declaradas

Bem parecido com função, classes declaradas também são _hoisted_. Porém, elas não são inicializadas até sua validação, o que quer dizer, em outras palavras, que você tem que declarar uma classe antes de usá-la.

```javascript
var point = new Point();
point.x = 10;
point.y = 5;

console.log(point); // ReferenceError: Point is not defined

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

Veja que interessante: temos `ReferenceError` ao invés de `undefined`. O evidencia que a classe declarada é _hoisted_. Além disso, vou deixar para vocês a tarefa de ver o que o [jshint](http://jshint.com/) fala sobre esse código.

Então, declarando a classe antes, temos:

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var point = new Point();
point.x = 10;
point.y = 5;

console.log(point); // {x: 10, y: 5}
```

### Expressas

Aqui também é como nas funções e já vou direto para os exemplos que acho que fica melhor. Primeiramente, criando uma classe sem um nome (atribuindo direto a uma variável):

```javascript
var point = new Point();
point.x = 10;
point.y = 5;

console.log(point); // TypeError: Point is not a constructor

var Point = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};
```

O mesmo código mas com o nome na classe:

```javascript
var point = new Point();
point.x = 10;
point.y = 5;

console.log(point); // TypeError: Point is not a constructor

var Point = class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};
```

A forma correta de implementar isso é:

```javascript
var Point = class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

var point = new Point();
point.x = 10;
point.y = 5;

console.log(point); // {x: 10, y: 5}
```

## Concluindo

Alguns pontos importantes a serem lembrados:

- `var`: se você usar variáveis sem tê-las declarado, elas receberão `undefined` assim que forem **hoisted**.
- `let` e `const`: usar variáveis não declaradas fará com que seja lançada uma exceção do tipo `ReferenceError`, pois você [estará tentando referenciar uma variável não existente](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError).

E, para não dizer que não falei

- Devemos ter o hábito de declarar e inicializar variáveis antes de usá-las.
- Colocar `'use strict'` meio que ajuda nessa tarefa.

Espero que esse post tenha ajudado você a entender um pouco mais desse conceito de **hoisting**. Eu gostei bastante de escrever sobre isso e se você tiver gostado, deixa um recado ae nos comentários.
