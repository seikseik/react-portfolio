import {useState, useEffect, useRef } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from "next/image"
import { gsap } from "gsap";


export default function About({about}) {

  const aboutContent = about[0]

  const {title, image, content} = aboutContent.fields


  return (

      <div className="side-content">
            <h1>{title}</h1>
            {documentToReactComponents(content)}
            <div>
            <Image src={"http:"+image.fields.file.url} width="600" height="400" />
            </div>
      </div>
  )
}
