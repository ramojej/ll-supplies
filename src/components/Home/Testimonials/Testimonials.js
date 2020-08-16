import React, { useRef } from "react"
import EachTestimonial from "./EachTestimonial"
import Slider from "react-slick"
import { BoxedTitle, OuterContainer, Container } from "../../styles/Styles"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import tw, { styled } from "twin.macro"

const StyledSlider = styled(Slider)`
  ${tw`mt-16`};
`

const SliderContainer = styled.div`
  ${tw`relative`};

  svg {
    ${tw`absolute text-4xl cursor-pointer`};

    top: 50%;
    transform: translateY(-50%);
  }
  @media ${props => props.theme.screens.lg} {
    ${tw`max-w-5xl mx-auto`}
  }
`

const StyledNext = styled(FiChevronRight)`
  right: -10px;
  @media ${props => props.theme.screens.lg} {
    right: -50px;
  }
`

const StyledPrev = styled(FiChevronLeft)`
  left: -10px;
  @media ${props => props.theme.screens.lg} {
    left: -50px;
  }
`

const Testimonials = ({ blocks }) => {
  const { blockTestimonialFields } = blocks.find(
    testi => testi.blockTestimonialFields
  )
  //console.log(blockTestimonialFields)

  const testiSlider = useRef()

  const next = () => {
    testiSlider.current.slickNext()
  }

  const prev = () => {
    testiSlider.current.slickPrev()
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
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
    <OuterContainer>
      <Container>
        <BoxedTitle>
          <h2>{blockTestimonialFields.title}</h2>
        </BoxedTitle>
        <SliderContainer>
          {blockTestimonialFields.testimonials.length > 0 ? (
            <StyledSlider {...settings} ref={testiSlider}>
              {blockTestimonialFields.testimonials.map((node, index) => {
                return <EachTestimonial node={node} key={index} />
              })}
            </StyledSlider>
          ) : (
            "testimonials coming soon!"
          )}
          <StyledNext onClick={next} />
          <StyledPrev onClick={prev} />
        </SliderContainer>
      </Container>
    </OuterContainer>
  )
}

export default Testimonials
