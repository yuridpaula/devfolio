import React, { useEffect, useState } from "react";
import { Col, Media, Row, UncontrolledTooltip } from "reactstrap";
import * as firestore from '../services/firestore';

const MediaSocial = (props) => {

  const { icons } = props
  const [medias, setMedias] = useState([])

  useEffect(() => {
    firestore.getMediaSocial()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          const d = { ...doc.data(), id: doc.id }
          docs.push(d)
        })

        setMedias(docs)
      })
  }, [setMedias]);

  const handleMedias = () => {
    return medias.map((m, i) => {
      return (
        <Col key={i} className="d-flex align-items-center justify-content-center">
          <Media className="align-items-center" >
            <a
              className="avatar rounded-circle "
              href={m.link}
              target={'blank'}
              id={m.id}
            >
              <img
                alt={icons[m.id] && icons[m.id].name}
                src={icons[m.id] && icons[m.id].image}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              placement="top"
              target={m.id}
            >
              {icons[m.id] && icons[m.id].name}
            </UncontrolledTooltip>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Row>
      {handleMedias()}
    </Row>

  )
}

export default MediaSocial 