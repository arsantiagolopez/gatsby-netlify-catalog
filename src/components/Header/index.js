import React from "react"
import PropTypes from "prop-types"

import Navigation from "../Navigation"

const Header = ({ path, categories }) => (
  <header style={{ borderBottom: `1px solid rgba(1,1,1,0.1)` }}>
    <Navigation path={path} categories={categories} />
  </header>
)

Header.propTypes = {
  path: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
}

export default Header
