import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Users, UserCheck, CreditCard,
  Activity, LogOut, Search, CheckCircle, AlertCircle,
  TrendingUp, Shield, ShieldOff, Zap,
  Globe, Star, Filter, ChevronDown, X,
  Clock, ArrowUpRight, RefreshCw, DollarSign,
  AlertTriangle, CheckSquare, XSquare, Eye,
  MoreVertical, Download, Banknote
} from "lucide-react";

/* ─────────────── CSS ─────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f5f6fa;
    --surface: #ffffff;
    --surface-2: #f9fafc;
    --border: #e8eaed;
    --border-2: #d2d5db;
    --text-primary: #0d0f12;
    --text-secondary: #4a5568;
    --text-muted: #8f96a3;
    --blue: #2563eb;
    --blue-hover: #1d4ed8;
    --blue-light: #eff6ff;
    --blue-mid: #dbeafe;
    --green: #059669;
    --green-hover: #047857;
    --green-light: #ecfdf5;
    --green-mid: #d1fae5;
    --red: #dc2626;
    --red-hover: #b91c1c;
    --red-light: #fef2f2;
    --red-mid: #fee2e2;
    --yellow: #d97706;
    --yellow-light: #fffbeb;
    --yellow-mid: #fef3c7;
    --purple: #7c3aed;
    --purple-light: #f5f3ff;
    --purple-mid: #ede9fe;
    --shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
    --shadow: 0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
    --shadow-lg: 0 12px 32px rgba(0,0,0,0.09), 0 4px 12px rgba(0,0,0,0.05);
    --shadow-xl: 0 24px 64px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.07);
    --radius-sm: 8px;
    --radius: 14px;
    --radius-lg: 20px;
    --radius-xl: 28px;
    --sidebar: 248px;
    --header: 60px;
    --font: 'DM Sans', sans-serif;
    --font-display: 'DM Serif Display', serif;
    --transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
  }

  body { font-family: var(--font); background: var(--bg); color: var(--text-primary); -webkit-font-smoothing: antialiased; }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ══ SIDEBAR ══ */
  .sidebar {
    width: var(--sidebar);
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    z-index: 100;
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
    overflow: hidden;
  }

  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 18px 20px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .logo-gem {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(124,58,237,0.3);
    position: relative;
  }

  .logo-gem::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%);
  }

  .logo-text-wrap { display: flex; flex-direction: column; }

  .logo-text {
    font-family: var(--font-display);
    font-size: 19px;
    font-weight: 400;
    color: var(--text-primary);
    letter-spacing: -0.2px;
    line-height: 1.2;
  }

  .logo-badge {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--blue);
    background: var(--blue-light);
    padding: 1px 6px;
    border-radius: 4px;
    width: fit-content;
  }

  .sidebar-nav {
    flex: 1;
    padding: 12px 10px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    overflow-y: auto;
  }

  .nav-section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.8px;
    color: var(--text-muted);
    text-transform: uppercase;
    padding: 8px 12px 4px;
    margin-top: 4px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: var(--transition);
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text-secondary);
    user-select: none;
    position: relative;
    white-space: nowrap;
  }

  .nav-item:hover { background: var(--surface-2); color: var(--text-primary); }

  .nav-item.active {
    background: var(--blue-light);
    color: var(--blue);
    font-weight: 600;
  }

  .nav-item.active::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 3px;
    background: var(--blue);
    border-radius: 0 2px 2px 0;
    margin-left: -10px;
  }

  .nav-icon { width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  .nav-badge {
    margin-left: auto;
    font-size: 10px;
    font-weight: 700;
    background: var(--blue);
    color: white;
    padding: 1px 6px;
    border-radius: 99px;
  }

  .sidebar-footer {
    padding: 10px 10px 16px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--red);
    transition: var(--transition);
  }

  .logout-btn:hover { background: var(--red-light); }

  /* ══ MAIN ══ */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

  .topbar {
    height: var(--header);
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 16px;
    flex-shrink: 0;
  }

  .topbar-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 400;
    color: var(--text-primary);
    letter-spacing: -0.3px;
  }

  .topbar-search {
    margin-left: auto;
    position: relative;
    display: flex;
    align-items: center;
  }

  .topbar-search input {
    width: 240px;
    padding: 7px 38px 7px 14px;
    border: 1.5px solid var(--border);
    border-radius: 99px;
    font-size: 13px;
    font-family: var(--font);
    color: var(--text-primary);
    background: var(--bg);
    transition: var(--transition);
    outline: none;
  }

  .topbar-search input:focus {
    border-color: var(--blue);
    background: white;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
    width: 290px;
  }

  .topbar-search .search-icon { position: absolute; right: 12px; color: var(--text-muted); pointer-events: none; }

  .content { flex: 1; overflow-y: auto; padding: 24px; }

  /* ══ LOADER ══ */
  .loader-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 100px 0;
  }

  .loader {
    position: relative;
    width: 48px;
    height: 48px;
  }

  .loader-ring {
    position: absolute;
    inset: 0;
    border: 3px solid transparent;
    border-radius: 50%;
    animation: loaderSpin 1.1s linear infinite;
  }

  .loader-ring:nth-child(1) {
    border-top-color: var(--blue);
    animation-duration: 1.1s;
  }

  .loader-ring:nth-child(2) {
    border-right-color: var(--purple);
    animation-duration: 1.5s;
    animation-direction: reverse;
    inset: 6px;
  }

  .loader-ring:nth-child(3) {
    border-bottom-color: var(--green);
    animation-duration: 2s;
    inset: 12px;
  }

  @keyframes loaderSpin { to { transform: rotate(360deg); } }

  .loader-text { font-size: 13.5px; font-weight: 500; color: var(--text-muted); letter-spacing: 0.2px; }

  /* ══ STATS GRID ══ */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
    margin-bottom: 20px;
  }

  .stat-card {
    background: var(--surface);
    border-radius: var(--radius);
    padding: 18px 20px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xs);
    transition: var(--transition);
    animation: fadeUp 0.4s cubic-bezier(0.4,0,0.2,1) both;
    cursor: default;
    position: relative;
    overflow: hidden;
  }

  .stat-card::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 80px; height: 80px;
    border-radius: 50%;
    opacity: 0.06;
    transform: translate(30px, -30px);
  }

  .stat-card:hover { box-shadow: var(--shadow); transform: translateY(-2px); }

  .stat-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }

  .stat-icon-wrap {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }

  .stat-trend {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    font-weight: 600;
    color: var(--green);
  }

  .stat-label { font-size: 11.5px; font-weight: 500; color: var(--text-muted); margin-bottom: 3px; letter-spacing: 0.3px; }
  .stat-value { font-family: var(--font-display); font-size: 26px; font-weight: 400; color: var(--text-primary); line-height: 1; }

  .revenue-banner {
    background: linear-gradient(125deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
    border-radius: var(--radius-lg);
    padding: 28px 32px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.4s 0.3s cubic-bezier(0.4,0,0.2,1) both;
  }

  .revenue-banner::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%);
  }

  .revenue-banner::after {
    content: '';
    position: absolute;
    bottom: -80px; left: 20px;
    width: 240px; height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%);
  }

  .revenue-left { position: relative; z-index: 1; }
  .revenue-label { font-size: 12px; font-weight: 500; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .revenue-value { font-family: var(--font-display); font-size: 42px; font-weight: 400; margin-bottom: 4px; }
  .revenue-sub { font-size: 12px; opacity: 0.5; }

  .revenue-icon-wrap {
    width: 64px; height: 64px;
    background: rgba(255,255,255,0.08);
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    position: relative; z-index: 1;
    border: 1px solid rgba(255,255,255,0.12);
  }

  /* ══ SEARCH & FILTERS ══ */
  .toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .search-wrap { position: relative; }
  .search-wrap input {
    padding: 9px 36px 9px 36px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-size: 13.5px;
    font-family: var(--font);
    background: var(--surface);
    color: var(--text-primary);
    outline: none;
    transition: var(--transition);
    width: 280px;
  }

  .search-wrap input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
  .search-wrap .sw-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }

  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 14px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font);
    background: var(--surface);
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
    white-space: nowrap;
  }

  .filter-btn:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
  .filter-btn.active { border-color: var(--blue); color: var(--blue); background: var(--blue-light); font-weight: 600; }

  .filter-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    z-index: 200;
    min-width: 180px;
    overflow: hidden;
    animation: dropIn 0.15s cubic-bezier(0.4,0,0.2,1);
  }

  @keyframes dropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

  .filter-option {
    padding: 9px 14px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-option:hover { background: var(--surface-2); }
  .filter-option.selected { color: var(--blue); background: var(--blue-light); }

  /* ══ TABLE ══ */
  .card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    overflow: hidden;
    box-shadow: var(--shadow-xs);
    animation: fadeUp 0.4s cubic-bezier(0.4,0,0.2,1) both;
  }

  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
  }

  .card-title { font-size: 15px; font-weight: 600; color: var(--text-primary); }

  .card-count {
    font-size: 11px;
    font-weight: 700;
    background: var(--surface-2);
    color: var(--text-muted);
    border: 1px solid var(--border);
    padding: 2px 8px;
    border-radius: 99px;
  }

  .table-scroll { overflow-x: auto; }

  table { width: 100%; border-collapse: collapse; }

  thead tr { background: var(--surface-2); }

  th {
    padding: 10px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.6px;
    white-space: nowrap;
    border-bottom: 1px solid var(--border);
  }

  td {
    padding: 13px 16px;
    font-size: 13.5px;
    color: var(--text-primary);
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }

  tr:last-child td { border-bottom: none; }
  tbody tr { transition: background 0.12s; }
  tbody tr:hover td { background: var(--surface-2); }

  /* ══ CHIPS / BADGES ══ */
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 600;
    white-space: nowrap;
  }

  .chip-green  { background: var(--green-mid);  color: var(--green); }
  .chip-blue   { background: var(--blue-mid);   color: var(--blue); }
  .chip-red    { background: var(--red-mid);    color: var(--red); }
  .chip-yellow { background: var(--yellow-mid); color: var(--yellow); }
  .chip-purple { background: var(--purple-mid); color: var(--purple); }
  .chip-gray   { background: #f0f0f0; color: var(--text-secondary); }

  /* ══ PROVIDER CARDS ══ */
  .provider-grid { display: flex; flex-direction: column; gap: 12px; }

  .provider-card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    overflow: hidden;
    transition: var(--transition);
    animation: fadeUp 0.35s cubic-bezier(0.4,0,0.2,1) both;
  }

  .provider-card:hover { box-shadow: var(--shadow); border-color: var(--border-2); }

  .provider-header {
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    border-bottom: 1px solid var(--border);
  }

  .provider-avatar {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
    font-family: var(--font-display);
  }

  .provider-name { font-size: 14.5px; font-weight: 600; }
  .provider-email { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

  .provider-body {
    padding: 14px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .mini-label { font-size: 10.5px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 7px; }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    margin: 2px 3px 2px 0;
  }

  .tag-blue   { background: var(--blue-light);   color: var(--blue);   border: 1px solid var(--blue-mid); }
  .tag-purple { background: var(--purple-light); color: var(--purple); border: 1px solid var(--purple-mid); }

  /* ══ BUTTONS ══ */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 12.5px;
    font-weight: 600;
    font-family: var(--font);
    cursor: pointer;
    border: none;
    outline: none;
    transition: var(--transition);
    white-space: nowrap;
  }

  .btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-block   { background: var(--red-light);   color: var(--red);   border: 1px solid var(--red-mid); }
  .btn-block:hover:not(:disabled)   { background: var(--red);   color: white; box-shadow: 0 4px 12px rgba(220,38,38,0.3); }

  .btn-unblock { background: var(--green-light); color: var(--green); border: 1px solid var(--green-mid); }
  .btn-unblock:hover:not(:disabled) { background: var(--green); color: white; box-shadow: 0 4px 12px rgba(5,150,105,0.3); }

  .btn-primary { background: var(--blue); color: white; border: 1px solid transparent; }
  .btn-primary:hover:not(:disabled) { background: var(--blue-hover); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }

  .btn-secondary { background: var(--surface); color: var(--text-secondary); border: 1.5px solid var(--border); }
  .btn-secondary:hover:not(:disabled) { background: var(--surface-2); border-color: var(--border-2); }

  .btn-approve { background: var(--green-light); color: var(--green); border: 1px solid var(--green-mid); }
  .btn-approve:hover:not(:disabled) { background: var(--green); color: white; box-shadow: 0 4px 12px rgba(5,150,105,0.3); }

  .btn-reject  { background: var(--red-light);  color: var(--red);   border: 1px solid var(--red-mid); }
  .btn-reject:hover:not(:disabled)  { background: var(--red);   color: white; box-shadow: 0 4px 12px rgba(220,38,38,0.3); }

  .btn-lg { padding: 11px 22px; font-size: 14px; border-radius: 10px; }

  /* ══ MODAL ══ */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(13,15,18,0.5);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
    padding: 20px;
    animation: overlayIn 0.18s ease;
  }

  @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: var(--surface);
    border-radius: var(--radius-xl);
    width: 100%;
    max-width: 420px;
    box-shadow: var(--shadow-xl);
    animation: modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
    overflow: hidden;
    border: 1px solid var(--border);
  }

  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.88) translateY(20px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }

  .modal-top {
    padding: 28px 28px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 14px;
  }

  .modal-icon-ring {
    width: 64px; height: 64px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }

  .modal-icon-ring::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    opacity: 0.15;
  }

  .modal-icon-ring.danger  { background: var(--red-light); }
  .modal-icon-ring.danger::before  { background: var(--red); }
  .modal-icon-ring.success { background: var(--green-light); }
  .modal-icon-ring.success::before { background: var(--green); }
  .modal-icon-ring.warning { background: var(--yellow-light); }
  .modal-icon-ring.warning::before { background: var(--yellow); }

  .modal-title { font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--text-primary); }
  .modal-desc  { font-size: 13.5px; color: var(--text-secondary); line-height: 1.55; }

  .modal-user-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
  }

  .modal-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  .modal-details {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin: 0 28px;
    overflow: hidden;
  }

  .modal-detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    font-size: 13px;
    border-bottom: 1px solid var(--border);
  }

  .modal-detail-row:last-child { border-bottom: none; }
  .modal-detail-label { color: var(--text-muted); font-weight: 500; }
  .modal-detail-value { font-weight: 600; color: var(--text-primary); }

  .modal-actions {
    display: flex;
    gap: 10px;
    padding: 20px 28px 28px;
  }

  .modal-actions .btn { flex: 1; justify-content: center; }

  /* ══ WITHDRAWAL CARDS ══ */
  .withdrawal-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }

  .w-stat {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 18px;
    animation: fadeUp 0.3s cubic-bezier(0.4,0,0.2,1) both;
  }

  .w-stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 6px; }
  .w-stat-value { font-family: var(--font-display); font-size: 24px; color: var(--text-primary); }

  /* ══ ACTIVITY ══ */
  .activity-list { padding: 4px 0; }

  .activity-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 13px 20px;
    border-bottom: 1px solid var(--border);
    transition: background 0.12s;
    animation: fadeUp 0.3s cubic-bezier(0.4,0,0.2,1) both;
  }

  .activity-item:last-child { border-bottom: none; }
  .activity-item:hover { background: var(--surface-2); }

  .activity-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-top: 5px;
    flex-shrink: 0;
  }

  .activity-msg { font-size: 13.5px; font-weight: 500; line-height: 1.4; }
  .activity-time { font-size: 11.5px; color: var(--text-muted); margin-top: 2px; }

  /* ══ EMPTY ══ */
  .empty {
    display: flex; flex-direction: column; align-items: center;
    padding: 60px 20px;
    color: var(--text-muted);
    gap: 10px;
  }

  .empty-icon { font-size: 36px; opacity: 0.25; margin-bottom: 4px; }
  .empty-text { font-size: 14px; font-weight: 500; }
  .empty-sub  { font-size: 12.5px; opacity: 0.7; }

  /* ══ SECTION HEADER ══ */
  .section-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 12px;
    flex-wrap: wrap;
  }

  .section-title { font-family: var(--font-display); font-size: 24px; font-weight: 400; letter-spacing: -0.3px; }
  .section-sub   { font-size: 13px; color: var(--text-muted); margin-top: 2px; }

  /* ══ ANIMATIONS ══ */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }

  /* ══ RESPONSIVE ══ */
  @media (max-width: 900px) {
    :root { --sidebar: 56px; }
    .sidebar-logo .logo-text-wrap { display: none; }
    .nav-item span, .nav-badge, .nav-section-label, .logout-btn span { display: none; }
    .nav-item { justify-content: center; padding: 10px; }
    .nav-item.active::before { display: none; }
    .provider-body { grid-template-columns: 1fr; }
    .withdrawal-stats { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 640px) {
    .content { padding: 14px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .topbar-search { display: none; }
    .section-header { flex-direction: column; align-items: stretch; }
    .toolbar { flex-direction: column; align-items: stretch; }
    .search-wrap input { width: 100%; }
    .withdrawal-stats { grid-template-columns: 1fr; }
    .revenue-banner { flex-direction: column; align-items: flex-start; gap: 16px; }
    .modal { max-width: 100%; }
  }


  /* ====== WITHDRAWAL CARDS ====== */
  .wd-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 16px;
  }

  .wd-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-xs);
    transition: var(--transition);
    animation: fadeUp 0.4s cubic-bezier(0.4,0,0.2,1) both;
    display: flex;
    flex-direction: column;
  }

  .wd-card:hover {
    box-shadow: var(--shadow);
    transform: translateY(-3px);
    border-color: var(--border-2);
  }

  .wd-accent {
    height: 4px;
    width: 100%;
    flex-shrink: 0;
  }

  .wd-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 18px 14px;
    border-bottom: 1px solid var(--border);
  }

  .wd-avatar {
    width: 42px; height: 42px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .wd-provider-info { flex: 1; min-width: 0; }
  .wd-name  { font-size: 14px; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .wd-email { font-size: 11.5px; color: var(--text-muted); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .wd-amount-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
    background: var(--surface-2);
  }

  .wd-amount-label { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 4px; }
  .wd-amount { font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--green); }

  .wd-method-badge {
    font-size: 11.5px;
    font-weight: 700;
    padding: 5px 11px;
    border-radius: 8px;
    letter-spacing: 0.2px;
  }

  .wd-method-upi  { background: var(--blue-mid);   color: var(--blue);   }
  .wd-method-bank { background: var(--purple-mid); color: var(--purple); }

  .wd-details-block {
    padding: 14px 18px;
    flex: 1;
  }

  .wd-details-title {
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    color: var(--text-muted);
    margin-bottom: 10px;
  }

  .wd-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .wd-detail-item {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 9px;
    padding: 9px 12px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    transition: var(--transition);
  }

  .wd-detail-item:hover { background: var(--blue-light); border-color: var(--blue-mid); }

  .wd-detail-full { grid-column: 1 / -1; }

  .wd-di-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); }
  .wd-di-value { font-size: 13px; font-weight: 600; color: var(--text-primary); word-break: break-all; }

  .wd-mono { font-family: 'Courier New', Courier, monospace; font-size: 12.5px; letter-spacing: 0.5px; }
  .wd-account { font-size: 14px; letter-spacing: 2px; color: var(--blue); }

  .wd-actions {
    display: flex;
    gap: 8px;
    padding: 12px 18px 16px;
    border-top: 1px solid var(--border);
    background: var(--surface);
  }

  .wd-done-msg {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 13px;
    font-weight: 600;
    width: 100%;
    justify-content: center;
    padding: 6px 0;
  }

  @media (max-width: 700px) {
    .wd-card-grid { grid-template-columns: 1fr; }
    .wd-details-grid { grid-template-columns: 1fr; }
    .wd-detail-full { grid-column: 1; }
  }

  /* ══ SCROLLBAR ══ */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

  .relative { position: relative; }
