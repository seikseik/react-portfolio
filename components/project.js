import {useState, useEffect, useRef } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player/lazy'

import 'react-lazy-load-image-component/src/effects/blur.css';
import { gsap } from "gsap";


export default function Project({ forwardedRef, currentProj, projects}) {
  const current = projects.map((item) => {
    if(item.sys.id == currentProj){
      return(
        <div key={item.sys.id}  className="project-container">
            <div className="left-col">
              <h1>{item.fields.title}</h1>
              {documentToReactComponents(item.fields.content1)}
              {documentToReactComponents(item.fields.credits)}
            </div>
            <div className="right-col">
              <div className="image-container">
                {
                  item.fields.gallery.map((el) => {
                    if(el.fields.file.contentType == "image/png" || el.fields.file.contentType == "image/jpg" ){
                      return(
                        <LazyLoadImage
                         key={el.sys.id}
                         alt=""
                         effect="blur"
                         src={"http:"+el.fields.file.url} />
                      )
                    }
                    if(el.fields.file.contentType == "video/mp4"){
                      return(
                        <ReactPlayer
                          playing={true}
                          playsinline={true}
                          key={el.sys.id}
                          width="100%"
                          height="100%"
                          muted={true}
                          controls={false}
                          loop={true}
                          url={"http:"+el.fields.file.url}/>
                      )
                    }

                  })
                }
              </div>
            </div>
        </div>
      )
    }
  })
  if(currentProj != null){
    return (
      <div ref={forwardedRef} className="side-content-project"> {current}</div>
    )
  }else{
    return null
  }

}
