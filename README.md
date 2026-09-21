# UCF HSI Battle of the Brains

A React website presenting the UCF competition team, member profiles, and competition solutions. The current season is 2026. Content lives in source code; there is no backend, database, authentication, or CMS.

## Run locally

Install Node.js and npm. The locked Vite and Oxlint packages require Node.js `^20.19.0 || >=22.12.0`; use a compatible supported Node release. Run these commands from the folder containing `package.json`:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. JSX and CSS changes update the development page automatically. Stop the server with Ctrl+C. If PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm`.

`npm ci` installs the exact versions in `package-lock.json` and replaces an existing `node_modules` folder. When intentionally changing dependencies with `npm install`, commit both package files.

## Compile, check, and preview

| Command | Purpose |
| --- | --- |
| `npm ci` | Install locked dependencies. |
| `npm run dev` | Start the development server. |
| `npm run dev -- --host 0.0.0.0` | Expose development to a phone on the same network; use the computer's LAN IP and printed port. Firewall rules may apply. |
| `npm run lint` | Run Oxlint, including configured React hook rules. |
| `npm run build` | Compile JSX and bundle production HTML, JavaScript, CSS, and public assets into `dist/`. |
| `npm run preview` | Serve the existing production build locally, normally at `http://localhost:4173`. |

Check a production build with:

```sh
npm run lint
npm run build
npm run preview
```

Build again after editing source: preview does not rebuild files. Preview is a local verification server, not a production hosting service. There is no automated test script in this repository.

Visual-refresh validation: production build and lint pass. Browser checks covered the desktop hero, mobile home/solutions/team layouts, season selection, and a long-name profile at 320px.

## Deployment

For static hosting, use `npm ci` as the install command, `npm run build` as the build command, and `dist` as the publish/output directory. Deploy the contents of `dist`, not `src`. No environment variables are currently required. There is no provider-specific deployment configuration in the repository.

Routes use URL hashes, so `/#team/david-navarrete` does not need server-side routing rewrites. Domain-root hosting is assumed: image references such as `/prof_pics/...` and `/ucf-logo.png` start at the domain root.

For deployment under a subdirectory, configure Vite's `base` in `vite.config.js` **and** update hardcoded public image references to use that base, for example `${import.meta.env.BASE_URL}ucf-logo.png`. Setting `base` alone does not update image path strings in JSX/data. Match filename spelling and capitalization exactly; deployed hosts can be case-sensitive.

## Stack and repository map

The declared stack is React 19, React DOM 19, Vite 8, the React Vite plugin, and Oxlint. Tailwind CSS 4 and its Vite plugin are configured, but the actual styling is handwritten CSS; the active stylesheet does not import Tailwind.

| File / folder | Responsibility |
| --- | --- |
| `index.html` | HTML shell, viewport metadata, browser title, favicon, and entry script. |
| `src/main.jsx` | Mounts React in `#root`, enables Strict Mode, and imports `index.css`. |
| `src/App.jsx` | Content arrays, hash routing, page components, season selection, and navigation behavior. |
| `src/index.css` | Active styles: colors, fonts, spacing, responsive rules, and animation. |
| `src/App.css` | Currently empty and not imported; editing it alone has no effect. |
| `public/prof_pics/` | Member portraits and an available placeholder SVG. |
| `public/ucf-logo.png`, `public/botb-logo.png` | Logos used in the hero and project area. |
| `src/assets/` | Existing image assets not currently imported by the page. |
| `vite.config.js` | Build plugins and optional deployment base configuration. |
| `.oxlintrc.json` | Lint configuration. |
| `package.json`, `package-lock.json` | Commands, dependencies, and locked versions. |
| `dist/` | Generated build output, ignored by Git. Do not edit as source. |

## Site breakdown

All routing and page components live in src/App.jsx. URLs use hash fragments:

| Route | Behavior |
| --- | --- |
| #home (or empty) | Home: split UCF/title hero, logo backdrop, progressive about panels, reversed gold solution section, team conveyor, and gallery. |
| #team | Opens the newest available team season. |
| #team/2026 | Selects that season and displays members grouped by discipline. |
| #team/david-navarrete | Opens the profile with that unique slug. |
| #solutions | Vertical solution timeline, newest season first. |
| #solutions/2026 | Opens the timeline and scrolls to that season. |

Unknown routes fall back to home. Missing member slugs show a not-found page; an unpublished team year shows an empty state. SiteNav and SiteFooter are shared across pages. The two navigation logos form one accessible home link. Navigation remains visible on phones and includes external HSI BOTB and UCF links. Hover changes text color and scale without a button background.

### Home

- Large UCF wordmark beside the HSI Battle of the Brains Team title, with a short wipe entrance.
- Decorative moving logo columns. Logos do not grow, highlight, pause on hover, or capture drag/touch input.
- Team and Solutions buttons with subtle rounded corners and hover/focus feedback.
- Four about panels progress from charcoal to warm gold, with subtle hover feedback.
- The latest solution uses a warm gold gradient background with dark, contrasting text, with the UCF icon on the left and left-aligned copy on the right.
- A live current-team card conveyor includes portraits, roles, majors, biographies, profile links, and social links. It reverses at the ends; hover/focus pauses movement, while touch, wheel, and arrow controls pause automatic movement until Play is selected. Reduced motion disables autoplay. Cards remain keyboard accessible.
- A gallery using remote Unsplash placeholder imagery.

### Teams

