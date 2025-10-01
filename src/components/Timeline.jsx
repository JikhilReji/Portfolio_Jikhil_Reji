"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const containerRef = useRef(null);
  const dotRefs = useRef([]);
  const [containerHeight, setContainerHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track container height
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, containerHeight]);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <h2 className="text-heading">My Work Experience</h2>
      <div className="relative pb-20">
        {data.map((item, index) => {
          const [isActive, setIsActive] = useState(false);

          useEffect(() => {
            const unsubscribe = lineHeight.onChange((value) => {
              if (!dotRefs.current[index] || !containerRef.current) return;

              const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
              const dot = dotRefs.current[index];
              const dotCenter = dot.getBoundingClientRect().top + window.scrollY - containerTop + dot.offsetHeight / 2;

              // Glow only when the line reaches this dot
              setIsActive(value >= dotCenter);
            });
            return () => unsubscribe();
          }, [lineHeight, index]);

          return (
            <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
              <div className="flex-col flex z-40 items-center self-start max-w-xs md:flex-row md:sticky md:top-40 lg:max-w-sm md:w-full mt-10">
                {/* Dot */}
                <div className="absolute flex items-center justify-center w-10 h-10 -left-[15px] bg-midnight rounded-full">
                  <motion.div
                    ref={(el) => (dotRefs.current[index] = el)}
                    className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-700"
                    style={{
                      boxShadow: isActive
                        ? "0 0 20px 6px rgba(167, 139, 250, 0.8), 0 0 30px 10px rgba(167, 139, 250, 0.5)"
                        : "none",
                      scale: isActive ? 1.3 : 1,
                      transition: "scale 0.3s ease, box-shadow 0.3s ease",
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                  <h3>{item.date}</h3>
                  <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                  <h3 className="text-3xl text-neutral-500">{item.job}</h3>
                </div>
              </div>

              <div className="relative w-full pl-20 pr-4 md:pl-4">
                <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden ">
                  <h3>{item.date}</h3>
                  <h3>{item.job}</h3>
                </div>
                {item.contents.map((content, idx) => (
                  <p className="mb-3 font-normal text-neutral-400" key={idx}>
                    {content}
                  </p>
                ))}
              </div>
            </div>
          );
        })}

        {/* Scrolling line */}
        <div
          style={{ height: containerHeight + "px" }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: lineHeight }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
