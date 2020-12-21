import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import * as firestore from '../../../services/firestore';
import ListIcons from "./ListIcons";
import Separator from './Separator';


const Techs = (props) => {

  const { description } = props
  const [techs, setTechs] = useState([]);
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    firestore.getIcons()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          docs[doc.id] = doc.data()
        })

        setIcons(docs)
      })
    firestore.getTechs()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          docs.push(doc.data())
        })

        setTechs(docs)
      })

  }, [setTechs, setIcons]);

  const handleTechs = () => {

    let arr = techs.reduce(function (rows, key, index) {
      return (index % 4 === 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows;
    }, [])

    return arr.map((t, i) => {
      return (
        <div key={i}>
          <Row>
            {t.map((t2, i2) => {
              return (
                <Col key={i2} xl={3} >
                  <Card className="shadow card-stats mb-4 mb-lg-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle className="text-uppercase text-muted mb-0">
                            {t2.name}
                          </CardTitle>
                        </div>
                        <Col className="col-auto">
                          <div className={`icon icon-shape text-white rounded-circle shadow ${t2.color}`}>
                            <i className={t2.icon} />
                          </div>
                        </Col>
                      </Row>
                      <hr className="my-1" />
                      <Row className=" d-flex ">
                        <ListIcons
                          icons={icons}
                          listIcons={t2.icons}
                        />

                      </Row>
                    </CardBody>
                  </Card>
                </Col >
              )
            })}
          </Row>
          <Row>
            <Separator />
          </Row>
        </div >
      )


    })
  }

  return (
    <>
      <div className="text-center" id='techs'>
        <h1 className="mt-5 d-flex align-items-center justify-content-center">Techs</h1>

        <div className="h5 mt-4">
          {description}
        </div>
      </div>
      <div className="h5 mt-6"></div>

      {handleTechs()}

      <Separator />
    </>
  )
}

export default Techs