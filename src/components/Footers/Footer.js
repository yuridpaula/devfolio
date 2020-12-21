import React from "react";
import { Col, Container, Row } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="12">
                <div className="copyright text-center text-muted">
                  © {" " + new Date().getFullYear()}
                  <a
                    className="font-weight-bold ml-1"
                    href="/"
                    target=""
                  >
                    Yuri de Paula
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Footer;
