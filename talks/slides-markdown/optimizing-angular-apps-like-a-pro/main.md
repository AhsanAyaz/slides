

<!-- {id="646f3771-4ede-4d18-b0de-f203cb27ddab"} -->
# Let's say you had a huge list of items to render...

;VS;


<!-- {id="6696d47f-f077-46b8-80aa-9a2214a84877"} -->


![List Del Example 1](assets/images/ng-perf/list-del-1.png) <!-- .element: style="height: 500px;" -->

;VS;


<!-- {id="8ff5cee8-feb0-4ea3-b23e-857a5abe8820"} -->


### What happens if one item is deleted???

![List Del Example 2](assets/images/ng-perf/list-del-2.png) <!-- .element: style="height: 500px;" -->

;VS;


<!-- {id="a569db38-379e-4748-b4df-59b699ee4078"} -->


## Chaos!!

![Chaos](https://media.giphy.com/media/HUkOv6BNWc1HO/giphy.gif) <!-- .element: style="height: 500px;" -->

;VS;


<!-- {id="c79c9ebf-f30b-45b9-8c6c-2575efa1ed08"} -->


### Angular has to re-render all the items

![List Del Example 3](assets/images/ng-perf/list-del-3.png) <!-- .element: style="height: 500px;" -->

;VS;


<!-- {id="0fb13a5e-e94b-4c04-8772-6624af38589a"} -->


## Solution???

;VS;


<!-- {id="49013895-235a-4f31-8f23-a749989259a9"} -->


# ngFor-TrackByFunction

;VS;


<!-- {id="76b9f3c5-31e5-4853-8137-2bbaa4c925d5"} -->


#### ngFor-TrackByFunction: In the template

![TrackByFn HTML](assets/images/ng-perf/trackByHtml.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="880ac889-187a-4db0-8e3e-1fdc6576c515"} -->


#### ngFor-TrackByFunction: In the component

![TrackByFn TS](assets/images/ng-perf/trackByTS.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="dcab9345-2e7d-46c5-8ace-c5d551e20137"} -->


#### Deleting an item: Before ngFor-TrackByFunction

![Before TrackByFn](assets/images/ng-perf/before-track-by.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="1c41ed0a-1b99-4723-9327-0327bd76d092"} -->


#### Deleting an item: After ngFor-TrackByFunction

![After TrackByFn](assets/images/ng-perf/after-track-by.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="e6d78709-0d9b-4aa5-98c8-f5d7dc144b4f"} -->


#### Before and after usage of ngFor-TrackByFunction

<video style="margin-inline: auto; object-fit: contain;" fullscreen autoplay controls>
  <source src="assets/videos/ng-perf/trackBy.mov">
  Your browser does not support the video tag.
</video>

;HS;


# Is it still fast though???

;VS;


<!-- {id="0b7e00ea-2f8f-4a9d-902e-cd3cab557c6c"} -->


### Let's assume this is what your component tree looks like

![Comp Tree](assets/images/ng-perf/on-push-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="823edd37-32a4-4fa5-b034-b106779fa5c6"} -->


![Comp Tree 2](assets/images/ng-perf/on-push-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="2fd1e16f-a683-43f0-a4d4-250478bdca4d"} -->


![Comp Tree 3](assets/images/ng-perf/on-push-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="928ab9e3-09f1-4c8a-bf20-91cb64440c5f"} -->


#### This is because Angular monkey-patches the following (and more) using ZoneJS

![ZoneJS](assets/images/ng-perf/monkey-patching.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="1fd8e99e-76f0-415e-b302-c015915c6d39"} -->


#### So as soon as any such thing happens in the app...

##### Every component:

![Chaos 2](https://media.giphy.com/media/KmTnUKop0AfFm/giphy.gif) <!-- .element: style="height: 500px; object-fit: contain;" class="fragment" -->

;VS;


<!-- {id="4f261ae9-e416-46c5-b8c2-8a1eb82cf515"} -->


## Solution?

;VS;


<!-- {id="6bd964f0-5226-4b12-b37f-51ccc1995901"} -->


# `OnPush` 
### Change Detection strategy

;VS;


<!-- {id="9a36a117-0047-49b6-9d3a-0cafa38f6364"} -->


<!-- .element: data-transition="fade-in fade-out" -->

![OnPush Code](assets/images/ng-perf/on-push-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="6ce37c53-e2ac-4709-aacc-ec513ec7b5d4"} -->


<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="ae30630b-c72a-43dc-9544-340572d70d12"} -->


<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="27bdc105-9c15-4ac0-82a3-6ee55df21aad"} -->

