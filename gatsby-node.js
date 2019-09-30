const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")

/* Runs everytime a node is created or updated
   Creates a "slug" field per node. */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Creates a page for every product given its slug field
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
              name
              title
            }
          }
        }
      }
    }
  `)
  
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    /* Nodes with a null "name" field are products.
       For products, path format should be /{category}/{slug}
       Else, a category page path should be /{slug}/ */
    if (node.frontmatter.name === null) {
      category = node.frontmatter.category
      createPage({
        path: `/${category + node.fields.slug}`,
        component: path.resolve(`./src/templates/ProductPage.js`),
        /* Context makes it available for the ProductPage
           template to access the "title" variable upon
           render. Needed for graphql query. */
        context: {
          title: node.frontmatter.title,
        },
      })
    } else {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/CategoryPage.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    }
  })
}
