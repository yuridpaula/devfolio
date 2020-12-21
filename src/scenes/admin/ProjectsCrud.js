/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table, UncontrolledAlert } from "reactstrap";
import CustomInput from "reactstrap/lib/CustomInput";
import * as firestore from '../../services/firestore';

const ProjectsCrud = (props) => {

  const { projects } = props.location.state || props

  const [crudProjects, setCrudProjects] = useState(projects)
  const [listIcons, setListIcons] = useState([])
  const [filesToDelete, setFilesToDelete] = useState([])
  const [filesToUpload, setFilesToUpload] = useState([])

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
      saveProjects()
    }
  }, [save])

  const saveProjects = () => {

    Promise.all(
      filesToDelete.map(deleteFile)
    )
      .then(() => {
        Promise.all(
          filesToUpload.map(uploadFile)
        )
          .then(() => {

            const newProjects = {
              name: crudProjects.name,
              status: crudProjects.status,
              link: crudProjects.link,
              color: crudProjects.color,
              description: crudProjects.description,
              techs: crudProjects.techs,
              images: crudProjects.images,
            }

            console.log('projects ->', newProjects)
            firestore.saveProjects(newProjects, crudProjects.id)
              .then(success => {
                setAlert({ show: true, color: 'success', message: 'Projects Saved Successfully!!' })
                setTimeout(() => {
                  setRefresh(true)
                }, 1000)
              })
              .catch(err => {
                console.log(err)
                setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to save Projects!' })
              })
          })
          .catch((error) => {
            console.log(error)
            setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to upload image!' })
          })
      })
      .catch((error) => {
        console.log(error)
        setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to delete image!' })
      })
  }

  const deleteFile = (f) => {
    return firestore.storage.refFromURL(f).delete()
      .then(success => { })
      .catch(err => { })
  }

  const uploadFile = (f) => {
    return new Promise((resolve, reject) => {

      const uploadTask = firestore.storage.ref(`/projects/${f.name}`).put(f)

      uploadTask.on('state_changed',
        (snapshot) => { },
        (error) => { },
        () => {
          firestore.storage.ref('projects').child(`${f.name}`).getDownloadURL()
            .then(fireBaseUrl => {
              let images = crudProjects.images

              images.push(fireBaseUrl)

              setCrudProjects({ images: images, ...crudProjects })
              resolve('ok')
            })
        })

    })
  }

  const handleChange = e => {
    setCrudProjects({ ...crudProjects, [e.target.id]: e.target.value })
  }

  const handleSave = async () => {
    setAlert({ show: true, color: 'info', message: 'Saving Projects!' })

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
    return crudProjects.techs.map((t, i) => {
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
    let techs = crudProjects.techs

    techs.splice(crudProjects.techs.indexOf(icon), 1)

    setCrudProjects({ techs: techs, ...crudProjects })
  }

  const addSelectedIcon = () => {
    let icon = crudProjects.iconSelect
    let techs = crudProjects.techs

    if (techs.indexOf(icon) === -1) {
      techs.push(icon)

      setCrudProjects({ techs: techs, ...crudProjects })

      setAlert({ show: true, color: 'success', message: 'Icon Added!!' })

    } else {
      setAlert({ show: true, color: 'warning', message: 'Icon already Added!!' })
    }

    setTimeout(() => {
      setAlert({ show: false })
    }, 2000)
  }

  const deleteSelectedImage = (image) => {
    let files = filesToDelete

    files.push(image)

    setFilesToDelete(files)

    let images = crudProjects.images

    images.splice(crudProjects.images.indexOf(image), 1)

    setCrudProjects({ images: images, ...crudProjects })

  }

  const handleImages = () => {
    return crudProjects.images.map((t, i) => {
      return (
        <tr key={i}>
          <th scope="row">
            <img
              alt={i}
              src={t}
              style={{
                backgroundColor: 'white'
              }}
              width="100"
              height="50"

            />
          </th>
          <td>
            <Button color="danger" size="sm" type="button" onClick={e => deleteSelectedImage(t, i)}>
              Delete
            </Button>
          </td>
        </tr>
      )
    })
  }

  const uploadFiles = (e) => {
    let files = []
    for (var i = 0; i < e.target.files.length; i++) {
      var imageFile = e.target.files[i];

      files.push(imageFile)
    }

    setFilesToUpload(files)
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
                    <h3 className="mb-0">Projects Crud</h3>
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
                          <Input placeholder="Name" type="text" id="name" onChange={e => handleChange(e)} defaultValue={crudProjects.name} />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xl="4">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-building" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Status" type="text" id="status" onChange={e => handleChange(e)} defaultValue={crudProjects.status} />
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
                          <Input placeholder="Link" type="text" id="link" onChange={e => handleChange(e)} defaultValue={crudProjects.link} />
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
                          <Input placeholder="Color" type="text" id="color" onChange={e => handleChange(e)} defaultValue={crudProjects.color} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>


                  <FormGroup>
                    <label>Description</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="Description Text"
                      rows="4"
                      defaultValue={crudProjects.description}
                      id={'description'}
                      onChange={e => handleChange(e)}
                      type="textarea"
                    />
                  </FormGroup>
                  <Row>
                    <Col xl="5">
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

                    </Col>
                    <Col xl="1">
                      <Button color="primary" type="button" onClick={e => addSelectedIcon()}>
                        Add
                      </Button>
                    </Col>
                    <Col xl="1"></Col>
                    <Col xl="5">
                      <FormGroup>
                        <label>Projects Images to Upload</label>
                        <CustomInput
                          className="form-control-alternative"
                          placeholder="Upload Projects Image"
                          onChange={e => uploadFiles(e)}
                          type="file"
                          name="uploads"
                          id="uploads"
                          multiple
                        />
                      </FormGroup>
                    </Col>

                  </Row>

                  <Row>
                    <Col xl="6">
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
                    </Col>
                    <Col xl="1">

                    </Col>
                    <Col xl="5">
                      <div className="col">
                        <Card className="">
                          <Table className="align-items-center table-flush" size="sm" responsive striped hover>
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Uploaded Images</th>
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {handleImages()}
                            </tbody>
                          </Table>
                        </Card>
                      </div>
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

ProjectsCrud.defaultProps = {
  projects: {
    id: '',
    name: '',
    status: '',
    link: '',
    color: '',
    description: '',
    techs: [],
    images: []
  }
}


export default ProjectsCrud;
