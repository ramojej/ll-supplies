import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Container } from "../components/styles/Styles"
import { ContentContainer } from "./ProductsPage"
import ProductBanner from "../components/Products/ProductBanner"
import ProductMenu from "../components/Products/ProductMenu"
import { StyledBoxedTitle } from "./Services"

const Projects = ({ data: { wpPage } }) => {
  //console.log(wpPage)
  return (
    <Layout>
      <ProductBanner page="project">
        <StyledBoxedTitle color="#fff">
          <h2>{wpPage.title}</h2>
        </StyledBoxedTitle>
      </ProductBanner>
      <ProductMenu menu="project" />
      <Container>
        <ContentContainer>
          <div dangerouslySetInnerHTML={{ __html: wpPage.content }} />
        </ContentContainer>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query Projects($id: String!) {
    wpPage(id: { eq: $id }) {
      content
      title
    }
  }
`

export default Projects
