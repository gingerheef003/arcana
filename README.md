## Arcana Hackathon

This is the code developed as part of Arcana Hackathon 2024

### *Team Members*      : 

- Ibrahim Kaif

- Govind GS

- Alby Jenson

---

To run the code install the dependencies and run both frontend and backend parallelly

---

Link to notion: https://boom-windflower-ea8.notion.site/e568c29f051b4a2da4795f89e1dde8f4?v=be17bbd2e23644118d8e28d12f9b0c61

 *IMPORTANT!!!!*
 We have attatched a notion file, that contains the work done by each member, and the work that was in progress but never came to be. 
 The files in this github repo consists of the jupyter notebook files that I used to do the analytics work of the project. You can see the outputs in it. 
 For now the data is static, although we planned to generalize it but went through some errors. 
 In the website, you have three navigations, the analysis, portfolio and news tab. 
 In the analysis tab, for each company you can view the price chart, as well as moving averages and other statistical graphs.
 Also I have done sentiment analysis using finBERT, that classifies each of the sentences from a given transcript to categories. This helps the investor to glance through the important parts of the transcript.
 
Modern Portfolio Theory, or MPT (also known as mean-variance analysis), is a mathematical framework for constructing a portfolio of assets to maximize expected return for a given level of market risk (Standard Deviation of Portfolio Returns). Since risk is associated with variability in profit, we can quantify it using measures of dispersion such as variance and standard deviation.
We used MPT to model optimal portfolio, based on the given 8 companies. This is done by calculating the covariance between each companies, as the rule of MPT is to have as diverse as possible, we need stocks to have the lower covariance for better returns.
