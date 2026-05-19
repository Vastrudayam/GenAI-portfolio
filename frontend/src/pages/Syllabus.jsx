import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApplyModal from '../components/ApplyModal';
import './Syllabus.css';

import pythonImg from '../assets/fullstack_new.png';

const Syllabus = () => {
  const navigate = useNavigate();

  const cycles = [
    {
      title: "Phase 1: Foundation Phase",
      duration: "8 Weeks • Web Basics & Python",
      color: "bg-blue-400",
      items: [
        { name: "Intro to Intensive", status: "completed" },
        { name: "Build Your Own Static Website", tags: ["HTML", "CSS", "BOOTSTRAP"], status: "in-progress" },
        { name: "Build Your Own Responsive Website", tags: ["HTML", "CSS", "BOOTSTRAP"], status: "in-progress" },
        { name: "Programming Foundations", tags: ["PYTHON"], status: "in-progress" },
        { name: "Course Exams", status: "not-started" },
      ]
    },
    {
      title: "Phase 2: Specialization Phase",
      duration: "16 Weeks • Master Development",
      color: "bg-orange-400",
      items: [
        { name: "Programming Foundations", tags: ["PYTHON"], status: "in-progress" },
        { name: "Build Your Own Dynamic Web Application", tags: ["HTML", "CSS", "JAVASCRIPT"], status: "in-progress" },
        { name: "Introduction to Databases", status: "in-progress" },
        { name: "JavaScript Essentials", tags: ["JAVASCRIPT"], status: "in-progress" },
        { name: "Responsive Web Design using Flexbox", tags: ["FLEXBOX"], status: "completed" },
        { name: "Course Exams", status: "not-started" },
      ]
    },
    {
      title: "Phase 3: Capstone Phase",
      duration: "8 Weeks • Advanced React & Projects",
      color: "bg-green-500",
      items: [
        { name: "Developer Foundations", tags: ["GIT", "COMMANDLINE"], status: "completed" },
        { name: "Node JS", tags: ["NODE JS"], status: "in-progress" },
        { name: "Python Interview Kit", status: "in-progress" },
        { name: "React JS - Getting started", tags: ["REACT JS"], status: "in-progress" },
        { name: "Course Exams", status: "not-started" },
        { name: "Frontend Interview Kit", status: "in-progress" },
        { name: "React JS Mini Project", status: "not-started" },
      ]
    }
  ];

  const StatusIcon = ({ status }) => {
    if (status === "completed") {
      return (
        <div className="status-icon status-completed">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    }
    if (status === "in-progress") {
      return (
        <div className="status-icon status-in-progress">
          <div className="loading-spinner"></div>
        </div>
      );
    }
    return (
      <div className="status-icon status-not-started"></div>
    );
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="syllabus-page">
      <div className="syllabus-container">
        <motion.button 
          onClick={() => navigate('/')}
          className="back-button"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: -5 }}
          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '1rem 0' }}
        >
          ← Back to Courses
        </motion.button>

        <div className="course-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '99px', fontSize: '0.8125rem', fontWeight: '700', marginBottom: '1.5rem' }}>💻 Professional Track</span>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#1e293b', lineHeight: '1.1', marginBottom: '1.5rem' }}>Full Stack <span style={{ color: '#10b981', fontStyle: 'italic' }}>Development</span></h1>
            <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2rem' }}>Master frontend and backend development with modern technologies and real-world projects in our comprehensive 8-month internship.</p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>Start Your Application</button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
          >
            <img src={pythonImg} alt="Full Stack" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </motion.div>
        </div>

        <div className="roadmap-section">
          <h2 className="roadmap-header" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: '800' }}>Comprehensive <span className="gradient-text">Success Syllabus</span></h2>

        <div className="space-y-12">
          {cycles.map((cycle, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="cycle-card"
            >
              <div className="cycle-header">
                <div className={`cycle-indicator ${cycle.color}`}></div>
                <div className="cycle-info">
                  <h3>{cycle.title}</h3>
                  <span className="cycle-duration">{cycle.duration}</span>
                </div>
              </div>

              <div className="item-list">
                {cycle.items.map((item, j) => (
                  <div key={j} className="syllabus-item">
                    <div className="item-content">
                      <span className="item-name">{item.name}</span>
                      {item.tags && (
                        <div className="tag-container">
                          {item.tags.map(tag => (
                            <span key={tag} className="tag tag-blue">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <StatusIcon status={item.status} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        </div>

        {/* CTA Banner Section */}
        <section className="cta-banner-section" style={{ marginTop: '5rem' }}>
          <div className="cta-banner-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(52, 211, 153, 0.05) 100%)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.1)', padding: '4rem 2rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#1e293b' }}>Ready to Join the Internship?</h2>
            <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '2.5rem', maxWidth: '30rem', margin: '0 auto 2.5rem' }}>Our limited slots fill up fast. Apply today to secure your position in our upcoming cohort.</p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>Apply Now</button>
          </div>
        </section>
      </div>

      <AnimatePresence>
        <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} courseTitle="Full Stack Development" />
      </AnimatePresence>
    </div>
  );
};

export default Syllabus;
