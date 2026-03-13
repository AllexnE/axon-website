export interface DocSection {
  key: string
  label: string
  icon: string
  group: string
}

export const DOC_SECTIONS: DocSection[] = [
  { key: 'qs',        label: 'Quick Start',       icon: '🚀', group: 'Getting Started' },
  { key: 'inst',      label: 'Installation',      icon: '⬇',  group: 'Getting Started' },
  { key: 'first',     label: 'First Scan',        icon: '📁', group: 'Getting Started' },
  { key: 'dsl',       label: 'Blueprint DSL',     icon: '📘', group: 'Axon Struct' },
  { key: 'templates', label: 'Templates',         icon: '🗂',  group: 'Axon Struct' },
  { key: 'plan',      label: 'Plan Modes',        icon: '📋', group: 'Axon Struct' },
  { key: 'ai',        label: 'How AI Works',      icon: '🧠', group: 'AI Engine' },
  { key: 'bridge',    label: 'ML Bridge',         icon: '🐍', group: 'AI Engine' },
  { key: 'conf',      label: 'Confidence',        icon: '📊', group: 'AI Engine' },
  { key: 'rb',        label: 'Rollback',          icon: '↩',  group: 'Advanced' },
  { key: 'ci',        label: 'CI / GitHub Actions', icon: '⚙', group: 'Advanced' },
  { key: 'api',       label: 'Java API',          icon: '🔌', group: 'Advanced' },
]

