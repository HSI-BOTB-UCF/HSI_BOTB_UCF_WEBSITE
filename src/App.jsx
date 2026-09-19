'use client'

import { useEffect, useRef, useState } from 'react'

const currentSeason = 2026
const placeholderPhoto = '/prof_pics/placeholder.svg'

const homeTeamGroups = [
  { key: 'professor', label: 'Professor' },
  { key: 'gradAdvisor', label: 'Graduate Advisors' },
  { key: 'teamCaptain', label: 'Team Captain' },
  { key: 'member', label: 'Team Members' },
]

const teamMembers = [
  {
    slug: 'miguel-angel-hurtado-gomez',
    year: 2026,
    name: 'Miguel Angel Hurtado Gomez',
    role: 'Programmer/Engineer',
    major: 'B.S. Aerospace Engineering',
    initials: 'MH',
    track: 'Programmer/Engineer',
    memberGroup: 'member',
    photo: '/prof_pics/miguel-angel.png',
    bio: 'Miguel helps turn team concepts into working technical prototypes, with a focus on engineering systems and disciplined build execution.',
    hometown: 'Orlando, FL',
    focus: 'Rapid prototyping, systems thinking, and technical research',
    interests: ['Aerospace design', 'Simulation', 'Hardware builds'],
    socials: { linkedin: 'https://www.linkedin.com/in/miguelangelhurtadogomez/', github: 'https://github.com/mmm1602' }
  },
  {
    slug: 'javier-a-cuevas-chabrier',
    year: 2026,
    name: 'Javier A. Cuevas Chabrier',
    role: 'Programmer/Engineer',
    major: 'B.S. Mechanical Engineering, B.S. Computer Science',
    initials: 'JC',
    track: 'Programmer/Engineer',
    memberGroup: 'teamCaptain',
    photo: '/prof_pics/javier-cuevas.jpeg',
    bio: 'Hello everyone! I am excited to compete at HSI Battle of the Brains for the 2026 academic year! I currently work with propulsion systems and the Propulsion and Energy Research Lab under the Axial Stage Combustion Chamber project. I like to code in python and do projects with friends. My most recent projects are a solid propellant rocket motor where I use sorbitol and potassium nitrate to make rocket fuel and a BAJA buggy made from a go-kart frame and engine. I hope to speak to you soon!',
    hometown: 'Orlando, FL',
    focus: 'Propulsion systems, Python tools, and mechanical product design',
    interests: ['Rocket motors', 'BAJA builds', 'Python projects'],
    socials: { linkedin: 'https://www.linkedin.com/in/javier-cuevas-jacc84/', github: 'https://github.com/Javy-Scratchspace' }
  },
  {
    slug: 'alejandro-valdez',
    year: 2026,
    name: 'Alejandro Valdez',
    role: 'Programmer/Engineer',
    major: 'B.S. Aerospace Engineering',
    initials: 'AV',
    track: 'Programmer/Engineer',
    memberGroup: 'member',
    photo: '/prof_pics/alex-valdez.png',
    bio: 'Hello folks, my name is Alejandro Valdez and I\'m a second year Aerospace Engineering student from Mexico. In my free time you\'ll find me outdoors, playing lacrosse, or building engineering projects like rockets. I\'m working toward a career as an engineer in the space industry, and I also hope to be an activist for environmental conservation along the way. Thanks!',
    hometown: 'Mexico',
    focus: 'Space systems, sustainability, and engineering project execution',
    interests: ['Rocketry', 'Lacrosse', 'Environmental conservation'],
    socials: { linkedin: 'https://www.linkedin.com/in/alejandro-valdez15/', github: 'https://github.com/alexvaldex' }
  },
  {
    slug: 'david-navarrete',
    year: 2026,
    name: 'David Navarrete',
    role: 'Programmer/Engineer',
    major: 'B.S. Computer Science',
    initials: 'DN',
    track: 'Programmer/Engineer',
    memberGroup: 'member',
    photo: '/prof_pics/david-navarette.png',
    bio: 'David supports the software side of the team, helping translate challenge requirements into practical web, data, and product workflows.',
    hometown: 'Orlando, FL',
    focus: 'Software architecture, implementation, and debugging',
    interests: ['Full-stack development', 'Automation', 'Product thinking'],
    socials: { linkedin: 'https://www.linkedin.com/in/david-navarrete-/', github: 'https://github.com/AlphaKnight1701-A' }
  },
  {
    slug: 'anjanette-diaz',
    year: 2026,
    name: 'Anjanette Diaz',
    role: 'Marketing Lead',
    major: 'B.S. Integrated Business',
    initials: 'AD',
    track: 'Marketing',
    memberGroup: 'member',
    photo: '/prof_pics/anjanette-diaz.png',
    bio: 'Anjanette shapes how the team communicates its solution, audience, story, and impact during the competition season.',
    hometown: 'Orlando, FL',
    focus: 'Brand strategy, messaging, and audience research',
    interests: ['Campaign planning', 'Consumer insight', 'Pitch storytelling'],
    socials: { linkedin: 'https://www.linkedin.com/in/diazanjanette/' }
  },
  {
    slug: 'sebastian-cardenas',
    year: 2026,
    name: 'Sebastian Cardenas',
    role: 'Videographer',
    major: 'B.S. Emerging Media',
    initials: 'SC',
    track: 'Videographer',
    memberGroup: 'member',
    photo: '/prof_pics/sebastian-cardenas.jpeg',
    bio: 'Sebastian captures the team process and creates visual material that makes the work easier to understand, remember, and share.',
    hometown: 'Orlando, FL',
    focus: 'Video production, motion, and visual storytelling',
    interests: ['Cinematography', 'Editing', 'Digital media'],
    socials: { linkedin: 'https://www.linkedin.com/in/sebastian-cardenas-62b3b9328/' }
  },
  {
    slug: 'diogo-ortiz',
    year: 2026,
    name: 'Diogo Ortiz',
    role: 'Finance Lead',
    major: 'B.S. Integrated Business',
    initials: 'DO',
    track: 'Finance',
    memberGroup: 'member',
    photo: '/prof_pics/diogo-ortiz.png',
    bio: 'Diogo keeps the solution grounded in business reality, supporting financial modeling, feasibility, and market planning.',
    hometown: 'Orlando, FL',
    focus: 'Financial planning, market validation, and venture feasibility',
    interests: ['Startup finance', 'Business modeling', 'Operations'],
    socials: { linkedin: 'https://www.linkedin.com/in/diogo-ortiz/' }
  },
  {
    slug: 'natalia-del-vecchio-coronado',
    year: 2026,
    name: 'Natalia Del Vecchio Coronado',
    role: 'Marketing Analyst',
    major: 'B.S. Integrated Business',
    initials: "NDVC",
    track: 'Business',
    memberGroup: 'member',
    photo: '/prof_pics/natalia-del-vecchio.png',
    bio: '',
    hometown: '',
    focus: '',
    interests: [],
    socials: { linkedin: 'https://www.linkedin.com/in/natalia-delvecchio/' }
  },
  {
    slug: 'benjamin-c-challco-acosta',
    year: 2026,
    name: 'Benjamin C. Challco Acosta',
    role: 'Graduate Advisor',
    major: 'Master of Science in Business Analytics',
    initials: 'BC',
    track: 'Advisor',
    memberGroup: 'gradAdvisor',
    photo: '/prof_pics/ben-headshot-2026.JPEG',
    bio: 'Hey everyone! I\'m grateful for the opportunity to serve as a Graduate Advisor for such a talented HSI Battle of the Brains team. One of my biggest passions is developing others, giving back to my community, and helping the people around me grow. I have a strong background in marketing & sales and have developed much of my professional experience in the insurance industry, where I\'ve learned the importance of relationship-building, resilience, and understanding clients\' needs. My long-term goal is to become an agency owner, build and develop a high-performing team, and create a lasting impact on the clients and communities I serve.',
    hometown: 'Orlando, FL',
    focus: 'Business analytics, sales strategy, and team development',
    interests: ['Mentorship', 'Marketing and sales', 'Community impact'],
    socials: { linkedin: 'https://www.linkedin.com/in/benjaminchallco/' }
  },
  {
    slug: 'adrianna-n-marquez',
    year: 2026,
    name: 'Adrianna N. Marquez',
    role: 'Graduate Advisor',
    major: 'Master of Science in Management - Integrated Business Track',
    initials: 'AM',
    track: 'Advisor',
    memberGroup: 'gradAdvisor',
    photo: '/prof_pics/adriana-pic.JPEG',
    bio: 'Hello! I\'m Adrianna. I come from a military background so my family heritage is pretty scattered, but my latin side is Colombian and Argentinian. Aside from being a student, I am an ambassador of the UCF Office of Military and Veteran Student Success at the downtown campus where I support the hundreds of student veterans and family members through counseling and career readiness resources. I was inspired to join the UCF HSI battle of the brains team by all of the support that I\'ve seen poured into it. The faculty and staff at UCF do so much for every community, so I hope we can reap the benefits of that support by going far in a meaningful competition. I earned my undergraduate degree in Information Technology, so I\'m hoping to pair that with my business graduate degree and become an IT project manager. Go Knights!',
    hometown: 'Colombian and Argentinian heritage',
    focus: 'IT project management, student support, and integrated business',
    interests: ['Veteran student success', 'Project management', 'Community support'],
    socials: { linkedin: 'https://www.linkedin.com/in/adrianna-marquez/' }
  },
  {
    slug: 'david-penn',
    year: 2026,
    name: 'David Penn',
    role: 'Faculty Advisor',
    major: 'Ph.D. Business Administration',
    initials: 'DP',
    track: 'Advisor',
    memberGroup: 'professor',
    photo: '/prof_pics/david-penn.png',
    bio: 'Dr. Penn supports the team with faculty guidance, strategic direction, and institutional knowledge throughout the competition cycle.',
    hometown: 'Orlando, FL',
    focus: 'Faculty mentorship, solution strategy, and team development',
    interests: ['Student success', 'Applied innovation', 'Competition strategy'],
    socials: { linkedin: 'https://www.linkedin.com/in/david-penn-phd-edd-mfa-pmp-58683314/' }
  },
  {
    slug: 'jim-gallo',
    year: 2026,
    name: 'Jim Gallo',
    role: 'Faculty Advisor',
    major: 'Ph.D. Industrial and Organizational Psychology',
    initials: 'JG',
    track: 'Advisor',
    memberGroup: 'professor',
    photo: '/prof_pics/jim-gallo.png',
    bio: 'Dr. Gallo helps the members by testing them in difficult areas that make the members think critically.',
    hometown: 'Orlando, FL',
    focus: 'Faculty mentorship, solution strategy, and team development',
    interests: ['Student success', 'Applied innovation', 'Competition strategy'],
    socials: { linkedin: 'https://www.linkedin.com/in/jimgallo/' }
  }
]

