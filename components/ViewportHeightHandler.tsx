"use client";

import { useEffect } from "react";

export function ViewportHeightHandler() {
  useEffect(() => {
    let rafId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    // Set viewport height using visual viewport when available (handles browser bar)
    const setViewportHeight = () => {
      // Cancel any pending updates
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        // Use visual viewport height if available (accounts for browser bar)
        // Otherwise fall back to window.innerHeight
        const height = window.visualViewport?.height || window.innerHeight;
        const vh = height * 0.01;
        
        // Smoothly update CSS variables
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        document.documentElement.style.setProperty("--visual-vh", `${height}px`);
        
        rafId = null;
      });
    };

    // Throttled version for scroll events to prevent too many updates
    const throttledSetViewportHeight = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setViewportHeight();
        timeoutId = null;
      }, 16); // ~60fps
    };

    // Set on mount
    setViewportHeight();

    // Update on resize and orientation change (immediate for these)
    window.addEventListener("resize", setViewportHeight, { passive: true });
    window.addEventListener("orientationchange", setViewportHeight);
    
    // Listen for visual viewport changes (handles browser bar show/hide)
    if (window.visualViewport) {
      // Use throttled version for scroll to prevent jank
      window.visualViewport.addEventListener("scroll", throttledSetViewportHeight, { passive: true });
      // Use immediate for resize (browser bar show/hide)
      window.visualViewport.addEventListener("resize", setViewportHeight, { passive: true });
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setViewportHeight);
        window.visualViewport.removeEventListener("scroll", throttledSetViewportHeight);
      }
    };
  }, []);

  return null;
}
