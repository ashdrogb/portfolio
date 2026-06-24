import { useState, useEffect, useRef } from "react";
import "./App.css";

// ── DATA ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Projects", "Skills", "Experience", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Streak Watch",
    subtitle: "Football Form Tracker",
    description:
      "Real-time win/draw/loss streak scanner across Europe's top 10 divisions. Aggregates live data from multiple APIs, normalises across providers, and surfaces form patterns across the continent.",
    metrics: ["10 leagues tracked", "3 API providers", "Flask + React/Vite"],
    tags: ["Python", "Flask", "React", "REST APIs", "Data Aggregation"],
    live: "https://streak-watch-5.onrender.com/",
    github: "https://github.com/ashdrogb",
    accent: "#2563EB",
  },
  {
    id: 2,
    title: "PITCH",
    subtitle: "Football Analysis Dashboard",
    description:
      "Live World Cup 2026 data platform with fixtures, group tables, knockout brackets, top-scorer leaderboards, and per-team goal analytics — all pulling from live sources.",
    metrics: ["48 teams tracked", "Live match data", "Full tournament coverage"],
    tags: ["Python", "Flask", "JavaScript", "Data Visualisation", "Live APIs"],
    live: "https://football-site-po5l.onrender.com/",
    github: "https://github.com/ashdrogb",
    accent: "#2563EB",
  },
  {
    id: 3,
    title: "RAG Chatbot",
    subtitle: "Retrieval-Augmented Generation",
    description:
      "Conversational AI assistant built on a RAG architecture — documents are chunked, embedded into a vector store (Qdrant), and retrieved at query time to ground LLM responses in source material. Supports multi-turn dialogue via LangGraph.",
    metrics: ["Qdrant vector store", "LangGraph orchestration", "FastAPI backend"],
    tags: ["Python", "LangGraph", "Qdrant", "LLMs", "RAG", "FastAPI", "NLP"],
    live: null,
    github: "https://github.com/ashdrogb",
    accent: "#2563EB",
  },
];

const SKILLS = [
  {
    category: "ML & Modelling",
    items: ["Scikit-Learn", "XGBoost", "TensorFlow", "Time Series (ARIMA, Prophet, LSTM)", "Marketing Mix Modelling", "Recommendation Systems", "A/B Testing", "Hypothesis Testing"],
  },
  {
    category: "GenAI & NLP",
    items: ["LLMs", "RAG", "LangGraph", "Qdrant", "NLP", "FastAPI"],
  },
  {
    category: "Data & Analytics",
    items: ["Python", "PySpark", "SQL", "Pandas", "NumPy", "Power BI", "Tableau", "Customer Analytics"],
  },
  {
    category: "Cloud & Engineering",
    items: ["Azure Databricks", "AWS (S3, EC2)", "Docker", "CI/CD", "Git", "REST APIs", "MLOps"],
  },
  {
    category: "Web & Projects",
    items: ["Flask", "React", "Vite", "JavaScript", "TypeScript"],
  },
];