export const DOC_CONTENT: Record<string, string> = {
  qs: `
    <h2>Quick Start</h2>
    <p>Get Axon Struct running on any project in under 2 minutes — zero configuration required.</p>
    <p><strong>GUI mode (recommended first run):</strong></p>
    <pre class="code-block"><span class="ck">$</span> mvn clean javafx:run</pre>
    <p>Click <code>📂 Scan</code> → select your project → <code>🔍 Detect</code> → <code>✅ Approve All</code> → <code>🚀 Execute</code>.</p>
    <p><strong>CLI mode:</strong></p>
    <pre class="code-block"><span class="ck">$</span> axon struct run --ai .          <span class="cd"># AI-powered</span>
<span class="ck">$</span> axon struct run --blueprint .   <span class="cd"># Blueprint rules</span>
<span class="ck">$</span> axon struct run --dry-run .     <span class="cd"># Preview only</span>
<span class="ck">$</span> axon struct rollback .          <span class="cd"># Undo last run</span></pre>
    <table class="docs-table">
      <thead><tr><th>Command</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>axon struct scan .</code></td><td>Scan and display file tree</td></tr>
        <tr><td><code>axon struct run --ai .</code></td><td>Full AI plan + execute</td></tr>
        <tr><td><code>axon struct rollback .</code></td><td>Reverse last execution</td></tr>
        <tr><td><code>axon struct validate blueprint.txt</code></td><td>Validate DSL syntax</td></tr>
        <tr><td><code>axon struct diagnose</code></td><td>Full system state dump</td></tr>
      </tbody>
    </table>`,

  inst: `
    <h2>Installation</h2>
    <p>Axon ships as a native jpackage installer. No JRE required — everything is bundled.</p>
    <p><strong>Native installers:</strong></p>
    <pre class="code-block">Windows:  axon-3.0.0-setup.exe   (~68 MB)
macOS:    axon-3.0.0.dmg         (~72 MB)
Linux:    axon-3.0.0.deb / .rpm  (~65 MB)</pre>
    <p><strong>Build from source (Java 21 + Maven 3.8+):</strong></p>
    <pre class="code-block"><span class="ck">$</span> git clone https://github.com/axon-platform/axon
<span class="ck">$</span> cd axon
<span class="ck">$</span> mvn clean install
<span class="ck">$</span> mvn javafx:run</pre>
    <p><strong>Python ML Bridge (optional — Pro feature):</strong></p>
    <pre class="code-block"><span class="ck">$</span> pip install axon-bridge
<span class="ck">$</span> axon-bridge start   <span class="cd"># port 5050</span></pre>`,

  first: `
    <h2>Your First Scan</h2>
    <p>A step-by-step walkthrough from zero.</p>
    <p><strong>Step 1</strong> — Open the GUI and click <code>📂 Scan Folder</code>. Select your project root.</p>
    <p><strong>Step 2</strong> — Click <code>🔍 Detect</code>. Axon identifies your stack from 13 templates and generates a blueprint automatically.</p>
    <p><strong>Step 3</strong> — Review the Plan Table. Green = MOVE, Blue = MKDIR, Red = DELETE. Red always requires explicit approval.</p>
    <p><strong>Step 4</strong> — Click <code>✅ Approve All</code> then <code>🚀 Execute</code>. Every operation SHA-256 verified in real time.</p>
    <p><strong>Step 5</strong> — Made a mistake? Click <code>↩ Rollback</code> to reverse every operation in exact reverse order.</p>`,

  dsl: `
    <h2>Blueprint DSL Reference</h2>
    <p>Commit an <code>axon-blueprint.txt</code> to your repo root. Every developer runs it once.</p>
    <table class="docs-table">
      <thead><tr><th>Directive</th><th>Example</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td><code>FOLDER</code></td><td><code>FOLDER src/main/java/</code></td><td>Create if missing</td></tr>
        <tr><td><code>RULE</code></td><td><code>RULE *.java → src/main/java/</code></td><td>Move matching files</td></tr>
        <tr><td><code>RULE DELETE</code></td><td><code>RULE *.bak → DELETE</code></td><td>Mark for deletion (approval required)</td></tr>
        <tr><td><code>CONFIDENCE</code></td><td><code>RULE *.md → docs/ CONFIDENCE 0.95</code></td><td>Override AI score</td></tr>
      </tbody>
    </table>
    <pre class="code-block"><span class="ck">FOLDER</span> src/main/java/
<span class="ck">FOLDER</span> src/test/java/

<span class="ck">RULE</span> <span class="cs">*Test.java</span>  → src/test/java/   <span class="cd">CONFIDENCE 0.97</span>
<span class="ck">RULE</span> <span class="cs">*.java</span>      → src/main/java/   <span class="cd">CONFIDENCE 0.93</span>
<span class="ck">RULE</span> <span class="cs">*.yml</span>       → src/main/resources/ <span class="cd">CONFIDENCE 0.98</span>
<span class="ck">RULE</span> <span class="cs">*.bak</span>       → <span style="color:#f87171">DELETE</span></pre>`,

  templates: `
    <h2>Project Templates</h2>
    <p>13 built-in templates. Run <code>axon struct detect .</code> to see which Axon picks.</p>
    <table class="docs-table">
      <thead><tr><th>Template</th><th>Detected by</th><th>Key folders</th></tr></thead>
      <tbody>
        <tr><td>Maven / Spring Boot</td><td>pom.xml</td><td>src/main/java, src/test, resources</td></tr>
        <tr><td>Gradle</td><td>build.gradle</td><td>src/main, src/test</td></tr>
        <tr><td>Node.js</td><td>package.json</td><td>src, lib, test, public</td></tr>
        <tr><td>Python</td><td>requirements.txt</td><td>src, tests, docs</td></tr>
        <tr><td>Flutter</td><td>pubspec.yaml</td><td>lib, test, assets</td></tr>
        <tr><td>Go</td><td>go.mod</td><td>cmd, pkg, internal</td></tr>
        <tr><td>Rust</td><td>Cargo.toml</td><td>src, tests, benches</td></tr>
        <tr><td>Android</td><td>AndroidManifest.xml</td><td>app/src/main, res</td></tr>
        <tr><td>C# / .NET</td><td>*.csproj</td><td>src, tests</td></tr>
        <tr><td>Data Science</td><td>*.ipynb</td><td>notebooks, data, models</td></tr>
        <tr><td>Monorepo</td><td>lerna.json</td><td>packages/, apps/</td></tr>
        <tr><td>Static Web</td><td>index.html</td><td>css, js, img, fonts</td></tr>
        <tr><td>Generic</td><td>fallback</td><td>src, docs, config</td></tr>
      </tbody>
    </table>`,

  plan: `
    <h2>Plan Modes</h2>
    <table class="docs-table">
      <thead><tr><th>Mode</th><th>Flag</th><th>How it works</th></tr></thead>
      <tbody>
        <tr><td><strong>AI</strong></td><td><code>--ai</code></td><td>TF-IDF + Thompson Sampling. Best for first scans.</td></tr>
        <tr><td><strong>Blueprint</strong></td><td><code>--blueprint</code></td><td>Pure DSL rules. Deterministic, team-shareable.</td></tr>
        <tr><td><strong>Hybrid</strong></td><td><code>--hybrid</code></td><td>Blueprint priority + AI fills gaps.</td></tr>
        <tr><td><strong>Dry Run</strong></td><td><code>--dry-run</code></td><td>Any mode previewed. Zero filesystem changes.</td></tr>
      </tbody>
    </table>`,

  ai: `
    <h2>How the AI Works</h2>
    <p><strong>Layer 1 — Deterministic (Blueprint DSL):</strong> Zero latency, fully explainable. Every decision traces to a single RULE line.</p>
    <p><strong>Layer 2 — Local ML (Thompson Sampling):</strong> TF-IDF tokenization splits filenames on camelCase, underscores, and dots. FuzzyScore clusters similar names. Thompson Sampling maintains Beta(α,β) per rule — α grows on approval, β on rejection. 100% offline.</p>
    <p><strong>Layer 3 — Online ML Bridge (optional):</strong> scikit-learn SGDClassifier with <code>partial_fit</code>. Trains incrementally on your execution history. Local FastAPI server at port 5050. Your data never leaves your machine.</p>`,

  bridge: `
    <h2>Python ML Bridge</h2>
    <pre class="code-block"><span class="ck">$</span> pip install axon-bridge fastapi uvicorn scikit-learn
<span class="ck">$</span> axon-bridge start
<span class="cd"># → Listening on http://localhost:5050</span></pre>
    <p><strong>Verify:</strong></p>
    <pre class="code-block"><span class="ck">$</span> axon struct diagnose
Bridge:   <span style="color:#34d399">✓ connected (port 5050)</span>
Accuracy: <span style="color:#34d399">0.91</span>  (after 47 executions)</pre>`,

  conf: `
    <h2>Confidence Scores</h2>
    <p>Confidence is sampled from a <strong>Beta(α,β) distribution</strong>.</p>
    <p>• <strong>α</strong> = approvals + 1 &nbsp;•&nbsp; <strong>β</strong> = rejections + 1</p>
    <p>New rule: Beta(1,1) — maximum uncertainty. After 10 approvals: Beta(11,1) — mean 0.917, std 0.081. Auto-approve threshold: ≥ 0.92 with std ≤ 0.15. DELETE is never auto-approved.</p>
    <pre class="code-block">MOVE UserService.java → service/  <span style="color:#fbbf24">[0.94 ± 0.08]</span>  <span style="color:#34d399">✓ auto-approve</span>
MOVE *.bak           → DELETE    <span style="color:#fbbf24">[0.05 ± 0.22]</span>  <span style="color:#f87171">⚠ manual required</span></pre>`,

  rb: `
    <h2>Rollback & Recovery</h2>
    <p>Every execution writes a JSONL journal at <code>.axon/journal-[timestamp].jsonl</code>.</p>
    <pre class="code-block"><span class="ck">$</span> axon struct rollback .
◆ Reading journal-1741699200.jsonl  (42 operations)
<span style="color:#34d399">✓</span> MOVE reversed: UserService.java ← service/
<span style="color:#34d399">✓</span> MOVE reversed: application.yml  ← config/
<span style="color:#34d399">✓</span> All 42 reversed in 280ms · SHA-256 verified (42/42)</pre>
    <p><strong>Important:</strong> DELETE operations cannot be rolled back — that's why they always require explicit approval.</p>`,

  ci: `
    <h2>CI / GitHub Actions</h2>
    <pre class="code-block"><span class="cd"># .github/workflows/axon.yml</span>
name: Axon Structure Check
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check structure
        uses: axon-platform/action@v1
        with:
          path: '.'
          mode: 'dry-run'
          fail-on-violations: true
          blueprint: 'axon-blueprint.txt'</pre>`,

  api: `
    <h2>Java API</h2>
    <pre class="code-block"><span class="cd">// Maven dependency</span>
&lt;dependency&gt;
  &lt;groupId&gt;<span class="cs">io.axon</span>&lt;/groupId&gt;
  &lt;artifactId&gt;<span class="cs">axon-struct-core</span>&lt;/artifactId&gt;
  &lt;version&gt;<span class="cs">3.0.0</span>&lt;/version&gt;
&lt;/dependency&gt;</pre>
    <pre class="code-block"><span class="ck">StructuraService</span> svc = <span class="ck">new</span> StructuraService();
svc.scan(Paths.get(<span class="cs">"/my/project"</span>));

MovePlan plan = svc.planFromAI();
plan.approveAll();
ExecutionResult r = svc.executeApproved();
svc.rollback();</pre>`,
}
