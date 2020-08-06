import React from "react"
import PropTypes from "prop-types"

const Hero = ({ blocks }) => {
  const { blockHeroFields } = blocks.find(hero => hero.blockHeroFields)
  console.log(blockHeroFields)
  return (
    <div>
      <h1>{blockHeroFields.slogan}</h1>
    </div>
  )
}

Hero.propTypes = {
  blocks: PropTypes.array,
}

export default Hero
