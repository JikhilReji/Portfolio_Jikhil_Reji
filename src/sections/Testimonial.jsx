import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { reviews } from "../constants";

// Split reviews into two rows
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

// ReviewCard component
const ReviewCard = ({ img, name, username, body, isActive, onTouchStart, onTouchEnd }) => {
  return (
    <figure
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={twMerge(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-50/[.1] bg-gradient-to-r bg-indigo to-storm hover:bg-royal hover-animation select-none",
        isActive && "bg-royal" // Only the touched card turns blue
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full bg-white/10"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">{name}</figcaption>
          <p className="text-xs font-medium text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

// Main Testimonial component
export default function Testimonial() {
  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);

  // Track which card is active in each row
  const [activeCardRow1, setActiveCardRow1] = useState(null);
  const [activeCardRow2, setActiveCardRow2] = useState(null);

  // Touch handlers for row 1
  const handleTouchStartRow1 = (index, e) => {
    e.preventDefault(); // prevent scrolling
    setActiveCardRow1(index);
    marqueeRef1.current?.pause();
  };
  const handleTouchEndRow1 = () => {
    setActiveCardRow1(null);
    marqueeRef1.current?.play();
  };

  // Touch handlers for row 2
  const handleTouchStartRow2 = (index, e) => {
    e.preventDefault();
    setActiveCardRow2(index);
    marqueeRef2.current?.pause();
  };
  const handleTouchEndRow2 = () => {
    setActiveCardRow2(null);
    marqueeRef2.current?.play();
  };

  return (
    <div className="items-start mt-25 md:mt-35 c-space">
      <h2 className="text-heading">Hear From My Clients</h2>

      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden">
        {/* First row */}
        <Marquee ref={marqueeRef1} pauseOnHover className="[--duration:20s]">
          {firstRow.map((review, index) => (
            <ReviewCard
              key={review.username}
              {...review}
              isActive={activeCardRow1 === index}
              onTouchStart={(e) => handleTouchStartRow1(index, e)}
              onTouchEnd={handleTouchEndRow1}
            />
          ))}
        </Marquee>

        {/* Second row */}
        <Marquee ref={marqueeRef2} reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review, index) => (
            <ReviewCard
              key={review.username}
              {...review}
              isActive={activeCardRow2 === index}
              onTouchStart={(e) => handleTouchStartRow2(index, e)}
              onTouchEnd={handleTouchEndRow2}
            />
          ))}
        </Marquee>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-primary"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-primary"></div>
      </div>
    </div>
  );
}
