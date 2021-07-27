import Head from 'next/head'
import { createClient } from "contentful"
import { useState, useCallback, useRef , useEffect} from 'react';
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';
import {easeCubic} from 'd3-ease';
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";

import 'mapbox-gl/dist/mapbox-gl.css';
import Sidepanel from "../components/sidepanel";
import Slideshow from "../components/swiper";
import About from "../components/about";
import Loader from "../components/loader";



export async function getStaticProps(){
    const client = createClient({
      space: process.env.CONTENTFUL_ID,
      accessToken:process.env.CONTENTFUL_TOKEN,
    })

    const res = await client.getEntries({
      content_type: 'projects'
    })
    const res_about = await client.getEntries({
      content_type: 'about'
    })

  return {
    props: {
      projects: res.items,
      about: res_about.items
    }
  }
}

// inizio function index
export default function Home({ projects, about }) {

  let loaderRef = useRef(null);
  let sidepanelRef = useRef(null);
  let slideShowRef = useRef([]);
  let aboutRef = useRef();

  const addToslideShowRef = (el) =>{
    if(el && !slideShowRef.current.includes(el)){
        slideShowRef.current.push(el);
      }
    }

  const [load, setLoad] = useState({
    load:false,
  })
  const [menu, setMenu] = useState({
    open: false,
    about: null,
  })

  const [viewport, setViewport] = useState({
    latitude: 44.734936,
    longitude: 11.017421,
    zoom: 6.08,
    bearing: 0,
    pitch: 0
  }, []);

  useEffect(() => {
    let tl = gsap.timeline();
      let col1 = aboutRef.current.children[0]
      let col1p = col1.children
    if(menu.about){
      let mySplitText = new SplitText(col1p, {type:"lines", wordsClass: "split-line"
    })
    let words = mySplitText.lines;
    gsap.set(col1p, {perspective: 400});
      tl.set(aboutRef.current, { opacity: 0});
      tl.to(aboutRef.current, { x: "0%", duration: 0.8, ease: "Power4.easeOut",});
      tl.to(aboutRef.current,{  duration: 0.3, autoAlpha: 1,ease: "circ.out",});
      tl.fromTo(words, {autoAlpha: 0},
        {  duration: 0.3,
             autoAlpha: 1,
             ease: "circ.out",
             stagger: 0.018
        },
        "+=0");

    }else{
      tl.to(aboutRef.current,{  duration: 0.3, autoAlpha: 0, ease: "circ.out",});
      tl.to(aboutRef.current, { x: "100%", duration: 1, ease: "Power4.easeOut",});
    }
  },[menu]);

  useEffect(() =>{
    if(load){
    gsap.to(loaderRef.current, { x: "-100%", duration: 0.8, ease: "Power4.easeOut", display: "none", delay: 1.5});
    }

  },[load])

  const onSelectProject = useCallback((latitude, longitude) => {
    setViewport({
      latitude,
      longitude,
      zoom: 9,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    });
  }, []);

  const openMenu = () => {
      gsap.to(sidepanelRef.current, { x: "0%", duration: 1, ease: "Power4.easeOut",});
      setMenu({
        open: true,
        about: true,
      })

      slideShowRef.current.forEach((item, i) => {
        if(item.classList.contains("active")){
            gsap.to(item, { autoAlpha: 0, duration: 0.8, ease: "Power4.easeOut"});
        }
      });
    };

  const closeMenu = () => {
      gsap.to(sidepanelRef.current, { x: "100%", duration: 0.8, ease: "Power4.easeOut", delay: 0.3});
      setMenu({
        open: false,
        about: false,
      })
      slideShowRef.current.forEach((item, i) => {
        if(item.classList.contains("active")){
            gsap.to(item, { autoAlpha: 1, duration: 1, ease: "Power4.easeOut"});
        }
      });
    };

  const changeCoord = () =>{
    slideShowRef.current.forEach((item, i) => {
      if(item.classList.contains("active")){
        let latitude = Number(item.getAttribute("lat"));
        let longitude = Number(item.getAttribute("lon"));
        onSelectProject(latitude, longitude);
      }
    });
  }


  return (
    <>
    <Head>
        <title>Matteo Sacchi — Designer & Developer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="/fonts.css" rel="stylesheet"/>
    </Head>

    <Loader forwardedRef={loaderRef} />
    <div className="home_container">

      <div className="navbar">
        <div className="logo"><h1>Matteo Sacchi</h1></div>
          {
               (menu.open)
                 ?   <div onClick={() => closeMenu()} className="navlink open">Close</div>
                 :   <div onClick={() => openMenu()} className="navlink">About</div>
          }
      </div>

      <About forwardedRef={aboutRef} about={about}/>

      <Slideshow load={load} changeCoord={changeCoord} addToslideShowRef={addToslideShowRef} forwardedRef={slideShowRef} project={projects}/>

      <Sidepanel forwardedRef={sidepanelRef} />

      <div className="map_container">
        <ReactMapGL
              {...viewport}
              width="100%"
              onLoad ={()=> setLoad({
                  load:true
                })}
              height="100%"
              mapStyle="mapbox://styles/matteosacchi/ckr0ipix41y8p17mxlnaqerk7"
              mapboxApiAccessToken={process.env.customKey}
              onViewportChange={setViewport}
              transitionInterpolator={new FlyToInterpolator()}
              dragRotate={false}
            />
      </div>

    </div>
     </>
  )
}
