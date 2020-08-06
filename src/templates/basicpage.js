import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const page = ({
  data: {
    wpPage: { title, content, uri, id },
  },
}) => {
  return (
    <Layout uri={uri}>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <p>{id}</p>
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
