<!--
title: resource() vs httpResource() vs rxResource()
date: 2026-07-10
venue: Mastering Angular Signals (YouTube)
tags: Angular, Signals, resource, httpResource, rxResource, Data Fetching
description: A hands-on, topic-by-topic tutorial for Angular v22 data fetching with signals: resource() for any async source, httpResource() for HttpClient calls, and rxResource() for RxJS streams, with runnable code you build along.
-->

# resource() vs httpResource() vs rxResource()

## Data fetching with signals, no ceremony 🚦

**Muhammad Ahsan Ayaz**

Google Developer Expert in Angular & AI

<small>Companion code + demo in the description</small>

Note:
This is the video intro. Keep it under 20 seconds. Say who you are in one line, then promise the payoff: by the end you know exactly which of the three signal resources to reach for, and you have built all three. Do not read the slide out loud, just hit the promise and move.

---

## Every data fetch you have ever written

- A `loading` flag you flip by hand
<!-- .element: class="fragment" -->

- An `error` you catch and stash somewhere
<!-- .element: class="fragment" -->

- The data itself, in a third variable
<!-- .element: class="fragment" -->

- A subscription to clean up so it does not leak
<!-- .element: class="fragment" -->

Note:
This is the relatable hook, per the Simple / Clear / Relatable rule. Everyone watching has hand-rolled this ceremony a hundred times. Land each line, let them nod. Then the turn: the signal resources give you all four for free. Keep this to about 30 seconds.

---

## What we build today

- Three tiny weather widgets, one per API
<!-- .element: class="fragment" -->

- `resource()` on a button, `httpResource()` on a toggle, `rxResource()` on reload
<!-- .element: class="fragment" -->

- Same signal surface every time, so you learn one shape
<!-- .element: class="fragment" -->

<small>Everything runs on Angular v22. Demo link in the description.</small>

Note:
Show the running demo on screen here instead of talking to the slide. Flip to the browser, click Fetch Weather, flip the multi-city toggle, hit Reload. Point out that all three render the same loading spinner, the same value, the same error block. That sameness is the whole lesson.

---

## The mental model

> All three give you the **same signal surface**. They differ only in **how you tell them to fetch**.

- `value()`, `isLoading()`, `error()`, `reload()` on every one
<!-- .element: class="fragment" -->

- `resource()`: any async function you write
<!-- .element: class="fragment" -->

- `httpResource()`: an HttpClient URL, `rxResource()`: an RxJS stream
<!-- .element: class="fragment" -->

Note:
This one idea is the spine of the whole video. Say it, pause, repeat it. If they remember nothing else: same surface, different source. Everything after this is just three ways to name the source.

---

# Part 1: resource()

## Any async source, on demand

```typescript
import { resource, signal } from '@angular/core';

weatherRequestState = signal<'idle' | 'ready'>('idle');

weatherResource = resource({
  params: () => {
    // Return undefined to skip loading entirely.
    if (this.weatherRequestState() === 'idle') return undefined;
    return this.weatherRequestState();
  },
  loader: async ({ abortSignal }) => {
    const res = await fetch('assets/weather.json', { signal: abortSignal });
    if (!res.ok) throw new Error('Could not fetch data');
    return await res.json();
  },
});
```

<small>params feeds the loader and controls when it runs. abortSignal cancels stale calls.</small>

Note:
Start in the demo's resource-example component. Two halves: params is a signal-reading function that decides when to fetch, and loader is the async work. Returning undefined from params means "do not load yet", which is how we make it button-driven. Point out abortSignal: if params changes mid-flight, Angular aborts the old fetch for you.

--

### Read it back as signals

```html
@if (weatherResource.isLoading()) {
  <span class="loading loading-spinner"></span>
} @else if (weatherResource.error()) {
  <div class="alert alert-error">{{ weatherResource.error() }}</div>
} @else if (weatherResource.value(); as weather) {
  <p>Temperature: {{ weather.temperature }}</p>
}
```

- Click the button, `params` returns `'ready'`, the loader runs
<!-- .element: class="fragment" -->

Note:
Flip to the browser. Before the click, nothing loads because params is undefined. Click Fetch Weather, the state signal flips to ready, params returns a real value, and the loader fires. Show the spinner then the value. This is the same template you will paste for all three, so slow down here once.

---

# Part 2: httpResource()

## When the source is just an HTTP call

```typescript
import { httpResource } from '@angular/common/http';

isMultiCityMode = signal(false);

httpWeather = httpResource<WeatherData>(
  () => this.isMultiCityMode()          // reads a signal, so it re-fetches
    ? 'assets/weather-multi.json'
    : 'assets/weather.json',
  {
    parse: (response) => {
      if (this.isMultiCityMode()) {
        const milan = (response as MultiCityWeather[]).find(c => c.city === 'Milan');
        if (!milan) throw new Error('Weather info not found');
        return milan;
      }
      return response as WeatherData;
    },
  }
);
```

