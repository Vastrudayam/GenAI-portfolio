import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Laptop, Briefcase, Users, Play, ArrowRight, 
  ChevronRight, Calendar, Star, X, Layers, Cpu, CheckCircle, Volume2, Mail
} from 'lucide-react';
import { courses } from '../data/courses';
import { blogs } from '../data/blogs';
import ApplyModal from '../components/ApplyModal';
import './Home.css';

// Counter component for animated stats
const Counter = ({ value, suffix = "" }) => {
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/\D/g, ''));
    if (start === end) return;

    let totalDuration = 2000;
    let incrementTime = Math.abs(Math.floor(totalDuration / end));

    let timer = setInterval(() => {
      start += 1;
      setCurrentVal(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{currentVal}{suffix}</span>;
};

const CourseCard = ({ title, image, description, id, onApply }) => {
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
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('Internship');
  
  // Video Modal States
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrlToPlay, setVideoUrlToPlay] = useState('');
  const [videoIsLocal, setVideoIsLocal] = useState(false);

  // Demo Booking Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    graduationYear: '',
    language: '',
    techPath: 'Fullstack'
  });

  // Contact Form State
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    course: 'Select a course',
    message: ''
  });

  const studentJourneys = [
    { name: 'Hasini', branch: 'CSE', color: '#cecfe6de', course: 'Fullstack', videoUrl: '/src/assets/InShot_20260515_105532683.mp4', isLocal: true },
    { name: 'Sneha', branch: 'ECE', color: '#ecd0d0c2', course: 'GenAI & ML', videoUrl: '/src/assets/VID_20260515104248.mp4', isLocal: true },
    { name: 'Sneha Reddy', branch: 'IT', color: '#e5f1e5eb', course: 'Digital Marketing', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', isLocal: false },
    { name: 'Arjun V', branch: 'CSE', color: '#f3e0f3ff', course: 'Fullstack', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', isLocal: false },
    { name: 'Priya K', branch: 'MECH', color: '#d5e1e1e4', course: 'GenAI', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', isLocal: false },
  ];

  const reviews = [
    { name: 'Syed Mymoon mirza', linkedin: 'https://www.linkedin.com/in/mymoonmirza/', rating: 5, text: 'The GenAI internship provided me with hands-on experience that I couldn\'t find elsewhere. The mentorship was top-notch and truly prepared me for the tech industry.', avatar: '/assets/students/moon.png' },
    { name: 'K. Khyathi Sri', linkedin: 'https://www.linkedin.com/in/kyati.png', rating: 5, text: 'I learned more in 6 months here than I did in 4 years of college. The real-world projects were challenging but extremely rewarding for my career growth.', avatar: '/assets/students/kyati.png' },
    { name: 'E. Hasini Reddy', linkedin: 'https://www.linkedin.com/in/hasinireddyega15', rating: 4, text: 'A fantastic environment for learning. The structured syllabus and supportive community made mastering complex concepts like React and Node.js much easier.', avatar: '/assets/students/hasini.png' },
    { name: 'A. Sameera', linkedin: 'https://www.linkedin.com/in/aarella-sameera-4b250239b', rating: 5, text: 'The placement assistance is what sets this institute apart. They don\'t just teach you to code; they help you build a professional network and secure a job.', avatar: '/assets/students/sameera.png' },
    { name: 'C. Gayathri', linkedin: 'https://www.linkedin.com/in/gayathrichowdam/', rating: 5, text: 'Every module was carefully designed to meet industry standards. Working on live projects gave me the confidence to handle professional software development tasks.', avatar: '/assets/students/gayatri.png' },
    { name: 'B. Susmitha', linkedin: 'https://www.linkedin.com/in/susmithabojanapu', rating: 4, text: 'I highly recommend this program to any aspiring developer. The curriculum is comprehensive and the 1:1 mentorship sessions were incredibly helpful for my progress.', avatar: '/assets/students/sushmita.png' },
    { name: 'B. Navya Deepthi', linkedin: 'https://www.linkedin.com/in/navya-deepthi-boddu', rating: 5, text: 'From basic HTML to complex database management, the journey was amazing. The technical support was always available whenever I got stuck on a project.', avatar: '/assets/students/navya.png' },
    { name: 'K. Tharuni', linkedin: 'https://www.linkedin.com/in/tharuni-kori', rating: 5, text: 'The internship culture here is very professional yet welcoming. I gained significant technical skills and learned how to collaborate effectively in a dev team.', avatar: '/assets/students/tharuni.png' }
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const whatsappMsg = `Hello! I want to book a free demo class.%0A%0AName: ${bookingFormData.name}%0AEmail: ${bookingFormData.email}%0APhone: ${bookingFormData.phone}%0AWhatsApp: ${bookingFormData.whatsapp}%0AGraduation Year: ${bookingFormData.graduationYear}%0ALanguage: ${bookingFormData.language}%0ATech Path: ${bookingFormData.techPath}`;
    const whatsappUrl = `https://wa.me/917993971574?text=${whatsappMsg}`;
    window.open(whatsappUrl, '_blank');
    setBookingModalOpen(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const whatsappMsg = `Hello! I have an inquiry.%0A%0AName: ${contactFormData.name}%0AEmail: ${contactFormData.email}%0ACourse: ${contactFormData.course}%0AMessage: ${contactFormData.message}`;
    const whatsappUrl = `https://wa.me/917993971574?text=${whatsappMsg}`;
    window.open(whatsappUrl, '_blank');
  };

  const openApplyModal = (courseTitle = 'Internship') => {
    setSelectedCourse(courseTitle);
    setIsApplyModalOpen(true);
  };

  const playVideo = (url, isLocal) => {
    setVideoUrlToPlay(url);
    setVideoIsLocal(isLocal);
    setVideoModalOpen(true);
  };

  return (
    <div className="home-page">
      {/* Top Announcement Bar */}
      {showAnnouncement && (
        <div className="announcement-bar">
          <div className="announcement-content">
            <span className="gold-dot"></span>
            <span>Are you a 2026 passout? Kickstart your career with our NextGen Development Internship and Unlimited Placement!</span>
          </div>
          <button className="close-announcement-btn" onClick={() => setShowAnnouncement(false)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-container">
          <div className="hero-content" data-aos="fade-right">
            <span className="pre-headline">
              <Laptop size={14} style={{ marginRight: '6px' }} /> Learn by Doing
            </span>
            <h1>
              Launch Your Career with <span className="brand-word">NextGen</span>.<br />Engineer Your Future.
            </h1>
            <p>
              Unlock unlimited placement drives & 1:1 mentorship with a top software training and placement institute. Master software development, learn in-demand skills, build logics while we string together your tech career.
            </p>
            <div className="hero-actions">
              <a href="#courses" className="cta-primary">
                Explore Courses <ChevronRight size={18} />
              </a>
              <button onClick={() => setBookingModalOpen(true)} className="cta-secondary">
                Book a Free Demo
              </button>
            </div>
          </div>

          <div className="hero-visual" data-aos="fade-left">
            <div className="visual-wrapper">
              {/* Node Network Visual Graph */}
              <div className="particle-network">
                {studentJourneys.map((sj, idx) => (
                  <button
                    key={idx}
                    className={`node node-${idx + 1}`}
                    onClick={() => playVideo(sj.videoUrl, sj.isLocal)}
                    title={`Watch ${sj.name}'s Video Testimonial`}
                    aria-label={`Watch ${sj.name}'s Video Testimonial`}
                  >
                    <Play size={10} fill="currentColor" />
                  </button>
                ))}
                
                {/* Connecting SVGs lines */}
                <svg className="node-lines-svg" width="350" height="350">
                  <line x1="35" y1="35" x2="157" y2="105" className="node-line" />
                  <line x1="157" y1="105" x2="280" y2="52" className="node-line" />
                  <line x1="280" y1="52" x2="262" y2="192" className="node-line" />
                  <line x1="262" y1="192" x2="192" y2="280" className="node-line" />
                  <line x1="192" y1="280" x2="70" y2="262" className="node-line" />
                  <line x1="70" y1="262" x2="52" y2="175" className="node-line" />
                </svg>
              </div>

              {/* Code Streams */}
              <div className="code-stream">
                <div className="code-line green"><span className="blink-dot"></span> [ PYTHON ] <span className="blink-dot"></span></div>
                <div className="code-line blue"><span className="blink-dot"></span> [ DJANGO ] <span className="blink-dot"></span></div>
                <div className="code-line gold"><span className="blink-dot"></span> [ REACT ] <span className="blink-dot"></span></div>
                <div className="code-line blue"><span className="blink-dot"></span> [ SQL ] <span className="blink-dot"></span></div>
                <div className="code-line gold"><span className="blink-dot"></span> [ LLMs ] <span className="blink-dot"></span></div>
                <div className="code-line green"><span className="blink-dot"></span> [ RAG ] <span className="blink-dot"></span></div>
                <div className="code-line green"><span className="blink-dot"></span> [ SEO ] <span className="blink-dot"></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses-section">
        <div className="container">
          <div className="courses-header" data-aos="fade-up">
            <span className="courses-label">Internship Programs</span>
            <h2 className="courses-title">Become the <span className="text-primary">Engineer</span> They Want to <span className="text-primary">Hire.</span></h2>
          </div>
          
          <div className="courses-grid">
            {courses.map((course, i) => (
              <motion.div 
                key={course.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }}
              >
                <CourseCard {...course} onApply={openApplyModal} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NextGen Advantage Section */}
      <section className="features-section" id="why-us">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <h2>The <span className="highlight-text">NextGen</span> Advantage.</h2>
            <p>Code is the tool; a strong career is the goal. Moving beyond expertise, we prepare you to lead.</p>
          </div>

          <div className="features-grid">
            <div className="feature-box" data-aos="zoom-in" data-aos-delay="0">
              <div className="feature-icon">
                <Award size={24} />
              </div>
              <h3>Internship & Industry Aligned</h3>
              <p>Acquire internship credits and learn industry-relevant skills and best practices developers follow.</p>
            </div>

            <div className="feature-box" data-aos="zoom-in" data-aos-delay="100">
              <div className="feature-icon">
                <Laptop size={24} />
              </div>
              <h3>Learn By Doing</h3>
              <p>Access modern learning environments, build real projects as you upskill, and solve bugs with hand-on vibe coding.</p>
            </div>

            <div className="feature-box" data-aos="zoom-in" data-aos-delay="200">
              <div className="feature-icon">
                <Briefcase size={24} />
              </div>
              <h3>Placement Support</h3>
              <p>Get access to placement drives until you secure your tech job and gain exclusive access to our partner job board.</p>
            </div>

            <div className="feature-box" data-aos="zoom-in" data-aos-delay="300">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3>NextGen Community</h3>
              <p>Join our elite community of curious and creative minds contributing to tech innovations and job networking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering DNA Timeline Section */}
      <section className="roadmap-section" id="roadmap">
        <div className="grid-overlay"></div>
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <h2>Elevate Your <span className="highlight-text">Engineering DNA</span></h2>
            <p>We mirror the industry career ladder. Advance through structured phases—from foundational tasks to the complex project ownership.</p>
          </div>

          <div className="timeline">
            <div className="timeline-item left" data-aos="fade-right">
              <div className="timeline-dot"><Laptop size={16} /></div>
              <div className="timeline-content">
                <span className="step-label">Phase 01</span>
                <h3>Fun with Fundamentals</h3>
                <p>Acquire key fundamental skills in tech, essential to build and code as you learn.</p>
              </div>
            </div>

            <div className="timeline-item right" data-aos="fade-left">
              <div className="timeline-dot"><Cpu size={16} /></div>
              <div className="timeline-content">
                <span className="step-label">Phase 02</span>
                <h3>Build Step by Step</h3>
                <p>Learning by doing sets you apart. Translate concepts to functional elements step by step.</p>
              </div>
            </div>

            <div className="timeline-item left" data-aos="fade-right">
              <div className="timeline-dot"><Layers size={16} /></div>
              <div className="timeline-content">
                <span className="step-label">Phase 03</span>
                <h3>Stack-Up</h3>
                <p>Hands-on practical exposure prepares you for real-time projects aligned with corporate standards.</p>
              </div>
            </div>

            <div className="timeline-item right" data-aos="fade-left">
              <div className="timeline-dot"><Star size={16} /></div>
              <div className="timeline-content">
                <span className="step-label">Phase 04</span>
                <h3>Talent Showtime</h3>
                <p>Build confidence, present your portfolio, and begin applying for placement drives as you finish major modules.</p>
              </div>
            </div>

            <div className="timeline-item left" data-aos="fade-right">
              <div className="timeline-dot"><CheckCircle size={16} /></div>
              <div className="timeline-content">
                <span className="step-label">Phase 05</span>
                <h3>The Milestone</h3>
                <p>Prepare, practice, build, and perform. Loop this cycle until you secure your milestone placement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast / Expert Sessions Section */}
      <section className="program-detail-section" id="podcast">
        <div className="section-container">
          <div className="program-grid">
            <div className="program-info" data-aos="fade-right">
              <div className="badge"><Volume2 size={14} style={{ marginRight: '6px' }} /> Expert Sessions</div>
              <h2>Talking tech, stacking thoughts.</h2>
              <p className="program-desc">
                NextGen's exclusive expert sessions bring leaders across tech, HR, and design to discuss industry changes, keeping you ahead of the curve.
              </p>
              <div className="program-actions">
                <a href="#" className="btn-primary" onClick={(e) => e.preventDefault()}><Play size={14} fill="currentColor" style={{ marginRight: '8px' }} /> Sip a Byte</a>
                <a href="#" className="btn-outline" onClick={(e) => e.preventDefault()}>All Episodes</a>
              </div>
            </div>

            <div className="program-visuals" data-aos="fade-left">
              <div className="video-thumbnail">
                <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" alt="Podcast Session" />
                <div className="tech-stack-container">
                  <div className="tech-icon spotify-icon"><Star size={18} fill="currentColor" /></div>
                  <div className="tech-icon youtube-icon"><Play size={18} fill="currentColor" /></div>
                </div>
              </div>
              <div className="tools-text">
                <h4>Streaming Everywhere</h4>
                <p>Catch our updates and discussions on major social channels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sneak Peek Video Section */}
      <section className="video-section" id="difference">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <h2>Experience the <span className="highlight-text">NextGen</span> Difference</h2>
            <p>Sneak peek into the tech workspace, learning vibe, and culture of NextGen developers.</p>
          </div>

          <div className="videos-grid-home" data-aos="fade-up">
            {/* Video 1: z1.mp4 */}
            <div 
              className="video-card-home" 
              onClick={() => playVideo("/assets/students/z1.mp4", true)}
            >
              <div className="video-preview-holder">
                <video 
                  src="/assets/students/z1.mp4#t=0.5" 
                  preload="metadata" 
                  muted 
                  playsInline 
                  className="video-thumbnail-media" 
                />
                <div className="video-overlay-gradient"></div>
                <div className="play-btn-overlay">
                  <Play size={26} fill="currentColor" />
                </div>
                <div className="video-badge">
                  <Play size={10} fill="currentColor" style={{ marginRight: '4px' }} /> Sneak Peek 1
                </div>
              </div>
              <div className="video-card-info">
                <h3>Campus & Developer Culture</h3>
                <p>Explore the live coding environment, tech workspace pods & collaborative vibe.</p>
              </div>
            </div>

            {/* Video 2: z2.mp4 */}
            <div 
              className="video-card-home" 
              onClick={() => playVideo("/assets/students/z2.mp4", true)}
            >
              <div className="video-preview-holder">
                <video 
                  src="/assets/students/z2.mp4#t=0.5" 
                  preload="metadata" 
                  muted 
                  playsInline 
                  className="video-thumbnail-media" 
                />
                <div className="video-overlay-gradient"></div>
                <div className="play-btn-overlay">
                  <Play size={26} fill="currentColor" />
                </div>
                <div className="video-badge">
                  <Play size={10} fill="currentColor" style={{ marginRight: '4px' }} /> Sneak Peek 2
                </div>
              </div>
              <div className="video-card-info">
                <h3>Hands-on Mentorship & Projects</h3>
                <p>Witness real-world problem solving, code mentorship & developer transformations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials (Success Stacks) */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <h2>Success <span className="highlight-text">Stories</span></h2>
            <p>Having touched hundreds of student careers, NextGen continues to grow its elite placement network.</p>
          </div>

          {/* Marquee Row */}
          <div className="testimonials-marquee-wrapper" data-aos="fade-up">
            <div className="marquee-content-track">
              {reviews.map((rev, index) => (
                <div key={index} className="testimonial-card-item">
                  <div className="stars-row">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                  <p className="testimonial-text">"{rev.text}"</p>
                  <div className="testimonial-user">
                    <div className="user-info-left">
                      <img src={rev.avatar} alt={rev.name} className="testimonial-avatar" />
                      <h4>{rev.name}</h4>
                    </div>
                    <a href={rev.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-tag">LinkedIn</a>
                  </div>
                </div>
              ))}
              {/* Double reviews for infinite scrolling */}
              {reviews.map((rev, index) => (
                <div key={`dup-${index}`} className="testimonial-card-item">
                  <div className="stars-row">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                  <p className="testimonial-text">"{rev.text}"</p>
                  <div className="testimonial-user">
                    <div className="user-info-left">
                      <img src={rev.avatar} alt={rev.name} className="testimonial-avatar" />
                      <h4>{rev.name}</h4>
                    </div>
                    <a href={rev.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-tag">LinkedIn</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NextGen Stats Banner */}
          <div className="stats-banner" data-aos="fade-up">
            <div className="stat-item">
              <h3><Counter value="83" suffix="%" /></h3>
              <p>Placement Rate</p>
            </div>
            <div className="stat-item">
              <h3><Counter value="100" suffix="+" /></h3>
              <p>Hiring Partners</p>
            </div>
            <div className="stat-item">
              <h3><Counter value="100" suffix="+" /></h3>
              <p>Placed Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blog-section" id="blog">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <h2>Latest from the <span className="highlight-text">NextGen</span> Desk</h2>
            <p>Coding tutorials, career advice, and industry trends to keep you ahead.</p>
          </div>

          <div className="blog-grid">
            {blogs.map((blog, idx) => (
              <article 
                key={blog.id} 
                className="blog-card-item"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div className="blog-image">
                  <span className="blog-category">{blog.category}</span>
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="blog-content-body">
                  <div className="blog-meta">
                    <span><Calendar size={12} style={{ marginRight: '4px' }} /> {blog.date}</span>
                    <span>By {blog.author}</span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>
                  <Link to={`/blog/${blog.id}`} className="read-more-btn">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="section-container">
          <div className="contact-grid">
            <div className="contact-info" data-aos="fade-right">
              <h2>Get in <span className="highlight-text">Touch.</span></h2>
              <p>Have questions about our internship programs? Our team is here to help you choose the right path for your career.</p>
              <div className="contact-methods">
                <div className="method-item">
                  <div className="method-icon"><Mail size={20} /></div>
                  <div>
                    <p className="method-label">Email Us</p>
                    <a href="mailto:hello@eduintern.com" className="method-value">hello@eduintern.com</a>
                  </div>
                </div>
                <div className="method-item">
                  <div className="method-icon"><Volume2 size={20} /></div>
                  <div>
                    <p className="method-label">Call Us</p>
                    <a href="tel:+917993971574" className="method-value">+91 79939 71574</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card" data-aos="fade-left">
              <form onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="John Doe"
                      value={contactFormData.name}
                      onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="john@example.com"
                      value={contactFormData.email}
                      onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Interested Course</label>
                  <select 
                    value={contactFormData.course}
                    onChange={(e) => setContactFormData({ ...contactFormData, course: e.target.value })}
                  >
                    <option value="Select a course" disabled>Select a course</option>
                    <option value="Full stack">Full stack</option>
                    <option value="GenAI & ML">GenAI & ML</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    required 
                    placeholder="How can we help you?"
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-primary form-submit-btn-home">
                  Send via WhatsApp
                </button>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px', marginBottom: '0' }}>
                  Submits directly via WhatsApp to <strong>+91 79939 71574</strong>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="video-player-modal"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="video-modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-video-modal-btn" onClick={() => setVideoModalOpen(false)}>
                <X size={20} />
              </button>
              <div className="video-iframe-holder">
                {videoIsLocal ? (
                  <video src={videoUrlToPlay} controls autoPlay style={{ width: '100%', height: '100%', borderRadius: '12px' }} />
                ) : (
                  <iframe 
                    src={`${videoUrlToPlay}?autoplay=1`}
                    title="NextGen Student Journey"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Booking Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="booking-modal-overlay-home"
            onClick={() => setBookingModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="booking-modal-content-home"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-booking-modal-btn" onClick={() => setBookingModalOpen(false)}>
                <X size={18} />
              </button>
              <h2>Book a Free Demo</h2>
              <p className="booking-subtitle">Fill out the registration details below and we will contact you on WhatsApp shortly.</p>
              
              <form onSubmit={handleBookingSubmit} className="booking-modal-form-home">
                <div className="form-group-booking">
                  <label>Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe"
                    value={bookingFormData.name}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                  />
                </div>
                
                <div className="form-group-booking">
                  <label>Email Address</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="john@example.com"
                    value={bookingFormData.email}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                  />
                </div>

                <div className="form-row-booking">
                  <div className="form-group-booking">
                    <label>Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="Phone"
                      value={bookingFormData.phone}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group-booking">
                    <label>WhatsApp Number</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="WhatsApp"
                      value={bookingFormData.whatsapp}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, whatsapp: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-booking">
                  <div className="form-group-booking">
                    <label>Graduation Year</label>
                    <select 
                      required
                      value={bookingFormData.graduationYear}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, graduationYear: e.target.value })}
                    >
                      <option value="" disabled>Year?</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group-booking">
                    <label>Preferred Language</label>
                    <select 
                      required
                      value={bookingFormData.language}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, language: e.target.value })}
                    >
                      <option value="" disabled>Language?</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-booking">
                  <label className="tech-path-label">Tech Path Preference</label>
                  <div className="tech-path-radio-group">
                    {['Fullstack', 'GenAI', 'Digital Marketing'].map((path) => (
                      <label key={path} className="tech-path-radio-label">
                        <input 
                          type="radio" 
                          name="techPath" 
                          value={path}
                          checked={bookingFormData.techPath === path}
                          onChange={(e) => setBookingFormData({ ...bookingFormData, techPath: e.target.value })}
                        />
                        <span>{path}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="booking-submit-btn-home">
                  Register For Demo
                </button>
                <p className="booking-whatsapp-disclaimer">
                  Submits directly via WhatsApp to <strong>+91 79939 71574</strong>
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apply Course Form Modal */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <ApplyModal 
            isOpen={isApplyModalOpen} 
            onClose={() => setIsApplyModalOpen(false)} 
            courseTitle={selectedCourse}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
