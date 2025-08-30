---
title: "Potential Outcomes Framework in a Nutshell"
subtitle: "A brief introduction to the potential outcomes framework"
date: 2025-08-30
---

To act upon the world it to assume a grasp of causality.
From the dawn of inquiry,
humans have sought to understand 
not just the what but the why the world behaves as it does.
For, as famously articulated by Democritus:

> I would rather discover one causal law than be the king of Persia.

The quest to unravel causal relationships
stems partly from our innate curiosity
and partly from practical necessity,
as David Hume (1748) pointed out:

> The only immediate utility of all the sciences
> is to teach us how to control and regulate future events
> through their causes.

For example, we might want to understand
how educational attainment affects income levels,
how a new drug influences health outcomes,
or how an advertising campaign impacts sales.
Each of these questions
invloves a choice among multiple possible actions,
and we wish to know where these different paths might lead us.

This post introduces the **potential outcomes framework**,
a unifying language for navigating these choices and their consequences with clarity.
We will begin by defining the core concepts of the potential outcomes framework
and the assumptions that underpin them.
Next, we will formally define various measures of causal effects
through the lens of potential outcomes.
Finally, we will explore the primary challenge in 
recovering causal effects from observational data 
and discuss how randomized experiments can help overcome this challenge.

## A Motivating Example

Consider a motivating example
where we want to understand the effect of a certain job training program
on individuals' income.
We want to know how much more income an individual would earn
if they participated in the program compared to if they did not.
We denote the income of individual $i$ as $Y_i$,
and whether individual $i$ participated in the job training program as $D_i$,
and we observe the pair $(Y_i, D_i)$ for each individual $i$ in our sample.

## The Potential Outcomes Framework

### Potential Outcomes Notation

The primitive concept in the potential outcomes framework
is that there is a **treatment** (or manipulation, intervention)
that can be applied to a unit
(e.g., an individual, a household, or a firm at a particular time).
The treatment can be binary (e.g., treated or untreated)
or continuous (e.g., the dosage of a drug).
For simplicity, we will focus on binary actions in this post.

To organize our thinking,
let us imagine an omniscient record sometimes
called the "Science Table." 
This table represents a God's-eye view of the world,
where we can see not only what actually happened
but also what could have happened under different scenarios.
These potential outcomes are often referred to as **counterfactuals**
because they represent what would have happened under different circumstances.
In our binary case,
it appears as each unit has two potential outcomes:

- $Y_i(1)$, the income that unit $i$ would be observed
    under the hypothetical intervention $D_i = 1$, and

- $Y_i(0)$, the income that unit $i$ would be observed
    under the hypothetical intervention $D_i = 0$.

| Unit        |  $Y_i(1)$  |  $Y_i(0)$  |
|:-----------:|:----------:|:----------:|
| 1           |  $Y_1(1)$  |  $Y_1(0)$  |
| 2           |  $Y_2(1)$  |  $Y_2(0)$  |
| 3           |  $Y_3(1)$  |  $Y_3(0)$  |
| $\vdots{}$  | $\vdots{}$ | $\vdots{}$ |
| $n$         |  $Y_n(1)$  |  $Y_n(0)$  |


By intervention,
we mean an action that forcibly
sets the treatment status of unit $i$ to a specific value,
without regard to the natural treatment status of the unit
or any other factors that may influence the treatment status.

Notice that each potential outcome is *a priori* observable,
meaning that we can imagine a world
where we could observe both potential outcomes for each unit.
That is to say,
if we had a parallel universe
where individual $i$ participated in the job training program,
we would observe $Y_i(1)$,
and in another universe where individual $i$ did not participate,
we would observe $Y_i(0)$.

