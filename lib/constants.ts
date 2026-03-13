// ─── Site Metadata ────────────────────────────────────
export const SITE = {
  name: 'Axon',
  tagline: 'Intelligence wired into every tool.',
  description:
    'Axon is the AI-first developer platform — five tools that scan, organize, protect, and evolve alongside every project you build.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://axon.dev',
  github: 'https://github.com/axon-platform/axon',
  email: 'hi@axon.dev',
  version: '3.0.0',
}

// ─── Navigation ──────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Products',     href: '/#products' },
  { label: 'Features',     href: '/#features' },
  { label: 'Intelligence', href: '/#how' },
  { label: 'Pricing',      href: '/pricing' },
  { label: 'Docs',         href: '/docs' },
  { label: 'Download',     href: '/download' },
]

// ─── Products ────────────────────────────────────────
export type ProductStatus = 'live' | 'beta' | 'soon'

export interface Product {
  id: string
  name: string
  icon: string
  status: ProductStatus
  tagline: string
  description: string
  color: string
  glowColor: string
  tags: string[]
  eta?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'struct',
    name: 'Axon Struct',
    icon: '🗂',
    status: 'live',
    tagline: 'AI-powered file organizer for developers.',
    description:
      'Scan any project. Struct detects the type, generates a blueprint, semantically clusters every file, and moves them with atomic rollback protection. The AI learns from every approval.',
    color: '#7c3aed',
    glowColor: 'rgba(124,58,237,0.15)',
    tags: ['Blueprint DSL', 'Thompson Sampling', 'SHA-256 Rollback', '13 Templates'],
  },
  {
    id: 'scout',
    name: 'Axon Scout',
    icon: '🔍',
    status: 'beta',
    tagline: 'Codebase intelligence & dead-code finder.',
    description:
      'Scout maps your entire dependency graph, surfaces unused imports, dead code, orphaned files, and circular dependencies. Sonar for your project structure.',
    color: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.12)',
    tags: ['Dead code', 'Dep graph', 'Circular deps', 'Orphan finder'],
  },
  {
    id: 'flow',
    name: 'Axon Flow',
    icon: '⚡',
    status: 'soon',
    tagline: 'AI-driven workflow automator.',
    description:
      'Define repeatable project workflows in plain DSL. Flow watches your filesystem and executes rules on change — a Makefile that actually understands your codebase semantics.',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.1)',
    tags: ['Watch mode', 'Workflow DSL', 'CI hooks'],
    eta: 'Q3 2026',
  },
  {
    id: 'guard',
    name: 'Axon Guard',
    icon: '🛡',
    status: 'soon',
    tagline: 'Filesystem security & integrity monitor.',
    description:
      'Watches critical directories, alerts on unexpected changes, and maintains a tamper-evident audit log with cryptographic verification of every file state.',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.1)',
    tags: ['Integrity', 'Audit log', 'Tamper detect'],
    eta: 'Q4 2026',
  },
  {
    id: 'lens',
    name: 'Axon Lens',
    icon: '🔬',
    status: 'soon',
    tagline: 'AI code reviewer & quality scorer.',
    description:
      'Reads your codebase and produces a structured quality report — complexity scores, naming consistency, test coverage heuristics, and AI-powered refactoring recommendations.',
    color: '#f43f5e',
    glowColor: 'rgba(244,63,94,0.1)',
    tags: ['Quality score', 'Complexity', 'Refactor AI'],
    eta: '2027',
  },
]

// ─── Pricing ─────────────────────────────────────────
export interface PricingTier {
  id: string
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  features: { label: string; included: boolean }[]
  cta: string
  ctaHref: string
  featured?: boolean
}

