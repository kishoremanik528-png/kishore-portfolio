import React, { useEffect, useState } from "react";
import {
  Download,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { portfolio } from "../config/portfolio.js";

const sections = ["home", "about", "skills", "projects", "experience", "contact"];

export default function Navbar({ isDark, onToggleTheme }) {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  function handleNavigation() {
    setMenuOpen(false);
  }

  async function handleResumeDownload(event) {
    event.preventDefault();

    const response = await fetch(portfolio.resumePdfPath);
    if (!response.ok) return;

    const file = await response.blob();
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Kishore_Manik_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  }

  return (
    <header className="navbar">
      <a className="brand" href="#home">
        <span className="brand-mark">
          {portfolio.fullName.split(/\s+/).map((part, index) => (
            <React.Fragment key={part}>
              {index === 1 ? <span>{part.charAt(0)}</span> : part.charAt(0)}
            </React.Fragment>
          ))}
        </span>
        <span className="brand-name">{portfolio.fullName}</span>
      </a>

      <nav className={`nav-links${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
        {sections.map((section) => (
          <a
            className={activeSection === section ? "active" : ""}
            href={`#${section}`}
            key={section}
            onClick={handleNavigation}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <div className="resume-action">
          <a
            className="resume-button"
            href={portfolio.resumePdfPath}
            download="Kishore_Manik_Resume.pdf"
            aria-label="Download Resume"
            onClick={handleResumeDownload}
          >
            <Download size={15} />
            Download Resume
          </a>
        </div>

        <button
          className="theme-button"
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title="Toggle color theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}