const EXPERIENCE = [
  {
    year: "Mar 2026 – Jun 2026",
    role: "Senior Analytics Consultant",
    org: "Quantzig · Bangalore",
    points: [
      "Improved Conversion Rate Forecasting within a sales decomposition model, reducing MAPE from 11% to 8% via advanced feature engineering and model optimisation.",
    ],
  },
  {
    year: "Jul 2024 – Feb 2026",
    role: "Assistant Manager, Analytics",
    org: "RPSG Ventures · Kolkata",
    points: [
      "Led development of a Marketing Mix Model (MMM) to forecast bill volumes and optimise marketing spend across 4 categories, delivering ₹7 Cr revenue uplift.",
      "Designed a personalised Recommendation System using collaborative filtering, improving customer retention by 30%.",
      "Improved SKU-level sales forecasts for products contributing to 45% of revenue, resulting in ₹2 Cr annual savings.",
    ],
  },
  {
    year: "May 2024 – Jul 2024",
    role: "Research Assistant",
    org: "IIM Calcutta · Kolkata",
    points: [
      "Reconstructed match order book and limit order book with 97% accuracy from market data using PySpark.",
      "Back-tested momentum trading strategies across multiple time horizons, evaluating VaR and Sharpe ratios.",
    ],
  },
  {
    year: "Nov 2022 – May 2024",
    role: "Data Scientist",
    org: "ReNew Power · Gurugram",
    points: [
      "Improved electricity price prediction accuracy by 2% using XGBoost regression with GridSearchCV.",
      "Delivered ₹5 Cr incremental revenue through algorithmic trading strategies on the Indian Energy Exchange.",
    ],
  },
  {
    year: "Aug 2017 – Oct 2019",
    role: "Senior Analyst → Automation Engineer",
    org: "Capgemini / FourNxt Solutions",
    points: [
      "Designed RPA bots using Blue Prism and Automation Anywhere to automate Oracle ERP workflows, processing 1,800+ records per day at Capgemini.",
      "Streamlined operations at FourNxt through RPA, reducing effort by 200 man-hours/week and cutting processing errors by 40%.",
    ],
  },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function DotGrid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cols = 20;
    const rows = 8;
    const gap = 28;
    canvas.width = cols * gap;
    canvas.height = rows * gap;

    let frame;
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dist = Math.sqrt(Math.pow(c - cols / 2, 2) + Math.pow(r - rows / 2, 2));
          const alpha = 0.08 + 0.18 * Math.abs(Math.sin(t * 0.04 - dist * 0.4));
          ctx.beginPath();
          ctx.arc(c * gap + gap / 2, r * gap + gap / 2, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37,99,235,${alpha})`;
          ctx.fill();
        }
      }
      t++;
      frame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} className="dot-grid" aria-hidden="true" />;
}

function NavBar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <span className="nav-logo" onClick={() => scrollTo("about")}>
        AA<span className="dot">.</span>
      </span>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <button
              className={`nav-link ${active === l.toLowerCase() ? "active" : ""}`}
              onClick={() => scrollTo(l.toLowerCase())}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>
      <button className="hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-content fade-up">
        <p className="eyebrow">Data Scientist · ML Engineer · 6+ Years</p>
        <h1 className="hero-name">
          Ashwin Anil<span className="dot">.</span>
        </h1>
        <p className="hero-bio">
        Analytics graduate and electronics engineer with 6+ years building ML systems across FMCG, energy, and supply chain. My work includes having built Marketing Mix Models that drove ₹7 Cr in revenue, designed recommendation engines that moved retention by 30% and trading strategies that have raised revenue by ₹5 Cr. I care about models that work in production, not just in notebooks.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            See my work
          </a>
          <a href="https://github.com/ashdrogb" target="_blank" rel="noreferrer" className="btn-ghost">
            GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-header">
        <div>
          <p className="project-eyebrow">{project.subtitle}</p>
          <h3 className="project-title">{project.title}</h3>
        </div>
        <div className="project-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="link-icon" title="Live site">
              ↗
            </a>
          )}
          <a href={project.github} target="_blank" rel="noreferrer" className="link-icon" title="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </div>
      <p className="project-desc">{project.description}</p>
      <ul className="project-metrics">
        {project.metrics.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <div className="project-tags">
        {project.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <span className="section-label">Work</span>
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="section-header">
        <span className="section-label">Stack</span>
        <h2 className="section-title">Skills</h2>
      </div>
      <div className="skills-grid">
        {SKILLS.map((group) => (
          <div key={group.category} className="skill-group">
            <p className="skill-category">{group.category}</p>
            <div className="skill-items">
              {group.items.map((item) => (
                <span key={item} className="skill-pill">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-header">
        <span className="section-label">Background</span>
        <h2 className="section-title">Experience</h2>
      </div>
      <div className="timeline">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-meta">
              <span className="timeline-year">{e.year}</span>
              <span className="timeline-role">{e.role}</span>
              <span className="timeline-org">{e.org}</span>
            </div>
            <ul className="timeline-points">
              {e.points.map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="resume-cta">
        <p className="resume-note">Full résumé available on request.</p>
        <a href="mailto:ashwinanil2711@gmail.com" className="btn-primary">Request CV</a>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="section-header">
        <span className="section-label">Get in touch</span>
        <h2 className="section-title">Contact</h2>
      </div>
      <div className="contact-layout">
        <div className="contact-intro">
          <p>
            Open to Senior Data Scientist and ML Engineer roles. PGDBA from IIM Calcutta, 6+ years across energy, FMCG, and supply chain. If you're working on something interesting — reach out.
          </p>
          <a href="mailto:ashwinanil2711@gmail.com" className="contact-link" style={{display:'block', marginBottom:'0.5rem'}}>
            ashwinanil2711@gmail.com →
          </a>
          <a href="https://linkedin.com/in/ashwin-anil-026785b6" target="_blank" rel="noreferrer" className="contact-link" style={{display:'block', marginBottom:'0.5rem'}}>
            LinkedIn →
          </a>
          <a href="https://github.com/ashdrogb" target="_blank" rel="noreferrer" className="contact-link">
            GitHub →
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Jane Smith" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@company.com" />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} required placeholder="Tell me about the role or project..." />
          </div>
          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "sent" && <p className="form-success">Message sent — I'll get back to you soon.</p>}
          {status === "error" && <p className="form-error">Something went wrong. Try emailing directly.</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>Ashwin Anil · {new Date().getFullYear()}</span>
      <span className="footer-links">
        <a href="https://linkedin.com/in/ashwin-anil-026785b6" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/ashdrogb" target="_blank" rel="noreferrer">GitHub</a>
      </span>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.toLowerCase())).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <NavBar active={active} />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
