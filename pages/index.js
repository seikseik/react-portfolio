import Head from 'next/head'
import { createClient } from "contentful"


import { useState, useCallback, useRef , useEffect} from 'react';

import {render} from 'react-dom';

import ReactMapGL, {FlyToInterpolator, Source, Layer} from 'react-map-gl';


import {easeCubic} from 'd3-ease';
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";

import 'mapbox-gl/dist/mapbox-gl.css';
import Sidepanel from "../components/sidepanel";
import Slideshow from "../components/swiper";
import About from "../components/about";
import Project from "../components/project";
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


export default function Home({ projects, about }) {


  let loaderRef = useRef(null);
  let sidepanelRef = useRef(null);
  let navRef = useRef(null);
  let slideShowRef = useRef([]);

  let aboutRef = useRef();
  let projectRef = useRef(null);

  let projectNavRef = useRef(null);

  const [load, setLoad] = useState({
    load:false,
  })
  const [menu, setMenu] = useState({
    open: false,
  })
  const [aboutMenu, setAboutMenu] = useState({
    about: null,
  })
  const [projMenu, setProjMenu] = useState({
    projMenu: null,
  })
  const [currentProj, setProj] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 44.734936,
    longitude: 11.017421,
    zoom: 6.08,
    bearing: 0,
    pitch: 0
  }, [1]);


// animazione contentuto about
  useEffect(() => {
      let tl = gsap.timeline();
      let col1 = aboutRef.current.children[0]
      let col1p = col1.children
    if(aboutMenu.about){
      let mySplitText = new SplitText(col1p, {type:"lines", wordsClass: "split-line"
    })
    let words = mySplitText.lines;
    gsap.set(col1p, {perspective: 400});
      tl.set(aboutRef.current, { opacity: 0});
      tl.to(aboutRef.current, { x: "0%", duration: 0.5, ease: "Power4.easeOut",});
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
  },[aboutMenu]);


const animProjOpen =()=>{
  let tl = gsap.timeline();
  let project = projectRef.current.children[0];
  let col1 = project.children[0];
  let col2 = project.children[1];
  let col1txt = col1.children;
  // anim titolo
  let animTitle = gsap.timeline(),
      titleSplit = new SplitText(col1txt[0], {type:"words,chars", wordsClass: "split-line"}),
    chars = titleSplit.chars;
    gsap.set(col1txt[0], {perspective: 400});
  animTitle.fromTo(chars, {autoAlpha: 0},{  duration: 1,autoAlpha: 1,ease: "circ.out",stagger: 0.03, delay: 1},"+=0");
  // anim testo
  let mySplitText = new SplitText(col1txt[1], {type:"lines", wordsClass: "split-line"})

  let words = mySplitText.lines;
  gsap.set(col1txt[1], {perspective: 400});
  gsap.set(projectRef.current,{ autoAlpha: 1});
  gsap.set(col1txt[2], {autoAlpha: 0});
  tl.set(col1, { opacity: 0});
  tl.set(col2, { opacity: 0});
  tl.to(projectRef.current, { x: "0%", duration: 0.5, ease: "Power4.easeOut",});
  tl.to(col1,{  duration: 0.3, autoAlpha: 1,ease: "circ.out",});
  tl.to(col2,{  duration: 0.3, autoAlpha: 1,ease: "circ.out",});
  tl.fromTo(words, {autoAlpha: 0},{ duration: 0.3,autoAlpha: 1,ease: "circ.out",stagger: 0.018},"+=0");
  gsap.to(col1txt[2], {duration: 0.8, autoAlpha: 1, ease: "circ.out", delay: 1.3});
  gsap.to(projectNavRef.current, {duration: 0.8, autoAlpha: 1, ease: "circ.out", delay: 1.3});

}
const animProjClose =()=>{
  let tl = gsap.timeline();
  let project = projectRef.current.children[0];
  let col1 = project.children[0];
  let col2 = project.children[1];
  let col1txt = col1.children;
  tl.to(projectRef.current,{  duration: 0.3, autoAlpha: 0, ease: "circ.out",});
  tl.to(projectRef.current, { x: "100%", duration: 1, ease: "Power4.easeOut",});
  gsap.to(projectNavRef.current, {duration: 0.8, autoAlpha: 0, ease: "circ.out"});
}


// animazione contentuto progetto
  useEffect(() => {
    if(projectRef.current != null){
      if(projMenu.projMenu){
      animProjOpen();
      }else{
      animProjClose();
      }
    }
  },[projMenu]);

// animazione loader
  useEffect(() =>{
    if(load){
    let tl = gsap.timeline()
    tl.to(loaderRef.current.children[0], { autoAlpha: 0, duration: 0.4, ease: "Power3.easeInOut", delay: 1}),
    tl.to(loaderRef.current, { autoAlpha: 0, duration: 0.6, ease: "Power3.easeInOut", display: "none"});
    }
  },[load])

  // fly to cambio prog
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

  // ref current slide
  const addToslideShowRef = (el) =>{
    if(el && !slideShowRef.current.includes(el)){
        slideShowRef.current.push(el);
      }
    }

  const openMenu = () => {
      gsap.to(sidepanelRef.current, { x: "0%", duration: 1, ease: "Power4.easeOut",});
      setMenu({
        open: true,
      })

      slideShowRef.current.forEach((item, i) => {
        gsap.to(item, { autoAlpha: 0, duration: 0.8, ease: "Power4.easeOut"});
      });
    };
  const closeMenu = () => {
      gsap.to(sidepanelRef.current, { x: "100%", duration: 0.8, ease: "Power4.easeOut", delay: 0.3});
      setMenu({
        open: false,
      })

      slideShowRef.current.forEach((item, i) => {
            gsap.to(item, { autoAlpha: 1, duration: 1, ease: "Power4.easeOut"});
      });
    };

  const changeProjectFromNav = (id) =>{
    setProj(id);
    animProjOpen();
  }

  const changeCoord = () =>{
    slideShowRef.current.forEach((item, i) => {
      if(item.classList.contains("active")){
        let latitude = Number(item.getAttribute("lat"));
        let longitude = Number(item.getAttribute("lon"));
        onSelectProject(latitude, longitude);
      }
    });
  }

// apri progetto da tasto
  const changeProject = (id) =>{
    openMenu();
    setProj(id);
    setProjMenu({projMenu: true});
  }

// check se menu è aperto
  const checkMenuOpen = ()=>{
    if(aboutMenu){
      setAboutMenu({about: false});
    }
    if(projMenu.projMenu){
      setProjMenu({projMenu: false});
    }
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
            ?   <div onClick={(event) => { closeMenu(); checkMenuOpen();}} className="navlink open">Close</div>
            :   <div onClick={(event) => { openMenu(); setAboutMenu({about: true});}} className="navlink">About</div>
          }
      </div>

      <Project forwardedRef={projectRef} projects={projects} currentProj={currentProj}/>

      <About forwardedRef={aboutRef} about={about}/>

      <Slideshow changeProjectFromNav={changeProjectFromNav} changeProject={changeProject} load={load} changeCoord={changeCoord} addToslideShowRef={addToslideShowRef} forwardedRef={slideShowRef, navRef} projNavRef={projectNavRef} project={projects}/>

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
