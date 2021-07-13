import { createClient } from "contentful"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGVvc2FjY2hpIiwiYSI6ImNrazFrdG5hNzBzM2oycW1manJvbDl6ZGoifQ.FOB7LTrZU3E4nF270xUyxA';


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

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {

  if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/matteosacchi/ckr0ipix41y8p17mxlnaqerk7',
      center: [lng, lat],
      zoom: zoom
    });
  });

  return (
    <div className="map_container">
      {projects.map((item) => (
        <div key={item.sys.id}>{item.fields.title}</div>
      ))}
      {about.map((item) => (
        <div key={item.sys.id}>{item.fields.title}</div>
      ))}
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}
