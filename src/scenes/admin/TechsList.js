/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Table, UncontrolledAlert } from "reactstrap";
import * as firestore from '../../services/firestore';

const TechsList = (props) => {

  const [listTechs, setListTechs] = useState([])
  const [alert, setAlert] = useState({ show: false, color: '', message: '' })
  const [refresh, setRefresh] = useState(false)

  const history = useHistory();

  useEffect(() => {
    firestore.getTechs()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          const d = { ...doc.data(), id: doc.id }
          docs.push(d)
        })

        setListTechs(docs)
      })

  }, [setListTechs])


  const handleTechs = () => {
    return listTechs.map((t, i) => {
      return (
        <tr key={i}>
          <td>
            <Col className="col-auto">
              <div className={`icon icon-shape text-white rounded-circle shadow ${t.color}`}>
                <i className={t.icon} />
              </div>
            </Col>
          </td>
          <td>{t.id}</td>
          <td>{t.icons.length}</td>
          <td>
            <Button color="info" size="sm" type="button" onClick={e => editTechs(t)}>
              Edit
            </Button>
            <Button color="danger" size="sm" type="button" onClick={e => deleteTechs(t)}>
              Delete
            </Button>

          </td>
        </tr>
      )
    })
  }

  const deleteTechs = (techs) => {
    setAlert({ show: true, color: 'info', message: 'Trying to delete MediaSocial!' })

    firestore.deleteTechs(techs.id)
      .then(success => {
        setAlert({ show: true, color: 'success', message: 'Techs deleted sucessfully!' })

        setTimeout(() => {
          setRefresh(true)
        }, 1000)


      })
      .catch(err => {
        console.log(err)
        setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to delete Techs!' })

      })
  }

  const editTechs = (techs) => {
    history.push({
      pathname: "/admin/techsCrud",
      state: { techs: techs }
    })
  }

  const addTechs = () => {
    history.push({
      pathname: "/admin/techsCrud"
    })
  }


  if (refresh) {
    return (<Redirect push to={{ pathname: "/admin/profile" }} />)
  }
  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" >
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="11">
                    <h3 className="mb-0">Techs List</h3>
                  </Col>
                  <Col xs="1">
                    <Button color="primary" size="large" type="button" onClick={e => addTechs()}>
                      Add
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Row>
                  <Table className="align-items-center table-flush" size="sm" responsive striped hover>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Icon</th>
                        <th scope="col">Name</th>
                        <th scope="col">Techs</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {handleTechs()}
                    </tbody>
                  </Table>
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>
        {alert.show &&
          <UncontrolledAlert color={alert.color}>
            {alert.message}
          </UncontrolledAlert>
        }
      </Container>
    </>
  );
}

export default TechsList;
