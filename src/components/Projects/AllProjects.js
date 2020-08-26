import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import RespGallery from "./RespGallery"

const AllProjects = () => {
  return (
    <StaticQuery
      query={graphql`
        query AllProjects {
          allWpProject {
            nodes {
              title
              slug
              projectsCustomFields {
                subTitle
              }
              featuredImage {
                node {
                  altText
                  localFile {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={({ allWpProject }) => {
        console.log(allWpProject)
        //pass props to images, also passed the title, slug, and subtitle
        return (
          // <Gallery
          //   itemsPerRow={3}
          //   images={allWpProject.nodes.map(
          //     ({ featuredImage, title, slug, projectsCustomFields }) => ({
          //       ...featuredImage.node.localFile.childImageSharp.fluid,
          //       caption: featuredImage.node.localFile.altText,
          //       title,
          //       slug,
          //       subtitle: projectsCustomFields.subTitle,
          //     })
          //   )}
          // />

          <RespGallery nodes={allWpProject} />
        )
      }}
    />
  )
}

export default AllProjects
