import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { OuterContainer, Container } from "../components/styles/Styles"
import tw, { styled } from "twin.macro"

const PrivacyPolicy = styled.div`
  h1,
  h2,
  h3,
  h4 {
    ${tw`font-bold mb-4`}
  }

  h1 {
    ${tw`text-2xl`}
  }

  h2 {
    ${tw`text-xl`}
  }

  h3 {
    ${tw`text-lg`}
  }

  p {
    color: #666;
  }

  p:not(:last-child) {
    ${tw`mb-4`}
  }
`

const page = ({
  data: {
    wpPage: { title, content, uri, seo },
  },
}) => {
  return (
    <Layout uri={uri}>
      <SEO
        title={seo.title}
        description={seo.metaDesc}
        image={
          seo.opengraphImage ? seo.opengraphImage.localFile.publicURL : null
        }
      />
      <OuterContainer>
        <Container>
          <PrivacyPolicy>
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </PrivacyPolicy>
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

export default page
