import "./Navbar.css";
import logo from "../../assets/images/icon-256.png";
import { FaGithub } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { CiMenuFries } from "react-icons/ci";
import { VscChromeClose } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navSpring = useSpring({
    background: isScrolled ? "rgba(10, 11, 13, 0.95)" : "rgba(10, 11, 13, 0.6)",
    borderColor: isScrolled ? "rgba(109, 240, 200, 0.3)" : "rgba(109, 240, 200, 0.1)",
  });

  const navLinks = [
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com" },
    { icon: <ImLinkedin />, url: "https://linkedin.com/in/manorajs" },
  ];

  return (
    <animated.div
      className="nav-header"
      style={{
        background: navSpring.background,
        borderColor: navSpring.borderColor,
      }}
    >
      <div className="nav-wrapper">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Logo" />
          {/* <span className="logo-text">MANORAJ</span> */}
        </Link>

        <div className="nav-desktop-links">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-link">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-social-desktop">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="menu-toggle">
          {window.innerWidth <= 900 && (
            <button className="menu-btn" onClick={handleMenuToggle} aria-label="Toggle menu">
              {isMenuOpen ? <VscChromeClose /> : <CiMenuFries />}
            </button>
          )}
        </div>
      </div>

      {isMenuOpen && window.innerWidth <= 900 && (
        <div className="nav-mobile-menu">
          <div className="mobile-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mobile-socials">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default Navbar;