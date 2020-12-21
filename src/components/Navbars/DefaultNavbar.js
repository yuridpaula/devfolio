import React from "react";
import Scrollchor from 'react-scrollchor';
import { Container, Nav, Navbar, NavItem, UncontrolledCollapse, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";

const DefaultNavbar = () => {

  let menus = [
    {
      name: 'About',
      icon: 'badge',

    },
    {
      name: 'Techs',
      icon: 'paper-diploma',

    },
    {
      name: 'Projects',
      icon: 'collection',

    },
    {
      name: 'Testimonials',
      icon: 'single-copy-04',

    }
  ]

  const getMenus = () => {
    return menus.map((m, i) => {
      return (
        <NavItem key={i}>
          <Scrollchor to={`#${m.name.toLowerCase()}`} className="nav-link">
            <i className={`ni ni-${m.icon}`} />
            <span className="nav-link-inner--text text-white">{m.name}</span>
          </Scrollchor>
        </NavItem>
      )
    })
  }

  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark"
        expand="md"
      >
        <Container className="px-4">
          <NavbarBrand to="/auth/login" tag={Link}>
            <span className="nav-link-inner--text text-white">Devfolio</span>
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <Nav className="ml-auto" navbar>
              {getMenus()}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default DefaultNavbar