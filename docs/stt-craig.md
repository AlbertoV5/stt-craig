# Introduction and Expectations

In this project we will use `whisper`<sup><a id="fnr.1" class="footref" href="#fn.1" role="doc-backlink">1</a></sup>, then new speech to text A.I. model, for transcribing unscripted dialog from The Late Late Show TV program. We will document and log the entire process for future visit. The outcome will be a SPA for data visualization using Plotly, React, Bootstrap and a Flask back-end with a PostreSQL database.

The data analysis will be performed in Python using a mix of scripts and Jupyter notebooks. The analysis may require addition of other A.I. submodules like `resemblyze`<sup><a id="fnr.2" class="footref" href="#fn.2" role="doc-backlink">2</a></sup> in order to distinguish speakers in a conversation or any other solutions that arise to any given problems.

The process will be iterative over a few collections of videos:

1.  Extract audio from the collection (a TV season or a shorter period of time).
2.  Source separation on music and speech.
3.  Speaker separation to identify at least Craig Ferguson and non-Craig Ferguson speakers.
4.  Audio data cleaning, stats and features.
5.  Processing with `whisper`.
6.  Text data cleaning and loading into a SQL database.
7.  Data Analysis, find answers for word frequency, changes over time, or any other analytics questions.
8.  Documentation and outcome presentation and thoughts for the iteration.

Once the process is done a few times, the whole collection of collections may be processed under the most successful parameters or they may be kept as separate processes. Then a single page web application will be created for presenting the results, which will include the analysed data in a production database.

Once the SPA is completed, it will be uploaded to a PVM or container in AWS or any other cloud provider. Then the page will be shared to the public.

Disclaimer: None of the data or results from the analysis will be used for monetary gains as I do not own the copyright to the original material. It is purely for educational purposes and I will absorb all cloud services expenses without asking for donations for this specific project.

## Footnotes

<sup><a id="fn.1" class="footnum" href="#fnr.1">1</a></sup> <https://github.com/openai/whisper>

<sup><a id="fn.2" class="footnum" href="#fnr.2">2</a></sup> <https://github.com/resemble-ai/Resemblyzer>
