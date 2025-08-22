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

## Problem 1: Pagination with Search Reset

The Observable Way (25+ lines of complexity)

```typescript
@Component({...})
export class ProductListComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject = new BehaviorSubject('');
  private pageSubject = new BehaviorSubject(0);

  // Complex Observable chain to reset page when search changes
  searchWithPageReset$ = this.searchSubject.pipe(
    distinctUntilChanged(),
    tap(() => this.pageSubject.next(0)), // Manual reset
    takeUntil(this.destroy$)
  );

  searchParams$ = combineLatest([
    this.searchWithPageReset$,
    this.pageSubject
  ]).pipe(
    map(([search, page]) => ({ search, page })),
    takeUntil(this.destroy$)
  );

  products$ = this.searchParams$.pipe(
    debounceTime(300),
    switchMap(params => this.productService.search(params)),
    takeUntil(this.destroy$)
  );

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Problems:** Manual subscription management, complex chains, memory leaks

<!-- .element: class="fragment" style="font-size: 26px;" -->

;VS;

## The Signal Way (15 lines of clarity)

```typescript
@Component({...})
export class ProductListComponent {
  searchTerm = signal('');

  // linkedSignal automatically resets page when search changes!
  currentPage = linkedSignal({
    source: this.searchTerm,
    computation: () => 0 // Reset to 0 when searchTerm changes
  });

  // Resource handles debouncing and async automatically
  products = resource({
    request: () => ({
      search: this.searchTerm(),
      page: this.currentPage()
    }),
    loader: ({ request }) => this.productService.search(request)
  });

