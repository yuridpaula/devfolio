/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, UncontrolledAlert } from "reactstrap";
import * as firestore from '../../services/firestore';

const TestimonialsCrud = (props) => {

  const { testimonials } = props.location.state || props

  const [crudTestimonials, setCrudTestimonials] = useState(testimonials)

  const [alert, setAlert] = useState({ show: false, color: '', message: '' })
  const [refresh, setRefresh] = useState(false)

  const [save, setSave] = useState(false)

  useEffect(() => {
    if (save) {
      saveTestimonials()
    }
  }, [save])

  const saveTestimonials = () => {
    const newTestimonials = {
      company: crudTestimonials.company,
      name: crudTestimonials.name,
      text: crudTestimonials.text
    }

    firestore.saveTestimonials(newTestimonials, crudTestimonials.id)
      .then(success => {
        setAlert({ show: true, color: 'success', message: 'Testimonials Saved Successfully!!' })
        setTimeout(() => {
          setRefresh(true)
        }, 1000)
      })
      .catch(err => {
        console.log(err)
        setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to save Testimonials!' })
      })
  }

  const handleChange = e => {
    setCrudTestimonials({ ...crudTestimonials, [e.target.id]: e.target.value })
  }

  const handleSave = async () => {
    setAlert({ show: true, color: 'info', message: 'Saving Testimonials!' })

    setSave(true)
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
                  <Col xs="8">
                    <h3 className="mb-0">Testimonials Crud</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <Row>
                    <Col xl="4">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-building" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Company" type="text" id="company" onChange={e => handleChange(e)} defaultValue={crudTestimonials.company} />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xl="4">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-badge" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Name" type="text" id="name" onChange={e => handleChange(e)} defaultValue={crudTestimonials.name} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>


                  <FormGroup>
                    <label>Text</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="Testimonial Text"
                      rows="4"
                      defaultValue={crudTestimonials.text}
                      id={'text'}
                      onChange={e => handleChange(e)}
                      type="textarea"
                    />
                  </FormGroup>


                  <Row>
                    <Col xl="12">
                      <div className="text-center">
                        <Button className="my-4" color="primary" type="button" onClick={e => handleSave()} >
                          Save
                  </Button>
                      </div>
                    </Col>
                  </Row>
                  {alert.show &&
                    <UncontrolledAlert color={alert.color}>
                      {alert.message}
                    </UncontrolledAlert>
                  }
                </Form>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

TestimonialsCrud.defaultProps = {
  testimonials: {
    id: '',
    company: '',
    name: '',
    text: ''
  }
}

export default TestimonialsCrud;
