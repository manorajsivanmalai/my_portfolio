import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import './Contact.css'
import SuccessMessage from '../../components/successmessagepopup/SuccessMessage'

const Contact = () => {
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const titleSpring = useSpring({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 }, delay: 100 })
  const formSpring = useSpring({ from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 }, delay: 250 })
  const infoSpring = useSpring({ from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 }, delay: 350 })

  return (
    <div className="contact-page">
      {submitted && (
        <SuccessMessage 
          onClose={() => setSubmitted(false)}
          duration={5000}
          message="Thanks for reaching out! I've received your message and will reply shortly 😊"
        />
      )}
      <div className="contact-hero">
        <animated.h1 style={titleSpring} className="section-title">Get In Touch</animated.h1>
        <p className="section-desc">Let's discuss your project or just say hello!</p>
      </div>
      
      <div className="contact-container">
        <animated.form style={formSpring} className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows="5"
              required 
            />
          </div>
          <button type="submit" className="btn primary">Send Message</button>
          {submitted && <div className="success-msg">✓ Message sent! I'll get back to you soon.</div>}
        </animated.form>

        <animated.div style={infoSpring} className="contact-info">
          <div className="info-block">
            <div className="info-icon">📧</div>
            <h4>Email</h4>
            <a href="mailto:smanoraj24@gmail.com">smanoraj24@gmail.com</a>
          </div>
          <div className="info-block">
            <div className="info-icon">📱</div>
            <h4>Phone</h4>
            <a href="tel:+916383685682">+91-6383685682</a>
          </div>
          <div className="info-block">
            <div className="info-icon">📍</div>
            <h4>Location</h4>
            <p>Bangalore Urban, Karnataka, India</p>
          </div>
          <div className="info-block">
            <div className="info-icon">🔗</div>
            <h4>LinkedIn</h4>
            <a href="https://linkedin.com/in/manorajs" target="_blank" rel="noopener noreferrer">linkedin.com/in/manorajs</a>
          </div>
        </animated.div>
      </div>
    </div>
  )
}
export default Contact
