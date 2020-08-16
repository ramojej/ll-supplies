import React from "react"
import PropTypes from "prop-types"
import BurgerSeparator from "../../BurgerSeparator"
import tw, { styled } from "twin.macro"

const TestiContainer = styled.div`
  ${tw`text-left relative`};

  &:after {
    content: "X";
    position: absolute;
    display: block;
    font-weight: bold;
    font-size: 12rem;
    opacity: 0.3;
    z-index: -1;
    top: 0;
    right: 2rem;
    color: #e2e2e2;
    line-height: 12rem;
  }

  @media ${props => props.theme.screens.lg} {
    &:after {
      right: 4rem;
    }
  }
`

const Name = styled.h3`
  ${tw`text-lg font-bold uppercase tracking-wide`};

  @media ${props => props.theme.screens.lg} {
    ${tw`text-2xl`}
  }
`
const MessageContainer = styled.div`
  ${tw`mt-6`}
  p {
    ${tw`text-sm`};
    color: #666;
  }

  p:not(:last-child) {
    ${tw`mb-4`}
  }

  @media ${props => props.theme.screens.lg} {
    ${tw`max-w-md`}
  }
`

const SeparatorContainer = styled.div`
  max-width: 35px;
  ${tw`mt-6`}
`

const Position = styled.h4`
  ${tw`text-xs font-hairline tracking-wider uppercase border border-black inline px-2 py-1`}
`

const EachTestimonial = ({ node }) => {
  //console.log(node)
  return (
    <TestiContainer>
      <Name>{node.name}</Name>
      <Position>{node.titleJob}</Position>
      <MessageContainer>
        <div dangerouslySetInnerHTML={{ __html: node.message }} />
      </MessageContainer>
      <SeparatorContainer>
        <BurgerSeparator />
      </SeparatorContainer>
    </TestiContainer>
  )
}

EachTestimonial.propTypes = {
  node: PropTypes.object.isRequired,
}

export default EachTestimonial
