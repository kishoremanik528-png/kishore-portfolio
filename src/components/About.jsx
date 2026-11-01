import React from "react";
import {
  ArrowUpRight,
  Code2,
  FolderOpen,
  GraduationCap,
  MapPin,
  Target,
} from "lucide-react";
import { portfolio } from "../config/portfolio.js";
import Reveal from "./Reveal.jsx";

const profileCards = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech Artificial Intelligence & Data Science",
    detail: "Dhanalakshmi Srinivasan University, Trichy",
  },
  {
    icon: FolderOpen,
    label: "Projects",
    value: "3+ Major Projects",
    detail: "LandGuard AI, SoulSync AI, Weather App",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Trichy, Tamil Nadu",
    detail: "Based in India",
  },
  {
    icon: Target,
    label: "Career Goal",
    value: "Aspiring Software Developer",
    detail: "Building practical digital solutions",
  },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-container">
        <Reveal className="section-heading about-heading">
          <span className="section-kicker">A LITTLE ABOUT ME</span>
          <h2>
            Building Digital Solutions with <span>Code &amp; Intelligence</span>.
          </h2>
          <p>Curiosity, code, and a focus on solving real-world problems.</p>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-photo-wrap">
            <div className="about-photo-card">
              <img
                className="about-photo-image"
                src="/images/km-1.jpeg"
                alt={`${portfolio.fullName} wearing a navy suit and white shirt`}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="about-photo-caption">
              <span className="status-dot" aria-hidden="true" />
              Focused on Continuous Learning
            </div>
          </Reveal>

          <Reveal className="about-copy" delay={90}>
            <div className="about-badges" aria-label="Professional profile">
              <span className="about-badge">
                <GraduationCap size={15} aria-hidden="true" />
                AI &amp; DS Student
              </span>
              <span className="about-badge">
                <Code2 size={15} aria-hidden="true" />
                Aspiring Software Developer
              </span>
            </div>
            <h3>Technology should solve real-world problems.</h3>
            <p>
              I&apos;m a B.Tech Artificial Intelligence and Data Science student at
              Dhanalakshmi Srinivasan University, Trichy, with a strong interest
              in full-stack development and AI-powered applications.
            </p>
            <p>
              I enjoy building practical software solutions and improving my
              skills through hands-on projects, including LandGuard AI,
              SoulSync AI, and Weather App.
            </p>
            <p>
              My goal is to develop reliable, user-focused applications and grow
              as a software developer.
            </p>
            <a className="text-link" href="#projects">
              Explore my projects <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="profile-grid">
          {profileCards.map(({ icon: Icon, label, value, detail }, index) => (
            <Reveal className="profile-card" delay={index * 60} key={label}>
              <span className="profile-icon" aria-hidden="true">
                <Icon size={19} />
              </span>
              <span className="profile-label">{label}</span>
              <strong>{value}</strong>
              <small>{detail}</small>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
