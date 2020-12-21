import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "reactstrap";
import { auth, isAuthenticated } from "services/firestore";

const AdminNavbar = props => {

  const [, setAuthenticated] = useState(true);

  const logOut = () => {
    auth.signOut().then(function () {
      setAuthenticated(false)
    }).catch(console.err)
  }

  if (!isAuthenticated()) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to={`/admin/${props.brand}`}
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <Button className="my-4" color="primary" type="button" onClick={e => logOut()}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
