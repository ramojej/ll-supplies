import React, { useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { BoxedTitle, OuterContainer } from "../../styles/Styles"
import Slider from "react-slick"
import SlideItem from "./SlideItem"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import tw, { styled } from "twin.macro"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const StyledOuterContainer = styled(OuterContainer)`
  overflow: hidden;
  @media ${props => props.theme.screens.xl} {
    ${tw`py-24`};
    margin-top: 100px;
  }
`

const StyledSlider = styled(Slider)`
  ${tw`my-8`};

  @media ${props => props.theme.screens.lg} {
    ${tw`my-16`}
  }
`

const ButtonsContainer = styled.div`
  ${tw`flex items-center justify-between mx-auto`};
  max-width: 80px;
`
const Button = styled.button`
  ${tw`flex items-center text-white p-1 text-2xl`};
  background: ${props => props.theme.colors.black};

  &:focus {
    ${tw`outline-none shadow-outline`}
  }
`

const Portfolio = () => {
  const { allWpProject } = useStaticQuery(query)
  //console.log(allWpProject)

  const customSlider = useRef()

  const next = () => {
    customSlider.current.slickNext()
  }

  const prev = () => {
    customSlider.current.slickPrev()
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <StyledOuterContainer>
      <BoxedTitle>
        <h2>Portfolio</h2>
      </BoxedTitle>
      <StyledSlider {...settings} ref={customSlider}>
        {allWpProject.nodes.map(node => {
          return <SlideItem key={node.id} node={node} />
        })}
      </StyledSlider>
      <ButtonsContainer>
        <Button onClick={prev} aria-label="Previous slide">
          <FiChevronLeft />
        </Button>
        <Button onClick={next} aria-label="Next slide">
          <FiChevronRight />
        </Button>
      </ButtonsContainer>
    </StyledOuterContainer>
  )
}

export const query = graphql`
  query HomePortfolio {
    allWpProject(limit: 4) {
      nodes {
        title
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid(quality: 90, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }
        }
        id
        slug
        projectsCustomFields {
          subTitle
        }
      }
    }
  }
`

export default Portfolio
