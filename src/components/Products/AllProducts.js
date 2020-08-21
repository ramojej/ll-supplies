import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import BG from "gatsby-background-image"
import tw, { styled } from "twin.macro"

export const Gallery = styled.div`
  ${tw`relative grid grid-cols-1 gap-8 mb-16 w-full`};
  margin-top: ${props => (props.margintop === "large" ? "4rem" : "0.5rem")};
  min-width: 340px;

  @media ${props => props.theme.screens.sm} {
    ${tw`grid-cols-2`}
  }

  @media ${props => props.theme.screens.lg} {
    ${tw`grid-cols-3`}
  }
`

export const StyledBG = styled(BG)`
  width: 100%;
  height: 300px;

  ${tw`relative flex items-center justify-center flex-col`};

  div {
    ${tw`flex flex-col items-center justify-center text-white hidden z-20 relative h-full w-full`};

    &:after {
      content: "";
      display: block;
      background: rgba(0, 0, 0, 0.5);
      ${tw`absolute top-0 bottom-0 w-full`};
      z-index: -1;
    }

    h4 {
      ${tw`font-semibold text-xl uppercase`}
    }

    p {
      ${tw`capitalize`};
      color: #b5b5b5;
    }
  }

  &:hover {
    div {
      ${tw`flex`}
    }
  }

  @media ${props => props.theme.screens.md} {
    width: 250px;
    height: 200px;
  }

  @media ${props => props.theme.screens.xl} {
    width: 350px;
    height: 250px;
  }
`

const AllProducts = () => {
  const data = useStaticQuery(query)

  const { allWpProduct } = data
  const { placeholderImage } = data

  console.log(allWpProduct)
  //console.log(placeholderImage)
  return (
    <Gallery>
      {allWpProduct.nodes.map((product, index) => (
        <StyledBG
          key={index}
          fluid={
            product.featuredImage
              ? product.featuredImage.node.localFile.childImageSharp.fluid
              : placeholderImage.childImageSharp.fluid
          }
        >
          <div>
            <h4>{product.title}</h4>
            <p>{product.productsACFields.productType}</p>
          </div>
        </StyledBG>
      ))}
    </Gallery>
  )
}

export const query = graphql`
  {
    allWpProduct {
      nodes {
        title
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        productsACFields {
          productType
        }
      }
    }
    placeholderImage: file(relativePath: { eq: "defaultfeatured.jpeg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default AllProducts
