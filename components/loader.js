import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Loader({forwardedRef}) {

  return (
      <div ref={forwardedRef}  className="loader">
        <div className="name-anim">MS</div>
      </div>
  )
}
