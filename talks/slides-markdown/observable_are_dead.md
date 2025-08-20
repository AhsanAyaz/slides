# "The Observable is dead! Long live the Signal!"

## A Story for Angular Developers

_Presentation by Muhammad Ahsan Ayaz_
_Google Developer Expert in Angular_

;HS;

# The Observable is dead!

# Long live the Signal! 👑

**Muhammad Ahsan Ayaz**

<!-- .element: class="fragment" -->

Google Developer Expert in Angular

<!-- .element: class="fragment" -->

Author of "Mastering Angular Signals"

<!-- .element: class="fragment" -->

;HS;

# In the world of Angular...

We had applications built on the foundations of **RxJS Observables**

<!-- .element: class="fragment" -->

But **performance issues** were approaching the horizon...

<!-- .element: class="fragment" -->

_"This is a story of revolution, not evolution"_

<!-- .element: class="fragment" -->

;HS;

# The Status Quo: Angular with RxJS

;VS;

## What's Good About RxJS?

- **Mature & Battle-tested** (10+ years of RxJS)
<!-- .element: class="fragment" -->

- **Powerful async handling** (HTTP, events, complex streams)
<!-- .element: class="fragment" -->

- **Rich ecosystem** (operators, patterns, libraries)
<!-- .element: class="fragment" -->

- **Handles complexity** (switchMap, combineLatest, etc.)
<!-- .element: class="fragment" -->

_"RxJS has served us well... but cracks are showing"_

<!-- .element: class="fragment" -->

;HS;

# 🔍 What's Wrong in Paradise?

;VS;

![The Observable Way - Complex for simple state](assets/images/observable_are_dead/snippet-1.png)

**Problems:** Manual subscriptions, memory leaks, Zone.js overhead, learning curve

<!-- .element: class="fragment" -->

;HS;

# The Problems: Performance & Complexity

;VS;

## The Threats:

- **Zone.js** triggers **entire component tree** checks
<!-- .element: class="fragment" -->

- **Manual subscription management** (memory leaks)
<!-- .element: class="fragment" -->

- **Learning curve steepness** (125+ RxJS operators)
<!-- .element: class="fragment" -->

- **Overkill** for simple reactive state
<!-- .element: class="fragment" -->

- **Change detection inefficiency**
<!-- .element: class="fragment" -->

_"But wait... there is a solution!"_

<!-- .element: class="fragment" -->

;HS;

# The Solution: Modern Reactivity with Signals

;VS;

## The Benefits:

- **Fine-grained reactivity** (only affected components update)
<!-- .element: class="fragment" -->

- **Automatic dependency tracking** (no manual subscriptions)
<!-- .element: class="fragment" -->

- **Zoneless future** (better performance)
<!-- .element: class="fragment" -->

- **Simpler mental model** (explicit state management)
<!-- .element: class="fragment" -->

- **Built-in optimizations** (memoization, caching)
<!-- .element: class="fragment" -->

_"Now we face a choice..."_

<!-- .element: class="fragment" -->

;HS;

# ⚔️ Our Response: Three Paths Forward

;VS;

## 🛡️ **DEFEND**: Stick with RxJS Only

- Keep current patterns
<!-- .element: class="fragment" -->

- Ignore performance issues
<!-- .element: class="fragment" -->

- _"The old ways are best"_
<!-- .element: class="fragment" -->

;VS;

## 🏃‍♂️ **ESCAPE**: Flee to Other Frameworks

- React, Vue, Svelte have signals
<!-- .element: class="fragment" -->

- Abandon Angular ecosystem
<!-- .element: class="fragment" -->

- _"The grass is greener..."_
<!-- .element: class="fragment" -->

;VS;

## ⚔️ **ATTACK**: Embrace Angular Signals!

- Modern reactivity within Angular
<!-- .element: class="fragment" -->

- Best of both worlds
<!-- .element: class="fragment" -->

- _"Evolution, not revolution"_
<!-- .element: class="fragment" -->

;HS;

# ⚔️ The Signal Revolution

;VS;

