import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Post = ({
  data: {
    wpPost: { title, content },
  },
}) => {
  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      id
      slug
      title
      content
      status
      id
    }
  }
`

export default Post
