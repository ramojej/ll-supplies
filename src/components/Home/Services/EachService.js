import React from "react"
import PropTypes from "prop-types"
import { TitleWithUnderLine } from "../../styles/Title"
import GatsbyImage from "gatsby-image"
import tw, { styled } from "twin.macro"

const StyledTitleWithUnderline = styled(TitleWithUnderLine)`
  ${tw`text-lg font-bold`};

  &:after {
    margin: 10px auto 15px;
  }
`

const EachServiceContainer = styled.div`
  & p {
    ${tw`text-sm text-center`};
    color: #666;
  }

  & p:not(:last-child) {
    ${tw`mb-4`}
  }

  &:not(:last-child) {
    ${tw`mb-8`}
  }

  @media ${props => props.theme.screens.lg} {
    ${tw`mb-0 max-w-sm`}
  }
`

const ImageContainer = styled.div`
  padding: 15px;
  border: 1px solid #dcdcdc;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  ${tw`mx-auto flex items-center justify-center mb-4`}
`

const StyledImage = styled(GatsbyImage)`
  width: 35px;
`

const EachService = ({ service }) => {
  console.log(service)
  return (
    <EachServiceContainer>
      <ImageContainer>
        <StyledImage
          fluid={service.serviceIcon.localFile.childImageSharp.fluid}
          alt={service.serviceIcon.altText}
        />
      </ImageContainer>

      <StyledTitleWithUnderline color="#121212" position="center">
        {service.service}
      </StyledTitleWithUnderline>
      <div dangerouslySetInnerHTML={{ __html: service.serviceContent }} />
    </EachServiceContainer>
  )
}

EachService.propTypes = {
  service: PropTypes.object.isRequired,
}

export default EachService