const solutions = [
  {
    year: 2026,
    title: '2026 HSI Battle of the Brains Solution',
    status: 'In progress',
    summary: 'The team is preparing for this year\'s challenge. This page is ready for the final problem statement, product demo, pitch materials, and outcomes once the solution is released.',
    highlights: ['Challenge placeholder', 'Solution deck coming soon', 'Demo media coming soon'],
    link: ''
  }
]

const photos = [
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85', alt: 'Team collaborating around a table', size: 'large' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85', alt: 'Student taking notes', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85', alt: 'Students talking', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85', alt: 'Students in a classroom', size: 'square' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85', alt: 'Student writing notes', size: 'tall' },
]

const appIcons = [
  { name: 'UCF LOGO', src: '/favicon.svg' },
  { name: 'HSI LOGO', src: '/icons.svg' },
  { name: 'Solution Placeholder', src: '/favicon.svg' },
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
  ['Advisor', 'Advisor'],
]

const reelColumns = [
  { icons: appIcons, direction: 'down' },
  { icons: appIcons, direction: 'up' },
  { icons: appIcons, direction: 'down' },
  { icons: appIcons, direction: 'up' },
]

function sortByMostRecent(items) {
  return [...items].sort((first, second) => second.year - first.year || first.name?.localeCompare(second.name) || first.title?.localeCompare(second.title))
}

