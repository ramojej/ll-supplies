import { Link as GatsbyLink } from "gatsby"
import React from "react"
import tw, { styled } from "twin.macro"

export const StyledLink = styled(GatsbyLink)`
  ${tw`flex items-center font-semibold`};

  color: ${props => props.theme.colors.lightGray};

  &.active {
    color: #fff;
  }

  &.active + svg {
    stroke: #fff;
  }

  @media ${props => props.theme.screens.lg} {
    ${tw`block`};

    color: ${props =>
      props.uri === "/" ? "#fff" : props.theme.colors.lightGray};

    &.active {
      color: ${props => (props.uri === "/" ? props.theme.colors.red : "#fff")};
    }

    &.active:after {
      display: ${props => (props.uri === "/" ? "block" : "none")};
      content: "";
      height: 2px;
      width: 100%;
      background: ${props => props.theme.colors.red};
      position: absolute;
      bottom: -5px;
    }

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`
//if not a gatsby link we style this with StyledA
const StyledA = styled.a`
  ${tw`flex items-center font-semibold`};
  color: ${props =>
    props.uri === "/" ? "#fff" : props.theme.colors.lightGray};
  &:hover {
    color: rgba(255, 255, 255, 0.8);
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
  uri,
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
        uri={uri}
        {...other}
      >
        {children}
      </StyledLink>
    )
  }
  return (
    <StyledA href={to} {...other} uri={uri}>
      {children}
    </StyledA>
  )
}
export default UniversalLink