export const PRICING: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'The complete Axon Struct engine. No limits. No account required.',
    cta: 'Download Free',
    ctaHref: '/download',
    features: [
      { label: 'Axon Struct (complete)', included: true },
      { label: 'Blueprint DSL — unlimited rules', included: true },
      { label: '13 project templates', included: true },
      { label: 'AI plan — SmartRuleEngine', included: true },
      { label: 'Duplicate detection', included: true },
      { label: 'Atomic rollback + journal', included: true },
      { label: 'CLI + GUI', included: true },
      { label: 'Python ML bridge', included: false },
      { label: 'Axon Scout / Flow / Guard / Lens', included: false },
      { label: 'VS Code extension', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 9,
    annualPrice: 6,
    description: 'The complete neural stack. Every edge, every insight, every tool.',
    cta: 'Start Pro',
    ctaHref: '#',
    featured: true,
    features: [
      { label: 'Everything in Free', included: true },
      { label: 'Python ML bridge (SGD online)', included: true },
      { label: 'Axon Scout (beta access)', included: true },
      { label: 'Confidence history charts', included: true },
      { label: 'VS Code extension', included: true },
      { label: 'HTML / CSV plan export', included: true },
      { label: 'Blueprint export & share', included: true },
      { label: 'Team shared blueprints', included: false },
      { label: 'GitHub Actions workflow', included: false },
      { label: 'Axon Flow / Guard / Lens', included: false },
    ],
  },
  {
    id: 'team',
    name: 'Team',
    monthlyPrice: 29,
    annualPrice: 20,
    description: 'Shared intelligence. Every developer benefits from the team\'s approvals.',
    cta: 'Contact Sales',
    ctaHref: 'mailto:team@axon.dev',
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'Team shared blueprints', included: true },
      { label: 'GitHub Actions workflow', included: true },
      { label: 'Monorepo support', included: true },
      { label: 'CI/CD dry-run mode', included: true },
      { label: 'Axon Flow (early access)', included: true },
      { label: 'Team analytics dashboard', included: true },
      { label: 'Priority support', included: true },
      { label: 'Custom templates', included: true },
      { label: 'Slack / Discord alerts', included: true },
    ],
  },
]

// ─── Download Platforms ───────────────────────────────
export interface Platform {
  id: string
  icon: string
  name: string
  spec: string
  ext: string
  sizeMb: number
  installSteps: string[]
}

export const PLATFORMS: Platform[] = [
  {
    id: 'windows',
    icon: '🪟',
    name: 'Windows',
    spec: 'Windows 10 / 11 · x64',
    ext: '.exe',
    sizeMb: 68,
    installSteps: [
      'Run <strong>axon-3.0.0-setup.exe</strong> — no JRE needed',
      'Launch <strong>Axon Struct</strong> from the Start Menu',
      'Or use CLI: <code>axon struct run --ai .</code>',
    ],
  },
  {
    id: 'macos',
    icon: '🍎',
    name: 'macOS',
    spec: 'Universal — Intel + Apple Silicon',
    ext: '.dmg',
    sizeMb: 72,
    installSteps: [
      'Open <strong>axon-3.0.0.dmg</strong> and drag Axon → Applications',
      'First launch: right-click → Open (bypasses Gatekeeper)',
      'Or CLI: <code>axon struct run --ai .</code>',
    ],
  },
  {
    id: 'linux',
    icon: '🐧',
    name: 'Linux',
    spec: 'Ubuntu 20.04+ · Debian · Fedora',
    ext: '.deb',
    sizeMb: 65,
    installSteps: [
      'Install: <code>sudo dpkg -i axon-3.0.0.deb</code>',
      'Or build from source: <code>mvn clean javafx:run</code>',
      'RPM also available for Fedora / RHEL',
    ],
  },
]

// ─── Stats ────────────────────────────────────────────
export const STATS = [
  { value: 13,   suffix: '',  label: 'Project Templates' },
  { value: 5,    suffix: '',  label: 'Axon Tools' },
  { value: 99,   suffix: '%', label: 'Rollback Success Rate' },
  { value: 0,    suffix: '',  label: 'Files Auto-Deleted Ever' },
]

// ─── Testimonials ─────────────────────────────────────
export const TESTIMONIALS = [
  {
    stars: 5,
    text: 'We onboarded 3 engineers last month. Instead of a 2-hour walkthrough, we ran axon struct run --blueprint . and the repo organized itself. The blueprint is committed — it\'s part of our engineering standards now.',
    name: 'Rahul K.',
    role: 'lead-engineer · fintech',
    initials: 'RK',
    gradient: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
  },
  {
    stars: 5,
    text: 'The rollback is genuinely impressive. Ran a plan on the wrong folder, hit rollback — 200 files reversed in 300ms, every SHA-256 checksum verified. I\'ve never felt that safe making large filesystem changes.',
    name: 'Amira M.',
    role: 'senior-backend · b2b saas',
    initials: 'AM',
    gradient: 'linear-gradient(135deg,#10b981,#06b6d4)',
  },
  {
    stars: 5,
    text: 'The TF-IDF clustering actually understands the difference between UserService.java and UserServiceTest.java. It reads the semantic meaning. That\'s what sold me.',
    name: 'James L.',
    role: 'full-stack · open source',
    initials: 'JL',
    gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)',
  },
]

// ─── Marquee Tags ─────────────────────────────────────
export const MARQUEE_TAGS = [
  'Blueprint DSL', 'Thompson Sampling', 'Atomic Rollback',
  'SHA-256 Verified', '13 Templates', 'TF-IDF Clustering',
  'Java 21 Virtual Threads', '100% Offline', 'SGD Online Learning',
  'VS Code Extension', 'GitHub Actions', 'xxHash64 Duplicates',
]
