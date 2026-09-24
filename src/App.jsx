'use client'

import { useEffect, useRef, useState } from 'react'

const currentSeason = 2026

const teamMembers = [
  {
    slug: 'miguel-angel-hurtado-gomez',
    year: 2026,
    name: 'Miguel Angel Hurtado Gomez',
    role: 'Programmer/Engineer',
    major: 'B.S. Aerospace Engineering',
    initials: 'MH',
    track: ['Engineer'],
    memberGroup: 'member',
    photo: '/prof_pics/miguel-angel.png',
    bio: 'Miguel helps turn team concepts into working technical prototypes, with a focus on engineering systems and disciplined build execution.',
    hometown: 'Medellin, COL',
    focus: 'Rapid prototyping, systems thinking, and technical research',
    interests: ['Aerospace design', 'Simulation', 'Hardware builds'],
    socials: { linkedin: 'https://www.linkedin.com/in/miguelangelhurtadogomez/', github: 'https://github.com/mmm1602' }
  },
  {
    slug: 'javier-a-cuevas-chabrier',
    year: 2026,
    name: 'Javier A. Cuevas Chabrier',
    role: 'Team Captain/Engineer',
    major: 'B.S. Mechanical Engineering, B.S. Computer Science',
    initials: 'JC',
    track: ['Engineer', 'Finance'],
    memberGroup: 'teamCaptain',
    photo: '/prof_pics/javier-cuevas.jpeg',
    bio: 'Hello everyone! I am excited to compete at HSI Battle of the Brains for the 2026 academic year! I currently work with propulsion systems and the Propulsion and Energy Research Lab under the Axial Stage Combustion Chamber project. I like to code in python and do projects with friends. My most recent projects are a solid propellant rocket motor where I use sorbitol and potassium nitrate to make rocket fuel and a BAJA buggy made from a go-kart frame and engine. I hope to speak to you soon!',
    hometown: 'Utuado, PR',
    focus: 'Propulsion systems, Python tools, and mechanical product design',
    interests: ['Rocket motors', 'BAJA builds', 'Python projects'],
    socials: { linkedin: 'https://www.linkedin.com/in/javier-cuevas-jacc84/', github: 'https://github.com/Javy-Scratchspace' }
  },
  {
    slug: 'alejandro-valdez',
    year: 2026,
    name: 'Alejandro Valdez',
    role: 'Engineer/Videographer',
    major: 'B.S. Aerospace Engineering',
    initials: 'AV',
    track: ['Engineer', 'Videographer'],
    memberGroup: 'member',
    photo: '/prof_pics/alex-valdez.png',
    bio: 'Hello folks, my name is Alejandro Valdez and I\'m a second year Aerospace Engineering student from Mexico. In my free time you\'ll find me outdoors, playing lacrosse, or building engineering projects like rockets. I\'m working toward a career as an engineer in the space industry, and I also hope to be an activist for environmental conservation along the way. Thanks!',
    hometown: 'Orlando, FL',
    focus: 'Space systems, sustainability, and engineering project execution',
    interests: ['Rocketry', 'Lacrosse', 'Environmental conservation'],
    socials: { linkedin: 'https://www.linkedin.com/in/alejandro-valdez15/', github: 'https://github.com/alexvaldex' }
  },
  {
    slug: 'david-navarrete',
    year: 2026,
    name: 'David Navarrete',
    role: 'Programmer',
    major: 'B.S. Computer Science',
    initials: 'DN',
    track: ['Engineer'],
    memberGroup: 'member',
    photo: '/prof_pics/david-navarette.png',
    bio: 'David supports the software side of the team, helping translate challenge requirements into practical web, data, and product workflows.',
    hometown: 'Parkland, FL',
    focus: 'Software architecture, implementation, and debugging',
    interests: ['Full-stack development', 'Automation', 'Product thinking'],
    socials: { linkedin: 'https://www.linkedin.com/in/david-navarrete-/', github: 'https://github.com/AlphaKnight1701-A' }
  },
  {
    slug: 'anjanette-diaz',
    year: 2026,
    name: 'Anjanette Diaz',
    role: 'Business Strategist/Marketing Lead',
    major: 'B.S. Integrated Business',
    initials: 'AD',
    track: ['Business', 'Marketing'],
    memberGroup: 'member',
    photo: '/prof_pics/anjanette-diaz.png',
    bio: 'Anjanette shapes how the team communicates its solution, audience, story, and impact during the competition season.',
    hometown: 'Miami, FL',
    focus: 'Brand strategy, messaging, and audience research',
    interests: ['Campaign planning', 'Consumer insight', 'Pitch storytelling'],
    socials: { linkedin: 'https://www.linkedin.com/in/diazanjanette/' }
  },
  {
    slug: 'sebastian-cardenas',
    year: 2026,
    name: 'Sebastian Cardenas',
    role: 'Video Production Lead',
    major: 'B.S. Emerging Media',
    initials: 'SC',
    track: ['Videographer', 'Marketing'],
    memberGroup: 'member',
    photo: '/prof_pics/sebastian-cardenas.jpeg',
    bio: 'Hello! My name is Sebastian Cardenas, half Colombian and half Peruvian! I\'m very excited to be a part of this marvelous experience. I am a transfer student from Polk State College and I can\'t wait to provide my artistic abilities to portray our ideas and solutions!',
    hometown: 'Lake Alfred, FL',
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
    track: ['Business', 'Finance'],
    memberGroup: 'member',
    photo: '/prof_pics/diogo-ortiz.png',
    bio: 'Diogo keeps the solution grounded in business reality, supporting financial modeling, feasibility, and market planning.',
    hometown: 'Parkland, FL',
    focus: 'Financial planning, market validation, and venture feasibility',
    interests: ['Startup finance', 'Business modeling', 'Operations'],
    socials: { linkedin: 'https://www.linkedin.com/in/diogo-ortiz/' }
  },
  {
    slug: 'natalia-del-vecchio-coronado',
    year: 2026,
    name: 'Natalia Del Vecchio Coronado',
    role: 'Feasability Analyst/Marketing Analyst',
    major: 'B.S. Integrated Business',
    initials: "NDVC",
    track: ['Business', 'Marketing'],
    memberGroup: 'member',
    photo: '/prof_pics/natalia-del-vecchio.png',
    bio: 'Natalia focuses on making sure the solution is marketable. She plays a crucial role in figuring out what needs to be done to get the solution profitable as soon as possible.',
    hometown: 'Coconut Creek, FL',
    focus: 'Marketing strategies, business implementation, and community involvement',
    interests: ['Startup marketing', 'Business modeling', 'Consumer experience'],
    socials: { linkedin: 'https://www.linkedin.com/in/natalia-delvecchio/' }
  },
  {
    slug: 'benjamin-c-challco-acosta',
    year: 2026,
    name: 'Benjamin C. Challco Acosta',
    role: 'Graduate Advisor',
    major: 'Master of Science in Business Analytics',
    initials: 'BC',
    track: ['Graduate Advisor', 'Business'],
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
    track: ['Business', 'Engineer', 'Graduate Advisor'],
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
    track: ['Business', 'Faculty Advisor'],
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
    track: ['Finance', 'Business', 'Faculty Advisor'],
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
  { name: 'UCF LOGO', src: '/ucf-logo.png' },
  { name: 'HSI LOGO', src: '/botb-logo.png' }
]

function ReelColumn({ icons, direction }) {
  return <div className={`marquee-column marquee-${direction}`}>
    {[...icons, ...icons, ...icons].map((icon, index) => (
      <div className="app-tile" key={index}>
        <img className="app-icon" src={icon.src} alt="" draggable={false} />
      </div>
    ))}
  </div>
}

const filterOptions = [
  ['all', 'All'],
  ['Faculty Advisor', 'Faculty Advisor'],
  ['Graduate Advisor', 'Graduate Advisor'],
  ['Business', 'Business'],
  ['Engineer', 'Engineer'],
  ['Marketing', 'Marketing'],
  ['Videographer', 'Videographer'],
  ['Finance', 'Finance'],
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

const memberGroupOrder = {
  professor: 0,
  gradAdvisor: 1,
  teamCaptain: 2,
  member: 3,
}

function sortMembersByGroupAndName(members) {
  return [...members].sort((first, second) => {
    const groupDifference = (memberGroupOrder[first.memberGroup] ?? 99) - (memberGroupOrder[second.memberGroup] ?? 99)
    return groupDifference || first.name.localeCompare(second.name)
  })
}

function getMemberTracks(member) {
  return Array.isArray(member.track) ? member.track : [member.track]
}

function formatMemberTracks(member) {
  return getMemberTracks(member).filter(Boolean).join(' / ')
}

function formatMemberRoleLine(member) {
  const roleParts = [member.role, member.major]
  return roleParts.filter(Boolean).join(' | ')
}

function memberHasTrack(member, track) {
  if (member.memberGroup === 'professor') return track === 'Faculty Advisor'
  if (member.memberGroup === 'gradAdvisor') return track === 'Graduate Advisor'
  return getMemberTracks(member).includes(track)
}

function categoryId(track) { return 'category-' + track.toLowerCase().replaceAll(' ', '-') }

function scrollToSection(id) {
  const target = document.getElementById(id)
  target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  target?.focus({ preventScroll: true })
}

function MemberFlags({ member }) {
  // US placeholders requested for all members; replace with confirmed nationalities later.
  const flags = member.nationalities?.length ? member.nationalities : [{ code: 'US', label: 'United States (placeholder)' }]
  return <span className="member-flags">{flags.map(({ code, label }) =>
    <span className="country-flag" key={code} role="img" aria-label={label} title={label}>
      {code === 'US' ? <svg viewBox="0 0 190 100" width="29" height="16" aria-hidden="true">
        <rect width="190" height="100" fill="#fff" />
        {Array.from({length:7}, (_,i) => <rect key={i} y={i * 200 / 13} width="190" height={100 / 13} fill="#b22234" />)}
        <rect width="76" height={700 / 13} fill="#3c3b6e" />
        {Array.from({length:9}, (_,row) => Array.from({length:row % 2 ? 5 : 6}, (_,col) => <path key={row + '-' + col} d="M0,-2.1 .5,-.65 2,-.65 .8,.25 1.2,1.8 0,.9 -1.2,1.8 -.8,.25 -2,-.65 -.5,-.65Z" fill="#fff" transform={`translate(${(col + (row % 2 ? 1 : .5)) * 12.67},${(row + 1) * 5.38})`} />))}
      </svg> : String.fromCodePoint(...code.toUpperCase().split('').map((letter) => 127397 + letter.charCodeAt(0)))}
    </span>)}</span>
}

function formatSocialLabel(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getMemberLinks(member) {
  return Object.entries(member.socials || {})
    .filter(([, link]) => Boolean(link))
    .map(([name, link]) => ({ name: formatSocialLabel(name), link }))
}

function getAvailableYears(items) {
  return [...new Set(items.map((item) => item.year))].sort((first, second) => second - first)
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
      window.scrollTo({ top: 0, behavior: 'instant' })
      setRoute(getRoute())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}

function SiteNav({ page }) {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="#home" aria-label="UCF HSI Battle of the Brains home"><img src="/ucf-botb-logo.png" alt="UCF" /></a>
      <div className="nav-links"><a href="#solutions" aria-current={page === 'solutions' ? 'page' : undefined}>Solutions</a><a href="#team" aria-current={page === 'team' || page === 'member' ? 'page' : undefined}>Teams</a><a href="https://hsibattleofthebrains.com/" target="_blank" rel="noreferrer">HSI BOTB <span aria-hidden="true">↗</span></a><a href="https://www.ucf.edu/" target="_blank" rel="noreferrer">UCF <span aria-hidden="true">↗</span></a></div>
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
  const sortedMembers = sortMembersByGroupAndName(members)

  return (
    <div className="members-grid">
      {sortedMembers.map((member) =>
        <a className="member-card" href={`#team/${member.slug}`} key={member.slug}>
          <div className="member-info">
            <div className="member-card-header">
              <MemberAvatar member={member} />
              <div>
                <h3>{member.name} <MemberFlags member={member} /></h3>
                <p className="member-role">{formatMemberRoleLine(member)}</p>
              </div>
            </div>
            <p className="member-bio">{member.bio}</p>
            <span className="member-view-more">View more <span>↗</span></span>
          </div>
        </a>)}
    </div>
  )
}

function TeamConveyor({ members }) {
  const rail = useRef(null)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (paused || hovered || focused || reduced) return
    const element = rail.current
    let frame, previous, direction = 1, position = element.scrollLeft
    const move = (time) => {
      if (previous !== undefined && !document.hidden) {
        const max = element.scrollWidth - element.clientWidth
        position = Math.max(0, Math.min(max, position + direction * Math.min(time - previous, 50) * .025))
        element.scrollLeft = position
        if (position >= max) direction = -1
        if (position <= 0) direction = 1
      }
      previous = time
      frame = requestAnimationFrame(move)
    }
    frame = requestAnimationFrame(move)
    return () => cancelAnimationFrame(frame)
  }, [paused, hovered, focused, reduced])
  const step = (direction) => {
    setPaused(true)
    rail.current?.scrollBy({ left: direction * rail.current.clientWidth * .8, behavior: reduced ? 'instant' : 'smooth' })
  }
  return <div className="team-conveyor">
    <div className="conveyor-toolbar"><p>Meet the minds behind the team. Hover to pause, or scroll to explore.</p><div className="conveyor-controls">
      <button onClick={() => step(-1)} aria-label="Previous team members">←</button>
      {!reduced && <button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Play' : 'Pause'}</button>}
      <button onClick={() => step(1)} aria-label="Next team members">→</button>
    </div></div>
    <div className="conveyor-rail" ref={rail} tabIndex={0} role="region" aria-label="Current team cards"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)}>
      {members.map((member) => <article className="conveyor-card" key={member.slug}>
        <div className="conveyor-person"><MemberAvatar member={member} /><MemberFlags member={member} /></div>
        <h3>{member.name}</h3><p className="member-role">{member.role}</p><p className="conveyor-major">{member.major}</p>
        <p className="member-bio">{member.bio}</p>
        <div className="conveyor-links"><a href={`#team/${member.slug}`} aria-label={`View ${member.name}'s profile`}>Profile <span aria-hidden="true">↗</span></a>
          {getMemberLinks(member).map(({name, link}) => <a key={name} href={link} target="_blank" rel="noreferrer" aria-label={`${member.name} on ${name}`}>{name} <span aria-hidden="true">↗</span></a>)}
        </div>
      </article>)}
    </div>
  </div>
}

