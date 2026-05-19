import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Icons (inline SVG for zero-dependency) ───────────────────────────────────
const Icon = {
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Coins: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/>
      <path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Layers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Key: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Loader: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
      <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  ),
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  LogOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.47 2 2 0 0 1 3.56 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l1.2-1.2a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;700&family=Roboto:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #1a73e8;
    --blue-dark: #1557b0;
    --blue-light: #e8f0fe;
    --teal: #00897b;
    --teal-light: #e0f2f1;
    --green: #34a853;
    --green-light: #e6f4ea;
    --red: #ea4335;
    --red-light: #fce8e6;
    --yellow: #fbbc04;
    --yellow-light: #fef7e0;
    --gray-50: #f8f9fa;
    --gray-100: #f1f3f4;
    --gray-200: #e8eaed;
    --gray-300: #dadce0;
    --gray-400: #bdc1c6;
    --gray-500: #9aa0a6;
    --gray-600: #80868b;
    --gray-700: #5f6368;
    --gray-800: #3c4043;
    --gray-900: #202124;
    --font: 'Google Sans', 'Roboto', sans-serif;
    --font-display: 'Google Sans Display', 'Google Sans', sans-serif;
    --radius: 8px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
    --shadow: 0 2px 8px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
    --shadow-xl: 0 24px 64px rgba(0,0,0,0.14);
    --transition: 0.22s cubic-bezier(0.4,0,0.2,1);
  }

  body { font-family: var(--font); color: var(--gray-900); background: #fff; }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(16px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }

  .page { min-height: 100vh; overflow-x: hidden; }

  /* NAVBAR */
  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px; height: 64px;
    background: rgba(255,255,255,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--gray-200);
    transition: box-shadow var(--transition);
  }
  .nav.scrolled { box-shadow: var(--shadow); }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .nav-logo-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #1a73e8 0%, #00897b 100%);
    display: flex; align-items: center; justify-content: center; color: #fff;
    animation: pulse 3s ease-in-out infinite;
  }
  .nav-logo-icon svg { width: 18px; height: 18px; }
  .nav-brand { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--gray-900); }
  .nav-brand span { color: var(--blue); }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link {
    padding: 8px 16px; border-radius: var(--radius); font-size: 14px; font-weight: 500;
    color: var(--gray-700); cursor: pointer; transition: all var(--transition);
    background: none; border: none; font-family: var(--font);
  }
  .nav-link:hover { color: var(--blue); background: var(--blue-light); }
  .nav-actions { display: flex; align-items: center; gap: 10px; }
  .btn-ghost {
    padding: 8px 18px; border-radius: var(--radius); font-size: 14px; font-weight: 500;
    color: var(--blue); cursor: pointer; transition: all var(--transition);
    background: none; border: 1px solid var(--gray-300); font-family: var(--font);
  }
  .btn-ghost:hover { background: var(--blue-light); border-color: var(--blue); }
  .btn-primary {
    padding: 8px 20px; border-radius: var(--radius); font-size: 14px; font-weight: 500;
    color: #fff; cursor: pointer; transition: all var(--transition);
    background: var(--blue); border: none; font-family: var(--font);
    display: flex; align-items: center; gap: 6px;
  }
  .btn-primary:hover { background: var(--blue-dark); box-shadow: 0 2px 8px rgba(26,115,232,0.35); }
  .btn-primary:active { transform: scale(0.97); }
  .btn-icon {
    width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: var(--gray-600); cursor: pointer; background: none; border: none; transition: all var(--transition);
  }
  .btn-icon:hover { background: var(--gray-100); color: var(--red); }
  .btn-icon svg { width: 18px; height: 18px; }
  .ham { display: none; }

  /* HERO */
  .hero {
    padding: 80px 24px 96px;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, #fff 0%, var(--gray-50) 100%);
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle at 20% 30%, rgba(26,115,232,0.07) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(0,137,123,0.06) 0%, transparent 50%);
    pointer-events: none;
  }
  .hero-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; border-radius: 100px;
    background: var(--blue-light); color: var(--blue);
    font-size: 13px; font-weight: 500; margin-bottom: 28px;
    animation: fadeUp 0.5s ease both;
  }
  .hero-chip svg { width: 14px; height: 14px; }
  .hero h1 {
    font-family: var(--font-display); font-size: clamp(36px, 6vw, 68px);
    font-weight: 700; line-height: 1.1; letter-spacing: -1px;
    color: var(--gray-900); margin-bottom: 24px; max-width: 860px; margin-left: auto; margin-right: auto;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero h1 .gradient-text {
    background: linear-gradient(135deg, #1a73e8 0%, #00897b 60%, #34a853 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: gradientShift 4s ease infinite;
  }
  .hero-desc {
    font-size: clamp(16px, 2vw, 19px); color: var(--gray-600); max-width: 580px;
    margin: 0 auto 40px; line-height: 1.65;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-cta {
    display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .btn-hero-primary {
    padding: 14px 32px; border-radius: 100px; font-size: 15px; font-weight: 600;
    color: #fff; cursor: pointer; transition: all var(--transition);
    background: linear-gradient(135deg, var(--blue) 0%, #0d5ece 100%);
    border: none; font-family: var(--font);
    box-shadow: 0 4px 20px rgba(26,115,232,0.35);
    display: flex; align-items: center; gap: 8px;
  }
  .btn-hero-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,115,232,0.42); }
  .btn-hero-primary svg { width: 16px; height: 16px; }
  .btn-hero-secondary {
    padding: 14px 32px; border-radius: 100px; font-size: 15px; font-weight: 500;
    color: var(--gray-800); cursor: pointer; transition: all var(--transition);
    background: #fff; border: 1px solid var(--gray-300); font-family: var(--font);
    display: flex; align-items: center; gap: 8px;
  }
  .btn-hero-secondary:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-2px); box-shadow: var(--shadow); }
  .btn-hero-secondary svg { width: 16px; height: 16px; }
  .hero-stats {
    display: flex; align-items: center; justify-content: center; gap: 48px;
    margin-top: 64px; padding-top: 40px; border-top: 1px solid var(--gray-200);
    animation: fadeUp 0.6s 0.4s ease both;
    flex-wrap: wrap;
  }
  .hero-stat { text-align: center; }
  .hero-stat-num { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--gray-900); }
  .hero-stat-label { font-size: 13px; color: var(--gray-500); margin-top: 4px; }
  .hero-visual {
    margin-top: 64px;
    display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.5s ease both;
  }
  .code-block {
    background: var(--gray-900); color: #e8eaed; border-radius: var(--radius-lg);
    padding: 20px 24px; font-family: 'Roboto Mono', monospace; font-size: 13px;
    text-align: left; line-height: 1.7; min-width: 280px; max-width: 340px;
    box-shadow: var(--shadow-lg);
  }
  .code-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 6px; }
  .code-comment { color: #9aa0a6; }
  .code-key { color: #89b4fa; }
  .code-str { color: #a6e3a1; }
  .code-num { color: #fab387; }
  .code-cursor { display: inline-block; width: 2px; height: 14px; background: var(--blue); vertical-align: middle; animation: blink 1s step-end infinite; }

  /* SECTION */
  .section { padding: 80px 24px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 14px; border-radius: 100px;
    font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
    margin-bottom: 16px;
  }
  .chip-blue { background: var(--blue-light); color: var(--blue); }
  .chip-teal { background: var(--teal-light); color: var(--teal); }
  .chip-green { background: var(--green-light); color: var(--green); }
  .section-title {
    font-family: var(--font-display); font-size: clamp(26px, 4vw, 42px);
    font-weight: 700; color: var(--gray-900); margin-bottom: 16px; line-height: 1.2;
  }
  .section-desc { font-size: 17px; color: var(--gray-600); max-width: 560px; line-height: 1.65; }
  .text-center { text-align: center; }
  .text-center .section-desc { margin: 0 auto; }

  /* FEATURES GRID */
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px; margin-top: 56px;
  }
  .feature-card {
    padding: 28px; border-radius: var(--radius-lg); border: 1px solid var(--gray-200);
    background: #fff; transition: all var(--transition); cursor: default;
    position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity var(--transition);
    background: linear-gradient(135deg, rgba(26,115,232,0.04) 0%, rgba(0,137,123,0.04) 100%);
  }
  .feature-card:hover { border-color: var(--blue); box-shadow: var(--shadow-lg); transform: translateY(-4px); }
  .feature-card:hover::before { opacity: 1; }
  .feature-icon {
    width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px; transition: transform var(--transition);
  }
  .feature-card:hover .feature-icon { transform: scale(1.1); }
  .feature-icon svg { width: 22px; height: 22px; }
  .icon-blue { background: var(--blue-light); color: var(--blue); }
  .icon-teal { background: var(--teal-light); color: var(--teal); }
  .icon-green { background: var(--green-light); color: var(--green); }
  .icon-yellow { background: var(--yellow-light); color: #b06c00; }
  .icon-red { background: var(--red-light); color: var(--red); }
  .feature-title { font-size: 17px; font-weight: 600; color: var(--gray-900); margin-bottom: 8px; }
  .feature-desc { font-size: 14px; color: var(--gray-600); line-height: 1.6; }

  /* HOW IT WORKS */
  .steps-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0; margin-top: 56px; position: relative;
  }
  .step {
    text-align: center; padding: 32px 24px; position: relative;
  }
  .step:not(:last-child)::after {
    content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%);
    width: 1px; height: 50%; background: var(--gray-200);
  }
  .step-num {
    width: 52px; height: 52px; border-radius: 50%; border: 2px solid var(--blue);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--blue);
    margin: 0 auto 20px; background: var(--blue-light);
  }
  .step-title { font-size: 16px; font-weight: 600; color: var(--gray-900); margin-bottom: 8px; }
  .step-desc { font-size: 13px; color: var(--gray-600); line-height: 1.6; }

  /* PRICING */
  .pricing-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px; margin-top: 56px; align-items: start;
  }
  .pricing-card {
    padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--gray-200);
    background: #fff; transition: all var(--transition); position: relative; overflow: hidden;
  }
  .pricing-card.featured {
    border-color: var(--blue); box-shadow: 0 0 0 1px var(--blue), var(--shadow-lg);
  }
  .pricing-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .pricing-badge {
    position: absolute; top: 20px; right: 20px;
    background: var(--blue); color: #fff; font-size: 11px; font-weight: 600;
    padding: 3px 10px; border-radius: 100px; letter-spacing: 0.3px;
  }
  .pricing-plan { font-size: 13px; font-weight: 600; color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
  .pricing-price { font-family: var(--font-display); font-size: 40px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; }
  .pricing-price sup { font-size: 20px; vertical-align: top; margin-top: 10px; display: inline-block; }
  .pricing-price span { font-size: 14px; color: var(--gray-500); font-weight: 400; }
  .pricing-desc { font-size: 14px; color: var(--gray-600); margin-bottom: 24px; line-height: 1.5; }
  .pricing-divider { height: 1px; background: var(--gray-200); margin-bottom: 20px; }
  .pricing-feature { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 14px; color: var(--gray-700); }
  .pricing-feature svg { width: 16px; height: 16px; color: var(--green); flex-shrink: 0; }
  .btn-pricing {
    width: 100%; padding: 12px; border-radius: var(--radius); font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all var(--transition); font-family: var(--font); margin-top: 24px;
  }
  .btn-pricing-outline { background: none; border: 1px solid var(--gray-300); color: var(--gray-800); }
  .btn-pricing-outline:hover { border-color: var(--blue); color: var(--blue); }
  .btn-pricing-filled { background: var(--blue); border: none; color: #fff; }
  .btn-pricing-filled:hover { background: var(--blue-dark); box-shadow: 0 4px 16px rgba(26,115,232,0.3); }

  /* TESTIMONIALS */
  .testimonials-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px; margin-top: 56px;
  }
  .testimonial-card {
    padding: 28px; border-radius: var(--radius-lg); background: var(--gray-50);
    border: 1px solid var(--gray-200); transition: all var(--transition);
  }
  .testimonial-card:hover { background: #fff; box-shadow: var(--shadow); }
  .testimonial-stars { color: var(--yellow); font-size: 18px; margin-bottom: 16px; letter-spacing: 2px; }
  .testimonial-text { font-size: 15px; color: var(--gray-700); line-height: 1.65; margin-bottom: 20px; font-style: italic; }
  .testimonial-author { display: flex; align-items: center; gap: 12px; }
  .testimonial-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 600; flex-shrink: 0;
  }
  .testimonial-name { font-size: 14px; font-weight: 600; color: var(--gray-900); }
  .testimonial-role { font-size: 12px; color: var(--gray-500); }

  /* CTA BANNER */
  .cta-section {
    padding: 80px 24px;
    background: linear-gradient(135deg, #1a73e8 0%, #1557b0 60%, #00897b 100%);
    position: relative; overflow: hidden;
  }
  .cta-section::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle at 10% 50%, rgba(255,255,255,0.08) 0%, transparent 40%),
                      radial-gradient(circle at 90% 50%, rgba(255,255,255,0.06) 0%, transparent 40%);
    pointer-events: none;
  }
  .cta-inner { max-width: 740px; margin: 0 auto; text-align: center; position: relative; }
  .cta-inner h2 { font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: #fff; margin-bottom: 16px; }
  .cta-inner p { font-size: 17px; color: rgba(255,255,255,0.82); margin-bottom: 40px; line-height: 1.6; }
  .cta-btns { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
  .btn-white { padding: 14px 32px; border-radius: 100px; font-size: 15px; font-weight: 600; color: var(--blue); background: #fff; border: none; cursor: pointer; font-family: var(--font); transition: all var(--transition); }
  .btn-white:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.2); transform: translateY(-2px); }
  .btn-white-outline { padding: 14px 32px; border-radius: 100px; font-size: 15px; font-weight: 500; color: #fff; background: transparent; border: 1.5px solid rgba(255,255,255,0.5); cursor: pointer; font-family: var(--font); transition: all var(--transition); }
  .btn-white-outline:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

  /* FOOTER */
  .footer { background: var(--gray-900); color: var(--gray-300); padding: 64px 24px 32px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 56px; }
  .footer-brand h3 { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 12px; }
  .footer-brand h3 span { color: #89b4fa; }
  .footer-brand p { font-size: 14px; line-height: 1.7; color: var(--gray-400); max-width: 280px; }
  .footer-social { display: flex; gap: 12px; margin-top: 20px; }
  .social-btn {
    width: 36px; height: 36px; border-radius: 8px; background: var(--gray-800);
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    transition: all var(--transition); color: var(--gray-400); border: none;
  }
  .social-btn:hover { background: var(--blue); color: #fff; }
  .social-btn svg { width: 16px; height: 16px; }
  .footer-col h4 { font-size: 13px; font-weight: 600; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }
  .footer-link { display: block; font-size: 14px; color: var(--gray-400); margin-bottom: 10px; cursor: pointer; transition: color var(--transition); background: none; border: none; font-family: var(--font); text-align: left; }
  .footer-link:hover { color: #fff; }
  .footer-contact { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--gray-400); margin-bottom: 10px; }
  .footer-contact svg { width: 14px; height: 14px; flex-shrink: 0; }
  .footer-bottom { border-top: 1px solid var(--gray-800); padding-top: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: gap; gap: 12px; }
  .footer-copy { font-size: 13px; color: var(--gray-600); }
  .footer-bottom-links { display: flex; gap: 20px; }
  .footer-bottom-link { font-size: 13px; color: var(--gray-600); cursor: pointer; transition: color var(--transition); background: none; border: none; font-family: var(--font); }
  .footer-bottom-link:hover { color: var(--gray-300); }

  /* MODALS */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px;
    background: rgba(0,0,0,0.48); backdrop-filter: blur(6px);
    animation: fadeIn 0.2s ease both;
  }
  .modal {
    background: #fff; border-radius: var(--radius-xl); width: 100%; max-width: 440px;
    overflow: hidden; box-shadow: var(--shadow-xl);
    animation: fadeUp 0.3s ease both;
    position: relative;
  }
  .modal-header {
    padding: 28px 28px 0;
    display: flex; align-items: flex-start; justify-content: space-between;
  }
  .modal-icon {
    width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }
  .modal-icon svg { width: 24px; height: 24px; }
  .modal-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--gray-900); margin-bottom: 6px; }
  .modal-subtitle { font-size: 14px; color: var(--gray-600); }
  .modal-close { background: none; border: none; cursor: pointer; color: var(--gray-400); padding: 4px; border-radius: 6px; transition: all var(--transition); }
  .modal-close:hover { color: var(--gray-900); background: var(--gray-100); }
  .modal-close svg { width: 20px; height: 20px; }
  .modal-body { padding: 24px 28px 28px; }
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 13px; font-weight: 500; color: var(--gray-700); margin-bottom: 6px; }
  .form-input {
    width: 100%; padding: 10px 14px; border-radius: var(--radius); border: 1px solid var(--gray-300);
    font-size: 14px; color: var(--gray-900); font-family: var(--font);
    transition: all var(--transition); background: #fff; outline: none;
  }
  .form-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,115,232,0.12); }
  .form-select {
    width: 100%; padding: 10px 14px; border-radius: var(--radius); border: 1px solid var(--gray-300);
    font-size: 14px; color: var(--gray-900); font-family: var(--font);
    transition: all var(--transition); background: #fff; outline: none; cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239aa0a6' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
  }
  .form-select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,115,232,0.12); }
  .btn-submit {
    width: 100%; padding: 12px; border-radius: var(--radius); font-size: 15px; font-weight: 600;
    color: #fff; background: var(--blue); border: none; cursor: pointer; font-family: var(--font);
    transition: all var(--transition); display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 8px;
  }
  .btn-submit:hover:not(:disabled) { background: var(--blue-dark); box-shadow: 0 4px 16px rgba(26,115,232,0.32); }
  .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
  .btn-submit svg { width: 18px; height: 18px; }
  .modal-footer { border-top: 1px solid var(--gray-200); padding: 16px 28px; display: flex; align-items: center; justify-content: center; }
  .modal-footer-text { font-size: 14px; color: var(--gray-600); }
  .modal-footer-link { color: var(--blue); font-weight: 500; cursor: pointer; background: none; border: none; font-family: var(--font); font-size: 14px; }
  .modal-footer-link:hover { text-decoration: underline; }
  .modal-tabs { display: flex; border-bottom: 1px solid var(--gray-200); }
  .modal-tab {
    flex: 1; padding: 14px; font-size: 14px; font-weight: 500; cursor: pointer;
    color: var(--gray-600); background: none; border: none; font-family: var(--font);
    transition: all var(--transition); border-bottom: 2px solid transparent; margin-bottom: -1px;
  }
  .modal-tab.active { color: var(--blue); border-bottom-color: var(--blue); }
  .role-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .role-card {
    padding: 14px; border-radius: var(--radius); border: 1.5px solid var(--gray-200);
    cursor: pointer; transition: all var(--transition); text-align: center;
  }
  .role-card.selected { border-color: var(--blue); background: var(--blue-light); }
  .role-card-icon { font-size: 24px; margin-bottom: 6px; }
  .role-card-title { font-size: 13px; font-weight: 600; color: var(--gray-900); }
  .role-card-desc { font-size: 11px; color: var(--gray-600); margin-top: 3px; line-height: 1.4; }

  /* GET STARTED MODAL */
  .gs-modal { max-width: 500px; }
  .gs-options { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .gs-option {
    padding: 28px 20px; border-radius: var(--radius-lg); border: 1.5px solid var(--gray-200);
    cursor: pointer; transition: all var(--transition); text-align: center;
  }
  .gs-option:hover { border-color: var(--blue); box-shadow: var(--shadow); transform: translateY(-2px); }
  .gs-option-icon {
    width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
  }
  .gs-option-icon svg { width: 24px; height: 24px; }
  .gs-option-title { font-size: 16px; font-weight: 600; color: var(--gray-900); margin-bottom: 8px; }
  .gs-option-desc { font-size: 13px; color: var(--gray-600); line-height: 1.5; }
  .gs-option-badge { display: inline-block; margin-top: 12px; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    z-index: 9999; padding: 12px 24px; border-radius: 100px;
    font-size: 14px; font-weight: 500; color: #fff;
    display: flex; align-items: center; gap: 8px;
    box-shadow: var(--shadow-lg); animation: toastIn 0.3s ease both;
    white-space: nowrap;
  }
  .toast-success { background: var(--green); }
  .toast-error { background: var(--red); }
  .toast svg { width: 16px; height: 16px; }

  /* ABOUT PAGE */
  .about-hero { background: linear-gradient(135deg, var(--gray-50) 0%, #fff 100%); padding: 64px 24px 80px; }
  .about-values { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 48px; }
  .about-value { padding: 28px; background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); }
  .about-team { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-top: 48px; }
  .team-card { text-align: center; padding: 28px 20px; background: var(--gray-50); border-radius: var(--radius-lg); border: 1px solid var(--gray-200); }
  .team-avatar { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; }
  .team-name { font-size: 16px; font-weight: 600; color: var(--gray-900); margin-bottom: 4px; }
  .team-role { font-size: 13px; color: var(--gray-600); }

  /* DOCS / PRICING PAGE TABS */
  .page-tabs { display: flex; gap: 8px; border-bottom: 1px solid var(--gray-200); padding: 0 24px; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; }
  .page-tab {
    padding: 14px 20px; font-size: 14px; font-weight: 500; cursor: pointer;
    color: var(--gray-600); background: none; border: none; font-family: var(--font);
    transition: all var(--transition); border-bottom: 2px solid transparent; margin-bottom: -1px;
  }
  .page-tab.active { color: var(--blue); border-bottom-color: var(--blue); }
  .page-tab:hover { color: var(--gray-900); }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 56px; align-items: start; }
  .contact-info { }
  .contact-item { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
  .contact-item-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--blue-light); color: var(--blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .contact-item-icon svg { width: 20px; height: 20px; }
  .contact-item-label { font-size: 12px; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
  .contact-item-value { font-size: 15px; color: var(--gray-900); font-weight: 500; }
  .contact-form { background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 32px; }
  .textarea {
    width: 100%; padding: 10px 14px; border-radius: var(--radius); border: 1px solid var(--gray-300);
    font-size: 14px; color: var(--gray-900); font-family: var(--font);
    transition: all var(--transition); background: #fff; outline: none; resize: vertical; min-height: 120px;
  }
  .textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,115,232,0.12); }

  /* NAV ACTIVE */
  .nav-link.active { color: var(--blue); background: var(--blue-light); }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .ham { display: flex; }
    .footer-top { grid-template-columns: 1fr 1fr; }
    .steps-grid { grid-template-columns: 1fr 1fr; }
    .step:not(:last-child)::after { display: none; }
    .contact-grid { grid-template-columns: 1fr; }
    .gs-options { grid-template-columns: 1fr; }
  }
  @media (max-width: 540px) {
    .footer-top { grid-template-columns: 1fr; }
    .steps-grid { grid-template-columns: 1fr; }
    .pricing-grid { grid-template-columns: 1fr; }
    .hero-cta { flex-direction: column; align-items: center; }
    .hero-stats { gap: 24px; }
    .modal-tabs .modal-tab { font-size: 13px; padding: 12px 10px; }
  }
