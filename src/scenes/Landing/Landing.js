import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import * as firestore from '../../services/firestore';
import About from './components/About';
import Projects from "./components/Projects";
import Techs from "./components/Techs";
import Testimonials from "./components/Testimonials";

const LandingPage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    firestore.getProfile()
      .then(ref => {
        setProfile(ref.data())
      })

  }, [setProfile]);

  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile ">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={profile.perfil}
                    />
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4">

                <About
                  about={profile.about}
                  residence={profile.residence}
                />

                <Techs
                  description={profile.techs}
                />

                <Projects
                  description={profile.projects}
                />

                <Testimonials
                  description={profile.testimonials}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage
