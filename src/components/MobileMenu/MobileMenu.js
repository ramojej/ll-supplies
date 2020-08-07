import React from "react"
import tw, { styled } from "twin.macro"
import { motion, AnimatePresence } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import UniversalLink from "../../utils/UniversalLink"
import { flatListToHierarchical } from "../../utils/flastListToHeirarchical"
import { FiChevronDown } from "react-icons/fi"

const MobileMenuContainer = styled(motion.div)`
  ${tw`absolute top-0 left-0 w-full z-20 p-5 rounded-md`};
  height: 25rem;
  background: #333;
  transform-origin: 100% 0;
  box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
    0 30px 60px -30px rgba(0, 0, 0, 0.3);

  button {
    ${tw`bg-transparent border-none absolute active:outline-none focus:outline-none`};
    right: 8px;
    top: 10px;

    fill: #fff;
  }

  ul {
    ${tw`mt-10 list-none p-0`};

    ul {
      ${tw`mt-2 pl-4`}
    }

    a {
      ${tw`no-underline uppercase`};
      color: #fff;
      font-family: ${props => props.theme.fonts.main};
    }

    li {
      ${tw`mb-2`}
    }
  }

  @media ${props => props.theme.screens.lg} {
    ${tw`hidden`}
  }
`

const mobileMenuContainerVariants = {
  hidden: {
    x: "25vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const liVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const MobileMenu = ({ toggleMobileMenu, isOpen }) => {
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
  return (
    <AnimatePresence>
      {isOpen && (
        <MobileMenuContainer
          variants={mobileMenuContainerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <ul>
            {headerMenu.map(menuItem => {
              const path =
                menuItem.connectedNode !== null
                  ? menuItem.connectedNode.node.uri
                  : menuItem.url
              return (
                <motion.li variants={liVariants} key={menuItem.key}>
                  <UniversalLink activeClassName="active" to={path}>
                    {menuItem.title}{" "}
                    {menuItem.children.length > 0 && <FiChevronDown />}
                  </UniversalLink>

                  {menuItem.children.length > 0 && (
                    <ul className="submenu">
                      {menuItem.children.map(subItem => {
                        //console.log(subItem)
                        return (
                          <motion.li variants={liVariants} key={subItem.key}>
                            <UniversalLink
                              to={
                                subItem.connectedNode
                                  ? subItem.connectedNode.node.uri
                                  : subItem.url
                              }
                            >
                              {subItem.title}
                            </UniversalLink>
                          </motion.li>
                        )
                      })}
                    </ul>
                  )}
                </motion.li>
              )
            })}
          </ul>
          <button onClick={toggleMobileMenu} onKeyDown={toggleMobileMenu}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <title>Close mobile navigation</title>
              <path
                d="M25.6 14.3a1 1 0 0 1 0 1.4l-4.24 4.25 4.25 4.24a1 1 0 1 1-1.42 1.42l-4.24-4.25-4.24 4.25a1 1 0 0 1-1.42-1.42l4.25-4.24-4.25-4.24a1 1 0 0 1 1.42-1.42l4.24 4.25 4.24-4.25a1 1 0 0 1 1.42 0z"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </MobileMenuContainer>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