<small>The URL is a function of your signals. Flip the toggle, it re-fetches. parse validates.</small>

Note:
This is the shortcut for the common case: you have HttpClient and a URL. The URL function reads isMultiCityMode, so the moment you flip the toggle Angular re-runs it and fetches the new endpoint, no manual reload call. Import httpResource from @angular/common/http, that is the one gotcha. Then show parse: it runs on the response and can throw to surface a validation error in error().

--

### Reactive URL, live in the demo

- Flip the toggle, watch it swap Stockholm for Milan
<!-- .element: class="fragment" -->

- No subscribe, no `switchMap`, no manual trigger
<!-- .element: class="fragment" -->

Note:
Back to the browser. Toggle multi-city on, the temperature jumps to Milan's 27 and Clear sky, because parse dug Milan out of the array. Toggle off, it snaps back. Say it plainly: the request is a derived value of your signals, exactly like a computed.

---

# Part 3: rxResource()

## When you already have an Observable

```typescript
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs';

private weatherService = inject(WeatherService);

rxWeather = rxResource<WeatherData, string>({
  stream: () =>
    this.weatherService.getWeather().pipe(
      catchError(() => { throw new Error('Could not fetch data'); })
    ),
});
```

<small>In v22 the option is named stream, not loader. Feed it any Observable.</small>

Note:
This is the bridge for teams with existing RxJS services. You do not rewrite the service, you wrap it. The one thing to say clearly: in v22 the option is called stream, it used to be loader, so if you copy an old snippet it will not compile. Pipe catchError so a failed stream shows up in error() instead of blowing up.

--

### Same surface, RxJS underneath

```html
<button (click)="rxWeather.reload()">Reload (rxResource)</button>
```

- `reload()` re-subscribes and re-runs the stream
<!-- .element: class="fragment" -->

Note:
Click Reload in the demo. The service has a 1200ms delay so the spinner is actually visible, use that on camera. Point out reload() is the same method that exists on all three resources. Land the callback: three sources, one surface, you already know how to read every one of them.

---

## Cheat sheet

<!-- .slide: style="font-size: 0.8em;" -->

| You want | You use |
| --- | --- |
| Any async source (fetch, SDK, worker) | `resource({ params, loader })` |
| A plain HttpClient call | `httpResource(urlFn, { parse })` |
| Bridge an existing Observable | `rxResource({ stream })` |
| Control when it runs | `params: () => cond ? val : undefined` |
| Cancel stale requests | `loader: ({ abortSignal }) => ...` |
| Validate / reshape the response | `parse: (res) => ...` |
| Read state | `.value()` / `.isLoading()` / `.error()` |
| Trigger again | `.reload()` |

Note:
This is the save-and-screenshot slide. Do not read it line by line. Say "here is when to reach for each one, on a single screen" and give them two seconds to pause. The top three rows are the whole decision: source shape picks the API.

---

## ⚠️ Three gotchas

- `httpResource` imports from `@angular/common/http`, `rxResource` from `@angular/core/rxjs-interop`
<!-- .element: class="fragment" -->

- v22 renamed the rxResource option from `loader` to `stream`
<!-- .element: class="fragment" -->

- `params` returning `undefined` skips the fetch, it does not error
<!-- .element: class="fragment" -->

Note:
These are the three that trip people first. The import paths are the number one support question, so say them twice. The loader-to-stream rename bites anyone pasting a pre-v22 snippet. And the undefined-params trick reads like a bug until you know it is the built-in way to gate loading.

---

## Resources

- Docs: [angular.dev/guide/signals/resource](https://angular.dev/guide/signals/resource)
- Written tutorial: [blog.codewithahsan.dev/angular-resource-httpresource-rxresource](https://blog.codewithahsan.dev/angular-resource-httpresource-rxresource)
- Live demo: [ahsanayaz.github.io/angular-blog-demos/angular-resource-httpresource-rxresource](https://ahsanayaz.github.io/angular-blog-demos/angular-resource-httpresource-rxresource)
- The book: [Mastering Angular Signals](https://leanpub.com/mastering-angular-signals) (coupon `GO2026`)

Note:
Point to the description for every link. Push the written tutorial for people who want to copy-paste, and the book for the deep version. Mention the coupon out loud once, it converts.

---

## The one thing to remember

<!-- .slide: style="font-size: 1.4em;" -->

Same signal surface. Different source.

Pick by the shape of your data source, not by habit.

Note:
Say it slowly. This is the closing line and the callback to the mental-model slide. Pause after "different source". Then a beat, then the CTA slide.

---

## Thanks for watching 🙏

- Subscribe for more Angular v22
- Written tutorial + runnable demo in the description
- **@codewith_ahsan**

Note:
Direct, warm CTA. Ask for the subscribe once and clearly, then point at the demo and tutorial links one more time. Do not overstay, cut soon after the ask.
