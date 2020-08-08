import tw, { styled } from "twin.macro"

export const TitleWithUnderLine = styled.h2`
  ${tw`uppercase text-xl font-semibold`};
  color: ${props => (props.color ? props.color : "#fff")};

  &:after {
    content: "";
    display: block;
    height: 2px;
    width: 50px;
    background: ${props => (props.color ? props.color : "#fff")};
    margin: ${props =>
      props.position === "center" ? "10px auto 15px" : "10px 0 15px"};
  }

  @media ${props => props.theme.screens.lg} {
    &:after {
      margin: ${props =>
        props.position === "center" ? "20px auto 25px" : "20px 0 25px"};
    }
  }
`
