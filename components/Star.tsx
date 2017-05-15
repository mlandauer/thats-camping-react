import * as React from 'react';

interface StarProps {
  onClick?: (() => boolean);
  starred: boolean;
}

export const Star = (props: StarProps) => {
  let icon = props.starred ? "star" : "star-o"

  return (
    <div className={"star star-" + (props.starred ? "on" : "off")} onClick={props.onClick}>
      <span className={"fa fa-" + icon}></span>
    </div>
  )
}
