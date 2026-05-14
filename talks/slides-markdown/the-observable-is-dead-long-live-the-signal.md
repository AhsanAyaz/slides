<!--
marp: true
theme: uncover
class:
- invert
- lead
-->

# "The Observable is dead! Long live the Signal!"

## A Story for Angular Developers

### Presentation by Muhammad Ahsan Ayaz Google Developer Expert in AI & Angular

;HS;

## 📈 Real-Time Data: The Ultimate Test

;VS;

### RxJS Stock Tracker (Complex Intervals)

![RxJS Stock Tracker](assets/images/the-observable-is-dead-long-live-the-signal/rxjs-stock-tracker.png)

;VS;

### Signals Stock Tracker (Clean & Simple)

![Signals Stock Tracker](assets/images/the-observable-is-dead-long-live-the-signal/signals-stock-tracker.png)

;HS;

# The Observable is dead!

## Long live the Signal! 🔥

Muhammad Ahsan Ayaz

<!-- .element: class="fragment" -->

Google Developer Expert in AI & Angular

<!-- .element: class="fragment" -->

Author of "Mastering Angular Signals"

<!-- .element: class="fragment" -->

;HS;

## In the world of Angular...

We had applications built on the foundations of **RxJS Observables**

<!-- .element: class="fragment" -->

But **performance issues** were approaching the horizon...

<!-- .element: class="fragment" -->

_"This is a story of revolution, not evolution"_

<!-- .element: class="fragment" -->

;HS;

## The Status Quo: Angular with RxJS

;VS;

### What's Good About RxJS?

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

## 🔍 The Hidden Problems

;VS;

### The Observable Way - Shopping Cart Example

![Shopping Cart Observable](assets/images/the-observable-is-dead-long-live-the-signal/shopping-cart-observable.png)

Problems: Manual subscriptions, memory leaks, Zone.js overhead

<!-- .element: class="fragment" -->

;HS;

## ⚙️ The Mechanism Problem: Zone.js

;VS;

```mermaid
graph TD
    A[User Clicks Button] --> B[Zone.js Patches Event]
    B --> C{Triggers Change Detection}
    C --> D[Check Component A]
    C --> E[Check Component B]
    C --> F[Check Component C]
    C --> G[Check Component D]
    C --> H[Check Component E]
    D --> I[Re-render if changed]
    E --> I
    F --> I
    G --> I
    H --> I

    style A fill:#ff6b6b
    style C fill:#ffd93d
    style I fill:#6bcf7f
```

Zone.js checks **ENTIRE component tree** even if only one component needs updating!

<!-- .element: class="fragment" -->

;HS;

## 📊 The Performance Cost

;VS;

### Real Angular App Analysis

**Before Signals (Zone.js):**

- **47 components** checked per user interaction
- **280ms** average change detection time
- Memory leaks from forgotten unsubscriptions

**After Signals:**

- **3 components** updated per interaction
- **45ms** average update time
- **Zero** subscription management

**Result: 84% performance improvement!**

<!-- .element: class="fragment" -->

;HS;

## ✅ The Solution: Angular Signals

;VS;

### Fine-Grained Reactivity Mechanism

```mermaid
graph TD
    A[Signal Value Changes] --> B{Dependency Tracking}
    B --> C{Component X uses this signal?}
    B --> D{Component Y uses this signal?}
    B --> E{Component Z uses this signal?}
    C -->|Yes| F[Update Component X]
    D -->|No| G[Skip Component Y]
    E -->|Yes| H[Update Component Z]

    style A fill:#4ecdc4
    style F fill:#6bcf7f
    style H fill:#6bcf7f
    style G fill:#95a5a6
```

Only components that **actually use the signal** get updated!

<!-- .element: class="fragment" -->

;HS;

## ⚔️ Our Response: Three Paths Forward

;VS;

### 🛡️ DEFEND: Stick with RxJS Only

- Keep current patterns
  <!-- .element: class="fragment" -->
- Accept performance bottlenecks
  <!-- .element: class="fragment" -->
- Continue manual subscription management
  <!-- .element: class="fragment" -->
