import {useState, useEffect, useRef } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from "next/image";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// import { gsap } from "gsap";


export default function About({about, forwardedRef}) {
  const aboutContent = about[0]

  const {title, image, imagePlaceholder, content, info} = aboutContent.fields
  // <div className="image-container">
  //   <LazyLoadImage
  //    alt=""
  //    effect="blur"
  //    src={"http:"+image.fields.file.url} />
  // </div>
  return (
      <div ref={forwardedRef}  className="side-content">
          <div className="left-col">
            {documentToReactComponents(content)}
          </div>

          <div className="right-col">
            <div className="info-about">
              {documentToReactComponents(info)}
            </div>
            <div className="playlist">
              <iframe src="https://open.spotify.com/embed/playlist/1GggzWt2gtfS8H4U9Rod9T?theme=0" width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>

          </div>

      </div>
  )
}
