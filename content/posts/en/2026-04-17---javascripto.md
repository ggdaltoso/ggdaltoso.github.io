---
title: 'JavaScripto: learning JavaScript in Portuguese'
date: '2026-04-17T00:00:00.000Z'
template: 'post'
draft: false
slug: '/javascripto'
description: 'JavaScripto is a JavaScript learning platform where you write code in Portuguese. It was born from a desire to make programming more accessible for Brazilians.'
---

I have always cared about education. Not necessarily as a teacher, but as someone who believes that access to knowledge changes the course of people's lives.

When I think about learning to code in Brazil, I see a barrier that is rarely talked about. English. Not technical documentation, not error messages in the terminal. I mean the very first contact, the first line of code, that moment when someone looks at the screen and tries to understand what is happening.

`function`, `return`, `console.log`. For someone learning to program for the first time, every unfamiliar word is one more point of friction. And friction, early in a journey, is often what makes people give up before they get anywhere.

That thought is what led me to build JavaScripto.

## What is JavaScripto

JavaScripto is a JavaScript learning platform for Brazilians. The core idea is simple. You write code in Portuguese, and the platform takes care of turning it into real JavaScript.

It is not an invented dialect or a separate language. It is JavaScript, with Portuguese keywords. The code you write gets transpiled into valid JS that actually runs.

![JavaScripto on the left | JavaScript on the right](/media/javascripto/exemplo.png 'Javacripto.png')

The goal is not for you to keep writing JavaScript in Portuguese forever. Portuguese works as a bridge, a way to reduce initial friction and keep the focus on learning to think like a programmer.

## How it works under the hood

JavaScripto uses a library called [Ohm.js](https://ohmjs.org/) to parse the code and transform Portuguese keywords into their JavaScript equivalents. This process is called transpilation, and it is the same technique used by tools like TypeScript and Babel.

The language grammar was written from scratch, covering everything from variables and functions to classes, promises, destructuring, and modules.

## The tutorial

The platform includes a complete tutorial with 33 lessons, split into three parts:

- **Fundamentals** (variables, operators, conditionals, loops, functions, error handling)
- **Data structures** (arrays, array methods, objects)
- **Modern JS** (classes, inheritance, promises, closures, destructuring, modules)

Each lesson has a concept explanation, a code editor with syntax highlighting for JavaScripto, and a panel that runs the code in real time, right in the browser. No setup required.

The tutorial runs inside a WebContainer, a technology that executes Node.js directly in the browser. Students see their code's output without any environment configuration.

## The playground

Beyond the tutorial, there is a [playground](https://javascripto.dev/playground) for free exploration. You write JavaScripto on the left, and the generated JavaScript appears on the right. An integrated terminal runs the code immediately.

Useful for learners, but also for anyone who wants to quickly try something out.

## Why I built this

I do not think English should be removed from programming education. The documentation, the libraries, the global community, all of it is in English, and learning English is also part of the journey. But the very first step does not have to carry that weight too.

When someone writes `se (idade >= 18)` instead of `if (age >= 18)`, the focus goes to the logic, not to simultaneous translation. That is what I care about at this stage.

If you know someone who wants to learn to code but feels like English is a barrier, send them the link. The tutorial is at [javascripto.dev](https://javascripto.dev).
