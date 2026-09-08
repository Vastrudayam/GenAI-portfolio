import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CourseDetail from './components/CourseDetail';
import Syllabus from './pages/Syllabus';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <CustomCursor />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/fullstack-syllabus" element={<Syllabus />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
