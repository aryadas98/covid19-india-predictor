import React from "react"
import numeral from "numeral"

import "katex/dist/katex.min.css"
import { InlineMath, BlockMath } from "react-katex"

export default function Content({coeffs}) {
  return (
    <>
      <h3>How it works</h3>
      <p>This site works on the Susceptible Infectious Removed (SIR) model of epidemiology. 
        We partition the whole population into 3 classes - <b>Susceptible</b> (those who are prone to getting infected), 
        <b>Infectious</b> (those who can infect Susceptible people) and <b>Removed</b> (those who have recovered or died).
      </p>

      <p>The differential equations of the system are:</p>
      <BlockMath math="\begin{aligned}
      \frac{dS}{dt} &= -\frac{\alpha S}{N}I \\ \\
      \frac{dI}{dt} &= \frac{\alpha S}{N}I - (\beta+\gamma)I \\ \\
      \frac{dR}{dt} &= \beta I \\ \\
      \frac{dD}{dt} &= \gamma I
      \end{aligned}"/>

      <p>Here <InlineMath math="S,I,R,D,N"/> are susceptible, infectious, recovered, dead and total population respectively.
         Specifically, <InlineMath math="N=S+I+R+D"/>. And <InlineMath math="\alpha, \beta, \gamma"/> are coefficients that have to be estimated.
      </p>

      <p>We estimate the coefficients from historical data as follows:</p>
      <BlockMath math="\begin{aligned}
      \frac{\alpha S}{N} &= \frac{1}{I}\frac{dI}{dt} + (\beta + \gamma) \\ \\
      \beta &= \frac{1}{I}\frac{dR}{dt} \\ \\
      \gamma &= \frac{1}{I}\frac{dD}{dt}
      \end{aligned}"/>

      <p>Let <InlineMath math="A = \frac{\alpha S}{N}, B = \beta + \gamma, C = \frac{1}{I}\frac{d^2I}{dt^2}"/>.
      Through some algebraic manipulation we can get the value of <InlineMath math="S"/> as:
      </p>
      
      <BlockMath math="S = \frac{A^2}{(A-B)^2 - C}"/>

      <p>Usually there is lots of noise in the data. So these formulas cannot be used directly. We have to use filters and other mechanisms
        to avoid division by 0. Now that <InlineMath math="S"/> is known, <InlineMath math="\alpha"/> and <InlineMath math="N"/> can be derived.
      </p>

      <p>Current values of coefficients:</p>
      <BlockMath math={`\\begin{aligned}
      \\alpha &= ${numeral(coeffs.as).format("0.000")} \\\\ \\\\
      \\beta &= ${numeral(coeffs.bs).format("0.000")} \\\\ \\\\
      \\gamma &= ${numeral(coeffs.cs).format("0.000")}
      \\end{aligned}`} />

      <p>Derived Values:</p>
      <BlockMath math={`\\begin{aligned}
      S &= ${numeral(coeffs.Ss).format("0.00a").toUpperCase()} \\\\ \\\\
      N &= ${numeral(coeffs.Ns).format("0.00a").toUpperCase()} \\\\ \\\\
      \\frac{\\alpha S}{N} &= ${numeral(coeffs.as*coeffs.Ss/coeffs.Ns).format("0.000")} \\\\ \\\\
      \\beta + \\gamma &= ${numeral(coeffs.bs + coeffs.cs).format("0.000")} \\\\ \\\\
      R_0 &= ${numeral(coeffs.as*coeffs.Ss/coeffs.Ns/(coeffs.bs + coeffs.cs)).format("0.00")}
      \\end{aligned}`} />

    </>
  )
}