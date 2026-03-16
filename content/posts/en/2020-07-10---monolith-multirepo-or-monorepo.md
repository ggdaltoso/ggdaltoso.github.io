---
title: "Monolith, multirepo or monorepo?"
date: "2020-07-10T00:00:00.0000"
template: "post"
draft: false
slug: "/monolith-multirepo-or-monorepo"
category: "Architecture"
tags:
  - "Architecture"
  - "Monorepo"
  - "Monolith"
  - "Multirepo"

description: "Monolith is easy for getting started. Multirepo can be useful when
the challenge is scale and separation. Monorepo keeps multiple projects in the
same repository. Which one is right for me?"
---

Many projects adopt a monorepo model to organize their repositories. Large names
like [Angular](https://github.com/angular/angular),
[Babel](https://github.com/babel/babel), and
[React](https://github.com/facebook/react), for example, use this strategy.
On the other hand, Uber moved from
[monorepo to multirepo](https://www.youtube.com/watch?v=lV8-1S28ycM), and
[VS Code](https://github.com/microsoft/vscode) is still a monolith.
Which one is best for my project?

Before discussing whether one structure is good or bad, I think it is important
to understand each of them.

### Monolith

<span class="figure float-left">

![Monolith diagram](/media/monorepo/monolith.png "Monolith.png | 180")

</span>

This model keeps everything in one place: all together.
It is common in older projects (legacy code), because it used to be the easiest
way to start and continue software development before better tooling for handling
multiple modules in one repository was widely available.

In short: **1 repository and 1 project**.

<br class="hide-sm"/>
<br class="hide-sm"/>

### Multirepo or Polyrepo

<span class="figure float-right">

![Multirepo or Polyrepo diagram](/media/monorepo/multirepo.png "Multirepo.png | 220")

</span>

In scenarios where a system can be split into multiple modules (or multiple
projects), each module can have its own repository.
That means **N repositories for N projects**.

<br class="hide-sm"/>
<br class="hide-sm"/>

### Monorepo

<span class="figure float-left">

![Monorepo diagram](/media/monorepo/monorepo.png "Monorepo.png | 160")

</span>

When you have many projects sharing the same repository, this is a monorepo.
In my opinion, it is like an extension of the monolith model, handling
**1 repository for N projects**.

<br class="hide-sm" />
<br class="hide-sm" />

Which one should you choose? It depends.

## My recipe list

<span class="figure float-left">

![Simple initial project structure](/media/monorepo/simple-structure.png "My recipe list.png | 260")

</span>

For this post, let us call a project anything that has a beginning, middle and
end and can be versioned. To make things practical, let us create a fictional
project to guide the reasoning.

Assume this is a personal project developed as needs appear. We will call it
_My Recipe List_.

<br class="hide-sm" />
<br class="hide-sm" />

The most important thing at first is to start. With just an idea, the usual path
is creating an empty repository and then building a simple interface.

That gives us one project in one repository, which is a monolith.
In my view, this is the simplest and easiest structure to begin with.

Development goes well and you get proud of how everything looks.
At some point you realize it would be useful to reuse styles in another project,
as a separate package. In other words, now you need to split the original
project into two projects:

- _My Recipe List_
- _Recipes.Styles_

At this point, monolith no longer supports our needs (N projects).
We need to choose between multirepo and monorepo.

## The choice

For _My Recipe List_ or any other project, the best structure depends on several
factors. Based on my own experience, here are some to help choose.

#### Dependencies

- Monorepo: everything related to the project and subprojects is installed
  together, [sharing common dependencies](https://classic.yarnpkg.com/en/docs/workspaces).
  In our example, even if you only need to change styles, you may still install
  dependencies for both _My Recipe List_ and _Recipes.Styles_.
- Multirepo: each repository has its own dependencies and duplicates can happen.
  If your projects are npm packages, you might need
  [`npm link`](https://docs.npmjs.com/cli/link) during development so they can
  communicate. If you have used this before, you know it is not always as smooth
  as it sounds.

#### Issues and Pull Requests

- Monorepo: all issues and pull requests live in one repository, so you need
  [a strategy](https://github.com/actions/labeler) to categorize them and avoid
  chaos.
- Multirepo: when responding to an issue or merging a pull request, you often
  need to change context, reinstall dependencies, link projects for testing, and
  so on.

I would also include [CI/CD](https://en.wikipedia.org/wiki/CI/CD) as an
important factor. But there is a nuance: in both multirepo and monorepo, I have
not had major problems managing publish/deploy pipelines. The key is to
understand each project's steps and keep repository automation healthy.

Given those points, which structure is best for _My Recipe List_?

Personally, I would choose monorepo because I have worked with similar setups,
and I even implemented a transition from
[monolith to monorepo](https://github.com/React95/React95/pull/117) in React95.

Which one would you choose?
