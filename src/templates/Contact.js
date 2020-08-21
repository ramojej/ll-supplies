import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {
  AboutContainer,
  ContentContainer,
  SeparatorContainer,
  StyledBoxedTitle,
} from "./About"
import { Container } from "../components/styles/Styles"
import Separator from "../components/Separator"
import Form from "../components/Contact/Form"
import ContactInfo from "../components/Contact/ContactInfo"
import tw, { styled } from "twin.macro"

const StyledAboutContainer = styled(AboutContainer)`
  ${tw`py-6`};

  @media ${props => props.theme.screens.lg} {
    ${tw`py-24`}
  }
`

const StyledContentContainer = styled(ContentContainer)`
  ${tw`max-w-lg`}
`

const GridContainer = styled.div`
  ${tw`mt-12`};

  @media ${props => props.theme.screens.lg} {
    ${tw`grid grid-cols-2 gap-24`}
  }
`

const DetailsContainer = styled.div`
  h2 {
    ${tw`font-bold text-lg uppercase mb-4`}
  }
`

const Contact = ({ data: { wpPage } }) => {
  //console.log(wpPage)

  const { blockContactPageFields } = wpPage.blocks.find(
    contact => contact.blockContactPageFields
  )

  //console.log(blockContactPageFields)
  return (
    <Layout>
      <StyledAboutContainer>
        <StyledBoxedTitle>
          <h2>{wpPage.title}</h2>
        </StyledBoxedTitle>
        <StyledContentContainer>
          <div dangerouslySetInnerHTML={{ __html: wpPage.content }} />
        </StyledContentContainer>
        <SeparatorContainer>
          <Separator />
        </SeparatorContainer>
        <Container>
          <GridContainer>
            <DetailsContainer>
              <h2>{blockContactPageFields.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: blockContactPageFields.content,
                }}
              />
              <ContactInfo info={blockContactPageFields} />
            </DetailsContainer>
            <Form />
          </GridContainer>
        </Container>
      </StyledAboutContainer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      blocks {
        ... on WpAcfContactBlock {
          blockContactPageFields {
            content
            title
            emailAddress
            facebookLink
            hoursOfOperation
            phoneNumber
            address
          }
        }
      }
    }
  }
`

export default Contact
