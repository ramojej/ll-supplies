import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { BoxedTitle } from "../components/styles/Styles"
import { TitleWithUnderLine } from "../components/styles/Title"
import BackgroundImage from "gatsby-background-image"
import Separator from "../components/Separator"
import tw, { styled } from "twin.macro"

const AboutContainer = styled.div`
  ${tw`pt-6 text-sm`};

  p {
    color: #666;
  }

  p:not(:last-child) {
    ${tw`mb-4`}
  }

  @media ${props => props.theme.screens.lg} {
    ${tw`pt-24`}
  }
`

const SeparatorContainer = styled.div`
  max-width: 120px;
  ${tw`mx-auto my-8`}
`

const StyledBoxedTitle = styled(BoxedTitle)`
  ${tw`mb-12`}
  h2 {
    ${tw`tracking-widest`}
  }
`

const ContentContainer = styled.div`
  ${tw`max-w-3xl mx-auto mb-12 px-4`}
  p {
    ${tw`text-center`}
  }
`

const VMVContainer = styled.div`
  ${tw`my-8 px-4`};

  @media ${props => props.theme.screens.lg} {
    ${tw`max-w-5xl mx-auto grid grid-cols-3 gap-16 mt-16`}
  }
`

const EachVMV = styled.div`
  &:not(:last-child) {
    ${tw`mb-6`}
  }

  h2 {
    ${tw`uppercase font-bold text-xl tracking-wider mb-4`};
    color: ${props => props.theme.colors.black};
  }
`

const WhoWeAreContainer = styled.div`
  ${tw`mt-12`};

  &:not(:last-child) {
    border-top: 1px solid #dedede;
  }

  &:last-child {
    ${tw`mt-0`}
  }

  @media ${props => props.theme.screens.lg} {
    ${tw`grid grid-cols-2 items-center`};
  }
`

const BGContainer = styled(BackgroundImage)`
  height: 250px;

  @media ${props => props.theme.screens.lg} {
    height: 400px;
  }
`

const WhoAreContentContainer = styled.div`
  ${tw`px-4 py-8`};

  @media ${props => props.theme.screens.lg} {
    ${tw`px-16 max-w-2xl`}
  }
`

const About = ({ data: { wpPage } }) => {
  //console.log(wpPage)

  const { blockMissionFields } = wpPage.blocks.find(
    mission => mission.blockMissionFields
  )

  //console.log(blockMissionFields)
  return (
    <Layout>
      <AboutContainer>
        <StyledBoxedTitle>
          <h2>{wpPage.title}</h2>
        </StyledBoxedTitle>
        <ContentContainer>
          <div dangerouslySetInnerHTML={{ __html: wpPage.content }} />
        </ContentContainer>
        <SeparatorContainer>
          <Separator />
        </SeparatorContainer>
        <VMVContainer>
          {blockMissionFields.vmv.map((vision, index) => {
            return (
              <EachVMV key={index}>
                <h2>{vision.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: vision.content }} />
              </EachVMV>
            )
          })}
        </VMVContainer>
        <WhoWeAreContainer>
          <BGContainer
            fluid={
              blockMissionFields.groupContent.whoWeAreImage.localFile
                .childImageSharp.fluid
            }
            alt={blockMissionFields.groupContent.whoWeAreImage.altText}
          />
          <WhoAreContentContainer>
            <TitleWithUnderLine color="#121212">
              {blockMissionFields.groupContent.whoWeAreTitle}
            </TitleWithUnderLine>
            <div
              dangerouslySetInnerHTML={{
                __html: blockMissionFields.groupContent.whoWeAreContent,
              }}
            />
          </WhoAreContentContainer>
        </WhoWeAreContainer>
        <WhoWeAreContainer>
          <WhoAreContentContainer>
            <TitleWithUnderLine color="#121212">
              {blockMissionFields.groupContent.facilitiesTitle}
            </TitleWithUnderLine>
            <div
              dangerouslySetInnerHTML={{
                __html: blockMissionFields.groupContent.facilitiesContent,
              }}
            />
          </WhoAreContentContainer>
          <BGContainer
            fluid={
              blockMissionFields.groupContent.facilitiesImage.localFile
                .childImageSharp.fluid
            }
            alt={blockMissionFields.groupContent.facilitiesImage.altText}
          />
        </WhoWeAreContainer>
      </AboutContainer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      blocks {
        ... on WpAcfMissionvisionBlock {
          blockMissionFields {
            vmv {
              title
              content
            }
            groupContent {
              facilitiesContent
              facilitiesTitle
              fieldGroupName
              whoWeAreContent
              whoWeAreTitle
              whoWeAreImage {
                altText
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
              facilitiesImage {
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

export default About
