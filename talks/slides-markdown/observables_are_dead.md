# The Observable is dead!

# Long live the Signal! 👑

**Muhammad Ahsan Ayaz**

<!-- .element: class="fragment" -->

Google Developer Expert in Angular & AI

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

# 🔍 The Hidden Problems

;VS;

## The Observable Way - Shopping Cart Example

```typescript
@Component({...})
export class ShoppingCartComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  cart$ = this.cartService.items$.pipe(
    map(items => items.reduce((sum, item) => sum + item.price, 0)),
    shareReplay(1),
    takeUntil(this.destroy$)
  );

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Problems:** Manual subscriptions, memory leaks, Zone.js overhead

<!-- .element: class="fragment" -->

;HS;

# ⚙️ The Mechanism Problem: Zone.js

;VS;

![zonejs_mechanism](assets/images/observables_are_dead/zonejs_mechanism.png)

**Zone.js checks ENTIRE component tree** even if only one component needs updating!

<!-- .element: class="fragment" -->

;HS;

# 📊 The Performance Cost

;VS;

## Real Angular App Analysis

**Before Signals (Zone.js):**

- 47 components checked per user interaction
- 280ms average change detection time
- Memory leaks from forgotten unsubscriptions

**After Signals:**

- 3 components updated per interaction
- 45ms average update time
- Zero subscription management

### **Result: 84% performance improvement!**

<!-- .element: class="fragment" -->

;HS;

# 🐉 The Solution: Angular Signals

;VS;

## Fine-Grained Reactivity Mechanism

![signals_mechanism](assets/images/observables_are_dead/signals_mechanism.png)

**Only components that actually use the signal get updated!**

<!-- .element: class="fragment" -->

;HS;

# ⚔️ Our Response: Three Paths Forward

;VS;

## 🛡️ **DEFEND**: Stick with RxJS Only

- Keep current patterns
<!-- .element: class="fragment" -->

- Accept performance bottlenecks
<!-- .element: class="fragment" -->

- Continue manual subscription management
<!-- .element: class="fragment" -->

- _"The old ways are best"_
<!-- .element: class="fragment" -->

;VS;

## 🏃‍♂️ **ESCAPE**: Flee to Other Frameworks

- React, Vue, Svelte have signals
<!-- .element: class="fragment" -->

- Abandon Angular ecosystem
<!-- .element: class="fragment" -->

- Rewrite everything
<!-- .element: class="fragment" -->

- _"The grass is greener..."_
<!-- .element: class="fragment" -->

;VS;

## ⚔️ **ATTACK**: Embrace Angular Signals!

- Modern reactivity within Angular
<!-- .element: class="fragment" -->

- Best of both worlds
<!-- .element: class="fragment" -->

- Gradual migration path
<!-- .element: class="fragment" -->

- _"Evolution within the ecosystem"_
<!-- .element: class="fragment" -->

;HS;

# ⚔️ The Signal Revolution

;VS;

## The Signal Way - Same Shopping Cart

```typescript
@Component({...})
export class ShoppingCartComponent {
  cartService = inject(CartService);

  // Crystal clear, no subscriptions needed!
  items = this.cartService.items;
  total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0)
  );

  // No ngOnDestroy needed! 🎉
}
```

**Benefits:** Auto-cleanup, targeted updates, readable code

<!-- .element: class="fragment" -->

;HS;

# 🔬 Deep Dive: Dependency Tracking

;VS;

## How Signals Track Dependencies

![depdency_deep_dive](assets/images/observables_are_dead/dependency_deep_dive.png)

;HS;

# 🗡️ Your Signal Arsenal

;VS;

## **signal()** - The Foundation

```typescript
// Simple, powerful state container
count = signal(0);
user = signal<User | null>(null);

// Reading is simple
console.log(this.count()); // 0

// Updating is explicit
this.count.set(5);
this.count.update((val) => val + 1);
```

;VS;

## **computed()** - Derived Power

```typescript
// Automatic dependency tracking + memoization
firstName = signal('John');
lastName = signal('Doe');

fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

// Only recalculates when firstName or lastName change
// Result is cached until dependencies change
```

;VS;

## **effect()** - Side Effect Magic

```typescript
// Reactive side effects
count = signal(0);

// Automatically runs when count changes
countLogger = effect(() => {
  console.log(`Count changed to: ${this.count()}`);
  // Perfect for: DOM updates, analytics, localStorage
});

// Cleanup is automatic when component destroys
```

;HS;

# ⚔️ Advanced Signal Patterns

;VS;

## **linkedSignal()** - Smart Dependencies

```typescript
// From your book - pagination example
searchQuery = signal('');
resultsLimit = signal(10);

// Resets to 0 whenever searchQuery changes
currentPage = linkedSignal({
  source: this.searchQuery,
  computation: () => 0 // Reset page when search changes
});

