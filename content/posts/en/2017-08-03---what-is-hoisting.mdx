---
title: "Hoisting. What is it?"
date: "2017-08-03T00:35:06.000Z"
template: "post"
draft: false
slug: "/what-is-hoisting"
description: "What is hoisting?"
---

"What?" Exactly. That is what I said the first time I heard that word.
Housing? Routing? Huh? What?

These days I found this tweet:

<blockquote class="twitter-tweet" data-lang="en">
  <p lang="en" dir="ltr">
    Javascript simple quiz.
    <br /><br />
    What&#39;s the output? And why?
    <br /><br />
    No cheating 😂 👀
    <a href="https://t.co/Vqacfzhh4n">pic.twitter.com/Vqacfzhh4n</a>
  </p>
  Rowland I. Ekemezie (@rowlandekemezie)
  <a href="https://twitter.com/rowlandekemezie/status/884752434953945088?ref_src=twsrc%5Etfw">
    July 11, 2017
  </a>
</blockquote>

It is exactly the topic of this post. When I asked some people whether they knew
what it was, or had ever heard about it, I got different answers. So I decided
to write a bit about it.

According to [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting),
the definition of _hoisting_ is:

> In JavaScript, function and variable declarations are **hoisted** (or "moved
> to the top"). Hoisting is JavaScript's behavior of moving declarations to the
> top of a scope (the global scope or the function scope).

What?

That means it does not matter where your functions and variables are declared;
their declarations are moved to the top of the scope, either local or global.
Only declarations are moved, not assignments.

And this is exactly what allows calling a function before its implementation.

## undefined vs ReferenceError

Before coding examples, let us start from the basics.

When we inspect a variable (`foo`) that was not declared, we get:

```javascript
console.log(typeof foo); // undefined
```

That leads to an interesting point:
in JavaScript, an undeclared variable returns `undefined` for `typeof`.

A different behavior appears when we try to access the variable directly:

```javascript
console.log(foo); // ReferenceError: variable is not defined
```

JavaScript behavior around variables feels confusing at first, and hoisting is a
big part of why that happens.

## Variables

This is how variables are declared and initialized in JavaScript:

```javascript
var foo; // Declaration

foo = 42; // Initialization/Assignment

foo + 42; // Usage
```

Of course, we usually write declaration and initialization together:

```javascript
var foo = 42;
```

The key point is that JavaScript handles declaration and initialization as
distinct steps.

As I said above, functions and variables are moved to the top of the scope,
which means declarations happen before code execution.

There are cases where undeclared variables receive values and are created during
execution as implicit globals. In other words: undeclared variables become
global.

This snippet helps illustrate it:

```javascript
function global() {
  foo = 42;
  var bar = 142;
}

global();

// Calling global creates foo in global scope
console.log(foo); // 42

// But bar is function-scoped
console.log(bar); // ReferenceError: bar is not defined
```

## var

In ES5, a variable declared with `var` is scoped to the current execution
context (function or global).

### Global variables

```javascript
console.log(foo); // undefined

var foo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
```

What!?

You might expect `ReferenceError: foo is not defined`, but you get `undefined`.

That is hoisting in action. JavaScript effectively treats it like this:

```javascript
var foo;

console.log(foo); // undefined
foo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
```

Because of this behavior, you can use variables before declaration. But it is a
trap: the value is `undefined` until assignment. Better to declare and initialize
before use.

### Variables inside a function

The same thing happens in function scope:

```javascript
function foo() {
  console.log(bar);
  var bar = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
}

foo();
```

If you guessed `undefined`, you are right. JavaScript interprets it like this:

```javascript
function foo() {
  var bar;
  console.log(bar);
  bar = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
}

foo();
```

Notice the scope changed: now the top is function scope, not global scope.

Personal advice: avoid this trap. Declare and initialize before using variables.

```javascript
function foo() {
  var bar = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  console.log(bar);
}

foo(); // Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

### Strict Mode

In ES5, we have _strict mode_, which gives us better control over variable
handling.

```javascript
"use strict";
```

In short, it prevents some problematic patterns.

Now, running one of the previous examples in strict mode:

```javascript
"use strict";
console.log(foo); // ReferenceError: foo is not defined

var foo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
```

Interesting, right?

## ES6

Then [ECMAScript 6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla)
introduced new ways to declare variables.

### let

Variables declared with `let` are block-scoped.

```javascript
console.log(foo); // ReferenceError: foo is not defined
let foo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
```

Different from `var`, `let` does not allow access before declaration in the same
way.

Still, this code:

```javascript
let foo;

console.log(foo); // undefined
foo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
```

returns `undefined`, because now the variable was declared before usage.

Again: declare and assign before using.

### const

`const` was introduced for constant bindings:

```javascript
const PI = 3.14;

PI = 22 / 7; // TypeError: Assignment to constant variable.
```

In our context:

```javascript
console.log(PI); // ReferenceError: PI is not defined
const PI = 3.14;
```

And inside functions:

```javascript
function getArea(radius) {
  console.log(area);
  area = PI * radius * radius;
  const PI = 3.14;
}

getArea(5); // ReferenceError: area is not defined.
```

If you use [jshint](http://jshint.com/), you get a warning similar to:

`'PI' was used before it was declared, which is illegal for 'const' variables.`

Trying to declare `const` without initialization also fails:

```javascript
const PI; // SyntaxError: Missing initializer in const declaration
```

In short:

1. A `const` variable must be declared and initialized before use.
2. Variables declared with `let` and `const` are not initialized at the start of
   execution like `var` is (with `undefined`).

## Functions

Functions in JavaScript can be **declarations** or **expressions**, and both are
related to hoisting.

### Declarations

Remember when I said functions and variables are moved to the top? This is why
you can call a function before declaring it.

```javascript
foo(); // Lorem ipsum dolor sit amet, consectetur adipiscing elit.

function foo() {
  console.log("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
}
```

### Expressions

Here is the common pattern:

```javascript
foo(); // TypeError: foo is not a function.

var foo = function() {
  console.log("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
};
```

And combining both forms:

```javascript
bar(); // TypeError: bar is not a function.

var bar = function foo() {
  console.log("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
};
```

As with variables, `var bar` is hoisted but the assignment is not. So JavaScript
sees `bar` as a variable, not yet as a function.

## Order

We should remember JavaScript has an execution order:

1. Variable value assignments
2. Function declarations
3. Variable declarations

From this, we get:

> Function declarations are hoisted above variable declarations, but not above
> variable assignments.

What?

Examples make it easier.

### Variable assignment above function declaration

```javascript
var double = 20;

function double(value) {
  return value * 2;
}

console.log(typeof double); // number
```

### Function declaration above variable assignment

```javascript
var double;

function double(value) {
  return value * 2;
}

console.log(typeof double); // function
```

Even by changing source order, JavaScript can still resolve `double` as a
function depending on declaration/assignment interplay.

## Classes

Classes also arrived in ES6, along with `let` and `const`.
Like functions, classes can be **declarations** or **expressions**.

### Declarations

Class declarations are hoisted, but not initialized before evaluation. In
practice, you must declare a class before using it.

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

Notice the `ReferenceError` instead of `undefined`.

Declaring first works:

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

### Expressions

Again, behavior is similar to function expressions.

Anonymous class assigned to variable:

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

Named class expression:

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

Correct implementation:

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

## Wrapping up

Important points to keep in mind:

- `var`: using variables before declaration often results in `undefined` after
  hoisting.
- `let` and `const`: using variables before declaration throws `ReferenceError`.

And one last reminder:

- Build the habit of declaring and initializing variables before using them.
- `'use strict'` helps with that.

I hope this post helped clarify hoisting for you. I really enjoyed writing it.
