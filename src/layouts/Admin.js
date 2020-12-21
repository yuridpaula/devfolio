import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footers/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.group) {
        return prop.innerRoutes.map((prop2, key2) => {

          if (prop2.layout === "/admin") {
            return (
              <Route
                path={prop2.layout + prop2.path}
                component={prop2.component}
                key={key + key2}
              />
            );
          } else {
            return null;
          }
        })
      } else {

        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return null;
        }
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].group) {
        for (let j = 0; j < routes[i].innerRoutes.length; j++) {
          if (
            this.props.location.pathname.indexOf(
              routes[i].innerRoutes[j].layout + routes[i].innerRoutes[j].path
            ) !== -1
          ) {
            return routes[i].innerRoutes[j].name;
          }
        }
      } else {
        if (
          this.props.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }

    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/profile",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <div className=" bg-gradient-default pb-8 pt-6"></div>
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/profile" />
          </Switch>
          <Container fluid>
            <Footer />
          </Container>
        </div>

      </>
    );
  }
}

export default Admin;
