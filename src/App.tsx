import { useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import {
  ArrowDownToLine, ArrowRight, Box, Code2, Github, Mail,
  Send, Sparkles, UserRound, X, ExternalLink, Linkedin,
} from 'lucide-react'
import { siteContent } from './content'
import { ParticleField } from './components/ParticleField'

type Message = { id: number; role: 'assistant' | 'user'; text: string }
type Feature = 'about' | 'projects' | 'skills' | 'contact' | 'hobbies'

const featureQuestions: Record<Feature, string> = {
  about: 'What should I know about you?',
  projects: 'Show me your projects.',
  skills: 'Which skills and technologies do I use?',
  contact: 'How can I get in touch with you?',
  hobbies: 'What do I enjoy outside coding?',
}

function renderLinkedText(text: string) {
  const pattern = /(https?:\/\/[^\s·]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g
  return text.split(pattern).map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      const cleanUrl = part.replace(/[),.!]+$/, '')
      const trailing = part.slice(cleanUrl.length)
      return <span key={`${part}-${index}`}><a href={cleanUrl} target="_blank" rel="noreferrer">{cleanUrl.replace(/^https?:\/\//, '')}</a>{trailing}</span>
    }
    if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part)) {
      return <a key={`${part}-${index}`} href={`mailto:${part}`}>{part}</a>
    }
    return part
  })
}

function answerFor(input: string): string {
  const normalized = input.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ')
  const words = normalized.split(/\s+/).filter(Boolean)
  let best: { score: number; answer: string } | undefined

  for (const item of siteContent.chatbot.answers) {
    const score = item.keywords.reduce((sum, keyword) => {
      const key = keyword.toLowerCase()
      return sum + (normalized.includes(key) ? (key.includes(' ') ? 2 : words.includes(key) ? 2 : 1) : 0)
    }, 0)
    if (score > 0 && (!best || score > best.score)) best = { score, answer: item.answer }
  }

  return best?.answer ?? siteContent.chatbot.fallback
}

