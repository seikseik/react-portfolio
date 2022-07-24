import {useState, useEffect, useRef } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player/lazy'

import 'react-lazy-load-image-component/src/effects/blur.css';

const Loading = (
      <img
        src="https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif"
        alt="loader"
      />
    );



export default function Project({ forwardedRef, currentProj, projects}) {

  const current = projects.map((item) => {
    if(item.sys.id == currentProj){
      return(
        <div key={item.sys.id}  className="project-container">
            <div className="left-col">
              <h1>{item.fields.title}</h1>
              {documentToReactComponents(item.fields.content1)}
              <div className="proj-credit">
                <div className="proj-col-left">
                  {item.fields.link ? (
                    <a target="_blank" href={item.fields.link}>{item.fields.label}</a>
                  ) : (null)}
                  {item.fields.link2 ? (
                    <a target="_blank" href={item.fields.link2}>{item.fields.label2}</a>
                  ) : (null)}
                  {item.fields.link3 ? (
                    <a target="_blank" href={item.fields.link3}>{item.fields.label3}</a>
                  ) : (null)}
                </div>
                  {item.fields.credits ? (
                <div className="proj-col-right">
                  <span>CREDITS</span>
                  {documentToReactComponents(item.fields.credits)}
                </div>)
                : (null)}
              </div>
            </div>
            <div className="right-col">
              <div className="image-container">
                {
                  item.fields.gallery.map((el) => {
                    if(el.fields.file.contentType == "image/png" || el.fields.file.contentType == "image/jpeg" || el.fields.file.contentType == "image/jpg" ){
                      return(
                        <LazyLoadImage placeholder={Loading}
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
