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

Documentation-update validation: `npm ci` and `npm run build` succeeded with Node.js 24.14.1 and npm 11.11.0. `npm run lint` exited successfully with one existing unused-variable warning for `placeholderPhoto` in `src/App.jsx`. Responsive behavior and the suggested CSS patches below have not been browser-tested.

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
| `src/App.jsx` | Content arrays, hash routing, page components, filters, and scroll/drag behavior. |
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

`getRoute()` and `useHashRoute()` in `src/App.jsx` select pages from `window.location.hash`; there is no routing library.

| URL fragment | Result |
| --- | --- |
| Empty or `#home` | Home. |
| `#team` | Team directory with track filters and year sections. |
| `#team/2026` | Team directory, scrolling to that year if present; other years remain visible. |
| `#team/david-navarrete` | Profile identified by a member slug. Unknown slugs show “Member not found.” |
| `#solutions` | Solutions grouped by year. |
| `#solutions/2026` | Solutions directory, scrolling to that year if present. |

The parser also accepts `#/team`-style fragments. Unknown routes fall back to home. `SiteNav` is shared across pages; the footer appears only on home.

Home contains:

1. **Hero:** UCF/HSI title, Team and Solutions buttons, animated logo columns, and a scroll-driven fade on the hero copy.
2. **About:** competition description and four information panels.
3. **Latest solution:** newest solution title, summary, logo, and directory link.
4. **Current team:** members from `currentSeason`, grouped into professors, graduate advisors, captain, and members.
5. **Gallery:** five remotely hosted Unsplash entries; these are placeholder imagery rather than local team photos.
6. **Footer:** large team title and back-to-home link.

The team directory filters by `track`; cards are ordered by group and name. Entire cards link to profiles. Profiles show a portrait or initials, role, major, biography, focus, hometown, interests, and social links. The solutions directory currently contains one 2026 “In progress” entry.

## Updating content

Edit these values near the top of `src/App.jsx`:

| Value | Controls |
| --- | --- |
| `currentSeason` | Home's team year and the earliest year shown in directories. |
| `teamMembers` | Member details and profile pages. |
| `homeTeamGroups`, `memberGroupOrder` | Group labels and ordering. |
| `filterOptions` | Team track filters. |
| `solutions` | Solution years, titles, statuses, summaries, and highlight tags. |
| `photos` | Gallery URLs, alternative text, and layout sizes. |
| `appIcons`, `reelColumns` | Hero logos and animation directions. |

To add a member, copy an existing object and supply `slug`, `year`, `name`, `role`, `major`, `initials`, `track`, `memberGroup`, `photo`, `bio`, `hometown`, `focus`, `interests`, and `socials`. Use a unique slug; four-digit slugs are treated as years. Track values must match the filters exactly. Group keys are `professor`, `gradAdvisor`, `teamCaptain`, and `member`.

Place a portrait in `public/prof_pics/` and reference `/prof_pics/filename.ext`. Omitting `photo` displays initials. A broken photo URL does not automatically fall back to initials or the placeholder SVG. Empty social URLs are omitted.

For a solution, add `year`, `title`, `status`, `summary`, and a `highlights` array. The existing `link` field is not rendered: add an anchor in `SolutionsPage` when a demo link is ready. Keep at least one solution because home reads the latest entry directly.

**Archive caveat:** `getAvailableYears()` excludes years before `currentSeason`. Raising the season hides older teams and solutions from the directories. Change that filter to retain an archive. Member lookup uses only the slug, so repeating a slug across seasons opens the first match.

## Changing margins and mobile layout

The following are source-scan findings and suggested patches. They are not visual changes already applied or confirmation of a particular deployed site's behavior.

### Wide-screen gutters

`body` already has `margin: 0`. The gutters primarily come from repeated `max-width: 1400px; margin: auto` rules on `.site-nav`, `.hero`, `.section-pad`, `.icon-marquee`, and `footer` (also the unused `.stats-band`). Most sections add 32px horizontal padding, reduced to 18px below 700px.

At 1920px, a centered 1400px container leaves 260px outside each side before inner padding. This is controlled by CSS, not compilation.

Replace repeated widths with a shared variable, and reconcile existing mobile padding overrides:

```css
:root {
  --page-max: 1600px; /* Use 100% for an uncapped container. */
  --page-gutter: clamp(18px, 3vw, 48px);
}

.site-nav, .hero, .section-pad, .icon-marquee, .stats-band, footer {
  max-width: var(--page-max);
}

.site-nav, .hero, .section-pad, footer {
  padding-inline: var(--page-gutter);
}
```

Container width and text width are separate: `.hero-copy` caps at 900px and the mobile hero title at 340px. Keep paragraph widths readable even when the outer container fills the screen.

### Mobile issues to address