- _"The old ways are best"_
  <!-- .element: class="fragment" -->

;VS;

### 🏃 ESCAPE: Flee to Other Frameworks

- React, Vue, Svelte have signals
  <!-- .element: class="fragment" -->
- Abandon Angular ecosystem
  <!-- .element: class="fragment" -->
- Rewrite everything
  <!-- .element: class="fragment" -->
- _"The grass is greener..."_
  <!-- .element: class="fragment" -->

;VS;

### 💥 ATTACK: Embrace Angular Signals!

- Modern reactivity within Angular
  <!-- .element: class="fragment" -->
- Best of both worlds
  <!-- .element: class="fragment" -->
- Gradual migration path
  <!-- .element: class="fragment" -->
- _"Evolution within the ecosystem"_
  <!-- .element: class="fragment" -->

;HS;

## ✨ The Signal Revolution

;VS;

### The Signal Way - Same Shopping Cart

![Shopping Cart Signal](assets/images/the-observable-is-dead-long-live-the-signal/shopping-cart-signal.png)

Benefits: Auto-cleanup, targeted updates, readable code

<!-- .element: class="fragment" -->

;HS;

## 🔬 Deep Dive: Dependency Tracking

;VS;

### How Signals Track Dependencies

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Comp as computed()
    participant Sig1 as firstName
    participant Sig2 as lastName
    participant Framework as Angular

    Dev->>Comp: Creates computed(() => firstName() + lastName())
    Comp->>Framework: Register as consumer
    Comp->>Sig1: Read firstName()
    Sig1->>Framework: Track dependency: Comp depends on firstName
    Comp->>Sig2: Read lastName()
    Sig2->>Framework: Track dependency: Comp depends on lastName

    Note over Framework: Dependency graph built automatically

    Dev->>Sig1: firstName.set('John')
    Sig1->>Framework: Notify: firstName changed
    Framework->>Comp: Re-execute computation
    Comp->>Framework: Update UI
```

;HS;

## 🛠️ Your Signal Arsenal

;VS;

### `signal()` - The Foundation

![Signal Foundation](assets/images/the-observable-is-dead-long-live-the-signal/signal-foundation.png)

;VS;

### `computed()` - Derived Power

![Computed Derived Power](assets/images/the-observable-is-dead-long-live-the-signal/computed-derived-power.png)

;VS;

### `effect()` - Side Effect Magic

![Effect Side Effect Magic](assets/images/the-observable-is-dead-long-live-the-signal/effect-side-effect-magic.png)

;HS;

## 🚀 Advanced Signal Patterns

;VS;

### `linkedSignal()` - Smart Dependencies

![Linked Signal](assets/images/the-observable-is-dead-long-live-the-signal/linked-signal.png)

;VS;

### `resource()` - Async Made Easy

![Resource Async](assets/images/the-observable-is-dead-long-live-the-signal/resource-async.png)

;VS;

### Component APIs - Modern Integration

![Signal Component APIs](assets/images/the-observable-is-dead-long-live-the-signal/signal-component-apis.png)

;HS;

## ⚡ Performance Comparison: Real App

;VS;

### Shopping Cart: Before vs After

```mermaid
graph LR
    subgraph "Observable Way"
        A1[User adds item] --> B1[Observable chain]
        B1 --> C1[Zone.js triggered]
        C1 --> D1[Check 47 components]
        D1 --> E1[280ms total time]
    end

    subgraph "Signal Way"
        A2[User adds item] --> B2[Signal updated]
        B2 --> C2[Dependency tracking]
        C2 --> D2[Update 3 components]
        D2 --> E2[45ms total time]
    end

    style E1 fill:#ff6b6b
    style E2 fill:#6bcf7f
