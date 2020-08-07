import React from "react"
import PropTypes from "prop-types"
import tw, { styled } from "twin.macro"

const StyledContainer = styled.div`
  ${tw`mx-auto px-4 relative`};
  max-width: 74rem;
`

const Container = ({ children, mobileContainer }) => {
  return (
    <StyledContainer mobileContainer={mobileContainer}>
      {children}
    </StyledContainer>
  )
}

export default Container

Container.propTypes = {
  children: PropTypes.node.isRequired,
}
