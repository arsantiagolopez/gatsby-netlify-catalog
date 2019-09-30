import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ProductDetailed from "../components/ProductDetailed"

const ProductPageTemplate = ({ location, data }) => {
  const productData = data.singleProduct.frontmatter
  const phone = data.sitePhone.siteMetadata.personalInfo.phone

  /* Product object serves as a "props" object.
     Keys and values are passed down as props */
  const product = {
    location: location,
    title: productData.title,
    category: productData.category,
    price: productData.price,
    summary: productData.summary,
    description: productData.description,
    image: productData.featuredImage,
  }

  // get categories
  const productQuery = data.allProducts.edges
  const categories = []

  // filter out categories and populate array
  productQuery.forEach(item => {
    if (item.node.frontmatter.name !== null) {
      categories.push(item)
    }
  })

  // path is the current category
  const path = productData.category

  return (
    <Layout path={path} categories={categories} phone={phone}>
      <SEO title={product.title} />
      <ProductDetailed {...product} phone={phone}/>
    </Layout>
  )
}

/* One query for the product in question,
   one for all the products */
export const query = graphql`
  query ProductQuery($title: String!) {
    sitePhone: site {
      siteMetadata {
        personalInfo {
          phone
        }
      }
    }
    allProducts: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___name, frontmatter___title] }
    ) {
      edges {
        node {
          frontmatter {
            title
            name
          }
        }
      }
    }
    singleProduct: markdownRemark(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        title
        category
        price
        summary
        description
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
`

export default ProductPageTemplate
