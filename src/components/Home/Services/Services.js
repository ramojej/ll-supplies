import React from "react"
import PropTypes from "prop-types"
import { BoxedTitle, OuterContainer, Container } from "../../styles/Styles"
import Separator from "../../Separator"
import EachService from "./EachService"
import tw, { styled } from "twin.macro"

const StyledOuterContainer = styled(OuterContainer)`
  overflow: hidden;
  @media ${props => props.theme.screens.lg} {
    ${tw`py-16`}
  }
`

const StyledBoxedTitle = styled(BoxedTitle)`
  ${tw`mb-8`}
`

const ServicesContent = styled.div`
  ${tw`max-w-3xl mx-auto`};

  p {
    color: #666;
    ${tw`text-sm text-center`}
  }

  p:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`

const ServicesFlexContainer = styled.div`
  @media ${props => props.theme.screens.lg} {
    ${tw`flex max-w-4xl justify-between mt-8 mx-auto`}
  }
`

const SeparatorContainer = styled.div`
  max-width: 170px;
  ${tw`mx-auto my-8`}
`

const Services = ({ blocks }) => {
  const { blockServicesFields } = blocks.find(
    service => service.blockServicesFields
  )
  //console.log(blockServicesFields.services)
  return (
    <StyledOuterContainer>
      <Container>
        <StyledBoxedTitle>
          <h2>{blockServicesFields.title}</h2>
        </StyledBoxedTitle>
        <ServicesContent>
          <div
            dangerouslySetInnerHTML={{ __html: blockServicesFields.content }}
          />
        </ServicesContent>
        <SeparatorContainer>
          <Separator />
        </SeparatorContainer>
        <ServicesFlexContainer>
          {blockServicesFields.services.length > 0
            ? blockServicesFields.services.map((service, index) => {
                return <EachService key={index} service={service} />
              })
            : "Content coming soon!"}
        </ServicesFlexContainer>
      </Container>
    </StyledOuterContainer>
  )
}

Services.propTypes = {
  blocks: PropTypes.array.isRequired,
}

export default Services
