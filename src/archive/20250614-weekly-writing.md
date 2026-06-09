---
title: 週記（二十一）
description: 渾渾噩噩的一週
date: 2025-06-14
---

## 研究與閱讀

### Lin (2013)

這篇文章名為 Agnostic Notes on Regression Adjustments to Experimental Data: Reexamining Freedman's Critique，發表在 Annals of Applied Statistics。

這篇文章主要是針對 Freedman (2008) 的批評進行回應。假設我們有一個 completely randomized trial (CRT)，並且有一些 pretreatment covariates。有些人認為利用線性迴歸分析 CRT 的資料時，應該要將 pretreatment covariates 加入迴歸模型中，以提高估計的效率。然而，Freedman (2008) 認為這樣做會降低漸進的準確性，讓傳統的 covariance matrix 的估計壞掉，並且會導致小樣本偏誤。

Lin (2013) 針對這個問題進行了詳細的討論，並且提出了一些建議。他認為，雖然 Freedman 的批評是有道理的，但實際上如果我們在 CRT 中使用線性迴歸分析，加入 pretreatment covariates 與 treatment 的所有交乘項，在大樣本之下估計的準確性可以提升，信賴區間可以用 sandwich estimator 來構造，而雖然會有小樣本偏誤，但偏誤的收斂速度是 $1/n$（很快！）。

這篇的方法可以利用 R 的 `estimatr::lm_lin()` 來實現。

### Kline (2011)

這是一篇正文僅有 5 頁的文章，名為 Oaxaca-Blinder as a Reweighting Estimator，發表在 AER。

勞動經濟學的應用研究中，有一種古老的技巧，稱為 Oaxaca-Blinder decomposition，在 1973 年分別由 Oaxaca 與 Blinder 兩人同時發明。^[雖然據說，芝加哥大學的社會系教授 Evelyn Kitagawa 早在 1956 年就已經提出類似的方法。]

假如我們現在想要研究兩組人（如不同種族、性別等等）的工資差距。我們可能從總體的統計資料發現，兩組人工資有別。問題是這不一定代表勞動市場存在歧視，有可能其實是因為這兩組人的生產力有別。例如，假設其中一組人的教育水平更高，那工資差距或許反映的是這兩組人教育水平的差距。

令兩組人分別為 $A$ 與 $B$，而 $Y$ 為工資，$X$ 為生產力（如教育水平、工作經驗等等）。令 $Y^A$ 為 $A$ 組人的工資向量，$X^A$ 為 $A$ 組人的生產力，$Y^B$ 與 $X^B$ 同理。我們可以把兩組人的工資分別分解為
$$
\begin{align*}
Y^A &= X^A \beta^A + \varepsilon^A, \\
Y^B &= X^B \beta^B + \varepsilon^B.
\end{align*}
$$
其中，$\beta^A$ 與 $\beta^B$ 分別為 $A$ 與 $B$ 組人的工資對於生產力的線性投影係數。假設 $i$ 這個人來自 $A$ 組。請問，如果他變成 $B$ 組的人，但有相同的生產力，根據以上模型，我們猜測他的期望工資會是多少？Oaxaca-Blinder 的答案是 $X_i \beta^B$。細心的讀者可能會發現，Oaxaca-Blinder 的答案本身是一個反事實的預測：如果改變 $i$ 的組別，但保持生產力不變，那麼他的工資會是什麼？^[不過很多人相信，因果推論的必要條件是可操縱性（manipulability），而性別、種族等組別是不可操縱的，所以這並不是合法的因果推論。這是另一個很深的問題了。]

Kline (2011) 的文章指出，在因果推論的應用中，Oaxaca-Blinder 其實可以被視為一種 reweighting estimator。

令 $D_i \in \{0, 1\}$ 表示 $i$ 人是否接受處理，而 $Y_i^1$ 與 $Y_i^0$ 分別為 $i$ 人接受處理與未接受處理時的結果，並假設 $Y_i = D_i Y_i^1 + (1 - D_i) Y_i^0$。Oaxaca-Blinder 的方法其實就是假設對於 $d \in \{0, 1\}$，
$$
\begin{align*}
Y_i^d &= X_i' \beta^d + \varepsilon_i^d, \\
\operatorname{E}[\varepsilon_i^d \mid D_i, X_i] &= 0.
\end{align*}
$$
換言之，兩 potential outcomes 的模型都是線性的，而且除了 $D_i$ 與 $X_i$ 之外，沒有其他的干擾因子。假設我們的目標是估計 ATT，那我們就需要識別
$$
\mu_{0}^{1} \equiv \operatorname{E}\left[Y_i^0\mid D_i=1\right],
$$
也就是處理組如果沒有接受處理的話，他們的期望結果。

給定 unconfoundedness 與 common support 的假設，Kline 首先提供了經典的 Hàjek 式的 weighting estimatand：
$$
\mu_{0}^{1} = \operatorname{E} \left[\frac{e(X_i)}{\pi} \frac{1 - D_i}{1 - e(X_i)} Y_i\right] = \operatorname{E}[w(X_i) Y_i\mid D_i = 0],
$$
其中，$e(X_i) \equiv P(D_i = 1 \mid X_i)$ 為傾向分數，$\pi \equiv P(D_i = 1)$ 為處理組的比例，而 $w(X_i) \equiv \frac{1 - \pi}{\pi} \frac{e(X_i)}{1 - e(X_i)}$ 為權重函數。

