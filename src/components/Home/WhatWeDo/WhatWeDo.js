import React from "react"
import PropTypes from "prop-types"
import { TitleWithUnderLine } from "../../Title"
import tw, { styled } from "twin.macro"

const WhatWeDoContainer = styled.div`
  ${tw`h-64`}
`

const WhatWeDo = ({ blocks }) => {
  const { blockWhatWeDoFields } = blocks.find(
    whatWeDo => whatWeDo.blockWhatWeDoFields
  )
  console.log(blockWhatWeDoFields)
  return (
    <WhatWeDoContainer>
      <TitleWithUnderLine color="#fff">
        {blockWhatWeDoFields.title}
      </TitleWithUnderLine>
    </WhatWeDoContainer>
  )
}

WhatWeDo.propTypes = {
  blocks: PropTypes.array.isRequired,
}

export default WhatWeDo
