import React from "react";
import { Card, CardBody, Col } from "reactstrap";

const Testimonial = (props) => {

  const { testimonial } = props
  return (
    <Col xl="12">
      <Card key={testimonial.index} className="shadow mb-4 mb-lg-0 padding-0">

        <CardBody>
          <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
            <i className="fa fa-quote-left" />
          </div>
          <blockquote className="blockquote text-center">

            <p className="mb-0">
              {testimonial.text}
            </p>
            <hr className="my-1" />
            <footer className="blockquote-footer text-right text-muted">
              <em>{testimonial.name}
                <br />
                <cite title="Source Title">{testimonial.company}</cite>
              </em>
            </footer>
          </blockquote>

        </CardBody>
      </Card>
    </Col>
  )
}

export default Testimonial