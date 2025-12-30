import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/home/Home"
import Navbar from "./components/navbar/Navbar"
import Projects from "./pages/projects/Projects"
import Contact from "./pages/contact/Contact"
import Skills from "./pages/skills/Skills"
import Experience from "./pages/experience/Experience"

const App = () => {
  return (
    <Router>
      <Navbar />
       <Routes>
         <Route path="/" element={<Home />}></Route>
         <Route path="/projects" element={<Projects />}></Route>
         <Route path="/skills" element={<Skills />}></Route>
         <Route path="/experience" element={<Experience />}></Route>
         <Route path="/contact" element={<Contact />}></Route>
       </Routes>
    </Router>
  )
}
export default App