import React, { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Projects.css";
import { APIContext } from "../../context/APIContext";

const Projects = () => {
  const { state, fetchData } = useContext(APIContext);

  useEffect(() => {
    fetchData("http://localhost:4000/api/projects");
  }, []); // ✅ safe

  const key = "GET:http://localhost:4000/api/projects";

  const projects = state.data[key] || [
    {
      title: "Seelaikaari E-Commerce",
      shortDesc: "Full-stack e-commerce platform",
      desc: "Full-stack e-commerce platform with admin panel, inventory management, payment integration & order tracking.",
      tech: ["React", "Node.js", "PostgreSQL", "Razarpay", "JWT"],
      role: "Full-Stack Developer & Deployment",
      highlights: [
        "Product catalog",
        "Cart & wishlist",
        "Order management",
        "OAuth integration",
        "NGINX + PM2",
      ],
      image: "https://res.cloudinary.com/dijsgmdhp/image/upload/v1767076399/seelaikaari_ofhs4v.png",
      liveLink: "https://seelaikaari.com",
      gitHub: "https://github.com/manorajsivanmalai/seelaikaari.git",
    },
    {
      title: "TKM Press Release Automation",
      shortDesc: "Doc-to-HTML automation pipeline",
      desc: "Automated doc-to-HTML pipeline with FTP upload. Streamlined content distribution across 130+ dealer sites.",
      tech: ["Node.js", "Mammoth", "FTP"],
      role: "Backend Engineer",
      highlights: [
        "Doc parsing",
        "HTML generation",
        "FTP automation",
        "Release coordination",
      ],
      image: "https://res.cloudinary.com/dijsgmdhp/image/upload/v1767077250/tkm-press-relese_knwwrz.png",
      liveLink: "#",
      gitHub: "https://github.com/manorajsivanmalai/press-relese-generator.git",
    },
  ];
  
  const titleSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 100,
  });

  if (state.loading[key] && !projects)
    return <div className="projects-page">Loading projects...</div>;

  if (state.error[key])
    return (
      <div className="projects-page">
        <div className="projects-hero">
          <h1 className="section-title">Projects</h1>
          <p className="section-description">Failed to load projects.</p>
          <div className="error-row">
            <span className="error-msg">{state.error[key]}</span>
          </div>
        </div>
      </div>
    );

  return (
    <div className="projects-page">
      <div className="projects-hero">
        <animated.h1 style={titleSpring} className="section-title">
          Projects
        </animated.h1>
        <p className="section-description">
          Swipe through my full-stack applications, automation tools, and ML
          experiments. Click to flip & explore!
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        // loop={true}
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={5}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 5 },
          1024: { slidesPerView: 2, spaceBetween: 5 },
        }}
        className="projects-swiper"
      >
        {(projects || []).map((proj, i) => (
          <SwiperSlide key={proj?.id ?? i}>
            <ProjectCard project={proj} delay={150 + i * 100} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const ProjectCard = ({ project, delay }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const spring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    delay,
  });

  const flipSpring = useSpring({  
    rotateY: isFlipped ? 180 : 0,
    config: { tension: 300, friction: 30 },
  });

  return (
    <animated.div
      style={spring}
      className="project-card-container"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <animated.div
        className="project-card-inner"
        style={{
          transform: flipSpring.rotateY.to(
            (val) => `perspective(1000px) rotateY(${val}deg)`,
          ),
        }}
      >
        {/* Front Side */}
        <div className="project-card-front">
          <div className="proj-icon">
            {project?.image?.startsWith("https") ? (
              <img
                src={project.image}
                alt="Project icon"
                className="img-fluid"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <p>{project?.image}</p>
            )}
          </div>
          <h3>{project.title}</h3>
          <p className="proj-desc">{project.description}</p>
          <div className="proj-role">{project.role}</div>
          <div className="proj-tech">
            {(project.tech || []).map((t, i) => (
              <span key={i} className="tech-tag">
                {t}
              </span>
            ))}
          </div>
          <ul className="proj-highlights">
            {(project.highlights || []).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        {/* Back Side */}
        <div className="project-card-back">
          <div className="back-icon">
            {project?.image?.startsWith("https") ? (
              <img
                src={project.image}
                alt="Project icon"
                className="img-fluid"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <p>{project?.image}</p>
            )}
          </div>

          <h3>{project.title}</h3>
          <p className="back-subtitle">{project.short_desc}</p>
          <div className="back-links">
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="back-link live"
              onClick={(e) => e.stopPropagation()}
            >
              🌐 Live Demo
            </a>
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="back-link github"
              onClick={(e) => e.stopPropagation()}
            >
              💻 GitHub
            </a>
          </div>
          <div className="flip-hint">← Click to Flip</div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Projects;
