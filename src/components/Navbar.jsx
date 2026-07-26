import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import GlowButton from './GlowButton';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

// Our SaaS products, shown in the "Solutions" hover menu.
const SOLUTIONS = [{ name: 'Hireflow', href: 'https://hireflow.cortinix.com' }];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const solutionsRef = useRef(null);
  const location = useLocation();

  // Add a solid background once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
    setMobileSolutionsOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the Solutions dropdown on outside click / Escape.
  useEffect(() => {
    if (!solutionsOpen) return undefined;
    const onDocClick = (e) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target)) {
        setSolutionsOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setSolutionsOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [solutionsOpen]);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar-inner container" aria-label="Primary">
        <Link to="/" className="navbar-logo" aria-label="Cortinix home">
          <img
            className="logo-mark"
            src="/brand/cortinix-icon.png"
            alt=""
            aria-hidden="true"
            width={34}
            height={40}
          />
          <span className="logo-text">
            Corti<span className="text-gradient">nix</span>
          </span>
        </Link>

        <ul className="navbar-links">
          {LINKS.slice(0, 1).map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}

          <li
            className="nav-item-solutions"
            ref={solutionsRef}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              className="nav-link nav-solutions-trigger"
              aria-haspopup="true"
              aria-expanded={solutionsOpen}
              onClick={() => setSolutionsOpen((o) => !o)}
            >
              Solutions
              <ChevronDown size={14} className="nav-solutions-chevron" aria-hidden="true" />
            </button>
            <div className={`nav-solutions-panel ${solutionsOpen ? 'is-open' : ''}`}>
              {SOLUTIONS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-solutions-item"
                >
                  {s.name}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </li>

          {LINKS.slice(1).map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <div className="navbar-cta-desktop">
            <GlowButton to="/contact">Get Free Consultation</GlowButton>
          </div>

          <button
            className="navbar-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul>
          {LINKS.slice(0, 1).map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}

          <li className="mobile-solutions">
            <button
              type="button"
              className="mobile-link mobile-solutions-trigger"
              aria-expanded={mobileSolutionsOpen}
              onClick={() => setMobileSolutionsOpen((o) => !o)}
            >
              Solutions
              <ChevronDown
                size={22}
                className={`mobile-solutions-chevron ${mobileSolutionsOpen ? 'is-open' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div className={`mobile-solutions-list ${mobileSolutionsOpen ? 'is-open' : ''}`}>
              {SOLUTIONS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-solutions-item"
                  onClick={() => setOpen(false)}
                >
                  {s.name}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </li>

          {LINKS.slice(1).map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <GlowButton to="/contact" className="mobile-cta" onClick={() => setOpen(false)}>
          Get Free Consultation
        </GlowButton>
      </div>
    </header>
  );
}
