<!--
title: Angular Signal Forms Tutorial
date: 2026-07-01
venue: Mastering Angular Signals (YouTube)
tags: Angular, Signals, Signal Forms, Forms
description: A hands-on, topic-by-topic tutorial for Angular v22 Signal Forms: the form signal, formField binding, validators, watching changes, cross-field confirm-password, submit, and nested/array fields, with runnable code.
-->

# Angular Signal Forms

## Type-safe forms, no boilerplate 🚦

**Muhammad Ahsan Ayaz**

Google Developer Expert in Angular & AI

<small>Companion code + demo in the description</small>

Note:
This is the video intro. Keep it under 20 seconds. Say who you are in one line, then promise the payoff: by the end they can build a full signup form with validation, cross-field checks, and submit, using only signals. Do not read the slide out loud, just hit the promise and move.

---

## Every form you have ever built

- A `loading` flag you flip by hand
<!-- .element: class="fragment" -->

- A `valid` flag you keep in sync
<!-- .element: class="fragment" -->

- A subscription to clean up
<!-- .element: class="fragment" -->

- A `ControlValueAccessor` for that one custom input
<!-- .element: class="fragment" -->

Note:
This is the relatable hook, per the Simple / Clear / Relatable rule. Everyone watching has written this ceremony. Land each line, let them nod. Then the turn: Signal Forms delete almost all of it. Keep this to about 30 seconds.

---

## What we build today

- A **signup form**: email, password, confirm password
<!-- .element: class="fragment" -->

- Live validation, a password strength meter, cross-field matching
<!-- .element: class="fragment" -->

- Then a bonus form with **nested** and **array** fields
<!-- .element: class="fragment" -->

<small>Everything runs on Angular v22. Demo link in the description.</small>

Note:
Show the running demo on screen here instead of talking to the slide. Flip to the browser, type in the signup form, show the live JSON preview updating. Tell them the whole thing is signals end to end. This is the "clear promise of value" beat.

---

## The mental model

> A form is just a **signal** plus a **schema**.

- The signal holds your data
<!-- .element: class="fragment" -->

- The schema declares the rules
<!-- .element: class="fragment" -->

- Everything you read back is a signal too
<!-- .element: class="fragment" -->

Note:
This one sentence is the spine of the whole video. Say it, pause, repeat it. If they remember nothing else, they remember "a signal plus a schema". Everything after this is just filling in those two halves.

---

# Part 1: The form signal

## Start with plain data

```typescript
import { signal } from '@angular/core';

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

// The single source of truth. Just a signal.
signupModel = signal<SignupData>({
  email: '',
  password: '',
  confirmPassword: '',
});
```

<small>No form builder, no controls. Your data shape is the form shape.</small>

Note:
Start in the demo's signup component. Point out that this is an ordinary writable signal holding an object. The type of this object becomes the type of the whole form, so autocomplete and type safety come for free. Ninety seconds max, this is the easy part.

---

# Part 2: form() and [formField]

## Wrap the signal, bind the fields

```typescript
import { form, FormField } from '@angular/forms/signals';

signupForm = form(this.signupModel);
```

```html
<input type="email"    [formField]="signupForm.email" />
<input type="password" [formField]="signupForm.password" />
```

- `[formField]` is two-way. Typing updates the signal.
<!-- .element: class="fragment" -->

- No `ControlValueAccessor`, no `ngModel`.
<!-- .element: class="fragment" -->

Note:
Import FormField into the component imports array, that is the one gotcha. Bind two inputs, then flip to the browser and type. Show the live JSON preview moving as you type. The point to make out loud: the input and the signal are the same source of truth now.

--

### Read state as signals

```html
<p>Email: {{ signupForm.email().value() }}</p>
```

- Call the field like a function to get its state
<!-- .element: class="fragment" -->

- `.value()`, `.valid()`, `.touched()`, `.dirty()`, `.errors()`
<!-- .element: class="fragment" -->

Note:
Emphasize the double call: signupForm.email() gives you the field state object, then .value() reads the value signal. Everything is a signal, so templates update with zero extra wiring. Show the live preview panel again as proof.

---

# Part 3: Built-in validators

## Rules go in the schema

```typescript
import { form, required, email, minLength } from '@angular/forms/signals';

signupForm = form(this.signupModel, (schema) => {
  required(schema.email, { message: 'Email is required.' });
  email(schema.email, { message: 'Enter a valid email address.' });

  required(schema.password, { message: 'Password is required.' });
  minLength(schema.password, 8, { message: 'Use at least 8 characters.' });
});
```

<small>required, email, min, max, minLength, maxLength, pattern.</small>

Note:
The schema function is the second argument to form(). Each validator takes a field path and an optional message. Add them live, then show the submit button going disabled. Keep the list of built-ins on screen but do not read all of them, just say "the usual suspects are here".

---

# Part 4: Showing errors

## Gate on touched()

```html
@if (signupForm.email().touched() && signupForm.email().invalid()) {
  @for (error of signupForm.email().errors(); track error.kind) {
    <span class="text-error">{{ error.message }}</span>
  }
}
```

- `errors()` is an array of `{ kind, message }`
<!-- .element: class="fragment" -->

- `touched()` keeps errors quiet until the user leaves the field
<!-- .element: class="fragment" -->

Note:
This is the UX beat. Show what happens without the touched() check: errors scream at the user before they type anything. Then add touched() and show the calmer experience. This is the difference between a form that feels good and one that does not.

---

# Part 5: Watching changes

## Signals react for you

