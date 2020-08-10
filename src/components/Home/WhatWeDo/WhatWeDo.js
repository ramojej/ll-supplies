import React, { useEffect } from "react"
import PropTypes from "prop-types"
//import Container from "../../Container"
import { OuterContainer, P, Container } from "../../styles/Styles"
import { TitleWithUnderLine } from "../../styles/Title"
import Logo from "../../Logo"
import tw, { styled } from "twin.macro"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const WhatWeDoGrid = styled.div`
  @media ${props => props.theme.screens.lg} {
    ${tw`grid grid-cols-3 items-center gap-16`}
  }
`

const WhatWeDoContentContainer = styled(motion.div)`
  @media ${props => props.theme.screens.lg} {
    ${tw`col-span-2`}
  }
`

const LogoContainer = styled(motion.div)`
  max-width: 300px;
  margin: 20px auto 0;
  filter: brightness(0) invert(1);

  @media ${props => props.theme.screens.lg} {
    ${tw`w-full`};
    margin: 0;
  }
`

const WhatWeDo = ({ blocks }) => {
  const animation = useAnimation()

  const [whatWeDoRef, inView] = useInView({
    triggerOnce: true,
    //rootMargin: "-200px",
  })

  useEffect(() => {
    if (inView) {
      animation.start("visible")
    }
  }, [animation, inView])

  //get data for content
  const { blockWhatWeDoFields } = blocks.find(
    whatWeDo => whatWeDo.blockWhatWeDoFields
  )
  //console.log(blockWhatWeDoFields)
  return (
    <OuterContainer background="#121212">
      <Container>
        <WhatWeDoGrid>
          <WhatWeDoContentContainer
            ref={whatWeDoRef}
            animate={animation}
            initial="hidden"
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
              },
              hidden: { opacity: 0, y: 72 },
            }}
          >
            <TitleWithUnderLine color="#fff">
              {blockWhatWeDoFields.title}
            </TitleWithUnderLine>
            <P color="#fff">{blockWhatWeDoFields.whatWeDo}</P>
          </WhatWeDoContentContainer>
          <LogoContainer
            ref={whatWeDoRef}
            animate={animation}
            initial="hidden"
            variants={{
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.6, 0.05, -0.01, 0.9],
                  delay: 0.5,
                },
              },
              hidden: { opacity: 0, scale: 0 },
            }}
          >
            <Logo />
          </LogoContainer>
        </WhatWeDoGrid>
      </Container>
    </OuterContainer>
  )
}

WhatWeDo.propTypes = {
  blocks: PropTypes.array.isRequired,
}

export default WhatWeDo
