import React from "react"
import PropTypes from "prop-types"
import {
  FaPhoneAlt,
  FaLocationArrow,
  FaRegClock,
  FaRegEnvelope,
  FaFacebookF,
} from "react-icons/fa"
import { Facebook } from "../../components/Footer"
import tw, { styled } from "twin.macro"

const ContactInfoContainer = styled.div`
  color: #666;
`

const DetailsContainer = styled.div`
  ${tw`my-8`};

  @media ${props => props.theme.screens.lg} {
    ${tw`grid grid-cols-2 gap-4 max-w-lg`}
  }
`

const EachInfo = styled.div`
  ${tw`flex items-start`};

  p {
    max-width: ${props => (props.align === "start" ? "150px" : "100%")};
  }

  &:not(:last-child) {
    ${tw`mb-2`}
  }

  svg {
    ${tw`mr-4`};
    color: ${props => props.theme.colors.black};
    margin-top: 3px;
  }
`

const ContactInfo = ({ info }) => {
  //console.log(info)
  return (
    <ContactInfoContainer>
      <DetailsContainer>
        <EachInfo>
          <FaPhoneAlt />
          <a href={`tel:${info.phoneNumber}`}>{info.phoneNumber}</a>
        </EachInfo>
        <EachInfo>
          <FaRegClock />
          {info.hoursOfOperation}
        </EachInfo>
        <EachInfo align="start">
          <FaLocationArrow />
          <p>{info.address}</p>
        </EachInfo>
        <EachInfo>
          <FaRegEnvelope />
          <a href={`mailto:${info.emailAddress}`}>{info.emailAddress} </a>
        </EachInfo>
      </DetailsContainer>
      <Facebook
        target="_blank"
        rel="noopener"
        href={info.facebookLink}
        align="left"
      >
        <FaFacebookF />
        Facebook Page
      </Facebook>
    </ContactInfoContainer>
  )
}

ContactInfo.propTypes = {
  info: PropTypes.object.isRequired,
}

export default ContactInfo
