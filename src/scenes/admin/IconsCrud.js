/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, CustomInput, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, UncontrolledAlert } from "reactstrap";
import * as firestore from '../../services/firestore';

const IconsCrud = (props) => {

  const { icons } = props.location.state || props

  const [crudIcon, setCrudIcon] = useState(icons)

  const [alert, setAlert] = useState({ show: false, color: '', message: '' })
  const [refresh, setRefresh] = useState(false)

  const [save, setSave] = useState(false)

  useEffect(() => {
    if (save) {
      saveIcon()
    }
  }, [save])

  const saveIcon = () => {

    const newIcon = {
      image: crudIcon.url,
      name: crudIcon.displayName
    }

    firestore.saveIcon(newIcon, crudIcon.name)
      .then(success => {
        console.log(success)
        setAlert({ show: true, color: 'success', message: 'Icon Saved Successfully!!' })
        setTimeout(() => {
          setRefresh(true)
        }, 1000)
      })
      .catch(err => {
        console.log(err)
        setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to save icon!' })
      })
  }

  const handleChange = e => {
    setCrudIcon({ ...crudIcon, [e.target.id]: e.target.value })
  }

  const handleImage = (e) => {
    const image = e.target.files[0]
    setCrudIcon({ ...crudIcon, icon: image })
  }

  const uploadImage = () => {

    return new Promise((resolve, reject) => {

      if (!crudIcon.icon) {
        setAlert({ show: true, color: 'danger', message: 'No Image selected' })
        reject("sem imagem")
      } else {
        const uploadTask = firestore.storage.ref(`/icons/${crudIcon.name}.png`).put(crudIcon.icon)

        uploadTask.on('state_changed',
          (snapshot) => { },
          (error) => { },
          () => {
            firestore.storage.ref('icons').child(`${crudIcon.name}.png`).getDownloadURL()
              .then(fireBaseUrl => {
                setCrudIcon({ ...crudIcon, url: fireBaseUrl })
                resolve("upload ok!")
              })
          })
      }

    })
  }

  const handleFireBaseUpload = async () => {
    setAlert({ show: true, color: 'info', message: 'Saving Icon!' })

    await uploadImage()

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
                    <h3 className="mb-0">Icons Crud</h3>
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
                          <Input placeholder="Icon Name" type="text" id="name" onChange={e => handleChange(e)} defaultValue={crudIcon.name} />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xl="6">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Display Name" type="text" id="displayName" onChange={e => handleChange(e)} defaultValue={crudIcon.displayName} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="6">
                      <FormGroup>
                        <label>Icon Image</label>
                        <CustomInput
                          className="form-control-alternative"
                          placeholder="Icon Image"
                          onChange={handleImage}
                          type="file"
                          name="iconImage"
                          id="iconImage"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="12">
                      <div className="text-center">
                        <Button className="my-4" color="primary" type="button" onClick={e => handleFireBaseUpload()} >
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

IconsCrud.defaultProps = {
  icons: {
    displayName: '',
    name: '',
    image: ''
  }
}
export default IconsCrud;
