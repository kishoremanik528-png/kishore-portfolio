import React from "react";
import { portfolio } from "../config/portfolio.js";

export default function Footer() {
  const initials = portfolio.fullName
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("");

  return (
    <footer className="site-footer">
      <a className="footer-brand" href="#home">
        {initials.slice(0, -1)}<span>{initials.slice(-1)}</span>
      </a>
      <p>Designed with care. Built one step at a time.</p>
      <a className="back-to-top" href="#home">Back to top ↑</a>
    </footer>
  );
}
