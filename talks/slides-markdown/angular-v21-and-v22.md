<!--
title: Angular v21 & v22: The Next Generation
date: 2026-06-16
venue: Mastering Angular Signals
tags: Angular, Signals, Frontend, Web Dev
description: A complete breakdown of features in Angular v21 and v22, highlighting Signal Forms, async reactivity, injectAsync, and router enhancements.
-->

# Angular v21 & v22

## The Next Generation 🚀

**Muhammad Ahsan Ayaz**

Software Architect @ Scania

Google Developer Expert in Angular & AI

Note:
Welcome, everyone! I'm absolutely thrilled to be here with you today to talk about the future of our favorite framework. My name is Muhammad Ahsan Ayaz, and as a Google Developer Expert in Angular and AI, I've had a front-row seat to some incredible changes. In this session, we're going to explore how Angular v21 and v22 have evolved to become the ultimate launchpad for building highly performant, modern, and AI-assisted web applications. Let's dive in!

---

## 🗺️ The Roadmap of our Journey

- **Angular v21: The Foundations of Change** 🪵
<!-- .element: class="fragment" -->

- **Angular v22: Production-Ready Asynchronous Reactivity** ⚡
<!-- .element: class="fragment" -->

- **Compiler & Template Enhancements** 🛠️
<!-- .element: class="fragment" -->

- **AI-Agent Integrations** 🤖
<!-- .element: class="fragment" -->

- **Live Demo Overview** 💻
<!-- .element: class="fragment" -->

Note:
Before we jump into the details, let's take a quick look at the roadmap of our journey today. First, we'll start with Angular v21 to see the foundational changes, like default zoneless applications and testing upgrades. Then, we'll look at Angular v22 and how these concepts graduate into production-ready APIs, specifically asynchronous reactivity. We'll also cover compiler and template enhancements that will make your daily coding much cleaner, followed by a look at some cutting-edge AI integrations. And finally, I've got a live demo prepared so we can see all of these features working together in a real application. You're going to love it!

---

# Part 1: Angular v21 🪵

## Stability, Testing & Zoneless Defaults

Note:
Let's kick things off with Part 1: Angular v21. This release is all about stability, upgrading our developer tooling, and shifting our core architecture by making zoneless change detection the new default. These updates form the bedrock that makes everything we'll talk about in v22 possible.

---

## ⚡ Zoneless by Default

- **Traditional Angular:** Zone.js monkey-patches browser APIs to trigger change detection.
<!-- .element: class="fragment" -->

- **Problem:** Performance overhead on large applications.
<!-- .element: class="fragment" -->

- **The Solution:** Signals drive reactive change detection.
<!-- .element: class="fragment" -->

- **v21 Update:** Zone.js is no longer included by default in new applications!
<!-- .element: class="fragment" -->

Note:
This is a massive milestone for the ecosystem: Zone.js is no longer included by default in new Angular applications! By moving away from monkey-patching browser APIs, we're unlocking significant performance gains. Let's look at the real-world adoption numbers.

--

### 📊 Real-world Adoption Stats

- **Inside Google:** By mid-2024, >50% of new internal Angular apps were built zoneless, with hundreds running in production.
<!-- .element: class="fragment" -->

