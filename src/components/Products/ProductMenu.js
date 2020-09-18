import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import tw, { styled } from "twin.macro"

const OuterMenuContainer = styled.div`
  ${tw`p-6`};
  background-color: ${props => props.theme.colors.black};
`

const MenuContainer = styled.div`
  ${tw`p-2 flex items-center overflow-x-auto mx-auto`};

  @media ${props => props.theme.screens.sm} {
    ${tw`justify-center`}
  }
`

const StyledLink = styled(Link)`
  ${tw`text-white uppercase text-xs relative px-2 py-1 mr-8 whitespace-no-wrap`};

  @media ${props => props.theme.screens.lg} {
    &:not(:last-child) {
      ${tw`mr-8`}
    }
  }

  background: transparent;

  &:before,
  &:after {
    transition: all 0.2s ease 0s;
    content: "";
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    background: white;
  }

  &:before {
    left: -8px;
  }

  &:after {
    right: -8px;
  }

  &:hover,
  &.active {
    background: #fff;
    border: none;
    color: ${props => props.theme.colors.black};

    &::before,
    &::after {
      background: #fff;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }
  }
`

const ProductMenu = ({ menu }) => {
  const { allWpMenu } = useStaticQuery(query)
  //console.log(allWpMenu)
  const menuToLoop =
    menu === "project"
      ? allWpMenu.nodes[0].menuItems.nodes
      : allWpMenu.nodes[2].menuItems.nodes
  return (
    <OuterMenuContainer>
      <MenuContainer>
        {menuToLoop.map(item => {
          return (
            <StyledLink to={item.path} key={item.key} activeClassName="active">
              {item.title}
            </StyledLink>
          )
        })}
      </MenuContainer>
    </OuterMenuContainer>
  )
}

export const query = graphql`
  query ProductsProjectsMenu {
    allWpMenu(sort: { order: ASC, fields: id }) {
      nodes {
        name
        slug
        menuItems {
          nodes {
            key: id
            title: label
            path
            url
          }
        }
      }
    }
  }
`

export default ProductMenu
