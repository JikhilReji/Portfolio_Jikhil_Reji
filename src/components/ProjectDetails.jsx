import {motion} from "motion/react";
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
  liveLinkText,
  liveLinkHref, 
}) => {
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center 
  w-full h-full overflow-y-auto backdrop-blur-sm">
  <motion.div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto
    border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy
    border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        >
      <button onClick={closeModal}
      className="absolute p-2 rounded-sm top-5 right-5
      bg-midnight hover:bg-gray-500">
        <img src="/assets/close.svg" className="w-6 h-6" />
      </button>
      <img src={image} alt={title} className="w-full 
      rounded-t-2xl" />
      <div className="p-5">

        <h5 className="mb-2 text-2xl font-bold text-white">
          {title}</h5>
        {/*   Justify description */}
        <p className="mb-3 font-normal text-neutral-400 text-justify leading-relaxed tracking-wide">
  {description}
</p>

{subDescription.map((subDesc, index) => (
  <p
    key={index}
    className="mb-3 font-normal text-neutral-400 text-justify leading-relaxed tracking-wide"
  >
    {subDesc}
  </p>
))}
      {/*   End */}
{/* New live link */}
  {liveLinkText && liveLinkHref && (
    <a
      href={liveLinkHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-4 px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-lg font-medium transition"
    >
      {liveLinkText}
    </a>
  )}
    {/* End */}
          <div className="flex items-center justify-between mt-4"> 
           <div className="flex gap-3">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg size-10 hover-animation"
                />
              ))}
            </div>
           <a
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation"
>
  View Project
  <img src="/assets/arrow-up.svg" className="size-4" />
</a>
          
          </div>
      </div>
    </motion.div>
 </div>
  );
};

export default ProjectDetails;