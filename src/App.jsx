'use client'

import { useEffect, useRef, useState } from 'react'

const members = [
  { name: 'Team Member', role: 'Role · Major', initials: 'N/A', track: 'value', bio: 'Short Description.' },
  { name: 'Team Member', role: 'Role · Major', initials: 'N/A', track: 'value', bio: 'Short Description.' },
  { name: 'Team Member', role: 'Role · Major', initials: 'N/A', track: 'value', bio: 'Short Description.' },
  { name: 'Team Member', role: 'Role · Major', initials: 'N/A', track: 'value', bio: 'Short Description.' },
  { name: 'Team Member', role: 'Role · Major', initials: 'N/A', track: 'value', bio: 'Short Description.' },
  { name: 'Team Member', role: 'Role · Major', initials: 'N/A', track: 'value', bio: 'Short Description.' },
]

const photos = [
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85', alt: 'Equipo colaborando alrededor de una mesa', size: 'large' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85', alt: 'Estudiante tomando notas', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85', alt: 'Estudiantes conversando', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85', alt: 'Estudiantes en un aula', size: 'square' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85', alt: 'Estudiante tomando notas', size: 'tall' },
]

const appIcons = [
  { name: 'GitHub', src: '' },
  { name: 'Slack', src: '' },
  { name: 'Notion', src: '' },
  { name: 'Figma', src: '' },
  { name: 'Spotify', src: '' },
  { name: 'Discord', src: '' },
  { name: 'YouTube', src: '' },
  { name: 'Google Drive', src: '' },
]

function ReelColumn({ icons, direction }) {
  const reelRef = useRef(null)
  const startY = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (event) => {
    reelRef.current?.setPointerCapture(event.pointerId)
    startY.current = event.clientY
    setIsDragging(true)
  }

  const handlePointerMove = (event) => {
    if (!isDragging || !reelRef.current) return
    reelRef.current.style.setProperty('--flick-offset', `${event.clientY - startY.current}px`)
  }

  const stopDragging = () => {
    if (!reelRef.current) return
    setIsDragging(false)
    reelRef.current.style.setProperty('--flick-offset', '0px')
  }

  const reelIcons = [...icons, ...icons, ...icons]
  const className = `marquee-column marquee-${direction}${isDragging ? ' is-dragging' : ''}`

  return (
      <div
          ref={reelRef}
          className={className}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
      >
        {reelIcons.map((icon, index) => (
            <div className="app-tile" key={`${direction}-${icon.name}-${index}`}>
              <img className="app-icon" src={icon.src} alt={`${icon.name} icon`} draggable={false} onDragStart={(event) => event.preventDefault()} />
            </div>
        ))}
      </div>
  )
}

const filterOptions = [
  ['all', 'All'],
  ['value', 'Label'],
  ['value', 'Label'],
  ['value', 'Label'],
  ['value', 'Label'],
]

const reelColumns = [
  { icons: appIcons, direction: 'down' },
  { icons: appIcons.slice(4), direction: 'up' },
  { icons: appIcons, direction: 'down' },
  { icons: appIcons.slice(4), direction: 'up' },
]
export const metadata = {
  title: "My Custom Tab Name",
};

export default function Page() {
  const [filter, setFilter] = useState('all')
  const [heroFade, setHeroFade] = useState(0)

  useEffect(() => {
    const handleScroll = () => setHeroFade(Math.min(window.scrollY / 420, 1))
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filtered = filter === 'all' ? members : members.filter((member) => member.track === filter)

  return (
      <main>
        <nav className="site-nav">
          <a className="brand" href="#home"><span className="brand-mark">H</span><span>UCF HSI BOB</span></a>
          <div className="nav-links"><a href="#solution">Solutions</a><a href="#team">Team</a></div>
        </nav>

        <section className="hero" id="home">
          <div className="hero-reel-wrap">
            <section className="icon-marquee" aria-label="Team Projects">
              {reelColumns.map((column, index) => <ReelColumn key={`reel-${index}`} {...column} />)}
            </section>
          </div>
          <div className="hero-copy" style={{ opacity: 1 - heroFade, transform: `translateY(${heroFade * -24}px)` }}>
            <p className="eyebrow"><span className="status-dot" />UCF · HSI · 2026</p>
            <h1>UCF<br /><em>HSI BATTLE OF BRAINS TEAM.</em></h1>
            <a className="hero-project-button" href="#project">View Solutions <span>↗</span></a>
          </div>
        </section>

        <section className="intro-grid section-pad" id="project">
          <div className="section-label">01 / LA IDEA</div>
          <div className='section-project'>
            <div>
              <p className="display-copy">Current <span className="gold-text">Project</span></p>
              <p className="body-copy">HSI Battle of Brains portfolio—where knowledge meets competition.</p>
            </div>
            <img className="section-app-icon" src={appIcons[Math.floor(Math.random() * appIcons.length)].src} alt="Project icon" draggable={false} />
          </div>

        </section>

        <section className="stats-band"><div><strong>08</strong><span>TEAM MEMBERS</span></div><div><strong>04</strong><span>DISCIPLINES</span></div><div><strong>##</strong><span>COMPLETED PROJECTS</span></div></section>

        <section className="section-pad team-section" id="equipo">
          <div className="section-heading"><div><div className="section-label">02 / EL EQUIPO</div><h2>Meet <em>the Team.</em></h2></div></div>
          <div className="filter-row" role="group" aria-label="Filtrar equipo">{filterOptions.map(([value, label], index) => <button key={`${value}-${index}`} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}</button>)}</div>
          <div className="members-grid">{filtered.map((member, index) => <article className="member-card" key={member.name}><div className="member-number">0{index + 1}</div><div className="avatar">{member.initials}</div><div className="member-info"><h3>{member.name}</h3><p className="member-role">{member.role}</p><p className="member-bio">{member.bio}</p></div><span className="card-arrow">↗</span></article>)}</div>
        </section>

        <section className="photo-section section-pad"><div className="section-label">03 / GALERIA</div><div className="photo-grid">{photos.map((photo) => <div className={`photo-card ${photo.size}`} key={photo.src}><img src={photo.src} alt={photo.alt} /></div>)}</div></section>

        <footer id="footer"><div className="footer-kicker"></div><h2>UCF<br /><em>BATTLE OF BRAINS TEAM.</em></h2><div className="footer-bottom"><span>2026 HSI BATTLE OF BRAINS</span><span>© 2025 · Miguel Angel Hurtado Gomez</span><a href="#home">Volver arriba ↑</a></div></footer>
      </main>
  )
}
