import React from "react";
import Icon from "./Icon";

const ListIcons = (props) => {

  const { icons, listIcons } = props

  return (
    <>
      {listIcons.map((m, i) => {
        return (
          <Icon
            key={i}
            imageSource={icons[m].image}
            name={icons[m].name}
            id={m + i}
          />

        )
      })}
    </>
  )
}

export default ListIcons