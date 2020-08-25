import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BG from "gatsby-background-image"
import tw, { styled } from "twin.macro"

const StyledBG = styled(BG)`
  ${tw`py-16 flex items-center justify-center h-48`};

  @media ${props => props.theme.screens.lg} {
    ${tw`h-56`}
  }
`

const ProductBanner = ({ children, page }) => {
  //console.log(page)
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "banner-products.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      projectBanner: file(relativePath: { eq: "banner-proj.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <StyledBG
      fluid={
        page === "project"
          ? data.projectBanner.childImageSharp.fluid
          : data.placeholderImage.childImageSharp.fluid
      }
      alt="Page Banner"
    >
      {children}
    </StyledBG>
  )
}

export default ProductBanner