- **Public Web:** The public [HTTP Archive](https://httparchive.org) reports over 1,400 zoneless public applications.
<!-- .element: class="fragment" -->

- **Source:** Official [Angular v21 Announcement Blog Post](https://blog.angular.dev/announcing-angular-v21-57946c34f14b).
<!-- .element: class="fragment" -->

Note:
We have the data to back this up. Google's internal metrics showed that by mid-2024, more than half of their new internal Angular apps were already zoneless, with hundreds currently running in production. Globally, the public HTTP Archive reports over 1,400 zoneless public applications. These stats are officially cited in the Angular v21 release blog post.

---

## 🧪 Vitest: The New Default Test Runner

- Karma was deprecated in 2023.
<!-- .element: class="fragment" -->

- Vitest is promoted to **stable** in Angular v21!
<!-- .element: class="fragment" -->

- Run `ng test` out-of-the-box using Vitest.
<!-- .element: class="fragment" -->

- **Migration Schematic:**
  <!-- .element: class="fragment" -->
  ```bash
  ng g @schematics/angular:refactor-jasmine-vitest
  ```

Note:
Now let's talk about testing. Karma was deprecated back in 2023, and in Angular v21, Vitest has officially graduated to stable as our new default test runner! If you want to migrate your existing projects, we have a migration schematic that will automatically refactor your Jasmine tests over to Vitest. It's also important to note that the experimental support for Jest and Web Test Runner is now deprecated in v21 and will be removed in v22, keeping our testing story clean and focused.

---

## 📋 Experimental Signal Forms

- Built directly on the reactive foundation of Signals.
<!-- .element: class="fragment" -->

- Type-safe access to form fields.
<!-- .element: class="fragment" -->

- No `ControlValueAccessor` boilerplate needed for custom components.
<!-- .element: class="fragment" -->

```typescript
import { form, Field } from '@angular/forms/signals';

@Component({
  imports: [Field],
  template: `
    Email: <input [field]="loginForm.email" /> Password:
    <input [field]="loginForm.password" />
  `,
})
export class LoginForm {
  login = signal({ email: '', password: '' });
  loginForm = form(this.login);
}
```

Note:
One of the most exciting additions in v21 is the experimental Signal Forms. They let us connect our component's signal-based state models directly to form fields, giving us complete type-safety out of the box. But the biggest win here is that we no longer need to write tedious ControlValueAccessor boilerplate just to bind custom components. As you can see in the code, it makes form integration incredibly clean and simple.

---

## ♿ Angular Aria (Developer Preview)

- Headless component library focused strictly on accessibility (a11y).
<!-- .element: class="fragment" -->

- Stylable anyway you want (Tailwind CSS, Vanilla CSS, etc.).
<!-- .element: class="fragment" -->

- **8 initial patterns:** Accordion, Combobox, Grid, Listbox, Menu, Tabs, Toolbar, Tree.
<!-- .element: class="fragment" -->

- Install: `npm install @angular/aria`
<!-- .element: class="fragment" -->

Note:
Next, we have Angular Aria, which is now in Developer Preview. This is a headless component library designed from the ground up with accessibility as its absolute top priority. Unlike Angular Material, which comes with pre-defined styles, or the CDK, which focuses on raw behavior primitives, Angular Aria provides 8 initial UI patterns covering 13 unstyled components. This means you get full accessibility compliance out-of-the-box, but you can style them however you want using Tailwind, Vanilla CSS, or any other styling tool.

---

## 🛠️ v21 Template & API Enhancements

- **Regex in Templates:**
  <!-- .element: class="fragment" -->

  ```angular-html
  @let isValidNumber = /\d+/.test(someValue);
  @if (!isValidNumber) { <p>Invalid number!</p> }
  ```

- **Custom Viewport Defer options:**
  <!-- .element: class="fragment" -->

  ```angular-html
  @defer (on viewport({trigger, rootMargin: '100px'})) {
    <heavy-component />
  }
  ```

- **Generic SimpleChanges:** Better type-safety for changes.
<!-- .element: class="fragment" -->

- **CDK Overlays:** Uses browser native Popover API.
<!-- .element: class="fragment" -->

Note:
Let's look at some fantastic quality-of-life improvements in v21. We can now use regular expressions directly in templates via the `@let` syntax, and customize `rootMargin` for `@defer` viewport triggers to pre-load components before they enter the screen. We also get the highly-requested generic `SimpleChanges` type, which brings better type-safety to our lifecycle hooks. And under the hood, CDK Overlays now leverage the browser's native Popover API, improving both performance and native accessibility.

---

# Part 2: Angular v22 ⚡

## Production-Ready & Asynchronous DI

Note:
Moving on to Part 2: Angular v22. This version is a huge milestone because it graduates many of our experimental features to fully stable, production-ready APIs. We'll be talking about asynchronous dependency injection, the new `@Service` decorator, and some powerful new enhancements to the router.

---

## 🏆 Graduation to Stable!

Three major features are now fully production-ready:

1. **Signal Forms**: Composable, reactive, and integrated with Angular Material / Angular Aria.
<!-- .element: class="fragment" -->

2. **Angular Aria**: Stable headless accessible primitives.
<!-- .element: class="fragment" -->

3. **Asynchronous Reactivity**: `resource` and `httpResource` are fully stable.
<!-- .element: class="fragment" -->

Note:
I am thrilled to announce that in v22, three major features have officially graduated to stable! Signal Forms, Angular Aria, and our Asynchronous Reactivity APIs—like `resource` and `httpResource`—are now fully production-ready. You can start adopting these APIs in your production codebases today with absolute confidence. This milestone is the result of rigorous testing across Google's massive internal codebases and invaluable feedback from the developer community.

---

## 📡 Asynchronous Reactivity: Resource APIs

Declarative asynchronous fetching using Signals.

```typescript
import { resource, signal, computed } from '@angular/core';

const selectedCity = signal('Chicago');

// Standard Resource API
const weatherResource = resource({
  params: () => ({ city: selectedCity() }),
  loader: ({ params }) => fetchWeatherForecast(params.city),
});
```

Note:
Let's look at the new stable `resource` API. This is a game-changer for handling declarative asynchronous operations within the synchronous world of Signals. In this code snippet, you can see how `resource` automatically tracks the `selectedCity` signal inside the `params` function. Whenever that city changes, the resource automatically triggers the `loader` function to fetch the new forecast. It also exposes derived signals like `value`, `isLoading`, and `error`, making state management extremely clean.

---

## 🌐 HTTP Asynchronous Reactivity: httpResource

Simplifies network requests with a declarative mental model.

```typescript
import { httpResource, signal } from '@angular/core';

export class WeatherComponent {
  selectedCity = signal('Chicago');

  weather = httpResource<{ temperature: number; condition: string }>(() => {
    return `https://api.example.com/v1/forecast/${this.selectedCity()}`;
  });
}
```

Note:
Building on top of `resource`, we also have `httpResource`, which is a specialized wrapper designed to simplify standard HTTP requests. Instead of writing custom loader functions, you simply pass a function returning the URL. Here, `httpResource` tracks our `selectedCity` signal, and whenever the city updates, it automatically executes the HTTP call. This gives us a highly intuitive, reactive, and declarative data-fetching model with almost zero boilerplate.

---

## 🛜 Asynchronous Dependency Injection

- Eagerly loading heavy services degrades initial bundle performance.
<!-- .element: class="fragment" -->

- Angular v22 introduces `injectAsync` for code-splitting services!
<!-- .element: class="fragment" -->

```typescript
import { Component, injectAsync } from '@angular/core';

