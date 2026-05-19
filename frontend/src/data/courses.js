import fullstackImg from '../assets/fullstack_new.png';
import genaiImg from '../assets/genai_dark.png';
import marketingImg from '../assets/marketing_new.png';

export const courses = [
  {
    id: 'fullstack',
    title: 'Full stack',
    image: fullstackImg,
    description: 'Master frontend and backend development with modern technologies and real-world projects.',
    roadmap: [
      { month: 'Month 1', title: 'Python Fundamentals', desc: 'Variables, loops, data structures, and OOP basics.' },
      { month: 'Month 2', title: 'Advanced Python & DB', desc: 'Concurrency, decorators, and PostgreSQL/MongoDB integration.' },
      { month: 'Month 3', title: 'Web Frameworks (Django)', desc: 'Building robust APIs and server-side applications.' },
      { month: 'Month 4', title: 'Frontend with React', desc: 'Modern UI development, state management, and hooks.' },
      { month: 'Month 5', title: 'Fullstack Projects', desc: 'Integrating backend and frontend into real-world apps.' },
      { month: 'Month 6', title: 'Deployment & Internship', desc: 'Docker, AWS, and professional industry placement.' }
    ],
    projects: [
      { name: 'E-commerce Platform', desc: 'A full-featured store with payment gateway integration.' },
      { name: 'Social Media Dashboard', desc: 'Real-time analytics and user interaction tools.' }
    ]
  },
  {
    id: 'genai',
    title: 'GenAI & Machine Learning',
    image: genaiImg,
    description: 'Master the IHFC AIML curriculum from data science foundations to advanced Generative AI and real-world Capstone projects.',
    roadmap: [
      { phase: 'Phase 1: Foundation Phase', duration: '8 Weeks • AI Induction & Python', desc: 'Data science foundations, statistical modeling, and advanced Python for AI.', color: 'bg-blue-400' },
      { phase: 'Phase 2: Specialization Phase', duration: '16 Weeks • ML & Deep Learning', desc: 'Supervised/unsupervised learning, neural networks, CNNs, and RNNs.', color: 'bg-orange-400' },
      { phase: 'Phase 3: Capstone Phase', duration: '8 Weeks • Generative AI & LLMs', desc: 'Prompt engineering, RAG systems, fine-tuning, and the final Capstone project.', color: 'bg-green-500' }
    ],
    projects: [
      { name: 'Custom AI Chatbot', desc: 'Trained on private data for specialized support.' },
      { name: 'Content Automation', desc: 'AI-driven blog and marketing copy generator.' }
    ]
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    image: marketingImg,
    description: 'Strategic marketing in the digital age, focusing on growth, SEO, and social media.',
    roadmap: [
      { phase: 'Phase 1: Foundation Phase', duration: '8 Weeks • Branding & SEO Basics', desc: 'Brand building, keyword research, on-page SEO, and marketing fundamentals.', color: 'bg-blue-400' },
      { phase: 'Phase 2: Specialization Phase', duration: '16 Weeks • Master Paid Ads', desc: 'Google Ads (SEM), Meta Ads, email funnels, and performance tracking with GA4.', color: 'bg-orange-400' },
      { phase: 'Phase 3: Capstone Phase', duration: '8 Weeks • Agency Project', desc: 'Social media growth strategy, managing client budgets, and agency internship.', color: 'bg-green-500' }
    ],
    projects: [
      { name: 'Growth Hack Campaign', desc: 'Launching a brand from zero to 10k followers.' },
      { name: 'SEO Audit & Strategy', desc: 'Ranking a local business on page 1.' }
    ]
  }
];
