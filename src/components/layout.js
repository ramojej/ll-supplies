/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import tw, { styled } from "twin.macro"
import Header from "./header"

const StyledLayout = styled.div`
  ${tw`flex flex-col`};

  footer {
    ${tw`mt-auto`}
  }
`

const Layout = ({ children, uri }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <StyledLayout>
      <Header siteTitle={data.site.siteMetadata.title} uri={uri} />

      {children}
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </StyledLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  uri: PropTypes.string,
}

export default Layout
