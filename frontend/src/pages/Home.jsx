// src/pages/Home.js (Updated)
import { useEffect, useState } from "react";
// Remove existing imports if unused, add the new component
// import Navbar from "../components/Navbar"; // Keep your navigation
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import Layout from "../components/Layout";
// Add the new component:
// import MagicBookAnimation from "../components/MagicBookAnimation";

function Home({ children }) {
  const [offset, setOffset] = useState(0);
  const [scrollY, setScrollY] = useState(0); // Track absolute scroll position separately

  useEffect(() => {
    const handleScroll = () => {
      // 1. Current absolute scroll (useful for triggers)
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      // 2. Parallax background calculation (simplified/cleaned up)
      const maxOffset = window.innerHeight * 0.4; // 140vh - 100vh (approx)
      const nextOffset = currentScroll * 0.15;
      setOffset(Math.min(nextOffset, maxOffset));
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check (in case they load scrolled down)
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* NEW COMPONENT Integration:
        Inject the animation component early in the DOM, 
        giving it the current scroll value. 
      */}
      {/* <MagicBookAnimation scrollY={scrollY} /> */}

      {/* Parallax Background (Slightly modified style for better performance) */}
      <div
        className="fixed -top-[40vh] left-0 w-full h-[160vh] -z-20 transition-transform duration-100 ease-linear"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da')",
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
          // Use transform instead of backgroundPosition for performance
          transform: `translateY(${-offset}px)`,
          willChange: "transform",
        }}
      />

      {/* Dark Overlay/Content Layout */}
      <Layout color={"bg-black/60"}>
        {/* Your navigation would go inside Layout or above */}
        <HeroSection />
        <AboutSection />

        {children}
      </Layout>
    </div>
  );
}

export default Home;
