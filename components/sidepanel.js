import {useState, useEffect, useRef } from "react";

export default function Sidepanel({forwardedRef, closeMenu}) {
  return (
      <div ref={forwardedRef} className="side-bar">
      </div>
  )
}
