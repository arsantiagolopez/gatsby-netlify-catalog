import React from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"

import {
  Breadcrumb,
  Item,
  Label,
  Table,
  Header,
  Divider,
  Icon,
} from "semantic-ui-react"

const ProductDetailed = ({
  location,
  title,
  category,
  price,
  summary,
  description,
  image,
  phone,
}) => {
  /* Whatsapp configuration so that, on click, custom
     message is sent to specific whatsappNumber */
  const whatsappNumber = phone
  const urlEncondedShareText = `Check%20this%20out!%20${location.href}`
  const urlEncondedReserveText = `I'm%20intested%20in%20this%20product!%20${title.toUpperCase()}%20for%20$${price}%20${location.href}`

  /* Most recent version of Google Chrome shows an error
     on the original href, use tweak below until update */
  //const whatsappOriginalShareHref = `https://wa.me/?text=${urlEncondedShareText}`
  const whatsappTemporaryShareHref = `https://api.whatsapp.com/send?phone=&text=${urlEncondedShareText}&source=&data=`
  const whatsappReserveHref = `https://wa.me/${whatsappNumber}/?text=${urlEncondedReserveText}`

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        size="massive"
        style={{ textTransform: `capitalize`, margin: `0.5em 0` }}
      >
        <Breadcrumb.Section
          as="a"
          href={`/${category}/`}
          style={{ color: `gray` }}
        >
          {category}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="chevron right" />
        <Breadcrumb.Section active>{title}</Breadcrumb.Section>
      </Breadcrumb>
      {/* Item Details and Metadata */}
      <Item.Group>
        <Item style={{ alignItems: "center" }}>
          <Item.Image style={{ minHeight: `330px`, minWidth: `330px` }}>
            <Img
              alt={title}
              fluid={{
                ...image.childImageSharp.fluid,
                aspectRatio: 1,
              }}
              style={{ minWidth: `330px` }}
            />
          </Item.Image>
          <Item.Content style={{ width: `100%` }}>
            <Item.Header style={{ textTransform: `capitalize` }}>
              {title}
            </Item.Header>
            <Item.Description>
              <p>${price}</p>
              <Label>IN STOCK</Label>
            </Item.Description>
            <Item.Extra style={{ paddingTop: `1em` }}>
              <Label
                as="a"
                href={whatsappTemporaryShareHref}
                size="large"
                color="yellow"
              >
                <Icon name="external share"/>
                Share
              </Label>
            </Item.Extra>
            <Item.Extra>
              <Label
                as="a"
                href={whatsappReserveHref}
                size="large"
                color="green"
              >
                <Icon name="whatsapp" size="large" />
                Reserve through Whatsapp
              </Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
      {/* Product Summary */}
      <Header>About This Product</Header>
      <p>{summary}</p>
      <Divider style={{ padding: `0.5em 0` }} />
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>More Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell style={{ whiteSpace: `initial`, fontWeight: `normal` }}>
              {description}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  )
}

ProductDetailed.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  phone: PropTypes.number,
}

export default ProductDetailed
