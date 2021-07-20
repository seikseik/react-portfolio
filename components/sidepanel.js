import {useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Sidepanel({forwardedRef, closeMenu}) {
  return (
      <div ref={forwardedRef} className="side-bar">
      </div>
  )
}
