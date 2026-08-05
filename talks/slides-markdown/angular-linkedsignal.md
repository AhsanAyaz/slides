<!--
title: linkedSignal() explained
date: 2026-07-27
venue: Mastering Angular Signals (YouTube)
tags: Angular, Signals, linkedSignal, computed
description: A hands-on tutorial for Angular's linkedSignal(): derived state you can still write to, the source/computation form, the previous argument nobody covers, and when to reach for computed() or effect() instead.
-->

# linkedSignal()

## Derived state you can still write to 🔗

**Muhammad Ahsan Ayaz**

Google Developer Expert in Angular & AI

<small>Written tutorial + runnable demo in the description</small>

Note:
Video intro, under 20 seconds. One line on who you are, then the promise: by the end you will know exactly when linkedSignal beats computed, when it beats an effect, and you will have seen the one argument almost every tutorial skips. Do not read the slide. Hit the promise and move.

---

## You have written this bug

<video src="assets/images/angular-linkedsignal/pagination-bug.mp4" poster="assets/images/angular-linkedsignal/pagination-bug-poster.png" data-autoplay loop muted playsinline style="height: 520px; border-radius: 14px;"></video>

Note:
This is the relatable hook, and it plays instead of being read out. Six seconds: the user sits on page 4 of 5, types a new search term, the result set collapses to a single page, and the page index is still on 4 with nothing under it. Let the loop run once in silence, it lands harder than narrating over it. Then say your line: you have shipped this, probably more than once. Do not explain the fix yet, the next slide does that. About 30 seconds on this slide.
data-autoplay is what makes reveal start it on entry and restart it if you navigate back.

---

## So what kind of state is `page`?

- It is derived from the search term, so... `computed()`?
<!-- .element: class="fragment" -->

- But `computed()` is read only, and Next has to write to it
<!-- .element: class="fragment" -->

- Fine, plain `signal()`, and an `effect()` that resets it
<!-- .element: class="fragment" -->

- Now two pieces of state disagree for one tick, and you own the sync
<!-- .element: class="fragment" -->

Note:
This is the trap, and it is worth walking slowly because the audience has to feel the dead end before the answer lands. Every option is almost right. The effect version is the one most people ship, and it is exactly where the sync bugs live: it runs after the fact, and the next person who adds a second filter forgets to touch it. Pause on the last line.

---

## The answer

> `linkedSignal()` is a **writable** signal that **resets itself** when its sources change.

- Derived, like `computed()`
<!-- .element: class="fragment" -->

- Writable, like `signal()`
<!-- .element: class="fragment" -->

- No `effect()`, so nothing to keep in sync by hand
<!-- .element: class="fragment" -->

<small>Public API since Angular v20. Experimental in v19. Unchanged in v22.</small>

Note:
Say the one-liner, pause, say it again. This is the spine of the video. Then the three bullets are just that sentence unpacked. Call out the version explicitly, because a lot of blog posts date this to v21 and that is wrong: it went public API in v20. Getting this right on camera is cheap credibility.

---

## The three way split

<!-- .slide: style="font-size: 0.85em;" -->

```typescript
// Derived, nobody writes to it.
total = computed(() => this.price() * this.qty());

// Derived, but the user can override it until the source changes again.
selectedId = linkedSignal(() => this.products()[0]?.id ?? null);

// Not derived. You just want something to HAPPEN.
effect(() => localStorage.setItem('filters', JSON.stringify(this.filters())));
```

<small>If it is derived and someone sets it, it is a linkedSignal. That is the whole rule.</small>

Note:
Put the decision on one screen early, so the rest of the video is just detail. Read the comments, not the code. The rule at the bottom is what people will screenshot. Do not go deep on the effect example, it is here purely as the contrast case: effects are for side effects, not for propagating state.

---

# Part 1: The shorthand

## One function, and you are done

```typescript
import { Component, linkedSignal, signal } from '@angular/core';

export class ShippingPicker {
  options = signal(['Standard', 'Express', 'Overnight']);

  // Defaults to the first option, but the user can pick another one.
  selectedOption = linkedSignal(() => this.options()[0]);
}
```

<small>Read it as: "the first option, unless somebody set it, and back to the first option whenever options change".</small>

Note:
Start with the smallest possible version so nobody is scared off. The computation body is reactive exactly like a computed body: any signal you read inside becomes a dependency. Say the sentence in the small text out loud, it is the clearest way anyone has explained this to me.

--

### It really is writable

```html
<select [(ngModel)]="selectedOption">
  @for (option of options(); track option) {
    <option [value]="option">{{ option }}</option>
  }
</select>
```

- `set()`, `update()`, `[(ngModel)]`, all work like a normal signal
<!-- .element: class="fragment" -->

Note:
This is the part that surprises people: it is a real WritableSignal, so you can two way bind straight to it. Flip to the demo and change the dropdown to prove it, then change the source array and show it snapping back. Twenty seconds, no more.

---

# Part 2: source and computation

## When you need to know what changed

```typescript
linkedSignal<S, D>(options: {
  source: () => S;
  computation: (source: S, previous?: { source: S; value: D }) => D;
}): WritableSignal<D>;
```

- `source` decides **when** it resets
<!-- .element: class="fragment" -->

- `computation` decides **what** the new value is
<!-- .element: class="fragment" -->

<small>Generics simplified. The shipped typings wrap them in NoInfer.</small>

Note:
Show the shape before the example, it makes the example read faster. Two functions, two jobs. The thing to stress: whatever signals you read inside source are the reset triggers, and its return value is handed to computation as the first argument. Mention that you trimmed NoInfer for readability so nobody thinks you are hiding something.