![The Signal Way - Simple & Powerful](assets/images/observable_are_dead/snippet-2.png)

**Benefits:** Auto-cleanup, fine-grained updates, readable code

<!-- .element: class="fragment" -->

;HS;

# 🗡️ Your Signal Arsenal

;VS;

## **signal()** - The Foundation

![signal() - The Foundation](assets/images/observable_are_dead/snippet-3.png)

;VS;

## **computed()** - Derived Power

![computed() - Derived Power](assets/images/observable_are_dead/snippet-4.png)

;VS;

## **effect()** - Side Effect Magic

![effect() - Side Effect Magic](assets/images/observable_are_dead/snippet-5.png)

_"But there's more..."_

<!-- .element: class="fragment" -->

;HS;

# ⚔️ Advanced Arsenal

;VS;

## **linkedSignal()** - Smart Dependencies

![linkedSignal() - Smart Dependencies](assets/images/observable_are_dead/snippet-6.png)

;VS;

## **resource()** - Async Made Easy

![resource() - Async Made Easy](assets/images/observable_are_dead/snippet-7.png)

;VS;

## **Component APIs** - Modern Integration

![Component APIs - Modern Integration](assets/images/observable_are_dead/snippet-8.png)

;HS;

# 📊 Signals vs Observables: Performance

;VS;

## Zone.js (Observable World)

<!-- .element: class="fragment" -->

![Zone.js (Observable World)](assets/images/observable_are_dead/snippet-9.png)

<!-- .element: class="fragment" -->

## Signals (New World)

<!-- .element: class="fragment" -->

![Signals (New World)](assets/images/observable_are_dead/snippet-10.png)

<!-- .element: class="fragment" -->

;VS;

### Result: **Up to 80% reduction** in change detection cycles!

_"Real apps, real performance gains"_

<!-- .element: class="fragment" -->

;HS;

# 🔄 The Migration Path

;VS;

## Phase 1: **Coexistence**

![Coexistence](assets/images/observable_are_dead/snippet-11.png)

;VS;

## Phase 2: **Signal-First**

![Signal-First](assets/images/observable_are_dead/snippet-12.png)

;VS;

## Phase 3: **Signal Native**

![Signal Native](assets/images/observable_are_dead/snippet-13.png)

;HS;

# 💼 Battle-Tested: Shopping Cart

;VS;

![OLD WAY: Complex Observable Chain](assets/images/observable_are_dead/snippet-14.png)

;VS;

![NEW WAY: Crystal Clear Signals](assets/images/observable_are_dead/snippet-15.png)

**Result:** 50% less code, better performance, zero memory leaks

<!-- .element: class="fragment" -->

;HS;

# 🚀 The Ultimate Victory: Zoneless Angular

;VS;

## Current: **Zone.js Dependency**

- Patches browser APIs
<!-- .element: class="fragment" -->

- Global change detection
<!-- .element: class="fragment" -->

- Performance overhead
<!-- .element: class="fragment" -->

;VS;

## Future: **Signal-Driven Applications**

- Explicit reactivity
<!-- .element: class="fragment" -->

- Surgical updates
<!-- .element: class="fragment" -->

- **Native browser performance**
<!-- .element: class="fragment" -->

_"Signals are the key to Angular's future"_

<!-- .element: class="fragment" -->

;HS;

# 📈 The Revolution is Here

;VS;

## **Framework Trends:**

- **React**: Signals coming in React 19
<!-- .element: class="fragment" -->

- **Vue**: Built-in reactivity system
<!-- .element: class="fragment" -->

- **Svelte**: Runes (signal-based)
<!-- .element: class="fragment" -->

- **Angular**: Leading the charge with Signals
<!-- .element: class="fragment" -->

;VS;

## **Community Response:**

- NgRx Signal Store
<!-- .element: class="fragment" -->

- Signal-based libraries emerging
<!-- .element: class="fragment" -->

- Developer satisfaction ↗️
<!-- .element: class="fragment" -->

_"Don't be left behind!"_

<!-- .element: class="fragment" -->

;HS;

