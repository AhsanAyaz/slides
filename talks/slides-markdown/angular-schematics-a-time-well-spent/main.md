
# What in the actual schematics we talking about today?

;VS;

### We're going to talk about how it saved me tens of hours working on Angular Cookbook 2nd Edition

;HS;

# Problem?

![Angular Cookbook](assets/images/ng-book-cover.png) <!-- .element: style="height: 500px;" class="fragment" -->

;VS;

# 80+ recipes

## 80+ Angular Projects <!-- .element: class="fragment" -->

;VS;

## Updating all the recipes

![slow-motion](assets/memes/slow-motion.gif) <!-- .element: style="height: 500px;" class="fragment" -->

;VS;

## Solution?

![NX](https://raw.githubusercontent.com/nrwl/nx/master/images/nx-dark.svg) <!-- .element: class="fragment" -->

;VS;

###### We now have 2 Nx workspaces. One for the `starter` files and the other containing the `final` codes for the recipes

![80-to-2.gif](assets/images/angular-schematics/80-to-2.gif) <!-- .element: style="height: 500px;" class="fragment" -->

;VS;

![nx-monorepo](assets/images/angular-schematics/nx-monorepo.png) <!-- .element: style="height: 500px;" -->

;VS;

# This came with a challenge!

;VS;

```bash
cd start && npx nx g @nrwl/angular:application chapter01/cc-ng-on-changes
```
The above generates an app with the name 

*`chapter01-cc-ng-on-changes`*
<!-- .element: style="color: yellow;" -->

;VS;

Which means, my book's readers would have to run the following command to serve the app:

*`npm run serve chapter01-cc-ng-on-changes`*
<!-- .element: style="color: yellow;" -->

;VS;

### They would have to write the `chapter name` and `app name`.

#### Even though all apps have unique names
<!-- .element: class="fragment" -->

;VS;

![thinking-maths](assets/memes/thinking-maths.gif) <!-- .element: style="height: 500px;" -->


Notes:
- And now I have to always provide the chapter name along with the recipe name...all the time
- Can we do better?

;VS;

## Can we do better?

;VS;

### What are the possibilities?
 
##### Can we exclude the `chapter name` from the project's name? <!-- .element: class="fragment" -->

#### OR <!-- .element: class="fragment" -->

##### Can we rename the project after it has been created? <!-- .element: class="fragment" -->

;HS;

# @nrwl/nx-plugin

;VS;

I ended up creating an NX plugin to rename the app after it has been created

;VS;

![nx-plugin](assets/images/angular-schematics/nx-plugin.png)

;VS;

![Generator purpose](assets/images/angular-schematics/generator-purpose.png)  <!-- .element: style="height: 500px;" -->

;VS;

<small>@codewithahsan/.../generators/ng-cookbook-recipe/generator.ts</small>

![Generator code](assets/images/angular-schematics/generator.png) 

;VS;
<small>@codewithahsan/.../generators/ng-cookbook-recipe/generator.ts</small>


![Generator code example](assets/images/angular-schematics/generator-exp.png) 

;VS;

![Generator code generated](assets/images/angular-schematics/generator-project-code.png) 

;VS;

![Executor purpose](assets/images/angular-schematics/executor-purpose.png)  <!-- .element: style="height: 500px;" -->

;VS;
<small>@codewithahsan/.../executors/rename/executor.ts</small>


![Generator code example](assets/images/angular-schematics/executor-code.png) <!-- .element: style="position: relative; bottom: 50px;" -->

;VS;
<small>App generation process in a nutshell</small>


![App Generatio Process](assets/images/angular-schematics/app-generation-process.png) 

;VS;

#### The bash script

```bash
# code stripped for conciseness

cd "start" && npx nx g @codewithahsan/ng-cookbook-recipe:ng-cookbook-recipe \
"$APP_NAME" --title="$APP_TITLE" --directory="$CHAPTER" --style scss \
--routing --e2eTestRunner none --skipDefaultProject --addTailwind

npx nx run "$APP_FULL_NAME:rename"
```

What I have to run is:
<!-- .element: class="fragment" -->
```bash
npm run create CHAPTER_NUM APP_NAME "APP_TITLE"
```
<!-- .element: class="fragment" -->

;VS;

## The target project structure

![target project structure](assets/images/angular-schematics/folder-structure.png) 


;VS;

All of this is to be able to do:


```shell
cd start && npx nx serve cc-ng-on-changes
```
<!-- .element: class="fragment" -->

OR... from the project root:
<!-- .element: class="fragment" -->

```shell
npm run serve cc-ng-on-changes # uses a bash script
```
<!-- .element: class="fragment" -->

OR... to run both the start and final apps
<!-- .element: class="fragment" -->

```shell
npm run serve cc-ng-on-changes both # uses a bash script
```
<!-- .element: class="fragment" -->

;HS;

# Another Problem! ⚠️

;VS;

## Inconsistent styles and layouts across multiple recipes

;VS;

![App Layout](assets/images/angular-schematics/app-layout.png) 

;VS;

![App Layout](assets/images/angular-schematics/app-layout-2.png) 

;VS;

## Solution? 🤔

;VS;

![nx lib and generator](assets/images/angular-schematics/lib-and-gen.png)  <!-- .element: style="object-fit: contain;" -->

;VS;

![ui-lib](assets/images/angular-schematics/ui-lib.png)  <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![ui-lib-2](assets/images/angular-schematics/ui-lib-2.png)  <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![nx-gen-lib-1](assets/images/angular-schematics/nx-gen-lib-1.png)  <!-- .element: style="height: 500px;" -->

;VS;

npm run create 01 cc-ng-on-changes "Component Communication using ngOnChanges"

;VS;

![Create app](assets/images/angular-schematics/run-create-command.png)  <!-- .element: style="position: relative; bottom: 40px;" -->

;VS;

index.html__template__

![Template Index](assets/images/angular-schematics/template-index.png)  

;VS;

app.component.html__template__

![Template App HTML](assets/images/angular-schematics/template-app-component-html.png) 
<!-- .element: style="height: 600px;" -->
;VS;

app.component.ts__template__

![Template App TS](assets/images/angular-schematics/template-app-component-ts.png) 

;VS;

## But what about styles??

![nx-styles-1](assets/images/angular-schematics/global-styles-1.png)  <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![nx-styles-2](assets/images/angular-schematics/global-styles-2.png)  <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

![generator-add-styles](assets/images/angular-schematics/generator-add-styles.png)  <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;


## But what about Component + TailwindCSS styles?

;VS;

Since I moved my header component to the library, the tailwind styles aren't processed anymore.


![tailwind-styles](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2hiY2M2dmZvczVtZm5lODZhcHRyNXB1YTBnbWFtYzRpNHZiOGIzZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gioXyl9A3eiObmtwKZ/giphy.gif)

;VS;

![tailwind-setup](assets/images/angular-schematics/setup-tailwind.png)

;VS;

![tailwind-setup-2](assets/images/angular-schematics/setup-tailwind-2.png) <!-- .element: style="height: 500px; object-fit: contain;" -->

;VS;

#### Final Output

![Output](assets/images/angular-schematics/cc-ng-on-changes.png)  <!-- .element: style="position: relative;" -->

;HS;

## But then something happened 😲

;VS;

## Angular Changed their Logo 😱

![Angular New Logo](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*UC-tiSyyd6b2JNaA)
<!-- .element: class="fragment" -->

;VS;

And now I was left with 80+ projects having the harcoded Angular logo (from the generator)

![Template App HTML](assets/images/angular-schematics/template-app-component-html.png) 
<!-- .element: style="height: 600px;" class="fragment" -->
;VS;

![Facepalm](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnY1bTVucnh1NHAxaXA2ZzhjYTBpa2YxdGMweXcwYWNzYTM4eGxsdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/27EhcDHnlkw1O/giphy.gif) <!-- .element: style="height: 600px" -->

;VS;

### The target was to go from this:

app.component.html__template__
![Template App HTML](assets/images/angular-schematics/template-app-component-html.png) 
<!-- .element: style="height: 600px;" -->

;VS;

### To this:

app.component.html__template__
![Template App HTML](assets/images/angular-schematics/template-app-component--revised-html.png) 
<!-- .element: style="height: 600px;" -->
;VS;

app.component.ts__template__

![Template App TS](assets/images/angular-schematics/template-app-component-ts.png) 

;VS;

## But it was too late 😔

### I already had created the apps, so I couldn't use the Generators <!-- .element: class="fragment" -->

;VS;

## What did I do then? 

### What's the solution? <!-- .element: class="fragment" -->

;VS;

![Nx Migrations](assets/images/angular-schematics/nx-migrations.png)

;VS;

![Nx Migrations](assets/images/angular-schematics/nx-migrations-2.png)

;VS;

I wrote an NX migration script that would replace the toolbars in all the projects

[Replace Toolbar Migration](https://github.com/PacktPublishing/Angular-Cookbook-2E/blob/86ec4ffe5c3fd5d034a0da32893f021b1d889540/codewithahsan/packages/ng-cookbook-recipe/src/migrations/replace-app-toolbar/replace-app-toolbar.ts)

;VS;

@codewithahsan/packages/ng-cookbook-recipe/migrations.json
![Migrations Json](assets/images/angular-schematics/migrations-json.png)

;VS;

And finally, after running the migrations, I could replace all the headers

[Commit of replacing migrations](https://github.com/PacktPublishing/Angular-Cookbook-2E/commit/48352db45c54783a037aabd8d71c4a61223ddfb7)

;VS;

And [this](https://packtpublishing.github.io/Angular-Cookbook-2E/chapter09/ng-cdk-drag-drop/final/#folders-list) is the final result

;HS;

## Summary

- We moved from having 80+ projects to having 2 projects <!-- .element: class="fragment" -->
- We discussed using NX Generators to scaffold projects  <!-- .element: class="fragment" -->
- We also discussed NX Executors to do some modifications to the generated code.  <!-- .element: class="fragment" -->
- We discussed how to use global styles in multiple scaffolded applications using NX Generators.
<!-- .element: class="fragment" -->
- We discussed how to compile tailwind css styles in a library.
<!-- .element: class="fragment" -->
;HS;

## Thank you!

<div class="introduction">
  <div class="introduction__left">
    <img class="introduction__left__avatar" src="https://avatars.githubusercontent.com/u/9844254?v=4"/>
    <div class="introduction__left__info">
      <p>Muhammad Ahsan Ayaz</p>
      <p>GDE in Angular</p>
      <p>Software Architect at Scania Group</p>
      <p>Founder at VisionWise</p>
    </div>
  </div>
  <div class="introduction__right">
    <img class="introduction__right__ng-book"  src="https://ng-cookbook.com/assets/ng-cookbook-2.png"/>
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