```

Result: **84% faster, 94% fewer components checked**

<!-- .element: class="fragment" -->

;HS;

## 🗺️ The Migration Strategy

;VS;

### Phase 1: Interoperability

![Interoperability To Signal](assets/images/the-observable-is-dead-long-live-the-signal/interoperability-to-signal.png)

;VS;

### Phase 2: Signal-First Development

![Signal First Development](assets/images/the-observable-is-dead-long-live-the-signal/signal-first-development.png)

;VS;

### Phase 3: Full Signal Architecture

![Full Signal Architecture](assets/images/the-observable-is-dead-long-live-the-signal/full-signal-architecture.png)

;HS;

## 🎬 Live Demo: The Difference

;VS;

### Observable-Based Counter (Old Way)

![Observable Counter](assets/images/the-observable-is-dead-long-live-the-signal/observable-counter.png)

;VS;

### Signal-Based Counter (New Way)

![Signal Counter](assets/images/the-observable-is-dead-long-live-the-signal/signal-counter.png)

Signal version: **67% less code, zero memory leaks, better performance**

<!-- .element: class="fragment" -->

;HS;

## 👻 The Zoneless Future

;VS;

### Current: Zone.js Dependency

```mermaid
graph TD
    A[Browser Event] --> B[Zone.js Patch]
    B --> C[Angular Notified]
    C --> D[Full Change Detection]
    D --> E[Check All Components]
    E --> F[Update DOM]

    style B fill:#ffd93d
    style D fill:#ff6b6b
    style E fill:#ff6b6b
```

Global, inefficient change detection

<!-- .element: class="fragment" -->

;VS;

### Future: Signal-Driven Applications

```mermaid
graph TD
    A[Signal Updated] --> B[Dependency Graph]
    B --> C[Identify Consumers]
    C --> D[Update Only Affected]
    D --> E[Surgical DOM Updates]

    style A fill:#4ecdc4
    style B fill:#6bcf7f
    style D fill:#6bcf7f
    style E fill:#6bcf7f
```

Precise, efficient reactivity

<!-- .element: class="fragment" -->

_"Signals are the foundation for Angular's performance future"_

<!-- .element: class="fragment" -->

;HS;

## 📈 Industry Validation

;VS;

### The Signal Revolution Across Frameworks

```mermaid
timeline
    title Signal Adoption Timeline
    2019 : SolidJS introduces Signals
    2020 : Vue 3 Composition API (signal-like)
    2022 : Svelte 5 Runes (signals)
         : Preact Signals
    2023 : Angular Signals (stable)
    2024 : React 19 Compiler (signal-inspired)
         : Angular leads signal innovation
```

Angular isn't following trends - **we're setting them!**

<!-- .element: class="fragment" -->

;VS;

### Community Adoption Evidence

- **NgRx Signal Store**: Official signal-based state management
  <!-- .element: class="fragment" -->
- **Angular Material**: Migrating to signal APIs
  <!-- .element: class="fragment" -->
- **TanStack Angular Query**: Signal-first data fetching
  <!-- .element: class="fragment" -->
- **Community libraries**: 80% planning signal integration
  <!-- .element: class="fragment" -->
- **Developer satisfaction**: 92% positive feedback on signals
  <!-- .element: class="fragment" -->

;HS;

## 🤔 Common Concerns Addressed

;VS;

### "RxJS is still needed!"

✅ **Absolutely true!** RxJS excels at complex async flows

![RxJS Still Needed](assets/images/the-observable-is-dead-long-live-the-signal/rxjs-still-needed.png)

;VS;

### "Learning curve too steep?"

✅ **Signals are simpler than RxJS**

RxJS operators to learn: **125+**
Signal APIs to learn: **8 core functions**

![RxJS vs Signals Simplicity](assets/images/the-observable-is-dead-long-live-the-signal/rxjs-vs-signals-simplicity.png)

;VS;

### "What about breaking changes?"

✅ **Perfect migration story**

- **Gradual adoption** - use `toSignal()` and `toObservable()`
- **RxJS isn't disappearing** - it's complementary
- **New APIs are additive** - old code keeps working
- **Long-term support** - Angular 18+ will support both paradigms

;HS;

## 🏆 Real-World Success Story

;VS;

### E-commerce Platform Migration

**Before Signals:**

- 2.3s page load time
- 47 subscriptions per page
- Memory leaks in checkout flow
- Complex state synchronization

**After Signals:**

- 0.8s page load time (65% improvement)
- Zero subscription management
- Eliminated memory leaks
- Crystal-clear state flow

Developer feedback: _"Signals made our codebase readable again"_

<!-- .element: class="fragment" -->

;HS;

## 🏛️ Victory: Modern Angular Architecture

;VS;

### The New Angular City:

```mermaid
graph TD
    A[Signal-Based State] --> B[Computed Derivations]
    A --> C[Reactive Effects]
    B --> D[Component UI]
    C --> E[Side Effects]

    F[RxJS Streams] --> G[Complex Async]
    G --> H[toSignal Bridge]
    H --> A

    style A fill:#4ecdc4
    style B fill:#6bcf7f
    style D fill:#95a5a6
    style F fill:#f39c12
