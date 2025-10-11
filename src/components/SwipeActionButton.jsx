
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const SwipeActionButton = ({ email, resumeUrl }) => {
  const [notification, setNotification] = useState(""); // success message
  const sliderRef = useRef(null);

  const handleDragEnd = (event, info) => {
    const sliderWidth = sliderRef.current.offsetWidth;
    const dragDistance = info.offset.x;
    const threshold = sliderWidth / 4;

    if (dragDistance > threshold) {
      // Swiped right → Download Resume
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Jikhil_Reji.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setNotification("📥 Resume downloaded successfully!");
    } else if (dragDistance < -threshold) {
      // Swiped left → Copy Email
      navigator.clipboard.writeText(email);
      setNotification("✅ Email copied to clipboard!");
    }

    // Clear message after 2s
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
      {/* Main Swipe Button */}
      <div className="relative w-full h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 overflow-hidden shadow-lg">
        {/* Background Labels */}
        <div className="absolute inset-0 flex justify-between items-center px-5 text-white font-medium text-sm md:text-base select-none">
          <span>Copy Email</span>
          <span>Get Resume</span>
        </div>

        {/* Draggable Knob */}
        <motion.div
          ref={sliderRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={handleDragEnd}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-14 h-14 bg-white rounded-full shadow-md flex items-center 
                     justify-center cursor-grab"
          whileTap={{ scale: 1.1 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <span className="text-purple-600 font-bold text-lg">⇆</span>
        </motion.div>
      </div>

      {/* Temporary Notification */}
      <AnimatePresence>
        {notification && (
          <motion.p
            key="notif"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base text-white bg-indigo-600 px-4 py-2 rounded-full shadow-lg"
          >
            {notification}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeActionButton;
