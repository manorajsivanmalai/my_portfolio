import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import './Skills.css'

const Skills = () => {
  const skillsData = [
    {
      category: 'Frontend',
      icon: '⚛️',
      skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery']
    },
    {
      category: 'Backend',
      icon: '🔧',
      skills: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'Spring Security', 'Django', 'FastAPI']
    },
    {
      category: 'Database',
      icon: '💾',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'MSSQL']
    },
    {
      category: 'Tools & DevOps',
      icon: '⚙️',
      skills: ['Git/GitHub', 'NGINX', 'VPS Hosting', 'PM2', 'Docker', 'Postman', 'Selenium']
    },
    {
      category: 'Languages',
      icon: '💻',
      skills: ['JavaScript', 'Java', 'Python']
    },
    {
      category: 'Other',
      icon: '📊',
      skills: ['REST APIs', 'JWT Auth', 'Microservices', 'Pandas', 'NumPy', 'Hibernate']
    }
  ]

  const titleSpring = useSpring({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 }, delay: 100 })

  return (
    <div className="skills-page">
      <div className="skills-hero">
        <animated.h1 style={titleSpring} className="section-title">Tech Stack</animated.h1>
        <p className="section-desc">2.6+ years of professional development across multiple technologies.</p>
      </div>
      <div className="skills-grid">
        {skillsData.map((cat, i) => (
          <SkillCategory key={i} category={cat} delay={150 + i * 80} />
        ))}
      </div>
    </div>
  )
}

const SkillCategory = ({ category, delay }) => {
  const [expanded, setExpanded] = React.useState(false)
  const spring = useSpring({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 }, delay })
  const expandSpring = useSpring({ maxHeight: expanded ? '400px' : '60px', opacity: expanded ? 1 : 0.7 })

  return (
    <animated.div style={spring} className="skill-card" onClick={() => setExpanded(!expanded)}>
      <div className="skill-header">
        <span className="skill-icon">{category.icon}</span>
        <h3>{category.category}</h3>
        <span className="expand-icon">{expanded ? '−' : '+'}</span>
      </div>
      <animated.div style={expandSpring} className="skill-list">
        <div className="skill-items">
          {category.skills.map((skill, i) => (
            <span key={i} className="skill-item">{skill}</span>
          ))}
        </div>
      </animated.div>
    </animated.div>
  )
}

export default Skills
