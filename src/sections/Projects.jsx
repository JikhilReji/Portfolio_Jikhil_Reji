//updated code(Mobile preview fix and hide preview on modal open)


import Project from "../components/Project";
import { myProjects } from "../constants";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Function to clamp the preview position so it stays fully visible on screen
const clampPosition = (xPos, yPos, width, height) => {
  const maxX = window.innerWidth - width - 10; // 10px padding
  const maxY = window.innerHeight - height - 10;
  return {
    x: Math.min(xPos, maxX),
    y: Math.min(yPos, maxY),
  };
};

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const [preview, setPreview] = useState(null);

  // Update preview position based on mouse or touch
  const handleMouseMove = (e) => {
    let clientX = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    let clientY = e.clientY ?? (e.touches ? e.touches[0].clientY : 0);

    const { x: newX, y: newY } = clampPosition(clientX + 20, clientY + 20, 320, 224); // w-80=320px, h-56=224px
    x.set(newX);
    y.set(newY);
  };

  // Hide preview image when scrolling (mobile fix)
  useEffect(() => {
    const handleScroll = () => setPreview(null);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      className="relative c-space section-spacing"
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {myProjects.map((project) => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
        />
      )}
    </section>
  );
};

export default Projects;




/*----Original code----
import Project from "../components/Project";
import { myProjects } from "../constants";
import React, { useState } from "react";
import {motion, useMotionValue, useSpring } from "motion/react";
const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };
const [preview, setPreview] = useState(null);
  return (
       <section 
       onMouseMove={handleMouseMove} 
       className="relative c-space section-spacing">
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent
       via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
       {myProjects.map((project) => (
        <Project key={project.id} {...project} setPreview=
        {setPreview} />
       ))}
       {preview && (
       <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 
          rounded-lg shadow-lg pointer-events-none w-80" 
          src={preview}
          style={{ x: springX, y: springY }}
          />
        )}
      </section>
  );
};

export default Projects; */

