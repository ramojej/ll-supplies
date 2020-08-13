import React from "react"
import { graphql } from "gatsby"
import Hero from "../components/Home/Hero/Hero"
import WhatWeDo from "../components/Home/WhatWeDo/WhatWeDo"
import Quality from "../components/Home/Quality/Quality"
import Portfolio from "../components/Home/Portfolio/Portfolio"
import Accreditations from "../components/Home/Accred/Accreditations"
import Services from "../components/Home/Services/Services"
import Layout from "../components/layout"

const HomePage = ({
  data: {
    wpPage: { uri, id, blocks },
  },
}) => {
  return (
    <Layout uri={uri}>
      <Hero id={id} blocks={blocks} />
      <WhatWeDo blocks={blocks} />
      <Quality blocks={blocks} />
      <Portfolio />
      <Accreditations blocks={blocks} />
      <Services blocks={blocks} />
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
                  fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
        ... on WpAcfWhatwedoBlock {
          blockWhatWeDoFields {
            title
            whatWeDo
          }
        }
        ... on WpAcfQualityBlock {
          blockQualityFields {
            content
            title
            backgroundImage {
              localFile {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
        ... on WpAcfAccreditationsBlock {
          blockAccredFields {
            title
            logos {
              logo {
                altText
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 120) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
        ... on WpAcfServicesBlock {
          blockServicesFields {
            content
            title
            services {
              service
              serviceContent
              serviceIcon {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 57) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                altText
              }
            }
          }
        }
      }
    }
  }
`

export default HomePage