  // No ngOnDestroy needed! 🎉
}
```

**Benefits:** Automatic cleanup, elegant dependency handling, significantly less code

<!-- .element: class="fragment" -->

;HS;

# 🌐 Problem 2: HTTP Data Fetching Complexity

;VS;

## The Observable Way - Manual State Management

```typescript
@Component({...})
export class WeatherComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private citySubject = new BehaviorSubject('Stockholm');

  loading = false;
  error: string | null = null;
  weatherData: WeatherData | null = null;

  constructor(private http: HttpClient) {
    this.citySubject.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.loading = true; // Manual loading state
        this.error = null;   // Manual error reset
      }),
      switchMap(city =>
        this.http.get<WeatherData>(`/api/weather/${city}`).pipe(
          map(data => ({ data, error: null })),
          catchError(err => of({ data: null, error: err.message })),
          finalize(() => this.loading = false) // Manual cleanup
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.weatherData = result.data;
      this.error = result.error;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

;VS;

## The Signal Way - Automatic State Management

```typescript
@Component({...})
export class WeatherComponent {
  selectedCity = signal('Stockholm');

  // httpResource handles loading, error, and success states automatically
  weather = httpResource<WeatherData>(
    () => `/api/weather/${this.selectedCity()}`,
    {
      parse: (response) => response as WeatherData,
      onError: (error) => console.error('Weather fetch failed:', error)
    }
  );

  changeCity(city: string) {
    this.selectedCity.set(city);
    // weather.reload() called automatically when URL changes!
  }

  // Template usage:
  // @if (weather.isLoading()) { Loading... }
  // @else if (weather.error()) { Error: {{ weather.error() }} }
  // @else if (weather.value(); as data) { {{ data.temperature }}° }
}
```

**Result:** Dramatically less code, automatic state management, zero subscriptions

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

## Real Angular App Analysis - Form Validation

**RxJS Approach (30+ lines):**

```typescript
// Complex combineLatest chains for form validation
emailErrors$ = this.emailControl.valueChanges.pipe(
  map((email) => this.validateEmail(email)),
  takeUntil(this.destroy$)
);

confirmPasswordErrors$ = combineLatest([
  this.passwordControl.valueChanges,
  this.confirmPasswordControl.valueChanges,
]).pipe(
  map(([password, confirm]) =>
    password !== confirm ? ['Passwords must match'] : []
  ),
  takeUntil(this.destroy$)
);

isFormValid$ = combineLatest([
  this.emailErrors$,
  this.passwordErrors$,
  this.confirmPasswordErrors$,
]).pipe(
  map(
    ([emailErr, passErr, confirmErr]) =>
      emailErr.length === 0 && passErr.length === 0 && confirmErr.length === 0
  )
);
```

;VS;

**Signal Approach (15 lines):**

```typescript
// Simple computed validations
email = model('');
password = model('');
confirmPassword = model('');

emailErrors = computed(() => this.validateEmail(this.email()));
confirmPasswordErrors = computed(() => {
  const pass = this.password();
  const confirm = this.confirmPassword();
  return pass !== confirm ? ['Passwords must match'] : [];
});

isFormValid = computed(
  () =>
    this.emailErrors().length === 0 &&
    this.passwordErrors().length === 0 &&
    this.confirmPasswordErrors().length === 0
);
```

**Performance Results:**

- **Before Signals:** 47 components checked per interaction, 280ms average time
- **After Signals:** 3 components updated per interaction, 45ms average time

### **Result: Significant performance improvement, 50% less code!**

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

## Problem 3: Dependent Data Loading

### The RxJS Way - Complex Dependency Chains

```typescript
@Component({...})
export class UserProfileComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private userIdSubject = new BehaviorSubject<string>('');

  user$ = this.userIdSubject.pipe(
    filter(id => !!id),
    switchMap(id => this.userService.getUser(id)),
    shareReplay(1),
    takeUntil(this.destroy$)
  );

  // Posts depend on user data
  posts$ = this.user$.pipe(
    switchMap(user => this.postService.getUserPosts(user.id)),
    catchError(() => of([])),
    takeUntil(this.destroy$)
  );

  // Analytics depend on both user and posts
  analytics$ = combineLatest([this.user$, this.posts$]).pipe(
    map(([user, posts]) => this.calculateAnalytics(user, posts)),
    takeUntil(this.destroy$)
  );

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

;VS;

## The Signal Way - Clear Dependency Relationships

```typescript
@Component({...})
export class UserProfileComponent {
  userId = signal<string>('');

  // Primary resource
  user = resource({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) => this.userService.getUser(request.id)
  });

  // Dependent resource - automatically waits for user
  posts = resource({
    request: () => {
      const userData = this.user.value();
      return userData ? { userId: userData.id } : null;
    },
    loader: ({ request }) =>
      request ? this.postService.getUserPosts(request.userId) : []
  });

  // Computed analytics - automatically updates when dependencies change
  analytics = computed(() => {
    const userData = this.user.value();
    const postsData = this.posts.value();

    if (!userData || !postsData) return null;
    return this.calculateAnalytics(userData, postsData);
  });

  loadUser(userId: string) {
    this.userId.set(userId);
    // All dependent resources update automatically!
  }
}
```

**Benefits:** Explicit dependencies, automatic cascading updates, type-safe

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

# 📊 Performance Comparison: Real Apps

;VS;

## Summary: Why Signals Win

| Aspect                  | RxJS Approach                | Signals Approach            |
| ----------------------- | ---------------------------- | --------------------------- |
| **Lines of Code**       | 25-40 per component          | 10-20 per component         |
| **Memory Management**   | Manual unsubscribe           | Automatic cleanup           |
| **Dependency Tracking** | Manual combineLatest         | Automatic via computed      |
| **Error Handling**      | Manual catchError everywhere | Built into resources        |
| **Readability**         | Complex pipe chains          | Declarative computed values |
| **Performance**         | Full component tree checks   | Fine-grained updates        |
| **Learning Curve**      | 125+ operators to learn      | 8 core Signal APIs          |
| **Testing**             | Complex mock observables     | Simple signal.set() calls   |

;VS;

## Real-World Performance Results

**Angular's Official Guidance:**

- **Zone.js issues:** "Triggers synchronization more often than necessary" - Angular Team
- **Zoneless benefits:** "Faster initial render times, optimized change detection" - Angular Docs

**Zone.js vs Zoneless Performance:**

- **With Zone.js:** Change detection runs after every async operation, even when no state changed
- **With Signals:** Only affected components update when their dependencies change

**Code Complexity Reduction:**

- **RxJS approach:** Manual subscription management, complex Observable chains
- **Signals approach:** Automatic cleanup, declarative dependencies

![performance_comparison](assets/images/observables_are_dead/shopping_card_before_and_after.png)

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

# 🧪 Problem 4: Component State with Side Effects

;VS;

## The RxJS Way - Complex Side Effect Management

```typescript
@Component({...})
export class ThemeToggleComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');

  theme$ = this.themeSubject.asObservable();

  constructor() {
    // Load from localStorage
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) {
      this.themeSubject.next(saved);
    }

    // Save to localStorage on changes
    this.theme$.pipe(
      skip(1), // Skip initial value
      takeUntil(this.destroy$)
    ).subscribe(theme => {
      localStorage.setItem('theme', theme);
      document.body.className = `theme-${theme}`;
    });
  }

  toggleTheme() {
    const current = this.themeSubject.value;
    this.themeSubject.next(current === 'light' ? 'dark' : 'light');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

;VS;

## The Signal Way - Elegant Effect Management

```typescript
@Component({...})
export class ThemeToggleComponent {
  // Initialize from localStorage
  theme = signal<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  // Computed properties
  isDarkMode = computed(() => this.theme() === 'dark');
  themeIcon = computed(() => this.isDarkMode() ? '🌙' : '☀️');

  constructor() {
    // Effect for side effects - saves to localStorage and updates DOM
    effect(() => {
      const currentTheme = this.theme();
      localStorage.setItem('theme', currentTheme);
      document.body.className = `theme-${currentTheme}`;
    });
  }

  toggleTheme() {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  // No cleanup needed!
}
```

**Result:** Simple initialization, declarative effects, automatic cleanup

<!-- .element: class="fragment" -->

;HS;

# 📈 Real-Time Data Updates Comparison

;VS;

## RxJS: Complex Polling & State Management

```typescript
stockPrice$ = this.selectedStock$.pipe(
  switchMap((symbol) =>
    interval(1000).pipe(
      switchMap(() => this.stockService.getPrice(symbol)),
      takeUntil(this.destroy$)
    )
  ),
  shareReplay(1)
);

priceHistory$ = this.stockPrice$.pipe(
  scan((history, price) => [...history.slice(-9), price], [] as number[]),
  startWith([])
);

priceChange$ = this.priceHistory$.pipe(
  map((history) => {
    if (history.length < 2) return 0;
    return history[history.length - 1] - history[history.length - 2];
  })
);
```

;VS;

## Signals: Clean Polling with Automatic Cleanup

```typescript
selectedStock = signal('AAPL');
private priceHistory = signal<number[]>([]);

// Resource with polling
currentPrice = resource({
  request: () => ({ symbol: this.selectedStock() }),
  loader: ({ request }) => this.stockService.getPrice(request.symbol)
});

// Computed price change
priceChange = computed(() => {
  const history = this.priceHistory();
  if (history.length < 2) return 0;
  return history[history.length - 1] - history[history.length - 2];
});

constructor() {
  // Effect with automatic cleanup
  effect((onCleanup) => {
    const intervalId = setInterval(() => {
      this.currentPrice.reload();
    }, 1000);

    onCleanup(() => clearInterval(intervalId));
  });
}
```

**Benefit:** Effects with onCleanup make interval management simple

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

- **Major libraries**: NgRx, Angular Material, TanStack Query adopting signals
<!-- .element: class="fragment" -->

- **Early adoption**: 26% of Angular devs already using Signals ([2023 Angular Survey](https://blog.angular.dev/angular-developer-survey-2023-86372317c95f))
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

✅ **Signals are dramatically simpler than RxJS**

**RxJS operators to learn:** 125+  
**Signal APIs to learn:** 8 core functions

```typescript
// RxJS: Complex search with debouncing (15+ lines)
this.form
  .get('search')
  .valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => (this.loading = true)),
    switchMap((value) =>
      this.searchService.search(value).pipe(
        catchError((err) => {
          this.error = err.message;
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
    ),
    takeUntil(this.destroy$)
  )
  .subscribe((results) => (this.results = results));

// Signal: Simple reactive search (5 lines)
searchQuery = signal('');
searchResults = resource({
  request: () => ({ query: this.searchQuery() }),
  loader: ({ request }) => this.searchService.search(request.query),
});
// Loading, error, and success states handled automatically!
```

;VS;

## **"What about breaking changes?"**

✅ **Perfect migration story**

- **Gradual adoption** - use `toSignal()` and `toObservable()`
- **RxJS isn't disappearing** - it's complementary
- **New APIs are additive** - old code keeps working
- **Long-term support** - Angular 18+ will support both paradigms

;HS;

# 🎯 Real-World Success Stories

;VS;

## Migration Strategy Success

### **Phase 1: Start with Simple State**

```typescript
// Convert BehaviorSubject to signal
// Before:
private userSubject = new BehaviorSubject<User | null>(null);
user$ = this.userSubject.asObservable();

// After:
user = signal<User | null>(null);
```

### **Phase 2: Replace combineLatest with computed**

```typescript
// Before: Complex observable chains
fullName$ = combineLatest([this.firstName$, this.lastName$]).pipe(
  map(([first, last]) => `${first} ${last}`)
);

// After: Simple computed signal
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

### **Phase 3: Use resource() for async data**

```typescript
// Before: Complex switchMap patterns
data$ = this.params$.pipe(switchMap((params) => this.service.getData(params)));

// After: Simple resource
data = resource({
  request: () => this.params(),
  loader: ({ request }) => this.service.getData(request),
});
```

**Result:** Significant code reduction, eliminated subscription management

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

## **Start Today - Concrete Steps:**

1. **Replace one BehaviorSubject** with `signal()` in an existing component
<!-- .element: class="fragment" -->

2. **Convert one combineLatest** to `computed()` for derived state
<!-- .element: class="fragment" -->

3. **Use `toSignal()`** to bridge one existing Observable to Signal world
<!-- .element: class="fragment" -->

4. **Build one new feature** with `resource()` instead of switchMap
<!-- .element: class="fragment" -->

5. **Replace async pipe** with direct signal calls in templates
<!-- .element: class="fragment" -->

6. **Measure the performance difference** with Angular DevTools
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

✅ **Core APIs**: signal(), computed(), effect(), linkedSignal() with 25+ examples

✅ **Async Patterns**: resource(), rxResource(), error handling, loading states

✅ **Component Integration**: input(), output(), model(), viewChild() migration

✅ **Migration Strategies**: Step-by-step conversion from RxJS to Signals

✅ **Performance Optimization**: Fine-grained reactivity, dependency tracking

✅ **Testing**: Unit testing signal-based components with simple strategies

✅ **Real-World Examples**: All 6 patterns from today's presentation + more

✅ **Future-Proofing**: Zoneless Angular, signal stores, architectural best practices

✅ **Code Reduction Techniques**: Turn 40-line RxJS components into 15-line Signal components

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

### **Your Signal Challenge:**

1. **Find your most complex Observable chain** and rewrite it with Signals
<!-- .element: class="fragment" -->

2. **Measure the before/after performance** with Angular DevTools
<!-- .element: class="fragment" -->

3. **Convert one form validation** from RxJS to computed signals
<!-- .element: class="fragment" -->

4. **Replace one HTTP call** with resource() instead of subscribe()
<!-- .element: class="fragment" -->

5. **Share your results** - how much code did you eliminate?
<!-- .element: class="fragment" -->

**Goal:** Experience the significant code reduction and performance gains firsthand!

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

;HS;

# 📝 Your Feedback Matters!

;VS;

![Feedback QR Code](assets/images/observables_are_dead/qr.png) <!-- .element: style="max-height: 60%; max-width: 60%;" -->

### Scan to share your thoughts on this presentation

**Help me improve future talks!**

<!-- .element: class="fragment" -->
