import * as React from 'react';
import {Marker} from 'react-map-gl';

function Pins(props, menu) {

  return(
    <Marker longitude={props.longitude} latitude={props.latitude}>
      <div className={"pulse" + (props.menu.open ? ' active' : '')}></div>
   </Marker>
  )
}

export default React.memo(Pins);
