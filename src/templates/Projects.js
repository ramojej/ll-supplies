import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductBanner from "../components/Products/ProductBanner"
import ProductMenu from "../components/Products/ProductMenu"
import { StyledBoxedTitle } from "./Services"
import AllProjects from "../components/Projects/AllProjects"

const Projects = ({ data: { wpPage } }) => {
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
      <ProductBanner page="project">
        <StyledBoxedTitle color="#fff">
          <h2>{wpPage.title}</h2>
        </StyledBoxedTitle>
      </ProductBanner>
      <ProductMenu menu="project" />
      <AllProjects />
    </Layout>
  )
}

export const query = graphql`
  query Projects($id: String!) {
    wpPage(id: { eq: $id }) {
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

export default Projects