@Component({
  selector: 'app-report',
  template: `<button (click)="export()">Export</button>`,
})
export class Report {
  private exporter = injectAsync(() => import('./report-exporter'));

  async export() {
    const exporter = await this.exporter();
    exporter.export();
  }
}
```

Note:
Now, let's talk about one of the most groundbreaking features in v22: Asynchronous Dependency Injection with `injectAsync`. Historically, eagerly loading heavy services would bloat your initial bundle size. With `injectAsync`, we can dynamically code-split our services and load them only when needed—like loading an export service only when the user clicks the export button. We can also configure a `prefetch` strategy, such as `onIdle`, to load the service silently in the background, keeping our apps fast and responsive.

---

## ⚙️ The new `@Service` Decorator

- Replacement for the `@Injectable({ providedIn: 'root' })` syntax for common global singletons.
<!-- .element: class="fragment" -->

- Required to enable automatic provisioning when using `injectAsync`.
<!-- .element: class="fragment" -->

```typescript
import { Service } from '@angular/core';

@Service()
export class BasicDataStore {
  private data = signal<string[]>([]);

  addData(item: string) {
    this.data.update((d) => [...d, item]);
  }
}
```

Note:
To support this async injection model, we are introducing the new `@Service` decorator. Think of it as a cleaner, more modern replacement for the old `@Injectable({ providedIn: 'root' })` syntax for global singletons. Crucially, `@Service` is required if you want your service to be automatically provisioned when using `injectAsync`. Don't worry, the traditional `@Injectable` is still fully supported for more complex use cases where you need custom providers or constructor injection.

---

## 🛣️ Router Enhancements

- **Platform Navigation API Integration:** Aligns router with native browser Navigation API.
  <!-- .element: class="fragment" -->

  ```typescript
  provideRouter(routes, withExperimentalPlatformNavigation());
  ```

- **Memory Management / Cleanup:**
  <!-- .element: class="fragment" -->
  - `withExperimentalAutoCleanupInjectors()`: Automatically destroys injectors when navigating away.
  <!-- .element: class="fragment" -->
  - `destroyDetachedRouteHandle(handle)`: Cleanly destroys components in custom route reuse strategies.
  <!-- .element: class="fragment" -->

Note:
We also have some fantastic updates to the router. First, we're aligning closer with modern web standards by integrating the native browser Platform Navigation API, which greatly improves scroll restoration and transition lifecycle management. On the memory management side, we have two new capabilities: `withExperimentalAutoCleanupInjectors` automatically destroys injectors when you navigate away from a route, and `destroyDetachedRouteHandle` gives us a public API to clean up components cached by custom route reuse strategies, preventing memory leaks.

---

# Part 3: Compiler & Template Updates 🛠️

Note:
Now let's move on to Part 3, where we'll look at the latest compiler and template updates. These features make our templates much more expressive, eliminate boilerplate, and bring a new level of safety and error containment directly to our Angular views.

---

## 🏹 Arrow Functions in Templates

- Developers can now inline simple arrow functions in templates.
<!-- .element: class="fragment" -->

- Useful for updating local state signals directly without boilerplate methods.
<!-- .element: class="fragment" -->

```angular-html
<p>Stock: {{ item().stock }}</p>
<button (click)="item.update(p => ({ ...p, stock: p.stock - 1 }))">
  Decrease Stock
