---
title: "週記（十）"
description: "渾渾噩噩的一週"
date: 2025-03-29
---

## 修課

這週書法課繼續寫字。寫字真的很能夠消磨時間。

這週的統計學習課主要教 local polynomial regression。這部分感覺還算重要，有空應該好好研讀😔。下週教 model selection，我已經大致上看了除了 VC dimension 以外的內容了（雖然還沒仔細研讀），要不是在計量課學過一些些，還真的會完全沒有概念，被牽著鼻子走（開學以來大部分的主題對我來說都是陌生的，因此常發生這樣的事）。

## 研究與閱讀

這週同樣看了一些 reduced form 的文章。

### Braakmann, Chevalier and Wilson (2024)

這篇文章發表在 AEJ: Applied，標題是 Expected Returns to Crime and Crime Location。作者研究犯罪的期望報酬對犯罪地點的影響。

Becker (1968) 把犯罪視為一種經濟決策。如果犯罪的預期回報高於其成本，則人就會去犯罪。大部分的實證文獻都研究勞動市場的條件與逮捕或判刑機率對犯罪的影響，但很少有文獻研究犯罪的期望報酬本身對於犯罪的影響。本研究評估犯罪期望報酬的變化不僅改變了犯罪的性質，還改變了犯罪的地點。

南亞裔家庭有儲存黃金、珠寶在家中的文化習俗。這樣的習俗也因為媒體報導，為英國大眾熟知。作者搜集了 2011 年至 2019 年英格蘭和威爾斯每月的鄰里層級的犯罪資料，並利用 2011 年人口普查資料，將南亞裔人口密度較高的鄰里劃分為實驗組。接著將這些資料與英國的每月黃金價格相結合，並估計以下模型：
$$
y_{ict} = \beta_0 + \beta_1 \mathit{SA}_{ic} + \beta_2 \mathit{GP}_t + \tau \big( \mathit{SA}_{ic} \times \mathit{GP}_t \big) + \alpha_c + \theta_t + \gamma \mathit{TREND}_{it} + \varepsilon_{ict},
$$
其中 $y_{ict}$ 是鄰里 $i$ 在區域 $c$ 時間 $t$ 的犯罪率，$\mathit{SA}_{ic}$ 是鄰里 $i$ 是否屬於南亞裔人口密度較高的區域，$\mathit{GP}_t$ 是時間 $t$ 的黃金價格，$\mathit{TREND}_{it}$ 是鄰里的時間趨勢，$\alpha_c$ 是區域固定效果，$\theta_t$ 是月固定效果，$\varepsilon_{ict}$ 是誤差項。作者並把黃金價格與犯罪數都做了 inverse hyperbolic sine 轉換，以便詮釋成彈性。

研究結果發現，南亞裔鄰里的竊盜犯罪對黃金價格變動的敏感度是其他同一區域鄰里的兩倍。黃金價格上漲使得南亞裔鄰里的竊盜犯罪相對於其他鄰里會顯著增加。

大家都會說自己在做 DiD，不過他們做的事經常偏離經典的 DiD 設計。我的疑問包括：

1. 黃金的價格是連續變數。這時候的 fixed effects 迴歸真的能給出有因果詮釋的係數嗎？

2. 有 47% 的觀察值的竊盜案發生數是 0，因此作者用了 inverse hyperbolic sine 轉換。這樣的轉換是否合理？他引用了 Bellemare and Wichman (2019) 在 Oxford Bulletin of Economics and Statistics 的文章。另外，Chen and Roth (2023) 的 QJE 也討論這個問題。

3. 續 2，在穩健性檢驗中，作者也用絕對值的竊盜案發生數，並且改用 fixed effects Poisson regression。這樣的做法是否合理？我懷疑並不合理，原因有二。

   - 首先，Poisson regression 要求條件平均值等於條件變異數，但是大部分的觀察值都是 0，所以這個假設很可能不成立。

   - 其次，這其實有 zero-inflated 的問題，但是作者並沒有考慮到。在因果推論上，這邊比較深一點的問題大概跟 extensive margin 和 intensive margin 可以扯上關係，但我還想不太清楚。

有空的話我應該去看看 Bellemare and Wichman (2019) 和 Chen and Roth (2023) 的文章。

### Cunha (2014)

因為跟 KM 的研究正需要看文獻有什麼發現，所以看了這篇文章。這篇文章發表在 AEJ: Applied，標題是 Testing Paternalism: Cash versus In-Kind Transfers。作者研究政府以實物（in-kind transfer）而非現金形式提供福利的合理性。

