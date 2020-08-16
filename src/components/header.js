import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Menu from "./Menu"
//import Container from "./Container"
import { Container } from "./styles/Styles"
import Logo from "./Logo"
import { MenuToggle, MenuToggleContainer } from "./MobileMenu/MenuToggle"
import MobileMenu from "./MobileMenu/MobileMenu"
import tw, { styled } from "twin.macro"

const OuterHeaderContainer = styled.div`
  ${tw`z-20 top-0 w-full py-4`};

  position: ${props => (props.uri === "/" ? "absolute" : "static")};
  background: ${props =>
    props.uri === "/" ? "transparent" : props.theme.colors.black};

  @media ${props => props.theme.screens.lg} {
    padding: 2rem 0;
  }
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
    <OuterHeaderContainer uri={uri} id="header">
      <Container>
        <InnerHeaderContainer>
          <Link to="/">
            <LogoContainer>
              <Logo />
            </LogoContainer>
          </Link>

          <HeaderRight>
            <Menu uri={uri} />
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