function sortMembersByName(members) {
  return [...members].sort((first, second) => first.name.localeCompare(second.name))
}

function getAvailableYears(items) {
  return [...new Set(items.filter((item) => item.year >= currentSeason).map((item) => item.year))].sort((first, second) => second - first)
}

function getCurrentYearMembers() {
  return sortMembersByName(teamMembers.filter((member) => member.year === currentSeason))
}

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '')

  if (!hash || hash === 'home') return { page: 'home' }
  if (hash === 'team') return { page: 'team' }
  if (hash === 'solutions') return { page: 'solutions' }
  if (hash.startsWith('team/')) {
    const segment = hash.split('/')[1]
    return /^\d{4}$/.test(segment) ? { page: 'team', year: Number(segment) } : { page: 'member', slug: segment }
  }
  if (hash.startsWith('solutions/')) return { page: 'solutions', year: Number(hash.split('/')[1]) }

  return { page: 'home' }
}

function useHashRoute() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRoute())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}

function SiteNav() {
  const teamYears = getAvailableYears(teamMembers)
  const solutionYears = getAvailableYears(solutions)

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <details className="nav-menu">
        <summary aria-label="Open site navigation">Menu</summary>
        <div className="nav-menu-panel">
          <a href="#home">Home</a>
          <div className="nav-menu-group">
            <span>Teams</span>
            {teamYears.map((year) => <a href={`#team/${year}`} key={`team-${year}`}>{year} Team</a>)}
          </div>
          <div className="nav-menu-group">
            <span>Solutions</span>
            {solutionYears.map((year) => <a href={`#solutions/${year}`} key={`solution-${year}`}>{year} Solution</a>)}
          </div>
        </div>
      </details>
      <a className="brand" href="#home"><span className="brand-mark">H</span><span>UCF HSI BOB</span></a>
      <div className="nav-links"><a href="#solutions">Solutions</a><a href="#team">Team</a></div>
    </nav>
  )
}