// But you can still update it manually
nextPage() {
  this.currentPage.update(page => page + 1);
}
```

;VS;

## **resource()** - Async Made Easy

```typescript
// Replaces complex Observable chains
userResource = resource<User, string>({
  loader: async ({ abortSignal }) => {
    const response = await fetch('/api/user', { signal: abortSignal });
    return response.json();
  },
});

// Template usage:
// @if (userResource.isLoading()) { Loading... }
// @else if (userResource.value(); as user) { {{ user.name }} }
// @else if (userResource.error()) { Error! }
```

;VS;

## **Component APIs** - Modern Integration

```typescript
// Signal-based component APIs
@Component({...})
export class UserCard {
  // Input signals - no more @Input() decorators
  user = input.required<User>();
  editable = input(false);

  // Output signals - no more @Output() decorators
  edited = output<User>();

  // Two-way binding - no more ngModel complexity
  query = model('');
}
```

;HS;

# 📊 Performance Comparison: Real App

;VS;

## Shopping Cart: Before vs After

![performance_comparison](assets/images/observables_are_dead/shopping_card_before_and_after.png)

**Result:** 84% faster, 94% fewer components checked

<!-- .element: class="fragment" -->

;HS;

# 🔄 The Migration Strategy

;VS;

## Phase 1: **Interoperability**

```typescript
// Bridge Observable to Signal world
@Component({...})
export class WeatherComponent {
  weatherService = inject(WeatherService);

  // Convert existing Observable to Signal
  weather = toSignal(
    this.weatherService.getCurrentWeather$,
    { initialValue: null }
  );

  // Use in computed
  temperature = computed(() =>
    this.weather()?.temperature ?? 0
  );
}
```

;VS;

## Phase 2: **Signal-First Development**

```typescript
// New features built with Signals
@Injectable()
export class NotificationService {
  private _notifications = signal<Notification[]>([]);

  // Public readonly signal
  notifications = this._notifications.asReadonly();

  // Computed state
  unreadCount = computed(
    () => this.notifications().filter((n) => !n.read).length
  );

  addNotification(message: string) {
    this._notifications.update((notifications) => [
      ...notifications,
      { id: crypto.randomUUID(), message, read: false },
    ]);
  }
}
```

;VS;

## Phase 3: **Full Signal Architecture**

```typescript
// Complete Signal-based architecture
@Component({...})
export class DashboardComponent {
  // Signal inputs from parent
  userId = input.required<string>();

  // Resource for data fetching
  userData = resource({
    request: () => ({ userId: this.userId() }),
    loader: ({ request }) => this.userService.getUser(request.userId)
  });

  // Computed dashboard state
  dashboardData = computed(() => {
    const user = this.userData.value();
    return user ? this.transformForDashboard(user) : null;
  });
}
```

;HS;

# 🧪 Live Demo: The Difference

;VS;

## Observable-Based Counter (Old Way)

```typescript
@Component({
  template: `
    <button (click)="increment()">Count: {{ count$ | async }}</button>
    <p>Double: {{ double$ | async }}</p>
  `,
})
export class ObservableCounter implements OnDestroy {
  private countSubject = new BehaviorSubject(0);
  private destroy$ = new Subject<void>();

  count$ = this.countSubject.asObservable();
  double$ = this.count$.pipe(
    map((count) => count * 2),
    takeUntil(this.destroy$)
  );