A horizontal timeline with clickable year nodes selects one season. Category jump buttons scroll to and focus the chosen section. Highlighted headings group members into Faculty Advisor, Graduate Advisor, Business, Engineer, Marketing, Videographer, and Finance, based on their track values. Faculty advisors appear only under Faculty Advisor, and graduate advisors only under Graduate Advisor, based on memberGroup. Other members can appear under multiple disciplines. Member numbering and padded category counts are removed. The season count counts unique member records. Empty categories are omitted.

Every member card opens a profile with portrait, role, major, biography, focus, hometown, interests, and social links. The home conveyor displays each current-season member once.

### Solutions

Each year has a node on the left of a vertical timeline and solution cards on the right. Cards contain a title, status, summary, and labeled placeholders for Problem statement, Presentation deck, and Demo & project files. Placeholders are informational, not fake download links. A nonempty solution.link adds an Explore solution button.

### Contact footer

Every page has a shared footer with a contact area, navigation, and season information. Contact details are intentionally marked coming soon. Edit SiteFooter to add a real email address, social links, or other contact information; no form or submission service is configured.

## Updating content

Edit the following values in src/App.jsx:

| Value | Controls |
| --- | --- |
| currentSeason | Current team on home, hero season, and footer season. |
| teamMembers | All member records and profile content. |
| memberGroupOrder | Directory card ordering. |
| filterOptions | Discipline headings and order on Teams (the legacy all entry is skipped). |
| solutions | Timeline records and latest solution on home. |
| photos | Gallery sources, alternative text, and size classes. |
| appIcons / reelColumns | Hero logos and movement directions. |

To add a member, copy a record and fill in slug, year, name, role, major, initials, track, memberGroup, photo, bio, hometown, focus, interests, and socials. Use a unique slug across all seasons; four-digit slugs are interpreted as years. Track values must match category values exactly. Member group keys are professor, gradAdvisor, teamCaptain, and member. The first two determine exclusive advisor grouping.

Everyone currently displays a user-requested US flag placeholder; this does not establish nationality. MemberFlags uses an inline SVG for reliable US flag rendering on Windows. Replace the default by adding a nationalities array with code and label fields to confirmed member records (two-letter country codes).

Place portraits in public/prof_pics/ and reference /prof_pics/filename.ext. Missing photo values display initials; broken image URLs do not automatically fall back. Empty social URLs are omitted. Match asset filename capitalization exactly.

All years present in teamMembers and solutions are now available; changing currentSeason does not hide archives. Reusing a member slug across years opens the first match, so use season-qualified slugs for separate yearly profiles when necessary.

Solution records use year, title, status, summary, and link. The legacy highlights array remains in the data but the timeline now displays file placeholders instead. Replace the placeholder markup in SolutionsPage with actual accessible file links when materials are ready, placing local files under public/ as needed. Keep at least one solution entry because home reads the latest directly.

## Adjusting the design

The active stylesheet is src/index.css. Its Shared visual language and Final polish sections contain the refresh rules and responsive overrides; check later declarations when adjusting older rules.

| Setting / selector | Purpose |
| --- | --- |
| --page-max | Shared maximum container width, currently 1600px. Set to 100% for uncapped containers. |
| .section-pad, .site-nav, .hero, footer | Outer spacing; desktop horizontal padding is generally 32px, mobile 18px. |
| --font-body | Native system sans-serif stack. No external font download is needed. |
| .body-copy, .description-grid p, .member-bio | Main supporting text, 17px with generous line-height. |
| .member-role, .detail-role, .section-label | Supporting labels, generally 14px. |
| .hero-ucf / .hero-team-name | Separate responsive sizes for the two hero title parts. |
| .hero-project-button / .nav-links a | Rounded action buttons; navigation uses text-only hover/focus feedback. |
| .category-heading / .category-jumps | Gold-accented category headers and section jump buttons. |
| .conveyor-rail / .conveyor-card | Scrollable home team cards and hover states. |
| .team-timeline / .season-node | Horizontal season timeline. |
| .timeline-entry / .timeline-content / .timeline-dot | Timeline layout and nodes. |
| .site-footer / .footer-top | Shared contact footer layout. |

The hero backdrop is contained within its section. The latest-solution row stacks on mobile, profiles stack portrait above name, and team grids become one column at narrower widths. Sections use restrained charcoal gradients, fine borders, and small gold divider accents.

For a consistent custom font across operating systems, self-host a properly licensed WOFF2 file, define it with @font-face and font-display: swap, and update --font-body. Declare only font weights provided by that file.

## Motion

The main page uses the page-enter animation on reload or route changes. The hero heading uses title-reveal. The React main element is keyed by page/year/slug, so navigating to another season or profile replays its entrance. Clicking a link to the already-current route does not remount it.

The previous scroll-driven hero fade was removed so the heading remains readable while scrolling. All entry animations, decorative reels, and conveyor autoplay stop under prefers-reduced-motion. Hash-page navigation resets scroll position; solution-year navigation scrolls directly to its timeline entry.

## Verification and remaining content work

Run npm run lint and npm run build before publishing. Check home, a team season, a long-name profile, and solutions on narrow phones, tablets, and desktop. Exercise keyboard navigation, zoom, and reduced-motion settings. A successful build alone does not verify responsive layout.

- Real contact details and competition files still need to be supplied.
- Gallery imagery is remote placeholder content; replace it with approved team photos.
- Some older unused CSS for menus, FAQ, statistics, and principles remains in the stylesheet.
- If a deployment looks stale, rebuild and confirm the latest dist was published; inspect caching and failed asset requests.
- Review biographies, names, and external links before publishing. Code checks do not validate content accuracy.
