import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import HeroScene from "./HeroScene.jsx";
import PortraitShowcase from "./PortraitShowcase.jsx";
import { portfolio } from "../config/portfolio.js";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [firstName, ...remainingName] = portfolio.fullName.split(/\s+/);
  const lastName = remainingName.join(" ");
  const socialLinks = [
    { label: "GitHub", href: portfolio.githubProfileUrl, icon: Github },
    { label: "LinkedIn", href: portfolio.linkedinProfileUrl, icon: Linkedin },
    {
      label: "Email",
      href: portfolio.professionalEmail
        ? `mailto:${portfolio.professionalEmail}`
        : "",
      icon: Mail,
    },
  ].filter((link) => link.href);

  return (
    <section className="hero" id="home">
      <div className="hero-glow glow-one" />
      <div className="hero-glow glow-two" />

      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <div className="eyebrow">
          <span className="status-dot" />
          B.Tech AI &amp; Data Science student
        </div>
        <div className="mobile-hero-photo">
          <PortraitShowcase />
        </div>
        <p className="hello">Hello, I’m</p>
        <h1>
          {firstName} {lastName && <span>{lastName}</span>}
        </h1>
        <h2>Aspiring Full Stack Developer</h2>
        <p className="hero-description">
          I’m studying Artificial Intelligence and Data Science at Dhanalakshmi
          Srinivasan University, Trichy, and building full-stack and AI-powered
          projects that explore real-world ideas.
        </p>

        <div className="hero-cta">
          <a className="button button-primary" href="#projects">
            View My Projects <ArrowRight size={17} />
          </a>
          <a className="button button-secondary" href="#contact">
            Get in touch <Mail size={16} />
          </a>
        </div>

        <div className="social-links">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              href={href}
              key={label}
              aria-label={label}
              title={label}
              target={label === "Email" ? undefined : "_blank"}
              rel={label === "Email" ? undefined : "noopener noreferrer"}
            >
              <Icon size={19} />
            </a>
          ))}
        </div>

        <a className="scroll-hint" href="#about">
          <span className="scroll-line" /> Scroll to explore
        </a>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 0.85, delay: 0.15 }
        }
      >
        <div className="mobile-hero-effects" aria-hidden="true">
          <span className="mobile-orbit mobile-orbit-one" />
          <span className="mobile-orbit mobile-orbit-two" />
          <span className="mobile-float-icon mobile-ai-icon"><BrainCircuit size={18} /></span>
          <span className="mobile-float-icon mobile-code-icon"><Code2 size={18} /></span>
        </div>
        <div className="visual-orbit orbit-a" />
        <div className="visual-orbit orbit-b" />
        <HeroScene />

        <PortraitShowcase />

        <div className="floating-note note-left">
          <span className="note-icon" aria-hidden="true">
            <Sparkles size={16} />
          </span>
          <strong>Build. Learn. Grow.</strong>
          <small>One project at a time.</small>
        </div>
        <div className="floating-note note-right">
          <span className="live-dot" />
          <strong>Currently exploring</strong>
          <small>Full Stack + AI</small>
        </div>
        <div className="visual-caption">
         
        </div>
      </motion.div>
    </section>
  );
}
