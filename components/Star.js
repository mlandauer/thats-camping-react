import React from 'react'


const Star = ({starred}) => {
  let icon = starred ? "star" : "star-empty"

  return (
    <div className="star">
      <span className={"glyphicon glyphicon-" + icon}></span>
    </div>
  )
}

export default Star
