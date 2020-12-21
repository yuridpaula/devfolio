import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import * as firestore from '../../../services/firestore';
import Project from "./Project";
import Separator from './Separator';

const Projects = (props) => {

  const { description } = props
  const [projects, setProjects] = useState([]);
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    firestore.getIcons()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          docs[doc.id] = doc.data()
        })

        setIcons(docs)
      })
    firestore.getProjects()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          docs.push(doc.data())
        })

        setProjects(docs)
      })

  }, [setProjects, setIcons]);

  const handleProjects = () => {
    return projects.map((t, i) => {
      return (
        <Project
          icons={icons}
          project={{ ...t, index: i }}
          key={i}
        />
      )
    })
  }

  return (
    <>
      <div className="text-center" id="projects">
        <h1 className="mt-5 d-flex align-items-center justify-content-center">Projects</h1>

        <div className="h5 mt-4">
          {description}
        </div>
      </div>
      <div className="h5 mt-6"></div>

      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlaySpeed={8000}
        centerMode={false}
        autoPlay={false}
        className=""
        containerClass="container"
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
            items: 2,
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
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >

        {handleProjects()}

      </Carousel>
      <Separator />
    </>
  )
}

export default Projects