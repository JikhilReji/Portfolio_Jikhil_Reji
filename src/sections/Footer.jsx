import { mySocials } from "../constants";

const Footer = () => {
  return (
    <section className="flex flex-col items-center gap-3 pb-3 text-sm text-neutral-400 c-space px-4 sm:px-8 lg:px-16">
      {/* Single divider line */}
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      {/* Footer Content */}
      <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-4">
        {/* Contact Info (Left) */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start sm:flex-1">
          <p>📞 +49 17631256213</p>
          <p>|</p>
          <p>📧 jikhilreji@gmail.com</p>
        </div>

        {/* Social Icons (Center) */}
        <div className="flex items-center gap-3 justify-center sm:flex-none">
          {mySocials.map((social, index) => (
            <a href={social.href} key={index}>
              <img src={social.icon} className="w-5 h-5" alt={social.name} />
            </a>
          ))}
        </div>

        {/* Copyright (Right) */}
        <p className="text-center sm:text-right sm:flex-1">
          © 2025 Jikhil. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
