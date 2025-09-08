---
title: 週記（三十三）
description: 渾渾噩噩的一週
date: 2025-09-06
---

## 什麼是自由教育？

有一天在研究室，
同學們談到一些價值觀或人生觀的問題，
包括未來期待怎樣的職涯，
或者更喜歡怎樣的哲學家等等的問題。

與這有點相關但又不太相關的是，
我想到我高中時讀過的一篇文章，
Leo Strauss 的〈什麼是自由教育？〉（What Is Liberal Education?）。

Strauss 首先提出自由教育的定義：在文化之中或朝向文化的教育。
文化（culture）這個字來自拉丁文的 cultura，
最初的意思是耕作（cultivation），
即按照土壤的本性來改良土壤、培育作物。
後來這個字的意思擴展到人類的精神生活，
即對心靈的培育。
因此，自由教育按照人的心靈的本性來培育人內在的能力。
但正如土壤需要農夫，
心靈也需要老師，
也就是那些「最偉大的心靈」。
這些「最偉大的心靈」極為罕見，
學生主要透過「偉大的書籍」接觸他們。
因此，自由教育需要以
「適當的態度研讀那些最偉大的心靈所留下的著作」。

這時 Strauss 話鋒一轉，追問自由教育在現代民主社會中的意義為何？
最初，民主制被期待為一種德性的政體，
一種普遍的貴族制度，
而適用於一個多數人都擁有高度理性的社會。
但正如盧梭在《社會契約論》中的質疑
「如果有一個由神組成的民族，它就會民主地治理自己。如此完美的政府不適合人類。」
Strauss 更指出現代民主並非大眾統治，
而僅是大眾文化，
而這種文化「可以被最平庸的能力在無需任何智力與道德努力下，以非常低的金錢代價獲取」。
大眾文化創造出韋伯所謂「沒有精神或睿智的專家與沒有良心的享樂主義者」，
而自由教育即是大眾文化的解毒劑，
抵抗大眾文化的侵蝕。
自由教育可以說是從大眾民主到古典意義中的民主的階梯。
因此，他又形容自由教育是要喚醒人自身的卓越。

那麼，自由教育如何喚醒人自身的卓越呢？
如同柏拉圖說的，
最好的教育是哲學。
這是因為，哲學對最重要的、最高的或最全面事物的智慧或知識的追求。
雖然我們不能成為哲學家
（就連 Strauss 自己也不認為自己是哲學家，而是個學者），
但我們可以愛哲學，
聆聽偉大哲學家，乃至於最偉大的心靈之間的對話，
也就是閱讀偉大的書籍。
他最後又強調，自由教育是對謙遜、大膽的訓練，
目的是讓我們從是從庸俗（apeirokalia）中解放出來。

## 簡單隨機抽樣

假設我們有一個有限母體，包含 $n$ 個個體。
一個大小為 $n_1$ 的簡單隨機樣本
（simple random sample, SRS）是從母體中不放回地抽出 $n_1$ 個個體。
令 $\mathbf{Z} = (Z_1, \ldots, Z_n)$ 是一個指標向量，
而 $Z_i = 1$ 表示個體 $i$ 被抽到，反之則表示沒被抽到。

在 SRS 下，
SRS 可能包含 $\binom{n}{n_1}$ 種可能的排列（permutations），
其中有 $n_1$ 個 $1$ 與 $n - n_1$ 個 $0$，
而每一種排列的機率都是 $\pi = 1 / \binom{n}{n_1}$。

在 SRS 下，我們可以計算

1. $\operatorname{E}(Z_i) = n_1 / n$；

2. $\operatorname{Var}(Z_i) = \frac{n_1 n_0}{n^2}$；

3. $\operatorname{Cov}(Z_i, Z_j) = -\frac{n_1 n_0}{n^2 (n - 1)}$，其中 $i \neq j$。

