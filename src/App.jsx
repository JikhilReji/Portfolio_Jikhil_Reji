import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />

      {/* Hero / Home Section */}
      <section id="Home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="About">
        <About />
      </section>

      {/* Work / Experiences Section */}
      <section id="Experiences">
        <Experiences />
      </section>

    {/* Work / Testimonial Section */}
      <section id="Testimonial">
        <Testimonial /> 
      </section>

      {/* Projects Section */}
      <section id="Projects">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="Contact">
        <Contact />
      </section>

      <Footer />
    </div>
  );
};

export default App;
