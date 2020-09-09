import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Logo = ({ color }) => {
  //console.log(color)
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo-red-a.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      whiteRed: file(relativePath: { eq: "logo-red-b.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <Img
      fluid={
        color === "white"
          ? data.whiteRed.childImageSharp.fluid
          : data.placeholderImage.childImageSharp.fluid
      }
      alt="L&amp;L Supplies logo"
    />
  )
}

export default Logo
