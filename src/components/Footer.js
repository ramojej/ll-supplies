import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Logo from "./Logo"
import { FiChevronsUp } from "react-icons/fi"
import { FaFacebookF, FaCalculator } from "react-icons/fa"
import { IoIosClose } from "react-icons/io"
import tw, { styled } from "twin.macro"
import CalcuForm from "../components/Contact/CalcuForm"
import Modal from "react-modal"
import scrollTo from "gatsby-plugin-smoothscroll"

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "3",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const StyledClose = styled(IoIosClose)`
  ${tw`absolute hover:cursor-pointer`};
  right: 15px;
  top: 10px;
  font-size: 24px;
`

const UpperFooter = styled.div`
  ${tw`py-4 text-center`}
  background: ${props => props.theme.colors.gray};

  a {
    ${tw`text-sm`}
    color: #b5b5b5;
  }
`

const LowerFooter = styled.div`
  ${tw`text-center py-4 text-sm`};
  background: ${props => props.theme.colors.darkGray};
  color: #b5b5b5;
`

const LogoContainer = styled.div`
  max-width: 200px;
  ${tw`mx-auto`}
`

const BackToTop = styled.button`
  ${tw`active:outline-none focus:outline-none flex items-center justify-center flex-col text-white uppercase text-sm mx-auto`};
  svg {
    stroke: #fff;
    ${tw`text-center mb-2`}
  }
`

const ModalButton = styled.button`
  ${tw`text-white flex items-center justify-center fixed rounded-full focus:outline-none active:shadow-outline`}
  background: ${props => props.theme.colors.gray};
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  transition: all 0.3s;
  z-index: 2;

  &:hover {
    background: ${props => props.theme.colors.black}
  }
`

export const Facebook = styled.a`
  ${tw`flex items-center justify-center my-4`};

  justify-content: ${props => (props.align === "left" ? "start" : "center")};

  svg {
    fill: #fff;
    background: ${props => props.theme.colors.gray};
    ${tw`p-2 text-3xl mr-4`};
  }
`

const Footer = () => {
  const {
    wp: {
      siteGeneralSettings: { customSiteSettingFields },
    },
  } = useStaticQuery(query)
  //console.log(customSiteSettingFields)

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  return (
    <>
      <footer>
        <UpperFooter>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </UpperFooter>
        <LowerFooter>
          <BackToTop onClick={() => scrollTo("#header")}>
            <FiChevronsUp />
            Back to Top
          </BackToTop>
          <Facebook
            target="_blank"
            rel="noopener"
            href={customSiteSettingFields.facebookLink}
          >
            <FaFacebookF />
            Facebook Page
          </Facebook>
          <p>
            Copyright © {new Date().getFullYear()}.{" "}
            {customSiteSettingFields.companyName} All rights reserved.
          </p>
        </LowerFooter>
        <ModalButton onClick={openModal}>
          <FaCalculator />
        </ModalButton>
        <Modal
          isOpen={modalIsOpen}
          style={modalStyles}
          contentLabel="Calculator Modal"
          onRequestClose={closeModal}
          shouldCloseOnEsc={true}
        >
          <StyledClose onClick={closeModal} />
          <CalcuForm />
        </Modal>
      </footer>
    </>
  )
}

export const query = graphql`
  {
    wp {
      siteGeneralSettings {
        customSiteSettingFields {
          facebookLink
          companyName
        }
      }
    }
  }
`

export default Footer
