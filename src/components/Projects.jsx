import React, { useCallback } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  CloudSun,
  FileSearch,
  Github,
  HeartHandshake,
} from "lucide-react";
import Reveal from "./Reveal.jsx";
import { portfolio } from "../config/portfolio.js";

const projects = [
  {
    id: "landguard-ai",
    name: "LandGuard AI",
    type: "AI · Document verification",
    description: "An AI-assisted land document cross-verification system that compares property documents and highlights inconsistencies.",
    tech: ["React", "Flask", "MySQL", "AI / OCR"],
    icon: FileSearch,
    visual: "landguard",
    mark: "LG",
  },
  {
    id: "soulsync-ai",
    name: "SoulSync AI",
    type: "AI · Wellbeing concept",
    description: "An AI-powered emotional support companion concept with daily check-ins and supportive conversations.",
    tech: ["Python", "HTML", "CSS", "JavaScript"],
    icon: HeartHandshake,
    visual: "soulsync",
    mark: "SS",
  },
  {
    id: "weather-app",
    name: "Weather App",
    type: "Web application",
    description: "A responsive weather application concept for current conditions and forecasts using a weather API.",
    tech: ["HTML", "CSS", "JavaScript", "Weather API"],
    icon: CloudSun,
    visual: "weather",
    mark: "WEATHER",
  },
];

function ProjectPreview({ project: { icon: Icon, visual, mark, name } }) {
  return (
    <div className={`project-preview ${visual}`} aria-label={`${name} project preview`}>
      <div className="preview-window">
        <div className="preview-topbar"><span /><span /><span /><i>{mark}</i></div>
        <div className="preview-content">
          <span className="preview-symbol"><Icon size={25} strokeWidth={1.7} /></span>
          <strong>{name}</strong>
          <span className="preview-line preview-line-wide" />
          <span className="preview-line" />
          {visual === "weather" && <div className="preview-weather"><CloudSun size={28} /><b>24°</b></div>}
          {visual === "landguard" && <div className="preview-doc"><span /><span /><span /></div>}
          {visual === "soulsync" && <div className="preview-chat"><span /><span /></div>}
        </div>
      </div>
    </div>
  );
}


function ProjectCard({ project, index, liveDemoUrl, githubRepositoryUrl }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 180, damping: 22, mass: 0.45 });
  const springY = useSpring(pointerY, { stiffness: 180, damping: 22, mass: 0.45 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);

  const handlePointerMove = useCallback((event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }, [pointerX, pointerY, reduceMotion]);

  const resetTilt = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const openLiveDemo = useCallback(() => {
    if (!liveDemoUrl) return;
    const demoWindow = window.open("about:blank", "_blank");
    if (demoWindow) {
      demoWindow.opener = null;
      demoWindow.location.href = liveDemoUrl;
    }
  }, [liveDemoUrl]);

  const handleCardClick = useCallback((event) => {
    if (event.target.closest("a, button")) return;
    openLiveDemo();
  }, [openLiveDemo]);

  const handleCardKeyDown = useCallback((event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLiveDemo();
    }
  }, [openLiveDemo]);

  const stopNestedLinkClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <Reveal className="project-card-reveal" delay={index * 75} key={project.name}>
      <motion.article
        className="project-card"
        style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        role={liveDemoUrl ? "link" : undefined}
        tabIndex={liveDemoUrl ? 0 : undefined}
        aria-label={liveDemoUrl ? `Open ${project.name} live demo in a new tab` : undefined}
      >
        <ProjectPreview project={project} />
        <div className="project-body">
          <div className="project-title-row">
            <div><span className="project-type">{project.type}</span><h3>{project.name}</h3></div>
            <span className="project-open" aria-hidden="true"><ArrowUpRight size={18} /></span>
          </div>
          <p>{project.description}</p>
          <div className="project-tech">
            {project.tech.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
          <div className="project-links">
            {!liveDemoUrl && <span className="project-link-status">Live Demo URL is not configured.</span>}
            {githubRepositoryUrl && (
              <a
                href={githubRepositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopNestedLinkClick}
              ><Github size={14} /> GitHub</a>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="section-container">
        <Reveal className="section-heading">
          <span className="section-kicker">SELECTED WORK</span>
          <h2>Projects built with <span>purpose</span></h2>
          <p>Experiments and learning projects that turn ideas into working experiences.</p>
        </Reveal>
        <div className="projects-grid">
          {projects.map((project, index) => {
            const projectLinks = portfolio.projects.find(({ id }) => id === project.id);
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                liveDemoUrl={projectLinks?.liveDemoUrl}
                githubRepositoryUrl={projectLinks?.githubRepositoryUrl}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