# ❓ "But What About...?"

;VS;

## **"RxJS is still needed!"**

✅ True! Complex async flows still need RxJS

<!-- .element: class="fragment" -->

✅ Signals + RxJS = Best of both worlds

<!-- .element: class="fragment" -->

;VS;

## **"Learning curve?"**

✅ Signals are **simpler** than RxJS

<!-- .element: class="fragment" -->

✅ Familiar concepts (React, Vue developers)

<!-- .element: class="fragment" -->

;VS;

## **"Breaking changes?"**

✅ **Gradual adoption** path

<!-- .element: class="fragment" -->

✅ RxJS isn't disappearing overnight

<!-- .element: class="fragment" -->

;HS;

# 🎉 Victory Achieved: Modern Angular

;VS;

## **Modern Angular:**

- **Performance**: Fine-grained reactivity
<!-- .element: class="fragment" -->

- **Developer Experience**: Simpler, cleaner code
<!-- .element: class="fragment" -->

- **Future-Proof**: Zoneless applications
<!-- .element: class="fragment" -->

- **Ecosystem**: Signal-first libraries
<!-- .element: class="fragment" -->

;VS;

## **The Problems Solved:**

- Complexity conquered
<!-- .element: class="fragment" -->

- Performance unleashed
<!-- .element: class="fragment" -->

- Developer joy restored
<!-- .element: class="fragment" -->

;HS;

# 🚀 Your Signal Journey Starts Now

;VS;

## **1. Learn the Fundamentals**

- Start with `signal()`, `computed()`, `effect()`
<!-- .element: class="fragment" -->

- Practice with simple examples
<!-- .element: class="fragment" -->

;VS;

## **2. Try Migration**

- Use `toSignal()` for existing Observables
<!-- .element: class="fragment" -->

- Build new features with Signals
<!-- .element: class="fragment" -->

;VS;

## **3. Master Advanced Patterns**

- `resource()`, `linkedSignal()`
<!-- .element: class="fragment" -->

- Component APIs: `input()`, `output()`, `model()`
<!-- .element: class="fragment" -->

;HS;

# 📚 Master Angular Signals

_A Practical Guide to Modern Reactivity, Performance, and Migration_

;VS;

### What You'll Learn:

- ✅ Complete Signal mastery (signal, computed, effect)
<!-- .element: class="fragment" -->

- ✅ Advanced patterns (resource, linkedSignal)
<!-- .element: class="fragment" -->

- ✅ Migration strategies from RxJS
<!-- .element: class="fragment" -->

- ✅ Performance optimization techniques
<!-- .element: class="fragment" -->

- ✅ Testing signal-based applications
<!-- .element: class="fragment" -->

- ✅ Real-world examples & best practices
<!-- .element: class="fragment" -->

**Available on Amazon & GitHub**

<!-- .element: class="fragment" -->

_github.com/AhsanAyaz/mastering-angular-signals-book_

<!-- .element: class="fragment" -->

;HS;

# ⚔️ Join the Signal Revolution!

## **The Observable Era is Ending**

<!-- .element: class="fragment" -->

;VS;

## **The Signal Era Has Begun**

<!-- .element: class="fragment" -->

### **Take Action Today:**

<!-- .element: class="fragment" -->

1. **Try Signals** in your next feature
<!-- .element: class="fragment" -->

2. **Share** your Signal success stories
<!-- .element: class="fragment" -->

3. **Master** the new paradigm with the book
<!-- .element: class="fragment" -->

4. **Prepare** for the zoneless future
<!-- .element: class="fragment" -->

;VS;

### **Connect & Learn:**

- 🐦 Twitter: @CodeWithAhsan
<!-- .element: class="fragment" -->

- 📺 YouTube: Code with Ahsan (25K+ subscribers)
<!-- .element: class="fragment" -->

- 📧 Newsletter: AHSYNC BYTES
<!-- .element: class="fragment" -->

- 🔗 LinkedIn: Muhammad Ahsan Ayaz
<!-- .element: class="fragment" -->

;HS;

# Thank You! 🙏
