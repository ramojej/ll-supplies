import React from "react"
import PropTypes from "prop-types"
import tw, { styled } from "twin.macro"

const StyledContainer = styled.div`
  ${tw`max-w-5xl mx-auto px-4 relative`};
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
