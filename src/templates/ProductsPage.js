import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container } from "../components/styles/Styles"
import ProductBanner from "../components/Products/ProductBanner"
import ProductMenu from "../components/Products/ProductMenu"
import AllProducts from "../components/Products/AllProducts"
import OrangeFooter from "../components/OrangeFooter"
import { StyledBoxedTitle } from "./Services"
import tw, { styled } from "twin.macro"

export const ContentContainer = styled.div`
  ${tw`text-center py-8 hidden`}
  p {
    color: #666;
    ${tw`text-sm`}
  }

  p:not(:last-child) {
    ${tw`mb-4`}
  }
  @media ${props => props.theme.screens.lg} {
    ${tw`max-w-3xl mx-auto py-12`}
  }
`

const ProductsPage = ({ data: { wpPage } }) => {
  //console.log(wpPage)
  return (
    <Layout>
      <SEO
        title={wpPage.seo.title}
        description={wpPage.seo.metaDesc}
        image={
          wpPage.seo.opengraphImage
            ? wpPage.seo.opengraphImage.localFile.publicURL
            : null
        }
      />
      <ProductBanner page>
        <StyledBoxedTitle color="#fff">
          <h2>{wpPage.title}</h2>
        </StyledBoxedTitle>
      </ProductBanner>
      <ProductMenu />
      <Container>
        <ContentContainer>
          <div dangerouslySetInnerHTML={{ __html: wpPage.content }} />
        </ContentContainer>
        <AllProducts />
      </Container>
      <OrangeFooter />
    </Layout>
  )
}

export const query = graphql`
  query ProductsPage($id: String!) {
    wpPage(id: { eq: $id }) {
      content
      title
      seo {
        metaDesc
        title
        opengraphImage {
          localFile {
            publicURL
          }
        }
      }
    }
  }
`

export default ProductsPage