`;

/* ─── Helpers ─── */
const BASE = import.meta.env.VITE_API_URL;

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#2563eb,#1d4ed8)",
  "linear-gradient(135deg,#059669,#047857)",
  "linear-gradient(135deg,#7c3aed,#6d28d9)",
  "linear-gradient(135deg,#dc2626,#b91c1c)",
  "linear-gradient(135deg,#d97706,#b45309)",
  "linear-gradient(135deg,#0891b2,#0e7490)",
];

const getColor = (s = "") => AVATAR_GRADIENTS[s.charCodeAt(0) % AVATAR_GRADIENTS.length];
const initial = (s = "") => s.charAt(0).toUpperCase();
const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const fmtTime = (d) => new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

/* ─── Loader ─── */
function Loader({ label = "Loading…" }) {
  return (
    <div className="loader-wrap">
      <div className="loader">
        <div className="loader-ring" />
        <div className="loader-ring" />
        <div className="loader-ring" />
      </div>
      <span className="loader-text">{label}</span>
    </div>
  );
}

/* ─── Empty ─── */
function Empty({ label = "No data found", sub }) {
  return (
    <div className="empty">
      <div className="empty-icon">🔍</div>
      <div className="empty-text">{label}</div>
      {sub && <div className="empty-sub">{sub}</div>}
    </div>
  );
}

/* ─── Search ─── */
function SearchInput({ value, onChange, placeholder = "Search…" }) {
  return (
    <div className="search-wrap">
      <Search size={15} className="sw-icon" />
      <input
        style={{ paddingLeft: 34 }}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

/* ─── Filter Dropdown ─── */
function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel = options.find(o => o.value === value)?.label || label;

  return (
    <div className="relative" ref={ref}>
      <button className={`filter-btn ${value ? "active" : ""}`} onClick={() => setOpen(v => !v)}>
        <Filter size={13} />
        {selectedLabel}
        <ChevronDown size={12} />
      </button>
      {open && (
        <div className="filter-dropdown">
          {options.map(opt => (
            <div
              key={opt.value}
              className={`filter-option ${value === opt.value ? "selected" : ""}`}
              onClick={() => { onChange(opt.value === value ? "" : opt.value); setOpen(false); }}
            >
              {opt.icon && <span>{opt.icon}</span>}
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Block/Unblock Modal ─── */
function BlockModal({ open, onClose, onConfirm, actionType, user, loading }) {
  if (!open) return null;
  const isBlock = actionType === "block";
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && !loading && onClose()}>
      <div className="modal">
        <div className="modal-top">
          <div className={`modal-icon-ring ${isBlock ? "danger" : "success"}`}>
            {isBlock
              ? <ShieldOff size={28} color="var(--red)" />
              : <Shield size={28} color="var(--green)" />
            }
          </div>
          <div>
            <div className="modal-title">{isBlock ? "Block User" : "Unblock User"}</div>
            <div className="modal-desc" style={{ marginTop: 6 }}>
              {isBlock
                ? "This user will immediately lose access to the platform and all its services."
                : "This user will regain full access to the platform."}
            </div>
          </div>
          {user && (
            <div className="modal-user-tag">
              <div className="modal-dot" style={{ background: isBlock ? "var(--red)" : "var(--green)" }} />
              <span style={{ fontWeight: 600 }}>{user.name}</span>
              <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{user.email}</span>
            </div>
          )}
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary btn-lg" onClick={onClose} disabled={loading}>Cancel</button>
          <button
            className={`btn btn-lg ${isBlock ? "btn-block" : "btn-unblock"}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? <><div className="loader-ring" style={{ width: 14, height: 14, border: "2px solid transparent", borderTopColor: "currentColor", borderRadius: "50%", animation: "loaderSpin 1s linear infinite", display: "inline-block" }} /> Processing…</>
              : isBlock ? <><ShieldOff size={14} /> Block User</> : <><Shield size={14} /> Unblock User</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Withdrawal Action Modal ─── */
