import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { OuterContainer, Container } from "../components/styles/Styles"
import BG from "gatsby-background-image"
import { BsClock, BsInfoCircleFill, BsFillPersonFill } from "react-icons/bs"
import SEO from "../components/seo"
import tw, { styled } from "twin.macro"
import Carousel, { Modal, ModalGateway } from "react-images"

const H1 = styled.h1`
  ${tw`font-bold tracking-widest text-2xl uppercase text-center`}
`

const Subtitle = styled.h4`
  ${tw`capitalize text-center`};
  color: #666;
`

const ContentDetailsContainer = styled.div`
  ${tw`mt-4 flex flex-col text-sm`};

  p {
    color: #666;
  }

  p:not(:last-child) {
    ${tw`mb-4`}
  }
  @media ${props => props.theme.screens.lg} {
    ${tw`flex-row items-center mt-6`}
  }
`

const ContentContainer = styled.div`
  ${tw`order-2`};
  @media ${props => props.theme.screens.lg} {
    ${tw`max-w-3xl order-1 mr-auto`}
  }
`

const DetailsContainer = styled.div`
  ${tw`order-1 mb-4`};
  @media ${props => props.theme.screens.lg} {
    ${tw`order-2 mb-0 p-4`};
    border-left: 3px solid ${props => props.theme.colors.black};
  }
`
const EachDetail = styled.div`
  ${tw`flex items-center font-bold justify-center`};
  color: ${props => props.theme.colors.lightGray};

  @media ${props => props.theme.screens.lg} {
    ${tw`justify-start`}
  }

  svg {
    ${tw`mr-4`};
    fill: ${props => props.theme.colors.black};
  }

  span {
    color: #666;
    ${tw`mr-2 font-light`}
  }
`

const Gallery = styled.div`
  ${tw`relative mt-4`};

  @media ${props => props.theme.screens.lg} {
    ${tw`mt-12 grid grid-cols-2 gap-12`}
  }
`

const StyledBG = styled(BG)`
  width: 100%;
  height: 250px;

  @media ${props => props.theme.screens.lg} {
    height: 350px;
  }

  &:not(:last-child) {
    ${tw`mb-4`};

    @media ${props => props.theme.screens.lg} {
      ${tw`mb-0`}
    }
  }
`

const SingleProject = ({ data: { wpProject } }) => {
  console.log(wpProject)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0)

  const closeModal = () => setModalIsOpen(false)
  const openModal = imageIndex => {
    setModalCurrentIndex(imageIndex)
    setModalIsOpen(true)
  }

  return (
    <Layout>
      <SEO
        title={wpProject.seo.title}
        description={wpProject.seo.metaDesc}
        image={
          wpProject.seo.opengraphImage
            ? wpProject.seo.opengraphImage.localFile.publicURL
            : null
        }
      />
      <OuterContainer>
        <Container>
          <H1>{wpProject.title}</H1>
          <Subtitle>{wpProject.projectsCustomFields.projectType}</Subtitle>
          <ContentDetailsContainer>
            <ContentContainer>
              <div dangerouslySetInnerHTML={{ __html: wpProject.content }} />
            </ContentContainer>
            <DetailsContainer>
              <EachDetail>
                <BsClock /> {wpProject.projectsCustomFields.date}
              </EachDetail>
              <EachDetail>
                <BsInfoCircleFill /> <span>Client:</span>
                {wpProject.projectsCustomFields.client}
              </EachDetail>
              <EachDetail>
                <BsFillPersonFill /> <span>Posted by:</span>
                {wpProject.author !== null
                  ? wpProject.author.node.name
                  : wpProject.lastEditedBy.node.name}
              </EachDetail>
            </DetailsContainer>
          </ContentDetailsContainer>
          <Gallery>
            {wpProject.projectsCustomFields.gallery.map((pic, index) => {
              return (
                <StyledBG
                  fluid={pic.localFile.childImageSharp.fluid}
                  key={index}
                />
              )
            })}
          </Gallery>
          {ModalGateway && (
            <ModalGateway>
              {modalIsOpen && (
                <Modal onClose={closeModal}>
                  <Carousel
                    views={wpProject.projectsCustomFields.gallery}
                    currentIndex={modalCurrentIndex}
                  />
                </Modal>
              )}
            </ModalGateway>
          )}
        </Container>
      </OuterContainer>
    </Layout>
  )
}

export const query = graphql`
  query SingleProject($id: String!) {
    wpProject(id: { eq: $id }) {
      title
      content
      lastEditedBy {
        node {
          name
        }
      }
      author {
        node {
          name
        }
      }
      seo {
        metaDesc
        title
        opengraphImage {
          localFile {
            publicURL
          }
        }
      }
      projectsCustomFields {
        client
        date
        projectType
        subTitle
        gallery {
          altText
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
            relativePath
          }
        }
      }
    }
  }
`

export default SingleProject
