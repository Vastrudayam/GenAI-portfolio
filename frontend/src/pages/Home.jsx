import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';

// Assets

import ApplyModal from '../components/ApplyModal';

// Section Styles
import './Home.css';

const Counter = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const controls = animate(count, numericValue, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return <span>{displayValue}{suffix}</span>;
};

const CourseCard = ({ title, icon, image, description, id, onApply }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`course-card card-${id}`}
    >
      <div className="course-image-container" onClick={() => id === 'fullstack' ? navigate('/fullstack-syllabus') : navigate(`/course/${id}`)}>
        <img src={image} alt={title} className="course-image" />
      </div>
      <div className="course-body">
        <h3 className="course-title" onClick={() => id === 'fullstack' ? navigate('/fullstack-syllabus') : navigate(`/course/${id}`)}>{title}</h3>
        <p className="course-desc">{description}</p>
        <div className="course-footer">
          <button onClick={() => id === 'fullstack' ? navigate('/fullstack-syllabus') : navigate(`/course/${id}`)} className="course-roadmap-link">View Syllabus</button>
          <button onClick={() => onApply(title)} className="btn-apply-black">Apply Now</button>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', course: 'Select a course', message: '' });
  const [heroFormData, setHeroFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    graduationYear: '',
    language: '',
    techPath: 'Fullstack'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  const studentJourneys = [
    { name: 'Hasini', branch: 'CSE', color: '#cecfe6de', course: 'Fullstack', videoUrl: '/src/assets/InShot_20260515_105532683.mp4', isLocal: true },
    { name: 'Sneha ', branch: 'ECE', color: '#ecd0d0c2', course: 'GenAI & ML', videoUrl: '/src/assets/VID_20260515104248.mp4', isLocal: true },
    { name: 'SNEHA REDDY', branch: 'IT', color: '#e5f1e5eb', course: 'Digital Marketing', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', isLocal: false },
    { name: 'ARJUN V', branch: 'CSE', color: '#f3e0f3ff', course: 'Fullstack', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', isLocal: false },
    { name: 'PRIYA K', branch: 'MECH', color: '#d5e1e1e4', course: 'GenAI', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', isLocal: false },
  ];

  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 1 : 2);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextJourney = () => {
    setJourneyIndex((prev) => (prev + 1) % studentJourneys.length);
  };

  const prevJourney = () => {
    setJourneyIndex((prev) => (prev - 1 + studentJourneys.length) % studentJourneys.length);
  };

  const handleHeroFormSubmit = (e) => {
    e.preventDefault();
    const whatsappMsg = `Hello! I want to book a free demo class.%0A%0AName: ${heroFormData.name}%0AEmail: ${heroFormData.email}%0APhone: ${heroFormData.phone}%0AWhatsapp: ${heroFormData.whatsapp}%0AGraduation Year: ${heroFormData.graduationYear}%0ALanguage: ${heroFormData.language}%0ATech Path: ${heroFormData.techPath}`;
    const whatsappUrl = `https://wa.me/917993971574?text=${whatsappMsg}`;
    window.open(whatsappUrl, '_blank');
  };

  const openApplyModal = (courseTitle = 'Internship') => {
    setSelectedCourse(courseTitle);
    setIsModalOpen(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const whatsappMsg = `Hello! I have an inquiry.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0ACourse: ${formData.course}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/917993971574?text=${whatsappMsg}`;
    window.open(whatsappUrl, '_blank');
  };

  const stats = [
    { label: 'Placement Rate', value: '83', suffix: '%' },
    { label: 'Hiring Partners', value: '100', suffix: '+' },
    { label: 'Got Their First Job', value: '100', suffix: '+' },
  ];

  const floatingCards = [
    { title: 'Web Development', students: '2,450 Students', icon: '⚡' },
    { title: 'Digital Marketing', students: '3,200 Students', icon: '📈' },
    { title: 'Data Analyst', students: '1,890 Students', icon: '🎨' },
  ];

  const achievements = [
    { label: 'Graduates', value: '5k+', icon: '🎓' },
    { label: 'Partners', value: '50+', icon: '🤝' },
    { label: 'Placement', value: '95%', icon: '🚀' },
    { label: 'Awards', value: '12', icon: '🏆' },
  ];

  const reviews = [
    { name: 'Syed Mymoon mirza', linkedin: 'https://www.linkedin.com/in/mymoonmirza/', image: '/assets/students/moon.png', rating: 5, text: 'The GenAI internship provided me with hands-on experience that I couldn\'t find elsewhere. The mentorship was top-notch and truly prepared me for the tech industry.' },
    { name: 'K. Khyathi Sri', linkedin: 'https://www.linkedin.com/in/kyati.png', image: '/assets/students/kyati.png', rating: 5, text: 'I learned more in 6 months here than I did in 4 years of college. The real-world projects were challenging but extremely rewarding for my career growth.' },
    { name: 'E. Hasini Reddy', linkedin: 'https://www.linkedin.com/in/hasinireddyega15', image: '/assets/students/hasini.png', rating: 4, text: 'A fantastic environment for learning. The structured syllabus and supportive community made mastering complex concepts like React and Node.js much easier.' },
    { name: 'A. Sameera', linkedin: 'https://www.linkedin.com/in/aarella-sameera-4b250239b', image: '/assets/students/sameera.png', rating: 5, text: 'The placement assistance is what sets this institute apart. They don\'t just teach you to code; they help you build a professional network and secure a job.' },
    { name: 'C. Gayathri', linkedin: 'https://www.linkedin.com/in/gayathrichowdam/', image: '/assets/students/gayatri.png', rating: 5, text: 'Every module was carefully designed to meet industry standards. Working on live projects gave me the confidence to handle professional software development tasks.' },
    { name: 'B. Susmitha', linkedin: 'https://www.linkedin.com/in/susmithabojanapu', image: '/assets/students/sushmita.png', rating: 4, text: 'I highly recommend this program to any aspiring developer. The curriculum is comprehensive and the 1:1 mentorship sessions were incredibly helpful for my progress.' },
    { name: 'B. Navya Deepthi', linkedin: 'https://www.linkedin.com/in/navya-deepthi-boddu', image: '/assets/students/navya.png', rating: 5, text: 'From basic HTML to complex database management, the journey was amazing. The technical support was always available whenever I got stuck on a project.' },
    { name: 'K. Tharuni', linkedin: 'https://www.linkedin.com/in/tharuni-kori', image: '/assets/students/tharuni.png', rating: 5, text: 'The internship culture here is very professional yet welcoming. I gained significant technical skills and learned how to collaborate effectively in a dev team.' },
    { name: 'K. Amrutha', linkedin: 'https://www.linkedin.com/in/katravath-amrutha-6b24173a3/', image: '/assets/students/amruta.png', rating: 4, text: 'Great focus on practical learning. The internship helped me understand the software development lifecycle from scratch, which was crucial for my interviews.' },
    { name: 'K. Neelima', linkedin: 'https://www.linkedin.com/in/neelima2007', image: '/assets/students/neelima.png', rating: 5, text: 'The mock interviews and resume building workshops were a game-changer. I felt confident during my actual placement drives thanks to the rigorous training.' },
    { name: 'V. Hemasri', linkedin: 'https://www.linkedin.com/in/hemasri-vennapusa-720943392', image: '/assets/students/hema.png', rating: 5, text: 'Exceptional teaching quality. The mentors explain even the most difficult topics in a simple way. My portfolio looks much more professional after this program.' },
    { name: 'A. Divya Bharathi', linkedin: 'https://www.linkedin.com/in/divya-avulakunta', image: '/assets/students/divya.png', rating: 4, text: 'Joining this internship was the best decision for my career. The projects I worked on are now the highlight of my resume and were praised by recruiters.' },
    { name: 'S. Meghana', linkedin: 'https://www.linkedin.com/in/suddamallameghana', image: '/assets/students/shuddamalla.png', rating: 5, text: 'A perfect blend of theory and practice. The real-time industry projects ensured that I was ready to contribute to a tech team from day one of my job.' },
    { name: 'Sujatha LaxmiDevi', linkedin: 'https://www.linkedin.com/in/sujathalaxmidevi2007/', image: '/assets/students/sujatha.png', rating: 5, text: 'I am grateful for the personalized attention I received. The mentors truly care about each student\'s success and go above and beyond to help them improve.' },
    { name: 'A. Kavya', linkedin: 'https://www.linkedin.com/in/kavya2008/', image: '/assets/students/kavya.png', rating: 4, text: 'The learning resources provided are extensive and up-to-date. I enjoyed the collaborative environment and the opportunity to work with talented peers.' },
    { name: 'Maheswari', linkedin: 'https://www.linkedin.com/in/guru-maheswari-baigalla-59a1873ab/', image: '/assets/students/guru.png', rating: 5, text: 'This program completely transformed my career path. I went from having zero coding knowledge to building full-stack applications with ease and confidence.' },
    { name: 'M. Preethi Chandana', linkedin: 'https://www.linkedin.com/in/preethi-chandana', image: '/assets/students/preeti.png', rating: 5, text: 'The exposure to modern tech stacks was invaluable. I strongly recommend GenAI to anyone looking to bridge the gap between college and a tech career.' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-bg-decor" />
        <div className="container">
          <div className="hero-grid">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="hero-title">Launch Your Career with <span className="text-primary">Zorvixe.</span></h1>
              <p className="hero-description">Unlock unlimited placement drives & 1:1 mentorship with top software training and placement institute. Get hands-on training in Full Stack Development, Digital Marketing and Data Analyst and secure your dream tech job.</p>
              <div className="hero-stats">
                {stats.map((stat, i) => (
                  <div key={i} className="stat-item">
                    <h4 className="stat-value"><Counter value={stat.value} suffix={stat.suffix} /></h4>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="hero-actions">
                <button className="btn-primary" style={{ fontSize: '1.125rem', padding: '0.8rem 2.5rem' }}>Browse Courses</button>
                <button className="px-10 py-3 rounded-xl font-bold border-2 border-primary text-primary hover:bg-primary/5 transition-all">Learn More</button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }} 
              className="hero-form-container"
            >
              <div className="hero-form-card">
                <h3 className="hero-form-title">Book Your Demo Classes, For Free!</h3>
                <form onSubmit={handleHeroFormSubmit} className="hero-form">
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      required 
                      className="hero-input"
                      value={heroFormData.name}
                      onChange={(e) => setHeroFormData({...heroFormData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      placeholder="Email" 
                      required 
                      className="hero-input"
                      value={heroFormData.email}
                      onChange={(e) => setHeroFormData({...heroFormData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="tel" 
                      placeholder="Phone" 
                      required 
                      className="hero-input"
                      value={heroFormData.phone}
                      onChange={(e) => setHeroFormData({...heroFormData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="tel" 
                      placeholder="Whatsapp Number" 
                      required 
                      className="hero-input"
                      value={heroFormData.whatsapp}
                      onChange={(e) => setHeroFormData({...heroFormData, whatsapp: e.target.value})}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <select 
                        required 
                        className="hero-select"
                        value={heroFormData.graduationYear}
                        onChange={(e) => setHeroFormData({...heroFormData, graduationYear: e.target.value})}
                      >
                        <option value="" disabled>Graduation year?</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <select 
                        required 
                        className="hero-select"
                        value={heroFormData.language}
                        onChange={(e) => setHeroFormData({...heroFormData, language: e.target.value})}
                      >
                        <option value="" disabled>Select language</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group tech-path-group">
                    <label className="tech-path-label">Which tech do you want to start your career with?</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          name="techPath" 
                          value="Fullstack" 
                          checked={heroFormData.techPath === 'Fullstack'}
                          onChange={(e) => setHeroFormData({...heroFormData, techPath: e.target.value})}
                        />
                        <span>Fullstack</span>
                      </label>
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          name="techPath" 
                          value="GenAI" 
                          checked={heroFormData.techPath === 'GenAI'}
                          onChange={(e) => setHeroFormData({...heroFormData, techPath: e.target.value})}
                        />
                        <span>GenAI</span>
                      </label>
                        <label className="radio-label">
                        <input 
                          type="radio" 
                          name="techPath" 
                          value="Digital Marketing" 
                          checked={heroFormData.techPath === 'Digital Marketing'}
                          onChange={(e) => setHeroFormData({...heroFormData, techPath: e.target.value})}
                        />
                        <span>Digital Marketing</span>
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="hero-submit-btn">REGISTER NOW</button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses-section">
        <div className="container">
          <div className="courses-header">
            <h2 className="courses-title">Popular <span className="text-primary">Internship Tracks.</span></h2>
            <p className="courses-subtitle">Choose from our industry-leading internship programs designed to make you job-ready in months, not years.</p>
          </div>
          <div className="courses-grid">
            {courses.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}><CourseCard {...course} onApply={openApplyModal} /></motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-decor-1" /><div className="about-decor-2" />
        <div className="container relative z-10">
          <div className="about-grid">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="about-label">Our Story</span>
              <h2 className="about-title">Empowering the Next <br /><span className="text-primary">Generation of Tech.</span></h2>
              <p className="about-text">We started with a simple mission: to make high-quality tech education accessible and practical. Our internship-led approach ensures that you don't just learn theory, but you build products that users love.</p>
              <p className="about-text">Our mentors are industry veterans from top tech companies, dedicated to guiding you through your journey from a beginner to a professional.</p>
              <div className="achievements-grid">
                {achievements.map((item, i) => (
                  <div key={i} className="achievement-item"><div className="achievement-icon">{item.icon}</div><div><h4 className="achievement-value">{item.value}</h4><p className="achievement-label">{item.label}</p></div></div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="about-cta-card">
                <div className="cta-icon-wrapper">🚀</div>
                <h3 className="cta-title">Launch Your Career</h3>
                <p className="cta-desc">Join our upcoming cohort and transform your career with hands-on projects and industry mentorship.</p>
                <div className="cta-features">
                  {['Verified Certification', 'Job Placement Assistance', 'Real-world Projects'].map((feature, i) => (
                    <div key={i} className="feature-item"><div className="feature-check">✓</div>{feature}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container-fluid" style={{ overflow: 'hidden', padding: '0' }}>
          <div className="testimonials-header" style={{ padding: '0 1rem' }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="testimonials-title">Our Successful <span className="text-primary">Students</span></motion.h2>
            <p className="testimonials-subtitle">Meet the brilliant minds who have excelled in our programs and are now part of the global tech community.</p>
          </div>
          
          <div className="testimonial-marquee-container">
            <div className="testimonial-marquee-track">
              {/* Double the reviews for infinite loop */}
              {[...reviews, ...reviews].map((review, i) => (
                <div key={i} className="testimonial-card">
                  <div className="author-img-wrapper" style={{ margin: '0 auto 1.5rem', width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)', padding: '3px', backgroundColor: 'white' }}>
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                      onError={(e) => {
                        e.target.src = "https://ui-avatars.com/api/?name=" + review.name + "&background=10b981&color=fff";
                      }}
                    />
                  </div>
                  <div className="author-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h4 className="author-name" style={{ marginBottom: '0.25rem' }}>{review.name}</h4>
                    
                    {/* Star Rating */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '1rem', color: '#fbbf24' }}>
                      {[...Array(5)].map((_, index) => (
                        <i key={index} className={`bi bi-star-fill ${index >= review.rating ? 'opacity-20' : ''}`} style={{ fontSize: '0.875rem' }}></i>
                      ))}
                    </div>

                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--text-dim)', 
                      marginBottom: '1.5rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      padding: '0 1rem',
                      overflow: 'hidden',
                      minHeight: '4.5rem'
                    }}>
                      "{review.text}"
                    </p>

                    <a 
                      href={review.linkedin.startsWith('www') ? `https://${review.linkedin}` : review.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary font-bold text-sm"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                      <i className="bi bi-linkedin"></i> View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="cta-banner-section container">
        <div className="cta-banner-card glass-card">
          <h2 className="cta-banner-title">Ready to Join the Internship?</h2>
          <p className="cta-banner-desc">Our limited slots fill up fast. Apply today to secure your position in our upcoming cohort.</p>
          <button onClick={() => openApplyModal('Internship')} className="btn-primary">Apply Now</button>
        </div>
      </section>

      {/* Student Journeys Section */}
      <section className="journeys-section">
        <div className="container">
          <div className="journeys-header">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              className="journeys-title"
            >
              Listen: <span className="text-primary">Real Students' Journeys</span>
            </motion.h2>
          </div>
          
          <div className="journeys-carousel-wrapper">
            <button className="carousel-control prev" onClick={prevJourney}>
              <i className="bi bi-chevron-left"></i>
            </button>
            
            <div className="journeys-carousel-container">
              <div className="journeys-carousel-track" style={{ transform: `translateX(-${journeyIndex * (100 / itemsPerPage)}%)` }}>
                {studentJourneys.map((student, i) => (
                  <div key={i} className="journey-slide">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className="journey-card"
                      style={{ '--card-accent': student.color }}
                    >
                      <div className="video-placeholder" onClick={() => setActiveVideo(student.videoUrl)}>
                        {activeVideo === student.videoUrl ? (
                          student.isLocal ? (
                            <video 
                              className="journey-video-iframe" 
                              src={student.videoUrl} 
                              controls 
                              autoPlay 
                            />
                          ) : (
                            <iframe 
                              className="journey-video-iframe"
                              src={`${student.videoUrl}?autoplay=1`} 
                              title="Student Journey"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          )
                        ) : (
                          <>
                            {student.isLocal && (
                              <video 
                                className="journey-preview-video" 
                                src={student.videoUrl} 
                                muted 
                                loop 
                                autoPlay 
                                playsInline
                              />
                            )}
                            <div className="video-content overlay">
                              <div className="student-course-badge">{student.course}</div>
                              <div className="play-button-wrapper">
                                <div className="play-button">
                                  <i className="bi bi-play-fill"></i>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="journey-info">
                        <h3 className="student-name">{student.name}</h3>
                        <div className="branch-divider">
                          <span>BRANCH</span>
                          <div className="divider-line"></div>
                          <span>{student.branch}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-control next" onClick={nextJourney}>
              <i className="bi bi-chevron-right"></i>
            </button>

            <div className="carousel-indicators">
              {studentJourneys.map((_, i) => (
                <button 
                  key={i} 
                  className={`indicator-dot ${i === journeyIndex ? 'active' : ''}`}
                  onClick={() => setJourneyIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="contact-info">
              <h2>Get in <span className="text-primary">Touch.</span></h2>
              <p className="contact-desc">Have questions about our internship programs? Our team is here to help you choose the right path for your career.</p>
              <div className="contact-methods">
                {[
                  { icon: 'bi-envelope', label: 'Email Us', value: 'hello@eduintern.com' },
                  { icon: 'bi-telephone', label: 'Call Us', value: '+91 79939 71574' },
                  { icon: 'bi-geo-alt', label: 'Visit Us', value: '123 Tech Avenue, Silicon Valley, CA' },
                ].map((item, i) => (
                  <div key={i} className="contact-method-item">
                    <div className="method-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div>
                      <p className="method-label">{item.label}</p>
                      <p className="method-value">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="contact-form-card">
              <div className="form-decor" /><form onSubmit={handleContactSubmit}><div className="form-grid-row"><div className="form-group"><label className="form-label">Full Name</label><input required type="text" className="form-input" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div><div className="form-group"><label className="form-label">Email Address</label><input required type="email" className="form-input" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div></div><div className="form-group"><label className="form-label">Interested Course</label><select className="form-select" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}><option>Select a course</option><option>Full stack</option><option>GenAI & ML</option><option>Digital Marketing</option></select></div><div className="form-group"><label className="form-label">Message</label><textarea required className="form-textarea" placeholder="How can we help you?" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea></div><button type="submit" className="btn-primary form-submit-btn">Send via WhatsApp <span>→</span></button></form>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} courseTitle={selectedCourse} />
      </AnimatePresence>
    </div>
  );
};

export default Home;
