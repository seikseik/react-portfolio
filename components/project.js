import {useState, useEffect, useRef } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { gsap } from "gsap";


export default function Project({ forwardedRef, currentProj, projects}) {
  const current = projects.map((item) => {
    if(item.sys.id == currentProj){
      return(
        <div key={item.sys.id} ref={forwardedRef} className="Project-container side-content-project">
            <div className="left-col">
              <h1>{item.fields.title}</h1>
            </div>
            <div className="right-col">
              <div className="image-container">

              </div>
            </div>

        </div>
      )
    }
  })

  if(currentProj != null){
    return (
      <div> {current}</div>
    )
  }else{
    return null
  }

}
