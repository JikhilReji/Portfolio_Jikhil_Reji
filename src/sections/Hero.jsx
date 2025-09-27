import { Canvas } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense } from "react";
import Loader from "../components/Loader";

/*-------Code from gpt to enable scrolling in mobile devices--------*/

/* --------------------End-------------------------------- */

const Hero = () => { 
  const isMobile=useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center
  md:items-start md:justify-start min-h-screen overflow-hidden
  c-space">
      <HeroText />
      <ParallaxBackground />
      <figure 
      className="absolute inset-0"
      style={{ width:"100vw", height: "100vh" }}
      >
        <Canvas camera={{position: [ 0, 1, 3 ] }}>
          <Suspense fallback={<Loader />}>
          <Float>
    <Astronaut 
    scale={isMobile && 0.23} 
    position={isMobile && [0, -1.5, 0]} 
    />
    </Float>
    

    {/* :- To add interactive functionality to the 
    3d model */} 




    
   <OrbitControls 
    enableZoom={false}   // disables zoom on scroll
    enablePan={false}    // optional: prevents dragging/panning
    /> 


      <Rig />
        </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => 
 {
  easing.damp3(
  state.camera.position,
  [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
  0.5,
  delta
    );
  });

}

export default Hero;