<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="2971dbcc-ed90-479e-a044-2d11398a36a5"} -->

<!-- .element: data-transition="fade-in fade-out" -->


#### This is what happens then...

<!-- .element: data-transition="fade-in fade-out" -->

![OnPush Code](assets/images/ng-perf/after-onpush-5.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="86a9f1c3-fa17-42ef-866b-11d3a318a985"} -->


<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-6.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="1f69f820-3600-41c1-b84d-8d335be18ece"} -->


<!-- .element: data-transition="fade-in fade-out" -->

#### This is what happens then...

![OnPush Code](assets/images/ng-perf/after-onpush-7.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="e85e97fc-428d-4a91-b18d-b87cf1e45a10"} -->


#### Before and after using OnPush strategy

<video style="margin-inline: auto; object-fit: contain;" fullscreen autoplay controls>
  <source src="assets/videos/ng-perf/onpush.mov">
  Your browser does not support the video tag.
</video>

;VS;


<!-- {id="2bee353e-8651-4076-b611-bff7b9f0d4c5"} -->


![Without OnPush](assets/images/ng-perf/on-push-ng-dev-1.png) <!-- .element: style="width: 900px; object-fit: contain;" -->

###### Profiled using [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

;VS;


<!-- {id="5c5b33de-4809-4ece-ab84-902e3419903d"} -->


![With OnPush](assets/images/ng-perf/on-push-ng-dev-2.png) <!-- .element: style="width: 900px; object-fit: contain;" -->
###### Profiled using [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

;VS;


<!-- {id="d84efe6b-f03a-41fe-baf2-da339a77d0ff"} -->


### Basically, a component with OnPush Strategy says to Angular...

![Do not touch](https://media.giphy.com/media/TfFkYL3Wn2dHA7O8CM/giphy.gif) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;HS;


### Okay, so you've implemented these strategies... Why is the app still slow??

![SLOWWW](assets/memes/slow.gif) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="b4801202-9515-4272-9668-d3f2d391ee07"} -->


### Anyone??

;VS;


<!-- {id="20643d68-1683-4a41-a24d-90df2cd4ff0f"} -->


## Consider an app with multiple pages

![App Comp Tree](assets/images/ng-perf/app-tree.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="c5f9eb88-b662-4ac1-8e5a-79add30dd1c2"} -->


## If you've set up your routing like this:

![Components imported directly](assets/images/ng-perf/comps-imp-directly.png) <!-- .element: style="height: 500px; object-fit: contain;" -->


;VS;


<!-- {id="a3b417cb-c04d-4eae-bdc7-183fc1ef478a"} -->


### Even if you just go to one page...

![App Comp Tree](assets/images/ng-perf/main-bundle.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="3ee2bebc-ca02-436a-b567-0062496728aa"} -->


## Solution??

;VS;


<!-- {id="f4c2b552-93d8-4301-92cb-8c56370d7d1b"} -->


# Lazily Loading Components

;VS;


<!-- {id="0f935ff7-8479-47a3-b606-4342dad49872"} -->


![Lazily Loading Component](assets/images/ng-perf/lazily-loading-components.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="17e034ab-6ebc-4ba9-8344-df9c55be322a"} -->


### This results in multiple bundles

![Lazily Loading Components](assets/images/ng-perf/splitted-bundles.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="87dc8077-fd99-4295-8331-cd2cf0c28d06"} -->


#### Before and after using Lazy Loading

<video style="margin-inline: auto; object-fit: contain;" fullscreen autoplay controls>
  <source src="assets/videos/ng-perf/lazy-loading.mov">
  Your browser does not support the video tag.
</video>

;HS;


## What else???


;VS;


<!-- {id="599c1cd8-ccd2-4d67-ba2c-9c2aea7f564a"} -->


# Shared Modules

