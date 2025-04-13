---
title: 名牌產生器
---

這個產生器能讀 `.tsv` 檔。使用者需要把 `.tsv` 檔和 `.tex` 檔放在同個路徑之下。

如果我們從 NTU COOL 上下載了學生名單，那我們可以用 R 把學生名單轉換成 `.tsv` 檔。注意這個 `.tsv` 檔要有兩個欄位，一個是中文名字 `chinese`，另一個是英文名字 `english`。

```r
library(tidyverse)
library(readxl)

file_path <- "Student-List.xlsx"

student <- read_excel(file_path) %>%
  mutate(
    english = str_extract(Name, "(?<=\\().*(?=\\))"),
    chinese = str_remove(Name, " \\(.*")
  )

student %>%
  select(chinese, english) %>%
  write_tsv("student.tsv")
```

檔案大概要是長這樣。

```
chinese	english
林一一  LIN, YI-Yi
張二二	CHANG, ER-ER
...
```

再來就是 $\rm \LaTeX$ 的部分。這個文件會讀取 `.tsv` 檔，然後把學生名字和學號印在 A4 紙上。注意這個文件要用 `xelatex` 編譯，因為我用了 `xeCJK` 套件來處理中文，而且要安裝相應的字型才能正常編譯（或者改成自己有的字型）。現在使用的幾個字型都是 overleaf 上有的。漢字字型是日文的 Harano Aji Gothic，因為有點缺字，所以缺字的地方會用 Noto Sans CJK JP 來代替。英文字型則是 IBM Plex Sans Condensed，會使用 Condesed 是因為這樣能塞下比較多的字，不至於把字縮得太小。

```
\documentclass[a4paper]{article}
\usepackage[margin=-10pt]{geometry}
\usepackage{fontspec}
\usepackage[AutoFallBack=true]{xeCJK}
\setCJKmainfont{Noto Sans CJK JP}
\setCJKsansfont[FallBack=Noto Sans CJK JP]{Harano Aji Gothic}
\setsansfont{IBM Plex Sans Condensed}
\usepackage{graphicx}
\pagestyle{empty}
\usepackage{csvsimple}
\usepackage{xcolor}
\definecolor{gray02}{gray}{0.2}

\newcommand{\NamePlate}[2]{%
  \begin{center}
    \begin{tabular}{@{}c@{}}
      %---------------------------------
      % (1) 第一等分：空白
      \begin{minipage}[c][.25\textheight][c]{.95\textwidth}
      \end{minipage}\\
      \hline
      %---------------------------------
      % (2) 第二等分：旋轉 180° 的中英文姓名
      \begin{minipage}[c][.25\textheight][c]{.95\textwidth}
        \centering
        \rotatebox{180}{%
          \parbox{1\textwidth}{\centering
            {\fontsize{65}{72}\selectfont\sffamily\bfseries\textcolor{gray02}{#1}}\\[1cm]
            {\fontsize{60}{60}\selectfont\sffamily\bfseries\textcolor{gray02}{#2}}
          }%
        }
      \end{minipage}\\
      \hline
      %---------------------------------
      % (3) 第三等分：正常方向的中英文姓名
      \begin{minipage}[c][.25\textheight][c]{.95\textwidth}
        \centering
        {\fontsize{65}{72}\selectfont\sffamily\bfseries\textcolor{gray02}{#1}}\\[1cm]
        {\fontsize{60}{60}\selectfont\sffamily\bfseries\textcolor{gray02}{#2}}
      \end{minipage}\\
      \hline
      %---------------------------------
      % (4) 第四等分：空白
      \begin{minipage}[c][.25\textheight][c]{.95\textwidth}
      \end{minipage}\\
    \end{tabular}
  \end{center}
}

\begin{document}

\csvreader[head to column names, separator=tab]{name_tab.tsv}{}{%
   \NamePlate{\chinese}{\english}
}

\end{document}
```