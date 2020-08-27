import React from "react"
import { graphql } from "gatsby"
import Hero from "../components/Home/Hero/Hero"
import SEO from "../components/seo"
import WhatWeDo from "../components/Home/WhatWeDo/WhatWeDo"
import Quality from "../components/Home/Quality/Quality"
import Portfolio from "../components/Home/Portfolio/Portfolio"
import Accreditations from "../components/Home/Accred/Accreditations"
import Services from "../components/Home/Services/Services"
import Testimonials from "../components/Home/Testimonials/Testimonials"
import Layout from "../components/layout"

const HomePage = ({ data: { wpPage } }) => {
  return (
    <Layout uri={wpPage.uri}>
      <SEO
        title={wpPage.seo.title}
        description={wpPage.seo.metaDesc}
        image={
          wpPage.seo.opengraphImage
            ? wpPage.seo.opengraphImage.localFile.publicURL
            : null
        }
      />
      <Hero id={wpPage.id} blocks={wpPage.blocks} />
      <WhatWeDo blocks={wpPage.blocks} />
      <Quality blocks={wpPage.blocks} />
      <Portfolio />
      <Accreditations blocks={wpPage.blocks} />
      <Services blocks={wpPage.blocks} />
      <Testimonials blocks={wpPage.blocks} />
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
        ... on WpAcfTestimonialsBlock {
          blockTestimonialFields {
            title
            testimonials {
              message
              name
              titleJob
            }
          }
        }
      }
    }
  }
`

export default HomePage
