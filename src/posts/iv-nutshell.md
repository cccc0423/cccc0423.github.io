---
title: "Instrumental Variables in a Nutshell"
subtitle: "A brief introduction to the IV, 2SLS, and control function approaches"
date: 2025-03-17
---

## The Setup

Suppose that the wage $Y_i$ of individual $i$ is linearly determined by education $D_i$ ($1$ if the individual has a college degree and $0$ otherwise) and an unobservable ability $A_i$:
$$
Y_i = \beta_0 + \beta_1 D_i + \beta_2 A_i + e_i \equiv \beta_0 + \beta_1 D_i + \varepsilon_i,
$$
where $D_i$ and $A_i$ are mean independent of $e_i$, and $\varepsilon_i \equiv \beta_2 A_i + e_i$ is the structural error. We are interested in the causal effect of education $D_i$ on wages $Y_i$. This effect is given by $\beta_1$ in the DGP.^[For simplicity, we assume that there is no treatment effect heterogeneity. This means that the effect of education on wages is the same for all individuals. This assumption is already encoded in the structural equation above.] If we can fit a linear regression of $Y_i$ on $D_i$ and $A_i$, then the OLS estimator of $\beta_1$ is unbiased and consistent. However, what if we cannot observe $A_i$?

This scenario is known as omitted variable bias in traditional econometrics textbooks. The omitted variable bias arises when the unobservable $A_i$ appears in the outcome equation and is correlated with $D_i$. In this case, the OLS estimator of $\beta_1$ is biased and inconsistent:
$$
\frac{\operatorname{Cov}(Y_i, D_i)}{\operatorname{Var}(D_i)} = \beta_1 + \beta_2 \frac{\operatorname{Cov}(A_i, D_i)}{\operatorname{Var}(D_i)}.
$$

## The Instrumental Variables (IV) Estimation

A solution to the omitted variable bias is to find an instrument $Z_i$ satisfying two conditions:

1. Exogeneity: $\operatorname{Cov}(Z_i, \varepsilon_i) = 0$.
2. Relevance: $\operatorname{Cov}(Z_i, D_i) \neq 0$.

The first condition ensures that the instrument $Z_i$ is exogenous in the sense that it is uncorrelated with $\varepsilon_i$, the factors other than $D_i$ that affect $Y_i$. The second condition ensures that the instrument $Z_i$ is correlated with $D_i$.

The idea of IV estimation is that the effect of $D_i$ on $Y_i$ can be determined by the ratio of the effect of $Z_i$ on $Y_i$ to the effect of $Z_i$ on $D_i$. 

To illustrate, suppose an increase of one unit in $Z_i$ leads to an increase of $\delta_1$ units in $Y_i$ and an increase of $\pi_1$ units in $D_i$. Here, $\delta_1$ represents the effect of $Z_i$ on $Y_i$, and $\pi_1$ represents the effect of $Z_i$ on $D_i$. Given that $Z_i$ only affects $Y_i$ through $D_i$, the effect of $D_i$ on $Y_i$, denoted by $\beta_1$, can be identified as the ratio $\delta_1 / \pi_1$.

Following this logic, the IV estimand is
$$
\begin{aligned}
\beta_{\text{IV}}
&\equiv \frac{\operatorname{Cov}(Y_i, Z_i) / \operatorname{Var}(Z_i)}{\operatorname{Cov}D_i, Z_i) / \operatorname{Var}(Z_i)} \\
&= \frac{\operatorname{Cov}(\beta_0 + \beta_1 D_i + \varepsilon_i, Z_i)}{\operatorname{Cov}(D_i, Z_i)} \\
&= \beta_1 + \frac{\operatorname{Cov}(\varepsilon_i, Z_i)}{\operatorname{Cov}(D_i, Z_i)} \\
&= \beta_1.
\end{aligned}
$$
Its sample counterpart is the IV estimator $\hat{\beta}_{\text{IV}}$:
$$
\hat{\beta}_{\text{IV}} \equiv \frac{\sum_{i=1}^n (Y_i - \bar{Y})(Z_i - \bar{Z})}{\sum_{i=1}^n (D_i - \bar{D})(Z_i - \bar{Z})}.
$$
where $\bar{Y}$, $\bar{D}$, and $\bar{Z}$ are the sample means of $Y_i$, $D_i$, and $Z_i$, respectively.


