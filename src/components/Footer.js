import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Logo from "./Logo"
import { FiChevronsUp } from "react-icons/fi"
import { FaFacebookF } from "react-icons/fa"
import tw, { styled } from "twin.macro"
import scrollTo from "gatsby-plugin-smoothscroll"

const UpperFooter = styled.div`
  ${tw`py-4 text-center`}
  background: ${props => props.theme.colors.gray};

  a {
    ${tw`text-sm`}
    color: #666;
  }
`

const LowerFooter = styled.div`
  ${tw`text-center py-4 text-sm`};
  background: ${props => props.theme.colors.darkGray};
  color: #666;
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

const Facebook = styled.a`
  ${tw`flex items-center justify-center my-4`};

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
  console.log(customSiteSettingFields)
  return (
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
    </footer>
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
