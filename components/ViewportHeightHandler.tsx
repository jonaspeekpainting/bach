"use client";

import { useEffect } from "react";

export function ViewportHeightHandler() {
  useEffect(() => {
    // Set viewport height using visual viewport when available (handles browser bar)
    const setViewportHeight = () => {
      // Use visual viewport height if available (accounts for browser bar)
      // Otherwise fall back to window.innerHeight
      const height = window.visualViewport?.height || window.innerHeight;
      const vh = height * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      // Also set the actual height for footer positioning
      document.documentElement.style.setProperty("--visual-vh", `${height}px`);
    };

    // Set on mount
    setViewportHeight();

    // Update on resize and orientation change
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);
    
    // Listen for visual viewport changes (handles browser bar show/hide)
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
