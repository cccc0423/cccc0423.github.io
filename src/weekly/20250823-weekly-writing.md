---
title: 週記（三十一）
description: 渾渾噩噩的一週
date: 2025-08-23
---

## 雙胞胎迴歸

讀者來函（？）請我介紹如何利用雙胞胎資料和線性迴歸來做一些有趣的分析。
說實話我對這類型的研究設計和統計方法並不熟悉，
所以我沿著他看的文章 [Twin Picks: Disentangling the Determinants
of Risk-Taking in Household Portfolios](https://doi.org/10.1111/jofi.12125)
稍微瞭解了一下他們的做法。

這篇文章刊在 Journal of Finance 上。
作者想問的是，
一個家庭的資產配置會如何隨著其金融財富、
人力資本和生活環境而改變？
為了回答這個問題，
他們利用瑞典全國的雙胞胎登記檔，
串連各種行政資料（包括他們的財富、收入與債務等變數），
來分析財富如何影響風險資產份額。
因為投資者之間存在異質性的風險偏好和許多研究者無法觀測的個人特質，
而這些特質會影響他們的投資決策，
所以如果我們希望估計財富對投資決策的因果效應，
可能會遇到內生性問題。
但是雙胞胎通常有相似的基因、家庭背景和成長環境，
所以利用雙胞胎資料，
作者在迴歸中加入年度的雙胞胎對固定效果，
來控制這些共通的潛在影響投資決策的因素。

這種做法聽起來很合理，
不過不太符合我的品味（？）。
就像我們在計量課教給同學們的那樣（雖然應該沒幾人有學會），
計量經濟學家關心的問題，
與許多統計學家所關心的問題不太一樣，
前者更關心如何識別（identify）和估計（estimate）由結構模型（蘊含了不變的因果關係）所定義的參數。^[
    所謂不變，指的是結構模型作為科學解釋的核心，
    被假設在一定範圍內的假設性干預中保持不變。
    詳情請見 [週記（二十）](20250607-weekly-writing.html)
    摘要的科學哲學文章 [Woodward (2000)](https://philpapers.org/rec/WOOEAI)，
    文中所述的理解深受早期的計量經濟學家 Trygve Haavelmo 的影響。
]
換言之，定義、識別和估計參數是三個不同的任務。
但畢竟我不是一個財務的專家，
我不清楚該怎麼從一個相關的模型定義一個有科學意義的參數，
所以以下我們從一個線性迴歸的分解開始。

首先，考慮以下的線性迴歸：
$$
y_{ijt} = \alpha_{it} + x_{ijt}^\intercal \beta + \varepsilon_{ijt},
$$
其中 $i \in \mathcal{I}$ 代表雙胞胎對，$j \in \{1,2\}$ 代表雙胞胎成員，$t \in \mathcal{T}$ 代表時間點，
而 $y_{ijt}$ 是第 $i$ 對雙胞胎中第 $j$ 個成員在時間點 $t$ 的某個測量值，
$\alpha_{it}$ 是第 $i$ 對雙胞胎在時間點 $t$ 的固定效果，
$x_{ijt}$ 是第 $i$ 對雙胞胎中第 $j$ 個成員在時間點 $t$ 的某些解釋變數，
$\beta$ 是線性迴歸係數，$\varepsilon_{ijt}$ 是殘差項。

注意到這個迴歸運用的是 within-pair 及 within-time 的變異，
如果我們是分別加入雙胞胎對和時間的固定效果，
那才會涉及不同時間點的變異。

根據 Frisch-Waugh-Lovell (FWL) 定理，
我們可以把 $\alpha_{it}$ 從迴歸中拿掉，
也就是我們可以把 $x_{ijt}$ 和 $y_{ijt}$ 都先對 $\alpha_{it}$ 做迴歸，
再把兩迴歸所得的殘差拿來做迴歸，
然後得到與原本迴歸相同的 $\beta$ 估計值，記作 $\hat{\beta}$。

定義
$$
\begin{align*}
\bar{x}_{i \cdot t} \equiv \frac{1}{2} \left( x_{i1t} + x_{i2t} \right), \quad
\bar{y}_{i \cdot t} \equiv \frac{1}{2} \left( y_{i1t} + y_{i2t} \right),
\end{align*}
$$
則我們可以把 $x_{ijt}$ 和 $y_{ijt}$ 對 $\alpha_{it}$ 做迴歸所得的殘差分別寫成
$$
\begin{align*}
\tilde{x}_{ijt} &\equiv x_{ijt} - \bar{x}_{i \cdot t}
    = \frac{1}{2} \left(x_{ijt} - x_{ij't} \right), \quad j' \neq j, \\
\tilde{y}_{ijt} &\equiv y_{ijt} - \bar{y}_{i \cdot t}
    = \frac{1}{2} \left(y_{ijt} - y_{ij't} \right), \quad j' \neq j.
\end{align*}
$$
因為每個雙胞胎對就是兩個人，
所以令 $\Delta x_{it} \equiv x_{i2t} - x_{i1t}$
和 $\Delta y_{it} \equiv y_{i2t} - y_{i1t}$，
我們可以把殘差寫成
$$
\begin{align*}
\tilde{x}_{i1t} &= -\frac{1}{2} \Delta x_{it}, \quad
\tilde{x}_{i2t} = \frac{1}{2} \Delta x_{it}, \\
\tilde{y}_{i1t} &= -\frac{1}{2} \Delta y_{it}, \quad
\tilde{y}_{i2t} = \frac{1}{2} \Delta y_{it}.
\end{align*}
$$
為了簡化運算，
我們先假設 $\beta$ 是一個純量，
而我們知道
$$
\begin{align*}
\hat{\beta}
= \frac{\sum_{i, t} \sum_j \tilde{x}_{ijt} \tilde{y}_{ijt}}{\sum_{i, t} \sum_j
\tilde{x}_{ijt}^2}
= \frac{\sum_{i, t} \frac{1}{2} \Delta x_{it} \Delta y_{it}}{\sum_{i, t}
\frac{1}{2} \Delta x_{it}^2}
= \sum_{i, t} \hat{w}_{it} \frac{\Delta y_{it}}{\Delta x_{it}},
\end{align*}
$$
其中
$$
\hat{w}_{it} \equiv \frac{\Delta x_{it}^2}{\sum_{i', t'} \Delta x_{i't'}^2}.
$$
這表示我們可以把雙胞胎迴歸的係數 $\hat{\beta}$
看成是各個雙胞胎對在各個時間點的斜率
（$\Delta y_{it} / \Delta x_{it}$）的加權平均，
那些有比較大的 $|\Delta x_{it}|$ 的雙胞胎對會貢獻更多權重，
而如果 $\Delta x_{it} = 0$，則該雙胞胎對在該時間點就不會貢獻任何資訊。

注意到 $\hat{w}_{it} \geq 0$ 且 $\sum_{i,t} \hat{w}_{it} = 1$，
所以一個可以因果地解釋 $\hat{\beta}$
的充分條件是斜率 $\Delta y_{it} / \Delta x_{it}$
真的是某個因果參數。
但它的長相看起來就很難是，除非我們考慮 $\Delta x_{it}$ 很小的情況，
我們似乎有可能可以把它解釋成某種導數。

為了定義目標參數，
先來定義潛在結果的符號。
令 $y_{ijt}(x)$ 是第 $i$ 對雙胞胎中第 $j$ 個成員在時間點 $t$ 如果 $x_{ijt} = x$
時的潛在結果，^[
    我有意地如此定義潛在結果，
    我想忽略掉所有動態效果以及雙胞胎之間的外溢效果。
] 而觀察到的變數 $y_{ijt}$ 滿足 $y_{ijt} = y_{ijt}(x_{ijt})$。
令
$$
y_{ijt}(x) = \mu_{ijt}(x) + \varepsilon_{ijt}(x),
$$
其中 $\mu_{ijt}(x) \equiv \mathrm{E}[y_{ijt}(x)]$ 是 $x$ 的函數。
如果我們假設條件可忽略性（conditional ignorability，或者要叫它強外生性），
$$
y_{ijt}(x) \perp\!\!\!\perp x_{ijt} \mid \alpha_{it},
$$
也就是 $x_{ijt}$ 和潛在結果 $y_{ijt}(x)$
在給定雙胞胎對的固定效果 $\alpha_{it}$ 時獨立（這是一個很強的假設！）時，
我們就有
$$
\operatorname{E}[\varepsilon_{ijt}(x) \mid \alpha_{it}, x_{ijt} = x] = 0 \quad
\forall x,
$$
所以
$$
\begin{align*}
&\mathrel{\phantom{=}}\operatorname{E}[\Delta \varepsilon_{it} \mid \alpha_{it}, x_{i1t}, x_{i2t}] \\
&= \operatorname{E}[\varepsilon_{i2t}(x_{i2t}) \mid \alpha_{it}, x_{i1t}, x_{i2t}] -
\operatorname{E}[\varepsilon_{i1t}(x_{i1t}) \mid \alpha_{it}, x_{i1t}, x_{i2t}] \\
&= \operatorname{E}\left[ \operatorname{E}[\varepsilon_{i2t}(x_{i2t}) \mid \alpha_{it}, x_{i2t}] \;\middle|\; \alpha_{it}, x_{i1t}, x_{i2t} \right] -
\operatorname{E}\left[ \operatorname{E}[\varepsilon_{i1t}(x_{i1t}) \mid
\alpha_{it}, x_{i1t}] \;\middle|\; \alpha_{it}, x_{i1t}, x_{i2t} \right] \\
&= 0 - 0 \\
&= 0,
\end{align*}
$$
其中第二個等號利用條件期望值的性質。
這隱含 $\operatorname{E}[\Delta x_{it} \Delta \varepsilon_{it}] = 0$，
而反覆地運用條件期望值的性質，我們可以得到
$$
\begin{align*}
\operatorname{E}\left[ \frac{\Delta y_{it}}{\Delta x_{it}} \right]
= \frac{\mu_{i2t}(x_{i2t}) - \mu_{i1t}(x_{i1t})}{x_{i2t} -
x_{i1t}}.
\end{align*}
$$
所以我們有
$$
\operatorname{plim} \hat{\beta}
= \frac{\operatorname{E}[\Delta y_{it} \Delta x_{it}]}{\operatorname{E}[\Delta
x_{it}^2]}
= \operatorname{E}\left[ \underbrace{\frac{(\Delta
x_{it})^2}{\operatorname{E}[\Delta x_{it}^2]}}_{w_{it}} \frac{\mu_{i2t}(x_{i2t})
- \mu_{i1t}(x_{i1t})}{\Delta x_{it}} \right].
$$
注意到，
截至目前，即便我們已經假設了條件可忽略性，
我們都還很難詮釋 $\beta$。
如果我們假設 $\mu_{i1t}(x) = \mu_{i2t}(x) \equiv \mu_{it}(x)$（這不是很強的假設），
那它也僅僅只是劑量反應函數（dose-response function） $\mu_{it}(x)$ 的一些切線斜率的加權平均，
而權重取決於 $\Delta x_{it}$ 的分配。
如果沒有其他對於 $\mu_{it}(\cdot)$ 函數形式的假設，
我們很難得出更多結論。

比如說，
我猜我們可以考慮利用 local regression 來估計 $\mu_{it}(x)$
的導數的平均值。
如果假設它足夠光滑，
讓它三階導數存在且有界 $M$
（我覺得這不是很強的假設，因為只是假設財富的微小變化不會影響平均投資決策太多），
那做泰勒展開，我們可以得到
$$
\begin{align*}
\mu_{it}(x_{it} + h) &= \mu_{it}(x_{it}) + h \mu_{it}'(x_{it}) + \frac{h^2}{2} \mu_{it}''(x_{it}) + \frac{h^3}{6} \mu_{it}'''(\xi^+), \\
\mu_{it}(x_{it} - h) &= \mu_{it}(x_{it}) - h \mu_{it}'(x_{it}) + \frac{h^2}{2}
\mu_{it}''(x_{it}) - \frac{h^3}{6} \mu_{it}'''(\xi^-),
\end{align*}
$$
其中 $\xi^+ \in (x_{it}, x_{it} + h)$，$\xi^- \in (x_{it} - h, x_{it})$。
令 $h = \Delta x_{it} / 2$，所以
$$
\begin{align*}
\frac{\Delta \mu_{it}}{\Delta x_{it}} &= \mu_{it}'(x_{it})
+ \underbrace{\frac{(\Delta x_{it})^2}{24} (\mu_{it}'''(\xi^+) + \mu_{it}'''(\xi^-))}_{\equiv R_{it}} \\
&= \mu_{it}'(x_{it}) + O((\Delta x_{it})^2).
\end{align*}
$$
如此一來，我們可以把 $\beta$ 寫成
$$
\beta = \operatorname{E}[w_{it} \mu_{it}'(x_{it})] + \operatorname{E}[w_{it} R_{it}].
$$
如果我們假設權重 $w_{it}$ 和 $\mu_{it}'(x_{it})$ 不相關（這是非常強的假設），
那麼
$$
\operatorname{E}[w_{it} \mu_{it}'(x_{it})] = \operatorname{E}[w_{it}]
\operatorname{E}[\mu_{it}'(x_{it})] = \operatorname{E}[\mu_{it}'(x_{it})].
$$
也就是說第一項變成所有雙胞胎對在所有時間點的劑量反應函數的平均斜率。
至於後面那項，因為我們知道 $R_{it} = O((\Delta x_{it})^2)$，
所以如果我們給原本的迴歸做加權，
然後得到以下的估計式
$$
\hat{\beta}_w
= \frac{\sum_{i,t} \Delta x_{it} \Delta y_{it} K_h(\Delta x_{it})}{\sum_{i,t}
\Delta x_{it}^2 K_h(\Delta x_{it})}, 
$$
其中 $K_h(u)$ 是一個帶寬為 $h$ 的 kernel function。
這麼一看就會發現，
在 $nh^3 \to \infty$ 而 $h \to 0$ 的情況下，
$\hat{\beta}_w$ 會收斂到 $\operatorname{E}[\mu_{it}'(x_{it})]$，
也就是所有雙胞胎對在所有時間點的劑量反應函數的平均斜率。

結論就是，
即便我們假設了財富的變異像是外生的，
$\beta$ 還是沒有明顯的因果詮釋，
除非我們給它的劑量反應函數一些很強的假設。

## 未來想要寫的東西


最近幾年網路上流行魯迅說的一句話：「人類的悲歡並不相通」。
這句話有很多不同的解讀，
但字面上的意義很好理解，
就是因為每個人的經歷、性格、價值觀都不同，
而且語言本身就有很多模糊、侷限的地方，
要真正理解、甚至感同身受他人的情感經驗，
非常困難。

卡繆在《鼠疫》中也有類似的感慨。
說話者可能在長時間的思慮和痛苦經驗之後，
試圖表達真誠的感受，
但是聽者往往覺得這樣的痛苦俯仰即是，普遍又俗套。

正因如此，每次我感覺與人心意相通時（無論是真是假，因為我根本無從驗證），
都覺得很驚喜、開心。
無論我是說者或聽者，
能有這種感覺（即便可能只是錯覺）真是一種奇蹟和幸運。
發現過去的自己竟然記錄下能夠呼應我現在心情的文字，
甚至表現出相同的反應時，也帶給我類似的感觸。
而且畢竟我自己知道自己還算蠻真誠的，
討厭為了自己或別人而表演，
所以願意相信這些文字反映了自己當時的真實感受，
因此如果感到與過去的自己心意相通，
那肯定不是錯覺。

寫週記正是想要紀錄當下的心情和想法，
這有助於現在的我梳理思緒，
也可能在未來的某個時刻，
因為感受到那種跨越時間的共鳴，
而感到驚喜和開心。


不過因為我不喜歡為賦新詞強說愁，
所以能事先規劃到寫作計畫的只有比較理性、技術性的主題。
目前已經在計畫中的有：

1. 簡介因果推論的各種概念。
    這個可以寫非常多篇，但應該不會放在週記，而是獨立地放在首頁。

3. 重新分析我大專生計畫（多年前的小小經驗研究）使用的資料，
    並以 design-based 的方式來做統計推論。
    這個應該會用 Quarto 來寫，也比較有可能放在首頁。


