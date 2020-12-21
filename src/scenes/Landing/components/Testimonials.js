import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import * as firestore from '../../../services/firestore';
import Separator from './Separator';
import Testimonial from "./Testimonial";

const Testimonials = (props) => {

  const { description } = props
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {

    firestore.getTestimonials()
      .then(snapshot => {
        let docs = []

        snapshot.forEach(doc => {
          docs.push(doc.data())
        })

        setTestimonials(docs)
      })

  }, [setTestimonials]);

  const handleTestimonials = () => {
    return testimonials.map((t, i) => {
      return (
        <Testimonial
          key={i}
          testimonial={{ ...t, index: i }}
        />
      )
    })
  }

  return (
    <>
      <div className="text-center" id="testimonials">
        <h1 className="mt-5 d-flex align-items-center justify-content-center">Testimonials</h1>

        <div className="h5 mt-4">
          {description}
        </div>
      </div>
      <div className="h5 mt-6"></div>

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
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
            items: 3,
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

        {handleTestimonials()}

      </Carousel>
      <Separator />
    </>
  )
}

export default Testimonials