function MagneticLink({
  href,
  children,
  icon,
  variant = 'primary',
  download,
  target = '_blank',
  rel = 'noreferrer',   
}: {
  href: string
  children: ReactNode
  icon: 'github' | 'download' | 'arrow'
  variant?: 'primary' | 'ghost' | 'outline'
  download?: string | boolean
  target?: string
  rel?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    element.style.setProperty('--magnetic-x', `${x * 0.12}px`)
    element.style.setProperty('--magnetic-y', `${y * 0.12}px`)
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--magnetic-x', '0px')
    ref.current?.style.setProperty('--magnetic-y', '0px')
  }
  const Icon = icon === 'github' ? Github : icon === 'download' ? ArrowDownToLine : ArrowRight

  return (
    <a
      ref={ref}
      className={`magnetic-button magnetic-button--${variant}`}
      href={href}
      download={download}
      target={target}
      rel={rel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {variant === 'outline' ? (
        <span className="button-surface"><span className="button-sl" /><Icon size={16} aria-hidden="true" /><span className="button-label">{children}</span></span>
      ) : <><Icon size={18} aria-hidden="true" /><span>{children}</span></>}
    </a>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', text: siteContent.chatbot.greeting },
  ])
  const [typing, setTyping] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState<Feature | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const messageId = useRef(2)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, typing, chatOpen, activeFeature])

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }, [])

  function sendMessage(text = query, feature: Feature | null = null) {
    const clean = text.trim()
    if (!clean || typing) return
    setActiveFeature(feature)
    setMessages((current) => [...current, { id: messageId.current++, role: 'user', text: clean }])
    setQuery('')
    setTyping(true)
    setChatOpen(true)
    timerRef.current = window.setTimeout(() => {
      setMessages((current) => [...current, {
        id: messageId.current++,
        role: 'assistant',
        text: answerFor(clean),
      }])
      setTyping(false)
    }, 720)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendMessage()
  }

  function openFeature(feature: Feature) {
    setActiveFeature(feature)
    setChatOpen(true)
    if (feature === 'projects') setProjectsOpen(true)
    if (feature === 'skills') setSkillsOpen(true)
    if (feature === 'about' || feature === 'contact' || feature === 'hobbies') setInfoOpen(feature)
    sendMessage(featureQuestions[feature], feature)
    if (feature !== 'projects') inputRef.current?.focus({ preventScroll: true })
  }

  function resetChat() {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setTyping(false)
    setActiveFeature(null)
    setMessages([{ id: messageId.current++, role: 'assistant', text: siteContent.chatbot.greeting }])
  }

  return (
    <main className="site" id="home">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="star-field" aria-hidden="true" />
      <ParticleField />

      <header className="topbar" aria-label="Portfolio controls">
        <a className="brand" href="#home" aria-label={`${siteContent.name} home`}><span>K</span><b>R</b></a>
        <div className="top-actions">
          <MagneticLink href={siteContent.resumeUrl} icon="download" variant="outline">Resume</MagneticLink>
          <MagneticLink href={siteContent.github} icon="github" variant="outline">GitHub</MagneticLink>
        </div>
      </header>


      <aside className="side-note side-note-left" aria-hidden="true">
        {siteContent.philosophy.map((word) => <span key={word}>{word}</span>)}<i />
      </aside>
      <aside className="side-note side-note-right" aria-hidden="true"><span>IDEAS</span><span>CODE</span><span>AI</span><span>REAL WORLD</span><i /></aside>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" />{siteContent.eyebrow}</div>
          <p className="hero-intro">Hey, I’m</p>
          <h1>{siteContent.headlineLead} <span>{siteContent.headlineAccent}</span></h1>
          <p className="hero-tagline">{siteContent.tagline}<br />{siteContent.taglineSecondLine}</p>

          <div className={`chat-area${chatOpen ? ' chat-area--open' : ''}`}>
            {chatOpen && (
              <section className="chat-panel" role="region" aria-label="Portfolio assistant conversation">
                <div className="chat-panel-head">
                  <div className="bot-avatar"><Sparkles size={17} /></div>
                  <div><strong>Kenny’s portfolio assistant</strong><span><i className="live-dot" /> LOCAL · RULE-BASED</span></div>
                  <button className="icon-button close-chat" onClick={() => { setChatOpen(false); setActiveFeature(null) }} aria-label="Close chat"><X size={18} /></button>
                </div>
                <div className="messages" aria-live="polite">
                  {messages.map((message) => (
                    <div key={message.id} className={`message ${message.role}`}>
                      <span>{renderLinkedText(message.text)}</span>
                      {message.role === 'assistant' && <small>PORTFOLIO SYSTEM</small>}
                    </div>
                  ))}
                  {typing && <div className="message assistant typing-message"><span className="typing-dots" aria-label="Typing"><i /><i /><i /></span><small>COMPOSING RESPONSE</small></div>}
                  <div ref={messageEndRef} />
                </div>
                <div className="chat-panel-foot"><button onClick={resetChat}>Reset</button></div>
              </section>
            )}

            <form className="chat-input" onSubmit={handleSubmit}>
              <Sparkles className="sparkle" size={22} fill="currentColor" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setChatOpen(true)}
                placeholder="Ask me about my projects, skills, tech stack..."
                aria-label="Ask the portfolio assistant"
              />
              <button className="send-button" type="submit" aria-label="Send message" disabled={!query.trim() || typing}><Send size={19} /></button>
            </form>
            <div className="prompt-carousel">
              <div className="quick-prompts">
                {siteContent.chatbot.quickPrompts.map((prompt) => (
                  <button key={prompt} className="prompt-chip" onClick={() => sendMessage(prompt)} disabled={typing}>{prompt}<ArrowRight size={15} /></button>
                ))}
              </div>
              <p className="swipe-hint prompt-swipe-hint" aria-hidden="true"><span /> SWIPE FOR MORE <span /></p>
            </div>
          </div>
        </div>
      </section>

      <section className="dot-section">•</section>

      <div className="feature-carousel">
      <section className="feature-grid" aria-label="Explore the portfolio">
        <button className="feature-card" onClick={() => openFeature('about')}>
          <UserRound className="feature-icon" size={31} strokeWidth={1.8} /><span className="feature-arrow"><ArrowRight size={16} /></span>
          <h2>About Me</h2><p>My background, interests<br />and what I do</p><div className="card-index"><span>01</span><i /></div>
        </button>
        <button className="feature-card" onClick={() => openFeature('projects')}>
          <Box className="feature-icon" size={33} strokeWidth={1.8} /><span className="feature-arrow"><ArrowRight size={16} /></span>
          <h2>Projects</h2><p>What I’ve built with AI<br />and full-stack tools</p><div className="card-index"><span>02</span><i /></div>
        </button>
        <button className="feature-card" onClick={() => openFeature('skills')}>
          <Code2 className="feature-icon" size={34} strokeWidth={1.8} /><span className="feature-arrow"><ArrowRight size={16} /></span>
          <h2>Skills</h2><p>The technologies and tools<br />I work with</p><div className="card-index"><span>03</span><i /></div>
        </button>
        <button className="feature-card" onClick={() => openFeature('hobbies')}>
          <Sparkles className="feature-icon" size={32} strokeWidth={1.8} /><span className="feature-arrow"><ArrowRight size={16} /></span>
          <h2>Hobbies</h2><p>What I do for fun<br />and what I find useful together</p><div className="card-index"><span>04</span><i /></div>
        </button>
        <button className="feature-card" onClick={() => openFeature('contact')}>
          <Mail className="feature-icon" size={32} strokeWidth={1.8} /><span className="feature-arrow"><ArrowRight size={16} /></span>
          <h2>Contact</h2><p>Let’s make something<br />useful together</p><div className="card-index"><span>05</span><i /></div>
        </button>
      </section>
        <p className="swipe-hint feature-swipe-hint" aria-hidden="true"><span /> SWIPE FOR MORE <span /></p>
      </div>

      <footer className="site-footer" aria-label="Portfolio footer">
        <div className="footer-brand"><a className="brand" href="#home" aria-label="Back to top"><span>K</span><b>R</b></a></div>
        <div className="footer-copy">
          <strong>Built with curiosity. Shipped with intent.</strong>
          <span>BUILD · LEARN · IMPROVE · REPEAT</span>
        </div>
        <nav className="footer-links" aria-label="Contact links">
          <a href={siteContent.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
          <a href={siteContent.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
          <a href={`mailto:${siteContent.email}`}><Mail size={15} /> Email</a>
        </nav>
        <p className="footer-copyright">© 2026 Kenny Richardson. Made to be useful.</p>
      </footer>

      {infoOpen && (
        <div className="projects-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setInfoOpen(null)
        }}>
          <section className="projects-modal info-modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
            <div className="projects-modal-head">
              <div>
                <span className="modal-kicker">PORTFOLIO / {infoOpen.toUpperCase()}</span>
                <h2 id="info-modal-title">{infoOpen === 'about' ? 'A little about me' : infoOpen === 'contact' ? 'Let’s connect' : 'Outside the code'}<span>.</span></h2>
              </div>
              <button className="icon-button modal-close" onClick={() => setInfoOpen(null)} aria-label="Close popup"><X size={20} /></button>
            </div>
            {infoOpen === 'about' && <p className="info-modal-copy">{siteContent.intro} I’m open to opportunities, collaborations, and building useful products with other developers.</p>}
            {infoOpen === 'hobbies' && <p className="info-modal-copy">Outside coding, I enjoy anime, Marvel and DC comics, great storytelling, exploring AI tools, and turning new ideas into projects.</p>}
            {infoOpen === 'contact' && <div className="info-contact-links">
              <a href={siteContent.github} target="_blank" rel="noreferrer"><Github size={18} /><span><strong>GitHub</strong><small>Explore my projects and code</small></span><ExternalLink size={15} /></a>
              <a href={siteContent.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /><span><strong>LinkedIn</strong><small>Connect professionally</small></span><ExternalLink size={15} /></a>
              <a href={`mailto:${siteContent.email}`}><Mail size={18} /><span><strong>Email</strong><small>{siteContent.email}</small></span><ExternalLink size={15} /></a>
            </div>}
          </section>
        </div>
      )}

      {projectsOpen && (
        <div className="projects-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setProjectsOpen(false)
        }}>
          <section className="projects-modal" role="dialog" aria-modal="true" aria-labelledby="projects-modal-title">
            <div className="projects-modal-head">
              <div>
                <span className="modal-kicker">PROJECT INDEX / SELECTED WORK</span>
                <h2 id="projects-modal-title">Things I’m building<span>.</span></h2>
              </div>
              <button className="icon-button modal-close" onClick={() => setProjectsOpen(false)} aria-label="Close projects"><X size={20} /></button>
            </div>
            <div className="modal-project-grid">
              {siteContent.projects.map((project, index) => (
                <article className="chat-project-card" key={`${project.name}-${index}`}>
                  <div className="project-topline"><span>0{index + 1} / SELECTED WORK</span><Box size={17} /></div>
                  <h3>{project.name}</h3>
                  <p className="project-category">{project.category}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="stack-list">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  <div className="project-card-bottom project-card-links">
                    <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} source on GitHub`}><Github size={15} /><span>GitHub</span></a>
                    {'live' in project && project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live deployment`}><ExternalLink size={15} /><span>Live demo</span></a>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {skillsOpen && (
        <div className="projects-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSkillsOpen(false)
        }}>
          <section className="projects-modal skills-modal" role="dialog" aria-modal="true" aria-labelledby="skills-modal-title">
            <div className="projects-modal-head">
              <div>
                <span className="modal-kicker">SKILLS INDEX / TOOLS & TECHNOLOGIES</span>
                <h2 id="skills-modal-title">What I work with<span>.</span></h2>
              </div>
              <button className="icon-button modal-close" onClick={() => setSkillsOpen(false)} aria-label="Close skills"><X size={20} /></button>
            </div>
            <div className="skills-modal-grid">
              {siteContent.skills.map((group, index) => (
                <article className="skill-modal-card" key={group.category}>
                  <div className="project-topline"><span>0{index + 1} / TOOLKIT</span><Code2 size={17} /></div>
                  <h3>{group.category}</h3>
                  <div className="skill-tags">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

    </main>
  )
}
