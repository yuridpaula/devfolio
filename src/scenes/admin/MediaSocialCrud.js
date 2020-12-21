/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, UncontrolledAlert } from "reactstrap";
import * as firestore from '../../services/firestore';

const MediaSocialCrud = (props) => {
  const initialState = {
    name: '',
    link: ''
  }

  const [crudMediaSocial, setCrudMediaSocial] = useState(initialState)

  const [listIcons, setListIcons] = useState([])

  const [alert, setAlert] = useState({ show: false, color: '', message: '' })
  const [refresh, setRefresh] = useState(false)

  const [save, setSave] = useState(false)

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

  useEffect(() => {
    if (save) {
      saveMediaSocial()
    }
  }, [save])

  const saveMediaSocial = () => {
    const newMedia = {
      link: crudMediaSocial.link
    }

    firestore.saveMediaSocial(newMedia, crudMediaSocial.name)
      .then(success => {
        setAlert({ show: true, color: 'success', message: 'MediaSocial Saved Successfully!!' })
        setTimeout(() => {
          setRefresh(true)
        }, 1000)
      })
      .catch(err => {
        console.log(err)
        setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to save MediaSocial!' })
      })
  }

  const handleChange = e => {
    setCrudMediaSocial({ ...crudMediaSocial, [e.target.id]: e.target.value })
  }

  const handleSave = async () => {
    setAlert({ show: true, color: 'info', message: 'Saving MediaSocial!' })

    setSave(true)
  }

  const handleIcons = () => {
    return listIcons.map((t, i) => {
      return (
        <option key={i} value={t.id}>{t.id}</option>
      )
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
                  <Col xs="8">
                    <h3 className="mb-0">MediaSocial Crud</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <Row>

                    <Col xl="6">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-key-25" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Name" type="select" id="name" onChange={e => handleChange(e)} defaultValue={crudMediaSocial.name}>
                            {handleIcons()}
                          </Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xl="6">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-world-2" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Link" type="text" id="link" onChange={e => handleChange(e)} defaultValue={crudMediaSocial.link} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
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

export default MediaSocialCrud;
