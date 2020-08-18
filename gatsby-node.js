const path = require("path")

const query = `
  {
    allWpPage {
      nodes {
        uri
        template {
          ... on WpHomeTemplateTemplate {
            templateName
          }
          ... on WpAboutUsTemplateTemplate {
            templateName
          }
          ... on WpServicesTemplateTemplate {
            templateName
          }
        }
        isFrontPage
        id
      }
    }
    allWpPost {
      nodes {
        uri
        id
      }
    }
    allWpProject {
      nodes {
        id
        uri
      }
    }
  }
`

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    ${query}
  `)

  //return null
  if (!data) return null

  data.allWpPage.nodes.forEach(page => {
    const { isFrontPage } = page
    const uri = isFrontPage ? `/` : page.uri

    let template

    switch (page.template.templateName) {
      case "Home Template":
        template = path.resolve("./src/templates/Home.js")
        break

      case "About Us Template":
        template = path.resolve("./src/templates/About.js")
        break
      case "Services Template":
        template = path.resolve("./src/templates/Services.js")
        break

      default:
        template = path.resolve(`./src/templates/basicpage.js`)
        break
    }

    actions.createPage({
      path: uri,
      component: template,
      context: {
        id: page.id,
        slug: page.uri,
      },
    })
  })

  data.allWpPost.nodes.forEach(post => {
    actions.createPage({
      path: `/post${post.uri}`,
      component: path.resolve(`./src/templates/Post.js`),
      context: {
        ...post,
        id: post.id,
        slug: post.uri,
        title: post.title,
      },
    })
  })

  data.allWpProject.nodes.forEach(project => {
    actions.createPage({
      path: `/projects${project.uri}`,
      component: path.resolve(`./src/templates/SingleProject.js`),
      context: {
        id: project.id,
      },
    })
  })
}
