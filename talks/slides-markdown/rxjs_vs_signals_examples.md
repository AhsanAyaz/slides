# RxJS vs Signals: Comprehensive Task Comparisons

## 1. 📊 Pagination with Search Reset (linkedSignal)

### RxJS Approach (The Old Way)
```typescript
@Component({...})
export class ProductListComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject = new BehaviorSubject('');
  private pageSubject = new BehaviorSubject(0);
  
  searchTerm$ = this.searchSubject.asObservable();
  currentPage$ = this.pageSubject.asObservable();
  
  // Complex Observable chain to reset page when search changes
  searchWithPageReset$ = this.searchTerm$.pipe(
    distinctUntilChanged(),
    tap(() => this.pageSubject.next(0)), // Reset page on search
    takeUntil(this.destroy$)
  );
  
  // Combine search and pagination
  searchParams$ = combineLatest([
    this.searchWithPageReset$,
    this.currentPage$
  ]).pipe(
    map(([search, page]) => ({ search, page })),
    takeUntil(this.destroy$)
  );
  
  products$ = this.searchParams$.pipe(
    debounceTime(300),
    switchMap(params => this.productService.search(params)),
    shareReplay(1),
    takeUntil(this.destroy$)
  );
  
  updateSearch(term: string) {
    this.searchSubject.next(term);
  }
  
  nextPage() {
    this.pageSubject.next(this.pageSubject.value + 1);
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Signals Approach (The New Way)
```typescript
@Component({...})
export class ProductListComponent {
  searchTerm = signal('');
  resultsLimit = signal(10);
  
  // linkedSignal automatically resets page when search changes!
  currentPage = linkedSignal({
    source: this.searchTerm,
    computation: () => 0 // Reset to 0 when searchTerm changes
  });
  
  // Resource handles debouncing and async automatically
  products = resource({
    request: () => ({
      search: this.searchTerm(),
      page: this.currentPage(),
      limit: this.resultsLimit()
    }),
    loader: ({ request }) => this.productService.search(request)
  });
  
  updateSearch(term: string) {
    this.searchTerm.set(term);
    // Page resets automatically via linkedSignal!
  }
  
  nextPage() {
    this.currentPage.update(page => page + 1);
  }
  