`;

// ─── Main Component ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null); // 'login' | 'register' | 'getstarted'
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", role: "consumer" });
  const [form, setForm] = useState({
  name: "",
  email: "",
  subject: "",
  message: ""
});

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const openModal = (name) => { setModal(name); setMobileMenu(false); };
  const closeModal = () => setModal(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/adminLogin`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      let data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ role: "admin" }));
        setUser({ role: "admin" });
        showToast("success", "Welcome back, Admin!");
        setTimeout(() => { setLoading(false); closeModal(); navigate("/dashboard/admin"); }, 600);
        return;
      }
      res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      showToast("success", `Welcome back!`);
      setTimeout(() => {
        setLoading(false); closeModal();
        navigate(data.user.role === "provider" ? "/dashboard/provider" : "/dashboard/consumer");
      }, 600);
    } catch (err) {
      showToast("error", err.message); setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      showToast("success", "Account created! Please login.");
      setTimeout(() => { setLoading(false); setModal("login"); }, 900);
    } catch (err) {
      showToast("error", err.message); setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); setUser(null);
    showToast("success", "Logged out safely.");
  };

  const handleDashboard = () => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) return;
    if (u.role === "provider") navigate("/dashboard/provider");
    else if (u.role === "admin") navigate("/dashboard/admin");
    else navigate("/dashboard/consumer");
  };

  const navTo = (p) => { setPage(p); setMobileMenu(false); window.scrollTo(0, 0); };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* TOAST */}
        {toast && (
          <div className={`toast toast-${toast.type}`}>
            {toast.type === "success" ? <Icon.Check /> : <Icon.Info />}
            {toast.message}
          </div>
        )}

        {/* NAVBAR */}
        <nav className={`nav${scrolled ? " scrolled" : ""}`}>
          <a className="nav-logo" onClick={() => navTo("home")} style={{ cursor: "pointer" }}>
            <div className="nav-logo-icon"><Icon.Sparkles /></div>
            <span className="nav-brand">Flowra <span>API</span></span>
          </a>

          <div className="nav-links">
            {["home", "features", "pricing", "docs", "about", "contact"].map(p => (
              <button key={p} className={`nav-link${page === p ? " active" : ""}`} onClick={() => navTo(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            {!user ? (
              <>
                <button className="btn-ghost" onClick={() => openModal("login")}>Log in</button>
                <button className="btn-primary" onClick={() => openModal("register")}>
                   Sign up 
                </button>
              </>
            ) : (
              <>
                <button className="btn-primary" onClick={handleDashboard}>
                  <Icon.Dashboard /> Dashboard
                </button>
                <button className="btn-icon" onClick={handleLogout} title="Logout"><Icon.LogOut /></button>
              </>
            )}
            <button className="btn-icon ham" onClick={() => setMobileMenu(v => !v)} style={{ display: "flex" }}>
              <Icon.Menu />
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div style={{ background: "#fff", borderBottom: "1px solid var(--gray-200)", padding: "8px 16px 16px", animation: "slideDown 0.2s ease" }}>
            {["home", "features", "pricing", "docs", "about", "contact"].map(p => (
              <button key={p} className="nav-link" style={{ display: "block", width: "100%", textAlign: "left", marginBottom: "4px" }} onClick={() => navTo(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
            {!user ? (
              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => openModal("login")}>Log in</button>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => openModal("register")}>Sign up</button>
              </div>
            ) : (
              <button className="btn-primary" style={{ width: "100%", marginTop: "12px", justifyContent: "center" }} onClick={handleDashboard}>Dashboard</button>
            )}
          </div>
        )}

        {/* PAGE CONTENT */}
        {page === "home" && <HomePage openModal={openModal} navTo={navTo} />}
        {page === "features" && <FeaturesPage />}
        {page === "pricing" && <PricingPage openModal={openModal} />}
        {page === "docs" && <DocsPage />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage showToast={showToast} />}

        <Footer navTo={navTo} />

        {/* MODALS */}
        {modal === "getstarted" && (
          <GetStartedModal close={closeModal} openModal={openModal} />
        )}
        {modal === "login" && (
          <LoginModal
            close={closeModal} loading={loading}
            loginData={loginData} setLoginData={setLoginData}
            handleLogin={handleLogin} openRegister={() => setModal("register")}
          />
        )}
        {modal === "register" && (
          <RegisterModal
            close={closeModal} loading={loading}
            registerData={registerData} setRegisterData={setRegisterData}
            handleRegister={handleRegister} openLogin={() => setModal("login")}
          />
        )}
      </div>
    </>
  );
}

// ─── GET STARTED MODAL ───────────────────────────────────────────────────────
function GetStartedModal({ close, openModal }) {
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal gs-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", marginBottom: "8px" }}>
            <div className="modal-icon icon-blue"><Icon.Sparkles /></div>
            <button className="modal-close" onClick={close}><Icon.X /></button>
          </div>
          <div style={{ marginBottom: "6px" }}>
            <div className="modal-title">Welcome to Flowra API</div>
            <div className="modal-subtitle">Choose how you want to get started</div>
          </div>
        </div>
        <div className="modal-body">
          <div className="gs-options">
            <div className="gs-option" onClick={() => openModal("register")} style={{ borderColor: "var(--blue)" }}>
              <div className="gs-option-icon icon-blue"><Icon.Globe /></div>
              <div className="gs-option-title">Explore APIs</div>
              <div className="gs-option-desc">Discover powerful ready-to-use APIs and subscribe to plans.</div>
              <div className="gs-option-badge" style={{ background: "var(--blue-light)", color: "var(--blue)" }}>Consumer</div>
            </div>
            <div className="gs-option" onClick={() => openModal("register")} style={{ borderColor: "var(--teal)" }}>
              <div className="gs-option-icon icon-teal"><Icon.Coins /></div>
              <div className="gs-option-title">Publish & Earn</div>
              <div className="gs-option-desc">Share your APIs and earn from every request made.</div>
              <div className="gs-option-badge" style={{ background: "var(--teal-light)", color: "var(--teal)" }}>Provider</div>
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: "13px", color: "var(--gray-500)", marginTop: "16px" }}>
            Already have an account?{" "}
            <button className="modal-footer-link" onClick={() => openModal("login")}>Log in here</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN MODAL ─────────────────────────────────────────────────────────────
function LoginModal({ close, loading, loginData, setLoginData, handleLogin, openRegister }) {
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-icon icon-blue" style={{ marginBottom: "12px" }}><Icon.Key /></div>
            <div className="modal-title">Welcome back</div>
            <div className="modal-subtitle">Sign in to your Flowra account</div>
          </div>
          <button className="modal-close" onClick={close}><Icon.X /></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input className="form-input" type="email" placeholder="you@example.com"
              value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Your password"
              value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
          </div>
          <button className="btn-submit" onClick={handleLogin} disabled={loading}>
            {loading ? <><Icon.Loader /> Signing in…</> : "Sign in to Flowra"}
          </button>
        </div>
        <div className="modal-footer">
          <span className="modal-footer-text">
            No account?{" "}
            <button className="modal-footer-link" onClick={openRegister}>Create one free</button>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER MODAL ──────────────────────────────────────────────────────────
function RegisterModal({ close, loading, registerData, setRegisterData, handleRegister, openLogin }) {
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-icon icon-teal" style={{ marginBottom: "12px", background: "var(--teal-light)", color: "var(--teal)" }}><Icon.Users /></div>
            <div className="modal-title">Create your account</div>
            <div className="modal-subtitle">Join thousands of developers on Flowra</div>
          </div>
          <button className="modal-close" onClick={close}><Icon.X /></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Full name</label>
            <input className="form-input" placeholder="your name"
              value={registerData.name} onChange={e => setRegisterData({ ...registerData, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input className="form-input" type="email" placeholder="you@example.com"
              value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Create a password"
              value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">I want to</label>
            <div className="role-cards">
              {[
                { val: "consumer", emoji: "🌐", title: "Explore APIs", desc: "Use APIs in my projects" },
                { val: "provider", emoji: "💰", title: "Earn Money", desc: "Publish & monetize APIs" },
              ].map(r => (
                <div key={r.val} className={`role-card${registerData.role === r.val ? " selected" : ""}`}
                  onClick={() => setRegisterData({ ...registerData, role: r.val })}>
                  <div className="role-card-icon">{r.emoji}</div>
                  <div className="role-card-title">{r.title}</div>
                  <div className="role-card-desc">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-submit" onClick={handleRegister} disabled={loading}>
            {loading ? <><Icon.Loader /> Creating account…</> : "Create free account"}
          </button>
        </div>
        <div className="modal-footer">
          <span className="modal-footer-text">
            Already have an account?{" "}
            <button className="modal-footer-link" onClick={openLogin}>Sign in</button>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ openModal, navTo }) {
  return (
    <>
      {/* HERO */}
      <header className="hero">
        <div className="hero-chip"><Icon.Sparkles /> Now with Razorpay payment integration</div>
        <h1>
          The API Marketplace for<br />
          <span className="gradient-text">Builders & Earners</span>
        </h1>
        <p className="hero-desc">
          Explore powerful APIs, subscribe to pricing plans, and integrate them instantly — or publish your own APIs and earn from every single request.
        </p>
        <div className="hero-cta">
          <button className="btn-hero-primary" onClick={() => openModal("getstarted")}>
            Get started free <Icon.Arrow />
          </button>
          <button className="btn-hero-secondary" onClick={() => navTo("docs")}>
            <Icon.Code /> View docs
          </button>
        </div>
        <div className="hero-stats">
          {[
            { num: "10K+", label: "APIs published" },
            { num: "50K+", label: "Developers" },
            { num: "₹2Cr+", label: "Paid to providers" },
            { num: "99.9%", label: "Uptime SLA" },
          ].map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="hero-stat-num">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="hero-visual">
          <div className="code-block">
            <div style={{ marginBottom: "12px", display: "flex", gap: "6px" }}>
              <span className="code-dot" style={{ background: "#ff5f56" }} />
              <span className="code-dot" style={{ background: "#ffbd2e" }} />
              <span className="code-dot" style={{ background: "#27c93f" }} />
            </div>
            <div className="code-comment">// Integrate any API in seconds</div>
            <div style={{ marginTop: "8px" }}>
              <span className="code-key">const </span>
              <span style={{ color: "#cdd6f4" }}>res</span>
              <span style={{ color: "#e8eaed" }}> = await </span>
              <span className="code-key">fetch</span>
              <span style={{ color: "#e8eaed" }}>(</span>
            </div>
            <div style={{ paddingLeft: "16px" }}>
              <span className="code-str">"https://api.flowra.io/v1/weather"</span>
              <span style={{ color: "#e8eaed" }}>, &#123;</span>
            </div>
            <div style={{ paddingLeft: "16px" }}>
              <span style={{ color: "#cdd6f4" }}>headers</span>
              <span style={{ color: "#e8eaed" }}>: &#123;</span>
            </div>
            <div style={{ paddingLeft: "32px" }}>
              <span className="code-str">"X-API-Key"</span>
              <span style={{ color: "#e8eaed" }}>: </span>
              <span className="code-str">"flw_live_••••••••"</span>
            </div>
            <div style={{ paddingLeft: "16px" }}><span style={{ color: "#e8eaed" }}>&#125;</span></div>
            <div><span style={{ color: "#e8eaed" }}>&#125;);</span> <span className="code-cursor" /></div>
          </div>
        </div>
      </header>

      {/* FEATURES PREVIEW */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-inner">
          <div className="text-center">
            <div className="section-chip chip-blue"><Icon.Zap /> Platform features</div>
            <h2 className="section-title">Everything you need to build and earn</h2>
            <p className="section-desc">A complete ecosystem for API providers and consumers, with payments, analytics, and security built in.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: <Icon.Globe />, cls: "icon-blue", title: "API Marketplace", desc: "Browse thousands of production-grade APIs across categories — weather, payments, AI, maps, and more." },
              { icon: <Icon.Coins />, cls: "icon-teal", title: "Monetize Instantly", desc: "Set your pricing plans, integrate Razorpay, and start earning from every API call with automated payouts." },
              { icon: <Icon.Chart />, cls: "icon-green", title: "Real-time Analytics", desc: "Monitor request volumes, latency, error rates, and revenue from your dashboard in real time." },
              { icon: <Icon.Shield />, cls: "icon-red", title: "Enterprise Security", desc: "API key auth, rate limiting, IP whitelisting, and HTTPS everywhere for peace of mind." },
              { icon: <Icon.Layers />, cls: "icon-yellow", title: "Flexible Plans", desc: "Create free tiers, usage-based pricing, or premium subscriptions — all from a simple UI." },
              { icon: <Icon.Key />, cls: "icon-blue", title: "Secure API Keys", desc: "Auto-generate, rotate, and revoke API keys. Every request is authenticated and logged." },
              {
  icon: <Icon.Zap />,
  cls: "icon-teal",
  title: "Lightning Fast Integration",
  desc: "Connect APIs in minutes using simple endpoints, instant API keys, and developer-friendly responses."
},

{
  icon: <Icon.Users />,
  cls: "icon-green",
  title: "Built for Developers",
  desc: "Designed for startups, developers, and businesses building scalable modern applications."
}
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className={`feature-icon ${f.cls}`}>{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: "var(--gray-50)" }}>
  <div className="section-inner">

    <div className="text-center">
      <div className="section-chip chip-teal">
        How it works
      </div>

      <h2 className="section-title">
        Up and running in minutes
      </h2>

      <p className="section-desc">
        Whether you're consuming or publishing APIs,
        Flowra makes it effortless.
      </p>
    </div>

    <div style={{ marginTop: "48px" }}>

      {/* ─── Consumers ───────────────────── */}
      <div style={{ marginBottom: "40px" }}>

        <div
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            background: "var(--blue)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "600",
            display: "inline-block",
            marginBottom: "20px"
          }}
        >
          For Consumers
        </div>

        <div
          className="steps-grid"
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--gray-200)"
          }}
        >
          {[
            {
              n: "1",
              title: "Create Account",
              desc:
                "Sign up free as a consumer in under 30 seconds."
            },

            {
              n: "2",
              title: "Browse APIs",
              desc:
                "Explore the marketplace and discover useful APIs."
            },

            {
              n: "3",
              title: "Subscribe to Plans",
              desc:
                "Choose free or premium plans securely."
            },

            {
              n: "4",
              title: "Integrate & Build",
              desc:
                "Copy your API key and start making requests instantly."
            },

          ].map((s, i) => (

            <div key={i} className="step">

              <div className="step-num">
                {s.n}
              </div>

              <div className="step-title">
                {s.title}
              </div>

              <div className="step-desc">
                {s.desc}
              </div>

            </div>

          ))}
        </div>
      </div>

      {/* ─── Providers ───────────────────── */}
      <div>

        <div
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            background: "var(--teal)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "600",
            display: "inline-block",
            marginBottom: "20px"
          }}
        >
          For Providers
        </div>

        <div
          className="steps-grid"
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--gray-200)"
          }}
        >
          {[
            {
              n: "1",
              title: "Create API",
              desc:
                "Publish your API with endpoint and documentation details."
            },

            {
              n: "2",
              title: "Create Plans",
              desc:
                "Add free or premium subscription plans for consumers."
            },

            {
              n: "3",
              title: "Get Subscribers",
              desc:
                "Developers subscribe and integrate your APIs."
            },

            {
              n: "4",
              title: "Earn Revenue",
              desc:
                "Receive earnings and withdraw payments securely."
            },

          ].map((s, i) => (

            <div key={i} className="step">

              <div className="step-num">
                {s.n}
              </div>

              <div className="step-title">
                {s.title}
              </div>

              <div className="step-desc">
                {s.desc}
              </div>

            </div>

          ))}
        </div>
      </div>

    </div>

  </div>
</section>
      {/* TESTIMONIALS */}
      <section className="section">
        <div className="section-inner">
          <div className="text-center">
            <div className="section-chip chip-green">Testimonials</div>
            <h2 className="section-title">Loved by developers worldwide</h2>
            <p className="section-desc">Thousands of teams rely on Flowra to power their applications.</p>
          </div>
          <div className="testimonials-grid">
            {[
              { text: "Flowra completely changed how I monetize my side projects. I published my weather API and started earning within a week. The payout system is flawless.", name: "Arjun Mehta", role: "Indie Developer", init: "AM", color: "#1a73e8" },
              { text: "As a startup, we needed affordable, reliable APIs fast. Flowra's marketplace saved us months of integration work. The analytics alone are worth it.", name: "Priya Sharma", role: "CTO, TechNova", init: "PS", color: "#00897b" },
              { text: "The API key management and subscription system is exactly what I needed. Clean docs, fast responses, and revenue from day one.", name: "Rahul Verma", role: "Full-stack Developer", init: "RV", color: "#e91e63" },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.color + "20", color: t.color }}>{t.init}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Ready to build something great?</h2>
          <p>Join 50,000+ developers already using Flowra. Start for free, scale as you grow.</p>
         
        </div>
      </section>
    </>
  );
}