家父長式的（paternalistic）政府會選擇以實物形式提供福利，因為他們認為這樣可以確保福利用於<span class="emphasis" id="emphasizedText">正確</span>的地方。為什麼不發放等值的現金呢？一個家父長式的政府會認為，如果福利以現金形式發放，接受者可能會把這筆錢用在<span class="emphasis" id="emphasizedText">不當</span>的地方。注意到如果政府提供的實物移轉的量少於接受者在沒有該移轉但擁有等值現金時會消費的量時，接受者即使收到等值的現金，也會至少消費這麼多的該項物品。在這種情況下，對於接受者而言，實物移轉就相當於現金，因為他們可以減少購買該項物品的支出，並將這筆錢用在其他地方。因此，這種類型的實物移轉對消費行為的影響與等值的現金移轉沒有差別。只有在實物移轉的量超過接受者在沒有該移轉但擁有等值現金時會消費的量時，實物移轉才會對消費行為產生影響，也就是扭曲消費行為。具體而言，假設政府每月發給一個家庭價值 100 元的白米飯，而這家庭本來每月會花 200 元買白米飯。這樣的話，這個家庭每月可以省下 100 元買米的錢，並且可以把這筆錢用在其他地方，而實物移轉與等值的現金移轉的效果就是相同的。

2004 年，墨西哥的糧食援助計畫實驗（PAL）隨機將 208 個農村分為四組：實物移轉組（一組附加教育課程，一組沒有）、等值現金移轉組和無移轉的控制組。因為教育課程的提供和參與情況混亂，作者將這兩個實物轉移組別合併進行分析。被分到實物移轉組的家庭每個月可以得到十種常見食品的移轉，例如玉米粉、豆類、米、油和奶粉，市價約為 205 墨西哥披索。而被分到等值現金移轉組的家庭每個月可以得到 150 披索的現金，這是實物移轉的批發價格。

研究發現，就整體食物消費而言，實物移轉與等值現金移轉的效果差不多，也就是說，家庭在收到等值的現金後，也會消費類似總量的食物。當然個別食品的消費可能有所不同，像是豆類和食用油（常買的食品），實物移轉不太造成扭曲，而像是奶粉和扁豆（不常買的食品），實物移轉會使得家庭消費更多。另外還有許多比較細節的結果，不過整體而言，雖然實物移轉確實改變消費行為、改善營養狀況，但是效果與等值的現金移轉差不多。作者並發現，領取現金移轉的貧困農村家庭不太會將大部分現金用於不良嗜好（如酒精、菸草和垃圾食品）。相反地，他們將大部分現金用於營養食品（如水果和蔬菜）、藥品和衛生用品。同時，把實物挪動到當地倉庫的配送成本大約佔實物批發價值的 20%。總之，至少在 PAL 計畫的情境中，似乎沒有什麼理由支持政府以家父長式的方式提供福利。

### Lundborg, Rooth, and Alex-Petersen (2022)

這篇文章發表在 RES，標題是 The Long-Term Effects of Childhood Nutrition: Evidence from a School Lunch Reform。作者評估 1959 年至 1969 年間在瑞典小學推行的免費營養午餐政策的長期效果。

瑞典政府在小學引入免費營養午餐政策，為改善兒童營養攝入，並減輕家庭（尤其是母親）準備學童午餐的負擔，期望能提高女性勞動參與率並改善家庭經濟狀況。作者首先考察歷史資料，確定各地區何時引入免費營養午餐政策，再串聯多個行政資料與人口普查資料，估計政策對於學童的長期影響。研究結果顯示，這項學校午餐計畫有顯著的長期效益。在整個小學階段都接觸到該計畫的學生，其終身收入平均高出 3%。該計畫對早期接觸者和來自貧困家庭的學生影響更大，表示該計畫有助於縮小成年後的社會經濟不平等。接觸該計畫對教育程度和健康有所改善，而也提高母親的勞動參與率。

計量上的問題我想到一些：

1. 讓我有趣的是，這並非 panel data，因為作者關心的是如終身收入等等的結果。經典的 DiD 要求 treated 和 control units 若無政策實施則有相同的時間趨勢。而這裡要求 treated 和 control group 若無政策實施則有相同的世代趨勢。但是，一個人只會屬於一個世代，這樣如何在個體層面定義 identification assumption？

2. 在建構樣本時，作者納入 1942 至 1965 年間出生在那 265 個在 1959 年後才實施免費營養午餐政策的地區的學童。此外，有 739 個地區在 1959 年前就已經實施免費營養午餐政策，因為作者不曉得這些地區的確切實施時間，所以這些地區的學童照理來說不在樣本中。但是，他仍然將這些地區 1959 年及之後開始上學的世代，他們聲稱，「因為知道他們在整個小學期間都接觸到了該政策，而這些學生對免費營養午餐的接觸沒有變異，納入他們又有助於估計世代效果」。我其實沒看懂「有助於估計世代效果」是什麼意思。如 Goodman-Bacon (2021) 那篇 JoE 所述，放入 always-treated 的樣本很可能會導致 negative weights。

### Braghieri, Levy, and Makarin (2022)

這篇文章發在 AER，標題是 Social Media and Mental Health。作者利用 Facebook 在美國大學校園的逐步推出（staggered adoption）作為自然實驗，研究社交媒體使用對於心理健康的影響。

