---
title: "週記（八）"
description: "疲憊的一週"
date: 2025-03-15
---

## 家教

這週的疲憊主要是因為家教。家教學生（本系的專班學生）想要在四月底以前提出論文口試的申請，這意味我們這個月就要把大部分的工作搞定。我覺得他有點太樂觀了。原先資料分析的結果其實沒有預期的那麽好，還有很多東西需要調整。比如說我們跑了一些迴歸模型，發現 clustered standard errors 超級小，他的老師和他都覺得很棒、很有說服力，但我仔細想想才發現其中有詐。

在當時的分析中，橫斷面的樣本只有 $2$ 個，而我們計算 clustered standard errors 時容許同一個樣本在不同時點的觀測值之間有任意的自相關。我們的迴歸模型的係數至少有 $4$ 個。這樣做會有很嚴重的問題。通常 clustered standard errors 的估計式形如
$$
\widehat{\operatorname{Var}}(\hat{\beta})
\propto \left(\mathbf{X}^\intercal \mathbf{X}\right)^{-1} \left(\sum_g \mathbf{X}_g^\intercal \hat{\mathbf{e}}_g \hat{\mathbf{e}}_g^\intercal \mathbf{X}_g\right) \left(\mathbf{X}^\intercal \mathbf{X}\right)^{-1},
$$
其中 $\mathbf{X}_g$ 是第 $g$ 個 cluster 的資料矩陣，
$\hat{\mathbf{e}}_g$ 是第 $g$ 個 cluster 的殘差。
給定任意 $g$，因為 $\operatorname{rank}\left(\hat{\mathbf{e}}_g \hat{\mathbf{e}}_g^\intercal\right) = 1$，
所以 $\operatorname{rank}\left(\mathbf{X}_g^\intercal \hat{\mathbf{e}}_g \hat{\mathbf{e}}_g^\intercal \mathbf{X}_g\right) = 1$，
而當 cluster 的數量 $G = 2$ 時，
$$
\operatorname{rank} \left(\sum_g \mathbf{X}_g^\intercal \hat{\mathbf{e}}_g \hat{\mathbf{e}}_g^\intercal \mathbf{X}_g\right) \leq 2.
$$
因此 $\widehat{\operatorname{Var}}(\hat{\beta})$ 的 rank 也不會超過 $2$。但這裡最少有 $4$ 個參數要估計，所以 $\widehat{\operatorname{Var}}(\hat{\beta})$ 的 rank 必須得是 $4$。事實上在現有的資料中，$\sum_g \mathbf{X}_g^\intercal \hat{\mathbf{e}}_g \hat{\mathbf{e}}_g^\intercal \mathbf{X}_g$ 甚至不是正定矩陣。 如此，統計軟體在計算 $\widehat{\operatorname{Var}}(\hat{\beta})$ 時容易給出非常極端的數值。因此在此資料不適合這樣使用 clustered standard errors。解決辦法是至少讓 cluster 數量 $G$ 大於參數數量。不過這樣的話，現有的資料就不夠了，又要再清理一些資料。做這些 data work 還不是最煩的，我更討厭使用 MS Word 把家教課和他說過的東西整理成一份文件。使用 Word 排版讓人身心很不舒適。總而言之，真是惡夢一場。

## 修課

這週書法課練習了一些其他的筆畫。除了點挑、撇、橫畫以外，還練習了捺、豎勾、橫折、折彎鉤等等。智永的豎勾常常寫得像「蟹爪鈎」，這是王羲之的筆法，在後世的書法家中就比較少見了。這門課的老師非常強調調鋒，即運筆的過程中要不斷調整筆鋒使得可以中鋒用筆。舉例來說，寫豎勾的時候，筆畫下來以後要稍微繞一圈調整筆鋒，然後才出鋒。我能理解這種作法，因為調整筆鋒以後，什麼勾都寫得出來。而且如果一定要寫蟹爪鈎的話，這種來自於隸書的筆法，很難避免不先在豎畫的尾端調整筆鋒，否則勾的下方會有點破損。不過倒也不是什麼書體都得這麼麻煩，我學歐陽詢時的老師，就認為歐體的豎勾可以豎畫下來就直接出鋒。這樣比較自然，而且也挺合理的，畢竟歐體的豎勾是比較方正的。另外，還學習了一點點篆書的筆法，我感覺自己開始掌握到藏鋒的手感。其實這些練習終究都只是為了讓我們熟悉如何控制筆毛，以及如何調整筆鋒。基本功打好以後，寫什麼字帖都能夠自如。

這週的統計學習課把 smoothing splines 教完，並介紹如何選擇 smoothing parameter，還教了 nonparametric logistic regression 與 reproducing kernel Hilbert spaces (RKHS)。說實話我覺得 RKHS 的部分是個大坑，因為我的數學基礎不夠（對泛函分析一無所知），所以很難理解，而仔細學習的效益又不高，只希望不要出相關的作業。

## 研究與閱讀

週四早上跟 YC 聊聊。結論是，他覺得畢竟我要唸 PhD，可以先嘗試自己找找看研究題目。一個方法是多看 applied 的文章然後挑毛病。他說他自己也常這樣找題目。他說我可以每週看個 5 篇然後和他分享一下有什麼心得。這真是一則以喜，一則以憂。值得高興的是他願意花時間（真感謝😔），不過這樣我又更忙了，5 篇文章真的好多，要好好規劃時間才行。

## 其他

週四下午離開衛福部以後，因為晚上需要家教，就先去市政府站附近晃晃。我拿了之前送修的雨傘。本來想去時代百貨二樓的星巴克坐坐，但人好多😅。附近去過的兩家咖啡廳，一家今天被包場了，一家沒開。於是我第一次去了客美多。感覺普普通通，不過有插頭很方便。