import {useState, useEffect, useRef } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Mousewheel, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination, A11y, Mousewheel, EffectFade]);

import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";

export default function Slideshow({project, addToslideShowRef, changeCoord}) {


  let titleRefs = useRef([]);
  titleRefs.current = [];

   const addToRefs = (el) =>{
     if(el && !titleRefs.current.includes(el)){
       titleRefs.current.push(el);
     }
   }


  const startAnimationNext = () =>{
    titleRefs.current.forEach((item, i) => {
      if(item.classList.contains("active")){

        let tl = gsap.timeline(),
            mySplitText = new SplitText(item, {type:"words,chars", wordsClass: "split-line"
          }),
          chars = mySplitText.chars;
          gsap.set(item, {perspective: 400});

        // tl.from(chars,
        //   {  duration: 0.4,
        //     ease: "circ.out",
        //     y: 70,
        //     stagger: 0.02
        //   },
        //    "+=0");

        tl.fromTo(chars, {autoAlpha: 0},
          {  duration: 1,
               autoAlpha: 1,
               ease: "circ.out",
               stagger: 0.03
          },
          "+=0");
      }
    });
  }
  const startAnimationPrev = () =>{
    titleRefs.current.forEach((item, i) => {
      if(item.classList.contains("active")){
        titleRefs.current.forEach((item, i) => {
          if(item.classList.contains("active")){

            let tl = gsap.timeline(),
                mySplitText = new SplitText(item, {type:"words,chars", wordsClass: "split-line"
              }),
                chars = mySplitText.chars;
            gsap.set(item, {perspective: 400});

            // tl.from(chars,
            //   {  duration: 0.4,
            //     ease: "circ.out",
            //     y: 70,
            //     stagger: 0.02
            //   },
            //    "+=0");

            tl.fromTo(chars, {autoAlpha: 0},
              {  duration: 1,
                   autoAlpha: 1,
                   ease: "circ.out",
                   stagger: 0.03
              },
              "+=0");
          }
        });
      }
    });
  }


  const params = {
    container: ".container",
    pagination: ".swiper-pagination",
    direction: "vertical",
    speed: 400,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    mousewheel: {
      sensitivity: 6,
    }
  };


  return (
    <div className="slider-custom-cont">
    <Swiper {...params}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSlideNextTransitionStart={() => startAnimationNext()}
      onSlidePrevTransitionStart={() => startAnimationPrev()}
      onSlideChangeTransitionStart={() => changeCoord()}
    >
        {project.map((item) => {
            return (
              <SwiperSlide>
               {({ isActive }) => (

                <div ref={addToslideShowRef} className={"slide-inner " + (isActive ? 'active' : '')} lat={item.fields.lat} lon={item.fields.lon}>
                <h1
                   ref={addToRefs}
                   className={"title " + (isActive ? 'active' : '')}
                 >
                 {item.fields.title}
                 </h1>
                 <h4>{item.fields.subtitle}</h4>
                 <span data-attr="{item.fields.subtitle}"> See the project</span>
              </div>
              )}
            </SwiperSlide>
            )
          })
        }
    </Swiper>
    </div>
  )
}
