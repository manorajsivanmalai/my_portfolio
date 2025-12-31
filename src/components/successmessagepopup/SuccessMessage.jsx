// SimpleSuccessMessage.tsx
import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import './SuccessMessage.css';

const SuccessMessage = ({ onClose }) => {
  const fadeIn = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div style={fadeIn} className="simple-success">
      <div className="simple-success-icon">✓</div>
      <h3>Message Sent! 🎉</h3>
      <p>Thanks for reaching out! I've received your message and will reply shortly 😊</p>
      <button onClick={onClose} className="simple-close-btn">
        Awesome!
      </button>
    </animated.div>
  );
};

export default SuccessMessage;