  increment() {
    this.countSubject.next(this.countSubject.value + 1);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

;VS;

## Signal-Based Counter (New Way)

```typescript
@Component({
  template: `
    <button (click)="increment()">Count: {{ count() }}</button>
    <p>Double: {{ double() }}</p>
  `,
})
export class SignalCounter {
  count = signal(0);
  double = computed(() => this.count() * 2);

  increment() {
    this.count.update((c) => c + 1);
  }

  // No cleanup needed! 🎉
}
```

**Signal version:** 67% less code, zero memory leaks, better performance

<!-- .element: class="fragment" -->

;HS;

# 🚀 The Zoneless Future

;VS;

## Current: Zone.js Dependency

![zonejs_dep](assets/images/observables_are_dead/zonejs_dep.png)

Global, inefficient change detection

<!-- .element: class="fragment" -->

;VS;

## Future: Signal-Driven Applications

![signals_dep](assets/images/observables_are_dead/signals_dep.png)

Precise, efficient reactivity

<!-- .element: class="fragment" -->

_"Signals are the foundation for Angular's performance future"_

<!-- .element: class="fragment" -->

;HS;

# 📈 Industry Validation

;VS;

## The Signal Revolution Across Frameworks

![signal_revolution](assets/images/observables_are_dead/signal_revolution.png)

**Angular isn't following trends - we're setting them!**

<!-- .element: class="fragment" -->

;VS;

## Community Adoption Evidence

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

# ❓ Common Concerns Addressed

;VS;

## **"RxJS is still needed!"**

✅ **Absolutely true!** RxJS excels at complex async flows

```typescript
// Perfect for RxJS: Complex async coordination
combineLatest([
  this.websocket.messages$,
  this.http.get('/config'),
  timer(0, 5000),
]).pipe(
  switchMap(([message, config, tick]) => processData(message, config)),
  retry(3),
  shareReplay(1)
);

// Perfect for Signals: Simple reactive state
user = signal<User | null>(null);
isLoggedIn = computed(() => !!this.user());
```

;VS;

## **"Learning curve too steep?"**

✅ **Signals are simpler than RxJS**

**RxJS operators to learn:** 125+  
**Signal APIs to learn:** 8 core functions

```typescript
// RxJS complexity
this.form.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((value) => this.searchService.search(value)),
    catchError((err) => of([])),
    takeUntil(this.destroy$)
  )
  .subscribe((results) => (this.results = results));

// Signal simplicity
searchQuery = signal('');
searchResults = resource({
  request: () => ({ query: this.searchQuery() }),
  loader: ({ request }) => this.searchService.search(request.query),
});
```

;VS;

## **"What about breaking changes?"**

✅ **Perfect migration story**

- **Gradual adoption** - use `toSignal()` and `toObservable()`
- **RxJS isn't disappearing** - it's complementary
- **New APIs are additive** - old code keeps working
- **Long-term support** - Angular 18+ will support both paradigms

;HS;

# 🎯 Real-World Success Story

;VS;

## E-commerce Platform Migration

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

**Developer feedback:** _"Signals made our codebase readable again"_

<!-- .element: class="fragment" -->

;HS;

# 🎉 Victory: Modern Angular Architecture

;VS;

## **The New Angular City:**

![angular_city](assets/images/observables_are_dead/angular_city.png)

**Best of both worlds:** Signals for state, RxJS for complex async

<!-- .element: class="fragment" -->

;HS;

# 🚀 Your Signal Journey

;VS;

## **Start Today:**

1. **Experiment** with basic signals in a small component
<!-- .element: class="fragment" -->

2. **Convert** one Observable to a Signal using `toSignal()`
<!-- .element: class="fragment" -->

3. **Try** computed signals for derived state
<!-- .element: class="fragment" -->

4. **Build** a new feature with `resource()` for async data
<!-- .element: class="fragment" -->

5. **Master** the complete ecosystem
<!-- .element: class="fragment" -->

;VS;

### **Learning Resources:**

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

![Mastering Angular Signals](assets/images/mastering-angular-signals-3d.png) <!-- .element: style="max-height: 50%; max-width: 50%;" -->

**"Mastering Angular Signals: A Practical Guide to Modern Reactivity, Performance, and Migration"**

;VS;

### **What You'll Master:**

✅ **Core APIs**: signal(), computed(), effect(), linkedSignal()

✅ **Async Patterns**: resource(), rxResource(), error handling

✅ **Component Integration**: input(), output(), model(), viewChild()

✅ **Migration Strategies**: toSignal(), toObservable(), gradual adoption

✅ **Performance Optimization**: dependency tracking, memoization

✅ **Testing**: Unit testing signal-based components and services

✅ **Real-World Examples**: Shopping cart, dashboard, forms, notifications

✅ **Future-Proofing**: Zoneless Angular, signal stores, architectural patterns

;VS;

**Available Now:**

- 📖 **Amazon** (paperback & digital)
- 💻 **GitHub** with full source code
- 🎯 **25+ practical examples**
- 🧪 **Runnable code repository**

_github.com/AhsanAyaz/mastering-angular-signals-book_

;HS;

# ⚔️ Join the Signal Revolution!

## **The Observable Era is Ending**

## **The Signal Era Has Begun**

;VS;

### **Your Mission:**

1. **Try Signals** in your next feature today
<!-- .element: class="fragment" -->

2. **Benchmark** the performance difference
<!-- .element: class="fragment" -->

3. **Share** your success stories with the community
<!-- .element: class="fragment" -->

4. **Prepare** your codebase for the zoneless future
<!-- .element: class="fragment" -->

5. **Master** the paradigm that will define Angular's next decade
<!-- .element: class="fragment" -->

;VS;

### **Connect & Continue Learning:**

- 🐦 **Twitter**: @CodeWith_Ahsan
<!-- .element: class="fragment" -->

- 📺 **YouTube**: Code with Ahsan (28K+ subscribers)
<!-- .element: class="fragment" -->

- 📧 **Newsletter**: AHSYNC BYTES (1900+ readers) (weekly Angular insights)
<!-- .element: class="fragment" -->

- 🔗 **LinkedIn**: Muhammad Ahsan Ayaz
<!-- .element: class="fragment" -->

;HS;

# Thank You! 🙏

### Questions & Discussion