function WithdrawalModal({ open, onClose, onConfirm, actionType, withdrawal, loading }) {
  if (!open || !withdrawal) return null;
  const isApprove = actionType === "approve";
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && !loading && onClose()}>
      <div className="modal">
        <div className="modal-top">
          <div className={`modal-icon-ring ${isApprove ? "success" : "danger"}`}>
            {isApprove
              ? <CheckCircle size={28} color="var(--green)" />
              : <XSquare size={28} color="var(--red)" />
            }
          </div>
          <div>
            <div className="modal-title">{isApprove ? "Approve Withdrawal" : "Reject Withdrawal"}</div>
            <div className="modal-desc" style={{ marginTop: 6 }}>
              {isApprove
                ? "Confirm you want to approve this withdrawal request. The funds will be transferred to the provider."
                : "Confirm you want to reject this withdrawal request. The provider will be notified."}
            </div>
          </div>
        </div>

        <div className="modal-details">
          <div className="modal-detail-row">
            <span className="modal-detail-label">Provider</span>
            <span className="modal-detail-value">{withdrawal.provider?.name}</span>
          </div>
          <div className="modal-detail-row">
            <span className="modal-detail-label">Amount</span>
            <span className="modal-detail-value" style={{ color: "var(--green)" }}>₹ {withdrawal.amount?.toLocaleString("en-IN")}</span>
          </div>
          {withdrawal.upiId && (
            <div className="modal-detail-row">
              <span className="modal-detail-label">UPI ID</span>
              <span className="modal-detail-value">{withdrawal.upiId}</span>
            </div>
          )}
          {withdrawal.bankName && (
            <div className="modal-detail-row">
              <span className="modal-detail-label">Bank</span>
              <span className="modal-detail-value">{withdrawal.bankName}</span>
            </div>
          )}
          {withdrawal.accountNumber && (
            <div className="modal-detail-row">
              <span className="modal-detail-label">Account</span>
              <span className="modal-detail-value">
                {withdrawal.accountNumber}
              </span>
            </div>
          )}
          {withdrawal.ifscCode && (
            <div className="modal-detail-row">
              <span className="modal-detail-label">IFSC</span>
              <span className="modal-detail-value">{withdrawal.ifscCode}</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary btn-lg" onClick={onClose} disabled={loading}>Cancel</button>
          <button
            className={`btn btn-lg ${isApprove ? "btn-approve" : "btn-reject"}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? <><div style={{ width: 14, height: 14, border: "2px solid transparent", borderTopColor: "currentColor", borderRadius: "50%", animation: "loaderSpin 1s linear infinite", display: "inline-block" }} /> Processing…</>
              : isApprove ? <><CheckCircle size={14} /> Approve</> : <><XSquare size={14} /> Reject</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Nav ─── */
const NAV = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", section: "overview" },
  { id: "providers", icon: UserCheck, label: "Providers", section: "users" },
  { id: "consumers", icon: Users, label: "Consumers", section: "users" },
  { id: "transactions", icon: CreditCard, label: "Transactions", section: "finance" },
  { id: "withdrawals", icon: Banknote, label: "Withdrawals", section: "finance" },
  { id: "activity", icon: Activity, label: "Activity", section: "logs" },
];

const PAGE_TITLES = {
  dashboard: "Dashboard",
  providers: "Providers",
  consumers: "Consumers",
  transactions: "Transactions",
  withdrawals: "Withdrawal Requests",
  activity: "Activity Logs",
};

/* ═══════════════ APP ═══════════════ */
export default function AdminLayout() {
  const [active, setActive] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [revenue, setRevenue] = useState(0);
  const [transactions, setTx] = useState([]);
  const [providers, setProv] = useState([]);
  const [consumers, setCons] = useState([]);
  const [activity, setAct] = useState([]);
  const [withdrawals, setWD] = useState([]);
  const [loading, setLoading] = useState(false);

  // Block/unblock modal
  const [modal, setModal] = useState({ open: false, actionType: "", userId: null, user: null, kind: "provider" });
  const [modalLoading, setML] = useState(false);

  // Withdrawal modal
  const [wModal, setWModal] = useState({ open: false, actionType: "", withdrawal: null });
  const [wModalLoading, setWML] = useState(false);

  // Search states
  const [searchP, setSearchP] = useState("");
  const [searchC, setSearchC] = useState("");
  const [searchA, setSearchA] = useState("");
  const [searchW, setSearchW] = useState("");

  // Withdrawal filters
  const [wStatusFilter, setWStatusFilter] = useState("");
  const [wMethodFilter, setWMethodFilter] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  async function apiFetch(url, opts = {}) {
    const res = await fetch(BASE + url, {
      ...opts,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(opts.headers || {}) }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  useEffect(() => {
    setLoading(true);
    const loaders = {
      dashboard: async () => {
        const [d, r] = await Promise.all([apiFetch("/admin/dashboard"), apiFetch("/admin/revenue")]);
        setStats(d); setRevenue(r.totalRevenue || 0);
      },
      withdrawals: async () => { const d = await apiFetch("/allWithdrawals"); setWD(d.withdrawals || d || []); },
      transactions: async () => { const d = await apiFetch("/admin/revenue"); setTx(d.transactions || []); },
      providers: async () => { const d = await apiFetch("/admin/providers"); setProv(d || []); },
      consumers: async () => { const d = await apiFetch("/admin/consumers"); setCons(d || []); },
      activity: async () => { const d = await apiFetch("/admin/activity"); setAct(d || []); },
    };
    (loaders[active] || (async () => { }))().catch(console.error).finally(() => setLoading(false));
  }, [active]);

  async function handleToggleBlock() {
    setML(true);
    try {
      const { actionType, userId, kind } = modal;
      await apiFetch(`/admin/${kind}/${actionType}/${userId}`, { method: "PUT" });
      if (kind === "provider") { const d = await apiFetch("/admin/providers"); setProv(d || []); }
      else { const d = await apiFetch("/admin/consumers"); setCons(d || []); }
    } catch (e) { console.error(e); }
    setML(false);
    setModal(m => ({ ...m, open: false }));
  }

  async function handleWithdrawal() {
    setWML(true);
    try {
      const { actionType, withdrawal } = wModal;
      const endpoint = actionType === "approve" ? `/approve-withdrawal/${withdrawal._id}` : `/reject-withdrawal/${withdrawal._id}`;
      await apiFetch(endpoint, { method: "PUT" });
      const d = await apiFetch("/allWithdrawals");
      setWD(d.withdrawals || d || []);
    } catch (e) { console.error(e); }
    setWML(false);
    setWModal(m => ({ ...m, open: false }));
  }

  // Filtered data
  const filtProv = providers.filter(p =>
    p.name?.toLowerCase().includes(searchP.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchP.toLowerCase())
  );

  const filtCons = consumers.filter(c =>
    c.name?.toLowerCase().includes(searchC.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchC.toLowerCase())
  );

  const filtAct = activity.filter(a =>
    a.message?.toLowerCase().includes(searchA.toLowerCase()) ||
    a.type?.toLowerCase().includes(searchA.toLowerCase())
  );

  const filtWD = withdrawals.filter(w => {
    const matchSearch = !searchW ||
      w.provider?.name?.toLowerCase().includes(searchW.toLowerCase()) ||
      w.provider?.email?.toLowerCase().includes(searchW.toLowerCase());
    const matchStatus = !wStatusFilter || w.status === wStatusFilter;
    const matchMethod = !wMethodFilter ||
      (wMethodFilter === "upi" && w.upiId) ||
      (wMethodFilter === "bank" && w.bankName);
    return matchSearch && matchStatus && matchMethod;
  });

  // Withdrawal stats
  const wPending = withdrawals.filter(w => w.status === "pending").length;
  const wApproved = withdrawals.filter(w => w.status === "approved").length;
  const wRejected = withdrawals.filter(w => w.status === "rejected").length;
  const wTotal = withdrawals.reduce((s, w) => w.status === "approved" ? s + (w.amount || 0) : s, 0);

  const actColor = {
    payment: "var(--green)", block: "var(--red)", unblock: "var(--green)",
    subscription: "var(--blue)", login: "var(--purple)", register: "var(--yellow)"
  };

  const actChip = {
    payment: "chip-green", block: "chip-red", unblock: "chip-green",
    subscription: "chip-blue", login: "chip-purple", register: "chip-yellow"
  };

  const sections = [...new Set(NAV.map(n => n.section))];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="app">

        {/* ═══ SIDEBAR ═══ */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-gem">
              <Zap size={16} color="white" />
            </div>
            <div className="logo-text-wrap">
              <div className="logo-text">Flowra</div>
              <div className="logo-badge">ADMIN</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {sections.map(sec => (
              <div key={sec}>
                <div className="nav-section-label">{sec}</div>
                {NAV.filter(n => n.section === sec).map(({ id, icon: Icon, label }) => (
                  <div
                    key={id}
                    className={`nav-item ${active === id ? "active" : ""}`}
                    onClick={() => setActive(id)}
                  >
                    <div className="nav-icon"><Icon size={17} /></div>
                    <span>{label}</span>
                    {id === "withdrawals" && wPending > 0 && (
                      <span className="nav-badge">{wPending}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="logout-btn" onClick={() => { localStorage.clear(); window.location.href = "/"; }}>
              <LogOut size={17} />
              <span>Logout</span>
            </div>
          </div>
        </aside>

        {/* ═══ MAIN ═══ */}
        <div className="main">
          <header className="topbar">
            <h1 className="topbar-title">{PAGE_TITLES[active]}</h1>
            <div className="topbar-search">
              <input placeholder="Search anything…" />
              <Search size={14} className="search-icon" />
            </div>
          </header>

          <div className="content">

            {/* ─── DASHBOARD ─── */}
            {active === "dashboard" && (
              loading ? <Loader label="Loading dashboard…" /> : (
                <div>
                  <div className="stats-grid">
                    {[
                      { label: "Total Users", value: stats.totalUsers, icon: <Users size={18} />, bg: "var(--blue-light)", color: "var(--blue)", delay: 0 },
                      { label: "Providers", value: stats.totalProviders, icon: <UserCheck size={18} />, bg: "var(--green-light)", color: "var(--green)", delay: 0.06 },
                      { label: "Consumers", value: stats.totalConsumers, icon: <Users size={18} />, bg: "var(--yellow-light)", color: "var(--yellow)", delay: 0.12 },
                      { label: "Total APIs", value: stats.totalAPIs, icon: <Globe size={18} />, bg: "var(--purple-light)", color: "var(--purple)", delay: 0.18 },
                    ].map((s, i) => (
                      <div className="stat-card" key={i} style={{ animationDelay: `${s.delay}s` }}>
                        <div className="stat-card-top">
                          <div className="stat-icon-wrap" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                          <div className="stat-trend"><ArrowUpRight size={12} /> Live</div>
                        </div>
                        <div className="stat-label">{s.label}</div>
                        <div className="stat-value">{s.value ?? "—"}</div>
                      </div>
                    ))}
                  </div>

                  <div className="revenue-banner">
                    <div className="revenue-left">
                      <div className="revenue-label">Total Platform Revenue</div>
                      <div className="revenue-value">₹ {(revenue || 0).toLocaleString("en-IN")}</div>
                      <div className="revenue-sub">Across all completed transactions</div>
                    </div>
                    <div className="revenue-icon-wrap">
                      <TrendingUp size={28} color="rgba(255,255,255,0.7)" />
                    </div>
                  </div>
                </div>
              )
            )}

            {/* ─── TRANSACTIONS ─── */}
            {active === "transactions" && (
              loading ? <Loader label="Fetching transactions…" /> : (
                <div className="card">
                  <div className="card-header">
                    <CreditCard size={17} color="var(--blue)" />
                    <span className="card-title">All Transactions</span>
                    <span className="card-count" style={{ marginLeft: "auto" }}>{transactions.length} records</span>
                  </div>
                  {transactions.length === 0 ? <Empty label="No transactions yet" sub="Transactions will appear here once processed" /> : (
                    <div className="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            {["Consumer", "API", "Plan", "Provider", "Amount", "Provider Earning", "Platform Cut", "Date"].map(h => (
                              <th key={h}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map(t => (
                            <tr key={t._id}>
                              <td>
                                <div style={{ fontWeight: 600 }}>{t.user?.name}</div>
                                <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{t.user?.email}</div>
                              </td>
                              <td><span className="chip chip-blue">{t.api?.name}</span></td>
                              <td><span className="chip chip-purple">{t.plan?.name}</span></td>
                              <td style={{ fontWeight: 500 }}>{t.api?.owner?.name}</td>
                              <td style={{ fontWeight: 700 }}>₹ {t.amount?.toLocaleString("en-IN")}</td>
                              <td style={{ color: "var(--green)", fontWeight: 700 }}>₹ {t.providerEarning?.toLocaleString("en-IN")}</td>
                              <td><span className="chip chip-green">₹ {t.platformEarning?.toLocaleString("en-IN")}</span></td>
                              <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{fmtDate(t.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            )}

            {/* ─── WITHDRAWALS ─── */}
            {active === "withdrawals" && (
              loading ? <Loader label="Loading withdrawal requests…" /> : (
                <>
                  {/* Stats row */}
                  <div className="withdrawal-stats">
                    {[
                      { label: "Pending", value: wPending, color: "var(--yellow)", bg: "var(--yellow-light)", delay: 0 },
                      { label: "Approved", value: wApproved, color: "var(--green)", bg: "var(--green-light)", delay: 0.05 },
                      { label: "Rejected", value: wRejected, color: "var(--red)", bg: "var(--red-light)", delay: 0.1 },
                    ].map(s => (
                      <div className="w-stat" key={s.label} style={{ animationDelay: `${s.delay}s`, borderLeft: `3px solid ${s.color}` }}>
                        <div className="w-stat-label">{s.label}</div>
                        <div className="w-stat-value" style={{ color: s.color }}>{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Toolbar */}
                  <div className="toolbar" style={{ marginBottom: 16 }}>
                    <SearchInput
                      value={searchW}
                      onChange={setSearchW}
                      placeholder="Search by provider name or email…"
                    />
                    <FilterDropdown
                      label="All Statuses"
                      value={wStatusFilter}
                      onChange={setWStatusFilter}
                      options={[
                        { value: "pending", label: "Pending", icon: "⏳" },
                        { value: "approved", label: "Approved", icon: "✅" },
                        { value: "rejected", label: "Rejected", icon: "❌" },
                      ]}
                    />
                    <FilterDropdown
                      label="All Methods"
                      value={wMethodFilter}
                      onChange={setWMethodFilter}
                      options={[
                        { value: "upi", label: "UPI", icon: "📱" },
                        { value: "bank", label: "Bank Transfer", icon: "🏦" },
                      ]}
                    />
                    {(wStatusFilter || wMethodFilter || searchW) && (
                      <button
                        className="filter-btn"
                        onClick={() => { setWStatusFilter(""); setWMethodFilter(""); setSearchW(""); }}
                        style={{ color: "var(--red)", borderColor: "var(--red-mid)", background: "var(--red-light)" }}
                      >
                        <X size={12} /> Clear
                      </button>
                    )}
                    <span style={{ marginLeft: "auto", fontSize: 12.5, color: "var(--text-muted)", fontWeight: 500 }}>
                      {filtWD.length} of {withdrawals.length} requests
                    </span>
                  </div>

                  {filtWD.length === 0 ? (
                    <div className="card"><Empty label="No withdrawal requests found" sub="Try adjusting your filters" /></div>
                  ) : (
                    <div className="wd-card-grid">
                      {filtWD.map((w, i) => {
                        const isUpi = !!w.upiId;
                        const isPending = w.status === "pending";
                        const isApproved = w.status === "approved";
                        const isRejected = w.status === "rejected";
                        return (
                          <div key={w._id} className="wd-card" style={{ animationDelay: `${i * 0.055}s` }}>
                            <div className="wd-accent" style={{ background: isPending ? "var(--yellow)" : isApproved ? "var(--green)" : "var(--red)" }} />
                            <div className="wd-head">
                              <div className="wd-avatar" style={{ background: getColor(w.provider?.name || "") }}>
                                {initial(w.provider?.name || "")}
                              </div>
                              <div className="wd-provider-info">
                                <div className="wd-name">{w.provider?.name || "—"}</div>
                                <div className="wd-email">{w.provider?.email || "—"}</div>
                              </div>
                              <span className={`chip ${isPending ? "chip-yellow" : isApproved ? "chip-green" : "chip-red"}`}>
                                {isPending && <Clock size={10} />}
                                {isApproved && <CheckCircle size={10} />}
                                {isRejected && <X size={10} />}
                                {" "}{w.status}
                              </span>
                            </div>
                            <div className="wd-amount-row">
                              <div>
                                <div className="wd-amount-label">Withdrawal Amount</div>
                                <div className="wd-amount">Rs. {(w.amount || 0).toLocaleString("en-IN")}</div>
                              </div>
                              <div className={`wd-method-badge ${isUpi ? "wd-method-upi" : "wd-method-bank"}`}>
                                {isUpi ? "UPI Payment" : "Bank Transfer"}
                              </div>
                            </div>
                            <div className="wd-details-block">
                              <div className="wd-details-title">{isUpi ? "UPI Details" : "Bank Details"}</div>
                              <div className="wd-details-grid">
                                {isUpi ? (
                                  <div className="wd-detail-item wd-detail-full">
                                    <span className="wd-di-label">UPI ID</span>
                                    <span className="wd-di-value wd-mono">{w.upiId || "—"}</span>
                                  </div>
                                ) : (
                                  <>
                                    <div className="wd-detail-item">
                                      <span className="wd-di-label">Bank Name</span>
                                      <span className="wd-di-value">{w.bankName || "—"}</span>
                                    </div>
                                    <div className="wd-detail-item">
                                      <span className="wd-di-label">IFSC Code</span>
                                      <span className="wd-di-value wd-mono">{w.ifscCode || "—"}</span>
                                    </div>
                                    <div className="wd-detail-item wd-detail-full">
                                      <span className="wd-di-label">Account Number</span>
                                      <span className="wd-di-value wd-mono wd-account">{w.accountNumber || "—"}</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="wd-actions">
                              {isPending ? (
                                <>
                                  <button className="btn btn-approve" style={{ flex: 1, justifyContent: "center" }} onClick={() => setWModal({ open: true, actionType: "approve", withdrawal: w })}>
                                    <CheckCircle size={13} /> Approve
                                  </button>
                                  <button className="btn btn-reject" style={{ flex: 1, justifyContent: "center" }} onClick={() => setWModal({ open: true, actionType: "reject", withdrawal: w })}>
                                    <XSquare size={13} /> Reject
                                  </button>
                                </>
                              ) : (
                                <div className="wd-done-msg" style={{ color: isApproved ? "var(--green)" : "var(--red)" }}>
                                  {isApproved ? <><CheckCircle size={14} />{" "}Payment Processed</> : <><X size={14} />{" "}Request Declined</>}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )
            )}

            {/* ─── PROVIDERS ─── */}
            {active === "providers" && (
              loading ? <Loader label="Loading providers…" /> : (
                <>
                  <div className="section-header">
                    <div>
                      <div className="section-title">Providers</div>
                      <div className="section-sub">{providers.length} registered providers</div>
                    </div>
                    <SearchInput value={searchP} onChange={setSearchP} placeholder="Search providers…" />
                  </div>
                  <div className="provider-grid">
                    {filtProv.length === 0
                      ? <Empty label="No providers found" sub="Try a different search term" />
                      : filtProv.map((p, i) => (
                        <div className="provider-card" key={p._id} style={{ animationDelay: `${i * 0.05}s` }}>
                          <div className="provider-header">
                            <div className="provider-avatar" style={{ background: getColor(p.name) }}>
                              {initial(p.name)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="provider-name">{p.name}</div>
                              <div className="provider-email">{p.email}</div>
                              {p.isBlocked && <span className="chip chip-red" style={{ marginTop: 5 }}><ShieldOff size={9} /> Blocked</span>}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 700, color: "var(--green)", fontSize: 16, fontFamily: "var(--font-display)" }}>
                                <TrendingUp size={14} /> ₹ {(p.earnings || 0).toLocaleString("en-IN")}
                              </div>
                              <button
                                className={`btn ${p.isBlocked ? "btn-unblock" : "btn-block"}`}
                                onClick={() => setModal({ open: true, actionType: p.isBlocked ? "unblock" : "block", userId: p._id, user: p, kind: "provider" })}
                              >
                                {p.isBlocked ? <><Shield size={12} /> Unblock</> : <><ShieldOff size={12} /> Block</>}
                              </button>
                            </div>
                          </div>
                          <div className="provider-body">
                            <div>
                              <div className="mini-label">APIs ({p.apis?.length || 0})</div>
                              {p.apis?.length
                                ? p.apis.map(a => <span key={a._id} className="tag tag-blue"><Globe size={10} />{a.name}</span>)
                                : <span style={{ fontSize: 12, color: "var(--text-muted)" }}>No APIs yet</span>
                              }
                            </div>
                            <div>
                              <div className="mini-label">Plans ({p.plans?.length || 0})</div>
                              {p.plans?.length
                                ? p.plans.map(pl => <span key={pl._id} className="tag tag-purple"><Star size={10} />{pl.name}</span>)
                                : <span style={{ fontSize: 12, color: "var(--text-muted)" }}>No plans yet</span>
                              }
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </>
              )
            )}

            {/* ─── CONSUMERS ─── */}
            {active === "consumers" && (
              loading ? <Loader label="Loading consumers…" /> : (
                <>
                  <div className="section-header">
                    <div>
                      <div className="section-title">Consumers</div>
                      <div className="section-sub">{consumers.length} registered consumers</div>
                    </div>
                    <SearchInput value={searchC} onChange={setSearchC} placeholder="Search consumers…" />
                  </div>
                  <div className="provider-grid">
                    {filtCons.length === 0
                      ? <Empty label="No consumers found" sub="Try a different search term" />
                      : filtCons.map((c, i) => (
                        <div className="provider-card" key={c._id} style={{ animationDelay: `${i * 0.05}s` }}>
                          <div className="provider-header">
                            <div className="provider-avatar" style={{ background: getColor(c.name) }}>
                              {initial(c.name)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="provider-name">{c.name}</div>
                              <div className="provider-email">{c.email}</div>
                              {c.isBlocked && <span className="chip chip-red" style={{ marginTop: 5 }}><ShieldOff size={9} /> Blocked</span>}
                            </div>
                            <button
                              className={`btn ${c.isBlocked ? "btn-unblock" : "btn-block"}`}
                              onClick={() => setModal({ open: true, actionType: c.isBlocked ? "unblock" : "block", userId: c._id, user: c, kind: "consumer" })}
                            >
                              {c.isBlocked ? <><Shield size={12} /> Unblock</> : <><ShieldOff size={12} /> Block</>}
                            </button>
                          </div>
                          {c.subscriptions?.length > 0 && (
                            <div style={{ padding: "12px 20px 14px" }}>
                              <div className="mini-label">Subscriptions ({c.subscriptions.length})</div>
                              {c.subscriptions.map(s => (
                                <span key={s._id} className="tag tag-blue">
                                  <Globe size={10} />{s.api?.name}
                                  {s.plan?.name && <><span style={{ opacity: 0.4 }}>·</span><Star size={9} />{s.plan.name}</>}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    }
                  </div>
                </>
              )
            )}

            {/* ─── ACTIVITY ─── */}
            {active === "activity" && (
              loading ? <Loader label="Loading activity logs…" /> : (
                <>
                  <div className="section-header">
                    <div>
                      <div className="section-title">Activity Logs</div>
                      <div className="section-sub">{activity.length} total events</div>
                    </div>
                    <SearchInput value={searchA} onChange={setSearchA} placeholder="Filter by type or message…" />
                  </div>
                  <div className="card">
                    <div className="activity-list">
                      {filtAct.length === 0
                        ? <Empty label="No activity found" sub="Logs will appear here as actions occur" />
                        : filtAct.map((a, i) => (
                          <div className="activity-item" key={a._id} style={{ animationDelay: `${i * 0.025}s` }}>
                            <div className="activity-dot" style={{ background: actColor[a.type] || "var(--blue-mid)" }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="activity-msg">{a.message}</div>
                              <div className="activity-time">{fmtTime(a.createdAt)}</div>
                            </div>
                            <span className={`chip ${actChip[a.type] || "chip-gray"}`}>{a.type}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </>
              )
            )}

          </div>
        </div>

        {/* ═══ MODALS ═══ */}
        <BlockModal
          open={modal.open}
          onClose={() => !modalLoading && setModal(m => ({ ...m, open: false }))}
          onConfirm={handleToggleBlock}
          actionType={modal.actionType}
          user={modal.user}
          loading={modalLoading}
        />

        <WithdrawalModal
          open={wModal.open}
          onClose={() => !wModalLoading && setWModal(m => ({ ...m, open: false }))}
          onConfirm={handleWithdrawal}
          actionType={wModal.actionType}
          withdrawal={wModal.withdrawal}
          loading={wModalLoading}
        />

      </div>
    </>
  );
}
