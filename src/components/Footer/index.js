import React from "react"
import PropTypes from "prop-types"

import { Divider, Container, Grid, Header, Icon } from "semantic-ui-react"

const Footer = ({ phone }) => {
  const whatsappNumber = phone

  const formatPhone = num => {
    num = num.toString()
    // if less than 10 numbers, return unformatted
    if (num.length < 10) {
      return num
    }
    // if only 10 numbers, local format
    else if (num.length === 10) {
      let match = num.match(/^(\d{3})(\d{3})(\d{4})$/)
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    // else, international number, last 10 are actual digits
    else {
      const lastFour = num.substring(num.length - 4, num.length)
      const middleThree = num.substring(num.length - 7, num.length - 4)
      const firstThree = num.substring(num.length - 10, num.length - 7)
      const extension = num.substring(0, num.length - 10)

      return `+${extension} (${firstThree}) ${middleThree}-${lastFour}`
    }
  }

  return (
    <footer>
      <Divider />
      <Container text style={{ padding: `2em 0` }}>
        <Grid stackable textAlign="center">
          <Grid.Row>
            <Header as="h1">YOUR COMPANY HERE</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <a href={`https://wa.me/${whatsappNumber}`}>
                <Icon name="whatsapp" size="large" />
                {formatPhone(phone)}
              </a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <p style={{ fontSize: `10pt`, letterSpacing: `-0.25pt` }}>
              <i style={{ fontFamily: `Times New Roman` }}>
                © Your Company Here {new Date().getFullYear()}
              </i>{" "}
              – <b style={{ fontSize: `8pt` }}>DESIGN BY ALEXANDER SANTIAGO</b>
            </p>
          </Grid.Row>
        </Grid>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  phone: PropTypes.number,
}

export default Footer
