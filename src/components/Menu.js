import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import UniversalLink from "../utils/UniversalLink"
import { flatListToHierarchical } from "../utils/flastListToHeirarchical"
import { FiChevronDown } from "react-icons/fi"
import tw, { styled } from "twin.macro"
import he from "he"

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
  ${tw`relative flex items-center`};

  &:not(:last-child) {
    ${tw`mr-8`}
  }

  svg {
    stroke: ${props =>
      props.uri === "/" ? "#fff" : props.theme.colors.lightGray};
    margin-left: 3px;
  }

  a {
    ${tw`no-underline uppercase focus:shadow-outline focus:outline-none active:shadow-none text-sm`};
    font-family: ${props => props.theme.fonts.main};
  }

  & ul {
    ${tw`hidden absolute`};

    & a,
    & a:active {
      color: rgba(255, 255, 255, 0.7);
    }

    & a.active:after {
      display: none !important;
    }

    a:hover {
      color: #fff;
    }
  }

  &:hover {
    ul {
      ${tw`block bg-gray-700 p-4`};
      top: 20px;
      min-width: 150px;
    }

    svg {
      stroke: #fff;
    }
  }
`

const Menu = ({ uri }) => {
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
              uri={uri}
            >
              <UniversalLink to={path} activeClassName="active" uri={uri}>
                {he.decode(menuItem.title)}{" "}
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
                          activeClassName="active"
                        >
                          {he.decode(subItem.title)}
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
