import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import * as firestore from '../../services/firestore';
import MediaSocial from '../MediaSocial';

const Header = (props) => {

  const { icons } = props

  const [profile, setProfile] = useState({});

  useEffect(() => {
    firestore.getProfile()
      .then(ref => {
        setProfile(ref.data())
      })
  }, [setProfile]);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            `url(${profile.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        <span className="mask bg-gradient-default opacity-6" />
        <Container className="d-flex align-items-center justify-content-center" fluid>
          <Row>
            <Col lg="12">
              <h1 className="display-2 text-white d-flex align-items-center justify-content-center">{profile.name}</h1>
              <p className="text-white mt-0 mb-5 d-flex align-items-center justify-content-center">
                {profile.occupation}
              </p>

              <MediaSocial icons={icons} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Header;