首先，$\operatorname{E}(Z_i) = P(Z_i = 1)$，
即從 $n$ 個個體中抽出 $n_1$ 個樣本且個體 $i$ 被抽到的機率，因此
$$
\operatorname{E}(Z_i) = \frac{\binom{n - 1}{n_1 - 1}}{\binom{n}{n}} = \frac{n_1}{n}.
$$
再來，因為 $Z_i \sim \operatorname{Bernoulli}\left(\frac{n_1}{n}\right)$，
所以
$$
\operatorname{Var}(Z_i) 
= \frac{n_1}{n}\left(1 - \frac{n_1}{n}\right) 
= \frac{n_1 n_0}{n^2}.
$$
最後，我們知道 $\operatorname{E}(Z_iZ_j) = P(Z_i = 1, Z_j = 1)$，
即從 $n$ 個個體中抽出 $n_1$ 個樣本且個體 $i$ 和 $j$ 都被抽到的機率，
因此
$$
\operatorname{E}(Z_i Z_j) 
= \frac{\binom{n - 2}{n_1 - 2}}{\binom{n}{n_1}} 
= \frac{n_1 (n_1 - 1)}{n(n - 1)},
$$
而
$$
\operatorname{Cov}(Z_i, Z_j) 
= \frac{n_1(n_1 - 1)}{n(n - 1)} - \frac{n_1^2}{n^2}
= -\frac{n_1 n_0}{n^2(n - 1)}.
$$
如此證畢。

我們也可以把以上的關係寫成向量、矩陣的形式。
定義投影矩陣 
$\mathbf{P}_n \equiv \mathbf{I}_n - \frac{1}{n} \mathbf{1}_n
\mathbf{1}_n^\intercal$，
其中 $\mathbf{I}_n$ 是 $n \times n$ 的單位矩陣，
而 $\mathbf{1}_n$ 是 $n \times 1$ 的行向量，全部元素都是 $1$。
對於任何向量，
投影矩陣 $\mathbf{P}_n$ 都能將它投影到與 $\mathbf{1}_n$ 正交的子空間。 
而我們有
$$
\begin{aligned}
\operatorname{E}(\mathbf{Z}) &= \frac{n_1}{n} \mathbf{1}_n, \\
\operatorname{Cov}(\mathbf{Z}) &= \frac{n_1 n_0}{n(n - 1)} \mathbf{P}_n.
\end{aligned}
$$

這樣看來，
要計算期望值、變異數和共變異數，
也從幾何（？）的視角切入。
令 $\sigma: \{1, \ldots, n\} \to \{1, \ldots, n\}$ 是一個排列（permutation），
$\mathbf{Q}_{\sigma}$ 是一個排列矩陣（permutation matrix），
定義成
$$
(\mathbf{Q}_{\sigma})_{ij} =
\begin{cases}
1, & \text{if } i = \sigma(j), \\
0, & \text{otherwise}.
\end{cases}
$$
這個矩陣 $\mathbf{Q}_{\sigma}$ 的每行和每列都有且只有一個 $1$，
故顯然它是一個正交矩陣，
$\mathbf{Q}_{\sigma}^\intercal = \mathbf{Q}_{\sigma}^{-1}$。
令 $\mathcal{S}$ 是所有可能的樣本組合
即
$$
\mathcal{S} = \{z \in \{0, 1\}^n : \mathbf{1}_n^\intercal z = n_1\}.
$$
SRS 就是讓 $\mathbf{Z}$ 在 $\mathcal{S}$ 上有均勻分布。
而既然 $\mathbf{Q}_{\sigma}$ 是雙射函數，
那對於任意 $A \in \mathcal{S}$，
$\mathbf{Q}_{\sigma}^{-1} A$ 集合的大小和 $A$ 一樣，
即 $|\mathbf{Q}_{\sigma}^{-1} A| = |A|$。
所以，
$$
\begin{aligned}
P(\mathbf{Q}_{\sigma} \mathbf{Z} \in A)
= P(\mathbf{Z} \in \mathbf{Q}_{\sigma}^{-1} A)
= \frac{|\mathbf{Q}_{\sigma}^{-1} A|}{|\mathcal{S}|}
= \frac{|A|}{|\mathcal{S}|}
= P(\mathbf{Z} \in A).
\end{aligned}
$$
所以，$\mathbf{Q}_{\sigma} \mathbf{Z}$ 與 $\mathbf{Z}$ 有相同的分配。
既然如此，
$$
\operatorname{E}(\mathbf{Z})
= \operatorname{E}(\mathbf{Q}_{\sigma} \mathbf{Z})
= \mathbf{Q}_{\sigma} \operatorname{E}(\mathbf{Z}),
$$
而 $\mathbb{R}^n$ 中不變於任意排列矩陣的向量就是 
$\mathbf{1}_n$ 的倍數，
所以 $\operatorname{E}(\mathbf{Z}) = c \mathbf{1}_n$。
而因為 $\mathbf{1}_n^\intercal \mathbf{Z} = n_1$，
所以 $\mathbf{1}_n^\intercal \operatorname{E}(\mathbf{Z}) = n_1$，
因此 $c = n_1 / n$。

同理，
$$
\operatorname{Cov}(\mathbf{Z})
= \operatorname{Cov}(\mathbf{Q}_{\sigma} \mathbf{Z})
= \mathbf{Q}_{\sigma} \operatorname{Cov}(\mathbf{Z}) \mathbf{Q}_{\sigma}^\intercal.
$$
那 $\mathbb{R}^{n \times n}$ 中不變於任意排列矩陣的矩陣長什麼樣呢？
注意到重排可以讓 $\operatorname{Cov}(\mathbf{Z})$ 的對角線元素互換位置，
所以對角線元素必須都一樣。
另外，重排也可以讓 $\operatorname{Cov}(\mathbf{Z})$ 的非對角線元素互換位置，
所以非對角線元素也必須都一樣。
因此，$\operatorname{Cov}(\mathbf{Z})$ 必須是形如
$$
\operatorname{Cov}(\mathbf{Z})
= c_1 \mathbf{I}_n + c_2 \mathbf{1}_n \mathbf{1}_n^\intercal.
$$
而因為 $\mathbf{1}_n^\intercal \mathbf{Z} = n_1$，
所以
$$
\operatorname{Cov}(\mathbf{Z}) \mathbf{1}_n = \mathbf{0}_n,
$$
因此
$$
(c_1 \mathbf{I}_n + c_2 \mathbf{1}_n \mathbf{1}_n^\intercal) \mathbf{1}_n 
= (c_1 + c_2 n) \mathbf{1}_n = \mathbf{0}_n,
$$
所以 $c_2 = -c_1 / n$。
因此，$\operatorname{Cov}(\mathbf{Z}) = c_1 \mathbf{P}_n$。
最後的問題是，$c_1$ 是多少？
注意到任何 $\mathbf{Z}$ 都恰有 $n_1$ 個 $1$ 與 $n_0$ 個 $0$，
故 $\mathbf{Z}$ 距離中心點 $\frac{n_1}{n} \mathbf{1}_n$ 的距離會是
$$
\left\| \mathbf{Z} - \frac{n_1}{n} \mathbf{1}_n \right\|^2 
= n_1 \left(1 - \frac{n_1}{n}\right)^2 + n_0 \left(0 - \frac{n_1}{n}\right)^2
= \frac{n_1 n_0}{n},
$$
而利用 $\operatorname{trace}(\cdot)$ 與 $\operatorname{E}(\cdot)$ 的線性，
$$
\operatorname{trace}(\operatorname{Cov}(\mathbf{Z}))
= \operatorname{E}[\| \mathbf{Z} - \operatorname{E}(\mathbf{Z}) \|^2]
= \frac{n_1 n_0}{n}.
$$
又因為 $\operatorname{trace}(\mathbf{P}_n) = n - 1$，
所以
$$
\operatorname{trace}(\operatorname{Cov}(\mathbf{Z}))
= c_1 \operatorname{trace}(\mathbf{P}_n) = c_1 (n - 1),
$$
因此我們終於得到
$$
c_1 = \frac{n_1 n_0}{n(n - 1)}.
$$

