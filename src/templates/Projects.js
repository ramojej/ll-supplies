import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProductBanner from "../components/Products/ProductBanner"
import ProductMenu from "../components/Products/ProductMenu"
import { StyledBoxedTitle } from "./Services"
import AllProjects from "../components/Projects/AllProjects"

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
      <AllProjects />
    </Layout>
  )
}

export const query = graphql`
  query Projects($id: String!) {
    wpPage(id: { eq: $id }) {
      title
    }
  }
`

export default Projects
