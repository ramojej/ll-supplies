import React from "react"
import { Link } from "gatsby"
import { StyledButton } from "../components/Home/Portfolio/SlideItem"
import tw, { styled } from "twin.macro"

const OrangeContainer = styled.div`
  background-color: ${props => props.theme.colors.orange};
  ${tw`flex flex-col items-center justify-center py-16 text-white`};

  p {
    ${tw`text-sm mt-2 mb-3`}
  }
`

const H3 = styled.h3`
  ${tw`text-xl uppercase font-semibold`};
  @media ${props => props.theme.screens.lg} {
    ${tw`text-2xl`}
  }
`

const OrangeFooter = () => {
  return (
    <OrangeContainer>
      <H3>Have a project in mind?</H3>
      <p>Contact us to get started</p>
      <Link to="/contact-us">
        <StyledButton>Contact Us</StyledButton>
      </Link>
    </OrangeContainer>
  )
}

export default OrangeFooter
