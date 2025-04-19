---
title: 週記（十三）
description: 期中考後
date: 2025-04-19
---

## 修課

這週的書法課是期中檢討。老師逐一地把同學叫到前面，檢查大家的期中考。（話說這課對老師來說還真爽，不需要備課，而且也沒有事先批改考卷）他一看就知道我有在外面寫過字。他認為我寫得不錯，筆法是正確的，只是用墨不夠大方，筆畫的粗細對比不夠明顯。

這週的統計學習課教了 multivariate adaptive regression splines (MARS)、hierarchical mixtures of experts (HME)、boosting 和 additive trees。開始教了一些 SVM。我知道它們背後確實有一些大局觀。比如說，無論 wavelet、MARS、boosting 或者神經網路都是 additive expansions 的方法。不過上課速度真的好快，而且我好忙，真的沒空好好念書😔。

## 研究與閱讀

這週讀了五篇文章。

### Hansen (2025)

這篇發在 Journal of Applied Econometrics，標題是 Standard Errors for Difference-in-Differences Regression。作者研究如何適當地計算 DiD 迴歸中的標準誤。之所以看這篇文章是因為家教課要用。

這篇文章一言以蔽之，就是在說 DiD 迴歸的標準誤應該要用 jackknife 的方法來計算，然後他在另一篇文章裡證明他所提出的 jackknife 標準誤有 never-downward bias 的性質。也就是說，平均而言，這個 jackknife 標準誤不會低估 DiD 迴歸的標準誤。說是 jackknife 標準誤，其實他這就是文獻裡的 CR3 標準誤。我猜大概就是為了跟 Imbens and Kolesar (2016) 那篇 REStat 的文章打對臺吧，總覺得蠻無聊的。這些不同的 clustered standard errors 會有出入，核心原因多半是因為 cluster 數量太少。比如說，如果 cluster 數量只有 2 個，一個是實驗組，一個是控制組，那要算 jackknife 標準誤就會很 tricky，因為我們要是把其中一個 cluster 拿掉，這樣迴歸係數就沒辦法識別了。所以無論是 Imbens and Kolesar (2016) 的 CR2 還是 Hansen (2025) 的 CR3，都在計算 Gram matrix $\mathbf{X}^\intercal \mathbf{X}$ 的 Moore-Penrose pseudo inverse，而不是通常意義的反矩陣。可能我悟性不夠，目前是覺得這還蠻虛假的，這問題就像是如果我們只有一個樣本，我們根本沒辦法同時估計樣本平均值與其標準誤。

### Hussam et al. (2022)

作者研究就業對孟加拉羅興亞難民的心理社會價值。

作者做了一個隨機對照實驗，把 149 個難民營裡頭的區域，各選取 5 個人，並隨機分成就業組（提供文書工作）、現金組（不用工作但領取與就業組相當的報酬）以及對照組（僅提供少量的參與調查的報酬）三組，比較他們的心理社會福祉與其他結果。所謂心理社會福祉，包含憂鬱、壓力、生活滿意度、控制感（locus of control）、社交性、自我價值與穩定感七項指標。為了避免 multiple hypothesis testing 的問題，作者利用 Anderson (2008) 的 inverse-covariance weighted index variable 建構出一個指數，並回報 sharpened false discovery rate。除此之外，作者也比較不同實驗組的身體健康、認知功能、經濟決策、時間使用、消費與性別和權力觀念。

他們估計以下的迴歸：
$$
Y_{ibc}^1 = \beta_0 + \beta_1 \mathit{Cash}_{ibc} + \beta_2 \mathit{Work}_{ibc} + \sigma_g + \gamma_c + \delta_e + Y_{ibc}^0 + X_{ibc} + \varepsilon_{ibc},
$$
其中 $Y_{ibc}^1$ 是個人 $i$ 在分區 $c$ 與營地 $c$ 的結果變數，$\mathit{Cash}_{ibc}$ 與 $\mathit{Work}_{ibc}$ 為實驗組虛擬變數，$\sigma_g$、$\gamma_c$ 與 $\delta_e$ 分別是性別、分區與訪員固定效果，$Y_{ibc}^0$ 是結果變數的 baseline 值，而 $X_{ibc}$ 是利用 double LASSO 選取的控制變數。如果存在非金錢的效果，$\beta_1 \neq \beta_2$。

結果發現，就業顯著提升心理社會福祉。相較於控制組，參與就業組的個體在心理社會指標（包含憂鬱、壓力、生活滿意度、自我價值、社交性、控制感和穩定感）上有顯著的改善。他們也較少感到身體不適，在記憶力和數學測試中表現更好，並且較不規避風險。而就業組在多個結果的改善幅度也比現金組更大，這表示就業除了金錢回報外，還提供了獨特的非金錢心理社會價值。甚至，在八週的實驗結束後，研究人員發現大多數參與者願意無償工作額外一週，作者認為這暗示個體能夠體認到就業的心理社會益處。作者認為就業可能透過提升家庭中的自我價值感來發揮作用，因為就業顯著提升了個體對自己在家庭中價值的看法，就業組在家庭地位排名上的提升比現金組更高。這種非金錢的影響似乎主要由男性驅動，男性在就業時感受到更高的家庭自我價值感，而僅僅獲得現金反而可能降低其家庭地位感。