| Current rule / behavior | Likely effect and suggested change |
| --- | --- |
| `.section-project` remains a flex row with an 80px gap and a nonshrinking 280px image. | Latest-solution content can overflow. Stack it and scale the image on phones. |
| `overflow-x: hidden` on `html, body` below 700px | Can hide overflow by clipping content. Fix oversized children first. |
| `.member-detail-hero` keeps portrait and name side by side on mobile. | Long names have little room. Stack the header at narrow widths and allow wrapping. |
| Home team grids have one column but inherit odd/even two-column card spacing. | Alternating home cards retain different padding/borders above 700px. Reset these within `.home-team-group`. |
| `.nav-links` is hidden below 700px. | No replacement menu is rendered, despite menu CSS existing. Add visible mobile navigation on all pages. |
| `.hero-reel-wrap` is absolute but `.hero` is not positioned. | The background is not explicitly anchored to the hero. Position the hero and contain overflow. |
| Reel columns use `touch-action: none`. | Touches on the reel can interfere with normal scrolling. Review whether decorative columns need dragging on phones. |

A starting patch in `src/index.css`:

```css
.hero { position: relative; overflow: hidden; }
.section-project > div { min-width: 0; }

@media (max-width: 700px) {
  .section-project {
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
  }
  .section-app-icon {
    width: min(100%, 220px);
    height: auto;
    aspect-ratio: 1;
    padding: 32px;
  }
}

@media (max-width: 480px) {
  .member-detail-hero { grid-template-columns: minmax(0, 1fr); }
  .member-detail-hero h1 { overflow-wrap: anywhere; }
}
```

Test home, team, a long-name profile, and solutions at 320px, 375px, 390px, 768px, and wide desktop sizes, plus landscape and 200% zoom. Look for clipping, sideways scrolling, inaccessible navigation, and card misalignment. Compare development with a fresh production preview; compilation does not validate responsive layout.

## Improving subtitles and body text

Body text uses Arial/Helvetica, but many labels, roles, buttons, and metadata explicitly use Courier New at 10–13px. Paragraphs are often 14–15px. Changing only `body` will not override explicit `font:` shorthands.

A straightforward starting point is a native sans-serif stack, 16–18px paragraph text, and approximately 14px labels:

```css
:root {
  --font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

body { font-family: var(--font-body); }
button { font-family: inherit; }

.body-copy, .description-grid p, .member-bio,
.detail-panel p, .solution-card p {
  font-size: clamp(1rem, .95rem + .25vw, 1.125rem);
  line-height: 1.65;
}

.eyebrow, .section-label, .member-role, .detail-role,
.description-grid span {
  font-family: var(--font-body);
  font-size: .875rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: .025em;
}
```

Edit the original rules and their mobile overrides, including the 10px `.detail-role` rule. Search `Courier New` for other explicit font declarations. Keep the large heading's font separate if only supporting text should change. Larger type may show fewer words in the three-line-clamped `.member-bio`.

For a consistent font across devices, put a properly licensed WOFF2 font in `public/fonts/`, declare it with `@font-face` and `font-display: swap`, then use that family before the system fallback. Declare only weights the file actually supplies. Size, weight, line-height, and contrast matter more than font-smoothing properties; review gray text against the black background after changing it.

## Adding a title entrance animation

Logo reels already animate, and `HomePage` fades/translates `.hero-copy` as the user scrolls. There is no entrance animation on the title yet. A short wipe can reveal its full, wrapping text without changing layout:

```css
@keyframes title-reveal {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}

.hero h1 {
  animation: title-reveal 900ms cubic-bezier(.2, .7, .2, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .hero h1 { animation: none; clip-path: none; }
}
```

Add this to `src/index.css`. It runs when home mounts, including reloads and returning from another page. Clicking `#home` while already on home does not remount the title. Target the `h1` so the animation does not fight the scroll transform on `.hero-copy`. A once-per-session animation would need explicit session state.

A typewriter effect is possible, but inserting characters can shift wrapping and layout for this long title. Reserve its full dimensions, keep a complete accessible heading, hide changing visual text from screen readers, and skip the effect for reduced motion. Avoid a single-line `white-space: nowrap` treatment on mobile.

Existing reduced-motion CSS shortens CSS animations, but JavaScript still changes hero opacity/position on scroll and requests smooth scrolling for year links. Respect the same media preference in those JavaScript behaviors when improving motion accessibility.

## Other findings and troubleshooting

- Two gallery entries share a `src`, while React keys use `photo.src`. Add unique IDs to avoid duplicate keys.
- The gallery explicitly sizes only some rows; check implicit row heights when replacing images.
- Normal page navigation does not explicitly reset scroll position. Test navigating after scrolling down home; add route-aware scroll handling if needed.
- Menu, FAQ, principles, and stats CSS remains even though these components are not currently rendered.
- The favicon is a PNG declared with an SVG MIME type in `index.html`; change the type to `image/png` during metadata cleanup.
- If deployment looks stale, rebuild, confirm the latest `dist` was published, and check browser/CDN caching. Inspect failed asset requests and exact file paths.
- If a CSS edit does nothing, confirm you edited `src/index.css` and inspect later media queries and selector specificity.

Before publishing, review biographies, profile links, gallery imagery, and placeholder solution text. Lint/build checks verify code, not published content accuracy.