--

### The pagination fix, finally

```typescript
searchTerm = signal('');
resultsLimit = signal(5);

resultsPage = linkedSignal<{ term: string; limit: number }, number>({
  source: () => ({ term: this.searchTerm(), limit: this.resultsLimit() }),
  computation: (source, previous) => {
    // A new search term is a genuinely new result set: start at page 0.
    if (!previous || previous.source.term !== source.term) return 0;

    // Only the page size changed: keep the user near the same item.
    const firstVisibleItem = previous.value * previous.source.limit;
    return Math.floor(firstVisibleItem / source.limit);
  },
});
```

Note:
This is the payoff for the opening bug, so slow down. Flip to the demo: type a letter and show the page counter snap to 0. Then click Next twice, and change the page size, and show that you stay on the same person in the list instead of being thrown to a random page. That second behaviour is the bit that makes people go "oh". Point at previous.value and say it includes the writes the user made, not just the last computed value.

---

# Part 3: `previous`

## The argument nobody covers

```typescript
selectedId = linkedSignal<Product[], string | null>({
  source: this.products,
  computation: (products, previous) => {
    const previousId = previous?.value ?? null;

    // Still in the list after the reload? Keep it selected.
    if (previousId !== null && products.some((p) => p.id === previousId)) {
      return previousId;
    }

    return products[0]?.id ?? null;
  },
});
```

<small>`previous` is `{ source, value }`, and it is `undefined` on the very first run.</small>

Note:
This is the most valuable 90 seconds in the video, because it is genuinely hard to find written down. The pattern: a list reloads, and you want the user's selection to survive if it still exists, and to fall back only if it vanished. Flip to the demo panel and click reload with the item present, then reload without it. Note that source: this.products works with no wrapper lambda, because a signal is already a zero argument function.

--

### ⚠️ The shortcut that costs you `previous`

```typescript
// Works, but do not do this.
source: () => {
  this.searchTerm();
  this.resultsLimit();
},
```

- It tracks both signals, so it does reset correctly
<!-- .element: class="fragment" -->

- But `S` infers as `void`, so `previous.source` is useless
<!-- .element: class="fragment" -->

- Return an object instead, and you get typed access to what changed
<!-- .element: class="fragment" -->

Note:
You will see this in the wild, and it is not wrong exactly, it is just a dead end. Reading the signals is enough to register the dependency, which is why it appears to work. But you have thrown away the values, so you can never tell "the term changed" from "the limit changed", and previous.source is typed as void. One extra line of object literal buys you the whole advanced form. Save this slide.

---

## Cheat sheet

<!-- .slide: style="font-size: 0.8em;" -->

| You want | You use |
| --- | --- |
| Derived, read only | `computed(() => ...)` |
| Derived, but writable | `linkedSignal(() => ...)` |
| Know what the value was before | `linkedSignal({ source, computation })` |
| Reset on several signals | `source: () => ({ a: a(), b: b() })` |
| Keep the old value when still valid | `previous?.value` inside `computation` |
| Make something happen | `effect(() => ...)` |
| Load server state | `resource()` / `httpResource()` |

Note:
The save and screenshot slide. Do not read it line by line. Say "here is the whole decision on one screen", then give them two seconds to pause the video. The top two rows are ninety percent of real usage.

---

## ⚠️ Three gotchas

- Your write survives only **until the next source change**, by design
<!-- .element: class="fragment" -->

- A source that reads no signal, or reads it inside `untracked()`, never resets
<!-- .element: class="fragment" -->

- It is not storage. If the user must never lose it, it is not a `linkedSignal`
<!-- .element: class="fragment" -->

Note:
The first one is the number one surprise: people set a value, change a filter, and think the write was ignored. It was not, it was reset, and that is the entire contract. The second is the silent one, and a conditional read is a conditional dependency, so a value that only resets sometimes usually means a branch swallowed the read. The third is the judgement call: draft state the user typed does not belong here.

---

## Resources

- Docs: [angular.dev/guide/signals/linked-signal](https://angular.dev/guide/signals/linked-signal)
- Written tutorial: [blog.codewithahsan.dev/angular-linkedsignal-explained](https://blog.codewithahsan.dev/angular-linkedsignal-explained)
- Live demo: [ahsanayaz.github.io/angular-blog-demos/angular-linkedsignal](https://ahsanayaz.github.io/angular-blog-demos/angular-linkedsignal)
- The book: [Mastering Angular Signals](https://leanpub.com/mastering-angular-signals/c/V22LAUNCH) (Leanpub launch price, DRM-free PDF + EPUB; paperback on Amazon)

Note:
Point at the description for all of these. Push the written tutorial for the copy paste crowd and the demo for the people who want to poke at it. Chapter 4 of the book is this topic in depth, say that the Leanpub link is the launch price and beats Amazon.

---

## The one thing to remember

<!-- .slide: style="font-size: 1.4em;" -->

Derived, and writable.

If you are writing an `effect()` just to reset another signal, that is a `linkedSignal()`.

Note:
Say it slowly, pause after "and writable". The second line is the practical test they can apply tomorrow in their own codebase, so let it land before the CTA slide.

---

## Thanks for watching 🙏

- Subscribe for more Angular v22
- Written tutorial + runnable demo in the description
- **@codewith_ahsan**

Note:
Direct, warm CTA. Ask for the subscribe once, clearly, then point at the tutorial and demo links one more time. Do not overstay, cut soon after the ask.