接著，他又證明 O-B 也可以寫成一個極為相似的 reweighting estimand，而其權重 $\tilde{w}(X_i)$ 即 $w(X_i)$ 對 $X_i$ 的線性投影。
$$
\begin{align*}
\delta^{\text{OB}} &= \operatorname{E}[\tilde{w}(X_i) Y_i \mid D_i = 0], \\
\tilde{w}(X_i) &= X_i' \operatorname{E} \left[X_iX_i'\mid D_i=0 \right]^{-1} \operatorname{E} \left[X_i \frac{1 - \pi}{\pi} \frac{e(X_i)}{1 - e(X_i)} \;\middle|\; D_i = 0 \right].
\end{align*}
$$


這個小發現蠻有趣的。首先，當然，我們知道當 potential outcomes 模型真是線性的時候，Oaxaca-Blinder 的方法就可以讓我們識別 $\mu_0^1$。但如果 potential outcomes 模型不是線性的呢？這結果告訴我們，如果 $w(X_i)$ 是線性的，那麼 $\tilde{w}(X_i)$ 就相當於 $w(X_i)$，而這樣的話，Oaxaca-Blinder 的方法也就可以識別 $\mu_0^1$。同樣地，細心的讀者可能會發現，這就是 double robustness 的概念：只要我們的 potential outcomes 模型是線性的，或者我們的 treatment odds 是線性的，那麼 Oaxaca-Blinder 的方法就可以識別 $\mu_0^1$。

## 其他

沒想到最佳辯士的事情還有後續：甄選會竟然在記者會上說這件事。真難以想像政府機關需要把這件事公諸於眾。另外，有趣的是，中一中的學霸高同學科展疑似涉及抄襲的事件，卻在 threads 上蠻順風。

---

雖然書法課結束了，但偶爾還是會撥空練習。希望能夠繼續保持這個習慣。

---

不知道要寫什麼，來分享一下利用 LLM + Obsidian 準備 GRE 的流程好了（雖然還在三天捕魚兩天曬網的狀態）。

我七月初要考試，這幾天才開始準備。大概五月時我背了 Magoosh 的單字（雖然應該忘記大半了😅）。但再來就不知道要背什麼了。首先，我以前買的一本 GRE 單字書弄丟了，我也不想再買一本新的。並且如果現在要背任何一本書的單字，可能都有點太趕了。所以決定破罐破摔，就開始寫考滿分的題目，然後紀錄不會的單字。

但要怎麼有效地記錄呢？我不是很喜歡手抄筆記（常常會太斟酌自己的字跡，以致非常沒有效率），故打從一開始就打算用電腦來記錄。除了紀錄單字，也要方便複習、查詢、分類等等。這時候考慮過幾種選項：

- Anki 作為單字卡是不錯的選擇。它有很好的間隔重複（spaced repetition）功能，並且可以很方便地分類單字。但是 iOS 版的 Anki 需要付費，我不太想要花錢，也不想打開瀏覽器來使用 Anki Web。

- Quizlet 也同樣是有間隔重複功能的單字卡軟體。但它似乎並不是那麼靈活，而且不知道是不是我不會用，我不知道如何非常有效率地建立內容豐富的單字卡。

- Notion 是一個靈活的筆記軟體，優點是我方便我整理同義字、反義字、例句等等。缺點是它沒有間隔重複功能。

- Obsidian 是一個基於 Markdown 的筆記軟體，優點是免費，而且我可以很方便地使用 Markdown 語法來編輯筆記，這是單字卡軟體做不到的；並可以利用 Obsidian 的外掛程式 [Spaced Repetition](https://www.stephenmwangi.com/obsidian-spaced-repetition/) 來實現間隔重複功能，而這是 Notion 做不到的。

從 Obsidian 的社群外掛程式（community plugins）中，可以安裝 Spaced Repetition 外掛程式，我的工作流程大概是這樣：

1. 在考滿分上做題目，並把不會的單字記錄下來。

2. 把不會的單字丟給 LLM，讓他按照我規定的格式生成單字卡，以下是一個範例。在 Spaced Repetition 插件的預設格式中，單字卡以 `#flashcards` 開頭。這是個多行的單字卡。正面是單字，背面我會要求 LLM 生成單字的詞性、定義、例句、中文翻譯、詞源等等，而正面與背面之間用 `?` 分隔。

    ```markdown
    #flashcards amalgam
    ?
    n. 混合物、合金
    🔠 The new style was an amalgam of traditional and contemporary designs.
    🀄️ 新風格是傳統和當代設計的混合物。
    📚 來自阿拉伯語，原指水銀合金，記憶：多種金屬混合在一起
    同義詞：mixture, blend, combination, fusion
    ```

3. 點擊左側邊欄的按鈕複習卡片！

想要在手機上複習的話，可以使用 Obsidian 的 iOS App，配合適當的同步方式（像我是用 iCloud）就可以了。