However, *a posteriori*, after the treatment is applied, 
we can only observe the outcome
that corresponds to the treatment status of the unit.
This is also known as the **fundamental problem of causal inference**.
The inability to simultaneously witness what is and what could have been
is poignantly captured in Robert Frost's famous poem
[*The Road Not Taken*](https://en.wikipedia.org/wiki/The_Road_Not_Taken):

> Two roads diverged in a yellow wood,
>
> And sorry I could not travel both...

Robert Frost's lament is,
in essence,
the lament of all of us who seek to understand causality.
The "two roads" are the two potential outcomes $Y_i(1)$ and $Y_i(0)$.
His sorrow, "And sorry I could not travel both",
is a perfect encapsulation of the fundamental problem of causal inference:
we can only ever observe the road taken, $Y_i(D_i)$,
the outcome corresponding to the natural treatment status $D_i$;
while the road not taken, 
$Y_i(1 - D_i)$, remains forever in the realm of the counterfactual.

In our motivating example, 
if an individual participates, 
we observe $Y_i(1)$; 
if they abstain, 
we observe $Y_i(0)$. 
We see the outcome of their choice, 
but the outcome of the alternative path remains forever a shadow.
Nonetheless,
we can never observe both potential outcomes
for the same individual at the same time.
The observed outcome $Y_i$, therefore, is related to the potential outcomes as follows:
$$
\begin{align*}
Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0),
\end{align*}
$$ {#eq:consistency-1}
or equivalently,
$$
\begin{align*}
Y_i = Y_i(D_i).
\end{align*}
$$ {#eq:consistency-2}

:::comment
One might argue that we can observe both potential outcomes
for the same individual by recording their income
in two different years,
one year when they did not participate in the job training program
and another year when they did.
However, this line of reasoning is flawed 
because it assumes that the potential outcomes are stable over time,
which is often not the case.
Instead, it would be more appropriate to consider the same individual
at the different time points as different units,
and then we still face the fundamental problem of causal inference
because we can only observe one potential outcome for each unit.
:::

### Stable Unit Treatment Value Assumption (SUTVA)

While it seems straightforward 
to write the potential outcomes as $Y_i(1)$ and $Y_i(0)$
and relate them to the observed outcome $Y_i$ through
@eq:consistency-1 or @eq:consistency-2,
we are implicitly making two important assumptions,
together known as the **stable unit treatment value assumption (SUTVA)**: 

1. **No Interference:** The potential outcomes for any unit 
    do not vary with the treatments assigned to other units.
    In our job training example, 
    this means an individual's income is not affected by 
    whether their peers participated in the program. 
    This assumption, however, would be violated 
    if the program created "spillover effects," 
    such as treated individuals sharing their new skills with the untreated.

2. **No Hidden Variations in Treatment:** 
    There are no hidden variations in the treatment 
    that would lead to different potential outcomes 
    for the same treatment status.
    This implies that the "job training program" is a single, 
    consistent entity. If, in reality, the program had
    different instructors or intensity levels, 
    a more precise definition of the treatment would be required to uphold this assumption.


## Defining Causal Effects

With the potential outcomes framework in place,
we can give a precise definition of causal effects.

For example, the **individual causal effect** 
of the job training program on unit $i$ 
can be defined as the difference 
between the two potential outcomes:
$$
\tau_i \equiv Y_i(1) - Y_i(0).
$$
This individual causal effect $\tau_i$ 
represents the change in income for unit $i$ 
if they were to participate in the job training program 
compared to if they did not.
This is precisely "the difference" the poet muses on at the end of his journey.
And just as for the poet, for us too, 
this individual causal effect $\tau_i$ cannot be recovered from data
without very strong homogeneity assumptions.

Instead,
we are often interested in the **average causal effect** (ACE),
also known as the **average treatment effect** (ATE),
of the job training program on the income 
of all units can be defined as the average 
of the individual causal effects:
$$
\tau_{\text{ATE}} \equiv \operatorname{E}(Y_i(1) - Y_i(0)) = \operatorname{E}(Y_i(1)) - \operatorname{E}(Y_i(0)),
$$
where the expectation is taken over 
the distribution of the units in the sample.

Another common quantity of interest is the 
**average treatment effect on the treated** (ATT),
which is defined as the average of the individual causal effects 
for the treated units:
$$
\begin{align*}
\tau_{\text{ATT}}
&\equiv \operatorname{E}(Y_i(1) - Y_i(0) \mid D_i = 1) \\
&= \operatorname{E}(Y_i(1) \mid D_i = 1) - \operatorname{E}(Y_i(0) \mid D_i = 1).
\end{align*}
$$
In our example,
it captures the average effect of the job training program
on those who actually participated in the program.

In epidemiology, the **relative risk (RR)** and the **odds ratio (OR)** are also
commonly used to measure causal effects, especially when the outcome is binary
(e.g., success or failure, alive or dead). The relative risk is defined as:
$$
\tau_{\text{RR}} \equiv \frac{\operatorname{E}(Y_i(1))}{\operatorname{E}(Y_i(0))},
$$
and the odds ratio is defined as:
$$
\tau_{\text{OR}} \equiv \frac{\operatorname{E}(Y_i(1)) / (1 -
\operatorname{E}(Y_i(1)))}{\operatorname{E}(Y_i(0)) / (1 -
\operatorname{E}(Y_i(0)))}.
$$

## Recovering Causal Effects

We now turn to the question of how to recover causal effects
from data.
In the following,
we will focus on the causal effects on the additive scale,
i.e., $\tau_{\text{ATE}}$ and $\tau_{\text{ATT}}$,
but similar ideas apply to other scales as well.

### Bias from Selection into Treatment

To recover $\tau_{\text{ATE}}$ or $\tau_{\text{ATT}}$ from data,
we might be tempted to compare the average outcomes
between the treated and untreated groups;
e.g., comparing those who participated in the job training program
to those who did not.
This type of comparison is common in everyday life;
for instance,
the media often compares which academic majors lead to better financial prospects,
or which vaccines are more effective than others.

However, this naive comparison
is generally biased for $\tau$ or $\tau_{\text{ATT}}$
because of **selection into treatment**.
To see this,
$$
\begin{align*}
&\mathrel{\phantom{=}} \operatorname{E}(Y_i \mid D_i = 1) - \operatorname{E}(Y_i \mid D_i = 0) \\
&= \operatorname{E}(Y_i(1) \mid D_i = 1) - \operatorname{E}(Y_i(0) \mid D_i = 0) \\
&= \tau_{\text{ATT}}
    + \underbrace{\operatorname{E}(Y_i(0) \mid D_i = 1)
    - \operatorname{E}(Y_i(0) \mid D_i = 0)}_{\text{bias from selection into treatment}},
\end{align*}
$$ {#eq:selection-bias}
where the first equality follows from @eq:consistency-1 or @eq:consistency-2,
and the second equality follows from the definition of $\tau_{\text{ATT}}$.
In @eq:selection-bias,
the second term on the right-hand side
is the bias from selection into treatment,
or **selection bias** for short,
which captures the difference
in the average potential outcome under control $Y_i(0)$
between the treated ($D_i = 1$) and untreated groups ($D_i = 0$).
Selection bias arises when the individuals who choose to receive the
treatment (or are selected for it) differ systematically from those who do not,
in ways that also affect the outcome of interest. 
This means that the observed
difference in outcomes between the treated and untreated groups may not solely
reflect the causal effect of the treatment,
but also these pre-existing differences. 
The direction and magnitude of selection bias depend on how these groups differ.
In most economic and social science applications,
the selection bias can be substantial
because individuals often (if not always) try to choose options
that align with their preferences, abilities, or circumstances.
This optimizing behavior creates diffculties in recovering causal effects
from observational data.
For instance, if individuals who opt into a job training program are generally more motivated
or have higher baseline skills than those who do not, 
the selection bias would likely lead to an overestimation of the treatment effect
when naively comparing outcomes between the two groups.

:::comment
The term "selection bias" has different meanings in different contexts.
Sometimes, it refers to biases that arise from non-random sampling of units into the study;
i.e., selection into the sample.
Here, we use it to refer to biases that arise from
selection into treatment.
:::

### Randomized Experiments

If we, like Frost's lone traveler, 
cannot travel both roads, 
how can we ever hope to learn about causal effects?

The genius of R.A. Fisher was to see that 
we can take a large crowd of travelers and 
randomly send half down one road and half down the other.
This is the essence of a **randomized experiment**,
which is widely regarded as the gold standard for causal inference.

In a two-arm randomized experiment,
where units are randomly assigned to either the treatment group ($D_i = 1$) or
the control group ($D_i = 0$),
the randomization ensures that
the treatment assignment is independent of any other factors
that may influence the outcome.
This can be expressed mathematically as
$$
\begin{align*}
D_i \perp\!\!\!\perp (Y_i(1), Y_i(0)),
\end{align*}
$$ {#eq:randomization}
where $\perp\!\!\!\perp$ denotes statistical independence.

Under the randomization (@eq:randomization),
the selection bias term in @eq:selection-bias vanishes because
$$
\begin{align*}
\operatorname{E}(Y_i(0) \mid D_i = 1)
= \operatorname{E}(Y_i(0) \mid D_i = 0),
\end{align*}
$$
and therefore,
the naive comparison of average outcomes
between the treated and untreated groups
gives $\tau_{\text{ATT}}$ exactly:
$$
\begin{align*}
\operatorname{E}(Y_i \mid D_i = 1) - \operatorname{E}(Y_i \mid D_i = 0)
= \tau_{\text{ATT}}.
\end{align*}
$$

## Conclusion

By conceptualizing what would have happened under different scenarios,
the potential outcomes framework gives us a precise language
to define and reason about causality.
It highlights the challenges in recovering causal effects
because of the fundamental problem of causal inference 
and the peril of selection bias.
It also illuminates a path forward through randomized experiments,
which, by breaking the link between treatment assignment
and potential outcomes,
turn the elusive quest for causality
into a tractable problem.
Yet, in many real-world applications,
randomized experiments may not be feasible or ethical.
The potential outcomes framework,
still, provides a foundation
for developing methods to identify and estimate causal effects
from observational data,
which we will explore in future posts.
