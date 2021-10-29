import {useState, useEffect, useRef } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from "next/image";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function About({about, forwardedRef}) {
  const aboutContent = about[0]

  const {title, image, imagePlaceholder, content, info} = aboutContent.fields

  return (
      <div ref={forwardedRef}  className="side-content">
          <div className="left-col">
            {documentToReactComponents(content)}
          </div>

          <div className="right-col">
            <div className="info-about">
              {documentToReactComponents(info)}
            </div>
          </div>

      </div>
  )
}
