import * as React from 'react';
import {Marker} from 'react-map-gl';

function Pins(props) {
  return(
    <Marker longitude={props.longitude} latitude={props.latitude}>
      <div className='pulse'></div>
   </Marker>
  )
}

export default React.memo(Pins);
