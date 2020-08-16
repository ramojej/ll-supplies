import React from "react"
import { OuterContainer, BoxedTitle } from "../../styles/Styles"
import GatsbyImage from "gatsby-image"
import tw, { styled } from "twin.macro"

const StyledOuterContainer = styled(OuterContainer)`
  background: ${props => props.theme.colors.black};
`

const FlexContainer = styled.div`
  ${tw`flex items-center overflow-x-auto px-4`};

  @media ${props => props.theme.screens.lg} {
    ${tw`overflow-x-hidden mx-auto`}
    max-width: 74rem;
  }
`

const StyledBoxedTitle = styled(BoxedTitle)`
  margin-right: 30px;

  @media ${props => props.theme.screens.lg} {
    margin: 0 auto 0 0;
  }
`

const StyledImageContainer = styled.div`
  width: 120px;

  &:not(:last-child) {
    ${tw`mr-8`}
  }
`

const LogosContainer = styled.div`
  ${tw`flex items-center pr-4`};

  @media ${props => props.theme.screens.lg} {
    ${tw`pr-0`}
  }
`

const Accreditations = ({ blocks }) => {
  const { blockAccredFields } = blocks.find(
    accreds => accreds.blockAccredFields
  )
  //console.log(blockAccredFields.logos)
  return (
    <StyledOuterContainer>
      <FlexContainer>
        <StyledBoxedTitle color="#fff">
          <h2>Accreditations</h2>
        </StyledBoxedTitle>
        <LogosContainer>
          {blockAccredFields.logos.map((item, index) => {
            return (
              <StyledImageContainer key={index}>
                <GatsbyImage
                  fluid={item.logo.localFile.childImageSharp.fluid}
                  alt={item.logo.altText}
                />
              </StyledImageContainer>
            )
          })}
        </LogosContainer>
      </FlexContainer>
    </StyledOuterContainer>
  )
}

export default Accreditations
