import { Link as GatsbyLink } from "gatsby"
import React from "react"
import tw, { styled } from "twin.macro"

export const StyledLink = styled(GatsbyLink)`
  ${tw`flex items-center`};

  &.active {
    color: red;
    text-decoration: underline;
  }

  &.active + svg {
    stroke: red;
  }

  @media ${props => props.theme.screens.lg} {
    ${tw`block`}
  }
`

const StyledA = styled.a`
  ${tw`flex items-center`};
`

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const UniversalLink = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  ...other
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)
  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <StyledLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </StyledLink>
    )
  }
  return (
    <StyledA href={to} {...other}>
      {children}
    </StyledA>
  )
}
export default UniversalLink
