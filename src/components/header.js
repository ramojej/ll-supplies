import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Menu from "./Menu"
import Container from "./Container"
import Logo from "./Logo"
import { MenuToggle, MenuToggleContainer } from "./MobileMenu/MenuToggle"
import MobileMenu from "./MobileMenu/MobileMenu"
import tw, { styled } from "twin.macro"

const OuterHeaderContainer = styled.div`
  ${tw`bg-red-500`};
  position: ${props => (props.uri === "/" ? "absolute" : "static")};
  width: 100%;
  top: 0;
`
const InnerHeaderContainer = styled.div`
  ${tw`flex items-center`}
`

const HeaderRight = styled.div`
  ${tw`ml-auto flex`}
`

const LogoContainer = styled.div`
  width: 200px;
`

const Header = ({ uri }) => {
  const [isOpen, toggleOpen] = useState(false)
  const toggleMobileMenu = () => {
    toggleOpen(!isOpen)
  }
  return (
    <OuterHeaderContainer uri={uri}>
      <Container>
        <InnerHeaderContainer>
          <Link to="/">
            <LogoContainer>
              <Logo />
            </LogoContainer>
          </Link>

          <HeaderRight>
            <Menu />
            <MenuToggleContainer>
              <MenuToggle toggleMobileMenu={toggleMobileMenu} />
            </MenuToggleContainer>
          </HeaderRight>
        </InnerHeaderContainer>
      </Container>
      <MobileMenu toggleMobileMenu={toggleMobileMenu} isOpen={isOpen} />
    </OuterHeaderContainer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