## The Two-Stage Least Squares (2SLS) Estimation

The idea of 2SLS is to replace the endogenous regressor $D_i$ with its fitted value from the first stage regression. The first stage regression is the regression of the endogenous regressor $D_i$ on the instrument $Z_i$. This works because the fitted value of $D_i$ from the first stage regression contains only the variation in $D_i$ that is explained by $Z_i$ and is uncorrelated with the error term $\varepsilon_i$.

Let the first stage population regression be
$$
D_i = \pi_0 + \pi_1 Z_i + u_i,
$$
where $u_i$ is the projection error. The linear projection of $D_i$ on $Z_i$ is denoted by $\mathscr{P}(D_i \mid Z_i) = \pi_0 + \pi_1 Z_i$. 
Then, the projection coefficient of $\mathscr{P}(D_i \mid Z_i)$ in the regression of $Y_i$ on $\mathscr{P}(D_i \mid Z_i)$ is
$$
\begin{aligned}
\beta_{\text{2SLS}}
&= \frac{\operatorname{Cov}(Y_i, \mathscr{P}(D_i \mid Z_i))}{\operatorname{Var}(\mathscr{P}(D_i \mid Z_i))} \\
&= \frac{\operatorname{Cov}(\beta_0 + \beta_1 D_i + \varepsilon_i, \pi_0 + \pi_1 Z_i)}{\operatorname{Var}(\pi_0 + \pi_1 Z_i)}.
\end{aligned}
$$
Substituting $D_i = \pi_0 + \pi_1 Z_i + u_i$ into the above expression, we have
$$
\begin{aligned}
\beta_{\text{2SLS}}
&= \frac{\operatorname{Cov}(\beta_0 + \beta_1(\pi_0 + \pi_1 Z_i + u_i) + \varepsilon_i, \pi_0 + \pi_1 Z_i)}{\operatorname{Var}(\pi_1 Z_i)} \\
&= \beta_1 + \frac{\operatorname{Cov}(\beta_1 u_i + \varepsilon_i, \pi_1 Z_i)}{\operatorname{Var}(\pi_1 Z_i)} \\
&= \beta_1,
\end{aligned}
$$
where the last equality follows from the fact that $Z_i$ is uncorrelated with $u_i$ by construction and is uncorrelated with $\varepsilon_i$ by the exogeneity assumption.

In practice, the 2SLS estimation is done in two stages.

1. First stage: Regress $D_i$ on $Z_i$ to obtain the fitted value $\hat{D}_i = \hat{\pi}_0 + \hat{\pi}_1 Z_i$.
2. Second stage: Regress $Y_i$ on $\hat{D}_i$, and the OLS estimator of the coefficient of $\hat{D}_i$ is the 2SLS estimator of $\beta_1$.

Importantly, the 2SLS estimator is numerically equivalent to the IV estimator when there is only one endogenous regressor.

## The Control Function Approach

Like the 2SLS estimation, the control function approach also starts with the first stage regression of the endogenous regressor $D_i$ on the instrument $Z_i$. However, the control function approach differs from the 2SLS estimation in the second stage regression. Instead of regressing $Y_i$ on the fitted value of $D_i$, the control function approach regresses $Y_i$ on $D_i$ and the residuals $\hat{u}_i$ from the first stage regression.

To see why this works, note that the endogeneity problem arises because $D_i$ is correlated with the error term $\varepsilon_i$. This correlation occurs because both $D_i$ and $\varepsilon_i$ are affected by the unobserved ability $A_i$. The key insight of the control function approach is that the first-stage residuals $u_i$ capture the component of $D_i$ that is correlated with $\varepsilon_i$. By including $u_i$ as a control variable in the second stage regression, we "control for" the endogeneity.

