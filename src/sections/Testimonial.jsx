import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { reviews } from "../constants";

// Split reviews into two rows
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

// Updated ReviewCard with mobile touch support
const ReviewCard = ({ img, name, username, body, onTouchStart, onTouchEnd }) => {
  const [isActive, setIsActive] = useState(false);

  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent scrolling / text selection
    setIsActive(true);
    if (onTouchStart) onTouchStart();
  };

  const handleTouchEnd = () => {
    setIsActive(false);
    if (onTouchEnd) onTouchEnd();
  };

  return (
    <figure
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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

  // Pause both marquees on touch start
  const handleTouchStart = () => {
    marqueeRef1.current?.pause();
    marqueeRef2.current?.pause();
  };

  // Resume both marquees on touch end
  const handleTouchEnd = () => {
    marqueeRef1.current?.play();
    marqueeRef2.current?.play();
  };

  return (
    <div className="items-start mt-25 md:mt-35 c-space">
      <h2 className="text-heading">Hear From My Clients</h2>

      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden">
        {/* First row */}
        <Marquee ref={marqueeRef1} pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard
              key={review.username}
              {...review}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          ))}
        </Marquee>

        {/* Second row */}
        <Marquee ref={marqueeRef2} reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard
              key={review.username}
              {...review}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
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
