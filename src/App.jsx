import React, { useState } from 'react'

const skills = [
  { name: 'React', level: 90, color: '#61DAFB' },
  { name: 'JavaScript', level: 85, color: '#F7DF1E' },
  { name: 'Docker', level: 75, color: '#2496ED' },
  { name: 'Node.js', level: 70, color: '#68A063' },
  { name: 'CSS / Tailwind', level: 80, color: '#38BDF8' },
  { name: 'Git / GitHub', level: 88, color: '#F05032' },
]

const projects = [
  {
    title: 'Assignment 02',
    desc: 'Aplicación web con Vite y React, desplegada con pipeline CI/CD.',
    tags: ['React', 'Vite', 'GitHub Actions'],
    color: '#6366f1',
  },
  {
    title: 'Assignment 03',
    desc: 'Proyecto con configuración avanzada de Vite y pruebas automatizadas.',
    tags: ['Vite', 'Testing', 'CI/CD'],
    color: '#8b5cf6',
  },
  {
    title: 'Assignment 04',
    desc: 'Aplicación dockerizada y subida a Docker Hub con pipeline automatizado.',
    tags: ['Docker', 'Docker Hub', 'Doppler'],
    color: '#2496ED',
  },
]

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  const styles = {
    root: {
      fontFamily: "'Inter', sans-serif",
      background: '#0f0f1a',
      color: '#e2e8f0',
      minHeight: '100vh',
      margin: 0,
    },
    nav: {
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(15,15,26,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 3rem',
      boxSizing: 'border-box',
    },
    logo: {
      fontSize: '1.4rem',
      fontWeight: 900,
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      cursor: 'pointer',
      color: '#94a3b8',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'color 0.2s',
    },
    hero: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '6rem 2rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    },
    heroBg: {
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem',
      marginBottom: '1.5rem',
      boxShadow: '0 0 40px rgba(99,102,241,0.4)',
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
      fontWeight: 900,
      margin: '0 0 0.5rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      lineHeight: 1.1,
    },
    heroSub: {
      fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
      color: '#a855f7',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    heroDesc: {
      maxWidth: '500px',
      color: '#94a3b8',
      lineHeight: 1.7,
      marginBottom: '2rem',
    },
    btnGroup: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    btnPrimary: {
      padding: '0.75rem 2rem',
      borderRadius: '50px',
      border: 'none',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      color: '#fff',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '0.95rem',
      boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
    },
    btnOutline: {
      padding: '0.75rem 2rem',
      borderRadius: '50px',
      border: '1px solid rgba(99,102,241,0.5)',
      background: 'transparent',
      color: '#a5b4fc',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '0.95rem',
    },
    section: {
      padding: '5rem 2rem',
      maxWidth: '900px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: 800,
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #ffffff, #a5b4fc)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    sectionLine: {
      width: '60px',
      height: '4px',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      borderRadius: '2px',
      marginBottom: '3rem',
    },
    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1.2rem',
    },
    skillCard: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '1.2rem 1.5rem',
    },
    skillHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.6rem',
      fontSize: '0.9rem',
      fontWeight: 600,
    },
    skillBar: {
      height: '6px',
      background: 'rgba(255,255,255,0.08)',
      borderRadius: '3px',
      overflow: 'hidden',
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1.5rem',
    },
    projectCard: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '1.8rem',
      transition: 'transform 0.2s, border-color 0.2s',
      cursor: 'default',
    },
    projectTitle: {
      fontSize: '1.1rem',
      fontWeight: 700,
      marginBottom: '0.6rem',
    },
    projectDesc: {
      color: '#94a3b8',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      marginBottom: '1rem',
    },
    tagsRow: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    tag: {
      padding: '0.25rem 0.75rem',
      borderRadius: '50px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: 'rgba(99,102,241,0.15)',
      color: '#a5b4fc',
      border: '1px solid rgba(99,102,241,0.3)',
    },
    contactBox: {
      background: 'rgba(99,102,241,0.08)',
      border: '1px solid rgba(99,102,241,0.25)',
      borderRadius: '20px',
      padding: '3rem',
      textAlign: 'center',
    },
    footer: {
      textAlign: 'center',
      padding: '2rem',
      color: '#475569',
      fontSize: '0.85rem',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    },
  }

  return (
    <div style={styles.root}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>JE.</div>
        <ul style={styles.navLinks}>
          {['Inicio', 'Skills', 'Proyectos', 'Contacto'].map(item => (
            <li key={item} style={styles.navLink}>{item}</li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.avatar}>👨‍💻</div>
        <h1 style={styles.heroTitle}>Javier Estrada Assignment 04 - Version 3</h1>
        <p style={styles.heroSub}>Full Stack Developer & DevOps Enthusiast</p>
        <p style={styles.heroDesc}>
          Apasionado por construir aplicaciones modernas, pipelines CI/CD y
          soluciones en la nube. Estudiante de Arquitectura de Software.
        </p>
        <div style={styles.btnGroup}>
          <button style={styles.btnPrimary}>Ver Proyectos</button>
          <button style={styles.btnOutline}>Contactar</button>
        </div>
      </section>

      {/* SKILLS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills</h2>
        <div style={styles.sectionLine} />
        <div style={styles.skillsGrid}>
          {skills.map(skill => (
            <div key={skill.name} style={styles.skillCard}>
              <div style={styles.skillHeader}>
                <span>{skill.name}</span>
                <span style={{ color: skill.color }}>{skill.level}%</span>
              </div>
              <div style={styles.skillBar}>
                <div style={{
                  height: '100%',
                  width: `${skill.level}%`,
                  background: skill.color,
                  borderRadius: '3px',
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ ...styles.section, background: 'rgba(255,255,255,0.01)' }}>
        <h2 style={styles.sectionTitle}>Proyectos</h2>
        <div style={styles.sectionLine} />
        <div style={styles.projectsGrid}>
          {projects.map(p => (
            <div key={p.title} style={{ ...styles.projectCard, borderTop: `3px solid ${p.color}` }}>
              <h3 style={{ ...styles.projectTitle, color: p.color }}>{p.title}</h3>
              <p style={styles.projectDesc}>{p.desc}</p>
              <div style={styles.tagsRow}>
                {p.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Contacto</h2>
        <div style={styles.sectionLine} />
        <div style={styles.contactBox}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>
            ¿Tienes un proyecto en mente?
          </p>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
            Estoy disponible para colaborar en proyectos interesantes.
          </p>
          <a href="https://github.com/JavEstrada09" style={{
            ...styles.btnPrimary,
            display: 'inline-block',
            textDecoration: 'none',
            padding: '0.75rem 2rem',
          }}>
            GitHub → JavEstrada09
          </a>
        </div>
      </section>

      <footer style={styles.footer}>
        © 2026 Javier Estrada · Hecho con React + Vite · Dockerizado 🐳
      </footer>
    </div>
  )
}