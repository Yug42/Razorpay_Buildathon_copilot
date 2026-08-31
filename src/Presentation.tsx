import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, BrainCircuit, Check, CreditCard, Gauge, LayoutDashboard,
  LockKeyhole, MessageCircle, RefreshCw, Search, ShieldCheck, Sparkles, Target,
  Wallet, X, Zap, type LucideIcon,
} from 'lucide-react';

interface Slide {
  id: number;
  eyebrow: string;
  title: string;
  render: () => ReactNode;
}

const slides: Slide[] = [
  {
    id: 0,
    eyebrow: 'Razorpay Copilot',
    title: 'One agent for every money decision.',
    render: () => (
      <div className="slide-hero">
        <div className="slide-hero-text">
          <p className="slide-lead">
            A unified AI control plane for growth, risk, recovery, and reconciliation —
            where every money decision is explainable, bounded, and audit-logged.
          </p>
          <div className="slide-hero-tags">
            <span><Sparkles size={13} /> Autonomous</span>
            <span><LockKeyhole size={13} /> Bounded by design</span>
            <span><BrainCircuit size={13} /> Judgment + guardrails</span>
          </div>
        </div>
        <div className="slide-hero-orb">
          <div className="orb-ring ring-1" />
          <div className="orb-ring ring-2" />
          <div className="orb-core"><Zap size={28} /></div>
        </div>
      </div>
    ),
  },
  {
    id: 1,
    eyebrow: 'The Problem',
    title: 'Merchants juggle four disconnected tools.',
    render: () => (
      <div className="slide-grid-2">
        <div className="slide-card pain">
          <h3>Today's reality</h3>
          <ul>
            <li>One dashboard for checkout, another for fraud, another for recovery, another for reconciliation</li>
            <li>AI features that act as black boxes — no reasoning, no audit trail</li>
            <li>Revenue leaks: failed payments, abandoned carts, unmatched settlements</li>
            <li>No shared memory across modules — each tool starts from scratch</li>
          </ul>
        </div>
        <div className="slide-card solution">
          <h3>Our answer</h3>
          <ul>
            <li>One agent, four modules, one shared Decision Log</li>
            <li>Every action shows its reasoning and confidence score</li>
            <li>Hard limits on automated retries, risk blocks, and money movement</li>
            <li>Human approval gate on every high-stakes decision</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    eyebrow: 'Tech Stack',
    title: 'Built with React, Zustand, and Tailwind.',
    render: () => (
      <div className="slide-stack">
        {[
          { icon: LayoutDashboard, name: 'React + TypeScript', desc: 'Single-page app, no routing library — page state is just useState' },
          { icon: BrainCircuit, name: 'Zustand', desc: 'One central store shared across all four modules' },
          { icon: Sparkles, name: 'Tailwind CSS', desc: 'Utility classes plus a custom dark fintech theme' },
          { icon: Zap, name: 'Vite', desc: 'Fast dev server, instant HMR, production build in ~10s' },
          { icon: ShieldCheck, name: 'lucide-react', desc: 'Every icon in the app, consistent visual language' },
        ].map((item) => (
          <div className="stack-row" key={item.name}>
            <div className="stack-icon"><item.icon size={18} /></div>
            <div>
              <strong>{item.name}</strong>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
        <div className="slide-note">
          Everything runs client-side — API responses are mocked with setTimeout to simulate
          400–900ms network latency. No backend, no database calls.
        </div>
      </div>
    ),
  },
  {
    id: 3,
    eyebrow: 'Architecture — The Shared Store',
    title: 'One Zustand store is the heart of the system.',
    render: () => (
      <div className="slide-store">
        <div className="store-diagram">
          <div className="store-core">
            <BrainCircuit size={22} />
            <strong>CopilotStore (Zustand)</strong>
          </div>
          <div className="store-arms">
            <div className="store-arm">
              <small>Data pool</small>
              <strong>transactions</strong>
              <span>72 synthetic merchant payments — UPI, Card, Netbanking, mixed statuses, ~15% injected fraud</span>
            </div>
            <div className="store-arm">
              <small>Data pool</small>
              <strong>settlements</strong>
              <span>63 Razorpay settlement records with intentional mismatches — fee gaps, date shifts, missing orders</span>
            </div>
            <div className="store-arm highlight">
              <small>Shared contract</small>
              <strong>Decision Log</strong>
              <span>Every module writes: what it decided, why, confidence, outcome, whether it was an exception</span>
            </div>
          </div>
        </div>
        <div className="store-schema">
          <code>{`{ id, timestamp, module, input_summary, reasoning,
  action_taken, confidence_score, outcome, was_exception }`}</code>
        </div>
        <div className="slide-note">
          Three live metrics also live in the store — recoveryRecovered, checkoutUpsellRevenue,
          reconciliationAccuracy — so the top Money Impact bar updates in real time as you interact.
        </div>
      </div>
    ),
  },
  {
    id: 4,
    eyebrow: 'Module 01 — Growth',
    title: 'Checkout Copilot',
    render: () => (
      <div className="slide-module">
        <div className="module-icon-row"><MessageCircle size={20} /> <span>Conversational checkout agent</span></div>
        <div className="slide-grid-2">
          <div className="slide-card">
            <h3>What it does</h3>
            <ol>
              <li>Customer types natural language — "I want the blue running shoes, size 9"</li>
              <li>Agent matches to a mock catalog, creates a Razorpay test order (order_id, amount, currency — shaped like the real Orders API)</li>
              <li>Offers one upsell — socks for ₹199, free over ₹2,000</li>
              <li>Simulates a UPI timeout, recovers: retries once, offers Card fallback</li>
              <li>Never auto-charges — explicit "Confirm ₹2,698 payment" button</li>
            </ol>
          </div>
          <div className="slide-card">
            <h3>Design principle</h3>
            <p>The chat is a <strong>state machine</strong> with stages:</p>
            <div className="state-flow">
              <span>start</span><ArrowRight size={14} />
              <span>order</span><ArrowRight size={14} />
              <span>payment</span><ArrowRight size={14} />
              <span>failed / confirm</span><ArrowRight size={14} />
              <span>done</span>
            </div>
            <p>Each transition logs to the store. A live audit trail panel beside the chat shows each decision as it happens.</p>
            <div className="slide-callout gold"><LockKeyhole size={14} /> Money movement is gated by explicit confirmation</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    eyebrow: 'Module 02 — Protection',
    title: 'Risk Sentinel',
    render: () => (
      <div className="slide-module">
        <div className="module-icon-row"><ShieldCheck size={20} /> <span>Transparent fraud scoring — not a black box</span></div>
        <div className="slide-grid-2">
          <div className="slide-card">
            <h3>How scoring works</h3>
            <ul>
              <li><strong>Velocity</strong> — multiple transactions same card/UPI within 12 minutes</li>
              <li><strong>Amount anomaly</strong> — z-score vs customer's average (threshold: 1.6x)</li>
              <li><strong>New device/location</strong> — device mismatch</li>
              <li><strong>Billing mismatch</strong> — billing details don't match</li>
              <li>Weighted and combined into a 0–99 score with a visible "why" per row</li>
            </ul>
          </div>
          <div className="slide-card">
            <h3>Honest ML metrics</h3>
            <p>Train/test split: every 5th record held out. Then precision, recall, and false-positive rate are computed from a <strong>real confusion matrix</strong> — not hardcoded.</p>
            <div className="metric-row">
              <div className="metric-chip green"><Target size={14} /> Precision</div>
              <div className="metric-chip blue"><Gauge size={14} /> Recall</div>
              <div className="metric-chip red"><ShieldCheck size={14} /> False-positive rate</div>
            </div>
            <div className="slide-callout red"><LockKeyhole size={14} /> Human-gated: high-risk shows "Approval needed" until toggle is flipped. No auto-block ever.</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    eyebrow: 'Module 03 — Recovery',
    title: 'Recovery Agent',
    render: () => (
      <div className="slide-module">
        <div className="module-icon-row"><RefreshCw size={20} /> <span>Bounded recovery workflow for revenue at risk</span></div>
        <div className="slide-grid-2">
          <div className="slide-card">
            <h3>What it does</h3>
            <ol>
              <li>Identifies at-risk items: failed payments, abandoned checkouts, overdue B2B receivables</li>
              <li>Classifies root cause per item — "insufficient funds", "bank timeout", "abandoned at OTP step"</li>
              <li>Picks <strong>one action</strong> from a fixed set: retry link, send reminder, offer alternate method, escalate to human</li>
              <li>Funnel view: Total at-risk → Attempted → Recovered → Still failing</li>
            </ol>
          </div>
          <div className="slide-card">
            <h3>Stopping rules are visible</h3>
            <div className="rule-list">
              <div className="rule-item"><span>01</span><div><strong>Max 2 automated retries</strong><p>After two attempts, the agent stops and escalates.</p></div><Check size={16} /></div>
              <div className="rule-item"><span>02</span><div><strong>One action per item</strong><p>No action chaining or automatic discounting.</p></div><Check size={16} /></div>
              <div className="rule-item"><span>03</span><div><strong>B2B overdue → human</strong><p>Receivables are escalated, never auto-collected.</p></div><Check size={16} /></div>
            </div>
            <div className="slide-callout gold"><Zap size={14} /> "Run batch" processes items with staggered 120ms animation, ending in a measured summary</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    eyebrow: 'Module 04 — Reconciliation',
    title: 'Finance Reconciler',
    render: () => (
      <div className="slide-module">
        <div className="module-icon-row"><Wallet size={20} /> <span>Close the loop between ledger and settlements</span></div>
        <div className="slide-grid-2">
          <div className="slide-card">
            <h3>How matching works</h3>
            <ul>
              <li>Two synthetic datasets: 60 ledger records + 63 settlement records — ~10-15% intentionally mismatched</li>
              <li><strong>Real matching code</strong>: compares order_id + exact amount + date within 3-day proximity</li>
              <li>Uses a Set to track used settlements — no double-matching</li>
              <li>Reports: match rate %, auto-matched count, total ₹ reconciled, and unresolved exceptions</li>
            </ul>
          </div>
          <div className="slide-card">
            <h3>Honest reporting</h3>
            <p>Match rate <strong>never hits 100%</strong> — genuine exceptions remain visible to prove no cherry-picking.</p>
            <div className="exception-preview">
              <div className="ex-row"><strong>order_8403</strong><span>₹1,299</span><small>Amount mismatch ₹2 — likely fee</small></div>
              <div className="ex-row"><strong>order_8414</strong><span>₹2,499</span><small>No corresponding settlement found</small></div>
              <div className="ex-row"><strong>order_8427</strong><span>₹4,599</span><small>Date shifted beyond 3-day tolerance</small></div>
            </div>
            <div className="slide-callout blue"><BrainCircuit size={14} /> Deterministic rule: order_id + amount + date proximity — transparent and repeatable</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    eyebrow: 'The Overview',
    title: 'The command center.',
    render: () => (
      <div className="slide-overview">
        <div className="overview-features">
          <div className="ov-feature"><LayoutDashboard size={18} /><div><strong>Hero section</strong><p>One-line product pitch with animated orb</p></div></div>
          <div className="ov-feature"><Gauge size={18} /><div><strong>4 live stat cards</strong><p>Actions today, success rate, revenue protected, active exceptions — computed from the store</p></div></div>
          <div className="ov-feature"><Search size={18} /><div><strong>Decision Log table</strong><p>Unified feed across all modules with search and filter</p></div></div>
          <div className="ov-feature"><BrainCircuit size={18} /><div><strong>Module pulse</strong><p>Quick navigation with live status dots</p></div></div>
        </div>
        <div className="slide-callout gold" style={{ marginTop: '24px' }}><Sparkles size={14} /> The Money Impact bar at the top updates in real time as you interact with any module</div>
      </div>
    ),
  },
  {
    id: 9,
    eyebrow: 'Safety Model',
    title: 'Three layers of guardrails.',
    render: () => (
      <div className="slide-safety">
        <div className="safety-layer">
          <div className="safety-number gold">01</div>
          <div className="safety-body">
            <strong>AI judgment</strong>
            <p>Interprets checkout language, classifies payment root causes, and explains the signals behind a recommendation. It never moves money by itself.</p>
            <small>Example: Checkout parses "blue running shoes size 9"</small>
          </div>
        </div>
        <div className="safety-layer">
          <div className="safety-number blue">02</div>
          <div className="safety-body">
            <strong>Deterministic rules</strong>
            <p>Order payload shapes, risk scoring weights, retry limits, date windows, and reconciliation matching are transparent and repeatable.</p>
            <small>Example: Risk scoring weights, retry limits, date windows</small>
          </div>
        </div>
        <div className="safety-layer">
          <div className="safety-number green">03</div>
          <div className="safety-body">
            <strong>Human-gated actions</strong>
            <p>High-risk verification and high-stakes receivables stop for a person. Checkout requires an explicit payment confirmation.</p>
            <small>Example: Risk approval toggle, payment confirm button</small>
          </div>
        </div>
        <div className="safety-summary">
          Every money action must be: <strong>explainable</strong> · <strong>bounded</strong> · <strong>gated</strong> · <strong>audit-trailed</strong>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    eyebrow: 'Design System',
    title: 'A premium dark fintech aesthetic.',
    render: () => (
      <div className="slide-design">
        <div className="design-swatches">
          <div className="swatch" style={{ background: '#0a0a0a' }}><span>Background</span><small>#0a0a0a</small></div>
          <div className="swatch" style={{ background: '#f5f0e8' }}><span>Text</span><small>#f5f0e8</small></div>
          <div className="swatch" style={{ background: '#d4a574' }}><span>Accent / Gold</span><small>#d4a574</small></div>
          <div className="swatch" style={{ background: '#0f4c81' }}><span>Brand Blue</span><small>#0f4c81</small></div>
          <div className="swatch" style={{ background: '#72c996' }}><span>Success</span><small>#72c996</small></div>
          <div className="swatch" style={{ background: '#d98676' }}><span>Warning</span><small>#d98676</small></div>
        </div>
        <div className="design-details">
          <div className="dd-row"><strong>Fonts</strong><p>DM Sans for body, Space Grotesk for headings — 3 weights max</p></div>
          <div className="dd-row"><strong>Spacing</strong><p>Consistent 8px grid system throughout</p></div>
          <div className="dd-row"><strong>Responsive</strong><p>Sidebar collapses to drawer on mobile, grids reflow, tables hide secondary columns</p></div>
          <div className="dd-row"><strong>Animations</strong><p>Staggered recovery processing, typing indicators, hover transitions, confidence bars</p></div>
        </div>
        <div className="slide-note">Inspired by Linear and Stripe dashboards — meticulous attention to detail, intuitive UX, clean visual hierarchy.</div>
      </div>
    ),
  },
  {
    id: 11,
    eyebrow: 'Honest Limitations',
    title: 'Designed to show its own seams.',
    render: () => (
      <div className="slide-limits">
        <div className="limit-card">
          <CreditCard size={20} />
          <div>
            <strong>Reconciliation matching</strong>
            <p>Uses amount + date proximity. True UTR-based matching would need live bank data we don't have in test mode.</p>
          </div>
        </div>
        <div className="limit-card">
          <ShieldCheck size={20} />
          <div>
            <strong>Risk scoring</strong>
            <p>Rule-based, not a trained ML model. The confusion matrix is real, but the features are hand-weighted — not learned.</p>
          </div>
        </div>
        <div className="limit-card">
          <RefreshCw size={20} />
          <div>
            <strong>Recovery rates</strong>
            <p>The 38% recovery figure is a simulated outcome. Real recovery depends on payment gateway retry behavior and customer response.</p>
          </div>
        </div>
        <div className="limit-card">
          <BrainCircuit size={20} />
          <div>
            <strong>AI judgment</strong>
            <p>Catalog matching and root-cause classification use deterministic patterns, not an LLM. The architecture is ready for one, but it's not wired in this demo.</p>
          </div>
        </div>
        <div className="slide-callout gold" style={{ marginTop: '20px' }}><Sparkles size={14} /> The footer says it plainly — this is intentional, not a bug</div>
      </div>
    ),
  },
  {
    id: 12,
    eyebrow: 'Summary',
    title: 'Judgment with guardrails.',
    render: () => (
      <div className="slide-summary">
        <div className="summary-pillars">
          <div className="pillar"><BrainCircuit size={24} /><strong>One agent</strong><p>Four modules, one shared Decision Log, one control plane</p></div>
          <div className="pillar"><LockKeyhole size={24} /><strong>Bounded by design</strong><p>Hard limits on retries, risk blocks, and money movement</p></div>
          <div className="pillar"><ShieldCheck size={24} /><strong>Explainable</strong><p>Every action shows reasoning, confidence, and outcome</p></div>
          <div className="pillar"><Check size={24} /><strong>Honest</strong><p>Metrics computed from real data — exceptions stay visible</p></div>
        </div>
        <div className="slide-closing">
          <Zap size={20} />
          <p>Razorpay Copilot — making every money decision explainable and bounded.</p>
        </div>
      </div>
    ),
  },
];

export default function Presentation({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const next = () => setCurrent((c) => Math.min(c + 1, total - 1));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const slide = slides[current];

  return (
    <div className="presentation">
      <div className="pres-topbar">
        <div className="pres-brand"><div className="brand-mark"><Zap size={14} /></div><strong>Razorpay</strong><span>Copilot · Presentation</span></div>
        <div className="pres-controls">
          <button className="pres-nav" onClick={prev} disabled={current === 0}><ArrowLeft size={16} /></button>
          <span className="pres-counter">{current + 1} / {total}</span>
          <button className="pres-nav" onClick={next} disabled={current === total - 1}><ArrowRight size={16} /></button>
          <button className="pres-close" onClick={onClose}><X size={16} /> Exit</button>
        </div>
      </div>

      <div className="pres-stage" key={current}>
        <div className="pres-eyebrow">{slide.eyebrow}</div>
        <h1 className="pres-title">{slide.title}</h1>
        <div className="pres-content">{slide.render()}</div>
      </div>

      <div className="pres-progress">
        <div className="pres-progress-bar" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </div>
    </div>
  );
}
