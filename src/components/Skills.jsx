import React from "react";
import { Braces, Database, GitBranch, Server } from "lucide-react";
import Reveal from "./Reveal.jsx";

const categories = [
  { title: "Frontend", icon: Braces, skills: ["HTML5", "CSS3", "JavaScript", "React"] },
  { title: "Backend", icon: Server, skills: ["Python", "Flask", "Node.js"] },
  { title: "Database", icon: Database, skills: ["MySQL", "PostgreSQL", "MongoDB"] },
  { title: "Tools", icon: GitBranch, skills: ["Git", "GitHub", "VS Code"] },
];

const skillMarks = {
  HTML5: "5", CSS3: "#", JavaScript: "JS", React: "⚛",
  Python: "Py", Flask: "Fl", "Node.js": "N", MySQL: "My",
  PostgreSQL: "Pg", MongoDB: "M", Git: "Git", GitHub: "GH", "VS Code": "VS",
};

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-container">
        <Reveal className="section-heading">
          <span className="section-kicker">MY TOOLKIT</span>
          <h2>Skills &amp; <span>Technologies</span></h2>
          <p>Tools and technologies I’m learning and using to bring ideas to life.</p>
        </Reveal>
        <div className="skills-grid">
          {categories.map(({ title, icon: Icon, skills }, index) => (
            <Reveal className="skill-category" delay={index * 65} key={title}>
              <div className="skill-category-heading">
                <span className="category-icon"><Icon size={19} /></span>
                <h3>{title}</h3>
              </div>
              <div className="skill-list">
                {skills.map((skill) => (
                  <div className="skill-item" key={skill}>
                    <span className={`skill-mark skill-mark-${skill.toLowerCase().replace(/[^a-z0-9]/g, "")}`} aria-hidden="true">{skillMarks[skill]}</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
