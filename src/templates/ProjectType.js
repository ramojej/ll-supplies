import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProductBanner from "../components/Products/ProductBanner"
import ProductMenu from "../components/Products/ProductMenu"
import { Container } from "../components/styles/Styles"
import RespGallery from "../components/Projects/RespGallery"
import SEO from "../components/seo"
import { StyledBoxedTitle } from "./Services"

const ProjectType = ({ data: { allWpProject } }) => {
  //console.log(allWpProject)
  return (
    <Layout>
      <SEO
        title={`${allWpProject.nodes[0].projectsCustomFields.projectType} - L&L Supplies`}
      />
      <ProductBanner page="project">
        <StyledBoxedTitle color="#fff">
          <h2>Projects</h2>
        </StyledBoxedTitle>
      </ProductBanner>
      <ProductMenu menu="project" />
      {allWpProject.nodes.length > 0 ? (
        <RespGallery nodes={allWpProject} />
      ) : (
        <Container>Content coming soon</Container>
      )}
    </Layout>
  )
}

export const query = graphql`
  query($projectType: String!) {
    allWpProject(
      filter: { projectsCustomFields: { projectType: { eq: $projectType } } }
    ) {
      nodes {
        title
        slug
        projectsCustomFields {
          subTitle
          projectType
        }
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
      }
    }
  }
`

export default ProjectType
