import { Canvas } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { OrbitControls, Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../components/Loader";

const Hero = () => { 
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const isTablet = useMediaQuery({ minWidth: 854, maxWidth: 1200 });
  const disableInteraction = isMobile || isTablet; // disable controls on mobile + tablet

  // Adjust astronaut position dynamically
  const astronautPosition = isMobile
    ? [0, -1.5, 0]
    : isTablet
    ? [0.8, -1, 0]  // slightly more centered on tablet
    : [1.3, -1, 0]; // default desktop position

  const astronautScale = isMobile ? 0.23 : 0.3;

  return (
    <section
      id="home"
      className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space"
    >
      <HeroText />
      <ParallaxBackground />

      <figure className="absolute inset-0" style={{ width: "100vw", height: "100vh" }}>
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut scale={astronautScale} position={astronautPosition} />
            </Float>

            {/* Enable controls only on desktop > 1200px */}
            {!disableInteraction && (
              <OrbitControls enableZoom={false} enablePan={false} />
            )}

            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
