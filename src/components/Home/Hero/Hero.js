import React from "react"
import BackgroundImage from "gatsby-background-image"
import PropTypes from "prop-types"
import tw, { styled } from "twin.macro"
import { motion } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"

const defaultHeroImage = graphql`
  {
    imageSharp(id: { eq: "de4372a7-7484-5624-b1c4-3b3e4aa72f85" }) {
      fluid {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`

const BackgroundImageSection = styled.section`
  ${tw`h-screen`}
`

const StyledBackgroundImage = styled(BackgroundImage)`
  ${tw`h-full flex items-center justify-center`};

  & div {
    ${tw`flex items-center justify-center flex-col mt-12`}
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
  //console.log(blocks)

  //fallback if somehow the hero image is not filled
  const { imageSharp } = useStaticQuery(defaultHeroImage)
  //console.log(imageSharp)
  return (
    <BackgroundImageSection>
      <StyledBackgroundImage
        fluid={
          blockHeroFields.heroImage.localFile.childImageSharp.fluid
            ? blockHeroFields.heroImage.localFile.childImageSharp.fluid
            : imageSharp.fluid
        }
        alt="L&amp;L Supplies Hero Image"
      >
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
