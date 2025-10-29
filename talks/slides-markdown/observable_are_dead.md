# "The Observable is dead! Long live the Signal!"

## A Story for Angular Developers

_Presentation by Muhammad Ahsan Ayaz_
_Google Developer Expert in AI & Angular_

;HS;

# The Observable is dead!

# Long live the Signal! 👑

**Muhammad Ahsan Ayaz**

<!-- .element: class="fragment" -->

Google Developer Expert in AI & Angular

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

```typescript
// The Observable Way - Complex for simple state
@Component({...})
export class UserComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  user$ = this.userService.getUser().pipe(
    takeUntil(this.destroy$)
  );

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

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

```typescript
// The Signal Way - Simple & Powerful
@Component({...})
export class UserComponent {
  userService = inject(UserService);

  user = toSignal(this.userService.getUser());
  fullName = computed(() =>
    `${this.user()?.firstName} ${this.user()?.lastName}`
  );

  // No ngOnDestroy needed! 🎉
}
```

**Benefits:** Auto-cleanup, fine-grained updates, readable code

<!-- .element: class="fragment" -->

;HS;

# 🗡️ Your Signal Arsenal

;VS;

## **signal()** - The Foundation

```typescript
count = signal(0);
increment() { this.count.update(val => val + 1); }
```

;VS;

## **computed()** - Derived Power

```typescript
doubleCount = computed(() => this.count() * 2);
```

;VS;

## **effect()** - Side Effect Magic

```typescript
logEffect = effect(() => console.log('Count:', this.count()));
```

_"But there's more..."_

<!-- .element: class="fragment" -->

;HS;

# ⚔️ Advanced Arsenal

;VS;

## **linkedSignal()** - Smart Dependencies

```ts
page = linkedSignal({
  source: this.searchQuery,
  computation: () => 0, // Reset page when search changes
});
```

;VS;

## **resource()** - Async Made Easy

```typescript
users = resource({
  loader: () => this.http.get<User[]>('/api/users'),
});
```

;VS;

## **Component APIs** - Modern Integration

```typescript
email = input.required<string>();
clicked = output<void>();
query = model('');
```

;HS;

# 📊 Signals vs Observables: Performance

;VS;

;VS;

## Zone.js (Observable World)

<!-- .element: class="fragment" -->

```
User clicks → Zone.js → Check ENTIRE component tree → Re-render
```

<!-- .element: class="fragment" -->

## Signals (New World)

<!-- .element: class="fragment" -->

```
Signal changes → Only dependent components → Targeted re-render
```

<!-- .element: class="fragment" -->

;VS;

### Result: **Up to 80% reduction** in change detection cycles!

> > > > > > > a4977ad (WIP: slides for observables are dead talk)
> > > > > > > _"Real apps, real performance gains"_

<!-- .element: class="fragment" -->

;HS;

# 🔄 The Migration Path

;VS;

## Phase 1: **Coexistence**

```typescript
// Bridge the worlds
userData$ = this.userService.getUser();
userData = toSignal(this.userData$, { initialValue: null });
```

;VS;

## Phase 2: **Signal-First**

```typescript
// New features with signals
userSignal = signal<User | null>(null);
```

;VS;

## Phase 3: **Signal Native**

```typescript
// Full signal architecture
userResource = resource({
  loader: () => this.userService.getUser(),
});
```

;HS;

# 💼 Battle-Tested: Shopping Cart

;VS;

```typescript
// OLD WAY: Complex Observable Chain
cart$ = this.cartService.items$.pipe(
  map((items) => items.reduce((sum, item) => sum + item.price, 0)),
  shareReplay(1)
);
```

;VS;

```typescript
// NEW WAY: Crystal Clear Signals
items = signal<CartItem[]>([]);
total = computed(() => this.items().reduce((sum, item) => sum + item.price, 0));
```

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

## **"Mastering Angular Signals"**

_A Practical Guide to Modern Reactivity, Performance, and Migration_

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

;VS;

## **The Signal Era Has Begun**

<!-- .element: class="fragment" -->

### **Take Action Today:**

<!-- .element: class="fragment" -->

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

# 🤔 Questions & Discussion

## **"The Observable is dead! Long live the Signal!"**

_Ready to embrace the future of Angular?_

**Muhammad Ahsan Ayaz**

<!-- .element: class="fragment" -->

Google Developer Expert in AI & Angular

<!-- .element: class="fragment" -->

Author of "Mastering Angular Signals"

<!-- .element: class="fragment" -->

### Book: Available on Amazon

### Code: github.com/AhsanAyaz/mastering-angular-signals-book

### Connect: @CodeWithAhsan

;HS;

## Speaker Notes & Timing

**Total: 30 minutes**

- Introduction & Story Setup: 3 min
- The City (RxJS Status Quo): 4 min
- The Dragon (Problems & Opportunities): 5 min
- The Choice & Attack (Signals Introduction): 6 min
- Signal Arsenal & Examples: 8 min
- Migration & Future: 3 min
- Wrap-up & Book Promotion: 1 min

**Key Messages:**

1. Signals solve real RxJS pain points
2. Performance benefits are measurable
3. Migration is gradual and safe
4. Angular's future is signal-driven
5. The book provides comprehensive mastery
