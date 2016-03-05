import React, { PropTypes } from 'react'

const Star = ({onClick, starred}) => {
  let icon = starred ? "star" : "star-empty"

  return (
    <div className="star" onClick={onClick}>
      <span className={"glyphicon glyphicon-" + icon}></span>
    </div>
  )
}

Star.propTypes = {
  onClick: PropTypes.func.isRequired,
  starred: PropTypes.bool
}

export default Star
