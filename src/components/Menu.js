import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import UniversalLink from "../utils/UniversalLink"
import { flatListToHierarchical } from "../utils/flastListToHeirarchical"
import { FiChevronDown } from "react-icons/fi"
import tw, { styled } from "twin.macro"

const Nav = styled.nav`
  ${tw`hidden`};

  @media ${props => props.theme.screens.lg} {
    ${tw`block`}

    ul {
      ${tw`list-none flex`};
      padding-inline-start: 0;
    }
  }
`
const MainLI = styled.li`
  ${tw`relative`};

  &:not(:last-child) {
    ${tw`mr-8`}
  }

  ul {
    ${tw`hidden absolute`}
  }

  &:hover {
    ul {
      ${tw`block bg-gray-700`}
    }
  }

  a {
    ${tw`no-underline text-white uppercase`}
  }
`

const Menu = () => {
  const { wpMenu } = useStaticQuery(graphql`
    {
      wpMenu(slug: { eq: "gatsby-primary-menu" }) {
        name
        menuItems {
          nodes {
            key: id
            title: label
            path
            parentId
            url
            connectedNode {
              node {
                uri
              }
            }
          }
        }
      }
    }
  `)

  const headerMenu = flatListToHierarchical(wpMenu.menuItems.nodes)

  //console.log(headerMenu)

  return (
    <Nav>
      <ul>
        {headerMenu.map(menuItem => {
          const path =
            menuItem.connectedNode !== null
              ? menuItem.connectedNode.node.uri
              : menuItem.url

          //console.log(menuItem)
          return (
            <MainLI
              key={menuItem.key}
              className={menuItem.children.length > 0 ? "has-submenu" : "menu"}
            >
              <UniversalLink to={path} activeClassName="active">
                {menuItem.title}{" "}
              </UniversalLink>
              {menuItem.children.length > 0 && <FiChevronDown />}

              {menuItem.children.length > 0 && (
                <ul className="submenu">
                  {menuItem.children.map(subItem => {
                    //console.log(subItem)
                    return (
                      <li key={subItem.key}>
                        <UniversalLink
                          to={
                            subItem.connectedNode
                              ? subItem.connectedNode.node.uri
                              : subItem.url
                          }
                        >
                          {subItem.title}
                        </UniversalLink>
                      </li>
                    )
                  })}
                </ul>
              )}
            </MainLI>
          )
        })}
      </ul>
    </Nav>
  )
}

export default Menu