</button>
```

Note:
One very handy compiler update is the support for inline arrow functions in templates. Previously, this wasn't possible. Now, we can write simple arrow functions directly inside event bindings to perform quick signal or state updates, as you can see in this button click handler. However, a quick word of advice: let's keep these inline functions simple and short so our templates remain readable and maintainable.

---

## 🔀 Spread Syntax & Multi `@case` `@switch`

- **Spread Syntax:**
  <!-- .element: class="fragment" -->

  ```angular-html
  <div [class]="{ ...standardStyles, 'btn-primary': isActive }"></div>
  <app-list [items]="[...basics, 'custom']" />
  ```

- **Multiple `@case` Matching & Exhaustive Check:**
  <!-- .element: class="fragment" -->
  ```angular-html
  @switch (orderStatus) {
    @case ('Pending')
    @case ('Processing') { <p>In Progress</p> }
    @case ('Shipped') { <p>Shipped</p> }
    @default never;
  }
  ```

Note:
Our templates also support spread syntax now, allowing us to merge objects or arrays directly in class and property bindings. We also get support for multiple `@case` statements in our `@switch` blocks, meaning we can group multiple matching conditions to share the same template block and reduce duplication. And my favorite part is the new `@default never` syntax, which enables compile-time exhaustive checks for union types, throwing an error if a new type is added but not handled.

---

## 📝 Comments and ChangeDetection Updates

- **HTML Element Level Comments:**
  <!-- .element: class="fragment" -->

  ```angular-html
  <div
    // valid comment
    /* another comment */
    attr="value">
  </div>
  ```

- **OnPush Default:** OnPush is now the default change detection strategy for new applications.
<!-- .element: class="fragment" -->

- **ChangeDetectionStrategy Renaming:** `ChangeDetectionStrategy.Default` is renamed to `ChangeDetectionStrategy.Eager`.
<!-- .element: class="fragment" -->

Note:
Next up, we can now use inline and multiline comments directly inside HTML element tags in our templates. This is great for documenting complex bindings and finally lets us use standard VS Code shortcuts to toggle comments inside tags. Additionally, OnPush is now the default change detection strategy for new applications, which aligns perfectly with our zoneless-by-default architecture. To clear up any confusion, the old `Default` change detection strategy has been renamed to `Eager`.

---

## 🛡️ Template Error Boundaries: @boundary

- **Preventing Page Crashes:** A single failing component will no longer crash the entire application page.
<!-- .element: class="fragment" -->

- **Q3 2026 Developer Preview:**
  <!-- .element: class="fragment" -->
  ```angular-html
  @boundary {
    <app-buggy-widget />
  }
  @error (let err) {
    <p>Failed to load widget: {{ err.message }}</p>
  }
  ```

Note:
Here is a sneak peek at a feature coming to Developer Preview in Q3 of 2026: the `@boundary` template syntax! This acts as a template-level error boundary. If a buggy widget throws an error inside the boundary, it will catch the exception and display our `@error` fallback block instead of crashing the entire page. This is incredibly important for protecting key customer journeys, like ensuring a minor UI glitch doesn't break a user's entire checkout flow.

---

# Part 4: AI and Tooling 🤖

Note:
Let's move on to Part 4: AI and Tooling. The Angular ecosystem is leading the way in integrating native tools for AI coding assistants and autonomous developer workflows, helping us build and maintain apps faster than ever before.

---

## 🤝 Model Context Protocol (MCP) Updates

- Angular CLI MCP server tools are now **stable**.
<!-- .element: class="fragment" -->

- Self-healing agentic workflows: `devserver.start`, `devserver.stop`, `devserver.wait_for_build`.
<!-- .element: class="fragment" -->

- Allows coding agents to start server, compile, and read logs to fix errors autonomously.
<!-- .element: class="fragment" -->

Note:
First, the Model Context Protocol, or MCP, server integrated into the Angular CLI is now stable. This includes tools like starting the dev server, stopping it, and waiting for builds to compile. What this means is that AI coding agents can now run self-healing workflows—they can start the server, watch for build errors, parse the logs, and autonomously fix the bugs in your code on the fly.

---

## 🎛️ Agent Skills & WebMCP

- **Agent Skills:** Standardized `angular-developer` and `angular-new-app` markdown guides that agents inject to understand v21/v22 features.
<!-- .element: class="fragment" -->

- **Experimental WebMCP:** Exposes structured APIs from browser web pages directly to LLMs, reducing DOM scraping.
<!-- .element: class="fragment" -->

Note:
We also have Agent Skills, which are lightweight markdown files that teach LLMs how to use the latest features like Signal Forms or Angular Aria. Alongside this, there's the experimental WebMCP protocol. WebMCP allows our web applications to expose structured APIs directly to LLMs, which is a massive leap forward from fragile DOM scraping when building browser-based AI automation.

---

## 💻 Summary of the Demo Application

We built an interactive Angular v22 demo app demonstrating:

1. **`injectAsync`**: Side-by-side lazy vs eager service injection.
<!-- .element: class="fragment" -->

2. **`httpResource`**: Declarative network fetching vs RxJS `HttpClient`.
<!-- .element: class="fragment" -->

3. **Signal Forms**: The new reactive signal-based forms with schema validation.
<!-- .element: class="fragment" -->

4. **Template Upgrades**: Exhaustive `@switch`, arrow functions, spread syntax.
<!-- .element: class="fragment" -->

Let's look at the code!

Note:
To bring all of these concepts together, we built an interactive companion application. It demonstrates the differences between lazy and eager service injection with `injectAsync`, declarative data fetching using `httpResource` compared to the traditional `HttpClient`, the brand-new Signal Forms with built-in schema validation, and all the template upgrades we discussed like arrow functions and exhaustive `@switch` blocks. Let's head over and dive into the codebase so we can see it in action!
