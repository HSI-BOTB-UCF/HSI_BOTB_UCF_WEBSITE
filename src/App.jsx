'use client'

import { useEffect, useRef, useState } from 'react'

const members = [
  { 
    name: 'Miguel Angel Hurtado Gomez',
    role: 'Programmer/Engineer · Aerospace Engineering',
    initials: 'MH',
    track: 'Programmer/Engineer',
    bio: 'Short Description.'
  },
  { 
    name: 'Javier A. Cuevas Chabrier',
    role: 'Programmer/Engineer · Mechanical Engineering & Computer Science',
    initials: 'JC',
    track: 'Programmer/Engineer',
    bio: 'Hello everyone! I am excited to compete at HSI Battle of the Brains for the 2026 academic year! I currently work with propulsion systems and the Propulsion and Energy Research Lab under the Axial Stage Combustion Chamber project. I like to code in python and do projects with friends. My most recent projects are a solid propellant rocket motor where I use sorbitol and potassium nitrate to make rocket fuel and a BAJA buggy made from a go-kart frame and engine. I hope to speak to you soon!' },
  { 
    name: 'Alejandro Valdez',
    role: 'Programmer/Engineer · Aerospace Engineering',
    initials: 'AV',
    track: 'Programmer/Engineer',
    bio: 'Hello folks, my name is Alejandro Valdez and I\'m a second year Aerospace Engineering student from Mexico. In my free time you\'ll find me outdoors, playing lacrosse, or building engineering projects like rockets. I\'m working toward a career as an engineer in the space industry, and I also hope to be an activist for environmental conservation along the way. Thanks!' },
  { 
    name: 'David Navarrete',
    role: 'Programmer/Engineer · Computer Science ',
    initials: 'DN',
    track: 'Programmer/Engineer',
    bio: 'Short Description.'
  },
  { 
    name: 'Anjanette Diaz',
    role: 'Role · Integrated Business',
    initials: 'AD',
    track: 'Marketing',
    bio: 'Short Description.'
  },
  { 
    name: 'Sebastian Cardenas',
    role: 'Role · Emerging Media',
    initials: 'SC',
    track: 'Videographer',
    bio: 'Short Description.'
  },
  { 
    name: 'Diogo Ortiz',
    role: 'Role · Integrated Business',
    initials: 'DO',
    track: 'Finance',
    bio: 'Short Description.'
  },
  { 
    name: 'Benjamin C. Challco Acosta',
    role: 'Graduate Advisor · Master of Science in Business Analytics',
    initials: 'BC',
    track: 'value',
    bio: 'Hey everyone! I\'m grateful for the opportunity to serve as a Graduate Advisor for such a talented HSI Battle of the Brains team. One of my biggest passions is developing others, giving back to my community, and helping the people around me grow. I have a strong background in marketing & sales and have developed much of my professional experience in the insurance industry, where I\'ve learned the importance of relationship-building, resilience, and understanding clients\' needs. My long-term goal is to become an agency owner, build and develop a high-performing team, and create a lasting impact on the clients and communities I serve.' },
  { 
    name: 'Adrianna N. Marquez',
    role: 'Graduate Advisor · Master of Science in Management - Integrated Business Track',
    initials: 'AM',
    track: 'value',
    bio: 'Hello! I\'m Adrianna. I come from a military background so my family heritage is pretty scattered, but my latin side is Colombian and Argentinian. Aside from being a student, I am an ambassador of the UCF Office of Military and Veteran Student Success at the downtown campus where I support the hundreds of student veterans and family members through counseling and career readiness resources. I was inspired to join the UCF HSI battle of the brains team by all of the support that I\'ve seen poured into it. The faculty and staff at UCF do so much for every community, so I hope we can reap the benefits of that support by going far in a meaningful competition. I earned my undergraduate degree in Information Technology, so I\'m hoping to pair that with my business graduate degree and become an IT project manager. Go Knights!'
  },
  { 
    name: 'David Penn',
    role: 'Faculty Advisor · Major',
    initials: 'DP',
    track: 'value',
    bio: 'Short Description.'
  }
]