More formally, let's examine the relationship between $u_i$ and $\varepsilon_i$. From the first stage regression, we have
$$
\begin{aligned}
D_i &= \pi_0 + \pi_1 Z_i + u_i.
\end{aligned}
$$
The residuals $u_i$ represents the part of $D_i$ that cannot be explained by $Z_i$. Since $Z_i$ is exogenous, this residual must capture all the endogenous variation in $D_i$, including its correlation with $A_i$. Therefore, $u_i$ serves as a proxy for the unobserved ability $A_i$ that's causing the endogeneity problem.

When we include $u_i$ in the outcome equation, we have
$$
\begin{aligned}
Y_i &= \beta_0 + \beta_1 D_i + \gamma u_i + \eta_i,
\end{aligned}
$$
where $\eta_i$ is the new error term that is uncorrelated with $D_i$ and $u_i$. The coefficient $\gamma$ captures the effect of $u_i$ on $Y_i$. The control function estimator $\hat{\beta}_{\text{CF}}$ is the OLS estimator of $\beta_1$ in the regression of $Y_i$ on $D_i$ and $u_i$.

Another way to understand why the regression of $Y_i$ on $D_i$ and $u_i$ identifies the causal effect of $D_i$ on $Y_i$ is to consider the population version of Frisch-Waugh-Lovell theorem. The projection coefficient of $D_i$ in the regression of $Y_i$ on $D_i$ and $u_i$ can be obtained by

1. Regressing $D_i$ on the first-stage residuals $u_i$ to obtain residuals. The resulting residuals represent the component of $D_i$ that is orthogonal to $u_i$, which is precisely the linear projection of $D_i$ on $Z_i$, $\mathscr{P}(D_i \mid Z_i)$.

2. Regressing $Y_i$ on $\mathscr{P}(D_i \mid Z_i)$, and the coefficient of $\mathscr{P}(D_i \mid Z_i)$ is $\beta_1$:
$$
\begin{aligned}
\beta_{\text{CF}}
&= \frac{\operatorname{Cov}(Y_i, \mathscr{P}(D_i \mid Z_i))}{\operatorname{Var}(\mathscr{P}(D_i \mid Z_i))} \\
&= \frac{\operatorname{Cov}(\beta_0 + \beta_1 D_i + \varepsilon_i, \pi_0 + \pi_1 Z_i)}{\operatorname{Var}(\pi_0 + \pi_1 Z_i)}.
\end{aligned}
$$
Substituting $D_i = \pi_0 + \pi_1 Z_i + u_i$ into the above expression as we did for the 2SLS estimation, we have
$$
\begin{aligned}
\beta_{\text{CF}}
&= \beta_1 + \frac{\operatorname{Cov}(\beta_1 u_i + \varepsilon_i, \pi_1 Z_i)}{\operatorname{Var}(\pi_1 Z_i)} \\
&= \beta_1,
\end{aligned}
$$
where the last equality again follows from the fact that $Z_i$ is uncorrelated with $u_i$ by construction and is uncorrelated with $\varepsilon_i$ by the exogeneity assumption.

In practice, the control function approach is implemented as follows:

1. First stage: Regress $D_i$ on $Z_i$ to obtain the residuals $\hat{u}_i = D_i - \hat{\pi}_0 - \hat{\pi}_1 Z_i$.

2. Second stage: Regress $Y_i$ on $D_i$ and $\hat{u}_i$, and the OLS estimator of the coefficient of $D_i$ is the control function estimator of $\beta_1$.

It is clear that under linear models, the 2SLS and control function approaches are two sides of the same coin: they both exploit the first-stage regression, but the 2SLS approach replaces the endogenous regressor with its fitted value in the second stage, while the control function approach includes the residuals from the first stage as an additional control variable in the second stage.