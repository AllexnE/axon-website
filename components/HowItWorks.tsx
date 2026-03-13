'use client'

export default function HowItWorks() {
  const layers = [
    {
      num: '01', icon: '📐', title: 'Deterministic Layer',
      desc: 'Blueprint DSL rules. Zero latency. Fully explainable — every decision traces to a single RULE directive.',
      chip: '100% explainable · zero latency', chipColor: '#10b981',
    },
    {
      num: '02', icon: '🧮', title: 'Local ML Layer',
      desc: 'TF-IDF filename tokenization + FuzzyScore semantic clustering + Thompson Sampling Beta(α,β). Fully offline — zero network calls.',
      chip: '↑ improves with every approval', chipColor: 'var(--v3)',
    },
    {
      num: '03', icon: '🐍', title: 'Online ML Bridge',
      desc: 'Optional scikit-learn SGDClassifier with partial_fit — local FastAPI server on port 5050. Trains on your project history.',
      chip: 'SGD + partial_fit · port 5050', chipColor: 'var(--b2)',
    },
  ]

  return (
    <section className="sec" id="how">
      <div className="wrap">
        <div className="rv">
          <div className="sec-eyebrow">// neural engine</div>
          <h2 className="sec-title">Three layers.<br /><span className="gtext">One intelligent decision.</span></h2>
          <p className="sec-sub">From fully explainable rules to online ML — 100% offline. Your code never leaves your machine.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 64 }}>
          {layers.map((l, i) => (
            <div key={i} className="rv" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div style={{
                background: 'var(--surf)', border: '1px solid var(--br3)',
                borderRadius: 'var(--r4)', padding: '40px 32px',
                position: 'relative', overflow: 'hidden',
                transition: 'all .35s',
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--br2)'; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 20px 60px rgba(0,0,0,.4)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = ''; el.style.transform = ''; el.style.boxShadow = '' }}
              >
                <div style={{ fontSize: 80, fontWeight: 900, letterSpacing: '-0.06em', color: 'rgba(255,255,255,.03)', position: 'absolute', top: 16, right: 24, lineHeight: 1 }}>{l.num}</div>
                <div style={{ fontSize: 36, marginBottom: 24 }}>{l.icon}</div>
                <h4 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>{l.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>{l.desc}</p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'var(--raised)', border: '1px solid var(--br3)',
                  borderRadius: 100, padding: '5px 14px',
                  fontFamily: 'var(--font-mono)', fontSize: 12, color: l.chipColor,
                }}>{l.chip}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
