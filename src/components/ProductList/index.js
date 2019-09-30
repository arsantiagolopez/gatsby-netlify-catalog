import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import { Card, Image, Label } from "semantic-ui-react"

const ProductList = ({ path, products }) => {
  // filter products based on current category (path)
  const filteredProducts = []
  products.forEach(item => {
    if (item.node.frontmatter.category === path) {
      filteredProducts.push(item)
    }
  })

  // sort filtered products by name
  const sortedProducts = filteredProducts.sort((a, b) => {
    const textA = a.node.frontmatter.title.toUpperCase()
    const textB = b.node.frontmatter.title.toUpperCase()
    return textA < textB ? -1 : textA > textB ? 1 : 0
  })

  return (
    <Card.Group
      items={mapProductsToItems(sortedProducts)}
      itemsPerRow={3}
      stackable
      style={{
        padding: `1em 0`,
        textTransform: `capitalize`,
      }}
      centered
    />
  )
}

const mapProductsToItems = products =>
  products.map(
    ({
      node: {
        frontmatter: { title, category, price, featuredImage, dateCreated },
        fields: { slug },
      },
    }) => {
      /* If product is created within a week,
         display a "new" ribbon. */
      const week = new Date() - 1000 * 60 * 60 * 24 * 7
      const isDateCreated = new Date(dateCreated) * 1
      
      return {
        as: Link,
        to: `/${category + slug}`,
        childKey: title,
        image: (
          <Image>
            {isDateCreated > week ? (
              <Label as="div" color="red" ribbon style={{ zIndex: `2` }}>
                NEW
              </Label>
            ) : null}
            <Img
              fluid={{ ...featuredImage.childImageSharp.fluid, aspectRatio: 1 }}
              alt={title}
            />
          </Image>
        ),
        header: title,
        meta: <Card.Meta style={{ color: `dimgray` }}>${price}</Card.Meta>,
      }
    }
  )

ProductList.propTypes = {
  path: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
}

mapProductsToItems.propTypes = {
  products: PropTypes.array.isRequired,
}

export default ProductList
