import React from "react"
import tw, { styled } from "twin.macro"

export const MenuToggleContainer = styled.div`
  ${tw`relative flex items-center order-2 ml-4`}

  @media ${props => props.theme.screens.lg} {
    ${tw`hidden`}
  }

  button {
    ${tw`focus:outline-none border-none flex rounded-lg p-2`};
    background: ${props => props.theme.lighterGray};

    g {
      fill: ${props => props.theme.text};
    }
  }
`

export const MenuToggle = ({ toggleMobileMenu }) => (
  <button onClick={toggleMobileMenu}>
    <svg width="16" height="10" viewBox="0 0 16 10">
      <title>Open mobile navigation</title>
      <g fillRule="evenodd">
        <rect y="8" width="16" height="2" rx="1"></rect>
        <rect y="4" width="16" height="2" rx="1"></rect>
        <rect width="16" height="2" rx="1"></rect>
      </g>
    </svg>
  </button>
)
