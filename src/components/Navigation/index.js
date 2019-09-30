import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import { Menu } from "semantic-ui-react"

const Navigation = ({ path, categories }) => {

  const [activeItem, setActiveItem] = useState(path)
  const handleClick = (e, { name }) => {
    setActiveItem(name)
  }

  /* Navigation effect to make active menu items
     always centered. */
  const centerActive = activeElement => {
    // get coordinates of active node
    const tabRect = activeElement.getBoundingClientRect()
    const scrollContainer = document.getElementById("navContainer")
    // centering logic
    const tabLeft = tabRect.left
    const halfTabWidth = tabRect.width / 2
    const screenWidth = window.innerWidth
    const diff = tabLeft + halfTabWidth - screenWidth / 2
    // scroll
    scrollContainer.scrollLeft += diff
  }

  useEffect(() => {
    // center activeItem on click
    const activeElement = document.querySelector(".active")
    centerActive(activeElement)
  }, [activeItem])
  
  return (
    <div
      id="navContainer"
      style={{
        overflow: `hidden`,
        overflowX: `scroll`,
        background: `white`,
      }}
    >
      <Menu size="huge" pointing secondary>
        {categories.map((item, index) => (
          <Menu.Item
            name={item.node.frontmatter.name}
            active={activeItem === item.node.frontmatter.name}
            onClick={handleClick}
            as={Link}
            to={`/${item.node.frontmatter.name}/`}
            key={index}
            style={{ textTransform: `uppercase` }}
          >
            <h2>{item.node.frontmatter.name}</h2>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

Navigation.propTypes = {
  path: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
}

export default Navigation
