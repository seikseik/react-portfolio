import {useState, useEffect, useRef } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from "next/image"
import { gsap } from "gsap";


export default function About({about}) {

  let sideRef = useRef(null);
  let sideRefTwo = useRef(null);

  const aboutContent = about[0]

  const {title, image, content} = aboutContent.fields

  const openMenu = () => {
    gsap.to(sideRef.current, { x: "0%", duration: 1.5, ease: "Power4.easeOut",});
    gsap.to(sideRefTwo.current, { x: "0%", duration: 1.5, ease: "Power4.easeOut",});
  };


  const closeMenu = () => {
      gsap.to(sideRef.current, { x: "100%", duration: 1.5, ease: "Power4.easeOut",});
      gsap.to(sideRefTwo.current, { x: "100%", duration: 1.5, ease: "Power4.easeOut",});
  };


  return (
      <>
      <div ref={sideRef} className="side-bar">
      </div>
          <div ref={sideRefTwo} className="side-content">
          <button onClick={() => closeMenu()} >X</button>
            <h1>{title}</h1>
            {documentToReactComponents(content)}
            <div>
            <Image src={"http:"+image.fields.file.url} width="600" height="400" />
            </div>
          </div>
      </>
  )
}
