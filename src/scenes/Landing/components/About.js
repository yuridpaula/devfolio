import React from "react";
import Separator from './Separator'

const About = (props) => {

  const { about, residence } = props

  return (
    <>
      <div className="text-center" id="about">
        <h1 className="mt-8 d-flex align-items-center justify-content-center">About</h1>

        <div className="h5 mt-4">
          {about}
        </div>
        <div>
          {residence}
        </div>
      </div>


      <Separator />
    </>
  )
}

export default About