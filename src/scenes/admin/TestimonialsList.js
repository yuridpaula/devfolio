/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Table, UncontrolledAlert } from "reactstrap";
import * as firestore from '../../services/firestore';

const TestimonialsList = (props) => {

  const [listTestimonials, setListTestimonials] = useState([])
  const [alert, setAlert] = useState({ show: false, color: '', message: '' })
  const [refresh, setRefresh] = useState(false)

  const history = useHistory();

  useEffect(() => {
    firestore.getTestimonials()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          const d = { ...doc.data(), id: doc.id }
          docs.push(d)
        })

        setListTestimonials(docs)
      })

  }, [setListTestimonials])


  const handleTestimonials = () => {
    return listTestimonials.map((t, i) => {
      return (
        <tr key={i}>
          <td>{t.company}</td>
          <td>{t.name}</td>
          <td>{t.text}</td>
          <td>
            <Button color="info" size="sm" type="button" onClick={e => editTestimonials(t)}>
              Edit
            </Button>
            <Button color="danger" size="sm" type="button" onClick={e => deleteTestimonials(t)}>
              Delete
            </Button>

          </td>
        </tr>
      )
    })
  }

  const deleteTestimonials = (testimonials) => {
    setAlert({ show: true, color: 'info', message: 'Trying to delete MediaSocial!' })

    firestore.deleteTestimonials(testimonials.id)
      .then(success => {
        setAlert({ show: true, color: 'success', message: 'Testimonials deleted sucessfully!' })

        setTimeout(() => {
          setRefresh(true)
        }, 1000)


      })
      .catch(err => {
        console.log(err)
        setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to delete Testimonials!' })

      })
  }

  const editTestimonials = (testimonials) => {
    history.push({
      pathname: "/admin/testimonialsCrud",
      state: { testimonials: testimonials }
    })
  }

  const addTestimonials = () => {
    history.push({
      pathname: "/admin/testimonialsCrud"
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
                    <h3 className="mb-0">Testimonials List</h3>
                  </Col>
                  <Col xs="1">
                    <Button color="primary" size="large" type="button" onClick={e => addTestimonials()}>
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
                        <th scope="col">Company</th>
                        <th scope="col">Name</th>
                        <th scope="col">Text</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {handleTestimonials()}
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

export default TestimonialsList;
