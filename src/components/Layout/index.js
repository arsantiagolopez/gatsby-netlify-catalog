import React from "react"
import PropTypes from "prop-types"
import Headroom from "react-headroom"

import { Container } from "semantic-ui-react"

import Header from "../Header"
import Footer from "../Footer"

import "semantic-ui-css/semantic.min.css"
import "./index.css"

const Layout = ({ children, path, categories, phone }) => {
  return (
    <>
      <Headroom style={{ zIndex: `20`, height: `6.5em` }}>
        <Header path={path} categories={categories} />
      </Headroom>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          paddingBottom: `1em`,
        }}
      >
        <Container text style={{ minWidth: `65vw` }}>
          <main>{children}</main>
        </Container>
      </div>
      <Footer phone={phone} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  phone: PropTypes.number,
}

export default Layout
