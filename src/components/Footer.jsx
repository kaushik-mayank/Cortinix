import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Dribbble, MapPin, Mail } from 'lucide-react';
import services from '../data/services';

const topServices = services.slice(0, 6);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img
                className="footer-logo-mark"
                src="/brand/cortinix-icon-white.png"
                alt=""
                aria-hidden="true"
                width={28}
                height={33}
              />
              <span>
                Corti<span className="text-gradient">nix</span>
              </span>
            </Link>
            <p>
              Where human intelligence meets AI precision. We build, scale and automate your entire
              business across 15+ specialized services — so you can focus on growth.
            </p>
            <div className="footer-address">
              <MapPin size={16} aria-hidden="true" />
              <span>
                6th Floor, WeWork Lightbridge, Saki Vihar Rd, Tunga Village, Chandivali, Powai,
                Mumbai, Maharashtra 400072
              </span>
            </div>
            <a className="footer-address footer-email" href="mailto:hello@cortinix.com">
              <Mail size={16} aria-hidden="true" />
              <span>hello@cortinix.com</span>
            </a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Top Services</h4>
            {topServices.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Get Started</h4>
            <Link to="/contact">Free Consultation</Link>
            <Link to="/services">Explore Services</Link>
            <a href="mailto:hello@cortinix.com">hello@cortinix.com</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Cortinix. Faster delivery, smarter outcomes.</span>
          <div className="footer-socials">
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter / X" target="_blank" rel="noreferrer">
              <Twitter size={18} />
            </a>
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer">
              <Github size={18} />
            </a>
            <a href="https://dribbble.com" aria-label="Dribbble" target="_blank" rel="noreferrer">
              <Dribbble size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