```typescript
import { computed, effect } from '@angular/core';

// Live password strength, recomputed on every change.
passwordStrength = computed(() => {
  const value = this.signupForm.password().value();
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
});

// Or run a side effect when the form changes.
constructor() {
  effect(() => console.log('form changed:', this.signupForm().value()));
}
```

<small>No valueChanges, no subscriptions, no cleanup.</small>

Note:
This is the "aha" for anyone coming from Reactive Forms. There is no valueChanges observable to subscribe to. You read the value signal inside a computed or an effect and Angular tracks the dependency for you. Show the strength meter moving live as you type in the password. Mention dirty() as another signal that flips when the user changes a field.

---

# Part 6: Cross-field validation

## Confirm password

```typescript
import { form, required, validate } from '@angular/forms/signals';

signupForm = form(this.signupModel, (schema) => {
  // ... email + password rules ...

  required(schema.confirmPassword, { message: 'Please confirm your password.' });

  validate(schema.confirmPassword, ({ value, valueOf }) => {
    if (value() !== valueOf(schema.password)) {
      return { kind: 'passwordMismatch', message: 'Passwords do not match.' };
    }
    return null;
  });
});
```

<small>valueOf reads another field, reactively. Return an error object or null.</small>

Note:
This is the money feature people search for. valueOf lets one field read another inside the schema, and it stays reactive, so editing either password re-runs the check. Demo it: type two different passwords, show the error, fix it, show it clear. Return null means valid, an object means invalid. Custom validators are just functions.

---

# Part 7: Submit

## Guard on valid(), disable while invalid

```html
<button type="submit" [disabled]="signupForm().invalid()">Sign up</button>
```

```typescript
onSubmit() {
  if (this.signupForm().valid()) {
    const data = this.signupForm().value(); // fully typed
    // send data to your API
  }
}
```

- `signupForm()` gives the whole form's state
<!-- .element: class="fragment" -->

- `submit(form, action)` is the async helper for real submits
<!-- .element: class="fragment" -->

Note:
Two things. First, disable the button on the form-level invalid() so people cannot submit a broken form. Second, read the whole typed value off signupForm().value() in the handler. Mention the submit() helper for the async case where you want touched marking and pending state handled for you, but the manual guard is fine for the demo.

---

# Part 8: Bonus

## Nested and array fields

```typescript
import { form, required, applyEach } from '@angular/forms/signals';

profileModel = signal({
  name: '',
  address: { city: '', country: '' },        // nested
  skills: [{ name: '' }],                     // array
});

profileForm = form(this.profileModel, (schema) => {
  required(schema.address.city);              // dot into nested fields
  applyEach(schema.skills, (skill) => {       // one schema per item
    required(skill.name, { message: 'Skill cannot be empty.' });
  });
});
```

<small>Arrays are plain data. Add and remove with signal.update(), no FormArray.</small>

Note:
Quick bonus round, keep it to two minutes. Nested objects are just dot paths in the schema. Arrays use applyEach to apply a schema to every item. Show adding and removing a skill in the demo, and point out you mutate the model signal immutably with update, there is no FormArray API to learn.

---

## Cheat sheet

<!-- .slide: style="font-size: 0.8em;" -->

| You want | You use |
| --- | --- |
| Hold form data | `signal({...})` |
| Create the form | `form(model, schema)` |
| Bind an input | `[formField]="form.field"` |
| Read value / state | `form.field().value()` / `.valid()` / `.errors()` |
| Built-in rules | `required, email, minLength, pattern, ...` |
| Custom / cross-field | `validate(path, ({value, valueOf}) => ...)` |
| React to changes | `computed()` / `effect()` |
| Arrays | `applyEach(path, fn)` |

Note:
This is the save-and-screenshot slide. Do not read it line by line. Say "here is the whole API on one screen" and give them two seconds to pause the video. Everything in the tutorial maps to one row here.

---

## ⚠️ Three gotchas

- Import from `@angular/forms/signals`, **not** `@angular/forms`
<!-- .element: class="fragment" -->

- Errors need `touched()` or they show too early
<!-- .element: class="fragment" -->

- Arrays are plain data. There is no `FormArray`.
<!-- .element: class="fragment" -->

Note:
These are the three things that trip people up first. The import path is the number one support question, so say it twice. The touched gating is a UX bug people file as a framework bug. And Reactive Forms veterans go hunting for FormArray and it is not there, on purpose.

---

## Resources

- Docs: [angular.dev/essentials/signal-forms](https://angular.dev/essentials/signal-forms)
- Written tutorial: [blog.codewithahsan.dev/angular-signal-forms-tutorial](https://blog.codewithahsan.dev/angular-signal-forms-tutorial)
- The book: [Mastering Angular Signals](https://leanpub.com/mastering-angular-signals/c/V22LAUNCH) (Leanpub launch price, DRM-free PDF + EPUB; paperback on Amazon)

Note:
Point to the description for every link. Push the written tutorial for people who want to copy-paste, and the book for people who want the deep version. Say the Leanpub link is the launch price and it beats Amazon, that converts.

---

## The one thing to remember

<!-- .slide: style="font-size: 1.4em;" -->

A form is a **signal** plus a **schema**.

Everything else is a detail.

Note:
Say it slowly. This is the closing line and the callback to the mental-model slide. Pause after "schema". Then a beat, then the CTA slide.

---

## Thanks for watching 🙏

- Subscribe for more Angular v22
- Written tutorial + runnable demo in the description
- **@codewith_ahsan**

Note:
Direct, warm CTA. Ask for the subscribe once and clearly, then point at the demo and tutorial links one more time. Do not overstay, cut soon after the ask.
