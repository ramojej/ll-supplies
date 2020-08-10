import React from "react"
import { BoxedTitle, OuterContainer } from "../../styles/Styles"
import tw, { styled } from "twin.macro"

const StyledOuterContainer = styled(OuterContainer)`
  @media ${props => props.theme.screens.lg} {
    ${tw`pt-16 pb-8`}
  }
`

const Portfolio = () => {
  return (
    <StyledOuterContainer>
      <BoxedTitle>
        <h2>Portfolio</h2>
      </BoxedTitle>
    </StyledOuterContainer>
  )
}

export default Portfolio
