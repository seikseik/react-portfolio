import {useState, useEffect, useRef } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Mousewheel, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination, A11y, Mousewheel, EffectFade]);

import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";

export default function Slideshow({project, addToslideShowRef, changeCoord, load, forwardedRef, changeProject}) {

  let titleRefs = useRef([]);
  titleRefs.current = [];

   const addToRefs = (el) =>{
     if(el && !titleRefs.current.includes(el)){
       titleRefs.current.push(el);
     }
   }

  useEffect(()=>{
    if(load){
      initAnimation();
    }
  }, [load])

const textAnimation = (item, del) =>{
  let tl = gsap.timeline(),
      mySplitText = new SplitText(item, {type:"words,chars", wordsClass: "split-line"
    }),
    chars = mySplitText.chars;
    gsap.set(item, {perspective: 400});

  tl.fromTo(chars, {autoAlpha: 0},
    {  duration: 1,
         autoAlpha: 1,
         ease: "circ.out",
         stagger: 0.03,
         delay: del
    },
    "+=0");
}

  const startAnimationNext = () =>{
    titleRefs.current.forEach((item, i) => {
      if(item.classList.contains("active")){
      textAnimation(item, 0);
      }
    });
  }

  const startAnimationPrev = () =>{
    titleRefs.current.forEach((item, i) => {
      if(item.classList.contains("active")){
      textAnimation(item, 0);
      }
    });
  }

  const initAnimation = () =>{
    let item = titleRefs.current[0]
    textAnimation(item, 0.2);
  }

  const params = {
    container: ".container",
    pagination: ".swiper-pagination",
    direction: "vertical",
    slidesPerView: 1,
    centeredSlides: true,
    speed: 1000,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    mousewheel: {
      sensitivity: 6,
    },
    watchSlidesProgress: true,
    keyboard: true,
    grabCursor: true,
  };


  return (
    <div ref={forwardedRef} className="slider-custom-cont">
    <Swiper {...params}
      pagination={{ clickable: true }}
      onSlideNextTransitionStart={() => startAnimationNext()}
      onSlidePrevTransitionStart={() => startAnimationPrev()}
      onSlideChangeTransitionStart={() => changeCoord()}
    >
        {project.map((item, index) => {
            return (
              <SwiperSlide key={item.sys.id}>
               {({ isActive }) => (

                <div ref={addToslideShowRef} className={"slide-inner " + (isActive ? 'active' : '')} lat={item.fields.lat} lon={item.fields.lon}>
                <h1
                   ref={addToRefs}
                   className={"title " + (isActive ? 'active' : '')}
                 >
                 {item.fields.title}
                 </h1>

                 {item.fields.subtitle ?   <h4>{item.fields.subtitle}</h4> : ''}

                  {item.fields.subtitle ?  <span className="index-btn" data-attr={item.fields.subtitle} onClick={()=>changeProject(item.sys.id)}> See the project</span> : ''}

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
