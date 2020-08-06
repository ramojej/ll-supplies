import React from "react"
import { graphql } from "gatsby"
import Hero from "../components/Home/Hero/Hero"
import Layout from "../components/layout"

const HomePage = ({
  data: {
    wpPage: { uri, id, blocks },
  },
}) => {
  return (
    <Layout uri={uri}>
      <Hero id={id} blocks={blocks} />
      <h1>This is home</h1>
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
      blocks {
        ... on WpAcfHeroBlock {
          blockHeroFields {
            heroText
            slogan
            heroImage {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default HomePage
