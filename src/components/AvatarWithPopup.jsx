import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

const AvatarWithPopup = ({ avatarSrc = "/jikhil.png", popupSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Avatar with Revolving Border */}


   <div className="relative w-14 h-14 flex items-center justify-center">
  <div className="absolute w-16 h-16 rounded-full bg-purple-400 opacity-30 animate-pulse"></div>
  <img
    src={avatarSrc}
    alt="Avatar"
    onClick={togglePopup}
    className="relative w-12 h-12 rounded-full cursor-pointer border-2 border-white shadow-md animate-bounce hover:scale-105 transition-transform duration-300"
  />
</div>




      {/* Fullscreen Popup using Portal */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Blurred Background */}
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={togglePopup} // click outside to close
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Centered Popup Image */}
              <motion.img
                src={popupSrc}
                alt="Popup"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-lg shadow-xl z-[10000]"
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default AvatarWithPopup;
