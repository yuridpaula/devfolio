import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { Card, CardBody, CardImg, CardTitle, Col, Row, Badge } from "reactstrap";
import ListIcons from "./ListIcons";

import LightBox, { Modal, ModalGateway } from "react-images";

const Project = (props) => {

  const { project, icons } = props

  const modalData = project.images.map((m, i) => ({ source: m }))

  const [lightBox, setLightBox] = useState({});

  const handleImages = () => {
    return (
      project.images.map((m, i) => {
        return (
          <CardImg
            key={i}
            alt=""
            src={m}
            top
            onClick={() => toggleLightbox(i)}
          />
        )
      })
    )
  }

  const toggleLightbox = selectedIndex => {
    setLightBox({
      lightboxIsOpen: !lightBox.lightboxIsOpen,
      selectedIndex
    })
  }

  return (
    <Col xl="12">
      <Card key={project.index} className="shadow mb-4 mb-lg-0">

        <CardBody>
          <Row>
            <div className="col">
              <CardTitle className="text-uppercase text-muted mb-0">
                {project.name}
              </CardTitle>
            </div>
          </Row>

          <Row className=" d-flex align-items-center justify-content-center">
            <Col xl="6" className="">
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay={false}
                autoPlaySpeed={5000}
                centerMode={false}
                className=""
                containerClass=""
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024
                    },
                    items: 1,
                    partialVisibilityGutter: 40
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                  }
                }}
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {handleImages()}

              </Carousel>
              <ModalGateway>
                {lightBox.lightboxIsOpen ? (
                  <Modal onClose={toggleLightbox}>
                    <LightBox
                      currentIndex={lightBox.selectedIndex}
                      frameProps={{ autoSize: true }}
                      modalProps={{ isFullscreen: true }}
                      views={modalData}
                      infinite
                    />
                  </Modal>
                ) : null}
              </ModalGateway>
            </Col>

            <Col xl="6">
              <div className="h5 mt-4">
                {project.description}
              </div>
              <Badge
                color={project.color}
                href={project.link}
                target={"_blank"}
              >
                {project.status}
              </Badge>
            </Col>
          </Row>

          <hr className="my-1" />
          <Row className=" ">
            <ListIcons
              icons={icons}
              listIcons={project.techs}
            />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Project