import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { OuterContainer, Container } from "../components/styles/Styles"

const page = ({
  data: {
    wpPage: { title, content, uri, id },
  },
}) => {
  return (
    <Layout uri={uri}>
      <OuterContainer>
        <Container>
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Container>
      </OuterContainer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      slug
      title
      content
      status
      uri
    }
  }
`

export default page