  // No ngOnDestroy needed! 🎉
}
```

**Comparison:**
- **RxJS:** 25+ lines, manual subscription management, complex Observable chains
- **Signals:** 15 lines, automatic cleanup, declarative dependencies
- **Key Benefit:** `linkedSignal()` elegantly handles the "reset page when search changes" pattern

---

## 2. 🌐 HTTP Data Fetching (httpResource)

### RxJS Approach
```typescript
@Component({...})
export class WeatherComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private citySubject = new BehaviorSubject('Stockholm');
  
  city$ = this.citySubject.asObservable();
  loading = false;
  error: string | null = null;
  weatherData: WeatherData | null = null;
  
  constructor(private http: HttpClient) {
    this.city$.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.loading = true;
        this.error = null;
      }),
      switchMap(city => 
        this.http.get<WeatherData>(`/api/weather/${city}`).pipe(
          map(data => ({ data, error: null })),
          catchError(err => of({ data: null, error: err.message })),
          finalize(() => this.loading = false)
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.weatherData = result.data;
      this.error = result.error;
    });
  }
  
  changeCity(city: string) {
    this.citySubject.next(city);
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Signals Approach with httpResource
```typescript
@Component({...})
export class WeatherComponent {
  selectedCity = signal('Stockholm');
  
  // httpResource handles loading, error, and success states automatically
  weather = httpResource<WeatherData>(
    () => `/api/weather/${this.selectedCity()}`,
    {
      parse: (response) => response as WeatherData,
      // Optional: transform data before setting
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

**Comparison:**
- **RxJS:** Manual loading/error state management, complex subscription handling
- **Signals:** Automatic state management, reactive URL updates, built-in error handling
- **Key Benefit:** `httpResource()` eliminates boilerplate for loading/error/success patterns

---

## 3. 🔄 Dependent Data Loading

### RxJS Approach
```typescript
@Component({...})
export class UserProfileComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private userIdSubject = new BehaviorSubject<string>('');
  
  userId$ = this.userIdSubject.asObservable();
  
  user$ = this.userId$.pipe(
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
  
  loadUser(userId: string) {
    this.userIdSubject.next(userId);
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Signals Approach
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

**Comparison:**
- **RxJS:** Complex dependency chains, manual error handling for each stream
- **Signals:** Clear dependency relationships, automatic cascading updates
- **Key Benefit:** Resource dependencies are explicit and type-safe

---

## 4. 🎛️ Form State Management with Validation

### RxJS Approach
```typescript
@Component({...})
export class SignupFormComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  confirmPasswordControl = new FormControl('');
  
  email$ = this.emailControl.valueChanges.pipe(startWith(''));
  password$ = this.passwordControl.valueChanges.pipe(startWith(''));
  confirmPassword$ = this.confirmPasswordControl.valueChanges.pipe(startWith(''));
  
  emailErrors$ = this.email$.pipe(
    map(email => this.validateEmail(email)),
    takeUntil(this.destroy$)
  );
  
  passwordErrors$ = this.password$.pipe(
    map(password => this.validatePassword(password)),
    takeUntil(this.destroy$)
  );
  
  confirmPasswordErrors$ = combineLatest([
    this.password$,
    this.confirmPassword$
  ]).pipe(
    map(([password, confirm]) => 
      password !== confirm ? ['Passwords must match'] : []
    ),
    takeUntil(this.destroy$)
  );
  
  isFormValid$ = combineLatest([
    this.emailErrors$,
    this.passwordErrors$,
    this.confirmPasswordErrors$
  ]).pipe(
    map(([emailErr, passErr, confirmErr]) => 
      emailErr.length === 0 && passErr.length === 0 && confirmErr.length === 0
    ),
    takeUntil(this.destroy$)
  );
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Signals Approach
```typescript
@Component({...})
export class SignupFormComponent {
  // Signal-based form state
  email = model('');
  password = model('');
  confirmPassword = model('');
  
  // Computed validation
  emailErrors = computed(() => this.validateEmail(this.email()));
  passwordErrors = computed(() => this.validatePassword(this.password()));
  
  confirmPasswordErrors = computed(() => {
    const pass = this.password();
    const confirm = this.confirmPassword();
    return pass !== confirm ? ['Passwords must match'] : [];
  });
  
  isFormValid = computed(() => 
    this.emailErrors().length === 0 &&
    this.passwordErrors().length === 0 &&
    this.confirmPasswordErrors().length === 0
  );
  
  submitButtonText = computed(() => 
    this.isFormValid() ? 'Sign Up' : 'Please fix errors'
  );
  
  // Effect for side effects
  validationEffect = effect(() => {
    if (this.isFormValid()) {
      console.log('Form is valid, ready to submit');
    }
  });
  
  // No cleanup needed!
}
```

**Comparison:**
- **RxJS:** 30+ lines, complex combineLatest chains, manual lifecycle management
- **Signals:** 15 lines, declarative computed validations, automatic cleanup
- **Key Benefit:** Computed signals make validation logic crystal clear

---

## 5. 🎭 Component State with Side Effects

### RxJS Approach
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

### Signals Approach
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

**Comparison:**
- **RxJS:** Complex initialization, manual skip logic, subscription management
- **Signals:** Simple initialization, declarative effects, automatic cleanup
- **Key Benefit:** Effects handle side effects elegantly without subscription complexity

---

## 6. 📈 Real-time Data Updates

### RxJS Approach
```typescript
@Component({...})
export class StockTrackerComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private selectedStockSubject = new BehaviorSubject('AAPL');
  
  selectedStock$ = this.selectedStockSubject.asObservable();
  
  stockPrice$ = this.selectedStock$.pipe(
    switchMap(symbol => 
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
    map(history => {
      if (history.length < 2) return 0;
      return history[history.length - 1] - history[history.length - 2];
    })
  );
  
  changeStock(symbol: string) {
    this.selectedStockSubject.next(symbol);
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Signals Approach
```typescript
@Component({...})
export class StockTrackerComponent {
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
  
  priceChangeDirection = computed(() => {
    const change = this.priceChange();
    return change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
  });
  
  constructor() {
    // Effect to update price history when new price arrives
    effect(() => {
      const price = this.currentPrice.value();
      if (price !== undefined) {
        this.priceHistory.update(history => 
          [...history.slice(-9), price]
        );
      }
    });
    
    // Effect to start polling
    effect((onCleanup) => {
      const intervalId = setInterval(() => {
        this.currentPrice.reload();
      }, 1000);
      
      onCleanup(() => clearInterval(intervalId));
    });
  }
  
  changeStock(symbol: string) {
    this.selectedStock.set(symbol);
    this.priceHistory.set([]); // Reset history
  }
}
```

**Comparison:**
- **RxJS:** Complex interval management, scan operations, shareReplay considerations
- **Signals:** Clear separation of concerns, automatic cleanup with onCleanup
- **Key Benefit:** Effects with cleanup make interval management much simpler

---

## Summary: Why Signals Win

| Aspect | RxJS Approach | Signals Approach |
|--------|---------------|------------------|
| **Lines of Code** | 25-40 per component | 10-20 per component |
| **Memory Management** | Manual unsubscribe | Automatic cleanup |
| **Dependency Tracking** | Manual combineLatest | Automatic via computed |
| **Error Handling** | Manual catchError everywhere | Built into resources |
| **Readability** | Complex pipe chains | Declarative computed values |
| **Performance** | Full component tree checks | Fine-grained updates |
| **Learning Curve** | 125+ operators to learn | 8 core Signal APIs |
| **Testing** | Complex mock observables | Simple signal.set() calls |

## 🚀 Migration Strategy

1. **Start with new features** - Use signals for all new components
2. **Convert simple state** - Use `signal()` instead of `BehaviorSubject`
3. **Bridge existing observables** - Use `toSignal()` to convert
4. **Replace complex chains** - Use `computed()` instead of `combineLatest`
5. **Simplify async data** - Use `resource()` instead of `switchMap` patterns

The evidence is clear: **Signals dramatically reduce complexity while improving performance and developer experience!**