# What in the actual schematics we talking about today?

;VS;

## We're going to talk about how it saved me tens of hours working on my next book

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

Using 2 Nx workspaces. One for the starter files and the other containing the final codes for the recipes

;VS;

![nx-monorepo](assets/images/angular-schematics/nx-monorepo.png) <!-- .element: style="height: 500px;" -->

;VS;

# This came with a challenge!

;VS;

```bash
cd start && npx nx g @nrwl/angular:application chapter01/cc-ng-on-changes
```
The above generates an app with the name *`chapter01-cc-ng-on-changes`*

;VS;

![thinking-maths](assets/memes/thinking-maths.gif) <!-- .element: style="height: 500px;" -->


Notes:
- And now I have to always provide the chapter name along with the recipe name...all the time
- Can we do better?

;VS;

## Can we do better?

;VS;

## Can we not include the chapter name when creating the app?

### OR <!-- .element: class="fragment" -->

### Can we rename the app after it has been created? <!-- .element: class="fragment" -->

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

![Generator purpose 2](assets/images/angular-schematics/generator-purpose-2.png)  <!-- .element: style="height: 500px;" -->

;VS;

npm run create 01 cc-ng-on-changes "Component Communication using ngOnChanges"

;VS;

![Create app](assets/images/angular-schematics/run-create-command.png)  <!-- .element: style="position: relative; bottom: 40px;" -->

;VS;

index.html__template__

![Template Index](assets/images/angular-schematics/template-index.png)  

;VS;

styles.scss__template__

![Template CSS](assets/images/angular-schematics/template-css.png) 

;VS;

app.component.html__template__

![Template App HTML](assets/images/angular-schematics/template-app-component-html.png) 

;VS;

app.component.ts__template__

![Template App TS](assets/images/angular-schematics/template-app-component-ts.png) 

;VS;

![Output](assets/images/angular-schematics/cc-ng-on-changes.png)  <!-- .element: style="position: relative; bottom: 40px;" -->

;HS;

## Summary

- We moved from having 80+ projects to having 2 projects <!-- .element: class="fragment" -->
- We discussed using NX Generators to scaffold projects  <!-- .element: class="fragment" -->
- We also discussed NX Executors to do some modifications to the generated code.  <!-- .element: class="fragment" -->
