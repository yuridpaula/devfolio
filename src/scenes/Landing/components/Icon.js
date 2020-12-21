import React from "react";
import { Media, UncontrolledTooltip } from "reactstrap";

const Icon = (props) => {

  const { imageSource, onClick,
    link, name, id
  } = props

  let onClickHandle = onClick ? onClick : e => e.preventDefault()

  return (

    // <Col className={'align-items-center d-flex justify-content-center'}>
    <Media className="align-items-center" >
      <a
        className="avatar rounded-circle "
        href={link}
        target={'blank'}
        id={id}
        onClick={onClickHandle}
      >
        <img
          alt={name}
          src={imageSource}
          style={{
            backgroundColor: 'white'
          }}

        />
      </a>
      <UncontrolledTooltip
        delay={0}
        placement="top"
        target={id}
      >
        {name}
      </UncontrolledTooltip>
    </Media>
    // </Col>
  )
}

export default Icon