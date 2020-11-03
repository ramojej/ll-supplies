import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { Link } from "gatsby"
import { StyledButton } from "../Home/Portfolio/SlideItem"
import tw, { styled } from "twin.macro"

const Abs = styled.div`
  ${tw`absolute w-full z-10 text-white hidden`};

  h2 {
    ${tw`uppercase font-bold text-lg`}
  }
  h3 {
    color: #dadada;
    display: none;
  }
`

const EachImageContainer = styled(Link)`
  ${tw`relative grid items-center text-center`};

  &:after {
    content: "";
    display: none;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    transition: all 0.2s ease;
  }

  &:hover {
    &:after,
    div {
      display: block;
    }
  }
`

const RespGallery = ({ nodes }) => {
  //console.log(nodes)
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 900: 3 }}>
      <Masonry>
        {nodes.nodes.map(image => (
          <EachImageContainer key={image.slug} to={`/projects/${image.slug}/`}>
            <Img
              fluid={image.featuredImage.node.localFile.childImageSharp.fluid}
              alt={
                image.featuredImage.node.altText
                  ? image.featuredImage.node.altText
                  : "Featured Image"
              }
            />
            <Abs>
              <h2>{image.title}</h2>
              <h3>{image.projectsCustomFields.subTitle}</h3>
              <StyledButton to={`/projects/${image.slug}/`} maxWidth>
                Learn More
              </StyledButton>
            </Abs>
          </EachImageContainer>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

RespGallery.propTypes = {
  nodes: PropTypes.object.isRequired,
}

export default RespGallery