計量上不理解的是作者使用的 Anderson (JASA, 2008) 的 inverse-covariance weighted index。待（久遠的以後）研究。

### Mello (2024)

這篇發在 RES，標題是 Fines and Financial Wellbeing，作者研究超速罰鍰對於家庭財務狀況的影響。

傳統模型預測流動性受限的家庭會透過儲蓄來應對收入波動，但近年來的調查資料顯示低收入群體的財務狀況仍易受衝擊。作者利用佛羅里達州 2011 至 2015 年的交通罰單資料，串連佛羅里達居民的信用報告，並估計以下的 event study regression，

$$
Y_{i t} = \sum_{\tau} \alpha_{\tau} \mathbf{1}\{ t - \tilde{t}_i = \tau\} + \phi_i + \kappa_t + \varepsilon_{it},
$$
其中 $i$ 代表個人，$t$ 代表季度，$\tilde{t}_i$ 代表個人 $i$ 收到罰單的時間，$\tau = t - \tilde{t}_i$ 代表 event time，$\alpha_{\tau}$ event time $\tau$ 的係數，$\phi_i$ 是個體固定效果，$\kappa_t$ 是時間固定效果，而 $Y_{it}$ 是結果變數，如信用報告上的催收、逾期或其他不良紀錄。

研究發現，交通罰單與未付帳單進入催收的情況增加了約 34 美元，而在交通違規後的三年內，信用評分下降約 2.6 分，借款額度減少約 330 美元。同時，受罰後，個人在能提供較高薪資的大型企業就業的可能性降低了約 1.2 個百分點。總之，意外支出可能會導致部分家庭難以維持其財務穩定，並在長期內損害其信用狀況和就業機會。研究的估計也顯示，至少有 11% 到 38% 的個人可能因為一筆約 315 美元的意外支出而不得不挪用其他財務資源來應對。

計量上的問題主要是發現他研究的其實是 non-absorbing treatment。不過這已經有很多 working paper 在做了。

### Caprettini and Voth (2023)

這篇發在 QJE，標題是 New Deal, New Patriots: How 1930s Government Spending Boosted Patriotism During World War II。作者研究 1930 年代美國羅斯福新政的政府支出如何影響二戰期間的愛國主義。

在縣級（county-level）的分析中，作者使用了三個主要的縣級指標來衡量二戰時期的愛國主義

1. 人均戰爭公債購買額（War bond purchases per capita）
2. 志願軍比例（Volunteering rates）
3. 每千人獲得的軍事獎章數 (Medal recipients per 1,000 people)

作者還利用 PCA 取得這三個變數的第一個主成份。作者使用 Fishback, Kantor and Wallis (2003) 收集的縣級新政支出資料，涵蓋了 1933 年至 1939 年間實施的各項聯邦計畫，並收集農業、公共工程、房屋等等個別計畫的撥款和貸款數據。

然後作者估計了以下的線性模型：
$$
\text{WWII Patriotism}_i = \beta \text{New Deal grants pc}_i + \gamma \text{WWI Patriotism}_i + \delta X+i + \xi_s + u_i,
$$
其中 $X_i$ 為一系列控制變數，包括人口、失業率、退伍軍人比例、非裔美國人比例、軸心國出生人口比例、農場人口比例、1929 年農業收入、城市虛擬變數以及 1898 至 1928 年民主黨的平均得票率等等，而 $\xi_s$ 是州固定效果。結果顯示，新政補助與三種愛國主義指標和 PCA 指標之間都存在顯著且正向的關係。然後作者進一步將新政支出分解為六個主要的計畫類別，包括農業支持、公共援助、公共工程支出、緊急工人數量（WPA 就業）、房主貸款公司（HOLC）的貸款以及復興金融公司（RFC）的貸款。結果顯示農業支持、公共援助和對房主的支援與愛國主義指標呈現正相關。

在個體層次的分析中，作者配對了個人的服役記錄與 1940 年的美國人口普查資料。受僱於 WPA 的美國人志願參軍的可能性高出三分之一。居住在高 HOLC 貸款地區或者高農業補貼地區的房主與農場主同樣更有可能參軍。為了進一步探討新政時期政府對農業的支持與二戰時期愛國主義行為之間的因果關係，作者將 1930 年代的旱災與國會農業委員會成員任期當成工具變數，得到類似的估計結果。

看完之後撇除掉一些我知道已經有人做過的問題，我好奇的是，如何對於一個 PCA 得到的 outcome variable 做因果推論？不過查了一下也發現 Stoetzer et al. (2025) 發在 AJPS 的 Causal inference with latent outcomes 研究類似的問題。但是 YC 還是認為這是不錯的方向。

### Marx, Pons, and Rollet (2024)

這篇發在 RES，標題是 Electoral Turnovers。作者研究全世界的選舉中執政者未能連任（即選舉翻盤）對國家表現的影響。

不過這是一個 close election design，已經有太多人做過了。

## 其他

不知為何即便期中週結束還是好忙。