function TeamPage({ year }) {
  const years = getAvailableYears(teamMembers)
  const selectedYear = year ?? years[0]
  const members = teamMembers.filter((member) => member.year === selectedYear)

  return (
    <section className="section-pad page-shell team-section" id="team">
      <div className="section-heading"><div><div className="section-label">The people behind the ideas</div><h1 className="page-title">Meet <em>our teams!</em></h1></div></div>
      <p className="page-lede">Explore each season and the disciplines that bring our team together. Select a member to learn more and connect.</p>
      <nav className="year-tabs team-timeline" aria-label="Team seasons">{years.map((teamYear) => <a key={teamYear} href={`#team/${teamYear}`} aria-current={selectedYear === teamYear ? 'page' : undefined}><span className="season-node" aria-hidden="true" /><strong>{teamYear}</strong><span>Team season</span></a>)}</nav>
      <div className="year-heading"><span>The {selectedYear} Team!</span><b>{members.length} people</b></div>
      <p className="category-note">Faculty and graduate advisors lead their own sections. Team members appear under their areas of expertise.</p>
      <nav className="category-jumps" aria-label="Jump to team category">{filterOptions.filter(([track]) => track !== 'all' && members.some((member) => memberHasTrack(member, track))).map(([track,label]) => <button key={track} onClick={() => scrollToSection(categoryId(track))}>{label} <span aria-hidden="true">↓</span></button>)}</nav>
      <div className="team-categories">
        {filterOptions.filter(([track]) => track !== 'all').map(([track, label]) => {
          const categoryMembers = members.filter((member) => memberHasTrack(member, track))
          if (!categoryMembers.length) return null
          return <section className="team-category" key={track} id={categoryId(track)} tabIndex={-1}>
            <h2 className="category-heading">{label}</h2>
            <TeamGrid members={categoryMembers} />
          </section>
        })}
        {!members.length && <p className="empty-group-note">No team has been published for this season yet.</p>}
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

  const memberLinks = getMemberLinks(member)

  return (
    <section className="section-pad page-shell member-detail">
      <a className="back-link" href="#team">← Back to team</a>
      <div className="member-detail-hero">
        <MemberAvatar member={member} large />
        <div>
          <div className="section-label">{member.year} / {formatMemberTracks(member)}</div>
          <h1>{member.name}</h1><MemberFlags member={member} />
          <p className="detail-role">{member.role} | {member.major}</p>
        </div>
      </div>

      <article className="member-description">
        <span>Description</span>
        <p>{member.bio}</p>
      </article>

      <div className="detail-grid">
        <article className="detail-panel">
          <span>Focus</span>
          <p>{member.focus}</p>
        </article>
        <article className="detail-panel">
          <span>Hometown</span>
          <p>{member.hometown}</p>
        </article>
        <article className="detail-panel">
          <span>Interests</span>
          <div className="tag-list">{member.interests.map((interest) => <b key={interest}>{interest}</b>)}</div>
        </article>
        <article className="detail-panel social-panel">
          <span>Social Links</span>
          {memberLinks.map((socialLink) => <a href={socialLink.link} key={socialLink.name}>{socialLink.name}</a>)}
        </article>
      </div>
    </section>
  )
}

function SolutionsPage({ year }) {
  const years = getAvailableYears(solutions)

  useEffect(() => {
    if (!year) return
    document.getElementById(`solutions-${year}`)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [year])

  return (
    <section className="section-pad page-shell solutions-page" id="solutions">
      <div className="section-heading"><div><div className="section-label">The Ideas!</div><h1 className="page-title">Our Competitive <em>Solutions!</em></h1></div></div>
      <p className="page-lede">A season-by-season record of our ideas, prototypes, and competition work. Explore the journey and the materials behind each solution.</p>
      <div className="solution-timeline">
        {years.map((solutionYear) => {
          const yearSolutions = sortByMostRecent(solutions).filter((solution) => solution.year === solutionYear)

          return (
            <section className="timeline-entry year-section" id={`solutions-${solutionYear}`} key={solutionYear}>
              <div className="timeline-date"><span className="timeline-dot" aria-hidden="true" /><h2>{solutionYear}</h2><span>Competition season</span></div>
              <div className="timeline-content">
              {yearSolutions.map((solution) =>
                <article className="solution-card" key={solution.title}>
                  <div className="section-label">Solution</div>
                  <div>
                    <div className="status-pill">{solution.status}</div>
                    <h3>{solution.title}</h3>
                    <p>{solution.summary}</p>
                    <div className="solution-files" aria-label="Solution materials">
                      {['Problem statement', 'Presentation deck', 'Demo & project files'].map((file) => <div className="file-placeholder" key={file}><span className="file-icon" aria-hidden="true">↳</span><div><strong>{file}</strong><span>Coming soon</span></div></div>)}
                    </div>
                    {solution.link && <a className="hero-project-button" href={solution.link}>Explore solution <span>↗</span></a>}
                  </div>
                </article>)}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}

function HomePage() {
  const currentYearMembers = getCurrentYearMembers()
  const currentSolution = sortByMostRecent(solutions)[0]

  return (
      <>
        <section className="hero" id="home">
          <div className="hero-reel-wrap" aria-hidden="true">
            <section className="icon-marquee" aria-label="Team Projects">
              {reelColumns.map((column, index) => <ReelColumn key={`reel-${index}`} {...column} />)}
            </section>
          </div>
          <div className="hero-copy">
            <div className="section-label">University of Central Florida / {currentSeason}</div>
            <h1 className="hero-title"><span className="hero-ucf">UCF</span><em className="hero-team-name">HSI BATTLE OF<br />THE BRAINS TEAM</em></h1>
            <div className="hero-actions"><a className="hero-project-button" href="#solutions">View Solutions <span>↗</span></a>
            <a className="hero-project-button secondary-button" href="#team">View Team <span>↗</span></a></div>

          </div>
        </section>

        <section className="description-section section-pad" id="description">
          <div className="section-heading">
            <div>
              <div className="section-label">About HSI Battle of the Brains</div>
              <h2>What is <em>Battle of the Brains?</em></h2>
              <p className="body-copy">The Hispanic Scholars Institute Battle of the Brains competition is a national competition where university teams solve problems under pressure, pitch their ideas, and learn alongside industry professionals.</p>
            </div>
          </div>
          <div className="description-grid">
            <article>
              <span>24-Hour Competition</span>
              <p>Student teams compete in a 24-hour, cross-discipline challenge to develop solutions and determine the finalists.</p>
            </article>
            <article>
              <span>Quick Pitch</span>
              <p>Finalists present comprehensive solutions in a fast-paced pitch for the HSI Battle of the Brains Champion title.</p>
            </article>
            <article>
              <span>Workshops</span>
              <p>Students join company tours and facilitated workshops that help them grow practical skills in engaging ways.</p>
            </article>
            <article>
              <span>Panel Discussions</span>
              <p>Professionals and students take part in official panels where they share experience, insight, and expertise.</p>
            </article>
          </div>
        </section>

        <section className="intro-grid section-pad" id="project">
          <div className="section-label">The Latest Solution</div>
          <div className="section-project">
            <div className="project-art"><img className="section-app-icon" src={appIcons[0].src} alt="UCF" draggable={false} /><span>Ideas into impact.</span></div>
            <div className="project-copy">
              <div className="section-label">{currentSolution.status} / {currentSolution.year}</div>
              <h2>Our {currentSolution.year} <em>Solution</em></h2>
              <p className="body-copy">{currentSolution.summary}</p>
              <a className="hero-project-button" href="#solutions">Explore Solutions <span>↗</span></a>
            </div>
          </div>

        </section>


        <section className="section-pad team-section" id="equipo">
          <div className="section-heading">
            <div>
              <div className="section-label">The Dream Team</div>
              <h2>Nuestro <em>Equipo!</em></h2>
            </div>
          </div>
          <TeamConveyor members={currentYearMembers} />
          <a className="hero-project-button section-link" href="#team">All Team Members <span>↗</span></a>
        </section>

        <section className="photo-section section-pad">
          <div className="section-label">Gallery - Our Team in Action!</div>
          <div className="photo-grid">
            {photos.map((photo) =>
                <div className={`photo-card ${photo.size}`} key={`${photo.src}-${photo.alt}`}>
                  <img src={photo.src} alt={photo.alt} />
                </div>)}
          </div>
        </section>



      </>
  )
}

function SiteFooter() {
  return <footer id="footer" className="site-footer">
    <div className="footer-top">
      <div><div className="section-label">Stay connected</div><h2>Many Ideas<br /><em>Un Equipo!</em></h2><p>UCF HSI Battle of the Brains Team</p></div>
      <div className="footer-contact"><h3>Contact</h3><p>Team inquiries & collaboration</p><span>Contact details coming soon.</span></div>
      <nav className="footer-nav" aria-label="Footer navigation"><h3>Explore</h3><a href="#home">Home ↗</a><a href="#team">Teams ↗</a><a href="#solutions">Solutions ↗</a></nav>
    </div>
    <div className="footer-bottom"><span>University of Central Florida · HSI Battle of the Brains</span><span>{currentSeason} season</span></div>
  </footer>
}

export default function Page() {
  const route = useHashRoute()
  const routeKey = [route.page, route.year, route.slug].filter(Boolean).join('-')
  return <>
    <SiteNav page={route.page} />
    <main className="page-transition" key={routeKey}>
      {route.page === 'home' && <HomePage />}
      {route.page === 'team' && <TeamPage year={route.year} />}
      {route.page === 'member' && <MemberPage slug={route.slug} />}
      {route.page === 'solutions' && <SolutionsPage year={route.year} />}
    </main>
    <SiteFooter />
  </>
}
