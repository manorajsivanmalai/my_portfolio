import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { APIProvider } from "./context/APIProvider"
import ErrorBoundary from "./components/ErrorBoundary"
import Home from "./pages/home/Home"
import Navbar from "./components/navbar/Navbar"
import Projects from "./pages/projects/Projects"
import Contact from "./pages/contact/Contact"
import Skills from "./pages/skills/Skills"
import Experience from "./pages/experience/Experience"

const App = () => {
  return (
    <ErrorBoundary>
      <APIProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </APIProvider>
    </ErrorBoundary>
  )
}
export default App