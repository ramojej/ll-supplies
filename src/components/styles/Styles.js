import tw, { styled } from "twin.macro"

export const OuterContainer = styled.div`
  ${tw`py-8`};
  background: ${props => (props.background ? props.background : "none")};

  @media ${props => props.theme.screens.lg} {
    ${tw`py-12`}
  }
`

export const Container = styled.div`
  ${tw`mx-auto px-4 relative`};
  max-width: 74rem;
`

export const BoxedTitle = styled.div`
  padding: 20px 25px;
  border: solid 10px
    ${props => (props.color ? props.color : props.theme.colors.black)};
  max-width: 250px;
  margin: 0 auto;

  h2 {
    ${tw`uppercase font-bold text-xl text-center`};
    color: ${props => (props.color ? props.color : props.theme.colors.black)};
  }

  @media ${props => props.theme.screens.lg} {
    max-width: 300px;
  }
`

export const P = styled.p`
  color: ${props => (props.color ? props.color : "inherit")};
  size: ${props => (props.size ? props.size : tw`text-sm`)};
`
