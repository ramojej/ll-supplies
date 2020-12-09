const path = require("path")

const query = `
  {
    allWpPage {
      nodes {
        uri
        template {
          ... on WpHomeTemplate {
            templateName
          }
          ... on WpAboutUsTemplate{
            templateName
          }
          ... on WpServicesTemplate {
            templateName
          }
          ... on WpProductsTemplate {
            templateName
          }
          ... on WpContactTemplate {
            templateName
          }
          ... on WpProjectTemplate {
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
        projectsCustomFields {
          projectType
        }
      }
    }
    allWpProduct {
      nodes {
        productsACFields {
          productType
        }
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
      case "Products Template":
        template = path.resolve("./src/templates/ProductsPage.js")
        break
      case "Project Template":
        template = path.resolve("./src/templates/Projects.js")
        break
      case "Contact Template":
        template = path.resolve("./src/templates/Contact.js")
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

  data.allWpProject.nodes.forEach(project => {
    actions.createPage({
      path: `/projects/${project.projectsCustomFields.projectType}`,
      component: path.resolve(`./src/templates/ProjectType.js`),
      context: {
        projectType: project.projectsCustomFields.projectType,
      },
    })
  })

  data.allWpProduct.nodes.forEach(product => {
    actions.createPage({
      path: `/products-services/${product.productsACFields.productType}/`,
      component: path.resolve(`./src/templates/ProductType.js`),
      context: {
        productType: product.productsACFields.productType,
      },
    })
  })
}
