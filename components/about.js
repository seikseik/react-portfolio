import {useState, useEffect, useRef } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from "next/image";
import LazyImage from 'react-lazy-blur-image';
import { gsap } from "gsap";


export default function About({about, forwardedRef}) {
  const aboutContent = about[0]

  const {title, image, imagePlaceholder, content, info} = aboutContent.fields



  return (
      <div ref={forwardedRef}  className="side-content">

          <div className="left-col">
            {documentToReactComponents(content)}
          </div>
          <div className="right-col">
            <div className="image-container">
                <LazyImage
                  placeholder={"http:"+imagePlaceholder.fields.file.url}
                  uri={"http:"+image.fields.file.url}
                  render={(src, style) => <img src={src} style={style} />}
              />
            </div>
            <div>
              {documentToReactComponents(info)}
            </div>
          </div>

      </div>
  )
}
