import React from "react"
import "typeface-montserrat"
import "typeface-open-sans"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Theme from "./src/theme/theme"
import "./src/css/style.css"

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
    font-family: 'Montserrat', sans-serif;
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