function MemberAvatar({ member, large = false }) {
  if (member.photo) {
    return <img className={`avatar member-photo${large ? ' large' : ''}`} src={member.photo} alt={member.name} />
  }

  return <div className={`avatar${large ? ' large' : ''}`}>{member.initials}</div>
}

function TeamGrid({ members }) {
  const sortedMembers = sortMembersByName(members)

  return (
    <div className="members-grid">
      {sortedMembers.map((member, index) =>
        <a className="member-card" href={`#team/${member.slug}`} key={member.slug}>
          <div className="member-number">{String(index + 1).padStart(2, '0')}</div>
          <MemberAvatar member={member} />
          <div className="member-info">
            <h3>{member.name}</h3>
            <p className="member-role">{member.role} · {member.major}</p>
            <p className="member-bio">{member.bio}</p>
          </div>
          <span className="card-arrow">↗</span>
        </a>)}
    </div>
  )
}

function HomeTeamGroups({ members }) {
  return (
    <div className="home-team-groups">
      {homeTeamGroups.map((group) => {
        const groupMembers = members.filter((member) => member.memberGroup === group.key)

        return (
          <section className="home-team-group" key={group.key}>
            <div className="home-team-group-heading">
              <span>{group.label}</span>
              <b>{String(groupMembers.length).padStart(2, '0')}</b>
            </div>
            {groupMembers.length > 0 ? <TeamGrid members={groupMembers} /> : <p className="empty-group-note">Team captain to be announced.</p>}
          </section>
        )
      })}
    </div>
  )
}

function TeamYearSection({ year, members }) {
  return (
    <section className="year-section" id={`team-${year}`}>
      <div className="year-heading">
        <span>{year}</span>
        <b>{members.length} members</b>
      </div>
      <TeamGrid members={members} />
    </section>
  )
}

