/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Table, UncontrolledAlert } from "reactstrap";
import Icon from "scenes/Landing/components/Icon";
import * as firestore from '../../services/firestore';

const IconsList = (props) => {

  const [listIcons, setListIcons] = useState([])
  const [alert, setAlert] = useState({ show: false, color: '', message: '' })
  const [refresh, setRefresh] = useState(false)

  const history = useHistory();

  useEffect(() => {
    firestore.getIcons()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          const d = { ...doc.data(), id: doc.id }
          docs.push(d)
        })

        setListIcons(docs)
      })

  }, [setListIcons])


  const handleIcons = () => {
    return listIcons.map((t, i) => {
      return (
        <tr key={i}>
          <td>{t.id}</td>
          <td>{t.name}</td>
          <th scope="row">
            <Icon
              key={i}
              imageSource={t.image}
              name={t.name}
              id={t.id + i}
            />
          </th>
          <td>
            <Button color="danger" size="sm" type="button" onClick={e => deleteIcons(t)}>
              Delete
            </Button>

          </td>
        </tr>
      )
    })
  }

  const deleteIcons = (icons) => {
    setAlert({ show: true, color: 'info', message: 'Trying to delete MediaSocial!' })

    firestore.deleteIcons(icons.id)
      .then(success => {
        setAlert({ show: true, color: 'success', message: 'Icons deleted sucessfully!' })

        setTimeout(() => {
          setRefresh(true)
        }, 1000)


      })
      .catch(err => {
        console.log(err)
        setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to delete Icons!' })

      })
  }

  const addIcons = () => {
    history.push({
      pathname: "/admin/iconsCrud"
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
                    <h3 className="mb-0">Icons List</h3>
                  </Col>
                  <Col xs="1">
                    <Button color="primary" size="large" type="button" onClick={e => addIcons()}>
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
                        <th scope="col">Name</th>
                        <th scope="col">Display Name</th>
                        <th scope="col">Icon</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {handleIcons()}
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

export default IconsList;
