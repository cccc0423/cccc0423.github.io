---
title: "Potential Outcomes Framework in a Nutshell"
subtitle: "A brief introduction to the potential outcomes framework"
date: 2025-07-15
---

Causality is a fundamental concept in many scientific fields, including economics, epidemiology, and social sciences. It allows us to understand how one variable influences another. With this understanding, we can know how to act or intervene to achieve desired outcomes.

As Hume (1748) noted:

> The only immediate utility of all the sciences is to teach us how to control and regulate future events through their causes.

For example, we might want to understand how educational attainment affects income levels, or how a new drug influences health outcomes.

This post introduces the **potential outcomes framework**, which provides a unified language for causal inference.^[There are other frameworks for causal inference, such as the **structural causal model (SCM)**, which will be discussed in a future post.] Then, we will use the notation of potential outcomes to define causal effects.

## A Motivating Example

Consider a motivating example where we want to understand the effect of a certain job training program on individuals' income. We want to know how much more income an individual would earn if they participated in the program compared to if they did not. We denote the income of individual $i$ as $Y_i$, and whether individual $i$ participated in the job training program as $D_i$, and we observe the pair $(Y_i, D_i)$ for each individual $i$ in our sample.


## The Potential Outcomes Framework

### Potential Outcomes Notation

The primitive concept in the potential outcomes framework is that there is a treatment (or manipulation, intervention) that can be applied to a unit (e.g., an individual, a household, or a firm at a particular time). The treatment can be binary (e.g., treated or untreated) or continuous (e.g., the dosage of a drug). For simplicity, we will focus on binary actions in this post.

As shown in the *Science Table* below, the potential outcomes framework posits that for each unit $i$, there are two potential outcomes:

- $Y_i(1)$, the income that unit $i$ would have been observed under the hypothetical intervention $D_i = 1$, and

- $Y_i(0)$, the income that unit $i$ would have been observed under the hypothetical intervention $D_i = 0$.

These potential outcomes are often referred to as **counterfactuals** because they represent what would have happened under different circumstances.

| Unit        |  $Y_i(1)$  |  $Y_i(0)$  |
|:-----------:|:----------:|:----------:|
| 1           |  $Y_1(1)$  |  $Y_1(0)$  |
| 2           |  $Y_2(1)$  |  $Y_2(0)$  |
| 3           |  $Y_3(1)$  |  $Y_3(0)$  |
| $\vdots{}$  | $\vdots{}$ | $\vdots{}$ |
| $n$         |  $Y_n(1)$  |  $Y_n(0)$  |

Notice that each potential outcomes is *a priori* observable, meaning that we can imagine a world where we could observe both potential outcomes for each unit. For example, if we had a parallel universe where individual $i$ participated in the job training program, we would observe $Y_i(1)$, and in another universe where individual $i$ did not participate, we would observe $Y_i(0)$.

However, *a posteriori*, after the treatment is applied, we can only observe the outcome that corresponds to the treatment status of the unit. This is also known as the **fundamental problem of causal inference**. In our example, if individual $i$ participates in the job training program, we observe $Y_i(1)$, and if they do not participate, we observe $Y_i(0)$. The observed outcome $Y_i$, therefore, is related to the potential outcomes as follows:
$$
Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0), \tag{1}
$$
or equivalently,
$$
Y_i = Y_i(D_i), \tag{2}
$$
where $Y_i(D_i)$ is the observed outcome for unit $i$ given their natural treatment value $D_i$.

### Stable Unit Treatment Value Assumption (SUTVA)

While it seems straightforward to write the potential outcomes as $Y_i(1)$ and $Y_i(0)$ and relate them to the observed outcome $Y_i$ through Equation 1, we are implicitly making two important assumptions, together known as the **stable unit treatment value assumption (SUTVA)**: 

1. (no interference) the potential outcomes for each unit are not affected by the treatment status of other units, and

2. (no hidden variations) there are no hidden variations in the treatment that would lead to different potential outcomes for the same treatment status.

Let's dive deeper into these two assumptions.

#### No Interference Assumption

When we write the potential outcomes as $Y_i(1)$ and $Y_i(0)$, we are implicitly assuming that the potential outcomes for each unit are not affected by the treatment status of other units.

In our example, this means that the income of individual $i$ is not influenced by whether other individuals participated in the job training program.

This assumption can be violated in many real-world scenarios. For example, if the job training program creates a spillover effect, where the program not only affects the treated individuals but also influences the income of untreated individuals because the treated individuals share their knowledge or skills with others, then the potential outcomes for each unit would depend on the treatment status of other units. In such cases, it would be better to account for these spillover effects using a more flexible notation.

#### No Hidden Variations Assumption

Another implicit assumption typically made in the potential outcomes framework is that there are no hidden variations in the treatment that would lead to different potential outcomes for the same treatment status.

For example, if the job training program has different versions or levels of intensity (e.g., online vs. in-person training, or short-term vs. long-term training), then the potential outcomes for each unit would depend on the specific version of the treatment they received. In the presence of such variations, we would need to specify the treatment more precisely.


## Defining Causal Effects

Once we have defined the potential outcomes, we can use them to define causal effects, which are functions of the Science Table above.

For example, the **individual causal effect** of the job training program on unit $i$ can be defined as the difference between the two potential outcomes:
$$
\tau_i \equiv Y_i(1) - Y_i(0).
$$
This individual causal effect $\tau_i$ represents the change in income for unit $i$ if they were to participate in the job training program compared to if they did not. Due to the fundamental problem of causal inference, we can only observe either $Y_i(1)$ or $Y_i(0)$ for each unit $i$, but not both. Therefore, this quantity cannot be recovered from the data without very strong homogeneity assumptions.

Instead, we are often interested in the **average causal effect** (ACE), also known as the **average treatment effect** (ATE), of the job training program on the income of all units can be defined as the average of the individual causal effects:
$$
\tau \equiv \operatorname{E}(Y_i(1) - Y_i(0)) = \operatorname{E}(Y_i(1)) - \operatorname{E}(Y_i(0)),
$$
where the expectation is taken over the distribution of the units in the sample.

Another common quantity of interest is the **average treatment effect on the treated** (ATT), which is defined as the average of the individual causal effects for the treated units:
$$
\begin{align*}
\tau_{\text{ATT}}
&\equiv \operatorname{E}(Y_i(1) - Y_i(0) \mid D_i = 1) \\
&= \operatorname{E}(Y_i(1) \mid D_i = 1) - \operatorname{E}(Y_i(0) \mid D_i = 1).
\end{align*}
$$

## Identifying Causal Effects

## Epilogue

- Holland, P. W. (1986). Statistics and causal inference. *Journal of the American statistical Association*, *81*(396), 945-960.