function TeamPage({ year }) {
  const [filter, setFilter] = useState('all')

  const years = getAvailableYears(teamMembers)
  const membersByYear = years.map((teamYear) => {
    const yearMembers = sortMembersByName(teamMembers.filter((member) => member.year === teamYear))
    return { year: teamYear, members: filter === 'all' ? yearMembers : yearMembers.filter((member) => member.track === filter) }
  })

  useEffect(() => {
    if (!year) return
    document.getElementById(`team-${year}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [year, filter])

  return (
    <section className="section-pad page-shell team-section" id="team">
      <div className="section-heading"><div><div className="section-label">Team / {currentSeason} and beyond</div><h2>Meet <em>the team.</em></h2></div></div>
      <p className="page-lede">Welcome to our teams page! To learn more about any member, click on the top right arrow of our box. Feel free to browse around, learn more about each individual member, and connect with us via our LinkedIn links displayed on our individual pages!</p>
      <div className="filter-row" role="group" aria-label="Filter team members">{filterOptions.map(([value, label], index) => <button key={`${value}-${index}`} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}</button>)}</div>
      <div className="year-list">
        {membersByYear.map((group) => <TeamYearSection key={group.year} {...group} />)}
      </div>
    </section>
  )
}

function MemberPage({ slug }) {
  const member = teamMembers.find((item) => item.slug === slug)

  if (!member) {
    return (
      <section className="section-pad page-shell">
        <div className="section-label">Team member</div>
        <h2 className="detail-heading">Member not found.</h2>
        <a className="hero-project-button" href="#team">Back to Team <span>↗</span></a>
      </section>
    )
  }

  return (
    <section className="section-pad page-shell member-detail">
      <a className="back-link" href="#team">← Back to team</a>
      <div className="member-detail-hero">
        <MemberAvatar member={member} large />
        <div>
          <div className="section-label">{member.year} / {member.track}</div>
          <h1>{member.name}</h1>
          <p className="detail-role">{member.role} · {member.major}</p>
        </div>
      </div>

      <div className="detail-grid">
        <article className="detail-panel wide">
          <span>Bio</span>
          <p>{member.bio}</p>
        </article>
        <article className="detail-panel">
          <span>Focus</span>
          <p>{member.focus}</p>
        </article>
        <article className="detail-panel">
          <span>Background</span>
          <p>{member.hometown}</p>
        </article>
        <article className="detail-panel">
          <span>Interests</span>
          <div className="tag-list">{member.interests.map((interest) => <b key={interest}>{interest}</b>)}</div>
        </article>
        <article className="detail-panel social-panel">
          <span>Social Links</span>
          <a className={!member.socials.linkedin ? 'disabled' : ''} href={member.socials.linkedin || undefined}>LinkedIn</a>
          <a className={!member.socials.github ? 'disabled' : ''} href={member.socials.github || undefined}>GitHub</a>
        </article>
      </div>
    </section>
  )
}

function SolutionsPage({ year }) {
  const years = getAvailableYears(solutions)

  useEffect(() => {
    if (!year) return
    document.getElementById(`solutions-${year}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [year])

  return (
    <section className="section-pad page-shell solutions-page" id="solutions">
      <div className="section-heading"><div><div className="section-label">Solutions / {currentSeason} and beyond</div><h2>Competition <em>solutions.</em></h2></div></div>
      <p className="page-lede">Thank you for visiting our solutions webpage! Please feel free to check out the other websites we have developed over the years.</p>
      <div className="year-list solution-list">
        {years.map((solutionYear) => {
          const yearSolutions = sortByMostRecent(solutions).filter((solution) => solution.year === solutionYear)

          return (
            <section className="year-section" id={`solutions-${solutionYear}`} key={solutionYear}>
              <div className="year-heading">
                <span>{solutionYear}</span>
                <b>{yearSolutions.length} solution</b>
              </div>
              {yearSolutions.map((solution) =>
                <article className="solution-card" key={solution.title}>
                  <div className="solution-year">{solution.year}</div>
                  <div>
                    <div className="status-pill">{solution.status}</div>
                    <h3>{solution.title}</h3>
                    <p>{solution.summary}</p>
                    <div className="tag-list">{solution.highlights.map((highlight) => <b key={highlight}>{highlight}</b>)}</div>
                  </div>
                </article>)}
            </section>
          )
        })}
      </div>
    </section>
  )
}

function HomePage() {
  const [heroFade, setHeroFade] = useState(0)

  useEffect(() => {
    const handleScroll = () => setHeroFade(Math.min(window.scrollY / 420, 1))
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentYearMembers = getCurrentYearMembers()
  const currentSolution = sortByMostRecent(solutions)[0]

  return (
      <>
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
            <a className="hero-project-button" href="#solutions">View Solutions <span>↗</span></a>
            <a className="hero-project-button" href="#team">View Team <span>↗</span></a>

          </div>
        </section>

        <section className="intro-grid section-pad" id="project">
          <div className="section-label">01 / The Solution</div>
          <div className='section-project'>
            <div>
              <p className="display-copy">{currentSolution.title}</p>
              <p className="body-copy">{currentSolution.summary}</p>
              <a className="hero-project-button" href="#solutions">More Solutions <span>↗</span></a>
            </div>
            <img className="section-app-icon" src={appIcons[0].src} alt="Project icon" draggable={false} />
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
          <div className="section-heading"><div><div className="section-label">02 / The Team</div><h2>Meet <em>the Current Team.</em></h2></div></div>
          <HomeTeamGroups members={currentYearMembers} />
          <a className="hero-project-button section-link" href="#team">All Team Members <span>↗</span></a>
        </section>

        <section className="photo-section section-pad">
          <div className="section-label">03 / Gallery</div>
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
            <a href="#home">Back to top ↑</a>
          </div>
        </footer>

      </>
  )
}

export default function Page() {
  const route = useHashRoute()

  return (
    <main>
      <SiteNav />
      {route.page === 'home' && <HomePage />}
      {route.page === 'team' && <TeamPage year={route.year} />}
      {route.page === 'member' && <MemberPage slug={route.slug} />}
      {route.page === 'solutions' && <SolutionsPage year={route.year} />}
    </main>
  )
}
