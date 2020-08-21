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
`

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      {element}
    </ThemeProvider>
  )
}
