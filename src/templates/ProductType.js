import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProductBanner from "../components/Products/ProductBanner"
import ProductMenu from "../components/Products/ProductMenu"
import OrangeFooter from "../components/OrangeFooter"
import { Container } from "../components/styles/Styles"
import { StyledBoxedTitle } from "./Services"
import { Gallery, StyledBG } from "../components/Products/AllProducts"

const ProductType = ({ data }) => {
  console.log(data)
  const { allWpProduct } = data
  const { placeholderImage } = data
  return (
    <Layout>
      <ProductBanner>
        <StyledBoxedTitle color="#fff">
          <h2>Products</h2>
        </StyledBoxedTitle>
      </ProductBanner>
      <ProductMenu />
      <Container>
        <Gallery margintop="large">
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
      </Container>
      <OrangeFooter />
    </Layout>
  )
}

export const query = graphql`
  query($productType: String!) {
    allWpProduct(
      filter: { productsACFields: { productType: { eq: $productType } } }
    ) {
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

export default ProductType
