import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Menu from "./Menu"
import tw, { styled } from "twin.macro"

const HeaderRight = styled.div`
  ${tw`flex bg-red-500`}
`

const Header = ({ siteTitle }) => (
  <HeaderRight
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <Menu />
    </div>
  </HeaderRight>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
