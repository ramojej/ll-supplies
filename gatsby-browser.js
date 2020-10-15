import React from "react"
import "typeface-montserrat"
import "typeface-open-sans"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Theme from "./src/theme/theme"
import "./src/css/style.css"

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    text-rendering: optimizeLegibility;
  }
  * {
    box-sizing: border-box
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      {element}
    </ThemeProvider>
  )
}