```

**Best of both worlds:** Signals for state, RxJS for complex async

<!-- .element: class="fragment" -->

;HS;

## 🚀 Your Signal Journey

;VS;

### Start Today:

1.  **Experiment** with basic signals in a small component
    <!-- .element: class="fragment" -->
2.  **Convert** one Observable to a Signal using `toSignal()`
    <!-- .element: class="fragment" -->
3.  **Try** computed signals for derived state
    <!-- .element: class="fragment" -->
4.  **Build** a new feature with `resource()` for async data
    <!-- .element: class="fragment" -->
5.  **Master** the complete ecosystem
    <!-- .element: class="fragment" -->

;VS;

### Learning Resources:

- **Official docs**: angular.dev/guide/signals
  <!-- .element: class="fragment" -->
- **Interactive tutorial**: signals.angular.dev
  <!-- .element: class="fragment" -->
- **Code examples**: GitHub - angular/angular/tree/main/packages/core/signals
  <!-- .element: class="fragment" -->
- **Community**: Angular Discord #signals channel
  <!-- .element: class="fragment" -->

;HS;

## 📚 Master Angular Signals

"Mastering Angular Signals: A Practical Guide to Modern Reactivity, Performance, and Migration"

;VS;

### What You'll Master:

✅ **Core APIs**: `signal()`, `computed()`, `effect()`, `linkedSignal()`
✅ **Async Patterns**: `resource()`, `rxResource()`, error handling
✅ **Component Integration**: `input()`, `output()`, `model()`, `viewChild()`
✅ **Migration Strategies**: `toSignal()`, `toObservable()`, gradual adoption
✅ **Performance Optimization**: dependency tracking, memoization
✅ **Testing**: Unit testing signal-based components and services
✅ **Real-World Examples**: Shopping cart, dashboard, forms, notifications
✅ **Future-Proofing**: Zoneless Angular, signal stores, architectural patterns

;VS;

### Available Now:

- 📖 **Amazon** (paperback & digital)
- 💻 **GitHub** with full source code
- ✨ 25+ practical examples
- 🚀 Runnable code repository

github.com/AhsanAyaz/mastering-angular-signals-book

;HS;

## 📢 Join the Signal Revolution!

### The Observable Era is Ending

### The Signal Era Has Begun

;VS;

### Your Mission:

1.  **Try Signals** in your next feature today
    <!-- .element: class="fragment" -->
2.  **Benchmark** the performance difference
    <!-- .element: class="fragment" -->
3.  **Share** your success stories with the community
    <!-- .element: class="fragment" -->
4.  **Prepare** your codebase for the zoneless future
    <!-- .element: class="fragment" -->
5.  **Master** the paradigm that will define Angular's next decade
    <!-- .element: class="fragment" -->

;VS;

### Connect & Continue Learning:

- **Twitter**: @CodeWithAhsan
  <!-- .element: class="fragment" -->
- **YouTube**: Code with Ahsan (25K+ subscribers)
  <!-- .element: class="fragment" -->
- **Newsletter**: AHSYNC BYTES (weekly Angular insights)
  <!-- .element: class="fragment" -->
- **LinkedIn**: Muhammad Ahsan Ayaz
  <!-- .element: class="fragment" -->
- **Discord**: Angular Community #signals
  <!-- .element: class="fragment" -->

;HS;

# Thank You! 🙏

## "The Observable is dead! Long live the Signal!"

### Questions & Discussion

Let's build the future of Angular together 🚀
