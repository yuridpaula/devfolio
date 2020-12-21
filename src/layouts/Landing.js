import Footer from "components/Footers/Footer.js";
import Header from "components/Headers/Header.js";
import DefaultNavbar from "components/Navbars/DefaultNavbar.js";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import * as firestore from "../services/firestore";

const LandingLayout = () => {

  const [icons, setIcons] = useState([]);

  useEffect(() => {
    document.body.classList.add("bg-secondary");
    return () => {
      document.body.classList.remove("bg-secondary");
    };
  }, [])

  useEffect(() => {
    firestore.getIcons()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          docs[doc.id] = doc.data()
        })
        setIcons(docs)
      })
  }, [setIcons])

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/landing") {
        return (
          <Route
            path={"/"}
            component={prop.component}
            key={key}
            render={(props) => <prop.component {...props} />}//data goes here
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      <div className="main-content">
        <DefaultNavbar />
        <Header icons={icons} />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/" />
        </Switch>
      </div>
      <Footer />
    </>
  );
}


export default LandingLayout;
