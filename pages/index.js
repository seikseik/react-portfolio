import { createClient } from "contentful"
import { useState, useCallback } from 'react';
import MapGL, {FlyToInterpolator} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';



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
  latitude: 37.7751,
  longitude: -122.4193,
  zoom: 11,
  bearing: 0,
  pitch: 0
  });

  const onSelectProject = useCallback(({longitude, latitude}) => {
    setViewport({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
      transitionDuration: 'auto'
    });
  }, []);

  return (
    <div className="map_container">
      {projects.map((item) => (
        <div key={item.sys.id}>{item.fields.title}</div>
      ))}
      {about.map((item) => (
        <div key={item.sys.id}>{item.fields.title}</div>
      ))}

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
  )
}
