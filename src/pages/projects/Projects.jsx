import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Projects.css'
import seelaikari from "../../assets/images/projects/seelaikaari.png"

const Projects = () => {
  const projects = [
    {
      title: 'Seelaikaari E-Commerce',
      shortDesc: 'Full-stack e-commerce platform',
      desc: 'Full-stack e-commerce platform with admin panel, inventory management, payment integration & order tracking.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'JWT'],
      role: 'Full-Stack Developer & Deployment',
      highlights: ['Product catalog', 'Cart & wishlist', 'Order management', 'OAuth integration', 'NGINX + PM2'],
      image: '🛍️',
      imagesrc:seelaikari,
      liveLink: 'https://seelaikaari.com',
      gitHub: 'https://github.com'
    },
    {
      title: 'Press Release Automation',
      shortDesc: 'Doc-to-HTML automation pipeline',
      desc: 'Automated doc-to-HTML pipeline with FTP upload. Streamlined content distribution across 130+ dealer sites.',
      tech: ['Node.js', 'Mammoth', 'FTP'],
      role: 'Backend Engineer',
      highlights: ['Doc parsing', 'HTML generation', 'FTP automation', 'Release coordination'],
      image: '📄',
      liveLink: '#',
      gitHub: 'https://github.com'
    },
    {
      title: 'Google Analytics Aggregator',
      shortDesc: 'Multi-domain analytics platform',
      desc: 'Centralized GA data fetching across multiple domains for cross-domain analytics insights.',
      tech: ['Node.js', 'Google Analytics API', 'Express'],
      role: 'Backend Engineer',
      highlights: ['Multi-domain tracking', 'Data aggregation', 'Real-time reporting'],
      image: '📊',
      liveLink: '#',
      gitHub: 'https://github.com'
    },
    {
      title: 'SLA Time Prediction Model',
      shortDesc: 'ML prediction model for task timelines',
      desc: 'Predictive ML model using historical task data for accurate task timeline estimation (~80% accuracy).',
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
      role: 'Data Engineer',
      highlights: ['Pandas/NumPy', 'ML modeling', '80% accuracy', 'Operational insights'],
      image: '🤖',
      liveLink: '#',
      gitHub: 'https://github.com'
    }
  ]

  const titleSpring = useSpring({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 }, delay: 100 })

  return (
    <div className="projects-page">
      <div className="projects-hero">
        <animated.h1 style={titleSpring} className="section-title">Projects</animated.h1>
        <p className="section-desc">Swipe through my full-stack applications, automation tools, and ML experiments. Click to flip & explore!</p>
      </div>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={5}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 5 },
          1024: { slidesPerView:2, spaceBetween: 5 },
        }}
        className="projects-swiper"
      >
        {projects.map((proj, i) => (
          <SwiperSlide key={i}>
            <ProjectCard project={proj} delay={150 + i * 100} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const ProjectCard = ({ project, delay }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  
  const spring = useSpring({ from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 }, delay })
  const flipSpring = useSpring({ 
    rotateY: isFlipped ? 180 : 0,
    config: { tension: 300, friction: 30 }
  })

  return (
    <animated.div 
      style={spring}
      className="project-card-container"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <animated.div 
        className="project-card-inner"
        style={{
          transform: flipSpring.rotateY.to(val => `perspective(1000px) rotateY(${val}deg)`),
        }}
      >
        {/* Front Side */}
        <div className="project-card-front">
          <div className="proj-icon">{project.image}</div>
          <h3>{project.title}</h3>
          <p className="proj-desc">{project.desc}</p>
          <div className="proj-role">{project.role}</div>
          <div className="proj-tech">
            {project.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
          </div>
          <ul className="proj-highlights">
            {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>

        {/* Back Side */}
        <div className="project-card-back">
          <div className="back-icon">
  {project?.imagesrc ? (
          <img src={project.imagesrc} alt="Project icon" className='img-fluid' style={{width:"100%",height:"100%"}} />
        ) : (
          <p>{project?.image}</p>
        )}
      </div>

          <h3>{project.title}</h3>
          <p className="back-subtitle">{project.shortDesc}</p>
          <div className="back-links">
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="back-link live"
              onClick={(e) => e.stopPropagation()}
            >
              🌐 Live Demo
            </a>
            <a 
              href={project.gitHub} 
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
  )
}

export default Projects
