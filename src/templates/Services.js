import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { BoxedTitle } from "../components/styles/Styles"
import { TitleWithUnderLine } from "../components/styles/Title"
import BackgroundImage from "gatsby-background-image"
import tw, { styled } from "twin.macro"

const ServicesPageContainer = styled.div`
  p {
    ${tw`text-sm`};
    color: #666;
  }

  p:not(:last-child) {
    ${tw`mb-4`}
  }
`

const BGContainer = styled(BackgroundImage)`
  height: 200px;

  ${tw`flex items-center justify-center`};

  @media ${props => props.theme.screens.lg} {
    height: 300px;
  }
`

const ServicesContentContainer = styled.div`
  ${tw`px-4 py-8`};
  text-align: ${props => (props.align === "center" ? "center" : "left")};

  @media ${props => props.theme.screens.lg} {
    ${tw`px-16 max-w-2xl`}
  }
`

const StyledBoxedTitle = styled(BoxedTitle)`
  border-width: 3px;

  h2 {
    ${tw`tracking-widest`}
  }
  @media ${props => props.theme.screens.lg} {
    width: 350px;
  }
`

const BannerContentContainer = styled.div`
  @media ${props => props.theme.screens.lg} {
    ${tw`grid grid-cols-2 items-center`};
  }
`

const Services = ({ data: { wpPage } }) => {
  //console.log(wpPage)

  const { blockServicesPageFields } = wpPage.blocks.find(
    service => service.blockServicesPageFields
  )

  console.log(blockServicesPageFields)

  return (
    <Layout>
      <ServicesPageContainer>
        <BannerContentContainer>
          <BGContainer
            fluid={wpPage.featuredImage.node.localFile.childImageSharp.fluid}
            alt={wpPage.featuredImage.node.altText}
          >
            <StyledBoxedTitle color="#fff">
              <h2>{wpPage.title}</h2>
            </StyledBoxedTitle>
          </BGContainer>
          <ServicesContentContainer>
            <div dangerouslySetInnerHTML={{ __html: wpPage.content }} />
          </ServicesContentContainer>
        </BannerContentContainer>
        {blockServicesPageFields.services.map((service, index) => (
          <BannerContentContainer key={index}>
            {index % 2 === 1 ? (
              <>
                <BGContainer
                  alt={service.image.altText}
                  fluid={service.image.localFile.childImageSharp.fluid}
                />

                <ServicesContentContainer align="center">
                  <TitleWithUnderLine color="#121212" position="center">
                    {service.title}
                  </TitleWithUnderLine>
                  <div dangerouslySetInnerHTML={{ __html: service.content }} />
                </ServicesContentContainer>
              </>
            ) : (
              <>
                <ServicesContentContainer align="center">
                  <TitleWithUnderLine color="#121212" position="center">
                    {service.title}
                  </TitleWithUnderLine>
                  <div dangerouslySetInnerHTML={{ __html: service.content }} />
                </ServicesContentContainer>
                <BGContainer
                  alt={service.image.altText}
                  fluid={service.image.localFile.childImageSharp.fluid}
                />
              </>
            )}
          </BannerContentContainer>
        ))}
      </ServicesPageContainer>
    </Layout>
  )
}

export const query = graphql`
  query ServicesPage($id: String!) {
    wpPage(id: { eq: $id }) {
      title
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
      content
      blocks {
        ... on WpAcfServicespageBlock {
          blockServicesPageFields {
            services {
              title
              content
              image {
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
    }
  }
`

export default Services
