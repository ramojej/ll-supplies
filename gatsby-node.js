const path = require("path")

const query = `
  {
    allWpPage {
      nodes {
        uri
        title
        seo {
          focuskw
          metaDesc
          opengraphTitle
          opengraphType
          title
          opengraphUrl
        }
        template {
          ... on WpHomeTemplateTemplate {
            templateName
          }
        }
        isFrontPage
        content
        id
      }
    }
    allWpPost {
      nodes {
        uri
        title
        seo {
          focuskw
          metaDesc
          opengraphTitle
          opengraphType
          title
          opengraphUrl
        }
        content
        id
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

    actions.createPage({
      path: uri,
      component:
        isFrontPage && page.template.templateName == "Home Template"
          ? path.resolve(`./src/templates/Home.js`)
          : path.resolve(`./src/templates/basicpage.js`),
      context: {
        ...page,
        id: page.id,
        slug: page.uri,
        title: page.title,
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
}
