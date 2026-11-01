import React from "react";

export default function HeroScene() {
  return (
    <div className="scene3d" aria-hidden="true">
      <span className="scene-object scene-cube scene-cube-large" />
      <span className="scene-object scene-sphere scene-sphere-large" />
      <span className="scene-object scene-cube scene-cube-small" />
      <span className="scene-object scene-sphere scene-sphere-small" />
      <span className="scene-object scene-ring" />
    </div>
  );
}
