import { Link as GatsbyLink } from "gatsby"
import React from "react"
import { styled } from "twin.macro"

export const StyledLink = styled(GatsbyLink)`
  &.active {
    color: red;
    text-decoration: underline;
  }
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
    <a href={to} {...other}>
      {children}
    </a>
  )
}
export default UniversalLink
