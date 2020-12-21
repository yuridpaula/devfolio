/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, CustomInput, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, UncontrolledAlert } from "reactstrap";
import * as firestore from '../../services/firestore';

const Profile = (props) => {

  const [profile, setProfile] = useState({});
  const [alert, setAlert] = useState({ show: false, color: '', message: '' })
  const [refresh, setRefresh] = useState(false)

  const [profileImage, setProfileImage] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')

  const [save, setSave] = useState(false)

  useEffect(() => {
    firestore.getProfile()
      .then(ref => {
        setProfile(ref.data())
      })

  }, [setProfile])

  useEffect(() => {
    if (save) {
      saveProfile()
    }
  }, [save]);

  const saveProfile = () => {

    firestore.saveProfile(profile)
      .then(success => {
        setAlert({ show: true, color: 'success', message: 'Profile Saved Successfully!!' })
        setTimeout(() => {
          setRefresh(true)
        }, 1000)
      })
      .catch(err => {
        console.log(err)
        setAlert({ show: true, color: 'danger', message: 'An error occurred while trying to save profile!' })
      })
  }

  const handleChange = e => {
    setProfile({ ...profile, [e.target.id]: e.target.value })
  }

  const handleImage = (e) => {
    const image = e.target.files[0]
    if (e.target.id === 'profileImage') {
      setProfileImage(image)
    } else {
      setBackgroundImage(image)
    }
  }

  const uploadImage = (name, input) => {
    return new Promise((resolve, reject) => {

      if (!input) {
        resolve("sem upload")
      } else {
        const uploadTask = firestore.storage.ref(`/images/${name}.jpg`).put(input)

        uploadTask.on('state_changed',
          (snapshot) => { },
          (error) => { },
          () => {
            firestore.storage.ref('images').child(`${name}.jpg`).getDownloadURL()
              .then(fireBaseUrl => {
                setProfile({ ...profile, [name]: fireBaseUrl })
                resolve("upload ok!")

              })
          })
      }

    })
  }

  const handleFireBaseUpload = async () => {
    setAlert({ show: true, color: 'info', message: 'Saving Profile!' })

    await uploadImage('perfil', profileImage)

    await uploadImage('background', backgroundImage)

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
                    <h3 className="mb-0">Profile Settings</h3>
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
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Name" type="text" id="name" onChange={e => handleChange(e)} defaultValue={profile.name} />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xl="4">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-paper-diploma" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Occupation" type="text" id="occupation" onChange={e => handleChange(e)} defaultValue={profile.occupation} />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xl="4">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-pin-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Residence" type="text" id="residence" onChange={e => handleChange(e)} defaultValue={profile.residence} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl="6">
                      <FormGroup>
                        <label>Profile Image</label>
                        <CustomInput
                          className="form-control-alternative"
                          placeholder="Profile Image"
                          onChange={handleImage}
                          type="file"
                          name="profileImage"
                          id="profileImage"
                        />
                      </FormGroup>
                    </Col>

                    <Col xl="6">
                      <FormGroup>
                        <label>BackGround Image</label>
                        <CustomInput
                          className="form-control-alternative"
                          placeholder="Background Image"
                          onChange={handleImage}
                          type="file"
                          name="backgroundImage"
                          id="backgroundImage"
                        />
                      </FormGroup>
                    </Col>

                  </Row>

                  <FormGroup>
                    <label>About Me</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="About section description"
                      rows="4"
                      defaultValue={profile.about}
                      id={'about'}
                      onChange={e => handleChange(e)}
                      type="textarea"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>My Techs</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="techs section description"
                      rows="4"
                      defaultValue={profile.techs}
                      id={'techs'}
                      onChange={e => handleChange(e)}
                      type="textarea"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>My Projects</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="techs section description"
                      rows="4"
                      defaultValue={profile.projects}
                      id={'projects'}
                      onChange={e => handleChange(e)}
                      type="textarea"
                    />
                  </FormGroup>

                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button" onClick={e => handleFireBaseUpload()} >
                      Save
                  </Button>
                  </div>
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

export default Profile;
