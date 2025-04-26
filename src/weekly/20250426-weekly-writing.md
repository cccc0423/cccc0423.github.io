---
title: 週記（十四）
description: 忙到好焦慮
date: 2025-04-26
---

## 修課

這週的書法課就是接續練習智永的真書千字文。

這週的統計學習課教了 SVM 的 kernel trick。這東西其實就是把 SVM 和 RKHS 結合起來，把資料投影高維空間，然後在高維空間裡面做 SVM。Kernel trick 的好處都是我們不需要明確地選擇基底函數（這經常也是做不到的），只需要選擇 kernel function 就可以了。然後開始教 functional data analysis，主要似乎會教 functional PCA，就是用在 functional data 上的 PCA。這些 FDA 的方法主要適用於以高頻率採樣的資料（如果很離散的話，看成函數也很奇怪吧），所以主要的應用應該都是在質譜儀或腦造影之類的資料，而感覺在經濟學研究上沒什麼應用。

## 研究與閱讀

這週沒讀什麼東西。不過覺得是時候開始好好學習丁鵬的 A First Course in Causal Inference 了。這本書的內容是從他在 Berkeley 多年的課程的筆記整理出來的。

他切入因果推論的角度類似 Imbens 與 Rubin 的 Causal Inference for Statistics, Social, and Biomedical Sciences: An Introduction 類似（雖然我沒看過），而這也是當然的，因為丁鵬的其中一位博士論文指導教授就是 Rubin，他也受到那本書很大的影響。所謂類似，是指這兩本書都從 Fisher 和 Neyman 早期的思想開始說起。例如丁鵬的書在介紹完 potential outcomes 的基本概念以後，話鋒一轉就開始介紹 completely randomized experiment (CRE) 和 Fisher randomization test (FRT)。

相較之下，我學習比較多的是 Angrist 和 Pischke 的 Mostly Harmless Econometrics: An Empiricist's Companion和 Hernan 和 Robins 的 Causal Inference: What If。這兩本書因為不是統計學家寫的，兩組作者分別是勞動經濟學兼經濟計量學家和流行病學兼生物統計學家，所以他們的切入點和丁鵬的書很不一樣。Angrist 和 Pischke 的書大致上就是介紹各種經濟學的實證研究中常用的自然實驗方法，而統計推論的部分並沒有很深的著墨（就是回到 Newey and McFadden (1994) 的那套大樣本理論）。Hernan 和 Robins 的書則是從流行病學的角度切入，也因此有更多因果圖，更多流行病學領域發展出的方法（例如 marginal structural model 和 g-computation），幾乎完完全全沒有統計推論。

感覺是時候離開傳統經濟計量的那套舒適圈了。事實上這應該也是近年來經濟計量的一個的研究趨勢，調查統計、實驗設計和因果推論其實有非常深刻的連結，而 design-based inference 這個主題也有很多新的發展（但沒有 IID 抽樣以後什麼都好難😔）。

## 其他

週四時有一位一橋大學的學者來訪。他的領域是勞動經濟學和應用計量經濟學。上週心一橫登記了和他單獨聊天的 session 與晚餐。他似乎不是一個很擅長聊天的人，我也是，不過有上次的慘痛經驗，我早有準備了一些罐頭問題。比如說，要修多少數學課。他沒有正面回答他修過哪些數學課，只說他去美國前，在東大讀書時，和同學們有個讀書會讀 baby Rudin 和 Amemiya 的 Advanced Econometrics。然後他說他在寫上一篇 REStat 文章時也有回去複習裡頭的大樣本理論，重點在於我需要做多麽技術性的研究。平淡地度過了 30 分鐘的談話，應該算是安全過關。晚餐吃腹響圓，這間店都是桌菜，因此我還是頭一次吃，感覺很不錯。

現在的家教課比較像是另一份研究助理工作😅。努力正向思考的話是我從中學習了一些技能。現在需要把所有的分析都改為計算 jackknife 標準誤。為了方便，我直接使用 Bruce Hansen 網站提供的 R 程式。但這時候產生一個問題，就是我該如何有效率地輸出迴歸報表。我研究了一下，發現我平常慣用的 R 的 `modelsummary` 套件在生成迴歸報表時就是調用 `broom::tidy()` 和 `broom::glance()`，然後去提取裡頭的數字，所以我只要把 Hansen 寫的函數改成輸出成有 `jregress` 類別的物件，然後編寫可以用在 `jregress` 類別的 `tidy` 和 `glance` 函數，就可以讓 `modelsummary` 知道自己要做什麼，如下。

```
tidy.jregress <- function(x, ...) {
  coefs <- as.numeric(x$coefficients)
  terms <- row.names(x$coefficients)
  ses   <- x$se
  ps    <- x$pvalue
  data.frame(
    term = terms,
    estimate = coefs,
    std.error = ses,
    p.value = ps
  ) |>
    subset(!grepl("^i", term))
}

glance.jregress <- function(x, ...) {
  data.frame(
    r.squared = as.numeric(x$r2),
    nobs = x$n
  )
}
```

不過更困擾的問題在於他們的程式真的寫得不怎麼樣，不能容許分開設置 cluster 的變數和固定效果（within transformation）的變數，如果我想要他們兩者是不一樣的，我就得把一大堆虛擬變數塞進迴歸式裡，這樣導致運算負擔變得很大，而且他似乎沒有適當地利用 jackknife 的性質來加速計算，所以他們的程式運行起來非常慢。現在虛擬變數很多，資料量很大，即便行資電腦有 1TB 記憶體，現在學生想跑的東西也根本跑不動，然後 R session 就會崩潰。