// ─── FEATURES PAGE ───────────────────────────────────────────────────────────
function FeaturesPage() {
  const cats = [
    { title: "For API Consumers", chip: "chip-blue", features: [
      { icon: <Icon.Globe />, cls: "icon-blue", title: "Marketplace Discovery", desc: "Search, filter, and browse APIs by category, rating, and pricing. Find exactly what your project needs." },
      { icon: <Icon.Key />, cls: "icon-blue", title: "Instant API Keys", desc: "Subscribe to any plan and receive a secure API key instantly. Start building without friction." },
      { icon: <Icon.Chart />, cls: "icon-blue", title: "Usage Tracking", desc: "Monitor your request count, quota remaining, and spending in a clean real-time dashboard." },
      { icon: <Icon.Shield />, cls: "icon-blue", title: "Secure Payments", desc: "Pay for plans securely via Razorpay. View all transactions with clear invoices." },
      { icon: <Icon.Layers />, cls: "icon-blue", title: "Plan Management", desc: "Upgrade, downgrade, or cancel subscriptions anytime. Your data is never lost." },
      { icon: <Icon.Zap />, cls: "icon-blue", title: "Fast Integration", desc: "Copy-paste code snippets for every API in any language. Be production-ready in minutes." },
    ]},
    { title: "For API Providers", chip: "chip-teal", features: [
      { icon: <Icon.Code />, cls: "icon-teal", title: "API Management", desc: "Create, edit, and version your APIs with a simple dashboard. No DevOps expertise required." },
      { icon: <Icon.Coins />, cls: "icon-teal", title: "Pricing Plans", desc: "Define free tiers, usage-based rates, or fixed subscriptions. Monetize however you want." },
      { icon: <Icon.Chart />, cls: "icon-teal", title: "Revenue Analytics", desc: "See your earnings, subscriber count, and request volumes in real time with beautiful charts." },
      { icon: <Icon.Users />, cls: "icon-teal", title: "Subscriber Management", desc: "View who's using your APIs and their usage patterns. Block or manage subscribers easily." },
      { icon: <Icon.Coins />, cls: "icon-teal", title: "Withdrawal System", desc: "Request payouts directly from your dashboard. Funds are transferred within 2-3 business days." },
      { icon: <Icon.Shield />, cls: "icon-teal", title: "Request Routing", desc: "Flowra handles authentication and routing. Your endpoint receives only valid, authenticated calls." },
    ]},
  ];
  return (
    <div>
      <div className="section" style={{ background: "var(--gray-50)", paddingBottom: "40px" }}>
        <div className="section-inner text-center">
          <div className="section-chip chip-blue">Platform features</div>
          <h2 className="section-title">Built for every role in the API ecosystem</h2>
          <p className="section-desc">Flowra provides a complete toolkit for consumers who build, and providers who monetize.</p>
        </div>
      </div>
      {cats.map((cat, ci) => (
        <section key={ci} className="section" style={{ background: ci % 2 === 0 ? "#fff" : "var(--gray-50)" }}>
          <div className="section-inner">
            <div className={`section-chip ${cat.chip}`}>{cat.title}</div>
            <div className="features-grid">{cat.features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className={`feature-icon ${f.cls}`}>{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}</div>
          </div>
        </section>
      ))}
    </div>
  );
}

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────
function PricingPage({ openModal }) {
  const plans = [

  {
    name: "Free APIs",
    price: "0",
    desc:
      "Explore APIs with free plans created by providers.",
    features: [
      "Access community APIs",
      "Test integrations easily",
      "Secure API key access",
      "Basic usage tracking",
      "Developer friendly"
    ],
    cta: "Explore APIs",
    style: "btn-pricing-outline",
    featured: false
  },

  {
    name: "Premium APIs",
    price: "Custom",
    desc:
      "Subscribe to premium APIs with provider-defined pricing plans.",
    features: [
      "Access premium APIs",
      "Flexible provider pricing",
      "Higher request limits",
      "Advanced integrations",
      "Real-time analytics",
      "Priority API access"
    ],
    cta: "Browse Marketplace",
    style: "btn-pricing-filled",
    featured: true
  },

  {
    name: "API Providers",
    price: "Earn",
    desc:
      "Publish APIs, create plans, and monetize your traffic.",
    features: [
      "Create custom plans",
      "Set your own pricing",
      "Track subscriptions",
      "Manage API requests",
      "Withdraw earnings",
      "Provider dashboard"
    ],
    cta: "Start Publishing",
    style: "btn-pricing-outline",
    featured: false
  },

];
  return (
    <div>
      <div className="section" style={{ background: "var(--gray-50)", paddingBottom: "40px" }}>
        <div className="section-inner text-center">
          <div className="section-chip chip-blue">Pricing</div>
          <h2 className="section-title">Simple, transparent pricing</h2>
          <p className="section-desc">Start free and scale as your needs grow. No hidden fees, ever.</p>
        </div>
      </div>
      <section className="section" style={{ paddingTop: "48px" }}>
        <div className="section-inner">
          <div className="pricing-grid">
            {plans.map((p, i) => (
              <div key={i} className={`pricing-card${p.featured ? " featured" : ""}`}>
                {p.featured && <div className="pricing-badge">Most popular</div>}
                <div className="pricing-plan">{p.name}</div>
                <div className="pricing-price"><sup>₹</sup>{p.price}<span>/month</span></div>
                <div className="pricing-desc">{p.desc}</div>
                <div className="pricing-divider" />
                {p.features.map((f, j) => (
                  <div key={j} className="pricing-feature"><Icon.Check />{f}</div>
                ))}
                <button className={`btn-pricing ${p.style}`} onClick={() => openModal("register")}>{p.cta}</button>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px", padding: "24px", background: "var(--gray-50)", borderRadius: "var(--radius-lg)", border: "1px solid var(--gray-200)" }}>
            <div style={{ fontSize: "15px", fontWeight: "600", color: "var(--gray-900)", marginBottom: "6px" }}>Are you an API Provider?</div>
            <div style={{ fontSize: "14px", color: "var(--gray-600)" }}>Publishing APIs is <strong>free</strong>. Flowra takes a small 30% revenue share only when you earn. <button className="modal-footer-link" onClick={() => openModal("register")}>Become a provider →</button></div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── DOCS PAGE ───────────────────────────────────────────────────────────────
function DocsPage() {
  const [tab, setTab] = useState("quickstart");
  const sections = {
    quickstart: {
      title: "Quick Start",
      content: [
        { h: "1. Get your API key", body: "After subscribing to any plan, navigate to Dashboard → API Keys and copy your key. Keys follow the format flw_live_XXXXXXXX." },
        { h: "2. Make your first request", body: "Include your API key in every request using the X-API-Key header." },
        { h: "3. Handle the response", body: "All responses are JSON. Successful responses return status 200. Errors include a message field explaining the issue." },
      ],
    },
    auth: {
      title: "Authentication",
      content: [
        { h: "API Key Authentication", body: "Every request must include your API key in the X-API-Key header. Keys are tied to your subscription plan and enforce rate limits automatically." },
        { h: "Key Rotation", body: "You can generate a new API key anytime from the dashboard. Your old key remains valid for 24 hours after rotation to prevent downtime." },
        { h: "Security Best Practices", body: "Never expose your API key in client-side code or public repositories. Use environment variables and server-side proxies for production apps." },
      ],
    },
    errors: {
      title: "Error Codes",
      content: [
        { h: "401 Unauthorized", body: "Your API key is missing, invalid, or expired. Regenerate from the dashboard." },
        { h: "429 Too Many Requests", body: "You've exceeded your plan's rate limit. Upgrade your plan or wait for the quota to reset." },
        { h: "404 Not Found", body: "The requested API endpoint doesn't exist. Check the API documentation for correct paths." },
        { h: "500 Internal Server Error", body: "A server-side issue occurred. Retry after a few seconds. If persistent, contact support." },
      ],
    },
  };
  const s = sections[tab];
  return (
    <div>
      <div className="section" style={{ background: "var(--gray-50)", paddingBottom: "0" }}>
        <div className="section-inner text-center" style={{ paddingBottom: "40px" }}>
          <div className="section-chip chip-blue">Documentation</div>
          <h2 className="section-title">Developer Documentation</h2>
          <p className="section-desc">Everything you need to integrate Flowra APIs into your applications.</p>
        </div>
        <div className="page-tabs">
          {Object.entries(sections).map(([key, val]) => (
            <button key={key} className={`page-tab${tab === key ? " active" : ""}`} onClick={() => setTab(key)}>{val.title}</button>
          ))}
        </div>
      </div>
      <section className="section">
        <div className="section-inner" style={{ maxWidth: "800px" }}>
          {s.content.map((c, i) => (
            <div key={i} style={{ marginBottom: "40px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--gray-900)", marginBottom: "10px" }}>{c.h}</h3>
              <p style={{ fontSize: "15px", color: "var(--gray-600)", lineHeight: "1.7" }}>{c.body}</p>
              {i === 0 && tab === "quickstart" && (
                <div className="code-block" style={{ marginTop: "16px", fontSize: "13px" }}>
                  <div className="code-comment"># Example request</div>
                  <div style={{ color: "#e8eaed", marginTop: "8px" }}>
                    curl -X GET https://api.flowra.io/v1/weather \<br />
                    &nbsp;&nbsp;-H <span className="code-str">"X-API-Key: flw_live_your_key"</span> \<br />
                    &nbsp;&nbsp;-H <span className="code-str">"Content-Type: application/json"</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div style={{ background: "var(--blue-light)", border: "1px solid var(--blue)", borderRadius: "var(--radius-lg)", padding: "24px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{ color: "var(--blue)", marginTop: "2px" }}><Icon.Info /></div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--blue)", marginBottom: "6px" }}>Need help?</div>
              <div style={{ fontSize: "14px", color: "var(--blue-dark)" }}>Contact our support team at <strong>flowaraapi@gmail.com</strong> or join the developer community for quick answers.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div>
      <div className="about-hero section">
        <div className="section-inner">
          <div className="section-chip chip-blue">About us</div>
          <h2 className="section-title" style={{ maxWidth: "600px" }}>We're building the API economy of tomorrow</h2>
          <p className="section-desc">Flowra was founded with a simple mission: make it dead-simple for developers to publish, discover, and monetize APIs — creating a thriving ecosystem where everyone benefits.</p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          <div className="section-chip chip-teal">Our values</div>
          <h2 className="section-title">What drives us</h2>
          <div className="about-values">
            {[
              { icon: "🌍", title: "Openness", desc: "We believe the best software is built on open collaboration and transparent APIs that anyone can access." },
              { icon: "⚡", title: "Speed", desc: "From signup to first API call, we obsess over reducing friction so you can focus on building." },
              { icon: "🔒", title: "Security", desc: "Every request, key, and payment is handled with enterprise-grade security standards." },
              { icon: "💸", title: "Fair monetization", desc: "Providers deserve to earn from their work. Our 70/30 revenue split is the most generous in the market." },
            ].map((v, i) => (
              <div key={i} className="about-value">
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{v.icon}</div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "var(--gray-900)", marginBottom: "8px" }}>{v.title}</div>
                <div style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: "1.65" }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--gray-50)" }}>
        <div className="section-inner text-center">
          <div className="section-chip chip-green">Our team</div>
          <h2 className="section-title">The people behind Flowra</h2>
          <div className="about-team">
            {[
              { init: "AS", name: "Abhishek Sasane", role: "Founder & CEO", color: "#1a73e8" },
              { init: "PS", name: "Priya Singh", role: "CTO", color: "#00897b" },
              { init: "AM", name: "Arjun Malhotra", role: "Head of Design", color: "#e91e63" },
              { init: "NP", name: "Neha Patel", role: "Head of Growth", color: "#f57c00" },
            ].map((m, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar" style={{ background: m.color + "20", color: m.color }}>{m.init}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ showToast }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
const handleSubmit = async () => {

  if (
    !form.name ||
    !form.email ||
    !form.message
  ) {
    showToast("error", "Please fill all required fields");
    return;
  }

  try {

    setLoading(true);

    const res = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          access_key: "9f1a9965-4c0f-425f-bc2f-38a88ac4f943",

          name: form.name,

          email: form.email,

          subject: form.subject,

          message: form.message
        })
      }
    );

    const data = await res.json();

    if (data.success) {

      showToast(
        "success",
        "Message sent successfully"
      );

      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } else {

      showToast(
        "error",
        "Failed to send message"
      );
    }

  } catch (error) {

    showToast(
      "error",
      "Something went wrong"
    );

  } finally {

    setLoading(false);
  }
};

  return (
    <div>
      <div className="section" style={{ background: "var(--gray-50)", paddingBottom: "40px" }}>
        <div className="section-inner text-center">
          <div className="section-chip chip-blue">Contact</div>
          <h2 className="section-title">Get in touch</h2>
          <p className="section-desc">Have a question, need support, or want to partner with us? We'd love to hear from you.</p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          <div className="contact-grid">
            <div className="contact-info">
              <h3 style={{ fontSize: "20px", fontWeight: "600", color: "var(--gray-900)", marginBottom: "24px" }}>Contact Information</h3>
              {[
                { icon: <Icon.Mail />, label: "Support Email", value: "flowaraapi@gmail.com" },
                { icon: <Icon.Globe />, label: "Website", value: "www.flowraapi.io" },
                { icon: <Icon.Phone />, label: "Business Hours", value: "Mon–Fri, 9am–6pm IST" },
              ].map((c, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-item-icon">{c.icon}</div>
                  <div>
                    <div className="contact-item-label">{c.label}</div>
                    <div className="contact-item-value">{c.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "32px", padding: "20px", background: "var(--blue-light)", borderRadius: "var(--radius-lg)" }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--blue)", marginBottom: "6px" }}>Developer Support</div>
                <div style={{ fontSize: "14px", color: "var(--gray-700)", lineHeight: "1.6" }}>For API integration help, check our documentation first. For urgent issues, email us directly and include your account email and API key prefix.</div>
              </div>
            </div>
            <div className="contact-form">
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--gray-900)", marginBottom: "20px" }}>Send a message</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Name *</label>
                  <input className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" placeholder="What's this about?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea className="textarea" placeholder="Tell us more…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? <><Icon.Loader /> Sending…</> : <><Icon.Mail /> Send message</>}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ navTo }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Flowra <span>API</span></h3>
            <p>The modern API marketplace for developers and businesses. Publish, discover, and monetize APIs with ease.</p>
            <div className="footer-social">
              {[
                { icon: <Icon.Twitter />, label: "Twitter" },
                { icon: <Icon.Github />, label: "GitHub" },
                { icon: <Icon.LinkedIn />, label: "LinkedIn" },
              ].map((s, i) => (
                <button key={i} className="social-btn" title={s.label}>{s.icon}</button>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            {["home", "features", "pricing", "docs"].map(p => (
              <button key={p} className="footer-link" onClick={() => navTo(p)}>{p.charAt(0).toUpperCase() + p.slice(1)}</button>
            ))}
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <button className="footer-link" onClick={() => navTo("about")}>About us</button>
            <button className="footer-link" onClick={() => navTo("contact")}>Contact</button>
            <button className="footer-link">Careers</button>
            <button className="footer-link">Blog</button>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact"><Icon.Mail /> flowaraapi@gmail.com</div>
            <div className="footer-contact"><Icon.Globe /> Customer Support</div>
            <div className="footer-contact"><Icon.Phone /> Mon–Fri 9am–6pm IST</div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} Flowra API. All rights reserved.</div>
          <div className="footer-bottom-links">
            <button className="footer-bottom-link">Privacy Policy</button>
            <button className="footer-bottom-link">Terms of Service</button>
            <button className="footer-bottom-link">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
