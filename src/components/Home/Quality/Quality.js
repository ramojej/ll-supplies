import React from "react"
import PropTypes from "prop-types"
import { OuterContainer, Container } from "../../styles/Styles"
import { TitleWithUnderLine } from "../../styles/Title"
import BackgroundImage from "gatsby-background-image"
import tw, { styled } from "twin.macro"

const StyledQualityContainer = styled(Container)`
  @media ${props => props.theme.screens.lg} {
    ${tw`flex justify-end`}
  }
`

const QualityContent = styled.div`
  ${tw`relative z-10`};

  & p:not(:last-child) {
    ${tw`mb-6`}
  }

  @media ${props => props.theme.screens.lg} {
    max-width: 600px;
  }
`

const StyledOuterContainer = styled(OuterContainer)`
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
  }

  @media ${props => props.theme.screens.lg} {
    &:after {
      display: none;
    }
  }
`

const StyledBackgroundImage = styled(BackgroundImage)`
  background-position: right;
  background-size: cover;
`

const Quality = ({ blocks }) => {
  const { blockQualityFields } = blocks.find(block => block.blockQualityFields)

  return (
    <StyledBackgroundImage
      fluid={blockQualityFields.backgroundImage.localFile.childImageSharp.fluid}
    >
      <StyledOuterContainer>
        <StyledQualityContainer>
          <QualityContent>
            <TitleWithUnderLine color="#121212">
              {blockQualityFields.title}
            </TitleWithUnderLine>
            <div
              dangerouslySetInnerHTML={{ __html: blockQualityFields.content }}
              style={{ color: "#818181" }}
            />
          </QualityContent>
        </StyledQualityContainer>
      </StyledOuterContainer>
    </StyledBackgroundImage>
  )
}

Quality.propTypes = {
  blocks: PropTypes.array.isRequired,
}

export default Quality
