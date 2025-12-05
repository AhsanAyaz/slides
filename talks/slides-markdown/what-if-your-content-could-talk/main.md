## The content we consume and create has changed over time

;VS;

<!-- .slide: data-transition="fade" -->

![history-1](assets/images/what-if-your-content-could-talk/history-1.png)

<!-- .element: style="height: 600px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![history-1](assets/images/what-if-your-content-could-talk/history-2.png)

<!-- .element: style="height: 600px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![history-1](assets/images/what-if-your-content-could-talk/history-3.png)

<!-- .element: style="height: 600px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![history-1](assets/images/what-if-your-content-could-talk/history-4.png)

<!-- .element: style="height: 600px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![history-1](assets/images/what-if-your-content-could-talk/history-5.png)

<!-- .element: style="height: 600px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![history-1](assets/images/what-if-your-content-could-talk/history-6.png)

<!-- .element: style="height: 600px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![history-1](assets/images/what-if-your-content-could-talk/history-7.png)

<!-- .element: style="height: 600px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![history-1](assets/images/what-if-your-content-could-talk/history-8.png)

<!-- .element: style="height: 600px;" -->

;HS;

## Generative AI & LLMs 101

;VS;

## What is a Large Language Model (LLM)?

;VS;

![llm-101](assets/images/what-if-your-content-could-talk/llm-101.png)

Notes:

- The basic premise of a language model is its ability to predict the next word or sub-word (called tokens) based on the text it has observed so far.
- Another great way to look at it is that essentially is a lossy compression of the internet.

;VS;

Generative AI is built by using supervised learning (A -> B) to repeatedly predict the next word

![llm-101-second](assets/images/what-if-your-content-could-talk/llm-101-second.png)

;VS;

## Every query to the LLM uses tokens

;VS;

![llm-tokens](assets/images/what-if-your-content-could-talk/llm-tokens.png)

;VS;

<!-- .slide: data-transition="fade" -->

![tokens-ss-1](assets/images/what-if-your-content-could-talk/tokens-ss-1.png)

;VS;

<!-- .slide: data-transition="fade" -->

![tokens-ss-2](assets/images/what-if-your-content-could-talk/tokens-ss-2.png)

;VS;

<!-- .slide: data-transition="fade" -->

![tokens-ss-3](assets/images/what-if-your-content-could-talk/tokens-ss-3.png)

;VS;

<!-- .slide: data-transition="fade" -->

![tokens-ss-4](assets/images/what-if-your-content-could-talk/tokens-ss-4.png)

;HS;

## Improving an LLM's accuracy

;VS;

Three techniques used world-wide

- Prompt engineering
- Fine-tuning models
- RAG (Retrieval Augmented Generation)

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-venn](assets/images/what-if-your-content-could-talk/llm-techniques-venn-01.png)

<!-- .element: style="scale: 1.2; position: relative; top: 10px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-venn](assets/images/what-if-your-content-could-talk/llm-techniques-venn-02.png)

<!-- .element: style="scale: 1.2; position: relative; top: 10px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-venn](assets/images/what-if-your-content-could-talk/llm-techniques-venn-03.png)

<!-- .element: style="scale: 1.2; position: relative; top: 10px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-venn](assets/images/what-if-your-content-could-talk/llm-techniques-venn-04.png)

<!-- .element: style="scale: 1.2; position: relative; top: 10px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-venn](assets/images/what-if-your-content-could-talk/llm-techniques-venn-05.png)

<!-- .element: style="scale: 1.2; position: relative; top: 10px;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-comparison](assets/images/what-if-your-content-could-talk/llm-tech-comparison-01.png)

<!-- .element: style="scale: 1.4; position: relative;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-comparison](assets/images/what-if-your-content-could-talk/llm-tech-comparison-02.png)

<!-- .element: style="scale: 1.4; position: relative;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-comparison](assets/images/what-if-your-content-could-talk/llm-tech-comparison-03.png)

<!-- .element: style="scale: 1.4; position: relative;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-comparison](assets/images/what-if-your-content-could-talk/llm-tech-comparison-04.png)

<!-- .element: style="scale: 1.4; position: relative;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-comparison](assets/images/what-if-your-content-could-talk/llm-tech-comparison-05.png)

<!-- .element: style="scale: 1.4; position: relative;" -->

;VS;

<!-- .slide: data-transition="fade" -->

![llm-techniques-comparison](assets/images/what-if-your-content-could-talk/llm-tech-comparison-06.png)

<!-- .element: style="scale: 1.4; position: relative;" -->

;HS;

## When to choose RAG for your application?

;VS;

### Rag vs Prompt Engineering (trained model) 📆

- Knowledge is out of date <!-- .element: class="fragment" -->
- LLM can not get your private knowledge <!-- .element: class="fragment" -->
- Hallucinations <!-- .element: class="fragment" -->
- Transparency and Interpretability <!-- .element: class="fragment" -->

