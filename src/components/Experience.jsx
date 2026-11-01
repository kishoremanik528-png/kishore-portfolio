import React from "react";
import { BookOpen, Code2, FolderKanban, GraduationCap } from "lucide-react";
import Reveal from "./Reveal.jsx";

const milestones = [
  {
    label: "EDUCATION", date: "2023 — 2027", icon: GraduationCap,
    title: "B.Tech Artificial Intelligence and Data Science",
    place: "Dhanalakshmi Srinivasan University · Trichy",
    description: "Pursuing an undergraduate degree with an expected graduation in 2027.",
  },
  {
    label: "LEARNING JOURNEY", date: "Ongoing", icon: Code2,
    title: "Full-stack development",
    place: "Self-directed learning",
    description: "Building skills across frontend interfaces, backend development, databases, and application workflows.",
  },
  {
    label: "PERSONAL PROJECT", date: "Project milestone", icon: FolderKanban,
    title: "LandGuard AI",
    place: "Independent project",
    description: "Exploring document comparison, AI/OCR, and inconsistency highlighting for land records.",
  },
  {
    label: "PERSONAL PROJECTS", date: "Project milestones", icon: BookOpen,
    title: "SoulSync AI & Weather App",
    place: "Independent projects",
    description: "Learning through an emotional support companion concept and a responsive weather application.",
  },
];

export default function Experience() {
  return (
    <section className="section journey-section" id="experience">
      <div className="section-container">
        <Reveal className="section-heading">
          <span className="section-kicker">THE JOURNEY SO FAR</span>
          <h2>Learning by <span>doing</span></h2>
          <p>A student journey shaped by study, curiosity, and hands-on projects.</p>
        </Reveal>
        <div className="journey-timeline">
          {milestones.map(({ label, date, icon: Icon, title, place, description }, index) => (
            <Reveal className="timeline-item" delay={index * 65} key={title}>
              <div className="timeline-marker"><Icon size={17} /></div>
              <article className="timeline-card">
                <div className="timeline-meta"><span>{label}</span><time>{date}</time></div>
                <h3>{title}</h3>
                <strong>{place}</strong>
                <p>{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="journey-note">This timeline represents education and personal learning projects; no professional employment is listed.</p>
      </div>
    </section>
  );
}
