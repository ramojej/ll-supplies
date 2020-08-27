import React from "react"
import PropTypes from "prop-types"
import BackgroundImage from "gatsby-background-image"
import { Link } from "gatsby"
import tw, { styled } from "twin.macro"

const StyledBackgroundImage = styled(BackgroundImage)`
  ${tw`flex flex-col justify-end`};
  height: 18rem;

  @media ${props => props.theme.screens.lg} {
    height: 24rem;
  }
`

const InnerContainer = styled.div`
  ${tw`p-4 flex items-center justify-between`};
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));

  @media ${props => props.theme.screens.lg} {
    ${tw`p-8`}
  }
`

const H3 = styled.h3`
  ${tw`text-white text-lg uppercase font-semibold`};

  @media ${props => props.theme.screens.lg} {
    ${tw`text-xl`}
  }
`

const Subtitle = styled.h4`
  ${tw`text-sm`};
  color: rgba(255, 255, 255, 0.8);
`

export const StyledButton = styled.button`
  ${tw`uppercase text-white text-sm relative flex items-center justify-center`};
  background: ${props => props.theme.colors.black};
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  padding: 8px 10px;
  min-height: 41px;
  max-width: ${props => (props.maxWidth ? "150px" : "auto")};
  margin: ${props => (props.maxWidth ? "10px auto" : 0)};
  transition: all 0.2s ease;

  &:active {
    ${tw`outline-none`};
    background: ${props => props.theme.colors.darkGray};
  }

  &:focus {
    ${tw`shadow-outline`}
  }

  @media ${props => props.theme.screens.lg} {
    background: transparent;

    &:before,
    &:after {
      transition: all 0.2s ease 0s;
      content: "";
      position: absolute;
      width: 2px;
      height: 100%;
      top: 0;
      background: white;
    }

    &:before {
      left: -8px;
    }

    &:after {
      right: -8px;
    }

    &:hover {
      background: ${props => props.theme.colors.black};
      border: none;

      &::before,
      &::after {
        background: ${props => props.theme.colors.black};
      }

      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }
    }
  }
`

const SlideItem = ({ node }) => {
  //console.log(node)
  return (
    <StyledBackgroundImage
      fluid={node.featuredImage.node.localFile.childImageSharp.fluid}
    >
      <InnerContainer>
        <div>
          <H3>{`${
            node.title.length > 17
              ? `${node.title.substring(0, 10)}...`
              : node.title
          }`}</H3>
          <Subtitle>{node.projectsCustomFields.subTitle}</Subtitle>
        </div>
        <StyledButton>
          <Link to={`projects/${node.slug}/`}>Learn More</Link>
        </StyledButton>
      </InnerContainer>
    </StyledBackgroundImage>
  )
}

SlideItem.propTypes = {
  node: PropTypes.object.isRequired,
}

export default SlideItem
