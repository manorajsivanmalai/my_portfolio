import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import './Experience.css'

const Experience = () => {
  const experiences = [
    {
      company: 'Renaissance Technologies Pvt. Ltd.',
      role: 'Frontend Developer',
      duration: 'Jun 2023 – Present',
      location: 'Bangalore',
      highlights: [
        'Managed and maintained 130+ Toyota dealer websites and Lexus finance sites',
        'Implemented Google Analytics custom events and SEO optimization',
        'Handled FTP deployments and production coordination with OEM teams',
        'Developed responsive product, pricing, and marketing pages using React'
      ]
    },
    {
      company: 'Seelaikaari.com',
      role: 'Full-Stack Developer (Freelance)',
      duration: 'Ongoing',
      location: 'Bangalore',
      highlights: [
        'Developed end-to-end e-commerce platform with 50+ features',
        'Built admin panel for inventory, order tracking, and real-time analytics',
        'Engineered RESTful APIs and integrated OAuth for secure authentication',
        'Deployed to VPS with NGINX, PM2, and database optimization'
      ]
    },
    {
      company: 'Kelite Global Solutions',
      role: 'Full-Stack Developer & Team Lead (Freelance)',
      duration: 'Completed',
      location: 'Remote',
      highlights: [
        'Led small team, managed GitHub strategy, and performed code reviews',
        'Built product management, orders, payments, and admin dashboards',
        'Handled deployments, hosting configuration, and release coordination',
        'Delivered scalable, production-grade web applications'
      ]
    }
  ]

  const titleSpring = useSpring({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 }, delay: 100 })

  return (
    <div className="experience-page">
      <div className="experience-hero">
        <animated.h1 style={titleSpring} className="section-title">Work Experience</animated.h1>
        <p className="section-desc">2.6+ years of professional development and leadership</p>
      </div>
      <div className="experience-timeline">
        {experiences.map((exp, i) => (
          <ExperienceCard key={i} experience={exp} delay={150 + i * 100} index={i} />
        ))}
      </div>
    </div>
  )
}

const ExperienceCard = ({ experience, delay, index }) => {
  const spring = useSpring({ from: { opacity: 0, x: index % 2 === 0 ? -40 : 40 }, to: { opacity: 1, x: 0 }, delay })

  return (
    <animated.div style={spring} className={`exp-card ${index % 2 === 0 ? 'left' : 'right'}`}>
      <div className="exp-dot" />
      <div className="exp-content">
        <h3>{experience.role}</h3>
        <p className="exp-company">{experience.company}</p>
        <p className="exp-meta">{experience.duration} • {experience.location}</p>
        <ul className="exp-highlights">
          {experience.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </animated.div>
  )
}

export default Experience