;VS;

### Rag vs Fine-Tuning 💸

- Budget of fine-tuning is expensive <!-- .element: class="fragment" -->
- Time and resources <!-- .element: class="fragment" -->
- Data Sources persistence <!-- .element: class="fragment" -->
- Complexity <!-- .element: class="fragment" -->

;VS;

## How does RAG work?

;VS;

![rag-step-1](assets/images/what-if-your-content-could-talk/rag-step-1.png)

;VS;

![rag-step-2](assets/images/what-if-your-content-could-talk/rag-step-2.png) <!-- .element: style="scale: 1.3;" -->

;HS;

## How to rapidly prototype with RAG?

- [Gemini 2.5 Pro](https://aistudio.google.com/) for LLM
<!-- .element: class="fragment" -->

- [LLamaIndex](https://www.llamaindex.ai/) for RAG
<!-- .element: class="fragment" -->

- LLamaIndex's `VectorStore` for persisting a Vector Database
<!-- .element: class="fragment" -->

;VS;

![indexing](assets/images/what-if-your-content-could-talk/indexing.png)

<!-- .element: style="height: 600px;" -->

;VS;

![vector-similarity](assets/images/what-if-your-content-could-talk/vector-similarity.png)

<!-- .element: style="height: 600px;" -->

;VS;

## [Basic RAG Demo](https://colab.research.google.com/drive/18SypkCl_OdAFc7RkUItw-d91vl8a3SxS)

### [GitHub Repo](https://github.com/AhsanAyaz/gemini-rag-llamaindex-example)

;HS;

## Prompt Engineering

;VS;

### Zero-Shot prompting

The prompt below is an attempt to complete a sentiment analysis task using a zero-shot prompt.

```plaintext
Text: i'll bet the video game is a lot more fun than the film.
Sentiment:
```

;VS;

### Few-Shots prompting

The prompt below is an attempt to complete a sentiment analysis task using a few-shot prompt.

```plaintext
Text: (lawrence bounces) all over the stage, dancing, running, sweating,
mopping his face and generally displaying the wacky talent
that brought him fame in the first place.
Sentiment: positive
Text: despite all evidence to the contrary, this clunker has somehow managed
to pose as an actual feature movie, the kind that charges full admission
and gets hyped on tv and purports to amuse small children and ostensible adults.
Sentiment: negative
Text: for the first time in years, de niro digs deep emotionally,
perhaps because he's been stirred by the powerful work of his co-stars.
Sentiment: positive
Text: i'll bet the video game is a lot more fun than the film.
Sentiment:
```

;VS;

### Instruction Prompting

Few shot prompting can be expensive due to a larger context, we can try giving the instruction directly.

```plaintext
Please label the sentiment towards the movie of the given movie review. The sentiment label should be "positive" or "negative".
Text: i'll bet the video game is a lot more fun than the film.
Sentiment:
```

;VS;

## [Advanced RAG Demo](https://ng-cookbook.com)

### [ng-cookbook.com](https://ng-cookbook.com)

;HS;

### Summary

- Transform static content into interactive conversations. <!-- .element: class="fragment" -->
- AI can engage, respond, and drive value. <!-- .element: class="fragment" -->
- Conversational content is a competitive advantage <!-- .element: class="fragment" -->.

;VS;

<!-- <div style="display: flex; gap: 16px;"> -->
  <!-- <div>
    <h2>Angular Cookbook Giveaway Form</h2>
    <img src="assets/images/what-if-your-content-could-talk/karachi-giveaway.png" style="height: 400px">
  </div> -->
  <div>
    <h2>Angular Crash Course</h2>
    <img src="assets/images/what-if-your-content-could-talk/angular-course-qr.png" style="height: 400px">
  </div>
<!-- </div> -->

;HS;

## Let’s Talk

;HS;

<!-- .slide: id="fbf31d5900e3" -->

## Thank you!

<div class="introduction">
  <div class="introduction__left">
    <img class="introduction__left__avatar" src="https://avatars.githubusercontent.com/u/9844254?v=4"/>
    <div class="introduction__left__info">
      <p>Muhammad Ahsan Ayaz</p>
      <p>GDE in AI & Angular</p>
      <p>Software Architect at Scania Group</p>
      <!-- <p>Co-Founder at VisionWise & IOMechs</p> -->
    </div>
  </div>
  <div class="introduction__right">
    <img class="introduction__right__ng-book"  src="assets/images/books.png"/>
    <a href="https://codewithahsan.dev/books">https://codewithahsan.dev/books</a>
  </div>
  <img src="assets/images/what-if-your-content-could-talk/qr-code.png" style="    width: 150px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: auto;
    margin: 0;
}" >
</div>

<div class="footer">
  <div>
    &nbsp;
  </div>
</div>
