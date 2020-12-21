import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { auth, isAuthenticated } from '../../services/firestore';

const Login = (props) => {

  const [user, setUser] = useState({
    email: '',
    password: '',
    isLogged: false,
    error: false
  });

  const handleChange = e => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const authUser = () => {
    auth.signInWithEmailAndPassword(user.email, user.password)
      .then(user => {
        auth.currentUser.getIdToken()
          .then(idToken => {
            setUser({ ...user, isLogged: true })

          })
      }).catch(console.err)
  }

  if (isAuthenticated()) {
    return <Redirect to='/admin/profile' />
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" id="email" autoComplete="new-email" onChange={e => handleChange(e)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" id="password" autoComplete="new-password" onChange={e => handleChange(e)} />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={e => authUser()}>
                  Sign in
                  </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}


export default Login;
