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
Hey, I'm Ahsan. Angular GDE, and I wrote a book on signals.

By the end of this video you'll know exactly when linkedSignal beats a computed, when it beats an effect, and you'll have seen the one argument almost every tutorial skips.

Let's get into it.

*Under 20 seconds. Don't read the slide, just hit the promise and move.*

---

## Take a sip of water if you've faced this

<video src="assets/images/angular-linkedsignal/pagination-bug.mp4" poster="assets/images/angular-linkedsignal/pagination-bug-poster.png" data-autoplay loop muted playsinline style="height: 520px; border-radius: 14px;"></video>

Note:
*Let the loop play once in silence. It lands harder than narrating over it.*

So watch what happens here.

The user is on page 4 of 5. They type a new search term, the results collapse down to a single page... and the page index is still sitting on 4. Nothing under it. Empty list.

You've shipped this bug. I've shipped this bug, probably more than once.

*Don't explain the fix yet, the next two slides do that. About 30 seconds here. data-autoplay is what makes reveal start the clip on entry and restart it if you navigate back.*

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
So what kind of state is that page index?

It's derived from the search term... which sounds like a computed. But computed signals are read only, and your Next button has to write to it. So that's out.

Fine. Make it a plain signal. But now nothing resets it, so you reach for an effect that watches the search term and sets the page back to 0.

And that effect is exactly where the bug lives. It runs after the change has already propagated, so for one tick your two pieces of state disagree. And the next person who adds a second filter forgets that effect exists.

*Pause on the last line. Let the dead end sink in before the next slide.*

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
linkedSignal is a writable signal that resets itself when its sources change.

*Pause, then say that line again. It's the spine of the whole video.*

Derived, like a computed. Writable, like a signal. And no effect, so there's nothing left for you to keep in sync by hand.

One thing worth saying out loud: this has been public API since v20, and experimental in v19. A lot of posts out there date it to v21. That's wrong.

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
Here's the whole decision, early, so everything after this is just detail.

Top one is derived and nobody ever writes to it. That's a computed.

Middle one is derived, but the user can override it until the source changes again. That's a linkedSignal.

Bottom one isn't derived at all. You just want something to happen. That's an effect.

And if you remember one line from this slide: if it's derived and someone sets it, it's a linkedSignal.

*Read the comments, not the code. Don't go deep on the effect example, it's only here as the contrast case.*

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
Let's start with the smallest possible version.

You hand linkedSignal a function, and you get back a writable signal seeded from it. So here, selectedOption defaults to the first option in the list.

The computation body is reactive exactly like a computed body, so any signal you read inside it becomes a dependency.

And read it like this: it's the first option, unless somebody set it, and it goes back to the first option whenever options changes.

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
And this is the part that surprises people. It's a real WritableSignal. So set, update, even two way binding with ngModel... all of it just works.

*Flip to the demo. Change the dropdown to prove it, then change the source array and show it snapping back. Twenty seconds, no more.*

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
Now the fuller form. I want you to see the shape before the example, it makes the example read a lot faster.

Two functions, two jobs.

source decides when it resets. Whatever signals you read in there are your reset triggers.

computation decides what the new value is, and it gets that source value handed to it as the first argument.

Quick note on the generics there, I've trimmed NoInfer out of them so the shape reads cleaner. The shipped typings wrap them.

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
And here's the fix for the bug we opened with.

source returns an object with the term and the limit in it, so both of those trigger a reset.

Then in computation: if the term changed, that's a genuinely new result set, so go back to page 0. But if only the page size changed, we do a bit of math and keep the user near the same item, instead of throwing them somewhere random.

*Slow down here, this is the payoff. Flip to the demo: type a letter, show the counter snap to 0. Then click Next twice, change the page size, and show that you stay on the same person. That second behaviour is the one that makes people go "oh".*

And notice previous dot value in there. That's the page the user actually clicked to, not just the last computed value.

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
This next bit is genuinely hard to find written down anywhere, so stay with me.

The pattern is: a list reloads, and you want the user's selection to survive if it's still in there, and to fall back only if it actually disappeared.

That's what previous gives you. It's shaped source and value, and it's undefined on the very first run, which is why there's a guard.

Small thing worth pointing out: source is just this.products, no wrapper arrow function, because a signal is already a zero argument function.

*Flip to the demo panel. Reload with the item still present, then reload without it.*

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
You'll see this version in the wild, and it's not wrong exactly... it's just a dead end.

Reading those two signals is enough to register them as dependencies, so it does reset correctly. That's why it looks fine.

But you threw the values away. S infers as void, so previous dot source is useless to you, and you can never tell "the term changed" from "the limit changed".

One extra line, return an object instead, and you get the whole advanced form.

Screenshot this one, it'll save you an afternoon at some point.

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
And here's the whole thing on one screen, so pause the video if you want it.

The top two rows are about ninety percent of what you'll actually reach for.

*Don't read the table line by line. Say the line, then hold still for two seconds so they can pause.*

---

## ⚠️ Three gotchas

- Your write survives only **until the next source change**, by design
<!-- .element: class="fragment" -->

- A source that reads no signal, or reads it inside `untracked()`, never resets
<!-- .element: class="fragment" -->

- It is not storage. If the user must never lose it, it is not a `linkedSignal`
<!-- .element: class="fragment" -->

Note:
Three things that catch people out.

First one, and this is the big one: your write only survives until the next source change. People set a value, change a filter, and think their write got ignored. It didn't. It got reset. That's the entire contract.

Second is the quiet one. If your source doesn't read a signal, or reads it inside untracked, or only reads it inside a branch that happens to be false right now, it will never reset. A conditional read is a conditional dependency.

Third is a judgement call. This isn't storage. If the user typed it and they must never lose it, it doesn't belong in a linkedSignal.

---

## Resources

- Docs: [angular.dev/guide/signals/linked-signal](https://angular.dev/guide/signals/linked-signal)
- Written tutorial: [blog.codewithahsan.dev/angular-linkedsignal-explained](https://blog.codewithahsan.dev/angular-linkedsignal-explained)
- Live demo: [ahsanayaz.github.io/angular-blog-demos/angular-linkedsignal](https://ahsanayaz.github.io/angular-blog-demos/angular-linkedsignal)
- The book: [Mastering Angular Signals](https://leanpub.com/mastering-angular-signals/c/V22LAUNCH) (Leanpub launch price, DRM-free PDF + EPUB; paperback on Amazon)

Note:
All of these are down in the description.

The docs, the written version of this tutorial if you'd rather copy paste than watch, and the runnable demo if you want to go poke at it yourself.

And this is chapter 4 of my book if you want the long version. The Leanpub link there is the launch price.

---

## The one thing to remember

<!-- .slide: style="font-size: 1.4em;" -->

Derived, and writable.

If you are writing an `effect()` just to reset another signal, that is a `linkedSignal()`.

Note:
If you take one thing away from this: derived, and writable.

*Say it slowly, pause after "and writable".*

And here's the test you can use tomorrow in your own codebase. If you're writing an effect just to reset another signal... that's a linkedSignal.

*Let that land before you move to the CTA.*

---

## Thanks for watching 🙏

- Subscribe for more Angular v22
- Written tutorial + runnable demo in the description
- **@codewith_ahsan**

Note:
That's it.

If this was useful, subscribe. I'm doing a lot more Angular v22 stuff.

The written tutorial and the runnable demo are both in the description.

Thanks for watching.

*Ask for the subscribe once, clearly. Don't overstay, cut soon after.*