Facebook 在 2004 年 2 月在哈佛大學上線，但遲至 2006 年 9 月才開放給一般大眾。在此期間，Facebook 逐步在美國大學校園推出。作者利用 Facebook 推出的時間差異與十七波的 NCHA 調查資料。研究發現，Facebook 的推出對學生心理健康有負面影響。接觸的時間越長，負面影響越大。作者認為，Facebook 等社群媒體平台讓使用者更容易與其他人比較。他們發現更可能遭受不利的社會比較的群體，其心理健康受 Facebook 推出的負面影響更大。

計量上感覺沒什麼大問題。不過，在他的穩健性檢驗中，他提到 "to the extent that the trends are linear, we would be able to account for them in a robustness check that includes expansion-group-level linear time trends." 我沒搞懂控制 linear time trends 具體解決的是什麼問題。我在網路上搜尋一番以後，發現原來指的是把時間當成一般的連續變數，而不是 dummies。而這個做法在 Mostly Harmless Econometrics 有提到（而且那頁我有畫記，顯然我應該讀過😅）。書上是這樣說的：

> An alternative check on the DD identification strategy adds state-specific time trends to the list of controls. In other words, we estimate
> $$
> Y_{ist} = \gamma_{0s} + \gamma_{1s} t + \lambda_t + \delta D_{st} + X_{ist}' \beta + \varepsilon_{ist},
> $$
> where $\gamma_{0s}$ is a state-specific intercept, as before, and $\gamma_{1s}$ is a state-specific trend coefficient multiplying the time trend variable, $t$. [...] As a rule, DD estimation with state-specific trends is likely to be more robust and convincing when the pretreatment data establish a clear trend that can be extrapolated into the posttreatment period.

然後接著引用 Besley and Burgess (2004) 利用這個方法來做穩健性檢驗。我在網路上搜尋了一下，發現有人提到 Wolfers (2006) 討論到這個方法。

### Wolfers (2006)

這篇文章發表在 AER，標題是 Did Unilateral Divorce Laws Raise Divorce Rates? A Reconciliation and New Results。作者研究單方離婚法對離婚率的影響。

1970 年代美國引入單方離婚法，允許在未經配偶同意的情況下尋求離婚。這時離婚率顯著上升。各界對此爭論紛紛。Leora Friedberg (1998) 分析離婚的行政資料，為了解決內生性問題，控制州與年的固定效果，與各州的時間趨勢。Friedberg 認為單方離婚法施行可以解釋自 1960 年代後期以來離婚率上升約六分之一的變異。一時之間，這個結論受廣泛接受。然而，Wolfers 認為 Friedberg 的結論有問題。

Wolfers 主張在做 DiD 的分析時，分辨<span class="emphasis" id="emphasizedText">既存的趨勢</span>與<span class="emphasis" id="emphasizedText">政策衝擊的動態效果</span>相當困難。他認為 Friedberg 控制各州的時間趨勢可能不只是消除掉既存的趨勢，還捕捉到政策效果。

控制各州的時間趨勢以後，Friedberg 發現單方離婚法的係數大幅增加，Friedberg 認為這是遺漏變數偏誤。但是，Wolfers 質疑這個解釋。首先，會認為這是遺漏變數偏誤，就意味著 Friedberg 認為法律實施的時間點並非隨機的，各州是否及何時採用單方離婚法與各州的離婚率趨勢有關。進一步說，假如時間趨勢影響實施法律的時間點，那係數上升，也只能是「離婚率趨勢下降的州越可能採用單方離婚法」。但是，Wolfers 觀察到的趨勢卻是那些採用單方離婚法的州，實施前的離婚率趨勢相對於其他州略微增加。

Wolfers 認為離婚制度的變化可能有很不同的短期和長期效果。改革後，可能因為積壓的需求，離婚率可能會快速上升，經過複雜的動態變化，然後才逐漸趨於穩定。^[Wolfers 這整段都是以文字描述，詳細我還得再想想。] 為了捕捉動態效果，Wolfers 估計以下的迴歸模型：
$$
\begin{aligned}
\mathit{Divorce\;Rate}_{st}
&= \sum_{k \geq 1} \beta_k \mathit{Unilateral\;divorce\;has\;been\;adopted}_{s,t} \\
&\quad + \sum_{s} \mathit{State\;FE}_s + \sum_{t} \mathit{Time\;FE}_t \\
&\quad + \sum_{s} \mathit{State}_s \times Time_t +
\sum_{s} \mathit{State}_s \times Time_t^2 + \varepsilon_{st}.
\end{aligned}
$$
但所以加入各州的線性和二次時間趨勢，到底是為了什麼？這樣的做法是否合理？我找了一陣子發現 Borusyak, Jaravel, and Spiess (2024) 的 RES 文章，Revisiting Event-Study Designs: Robust and Efficient Estimation，其中有一些理論的結果。因此這問題感覺沒有那麼值得現在深入研究。

## 其他

這週作息非常混亂。我很常弄到很晚才睡，因此白天精神不好。如此變成惡性循環。我對此有一些分析，但很懶得寫在這裡😔。

