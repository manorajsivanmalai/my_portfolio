import React, { useState } from "react";
import { Suspense } from "react";
import "./Home.css";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
// `ComputerScene` removed — load user's 3D model (mano3d-hoodie.glb)
import ManoModel from "../../components/3d/ManoModel";
import { ParticleBackground } from "../../components/3d/ParticleBackground";

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  };

  const titleSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 150,
    config: { tension: 80, friction: 20 },
  });
  const subtitleSpring = useSpring({
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
    delay: 350,
    config: { tension: 70, friction: 25 },
  });
  const bioSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });
  const ctaSpring = useSpring({
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
    delay: 650,
  });

  return (
    <div className="home-hero" onMouseMove={handleMouseMove}>
      <div className="hero-overlay" />

      {/* Particle Background */}
      <div className="particle-bg">
        <ParticleBackground mousePos={mousePos} />
      </div>

      {/* Bottom Content and Computer */}
      <div className="hero-bottom">
        <div className="hero-content">
          <animated.div style={titleSpring}>
            <h1 className="hero-title">MANORAJ S</h1>
          </animated.div>
          <animated.p style={subtitleSpring} className="hero-sub">
            Full-Stack Developer | React, Node.js, Java
          </animated.p>
          <animated.div style={bioSpring} className="hero-bio">
            <p>
              2.6+ years building scalable web applications. Specialized in
              e-commerce platforms, REST APIs, and interactive frontends.
            </p>
            <div className="hero-meta">
              <span>📍 Bangalore, India</span>
              <span>📧 smanoraj24@gmail.com</span>
              <span>📱 +91-6383685682</span>
            </div>
          </animated.div>
          <animated.div style={ctaSpring} className="hero-ctas">
            <Link to="/projects" className="btn primary">
              View my work
            </Link>
            {/* <Link to="/skills" className="btn ghost">Tech stack</Link>
              <a href="https://linkedin.com/in/manorajs" target="_blank" rel="noopener noreferrer" className="btn ghost">LinkedIn</a> */}
            <a
              href="https://drive.google.com/file/d/1m421YGaEqrQm1x-HYr75_5t2uBQsjosA/view?usp=drive_link"
              className="btn primary btn ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              View my Resume
            </a>
          </animated.div>
        </div>

        <div className="hero-tech-orbitals">
          <Suspense fallback={<div style={{ background: "#0a0a1a" }} />}>
            <ManoModel />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
