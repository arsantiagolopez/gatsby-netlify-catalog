import React from "react"
import { Link } from "gatsby"

import { Container, Grid, Header } from "semantic-ui-react"

import SEO from "../components/SEO"

const NotFoundPage = () => (
  <Container text style={{ margin: 0, padding: 0 }}>
    <SEO title="404: Page Not Found" />
    <Grid
      textAlign="center"
      style={{ height: `100vh`, alignItems: "center", alignContent: `center` }}
    >
      <Grid.Row>
        <Header as="h1">I think you're lost.</Header>
      </Grid.Row>
      <Grid.Row>
        <i>You came across an unexistant page... The sadness.</i>
      </Grid.Row>
      <Grid.Row>
        <Link to="/">Go back</Link>
      </Grid.Row>
    </Grid>
  </Container>
)

export default NotFoundPage
