import { createClient } from "contentful"
import { useState, useCallback, useRef , useEffect} from 'react';
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';
import {easeCubic} from 'd3-ease';
import { gsap } from "gsap";

import 'mapbox-gl/dist/mapbox-gl.css';
import Sidepanel from "../components/sidepanel";
import Slideshow from "../components/swiper";
import About from "../components/about";


const MAPBOX_TOKEN = "pk.eyJ1IjoibWF0dGVvc2FjY2hpIiwiYSI6ImNrazFrdG5hNzBzM2oycW1manJvbDl6ZGoifQ.FOB7LTrZU3E4nF270xUyxA";


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

  let sidepanelRef = useRef(null);
  let slideShowRef = useRef([]);

  const addToslideShowRef = (el) =>{
    if(el && !slideShowRef.current.includes(el)){
        slideShowRef.current.push(el);
      }
    }


  const [menu, setMenu] = useState({
    open: false,
  })

  const [viewport, setViewport] = useState({
    latitude: 44.734936,
    longitude: 11.017421,
    zoom: 6.08,
    bearing: 0,
    pitch: 0
  }, []);



  const onSelectProject = useCallback((latitude, longitude) => {
    setViewport({
      latitude,
      longitude,
      zoom: 8,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    });
  }, []);

  const openMenu = () => {
      gsap.to(sidepanelRef.current, { x: "0%", duration: 1, ease: "Power4.easeOut",});
      setMenu({
        open: true
      })

      slideShowRef.current.forEach((item, i) => {
        if(item.classList.contains("active")){
            console.log(item)
            gsap.to(item, { autoAlpha: 0, duration: 1, ease: "Power4.easeOut"});
        }
      });
    };

  const closeMenu = () => {
      gsap.to(sidepanelRef.current, { x: "100%", duration: 1, ease: "Power4.easeOut",});
      setMenu({
        open: false
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
        console.log(item)
        let latitude = Number(item.getAttribute("lat"));
        let longitude = Number(item.getAttribute("lon"));
        onSelectProject(latitude, longitude);
      }
    });
  }


  return (
    <div className="home_container">

      <div className="navbar">
        <div className="logo"><h1>Matteo Sacchi</h1></div>
          {
               (menu.open)
                 ?   <div onClick={() => closeMenu()} className="navlink open">Close</div>
                 :   <div onClick={() => openMenu()} className="navlink">About</div>
          }
      </div>

      <Slideshow changeCoord={changeCoord} addToslideShowRef={addToslideShowRef} forwardedRef={slideShowRef} project={projects}/>

      <Sidepanel forwardedRef={sidepanelRef} />

      <div className="map_container">
        <ReactMapGL
              {...viewport}
              width="100%"
              height="100%"
              mapStyle="mapbox://styles/matteosacchi/ckr0ipix41y8p17mxlnaqerk7"
              onViewportChange={setViewport}
              transitionInterpolator={new FlyToInterpolator()}
              dragRotate={false}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            />
      </div>
    </div>
  )
}
