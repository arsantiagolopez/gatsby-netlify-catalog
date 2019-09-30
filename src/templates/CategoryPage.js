import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ProductList from "../components/ProductList"

const CategoryPageTemplate = ({ location: { pathname } }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            personalInfo {
              phone
            }
          }
        }
        allMarkdownRemark(
          sort: {
            order: ASC
            fields: [frontmatter___name, frontmatter___title]
          }
        ) {
          edges {
            node {
              frontmatter {
                title
                category
                price
                summary
                description
                name
                dateCreated
                featuredImage {
                  childImageSharp {
                    fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  const siteTitle = data.site.siteMetadata.title
  const phone = data.site.siteMetadata.personalInfo.phone
  const productQuery = data.allMarkdownRemark.edges
  const categories = []
  const products = []

  // filter out all categories and products
  productQuery.forEach(item => {
    // if name field is null, node is a product
    if (item.node.frontmatter.name === null) {
      products.push(item)
    } else {
      categories.push(item)
    }
  })

  // strip slashes off pathname
  const path = pathname.replace(/\//g, "")

  return (
    <Layout path={path} categories={categories} phone={phone}>
      <SEO title={siteTitle} />
      <ProductList path={path} products={products} />
    </Layout>
  )
}

export default CategoryPageTemplate
