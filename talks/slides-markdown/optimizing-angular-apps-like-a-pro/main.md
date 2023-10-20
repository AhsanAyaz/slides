# Let's say you had a huge list of items to render...

;VS;

![List Del Example 1](assets/images/ng-perf/list-del-1.png) <!-- .element: style="height: 500px;" -->

;VS;

### What happens if one item is deleted???

![List Del Example 2](assets/images/ng-perf/list-del-2.png) <!-- .element: style="height: 500px;" -->

;VS;

## Chaos!!

![Chaos](https://media.giphy.com/media/HUkOv6BNWc1HO/giphy.gif) <!-- .element: style="height: 500px;" -->

;VS;

### Angular has to re-render all the items

![List Del Example 3](assets/images/ng-perf/list-del-3.png) <!-- .element: style="height: 500px;" -->

;VS;

## Solution???

;VS;

# ngFor-TrackByFunction

;VS;

#### ngFor-TrackByFunction: In the template

![TrackByFn HTML](assets/images/ng-perf/trackByHtml.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### ngFor-TrackByFunction: In the component

![TrackByFn TS](assets/images/ng-perf/trackByTS.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### Deleting an item: Before ngFor-TrackByFunction

![Before TrackByFn](assets/images/ng-perf/before-track-by.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### Deleting an item: After ngFor-TrackByFunction

![After TrackByFn](assets/images/ng-perf/after-track-by.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### Before and after usage of ngFor-TrackByFunction

<video style="margin-inline: auto; object-fit: contain;" fullscreen autoplay controls>
  <source src="assets/videos/ng-perf/trackBy.mov">
  Your browser does not support the video tag.
</video>

;HS;

# Is it still fast though???

;VS;

### Let's assume this is what your component tree looks like

![Comp Tree](assets/images/ng-perf/on-push-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![Comp Tree 2](assets/images/ng-perf/on-push-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![Comp Tree 3](assets/images/ng-perf/on-push-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### This is because Angular monkey-patches the following (and more) using ZoneJS

![ZoneJS](assets/images/ng-perf/monkey-patching.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### So as soon as any such thing happens in the app...

##### Every component:

![Chaos 2](https://media.giphy.com/media/KmTnUKop0AfFm/giphy.gif) <!-- .element: style="height: 500px; object-fit: contain;" class="fragment" -->

;VS;

## Solution?

;VS;

# `OnPush` 
### Change Detection strategy

;VS;

<!-- .element: data-transition="fade-in fade-out" -->

![OnPush Code](assets/images/ng-perf/on-push-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;
<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;
<!-- .element: data-transition="fade-in fade-out" -->


#### This is what happens then...

<!-- .element: data-transition="fade-in fade-out" -->

![OnPush Code](assets/images/ng-perf/after-onpush-5.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-6.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-7.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### Before and after using OnPush strategy

<video style="margin-inline: auto; object-fit: contain;" fullscreen autoplay controls>
  <source src="assets/videos/ng-perf/onpush.mov">
  Your browser does not support the video tag.
</video>

;VS;

![Without OnPush](assets/images/ng-perf/on-push-ng-dev-1.png) <!-- .element: style="width: 900px; object-fit: contain;" -->

###### Profiled using [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

;VS;

![With OnPush](assets/images/ng-perf/on-push-ng-dev-2.png) <!-- .element: style="width: 900px; object-fit: contain;" -->
###### Profiled using [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

;VS;

### Basically, a component with OnPush Strategy says to Angular...

![Do not touch](https://media.giphy.com/media/TfFkYL3Wn2dHA7O8CM/giphy.gif) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;HS;

### Okay, so you've implemented these strategies... Why is the app still slow??

![SLOWWW](assets/memes/slow.gif) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;

### Anyone??

;VS;

## Consider an app with multiple pages

![App Comp Tree](assets/images/ng-perf/app-tree.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

## If you've set up your routing like this:

![Components imported directly](assets/images/ng-perf/comps-imp-directly.png) <!-- .element: style="height: 500px; object-fit: contain;" -->


;VS;

### Even if you just go to one page...

![App Comp Tree](assets/images/ng-perf/main-bundle.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

## Solution??

;VS;

# Lazily Loading Components

;VS;

![Lazily Loading Component](assets/images/ng-perf/lazily-loading-components.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

### This results in multiple bundles

![Lazily Loading Components](assets/images/ng-perf/splitted-bundles.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### Before and after using Lazy Loading

<video style="margin-inline: auto; object-fit: contain;" fullscreen autoplay controls>
  <source src="assets/videos/ng-perf/lazy-loading.mov">
  Your browser does not support the video tag.
</video>

;HS;

## What else???


;VS;

# Shared Modules

;VS;

![Pace Palm](assets/memes/frustrated.gif) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### Usually, teams build a single `SharedModule` with all reusable code

![Shared Module 1](assets/images/ng-perf/shared-module-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;
<!-- .element: data-transition="fade-in fade-out" -->
#### This results in...

![Shared Module 2](assets/images/ng-perf/shared-module-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;
<!-- .element: data-transition="fade-in fade-out" -->

#### This results in...
![Shared Module 2](assets/images/ng-perf/shared-module-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->


;VS;

##### And if you have users where they don't have access to fast internet, or newer devices...

![It has been years](https://media.giphy.com/media/FoH28ucxZFJZu/giphy.gif) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;

## Solution???

;VS;

### Smaller (and distributed) Shared Modules
![Shared Module 2](assets/images/ng-perf/shared-module-small.png) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;HS;

#### But how do we know about these large bundles proactively?
## 1. Limiting the bundles using performance budgets. <!-- .element: class="fragment" -->

;VS;

#### Imagine you have an application that isn't huge at the moment.

![Simple Budget](assets/images/ng-perf/budgets-1.png) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;

![Simple Budget 2](assets/images/ng-perf/budgets-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

##### You can set performance budgets in (angular.json/project.json) to control the build process...
<!-- .element: style="font-size: 0.7em" -->

;VS;

![Simple Budget 3](assets/images/ng-perf/ng-perf-budgets-aio.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

##### Source: https://angular.io

;VS;

![Simple Budget 2](assets/images/ng-perf/budgets-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

##### And this is the result 
<!-- .element: style="font-size: 0.7em" -->

;VS;

##### When team goes above them budgets, CLI be like:
![Shame](https://media.giphy.com/media/Ob7p7lDT99cd2/giphy.gif) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;

#### But how do we know about these large bundles proactively?

## 2. Bundle Analyzers

;VS;

### Use Webpack Bundle Analyzer

![WBA 3](assets/images/ng-perf/wba-1.png) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;

![WBA 2](assets/images/ng-perf/wba-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![WBA 4](assets/images/ng-perf/wba-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![WBA 5](assets/images/ng-perf/wba-5.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![WBA 3](assets/images/ng-perf/wba-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;HS;

# Optimize your images

;VS;

![Responsive](assets/images/responsive.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

# [NgOptimizedImage](https://angular.io/api/common/NgOptimizedImage#description) Directive

;VS;

![NgOptImage](assets/images/ng-perf/ng-opt-img-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![NgOptImage2](assets/images/ng-perf/ng-opt-img-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![NgOptImage3](assets/images/ng-perf/ng-opt-img-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![NgOptImage4](assets/images/ng-perf/ng-opt-img-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->
##### Source: [https://angular.io](https://angular.io/guide/image-directive)

;HS;

# Let's say you had a huge list of items to render...

;VS;

![WAT](assets/memes/wat-duck.jpeg) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![vscroll1](assets/images/ng-perf/v-scroll-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

##### There is a lot being handled by the DOM

![lots-of-comps](assets/images/ng-perf/lots-of-comps.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![vscroll2](assets/images/ng-perf/v-scroll-2.png) <!-- .element: style="height: 650px; object-fit: contain;" -->

;VS;

## Can we do better?

;VS;

# Virtual Scroll

;VS;

![vscroll6](assets/images/ng-perf/v-scroll-6.png) <!-- .element: style="height: 650px; object-fit: contain;" -->


;VS;

![vscroll4](assets/images/ng-perf/v-scroll-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![vscroll3](assets/images/ng-perf/v-scroll-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->
###### Profiled using [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

;VS;

![vscroll5](assets/images/ng-perf/v-scroll-5.png) <!-- .element: style="height: 500px; object-fit: contain;" -->
###### Profiled using [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

Notes:
- Render elements that can fit on the screen.
- Recommended for UI with a huge list.
- Improves the performance of the application
- Better UX for end users

;VS;

## All of this...basically...

![too-fast](https://media4.giphy.com/media/Gpu3skdN58ApO/giphy.gif?cid=ecf05e475671sc3siwhg3kf9t3fa9ke1rfmtof1dsw7slvao&ep=v1_gifs_search&rid=giphy.gif&ct=g) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" data-fragment-index="1" -->

##### Makes your app FAST <!-- .element: class="fragment" data-fragment-index="1" -->

;HS;

# Shameless Plug

![Angular Cookbook](assets/images/ng-cb-w-stats.png) <!-- .element: style="height: 500px;" class="fragment" -->

;VS;

![Angular Cookbook](assets/images/ng-cb-2e.png) <!-- .element: style="height: 500px;" -->

;HS;

## Some general recommendations

<ul>
  <li> Use <a href="https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh">Angular DevTools</a></li> <!-- .element: class="fragment" -->
  <li>
    Use <a href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbj">LightHouse</a> to audit your apps
  </li>  <!-- .element: class="fragment" -->
  <li>
    Look into <a href="https://web.dev/articles/vitals">Core Web Vitals</a>
  </li> <!-- .element: class="fragment" -->
  <li>
    Use CDN to serve the assets
    <ul>
      <li>
        Low Latency, High availability
      </li> <!-- .element: class="fragment" -->
      <li>
        Decreased server load
      </li> <!-- .element: class="fragment" -->
    </ul>
  </li> <!-- .element: class="fragment" -->
  <li>
    Use tree-shakeable packages
  </li> <!-- .element: class="fragment" -->
  <li>
    Use <a href="https://angular.io/guide/signals">Angular Signals</a> for better reactivity and change detection
  </li> <!-- .element: class="fragment" -->
</ul>

;HS;

![Feedback on session](assets/images/ng-perf/feedback.png) <!-- .element: style="height: 500px;" -->

;HS;

## Thank You!

<div class="introduction">
  <div class="introduction__left">
    <img class="introduction__left__avatar" src="https://avatars.githubusercontent.com/u/9844254?v=4"/>
    <div class="introduction__left__info">
      <p>Muhammad Ahsan Ayaz</p>
      <p>GDE in Angular</p>
      <p>Head Instructor and Software Architect at &#60;/Salt&#62;</p>
    </div>
  </div>
  <div class="introduction__right">
    <!-- <img class="introduction__right__gde" src="assets/images/gde-logo.png"/> -->
    <img class="introduction__right__ng-book"  src="assets/images/ng-book-cover.png"/>
  </div>
</div>

<div class="footer">
  <div class="footer__site">
    <a href="https://codewithahsan.dev/ng-book">https://codewithahsan.dev/ng-book</a>
  </div>
  <div>
    <a href="https://twitter.com/codewithahsan">@codewith_ahsan</a>
  </div>
</div>