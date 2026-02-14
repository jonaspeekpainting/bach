"use client";

import { useEffect } from "react";

export function ViewportHeightHandler() {
  useEffect(() => {
    // Set initial viewport height
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set on mount
    setViewportHeight();

    // Update on resize and orientation change
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);
    
    // Also listen for visual viewport changes (handles browser bar show/hide)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setViewportHeight);
      window.visualViewport.addEventListener("scroll", setViewportHeight);
    }

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setViewportHeight);
        window.visualViewport.removeEventListener("scroll", setViewportHeight);
      }
    };
  }, []);

  return null;
}
