import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import CategoryPageTemplate from "../templates/CategoryPage"

import "semantic-ui-css/semantic.min.css"

const StoreIndex = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
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
            }
          }
        }
      }
    `
  )
  
  /* Graphql query is sorted so categories are fetched first
     so the first edge will always be the first active category */
  const firstCategoryName =
    data.allMarkdownRemark.edges[0].node.frontmatter.name

  const initialCategory = { pathname: firstCategoryName }

  return <CategoryPageTemplate location={initialCategory} />
}

export default StoreIndex
