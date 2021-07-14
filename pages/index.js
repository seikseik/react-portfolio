import { createClient } from "contentful"
import { useState, useCallback } from 'react';
import MapGL, {FlyToInterpolator} from 'react-map-gl';
import d3 from 'd3-ease';


import 'mapbox-gl/dist/mapbox-gl.css';
import Navigation from "../components/navigation";
import About from "../components/about";
import Archive from "../components/archive";
import CurrentProject from "../components/CurrentProject";


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


export default function Home({ projects, about }) {

  const [viewport, setViewport] = useState({
    latitude: 44.734936,
    longitude: 11.017421,
    zoom: 7.08,
    bearing: 0,
    pitch: 0
  });

  const onSelectProject = useCallback((latitude, longitude) => {
    setViewport({
      latitude,
      longitude,
      zoom: 8,
      transitionInterpolator: new FlyToInterpolator({speed: 0.8}),
      transitionDuration: 'auto',
      transitionEasing: d3.easeCubic
    });
  }, []);

  return (

    <div className="home_container">
      <div className="logo"><h1>MS</h1></div>

      <Navigation projects={projects} onSelectProject={onSelectProject}/>

      <About about={about} />

      <Archive projects={projects}/>

      <CurrentProject projects={projects} />

      <div className="map_container">
        <MapGL
              {...viewport}
              width="100%"
              height="100%"
              mapStyle="mapbox://styles/matteosacchi/ckr0ipix41y8p17mxlnaqerk7"
              onViewportChange={setViewport}
              dragRotate={false}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            />
      </div>
    </div>
  )
}