;VS;


<!-- {id="da41b54c-69e9-4597-8b91-62a521145f95"} -->


![Pace Palm](assets/memes/frustrated.gif) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="743080ca-3274-4664-8bb8-57d652b37657"} -->


#### Usually, teams build a single `SharedModule` with all reusable code

![Shared Module 1](assets/images/ng-perf/shared-module-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="31040a41-e0f4-4d64-aa17-70e0249fdcbd"} -->

<!-- .element: data-transition="fade-in fade-out" -->
#### This results in...

![Shared Module 2](assets/images/ng-perf/shared-module-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="f49135ca-a0d9-4246-9537-a48bf7c31630"} -->

<!-- .element: data-transition="fade-in fade-out" -->

#### This results in...
![Shared Module 2](assets/images/ng-perf/shared-module-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->


;VS;


<!-- {id="7546cda1-8dbf-4132-ae20-11fbe471019e"} -->


##### And if you have users where they don't have access to fast internet, or newer devices...

![It has been years](https://media.giphy.com/media/FoH28ucxZFJZu/giphy.gif) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="2916ba51-8c1d-40df-8692-356fccef1760"} -->


## Solution???

;VS;


<!-- {id="92525452-0b52-4664-9210-69f2d8019291"} -->


### Smaller (and distributed) Shared Modules
![Shared Module 2](assets/images/ng-perf/shared-module-small.png) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;HS;


#### But how do we know about these large bundles proactively?
## 1. Limiting the bundles using performance budgets. <!-- .element: class="fragment" -->

;VS;


<!-- {id="70e2a90e-d706-4b02-a724-f6f042fc95fa"} -->


#### Imagine you have an application that isn't huge at the moment.

![Simple Budget](assets/images/ng-perf/budgets-1.png) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="1936f8db-5bb1-46fb-b2b9-18f9b84e4a9d"} -->


![Simple Budget 2](assets/images/ng-perf/budgets-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

##### You can set performance budgets in (angular.json/project.json) to control the build process...
<!-- .element: style="font-size: 0.7em" -->

;VS;


<!-- {id="4d2b5167-59e1-45f4-b13e-36b71745e540"} -->


![Simple Budget 3](assets/images/ng-perf/ng-perf-budgets-aio.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

##### Source: https://angular.io

;VS;


<!-- {id="da86414d-fda8-40a2-8703-ec196ed61fa0"} -->


![Simple Budget 2](assets/images/ng-perf/budgets-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

##### And this is the result 
<!-- .element: style="font-size: 0.7em" -->

;VS;


<!-- {id="6a2a9813-60a5-46c4-8a7e-b7b6218f7dde"} -->


##### When team goes above them budgets, CLI be like:
![Shame](https://media.giphy.com/media/Ob7p7lDT99cd2/giphy.gif) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="67104ece-dd87-416d-9046-049492b2b10e"} -->


#### But how do we know about these large bundles proactively?

## 2. Bundle Analyzers

;VS;


<!-- {id="afc3b74a-67b5-43d7-873e-b5152190777b"} -->


### Use Webpack Bundle Analyzer

![WBA 3](assets/images/ng-perf/wba-1.png) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="8af7ad33-db59-4de9-92cb-8645c2db3bc2"} -->


![WBA 2](assets/images/ng-perf/wba-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="e12c08d7-c7bd-48ad-a606-1bc2a55744ed"} -->


![WBA 4](assets/images/ng-perf/wba-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="ff1f7a84-1c48-43c4-aed9-47f1402e23be"} -->


![WBA 5](assets/images/ng-perf/wba-5.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="40ea9d5f-2466-4fe2-9e52-5d2044ba1f07"} -->


![WBA 3](assets/images/ng-perf/wba-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;HS;


# Optimize your images

;VS;


<!-- {id="c65d6f48-c40f-4bfa-aa4d-6ec70ca4908c"} -->


![Responsive](assets/images/responsive.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="01ed937b-afdb-4627-a31d-51d0a4800064"} -->


# [NgOptimizedImage](https://angular.io/api/common/NgOptimizedImage#description) Directive

;VS;


<!-- {id="814c8f8c-ef87-4f84-816b-8be53d654b8e"} -->


![NgOptImage](assets/images/ng-perf/ng-opt-img-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="3687f3f6-e798-4f4a-9340-ef2997532acb"} -->


![NgOptImage2](assets/images/ng-perf/ng-opt-img-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="a6361779-8558-4e83-80b5-23612d83da73"} -->


![NgOptImage3](assets/images/ng-perf/ng-opt-img-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="c8d16bb0-6552-4f1d-a75b-6dd592bd7aef"} -->


![NgOptImage4](assets/images/ng-perf/ng-opt-img-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->
##### Source: [https://angular.io](https://angular.io/guide/image-directive)

;HS;


# Let's say you had a huge list of items to render...

;VS;


<!-- {id="1df3b71d-5266-4f9a-b838-37050ed5dc0c"} -->


![WAT](assets/memes/wat-duck.jpeg) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="aa1da38c-ddd5-4c7c-b624-d07c46c694f4"} -->


![vscroll1](assets/images/ng-perf/v-scroll-1.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="90360ebb-cfb2-4bcc-bc66-45295bee25a1"} -->


##### There is a lot being handled by the DOM

![lots-of-comps](assets/images/ng-perf/lots-of-comps.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="f0335313-3565-4e27-abcd-9a305963cfb8"} -->


![vscroll2](assets/images/ng-perf/v-scroll-2.png) <!-- .element: style="height: 650px; object-fit: contain;" -->

;VS;


<!-- {id="6feb11c4-d8aa-4a65-90d5-8992ce65c1d7"} -->


## Can we do better?

;VS;


<!-- {id="06a788bb-e92e-4b6e-a456-3433689c59b1"} -->


# Virtual Scroll

;VS;


<!-- {id="6ee1921b-c1e7-4328-974a-4d041601b41d"} -->


![vscroll6](assets/images/ng-perf/v-scroll-6.png) <!-- .element: style="height: 650px; object-fit: contain;" -->


;VS;


<!-- {id="242a79ce-f4e4-488c-aac1-646aa93f5e35"} -->


![vscroll4](assets/images/ng-perf/v-scroll-4.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


<!-- {id="dff411d8-bb1f-400c-82d3-fa6205d4c03b"} -->


![vscroll3](assets/images/ng-perf/v-scroll-3.png) <!-- .element: style="height: 500px; object-fit: contain;" -->
###### Profiled using [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

;VS;


<!-- {id="cfc4f9ef-5210-4bbd-9dfa-34f567351e3d"} -->


![vscroll5](assets/images/ng-perf/v-scroll-5.png) <!-- .element: style="height: 500px; object-fit: contain;" -->
###### Profiled using [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

Notes:
- Render elements that can fit on the screen.
- Recommended for UI with a huge list.
- Improves the performance of the application
- Better UX for end users

;VS;


<!-- {id="8e546ccd-7afe-4d7f-8288-6fc54fa2f804"} -->


## All of this...basically...

![too-fast](https://media4.giphy.com/media/Gpu3skdN58ApO/giphy.gif?cid=ecf05e475671sc3siwhg3kf9t3fa9ke1rfmtof1dsw7slvao&ep=v1_gifs_search&rid=giphy.gif&ct=g) <!-- .element: class="fragment" style="height: 500px; object-fit: contain;" data-fragment-index="1" -->

##### Makes your app FAST <!-- .element: class="fragment" data-fragment-index="1" -->

;HS;


# Shameless Plug

![Angular Cookbook](assets/images/ng-cb-w-stats.png) <!-- .element: style="height: 500px;" class="fragment" -->

;VS;


<!-- {id="0f8baacf-9b02-4c40-8bec-efff111cb7d5"} -->


![Angular Cookbook](assets/images/ng-cb-2e.png) <!-- .element: style="height: 500px;" -->

;HS;


<!-- {id="5925b16c-211a-4834-b76b-883e63b8bf6a"} -->


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


<!-- {id="083c89ec-5535-4b31-9ec7-da1596b82963"} -->


![Feedback on session](assets/images/ng-perf/feedback.png) <!-- .element: style="height: 500px;" -->

;HS;


<!-- {id="bebb3635-54d8-4b8d-beaf-85ff88c51c19"} -->


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