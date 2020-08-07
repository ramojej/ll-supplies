import tw, { styled } from "twin.macro"

export const TitleWithUnderLine = styled.h2`
  ${tw`uppercase text-lg`};
  color: ${props => props.color};
`