const photos = [
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85', alt: 'Equipo colaborando alrededor de una mesa', size: 'large' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85', alt: 'Estudiante tomando notas', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85', alt: 'Estudiantes conversando', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85', alt: 'Estudiantes en un aula', size: 'square' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85', alt: 'Estudiante tomando notas', size: 'tall' },
]

const appIcons = [
  { name: 'UCF LOGO', src: '' },
  { name: 'HSI LOGO', src: '' },
  { name: 'Maybe Solution LOGO?', src: '' },
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
  ['Programmer/Engineer', 'Programmer/Engineer'],
  ['Marketing', 'Marketing'],
  ['Videographer', 'Videographer'],
  ['Finance', 'Finance'],
]

const reelColumns = [
  { icons: appIcons, direction: 'down' },
  { icons: appIcons.slice(4), direction: 'up' },
  { icons: appIcons, direction: 'down' },
  { icons: appIcons.slice(4), direction: 'up' },
]

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
          <div className="nav-links"><a href="#project">Solutions</a><a href="#equipo">Team</a></div>
        </nav>

        <section className="hero" id="home">
          <div className="hero-reel-wrap">
            <section className="icon-marquee" aria-label="Team Projects">
              {reelColumns.map((column, index) => <ReelColumn key={`reel-${index}`} {...column} />)}
            </section>
          </div>
          <div className="hero-copy" style={{ opacity: 1 - heroFade, transform: `translateY(${heroFade * -24}px)` }}>
            <h1>
              UCF<br />
              <em>HSI BATTLE OF THE BRAINS TEAM</em>
            </h1>
            <a className="hero-project-button" href="#project">View Solutions <span>↗</span></a>
            <a className="hero-project-button" href="#equipo">View Team <span>↗</span></a>

          </div>
        </section>

        <section className="intro-grid section-pad" id="project">
          <div className="section-label">01 / LA IDEA</div>
          <div className='section-project'>
            <div>
              <p className="display-copy">Current <span className="gold-text">Solution</span></p>
              <p className="body-copy">HSI Battle of Brains portfolio where knowledge meets competition.</p>
              <a className="hero-project-button" href="#projects">More Solutions <span>↗</span></a>
            </div>
            <img className="section-app-icon" src={appIcons[Math.floor(Math.random() * appIcons.length)].src} alt="Project icon" draggable={false} />
          </div>

        </section>

        {/*Old section that might look cool with some changes.*/}
        {/*<section className="stats-band">*/}
        {/*  <div>*/}
        {/*    <strong>08</strong>*/}
        {/*    <span>TEAM MEMBERS</span>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <strong>04</strong>*/}
        {/*    <span>DISCIPLINES</span>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <strong>##</strong>*/}
        {/*    <span>COMPLETED PROJECTS</span>*/}
        {/*  </div>*/}
        {/*/!*</section>*!/*/}

        <section className="section-pad team-section" id="equipo">
          <div className="section-heading"><div><div className="section-label">02 / EL EQUIPO</div><h2>Meet <em>the Current Team.</em></h2></div></div>
          <div className="filter-row" role="group" aria-label="Filtrar equipo">{filterOptions.map(([value, label], index) => <button key={`${value}-${index}`} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}</button>)}</div>
          <div className="members-grid">
            {filtered.map((member, index) =>
              <article className="member-card" key={member.name}>
                <div className="member-number">0{index + 1}</div>
                <div className="avatar">{member.initials}</div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
                <span className="card-arrow">↗</span>
              </article>)}</div>
        </section>

        <section className="photo-section section-pad">
          <div className="section-label">03 / GALERIA</div>
          <div className="photo-grid">
            {photos.map((photo) =>
                <div className={`photo-card ${photo.size}`} key={photo.src}>
                  <img src={photo.src} alt={photo.alt} />
                </div>)}
          </div>
        </section>

        <footer id="footer">
          <div className="footer-kicker"></div>
          <h2>UCF<br /><em>BATTLE OF THE BRAINS TEAM.</em></h2>
          <div className="footer-bottom">
            <span>UCF HSI BATTLE OF THE BRAINS TEAM</span>
            <a href="#home">Volver arriba ↑</a>
          </div>
        </footer>

      </main>
  )
}
