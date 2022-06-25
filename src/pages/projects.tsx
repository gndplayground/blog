import React from "react";
import Github from "../icons/Github";
import Web from "../icons/Web";
import PageLayout from "../layouts/PageLayout";
import "../styles/projects.page.css";

interface Project {
  github?: string;
  web?: string;
  intro: string;
  title: string;
}

const openSrcProjects: Project[] = [
  {
    title: "poodle-ui",
    intro: "Simple React UI components with system",
    github: "https://github.com/poodle-x/poodle-ui",
    web: "https://ui.poodle.sh/",
  },
  {
    title: "custom-uniswap-v2-sdk",
    intro: "Custom Uniswap SDK V2 to use for multiple chains",
    github: "https://github.com/gndplayground/uniswap-v2-sdk",
    web: "https://gndplayground.github.io/custom-uniswap-v2-sdk-example",
  },
  {
    title: "zuzu",
    intro: "Aa small utility that helps generate files from a template",
    github: "https://github.com/gndplayground/zuzu",
  },
];

const closeSrcProjects: Project[] = [
  {
    title: "poodle-note",
    intro: "Simple note web app that save data at the local.",
    web: "https://note.poodle.sh/",
  },
];

const ProjectsPage = () => {
  function renderProject(p: Project) {
    return (
      <div className="project" key={p.title}>
        <h3 className="project__title">{p.title}</h3>
        <p>{p.intro}</p>
        {(p.web || p.github) && (
          <div className="project__links">
            {p.github && (
              <a
                aria-label={`project ${p.title} Github page`}
                href={p.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Github />
              </a>
            )}
            {p.web && (
              <a
                aria-label={`project ${p.title} web page`}
                href={p.web}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Web />
              </a>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <PageLayout title="Projects | Giang Nguyen's Site">
      <h1 className="font-title">My Projects</h1>
      <section className="projects">
        <h2 className="font-section-title projects__title">Open Source</h2>
        <div className="projects__list-wrap">
          <div className="projects__list">
            {openSrcProjects.map((p) => {
              return renderProject(p);
            })}
          </div>
        </div>
      </section>
      <section className="projects">
        <h2 className="font-section-title projects__title">Closed Source</h2>
        <div className="projects__list-wrap">
          <div className="projects__list">
            {closeSrcProjects.map((p) => {
              return renderProject(p);
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProjectsPage;
