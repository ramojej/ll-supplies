import React from "react"
import { GatsbyImage } from "@wardpeet/gatsby-image-nextgen/compat"
import PropTypes from "prop-types"
import tw, { styled } from "twin.macro"
import { motion } from "framer-motion"

const BackgroundImageSection = styled.section`
  ${tw`h-screen`}
`

const StyledBackgroundImage = styled.div`
  ${tw`h-full flex items-center justify-center`};

  & div {
    ${tw`flex items-center justify-center flex-col mt-12`}
  }

  & .heroImage {
    z-index: -2;
    width: 100%;
    height: 100%;
    position: absolute !important;
    margin-top: 0;
  }

  h1 {
    ${tw`text-white text-2xl uppercase font-bold max-w-lg text-center`};

    &:after {
      height: 2px;
      width: 70px;
      background: #fff;
      content: "";
      display: block;
      margin: 20px auto;
    }

    @media ${props => props.theme.screens.lg} {
      ${tw`text-4xl`}
    }
  }

  p {
    ${tw`text-white max-w-xs text-center mt-2 text-sm`};
    @media ${props => props.theme.screens.lg} {
      ${tw`max-w-sm`}
    }
  }
`
//declare vars for framer motion variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const Hero = ({ blocks }) => {
  const { blockHeroFields } = blocks.find(hero => hero.blockHeroFields)
  //console.log(blockHeroFields)

  //fallback if somehow the hero image is not filled
  //const { imageSharp } = useStaticQuery(defaultHeroImage)
  //console.log(imageSharp)
  return (
    <BackgroundImageSection>
      <StyledBackgroundImage>
        {/* <GatsbyImage
          placeholder={{
            fallback:
              blockHeroFields.heroImage.localFile.childImageSharp.fluid
                .fallback,
          }}
          images={{
            fallback: {
              src:
                blockHeroFields.heroImage.localFile.childImageSharp.fluid.src,
              srcSet:
                blockHeroFields.heroImage.localFile.childImageSharp.fluid
                  .srcSet,
            },
            sources: [
              {
                src:
                  blockHeroFields.heroImage.localFile.childImageSharp.fluid
                    .srcWebp,
                srcSet:
                  blockHeroFields.heroImage.localFile.childImageSharp.fluid
                    .srcSetWebp,
                type: "image/webp",
              },
            ],
          }}
          layout="responsive"
          alt="L&amp;L Supplies Hero Image"
          className="heroImage"
        /> */}
        <GatsbyImage
          fluid={blockHeroFields.heroImage.localFile.childImageSharp.fluid}
          className="heroImage"
        />
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1 variants={item}>{blockHeroFields.slogan}</motion.h1>
          <motion.p variants={item}>{blockHeroFields.heroText}</motion.p>
        </motion.div>
      </StyledBackgroundImage>
    </BackgroundImageSection>
  )
}

Hero.propTypes = {
  blocks: PropTypes.array,
}

export default Hero
