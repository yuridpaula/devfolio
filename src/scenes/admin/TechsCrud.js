/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table, UncontrolledAlert } from "reactstrap";
import * as firestore from '../../services/firestore';

const TechsCrud = (props) => {

  const { techs } = props.location.state || props

  const [crudTechs, setCrudTechs] = useState(techs)
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
      saveTechs()
    }
  }, [save])

  const saveTechs = () => {
    const newTechs = {
      color: crudTechs.color,
      name: crudTechs.name,
      icon: crudTechs.icon,
      icons: crudTechs.icons
    }

    firestore.saveTechs(newTechs, crudTechs.id)
      .then(success => {
        setAlert({ show: true, color: 'success', message: 'Techs Saved Successfully!!' })
        setTimeout(() => {
          setRefresh(true)
        }, 1000)
      })
      .catch(err => {
        console.log(err)
        setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to save Techs!' })
      })
  }

  const handleChange = e => {
    setCrudTechs({ ...crudTechs, [e.target.id]: e.target.value })
  }

  const handleSave = async () => {
    setAlert({ show: true, color: 'info', message: 'Saving Techs!' })

    setSave(true)
  }

  const handleIcons = () => {
    return listIcons.map((t, i) => {
      return (
        <option key={i} value={t.id}>{t.id}</option>
      )
    })
  }

  const handleSelectedIcons = () => {
    return crudTechs.icons.map((t, i) => {
      return (
        <tr key={i}>
          <td>{t}</td>
          <td>
            <Button color="danger" size="sm" type="button" onClick={e => deleteSelectedIcon(t)}>
              Delete
            </Button>
          </td>
        </tr>
      )
    })
  }

  const deleteSelectedIcon = (icon) => {
    let icons = crudTechs.icons

    icons.splice(crudTechs.icons.indexOf(icon), 1)

    setCrudTechs({ icons: icons, ...crudTechs })

  }

  const addSelectedIcon = () => {
    let icon = crudTechs.iconSelect
    let icons = crudTechs.icons

    if (icons.indexOf(icon) === -1) {
      icons.push(icon)

      setCrudTechs({ icons: icons, ...crudTechs })

      setAlert({ show: true, color: 'success', message: 'Icon Added!!' })

    } else {
      setAlert({ show: true, color: 'warning', message: 'Icon already Added!!' })
    }

    setTimeout(() => {
      setAlert({ show: false })
    }, 2000)
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
                    <h3 className="mb-0">Techs Crud</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <Row>

                    <Col xl="3">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-key-25" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Id" type="text" id="id" onChange={e => handleChange(e)} defaultValue={crudTechs.id} />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xl="3">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-settings" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Name" type="text" id="name" onChange={e => handleChange(e)} defaultValue={crudTechs.name} />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xl="3">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Icon" type="text" id="icon" onChange={e => handleChange(e)} defaultValue={crudTechs.icon} />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xl="3">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-atom" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Color" type="text" id="color" onChange={e => handleChange(e)} defaultValue={crudTechs.color} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="6">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-key-25" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="iconSelect" type="select" id="iconSelect" onChange={e => handleChange(e)}>
                            {handleIcons()}
                          </Input>
                        </InputGroup>
                      </FormGroup>
                      <Button color="primary" size="sm" type="button" onClick={e => addSelectedIcon()}>
                        Add Icon
                      </Button>
                    </Col>

                    <div className="col">
                      <Card className="">
                        <Table className="align-items-center table-flush" size="sm" responsive striped hover>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {handleSelectedIcons()}
                          </tbody>
                        </Table>
                      </Card>
                    </div>

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

TechsCrud.defaultProps = {
  techs: {
    id: '',
    color: '',
    name: '',
    icon: '',
    icons: []
  }
}


export default TechsCrud;
